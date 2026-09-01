"use client";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import Button from "@/components/ui/CustomButton";
import { useOnboarding } from "@/context/onboarding.state";
import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";

const WorkspaceSettings = () => {
  const { setStep, step } = useOnboarding();
  const initialValues = {
    countryCode: "",
    timeZone: "",
    locale: "",
    weekStartsOn: "",
    dateFormat: "DD/MM/YYYY",
  };
  const COUNTRY_CODES = [
    { label: "US", value: "US" },
    { label: "GB", value: "GB" },
    { label: "FR", value: "FR" },
    { label: "NG", value: "NG" },
  ];
  const LOCALES = [
    { label: "en-US", value: "en-US" },
    { label: "en-GB", value: "en-GB" },
    { label: "en-NG", value: "en-NG" },
    { label: "FR", value: "FR" },
  ];
  const TIME_ZONES = [
    { label: "Africa/Lagos", value: "Africa/Lagos" },
    { label: "Africa/Accra", value: "Africa/Accra" },
    { label: "Africa/Ibijan", value: "Africa/Ibijan" },
  ];
  const DAYS = [
    { label: "Monday", value: "monday" },
    { label: "Tuesday", value: "tuesday" },
    { label: "Wednesday", value: "wednesday" },
    { label: "Thursday", value: "thursday" },
    { label: "Friday", value: "friday" },
    { label: "Saturnday", value: "saturnday" },
    { label: "Sunday", value: "sunday" },
  ];
  const submit = (values: typeof initialValues) => {
    setStep(step + 1);
  };
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold">Workspace Settings</h2>
        <p className="text-sm">
          Tell us a little about your business. This helps us personalize your
          experience.
        </p>
      </div>

      <Formik initialValues={initialValues} onSubmit={submit}>
        {() => {
          return (
            <Form className="space-y-10">
              <div className="grid sm:grid-cols-2 gap-4">
                <Select
                  label="Country Code"
                  name="countryCode"
                  options={COUNTRY_CODES}
                  placeholder="Select country code"
                  labelClassName="text-sm"
                />
                <Select
                  label="Locale"
                  name="locale"
                  options={LOCALES}
                  placeholder="Select locale"
                  labelClassName="text-sm"
                />
                <div className="sm:col-span-2">
                  <Select
                    label="Time Zone"
                    name="timeZone"
                    options={TIME_ZONES}
                    placeholder="Select time zone"
                    labelClassName="text-sm"
                  />
                </div>
                <Select
                  label="Week Starts on:"
                  name="weekStartsOn"
                  options={DAYS}
                  placeholder="Select day"
                  labelClassName="text-sm"
                />

                <Input
                  label="Date Format (Optional)"
                  name="dateFormat"
                  LabelClassName="text-sm"
                  placeholder="e.g.DD/MM/YYYY"
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

export default WorkspaceSettings;
