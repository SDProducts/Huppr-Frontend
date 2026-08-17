"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export type ActivityColor = "orange" | "green" | "blue" | "red" | "yellow";

export interface Activity {
  id: string | number;
  icon: LucideIcon;
  message: string;
  time: string;
  color?: ActivityColor;
}

interface TodayActivitiesProps {
  activities: Activity[];
  title?: string;
  onViewAll?: () => void;
  className?: string;
}

const colorStyles: Record<
  ActivityColor,
  {
    background: string;
    icon: string;
  }
> = {
  orange: {
    background: "bg-orange-50",
    icon: "text-orange-500",
  },
  green: {
    background: "bg-emerald-50",
    icon: "text-emerald-500",
  },
  blue: {
    background: "bg-blue-50",
    icon: "text-blue-500",
  },
  red: {
    background: "bg-red-50",
    icon: "text-red-500",
  },
  yellow: {
    background: "bg-amber-50",
    icon: "text-amber-500",
  },
};

export function TodayActivities({
  activities,
  title = "Today's Activities",
  onViewAll,
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

        <button
          type="button"
          onClick={onViewAll}
          className="text-[14px] font-bold text-blue-600 transition-colors hover:text-blue-700"
        >
          View all
        </button>
      </div>

      {/* Activities */}
      <div className="mt-7 space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          const styles = colorStyles[activity.color ?? "blue"];

          return (
            <div
              key={activity.id}
              className="flex min-h-[44px] items-center gap-5"
            >
              {/* Icon */}
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-[14px]",
                  styles.background
                )}
              >
                <Icon
                  className={cn("size-[17px]", styles.icon)}
                  strokeWidth={1.8}
                />
              </div>

              {/* Message */}
              <p className="min-w-0 flex-1 text-[14px] text-slate-700">
                {activity.message}
              </p>

              {/* Time */}
              <span className="shrink-0 text-[11px] text-slate-500">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
