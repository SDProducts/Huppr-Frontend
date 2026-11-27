"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Pencil,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type OnboardingStatus =
  | "in_progress"
  | "awaiting_review"
  | "pending_activation"
  | "not_started"
  | "changes_required";

export interface OnboardingEmployee {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  position: string;
  startDate: string;
  progress: number;
  status: OnboardingStatus;
  nextAction: string;
  deadline?: string;
  avatar?: string;
}

interface OnboardingTableProps {
  employees: OnboardingEmployee[];
  pageSize?: number;
  onView?: (employee: OnboardingEmployee) => void;
  onEdit?: (employee: OnboardingEmployee) => void;
  onDelete?: (employee: OnboardingEmployee) => void;
  onNextAction?: (employee: OnboardingEmployee) => void;
  onExport?: (employees: OnboardingEmployee[]) => void;
  className?: string;
}

const TABS = [
  { label: "Ongoing Onboarding", value: "ongoing" },
  { label: "Completed", value: "completed" },
  { label: "Not Started", value: "not_started" },
  { label: "All", value: "all" },
] as const;

type TabValue = (typeof TABS)[number]["value"];

const STATUS_CONFIG: Record<
  OnboardingStatus,
  { label: string; className: string }
> = {
  in_progress: {
    label: "In progress",
    className: "bg-blue-50 text-blue-600",
  },
  awaiting_review: {
    label: "Awaiting review",
    className: "bg-amber-50 text-amber-700",
  },
  pending_activation: {
    label: "Pending activation",
    className: "bg-purple-50 text-purple-700",
  },
  not_started: {
    label: "Not started",
    className: "bg-slate-100 text-slate-600",
  },
  changes_required: {
    label: "Changes required",
    className: "bg-red-50 text-red-600",
  },
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getProgressColor(progress: number) {
  if (progress >= 85) return "bg-emerald-600";
  if (progress === 0) return "bg-slate-300";
  return "bg-blue-600";
}

function exportToCSV(employees: OnboardingEmployee[]) {
  const headers = [
    "Employee",
    "Email",
    "Employee ID",
    "Department",
    "Position",
    "Start Date",
    "Progress",
    "Status",
    "Next Action",
  ];

  const rows = employees.map((employee) => [
    employee.name,
    employee.email,
    employee.employeeId,
    employee.department,
    employee.position,
    employee.startDate,
    `${employee.progress}%`,
    STATUS_CONFIG[employee.status].label,
    employee.nextAction,
  ]);

  const escapeCSV = (value: string) => `"${String(value).replace(/"/g, '""')}"`;

  const csv = [
    headers.map(escapeCSV).join(","),
    ...rows.map((row) => row.map(escapeCSV).join(",")),
  ].join("\n");

  const blob = new Blob([`\uFEFF${csv}`], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "employee-onboarding.csv";
  link.click();

  URL.revokeObjectURL(url);
}

export default function OnboardingTable({
  employees,
  pageSize = 8,
  onView,
  onEdit,
  onDelete,
  onNextAction,
  onExport,
  className,
}: OnboardingTableProps) {
  const [activeTab, setActiveTab] = useState<TabValue>("ongoing");
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);

  const departments = useMemo(
    () => [...new Set(employees.map((employee) => employee.department))],
    [employees]
  );

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();

    return employees.filter((employee) => {
      const matchesSearch =
        !query ||
        [
          employee.name,
          employee.email,
          employee.employeeId,
          employee.department,
          employee.position,
        ].some((value) => value.toLowerCase().includes(query));

      const matchesDepartment =
        departmentFilter === "all" || employee.department === departmentFilter;

      const matchesStatus =
        statusFilter === "all" || employee.status === statusFilter;

      let matchesTab = true;

      if (activeTab === "ongoing") {
        matchesTab = employee.progress > 0 && employee.progress < 100;
      } else if (activeTab === "completed") {
        matchesTab = employee.progress === 100;
      } else if (activeTab === "not_started") {
        matchesTab = employee.status === "not_started";
      }

      return matchesSearch && matchesDepartment && matchesStatus && matchesTab;
    });
  }, [employees, search, departmentFilter, statusFilter, activeTab]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEmployees.length / rowsPerPage)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const currentPageIds = paginatedEmployees.map((employee) => employee.id);

  const allSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedIds.includes(id));

  const selectedEmployees = employees.filter((employee) =>
    selectedIds.includes(employee.id)
  );

  const changeTab = (tab: TabValue) => {
    setActiveTab(tab);
    setPage(1);
    setSelectedIds([]);
  };

  const toggleEmployee = (id: string) => {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((selectedId) => selectedId !== id)
        : [...previous, id]
    );
  };

  const toggleCurrentPage = () => {
    setSelectedIds((previous) =>
      allSelected
        ? previous.filter((id) => !currentPageIds.includes(id))
        : [...new Set([...previous, ...currentPageIds])]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setDepartmentFilter("all");
    setStatusFilter("all");
    setPage(1);
  };

  const handleExport = (selectedOnly = false) => {
    const data = selectedOnly ? selectedEmployees : filteredEmployees;

    if (onExport) {
      onExport(data);
    } else {
      exportToCSV(data);
    }
  };

  const hasActiveFilters = departmentFilter !== "all" || statusFilter !== "all";

  const paginationNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  ).filter(
    (number) =>
      number === 1 ||
      number === totalPages ||
      Math.abs(number - currentPage) <= 1
  );

  return (
    <section
      className={cn(
        "w-full overflow-hidden rounded-xl border border-slate-200 bg-white",
        className
      )}
    >
      {/* Tabs and toolbar */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center">
        <div className="flex items-center gap-4">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.value;

            return (
              <div
                key={tab.value}
                onClick={() => changeTab(tab.value)}
                className={cn(
                  "relative flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap pb-4 text-sm transition",
                  isActive
                    ? "text-primary font-bold"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                {tab.label}

                {tab.value === "all" && (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                    {employees.length}
                  </span>
                )}

                {isActive && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-blue-600" />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative min-w-[220px] flex-1 lg:w-[295px] lg:flex-none">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

            <Input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search by name, email or employee ID..."
              className="py-2 pl-9 text-xs placeholder:text-slate-400"
            />

            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                aria-label="Clear search"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowFilters((previous) => !previous)}
            className={cn(
              "h-9 gap-2 text-xs py-2",
              (showFilters || hasActiveFilters) &&
                "border-blue-200 bg-blue-50 text-blue-600"
            )}
          >
            <Filter className="size-3.5" />
            Filter
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "flex items-center text-sm bg-secondary px-4 py-2 rounded-sm gap-1"
              )}
            >
              <Download className="size-3.5" />
              Export
              <ChevronDown className="size-3.5" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport(false)}>
                Export filtered employees
              </DropdownMenuItem>

              <DropdownMenuItem
                disabled={selectedIds.length === 0}
                onClick={() => handleExport(true)}
              >
                Export selected employees
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap items-end gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-4">
          <div className="w-full space-y-1.5 sm:w-48">
            <label className="text-xs font-medium text-slate-600">
              Department
            </label>

            <Select
              value={departmentFilter}
              onValueChange={(value) => {
                setDepartmentFilter(value || "");
                setPage(1);
              }}
            >
              <SelectTrigger className="h-9 bg-white text-xs">
                <SelectValue placeholder="All departments" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All departments</SelectItem>
                {departments.map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full space-y-1.5 sm:w-48">
            <label className="text-xs font-medium text-slate-600">Status</label>

            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value || "");
                setPage(1);
              }}
            >
              <SelectTrigger className="h-9 bg-white text-xs">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {Object.entries(STATUS_CONFIG).map(([value, config]) => (
                  <SelectItem key={value} value={value}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="h-9 text-xs text-blue-600"
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* Selected rows indicator */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between border-b border-blue-100 bg-blue-50 px-5 py-2.5">
          <p className="text-xs font-medium text-blue-700">
            {selectedIds.length} employee(s) selected
          </p>

          <button
            type="button"
            onClick={() => setSelectedIds([])}
            className="text-xs font-medium text-blue-600 hover:underline"
          >
            Clear selection
          </button>
        </div>
      )}

      {/* Employee table */}
      <div className="w-full overflow-x-auto">
        <Table className="min-w-[1100px]">
          <TableHeader>
            <TableRow className="bg-slate-50/70 hover:bg-slate-50/70">
              <TableHead className="w-12 pl-6">
                <Checkbox
                  checked={
                    allSelected
                      ? true
                      : currentPageIds.some((id) => selectedIds.includes(id))
                      ? false
                      : false
                  }
                  onCheckedChange={toggleCurrentPage}
                  aria-label="Select all employees on this page"
                />
              </TableHead>

              <TableHead className="text-xs font-semibold text-slate-600">
                Employee
              </TableHead>

              <TableHead className="text-xs font-semibold text-slate-600">
                Employee ID
              </TableHead>

              <TableHead className="text-xs font-semibold text-slate-600">
                Department
              </TableHead>

              <TableHead className="text-xs font-semibold text-slate-600">
                Position
              </TableHead>

              <TableHead className="text-xs font-semibold text-slate-600">
                Start date
              </TableHead>

              <TableHead className="text-xs font-semibold text-slate-600">
                Progress
              </TableHead>

              <TableHead className="text-xs font-semibold text-slate-600">
                Status
              </TableHead>

              <TableHead className="text-xs font-semibold text-slate-600">
                Next action
              </TableHead>

              <TableHead className="w-12 pr-6 text-center text-xs font-semibold text-slate-600">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((employee) => {
                const status = STATUS_CONFIG[employee.status];

                return (
                  <TableRow
                    key={employee.id}
                    className="border-b border-slate-100 hover:bg-slate-50/50"
                  >
                    {/* Selection */}
                    <TableCell className="pl-6">
                      <Checkbox
                        checked={selectedIds.includes(employee.id)}
                        onCheckedChange={() => toggleEmployee(employee.id)}
                        aria-label={`Select ${employee.name}`}
                      />
                    </TableCell>

                    {/* Employee */}
                    <TableCell>
                      <div className="flex min-w-[185px] items-center gap-2.5">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          {getInitials(employee.name)}
                        </div>

                        <div className="min-w-0">
                          <p className="whitespace-nowrap text-xs font-semibold text-slate-900">
                            {employee.name}
                          </p>
                          <p className="mt-0.5 max-w-[150px] truncate text-[10px] text-slate-400">
                            {employee.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Employee ID */}
                    <TableCell className="whitespace-nowrap text-xs text-slate-500">
                      {employee.employeeId}
                    </TableCell>

                    {/* Department */}
                    <TableCell className="whitespace-nowrap text-xs text-slate-600">
                      {employee.department}
                    </TableCell>

                    {/* Position */}
                    <TableCell className="max-w-[130px] text-xs text-slate-600">
                      {employee.position}
                    </TableCell>

                    {/* Start date */}
                    <TableCell className="whitespace-nowrap text-xs text-slate-500">
                      {employee.startDate}
                    </TableCell>

                    {/* Progress */}
                    <TableCell>
                      <div className="flex min-w-[110px] items-center gap-0">
                        <span className="w-8 shrink-0 text-xs font-medium text-slate-900">
                          {employee.progress}%
                        </span>
                        <div className="flex-1">
                          <Progress
                            value={employee.progress}
                            className={cn("h-1.5 w-[66px] bg-slate-100")}
                            indicatorClassName={getProgressColor(
                              employee.progress
                            )}
                          />
                        </div>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "whitespace-normal rounded-full px-2.5 py-1 text-[11px] font-medium shadow-none",
                          status.className
                        )}
                      >
                        {status.label}
                      </Badge>
                    </TableCell>

                    {/* Next action */}
                    <TableCell>
                      <div className="flex min-w-[145px] flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onNextAction?.(employee)}
                          disabled={!onNextAction}
                          className={cn(
                            "max-w-[110px] text-left text-xs leading-5 text-slate-700",
                            onNextAction &&
                              "cursor-pointer hover:text-blue-600",
                            employee.status === "pending_activation" &&
                              "font-medium text-blue-600"
                          )}
                        >
                          {employee.nextAction}
                        </button>

                        {employee.deadline && (
                          <span className="rounded border border-amber-200 bg-amber-50 px-1.5 py-1 text-[10px] leading-4 text-amber-700">
                            {employee.deadline}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="pr-6 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-8 text-slate-400 hover:text-slate-700"
                            aria-label={`Actions for ${employee.name}`}
                          >
                            <MoreHorizontal className="size-5" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem onClick={() => onView?.(employee)}>
                            <Eye className="mr-2 size-4" />
                            View details
                          </DropdownMenuItem>

                          <DropdownMenuItem onClick={() => onEdit?.(employee)}>
                            <Pencil className="mr-2 size-4" />
                            Edit employee
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() => onDelete?.(employee)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 size-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="h-36 text-center text-sm text-slate-500"
                >
                  No onboarding records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex flex-col justify-between gap-4 border-t border-slate-100 px-5 py-3.5 sm:flex-row sm:items-center">
        <p className="text-xs text-slate-500">
          Showing{" "}
          <span className="font-medium text-slate-700">
            {filteredEmployees.length === 0
              ? 0
              : (currentPage - 1) * rowsPerPage + 1}
            {" to "}
            {Math.min(currentPage * rowsPerPage, filteredEmployees.length)}
          </span>{" "}
          of{" "}
          <span className="font-medium text-slate-700">
            {filteredEmployees.length}
          </span>{" "}
          employees
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {/* Pagination */}
          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-8"
              disabled={currentPage <= 1}
              onClick={() => setPage((previous) => Math.max(1, previous - 1))}
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </Button>

            {paginationNumbers.map((number, index) => (
              <div key={number} className="flex items-center gap-1.5">
                {index > 0 && number - paginationNumbers[index - 1] > 1 && (
                  <span className="px-1 text-xs text-slate-400">...</span>
                )}

                <Button
                  type="button"
                  variant={currentPage === number ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setPage(number)}
                  className={cn(
                    "size-8 text-xs",
                    currentPage === number &&
                      "bg-blue-600 text-white hover:bg-blue-700"
                  )}
                  aria-current={currentPage === number ? "page" : undefined}
                >
                  {number}
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-8"
              disabled={currentPage >= totalPages}
              onClick={() =>
                setPage((previous) => Math.min(totalPages, previous + 1))
              }
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>

          {/* Page size */}
          <Select
            value={String(rowsPerPage)}
            onValueChange={(value) => {
              setRowsPerPage(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger className="h-8 w-[114px] text-xs">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {[5, 8, 10, 20, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size} per page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}
