import { siteConfig } from "@/config/site";
import type { Service } from "@/data/services";
import type { PostMeta } from "@/lib/blog";

/** Absolute URL for a site path. */
export const absoluteUrl = (path = "/"): string =>
  `${siteConfig.url.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;

type JsonLd = Record<string, unknown>;

const orgId = () => `${absoluteUrl("/")}#organization`;
const founderId = () => `${absoluteUrl("/about")}#founder`;

/** The company entity. Deliberately has NO person details: the founder is linked on the About page only. */
export function organizationSchema(): JsonLd {
  const { contact, social } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId(),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/f99-mark-1024.png"),
    description: siteConfig.description,
    email: contact.email,
    telephone: contact.phoneSchema,
    sameAs: Object.values(social),
  };
}

/**
 * About page only: the same Organization (same @id) gains a `founder`, and the founder is described
 * as a Person who works for it, so search engines connect the two entities.
 */
export function aboutPageSchemas(): JsonLd[] {
  const { founder } = siteConfig;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": orgId(),
      name: siteConfig.name,
      url: absoluteUrl("/"),
      founder: { "@id": founderId() },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": founderId(),
      name: founder.name,
      jobTitle: founder.title,
      url: absoluteUrl("/about"),
      ...(founder.photo ? { image: absoluteUrl(founder.photo) } : {}),
      alumniOf: { "@type": "CollegeOrUniversity", name: founder.university },
      knowsAbout: [
        "Digital marketing",
        "Performance advertising",
        "Meta Ads",
        "Google Ads",
        "CRM automation",
        "Full-stack web development",
      ],
      worksFor: { "@type": "Organization", "@id": orgId(), name: siteConfig.name },
    },
  ];
}

/** Local business / professional service entity (address, hours and areas served). */
export function localBusinessSchema(): JsonLd {
  const { contact, areasServed } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${absoluteUrl("/")}#localbusiness`,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    image: absoluteUrl("/opengraph-image"),
    description: siteConfig.description,
    telephone: contact.phoneSchema,
    email: contact.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: "IN",
    },
    areaServed: [
      ...areasServed.map((a) => ({ "@type": a.type, name: a.name })),
      "Clients outside India (remote)",
    ],
    openingHoursSpecification: contact.hoursSpec.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    parentOrganization: { "@id": orgId() },
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    publisher: { "@id": orgId() },
  };
}

export function serviceSchema(service: Service): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.intro,
    serviceType: service.title,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": orgId() },
    areaServed: siteConfig.areasServed.map((a) => ({ "@type": a.type, name: a.name })),
  };
}

export function faqSchema(items: readonly { q: string; a: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

/** BlogPosting authored by the company (not a person), with real published/updated dates. */
export function blogPostingSchema(post: PostMeta): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    author: { "@type": "Organization", "@id": orgId(), name: siteConfig.name },
    publisher: { "@id": orgId() },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: absoluteUrl("/opengraph-image"),
    keywords: post.tags.join(", "),
    inLanguage: "en-IN",
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: absoluteUrl(t.path),
    })),
  };
}
