/**
 * Open roles. Leave the array EMPTY when you are not hiring — the page then shows an
 * "open application" message. Add real roles like this:
 *
 *   { title: "Performance Marketing Executive", type: "Full-time", location: "Mumbai",
 *     summary: "Manage Meta and Google Ads accounts for D2C and service clients.",
 *     requirements: ["1+ years running paid campaigns", "Strong Excel / reporting skills"] }
 */
export interface Role {
  title: string;
  type: "Full-time" | "Part-time" | "Internship" | "Freelance";
  location: string;
  summary: string;
  requirements: string[];
}

export const openRoles: Role[] = [];

export const careerValues = [
  {
    title: "Learn on real work",
    text: "Work on live campaigns, websites and automations from your first month.",
  },
  {
    title: "Direct access to senior specialists",
    text: "A focused team means fast feedback, clear ownership and no layers of management.",
  },
  {
    title: "Marketing + technology",
    text: "Grow across ads, SEO, design and development instead of being boxed into one tool.",
  },
];
