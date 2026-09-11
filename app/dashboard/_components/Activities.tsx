"use client";

import { cn } from "@/lib/utils";
import { CalendarDays, User2 } from "lucide-react";
import Link from "next/link";

interface TodayActivitiesProps {
  activities: ActivityItem[];
  title?: string;
  className?: string;
}

export function TodayActivities({
  activities,
  title = "Today's Activities",
  className,
}: TodayActivitiesProps) {
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
          {title}
        </h2>

        <Link
          href={`/dashboard/activity-timeline`}
          className="text-[14px] font-bold text-blue-600 transition-colors hover:text-blue-700"
        >
          View all
        </Link>
      </div>

      {/* Activities */}
      <div className="mt-7 space-y-4">
        {activities.map((activity) => {
          let Icon = User2;
          if (activity.category === "event") {
            Icon = CalendarDays;
          }
          let bg = "bg-green-200";
          if (activity.category === "event") {
            bg = "bg-orange-200";
          }

          return (
            <div
              key={activity.id}
              className="flex min-h-[44px] items-center gap-5"
            >
              {/* Icon */}
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-[14px]",
                  bg
                )}
              >
                <Icon className={cn("size-[17px]")} strokeWidth={1.8} />
              </div>

              {/* Message */}
              <p className="min-w-0 flex-1 text-[14px] text-slate-700">
                {activity.summary}
              </p>

              {/* Time */}
              <span className="shrink-0 text-[11px] text-slate-500">
                {activity.title}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
