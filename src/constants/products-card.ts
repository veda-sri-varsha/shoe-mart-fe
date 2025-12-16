"use client";

export const badgeClassMap: Record<string, string> = {
  "best seller": "bg-blue-100 text-blue-700",
  "deal of day": "bg-orange-200 text-orange-700",
  new: "bg-green-100 text-green-700",
};


export const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-low-high" },
  { label: "Price: High to Low", value: "price-high-low" },
];