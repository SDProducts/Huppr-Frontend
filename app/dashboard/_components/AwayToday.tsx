"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Employee {
  name: string;
  leaveType: string;
  department: string;
  image?: string;
}

interface AwayTodayProps {
  employees?: Employee[];
  totalAway?: number;
  onViewAll?: () => void;
  className?: string;
}

const defaultEmployees: Employee[] = [
  {
    name: "James Wilson",
    leaveType: "Annual Leave",
    department: "Engineering",
    image: "/images/james-wilson.jpg",
  },
  {
    name: "Maria Rodriguez",
    leaveType: "Medical",
    department: "Operations",
    image: "/images/maria-rodriguez.jpg",
  },
];

export default function AwayToday({
  employees = defaultEmployees,
  totalAway = 12,
  onViewAll,
  className,
}: AwayTodayProps) {
  return (
    <section
      className={cn(
        "w-full rounded-[28px] border border-[#dfe3e8] bg-white px-7 py-8",
        className
      )}
    >
      {/* Header */}
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-[17px] font-extrabold tracking-[0.08em] text-[#596474]">
          AWAY TODAY
        </h2>

        <span className="text-[13px] font-bold text-[#2864e8]">
          {totalAway} People
        </span>
      </div>

      {/* Employees */}
      <div className="space-y-4">
        {employees.map((employee) => (
          <div key={employee.name} className="flex items-center gap-4">
            <Avatar className="h-10 w-10 border border-[#e3e7eb]">
              {employee.image && (
                <AvatarImage
                  src={employee.image}
                  alt={employee.name}
                  className="object-cover"
                />
              )}

              <AvatarFallback className="bg-[#eef2f6] text-[12px] font-bold text-[#596474]">
                {getInitials(employee.name)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <h3 className="text-[16px] font-bold leading-tight text-[#171a1f]">
                {employee.name}
              </h3>

              <p className="mt-1 text-[12px] font-medium text-[#697586]">
                {employee.leaveType} • {employee.department}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <Button
        type="button"
        variant="outline"
        onClick={onViewAll}
        className="mt-6 h-[46px] w-full rounded-[15px] border-[#d9dee4] bg-white text-[14px] font-bold text-[#171a1f] shadow-none hover:bg-[#f7f8fa]"
      >
        See all away
      </Button>
    </section>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
