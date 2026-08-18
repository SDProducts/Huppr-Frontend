"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Department {
  name: string;
  employees: number;
  attendance: number;
}

interface DepartmentOverviewProps {
  departments?: Department[];
  onViewAll?: () => void;
  className?: string;
}

const defaultDepartments: Department[] = [
  {
    name: "Engineering",
    employees: 42,
    attendance: 96,
  },
  {
    name: "Marketing",
    employees: 18,
    attendance: 88,
  },
  {
    name: "Finance",
    employees: 12,
    attendance: 100,
  },
];

export default function DepartmentOverview({
  departments = defaultDepartments,
  onViewAll,
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
          onClick={onViewAll}
          className="h-auto p-0 text-[15px] font-bold text-[#2864e8] hover:bg-transparent hover:text-[#1749b5]"
        >
          View all
        </Button>
      </div>

      {/* Departments */}
      <div className="space-y-7">
        {departments.map((department) => (
          <div key={department.name}>
            {/* Department information */}
            <div className="mb-2 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[16px] font-bold leading-tight text-[#171a1f]">
                  {department.name}
                </h3>

                <p className="mt-1 text-[12px] font-medium text-[#697586]">
                  {department.employees} Employees
                </p>
              </div>

              <div className="text-right">
                <p className="text-[16px] font-extrabold leading-tight text-[#171a1f]">
                  {department.attendance}%
                </p>

                <p className="mt-1 text-[12px] font-medium text-[#697586]">
                  Attendance
                </p>
              </div>
            </div>

            {/* Progress */}
            <Progress
              value={department.attendance}
              className="h-[8px] rounded-full bg-[#edf0f4]"
              indicatorClassName="rounded-full bg-[linear-gradient(90deg,#2864e8_0%,#466ff0_35%,#142d8e_70%,#f59e0b_100%)]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
