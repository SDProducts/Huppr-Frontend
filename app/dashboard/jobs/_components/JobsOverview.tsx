"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  FileText,
  Plus,
  UserCheck,
  UserRound,
  UserRoundPlus,
  Users,
} from "lucide-react";
import React from "react";

import JobsListTable from "@/app/dashboard/jobs/_components/JobsListTable";
import { MetricsCardSkeleton } from "@/components/skeletons";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/CustomButton";
import { useGetJobOverviewMetrics } from "@/hooks/employer/useJobs";
import { cn } from "@/lib/utils";
import { JobsMetricSummary, PipelineStageMetric } from "@/types/job";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type JobStatus = "Open" | "On Hold" | "Closed" | "Draft";

type Job = {
  id: string;
  initials: string;
  title: string;
  department: string;
  location: string;
  workType: string;
  applicants: number;
  newApplicants: number;
  status: JobStatus;
  postedOn: string;
  initialsClass: string;
};

type Activity = {
  type: "offer" | "interview" | "application";
  title: string;
  description: string;
  time: string;
};

/* -------------------------------------------------------------------------- */
/* DATA                                                                       */
/* -------------------------------------------------------------------------- */

const jobs: Job[] = [
  {
    id: "JOB-0012",
    initials: "SD",
    title: "Senior Product Designer",
    department: "Product",
    location: "New York, USA",
    workType: "Hybrid",
    applicants: 32,
    newApplicants: 5,
    status: "Open",
    postedOn: "20 May, 2024",
    initialsClass: "bg-blue-50 text-blue-600",
  },
  {
    id: "JOB-0011",
    initials: "FE",
    title: "Frontend Developer",
    department: "Engineering",
    location: "Bengaluru, India",
    workType: "Remote",
    applicants: 48,
    newApplicants: 8,
    status: "Open",
    postedOn: "18 May, 2024",
    initialsClass: "bg-blue-50 text-blue-600",
  },
  {
    id: "JOB-0010",
    initials: "MA",
    title: "Marketing Manager",
    department: "Marketing",
    location: "London, UK",
    workType: "On-site",
    applicants: 15,
    newApplicants: 2,
    status: "Open",
    postedOn: "15 May, 2024",
    initialsClass: "bg-green-50 text-green-600",
  },
  {
    id: "JOB-0009",
    initials: "DS",
    title: "Data Scientist",
    department: "Data",
    location: "New York, USA",
    workType: "Hybrid",
    applicants: 26,
    newApplicants: 3,
    status: "Open",
    postedOn: "12 May, 2024",
    initialsClass: "bg-blue-50 text-blue-600",
  },
  {
    id: "JOB-0008",
    initials: "AC",
    title: "Accountant",
    department: "Finance",
    location: "Bengaluru, India",
    workType: "On-site",
    applicants: 10,
    newApplicants: 1,
    status: "On Hold",
    postedOn: "10 May, 2024",
    initialsClass: "bg-orange-50 text-orange-600",
  },
];

const activities: Activity[] = [
  {
    type: "offer",
    title: "Offer accepted",
    description: "by Michael Brown",
    time: "2 hours ago",
  },
  {
    type: "interview",
    title: "Sarah Johnson",
    description: "moved to Interview",
    time: "5 hours ago",
  },
  {
    type: "application",
    title: "New application",
    description: "for Frontend Developer",
    time: "7 hours ago",
  },
];

/* -------------------------------------------------------------------------- */
/* MAIN                                                                        */
/* -------------------------------------------------------------------------- */

