"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Interview {
  time: string;
  period: "AM" | "PM";
  title: string;
  interviewer: string;
  candidates: number;
}

interface UpcomingInterviewsProps {
  interviews?: Interview[];
  onViewAll?: () => void;
  className?: string;
}

const defaultInterviews: Interview[] = [
  {
    time: "10:00",
    period: "AM",
    title: "Product Designer",
    interviewer: "Alex Morgan",
    candidates: 2,
  },
  {
    time: "11:30",
    period: "AM",
    title: "Frontend Developer",
    interviewer: "Marcus Lee",
    candidates: 3,
  },
  {
    time: "02:00",
    period: "PM",
    title: "UX Researcher",
    interviewer: "Sophie Turner",
    candidates: 2,
  },
];

export default function UpcomingInterviews({
  interviews = defaultInterviews,
  onViewAll,
  className,
}: UpcomingInterviewsProps) {
  return (
    <section
      className={cn(
        "w-full rounded-[28px] border border-[#dfe3e8] bg-white px-5 py-8",
        className
      )}
    >
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className=" font-bold text-[#596474]">UPCOMING INTERVIEWS</h2>

        <Button
          type="button"
          variant="ghost"
          onClick={onViewAll}
          className="h-auto p-0 text-xs font-semibold text-[#2864e8] hover:bg-transparent hover:text-[#1749b5]"
        >
          View all
        </Button>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute bottom-0 left-[56px] top-0 w-px bg-[#dce1e7]" />

        <div className="space-y-7">
          {interviews.map((interview) => (
            <div
              key={`${interview.time}-${interview.title}`}
              className="relative flex min-h-[74px] items-start"
            >
              {/* Time */}
              <div className="w-[57px] shrink-0 pr-3 pt-1 text-right">
                <p className="text-[14px] font-bold leading-[18px] text-[#2864e8]">
                  {interview.time}
                </p>

                <p className="text-[14px] font-bold leading-[18px] text-[#2864e8]">
                  {interview.period}
                </p>
              </div>

              {/* Timeline dot */}
              <div className="relative z-10 mt-[18px] h-2 w-2 shrink-0 rounded-full bg-white" />

              {/* Interview card */}
              <div className="ml-1.5 flex min-h-[74px] flex-1 flex-col justify-center rounded-[20px] bg-[#f1f3f6] px-4">
                <h3 className="text-sm font-semibold leading-tight text-[#171a1f]">
                  {interview.title}
                </h3>

                <p className="text-[11px] font-medium text-[#697586]">
                  {interview.interviewer} • {interview.candidates} Candidates
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
