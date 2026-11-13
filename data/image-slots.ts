/**
 * Every image slot on the site: the exact file to put in /public/images/, its size, alt text and
 * the AI prompt to generate it. One consistent style (see STYLE below).
 *
 * How it works: the site reads these file names from public/images/. A slot whose file is not
 * there yet shows a branded illustration instead, so nothing is ever broken. Generate the image,
 * save it under the exact file name, rebuild: it appears. `npm run images:prompts` writes every
 * paste-ready prompt to docs/image-prompts.md.
 */

export type SlotSize = "card" | "wide";

export interface ImageSlot {
  /** Used in code, e.g. `<SlotImage slot="seo-card" />`. */
  key: string;
  /** Exact file name inside public/images/. */
  file: string;
  /** card = 1536x1024 (cards, side images); wide = 2400x1600 (page backgrounds, banners). All 3:2. */
  size: SlotSize;
  alt: string;
  /** Short (2-5 word) Pexels photo search query used by scripts/fetch-images.ts. */
  query: string;
  /** Device the hands use. */
  device: string;
  /** What the hands are doing + camera angle. */
  scene: string;
  /** Generic holographic icons floating above the device (no brand logos). */
  icons: string;
}

export const SLOT_PIXELS: Record<SlotSize, string> = {
  card: "1536 x 1024",
  wide: "2400 x 1600",
};

/** Shared style: appended to every prompt so all images look like one set. */
export const STYLE =
  "Realistic stock-photo style close-up of real human hands (no faces visible). " +
  "Floating, semi-transparent holographic digital icons and UI elements hover above the device. " +
  "Soft, neutral, slightly blurred modern office background, natural daylight from a window, shallow depth of field. " +
  "Clean, modern, professional look, landscape 3:2 aspect ratio, sharp focus on the hands and device. " +
  "Use generic icons only. Do NOT include any real brand logos (no Meta, WhatsApp, Instagram, Google or other logos). " +
  "No text, letters, numbers or watermarks anywhere in the image.";

export function buildPrompt(s: ImageSlot): string {
  return `${s.scene}, using a ${s.device}. Floating holographic icons above the ${s.device}: ${s.icons}. ${STYLE}`;
}

const CLOSE = "Close-up, front-on view of hands";
const WIDE =
  "Wide composition with the hands and device placed in the right third of the frame and soft empty space on the left for text overlay; hands";
const TOP = "Top-down overhead view of hands";

interface ServiceDef {
  slug: string;
  label: string;
  device: string;
  action: string;
  icons: string;
  /** Short alt phrase for what the icons show. */
  topic: string;
  /** Pexels photo search queries for [card, hero, support]; each slot needs its own (photos are used once). */
  queries: [string, string, string];
}

