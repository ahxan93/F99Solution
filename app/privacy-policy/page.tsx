import type { Metadata } from "next";
import { pageSeo } from "@/data/seo-keywords";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { LegalPage, type LegalSection } from "@/components/sections/legal-page";

export const metadata: Metadata = buildMetadata(pageSeo["/privacy-policy"], "/privacy-policy");

/**
 * TEMPLATE — written to match what this website actually does (forms, IP-based
 * rate limiting, consent-gated analytics). Have it reviewed by a qualified
 * professional and update the date/details before relying on it.
 */
const UPDATED = "1 November 2026";

const { contact, name } = siteConfig;

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      `${name} ("we", "us") is a digital marketing agency based in ${contact.address.city}, ${contact.address.country}. This policy explains what personal information we collect through this website, why, and the choices you have.`,
      <>
        Questions? Email us at{" "}
        <a className="text-accent underline" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
        .
      </>,
    ],
  },
  {
    heading: "Information we collect",
    list: [
      "Details you submit through our forms: name, email address, phone number, website address, business type, service and budget preferences, and your message.",
      "Calculator inputs and results, if you ask us to email you an ROI report.",
      "Your email address, if you subscribe to our newsletter or use the free-audit popup.",
      "Technical data: your IP address (used for spam protection and rate limiting) and basic request information.",
      "Analytics and advertising data (pages viewed, device, approximate location, ad interactions) — only if you accept optional cookies.",
    ],
  },
  {
    heading: "How we use your information",
    list: [
      "To reply to enquiries, prepare audits and send the reports you request.",
      "To manage our client pipeline and follow up on your enquiry.",
      "To keep the website secure and prevent spam and abuse.",
      "To understand how the website is used and to measure and improve our marketing — only with your consent for optional cookies.",
      "To send newsletters or marketing emails, only if you subscribed. You can unsubscribe at any time.",
    ],
  },
  {
    heading: "Cookies and tracking",
    body: [
      "Essential storage (for example remembering your theme and cookie choice) is always used. Analytics and advertising tools — Google Analytics, Google Tag Manager and Meta Pixel, where enabled on this site — load only after you click “Accept” on the cookie banner.",
      "You can change your choice at any time using “Cookie settings” in the website footer. Declining does not affect your ability to use the site.",
    ],
  },
  {
    heading: "Who we share information with",
    body: [
      "We do not sell your personal information. We share it only with service providers that help us run the website and our business, under appropriate safeguards:",
    ],
    list: [
      "Hosting and database providers that store website data and enquiries.",
      "Email delivery providers that send our replies and notifications.",
      "Analytics and advertising platforms (such as Google and Meta), if you accepted optional cookies.",
      "Professional advisers or authorities where required by law.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "We keep enquiry and lead information only as long as needed to respond to you and manage any resulting relationship, and as required by law. You can ask us to delete your information at any time.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Subject to applicable Indian data-protection law, you may ask to access, correct or erase your personal information, withdraw consent you have given, and raise a grievance with us. Email us at the address above and we will respond within a reasonable time.",
    ],
  },
  {
    heading: "Security",
    body: [
      "We use reasonable technical and organisational measures — including encrypted connections, access controls and spam protection — to safeguard your information. No online service can be guaranteed completely secure.",
    ],
  },
  {
    heading: "Children",
    body: ["This website is intended for businesses and is not directed at children under 18."],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this policy from time to time. The “Last updated” date above shows when it last changed.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated={UPDATED}
      intro="We only collect what we need, we never sell it, and you stay in control."
      sections={sections}
    />
  );
}
