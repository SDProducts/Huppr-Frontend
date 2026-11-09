"use client";
import { CreateLeavePolicyStep } from "@/app/dashboard/departments/_components/Steps&Progress";
import ApprovalChainField from "@/app/dashboard/leave/_components/ApprovalChainField";
import SwitchField from "@/components/form/SwitchField";
// import BlackoutPeriodsField from "@/components/form/BlackOutPeriod";
// import Input from "@/components/form/Input";
// import SwitchField from "@/components/form/SwitchField";
import Button from "@/components/ui/CustomButton";
import {
  useGetSingleLeavePolicy,
  usePatchLeavePolicy,
} from "@/hooks/employer/useLeave";
import { cn } from "@/lib/utils";
import { Form, Formik } from "formik";
import {
  ArrowRight,
  Bookmark,
  //   CalendarClock,
  Layers,
  Scale,
  Settings,
  SlidersHorizontal,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ApprovalConfiguration() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const policyId = searchParams.get("policyId");
  const { data: policy, isLoading: isGetttingPolicy } = useGetSingleLeavePolicy(
    policyId || ""
  );
  const { mutate: patchPolicy, isPending } = usePatchLeavePolicy(
    policyId || ""
  );

  const initialValues = {
    approvalWorkflow: "default",
    approvalChain: policy?.approvalChain || [],
    autoDeductPayroll: policy?.autoDeductPayroll || true,
    allowNegativeBalance: policy?.allowNegativeBalance || false,
  };
  const WORKFLOW_OPTIONS = [
    {
      icon: Layers,
      value: "default",
      label: "Default Company Flow",
      description:
        "Uses standard organization hierarchy (Direct Manager -> HR).",
    },
    {
      icon: SlidersHorizontal,
      value: "custom",
      label: "Custom Policy Flow",
      description: "Build a specific approval chain for this policy type.",
    },
  ];
  function saveDraft(params: typeof initialValues) {
    patchPolicy(params, {
      onSuccess(data) {
        router.replace(
          `/dashboard/leave/create-leave-policy?step=preview_leave_policy&policyId=${data.id}`
        );
      },
    });
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
                  <CreateLeavePolicyStep currentStep={5} />
                  <div className="space-y-8">
                    <div className="flex justify-between gap-4 items-start">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold">
                          Approval Configuration
                        </h2>
                        <p>
                          Define how leave requests under this policy are
                          reviewed and approved.{" "}
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-5">
                      <div className="bg-white p-6 rounded-xl space-y-8">
                        <div className="flex items-center gap-2">
                          <div className="size-10 bg-primary/5 flex rounded-md justify-center items-center">
                            <Settings
                              className="size-6 text-primary"
                              strokeWidth={2.5}
                            />
                          </div>
                          <div className="text-2xl font-bold">
                            Approval Workflow
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-4">
                          {WORKFLOW_OPTIONS.map((item) => (
                            <div
                              onClick={() =>
                                setFieldValue("approvalWorkflow", item.value)
                              }
                              className={cn(
                                "cursor-pointer px-6 py-10 space-y-2 rounded-md border-2",
                                values.approvalWorkflow === item.value
                                  ? "border-primary bg-primary/5"
                                  : "border-gray-100"
                              )}
                              key={item.value}
                            >
                              <div className="flex items-center gap-2">
                                <item.icon />
                                <div className="font-semibold">
                                  {item.label}
                                </div>
                              </div>
                              <p className="text-sm">{item.description}</p>
                            </div>
                          ))}
                        </div>
                        {values.approvalWorkflow === "custom" && (
                          <ApprovalChainField name="approvalChain" />
                        )}
                      </div>

                      <div className="bg-white p-6 rounded-xl space-y-8">
                        <div className="flex items-center gap-2">
                          <div className="size-10 bg-primary/5 flex rounded-md justify-center items-center">
                            <Scale
                              className="size-6 text-primary"
                              strokeWidth={2.5}
                            />
                          </div>
                          <div className="text-2xl font-bold">
                            Balance Behavior{" "}
                          </div>
                        </div>
                        <div className="grid">
                          <SwitchField
                            name="allowNegativeBalance"
                            singleLabelDescription={
                              <div className="space-y-1">
                                <div className="font-semibold">
                                  Allow Negative Balance{" "}
                                </div>
                                <p className="text-xs">
                                  Employees can request leave even if they have
                                  zero balance.{" "}
                                </p>
                              </div>
                            }
                          />
                          <SwitchField
                            name="autoDeductPayroll"
                            singleLabelDescription={
                              <div className="space-y-1">
                                <div className="font-semibold">
                                  Auto-deduct from payroll{" "}
                                </div>
                                <p className="text-xs">
                                  Unpaid leaves will automatically sync with the
                                  next payroll run.{" "}
                                </p>
                              </div>
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end border-t border-gray-200 py-5">
                    <Button
                      type="submit"
                      label="Next: Preview Policy"
                      className="w-fit!"
                      isLoading={isPending}
                      disabled={isPending || isGetttingPolicy}
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
