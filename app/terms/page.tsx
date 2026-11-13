import type { Metadata } from "next";
import { pageSeo } from "@/data/seo-keywords";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { LegalPage, type LegalSection } from "@/components/sections/legal-page";

export const metadata: Metadata = buildMetadata(pageSeo["/terms"], "/terms");

/**
 * TEMPLATE — standard agency terms. Have a qualified professional review
 * (especially liability, payment and jurisdiction clauses) before relying on it.
 */
const UPDATED = "1 November 2026";
const { name, contact } = siteConfig;

const sections: LegalSection[] = [
  {
    heading: "About these terms",
    body: [
      `These terms apply to your use of this website and to services provided by ${name} ("we", "us"). By using the website or engaging us, you agree to them. Specific projects may also be governed by a written proposal or agreement, which takes priority where it differs.`,
    ],
  },
  {
    heading: "Our services",
    body: [
      "We provide digital marketing, design, web development and related services described on this website and in each proposal. Scope, deliverables, timelines and fees are set out in the proposal or invoice you accept.",
    ],
  },
  {
    heading: "Fees and payment",
    list: [
      "Fees are quoted in Indian Rupees (INR) and are exclusive of GST and other applicable taxes unless stated.",
      "Advertising spend (for example on Meta or Google) is separate and is paid by you directly to the advertising platform from your own account.",
      "Monthly services are invoiced in advance. Quarterly plans are invoiced every three months at the quoted rate.",
      "Late payments may result in the pause of services until the account is settled.",
    ],
  },
  {
    heading: "Your responsibilities",
    list: [
      "Provide accurate information, assets and timely approvals we reasonably need.",
      "Ensure you hold the rights to any content, logos and materials you give us.",
      "Keep ownership of your ad, analytics and website accounts and grant us the access needed to work on them.",
    ],
  },
  {
    heading: "No guarantee of results",
    body: [
      "Marketing performance depends on many factors outside our control, including competition, budget, market conditions and platform changes. We work diligently and transparently, but we do not guarantee specific rankings, traffic, leads, sales or return on ad spend. Any figures on this website, including case studies, calculator outputs and testimonials marked as samples, are illustrative.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "On full payment, you own the final deliverables created specifically for you (such as logos, website designs and written content), excluding third-party materials, fonts, stock assets and our pre-existing tools, which remain subject to their own licences. We may show non-confidential work in our portfolio unless you ask us not to.",
    ],
  },
  {
    heading: "Confidentiality",
    body: [
      "Each party will keep the other's non-public business information confidential and use it only for the purposes of the engagement.",
    ],
  },
  {
    heading: "Cancellation and termination",
    body: [
      "Unless your proposal says otherwise, monthly services can be ended by either party with 30 days' written notice. Fees for work already performed and committed third-party costs remain payable.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, we are not liable for indirect or consequential losses, loss of profit or business, or for losses caused by third-party platforms. Our total liability for any claim is limited to the fees you paid us for the service giving rise to the claim in the three months before it arose.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      `These terms are governed by the laws of India. Courts located in ${contact.address.city}, ${contact.address.region} have jurisdiction over any dispute, subject to any dispute-resolution process agreed in writing.`,
    ],
  },
  {
    heading: "Changes and contact",
    body: [
      <>
        We may update these terms; the date above shows the latest version. Questions? Email{" "}
        <a className="text-accent underline" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
        .
      </>,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      updated={UPDATED}
      intro="Plain-language terms for using this website and working with us."
      sections={sections}
    />
  );
}
