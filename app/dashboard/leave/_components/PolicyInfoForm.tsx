"use client";
import { CreateLeavePolicyStep } from "@/app/dashboard/departments/_components/Steps&Progress";
import Input from "@/components/form/Input";
import RadioGroup from "@/components/form/RadioGroup";
import SearchableSelect from "@/components/form/SearchableSelect";
import Button from "@/components/ui/CustomButton";
import {
  useCreateNewLeavePolicy,
  useGetSingleLeavePolicy,
  usePatchLeavePolicy,
} from "@/hooks/employer/useLeave";
import { Form, Formik } from "formik";
import { ArrowRight, Bookmark } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PolicyInfoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const policyId = searchParams.get("policyId");
  const { data: policy, isLoading: isGetttingPolicy } = useGetSingleLeavePolicy(
    policyId || ""
  );

  const { mutate: savePolicy, isPending } = useCreateNewLeavePolicy();
  const { mutate: patchPolicy, isPending: isPatching } = usePatchLeavePolicy(
    policyId || ""
  );
  const initialValues: AddNewLeavePolicyPayload = {
    name: policy?.name || "",
    leaveType: policy?.leaveType || "annual",
    status: policy?.status || "draft",
    description: policy?.description || "",
  };
  const STATUS_OPTION = [
    { label: "Active", value: "active" },
    { label: "Draft", value: "draft" },
    { label: "Inactive", value: "inactive" },
  ];
  const TYPE_OPTION = [
    { label: "Annual Leave", value: "annual" },
    { label: "Sick Leave", value: "sick" },
    { label: "Maternity Leave", value: "maternity" },
  ];
  function saveDraft(params: typeof initialValues) {
    if (policyId) {
      patchPolicy(params, {
        onSuccess(data) {
          router.replace(
            `/dashboard/leave/create-leave-policy?step=eligibility&policyId=${data.id}`
          );
        },
      });
    } else {
      savePolicy(params, {
        onSuccess(data) {
          router.replace(
            `/dashboard/leave/create-leave-policy?step=eligibility&policyId=${data.id}`
          );
        },
      });
    }
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validateOnMount
        onSubmit={saveDraft}
      >
        {() => {
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
                        label="Save Draft"
                        icon={<Bookmark className="size-4" />}
                        type="submit"
                        className="bg-transparent! border text-primary! w-fit! text-sm"
                      />
                    </div>
                  </div>
                  <CreateLeavePolicyStep currentStep={1} />
                  <div className="space-y-6 p-6 rounded-xl bg-white">
                    <div className="">
                      <h2 className="text-xl font-bold">Policy Information</h2>
                      <p>Define the basic details of the leave policy.</p>
                    </div>
                    <div className="grid grid-cols-[2fr_1fr] gap-2">
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          label="Policy Name"
                          name="name"
                          placeholder="Policy name"
                          className="bg-gray-200"
                          LabelClassName="text-sm"
                        />
                        <SearchableSelect
                          name="leaveType"
                          options={TYPE_OPTION}
                          label="Leave Type"
                          className="bg-gray-200"
                          labelClassName="text-sm"
                        />
                        <div className="col-span-2">
                          <Input
                            label="Description"
                            name="description"
                            type="textarea"
                            placeholder="type in the details about this policy."
                            className="bg-gray-200"
                            LabelClassName="text-sm"
                            rows={2}
                          />
                        </div>
                      </div>

                      <RadioGroup
                        name="status"
                        options={STATUS_OPTION}
                        label="Policy Status"
                        optionClassName="bg-gray-100/10"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end border-t border-gray-200 py-5">
                    <Button
                      label="Next: Eligibility"
                      className="w-fit!"
                      type="submit"
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
