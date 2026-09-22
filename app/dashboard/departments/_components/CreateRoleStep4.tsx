/* eslint-disable react/no-unescaped-entities */
import Stepper from "@/app/dashboard/departments/_components/Steps&Progress";
import Checkbox from "@/components/form/Checkbox";
import Input from "@/components/form/Input";
import SearchableSelect from "@/components/form/SearchableSelect";
import Button from "@/components/ui/CustomButton";
import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";

const CreateRoleStep4 = () => {
  const LEAVE_POLICIES: Option[] = [
    { label: "Annual Leave", value: "Annual Leave" },
    { label: "Sick Leave", value: "Sick Leave" },
    { label: "Study Leave", value: "Study Leave" },
  ];
  const BENEFITS: Option[] = [
    { label: "Health Benefits", value: "Health Benefits" },
    { label: "Pension Benefits", value: "Pension Benefits" },
    { label: "Commissions", value: "Commissions" },
    { label: "Profit Sharing", value: "Profit Sharing" },
  ];
  const initialValues = {
    minSalary: "",
    mmaxSalary: "",
    leave: "",
  };
  const submit = () => {};

  return (
    <div className="px-4 space-y-10">
      <div className="">
        <h2 className="text-2xl font-bold">Organization & Access</h2>
        <p className="text-sm">
          Define reporting lines and system permissions for this role.{" "}
        </p>
      </div>
      <Stepper currentStep={4} />
      <Formik initialValues={initialValues} onSubmit={submit}>
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <div className="grid grid-cols-[2fr_1fr] gap-4">
                <div className="space-y-4">
                  <div className="p-4 rounded-md bg-white space-y-3">
                    <div className="">
                      <div className="text-xl font-bold">Salary Range</div>
                      <div className="text-xs">
                        Define the annual base salary for this role.
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        label="Minimum Salary"
                        name="minSalary"
                        formatMoney
                      />
                      <Input
                        label="Maximum Salary"
                        name="maxSalary"
                        formatMoney
                      />
                    </div>
                  </div>
                  <div className="p-4 rounded-md bg-white">
                    <div className="font-bold text-xl -mb-5">Leave Policy</div>
                    <Checkbox
                      name="responsibilities"
                      type="multiple"
                      options={LEAVE_POLICIES}
                      label="Select the workflows this role has authority to approve."
                      orientationStyle="grid"
                      optionClassName="border-none!"
                    />
                  </div>
                  <div className="p-4 rounded-md bg-white space-y-5">
                    <div className="">
                      <div className="text-xl font-bold">
                        Career Progression
                      </div>
                      <div className="text-xs">
                        Define the growth track and review cycles for this role.
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <SearchableSelect
                          name="review_frequency"
                          label="Salary Review Frequency"
                          options={[]}
                          labelClassName="text-sm"
                        />
                        <SearchableSelect
                          name="probation_period"
                          label="Probation Duration"
                          options={[]}
                          labelClassName="text-sm"
                        />
                      </div>
                      <SearchableSelect
                        name="promotion"
                        label="Promotion & Growth Track"
                        options={[]}
                        labelClassName="text-sm"
                      />
                      <Input
                        label="Succession Path"
                        name="succession"
                        placeholder="e.g., Senior Engineer to Lead Engineer"
                        LabelClassName="text-sm"
                      />
                      <SearchableSelect
                        name="promotion"
                        label="Reporting Line"
                        options={[]}
                        labelClassName="text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="p-4 rounded-md bg-white space-y-4">
                    <div className="font-bold text-xl">Benefits Checklist</div>
                    <Checkbox
                      name="responsibilities"
                      type="multiple"
                      options={BENEFITS}
                      label=""
                      orientationStyle="grid"
                      optionClassName="border-none! font-medium!"
                    />
                  </div>
                  <div className="p-4 bg-primary-100 rounded-md mt-7">
                    <div className="flex items-start gap-2">
                      <div className="py-1">
                        <Lightbulb size={18} className="text-primary" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="text-primary font-bold">
                          AI Suggestion
                        </div>
                        <div className="text-sm">
                          Consider adding "Agile Methodologies" to required
                          skills based on similar Senior Backend roles in your
                          industry.
                        </div>
                        <div className="text-primary font-bold text-sm">
                          Apply Suggestion
                        </div>
                      </div>
                    </div>
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
                  <Button label="Continue" rightIcon={<ArrowRight />} />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateRoleStep4;
