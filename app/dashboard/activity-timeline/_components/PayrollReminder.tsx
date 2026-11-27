"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PayrollReminderProps {
  onOpen?: () => void;
  className?: string;
}

export function PayrollReminder({ onOpen, className }: PayrollReminderProps) {
  return (
    <section
      className={cn(
        "rounded-[20px] bg-primary px-8 py-9 text-white",
        className
      )}
    >
      <h2 className="text-2xl text-white font-extrabold leading-[1.35] tracking-[-0.02em]">
        Payroll closes this Friday
      </h2>

      <p className="mt-4 text-white/85">
        Due in 3 days. Ensure all time-sheets and bonuses are finalized by EOD
        Thursday.
      </p>

      <Button
        type="button"
        onClick={onOpen}
        className="
          mt-7
          h-[55px]
          w-full
          rounded-[10px]
          bg-white
          text-[17px]
          font-semibold
          text-[#2864e8]
          shadow-none
          hover:bg-[#f3f5ff]
        "
      >
        Open Payroll Module
      </Button>
    </section>
  );
}
