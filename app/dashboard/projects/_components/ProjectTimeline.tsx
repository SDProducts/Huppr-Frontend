import { Progress } from "@/components/ui/progress";
import { getShortDate } from "@/lib/utils";
import React from "react";
interface Prop {
  startDate: string;
  endDate: string;
}
const ProjectTimeline: React.FC<Prop> = ({ endDate, startDate }) => {
  function calculateTimeProgress(): number {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const current = new Date().getTime();
    // Guard against invalid dates or zero/negative durations
    // if (isNaN(start) || isNaN(end) || isNaN(current) || end <= start) {
    //   return 0;
    // }

    // Calculate elapsed proportion
    const elapsed = current - start;
    const total = end - start;
    const progress = (elapsed / total) * 100;
    return progress;
    // Clamp progress between 0 and 100
    // return Math.min(Math.max(Math.round(progress), 0), 100);
  }
  const progressPercent = calculateTimeProgress();

  return (
    <div className="bg-white p-4 sm:p-8 space-y-8 rounded-lg">
      <h2 className="text-2xl font-bold">Project Timeline</h2>
      <div className="space-y-1">
        <div className="flex justify-between">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <div className="h-2 w-2 rounded-full bg-gray-200" />
        </div>
        <Progress indicatorClassName="" value={progressPercent} />
        <div className="flex justify-between text-sm">
          <div className="">{getShortDate(startDate)}</div>
          <div className="">{getShortDate(endDate)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;
