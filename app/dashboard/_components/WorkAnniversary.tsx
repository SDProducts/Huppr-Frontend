"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award } from "lucide-react";

interface Anniversary {
  name: string;
  years: number;
  date: string;
  image?: string;
}

interface WorkAnniversariesProps {
  employees?: Anniversary[];
}

const defaultEmployees: Anniversary[] = [
  {
    name: "James Wilson",
    years: 5,
    date: "Oct 15",
  },
  {
    name: "Maria Rodriguez",
    years: 2,
    date: "Oct 18",
    image: "/images/avatar.jpg",
  },
];

export default function WorkAnniversaries({
  employees = defaultEmployees,
}: WorkAnniversariesProps) {
  return (
    <section className="w-full rounded-[28px] border border-[#dfe3e8] bg-white px-7 py-8">
      <h2 className="mb-8 text-[17px] font-extrabold tracking-[0.08em] text-[#596474]">
        WORK ANNIVERSARIES
      </h2>

      <div className="space-y-5">
        {employees.map((employee) => (
          <div
            key={`${employee.name}-${employee.date}`}
            className="flex items-center gap-4"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-[#eef5ff]">
              <Avatar size="lg" className={"bg-white border-none"}>
                <AvatarImage src={employee.image} alt={employee.name} />
                <AvatarFallback className={"bg-[#eef5ff] border-none!"}>
                  <Award size={22} strokeWidth={2} className="text-[#2864e8]" />
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="min-w-0">
              <p className="text-[16px] font-bold leading-tight text-[#171a1f]">
                {employee.name}
              </p>

              <p className="mt-0.5 text-[13px] font-medium text-[#697586]">
                {employee.years} {employee.years === 1 ? "Year" : "Years"} •{" "}
                {employee.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
