/**
 * Lightweight, navigation-level service data (no long-form copy). Safe to import from server code that
 * must not pull in ./service-content/*. Client components should NOT import this directly; use the
 * server-built props from lib/service-nav.ts instead.
 */
export type ServiceCategory = "Growth" | "Social & Content" | "Web & Tech" | "Brand & Reputation";

export type ServiceIconName =
  | "search"
  | "share"
  | "megaphone"
  | "target"
  | "layout"
  | "code"
  | "workflow"
  | "pen"
  | "video"
  | "palette"
  | "mail"
  | "message"
  | "users"
  | "shield"
  | "funnel"
  | "chart"
  | "cart";

/** Optional config: shows this service as an orbiting glass card in the homepage 3D hero. */
export interface HeroCard {
  /** Full card label on desktop. */
  label: string;
  /** Short label for phones (< 768px). */
  short: string;
  /** Position among the desktop cards (0-7). */
  order: number;
  /** Position among the 4 phone cards; omit to hide on phones. */
  mobileOrder?: number;
  /** Use a brand SVG (from components/ui/social-icons) instead of the lucide service icon. */
  brandIcon?: "facebook" | "instagram";
}

export interface ServiceBase {
  slug: string;
  title: string;
  short: string;
  icon: ServiceIconName;
  category: ServiceCategory;
  hero?: HeroCard;
}

export const serviceBase: ServiceBase[] = [
  {
    slug: "seo",
    title: "Search Engine Optimization",
    short: "On-page, technical & local SEO that ranks.",
    icon: "search",
    category: "Growth",
    hero: { label: "SEO", short: "SEO", order: 0, mobileOrder: 0 },
  },
  {
    slug: "meta-ads",
    title: "Meta Ads",
    short: "Facebook & Instagram ads built for ROAS.",
    icon: "megaphone",
    category: "Growth",
    hero: { label: "Meta Ads", short: "Meta Ads", order: 2, mobileOrder: 1, brandIcon: "facebook" },
  },
  {
    slug: "google-ads",
    title: "Google Ads",
    short: "Search, Display, YouTube & Performance Max.",
    icon: "target",
    category: "Growth",
    hero: { label: "Google Ads", short: "Google Ads", order: 1, mobileOrder: 2 },
  },
  {
    slug: "landing-pages-funnels",
    title: "Landing Pages & Funnels",
    short: "High-converting pages and sales funnels.",
    icon: "funnel",
    category: "Growth",
  },
  {
    slug: "analytics-tracking",
    title: "Analytics & Tracking",
    short: "GA4, Meta Pixel, CAPI & Tag Manager.",
    icon: "chart",
    category: "Growth",
    hero: { label: "Analytics & Reporting", short: "Analytics", order: 6 },
  },
  {
    slug: "ecommerce-marketing",
    title: "E-commerce Marketing",
    short: "Shopify & WooCommerce growth programmes.",
    icon: "cart",
    category: "Growth",
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    short: "Instagram, Facebook, LinkedIn & YouTube.",
    icon: "share",
    category: "Social & Content",
    hero: { label: "Social Media Marketing", short: "Social", order: 3, brandIcon: "instagram" },
  },
  {
    slug: "content-marketing",
    title: "Content Marketing & Copywriting",
    short: "Words that educate, persuade and convert.",
    icon: "pen",
    category: "Social & Content",
    hero: { label: "Content Marketing", short: "Content", order: 7 },
  },
  {
    slug: "video-editing-design",
    title: "Reels, Video Editing & Design",
    short: "Scroll-stopping reels and graphics.",
    icon: "video",
    category: "Social & Content",
  },
  {
    slug: "email-marketing",
    title: "Email Marketing & Automation",
    short: "Lifecycle emails that drive repeat revenue.",
    icon: "mail",
    category: "Social & Content",
  },
  {
    slug: "whatsapp-marketing",
    title: "WhatsApp Marketing",
    short: "WhatsApp Business API & broadcasts.",
    icon: "message",
    category: "Social & Content",
  },
  {
    slug: "website-design-development",
    title: "Website Design & Development",
    short: "Fast, beautiful, conversion-led websites.",
    icon: "layout",
    category: "Web & Tech",
    hero: { label: "Website Development", short: "Websites", order: 4, mobileOrder: 3 },
  },
  {
    slug: "full-stack-development",
    title: "Full Stack Web Applications",
    short: "Custom web apps, dashboards & portals.",
    icon: "code",
    category: "Web & Tech",
  },
  {
    slug: "crm-automation",
    title: "CRM Setup & Automation",
    short: "Lead pipelines and follow-up automation.",
    icon: "workflow",
    category: "Web & Tech",
    hero: { label: "CRM & Automation", short: "CRM", order: 5 },
  },
  {
    slug: "branding-logo-design",
    title: "Branding & Logo Design",
    short: "Identities people remember and trust.",
    icon: "palette",
    category: "Brand & Reputation",
  },
  {
    slug: "influencer-marketing",
    title: "Influencer Marketing",
    short: "Creator partnerships that move the needle.",
    icon: "users",
    category: "Brand & Reputation",
  },
  {
    slug: "online-reputation-management",
    title: "Online Reputation Management",
    short: "Reviews, perception and brand safety.",
    icon: "shield",
    category: "Brand & Reputation",
  },
];

export const serviceCategories: ServiceCategory[] = [
  "Growth",
  "Social & Content",
  "Web & Tech",
  "Brand & Reputation",
];
