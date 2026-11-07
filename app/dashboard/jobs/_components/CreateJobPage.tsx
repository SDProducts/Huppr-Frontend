/* eslint-disable react/no-unescaped-entities */
"use client";
import JobStepFormsWrapper from "@/app/dashboard/jobs/_components/JobStepFormsWrapper";
import Steps from "@/app/dashboard/jobs/_components/Steps";
import { Stars } from "lucide-react";

const CreateJobPage = () => {
  return (
    <div>
      {/* <Breadcrumb /> */}
      <div className="flex items-end justify-between py-6">
        <div className="w-2/4 space-y-2">
          <h2 className="text-4xl font-bold">Create a Job</h2>
          <div className="">
            Select a role from your organisation to get started. Huppr will
            automatically populate the job details from the role you've already
            created.
          </div>
        </div>
        <div className="flex w-1/4 text-xs items-center gap-3 px-4 py-1 bg-primary/5 rounded-md">
          <Stars className="size-4 text-primary" />{" "}
          <div className="flex-1">
            Autofill powered by Organization Directory
          </div>
        </div>
      </div>

      <Steps />
      <div className="py-6">
        <JobStepFormsWrapper />
      </div>
    </div>
  );
};

export default CreateJobPage;