export default function JobsPage() {
  const { data: metricsData, isLoading: isGettingMetrics } =
    useGetJobOverviewMetrics();
  const metrics = metricsData?.summary;
  const pipeline_stages = metricsData?.pipeline || [];

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <div className="">
        <JobsHeader />

        {/* TOP CONTENT */}
        <div className="mt-7 grid gap-7 xl:grid-cols-[minmax(0,1fr)_315px]">
          <div className="min-w-0">
            {isGettingMetrics || !metrics ? (
              <div className="">
                <MetricsCardSkeleton number={4} />
              </div>
            ) : (
              <JobStats metrics={metrics} />
            )}

            <div className="mt-7 bg-white rounded-xl">
              <div className="px-6 pt-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <h2 className="text-xl font-bold">Open Jobs</h2>

                  <Link
                    href={`/dashboard/jobs/list`}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    View all jobs
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
              <JobsListTable />
            </div>

            <div className="mt-7">
              <HiringPipeline pipeline_stages={pipeline_stages} />
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-6">
            <ApplicationsSourceCard />
            <InterviewsCard />
            <RecentActivityCard />
          </aside>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* HEADER                                                                     */
/* -------------------------------------------------------------------------- */

function JobsHeader() {
  const router = useRouter();
  function handleCreateJob() {
    router.push("/dashboard/jobs/create-job?step=1");
  }

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950">
          Jobs
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create, manage and hire the best talent for your organisation.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          label="Talent Pool"
          icon={<Users className="size-4" />}
          className="w-fit! bg-white text-primary! border border-primary-100"
        />
        <Button
          label="Create Job"
          icon={<Plus className="size-4" />}
          onClick={handleCreateJob}
          className="w-fit!"
        />{" "}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* STATS                                                                      */
/* -------------------------------------------------------------------------- */

function JobStats({ metrics }: { metrics: JobsMetricSummary }) {
  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
      <JobStatCard
        icon={BriefcaseBusiness}
        iconClass="bg-blue-100 text-blue-600"
        label="Open Jobs"
        value={metrics.openJobs}
        change="2 from last month"
      />

      <JobStatCard
        icon={FileText}
        iconClass="bg-green-100 text-green-600"
        label="Total Applications"
        value={metrics.totalApplications}
        change="18% from last month"
      />

      <JobStatCard
        icon={Users}
        iconClass="bg-orange-100 text-orange-600"
        label="Candidates in Review"
        value={metrics.candidatesInReview}
        change="7 from last month"
      />

      <JobStatCard
        icon={UserCheck}
        iconClass="bg-purple-100 text-purple-600"
        label="Interviews"
        value={metrics.interviewsOverdue}
        change="4 from last month"
      />

      <JobStatCard
        icon={UserRoundPlus}
        iconClass="bg-pink-100 text-pink-600"
        label="Offers Extended"
        value={metrics.offersExtended}
        change="1 from last month"
      />
    </div>
  );
}

function JobStatCard({
  icon: Icon,
  iconClass,
  label,
  value,
  change,
}: {
  icon: React.ElementType;
  iconClass: string;
  label: string;
  value: string | number;
  change: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-none">
      <div className="p-3 space-y-1.5">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            iconClass
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        <p
          className="text-xs mt-4 font-medium text-slate-500 line-clamp-1"
          title={label}
        >
          {label}
        </p>

        <p className="text-2xl font-extrabold text-slate-900">{value}</p>

        <p
          className="text-[9px] font-medium text-green-500 line-clamp-1"
          title={change}
        >
          ↑ {change}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* APPLICATION SOURCES                                                        */
/* -------------------------------------------------------------------------- */

function ApplicationsSourceCard() {
  const sources = [
    {
      name: "Careers Page",
      count: 142,
      percentage: 41,
      color: "#2563eb",
    },
    {
      name: "LinkedIn",
      count: 98,
      percentage: 28,
      color: "#22c55e",
    },
    {
      name: "Referral",
      count: 54,
      percentage: 16,
      color: "#fb923c",
    },
    {
      name: "Indeed",
      count: 34,
      percentage: 10,
      color: "#a855f7",
    },
    {
      name: "Others",
      count: 18,
      percentage: 6,
      color: "#cbd5e1",
    },
  ];

  return (
    <Card className="rounded-xl border-slate-200 bg-white shadow-none">
      <CardContent className="p-6">
        <h2 className="text-sm font-bold">Applications by Source</h2>

        <div className="mt-5 flex justify-center">
          <div
            className="relative flex h-32 w-32 items-center justify-center rounded-full"
            style={{
              background:
                "conic-gradient(#a855f7 0deg 147deg, #f1f5f9 147deg 360deg)",
            }}
          >
            <div className="flex h-[104px] w-[104px] flex-col items-center justify-center rounded-full bg-white">
              <span className="text-xl font-bold">346</span>
              <span className="mt-1 text-xs text-slate-500">Total</span>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {sources.map((source) => (
            <div key={source.name} className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: source.color }}
              />

              <span className="flex-1 text-xs text-slate-600">
                {source.name}
              </span>

              <span className="text-xs text-slate-600">
                {source.count} ({source.percentage}%)
              </span>
            </div>
          ))}
        </div>

        <button className="mt-6 text-xs font-semibold text-blue-600">
          View full report →
        </button>
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* INTERVIEWS                                                                 */
/* -------------------------------------------------------------------------- */

function InterviewsCard() {
  return (
    <Card className="rounded-xl border-slate-200 bg-white shadow-none">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold">Interviews This Week</h2>

          <button className="text-[11px] font-semibold text-blue-600">
            View calendar →
          </button>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <span className="text-3xl font-bold">16</span>

          <span className="text-xs text-slate-500">Scheduled interviews</span>

          <div className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
            <CalendarDays className="h-5 w-5 text-blue-600" />
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <InterviewRow
            label="Today"
            value="6 interviews"
            color="bg-blue-500"
          />

          <InterviewRow
            label="This week"
            value="16 interviews"
            color="bg-green-500"
          />

          <InterviewRow
            label="Overdue"
            value="1 interview"
            color="bg-red-500"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function InterviewRow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn("h-2 w-2 rounded-full ring-2 ring-offset-1", color)}
      />

      <span className="flex-1 text-xs text-slate-600">{label}</span>

      <span className="text-xs font-semibold text-slate-800">{value}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* RECENT ACTIVITY                                                            */
/* -------------------------------------------------------------------------- */

function RecentActivityCard() {
  return (
    <Card className="rounded-xl border-slate-200 bg-white shadow-none">
      <CardContent className="p-6">
        <h2 className="text-sm font-bold">Recent Activity</h2>

        <div className="mt-5 space-y-5">
          {activities.map((activity) => (
            <ActivityRow key={activity.title} activity={activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityRow({ activity }: { activity: Activity }) {
  const config = {
    offer: {
      icon: UserCheck,
      className: "bg-green-100 text-green-600",
    },
    interview: {
      icon: UserRound,
      className: "bg-purple-100 text-purple-600",
    },
    application: {
      icon: FileText,
      className: "bg-blue-100 text-blue-600",
    },
  };

  const item = config[activity.type];
  const Icon = item.icon;

  return (
    <div className="flex gap-3">
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          item.className
        )}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-700">
          <span className="font-bold">{activity.title}</span>{" "}
          {activity.description}
        </p>

        <p className="mt-2 text-[11px] text-slate-400">{activity.time}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* HIRING PIPELINE                                                            */
/* -------------------------------------------------------------------------- */

function HiringPipeline({
  pipeline_stages,
}: {
  pipeline_stages: PipelineStageMetric[];
}) {
  const stages = [
    {
      label: "Applied",
      value: 346,
      className: "bg-blue-50 text-blue-600",
    },
    {
      label: "Screening",
      value: 98,
      className: "bg-orange-50 text-orange-600",
    },
    {
      label: "Assessment",
      value: 42,
      className: "bg-purple-50 text-purple-600",
    },
    {
      label: "Interview",
      value: 16,
      className: "bg-green-50 text-green-600",
    },
    {
      label: "Offer",
      value: 5,
      className: "bg-red-50 text-red-500",
    },
    {
      label: "Hired",
      value: 3,
      className: "bg-teal-50 text-teal-500",
    },
  ];

  return (
    <Card className="rounded-xl border-slate-200 bg-white shadow-none">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Hiring Pipeline Overview</h2>
        </div>

        <div className="mt-7 flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
          {pipeline_stages.map((stage, index) => (
            <React.Fragment key={index}>
              <div
                className={cn(
                  "min-w-[84px] w-fit overflow-hidden rounded-lg p-2 sm:p-4 bg-primary/5 text-primary"
                  // stage.className
                )}
              >
                <p className="text-xs text-gray-400 capitalize truncate">
                  {stage.key}
                </p>

                <p className="mt-1 text-2xl font-extrabold">{stage.count}</p>
              </div>

              {index !== stages.length - 1 && (
                <ChevronRight className="h-5 w-5 shrink-0 text-slate-300" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* PIPELINE PROGRESS */}
        {/* <div className="mt-5 flex h-1 overflow-hidden rounded-full">
          <div className="w-[35%] bg-blue-600" />
          <div className="w-[25%] bg-orange-500" />
          <div className="w-[15%] bg-purple-500" />
          <div className="w-[10%] bg-green-500" />
          <div className="w-[10%] bg-red-500" />
          <div className="w-[5%] bg-teal-500" />
        </div> */}

        <button className="mt-6 text-sm font-semibold text-blue-600 hover:text-blue-700">
          View full pipeline report →
        </button>
      </CardContent>
    </Card>
  );
}
