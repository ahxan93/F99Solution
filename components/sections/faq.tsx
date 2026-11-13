import { homeFaqs } from "@/data/home";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { SectionHeading } from "@/components/ui/section-heading";

export function Faq() {
  return (
    <section className="container-page py-24">
      <SectionHeading eyebrow="FAQ" title="Questions we hear most" />
      <div className="mx-auto mt-12 max-w-3xl">
        <FaqAccordion items={homeFaqs} />
      </div>
    </section>
  );
}
