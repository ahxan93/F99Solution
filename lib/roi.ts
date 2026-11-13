export interface RoiInputs {
  budget: number; // ₹ ad spend
  cpc: number; // ₹ cost per click
  conversionRate: number; // % of clicks that become leads
  closeRate: number; // % of leads that become paying customers
  orderValue: number; // ₹ average order value
}

export interface RoiResults {
  clicks: number;
  leads: number;
  sales: number;
  revenue: number;
  roas: number;
  costPerLead: number;
  costPerSale: number;
}

const safeDiv = (a: number, b: number): number => (b > 0 && Number.isFinite(a / b) ? a / b : 0);

/** Pure calculation so it can be tested and reused on the server. */
export function calculateRoi(i: RoiInputs): RoiResults {
  const clicks = safeDiv(i.budget, i.cpc);
  const leads = clicks * (i.conversionRate / 100);
  const sales = leads * (i.closeRate / 100);
  const revenue = sales * i.orderValue;
  return {
    clicks,
    leads,
    sales,
    revenue,
    roas: safeDiv(revenue, i.budget),
    costPerLead: safeDiv(i.budget, leads),
    costPerSale: safeDiv(i.budget, sales),
  };
}
