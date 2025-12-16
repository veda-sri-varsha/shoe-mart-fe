"use client";

import { useState, useCallback, useMemo } from "react";
import { Product } from "@/types/products";

export type FiltersState = Record<string, string[]>;

export function useFilters(products: Product[]) {
  const [selectedFilters, setSelectedFilters] = useState<FiltersState>({});

  const toggleFilter = useCallback((filterKey: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[filterKey] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      const updated = { ...prev, [filterKey]: newValues };
      if (updated[filterKey]?.length === 0) {
        delete updated[filterKey];
      }
      return updated;
    });
  }, []);

  const filteredProducts = useMemo(() => {
    if (Object.keys(selectedFilters).length === 0) {
      return products;
    }

    let result = [...products];

    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (!values?.length) return;

      switch (key) {
        case "category":
          result = result.filter((product) =>
            values.includes(product.category.toLowerCase().replace(/\s+/g, "_"))
          );
          break;
        case "brand":
          result = result.filter((product) =>
            values.includes(product.brand.toLowerCase().replace(/\s+/g, "_"))
          );
          break;
        case "availability":
          result = result.filter((product) => {
            const inStock = product.stock > 0;
            return values.includes(inStock ? "in_stock" : "sold_out");
          });
          break;
        case "badges":
          result = result.filter((product) => {
            const badgeKey =
              product.badge?.toLowerCase().replace(/\s+/g, "_") || "";
            return values.includes(badgeKey);
          });
          break;
        case "price":
          result = result.filter((product) =>
            values.some((range) => {
              const price = product.price;
              if (range === "under_999") return price < 999;
              if (range === "999-1999") return price >= 999 && price <= 1999;
              if (range === "2000_&_above") return price >= 2000;
              return false;
            })
          );
          break;
      }
    });

    return result;
  }, [products, selectedFilters]);

  return {
    selectedFilters,
    toggleFilter,
    filteredProducts,
  };
}
