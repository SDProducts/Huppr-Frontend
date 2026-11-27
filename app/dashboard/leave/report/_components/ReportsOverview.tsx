"use client";

import { ArrowUpRight, MoreHorizontal, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stats = [
  {
    label: "Days Used",
    value: "1,240",
    description: "+5% YTD",
    trend: true,
  },
  {
    label: "Requests",
    value: "342",
  },
  {
    label: "Avg Days/Req",
    value: "3.6",
  },
  {
    label: "Utilisation",
    value: "68%",
    highlight: true,
  },
  {
    label: "Pending",
    value: "12",
    danger: true,
  },
];

const trendData = [
  { month: "Jan", value: 28 },
  { month: "Feb", value: 43 },
  { month: "Mar", value: 35 },
  { month: "Apr", value: 66 },
  { month: "May", value: 50 },
  { month: "Jun", value: 82 },
  { month: "Jul", value: 100 },
  { month: "Aug", value: 75 },
  { month: "Sep", value: 43 },
];

const employees = [
  {
    initials: "JS",
    name: "John Smith",
    department: "Engineering",
    type: "Annual",
    entitlement: 25,
    used: 15,
    remaining: 10,
  },
  {
    initials: "AD",
    name: "Alice Doe",
    department: "Design",
    type: "Annual",
    entitlement: 25,
    used: 22,
    remaining: 3,
  },
  {
    initials: "RJ",
    name: "Robert Jones",
    department: "Sales",
    type: "Sick",
    entitlement: 10,
    used: 2,
    remaining: 8,
  },
];

const leaveTypes = [
  {
    name: "Annual Leave",
    days: 850,
    percentage: 68,
    color: "bg-gradient-to-r from-blue-500 to-amber-500",
  },
  {
    name: "Sick Leave",
    days: 210,
    percentage: 17,
    color: "bg-slate-400",
  },
  {
    name: "Maternity/Paternity",
    days: 120,
    percentage: 10,
    color: "bg-gradient-to-r from-blue-500 to-amber-500",
  },
  {
    name: "Other",
    days: 60,
    percentage: 5,
    color: "bg-slate-400",
  },
];

function StatCard({
  label,
  value,
  description,
  trend,
  highlight,
  danger,
}: (typeof stats)[number]) {
  return (
    <Card
      className={`rounded-none ${danger ? "border-l-4 border-l-red-500" : ""}`}
    >
      <CardContent className="p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <p
          className={`mt-1 text-2xl font-bold tracking-tight sm:text-3xl ${
            highlight
              ? "text-blue-600"
              : danger
              ? "text-red-600"
              : "text-foreground"
          }`}
        >
          {value}
        </p>

        {description && (
          <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            {trend && <TrendingUp className="h-3.5 w-3.5" />}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function LeaveUsageTrend() {
  return (
    <Card className="rounded-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold">
          Leave Usage Trend
        </CardTitle>

        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent>
        <div className="flex h-[230px] items-end gap-1 rounded-lg border border-gray-100 p-5 sm:gap-2">
          {trendData.map((item) => (
            <div
              key={item.month}
              className="relative flex h-full flex-1 items-end"
            >
              {item.month === "Jul" && (
                <span className="absolute -top-1 left-1/2 z-10 -translate-x-1/2 -translate-y-full rounded px-2 py-1 text-xs font-medium text-primary">
                  Peak
                </span>
              )}

              <div
                className={`w-full rounded-t-sm transition-all ${
                  item.month === "Jul" ? "bg-indigo-100" : "bg-slate-100"
                }`}
                style={{ height: `${item.value}%` }}
                title={`${item.month}: ${item.value}`}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function LeaveUtilisation() {
  const utilisation = 68;

  return (
    <Card className="rounded-none shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Leave Utilisation
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex justify-center py-2">
          <div
            className="relative flex h-44 w-44 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(#f1f3f7 ${
                utilisation * 3.6
              }deg, #f1f3f7 0deg)`,
            }}
          >
            <div
              className="absolute inset-[14px] rounded-full"
              style={{
                background: `conic-gradient(#2563eb ${
                  utilisation * 3.6
                }deg, #f1f3f7 0deg)`,
              }}
            />
            <div className="absolute inset-[14px] rounded-full bg-background" />

            <div className="relative z-10 text-center">
              <p className="text-4xl font-bold tracking-tight">
                {utilisation}%
              </p>
              <p className="text-xs font-medium text-muted-foreground">
                Used Overall
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-between border-t pt-4 text-[11px] text-muted-foreground">
          <span>Total Entitlement: 1,820</span>
          <span>Total Used: 1,240</span>
        </div>
      </CardContent>
    </Card>
  );
}

function LeaveBalanceReport() {
  return (
    <Card className="overflow-hidden rounded-none shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Leave Balance Report
        </CardTitle>
      </CardHeader>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-100">
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-center">Entitlement</TableHead>
              <TableHead className="text-center">Used</TableHead>
              <TableHead className="text-center">Remaining</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.initials}>
                <TableCell>
                  <div className="flex min-w-[130px] items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-medium text-indigo-600">
                      {employee.initials}
                    </div>
                    <span className="font-medium">{employee.name}</span>
                  </div>
                </TableCell>

                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {employee.department}
                </TableCell>

                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`rounded-full font-normal ${
                      employee.type === "Annual"
                        ? "bg-blue-100 text-blue-600 hover:bg-blue-100"
                        : "bg-slate-200 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {employee.type}
                  </Badge>
                </TableCell>

                <TableCell className="text-center">
                  {employee.entitlement}
                </TableCell>

                <TableCell className="text-center">{employee.used}</TableCell>

                <TableCell
                  className={`text-center font-semibold ${
                    employee.remaining <= 3 ? "text-red-600" : "text-blue-600"
                  }`}
                >
                  {employee.remaining}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center py-4">
        <Button variant="link" className="text-xs font-medium text-blue-600">
          View All Records
          <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </div>
    </Card>
  );
}

function LeaveByType() {
  return (
    <Card className="rounded-none shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Leave by Type</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {leaveTypes.map((item) => (
          <div key={item.name} className="space-y-1.5">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-medium">{item.name}</span>
              <span className="text-muted-foreground">
                {item.days} days ({item.percentage}%)
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function LeaveReportOverview() {
  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Dashboard content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <LeaveUsageTrend />
          <LeaveBalanceReport />
        </div>

        <div className="space-y-6">
          <LeaveUtilisation />
          <LeaveByType />
        </div>
      </div>
    </div>
  );
}
