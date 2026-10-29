"use client";
import { CreateLeavePolicyStep } from "@/app/dashboard/departments/_components/Steps&Progress";
import BlackoutPeriodsField from "@/components/form/BlackOutPeriod";
import Input from "@/components/form/Input";
import SearchableSelect from "@/components/form/SearchableSelect";
import SwitchField from "@/components/form/SwitchField";
import Button from "@/components/ui/CustomButton";
import { Form, Formik } from "formik";
import {
  ArrowRight,
  Bookmark,
  CalendarClock,
  SlidersHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function RequestRulesForm() {
  const router = useRouter();

  const initialValues = {
    maxConsecutiveDays: 14,
    accrual_method: "scheduled",
    minDuration: "monthly",
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
                  <CreateLeavePolicyStep currentStep={4} />
                  <div className="space-y-8">
                    <div className="flex justify-between gap-4 items-start">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold">Request Rules </h2>
                        <p>
                          Define how and when employees can request this leave.{" "}
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-5">
                      <div className="bg-white p-6 rounded-xl space-y-8">
                        <div className="flex items-center gap-2">
                          <div className="size-10 bg-primary/5 flex rounded-md justify-center items-center">
                            <SlidersHorizontal
                              className="size-6 text-primary"
                              strokeWidth={2.5}
                            />
                          </div>
                          <div className="text-2xl font-bold">
                            Request Limits
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-4">
                          <SearchableSelect
                            name="minDuration"
                            label="Minimum Duration"
                            options={FREQUENCY_OPTION}
                            labelClassName="text-sm mb-1"
                            className="bg-gray-200"
                          />
                          <Input
                            label="Maximum Consecutive Days"
                            name="maxConsecutiveDays"
                            type="number"
                            rightIcon={<div>days</div>}
                            LabelClassName="text-sm mb-1"
                            className="bg-gray-200 h-12"
                          />
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-xl space-y-8">
                        <div className="flex items-center gap-2">
                          <div className="size-10 bg-primary/5 flex rounded-md justify-center items-center">
                            <CalendarClock
                              className="size-6 text-primary"
                              strokeWidth={2.5}
                            />
                          </div>
                          <div className="text-2xl font-bold">
                            Notice & Documentation{" "}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-4">
                          <Input
                            label="Advance Notice Required (Days)"
                            name="days_per_year"
                            rightIcon={<div>days</div>}
                            LabelClassName="text-sm mb-1"
                            className="h-11 bg-gray-200"
                          />
                          <Input
                            label="Threshold (Days)"
                            name="days_per_year"
                            rightIcon={<div>days</div>}
                            LabelClassName="text-sm mb-1"
                            className="h-11 bg-gray-200"
                          />
                          <div className="col-span-2">
                            <SwitchField
                              name="pro_rating"
                              singleLabelDescription={
                                <div>
                                  <div className="font-semibold">
                                    Require Documentation
                                  </div>
                                  <p className="text-xs">
                                    E.g., Medical certificate for long sick
                                    leave.
                                  </p>
                                </div>
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <BlackoutPeriodsField name="blackOutPeriod" />
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
