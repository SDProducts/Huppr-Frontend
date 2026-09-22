import CreateRoleStep4 from "@/app/dashboard/departments/_components/CreateRoleStep4";
import Stepper from "@/app/dashboard/departments/_components/Steps&Progress";
import Checkbox from "@/components/form/Checkbox";
import SearchableSelect from "@/components/form/SearchableSelect";
import Button from "@/components/ui/CustomButton";
import { useModal } from "@/context/modal.state";
import { cn } from "@/lib/utils";
import { Form, Formik } from "formik";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  ClipboardList,
  Users,
} from "lucide-react";

const CreateRoleStep3 = () => {
  const modal = useModal();
  const initialValues = {
    responsibilities: [""],
    permissions: [],
    report_to: "",
    maxXP: "",
    language: "",
    certification: "",
    skils: [],
    degree: "",
    field: "",
    other: "",
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
  const submit = () => {
    modal.open({
      content: <CreateRoleStep4 />,
      size: "sm:w-3xl",
      bgColor: "bg-gray-100",
    });
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
                    name="report_to"
                    options={[]}
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
                          {perm.actions.map((action, i) => (
                            <div
                              onClick={() =>
                                setFieldValue("permissions", [
                                  ...values.permissions,
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
                        </div>
                      </div>
                    ))}
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
                    label="Save as draft"
                    className="bg-transparent! text-primary! border"
                  />
                  <Button
                    label="Continue"
                    type="submit"
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
