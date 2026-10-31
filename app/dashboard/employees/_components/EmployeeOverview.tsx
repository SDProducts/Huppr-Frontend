/* eslint-disable react/no-unescaped-entities */
"use client";
import { MetricCard } from "@/app/dashboard/_components/MetricCard";
import EmployeeTable, {
  Employee,
} from "@/app/dashboard/employees/_components/EmployeeListTable";
import Button from "@/components/ui/CustomButton";
import { Building2, LogOut, Plus, Upload, UserPlus, Users } from "lucide-react";
const employees: Employee[] = [
  {
    id: "1",
    name: "Ada Okafor",
    email: "ada.okafor@huppr.app",
    department: "Product",
    role: "Product Designer",
    employmentType: "Full-time",
    status: "Active",
    startDate: "Jan 15, 2025",
    avatar: "/images/employees/ada.jpg",
  },
  {
    id: "2",
    name: "Tunde Adebayo",
    email: "tunde.adebayo@huppr.app",
    department: "Engineering",
    role: "Frontend Developer",
    employmentType: "Full-time",
    status: "Active",
    startDate: "Feb 3, 2025",
  },
];

export default function EmployeeOverview() {
  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950">
              Employees
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your team and keep track of your organisation's workforce.{" "}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              label="Add New Employee"
              icon={<Plus className="size-4" />}
              className="w-fit!"
            />
            <Button
              label="Bulk Upload"
              icon={<Upload className="size-4" />}
              // onClick={handleCreateJob}
              className="w-fit! bg-white text-primary! border border-primary-100"
            />{" "}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <MetricCard label="Total Employees" value={124} icon={Users} />
          <MetricCard
            label="New Hires (this month)"
            value={12}
            icon={UserPlus}
          />
          <MetricCard label="Departures (this month)" value={2} icon={LogOut} />
          <MetricCard label="Departments" value={8} icon={Building2} />
        </div>
      </div>
      <EmployeeTable
        employees={employees}
        pageSize={5}
        onEmployeeClick={(employee) => {
          console.log("Open employee:", employee.id);
        }}
        onEmployeeAction={(action, employee) => {
          console.log(action, employee.id);
        }}
      />
    </div>
  );
}
