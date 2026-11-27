"use client";
import DateInput from "@/components/form/DateInput";
import Input from "@/components/form/Input";
import RadioGroup from "@/components/form/RadioGroup";
import SearchableSelect from "@/components/form/SearchableSelect";
import {
  CreateRoleStep2Skeleton,
  SelectInputSkeleton,
} from "@/components/skeletons";
import Button from "@/components/ui/CustomButton";
import { useModal } from "@/context/modal.state";
import { initialvalues } from "@/data/constants";
import {
  useEditProject,
  useGetDepartments,
  useGetProjectById,
} from "@/hooks/employer/useDepartment";
import { useGetEmployees } from "@/hooks/hr/useHr";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { FolderPen, Save } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
interface Prop {
  projectId: string;
}

const EditProject: React.FC<Prop> = ({ projectId }) => {
  const organisationId = Cookies.get("organisationId");
  const myId = Cookies.get("user_id");
  const modal = useModal();
  const { data, isLoading } = useGetDepartments({
    organisationId: organisationId,
  });
  const { data: projectResponse, isLoading: isGettingProject } =
    useGetProjectById(projectId);
  const { mutate: editProject, isPending } = useEditProject(projectId);
  const { data: employeesData, isLoading: gettingEmployess } =
    useGetEmployees();
  if (isGettingProject || !projectResponse) {
    return <CreateRoleStep2Skeleton />;
  }
  const employees =
    employeesData?.items.map((item) => ({
      label: item.employeeId,
      value: item.id,
    })) || [];

  const departments = data?.items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const projectTeam = projectResponse.team;
  const teams = projectTeam
    ? [{ label: projectTeam.name, value: projectTeam.id }]
    : [];
  const PRIORITY_LEVELS = [
    { label: "low ", value: "low" },
    { label: "medium", value: "medium" },
    { label: "high", value: "high" },
  ];
  const STATUS_OPTION = [
    { label: "Todo ", value: "todo" },
    { label: "In progress", value: "in_progress" },
    { label: "Done", value: "done" },
  ];

  const formValues: typeof initialvalues.createProjectPayload = {
    priority: projectResponse.priority || "",
    name: projectResponse.name,
    description: projectResponse.description || "",
    departmentId: projectResponse.departmentId,
    teamId: projectResponse.teamId,
    startDate: projectResponse.startDate,
    endDate: projectResponse.endDate,
    status: projectResponse.status,
    resourceManagerId: projectResponse.resourceManagerId,
  };
  const submit = (values: typeof formValues) => {
    toast.loading("Saving changes...", { id: "loading" });
    editProject(values, {
      onSuccess() {
        modal.close();
        toast.dismiss("loading");
      },
    });
  };
  return (
    <div className="min-h-[400px] sm:p-4 space-y-5">
      <div className="flex gap-2 items-center">
        <div className="size-8 flex justify-center items-center border rounded-md border-gray-400">
          <FolderPen className="size-5" />
        </div>
        <h2 className="text-2xl font-bold">Edit Project</h2>
      </div>
      <Formik initialValues={formValues} onSubmit={submit}>
        {({}) => {
          return (
            <Form className="">
              <div className="space-y-7 bg-white rounded-2xl p-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-2 ">
                  <Input
                    label="Project Name"
                    name="name"
                    LabelClassName="text-sm line-clamp-1"
                    placeholder="e.g. Customer support"
                    className="bg-gray-200"
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
                      className="bg-gray-200"
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
                    className="bg-gray-200"
                  />
                  <RadioGroup
                    label="Priority level"
                    name="priority"
                    options={PRIORITY_LEVELS}
                    orientation="horizontal"
                    optionClassName="rounded-sm! text-xs!"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-2">
                  <DateInput
                    name="startDate"
                    label="Start Date"
                    labelClassName="text-sm"
                    className="bg-gray-200"
                  />
                  <DateInput
                    name="endDate"
                    label="End Date"
                    labelClassName="text-sm"
                    className="bg-gray-200"
                  />
                </div>
                <Input
                  type="textarea"
                  name="description"
                  label="Project Description"
                  className="bg-gray-200"
                  //   rows={2}
                />
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-2">
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
                      className="bg-gray-200"
                    />
                  )}
                  <SearchableSelect
                    label="Status"
                    name="status"
                    options={STATUS_OPTION}
                    placeholder="Select status"
                    labelClassName="text-sm"
                    className="bg-gray-200"
                  />
                </div>
              </div>
              <div className="pt-20 flex justify-end gap-4">
                <Button
                  onClick={modal.close}
                  label="Cancel"
                  className="bg-transparent! text-primary! text-sm w-fit! px-4"
                />
                <Button
                  label="Save Changes"
                  type="submit"
                  isLoading={isPending}
                  disabled={isPending}
                  rightIcon={<Save size={18} />}
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

export default EditProject;
