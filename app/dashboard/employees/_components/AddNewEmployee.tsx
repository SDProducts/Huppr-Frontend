"use client";

import DateInput from "@/components/form/DateInput";
import Input from "@/components/form/Input";
import SearchableSelect from "@/components/form/SearchableSelect";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, Formik } from "formik";
import { Info, Mail, Phone, Send, Tag, User2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AddNewEmployee() {
  const initialValues = {
    fullname: "",
    email: "",
    phoneNumber: "",
    dob: "",
  };
  function saveEmployee(params: typeof initialValues) {
    toast.loading("Saving employee...");
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
  }
  return (
    <div className="p-4 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 bg-primary/5 border border-primary/15 py-1 px-3 rounded-full w-fit">
          <div className="size-2 bg-primary rounded-full" />
          <div className="text-sm text-primary font-bold">New Employee</div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Create New Employee</h2>
          <p className="text-sm">
            Configure basic identity and role parameters to generate the
            official employee record and trigger tailored onboarding workflows.
          </p>
        </div>
      </div>
      <Formik initialValues={initialValues} onSubmit={saveEmployee}>
        {() => {
          return (
            <Form className="space-y-10">
              <div className="space-y-8">
                <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
                  <div className="flex gap-2.5 items-center">
                    <div className="size-8 text-center bg-primary text-white font-extrabold rounded-md flex justify-center items-center">
                      1
                    </div>
                    <div className="">
                      <div className="uppercase font-bold text-sm">
                        Personal Information
                      </div>
                      <p className="text-xs text-gray-500">
                        Core personal credentials for legal and payroll identity
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-y-4 sm:grid-cols-2 gap-2">
                    <Input
                      name="fullname"
                      label="Fullname"
                      placeholder="e.g. Aisha Bello"
                      icon={<User2 className="size-3.5" />}
                      LabelClassName="text-sm"
                    />
                    <Input
                      name="email"
                      label="email"
                      placeholder="e.g. aisha.bello@email.com"
                      icon={<Mail className="size-3.5" />}
                      LabelClassName="text-sm"
                    />
                    <Input
                      name="phoneNumber"
                      label="Phone Number"
                      placeholder="e.g. 803 123 4567"
                      icon={<Phone className="size-3.5" />}
                      LabelClassName="text-sm"
                    />
                    <DateInput
                      name="dob"
                      label="Date of Birth"
                      labelClassName="text-sm"
                    />
                  </div>
                </div>
                <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
                  <div className="flex gap-2.5 items-center">
                    <div className="size-8 text-center bg-primary text-white font-extrabold rounded-md flex justify-center items-center">
                      2
                    </div>
                    <div className="">
                      <div className="uppercase font-bold text-sm">
                        EMPLOYMENT DETAILS{" "}
                      </div>
                      <p className="text-xs text-gray-500">
                        Placement, managerial line, and terms of hire{" "}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-y-4 sm:grid-cols-2 gap-2">
                    <SearchableSelect
                      name="department"
                      options={[]}
                      label="Department"
                      labelClassName="text-sm"
                    />
                    <SearchableSelect
                      name="position"
                      options={[]}
                      label="position"
                      labelClassName="text-sm"
                    />
                    <SearchableSelect
                      name="employmentType"
                      options={[]}
                      label="employmentType"
                      labelClassName="text-sm"
                    />
                    <DateInput
                      name="startDate"
                      label="Start Date"
                      labelClassName="text-sm"
                    />
                    <SearchableSelect
                      name="reportsTo"
                      options={[]}
                      label="reportsTo"
                      labelClassName="text-sm"
                    />
                    <SearchableSelect
                      name="workLocation"
                      options={[]}
                      label="workLocation"
                      labelClassName="text-sm"
                    />
                  </div>
                </div>
                <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
                  <div className="flex gap-2.5 items-center">
                    <div className="size-8 text-center bg-primary text-white font-extrabold rounded-md flex justify-center items-center">
                      3
                    </div>
                    <div className="">
                      <div className="uppercase font-bold text-sm">
                        ADDITIONAL INFORMATION{" "}
                      </div>
                      <p className="text-xs text-gray-500">
                        System identification and operational notes{" "}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-y-4 sm:grid-cols-2 gap-2">
                    <Input
                      name="employeeID"
                      label="employeeID"
                      placeholder="EMP-009 (Auto-assigned)"
                      icon={<Tag className="size-3.5" />}
                      LabelClassName="text-sm"
                    />
                    <SearchableSelect
                      name="workArrangement"
                      options={[]}
                      label="workArrangement"
                      labelClassName="text-sm"
                    />
                    <div className="sm:col-span-2">
                      <Input
                        name="notes"
                        label="notes"
                        type="textarea"
                        placeholder="Add any internal notes, dietary preferences, equipment requests..."
                        LabelClassName="text-sm"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/15">
                  <div className="size-8 rounded-md flex justify-center items-center bg-primary text-white">
                    <Info className="size-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <div className="font-bold">Immediate Onboarding Flow</div>
                      <div className="bg-primary/15 text-primary text-xs px-3 py-1 rounded-sm">
                        Ready
                      </div>
                    </div>
                    <p className="text-sm">
                      Saving will create the employee profile and trigger their
                      introductory checklist, welcome portal invitation, and
                      compliance paperwork instantly.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-5">
                <Button variant={"outline"}>
                  {" "}
                  <span>Cancel</span>
                </Button>
                <div className="flex gap-4 items-center">
                  <Button variant={"ghost"}>
                    <span>Save as Draft</span>
                  </Button>

                  <Button type="submit">
                    <Send />
                    <span>Initiate Onboarding</span>
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
