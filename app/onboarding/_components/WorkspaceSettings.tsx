"use client";
import Input from "@/components/form/Input";
import SearchableSelect from "@/components/form/SearchableSelect";
import {
  SelectInputSkeleton,
  WorkspaceSettingsSkeleton,
} from "@/components/skeletons";
import Button from "@/components/ui/CustomButton";
import {
  useCompleteWorkspaceSettings,
  useGetOnboarding,
  useWorkspaceSettings,
} from "@/hooks/auth/useOnboarding";
import {
  useGetCountries,
  useGetLocales,
  useGetTimeZones,
} from "@/hooks/references/useReferences";
import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";

const WorkspaceSettings = () => {
  const { data: onboardingState, isLoading } = useGetOnboarding();
  const { data: timeZoneData } = useGetTimeZones();
  const { data: countriesResponse } = useGetCountries();
  const { data: localesResponse } = useGetLocales();
  const { mutate: setWorkspace, isPending: isSettingWorkspace } =
    useWorkspaceSettings();
  const { mutate: complete, isPending: completing } =
    useCompleteWorkspaceSettings();

  if (!onboardingState || isLoading) {
    return <WorkspaceSettingsSkeleton />;
  }
  const initialValues = {
    expectedRevision: onboardingState.settingsRevision || 0,
    countryCode: onboardingState.workspaceSettings.countryCode,
    timezone: onboardingState.workspaceSettings.timezone,
    locale: onboardingState.workspaceSettings.locale,
    weekStartsOn: onboardingState.workspaceSettings.weekStartsOn,
    dateFormat: onboardingState.workspaceSettings.dateFormat || "DD/MM/YYYY",
  };
  const COUNTRY_CODES =
    countriesResponse?.items.map((item) => ({
      label: `${item.name} (${item.code})`,
      value: item.code,
    })) || [];
  const LOCALES =
    localesResponse?.items.map((item) => ({
      label: item.code,
      value: item.code,
    })) || [];

  const TIME_ZONES =
    timeZoneData?.items.map((item) => ({
      label: item.name,
      value: item.name,
    })) || [];
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
    setWorkspace(values, {
      onSuccess() {
        complete();
      },
    });
  };
  return (
    <div className="space-y-8 h-full">
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
              <div className="grid sm:grid-cols-2 gap-4 flex-1">
                {!countriesResponse && !localesResponse ? (
                  <>
                    <SelectInputSkeleton />
                    <SelectInputSkeleton />
                  </>
                ) : (
                  <>
                    <SearchableSelect
                      label="Country Code"
                      name="countryCode"
                      options={COUNTRY_CODES}
                      placeholder="Select country code"
                      labelClassName="text-sm"
                    />
                    <SearchableSelect
                      label="Locale"
                      name="locale"
                      options={LOCALES}
                      placeholder="Select locale"
                      labelClassName="text-sm"
                    />
                  </>
                )}
                <div className="sm:col-span-2">
                  {!timeZoneData ? (
                    <SelectInputSkeleton />
                  ) : (
                    <SearchableSelect
                      label="Time Zone"
                      name="timezone"
                      options={TIME_ZONES}
                      placeholder="Select time zone"
                      labelClassName="text-sm"
                    />
                  )}
                </div>
                <SearchableSelect
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

              <div className="flex justify-between items-center text-sm py-4 mt-14 border-t border-gray-300">
                <Button
                  type="link"
                  href="/onboarding/company_setup"
                  // onClick={() => setStep(step - 1)}
                  label="Back"
                  icon={<ArrowLeft />}
                  className="w-fit! px-5 rounded-full! bg-transparent text-black!"
                />
                <Button
                  label="Continue"
                  type="submit"
                  isLoading={isSettingWorkspace || completing}
                  disabled={isSettingWorkspace || completing}
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
