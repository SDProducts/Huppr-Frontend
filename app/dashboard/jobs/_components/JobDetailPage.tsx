"use client";

import { PageLoader } from "@/components/global/PageLoader";
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
import { useGetJobById, useGetJobStatsById } from "@/hooks/employer/useJobs";
import { cn, getDate, labelCase } from "@/lib/utils";
import {
  BriefcaseBusiness,
  Building2,
  Calendar,
  Calendar1,
  Edit,
  Eye,
  FileText,
  LampDesk,
  LucideIcon,
  MapPin,
  MoreVertical,
  Pen,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const JobDetailPage = () => {
  const { jobId } = useParams();
  const { data: job, isLoading } = useGetJobById(String(jobId));
  const { data: jobStats, isLoading: isGettingStats } = useGetJobStatsById(
    String(jobId)
  );

  if (isLoading || !job) {
    return <PageLoader />;
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
            <Tag name={job.departmentId} icon={Building2} />
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
          <Button className={cn("py-5 bg-white text-primary!")}>
            <Eye />
            <span>View Role</span>
          </Button>
          <Button className={cn("py-5 ")}>
            <Pen />
            <span>Edit Pipeline</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className={"p-0!"}>
              <Button className={cn("py-5 bg-white text-primary!")}>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={cn("min-w-50")}>
              <DropdownMenuItem
                className={cn("hover:bg-primary-100! hover:text-primary!")}
              >
                <Link
                  href={`/dashboard/jobs/${job.id}`}
                  className="flex items-center gap-2 w-full"
                >
                  <div className="h-6 w-6 bg-primary-100 flex justify-center items-center rounded-md">
                    <Eye className="size-3" />
                  </div>
                  <div className="flex-1">View</div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <div className="h-6 w-6 bg-accent flex justify-center items-center rounded-md">
                    <Edit className="size-3" />
                  </div>
                  Edit
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
                <div className="h-6 w-6 bg-red-100 flex justify-center items-center rounded-md">
                  <Trash2 className="size-3" />
                </div>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>{" "}
        </div>
      </div>
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
    <div className="flex gap-2 p-5 bg-white rounded-xl hover:shadow">
      <div
        className={cn(
          "size-10 flex justify-center items-center rounded-md",
          stats.accent
        )}
      >
        <stats.icon className="size-6" />
      </div>
      <div className="space-y-2">
        <div className="text-gray-500">{stats.label}</div>
        <div className="text-3xl font-extrabold">{stats.value}</div>
      </div>
    </div>
  );
}
