import { brandContent } from "./service-content/brand";
import { extraContent } from "./service-content/extra";
import { growthContent } from "./service-content/growth";
import { socialContent } from "./service-content/social";
import { webContent } from "./service-content/web";
import type { ServiceContent, ServiceExtra } from "./service-types";

export type { ProcessStep, ServiceContent, ServiceExtra, ServiceFaq } from "./service-types";
import { serviceBase, serviceCategories } from "./service-base";
import type { HeroCard, ServiceBase, ServiceCategory, ServiceIconName } from "./service-base";

export type { HeroCard, ServiceBase, ServiceCategory, ServiceIconName };
export { serviceCategories };

export type Service = ServiceBase & ServiceContent & Omit<ServiceExtra, "extraFaq">;

const content: Record<string, ServiceContent> = {
  ...growthContent,
  ...socialContent,
  ...webContent,
  ...brandContent,
};

export const services: Service[] = serviceBase.map((b) => {
  const c = content[b.slug];
  const e = extraContent[b.slug];
  if (!c || !e) throw new Error(`Missing long-form content for service "${b.slug}"`);
  const { extraFaq, ...extra } = e;
  return { ...b, ...c, ...extra, faqs: [...c.faqs, extraFaq] };
});

export const getService = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
