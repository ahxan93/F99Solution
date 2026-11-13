export interface NavLink {
  label: string;
  href: string;
}

/** Top-level links. "Services" is rendered as a mega-menu from /data/services.ts. */
export const mainNav: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Free Tools", href: "/tools" },
  { label: "Contact", href: "/contact" },
];

export const footerCompany: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const footerTools: NavLink[] = [
  { label: "Ad Budget & ROI Calculator", href: "/tools/roi-calculator" },
  { label: "Free Website / SEO Audit", href: "/tools/free-audit" },
];

export const footerLegal: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Image Credits", href: "/image-credits" },
];
