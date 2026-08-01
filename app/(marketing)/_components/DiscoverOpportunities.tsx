import {
  MapPin,
  Briefcase,
  DollarSign,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Job } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

const jobs: Job[] = [
  {
    id: "job-00001-000000",
    title: "Senior Product Designer",
    company_name: "Lumina Creative",
    location_state: "New York, NY",
    work_mode: "remote",

    department: "DESIGN",
    description: "",
    employment_type: "Full time",

    salary_min: 120000,
    salary_max: 160000,
    salary_currency: "NGN",
    salary_period: "month",

    requirements: [],
    responsibilities: [],
    preferred_qualifications: [],
    skills: [],
    benefits: [],

    openings: 1,
    application_deadline: "25-08-2026",

    internal_notes: "",
    created_by: "",
    created_at: "25-07-2026",
    updated_at: "29-08-2026",
  },
];

export default function DiscoverOpportunities() {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="px-4 sm:px-6 lg:px-8 space-y-4">
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
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(min(25rem,_100%),_1fr))] gap-6">
          {jobs.map((job, idx) => (
            // <div
            //   key={idx}
            //   className={`group bg-white rounded-2xl border p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
            //     job.featured ? "border-indigo-200 shadow-md" : "border-gray-100"
            //   }`}
            // >
            //   {job.featured && (
            //     <div className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold mb-3">
            //       Featured
            //     </div>
            //   )}
            //   <div className="flex items-start justify-between">
            //     <div>
            //       <h3 className="font-semibold text-gray-900 text-base group-hover:text-indigo-600 transition">
            //         {job.title}
            //       </h3>
            //       <p className="text-sm text-gray-500 mt-0.5">{job.company}</p>
            //     </div>
            //     <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
            //       {job.category}
            //     </span>
            //   </div>

            //   <div className="mt-4 space-y-1.5 text-sm text-gray-500">
            //     <div className="flex items-center gap-2">
            //       <MapPin className="w-3.5 h-3.5" />
            //       <span>{job.location}</span>
            //     </div>
            //     <div className="flex items-center gap-2">
            //       <DollarSign className="w-3.5 h-3.5" />
            //       <span>{job.salary}</span>
            //     </div>
            //     <div className="flex items-center gap-2">
            //       <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            //       <span>{job.type}</span>
            //     </div>
            //   </div>

            //   <button className="mt-4 w-full py-2.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition flex items-center justify-center gap-2">
            //     Apply Now
            //     <ExternalLink className="w-3.5 h-3.5" />
            //   </button>
            // </div>
            //
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
            alt={job.company_name ?? "Company Name"}
          />
          <AvatarFallback className="bg-secondary-brand font-semibold text-white">
            {getInitials(job.company_name ?? "Company Name")}
          </AvatarFallback>
        </Avatar>
      </span>
      <Badge
        variant="secondary"
        className="uppercase p-3 rounded-md font-semibold"
      >
        {job.work_mode}
      </Badge>
    </CardHeader>
    <CardContent>
      <strong className="text-lg">{job.title}</strong>
      <div className="font-light tracking-wider">
        {job.company_name}{" "}
        <Badge className="size-0.5 p-0.5 bg-muted/75"></Badge>{" "}
        {job.location_state}
      </div>

      <div className="flex flex-wrap gap-y-1 gap-x-2 mt-5 *:font-semibold">
        <Badge className="p-3 rounded-md uppercase bg-primary-badge/10 text-primary">
          {job.employment_type}
        </Badge>
        <Badge variant="secondary" className="p-3 rounded-md uppercase">
          {job.department}
        </Badge>
      </div>
    </CardContent>
    <CardFooter>
      <div className="flex flex-wrap gap-1 justify-between border-t-2 border-gray-200 w-full pt-4">
        <span className="font-semibold">
          {new Intl.NumberFormat("en", {
            currency: job.salary_currency ?? "NGN",
            notation: "compact",
            style: "currency",
          }).format(job.salary_min)}{" "}
          -{" "}
          {new Intl.NumberFormat("en", {
            currency: job.salary_currency ?? "NGN",
            notation: "compact",
            style: "currency",
          }).format(job.salary_max)}{" "}
        </span>
        <Link
          href={job.apply_url ?? `/jobs/${job.id}`}
          className="text-primary-badge flex items-center"
        >
          <span className="font-semibold">Apply Now</span>
          <ArrowRight size="1rem" />
        </Link>
      </div>
    </CardFooter>
  </Card>
);
