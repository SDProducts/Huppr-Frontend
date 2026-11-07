"use client";
import DateInput from "@/components/form/DateInput";
import Input from "@/components/form/Input";
import SearchableSelect from "@/components/form/SearchableSelect";
import {
  CreateRoleStep2Skeleton,
  SelectInputSkeleton,
} from "@/components/skeletons";
import Button from "@/components/ui/CustomButton";
import { useModal } from "@/context/modal.state";
import { initialvalues } from "@/data/constants";
import { useEditTask, useGetTaskById } from "@/hooks/employer/useDepartment";
import { useGetEmployees } from "@/hooks/hr/useHr";
import { cn } from "@/lib/utils";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { ArrowRight, FolderOpen } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

const EditTask: React.FC = () => {
  const myId = Cookies.get("user_id");
  const modal = useModal();
  const { taskId } = useParams();
  const { mutate: editTask, isPending } = useEditTask(String(taskId));
  const { data: taskResponse, isLoading: isGettingTask } = useGetTaskById(
    String(taskId)
  );
  const { data: employeesData, isLoading: gettingEmployess } =
    useGetEmployees();
  if (isGettingTask || !taskResponse) {
    return <CreateRoleStep2Skeleton />;
  }
  const employees =
    employeesData?.items.map((item) => ({
      label: item.employeeId,
      value: item.id,
    })) || [];

  const PRIORITY_LEVELS = [
    { label: "low ", value: "low" },
    { label: "normal", value: "normal" },
    { label: "high", value: "high" },
    { label: "urgent", value: "urgent" },
  ];
  const STATUS_OPTION = [
    { label: "Todo ", value: "todo" },
    { label: "In progress", value: "in_progress" },
    { label: "Done", value: "done" },
    { label: "On hold", value: "on_hold" },
    { label: "Cancelled", value: "cancelled" },
  ];
  const formValues: typeof initialvalues.createTask = {
    name: taskResponse.name,
    description: taskResponse.description,
    priority: taskResponse.priority,
    assignee: taskResponse.assignee?.id,
    startDate: taskResponse.startDate,
    dueDate: taskResponse.dueDate,
    status: taskResponse.status,
  };
  const submit = (values: typeof formValues) => {
    editTask(values, {
      onSuccess() {
        modal.close();
      },
    });
  };
  return (
    <div className="min-h-[400px] sm:px-4">
      <div className="pb-4">
        <h2 className="text-2xl font-bold">Edit Task</h2>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <FolderOpen size={15} />
            <div className="">Project:</div>
          </div>
          <span className="font-semibold">{taskResponse.project.name}</span>
        </div>
      </div>
      <Formik initialValues={formValues} onSubmit={submit}>
        {({ values, setFieldValue }) => {
          return (
            <Form className="pt-10">
              <div className="space-y-7 bg-white rounded-lg">
                <Input
                  label="Task Name"
                  name="name"
                  LabelClassName="text-sm line-clamp-1"
                  placeholder="e.g. Customer support"
                />
                <Input
                  label="Description"
                  name="description"
                  type="textarea"
                  //   rows={3}
                  LabelClassName="text-sm line-clamp-1"
                  placeholder="e.g. Customer support"
                />
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-2">
                  {gettingEmployess ? (
                    <SelectInputSkeleton />
                  ) : (
                    <SearchableSelect
                      label="Assignee"
                      name="assignee"
                      options={[
                        ...employees,
                        { label: "Assign to myself", value: myId || "" },
                      ]}
                      placeholder="Select Employee"
                      labelClassName="text-sm"
                    />
                  )}
                  <div className="space-y-0.5">
                    <div className="text-sm">Priority level</div>
                    <div className="grid grid-cols-4 p-1 bg-gray-100 rounded-md">
                      {PRIORITY_LEVELS.map((item) => (
                        <div
                          onClick={() => setFieldValue("priority", item.value)}
                          className={cn(
                            "p-2.5 cursor-pointer rounded-sm flex items-center justify-center text-sm capitalize",
                            values.priority === item.value
                              ? "bg-white shadow"
                              : ""
                          )}
                          key={item.value}
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 sm:gap-2">
                  <DateInput
                    name="startDate"
                    label="Start Date"
                    labelClassName="text-sm"
                  />
                  <DateInput
                    name="dueDate"
                    label="Due Date"
                    labelClassName="text-sm"
                  />
                  <SearchableSelect
                    label="Status"
                    name="status"
                    options={STATUS_OPTION}
                    placeholder="Select status"
                    labelClassName="text-sm"
                  />
                </div>
              </div>
              <div className="pt-10 flex justify-end gap-4">
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

export default EditTask;
