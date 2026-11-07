"use client";
import { MetricCard } from "@/app/dashboard/_components/MetricCard";
import CreateNewDepartment from "@/app/dashboard/departments/_components/CreateNewDepartment";
import DepartmentGridLayout from "@/app/dashboard/departments/_components/DepartmentGridLayout";
import DepartmentTableLayout from "@/app/dashboard/departments/_components/DepartmentTableLayout";
import { PageLoader } from "@/components/global/PageLoader";
import Button from "@/components/ui/CustomButton";
import { useModal } from "@/context/modal.state";
import { useGetDepartments } from "@/hooks/employer/useDepartment";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import {
  Code2,
  Group,
  LayoutGrid,
  List,
  Megaphone,
  Network,
  PiggyBank,
  Plus,
  Users,
} from "lucide-react";
import { useState } from "react";

const DEPARTMENTS = [
  {
    icon: Code2,
    name: "Engineering",
    desc: "Product & Infrastructure",
    metrics: [
      {
        label: "Headcount",
        value: 142,
      },
      {
        label: "Attendance",
        value: 98.2,
      },
      {
        label: "Open roles",
        value: 2,
      },
      {
        label: "Budget",
        value: 84,
      },
    ],
    head_staff: {
      name: "James Milner",
      role: "Tech Lead",
    },
  },
  {
    icon: Megaphone,
    name: "Marketing",
    desc: "Product & Infrastructure",
    metrics: [
      {
        label: "Headcount",
        value: 142,
      },
      {
        label: "Attendance",
        value: 98.2,
      },
      {
        label: "Open roles",
        value: 2,
      },
      {
        label: "Budget",
        value: 84,
      },
    ],
    head_staff: {
      name: "James Milner",
      role: "Chief Marketing Officer",
    },
  },
  {
    icon: PiggyBank,
    name: "Finance",
    desc: "Product & Infrastructure",
    metrics: [
      {
        label: "Headcount",
        value: 142,
      },
      {
        label: "Attendance",
        value: 98.2,
      },
      {
        label: "Open roles",
        value: 2,
      },
      {
        label: "Budget",
        value: 84,
      },
    ],
    head_staff: {
      name: "James Milner",
      role: "Chief Finnance Officer",
    },
  },
];

const DepartmentsPage = () => {
  const organisationId = Cookies.get("organisationId");
  const modal = useModal();
  const { data: departmentResponse, isLoading } = useGetDepartments({
    organisationId: organisationId,
  });
  const layouts = [
    { icon: LayoutGrid, type: "grid" },
    { icon: List, type: "list" },
  ];
  const [layout, setlayout] = useState("grid");
  if (isLoading || !departmentResponse) {
    return <PageLoader />;
  }
  const departments = departmentResponse.items || [];
  const summary = departmentResponse.summary;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start py-5">
        <div className="w-1/2 space-y-2">
          <h2 className="text-3xl font-extrabold">Department Overview</h2>
          <p>
            Monitor organizational health across key sectors with real-time
            metrics and operational pulse.
          </p>
        </div>
        <Button
          icon={<Plus />}
          label="New Department"
          className="w-fit! px-5"
          onClick={() => {
            modal.open({
              content: <CreateNewDepartment />,
              size: "sm:w-2xl",
              bgColor: "bg-indigo-50",
            });
          }}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-2 sm:gap-4">
        <MetricCard
          icon={Users}
          label="Total Headcount"
          value={summary.totalHeadcount || 0}
        />
        <MetricCard
          icon={Network}
          label="Total Subteams"
          value={summary.totalSubteams || 0}
        />
        <MetricCard
          icon={Group}
          label="Total Departments"
          value={summary.totalDepartments || 0}
        />
        {/* {metrics.map((item, i) => (
          <MetricCard key={i} {...item} />
        ))} */}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Operational Entities</h2>
          <div className="grid grid-cols-2 gap-1 bg-gray-300 rounded-md p-1">
            {layouts.map((item, i) => (
              <div
                key={i}
                onClick={() => setlayout(item.type)}
                className={cn(
                  "h-7 w-7 rounded-sm flex items-center justify-center cursor-pointer",
                  item.type === layout ? "bg-white text-primary" : ""
                )}
              >
                <item.icon className={cn("h-4 w-4")} />
              </div>
            ))}
          </div>
        </div>
        {layout === "grid" ? (
          <DepartmentGridLayout departments={departments} />
        ) : (
          <DepartmentTableLayout
            departments={departments}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default DepartmentsPage;
