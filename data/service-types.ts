export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ProcessStep {
  title: string;
  text: string;
}

/** Extra, buyer-useful sections that bring a page to its target length without padding. */
export interface ServiceExtra {
  /** "How we approach {topic}": one short paragraph. */
  approach: string;
  /** "Common mistakes we fix": 4 bullets. */
  mistakes: string[];
  /** "What we measure": 5 bullets. */
  measure: string[];
  /** "What we need from you": 4 bullets. */
  prepare: string[];
  /** An eighth FAQ appended to the service's own seven. */
  extraFaq: ServiceFaq;
}

/**
 * Long-form content for one service page. Written for people first: plain language, no guarantees,
 * no invented client names or numbers. Each service targets roughly 900–1,300 words on the page.
 */
export interface ServiceContent {
  /** The page's single H1. Must contain the primary keyword (see data/seo-keywords.ts). */
  h1: string;
  /** ~40–60 words under the H1; contains the primary keyword within the first 100 words of the page. */
  intro: string;
  /** Natural noun phrase used in H2s, e.g. "search engine optimisation (SEO)". */
  topic: string;
  /** "What is {topic}?" paragraphs. */
  what: string[];
  /** "Who needs {topic}?" bullets. */
  whoFor: string[];
  /** "What's included" bullets. */
  includes: string[];
  /** Our process, 4–5 steps. */
  process: ProcessStep[];
  deliverables: string[];
  tools: string[];
  /** "What affects the cost" bullets (never a fake price). */
  costFactors: string[];
  /** "What results to expect" paragraphs: realistic, no guarantees. */
  results: string[];
  /** 6–8 questions modelled on real "People Also Ask" searches. */
  faqs: ServiceFaq[];
  /** 2–3 related service slugs, linked with descriptive anchor text. */
  related: string[];
  /** Slug of the most relevant blog guide. */
  blog: string;
}
