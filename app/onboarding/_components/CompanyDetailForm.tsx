/* eslint-disable react/no-unescaped-entities */
"use client";
import ImageUploadField from "@/components/form/ImageUpload";
import Input from "@/components/form/Input";
import RadioGroup from "@/components/form/RadioGroup";
import SearchableSelect from "@/components/form/SearchableSelect";
import {
  CompanyFormSkeleton,
  SelectInputSkeleton,
} from "@/components/skeletons";
import Button from "@/components/ui/CustomButton";
import {
  useCompleteCompanyStep,
  useGetOnboarding,
  useSaveCompanyData,
} from "@/hooks/auth/useOnboarding";
import { useGetIndustries } from "@/hooks/references/useReferences";
import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";

const CompanyDetailForm = () => {
  const { mutate, isPending } = useSaveCompanyData();
  const { mutate: completeStep, isPending: completing } =
    useCompleteCompanyStep();
  const { data, isLoading } = useGetIndustries();
  const { data: onboardingState } = useGetOnboarding();
  if (!onboardingState) {
    return <CompanyFormSkeleton />;
  }
  const initialValues = {
    expectedRevision: onboardingState?.companyRevision || 0,
    name: onboardingState?.company.name || "",
    logo: onboardingState?.company.logoUrl || "",
    website: onboardingState?.company.website || "",
    industryId: onboardingState?.company.industryId || "",
    size: onboardingState?.company.size || "11_25",
  };
  const industries = data?.items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const companySizes = [
    { label: "1-10\nemployees", value: "1_10" },
    { label: "11-25\nemployees", value: "11_25" },
    { label: "26-50\nemployees", value: "26_50" },
    { label: "51-100\nemployees", value: "51_100" },
    { label: "100+\nemployees", value: "100+" },
  ];
  const submit = (values: typeof initialValues) => {
    const { logo, ...payload } = values;
    mutate(logo ? values : payload, {
      onSuccess() {
        completeStep();
      },
    });
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
                name="name"
                LabelClassName="text-sm"
                placeholder="e.g.Sterling Tech"
              />
              <div className="grid grid-cols-2 gap-4">
                {isLoading || !industries ? (
                  <SelectInputSkeleton />
                ) : (
                  <SearchableSelect
                    label="Industry"
                    name="industryId"
                    options={industries!}
                    placeholder="Select industry"
                    labelClassName="text-sm"
                  />
                )}

                <Input
                  label="Company Website (Optional)"
                  name="website"
                  LabelClassName="text-sm"
                  placeholder="e.g.www.sterlingtech.com"
                />
              </div>
              <RadioGroup
                label="Company Size"
                options={companySizes}
                hideIcon
                name="size"
                orientation="horizontal"
                size="xs"
                optionClassName="text-center font-medium min-w-[calc(24%)] justify-center!"
              />
              <div className="w-1/2">
                <ImageUploadField
                  label="Company Logo"
                  labelClassName="text-sm"
                  name="logo"
                  text="Upload your logo"
                  infoText="Drag and drop your file here or browse SVG, PNG, JPG or GIF (max. 5mb)"
                />
              </div>

              <div className="flex justify-between items-center text-sm py-4 border-t border-gray-300">
                <Button
                  type="link"
                  href="/onboarding"
                  label="Back"
                  icon={<ArrowLeft />}
                  className="w-fit! px-5 rounded-full! bg-transparent text-black!"
                />
                <Button
                  label="Continue"
                  type="submit"
                  isLoading={isPending || completing}
                  disabled={isPending || completing}
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
