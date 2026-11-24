"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useGetJobs } from "@/hooks/job seeker/useJobs";
import { getInitials, labelCase } from "@/lib/utils";
import { formatNumber } from "@/utils/currency.utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DiscoverOpportunities() {
  const { data, isLoading } = useGetJobs();
  const jobs = data?.items || [];
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="px-2 sm:px-0 lg:px-20 space-y-4">
        {/* Section Header */}
        <div className="flex flex-wrap justify-between gap-2 items-end">
          <div className="grid">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Discover Great Opportunities
            </h2>
            <p className="text-gray-600 mt-3 leading-relaxed">
              Browse the latest openings from top companies using HeyHR to grow
              their teams.
            </p>
          </div>
          <Link
            href="/jobs"
            className="py-1 px-3 rounded-md shadow border border-light bg-white hover:bg-white/75 text-sm "
          >
            View All Jobs
          </Link>
        </div>

        {/* Jobs Grid */}
        <div className="grid sm:grid-cols-3 gap-6">
          {jobs.map((job, idx) => (
            <JobCard {...job} key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

const JobCard = (job: Job) => (
  <Card>
    <CardHeader className="flex justify-between">
      <span className="rounded-md p-1 bg-light *:rounded">
        <Avatar size="lg" className="rounded-md p-1 bg-light *:rounded">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt={job.organizationName ?? "Company Name"}
          />
          <AvatarFallback className="bg-secondary-brand font-semibold text-white">
            {getInitials(job.organizationName ?? "Company Name")}
          </AvatarFallback>
        </Avatar>
      </span>
      <Badge
        variant="secondary"
        className="uppercase p-3 rounded-md font-semibold"
      >
        {labelCase(job.workArrangement)}
      </Badge>
    </CardHeader>
    <CardContent>
      <strong className="text-lg">{job.title}</strong>
      <div className="font-light tracking-wider">
        {job.organizationName}{" "}
        <Badge className="size-0.5 p-0.5 bg-muted/75"></Badge>{" "}
        {job.locationCity}
      </div>

      <div className="flex flex-wrap gap-y-1 gap-x-2 mt-5 *:font-semibold">
        <Badge className="p-3 rounded-md uppercase bg-primary-badge/10 text-primary">
          {labelCase(job.employmentType)}
        </Badge>
        <Badge variant="secondary" className="p-3 rounded-md uppercase">
          {job.departmentName}
        </Badge>
      </div>
    </CardContent>
    <CardFooter>
      <div className="flex flex-wrap gap-1 justify-between border-t-2 border-gray-200 w-full pt-4">
        <span className="font-semibold">
          {formatNumber({ amount: job.salaryMin, notation: "compact" })} -{" "}
          {formatNumber({ amount: job.salaryMax, notation: "compact" })}{" "}
        </span>
        <Link
          href={`/jobs/${job.id}`}
          className="text-primary-badge flex items-center"
        >
          <span className="font-semibold">Apply Now</span>
          <ArrowRight size="1rem" />
        </Link>
      </div>
    </CardFooter>
  </Card>
);
