"use client";

import { CalendarDays, FileText, ListChecks, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type StatVariant = "approval" | "document" | "interview";

interface ActivityStatCardProps {
  value: number;
  label: string;
  variant: StatVariant;
  className?: string;
  onClick?: () => void;
}

const variantConfig: Record<
  StatVariant,
  {
    icon: LucideIcon;
    valueClass: string;
    iconClass: string;
  }
> = {
  approval: {
    icon: ListChecks,
    valueClass: "text-[#2864e8]",
    iconClass: "bg-[#dce7f8] text-[#2864e8]",
  },
  document: {
    icon: FileText,
    valueClass: "text-[#c91f1f]",
    iconClass: "bg-[#ffd9d6] text-[#c91f1f]",
  },
  interview: {
    icon: CalendarDays,
    valueClass: "text-[#171a1f]",
    iconClass: "bg-[#dce3ff] text-[#4b5fc5]",
  },
};

export function ActivityStatCard({
  value,
  label,
  variant,
  className,
  onClick,
}: ActivityStatCardProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex h-[126px] items-center justify-between rounded-[20px] border border-[#dfe3e8] bg-white px-7",
        className
      )}
    >
      <div>
        <p
          className={cn(
            "text-[29px] font-extrabold leading-none",
            config.valueClass
          )}
        >
          {value}
        </p>

        <p className="mt-3 text-[18px] font-medium text-[#596474]">{label}</p>
      </div>

      <div
        className={cn(
          "flex h-[54px] w-[54px] items-center justify-center rounded-[11px]",
          config.iconClass
        )}
      >
        <Icon size={22} strokeWidth={2} />
      </div>
    </div>
  );
}
