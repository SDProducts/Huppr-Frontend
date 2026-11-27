"use client";
import { JobDetailsSkeleton } from "@/components/skeletons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetJobById } from "@/hooks/job seeker/useJobs";

import { cn, getInitials, labelCase } from "@/lib/utils";
import {
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  Clock3,
  Gift,
  MapPin,
  Share2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import React from "react";
interface Prop {
  jobId: string;
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

const JobDetails: React.FC<Prop> = ({ jobId }) => {
  const { data: job, isLoading } = useGetJobById(jobId);
  const [bookmarked, setBookmarked] = React.useState(false);
  if (!job || isLoading) {
    return <JobDetailsSkeleton />;
  }
  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="border-b border-slate-100 px-7 pb-5 pt-6">
        <div className="flex justify-between">
          <div className="flex size-14 items-center justify-center overflow-hidden rounded-xl border border-slate-200">
            <span className="rounded-md p-1 bg-light *:rounded">
              <Avatar size="lg" className="rounded-md p-1 bg-light *:rounded">
                {/* <AvatarImage
                src="https://github.com/shadcn.png"
                alt={job.organizationName ?? "Company Name"}
              /> */}
                <AvatarFallback className="bg-secondary-brand font-semibold text-white">
                  {getInitials(job.organizationName ?? "Company Name")}
                </AvatarFallback>
              </Avatar>
            </span>
          </div>

          <div className="flex justify-end gap-2">
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
        </div>

        <h1 className="mt-3 text-[22px] font-bold tracking-tight text-slate-900">
          {job.title}
        </h1>

        <p className="mt-1 text-[15px] font-semibold text-blue-600">
          {job.organizationName}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {job.locationCity}
          </span>

          <span className="flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />
            {labelCase(job.employmentType)}
          </span>
          <span className="flex items-center gap-1.5">
            <BriefcaseBusiness className="h-3.5 w-3.5" />
            {labelCase(job.workArrangement)}
          </span>

          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            {labelCase(job.seniorityLevel)} Level
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-7 py-6">
        <DetailSection title="About the Role">
          <div
            className="prose max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: job.summary }}
          />
        </DetailSection>

        {job.responsibilities.length > 0 && (
          <DetailSection title="Responsibilities">
            <ul className="space-y-1">
              {job.responsibilities.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-blue-600" />
                  <span>{item.body}</span>
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
                  key={benefit.id}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3"
                >
                  <div className="mb-2 text-blue-600">
                    <Gift />
                  </div>

                  <p className="text-[11px] font-bold text-slate-800">
                    {benefit.label}
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-500">
                    {benefit.label}
                  </p>
                </div>
              ))}
            </div>
          </DetailSection>
        )}
      </div>

      {/* Apply */}
      <div className="border-t border-slate-100 px-7 py-5">
        <Link href={`/jobs/${job.id}`}>
          <Button className="h-11 w-full rounded-lg bg-blue-600 text-sm font-semibold shadow-[0_5px_12px_rgba(37,99,235,0.2)] hover:bg-blue-700">
            Apply Now
            <ArrowRight />
          </Button>
        </Link>

        <p className="mt-3 text-center text-[10px] text-slate-400">
          Estimated application time: 5 minutes
        </p>
      </div>
    </div>
  );
};

export default JobDetails;
