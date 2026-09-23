import CreateRoleStep4 from "@/app/dashboard/departments/_components/CreateRoleStep4";
import Stepper from "@/app/dashboard/departments/_components/Steps&Progress";
import Checkbox from "@/components/form/Checkbox";
import SearchableSelect from "@/components/form/SearchableSelect";
import Button from "@/components/ui/CustomButton";
import { useModal } from "@/context/modal.state";
import {
  useGetRolesById,
  usePatchNewRole,
} from "@/hooks/employer/useDepartment";
import { cn } from "@/lib/utils";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  ClipboardList,
  Users,
} from "lucide-react";
import React from "react";
interface Prop {
  roleId: string;
}
const CreateRoleStep3: React.FC<Prop> = ({ roleId }) => {
  const myId = Cookies.get("user_id");
  const modal = useModal();
  const { data: roleData } = useGetRolesById(roleId);

  const { mutate: patchRole, isPending } = usePatchNewRole(roleId);
  const initialValues: CreateRolePayload = {
    reportsToUserId: roleData?.reportsToUserId,
    permissionIds: [],
  };
  const RESPONSIBILITIES: Option[] = [
    {
      label: "Approve Leave",
      value: "leave",
      description: "Review and approve PTO and sick leave requests.",
    },
    {
      label: "Approve Attendance",
      value: "Attendance",
      description: "Validate timesheets and attendance records.",
    },
    {
      label: "Performance Reviews",
      value: "Reviews",
      description: "Final sign-off on direct reports' evaluations.",
    },
    {
      label: "Expense Claims",
      value: "Claims",
      description: "Approve team reimbursements up to tier limits.",
    },
  ];
  const PERMISSIONS = [
    {
      name: "Team Management",
      icon: Users,
      id: "team",
      actions: ["view", "manage"],
    },
    {
      name: "Employee Records",
      icon: ClipboardList,
      id: "employee",
      actions: ["view", "manage"],
    },
    {
      name: "Recruitment",
      icon: BriefcaseBusiness,
      id: "job",
      actions: ["view", "manage"],
    },
  ];
  const submit = (values: typeof initialValues) => {
    patchRole(values, {
      onSuccess(data) {
        modal.open({
          content: <CreateRoleStep4 roleId={data.id} />,
          size: "sm:w-3xl",
          bgColor: "bg-gray-100",
          goBack() {
            modal.open({
              content: <CreateRoleStep3 roleId={data.id} />,
              size: "sm:w-2xl",
              bgColor: "bg-gray-100",
            });
          },
        });
      },
    });
  };
  // helper — the shape your backend wants
  const permissionKey = (permId: string, action: string) =>
    `${permId}.${action}`;

  const togglePermission = (
    current: string[],
    key: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFieldValue: (field: string, value: any) => void
  ) => {
    const next = current.includes(key)
      ? current.filter((p) => p !== key)
      : [...current, key];
    setFieldValue("permissionIds", next);
  };

  return (
    <div className="px-4 space-y-10">
      <div className="">
        <h2 className="text-2xl font-bold">Organization & Access</h2>
        <p className="text-sm">
          Define reporting lines and system permissions for this role.{" "}
        </p>
      </div>
      <Stepper currentStep={3} />
      <Formik initialValues={initialValues} onSubmit={submit}>
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <div className="space-y-4">
                <div className="p-4 rounded-md bg-white space-y-1">
                  <div className="text-xl font-bold">Hierarchy</div>
                  <SearchableSelect
                    label="Reports to"
                    name="reportsToUserId"
                    options={[{ label: "Report to me", value: myId || "" }]}
                    labelClassName="text-sm"
                  />
                  <div className="text-xs">
                    This determines where the role sits in the organizational
                    chart.
                  </div>
                </div>
                <div className="p-4 rounded-md bg-white">
                  <div className="font-bold text-xl -mb-5">
                    Approval Responsibilities
                  </div>
                  <Checkbox
                    name="responsibilities"
                    type="multiple"
                    options={RESPONSIBILITIES}
                    label="Select the workflows this role has authority to approve."
                    orientationStyle="grid grid-cols-2 gap-1"
                    optionClassName=""
                  />
                </div>
                <div className="p-4 rounded-md bg-white space-y-4">
                  <div className="">
                    <div className="text-xl font-bold">System Permissions</div>
                    <div className="text-xs">
                      Granular platform access control.
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {PERMISSIONS.map((perm, i) => (
                      <div className="py-4 space-y-2" key={i}>
                        <div className="flex items-center gap-2 text-primary">
                          <perm.icon size={15} />
                          <div className="">{perm.name}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {perm.actions.map((action) => {
                            const key = permissionKey(perm.id, action);
                            const active = values.permissionIds?.includes(key);

                            return (
                              <button
                                type="button"
                                key={action}
                                onClick={() =>
                                  togglePermission(
                                    values.permissionIds || [],
                                    key,
                                    setFieldValue
                                  )
                                }
                                className={cn(
                                  "cursor-pointer rounded-full px-4 py-1 text-sm transition",
                                  active
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                                )}
                              >
                                {action} {perm.id}s
                              </button>
                            );
                          })}
                        </div>

                        {/* <div className="flex items-center gap-2">
                          {perm.actions.map((action, i) => (
                            <div
                              onClick={() =>
                                setFieldValue("permissionIds", [
                                  ...values.permissionIds,
                                  `${action}.${perm.id}`,
                                ])
                              }
                              className={cn(
                                "px-4 py-1 text-sm bg-gray-200 rounded-full cursor-pointer"
                              )}
                              key={i}
                            >
                              {action} {perm.id}s
                            </div>
                          ))}
                        </div> */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-20 pb-5 flex items-center justify-between">
                <div className="">
                  <Button
                    label="Back"
                    onClick={modal.goBack}
                    icon={<ArrowLeft />}
                    className="w-fit! bg-transparent text-gray-500!"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    label="Save as draft"
                    isLoading={isPending}
                    disabled={isPending}
                    className="bg-transparent! text-primary! border"
                  />
                  <Button
                    label="Continue"
                    type="submit"
                    isLoading={isPending}
                    disabled={isPending}
                    rightIcon={<ArrowRight />}
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

export default CreateRoleStep3;
