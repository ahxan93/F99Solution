/**
 * Editable homepage content.
 * IMPORTANT: everything marked SAMPLE is placeholder content, NOT real clients,
 * results or reviews. Replace with real, verifiable data before launch.
 */

// SAMPLE client logos — fictional names, shown as text wordmarks.
export const trustedBy: string[] = [
  "Northwind Retail",
  "BluePeak Realty",
  "Urban Bloom",
  "Medico Clinics",
  "StackLoop",
  "Spice Route Foods",
  "Zenith Academy",
  "Orbit Fitness",
];

import { services } from "./services";

// Stats — SAMPLE numbers (except the services count, which is real). Replace with your real aggregate results.
export interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}
export const stats: Stat[] = [
  { value: services.length, suffix: "", label: "Specialised services under one roof" },
  { value: 50, suffix: "+", label: "Campaigns launched (sample)" },
  { value: 3.5, suffix: "x", label: "Average ROAS target (sample)" },
  { value: 98, suffix: "%", label: "Client retention goal (sample)" },
];

export const whyUs = [
  {
    icon: "target",
    title: "Revenue-first thinking",
    text: "We tie every rupee of spend to leads, sales and ROAS — not vanity metrics like likes and impressions.",
  },
  {
    icon: "code",
    title: "Marketing + engineering under one roof",
    text: "Our marketers and developers work side by side, so the websites, tracking, CRM and automations that most agencies outsource are built in-house.",
  },
  {
    icon: "chart",
    title: "Transparent reporting",
    text: "Live dashboards and a monthly review in plain language. You always know what is working and why.",
  },
  {
    icon: "users",
    title: "A team of specialists, one point of contact",
    text: "Specialists in SEO, ads, content and development work on your account, with one person to speak to. Fast replies, clear ownership.",
  },
  {
    icon: "shield",
    title: "No lock-in contracts",
    text: "We earn renewals through results. Month-to-month engagements with clear exit terms.",
  },
  {
    icon: "workflow",
    title: "Built to scale",
    text: "Repeatable systems — tracking, funnels, follow-ups — so growth does not depend on guesswork.",
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    text: "Audit your brand, funnel, competitors and data to find the biggest opportunities.",
  },
  {
    step: "02",
    title: "Strategy",
    text: "A channel mix, budget plan and KPI roadmap matched to your goals and margins.",
  },
  {
    step: "03",
    title: "Execute",
    text: "Creative, campaigns, content and tech go live — with tracking verified from day one.",
  },
  {
    step: "04",
    title: "Optimize",
    text: "Weekly testing on audiences, creatives, pages and bids to compound performance.",
  },
  {
    step: "05",
    title: "Report",
    text: "Clear monthly reporting with insights, learnings and the next 30-day plan.",
  },
] as const;

// SAMPLE testimonials — fictional people. Never present as real reviews.
export const testimonials = [
  {
    quote:
      "SAMPLE: The team rebuilt our ad account from scratch and our cost per lead dropped within the first month. Reporting was refreshingly clear.",
    name: "Sample Client A",
    role: "Owner, Sample Retail Brand",
  },
  {
    quote:
      "SAMPLE: Having marketing and development in one place meant our new website, tracking and CRM all worked together from day one.",
    name: "Sample Client B",
    role: "Marketing Head, Sample Services Co.",
  },
  {
    quote:
      "SAMPLE: Responsive, honest and genuinely invested in our numbers. We finally understand where every enquiry comes from.",
    name: "Sample Client C",
    role: "Director, Sample Clinic Group",
  },
] as const;

export const homeFaqs = [
  {
    q: "How soon will I see results?",
    a: "Paid ads can produce data and leads within the first 2–4 weeks. SEO is a compounding channel — expect early movement in 8–12 weeks and strong results over 4–6 months. We set realistic timelines for your market up front.",
  },
  {
    q: "Do you work with small businesses and startups?",
    a: "Yes. Our packages start at a level suited to growing businesses, and we scale scope as your revenue grows. We will tell you honestly if a channel is not worth your budget yet.",
  },
  {
    q: "Is ad spend included in your fees?",
    a: "No. Ad spend is paid directly by you to Meta or Google from your own ad account, so you keep full control and visibility. Our fee covers strategy, setup, creative direction, management and reporting.",
  },
  {
    q: "Do I own my accounts, website and data?",
    a: "Always. Ad accounts, analytics, domains and websites are set up in your name. If we ever part ways, everything stays with you.",
  },
  {
    q: "Do you serve clients outside Mumbai or India?",
    a: "Yes. We are based in Mumbai and work with clients across India and abroad, using video calls, shared dashboards and WhatsApp for fast communication.",
  },
  {
    q: "What does the free audit include?",
    a: "A review of your website, SEO basics, ad and tracking setup, and a short list of quick wins you can act on — with no obligation.",
  },
] as const;
