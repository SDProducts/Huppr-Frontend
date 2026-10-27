import ProjectListTable from "@/app/dashboard/projects/_components/ProjectListTable";
import Button from "@/components/ui/CustomButton";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  CheckCircle,
  Download,
  Folders,
  LineChart,
  Plus,
  Sparkles,
} from "lucide-react";
import React from "react";

const ProjectPage = () => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-10">
        <div className="flex-1 space-y-2">
          <h2 className="text-3xl font-extrabold">Projects</h2>
          <p>
            Monitor cross-departmental delivery, track milestone velocity, and
            orchestrate active strategic initiatives.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            label="Export report"
            icon={<Download className="size-4" />}
            className="bg-white! text-primary! text-sm w-fit!"
          />
          <Button
            label="New Porject"
            icon={<Plus className="size-4" />}
            className="text-sm w-fit!"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <StatCard
          name="Total Projects"
          value={24}
          subtext="12% vs Q2"
          icon={
            <div className="bg-primary/5 text-primary rounded-md size-10 flex justify-center items-center">
              <Folders className="size-6" />
            </div>
          }
          extra={
            <div className="grid grid-cols-3 text-center bg-slate-100 place-items-center p-2 rounded-md">
              <div className="">
                <div className="font-semibold">18</div>
                <div className="text-xs">Active</div>
              </div>
              <div className="">
                <div className="font-semibold">4</div>
                <div className="text-xs">Closed</div>
              </div>
              <div className="">
                <div className="font-semibold">2</div>
                <div className="text-xs">Paused</div>
              </div>
            </div>
          }
        />
        <StatCard
          name="OVERDUE PROJECTS"
          value={24}
          subtext="Requires Action"
          icon={
            <div className="bg-red-500/5 text-red-500 rounded-md size-10 flex justify-center items-center">
              <AlertTriangle className="size-6" />
            </div>
          }
          extra={
            <div className="grid grid-cols-3 text-center bg-red-100 place-items-center p-2 rounded-md">
              <div className="">
                <div className="font-semibold">18</div>
                <div className="text-xs">Active</div>
              </div>
              <div className="">
                <div className="font-semibold">4</div>
                <div className="text-xs">Closed</div>
              </div>
              <div className="">
                <div className="font-semibold">2</div>
                <div className="text-xs">Paused</div>
              </div>
            </div>
          }
        />
        <StatCard
          name="Total Tasks"
          value={348}
          subtext="61.5%
Done"
          icon={
            <div className="bg-primary/5 text-primary rounded-md size-10 flex justify-center items-center">
              <CheckCircle className="size-6" />
            </div>
          }
          extra={
            <div className="p-2 rounded-md space-y-2">
              <div className="">
                <Progress indicatorClassName="" value={65} />
              </div>
              <div className="flex justify-between items-center gap-1">
                <div className="flex items-center gap-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  <div className="text-xs">214 done</div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary/70" />
                  <div className="text-xs">98 prog</div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary/40" />
                  <div className="text-xs">26 todo</div>
                </div>
              </div>
            </div>
          }
        />
        <StatCard
          name="ON-TRACK RATE"
          value={`87.5%`}
          subtext="Milestones"
          icon={
            <div className="bg-primary/5 text-primary rounded-md size-10 flex justify-center items-center">
              <LineChart className="size-6" />
            </div>
          }
          extra={
            <div className="bg-slate-100 p-2 rounded-md">
              <div className="flex items-start gap-2 text-primary">
                <Sparkles className="size-4" />
                <div className="text-xs flex-1">
                  Vita AI estimates 22/24 projects delivering on cadence.
                </div>
              </div>
            </div>
          }
        />
      </div>

      <div className="">
        <ProjectListTable />
      </div>
    </div>
  );
};

export default ProjectPage;
interface StatProp {
  name: string;
  value: string | number;
  subtext: string;
  icon: React.ReactNode;
  extra: React.ReactNode;
}
function StatCard(stat: StatProp) {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1 flex-1">
            <div className="uppercase text-sm font-semibold text-gray-500">
              {stat.name}
            </div>

            <div className="flex gap-2 items-end">
              <div className="font-extrabold text-5xl">{stat.value}</div>
              <div className="text-xs truncate">{stat.subtext}</div>
            </div>
          </div>
          {stat.icon}
        </div>
        <div className="">{stat.extra}</div>
      </div>
    </div>
  );
}
