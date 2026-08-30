/* eslint-disable react/no-unescaped-entities */
"use client";
import ImageUploadField from "@/components/form/ImageUpload";
import Input from "@/components/form/Input";
import RadioGroup from "@/components/form/RadioGroup";
import Select from "@/components/form/Select";
import Button from "@/components/ui/CustomButton";
import { useOnboarding } from "@/context/onboarding.state";
import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";

const CompanyDetailForm = () => {
  const { setStep, step } = useOnboarding();
  const initialValues = {
    company_name: "",
    company_logo: "",
    company_website: "",
    industry: "",
    company_size: "11-25",
  };
  const industries = [
    { label: "IT", value: "IT" },
    { label: "e-Commerce", value: "e-Commerce" },
    { label: "Banking & Finance", value: "Banking & Finance" },
  ];
  const companySizes = [
    { label: "1-10\nemployees", value: "1-10" },
    { label: "11-25\nemployees", value: "11-25" },
    { label: "26-50\nemployees", value: "26-50" },
    { label: "51-100\nemployees", value: "51-100" },
    { label: "100+\nemployees", value: "100+" },
  ];
  const submit = (values: typeof initialValues) => {
    setStep(step + 1);
  };
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold">Let's set up your company</h2>
        <p className="text-sm">
          Tell us a little about your business. This helps us personalize your
          experience.
        </p>
      </div>

      <Formik initialValues={initialValues} onSubmit={submit}>
        {() => {
          return (
            <Form className="space-y-10">
              <Input
                label="Company Name"
                name="company_name"
                LabelClassName="text-sm"
                placeholder="e.g.Sterling Tech"
              />
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Industry"
                  name="industry"
                  options={industries}
                  placeholder="Select industry"
                  labelClassName="text-sm"
                />

                <Input
                  label="Company Website (Optional)"
                  name="company_website"
                  LabelClassName="text-sm"
                  placeholder="e.g.www.sterlingtech.com"
                />
              </div>
              <RadioGroup
                label="Company Size"
                options={companySizes}
                hideIcon
                name="company_size"
                orientation="horizontal"
                size="xs"
                optionClassName="text-center font-medium min-w-[calc(24%)] justify-center!"
              />
              <div className="w-1/2">
                <ImageUploadField
                  label="Company Logo"
                  labelClassName="text-sm"
                  name="company_logo"
                  text="Upload your logo"
                  infoText="Drag and drop your file here or browse SVG, PNG, JPG or GIF (max. 5mb)"
                />
              </div>

              <div className="flex justify-between items-center text-sm py-4 border-t border-gray-300">
                <Button
                  onClick={() => setStep(step - 1)}
                  label="Back"
                  icon={<ArrowLeft />}
                  className="w-fit! px-5 rounded-full! bg-transparent text-black!"
                />
                <Button
                  label="Continue"
                  type="submit"
                  rightIcon={<ArrowRight />}
                  className="w-fit! px-5 rounded-full!"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CompanyDetailForm;
