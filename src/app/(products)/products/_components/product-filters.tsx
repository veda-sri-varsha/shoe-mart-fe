"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import filterData from "@/data/filters.json";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Typography } from "@/components/ui/typography";
import { ChevronDown } from "lucide-react";

type FilterOption = { label: string; count: number };
type FilterGroup = { label: string; options: FilterOption[] };

export function ProductFilters({
  selectedFilters,
  toggleFilterAction,
}: {
  selectedFilters: Record<string, string[]>;
  toggleFilterAction: (filterKey: string, value: string) => void;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(filterData.map((g) => [g.label, true]))
  );

  const toggle = (label: string) =>
    setOpen((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6 max-w-xs w-full">
      {filterData.map((filter: FilterGroup, idx) => {
        const filterKey = filter.label.toLowerCase().replace(/\s+/g, "_");
        return (
          <div
            key={filter.label}
            className="border-b border-neutral-200 last:border-0 pb-4 mb-2 last:mb-0 last:pb-0"
          >
            <Button
              type="button"
              className="flex w-full justify-between items-center text-left group focus:outline-none select-none bg-amber-50 hover:bg-white"
              onClick={() => toggle(filter.label)}
              aria-expanded={!!open[filter.label]}
              aria-controls={`filter-section-${idx}`}
            >
              <Typography
                variant="lead"
                className="font-bold text-base text-black py-1"
              >
                {filter.label}
              </Typography>
              <ChevronDown
                size={20}
                className={`text-neutral-400 ml-2 transition-transform duration-300 ${
                  open[filter.label] ? "rotate-180" : ""
                }`}
                strokeWidth={2}
              />
            </Button>
            {open[filter.label] && (
              <ul className="pt-3 space-y-3" id={`filter-section-${idx}`}>
                {filter.options.map((opt) => {
                  const optionValue = opt.label
                    .toLowerCase()
                    .replace(/\s+/g, "_");
                  const checked =
                    selectedFilters[filterKey]?.includes(optionValue) || false;
                  return (
                    <li key={opt.label} className="flex items-center">
                      <Checkbox
                        className="mr-3"
                        id={`${filterKey}-${optionValue}`}
                        checked={checked}
                        onCheckedChange={() =>
                          toggleFilterAction(filterKey, optionValue)
                        }
                      />
                      <Label
                        htmlFor={`${filterKey}-${optionValue}`}
                        className="flex-1 cursor-pointer"
                      >
                        <Typography variant="muted" className="text-base">
                          {opt.label}
                        </Typography>
                      </Label>
                      <Typography
                        variant="small"
                        className="ml-auto text-neutral-400 font-medium"
                      >
                        ({opt.count})
                      </Typography>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
