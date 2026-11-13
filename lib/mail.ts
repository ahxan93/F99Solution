import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { siteConfig, whatsappLink } from "@/config/site";
import type { LeadSource } from "@/lib/validators";

const esc = (v: unknown): string =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

let transporter: Transporter | null | undefined;

function getTransporter(): Transporter | null {
  if (transporter !== undefined) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  if (!SMTP_HOST) {
    transporter = null;
    return null;
  }
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: SMTP_SECURE === "true",
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });
  return transporter;
}

export interface LeadMailData {
  source: LeadSource;
  name?: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  website?: string;
  businessType?: string;
  message?: string;
  details?: Record<string, string | number>;
}

const sourceLabel: Record<LeadSource, string> = {
  contact: "Contact form",
  audit: "Free audit request",
  calculator: "ROI calculator report",
  newsletter: "Newsletter signup",
  "exit-intent": "Exit-intent popup",
};

const shell = (body: string): string => `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:auto;color:#0b1020;line-height:1.6">
  <div style="background:#2563ff;color:#fff;padding:18px 24px;border-radius:12px 12px 0 0;font-size:18px;font-weight:bold">${esc(siteConfig.name)}</div>
  <div style="border:1px solid #e3e6f0;border-top:0;padding:24px;border-radius:0 0 12px 12px">${body}</div>
</div>`;

function rows(pairs: [string, unknown][]): string {
  return pairs
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#5b6478;vertical-align:top">${esc(k)}</td><td style="padding:6px 0"><strong>${esc(v)}</strong></td></tr>`,
    )
    .join("");
}

async function send(to: string, subject: string, html: string, replyTo?: string): Promise<void> {
  const t = getTransporter();
  if (!t) {
    console.warn(`[mail] SMTP not configured — skipped email "${subject}" to ${to}`);
    return;
  }
  await t.sendMail({
    from: process.env.MAIL_FROM ?? `${siteConfig.name} <${siteConfig.contact.email}>`,
    to,
    subject,
    html,
    replyTo,
  });
}

/** Notify the admin of a new lead. */
export async function sendAdminNotification(lead: LeadMailData): Promise<void> {
  const to = process.env.ADMIN_NOTIFY_EMAIL ?? siteConfig.contact.email;
  const detailPairs = Object.entries(lead.details ?? {}).map(
    ([k, v]) => [k, v] as [string, unknown],
  );
  const html = shell(`
    <h2 style="margin:0 0 12px">New lead: ${esc(sourceLabel[lead.source])}</h2>
    <table style="border-collapse:collapse;font-size:14px">${rows([
      ["Name", lead.name],
      ["Email", lead.email],
      ["Phone", lead.phone],
      ["Service", lead.service],
      ["Budget", lead.budget],
      ["Website", lead.website],
      ["Business", lead.businessType],
      ["Message", lead.message],
      ...detailPairs,
    ])}</table>
    <p style="margin-top:24px;color:#5b6478">— ${esc(siteConfig.teamName)}</p>`);
  await send(
    to,
    `New ${sourceLabel[lead.source].toLowerCase()} — ${lead.name ?? lead.email}`,
    html,
    lead.email,
  );
}

/** Auto-reply to the person who submitted. */
export async function sendAutoReply(lead: LeadMailData): Promise<void> {
  const first = lead.name?.split(" ")[0] ?? "there";
  const copy: Record<LeadSource, { subject: string; text: string }> = {
    contact: {
      subject: "We've received your enquiry",
      text: "Thanks for getting in touch. We've received your message and will reply within one working day.",
    },
    audit: {
      subject: "Your free audit request is in",
      text: "Thanks for requesting a free audit. We'll review your website and email your personalised findings within 2 working days.",
    },
    calculator: {
      subject: "Your ad budget & ROI report",
      text: "Here are the figures from the calculator. These are estimates based on the numbers you entered.",
    },
    newsletter: {
      subject: `Welcome to ${siteConfig.name}`,
      text: "Thanks for subscribing. You'll get practical marketing tips from us — no spam, unsubscribe anytime.",
    },
    "exit-intent": {
      subject: "Your free audit is on its way",
      text: "Thanks for your interest. We'll be in touch shortly about your free audit.",
    },
  };
  const c = copy[lead.source];
  const detailRows =
    lead.source === "calculator" && lead.details
      ? `<table style="border-collapse:collapse;font-size:14px;margin:12px 0">${rows(
          Object.entries(lead.details).map(([k, v]) => [k, v] as [string, unknown]),
        )}</table>`
      : "";

  const html = shell(`
    <p>Hi ${esc(first)},</p>
    <p>${esc(c.text)}</p>
    ${detailRows}
    <p>Need an answer sooner? <a href="${esc(whatsappLink())}">Message us on WhatsApp</a>.</p>
    <p style="margin-top:24px">Warm regards,<br/><strong>${esc(siteConfig.teamName)}</strong></p>`);
  await send(lead.email, c.subject, html);
}
