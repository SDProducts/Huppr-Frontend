"use client";

import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface JobSearchBarProps {
  onSearch?: (params: { keyword: string; location: string }) => void;
  onFiltersClick?: () => void;
  defaultKeyword?: string;
  defaultLocation?: string;
}

export function JobSearchBar({
  onSearch,
  onFiltersClick,
  defaultKeyword = "",
  defaultLocation = "",
}: JobSearchBarProps) {
  const [keyword, setKeyword] = React.useState(defaultKeyword);
  const [location, setLocation] = React.useState(defaultLocation);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSearch?.({
      keyword: keyword.trim(),
      location: location.trim(),
    });
  };

  return (
    <div className="sticky top-2 z-40 w-full bg-white shadow rounded-2xl px-4 py-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-7xl flex-col gap-3 lg:flex-row lg:items-center lg:gap-4"
        // className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6"
      >
        <div className="flex flex-col sm:flex-row items-center gap-2 flex-1">
          {/* Job title / keyword */}
          <div className="relative flex-1 w-full">
            <Search
              className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
              strokeWidth={2}
            />

            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by Job Title or Keywords"
              className="h-12 rounded-xl border-[#c7cce0] bg-[#f1f2f6] pl-11 pr-4 text-sm shadow-none placeholder:text-[#73798b] focus-visible:border-[#2563eb] focus-visible:ring-1 focus-visible:ring-[#2563eb]"
            />
          </div>

          {/* Location */}
          <div className="relative flex-1 w-full">
            <MapPin
              className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
              strokeWidth={2}
            />

            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search by Location"
              className="h-12 rounded-xl border-[#c7cce0] bg-[#f1f2f6] pl-11 pr-4 text-sm shadow-none placeholder:text-[#73798b] focus-visible:border-[#2563eb] focus-visible:ring-1 focus-visible:ring-[#2563eb]"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center justify-center gap-1">
          {/* Filters */}
          <Button
            type="button"
            variant="outline"
            onClick={onFiltersClick}
            className="h-12 shrink-0 gap-2 rounded-xl border-[#c7cce0] bg-background px-6 text-sm font-medium text-[#252938] shadow-none hover:bg-white/70"
          >
            <SlidersHorizontal className="size-5" strokeWidth={2} />
            <span>Filters</span>
          </Button>

          {/* Search */}
          <Button
            type="submit"
            className="h-12 shrink-0 rounded-xl bg-[#2563eb] px-8 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-[#1d4ed8]"
          >
            Search Jobs
          </Button>
        </div>
      </form>
    </div>
  );
}
