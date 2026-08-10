// Shared by categorySwatch.ts (manufacturer/supplier categories) and
// collectionSwatch.ts (retail collection categories) — both build a small
// repeating SVG pattern layered over a gradient, keyed off a slug so the
// same item always gets the same variant.
export function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function svgUrl(svg: string): string {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
