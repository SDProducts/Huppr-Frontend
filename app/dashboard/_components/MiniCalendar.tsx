"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export interface CalendarDay {
  date: number;
  day: string;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  leaveCount?: number;
}

interface CompanyCalendarProps {
  month?: string;
  days?: CalendarDay[];
  onPreviousMonth?: () => void;
  onNextMonth?: () => void;
  onViewCalendar?: () => void;
  className?: string;
}

const defaultDays: CalendarDay[] = [
  {
    date: 25,
    day: "MON",
    isCurrentMonth: false,
  },
  {
    date: 26,
    day: "TUE",
    isCurrentMonth: false,
  },
  {
    date: 27,
    day: "WED",
    isCurrentMonth: false,
  },
  {
    date: 28,
    day: "THU",
    isCurrentMonth: false,
  },
  {
    date: 29,
    day: "FRI",
    isCurrentMonth: false,
  },
  {
    date: 30,
    day: "SAT",
    isCurrentMonth: false,
  },
  {
    date: 1,
    day: "SUN",
    isCurrentMonth: true,
    isToday: true,
    leaveCount: 2,
  },
];

export function CompanyCalendar({
  month = "October 2023",
  days = defaultDays,
  onPreviousMonth,
  onNextMonth,
  onViewCalendar,
  className,
}: CompanyCalendarProps) {
  return (
    <section
      className={cn(
        "w-full rounded-[28px] border border-slate-200 bg-white p-7 shadow-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[22px] font-bold tracking-tight text-slate-900">
          Company Calendar
        </h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPreviousMonth}
            className="flex size-7 items-center justify-center rounded-full text-slate-900 transition-colors hover:bg-slate-100"
            aria-label="Previous month"
          >
            <ChevronLeft className="size-4" strokeWidth={2.5} />
          </button>

          <span className="min-w-[110px] text-center text-[15px] font-bold text-slate-900">
            {month}
          </span>

          <button
            type="button"
            onClick={onNextMonth}
            className="flex size-7 items-center justify-center rounded-full text-slate-900 transition-colors hover:bg-slate-100"
            aria-label="Next month"
          >
            <ChevronRight className="size-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="mt-8 grid grid-cols-7 gap-4">
        {days.map((day) => (
          <div key={`${day.day}-${day.date}`} className="min-w-0">
            {/* Day name */}
            <div
              className={cn(
                "mb-3 text-center text-[11px] font-bold",
                day.isToday ? "text-blue-600" : "text-slate-600"
              )}
            >
              {day.day}
            </div>

            {/* Date */}
            <div
              className={cn(
                "relative flex h-[120px] flex-col rounded-[15px] border-2 p-4",
                day.isToday
                  ? "border-blue-600 bg-white"
                  : "border-transparent bg-slate-100"
              )}
            >
              <span
                className={cn(
                  "text-center text-[13px] font-bold",
                  day.isToday ? "text-blue-600" : "text-slate-800"
                )}
              >
                {day.date}
              </span>

              {/* Leave badge */}
              {day.leaveCount !== undefined && day.leaveCount > 0 && (
                <div className="mt-auto rounded-[9px] bg-blue-600 p-1 text-center text-[10px] font-semibold leading-4 text-white">
                  <div>Leave: {day.leaveCount}</div>
                  <div>{day.leaveCount === 1 ? "Person" : "People"}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-7 flex justify-center">
        <button
          type="button"
          onClick={onViewCalendar}
          className="group flex items-center gap-1.5 text-[14px] font-bold text-blue-600 transition-colors hover:text-blue-700"
        >
          View full calendar
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </button>
      </div>
    </section>
  );
}
