"use client";
import { CreateLeavePolicyStep } from "@/app/dashboard/departments/_components/Steps&Progress";
import Input from "@/components/form/Input";
import RadioGroup from "@/components/form/RadioGroup";
import SearchableSelect from "@/components/form/SearchableSelect";
import Button from "@/components/ui/CustomButton";
import { Form, Formik } from "formik";
import { ArrowRight, Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PolicyInfoForm() {
  const router = useRouter();
  const initialValues = {
    name: "",
    type: "",
    status: "active",
    description: "",
  };
  const STATUS_OPTION = [
    { label: "Active", value: "active" },
    { label: "Draft", value: "draft" },
    { label: "Inactive", value: "inactive" },
  ];
  const TYPE_OPTION = [
    { label: "annual", value: "annual" },
    { label: "sick", value: "sick" },
    { label: "maternity", value: "maternity" },
  ];
  function saveDraft(params: typeof initialValues) {
    router.replace(`/dashboard/leave/create-leave-policy?step=eligibility`);
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
                          className="bg-gray-200"
                          LabelClassName="text-sm"
                        />
                        <SearchableSelect
                          name="type"
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
