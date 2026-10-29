"use client";
import { CreateLeavePolicyStep } from "@/app/dashboard/departments/_components/Steps&Progress";
import Checkbox from "@/components/form/Checkbox";
import MultiSearchableSelect from "@/components/form/MultiSearchableSelect";
import RadioGroup from "@/components/form/RadioGroup";
import TabsSelectField from "@/components/form/TabSelectInput";
import { SelectInputSkeleton } from "@/components/skeletons";
import Button from "@/components/ui/CustomButton";
import { useGetDepartments, useGetRoles } from "@/hooks/employer/useDepartment";
import { Form, Formik } from "formik";
import { ArrowRight, Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EligibilityForm() {
  const router = useRouter();
  const { data: deptResponse, isLoading: isGettingDept } = useGetDepartments();
  const { data: rolesResponse, isLoading: isGettingRoles } = useGetRoles();
  const initialValues = {
    departmentIds: "",
    roleIds: "",
    employemt_type: ["full_time"],
    gender: "all",
    match: "match_all",
  };
  const departments = deptResponse?.items || [];
  const roles = rolesResponse?.items || [];
  const DEPARTMENT_OPTIONS = departments.map((dept) => ({
    label: dept.name,
    value: dept.id,
  }));
  const ROLES_OPTION = roles.map((role) => ({
    label: role.name,
    value: role.id,
  }));
  const MATCH_OPTION = [
    { label: "Match All (AND)", value: "match_all" },
    { label: "Match Any (OR)", value: "match_any" },
  ];
  const TYPE_OPTION = [
    { label: "Full-time", value: "full_time" },
    { label: "Part-time", value: "part_time" },
    { label: "Contract", value: "contract" },
    { label: "Internship", value: "internship" },
  ];
  const GENDER_OPTION = [
    { label: "All", value: "all" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  function saveDraft(params: typeof initialValues) {
    router.replace(`/dashboard/leave/create-leave-policy?step=entitlement`);
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validateOnMount
        onSubmit={saveDraft}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <div className="grid grid-cols-[2fr_1fr] gap-8">
                <div className="space-y-10">
                  <div className="flex justify-between gap-4 items-start">
                    <div className="flex-1">
                      <h2 className="text-3xl font-extrabold">
                        Create Leave Policy
                      </h2>
                      <p>
                        Define a leave policy and configure eligibility,
                        entitlement and approval rules.
                      </p>
                    </div>
                    <div className="">
                      <Button
                        type="submit"
                        label="Save Draft"
                        icon={<Bookmark className="size-4" />}
                        className="bg-transparent! border text-primary! w-fit! text-sm"
                      />
                    </div>
                  </div>
                  <CreateLeavePolicyStep currentStep={2} />
                  <div className="space-y-8 bg-white p-6 rounded-xl">
                    <div className="flex justify-between gap-4 items-start">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold">Eligibility Rules</h2>
                        <p>
                          Define who is eligible for this leave policy based on
                          organizational criteria.
                        </p>
                      </div>
                      <TabsSelectField
                        name="match"
                        options={MATCH_OPTION}
                        optionClassName="text-xs! px-3"
                      />
                    </div>
                    <div className="grid gap-5">
                      {isGettingDept ? (
                        <SelectInputSkeleton />
                      ) : (
                        <MultiSearchableSelect
                          label="Departments"
                          name="departmentIds"
                          options={DEPARTMENT_OPTIONS}
                          className="bg-white"
                          labelClassName="mb-2 font-semibold text-sm"
                        />
                      )}
                      {isGettingRoles ? (
                        <SelectInputSkeleton />
                      ) : (
                        <MultiSearchableSelect
                          label="Roles"
                          name="rolesIds"
                          options={ROLES_OPTION}
                          className="bg-white"
                          labelClassName="mb-2 font-semibold text-sm"
                        />
                      )}
                      <Checkbox
                        name="employemt_type"
                        label="Employement Type"
                        options={TYPE_OPTION}
                        type="multiple"
                        orientationStyle="grid grid-cols-2 gap-2"
                        labelClassName="font-semibold"
                        optionClassName="bg-gray-100/20"
                      />
                      <RadioGroup
                        name="gender"
                        label="Gender Eligibility"
                        options={GENDER_OPTION}
                        orientation="horizontal"
                        labelClassName="font-semibold"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end border-t border-gray-200 py-5">
                    <Button
                      type="submit"
                      label="Next: Eligibility"
                      className="w-fit!"
                      rightIcon={<ArrowRight className="size-4" />}
                    />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl"></div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
