"use client";
import AddTaskNote from "@/app/dashboard/tasks/_components/AddTaskNote";
import EditTask from "@/app/dashboard/tasks/_components/EditTask";
import TaskActivityHistory from "@/app/dashboard/tasks/_components/TaskActivityHistory";
import TaskAttachments from "@/app/dashboard/tasks/_components/TaskAttachments";
import { Breadcrumb } from "@/components/global/Breadcrumb";
import ConfirmDelete from "@/components/global/ConfirmDelete";
import { PageLoader } from "@/components/global/PageLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Button from "@/components/ui/CustomButton";
import { Pill } from "@/components/utils/Pills";
import { useModal } from "@/context/modal.state";
import { useEditTask, useGetTaskById } from "@/hooks/employer/useDepartment";
import { cn, getDate, getInitials } from "@/lib/utils";
import { CalendarRange, CheckCircle2, Pen, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";

const TaskDetailPage = () => {
  const { taskId } = useParams();
  const modal = useModal();
  const { data, isLoading } = useGetTaskById(String(taskId));
  const { mutate: editTask, isPending } = useEditTask(String(taskId));

  if (isLoading || !data) {
    return <PageLoader />;
  }
  return (
    <div className="space-y-15">
      <div className="sm:flex justify-between items-start py-5">
        <div className="sm:w-1/2 space-y-4">
          <div className="">
            <Breadcrumb />
          </div>
          <h2 className="text-3xl font-extrabold capitalize">{data.name}</h2>
        </div>
        <div className="flex flex-col lg:flex-row items-end lg:items-center gap-2">
          <Button
            label="Delete Task"
            icon={<Trash2 size={16} />}
            className="w-fit! px-5 bg-transparent text-red-500! border border-red-500/20"
            onClick={() => {
              modal.open({
                content: (
                  <ConfirmDelete
                    queries={["task", "tasks"]}
                    api_path={`organization/tasks/${taskId}`}
                    action="Task"
                  />
                ),
                size: "sm:w-sm",
                bgColor: "",
              });
            }}
          />
          <Button
            onClick={() => {
              editTask({ status: "done" });
            }}
            icon={<CheckCircle2 size={16} />}
            isLoading={isPending}
            disabled={isPending || data.status === "done"}
            label={data.status === "done" ? "Completed" : "Complete Task"}
            loadingLabel="Completing..."
            className={cn(
              "w-fit! px-5 border ",
              data.status === "done"
                ? "bg-green-500! text-white! opacity-100!"
                : "bg-transparent text-primary! border-primary/20"
            )}
          />
          <Button
            icon={<Pen size={16} />}
            label="Edit Task"
            className="w-fit! px-5"
            onClick={() => {
              modal.open({
                content: <EditTask />,
                size: "sm:w-2xl",
                bgColor: "",
              });
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-5">
        <div className="space-y-4">
          <div className="bg-white p-4 sm:p-8 rounded-lg space-y-4">
            <h2 className="text-2xl font-bold">Description</h2>
            <p>{data.description}</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white p-4 rounded-lg space-y-2">
              <div className="uppercase text-sm">Assignee</div>
              <div className="flex items-start gap-1">
                <Avatar size="sm">
                  <AvatarImage src={data.assignee?.avatarUrl || ""} />
                  <AvatarFallback>
                    {getInitials(data.assignee?.email || "")}
                  </AvatarFallback>
                </Avatar>
                <div className="">
                  <div className="font-semibold">
                    {data.assignee?.displayName || "Not assigned"}
                  </div>
                  <div className="text-xs">{"role"}</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg space-y-2">
              <div className="uppercase text-sm">PRIORITY</div>
              <div className="flex items-start gap-1">
                <Pill priority={data.priority} />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg space-y-2">
              <div className="uppercase text-sm">Date</div>
              <div className="flex items-start gap-1">
                <CalendarRange size={18} />
                <div className="flex-1">
                  {getDate(data.startDate)} - {getDate(data.dueDate)}
                </div>
              </div>
            </div>
          </div>
          <AddTaskNote taskId={String(taskId)} />
        </div>
        <div className="space-y-4">
          <TaskAttachments />
          <TaskActivityHistory taskId={String(taskId)} />
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
