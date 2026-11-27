"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface StickySearchBarProps {
  className?: string;
  onSearch?: (params: SearchParams) => void;
}

interface SearchParams {
  keyword: string;
  location: string;
  filters: string[];
}

const StickySearchBar: React.FC<StickySearchBarProps> = ({
  className,
  onSearch,
}) => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const [isSticky, setIsSticky] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for sticky behavior
  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "-1px 0px 0px 0px",
        threshold: 0,
      }
    );

    observer.observe(sentinelRef.current);

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, []);

  // Available filter options
  const filterOptions = [
    { id: "full-time", label: "Full Time" },
    { id: "part-time", label: "Part Time" },
    { id: "remote", label: "Remote" },
    { id: "onsite", label: "Onsite" },
    { id: "hybrid", label: "Hybrid" },
    { id: "contract", label: "Contract" },
  ];

  const toggleFilter = (filterId: string) => {
    setFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId]
    );
  };

  const clearFilters = () => {
    setFilters([]);
  };

  const handleSearch = () => {
    onSearch?.({ keyword, location, filters });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Sentinel for detecting scroll position */}
      <div ref={sentinelRef} className="h-px w-full" />

      {/* Sticky Search Bar */}
      <div
        ref={barRef}
        className={cn(
          "w-full transition-all duration-300",
          isSticky
            ? "fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-sm py-3 px-4 md:px-6"
            : "relative py-4 px-4 md:px-6"
        )}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3">
          {/* Keyword Input */}
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by Job Title or Keywords"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-9 h-11 w-full bg-background border-border/60 focus-visible:ring-offset-0"
            />
          </div>

          {/* Location Input */}
          <div className="relative flex-1 min-w-0">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-9 h-11 w-full bg-background border-border/60 focus-visible:ring-offset-0"
            />
          </div>

          {/* Filters Popover */}
          <Popover>
            <PopoverTrigger>
              <Button
                variant="outline"
                size="default"
                className={cn(
                  "h-11 gap-2 border-border/60 shrink-0",
                  filters.length > 0 && "border-primary/50 bg-primary/5"
                )}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {filters.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-1 h-5 px-1.5 text-xs"
                  >
                    {filters.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-4" align="end" sideOffset={8}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">Filters</h4>
                  {filters.length > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((filter) => {
                    const isActive = filters.includes(filter.id);
                    return (
                      <button
                        key={filter.id}
                        onClick={() => toggleFilter(filter.id)}
                        className={cn(
                          "px-3 py-1.5 text-xs rounded-full border transition-all duration-200",
                          isActive
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-background hover:bg-muted/50 border-border/60"
                        )}
                      >
                        {filter.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="h-11 px-6 shrink-0 bg-primary hover:bg-primary/90"
          >
            Search Jobs
          </Button>
        </div>
      </div>

      {/* Spacer for sticky mode */}
      {isSticky && <div className="h-[calc(3rem+1.5rem+1px)]" />}
    </div>
  );
};

export default StickySearchBar;
