"use client";
import { TopFilter } from "@/app/(marketing)/jobs/_components/Filters";
import JobCard from "@/app/(marketing)/jobs/_components/JobCard";
import JobDetails from "@/app/(marketing)/jobs/_components/JobDetails";
import { cn } from "@/lib/utils";
import { useState } from "react";
interface Props {
  jobs: Job[];
}
export default function JobListAndDetailBlock({ jobs }: Props) {
  const [selectedJobId, setSelectedJobId] = useState(jobs[0].id);
  const selectedJob = jobs.find((job) => job.id === selectedJobId) ?? jobs[0];

  return (
    <div className={cn("grid md:grid-cols-2 gap-2")}>
      <div className="">
        <TopFilter />
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              selected={selectedJobId === job.id}
              onClick={() => setSelectedJobId(job.id)}
            />
          ))}
        </div>
      </div>

      {/* RIGHT DETAILS */}
      <div className="hidden rounded-md border border-slate-200 lg:block">
        <JobDetails job={selectedJob} />
      </div>
    </div>
  );
}
