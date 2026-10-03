// Choices for the stock advisor form, shared by the server and the browser.

export const regions = {
  north: "North India",
  south: "South India",
  east: "East India",
  west: "West India",
  central: "Central India",
  northeast: "North-East India",
} as const;
export type Region = keyof typeof regions;

export const shopTypes = {
  family: "Multi-brand family store",
  women: "Women's boutique",
  ethnic: "Ethnic & occasion wear",
  men: "Menswear store",
  kids: "Kidswear store",
  footwear: "Footwear & accessories",
  online: "Online seller",
} as const;
export type ShopType = keyof typeof shopTypes;

export const seasons = {
  festive: "Festive season (Diwali, Durga Puja)",
  wedding: "Wedding season",
  winter: "Winter",
  summer: "Summer",
  monsoon: "Monsoon",
  school: "School reopening",
} as const;
export type Season = keyof typeof seasons;
