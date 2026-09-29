"use client";
import CreateTask from "@/app/dashboard/projects/_components/CreateTask";
import ActivityEmptyState from "@/components/EmptyState";
import { RolesListSkeleton } from "@/components/skeletons";
import Button from "@/components/ui/CustomButton";
import { PriorityPill, TaskStatusPill } from "@/components/utils/Pills";
import { useModal } from "@/context/modal.state";
import { useGetTasks } from "@/hooks/employer/useDepartment";
import { getDate } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const RecentTaskListTable = () => {
  const modal = useModal();
  const { projectId } = useParams();
  const { data, isLoading, isError } = useGetTasks({
    projectId: String(projectId),
  });
  const HEADERS = ["Task name", "assignee", "status", "due date", "priority"];

  function taskList() {
    if (isLoading) {
      return <RolesListSkeleton />;
    }
    if (isError || !data) {
      return <ActivityEmptyState />;
    }
    const tasks = data.items;

    if (tasks.length < 1) {
      return <ActivityEmptyState />;
    }
    return (
      <div className="divide-y divide-gray-200">
        {tasks.map((task, i) => (
          <div
            className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr] gap-2 py-3 text-sm"
            key={i}
          >
            <div className="line-clamp-1" title={task.name}>
              <Link href={`/dashboard/tasks/${task.id}`}>{task.name}</Link>
            </div>
            <div
              className="line-clamp-1"
              title={task.assignee?.displayName || ""}
            >
              {task.assigneeId || "Not assigned"}
            </div>
            <div className="line-clamp-1" title={task.status}>
              <TaskStatusPill status={task.status} />
            </div>
            <div className="line-clamp-1" title={task.dueDate}>
              {getDate(task.dueDate)}
            </div>
            <div className="line-clamp-1" title={task.priority}>
              <PriorityPill priority={task.priority} />
            </div>
          </div>
        ))}
        <div className="mt-4">
          <Button
            onClick={() => {
              modal.open({
                content: (
                  <CreateTask
                    project={{
                      name: tasks[0].project.name,
                      id: tasks[0].project.id,
                    }}
                  />
                ),
                size: "sm:w-2xl",
              });
            }}
            label="Create Task"
            icon={<Plus size={18} />}
            className="bg-white! text-primary! border border-dashed hover:border-none hover:bg-primary! hover:text-white! hover:opacity-100!"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg space-y-4">
      <h2 className="text-2xl font-bold">Recent Tasks</h2>
      <div className="divide-y divide-gray-200">
        <div className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr] text-sm font-semibold gap-2 py-3">
          {HEADERS.map((item) => (
            <div className="capitalize" key={item}>
              {item}
            </div>
          ))}
        </div>
        {taskList()}
      </div>
    </div>
  );
};

export default RecentTaskListTable;
