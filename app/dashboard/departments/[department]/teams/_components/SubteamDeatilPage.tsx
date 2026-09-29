"use client";

import CreateProject from "@/app/dashboard/departments/[department]/teams/_components/CreateProject";
import ProjectListTable from "@/app/dashboard/departments/[department]/teams/_components/ProjectListTable";
import SubteamMetricCard from "@/app/dashboard/departments/[department]/teams/_components/SubteamMetricCard";
import TeamMemberListTable from "@/app/dashboard/departments/[department]/teams/_components/TeamMemberListTable";
import CreateSubTeam from "@/app/dashboard/departments/_components/CreateSubTeam";
import { PageLoader } from "@/components/global/PageLoader";
import Button from "@/components/ui/CustomButton";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/context/modal.state";
import { useGetTeamById } from "@/hooks/employer/useDepartment";
import { cn } from "@/lib/utils";
import {
  BatteryMedium,
  FolderPlus,
  PercentCircle,
  Rocket,
  UserPlus2,
  Users,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

const SubteamDetailPage = () => {
  const modal = useModal();
  const { teamId } = useParams();
  const { data, isLoading } = useGetTeamById(String(teamId));

  const tabs = [
    { label: "Team Members", id: "members" },
    { label: "Active Projects", id: "projects" },
  ];
  const [activeTab, setactiveTab] = useState("members");
  if (isLoading || !data) {
    return <PageLoader />;
  }
  const teamLead = data.lead;
  const { capacityPercent, headcount, plannedCapacity } = data.metrics;

  return (
    <div className="space-y-6">
      <div className="sm:flex justify-between items-start py-5">
        <div className="sm:w-1/2 space-y-2">
          <h2 className="text-3xl font-extrabold capitalize">{data.name}</h2>
        </div>
        <div className="flex flex-col lg:flex-row items-end lg:items-center gap-2">
          <Button
            onClick={() => {
              modal.open({
                content: (
                  <CreateProject
                    departmentId={data.departmentId}
                    team={{
                      id: data.id,
                      name: data.name,
                    }}
                  />
                ),
                size: "sm:w-xl",
              });
            }}
            icon={<FolderPlus size={16} />}
            label="Add Project"
            className="w-fit! px-5 bg-white text-primary! border border-primary/20"
          />
          <Button
            icon={<UserPlus2 size={16} />}
            label="Add Members"
            className="w-fit! px-5"
            onClick={() => {
              modal.open({
                content: <CreateSubTeam />,
                size: "sm:w-xl",
              });
            }}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-4 gap-4">
        <SubteamMetricCard
          title="Team Size"
          value={headcount || 0}
          icon={Users}
        />
        <SubteamMetricCard
          title="Active Projects"
          value={headcount || 0}
          icon={Rocket}
        />
        <SubteamMetricCard
          title="Capacity"
          value={`${capacityPercent || 0} %`}
          icon={PercentCircle}
          extra={
            <>
              <Progress value={capacityPercent || 0} indicatorClassName="" />
            </>
          }
        />
        <SubteamMetricCard
          title="Planed Cap"
          value={plannedCapacity || 0}
          icon={BatteryMedium}
        />
      </div>
      <div className="">
        <div className="flex items-center gap-4 py-0 mb-2">
          {tabs.map((tab) => (
            <div
              onClick={() => setactiveTab(tab.id)}
              className={cn(
                "cursor-pointer",
                activeTab === tab.id
                  ? "text-primary font-semibold underline underline-offset-15"
                  : "text-gray-600"
              )}
              key={tab.id}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <Separator />
        <div className="mt-4">
          {activeTab === "projects" && <ProjectListTable />}
          {activeTab === "members" && <TeamMemberListTable />}
        </div>
      </div>
    </div>
  );
};

export default SubteamDetailPage;
