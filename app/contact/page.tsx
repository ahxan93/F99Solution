import type { Metadata } from "next";
import { pageSeo } from "@/data/seo-keywords";
import { buildMetadata } from "@/lib/metadata";
import { Clock, ExternalLink, Headset, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig, whatsappLink } from "@/config/site";
import { pricingPlans } from "@/data/pricing";
import { PageHero } from "@/components/sections/page-hero";
import { getServiceTitles } from "@/lib/service-nav";
import { ContactForm } from "@/components/sections/contact-form";
import { AreasServed } from "@/components/sections/areas-served";
import { SlotImage } from "@/components/ui/slot-image";
import { WhatsappIcon } from "@/components/ui/social-icons";

export const metadata: Metadata = buildMetadata(pageSeo["/contact"], "/contact");

type SearchParams = Promise<{ plan?: string | string[] }>;

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const { plan } = await searchParams;
  const planId = Array.isArray(plan) ? plan[0] : plan;
  const selected = pricingPlans.find((p) => p.id === planId);
  const defaultMessage = selected
    ? `I'm interested in the ${selected.name} plan.`
    : planId === "custom"
      ? "I'd like a custom quote for a web / app / CRM project."
      : "";

  const { contact } = siteConfig;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Contact our <span className="text-gradient">digital marketing agency</span> in Mumbai
          </>
        }
        description="Reach our digital marketing agency in Mumbai for a free consultation. Tell us your goals and budget, and our team replies within one working day, usually sooner."
      />
      <section className="container-page grid gap-10 pb-24 lg:grid-cols-[1.3fr_1fr]">
        <ContactForm serviceTitles={getServiceTitles()} defaultMessage={defaultMessage} />

        <aside className="space-y-5">
          <SlotImage
            slot="contact-side"
            icon={Headset}
            sizes="(min-width: 1024px) 420px, 100vw"
            className="border-border aspect-[3/2] rounded-3xl border"
          />
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-3xl bg-[#0f7a40] p-6 font-semibold text-white transition-transform hover:scale-[1.01]"
          >
            <WhatsappIcon className="size-8" />
            <span>
              Chat on WhatsApp
              <span className="block text-sm font-normal opacity-90">Fastest way to reach us</span>
            </span>
          </a>

          <div className="border-border bg-surface space-y-4 rounded-3xl border p-6 text-sm">
            <p className="flex gap-3">
              <Phone className="text-accent mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <a href={`tel:${contact.phoneHref}`} className="hover:text-accent">
                {contact.phone}
              </a>
            </p>
            <p className="flex gap-3">
              <Mail className="text-accent mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <a href={`mailto:${contact.email}`} className="hover:text-accent">
                {contact.email}
              </a>
            </p>
            <p className="flex gap-3">
              <MapPin className="text-accent mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>
                {contact.address.street}, {contact.address.city}, {contact.address.region}{" "}
                {contact.address.postalCode}, {contact.address.country}
              </span>
            </p>
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent inline-flex items-center gap-1.5 font-semibold hover:underline"
            >
              Open in Google Maps <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="border-border bg-surface rounded-3xl border p-6 text-sm">
            <h2 className="mb-3 flex items-center gap-2 font-semibold">
              <Clock className="text-accent size-4" aria-hidden="true" /> Office hours
            </h2>
            <dl className="space-y-2">
              {contact.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4">
                  <dt className="text-muted">{h.days}</dt>
                  <dd className="font-medium">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="text-muted mt-3 text-xs">Indian Standard Time (IST)</p>
          </div>
        </aside>
      </section>
      <div className="container-page pb-24">
        <AreasServed />
      </div>
    </>
  );
}
