/**
 * SEO plan: ONE primary keyword and 3–5 secondary keywords for every page, aimed at India + Mumbai
 * local intent, plus the page's <title> (50–60 characters, primary keyword near the start, brand at
 * the end) and meta description (140–160 characters, a clear benefit and a call to action).
 *
 * Pages read their metadata from here (see lib/metadata.ts), so this is the one file to edit when
 * you refine keywords. `npm run seo:check` verifies lengths and one-H1-per-page against a running site.
 *
 * Writing rules: primary keyword in the title, the H1 and the first ~100 words of the page; secondary
 * keywords used naturally in headings and body copy — never stuffed.
 */
export interface PageSeo {
  primary: string;
  secondary: string[];
  title: string;
  description: string;
}

/** Static pages, keyed by route path. */
export const pageSeo: Record<string, PageSeo> = {
  "/": {
    primary: "digital marketing agency in Mumbai",
    secondary: [
      "digital marketing company Mumbai",
      "digital marketing services India",
      "performance marketing agency Mumbai",
      "SEO and ads agency Mumbai",
    ],
    title: "Top Digital Marketing Agency in Mumbai | F99 Solution",
    description:
      "F99 Solution is a results-driven digital marketing agency in Mumbai. SEO, Meta and Google Ads, web and CRM from one team. Get your free audit today.",
  },
  "/about": {
    primary: "digital marketing company in Mumbai",
    secondary: [
      "digital marketing experts Mumbai",
      "full-service digital agency India",
      "performance marketing specialists",
      "digital marketing team Mumbai",
    ],
    title: "Digital Marketing Company in Mumbai | About F99 Solution",
    description:
      "Meet the specialists behind F99 Solution, a Mumbai digital marketing company for SEO, ads, web and CRM. See how we work and book a free strategy call.",
  },
  "/services": {
    primary: "digital marketing services in Mumbai",
    secondary: [
      "digital marketing services India",
      "SEO and paid ads services",
      "social media and web development services",
      "online marketing services Mumbai",
    ],
    title: "Digital Marketing Services in Mumbai | F99 Solution",
    description:
      "Explore 17 digital marketing services in Mumbai: SEO, Meta Ads, Google Ads, web development, CRM and more. Compare services and request a free audit.",
  },
  "/pricing": {
    primary: "digital marketing packages India",
    secondary: [
      "digital marketing pricing India",
      "social media marketing packages",
      "monthly digital marketing plans",
      "digital marketing cost Mumbai",
    ],
    title: "Digital Marketing Packages India | Pricing | F99 Solution",
    description:
      "Clear monthly digital marketing packages in India, priced in INR with no lock-in. Compare Starter, Growth and Premium plans, then request a custom quote.",
  },
  "/portfolio": {
    primary: "digital marketing case studies India",
    secondary: [
      "SEO case studies India",
      "Meta Ads case study",
      "Google Ads results India",
      "digital marketing portfolio Mumbai",
    ],
    title: "Digital Marketing Case Studies India | F99 Solution",
    description:
      "Browse digital marketing case studies from India by service: SEO, Meta Ads, Google Ads and CRM. See the challenge, strategy and results, then get a free audit.",
  },
  "/contact": {
    primary: "contact digital marketing agency Mumbai",
    secondary: [
      "free digital marketing consultation",
      "hire digital marketing agency Mumbai",
      "digital marketing enquiry India",
      "WhatsApp marketing agency contact",
    ],
    title: "Contact a Digital Marketing Agency in Mumbai | F99 Solution",
    description:
      "Contact our Mumbai digital marketing agency for a free consultation. Tell us your goals and budget, and we reply within one working day. Message us today.",
  },
  "/blog": {
    primary: "digital marketing blog India",
    secondary: [
      "SEO guides India",
      "Meta Ads tips India",
      "Google Ads tips India",
      "local SEO Mumbai guide",
    ],
    title: "Digital Marketing Blog India | Guides by F99 Solution",
    description:
      "In-depth digital marketing guides for Indian businesses: SEO, Meta Ads, Google Ads and pricing. Practical advice from our team. Read the latest guides.",
  },
  "/tools": {
    primary: "free digital marketing tools",
    secondary: [
      "ad budget calculator",
      "ROAS calculator India",
      "free SEO audit tool",
      "marketing ROI calculator",
    ],
    title: "Free Digital Marketing Tools for India | F99 Solution",
    description:
      "Use free digital marketing tools built for Indian businesses: an ad budget and ROAS calculator and a free website and SEO audit. Try them in minutes.",
  },
  "/tools/roi-calculator": {
    primary: "ad budget calculator India",
    secondary: [
      "ROAS calculator",
      "marketing ROI calculator",
      "Meta Ads budget calculator",
      "Google Ads ROI calculator",
    ],
    title: "Ad Budget Calculator India | ROAS & ROI | F99 Solution",
    description:
      "Free ad budget calculator for India: enter your budget, CPC, conversion rate and order value to estimate leads, sales and ROAS. Calculate yours in seconds.",
  },
  "/tools/free-audit": {
    primary: "free SEO audit Mumbai",
    secondary: [
      "free website audit India",
      "website SEO audit report",
      "free digital marketing audit",
      "SEO audit for small business",
    ],
    title: "Free SEO Audit in Mumbai | Website Review | F99 Solution",
    description:
      "Request a free SEO and website audit from our Mumbai team. We review speed, SEO, ads and tracking, then send prioritised quick wins. Request yours today.",
  },
  "/careers": {
    primary: "digital marketing jobs in Mumbai",
    secondary: [
      "digital marketing careers Mumbai",
      "SEO jobs Mumbai",
      "performance marketing jobs Mumbai",
      "web developer jobs Mumbai",
    ],
    title: "Digital Marketing Jobs in Mumbai | Careers at F99 Solution",
    description:
      "Looking for digital marketing jobs in Mumbai? See current openings or send an open application to F99 Solution and grow with a team of specialists.",
  },
  "/privacy-policy": {
    primary: "privacy policy",
    secondary: ["data protection India", "cookie policy", "how we use your data"],
    title: "Privacy Policy | How F99 Solution Protects Your Data",
    description:
      "Read the F99 Solution privacy policy: what personal data we collect, how we use it, how cookies work and how to access or delete your information.",
  },
  "/terms": {
    primary: "terms and conditions",
    secondary: ["digital marketing agency terms", "service agreement India", "payment terms"],
    title: "Terms and Conditions | F99 Solution Digital Marketing",
    description:
      "Read the terms and conditions for working with F99 Solution: scope, fees in INR, GST, ad spend, ownership and cancellation. Contact us with any questions.",
  },
};

