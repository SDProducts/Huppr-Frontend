import { Job2 } from "@/app/(marketing)/jobs/_components/PageWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { cn, getInitials } from "@/lib/utils";
import {
  Bookmark,
  BriefcaseBusiness,
  MapPin,
  Share2,
  Sparkles,
} from "lucide-react";
import React from "react";
interface Prop {
  job: Job2;
}
function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-7">
      <h2 className="mb-4 text-[14px] font-bold text-slate-900">{title}</h2>

      <div className="text-[12px] leading-5 text-slate-500">{children}</div>
    </div>
  );
}

const JobDetails: React.FC<Prop> = ({ job }) => {
  const [bookmarked, setBookmarked] = React.useState(false);

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="border-b border-slate-100 px-7 pb-5 pt-6">
        <div className="mb-5 flex justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-lg border-slate-300"
          >
            <Share2 className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setBookmarked(!bookmarked)}
            className={cn(
              "h-9 w-9 rounded-lg border-slate-300",
              bookmarked && "bg-blue-50 text-blue-600"
            )}
          >
            <Bookmark
              className="h-4 w-4"
              fill={bookmarked ? "currentColor" : "none"}
            />
          </Button>
        </div>

        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-slate-200">
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

        <h1 className="mt-5 text-[22px] font-bold tracking-tight text-slate-900">
          {job.title}
        </h1>

        <p className="mt-1 text-[15px] font-semibold text-blue-600">
          {job.company}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {job.location}
          </span>

          <span className="flex items-center gap-1.5">
            <BriefcaseBusiness className="h-3.5 w-3.5" />
            {job.employment}
          </span>

          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            {job.level} Level
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-7 py-6">
        <DetailSection title="About the Role">
          <p>{job.about}</p>
        </DetailSection>

        {job.responsibilities.length > 0 && (
          <DetailSection title="Responsibilities">
            <ul className="space-y-3">
              {job.responsibilities.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </DetailSection>
        )}

        {job.benefits.length > 0 && (
          <DetailSection title="Benefits">
            <div className="grid grid-cols-2 gap-3">
              {job.benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3"
                >
                  <div className="mb-2 text-blue-600">{benefit.icon}</div>

                  <p className="text-[11px] font-bold text-slate-800">
                    {benefit.title}
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-500">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </DetailSection>
        )}
      </div>

      {/* Apply */}
      <div className="border-t border-slate-100 px-7 py-5">
        <Button className="h-11 w-full rounded-lg bg-blue-600 text-sm font-semibold shadow-[0_5px_12px_rgba(37,99,235,0.2)] hover:bg-blue-700">
          Apply Now
          <span className="ml-1 text-lg">→</span>
        </Button>

        <p className="mt-3 text-center text-[10px] text-slate-400">
          Estimated application time: 5 minutes
        </p>
      </div>
    </div>
  );
};

export default JobDetails;