const services: ServiceDef[] = [
  {
    slug: "seo",
    label: "SEO",
    device: "laptop",
    action: "typing",
    icons:
      "a magnifying glass, a rising bar chart, a ranking podium with a star, a location pin, an upward arrow",
    topic: "search and ranking",
    queries: ["laptop seo analytics", "search engine ranking screen", "keyword research notebook desk"],
  },
  {
    slug: "meta-ads",
    label: "Meta Ads",
    device: "smartphone",
    action: "holding it and scrolling a social feed",
    icons: "hearts, thumbs-up, chat bubbles, share arrows, a notification bell, a target",
    topic: "likes and ad targeting",
    queries: ["smartphone social media", "social media advertising phone", "scrolling social feed phone"],
  },
  {
    slug: "google-ads",
    label: "Google Ads",
    device: "laptop",
    action: "typing a search",
    icons: "a magnifying glass, a cursor click, a target, a coin, a rising line chart",
    topic: "search ads and clicks",
    queries: ["online advertising laptop", "search results screen", "pay per click dashboard"],
  },
  {
    slug: "landing-pages-funnels",
    label: "Landing page and funnel",
    device: "tablet",
    action: "sketching a page wireframe with a finger",
    icons: "a funnel, a browser window, a cursor click, a checkmark, a button shape",
    topic: "funnel and conversion",
    queries: ["website wireframe sketch", "ux design wireframe paper", "conversion funnel whiteboard"],
  },
  {
    slug: "analytics-tracking",
    label: "Analytics and tracking",
    device: "laptop",
    action: "pointing at the screen",
    icons: "a pie chart, a line graph, bar charts, a gauge, dashboard tiles",
    topic: "data charts",
    queries: ["analytics dashboard laptop", "data charts screen", "business graphs tablet"],
  },
  {
    slug: "ecommerce-marketing",
    label: "E-commerce marketing",
    device: "smartphone",
    action: "holding it with a small parcel box on the desk",
    icons: "a shopping cart, a parcel box, a credit card, a price tag, a five-star rating",
    topic: "shopping and sales",
    queries: ["online shopping smartphone", "ecommerce parcel packing", "small online store"],
  },
  {
    slug: "social-media-management",
    label: "Social media management",
    device: "smartphone",
    action: "holding it to film a flat-lay of products on a desk",
    icons: "hearts, a play button, chat bubbles, a hashtag symbol, a calendar",
    topic: "posts and engagement",
    queries: ["social media content planning", "flat lay products phone", "content calendar desk"],
  },
  {
    slug: "content-marketing",
    label: "Content marketing",
    device: "laptop",
    action: "writing with a notebook and pen beside it",
    icons: "document pages, a pen, a lightbulb, speech bubbles, a bookmark",
    topic: "articles and ideas",
    queries: ["writing laptop notebook", "content writer desk", "blogging coffee laptop"],
  },
  {
    slug: "video-editing-design",
    label: "Video editing",
    device: "laptop",
    action: "using a mouse on a video editing timeline",
    icons: "a play button, a film strip, scissors, a clock timeline, a colour wheel",
    topic: "video editing",
    queries: ["video editing timeline", "video editor monitor", "filmmaker editing desk"],
  },
  {
    slug: "email-marketing",
    label: "Email marketing",
    device: "laptop",
    action: "typing",
    icons: "envelopes, a paper plane, an inbox tray, a notification badge, a checkmark",
    topic: "email campaigns",
    queries: ["email inbox laptop", "newsletter writing laptop", "typing email desk"],
  },
  {
    slug: "whatsapp-marketing",
    label: "WhatsApp marketing",
    device: "smartphone",
    action: "typing a message with both thumbs",
    icons: "chat bubbles, a paper plane, double checkmarks, a bell, a phone receiver",
    topic: "chat messaging",
    queries: ["messaging app smartphone", "texting phone hands", "chat conversation phone"],
  },
  {
    slug: "website-design-development",
    label: "Website design and development",
    device: "laptop",
    action: "typing with a tablet showing a layout beside it",
    icons: "a browser window, code brackets, a layout grid, a cursor, a gear",
    topic: "web design and code",
    queries: ["web design laptop tablet", "responsive website design", "designer working website"],
  },
  {
    slug: "full-stack-development",
    label: "Full-stack development",
    device: "laptop",
    action: "typing code",
    icons: "code brackets, a database cylinder, a gear, a cloud, a terminal prompt symbol",
    topic: "code and databases",
    queries: ["programmer coding laptop", "code on screen", "software developer desk"],
  },
  {
    slug: "crm-automation",
    label: "CRM automation",
    device: "tablet",
    action: "tapping the screen",
    icons: "contact cards, a pipeline funnel, cycling automation arrows, a handshake, a bar chart",
    topic: "contacts and automation",
    queries: ["tablet business app", "customer management tablet", "workflow planning sticky notes"],
  },
  {
    slug: "branding-logo-design",
    label: "Branding and logo design",
    device: "tablet with a stylus",
    action: "drawing a shape with the stylus",
    icons: "a pen tool, a colour palette, a circle square and triangle, colour swatches, a grid",
    topic: "design shapes and colours",
    queries: ["graphic designer stylus tablet", "color palette design", "brand design sketch"],
  },
  {
    slug: "influencer-marketing",
    label: "Influencer marketing",
    device: "smartphone on a small gimbal",
    action: "holding the gimbal in front of a softly blurred ring light",
    icons: "a star, a heart, a play button, a follower icon, a camera",
    topic: "creator content",
    queries: ["content creator ring light", "smartphone gimbal filming", "vlogger setup"],
  },
  {
    slug: "online-reputation-management",
    label: "Online reputation management",
    device: "smartphone",
    action: "tapping a five-star rating",
    icons:
      "a star rating, a thumbs-up, a shield with a checkmark, a chat bubble with a heart, a trophy",
    topic: "reviews and trust",
    queries: ["five star review phone", "customer feedback rating", "customer satisfaction smartphone"],
  },
];

