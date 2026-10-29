"use client";
import { CreateLeavePolicyStep } from "@/app/dashboard/departments/_components/Steps&Progress";
import Input from "@/components/form/Input";
import SearchableSelect from "@/components/form/SearchableSelect";
import SwitchField from "@/components/form/SwitchField";
import TabsSelectField from "@/components/form/TabSelectInput";
import Button from "@/components/ui/CustomButton";
import { Form, Formik } from "formik";
import {
  ArrowRight,
  Bookmark,
  SlidersHorizontal,
  TimerReset,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function EntitlementForm() {
  const router = useRouter();

  const initialValues = {
    allowance_type: "fixed_days",
    accrual_method: "scheduled",
    frequency: "monthly",
    expiry: "mar",
    pro_rating: true,
  };
  const ALLOWANCE_TYPES = [
    { label: "Fixed Days", value: "fixed_days" },
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
    router.replace(`/dashboard/leave/create-leave-policy?step=request_rules`);
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
                            name="allowance_type"
                            label="Allowance Type"
                            options={ALLOWANCE_TYPES}
                          />
                          <Input
                            label="Days per year"
                            name="days_per_year"
                            rightIcon={<div>days</div>}
                            LabelClassName="text-sm mb-1"
                            className="h-11 bg-gray-200"
                          />
                          <SwitchField
                            name="pro_rating"
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
                            name="accrual_method"
                            label="Accrual Method"
                            options={ACCRUAL_METHODS}
                          />
                          <Input
                            label="Max Carryover to Next Year"
                            name="days_per_year"
                            rightIcon={<div>days</div>}
                            LabelClassName="text-sm mb-1"
                            className="h-11 bg-gray-200"
                          />
                          <SearchableSelect
                            name="frequency"
                            label="Accrual Frequency"
                            options={FREQUENCY_OPTION}
                            labelClassName="text-sm"
                          />
                          <SearchableSelect
                            name="expiry"
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
