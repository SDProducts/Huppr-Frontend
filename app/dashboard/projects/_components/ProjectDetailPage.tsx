"use client";
import EditProject from "@/app/dashboard/departments/[department]/teams/_components/EditProject";
import CreateTask from "@/app/dashboard/projects/_components/CreateTask";
import ProjectMetricCard from "@/app/dashboard/projects/_components/ProjectMetricCard";
import ProjectTimeline from "@/app/dashboard/projects/_components/ProjectTimeline";
import RecentTaskListTable from "@/app/dashboard/projects/_components/RecentTaskListTable";
import { Breadcrumb } from "@/components/global/Breadcrumb";
import { PageLoader } from "@/components/global/PageLoader";
import Button from "@/components/ui/CustomButton";
import { Progress } from "@/components/ui/progress";
import { PriorityPill, TaskStatusPill } from "@/components/utils/Pills";
import { useModal } from "@/context/modal.state";
import { useGetProjectById } from "@/hooks/employer/useDepartment";
import {
  CalendarDays,
  ClipboardCheck,
  Dot,
  LineChart,
  PenLine,
  Plus,
} from "lucide-react";
import { useParams } from "next/navigation";

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const modal = useModal();
  const { data, isLoading } = useGetProjectById(String(projectId));
  if (isLoading || !data) {
    return <PageLoader />;
  }
  const gridDetails = [
    {
      label: "Department",
      value: data.department.name,
    },
    {
      label: "Sub team",
      value: data.team.name,
    },
    {
      label: "Priority",
      value: data.priority,
    },
    {
      label: "Status",
      value: data.status,
    },
    {
      label: "Start Date",
      value: data.startDate,
    },
    {
      label: "End Date",
      value: data.endDate,
    },
    {
      label: "Resource Manager",
      value: data.resourceManager.displayName,
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div className="sm:flex justify-between items-start py-5">
          <div className="sm:w-1/2 space-y-4">
            <div className="">
              <Breadcrumb />
            </div>
            <h2 className="text-3xl font-extrabold capitalize">{data.name}</h2>
            <p className="line-clamp-1">{data.description}</p>
          </div>
          <div className="flex flex-col lg:flex-row items-end lg:items-center gap-2">
            <Button
              onClick={() => {
                modal.open({
                  content: <EditProject projectId={data.id} />,
                  size: "sm:w-2xl",
                  bgColor: "",
                });
              }}
              icon={<PenLine size={16} />}
              label="Edit Project"
              className="w-fit! px-5 bg-white text-primary! border border-primary/20"
            />
            <Button
              icon={<Plus size={16} />}
              label="Create Task"
              className="w-fit! px-5"
              onClick={() => {
                modal.open({
                  content: (
                    <CreateTask project={{ name: data.name, id: data.id }} />
                  ),
                  size: "sm:w-2xl",
                  bgColor: "",
                });
              }}
            />
          </div>
        </div>
        <div className="sm:w-2/3 grid grid-cols-4 gap-y-5">
          {gridDetails.map((item, i) => (
            <div className="" key={i}>
              <div className="font-bold text-sm">{item.label}</div>
              {item.label === "Priority" ? (
                <div className="">
                  <PriorityPill priority={item.value || ""} />
                </div>
              ) : item.label === "Status" ? (
                <div className="">
                  <TaskStatusPill status={item.value || ""} />
                </div>
              ) : (
                <div className="">{item.value}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <ProjectMetricCard title="status" value={data.status} icon={Dot} />
        <ProjectMetricCard
          title="Progress"
          value={`${data.progress.percent || 0} %`}
          icon={LineChart}
          extra={
            <Progress
              indicatorClassName=""
              value={data.progress.percent || 0}
            />
          }
        />
        <ProjectMetricCard
          title="Total Tasks"
          value={`${data.progress.totalTasks}`}
          icon={ClipboardCheck}
        />
        <ProjectMetricCard
          title="Due Date"
          value={`${data.endDate}`}
          icon={CalendarDays}
        />
      </div>
      <div className="grid grid-cols-[2fr_1fr] gap-4">
        <div className="space-y-4">
          <ProjectTimeline endDate={data.endDate} startDate={data.startDate} />
          <RecentTaskListTable />
        </div>
        <div className="">
          <div className="p-4 sm:p-8 bg-white rounded-lg">
            <h2 className="text-2xl font-bold">Assigned Team</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
