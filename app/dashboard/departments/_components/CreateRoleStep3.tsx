"use client";
import CreateRoleStep4 from "@/app/dashboard/departments/_components/CreateRoleStep4";
import Stepper from "@/app/dashboard/departments/_components/Steps&Progress";
import Checkbox from "@/components/form/Checkbox";
import SearchableSelect from "@/components/form/SearchableSelect";
import {
  CreateRoleStep2Skeleton,
  SelectInputSkeleton,
} from "@/components/skeletons";
import Button from "@/components/ui/CustomButton";
import { useModal } from "@/context/modal.state";
import {
  useGetRolesById,
  useInvalidateQueries,
  usePatchNewRole,
} from "@/hooks/employer/useDepartment";
import { useGetEmployees } from "@/hooks/hr/useHr";
import { useGetPermissions } from "@/hooks/references/useReferences";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
interface Prop {
  roleId: string;
}
const CreateRoleStep3: React.FC<Prop> = ({ roleId }) => {
  const myId = Cookies.get("user_id");
  const modal = useModal();
  const clearQuery = useInvalidateQueries();
  const { data: roleData, isLoading } = useGetRolesById(roleId);
  const { data: employeesData, isLoading: gettingEmployess } =
    useGetEmployees();
  const { data: permissionsResponse, isLoading: isGettingPermissions } =
    useGetPermissions();
  const employees =
    employeesData?.items.map((item) => ({
      label: item.employeeId,
      value: item.id,
    })) || [];
  const { mutate: patchRole, isPending } = usePatchNewRole(roleId);
  const rawPermissions = permissionsResponse?.items || [];
  const groupedPermissions = rawPermissions.reduce<
    Record<string, Permissions[]>
  >((accumulator, permission) => {
    const group = permission.group;

    // If the category doesn't exist yet, initialize it as an empty array
    if (!accumulator[group]) {
      accumulator[group] = [];
    }

    // Push the product into the appropriate category array
    accumulator[group].push(permission);

    return accumulator;
  }, {}); // {} initializes the accumulator as an empty object

  console.log(groupedPermissions);
  const groupedPermissionsArray = Object.entries(groupedPermissions).map(
    ([group, permissions]) => ({
      group: group,
      options: permissions.map((permission) => ({
        label: permission.name,
        description: permission.description,
        value: permission.id,
      })),
    })
  );
  if (
    isLoading ||
    isGettingPermissions ||
    !permissionsResponse ||
    (!roleData && roleId)
  ) {
    return <CreateRoleStep2Skeleton />;
  }

  const initialValues: CreateRolePayload = {
    reportsToUserId: roleData?.reportsToUserId,
    permissionIds: roleData?.permissionIds,
  };
  // const PERMISSIONS = [
  //   {
  //     name: "Team Management",
  //     icon: Users,
  //     id: "team",
  //     actions: ["view", "manage"],
  //   },
  //   {
  //     name: "Employee Records",
  //     icon: ClipboardList,
  //     id: "employee",
  //     actions: ["view", "manage"],
  //   },
  //   {
  //     name: "Recruitment",
  //     icon: BriefcaseBusiness,
  //     id: "job",
  //     actions: ["view", "manage"],
  //   },
  // ];
  const submit = (values: typeof initialValues) => {
    patchRole(values, {
      onSuccess(data) {
        modal.open({
          content: <CreateRoleStep4 roleId={data.id} />,
          size: "sm:w-3xl",
          bgColor: "bg-gray-100",
          goBack() {
            clearQuery(["roles"]);
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
  // const permissionKey = (permId: string, action: string) =>
  //   `${permId}s.${action}`;

  // const togglePermission = (
  //   current: string[],
  //   key: string,
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   setFieldValue: (field: string, value: any) => void
  // ) => {
  //   const next = current.includes(key)
  //     ? current.filter((p) => p !== key)
  //     : [...current, key];
  //   setFieldValue("permissionIds", next);
  // };

  return (
    <div className="sm:px-4 space-y-10">
      <div className="">
        <h2 className="text-2xl font-bold">Organization & Access</h2>
        <p className="text-sm">
          Define reporting lines and system permissions for this role.{" "}
        </p>
      </div>
      <Stepper currentStep={3} />
      <Formik initialValues={initialValues} onSubmit={submit}>
        {({ values }) => {
          return (
            <Form>
              <div className="space-y-4">
                <div className="p-2 sm:p-4 rounded-md bg-white space-y-1">
                  <div className="text-xl font-bold">Hierarchy</div>
                  {gettingEmployess ? (
                    <SelectInputSkeleton />
                  ) : (
                    <SearchableSelect
                      label="Reports to"
                      name="reportsToUserId"
                      options={[
                        ...employees,
                        { label: "Report to me", value: myId || "" },
                      ]}
                      labelClassName="text-sm"
                    />
                  )}
                  <div className="text-xs">
                    This determines where the role sits in the organizational
                    chart.
                  </div>
                </div>
                <div className="p-2 sm:p-4 space-y-4 rounded-md bg-white">
                  <div className="">
                    <div className="text-xl font-bold">System Permissions</div>
                    <div className="text-xs">
                      Granular platform access control.
                    </div>
                  </div>
                  <div className="space-y-4">
                    {groupedPermissionsArray.map((item, i) => (
                      <Checkbox
                        key={i}
                        name="permissionIds"
                        type="multiple"
                        options={item.options}
                        label={`${item.group} Permissions`}
                        orientationStyle="grid sm:grid-cols-2 gap-1"
                        labelClassName="font-bold text-primary! underline underline-offset-6"
                      />
                    ))}
                  </div>
                </div>
                {/* <div className="p-2 sm:p-4 rounded-md bg-white space-y-4">
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
                        <div className="flex flex-wrap items-center gap-2">
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
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>
              <div className="pt-20 pb-5 flex items-end sm:items-center justify-between">
                <div className="">
                  <Button
                    label="Back"
                    onClick={modal.goBack}
                    icon={<ArrowLeft />}
                    className="w-fit! bg-transparent text-gray-500!"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <Button
                    label="Save as draft"
                    onClick={() => patchRole(values)}
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
