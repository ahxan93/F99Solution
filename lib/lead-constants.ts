/** Lead enums shared by the API, Mongoose models and the admin UI (no server-only imports). */

export const leadStatuses = ["new", "contacted", "proposal-sent", "won", "lost"] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export const leadStatusLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  "proposal-sent": "Proposal Sent",
  won: "Won",
  lost: "Lost",
};

export const budgetRanges = [
  "Under ₹15,000 / month",
  "₹15,000 – ₹35,000 / month",
  "₹35,000 – ₹75,000 / month",
  "₹75,000+ / month",
  "One-time project (web / app / CRM)",
  "Not sure yet",
] as const;
