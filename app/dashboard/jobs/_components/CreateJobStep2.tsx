"use client";

import RoleRequirementsField from "@/components/form/RoleRequirementsField";
import SkillsAssessmentField from "@/components/form/SkillAssessmentField";
import { useGetRolesById } from "@/hooks/employer/useDepartment";
import { useGetJobById } from "@/hooks/employer/useJobs";
import { Form, Formik } from "formik";
import { useSearchParams } from "next/navigation";

const CreateJobStep2 = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const { data: jobData, isLoading: isgettingJob } = useGetJobById(jobId || "");
  const job = jobData;
  const { data: roleData, isLoading: isgettingRoles } = useGetRolesById(
    job?.roleId || ""
  );
  const role = roleData;
  if (isgettingJob || isgettingRoles || !job) {
    return <div className="">Loading...</div>;
  }
  const formInitialvalues = {
    qualifications: job.qualifications || [],
    skills: job.skills,
  };
  return (
    <div>
      <Formik
        initialValues={formInitialvalues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form className="space-y-6">
          <div className="grid grid-cols-[2fr_1fr] gap-4">
            <div className="space-y-4">
              <RoleRequirementsField name="qualifications" />
              <SkillsAssessmentField name="skills" />
            </div>
            <div className=""></div>
          </div>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-3 text-white"
          >
            Save Job
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateJobStep2;
