/* eslint-disable react/no-unescaped-entities */
"use client";
import SearchableSelect from "@/components/form/SearchableSelect";
import SwitchField from "@/components/form/SwitchField";
// import BlackoutPeriodsField from "@/components/form/BlackOutPeriod";
// import Input from "@/components/form/Input";
// import SwitchField from "@/components/form/SwitchField";
import Button from "@/components/ui/CustomButton";
import { months } from "@/data/constants";
import {
  useGetSingleLeavePolicy,
  usePatchLeavePolicy,
} from "@/hooks/employer/useLeave";
import { Form, Formik } from "formik";
import {
  ArrowRight,
  CalendarDays,
  Forward,
  LineChart,
  ShieldCogCorner,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SetUpLeaveOrganisation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const policyId = searchParams.get("policyId");
  const { data: policy, isLoading: isGetttingPolicy } = useGetSingleLeavePolicy(
    policyId || ""
  );
  const { mutate: patchPolicy, isPending } = usePatchLeavePolicy(
    policyId || ""
  );
  const MONTHS_OPTION = months.map((month) => ({
    label: month.label,
    value: month.value,
  }));

  const initialValues = {
    startDate: {
      month: "",
      day: "",
    },
    carryOverStartDate: {
      month: "",
      day: "",
    },
    endDate: {
      month: "",
      day: "",
    },
    carryOverEndDate: {
      month: "",
      day: "",
    },
    approvalChain: policy?.approvalChain || [],
    autoDeductPayroll: policy?.autoDeductPayroll || true,
    allowNegativeBalance: policy?.allowNegativeBalance || false,
  };
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
          const month = months.find(
            (item) => item.value === values.startDate.month
          );
          const DAYS_OPTION =
            Array.from({
              length: month?.numberOfDays || 30,
            }).map((_, i) => ({ label: `${i + 1}`, value: i + 1 })) || [];
          return (
            <Form>
              <div className="grid grid-cols-[2fr_1fr] gap-8">
                <div className="space-y-10">
                  <div className="flex justify-between gap-4 items-start">
                    <div className="flex-1 space-y-2">
                      <h2 className="text-3xl font-extrabold">
                        Set up Leave Organisation{" "}
                      </h2>
                      <p>
                        Define your leave year, accrual settings and general
                        rules to establish the foundation of your leave
                        management.{" "}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="grid gap-5">
                      <div className="bg-white p-6 rounded-xl space-y-8">
                        <div className="flex items-center gap-2">
                          <div className="size-10 bg-primary/5 flex rounded-md justify-center items-center">
                            <CalendarDays
                              className="size-6 text-primary"
                              strokeWidth={2.5}
                            />
                          </div>
                          <div className="">
                            <div className="text-xl font-bold">Leave Year </div>
                            <div className="text-sm">
                              Set the start and end months for your
                              organisation's annual leave cycle.
                            </div>
                          </div>
                        </div>
                        <div className="grid gap-4">
                          <div className="space-y-1">
                            <div className="text-sm font-semibold">
                              Start Date
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <SearchableSelect
                                name="startDate.month"
                                options={MONTHS_OPTION}
                              />
                              <SearchableSelect
                                name="StateDate.day"
                                options={DAYS_OPTION}
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm font-semibold">
                              End Date
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <SearchableSelect
                                name="endDate.month"
                                options={MONTHS_OPTION}
                              />
                              <SearchableSelect
                                name="endDate.day"
                                options={DAYS_OPTION}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-xl space-y-8">
                        <div className="flex items-center gap-2">
                          <div className="size-10 bg-primary/5 flex rounded-md justify-center items-center">
                            <LineChart
                              className="size-6 text-primary"
                              strokeWidth={2.5}
                            />
                          </div>
                          <div className="">
                            <div className="text-xl font-bold">Accrual</div>
                            <div className="text-sm">
                              How employees earn leave.{" "}
                            </div>
                          </div>
                        </div>
                        <div className="grid">
                          <SwitchField
                            name="allowNegativeBalance"
                            singleLabelDescription={
                              <div className="space-y-1">
                                <div className="font-semibold">
                                  Pro-rate for new starters
                                </div>
                                <p className="text-xs">
                                  Calculate leave based on join date.{" "}
                                </p>
                              </div>
                            }
                          />
                          <SwitchField
                            name="autoDeductPayroll"
                            singleLabelDescription={
                              <div className="space-y-1">
                                <div className="font-semibold">
                                  Accrue based on hours worked{" "}
                                </div>
                                <p className="text-xs">
                                  For part-time or hourly staff.{" "}
                                </p>
                              </div>
                            }
                          />
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-xl space-y-8">
                        <div className="flex items-center gap-2">
                          <div className="size-10 bg-primary/5 flex rounded-md justify-center items-center">
                            <ShieldCogCorner
                              className="size-6 text-primary"
                              strokeWidth={2.5}
                            />
                          </div>
                          <div className="">
                            <div className="text-xl font-bold">Policies</div>
                            <div className="text-sm">
                              General rules & tracking.{" "}
                            </div>
                          </div>
                        </div>
                        <div className="grid">
                          <SwitchField
                            name="allowNegativeBalance"
                            singleLabelDescription={
                              <div className="space-y-1">
                                <div className="font-semibold">
                                  Public Holiday tracking{" "}
                                </div>
                                <p className="text-xs">
                                  Include local holidays in calendar.{" "}
                                </p>
                              </div>
                            }
                          />
                          <SwitchField
                            name="autoDeductPayroll"
                            singleLabelDescription={
                              <div className="space-y-1">
                                <div className="font-semibold">
                                  Manager notifications{" "}
                                </div>
                                <p className="text-xs">
                                  Alert managers on request.{" "}
                                </p>
                              </div>
                            }
                          />
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-xl space-y-8">
                        <div className="flex items-center gap-2">
                          <div className="size-10 bg-primary/5 flex rounded-md justify-center items-center">
                            <Forward
                              className="size-6 text-primary"
                              strokeWidth={2.5}
                            />
                          </div>
                          <div className="">
                            <div className="text-xl font-bold">
                              Carry Forward Rules
                            </div>
                            <div className="text-sm">
                              Determine how unused leave is handled at year-end.{" "}
                            </div>
                          </div>
                        </div>
                        <div className="grid gap-4">
                          <div className="space-y-1">
                            <div className="text-sm font-semibold">
                              Start Date
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <SearchableSelect
                                name="caryyOverStartDate.month"
                                options={MONTHS_OPTION}
                              />
                              <SearchableSelect
                                name="carryOverStartDate.day"
                                options={DAYS_OPTION}
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm font-semibold">
                              End Date
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <SearchableSelect
                                name="carryOverEndDate.month"
                                options={MONTHS_OPTION}
                              />
                              <SearchableSelect
                                name="carryOverEndDate.day"
                                options={DAYS_OPTION}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end border-t border-gray-200 py-5">
                    <Button
                      type="submit"
                      label="Save & Continue"
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
