import { Job2 } from "@/app/(marketing)/jobs/_components/PageWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { Clock3, DollarSign, MapPin } from "lucide-react";
import React from "react";

interface Prop {
  job: Job2;
  selected: boolean;
  onClick: () => void;
}
const JobCard: React.FC<Prop> = ({ job, selected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative w-full rounded-[11px] border bg-white p-4 text-left transition-all",
        selected
          ? "border-blue-500 shadow-[0_4px_18px_rgba(37,99,235,0.15)]"
          : "border-slate-200 hover:border-blue-300 hover:shadow-sm"
      )}
    >
      {selected && (
        <div className="pointer-events-none absolute inset-[-2px] rounded-[13px] border border-blue-500 opacity-20" />
      )}

      <div className="flex gap-4">
        {/* Logo */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white">
          <span className="rounded-md p-1 bg-light *:rounded">
            <Avatar size="lg" className="rounded-md p-1 bg-light *:rounded">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt={job.company ?? "Company Name"}
              />
              <AvatarFallback className="bg-secondary-brand font-semibold text-white">
                {getInitials(job.company ?? "Company Name")}
              </AvatarFallback>
            </Avatar>
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[16px] font-bold leading-tight text-slate-900">
                {job.title}
              </h3>

              <p className="mt-1 text-[13px] font-medium text-blue-600">
                {job.company}
              </p>
            </div>

            {job.hot && (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-600">
                Hot
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {job.location}
            </span>

            <span className="flex items-center gap-1">
              <Clock3 className="h-3 w-3" />
              {job.employment}
            </span>

            <span className="flex items-center gap-1 font-semibold text-slate-800">
              <DollarSign className="h-3 w-3" />
              {job.salary}
            </span>
          </div>

          <p className="mt-3 line-clamp-2 text-[12px] leading-5 text-slate-500">
            {job.description}
          </p>
        </div>
      </div>
    </button>
  );
};

export default JobCard;
