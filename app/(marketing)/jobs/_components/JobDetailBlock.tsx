"use client";
import ApplyForJob from "@/app/(marketing)/jobs/_components/ApplyForJob";
import { JobDetailsSkeleton } from "@/components/skeletons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useModal } from "@/context/modal.state";
import { useGetJobById } from "@/hooks/job seeker/useJobs";
import { cn, getInitials, labelCase } from "@/lib/utils";
import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  Gift,
  MapPin,
  Sparkles,
  User,
} from "lucide-react";
import { useParams } from "next/navigation";

export default function JobDetailBlock() {
  const modal = useModal();
  const { jobId } = useParams();
  const { data: job, isLoading } = useGetJobById(String(jobId));
  if (!job || isLoading) {
    return <JobDetailsSkeleton />;
  }
  function handleApply() {
    modal.open({
      content: <ApplyForJob />,
      header: (
        <div className="flex gap-2">
          <div className="size-10 bg-primary/5 flex items-center justify-center rounded-md">
            <User className="size-6 text-primary" strokeWidth={3} />
          </div>
          <div className="">
            <div className="text-lg font-bold">Apply for this Job</div>
            <p className="text-xs text-gray-500">
              Provide candidates personal informations.
            </p>
          </div>
        </div>
      ),
      headerColor: "bg-primary-heading/5",
      size: "sm:w-2xl",
    });
  }
  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="border-b border-slate-100 px-7 pb-5 pt-6">
        <div className="flex justify-between">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-slate-200">
            <span className="rounded-md p-1 bg-light *:rounded">
              <Avatar size="lg" className="rounded-md p-1 bg-light *:rounded">
                {/* <AvatarImage
                src="https://github.com/shadcn.png"
                alt={job.organizationName ?? "Company Name"}
              /> */}
                <AvatarFallback className="bg-secondary-brand font-semibold text-white">
                  {getInitials(job?.organizationName ?? "Company Name")}
                </AvatarFallback>
              </Avatar>
            </span>
          </div>

          <Button className={cn("p-5 lg:hidden")} onClick={handleApply}>
            <span>Apply Now</span>
          </Button>
        </div>

        <h1 className="mt-5 text-[22px] font-bold tracking-tight text-slate-900">
          {job?.title}
        </h1>

        <p className="mt-1 text-[15px] font-semibold text-blue-600">
          {job?.organizationName}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {job?.locationCity}
          </span>

          <span className="flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />
            {labelCase(job?.employmentType)}
          </span>
          <span className="flex items-center gap-1.5">
            <BriefcaseBusiness className="h-3.5 w-3.5" />
            {labelCase(job?.workArrangement)}
          </span>

          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            {labelCase(job?.seniorityLevel)} Level
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-6 px-7 py-6">
        <div className="space-y-2">
          <h3 className="text-lg font-bold">About the Role</h3>

          <div
            className="prose max-w-none text-gray-800 text-sm"
            dangerouslySetInnerHTML={{ __html: job.summary }}
          />
        </div>

        {job?.responsibilities.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Responsibilities</h3>
            <ul className="space-y-2">
              {job.responsibilities.map((item, index) => (
                <li key={index} className="flex gap-2 items-start text-sm">
                  <span className="size-2 mt-2.5 shrink-0 rounded-full border border-primary" />
                  <span>{item.body}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {job?.skills.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Skills</h3>
            <ul className="space-y-2">
              {job.skills.map((item, index) => (
                <li key={index} className="flex gap-2 items-start text-sm">
                  <span className="size-2 mt-2.5 shrink-0 rounded-full border border-primary" />
                  <span>
                    {item.name} ({item.level})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {job.benefits.length > 0 && (
          <div title="Benefits" className="space-y-2">
            <h3 className="text-lg font-bold">Benefits</h3>
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
          </div>
        )}
      </div>

      {/* Apply */}
      <div className="border-t border-slate-100 px-7 py-5 lg:hidden">
        <Button
          onClick={handleApply}
          className="h-11 w-full rounded-lg bg-blue-600 text-sm font-semibold shadow-[0_5px_12px_rgba(37,99,235,0.2)] hover:bg-blue-700"
        >
          Apply Now
          <ArrowRight />
        </Button>

        <p className="mt-3 text-center text-[10px] text-slate-400">
          Estimated application time: 5 minutes
        </p>
      </div>
    </div>
  );
}
