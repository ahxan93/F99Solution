/**
 * Pricing packages in INR per month. All figures are PLACEHOLDERS — set your real prices here.
 * Ad spend is billed separately by the ad platforms.
 */
export interface PricingPlan {
  id: "starter" | "growth" | "premium";
  name: string;
  priceMonthly: number;
  blurb: string;
  features: string[];
  highlighted?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 15000,
    blurb: "For new brands building a consistent presence.",
    features: [
      "Social media management on 2 platforms",
      "12 designed posts + 4 reels per month",
      "Meta Ads setup & management (1 campaign set)",
      "Monthly performance report",
      "WhatsApp support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    priceMonthly: 35000,
    blurb: "For businesses ready to scale leads and sales.",
    highlighted: true,
    features: [
      "Social media on 3 platforms",
      "20 posts + 8 reels per month",
      "Meta + Google Ads management",
      "Landing page & conversion tracking setup",
      "Basic SEO & Google Business Profile care",
      "Fortnightly strategy calls",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    priceMonthly: 75000,
    blurb: "Full-funnel growth with a dedicated strategist.",
    features: [
      "All channels: social, ads, SEO, email",
      "30 posts + 12 reels per month",
      "Advanced funnel, CRO & A/B testing",
      "CRM & WhatsApp automation",
      "Weekly reporting & priority support",
      "Dedicated account strategist",
    ],
  },
];

/** Quarterly billing discount applied on the Pricing page (Phase 3). */
export const quarterlyDiscount = 0.1;

export const formatINR = (n: number): string =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
