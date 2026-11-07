import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import React from "react";

export const TopFilter = () => {
  return (
    <div className="min-w-0 flex-1">
      {/* Top bar */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[13px] font-semibold text-slate-400">
          <span className="text-slate-700">128</span> open positions
        </h2>

        <div className="flex items-center gap-2 text-[12px]">
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
      </div>
    </div>
  );
};

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-9">
      <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.03em] text-slate-500">
        {title}
      </h3>

      <div className="space-y-3">{children}</div>
    </div>
  );
}
function CheckboxRow({
  label,
  checked = false,
  onCheckedChange,
}: {
  label: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <Checkbox
        defaultChecked={checked}
        onCheckedChange={onCheckedChange}
        className="h-[16px] w-[16px] rounded-[3px] border-slate-300 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
      />

      <span>{label}</span>
    </label>
  );
}
export interface FilterParams {
  employement_type?: string;
  experience_level?: string;
  industry?: string;
  salary_rage?: {
    min: number;
    max: number;
  };
}
interface Prop {
  filter: FilterParams;
  onSetFilter: (filter: FilterParams) => void;
}
export const FilterSidebar: React.FC<Prop> = ({ filter, onSetFilter }) => {
  const handleExperienceChange = (value: string, checked: boolean) => {
    onSetFilter({ ...filter, experience_level: value });
  };
  return (
    <div className="ext-[13px] text-slate-500">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="font-semibold text-slate-500">Filters</h2>

        <button className="text-[12px] font-semibold text-blue-600 hover:text-blue-700">
          Clear Filters
        </button>
      </div>

      {/* Employment */}
      <FilterSection title="Employment Type">
        {["Full-time", "Contract", "Part-time", "Internship"].map((item) => (
          <CheckboxRow key={item} label={item} />
        ))}
      </FilterSection>

      {/* Experience */}
      <FilterSection title="Experience Level">
        {["Entry Level", "Intermediate", "Senior"].map((item) => (
          <CheckboxRow
            key={item}
            label={item}
            checked={filter.experience_level === item}
            onCheckedChange={(checked) => handleExperienceChange(item, checked)}
          />
        ))}{" "}
      </FilterSection>

      {/* Salary */}
      <FilterSection title="Salary Range">
        <div className="px-2 pt-3">
          <Slider
            defaultValue={[40, 200]}
            min={40}
            max={200}
            step={5}
            className="mb-3"
          />

          <div className="flex justify-between text-[11px]">
            <span>$40k</span>
            <span>$200k+</span>
          </div>
        </div>
      </FilterSection>

      {/* Industry */}
      <FilterSection title="Industry">
        <Select defaultValue="all">
          <SelectTrigger className="h-9 w-full border-slate-200 bg-white text-xs text-slate-600">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
          </SelectContent>
        </Select>
      </FilterSection>
    </div>
  );
};
