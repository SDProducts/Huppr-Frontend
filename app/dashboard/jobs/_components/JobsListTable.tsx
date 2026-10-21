import ActivityEmptyState from "@/components/EmptyState";
import Button from "@/components/ui/CustomButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetJobs } from "@/hooks/employer/useJobs";
import { cn, getDate, getInitials, labelCase } from "@/lib/utils";
import { JobListItem } from "@/types/job";
import {
  ChevronDown,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Pen,
  Trash2,
} from "lucide-react";

import Link from "next/link";
import React from "react";

interface Props {
  listLenght?: number;
}
const JobsListTable: React.FC<Props> = ({ listLenght }) => {
  const tabs: JobStatus[] = ["all", "open", "on_hold", "closed", "draft"];
  const [filterParams, setfilterParams] = React.useState<JobsFilters>({
    status: "all",
    limit: listLenght,
  });
  const { data, isLoading } = useGetJobs(filterParams);
  const jobs = data?.items || [];

  return (
    <div className="overflow-hidden rounded-xl py-4 border-slate-200 bg-white shadow-none">
      <div className="border-b border-slate-100 px-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setfilterParams({ ...filterParams, status: tab })
                }
                className={cn(
                  "relative whitespace-nowrap pb-4 text-sm font-medium transition",
                  filterParams.status === tab
                    ? "text-blue-600"
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                {labelCase(tab)}

                {filterParams.status === tab && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
                )}
              </button>
            ))}
          </div>

          <Button
            className="ml-2 hidden shrink-0 md:flex w-fit! bg-white text-primary! border border-primary"
            icon={<Filter className="h-4 w-4" />}
            label="Filters"
            rightIcon={<ChevronDown className="h-4 w-4" />}
          />
        </div>
      </div>

      <div className="p-0">
        {/* DESKTOP TABLE */}
        {jobs.length < 1 ? (
          <div className="p-2">
            <ActivityEmptyState title="No job found" />
          </div>
        ) : (
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
        )}

        {/* MOBILE */}
        <div className="divide-y divide-slate-100 md:hidden">
          {jobs.map((job) => (
            <MobileJobRow key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsListTable;

function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-6 py-4 text-left text-[11px] font-medium tracking-wide text-slate-500">
      {children}
    </th>
  );
}

function JobRow({ job }: { job: JobListItem }) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 bg-blue-100 text-primary shrink-0 items-center justify-center rounded-md text-xs font-bold"
            )}
          >
            {getInitials(job.title)}
          </div>

          <Link href={`/dashboard/jobs/${job.id}`} className="max-w-45">
            <div className="whitespace-nowrap hover:underline focus:underline text-sm font-bold text-slate-900">
              {job.title}
            </div>

            <p className="mt-1 whitespace-nowrap text-xs text-slate-500 truncate">
              Full-time • ID: {job.id}
            </p>
          </Link>
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-slate-500">{"Department"}</td>

      <td className="px-6 py-4">
        <p className="whitespace-nowrap text-sm text-slate-500">
          {job.locationCity}
        </p>
      </td>

      <td className="px-6 py-4">
        <p className="text-sm font-bold">{job.applicationCount}</p>
        <p className="text-xs text-primary">New: {job.newApplicationCount}</p>
      </td>

      <td className="px-6 py-4">
        <StatusBadge status={job.status} />
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
        {getDate(job.postedOn || "")}
      </td>

      <td className="px-4">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={
              "p-2 rounded-lg cursor-pointer text-slate-500 hover:bg-gray-200"
            }
          >
            <div className="">
              <MoreHorizontal className="h-4 w-4" />
            </div>
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
      </td>
    </tr>
  );
}

function MobileJobRow({ job }: { job: JobListItem }) {
  return (
    <div className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-2">
          <div
            className={cn(
              "flex h-10 w-10 bg-blue-100 text-primary shrink-0 items-center justify-center rounded-md text-xs font-bold"
            )}
          >
            {getInitials(job.title)}
          </div>

          <div>
            <p className="text-sm font-bold">{job.title}</p>

            <p className="mt-1 text-xs text-slate-500">
              {"Department"} • {job.locationCity}
            </p>

            {/* <p className="mt-1 text-xs text-slate-500">
              posted on: • {getDate(job.postedOn || "")}
            </p> */}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={
              "p-2 rounded-lg cursor-pointer text-slate-500 hover:bg-gray-200"
            }
          >
            <div className="">
              <MoreHorizontal className="h-4 w-4" />
            </div>
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

      <div className="mt-2 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold">{job.applicationCount} applicants</p>
          <p className="text-xs font-semibold text-blue-600">
            New: {job.newApplicationCount}
          </p>
        </div>

        <StatusBadge status={job.status} />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: JobStatus }) {
  const styles: Record<JobStatus, string> = {
    all: "",
    active: "",
    inactive: "",
    open: "bg-green-100 text-green-700",
    on_hold: "bg-orange-100 text-orange-700",
    closed: "bg-slate-100 text-slate-600",
    draft: "bg-purple-100 text-purple-700",
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
