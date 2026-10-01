"use client";
import DateInput from "@/components/form/DateInput";
import Input from "@/components/form/Input";
import RadioGroup from "@/components/form/RadioGroup";
import SearchableSelect from "@/components/form/SearchableSelect";
import { SelectInputSkeleton } from "@/components/skeletons";
import Button from "@/components/ui/CustomButton";
import { useModal } from "@/context/modal.state";
import { initialvalues } from "@/data/constants";
import {
  useCreateProject,
  useGetDepartments,
} from "@/hooks/employer/useDepartment";
import { useGetEmployees } from "@/hooks/hr/useHr";
import { EntityReference } from "@/types/subteam_by_id";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { ArrowRight, FolderPlus } from "lucide-react";
import React from "react";
interface Prop {
  departmentId?: string;
  team?: EntityReference;
}

const CreateProject: React.FC<Prop> = ({ departmentId, team }) => {
  const organisationId = Cookies.get("organisationId");
  const myId = Cookies.get("user_id");
  const modal = useModal();
  const { data, isLoading } = useGetDepartments({
    organisationId: organisationId,
  });
  const { mutate: createProject, isPending } = useCreateProject();
  const { data: employeesData, isLoading: gettingEmployess } =
    useGetEmployees();

  const employees =
    employeesData?.items.map((item) => ({
      label: item.employeeId,
      value: item.id,
    })) || [];

  const departments = data?.items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const teams = team ? [{ label: team.name, value: team.id }] : [];
  const PRIORITY_LEVELS = [
    { label: "low ", value: "low" },
    { label: "medium", value: "medium" },
    { label: "high", value: "high" },
  ];
  const {
    departmentId: departmentValue,
    teamId,
    ...rest
  } = initialvalues.createProjectPayload;
  const formValues = {
    ...rest,
    departmentId: departmentId || departmentValue,
    teamId: team?.id || teamId,
  };
  const submit = (values: typeof formValues) => {
    createProject(values, {
      onSuccess() {
        modal.close();
      },
    });
  };
  return (
    <div className="min-h-[400px] sm:px-4 divide-y divide-gray-200">
      <div className="pb-4 flex items-center gap-1.5">
        <FolderPlus strokeWidth={2.5} className="size-8" />
        <h2 className="text-2xl font-bold">Create New Project</h2>
      </div>
      <Formik initialValues={formValues} onSubmit={submit}>
        {({}) => {
          return (
            <Form className="pt-10">
              <div className="space-y-7">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-2 ">
                  <Input
                    label="Project Name"
                    name="name"
                    LabelClassName="text-sm line-clamp-1"
                    placeholder="e.g. Customer support training"
                  />

                  {isLoading || !departments ? (
                    <SelectInputSkeleton />
                  ) : (
                    <SearchableSelect
                      label="Department"
                      name="departmentId"
                      options={departments!}
                      placeholder="Select industry"
                      labelClassName="text-sm"
                      disabled={!!departmentId}
                    />
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-2">
                  <SearchableSelect
                    label="Team"
                    name="teamId"
                    options={teams}
                    placeholder="Select Team"
                    labelClassName="text-sm"
                  />
                  <RadioGroup
                    label="Priority level"
                    name="priority"
                    options={PRIORITY_LEVELS}
                    orientation="horizontal"
                    optionClassName="rounded-full! text-xs!"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-2">
                  <DateInput
                    name="startDate"
                    label="Start Date"
                    labelClassName="text-sm"
                  />
                  <DateInput
                    name="endDate"
                    label="End Date"
                    labelClassName="text-sm"
                  />
                </div>
                <Input
                  type="textarea"
                  name="description"
                  label="Project Description"
                  // rows={2}
                />
                {gettingEmployess ? (
                  <SelectInputSkeleton />
                ) : (
                  <SearchableSelect
                    label="Assign Resource Manager"
                    name="resourceManagerId"
                    options={[
                      ...employees,
                      { label: "Assign to myself", value: myId || "" },
                    ]}
                    placeholder="Select manager"
                    labelClassName="text-sm"
                  />
                )}
              </div>
              <div className="pt-20 flex justify-end gap-4">
                <Button
                  onClick={modal.close}
                  label="Cancel"
                  className="bg-transparent! text-primary! text-sm w-fit! px-4"
                />
                <Button
                  label="Create Project"
                  type="submit"
                  isLoading={isPending}
                  disabled={isPending}
                  rightIcon={<ArrowRight />}
                  loadingLabel="Saving..."
                  className="w-fit! px-4 text-sm"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateProject;
