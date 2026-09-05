"use client";
import { DepartmentsSelectSkeleton } from "@/components/skeletons";
import Button from "@/components/ui/CustomButton";
import {
  useGetOnboarding,
  useSaveSelectedDepartments,
} from "@/hooks/auth/useOnboarding";
import { useGetDepartments } from "@/hooks/references/useReferences";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  ChartNoAxesCombined,
  Code,
  HelpCircle,
  LucideGavel,
  Megaphone,
  Package,
  Palette,
  PlusCircle,
  Settings,
  Users2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DepartmentsSelect = () => {
  const { data: onboardingState } = useGetOnboarding();
  const router = useRouter();
  const { data } = useGetDepartments();
  const { mutate: saveDepartments, isPending } = useSaveSelectedDepartments();
  const [selectedDepartments, setselectedDepartments] = useState<Suggestion[]>(
    []
  );
  if (!data) {
    return <DepartmentsSelectSkeleton />;
  }
  const departmnts = [
    {
      name: "Human Resources",
      icon: Users2,
    },
    {
      name: "Finance",
      icon: Banknote,
    },
    {
      name: "Sales",
      icon: ChartNoAxesCombined,
    },
    {
      name: "Marketing",
      icon: Megaphone,
    },
    {
      name: "Operations",
      icon: Settings,
    },
    {
      name: "Customer Support",
      icon: HelpCircle,
    },
    {
      name: "Engineering",
      icon: Code,
    },
    {
      name: "Product",
      icon: Package,
    },
    {
      name: "General",
      icon: Palette,
    },
    {
      name: "Legal",
      icon: LucideGavel,
    },
    {
      name: "Administration",
      icon: Code,
    },
  ];
  const handleToggleDepartment = (dept: Suggestion) => {
    const exists = selectedDepartments.some((item) => item.name === dept.name);
    if (exists) {
      setselectedDepartments(
        selectedDepartments.filter((item) => item.name !== dept.name)
      );
    } else {
      setselectedDepartments([...selectedDepartments, dept]);
    }
  };
  const proceed = () => {
    const payload = {
      expectedRevision: onboardingState?.departmentsRevision || 0,
      departments: selectedDepartments,
    };
    saveDepartments(payload);
  };
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold">Set up your departments</h2>
        <p className="text-sm">
          Select the departments currently active in your workspace. You can
          always add more later.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {data?.suggestions.map((dept, i) => {
          const department = departmnts.find((item) => item.name === dept.name);
          const isSelected = selectedDepartments.some(
            (item) => item.name === dept.name
          );
          return (
            <div
              className={`border rounded-md  group hover:bg-primary/70 hover:text-white overflow-hidden border-gray-300 flex flex-col cursor-pointer ${
                isSelected ? "bg-primary text-white" : "bg-gray-200"
              }`}
              key={i}
              onClick={() => {
                handleToggleDepartment(dept);
              }}
            >
              <div className="h-28 w-full flex justify-center items-center">
                {department && <department.icon size={50} />}
              </div>
              <div
                className={`${
                  isSelected ? "bg-transparent text-white" : "bg-white"
                } text-xs p-2 text-center group-hover:bg-transparent group-hover:text-white`}
              >
                {dept.name}
              </div>
            </div>
          );
        })}
        <div className="border rounded-md bg-gray-200 group hover:bg-primary/70 hover:text-white overflow-hidden border-gray-300 flex flex-col cursor-pointer">
          <div className="h-28 w-full flex justify-center items-center">
            <PlusCircle size={50} />
          </div>
          <div className="bg-white text-xs p-2 text-center group-hover:bg-transparent group-hover:text-white">
            {"Custom Dept"}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm py-4 border-t border-gray-300">
        <Button
          onClick={() => router.push("/onboarding/company_setup")}
          label="Back"
          icon={<ArrowLeft />}
          className="w-fit! px-5 rounded-full! bg-transparent text-black!"
        />
        <Button
          label="Continue"
          onClick={proceed}
          isLoading={isPending}
          disabled={isPending}
          rightIcon={<ArrowRight />}
          className="w-fit! px-5 rounded-full!"
        />
      </div>
    </div>
  );
};

export default DepartmentsSelect;
