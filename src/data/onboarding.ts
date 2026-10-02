// Choices shown in the onboarding wizard. The server action accepts only
// these values.
export const storeTypes = [
  "Boutique",
  "Multi-brand store",
  "Retail chain",
  "Online seller",
  "Export buyer",
] as const;

export const budgets = ["Under ₹50K", "₹50K – ₹2L", "₹2L – ₹5L", "₹5L+"] as const;

export const moqs = ["Under 20", "20 – 50", "50 – 100", "100+"] as const;

export const channels = [
  "Own stores",
  "Retailers / distributors",
  "Online marketplaces",
  "Own website",
  "Exports",
] as const;
