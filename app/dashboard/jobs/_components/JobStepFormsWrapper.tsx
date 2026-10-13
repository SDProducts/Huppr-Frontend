"use client";
import CreateJobStep1 from "@/app/dashboard/jobs/_components/CreateJobStep1";
import CreateJobStep2 from "@/app/dashboard/jobs/_components/CreateJobStep2";
import { useRouter, useSearchParams } from "next/navigation";

const JobStepFormsWrapper = () => {
  const params = useSearchParams();
  const { replace } = useRouter();
  const currentStep = Number(params.get("step"));
  const jobId = params.get("jobId");
  if (currentStep === 1) {
    return <CreateJobStep1 />;
  }
  if (currentStep === 2) {
    if (jobId) {
      return <CreateJobStep2 />;
    } else {
      replace(`/dashboard/jobs/create-job?step=1`);
    }
  }

  return <div>JobStepFormsWrapper</div>;
};

export default JobStepFormsWrapper;
