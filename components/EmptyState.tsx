"use client";

import { Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActivityEmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export default function ActivityEmptyState({
  title = "No activity found",
  description = "When something happens — a new hire, a leave request, a birthday — it'll show up here.",
  actionLabel,
  onAction,
  className,
}: ActivityEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-[18px] border border-dashed border-[#dfe3e8] bg-white px-8 py-16 text-center",
        className
      )}
    >
      {/* Icon */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#eef0f3]">
        <Inbox size={32} strokeWidth={1.8} className="text-[#697586]" />
      </div>

      {/* Copy */}
      <h3 className="mt-6 text-[20px] font-semibold text-[#171a1f]">{title}</h3>
      <p className="mt-2 max-w-md text-[16px] leading-[1.6] text-[#596474]">
        {description}
      </p>

      {/* Optional action */}
      {actionLabel && onAction && (
        <Button
          type="button"
          onClick={onAction}
          className="mt-8 h-[48px] rounded-[10px] bg-[#2864e8] px-6 text-[17px] font-bold text-white shadow-none hover:bg-[#1749b5]"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
