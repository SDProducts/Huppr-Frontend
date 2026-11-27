"use client";

import { useField, useFormikContext } from "formik";
import { Check, Search, X } from "lucide-react";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { cn, getInitials } from "@/lib/utils";

type EmployeeMultiSelectProps = {
  name: string;
  employees: Employee[];
  placeholder?: string;
  className?: string;
  label?: string;
};

export function EmployeeMultiSelect({
  name,
  employees,
  label,
  placeholder = "Search employees by name or role...",
  className,
}: EmployeeMultiSelectProps) {
  const [field] = useField<string[]>(name);
  const { setFieldValue } = useFormikContext();

  const [search, setSearch] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);

  const selectedEmployees = React.useMemo(
    () => field.value ?? [],
    [field.value]
  );
  const filteredEmployees = React.useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return employees.filter(
        (employee) =>
          !selectedEmployees.some((selected) => selected === employee.id)
      );
    }

    return employees.filter((employee) => {
      const matchesSearch =
        employee.id.toLowerCase().includes(query) ||
        employee.roleId?.toLowerCase().includes(query);

      const isSelected = selectedEmployees.some(
        (selected) => selected === employee.id
      );

      return matchesSearch && !isSelected;
    });
  }, [employees, search, selectedEmployees]);

  const addEmployee = (employee: Employee) => {
    setFieldValue(name, [...selectedEmployees, employee.id]);
    setSearch("");
  };

  const removeEmployee = (employeeId: string) => {
    setFieldValue(
      name,
      selectedEmployees.filter((employee) => employee !== employeeId)
    );
  };

  return (
    <div className={cn("relative w-full", className)}>
      {label && <div className="mb-0.5">{label}</div>}
      {/* Search Input */}
      <div className="relative">
        <Search
          className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-[#b8bfd3]"
          strokeWidth={2}
        />

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // Small delay allows clicking a result before closing
            setTimeout(() => setIsFocused(false), 150);
          }}
          placeholder={placeholder}
          className={cn(
            "h-10 rounded-lg border-[#e7eaf2] bg-white pl-[55px] pr-5",
            "text-sm text-[#596174]",
            "placeholder:text-[#c0c5d8]",
            "focus-visible:border-[#d9deea] focus-visible:ring-0"
          )}
        />
      </div>

      {/* Search Results */}
      {isFocused && search && filteredEmployees.length > 0 && (
        <div className="absolute left-0 right-0 bottom-15 z-50 overflow-hidden rounded-xl border border-[#e7eaf2] bg-white p-2 shadow-lg">
          {filteredEmployees.map((employee) => (
            <button
              key={employee.id}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => addEmployee(employee)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-[#f5f7fb]"
            >
              {/* Avatar */}
              <Avatar>
                <AvatarImage
                  src={employee.id}
                  alt={employee.id}
                  className="size-10 rounded-full border-2 border-white object-cover"
                />
                <AvatarFallback className="flex size-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#2864e8]">
                  {getInitials(employee.id)}
                </AvatarFallback>
              </Avatar>

              {/* Employee information */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#252936]">
                  {employee.id}
                </p>

                {employee.roleId && (
                  <p className="truncate text-xs text-[#737b8f]">
                    {employee.roleId}
                  </p>
                )}
              </div>

              <Check className="size-4 text-[#2864e8]" />
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {isFocused && search && filteredEmployees.length === 0 && (
        <div className="absolute left-0 right-0 bottom-15 z-50 rounded-xl border border-[#e7eaf2] bg-white p-5 text-center text-sm text-[#737b8f] shadow-lg">
          No employees found
        </div>
      )}

      {/* Selected Employees */}
      {selectedEmployees.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedEmployees.map((employee) => {
            const item = employees.find((emp) => emp.id === employee);
            return (
              <div
                key={employee}
                className="flex h-fit items-center gap-1 text-xs rounded-full bg-[#dce7f5] px-3 py-1"
              >
                {/* Avatar */}
                <Avatar
                  className={cn("bg-white flex justify-center items-center")}
                >
                  <AvatarImage
                    src={item?.id}
                    alt={item?.id}
                    className="size-8 rounded-full border-2 border-white object-cover"
                  />
                  <AvatarFallback className="flex size-8 text-xs text-[#2864e8]">
                    {getInitials(item?.id || "")}
                  </AvatarFallback>
                </Avatar>

                {/* Name */}
                <span className="font-semibold text-[#5d687b]">{item?.id}</span>

                {/* Remove */}
                <div
                  onClick={() => removeEmployee(item?.id || "")}
                  className="flex ml-2 cursor-pointer size-5 items-center justify-center rounded-full text-[#657084] transition-colors hover:bg-white hover:text-[#252936]"
                  aria-label={`Remove ${item?.id}`}
                >
                  <X className="size-4" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
