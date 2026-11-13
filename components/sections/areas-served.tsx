import Link from "next/link";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

interface AreasServedProps {
  /** Optional service name, e.g. "SEO", to tailor the heading. */
  topic?: string;
  className?: string;
}

/** Local SEO: where we work. Values come from siteConfig.areasServed so the schema and the copy never disagree. */
export function AreasServed({ topic, className }: AreasServedProps) {
  const cities = siteConfig.areasServed.filter((a) => a.type === "City");
  return (
    <section aria-labelledby="areas-heading" className={className}>
      <h2 id="areas-heading" className="text-2xl font-bold md:text-3xl">
        {topic ? `Areas where we deliver ${topic}` : "Areas we serve"}
      </h2>
      <p className="text-muted mt-3 max-w-3xl leading-relaxed">
        We work from {siteConfig.contact.address.city} with businesses in{" "}
        {cities.map((c) => c.name).join(", ")}, and with clients across India. We also support
        international clients remotely through video calls, shared dashboards and WhatsApp.
      </p>
      <ul className="mt-5 flex flex-wrap gap-2.5">
        {siteConfig.areasServed.map((a) => (
          <li
            key={a.name}
            className="border-border bg-surface inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium"
          >
            <MapPin className="text-accent size-3.5" aria-hidden="true" />
            {a.type === "Country" ? `All of ${a.name}` : a.name}
          </li>
        ))}
        <li className="border-border bg-surface inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium">
          <MapPin className="text-accent size-3.5" aria-hidden="true" />
          International clients
        </li>
      </ul>
      <p className="text-muted mt-5 text-sm">
        Not sure we cover your area?{" "}
        <Link href="/contact" className="text-accent underline underline-offset-4">
          Contact our Mumbai digital marketing team
        </Link>{" "}
        and we will tell you how we can help.
      </p>
    </section>
  );
}
