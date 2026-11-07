"use client";
import { CreateLeavePolicyStep } from "@/app/dashboard/departments/_components/Steps&Progress";
import Input from "@/components/form/Input";
import SearchableSelect from "@/components/form/SearchableSelect";
import SwitchField from "@/components/form/SwitchField";
import TabsSelectField from "@/components/form/TabSelectInput";
import Button from "@/components/ui/CustomButton";
import {
  useGetSingleLeavePolicy,
  usePatchLeavePolicy,
} from "@/hooks/employer/useLeave";
import { Form, Formik } from "formik";
import {
  ArrowRight,
  Bookmark,
  SlidersHorizontal,
  TimerReset,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EntitlementForm() {
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
    allowanceType: policy?.allowanceType || "fixed",
    accrualMethod: policy?.accrualMethod || "scheduled",
    daysPerYear: policy?.daysPerYear || 30,
    maxCarryover: policy?.maxCarryover || 20,
    accrualFrequency: policy?.accrualFrequency || "monthly",
    carryoverExpiry: policy?.carryoverExpiry || "mar",
    proRateNewHires: policy?.proRateNewHires || true,
  };
  const ALLOWANCE_TYPES = [
    { label: "Fixed Days", value: "fixed" },
    { label: "Unlimited", value: "unlimited" },
  ];
  const ACCRUAL_METHODS = [
    { label: "Upfront", value: "upfront" },
    { label: "Scheduled", value: "scheduled" },
  ];
  const FREQUENCY_OPTION = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "tearly" },
  ];
  const EXPIRY_OPTION = [
    { label: "March (Q1 End)", value: "mar" },
    { label: "August (Q2 End)", value: "aug" },
    { label: "December (Q4 End)", value: "dec" },
  ];
  function saveDraft(params: typeof initialValues) {
    const { maxCarryover, daysPerYear, ...rest } = params;
    const payload: AddNewLeavePolicyPayload = {
      maxCarryover: Number(maxCarryover),
      daysPerYear: Number(daysPerYear),
      ...rest,
    };
    patchPolicy(payload, {
      onSuccess(data) {
        router.replace(
          `/dashboard/leave/create-leave-policy?step=request_rules&policyId=${data.id}`
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
                  <CreateLeavePolicyStep currentStep={3} />
                  <div className="space-y-8">
                    <div className="flex justify-between gap-4 items-start">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold">
                          Entitlement & Accrual Rules
                        </h2>
                        <p>
                          Define how time off is earned and managed for this
                          policy.{" "}
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-5">
                      <div className="bg-white p-6 rounded-xl space-y-8">
                        <div className="flex items-center gap-2">
                          <SlidersHorizontal
                            className="size-7 text-primary"
                            strokeWidth={3}
                          />
                          <div className="text-2xl font-bold">
                            Base Entitlement
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-4">
                          <TabsSelectField
                            name="allowanceType"
                            label="Allowance Type"
                            options={ALLOWANCE_TYPES}
                          />
                          <Input
                            label="Days per year"
                            name="daysPerYear"
                            rightIcon={<div>days</div>}
                            LabelClassName="text-sm mb-1"
                            className="h-11 bg-gray-200"
                          />
                          <SwitchField
                            name="proRateNewHires"
                            singleLabelDescription="Enable automatic pro- rating based on join date"
                            label="Pro-rating for New Hires"
                          />
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-xl space-y-8">
                        <div className="flex items-center gap-2">
                          <TimerReset
                            className="size-7 text-primary"
                            strokeWidth={3}
                          />
                          <div className="text-2xl font-bold">
                            Accrual & Carryover{" "}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-4">
                          <TabsSelectField
                            name="accrualMethod"
                            label="Accrual Method"
                            options={ACCRUAL_METHODS}
                          />
                          <Input
                            label="Max Carryover to Next Year"
                            name="maxCarryover"
                            rightIcon={<div>days</div>}
                            LabelClassName="text-sm mb-1"
                            className="h-11 bg-gray-200"
                          />
                          <SearchableSelect
                            name="accrualFrequency"
                            label="Accrual Frequency"
                            options={FREQUENCY_OPTION}
                            labelClassName="text-sm"
                          />
                          <SearchableSelect
                            name="carryoverExpiry"
                            label="Carryover Expiry"
                            options={EXPIRY_OPTION}
                            labelClassName="text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end border-t border-gray-200 py-5">
                    <Button
                      type="submit"
                      label="Next: Request Rules"
                      className="w-fit!"
                      disabled={isPending}
                      isLoading={isPending}
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