/** Service detail pages, keyed by service slug. */
export const serviceSeo: Record<string, PageSeo> = {
  seo: {
    primary: "SEO services in Mumbai",
    secondary: [
      "local SEO Mumbai",
      "technical SEO audit",
      "on-page SEO services India",
      "Google Business Profile optimisation",
      "SEO company India",
    ],
    title: "SEO Services in Mumbai | Get More Leads | F99 Solution",
    description:
      "SEO services in Mumbai covering technical, on-page and local SEO. Rank for searches that bring real enquiries, with monthly reports. Get a free SEO audit.",
  },
  "social-media-management": {
    primary: "social media marketing agency Mumbai",
    secondary: [
      "social media management services",
      "Instagram marketing agency",
      "LinkedIn marketing services India",
      "YouTube channel management",
    ],
    title: "Social Media Marketing Agency Mumbai | F99 Solution",
    description:
      "A social media marketing agency in Mumbai managing Instagram, Facebook, LinkedIn and YouTube. Strategy, content and reporting in one plan. Book a free call.",
  },
  "meta-ads": {
    primary: "Meta Ads agency India",
    secondary: [
      "Facebook ads agency Mumbai",
      "Instagram ads management",
      "Meta Ads management services",
      "lead generation ads India",
    ],
    title: "Meta Ads Agency India | Facebook Ads | F99 Solution",
    description:
      "Meta Ads agency in India for Facebook and Instagram campaigns built around cost per lead and ROAS, with accurate tracking. Request a free ad account audit.",
  },
  "google-ads": {
    primary: "Google Ads management services",
    secondary: [
      "Google Ads agency Mumbai",
      "PPC management India",
      "Performance Max campaigns",
      "YouTube ads agency India",
    ],
    title: "Google Ads Management Services | PPC Agency Mumbai",
    description:
      "Google Ads management services for Search, Display, YouTube and Performance Max. Cut wasted spend and win qualified leads. Get a free Google Ads audit.",
  },
  "website-design-development": {
    primary: "website development company Mumbai",
    secondary: [
      "website design services Mumbai",
      "business website development India",
      "Next.js website developer",
      "WordPress website development Mumbai",
    ],
    title: "Website Development Company in Mumbai | F99 Solution",
    description:
      "A website development company in Mumbai building fast, mobile-first websites designed to rank and convert. Fixed scope, clear timelines. Get a free quote.",
  },
  "full-stack-development": {
    primary: "full stack web application development India",
    secondary: [
      "custom web app development Mumbai",
      "React and Node.js developers India",
      "web portal development",
      "MVP development India",
    ],
    title: "Full Stack Web Application Development India | F99 Solution",
    description:
      "Full stack web application development in India: dashboards, portals and booking systems on React, Node.js and MongoDB. Share your idea for a free scoping call.",
  },
  "crm-automation": {
    primary: "CRM setup services",
    secondary: [
      "CRM implementation India",
      "HubSpot setup Mumbai",
      "sales automation services",
      "lead follow-up automation",
    ],
    title: "CRM Setup Services India | Lead Automation | F99 Solution",
    description:
      "CRM setup services that capture every lead, assign it and follow up automatically on email and WhatsApp. HubSpot, Zoho or custom. Book a free CRM consultation.",
  },
  "content-marketing": {
    primary: "content marketing services India",
    secondary: [
      "SEO content writing services",
      "blog writing services India",
      "copywriting agency Mumbai",
      "website copywriting services",
    ],
    title: "SEO Content Marketing Services India | F99 Solution",
    description:
      "Content marketing services in India: SEO articles, website copy, ad copy and email sequences written to rank and convert. Request a free content plan today.",
  },
  "video-editing-design": {
    primary: "reels video editing services India",
    secondary: [
      "video editing agency Mumbai",
      "social media graphic design",
      "Instagram reels editing",
      "YouTube video editing services",
    ],
    title: "Reels & Video Editing Services India | F99 Solution",
    description:
      "Reels and video editing services in India, plus social media graphic design. Scroll-stopping creatives, fast turnaround and two revision rounds. See samples.",
  },
  "branding-logo-design": {
    primary: "branding and logo design services in Mumbai",
    secondary: [
      "logo design company Mumbai",
      "brand identity design India",
      "brand guidelines design",
      "startup branding India",
    ],
    title: "Branding & Logo Design Services in Mumbai | F99 Solution",
    description:
      "Branding and logo design services in Mumbai: logo, colours, typography and brand guidelines that make your business look credible. Start your brand project.",
  },
  "email-marketing": {
    primary: "email marketing services India",
    secondary: [
      "email marketing automation",
      "Klaviyo agency India",
      "newsletter marketing services",
      "abandoned cart emails",
    ],
    title: "Email Marketing Services India | Automation | F99 Solution",
    description:
      "Email marketing services in India: welcome flows, abandoned-cart emails and newsletters that bring customers back. Built for deliverability. Get a free plan.",
  },
  "whatsapp-marketing": {
    primary: "WhatsApp marketing services India",
    secondary: [
      "WhatsApp Business API provider",
      "WhatsApp broadcast marketing",
      "WhatsApp chatbot for business",
      "click to WhatsApp ads",
    ],
    title: "WhatsApp Marketing Services in India | F99 Solution",
    description:
      "WhatsApp marketing services in India: official Business API setup, opt-in broadcasts, chatbots and click-to-WhatsApp ads. Talk to us about your use case.",
  },
  "influencer-marketing": {
    primary: "influencer marketing agency India",
    secondary: [
      "influencer marketing Mumbai",
      "Instagram influencer campaigns",
      "UGC creator marketing",
      "micro-influencer marketing India",
    ],
    title: "Influencer Marketing Agency in India | F99 Solution",
    description:
      "An influencer marketing agency in India that vets creators, manages briefs and tracks sales with codes and links. Plan your first campaign with a free call.",
  },
  "online-reputation-management": {
    primary: "online reputation management services India",
    secondary: [
      "review management services",
      "Google reviews management",
      "brand reputation monitoring",
      "ORM company Mumbai",
    ],
    title: "Online Reputation Management Services India | F99 Solution",
    description:
      "Online reputation management services in India: review monitoring, professional replies and ethical review requests. Protect your brand with a free audit.",
  },
  "landing-pages-funnels": {
    primary: "landing page design services India",
    secondary: [
      "sales funnel building services",
      "conversion rate optimisation India",
      "lead generation landing pages",
      "funnel builder agency Mumbai",
    ],
    title: "Landing Page Design Services in India | F99 Solution",
    description:
      "Landing page design services in India: focused pages and funnels built and tested to turn ad clicks into leads. Lower your cost per lead. Request a free review.",
  },
  "analytics-tracking": {
    primary: "Google Analytics 4 setup services",
    secondary: [
      "GA4 tracking setup India",
      "Meta Conversions API setup",
      "Google Tag Manager setup",
      "marketing analytics dashboard",
    ],
    title: "Google Analytics 4 Setup Services India | F99 Solution",
    description:
      "Google Analytics 4 setup services: GA4, Tag Manager, Meta Pixel and Conversions API configured and tested so your data is accurate. Book a free tracking audit.",
  },
  "ecommerce-marketing": {
    primary: "ecommerce marketing agency India",
    secondary: [
      "Shopify marketing services",
      "WooCommerce marketing",
      "Google Shopping ads India",
      "ecommerce growth agency Mumbai",
    ],
    title: "Ecommerce Marketing Agency India | Shopify & WooCommerce",
    description:
      "Ecommerce marketing agency in India for Shopify and WooCommerce stores: ads, product feeds, email and conversion work. Grow profitably. Get a free store audit.",
  },
};

