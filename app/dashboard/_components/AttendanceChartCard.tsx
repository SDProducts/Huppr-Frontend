"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

type AttendanceItem = {
  label: string;
  value: number;
  color: string;
};

interface AttendanceCardProps {
  total: number;
  items: AttendanceItem[];
  title?: string;
  onViewAll?: () => void;
  className?: string;
}

export function AttendanceCard({
  total,
  items,
  title = "ATTENDANCE TODAY",
  className,
}: AttendanceCardProps) {
  return (
    <Card
      className={cn(
        "w-full rounded-[28px] border border-slate-200 bg-white shadow-none",
        className
      )}
    >
      <CardContent className="px-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-[1.5px] text-slate-600">
            {title}
          </h2>

          <Link
            href={"#"}
            className="text-[12px] font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            View all
          </Link>
        </div>

        {/* Content */}
        <div className="mt-8 flex items-center gap-8">
          {/* Donut */}
          <AttendanceDonut total={total} items={items} />

          {/* Legend */}
          <div className="flex flex-1 flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-5"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />

                  <span className="text-[12px] text-slate-500">
                    {item.label}
                  </span>
                </div>

                <span className="text-[11px] font-bold text-slate-800">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface AttendanceDonutProps {
  total: number;
  items: AttendanceItem[];
}

function AttendanceDonut({ total, items }: AttendanceDonutProps) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;

  const totalValue = items.reduce((sum, item) => sum + item.value, 0) || 1;

  return (
    <div className="relative size-[112px] shrink-0">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90">
        {/* Background ring */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="10"
        />

        {/* Attendance segments */}
        {items.map((item, index) => {
          const percentage = item.value / totalValue;
          const segmentLength = percentage * circumference;

          // Calculate the amount occupied by previous segments
          const previousPercentage = items
            .slice(0, index)
            .reduce(
              (sum, previousItem) => sum + previousItem.value / totalValue,
              0
            );

          const offset = previousPercentage * circumference;

          return (
            <circle
              key={item.label}
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth="10"
              strokeLinecap="butt"
              strokeDasharray={`${Math.max(
                segmentLength - 3,
                0
              )} ${circumference}`}
              strokeDashoffset={-offset}
            />
          );
        })}
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[22px] font-bold leading-none text-slate-800">
          {total}
        </span>

        <span className="mt-1 text-[11px] text-slate-500">Total</span>
      </div>
    </div>
  );
}
