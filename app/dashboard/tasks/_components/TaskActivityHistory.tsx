"use client";
import { useGetTaskHistory } from "@/hooks/employer/useDepartment";
import { cn, getDate, labelCase } from "@/lib/utils";
import { RotateCcwClock } from "lucide-react";
import React from "react";
interface Prop {
  taskId: string;
}
const TaskActivityHistory: React.FC<Prop> = ({ taskId }) => {
  const { data, isLoading } = useGetTaskHistory(taskId);
  const activities = data?.items || [];
  return (
    <div className="p-4 sm:p-8 bg-white rounded-lg space-y-4">
      <div className="flex items-center gap-2">
        <RotateCcwClock />
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Activity History</h2>
        </div>
      </div>
      <div className="relative">
        <div className="absolute bottom-0 left-[5px] z-0 top-0 w-1 bg-gray-200" />
        <div className="space-y-5 relative z-1">
          {activities.map((item, i) => (
            <div className="flex items-start gap-4" key={i}>
              <div
                className={cn(
                  "h-3.5 w-3.5 rounded-full",
                  i === 0 ? "bg-primary" : "bg-gray-200"
                )}
              />
              <div className="flex-1 -mt-1">
                <div className="text-sm">
                  <b>{item.actor.email}</b> {labelCase(item.action)}
                </div>
                <div className="text-xs">{getDate(item.createdAt)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskActivityHistory;
