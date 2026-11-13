import { services } from "@/data/services";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/sections/service-card";
import { ButtonLink } from "@/components/ui/button";

const FEATURED = [
  "seo",
  "meta-ads",
  "google-ads",
  "social-media-management",
  "website-design-development",
  "crm-automation",
];

export function ServicesOverview() {
  const featured = FEATURED.map((slug) => services.find((s) => s.slug === slug)).filter(
    (s): s is (typeof services)[number] => Boolean(s),
  );

  return (
    <section className="container-page py-24">
      <SectionHeading
        eyebrow="What we do"
        title="Everything your brand needs to grow online"
        description={`${services.length} specialised services — one accountable team.`}
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 3) * 0.08}>
            <ServiceCard service={s} cta="Learn more" />
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <ButtonLink href="/services" variant="outline" size="lg">
          Explore all {services.length} services
        </ButtonLink>
      </div>
    </section>
  );
}