/** Blog guides, keyed by post slug (the post's own frontmatter holds the on-page H1). */
export const blogSeo: Record<string, PageSeo> = {
  "meta-ads-vs-google-ads-india": {
    primary: "Meta Ads vs Google Ads India",
    secondary: [
      "Facebook ads vs Google Ads",
      "which is better for small business",
      "Meta Ads for Indian businesses",
      "Google Ads for lead generation",
    ],
    title: "Meta Ads vs Google Ads India: Which Wins? | F99 Solution",
    description:
      "Meta Ads vs Google Ads for Indian businesses: how intent, budgets, costs and creative differ, and which fits your goal. Read our guide, then get a free audit.",
  },
  "local-seo-mumbai-guide": {
    primary: "local SEO for Mumbai businesses",
    secondary: [
      "local SEO Mumbai",
      "Google Business Profile optimisation",
      "Google Map Pack ranking",
      "local citations India",
    ],
    title: "Local SEO for Mumbai Businesses: Guide | F99 Solution",
    description:
      "A complete local SEO guide for Mumbai businesses: Google Business Profile, citations, reviews and location pages. Follow the steps and request a free audit.",
  },
  "digital-marketing-cost-india": {
    primary: "digital marketing cost in India",
    secondary: [
      "digital marketing pricing India",
      "SEO cost in India",
      "Meta Ads management fees",
      "digital marketing agency fees Mumbai",
    ],
    title: "Digital Marketing Cost in India: Pricing | F99 Solution",
    description:
      "What does digital marketing cost in India? A plain-language guide to agency fees, ad spend, SEO, social media and web budgets in INR. Plan yours with us.",
  },
};

/** Fallback keywords for the (sample) case-study pages. Each case study sets its own title/description. */
export const caseStudySeo = {
  primary: "digital marketing case study India",
  secondary: [
    "SEO case study",
    "Meta Ads case study",
    "Google Ads case study",
    "CRM automation results",
  ],
};
