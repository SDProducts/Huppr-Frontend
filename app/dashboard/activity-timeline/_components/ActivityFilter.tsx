"use client";

import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Recruitment",
  "Employee",
  "Payroll",
  "Compliance",
  "Events",
];

interface ActivityFiltersProps {
  onSearchChange?: (value: string) => void;
  onCategoryChange?: (category: string) => void;
  onDateRangeChange?: (range: string) => void;
  className?: string;
}

const dateRanges = [
  "Last 24 Hours",
  "Last 7 Days",
  "Last 30 Days",
  "This Month",
];

export function ActivityFilters({
  onSearchChange,
  onCategoryChange,
  onDateRangeChange,
  className,
}: ActivityFiltersProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [dateRange, setDateRange] = useState("Last 24 Hours");

  const handleSearch = (value: string) => {
    setSearch(value);
    onSearchChange?.(value);
  };

  const handleCategory = (value: string) => {
    setCategory(value);
    onCategoryChange?.(value);
  };

  const handleDateRange = (value: string) => {
    setDateRange(value);
    onDateRangeChange?.(value);
  };

  return (
    <section
      className={cn(
        "rounded-[20px] border border-[#dfe3e8] bg-white p-7",
        className
      )}
    >
      {/* Search */}
      <div>
        <label className="mb-3 block text-[18px] font-medium text-[#171a1f]">
          Search Activity
        </label>

        <div className="relative">
          <Search
            size={19}
            strokeWidth={2}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#697586]"
          />

          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            type="search"
            placeholder={"Search by name, type, or date..."}
            className="
              h-[83px]
              w-full
              rounded-[11px]
              border
              border-[#d9dee5]
              bg-[#f7f8fa]
              px-4
              pl-[53px]
              pr-4
              text-[18px]
              font-normal
              leading-7
              text-[#171a1f]
              outline-none
              transition
              placeholder:text-[#747d8d]
              focus:border-[#2864e8]
              focus:bg-white
              focus:ring-2
              focus:ring-[#2864e8]/10
            "
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mt-8">
        <h3 className="mb-4 text-[18px] font-medium text-[#171a1f]">
          Categories
        </h3>

        <div className="flex flex-wrap gap-2.5">
          {categories.map((item) => {
            const active = category === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => handleCategory(item)}
                className={cn(
                  "rounded-full px-[21px] py-[9px] text-[17px] font-medium transition",
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

      {/* Date range */}
      <div className="mt-8">
        <h3 className="mb-4 text-[18px] font-medium text-[#171a1f]">
          Date Range
        </h3>

        <div className="relative">
          <select
            value={dateRange}
            onChange={(e) => handleDateRange(e.target.value)}
            className="
              h-[56px]
              w-full
              appearance-none
              rounded-[11px]
              border
              border-[#d9dee5]
              bg-[#f7f8fa]
              px-4
              text-[18px]
              font-normal
              text-[#303640]
              outline-none
              focus:border-[#2864e8]
              focus:ring-2
              focus:ring-[#2864e8]/10
            "
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
    </section>
  );
}
