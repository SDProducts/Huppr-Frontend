"use client";

import CreateRoleStep1 from "@/app/dashboard/departments/_components/CreateRoleStep1";
import CreateSubTeam from "@/app/dashboard/departments/_components/CreateSubTeam";
import RoleDirectoryList, {
  SubteamsList,
} from "@/app/dashboard/departments/_components/RoleDirectoryList";
import { PageLoader } from "@/components/global/PageLoader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Button from "@/components/ui/CustomButton";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/context/modal.state";
import { useGetDepartmentByID } from "@/hooks/employer/useDepartment";
import { cn, getInitials } from "@/lib/utils";
import {
  BriefcaseBusiness,
  CalendarDays,
  Network,
  Plus,
  UserPlus,
  Users,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

const departmentItem = {
  name: "Engineering",
  desc: "Product & Infrastructure",
  metrics: [
    {
      icon: Users,
      label: "Headcount",
      value: 142,
    },
    {
      icon: CalendarDays,
      label: "Attendance",
      value: 98.2,
    },
    {
      icon: BriefcaseBusiness,
      label: "Open roles",
      value: 2,
    },
  ],
  head_staff: {
    name: "James Milner",
    role: "Tech Lead",
  },
};

const DepartmentDetailPage = () => {
  const modal = useModal();
  const { department } = useParams();
  const { data, isLoading } = useGetDepartmentByID(String(department));

  const tabs = [
    { label: "Role Directory", id: "role" },
    { label: "Sub-teams", id: "sub" },
  ];
  const [activeTab, setactiveTab] = useState("sub");
  if (isLoading || !data) {
    return <PageLoader />;
  }
  const { headcount, subteams, openRoles } = data.metrics;
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start py-5">
        <div className="w-1/2 space-y-2">
          <h2 className="text-3xl font-extrabold capitalize">{data.name}</h2>
          <p>
            Monitor organizational health across key sectors with real-time
            metrics and operational pulse.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-end lg:items-center gap-2">
          <Button
            onClick={() => {
              modal.open({
                content: <CreateSubTeam />,
                size: "sm:w-xl",
              });
            }}
            icon={<UserPlus size={16} />}
            label="Create Role"
            className="w-fit! px-5 bg-white text-primary! border border-gray-200"
          />
          <Button
            icon={<Plus size={16} />}
            label="New Sub-team"
            className="w-fit! px-5"
            onClick={() => {
              modal.open({
                content: <CreateRoleStep1 />,
                size: "sm:w-3xl",
                bgColor: "bg-primary-100",
              });
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 divide-x divide-gray-200 bg-white border border-gray-200 rounded-lg p-2">
        <div className="p-4">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <div className="">Headcount</div>
          </div>
          <div className="text-xl font-extrabold">{headcount || 0}</div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-1">
            <Network className="w-3 h-3" />
            <div className="">Subteams</div>
          </div>
          <div className="text-xl font-extrabold">{subteams || 0}</div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-1">
            <BriefcaseBusiness className="w-3 h-3" />
            <div className="">Open roles</div>
          </div>
          <div className="text-xl font-extrabold">{openRoles || 0}</div>
        </div>
        <div className="flex items-center gap-1 p-4">
          <Avatar>
            <AvatarFallback>
              {getInitials(departmentItem.head_staff.name)}
            </AvatarFallback>
          </Avatar>
          <div className="">
            <div className="font-semibold">
              {departmentItem.head_staff.name}
            </div>
            <div className="text-xs">{departmentItem.head_staff.role}</div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex items-center gap-4 py-2">
          {tabs.map((tab) => (
            <div
              onClick={() => setactiveTab(tab.id)}
              className={cn(
                "cursor-pointer",
                activeTab === tab.id
                  ? "text-primary font-semibold underline underline-offset-6"
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
          {activeTab === "role" && <RoleDirectoryList />}
          {activeTab === "sub" && <SubteamsList />}
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetailPage;
