"use client";
import { EmployeeMultiSelect } from "@/app/dashboard/departments/_components/EmployeeMultiSelect";
import Input from "@/components/form/Input";
import Button from "@/components/ui/CustomButton";
import { useModal } from "@/context/modal.state";
import {
  useCreateSubteam,
  useGetDepartmentByID,
} from "@/hooks/employer/useDepartment";
import { useGetEmployees } from "@/hooks/hr/useHr";
import { createSubTeamSchema } from "@/lib/validation/validations";
import { Form, Formik } from "formik";
import { LockKeyhole, UserPlus2 } from "lucide-react";
import { useParams } from "next/navigation";

const CreateSubTeam = () => {
  const { department } = useParams();
  const modal = useModal();
  const { data, isLoading } = useGetDepartmentByID(String(department));
  const { mutate: createSubteam, isPending } = useCreateSubteam();
  const { data: employeesData, isLoading: isGettingEmployees } =
    useGetEmployees();
  const id = department?.toString();
  const employees = employeesData?.items || [];
  const initialValues = {
    expectedRevision: 0,
    departmentId: id || "",
    name: "",
    description: "",
    memberIds: [],
  };
  const submit = (values: typeof initialValues) => {
    createSubteam(values, {
      onSuccess() {
        modal.close();
      },
    });
  };
  return (
    <div className="px-4 space-y-8">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold">Create New Sub-team</h2>
        <p className="text-sm">Add a specialized unit within Engineering.</p>
      </div>
      <Formik
        initialValues={initialValues}
        validateOnMount
        validationSchema={createSubTeamSchema}
        onSubmit={submit}
      >
        {({ isValid }) => {
          return (
            <Form className="space-y-4">
              <Input
                label="Sub-team Name"
                name="name"
                placeholder="e.g. Cloud Engineer"
              />
              <Input
                type="textarea"
                label="Description (Optional)"
                name="description"
                placeholder="Brief summary of the sub-team's focus..."
                rows={2}
              />
              <div className="">
                <div className="">Department</div>
                <div className="bg-primary-100 p-3 rounded-md flex items-center justify-between cursor-not-allowed">
                  <div className="flex-1">
                    {isLoading || !data ? "Loading..." : `${data?.name}`}
                  </div>
                  <LockKeyhole className="size-5" />
                </div>
              </div>
              <EmployeeMultiSelect
                label="Add Initial Members"
                employees={employees}
                name="memberIds"
              />
              <div className="flex justify-end items-center gap-4 mt-10 py-5">
                <Button
                  label="cancel"
                  className="w-fit! px-4 bg-white! text-primary!"
                />
                <Button
                  type="submit"
                  label="Create Sub-team"
                  icon={<UserPlus2 size={16} />}
                  className="w-fit! px-4"
                  disabled={!isValid || isPending}
                  isLoading={isPending}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateSubTeam;