export const slotList: ImageSlot[] = [
  ...services.flatMap((s): ImageSlot[] => [
    {
      key: `${s.slug}-card`,
      query: s.queries[0],
      file: `service-${s.slug}.webp`,
      size: "card",
      alt: `Illustration of ${s.topic} on a ${s.device} with floating icons, representing ${s.label} services`,
      device: s.device,
      scene: `${CLOSE} ${s.action}`,
      icons: s.icons,
    },
    {
      key: `${s.slug}-hero`,
      query: s.queries[1],
      file: `service-${s.slug}-hero.webp`,
      size: "wide",
      alt: `Wide illustration of ${s.topic} on a ${s.device} with floating icons, representing ${s.label} for businesses`,
      device: s.device,
      scene: `${WIDE} ${s.action}`,
      icons: s.icons,
    },
    {
      key: `${s.slug}-support`,
      query: s.queries[2],
      file: `service-${s.slug}-support.webp`,
      size: "card",
      alt: `Illustration of a ${s.device} on a desk with ${s.topic} icons, representing ${s.label} work`,
      device: s.device,
      scene: `${TOP} ${s.action}, with a notebook and a coffee cup on a clean desk`,
      icons: s.icons,
    },
  ]),
  {
    key: "home-why-us",
    query: "team meeting tablet",
    file: "home-why-choose-us.webp",
    size: "wide",
    alt: "Illustration of a marketing strategy plan on a tablet with floating icons",
    device: "tablet",
    scene: `${TOP} of several people at a meeting table pointing at the tablet and sticky notes (no faces)`,
    icons: "a target, linked nodes, a rising bar chart, a lightbulb, a checklist",
  },
  {
    key: "home-process",
    query: "planning workflow sticky notes",
    file: "home-process.webp",
    size: "wide",
    alt: "Illustration of a step-by-step digital marketing process on a tablet",
    device: "tablet",
    scene: `${WIDE} sketching a step-by-step flow`,
    icons: "five connected step circles, arrows, a checklist, a calendar, a rocket",
  },
  {
    key: "home-cta",
    query: "laptop night city lights",
    file: "home-cta.webp",
    size: "wide",
    alt: "Illustration of a laptop with growth charts and floating icons on a dark blue background, representing growing a business online",
    device: "laptop",
    scene: `${WIDE} typing at dusk, with soft blue city lights blurred through a window behind (deep blue tones)`,
    icons: "a rocket, an upward growth arrow, a rising chart, a target, stars",
  },
  {
    key: "about-story",
    query: "colleagues laptops office",
    file: "about-team-at-work.webp",
    size: "card",
    alt: "Illustration of laptops with shared charts and floating icons, representing digital marketing teamwork",
    device: "laptop",
    scene: `${CLOSE} of two people working side by side (no faces)`,
    icons: "linked nodes, a bar chart, a lightbulb, chat bubbles, a gear",
  },
  {
    key: "about-team",
    query: "team planning meeting table",
    file: "about-team-planning.webp",
    size: "wide",
    alt: "Illustration of a marketing campaign plan with floating icons",
    device: "tablet",
    scene: `${WIDE} of three people planning together around a table (no faces)`,
    icons: "a puzzle piece, a calendar, a target, a speech bubble, an upward arrow",
  },
  {
    key: "contact-side",
    query: "customer support headset",
    file: "contact-customer-support.webp",
    size: "card",
    alt: "Illustration of a laptop and headset with chat icons, representing customer support",
    device: "laptop",
    scene: `${CLOSE} typing, with a headset resting beside the laptop`,
    icons: "chat bubbles, an envelope, a phone receiver, a clock, a smiling-face symbol",
  },
  {
    key: "blog-meta-vs-google",
    query: "comparing phone laptop screens",
    file: "blog-meta-ads-vs-google-ads-india.webp",
    size: "card",
    alt: "Illustration of a laptop and a smartphone side by side with chart icons, comparing Meta Ads and Google Ads results",
    device: "laptop with a smartphone beside it",
    scene: `${TOP} comparing two screens`,
    icons: "two bar charts side by side, hearts, a magnifying glass, a balance scale, a target",
  },
  {
    key: "blog-local-seo",
    query: "map pin smartphone city",
    file: "blog-local-seo-mumbai-guide.webp",
    size: "card",
    alt: "Illustration of a smartphone with floating map pin icons, representing local SEO",
    device: "smartphone",
    scene: `${CLOSE} holding it`,
    icons: "map pins, a storefront, a five-star rating, a magnifying glass, a compass",
  },
  {
    key: "blog-cost",
    query: "budget calculator laptop",
    file: "blog-digital-marketing-cost-india.webp",
    size: "card",
    alt: "Illustration of a laptop and calculator with floating budget icons, representing digital marketing cost",
    device: "laptop with a calculator beside it",
    scene: `${TOP} working out a budget`,
    icons: "coins, a rupee-style currency symbol, a pie chart, a price tag, a rising line chart",
  },
  {
    key: "case-d2c-fashion",
    query: "fashion boutique clothing rack",
    file: "case-d2c-fashion-meta-ads.webp",
    size: "card",
    alt: "Illustration of a tablet with floating shopping and heart icons, representing a D2C fashion Meta Ads case study",
    device: "tablet",
    scene: `${CLOSE} holding it, with a blurred clothing rail in the background`,
    icons: "a shopping bag, a clothes hanger, hearts, a price tag, an upward chart",
  },
  {
    key: "case-clinic",
    query: "clinic reception interior",
    file: "case-clinic-local-seo.webp",
    size: "card",
    alt: "Illustration of a laptop with floating map pin and care icons, representing a clinic local SEO case study",
    device: "laptop",
    scene: `${CLOSE} typing, with a softly blurred bright clinic reception behind`,
    icons: "a map pin, a medical cross, a calendar, a five-star rating, a phone receiver",
  },
  {
    key: "case-b2b-saas",
    query: "saas software dashboard",
    file: "case-b2b-saas-crm.webp",
    size: "card",
    alt: "Illustration of a laptop with floating pipeline and contact icons, representing a B2B SaaS CRM case study",
    device: "laptop",
    scene: `${CLOSE} using a trackpad`,
    icons: "a pipeline funnel, contact cards, cycling automation arrows, a handshake, a bar chart",
  },
  {
    key: "case-real-estate",
    query: "modern apartment interior",
    file: "case-real-estate-google-ads.webp",
    size: "card",
    alt: "Illustration of a tablet with floating house and search icons, representing a real estate Google Ads case study",
    device: "tablet",
    scene: `${CLOSE} holding it, with a softly blurred modern apartment interior behind`,
    icons: "a house, a key, a map pin, a magnifying glass, a rising chart",
  },
  {
    key: "case-restaurant",
    query: "cafe coffee table phone",
    file: "case-restaurant-social-media.webp",
    size: "card",
    alt: "Illustration of a smartphone with floating heart icons, representing a restaurant social media case study",
    device: "smartphone",
    scene: `${TOP} photographing a coffee and a plate on a cafe table`,
    icons: "hearts, a camera, a play button, chat bubbles, a fork and spoon",
  },
  {
    key: "case-coaching",
    query: "coach laptop notebook",
    file: "case-coaching-website-funnel.webp",
    size: "card",
    alt: "Illustration of a laptop with floating funnel and calendar icons, representing a coaching website funnel case study",
    device: "laptop",
    scene: `${CLOSE} typing, with a notebook beside it`,
    icons: "a funnel, a calendar, a video-call window, a checkmark, a graduation cap",
  },
];

export const imageSlots: Record<string, ImageSlot> = Object.fromEntries(
  slotList.map((s) => [s.key, s]),
);
