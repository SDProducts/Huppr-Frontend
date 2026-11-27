"use client";

import { cn, getInitials } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreHorizontal,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  employmentType: string;
  status: "Active" | "Inactive";
  startDate: string;
  avatar?: string;
}

interface EmployeeTableProps {
  employees: Employee[];
  pageSize?: number;
  onEmployeeClick?: (employee: Employee) => void;
  onEmployeeAction?: (
    action: "view" | "edit" | "delete",
    employee: Employee
  ) => void;
}

const tabs = [
  "All Employees",
  "By Department",
  "By Role",
  "Active / Inactive",
] as const;

type Tab = (typeof tabs)[number];

const departmentStyles: Record<string, string> = {
  Product: "bg-blue-50 text-blue-600",
  Engineering: "bg-purple-50 text-purple-600",
  Marketing: "bg-pink-50 text-pink-600",
  Sales: "bg-amber-50 text-amber-700",
  HR: "bg-teal-50 text-teal-700",
};

export default function EmployeeTable({
  employees,
  pageSize = 5,
  onEmployeeClick,
  onEmployeeAction,
}: EmployeeTableProps) {
  const [activeTab, setActiveTab] = useState<Tab>("All Employees");
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const departments = useMemo(
    () => [...new Set(employees.map((employee) => employee.department))],
    [employees]
  );

  const roles = useMemo(
    () => [...new Set(employees.map((employee) => employee.role))],
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
          employee.department,
          employee.role,
          employee.employmentType,
        ].some((value) => value.toLowerCase().includes(query));

      const matchesDepartment =
        !departmentFilter || employee.department === departmentFilter;

      const matchesRole = !roleFilter || employee.role === roleFilter;

      const matchesStatus = !statusFilter || employee.status === statusFilter;

      const matchesTab =
        activeTab === "Active / Inactive"
          ? !statusFilter || employee.status === statusFilter
          : true;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesRole &&
        matchesStatus &&
        matchesTab
      );
    });
  }, [
    employees,
    search,
    departmentFilter,
    roleFilter,
    statusFilter,
    activeTab,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEmployees.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const currentPageIds = paginatedEmployees.map((employee) => employee.id);

  const allCurrentSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedIds.includes(id));

  const resetPage = () => setPage(1);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setDepartmentFilter("");
    setRoleFilter("");
    setStatusFilter("");
    resetPage();
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
      allCurrentSelected
        ? previous.filter((id) => !currentPageIds.includes(id))
        : [...new Set([...previous, ...currentPageIds])]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setDepartmentFilter("");
    setRoleFilter("");
    setStatusFilter("");
    resetPage();
  };

  const hasFilters =
    search !== "" ||
    departmentFilter !== "" ||
    roleFilter !== "" ||
    statusFilter !== "";

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  ).filter(
    (number) =>
      number === 1 ||
      number === totalPages ||
      Math.abs(number - currentPage) <= 1
  );

  return (
    <section className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
      {/* Tabs and search */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 px-5 pt-4 md:flex-row md:items-center">
        <div className="flex gap-7 overflow-x-auto">
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={cn(
                "relative whitespace-nowrap pb-4 text-sm font-semibold transition",
                activeTab === tab
                  ? "text-blue-600"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              {tab}

              {activeTab === tab && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-blue-600" />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 pb-3">
          <div className="flex h-9 min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 md:w-[265px]">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />

            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                resetPage();
              }}
              placeholder="Search employees..."
              className="w-full min-w-0 bg-transparent text-xs outline-none placeholder:text-slate-400"
            />

            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  resetPage();
                }}
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5 text-slate-400" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((previous) => !previous)}
            className={cn(
              "inline-flex h-9 shrink-0 items-center gap-2 rounded-xl border px-3 text-xs font-medium transition",
              showFilters || hasFilters
                ? "border-blue-200 bg-blue-50 text-blue-600"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            )}
          >
            <Filter className="h-3.5 w-3.5" />
            Filter
          </button>
        </div>
      </div>

      {/* Filter controls */}
      {showFilters && (
        <div className="flex flex-wrap items-end gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-4">
          <FilterSelect
            label="Department"
            value={departmentFilter}
            options={departments}
            onChange={(value) => {
              setDepartmentFilter(value);
              resetPage();
            }}
          />

          <FilterSelect
            label="Role"
            value={roleFilter}
            options={roles}
            onChange={(value) => {
              setRoleFilter(value);
              resetPage();
            }}
          />

          <FilterSelect
            label="Status"
            value={statusFilter}
            options={["Active", "Inactive"]}
            onChange={(value) => {
              setStatusFilter(value);
              resetPage();
            }}
          />

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="h-9 px-2 text-xs font-medium text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1050px] border-collapse text-left">
          <thead>
            <tr className="bg-slate-50/70 text-xs font-semibold text-slate-500">
              <th className="w-12 px-5 py-4">
                <input
                  type="checkbox"
                  checked={allCurrentSelected}
                  onChange={toggleCurrentPage}
                  aria-label="Select all employees on this page"
                  className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-blue-600"
                />
              </th>
              <th className="px-3 py-4">Employee</th>
              <th className="px-3 py-4">Email</th>
              <th className="px-3 py-4">Department</th>
              <th className="px-3 py-4">Role</th>
              <th className="px-3 py-4">Employment Type</th>
              <th className="px-3 py-4">Status</th>
              <th className="px-3 py-4">Start Date</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="px-3">
            {paginatedEmployees.map((employee) => (
              <tr
                key={employee.id}
                className="border-t px-3! border-slate-100 transition hover:bg-slate-50/60"
              >
                <td className="pl-5">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(employee.id)}
                    onChange={() => toggleEmployee(employee.id)}
                    aria-label={`Select ${employee.name}`}
                    className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-blue-600"
                  />
                </td>

                <td className="">
                  <button
                    type="button"
                    onClick={() => onEmployeeClick?.(employee)}
                    className="flex items-center gap-3 text-left"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                      {getInitials(employee.name)}
                    </div>

                    <span className="whitespace-nowrap text-xs font-bold text-slate-900">
                      {employee.name}
                    </span>
                  </button>
                </td>

                <td className=" text-xs text-slate-500">{employee.email}</td>

                <td className="">
                  <span
                    className={cn(
                      "inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium",
                      departmentStyles[employee.department] ??
                        "bg-slate-100 text-slate-600"
                    )}
                  >
                    {employee.department}
                  </span>
                </td>

                <td className="whitespace-nowrap  text-xs text-slate-700">
                  {employee.role}
                </td>

                <td className="whitespace-nowrap  text-xs text-slate-700">
                  {employee.employmentType}
                </td>

                <td className="">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium",
                      employee.status === "Active"
                        ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-slate-100 text-slate-600"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        employee.status === "Active"
                          ? "bg-emerald-500"
                          : "bg-slate-400"
                      )}
                    />
                    {employee.status}
                  </span>
                </td>

                <td className="whitespace-nowrap  text-xs text-slate-600">
                  {employee.startDate}
                </td>

                <td className="relative  text-center">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenu((current) =>
                        current === employee.id ? null : employee.id
                      )
                    }
                    aria-label={`Actions for ${employee.name}`}
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <MoreHorizontal className="h-6 w-6" />
                  </button>

                  {openMenu === employee.id && (
                    <div className="absolute right-5 top-12 z-20 w-36 rounded-lg border border-slate-200 bg-white p-1 text-left shadow-lg">
                      {(
                        [
                          ["view", "View employee"],
                          ["edit", "Edit employee"],
                          ["delete", "Delete employee"],
                        ] as const
                      ).map(([action, label]) => (
                        <button
                          key={action}
                          type="button"
                          onClick={() => {
                            onEmployeeAction?.(action, employee);
                            setOpenMenu(null);
                          }}
                          className={cn(
                            "block w-full rounded-md px-3 py-2 text-xs hover:bg-slate-50",
                            action === "delete"
                              ? "text-red-600"
                              : "text-slate-700"
                          )}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {paginatedEmployees.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="px-5 py-16 text-center text-sm text-slate-500"
                >
                  No employees found. Try changing your search or filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / pagination */}
      <footer className="flex flex-col justify-between gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center">
        <p className="text-xs text-slate-500">
          Showing{" "}
          <span className="font-medium text-slate-700">
            {filteredEmployees.length === 0
              ? 0
              : (currentPage - 1) * pageSize + 1}
            {" — "}
            {Math.min(currentPage * pageSize, filteredEmployees.length)}
          </span>{" "}
          of{" "}
          <span className="font-medium text-slate-700">
            {filteredEmployees.length}
          </span>{" "}
          employees
          {selectedIds.length > 0 && (
            <span className="ml-2 text-blue-600">
              ({selectedIds.length} selected)
            </span>
          )}
        </p>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setPage((previous) => Math.max(1, previous - 1))}
            aria-label="Previous page"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {pageNumbers.map((number, index) => {
            const previousNumber = pageNumbers[index - 1];

            return (
              <span key={number} className="contents">
                {previousNumber && number - previousNumber > 1 && (
                  <span className="px-1 text-xs text-slate-400">...</span>
                )}

                <button
                  type="button"
                  onClick={() => setPage(number)}
                  aria-current={currentPage === number ? "page" : undefined}
                  className={cn(
                    "h-8 min-w-8 rounded-lg border px-2 text-xs transition",
                    currentPage === number
                      ? "border-blue-600 bg-blue-600 font-semibold text-white"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {number}
                </button>
              </span>
            );
          })}

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() =>
              setPage((previous) => Math.min(totalPages, previous + 1))
            }
            aria-label="Next page"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </section>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium text-slate-600">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 min-w-36 rounded-lg border border-slate-200 bg-white px-3 text-xs outline-none focus:border-blue-500"
      >
        <option value="">All {label.toLowerCase()}s</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
