"use client";

/* eslint-disable react/no-unescaped-entities */
import RolePreview from "@/app/dashboard/departments/_components/CreateRoleStep5";
import Stepper from "@/app/dashboard/departments/_components/Steps&Progress";
import Checkbox from "@/components/form/Checkbox";
import Input from "@/components/form/Input";
import SearchableSelect from "@/components/form/SearchableSelect";
import {
  CreateRoleStep2Skeleton,
  SelectInputSkeleton,
} from "@/components/skeletons";
import Button from "@/components/ui/CustomButton";
import { useModal } from "@/context/modal.state";
import {
  useGetRoles,
  useGetRolesById,
  usePatchNewRole,
} from "@/hooks/employer/useDepartment";
import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import React from "react";
interface Prop {
  roleId: string;
}
const CreateRoleStep4: React.FC<Prop> = ({ roleId }) => {
  const modal = useModal();
  const { data: roleData, isLoading } = useGetRolesById(roleId);
  const { data: rolesListData, isLoading: isLoadingRoles } = useGetRoles();

  const { mutate: patchRole, isPending } = usePatchNewRole(roleId);
  if (isLoading || (!roleData && roleId)) {
    return <CreateRoleStep2Skeleton />;
  }

  const REPORTING_LINE: Option[] =
    rolesListData?.items.map((item) => ({
      label: item.name,
      value: item.name,
    })) || [];
  const LEAVE_POLICIES: Option[] = [
    { label: "Annual Leave", value: "annual" },
    { label: "Sick Leave", value: "sick" },
    { label: "Study Leave", value: "study" },
  ];
  const SALARY_REVIEW_FREQUECY: Option[] = [
    { label: "Annually", value: "annual" },
    { label: "Bi-annualy", value: "bi-annual" },
    { label: "Quartly", value: "quartly" },
  ];
  const PROBATION_PERIOD: Option[] = [
    { label: "3 months", value: "3" },
    { label: "6 months", value: "6" },
    { label: "12 months", value: "12" },
    { label: "24 months", value: "24" },
  ];
  const BENEFITS: Option[] = [
    { label: "Health Benefits", value: "Health benefits" },
    { label: "Pension Benefits", value: "Pension benefits" },
    { label: "Learning budget", value: "Learning budget" },
    { label: "Commissions", value: "Commissions" },
    { label: "Profit Sharing", value: "Profit Sharing" },
  ];
  const initialValues: CreateRolePayload = {
    benefits: {
      maximumSalary: roleData?.benefits?.maximumSalary || 0,
      minimumSalary: roleData?.benefits?.minimumSalary || 0,
      benefits: roleData?.benefits?.benefits || [],
      reportingLine: roleData?.benefits?.reportingLine || "",
      salaryReviewFrequency: roleData?.benefits?.salaryReviewFrequency || "",
      probationMonths: roleData?.benefits?.probationMonths,
      leaveTypes: roleData?.benefits?.leaveTypes || [],
      successionPath: roleData?.benefits?.successionPath,
      growthReviewFrequency: roleData?.benefits?.growthReviewFrequency,
    },
  };
  const submit = (values: typeof initialValues) => {
    modal.open({
      content: <RolePreview roleId={roleId} />,
      size: "sm:w-3xl",
      bgColor: "bg-gray-100",
    });
    // patchRole(values);
  };

  return (
    <div className="px-4 space-y-10">
      <div className="">
        <h2 className="text-2xl font-bold">Organization & Access</h2>
        <p className="text-sm">
          Define reporting lines and system permissions for this role.{" "}
        </p>
      </div>
      <Stepper currentStep={4} />
      <Formik initialValues={initialValues} onSubmit={submit}>
        {({ values }) => {
          return (
            <Form>
              <div className="grid grid-cols-[2fr_1fr] gap-4">
                <div className="space-y-4">
                  <div className="p-4 rounded-md bg-white space-y-3">
                    <div className="">
                      <div className="text-xl font-bold">Salary Range</div>
                      <div className="text-xs">
                        Define the annual base salary for this role.
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        label="Minimum Salary"
                        name="benefits.minimumSalary"
                        type="number"
                        formatMoney
                      />
                      <Input
                        label="Maximum Salary"
                        name="benefits.maximumSalary"
                        type="number"
                        formatMoney
                      />
                    </div>
                  </div>
                  <div className="p-4 rounded-md bg-white">
                    <div className="font-bold text-xl -mb-5">Leave Policy</div>
                    <Checkbox
                      name="benefits.leaveTypes"
                      type="multiple"
                      options={LEAVE_POLICIES}
                      label="Specify the annual leave entitlement and specific policies."
                      orientationStyle="grid"
                      optionClassName="border-none!"
                    />
                  </div>
                  <div className="p-4 rounded-md bg-white space-y-5">
                    <div className="">
                      <div className="text-xl font-bold">
                        Career Progression
                      </div>
                      <div className="text-xs">
                        Define the growth track and review cycles for this role.
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <SearchableSelect
                          name="benefits.salaryReviewFrequency"
                          label="Salary Review Frequency"
                          options={SALARY_REVIEW_FREQUECY}
                          labelClassName="text-sm"
                        />
                        <SearchableSelect
                          name="benefits.probationMonths"
                          label="Probation Duration"
                          options={PROBATION_PERIOD}
                          labelClassName="text-sm"
                        />
                      </div>
                      <SearchableSelect
                        name="benefits.growthReviewFrequency"
                        label="Promotion & Growth Track"
                        options={SALARY_REVIEW_FREQUECY}
                        labelClassName="text-sm"
                      />
                      {isLoadingRoles ? (
                        <SelectInputSkeleton />
                      ) : (
                        <SearchableSelect
                          label="Succession Path"
                          name="benefits.successionPath"
                          options={REPORTING_LINE}
                          placeholder="e.g., Senior Engineer to Lead Engineer"
                          labelClassName="text-sm"
                        />
                      )}

                      {isLoadingRoles ? (
                        <SelectInputSkeleton />
                      ) : (
                        <SearchableSelect
                          name="benefits.reportingLine"
                          label="Reporting Line"
                          options={REPORTING_LINE}
                          labelClassName="text-sm"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="p-4 rounded-md bg-white space-y-4">
                    <div className="font-bold text-xl">Benefits Checklist</div>
                    <Checkbox
                      name="benefits.benefits"
                      type="multiple"
                      options={BENEFITS}
                      label=""
                      orientationStyle="grid"
                      optionClassName="border-none! font-medium!"
                    />
                  </div>
                  <div className="p-4 bg-primary-100 rounded-md mt-7">
                    <div className="flex items-start gap-2">
                      <div className="py-1">
                        <Lightbulb size={18} className="text-primary" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="text-primary font-bold">
                          AI Suggestion
                        </div>
                        <div className="text-sm">
                          Consider adding "Agile Methodologies" to required
                          skills based on similar Senior Backend roles in your
                          industry.
                        </div>
                        <div className="text-primary font-bold text-sm">
                          Apply Suggestion
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-20 pb-5 flex items-center justify-between">
                <div className="">
                  <Button
                    label="Back"
                    icon={<ArrowLeft />}
                    className="w-fit! bg-transparent text-gray-500!"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => patchRole(values)}
                    label="Save as draft"
                    className="bg-transparent! text-primary! border"
                    disabled={isPending}
                    isLoading={isPending}
                  />
                  <Button
                    label="Continue"
                    type="submit"
                    rightIcon={<ArrowRight />}
                    disabled={isPending}
                    isLoading={isPending}
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateRoleStep4;
