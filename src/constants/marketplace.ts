export const MARKETPLACE_CATEGORIES = [
  "All",
  "Trading Cards",
  "Funko Pop",
  "Coins",
  "Comics",
  "Action Figures",
  "Lego",
] as const;

export const MARKETPLACE_CONDITIONS = [
  "All",
  "New",
  "Like New",
  "Good",
  "Fair",
] as const;

export const MARKETPLACE_SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-low-high" },
  { label: "Price: High to Low", value: "price-high-low" },
] as const;
export type MarketplaceCategory = typeof MARKETPLACE_CATEGORIES[number];
export type MarketplaceCondition = typeof MARKETPLACE_CONDITIONS[number];
export type MarketplaceSortValue = typeof MARKETPLACE_SORT_OPTIONS[number]["value"];
