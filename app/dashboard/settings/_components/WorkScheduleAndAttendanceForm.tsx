"use client";
import FormSection from "@/components/form/FormSection";
import Input from "@/components/form/Input";
import PillSelect from "@/components/form/PillSelect";
import SearchableSelect from "@/components/form/SearchableSelect";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Form, Formik } from "formik";

export default function WorkScheduleAndAttendanceForm() {
  const REMOTE_OPTIONS = [
    {
      type: "no-remote",
      label: "No remote work",
      description: "All employees work from office.",
    },
    {
      type: "fixed",
      label: "Fixed remote work days",
      description: "Allow a set number of remote work days per week.",
      noOfDays: 2,
    },
    {
      type: "flexible",
      label: "Flexible remote work",
      description: "Employees can choose remote work days within limits.",
    },
    {
      type: "custom",
      label: "Custom by department, role or employee",
      description:
        "Set different remote work rules at department, role or individual level.",
    },
  ];

  const formData = {
    remote: {
      type: "fixed",
      noOfDays: 2,
    },
    totalBreakDuration: 1,
  };
  function handleSaveChanges(params: typeof formData) {
    console.log(params);
  }
  return (
    <Formik initialValues={formData} onSubmit={handleSaveChanges}>
      {({ values, setFieldValue }) => {
        return (
          <Form className={cn("space-y-8")}>
            <div className="flex justify-between items-start border-b border-gray-200 py-2">
              <div className="flex-1 sm:max-w-2/3">
                <h2 className="text-3xl font-bold">
                  Work Schedule & Attendance
                </h2>
                <p className="text-sm text-gray-500">
                  Configure working days, office hours, breaks, remote work
                  rules and attendance settings for your organisation.
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Button variant={"white"} className={cn("px-5")}>
                  <span>Discard changes</span>
                </Button>
                <Button className={cn("px-5")} type="submit">
                  <span>Save changes</span>
                </Button>
              </div>
            </div>
            <div className="space-y-6">
              <FormSection
                title="1. Work Schedule & Attendance"
                description="Set the default working days, office hours and timezone for your company. These settings apply to all locations, departments, roles and employees unless overridden."
              >
                <div className="space-y-4">
                  <div className="grid md:grid-cols-[1fr_2fr] gap-4">
                    <PillSelect
                      name="days"
                      label="Working Days"
                      options={[
                        { label: "Mon", value: "mon" },
                        { label: "Tue", value: "tue" },
                        { label: "Wed", value: "wed" },
                        { label: "Thu", value: "thu" },
                        { label: "Fri", value: "Fri" },
                        { label: "Sat", value: "Sat" },
                        { label: "Sun", value: "Sun" },
                      ]}
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <Input
                        name="workingHours"
                        label="Working Hours Per Day"
                        className="bg-gray-200 py-0! h-9 rounded-sm"
                        LabelClassName="text-sm mb-2"
                        placeholder="8 Hours"
                      />
                      <Input
                        name="halfDayHours"
                        label="Half Day Hours"
                        className="bg-gray-200 py-0! h-9 rounded-sm"
                        LabelClassName="text-sm mb-2"
                        placeholder="8 Hours"
                      />
                      <SearchableSelect
                        name="timeZone"
                        label="Default Timezone"
                        options={[]}
                        className="bg-gray-200 py-0! h-9 rounded-sm"
                        labelClassName="text-sm mb-2"
                        placeholder="(GMT+01:00) Lagos, Nigeria"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 sm:w-1/3">
                    <Input
                      name="startTime"
                      type="time"
                      label="Start Time"
                      className="bg-gray-200 py-0! h-9 rounded-sm"
                      LabelClassName="text-sm mb-2"
                      placeholder="8 Hours"
                    />
                    <Input
                      name="endTime"
                      type="time"
                      label="Closing Time"
                      className="bg-gray-200 py-0! h-9 rounded-sm"
                      LabelClassName="text-sm mb-2"
                      placeholder="8 Hours"
                    />
                  </div>
                </div>
              </FormSection>
              <FormSection
                title="2. Remote Work Policy"
                description="Set the default remote work policy for your company. You can override this at location, department, role or individual level."
              >
                <div className="">
                  <div className="grid grid-cols-4 gap-x-2 gap-y-4">
                    {REMOTE_OPTIONS.map((item) => (
                      <div
                        onClick={() => setFieldValue("remote", item)}
                        className={cn(
                          "cursor-pointer p-6 space-y-3 rounded-md border-2",
                          values.remote.type === item.type
                            ? "border-primary bg-primary/5"
                            : "border-gray-100"
                        )}
                        key={item.type}
                      >
                        <div className="space-y-1">
                          <div className="font-semibold text-sm">
                            {item.label}
                          </div>
                          <p className="text-xs">{item.description}</p>
                        </div>
                        {item.noOfDays && (
                          <SearchableSelect
                            label="Default remote work days per"
                            name={`remote.noOfDays`}
                            options={[
                              { label: "2 Days", value: 2 },
                              { label: "3 Days", value: 3 },
                              { label: "4 Days", value: 4 },
                            ]}
                            labelClassName="text-xs mb-0.5 text-gray-400! font-semibold"
                            className="h-9 py-0! rounded-sm"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </FormSection>
              <FormSection
                title="Breaks"
                description="Set the default remote work policy for your company. You can override this at location, department, role or individual level."
              >
                <div className="grid grid-cols-2 gap-2 max-w-2/3">
                  <SearchableSelect
                    label="Total Break Duration per Day"
                    name={`totalBreakDuration`}
                    options={[
                      { label: "1 Hour", value: 1 },
                      { label: "2 Hours", value: 2 },
                      { label: "3 Hours", value: 3 },
                    ]}
                    labelClassName="text-xs mb-2 font-semibold"
                    className="h-9 py-0! rounded-sm"
                  />
                  <SearchableSelect
                    label="Default remote work days per"
                    name={`remote.noOfDays`}
                    options={[
                      {
                        label: `12:00 PM - ${
                          0 + values.totalBreakDuration
                        }:00 PM`,
                        value: `12:00 PM - ${
                          0 + values.totalBreakDuration
                        }:00 PM`,
                      },
                      {
                        label: `1:00 PM - ${
                          1 + values.totalBreakDuration
                        }:00 PM`,
                        value: `1:00 PM - ${
                          1 + values.totalBreakDuration
                        }:00 PM`,
                      },
                      {
                        label: `2:00 PM - ${
                          2 + values.totalBreakDuration
                        }:00 PM`,
                        value: `2:00 PM - ${
                          2 + values.totalBreakDuration
                        }:00 PM`,
                      },
                    ]}
                    labelClassName="text-xs mb-2 text-gray-400! font-semibold"
                    className="h-9 py-0! rounded-sm"
                  />
                </div>
              </FormSection>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
