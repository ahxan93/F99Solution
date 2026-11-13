import {
  serviceBase,
  serviceCategories,
  type HeroCard,
  type ServiceCategory,
  type ServiceIconName,
} from "@/data/service-base";

/**
 * Small, serialisable service lists built on the server and passed to client components as props, so no
 * client bundle imports data/services.ts (which carries all the long-form page copy).
 */
export interface ServiceNavItem {
  slug: string;
  title: string;
  /** One short line. */
  short: string;
  icon: ServiceIconName;
  category: ServiceCategory;
}

export interface HeroServiceItem {
  slug: string;
  title: string;
  icon: ServiceIconName;
  hero: HeroCard;
}

export interface ServiceNav {
  categories: ServiceCategory[];
  items: ServiceNavItem[];
}

export function getServiceNav(): ServiceNav {
  return {
    categories: serviceCategories,
    items: serviceBase.map(({ slug, title, short, icon, category }) => ({
      slug,
      title,
      short,
      icon,
      category,
    })),
  };
}

export function getHeroServiceItems(): HeroServiceItem[] {
  return serviceBase.flatMap((s) =>
    s.hero ? [{ slug: s.slug, title: s.title, icon: s.icon, hero: s.hero }] : [],
  );
}

/** Service titles only (for <select> options in forms). */
export function getServiceTitles(): string[] {
  return serviceBase.map((s) => s.title);
}
