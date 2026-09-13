"use client";

import { cn } from "@/lib/utils";

export const SelectInputSkeleton = () => {
  return (
    <div className="space-y-1.5">
      <div className="h-4 w-1/3 bg-gray-300 rounded-sm animate-pulse"></div>
      <div className="h-12.5 w-full rounded-lg bg-gray-300 animate-pulse"></div>
    </div>
  );
};

export const DepartmentsSelectSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-9 w-64 bg-gray-300 rounded-md" />
        <div className="h-4 w-full max-w-md bg-gray-200 rounded-md" />
      </div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={i}
            className="border rounded-md bg-gray-200 border-gray-300 flex flex-col overflow-hidden"
          >
            {/* Icon Area */}
            <div className="h-28 w-full flex justify-center items-center">
              <div className="h-12 w-12 rounded-full bg-gray-300" />
            </div>
            {/* Footer Label Area */}
            <div className="bg-white p-2 flex justify-center">
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Controls Skeleton */}
      <div className="flex justify-between items-center text-sm py-4 border-t border-gray-300">
        <div className="h-10 w-24 bg-gray-300 rounded-full" />
        <div className="h-10 w-28 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};
export const CompanyFormSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-9 w-64 bg-gray-300 rounded-md" />
        <div className="h-4 w-full max-w-md bg-gray-200 rounded-md" />
      </div>

      {/* Grid Cards Skeleton */}

      <div className="grid gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="border rounded-md bg-gray-200 border-gray-300 h-15"
          />
        ))}
      </div>

      {/* Footer Controls Skeleton */}
      <div className="flex justify-between items-center text-sm py-4 border-t border-gray-300">
        <div className="h-10 w-24 bg-gray-300 rounded-full" />
        <div className="h-10 w-28 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};

export const WorkspaceSettingsSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-64 bg-gray-200 rounded-md" />
        <div className="h-4 w-full max-w-md bg-gray-200 rounded-md" />
      </div>

      {/* Form Fields Layout Skeleton */}
      <div className="space-y-10">
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Row 1: Country Code & Locale */}
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-200 rounded-md" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-200 rounded-md" />
          </div>

          {/* Row 2: Time Zone (Full Span) */}
          <div className="sm:col-span-2 space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-200 rounded-md" />
          </div>

          {/* Row 3: Week Starts On & Date Format */}
          <div className="space-y-2">
            <div className="h-4 w-28 bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-200 rounded-md" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-36 bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-200 rounded-md" />
          </div>
        </div>

        {/* Footer Buttons Skeleton */}
        <div className="flex justify-between items-center py-4 border-t border-gray-300">
          <div className="h-10 w-24 bg-gray-200 rounded-full" />
          <div className="h-10 w-32 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
};

interface ActivityTimelineSkeletonProps {
  count?: number;
  liveUpdates?: boolean;
  className?: string;
}

export function ActivityTimelineSkeleton({
  count = 5,
  liveUpdates = true,
  className,
}: ActivityTimelineSkeletonProps) {
  return (
    <section className={cn("w-full", className)}>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="h-8 w-56 animate-pulse rounded-md bg-[#e8ebef]" />

        {liveUpdates && (
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e8ebef]" />
            <div className="h-4 w-36 animate-pulse rounded bg-[#e8ebef]" />
          </div>
        )}
      </div>

      {/* Activities */}
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <ActivityCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

function ActivityCardSkeleton() {
  return (
    <article className="rounded-[18px] border border-[#dfe3e8] bg-white px-8 py-8">
      <div className="flex gap-8">
        {/* Icon */}
        <div className="h-16 w-16 shrink-0 animate-pulse rounded-full bg-[#e8ebef]" />

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Title row */}
          <div className="flex items-start justify-between gap-6">
            <div className="h-5 w-2/3 animate-pulse rounded bg-[#e8ebef]" />
            <div className="h-4 w-16 shrink-0 animate-pulse rounded bg-[#e8ebef]" />
          </div>

          {/* Description — two lines */}
          <div className="mt-3 space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-[#e8ebef]" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-[#e8ebef]" />
          </div>

          {/* Actions (optional, matches the commented block) */}
          {/* <div className="mt-5 flex items-center gap-7">
            <div className="h-[48px] w-32 animate-pulse rounded-[10px] bg-[#e8ebef]" />
            <div className="h-5 w-20 animate-pulse rounded bg-[#e8ebef]" />
          </div> */}
        </div>
      </div>
    </article>
  );
}
