// lucide-react v1 no longer ships brand icons, so these are small inline SVGs.
import type { SVGProps } from "react";

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const InstagramIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const FacebookIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5A.5.5 0 0 1 14 8Z" />
  </svg>
);

export const LinkedinIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M7 10v8M7 6.5v.01M11 18v-8m0 3a3 3 0 0 1 6 0v5" />
    <rect x="3" y="3" width="18" height="18" rx="3" />
  </svg>
);

export const YoutubeIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="4" />
    <path d="m10 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" />
  </svg>
);

export const WhatsappIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 8 19.5L3 21Z" />
    <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-.8.8c-.9-.4-1.6-1.1-2-2l.8-.8-1-2L9 9.5Z" />
  </svg>
);
