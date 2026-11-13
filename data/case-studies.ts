/**
 * SAMPLE CASE STUDIES — every client, number and result below is a fictional
 * placeholder. Replace with real, verified client work (and permission to
 * publish it) before launch. `serviceSlug` must match a slug in data/services.ts.
 */
export interface CaseResult {
  label: string;
  before: number;
  after: number;
  unit?: string;
  /** true when a LOWER number is the improvement (e.g. cost per lead). */
  lowerIsBetter?: boolean;
}

export interface CaseStudy {
  slug: string;
  /** <title> (50–60 chars incl. brand). Optional: a safe fallback is generated for admin-created studies. */
  seoTitle?: string;
  /** Meta description (140–160 chars). */
  seoDescription?: string;
  client: string;
  industry: string;
  serviceSlug: string;
  serviceLabel: string;
  title: string;
  summary: string;
  metric: string;
  metricLabel: string;
  duration: string;
  challenge: string;
  strategy: string[];
  results: CaseResult[];
  /** Monthly trend of the headline KPI for the line chart. */
  trend: { label: string; unit?: string; points: number[] };
}

const months = ["M1", "M2", "M3", "M4", "M5", "M6"];
export const trendMonths = months;

export const caseStudies: CaseStudy[] = [
  {
    slug: "sample-d2c-fashion-meta-ads",
    seoTitle: "Meta Ads Case Study (Sample): D2C Fashion | F99 Solution",
    seoDescription:
      "Sample Meta Ads case study for a D2C fashion brand: a funnel rebuild, creative testing and clean tracking lifted ROAS. See the strategy and results.",
    client: "Sample D2C Fashion Brand",
    industry: "E-commerce / Fashion",
    serviceSlug: "meta-ads",
    serviceLabel: "Meta Ads",
    title: "Scaled monthly revenue with a full-funnel Meta Ads system",
    summary: "A rebuilt Meta account with creative testing and retargeting lifted ROAS.",
    metric: "4.2x",
    metricLabel: "ROAS (sample)",
    duration: "6 months",
    challenge:
      "The brand was spending on boosted posts with no clear funnel, inconsistent tracking and a rising cost per purchase. Scaling spend simply made results worse.",
    strategy: [
      "Rebuilt the account into prospecting, retargeting and retention campaigns.",
      "Fixed Meta Pixel and Conversions API so purchases were tracked accurately.",
      "Ran a weekly creative testing programme across hooks, formats and offers.",
      "Scaled budgets gradually on ad sets that held target ROAS.",
    ],
    results: [
      { label: "ROAS", before: 1.6, after: 4.2, unit: "x" },
      { label: "Cost per purchase", before: 920, after: 540, unit: "₹", lowerIsBetter: true },
      { label: "Monthly purchases", before: 140, after: 410 },
    ],
    trend: { label: "ROAS", unit: "x", points: [1.6, 2.1, 2.8, 3.4, 3.9, 4.2] },
  },
  {
    slug: "sample-local-clinic-seo",
    seoTitle: "Local SEO Case Study (Sample): Clinic Group | F99 Solution",
    seoDescription:
      "Sample local SEO case study for a Mumbai clinic group: Google Business Profile work, location pages and reviews that grew organic leads. See the full strategy.",
    client: "Sample Multi-Clinic Group",
    industry: "Healthcare",
    serviceSlug: "seo",
    serviceLabel: "Local SEO",
    title: "Dominated the Google Map Pack across five Mumbai localities",
    summary: "Local SEO and Google Business Profile work grew organic appointment requests.",
    metric: "+312%",
    metricLabel: "Organic leads (sample)",
    duration: "8 months",
    challenge:
      "Despite good reviews, the clinics were invisible for 'near me' searches. Profiles were incomplete, location pages thin and listings inconsistent.",
    strategy: [
      "Optimised every Google Business Profile with services, photos and posts.",
      "Created unique, locality-specific landing pages with schema markup.",
      "Cleaned and standardised citations across major directories.",
      "Introduced a review-request workflow after every appointment.",
    ],
    results: [
      { label: "Organic leads / month", before: 38, after: 157 },
      { label: "Map Pack top-3 keywords", before: 6, after: 41 },
      { label: "Profile calls / month", before: 90, after: 310 },
    ],
    trend: { label: "Organic leads", points: [38, 52, 79, 104, 131, 157] },
  },
  {
    slug: "sample-b2b-saas-crm",
    seoTitle: "CRM Automation Case Study (Sample): B2B | F99 Solution",
    seoDescription:
      "Sample CRM automation case study for a B2B software firm: one pipeline, instant replies and smart assignment cut cost per qualified lead. See the results.",
    client: "Sample B2B Software Company",
    industry: "B2B / Software",
    serviceSlug: "crm-automation",
    serviceLabel: "CRM Automation",
    title: "Automated lead follow-up and cut response time to minutes",
    summary: "A connected CRM and automation stack stopped leads going cold.",
    metric: "-68%",
    metricLabel: "Cost per qualified lead (sample)",
    duration: "4 months",
    challenge:
      "Leads from ads, the website and WhatsApp landed in different places. Follow-up took days, and the sales team had no view of the pipeline.",
    strategy: [
      "Centralised every lead source into one CRM pipeline.",
      "Built instant email and WhatsApp acknowledgements with booking links.",
      "Added lead scoring and automatic assignment to the right salesperson.",
      "Created dashboards for pipeline value and response time.",
    ],
    results: [
      {
        label: "Cost per qualified lead",
        before: 3200,
        after: 1020,
        unit: "₹",
        lowerIsBetter: true,
      },
      { label: "First response time (min)", before: 1440, after: 8, lowerIsBetter: true },
      { label: "Demo bookings / month", before: 12, after: 41 },
    ],
    trend: { label: "Demo bookings", points: [12, 17, 24, 31, 37, 41] },
  },
  {
    slug: "sample-real-estate-google-ads",
    seoTitle: "Google Ads Case Study (Sample): Real Estate | F99 Solution",
    seoDescription:
      "Sample Google Ads case study for a real estate developer: intent keywords, call tracking and a focused landing page cut cost per site visit. Read more.",
    client: "Sample Real Estate Developer",
    industry: "Real Estate",
    serviceSlug: "google-ads",
    serviceLabel: "Google Ads",
    title: "Lowered cost per site-visit with intent-led Google Ads",
    summary: "Search campaigns and call tracking focused spend on buyers ready to visit.",
    metric: "-44%",
    metricLabel: "Cost per site visit (sample)",
    duration: "5 months",
    challenge:
      "Broad keywords were attracting browsers and rental seekers. Leads were plentiful but few turned into site visits.",
    strategy: [
      "Restructured campaigns around high-intent, location-specific keywords.",
      "Added aggressive negative keyword lists and audience exclusions.",
      "Introduced call tracking and offline conversion import from the CRM.",
      "Built a fast project landing page with a clear visit-booking form.",
    ],
    results: [
      { label: "Cost per site visit", before: 4800, after: 2690, unit: "₹", lowerIsBetter: true },
      { label: "Site visits / month", before: 21, after: 58 },
      { label: "Lead quality score (1-10)", before: 4, after: 7.5 },
    ],
    trend: { label: "Site visits", points: [21, 27, 36, 44, 52, 58] },
  },
  {
    slug: "sample-restaurant-social-media",
    seoTitle: "Social Media Case Study (Sample): Cafes | F99 Solution",
    seoDescription:
      "Sample social media case study for a cafe chain: a reels-first content plan and active community management grew reach and walk-ins. See how it worked.",
    client: "Sample Cafe & Restaurant Chain",
    industry: "Food & Beverage",
    serviceSlug: "social-media-management",
    serviceLabel: "Social Media",
    title: "Built a loyal local audience with a reels-first content plan",
    summary: "Consistent reels and community management grew reach and walk-ins.",
    metric: "5.6x",
    metricLabel: "Monthly reach (sample)",
    duration: "6 months",
    challenge:
      "Posting was irregular and generic. The outlets had followers but little engagement and no way to link social activity to footfall.",
    strategy: [
      "Defined content pillars: menu stories, behind the scenes, offers and customers.",
      "Produced four reels and twelve posts every month with a fixed schedule.",
      "Used location tags, collaborations and a story-based offer code.",
      "Tracked walk-ins through redeemable social offers.",
    ],
    results: [
      { label: "Monthly reach (thousands)", before: 18, after: 101 },
      { label: "Profile visits / month", before: 1200, after: 6400 },
      { label: "Offer redemptions / month", before: 0, after: 220 },
    ],
    trend: { label: "Reach (thousands)", points: [18, 29, 47, 66, 88, 101] },
  },
  {
    slug: "sample-coaching-website-funnel",
    seoTitle: "Landing Page Funnel Case Study (Sample) | F99 Solution",
    seoDescription:
      "Sample landing page and funnel case study for a coaching business: a focused page, fast follow-up and A/B tests raised webinar sign-ups. Read the story.",
    client: "Sample Online Coaching Business",
    industry: "Education",
    serviceSlug: "landing-pages-funnels",
    serviceLabel: "Landing Pages & Funnels",
    title: "Doubled webinar sign-ups with a rebuilt landing page and funnel",
    summary: "A focused landing page and email nurture sequence lifted registrations.",
    metric: "2.3x",
    metricLabel: "Landing-page conversion (sample)",
    duration: "3 months",
    challenge:
      "Paid traffic was sent to a cluttered homepage. Visitors wandered, few registered and there was no follow-up for those who did not attend.",
    strategy: [
      "Designed a single-goal landing page with a clear promise and social proof.",
      "Added a short registration form and instant WhatsApp/email confirmation.",
      "Built a reminder and replay email sequence.",
      "Ran A/B tests on headline, form length and call-to-action.",
    ],
    results: [
      { label: "Landing-page conversion", before: 14, after: 32, unit: "%" },
      { label: "Cost per registration", before: 410, after: 190, unit: "₹", lowerIsBetter: true },
      { label: "Attendance rate", before: 22, after: 41, unit: "%" },
    ],
    trend: { label: "Conversion rate", unit: "%", points: [14, 18, 23, 27, 30, 32] },
  },
];

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug);
