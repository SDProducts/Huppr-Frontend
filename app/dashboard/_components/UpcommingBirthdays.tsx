"use client";

import { Cake, UserRound } from "lucide-react";

interface Birthday {
  name: string;
  date: string;
  department: string;
}

interface UpcomingBirthdaysProps {
  birthdays?: Birthday[];
}

const defaultBirthdays: Birthday[] = [
  {
    name: "Sarah Johnson",
    date: "Today",
    department: "Marketing",
  },
  {
    name: "Alex Morgan",
    date: "Tomorrow",
    department: "Design",
  },
];

export default function UpcomingBirthdays({
  birthdays = defaultBirthdays,
}: UpcomingBirthdaysProps) {
  return (
    <section className="w-full rounded-[28px] border border-[#dfe3e8] bg-white px-7 py-8">
      <h2 className="mb-8 text-[17px] font-extrabold tracking-[0.08em] text-[#596474]">
        UPCOMING BIRTHDAYS
      </h2>

      <div className="space-y-5">
        {birthdays.map((birthday, index) => {
          const isFirst = index === 0;

          return (
            <div
              key={`${birthday.name}-${birthday.date}`}
              className="flex items-center gap-4"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] ${
                  isFirst ? "bg-[#e9faf3]" : "bg-transparent"
                }`}
              >
                {isFirst ? (
                  <Cake size={21} strokeWidth={2} className="text-[#0caa5b]" />
                ) : (
                  <UserRound
                    size={18}
                    strokeWidth={1.8}
                    className="text-[#596474]"
                  />
                )}
              </div>

              <div className="min-w-0">
                <p className="text-[16px] font-bold leading-tight text-[#171a1f]">
                  {birthday.name}
                </p>

                <p className="mt-0.5 text-[13px] font-medium text-[#697586]">
                  {birthday.date} • {birthday.department}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
