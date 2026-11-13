/**
 * Single source of truth for brand + contact details.
 * Edit the values below — every page, the footer and JSON-LD read from here.
 * PLACEHOLDER values are marked; replace them before going live.
 */
export const siteConfig = {
  name: "F99 Solution",
  shortName: "F99 Solution",
  legalName: "F99 Solution",
  /** Short text mark shown in the logo square, favicon and social image. */
  logoMark: "F99",
  tagline: "Growth marketing, design & technology for ambitious brands.",
  description:
    "F99 Solution is a Mumbai-based digital marketing agency delivering SEO, performance ads, social media, web development and CRM automation that turn attention into revenue.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_IN",
  currency: "INR",
  currencySymbol: "₹",

  /** Team name used to sign emails and as the blog author. */
  teamName: "Team F99 Solution",
  blogAuthor: "F99 Solution Team",

  /**
   * Founder details. These are shown ONLY on the About page (and in its Person schema) —
   * everywhere else the site speaks as the company ("we", "our team").
   */
  founder: {
    name: "Ahsan",
    title: "Founder & Director",
    qualification: "MCA, University of Mumbai",
    university: "University of Mumbai",
    experienceYears: 4,
    /** Founder photo in /public (824x440 WebP, pre-optimised from the PNG next to it). */
    photo: "/images/founder/ahsan-founder-director-f99-solution.webp",
    photoWidth: 824,
    photoHeight: 440,
    photoAlt: "Ahsan, Founder & Director of F99 Solution, speaking at an event",
    photoCaption: "Ahsan, Founder & Director",
  },

  /** Areas we serve — used by the "Areas we serve" section and the LocalBusiness schema. */
  areasServed: [
    { name: "Mumbai", type: "City" },
    { name: "Thane", type: "City" },
    { name: "Navi Mumbai", type: "City" },
    { name: "Pune", type: "City" },
    { name: "India", type: "Country" },
  ] as const,

  contact: {
    phone: "+91 77386 34231",
    phoneHref: "+917738634231", // digits only, with country code (tel: link)
    phoneSchema: "+91-7738634231", // E.164-style format for JSON-LD telephone
    email: "hello@f99solution.com", // PLACEHOLDER
    whatsappNumber: "917738634231", // wa.me format, no + or spaces
    whatsappMessage: "Hi F99 Solution, I'd like to know more about your services",
    address: {
      street: "Office No. 000, Sample Business Hub", // PLACEHOLDER
      city: "Mumbai",
      region: "Maharashtra",
      postalCode: "400001", // PLACEHOLDER
      country: "India",
    },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Mumbai%2C+Maharashtra",
    /** Machine-readable hours for schema.org. KEEP IN SYNC with `hours` below. */
    hoursSpec: [
      {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "19:00",
      },
      { days: ["Saturday"], opens: "10:00", closes: "15:00" },
    ],
    hours: [
      { days: "Monday – Friday", time: "10:00 AM – 7:00 PM" },
      { days: "Saturday", time: "10:00 AM – 3:00 PM" },
      { days: "Sunday", time: "Closed" },
    ],
  },

  social: {
    instagram: "https://instagram.com/", // PLACEHOLDER
    facebook: "https://facebook.com/", // PLACEHOLDER
    linkedin: "https://linkedin.com/", // PLACEHOLDER
    youtube: "https://youtube.com/", // PLACEHOLDER
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const whatsappLink = (message: string = siteConfig.contact.whatsappMessage): string =>
  `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
