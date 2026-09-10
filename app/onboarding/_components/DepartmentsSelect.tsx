"use client";
import { DepartmentsSelectSkeleton } from "@/components/skeletons";
import Button from "@/components/ui/CustomButton";
import {
  useCompleteDepartmentStep,
  useGetOnboarding,
  useSaveSelectedDepartments,
} from "@/hooks/auth/useOnboarding";
import {
  useGetDepartmentIcons,
  useGetDepartments,
} from "@/hooks/references/useReferences";
import { ArrowLeft, ArrowRight, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DepartmentsSelect = () => {
  const { data: onboardingState } = useGetOnboarding();
  const router = useRouter();
  const { data } = useGetDepartments();
  const { data: iconsData } = useGetDepartmentIcons();
  const { mutate: saveDepartments, isPending } = useSaveSelectedDepartments();
  const { mutate: completeStep, isPending: isCompleting } =
    useCompleteDepartmentStep();
  const savedDepartments = onboardingState?.departments || [];
  const [selectedDepartments, setselectedDepartments] =
    useState<SelectedDepartment[]>(savedDepartments);
  if (!data || !iconsData || !onboardingState) {
    return <DepartmentsSelectSkeleton />;
  }
  const icons = iconsData?.items || [];
  const handleToggleDepartment = (dept: Suggestion) => {
    const { popular, ...selected } = dept;
    console.log(popular);
    const exists = selectedDepartments.some((item) => item.name === dept.name);
    if (exists) {
      setselectedDepartments(
        selectedDepartments.filter((item) => item.name !== selected.name)
      );
    } else {
      setselectedDepartments([...selectedDepartments, selected]);
    }
  };
  const proceed = () => {
    const payload = {
      expectedRevision: onboardingState?.departmentsRevision || 0,
      departments: selectedDepartments,
    };
    saveDepartments(payload, {
      onSuccess() {
        completeStep();
      },
    });
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

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {data?.suggestions.map((dept, i) => {
          const icon = icons.find((item) => item.id === dept.iconId);
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
              <div className="h-14 sm:h-28 w-full flex justify-center items-center">
                {icon && (
                  <img
                    src={icon.url}
                    alt={icon.name}
                    className="w-8 sm:w-16 h-8 sm:h-16"
                  />
                )}
              </div>
              <div
                className={`${
                  isSelected ? "bg-transparent text-white" : "bg-white"
                } text-xs p-2 text-center group-hover:bg-transparent group-hover:text-white truncate line-clamp-1`}
              >
                {dept.name}
              </div>
            </div>
          );
        })}
        <div className="border rounded-md bg-gray-200 group hover:bg-primary/70 hover:text-white overflow-hidden border-gray-300 flex flex-col cursor-pointer">
          <div className="h-14 sm:h-28 w-full flex justify-center items-center">
            <PlusCircle className="h-8 w-8 sm:h-16 sm:w-16" />
          </div>
          <div className="bg-white truncate line-clamp-1 text-xs p-2 text-center group-hover:bg-transparent group-hover:text-white">
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
          loadingLabel="Saving..."
          isLoading={isPending || isCompleting}
          disabled={isPending || isCompleting}
          rightIcon={<ArrowRight />}
          className="w-fit! px-5 rounded-full!"
        />
      </div>
    </div>
  );
};

export default DepartmentsSelect;
