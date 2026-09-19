"use client";

import {
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  UserCheck,
  UserRound,
  UserRoundPlus,
  Users,
} from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
  const [activeTab, setActiveTab] = React.useState("All");

  const filteredJobs = React.useMemo(() => {
    if (activeTab === "All") return jobs;

    return jobs.filter((job) => job.status === activeTab);
  }, [activeTab]);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <div className="">
        <JobsHeader />

        {/* TOP CONTENT */}
        <div className="mt-7 grid gap-7 xl:grid-cols-[minmax(0,1fr)_315px]">
          <div className="min-w-0">
            <JobStats />

            <div className="mt-7">
              <JobsTable
                jobs={filteredJobs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            <div className="mt-7">
              <HiringPipeline />
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
          variant="outline"
          className="h-11 border-slate-200 bg-white px-5"
        >
          <Users className="mr-2 h-4 w-4" />
          Talent Pool
        </Button>

        <Button className="h-11 bg-blue-600 px-5 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Create Job
        </Button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* STATS                                                                      */
/* -------------------------------------------------------------------------- */

function JobStats() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      <JobStatCard
        icon={BriefcaseBusiness}
        iconClass="bg-blue-100 text-blue-600"
        label="Open Jobs"
        value="12"
        change="2 from last month"
      />

      <JobStatCard
        icon={FileText}
        iconClass="bg-green-100 text-green-600"
        label="Total Applications"
        value="346"
        change="18% from last month"
      />

      <JobStatCard
        icon={Users}
        iconClass="bg-orange-100 text-orange-600"
        label="Candidates in Review"
        value="28"
        change="7 from last month"
      />

      <JobStatCard
        icon={UserCheck}
        iconClass="bg-purple-100 text-purple-600"
        label="Interviews"
        value="16"
        change="4 from last month"
      />

      <JobStatCard
        icon={UserRoundPlus}
        iconClass="bg-pink-100 text-pink-600"
        label="Offers Extended"
        value="5"
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
  value: string;
  change: string;
}) {
  return (
    <Card className="rounded-xl border-slate-200 bg-white shadow-none">
      <CardContent className="p-4">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            iconClass
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        <p className="mt-5 text-xs font-medium text-slate-500">{label}</p>

        <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>

        <p className="mt-3 text-[11px] font-medium text-green-500">
          ↑ {change}
        </p>
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* JOBS TABLE                                                                 */
/* -------------------------------------------------------------------------- */

function JobsTable({
  jobs,
  activeTab,
  setActiveTab,
}: {
  jobs: Job[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const tabs = ["All", "Open", "On Hold", "Closed", "Draft"];

  return (
    <Card className="overflow-hidden rounded-xl border-slate-200 bg-white shadow-none">
      <CardHeader className="border-b border-slate-100 px-6 pb-0 pt-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-bold">Open Jobs</h2>

          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            View all jobs →
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative whitespace-nowrap pb-4 text-sm font-medium transition",
                  activeTab === tab
                    ? "text-blue-600"
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                {tab}

                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
                )}
              </button>
            ))}
          </div>

          <Button variant="outline" className="ml-2 hidden shrink-0 md:flex">
            <Filter className="mr-2 h-4 w-4" />
            Filters
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* DESKTOP TABLE */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-slate-100">
                <TableHead>JOB TITLE</TableHead>
                <TableHead>DEPARTMENT</TableHead>
                <TableHead>LOCATION</TableHead>
                <TableHead>APPLICANTS</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>POSTED ON</TableHead>
                <th className="w-12 px-4" />
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <JobRow key={job.id} job={job} />
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE */}
        <div className="divide-y divide-slate-100 md:hidden">
          {jobs.map((job) => (
            <MobileJobRow key={job.id} job={job} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-6 py-4 text-left text-[11px] font-medium tracking-wide text-slate-500">
      {children}
    </th>
  );
}

function JobRow({ job }: { job: Job }) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-xs font-bold",
              job.initialsClass
            )}
          >
            {job.initials}
          </div>

          <div>
            <p className="whitespace-nowrap text-sm font-bold text-slate-900">
              {job.title}
            </p>

            <p className="mt-1 whitespace-nowrap text-xs text-slate-500">
              Full-time • ID: {job.id}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-slate-500">{job.department}</td>

      <td className="px-6 py-4">
        <p className="whitespace-nowrap text-sm text-slate-500">
          {job.location}
        </p>
        <p className="mt-1 text-xs text-slate-500">{job.workType}</p>
      </td>

      <td className="px-6 py-4">
        <p className="text-sm font-bold">{job.applicants}</p>
        <p className="text-xs font-semibold text-blue-600">
          New: {job.newApplicants}
        </p>
      </td>

      <td className="px-6 py-4">
        <StatusBadge status={job.status} />
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
        {job.postedOn}
      </td>

      <td className="px-4">
        <button className="rounded-md p-2 text-slate-500 hover:bg-slate-100">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
}

function MobileJobRow({ job }: { job: Job }) {
  return (
    <div className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-xs font-bold",
              job.initialsClass
            )}
          >
            {job.initials}
          </div>

          <div>
            <p className="text-sm font-bold">{job.title}</p>

            <p className="mt-1 text-xs text-slate-500">
              {job.department} • {job.location}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {job.workType} • {job.id}
            </p>
          </div>
        </div>

        <button>
          <MoreHorizontal className="h-4 w-4 text-slate-500" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold">{job.applicants} applicants</p>
          <p className="text-xs font-semibold text-blue-600">
            New: {job.newApplicants}
          </p>
        </div>

        <StatusBadge status={job.status} />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: JobStatus }) {
  const styles: Record<JobStatus, string> = {
    Open: "bg-green-100 text-green-700",
    "On Hold": "bg-orange-100 text-orange-700",
    Closed: "bg-slate-100 text-slate-600",
    Draft: "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        styles[status]
      )}
    >
      {status}
    </span>
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

function HiringPipeline() {
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

        <div className="mt-7 flex items-center gap-2 overflow-x-auto pb-2">
          {stages.map((stage, index) => (
            <React.Fragment key={stage.label}>
              <div
                className={cn(
                  "min-w-[84px] rounded-lg px-4 py-4",
                  stage.className
                )}
              >
                <p className="text-xs opacity-70">{stage.label}</p>

                <p className="mt-1 text-2xl font-bold">{stage.value}</p>
              </div>

              {index !== stages.length - 1 && (
                <ChevronRight className="h-5 w-5 shrink-0 text-slate-300" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* PIPELINE PROGRESS */}
        <div className="mt-5 flex h-1 overflow-hidden rounded-full">
          <div className="w-[35%] bg-blue-600" />
          <div className="w-[25%] bg-orange-500" />
          <div className="w-[15%] bg-purple-500" />
          <div className="w-[10%] bg-green-500" />
          <div className="w-[10%] bg-red-500" />
          <div className="w-[5%] bg-teal-500" />
        </div>

        <button className="mt-6 text-sm font-semibold text-blue-600 hover:text-blue-700">
          View full pipeline report →
        </button>
      </CardContent>
    </Card>
  );
}
