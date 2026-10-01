"use client";
import ActivityEmptyState from "@/components/EmptyState";
import { ProjectListTableSkeleton } from "@/components/skeletons";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Pill, TaskStatusPill } from "@/components/utils/Pills";
import { useGetProjects } from "@/hooks/employer/useDepartment";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const ProjectListTable = () => {
  const { teamId } = useParams();
  const { data, isLoading } = useGetProjects({ teamId: teamId?.toString() });
  const projects = data?.items || [];
  function projectList() {
    if (isLoading) {
      return <ProjectListTableSkeleton />;
    }
    if (projects.length < 1) {
      return <ActivityEmptyState title="No projects found" />;
    }
    return (
      <div className="space-y-0 divide-y divide-gray-200 py-2">
        {projects.map((project, i) => (
          <div
            key={i}
            className="grid grid-cols-[3fr_2fr_5fr_2fr_2fr_1fr] py-2 gap-4"
          >
            <div className="line-clamp-1" title={project.name}>
              <Link href={`/dashboard/projects/${project.id}`}>
                {project.name}
              </Link>
            </div>
            <div className="">
              <Pill priority={project.priority} />
            </div>
            <div className="">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Progress indicatorClassName="" value={10} />
                </div>
                <div className="">10%</div>
              </div>
            </div>
            <div className="">
              {project.resourceManager.displayName || "None"}
            </div>
            <div className="">
              <TaskStatusPill status={project.status} />
            </div>
            <div className="">
              <div className="hover:bg-gray-200 flex items-center justify-center h-8 w-8 rounded-md cursor-pointer">
                <MoreVertical className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="bg-white p-10 rounded-lg space-y-8">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold">Active Projects</h2>
        <div className="">
          <Link href={"#"} className="text-primary">
            View All
          </Link>
        </div>
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-[3fr_2fr_5fr_2fr_2fr_1fr] uppercase py-2 gap-4 font-semibold">
          <div className="">Project name</div>
          <div className="">Priority</div>
          <div className="">Progress</div>
          <div className="">Lead</div>
          <div className="">Status</div>
          <div className=""></div>
        </div>
        <Separator />
        <div className="">{projectList()}</div>
      </div>
    </div>
  );
};

export default ProjectListTable;
