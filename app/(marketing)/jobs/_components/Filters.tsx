// import { Checkbox } from "@/components/ui/checkbox";
import Checkbox from "@/components/form/Checkbox";
import RangeSliderField from "@/components/form/RangeSliderField";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, getCurrency } from "@/lib/utils";
import { Form, Formik } from "formik";
import { SlidersHorizontal } from "lucide-react";
import React from "react";

export const SortingSection: React.FC<Prop> = ({ filter, onSetFilter }) => {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-slate-500">Sort by:</span>

      <Select defaultValue="newest">
        <SelectTrigger className="h-auto w-auto gap-1 border-0 bg-transparent p-0 text-xs font-semibold text-slate-700 shadow-none focus:ring-0">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="salary-high">Salary: High to Low</SelectItem>
          <SelectItem value="salary-low">Salary: Low to High</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

interface Prop {
  filter: JobsFilters;
  onSetFilter: (filter: JobsFilters) => void;
}
export const FilterSidebar: React.FC<Prop> = ({ filter, onSetFilter }) => {
  const formData = {
    employmentType: filter.employmentType,
    seniorityLevel: filter.seniorityLevel,
    workArrangement: filter.workArrangement,
    salary_range: filter.salary_rage,
  };
  const WORK_ARRANGEMENT = [
    { label: "remote ", value: "remote" },
    { label: "hybrid", value: "hybrid" },
    { label: "On site", value: "on_site" },
  ];
  const LEVELS = [
    { label: "Entry Level", value: "entry" },
    { label: "Junior", value: "junior" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Senior ", value: "senior" },
  ];
  const TYPES = [
    { label: "Full-time ", value: "full_time" },
    { label: "Part-time", value: "part_time" },
    { label: "Contract", value: "contract" },
    { label: "Internship", value: "internship" },
  ];
  function handleFilter(params: typeof formData) {
    onSetFilter({
      ...filter,
      seniorityLevel: params.seniorityLevel,
      employmentType: params.employmentType,
      workArrangement: params.workArrangement,
    });
  }
  return (
    <div className="text-slate-500">
      <Formik initialValues={formData} onSubmit={handleFilter}>
        {({ values, resetForm }) => {
          return (
            <Form className="space-y-6">
              <div className="">
                <h2 className="text-lg font-bold">Filter Jobs</h2>
                <p className="text-xs text-gray-500">
                  Search products by name, filter work arrangement, employment
                  type and salary.
                </p>
              </div>

              <div className="space-y-6">
                <Checkbox
                  type="multiple"
                  name="employmentType"
                  options={TYPES}
                  orientationStyle="grid gap-0.5"
                  size="xs"
                  optionClassName="border-none p-1! rounded-sm"
                  label="EMPLOYEMENT TYPE"
                />
                <Checkbox
                  type="multiple"
                  name="seniorityLevel"
                  options={LEVELS}
                  size="xs"
                  orientationStyle="grid gap-0.5"
                  optionClassName="border-none p-1! rounded-sm"
                  label="EXPERIENCE LEVEL"
                />
                <Checkbox
                  type="multiple"
                  name="workArrangement"
                  options={WORK_ARRANGEMENT}
                  size="xs"
                  orientationStyle="grid gap-0.5"
                  optionClassName="border-none p-1! rounded-sm"
                  label="ARRANGEMENT"
                />
                <RangeSliderField
                  name="salaryRange"
                  label="SALARY RANGE"
                  // description="Set the minimum candidate matching percentage."
                  min={20}
                  max={100}
                  step={5}
                  formatValue={(value) => `${getCurrency(value, "NGN")}`}
                />
              </div>
              <div className="flex justify-between">
                <Button
                  variant={"ghost"}
                  className={cn("p-5")}
                  onClick={() => resetForm()}
                >
                  <span>Reset</span>
                </Button>
                <Button className={cn("py-5 px-5")} type="submit">
                  <SlidersHorizontal />
                  <span>Filter</span>
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
