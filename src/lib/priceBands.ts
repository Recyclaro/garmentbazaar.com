// Wholesale price bands retailers can shop by. Bounds are per unit, in
// paise; `max` is exclusive. Keys are used in ?price= on /collections.
export interface PriceBand {
  key: string;
  label: string;
  short: string;
  min: number;
  max: number | null;
}

export const priceBands: PriceBand[] = [
  { key: "under-500", label: "Under ₹500", short: "Under ₹500", min: 0, max: 50000 },
  { key: "500-1000", label: "₹500 – ₹1,000", short: "₹500–1K", min: 50000, max: 100000 },
  { key: "1000-2000", label: "₹1,000 – ₹2,000", short: "₹1K–2K", min: 100000, max: 200000 },
  { key: "2000-plus", label: "₹2,000 and up", short: "₹2K+", min: 200000, max: null },
];

export function inBand(pricePaise: number, band: PriceBand): boolean {
  return pricePaise >= band.min && (band.max === null || pricePaise < band.max);
}
