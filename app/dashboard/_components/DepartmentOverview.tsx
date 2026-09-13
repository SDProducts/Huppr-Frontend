"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface DepartmentOverviewProps {
  departments: DepartmentItem[];
  className?: string;
}

export default function DepartmentOverview({
  departments,
  className,
}: DepartmentOverviewProps) {
  return (
    <section
      className={cn(
        "w-full rounded-[28px] border border-[#dfe3e8] bg-white px-7 py-8",
        className
      )}
    >
      {/* Header */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <h2 className="text-[21px] font-extrabold tracking-[-0.02em] text-[#171a1f]">
          Department Overview
        </h2>

        <Button
          variant="ghost"
          className="h-auto p-0 text-[15px] font-bold text-[#2864e8] hover:bg-transparent hover:text-[#1749b5]"
        >
          View all
        </Button>
      </div>

      {/* Departments */}
      <div className="space-y-7">
        {departments.slice(0, 5).map((department) => (
          <div key={department.name}>
            {/* Department information */}
            <div className="mb-2 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[16px] font-bold leading-tight text-[#171a1f]">
                  {department.name}
                </h3>

                <p className="mt-1 text-[12px] font-medium text-[#697586]">
                  {/* {department.employees} */}
                  12 Employees
                </p>
              </div>

              <div className="text-right">
                <p className="text-[16px] font-extrabold leading-tight text-[#171a1f]">
                  {/* {department.attendance} */}
                  87%
                </p>

                <p className="mt-1 text-[12px] font-medium text-[#697586]">
                  Attendance
                </p>
              </div>
            </div>

            {/* Progress */}
            <Progress
              value={87}
              className="h-[8px] rounded-full bg-white!"
              indicatorClassName="rounded-full bg-primary"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
