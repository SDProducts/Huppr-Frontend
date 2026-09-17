"use client";
import { MetricCard } from "@/app/dashboard/_components/MetricCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Button from "@/components/ui/CustomButton";
import { cn, getInitials } from "@/lib/utils";
import {
  ChevronRight,
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
import Link from "next/link";
import { useState } from "react";
const metrics = [
  {
    icon: Users,
    value: 153,
    label: "Total Headcount",
    meta: "↑ 11 this month",
    subMeta: "+4 vs last month",
    variant: "blue" as const,
  },
  {
    icon: Network,
    value: 3,
    label: "Number of Dept",
    meta: "Awaiting approval",
    variant: "purple" as const,
  },
  {
    icon: Group,
    value: 2,
    label: "Total sub-team",
    meta: "Today",
    variant: "green" as const,
  },
];

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
  const layouts = [
    { icon: LayoutGrid, type: "grid" },
    { icon: List, type: "list" },
  ];
  const [layout, setlayout] = useState("grid");
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
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {metrics.map((item, i) => (
          <MetricCard key={i} {...item} />
        ))}
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
        <div
          className={cn("grid gap-2", layout === "grid" ? "grid-cols-3" : "")}
        >
          {DEPARTMENTS.map((dept, i) => (
            <Link
              href={`/dashboard/departments/${dept.name}`}
              key={i}
              className={cn(
                "rounded-md border bg-white max-w-md border-gray-200 p-3 space-y-2"
              )}
            >
              <div className="flex justify-between items-center">
                <div className="h-10 w-10 bg-primary/10 flex justify-center items-center rounded-sm">
                  <dept.icon className="h-7 w-7" />
                </div>
                <div className="text-green-500 bg-green-100 px-2 py-0.5 rounded-full text-xs">
                  stable
                </div>
              </div>
              <div className="">
                <div className="font-semibold text-lg">{dept.name}</div>
                <div className="text-sm">{dept.desc}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {dept.metrics.map((item, i) => (
                  <div className="bg-primary-100 rounded-md p-2" key={i}>
                    <div className="">{item.label}</div>
                    <div className="font-extrabold">{item.value}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 py-2 mt-4">
                <div className="flex justify-between items-center">
                  <div className="flex-1 flex items-center gap-1">
                    <Avatar>
                      <AvatarFallback>
                        {getInitials(dept.head_staff.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="">
                      <div className="font-semibold">
                        {dept.head_staff.name}
                      </div>
                      <div className="text-xs">{dept.head_staff.role}</div>
                    </div>
                  </div>
                  <div className="">
                    <ChevronRight />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentsPage;
