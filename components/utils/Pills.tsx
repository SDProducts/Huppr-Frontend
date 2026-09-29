import { labelCase } from "@/lib/utils";

const priorityStyles: Record<string, string> = {
  low: "bg-blue-100 text-blue-700 border-blue-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  normal: "bg-amber-100 text-amber-700 border-amber-200",
  high: "bg-red-100 text-red-700 border-red-200",
  urgent: "bg-rose-100 text-rose-800 border-rose-300 font-semibold",
};

// Helper component for Priority Pill
export const PriorityPill = ({ priority }: { priority: string }) => {
  const normalizedPriority = priority?.toLowerCase() || "";
  const styles =
    priorityStyles[normalizedPriority] ||
    "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize fit-content ${styles}`}
    >
      {priority}
    </span>
  );
};
const taskStatusStyles: Record<string, string> = {
  todo: "bg-blue-100 text-blue-700 border-blue-200",
  in_progress: "bg-purple-100 text-purple-700 border-purple-200",
  completed: "bg-green-100 text-green-700 border-green-200",
  done: "bg-green-100 text-green-700 border-green-200",
  on_hold: "bg-yellow-100 text-yellow-800 border-yellow-300 font-semibold",
  canceled: "bg-red-100 text-red-800 border-red-300 font-semibold",
};

// Helper component for Priority Pill
export const TaskStatusPill = ({ status }: { status: string }) => {
  const normalizedstatus = status?.toLowerCase() || "";
  const styles =
    taskStatusStyles[normalizedstatus] ||
    "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <span
      className={`inline-flex text-nowrap items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize fit-content ${styles}`}
    >
      {labelCase(status)}
    </span>
  );
};
