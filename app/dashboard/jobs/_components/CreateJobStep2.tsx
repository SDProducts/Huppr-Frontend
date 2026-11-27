"use client";

import RoleRequirementsField from "@/components/form/RoleRequirementsField";
import ScreeningQuestionsField from "@/components/form/ScreeningQuestionsField";
import SkillsAssessmentField from "@/components/form/SkillAssessmentField";
import { PageLoader } from "@/components/global/PageLoader";
import Button from "@/components/ui/CustomButton";
import { PieChartComponent } from "@/components/utils/charts/PieChart";
import { useGetJobById, usePatchJob } from "@/hooks/employer/useJobs";
import { CreateJobPayload } from "@/types/create_job_payload";
import { JobItem } from "@/types/department_roles";
import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight, Bookmark, Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const CreateJobStep2 = () => {
  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams();
  const router = useRouter();
  const jobId = searchParams.get("jobId");
  const { data: jobData, isLoading: isgettingJob } = useGetJobById(jobId || "");
  const { mutate: patchJob, isPending: patchingJob } = usePatchJob(jobId || "");
  const job = jobData;
  // const { data: roleData, isLoading: isgettingRoles } = useGetRolesById(
  //   job?.roleId || ""
  // );
  // const role = roleData;
  if (isgettingJob || !job) {
    return <PageLoader />;
  }
  const formInitialvalues = {
    qualifications: job.qualifications || [],
    skills: job.skills,
    screeningQuestions: job.screeningQuestions || [],
  };
  const submit = (values: typeof formInitialvalues) => {
    const formattedValues: CreateJobPayload = {
      screeningQuestions: (values.screeningQuestions || []).map((question) => {
        return {
          prompt: question.prompt,
          kind: question.kind,
          threshold: question.threshold,
          weight: question.weight,
          isKnockout: question.isKnockout,
          isRequired: question.isRequired,
          expectedAnswer: question.expectedAnswer,
        };
      }),
      qualifications: (values.qualifications || []).map((qualification) => {
        return {
          body: qualification.body,
          kind: qualification.kind,
        };
      }),
      skills: (values.skills || []).map((skill) => {
        return {
          name: skill.name,
          level: skill.level,
          isRequired: skill.isRequired,
        };
      }),
    };
    patchJob(formattedValues, {
      onSuccess(data: JobItem) {
        urlParams.set("step", "3");
        urlParams.set("jobId", data.id);
        router.replace(`/dashboard/jobs/create-job?${urlParams.toString()}`);
      },
    });
  };
  function goBack() {
    urlParams.set("step", "1");
    if (jobId) {
      urlParams.set("jobId", jobId);
    }
    router.replace(`/dashboard/jobs/create-job?${urlParams.toString()}`);
  }
  return (
    <div>
      <Formik initialValues={formInitialvalues} onSubmit={submit}>
        {({ isValid }) => {
          return (
            <Form className="space-y-6">
              <div className="grid sm:grid-cols-[2fr_1fr] gap-4">
                <div className="space-y-4">
                  <RoleRequirementsField name="qualifications" />
                  <SkillsAssessmentField name="skills" />
                  <ScreeningQuestionsField name="screeningQuestions" />
                </div>
                <div className="">
                  <div className="bg-white p-4 rounded-xl">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-2">
                          <div className="size-8 flex justify-center items-center rounded-md bg-primary text-white">
                            <Sparkles className="size-4" />
                          </div>
                          <div className="">
                            <div className="text-primary text-xs">
                              LIVE SIMULATION
                            </div>
                            <div className="font-bold">
                              Vita AI Match Engine
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-200 px-3 py-0.5 text-xs rounded-full">
                          Dynamic
                        </div>
                      </div>
                      <p className="text-xs">
                        HeyHR synthesizes applicant resumes, responses, and
                        verification benchmarks against your criteria to
                        calculate an objective match score.
                      </p>
                    </div>
                    <PieChartComponent
                      label="HIGH FIT"
                      labelValue="87%"
                      data={[
                        { name: "Skill", value: 87, fill: "#2563eb" },
                        // { name: "Exprience", value: 24, fill: "#dbe4f5" },
                      ]}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl space-y-4 sm:space-y-0 sm:flex justify-between shadow">
                <div className="flex gap-2 justify-between sm:justify-start">
                  <Button
                    onClick={goBack}
                    className="w-fit! bg-transparent! text-gray-800!"
                    label="Back"
                    icon={<ArrowLeft className="size-5" />}
                  />
                  <Button
                    className="w-fit! bg-gray-200! text-black!"
                    label="Save as Draft"
                    disabled={patchingJob}
                    icon={<Bookmark className="size-5" />}
                  />
                </div>
                <div className="flex gap-4 justify-between sm:justify-end">
                  <div className="">
                    <div className="text-sm">
                      Step 2 {isValid ? "Completed" : "Invalid"}
                    </div>
                    <div className="font-semibold">Next: Hiring Process</div>
                  </div>
                  <Button
                    className="w-fit!"
                    disabled={patchingJob}
                    isLoading={patchingJob}
                    label="Continue to Hiring Process"
                    rightIcon={<ArrowRight className="size-5" />}
                    type="submit"
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateJobStep2;
