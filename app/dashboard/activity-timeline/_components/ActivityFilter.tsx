"use client";

import { ChevronDown, SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

const categories = [
  "all",
  "recruitment",
  "employee",
  "payroll",
  "compliance",
  "events",
];
const dateRanges = [
  "Last 24 Hours",
  "Last 7 Days",
  "Last 30 Days",
  "This Month",
];
type DateRange = (typeof dateRanges)[number];

interface ActivityFiltersProps {
  filterParams: ActivityFilters;
  setfilterParams: Dispatch<SetStateAction<ActivityFilters>>;
  className?: string;
}
function getDateRangeBounds(range: DateRange): { from: string; to: string } {
  const now = new Date();
  const to = now.toISOString();
  const from = new Date(now);

  switch (range) {
    case "Last 24 Hours":
      from.setHours(from.getHours() - 24);
      break;
    case "Last 7 Days":
      from.setDate(from.getDate() - 7);
      break;
    case "Last 30 Days":
      from.setDate(from.getDate() - 30);
      break;
    case "This Month":
      from.setDate(1);
      from.setHours(0, 0, 0, 0);
      break;
  }

  return { from: from.toISOString(), to };
}
export function ActivityFilters({
  filterParams,
  setfilterParams,
  className,
}: ActivityFiltersProps) {
  const category = filterParams.category ?? "all";
  const dateRange =
    (dateRanges.find(
      (r) => getDateRangeBounds(r).from === filterParams.from
    ) as DateRange) ?? "Last 24 Hours";
  const [searchInput, setSearchInput] = useState(filterParams.search ?? "");

  useEffect(() => {
    const t = setTimeout(() => {
      setfilterParams((prev) => ({ ...prev, search: searchInput }));
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput, setfilterParams]);

  const handleCategory = (value: string) =>
    setfilterParams((prev) => ({ ...prev, category: value.toLowerCase() }));

  const handleDateRange = (value: DateRange) => {
    const { from, to } = getDateRangeBounds(value);
    setfilterParams((prev) => ({ ...prev, from, to }));
  };

  return (
    <div
      className={cn(
        "rounded-[20px] border border-[#dfe3e8] bg-white p-7",
        className
      )}
    >
      <InputGroup className="max-w-sm py-6 shadow-none">
        <InputGroupInput
          placeholder="Search by name..."
          className=""
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <InputGroupAddon>
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>

      <div className="mt-8">
        <h3 className="mb-4 text-[18px] font-medium text-[#171a1f]">
          Categories
        </h3>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {categories.map((item) => {
            const active = category === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => handleCategory(item)}
                className={cn(
                  "rounded-full px-6 py-1 font-medium transition capitalize",
                  active
                    ? "bg-[#2864e8] text-white"
                    : "bg-[#eef0f3] text-[#596474] hover:bg-[#e4e7eb]"
                )}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-[18px] font-medium text-[#171a1f]">
          Date Range
        </h3>
        <div className="relative">
          <select
            value={dateRange}
            onChange={(e) => handleDateRange(e.target.value as DateRange)}
            className="h-[56px] w-full appearance-none rounded-[11px] border border-[#d9dee5] bg-[#f7f8fa] px-4 text-[18px] font-normal text-[#303640] outline-none focus:border-[#2864e8] focus:ring-2 focus:ring-[#2864e8]/10"
          >
            {dateRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          <ChevronDown
            size={20}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#697586]"
          />
        </div>
      </div>
    </div>
  );
}
