"use client";

import AddNewCandidate from "@/app/dashboard/jobs/_components/AddNewCandidate";
import CandidatePipeline from "@/app/dashboard/jobs/_components/CandidatePipeline";
import CandidatesTableList from "@/app/dashboard/jobs/_components/CandidatesTableList";
import JobDetail from "@/app/dashboard/jobs/_components/JobDetail";
import { PageLoader } from "@/components/global/PageLoader";
import { MetricsCardSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TaskStatusPill } from "@/components/utils/Pills";
import { useModal } from "@/context/modal.state";
import { useGetJobById, useGetJobStatsById } from "@/hooks/employer/useJobs";
import { cn, getDate, labelCase } from "@/lib/utils";
import {
  BriefcaseBusiness,
  Building2,
  Calendar,
  Calendar1,
  FileText,
  LampDesk,
  LucideIcon,
  MapPin,
  MoreVertical,
  Pen,
  Plus,
  Trash2,
  Users,
  Waypoints,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const JobDetailPage = () => {
  type Tabs =
    | "job details"
    | "candidates"
    | "pipeline"
    | "analytics"
    | "activity";
  const TABS: Tabs[] = [
    "job details",
    "candidates",
    "pipeline",
    "analytics",
    "activity",
  ];
  const [activeTab, setactiveTab] = useState<Tabs>("job details");
  const modal = useModal();
  const { jobId } = useParams();
  const { data: job, isLoading } = useGetJobById(String(jobId));
  const { data: jobStats, isLoading: isGettingStats } = useGetJobStatsById(
    String(jobId)
  );

  function handleAddNewCandidate() {
    modal.open({
      content: <AddNewCandidate />,
      size: "md:w-xl",
      bgColor: "bg-slate-100",
      headerColor: "bg-primary-heading",
      header: (
        <div className="">
          <h2 className="text-2xl font-bold text-white">Add New Candidate</h2>
          <p className="text-sm text-white">
            Add new candidates, select recruitment stage and professional info.{" "}
          </p>
        </div>
      ),
    });
  }

  if (isLoading || !job) {
    return <PageLoader text="Getting Job Details..." />;
  }
  function renderTabContent() {
    if (activeTab === "job details") {
      if (job) {
        return <JobDetail jobData={job} />;
      }
      return <PageLoader text="Getting Job Details..." />;
    }
    if (activeTab === "candidates") {
      return <CandidatesTableList />;
    }
    if (activeTab === "pipeline") {
      return <CandidatePipeline />;
    }
    if (activeTab === "activity") {
      return <div></div>;
    }
    if (activeTab === "analytics") {
      return <div></div>;
    }
    return <PageLoader text="Getting Job Details..." />;
  }

  return (
    <div className="space-y-10">
      <div className="flex items-start justify-between">
        <div className="flex-1 truncate space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-bold">{job.title}</h2>
            <div className="">
              <TaskStatusPill status={job.status} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Tag name={job.departmentName} icon={Building2} />
            <Tag
              name={`${job.locationCity} ${job.locationCountry}`}
              icon={MapPin}
            />
            <Tag
              name={labelCase(job.employmentType)}
              icon={BriefcaseBusiness}
            />
            <Tag name={labelCase(job.workArrangement)} icon={LampDesk} />
            <Tag name={`${job.positions} positions`} icon={Users} />
            <Tag name={`Posted on ${getDate(job.createdAt)}`} icon={Calendar} />
          </div>
        </div>
        <div className=" flex items-center gap-1.5">
          <Button className={cn("py-5")} onClick={handleAddNewCandidate}>
            <Plus />
            <span>Add New Candidate</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className={"p-0!"}>
              <Button className={cn("py-5 bg-white text-primary!")}>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={cn("min-w-50")}>
              <DropdownMenuItem
                onClick={handleAddNewCandidate}
                className={cn("hover:bg-primary-100! hover:text-primary!")}
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="h-6 w-6 bg-primary-100 flex justify-center items-center rounded-sm">
                    <Plus className="size-3" />
                  </div>
                  <div className="flex-1">Add Candidate</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setactiveTab("candidates")}
                className={cn("hover:bg-primary-100! hover:text-primary!")}
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="h-6 w-6 bg-primary-100 flex justify-center items-center rounded-sm">
                    <Users className="size-3" />
                  </div>
                  <div className="flex-1">View candidates</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setactiveTab("candidates")}
                className={cn("hover:bg-primary-100! hover:text-primary!")}
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="h-6 w-6 bg-primary-100 flex justify-center items-center rounded-sm">
                    <Waypoints className="size-3" />
                  </div>
                  <div className="flex-1">View pipeline stages</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger
                  className={cn("focus:bg-primary-100! focus:text-primary! ")}
                >
                  <div className="size-6 bg-primary-100 flex justify-center items-center rounded-sm">
                    <Pen className="size-3" />
                  </div>
                  Edit Job
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className={cn("min-w-50")}>
                  <DropdownMenuItem className={cn("hover:bg-gray-100")}>
                    <Link
                      href={`/dashboard/jobs/create-job?step=1&jobId=${job.id}`}
                      className="flex items-center gap-2 w-full text-sm text-gray-600"
                    >
                      <div className="h-6 w-6 bg-primary-100 flex justify-center items-center rounded-md">
                        <Pen className="size-3" />
                      </div>
                      Job Details (step 1)
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className={cn("hover:bg-gray-100")}>
                    <Link
                      href={`/dashboard/jobs/create-job?step=2&jobId=${job.id}`}
                      className="flex items-center gap-2 w-full text-sm text-gray-600"
                    >
                      <div className="h-6 w-6 bg-primary-100 flex justify-center items-center rounded-md">
                        <Pen className="size-3" />
                      </div>
                      ATS & Screening (step 2)
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className={cn("hover:bg-gray-100")}>
                    <Link
                      href={`/dashboard/jobs/create-job?step=3&jobId=${job.id}`}
                      className="flex items-center gap-2 w-full text-sm text-gray-600"
                    >
                      <div className="h-6 w-6 bg-primary-100 flex justify-center items-center rounded-md">
                        <Pen className="size-3" />
                      </div>
                      Hiring Process (step 3)
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className={cn("hover:bg-gray-100")}>
                    <Link
                      href={`/dashboard/jobs/create-job?step=4&jobId=${job.id}`}
                      className="flex items-center gap-2 w-full text-sm text-gray-600"
                    >
                      <div className="h-6 w-6 bg-primary-100 flex justify-center items-center rounded-md">
                        <Pen className="size-3" />
                      </div>
                      Publish changes (step 4)
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuItem
                className={cn(
                  "hover:bg-red-100! text-red-500! hover:text-red-500! flex items-center gap-1"
                )}
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="size-6 bg-red-100 flex justify-center items-center rounded-sm">
                    <Trash2 className="size-3" />
                  </div>
                  Delete
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>{" "}
        </div>
      </div>
      {isGettingStats ? (
        <MetricsCardSkeleton number={4} />
      ) : (
        <div className="grid grid-cols-4 gap-2">
          <MetricCard
            label="Total Applications"
            value={jobStats?.totalApplications || 0}
            icon={Users}
            accent="bg-primary/5 text-primary"
          />
          <MetricCard
            label="Reviewed"
            value={jobStats?.reviewed || 0}
            icon={FileText}
            accent="bg-green-500/5 text-green-500"
          />
          <MetricCard
            label="Interviewed"
            value={jobStats?.interviewed || 0}
            icon={Calendar1}
            accent="bg-purple-600/5 text-purple-600"
          />
          <MetricCard
            label="Rejected"
            value={jobStats?.totalApplications || 0}
            icon={XCircle}
            accent="bg-red-500/5 text-red-500"
          />
        </div>
      )}
      <div className="space-y-5">
        <div className="flex items-center gap-8 border-b border-gray-200">
          {TABS.map((tab) => (
            <div
              onClick={() => setactiveTab(tab)}
              className={cn(
                "py-3 cursor-pointer border-b-2",
                activeTab === tab
                  ? "border-primary font-extrabold text-primary"
                  : "border-transparent hover:border-gray-200 hover:text-gray-700 text-muted-foreground"
              )}
              key={tab}
            >
              <div className={cn("capitalize", activeTab === tab ? "" : "")}>
                {tab}
              </div>
            </div>
          ))}
        </div>

        <div className="">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default JobDetailPage;

interface TagProp {
  name: string;
  icon: LucideIcon;
}
function Tag(prop: TagProp) {
  return (
    <div className="flex items-center gap-1 text-xs">
      <prop.icon className="size-4" />
      <div className="max-w-40 truncate">{prop.name}</div>
    </div>
  );
}

interface StatsProp {
  label: string;
  value: string | number;
  accent: string;
  icon: LucideIcon;
}

function MetricCard(stats: StatsProp) {
  return (
    <div className="flex gap-2 p-5 bg-white rounded-xl hover:shadow group hover:bg-primary-heading">
      <div
        className={cn(
          "size-10 flex justify-center items-center rounded-md group-hover:bg-white",
          stats.accent
        )}
      >
        <stats.icon className="size-6" />
      </div>
      <div className="space-y-2">
        <div className="text-gray-500 group-hover:text-white">
          {stats.label}
        </div>
        <div className="text-3xl font-extrabold group-hover:text-white">
          {stats.value}
        </div>
      </div>
    </div>
  );
}
