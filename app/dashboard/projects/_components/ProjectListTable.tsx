"use client";
import Input from "@/components/form/Input";
import SearchableSelect from "@/components/form/SearchableSelect";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { TaskStatusPill } from "@/components/utils/Pills";
import { TableHead } from "@/components/utils/Table";
import { useGetProjects } from "@/hooks/employer/useDepartment";
import { cn, getInitials, labelCase } from "@/lib/utils";
import { ProjectItem } from "@/types/get_projects";
import { Form, Formik } from "formik";
import { Edit, Eye, MoreHorizontal, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProjectListTable() {
  const { data: projectData } = useGetProjects();
  const PROJECT_STATUS = ["", "active", "overdue", "completed", "on_hold"];
  const SORT_OPTIONS = [
    { label: "Due date (Ealiest)", value: "due_date_desc" },
    { label: "Due date (Latest)", value: "due_date_asc" },
    { label: "Name ", value: "name" },
  ];
  const initialValues = {
    status: "",
    department: "",
    sort: "due_date_desc",
    search: "",
  };
  const [filterParams, setfilterParams] = useState(initialValues);
  function handleFilter(params: typeof filterParams) {
    console.log("form Params:", params);
  }
  const projects = projectData?.items || [];
  return (
    <div className="bg-white p-6 rounded-xl space-y-6">
      <Formik
        initialValues={filterParams}
        enableReinitialize
        onSubmit={handleFilter}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="grid grid-cols-5 gap-1 bg-gray-200 p-1 rounded-md">
                  {PROJECT_STATUS.map((item, i) => (
                    <div
                      className={cn(
                        "rounded-sm h-10 cursor-pointer hover:bg-white/70 px-2 flex text-sm justify-center items-center capitalize",
                        values.status === item
                          ? "bg-white font-bold"
                          : "bg-transparent"
                      )}
                      key={i}
                      onClick={() => setFieldValue("status", item)}
                    >
                      {labelCase(item || "All")}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <SearchableSelect
                    name="department"
                    options={[]}
                    placeholder="All departments"
                    className="bg-gray-200 h-11"
                  />
                  <div className="flex items-center gap-2 px-4 h-11 bg-gray-200 rounded-md">
                    <div className="">Sort:</div>
                    <SearchableSelect
                      name="sort"
                      options={SORT_OPTIONS}
                      className="bg-gray-200 py-0! px-0!"
                      optionsClassName="min-w-45!"
                    />
                  </div>
                </div>
              </div>
              <div className="w-2/3">
                <Input
                  icon={<Search className="size-4" />}
                  name="search"
                  placeholder="Search by project title, milestone, department, or project lead..."
                  className="bg-gray-200"
                />
              </div>
            </Form>
          );
        }}
      </Formik>

      <div className="">
        <table className="w-full min-w-[850px]">
          <thead>
            <tr className="border-b border-slate-100 uppercase">
              <TableHead>project NAME</TableHead>
              <TableHead>DEPARTMENT</TableHead>
              <TableHead>Project lead</TableHead>
              <TableHead>team</TableHead>
              <TableHead>progress</TableHead>
              <TableHead>status</TableHead>
              <th className="w-12 px-4" />
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <TableRow key={project.id} project={project} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableRow({ project }: { project: ProjectItem }) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 bg-blue-100 text-primary shrink-0 items-center justify-center rounded-md text-xs font-bold"
            )}
          >
            {getInitials(project.name)}
          </div>

          <Link href={`/dashboard/projects/${project.id}`} className="max-w-45">
            <div className="whitespace-nowrap hover:underline focus:underline text-sm font-bold text-slate-900">
              {project.name}
            </div>

            <p className="mt-1 whitespace-nowrap text-xs text-slate-500 truncate">
              {project.description}
            </p>
          </Link>
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-slate-500">
        {project.department.name}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-1">
          <Avatar size="sm">
            <AvatarImage
              src={project.resourceManager.avatarUrl || ""}
              alt="Project lead"
            />
            <AvatarFallback>{getInitials(project.name)}</AvatarFallback>
          </Avatar>
          <p className="whitespace-nowrap text-sm text-slate-500">
            {project.resourceManager.displayName || "None"}
          </p>
        </div>
      </td>

      <td className="px-6 py-4 text-slate-500">
        <p className="text-sm">{project.team.name}</p>
      </td>

      <td className="px-6 py-4 min-w-40">
        <div className="space-y-0.5">
          <div className="flex text-[9px] justify-between items-center">
            <div className="">32/44</div>
            <div className="">72%</div>
          </div>
          <Progress indicatorClassName="" value={72} />
        </div>
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
        <TaskStatusPill status={project.status} />{" "}
        {/* {getDate(project.endDate || "")} */}
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
                href={`/dashboard/projects/${project.id}`}
                className="flex items-center gap-2 w-full"
              >
                <div className="h-6 w-6 bg-primary-100 flex justify-center items-center rounded-md">
                  <Eye className="size-3" />
                </div>
                <div className="flex-1">View</div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(
                "hover:bg-primary/10! text-primary! hover:text-primary! flex items-center gap-2"
              )}
            >
              <div className="h-6 w-6 bg-primary/5 flex justify-center items-center rounded-md">
                <Edit className="size-3" />
              </div>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(
                "hover:bg-red-100! text-red-500! hover:text-red-500! flex items-center gap-2"
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
