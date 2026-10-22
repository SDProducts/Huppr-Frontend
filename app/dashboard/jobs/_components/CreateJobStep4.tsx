"use client";
import ActivityEmptyState from "@/components/EmptyState";
import SwitchField from "@/components/form/SwitchField";
import { PageLoader } from "@/components/global/PageLoader";
import Button from "@/components/ui/CustomButton";
import {
  useGetJobById,
  usePatchJob,
  usePublishJob,
} from "@/hooks/employer/useJobs";
import { cn, getCurrency, GRID_COLS, labelCase } from "@/lib/utils";
import { Form, Formik } from "formik";
import {
  ArrowLeft,
  Bookmark,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  Network,
  Pen,
  RefreshCcw,
  Rocket,
  Share2,
  SlidersHorizontal,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CreateJobStep4() {
  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams();
  const router = useRouter();
  const jobId = searchParams.get("jobId");
  const { data: jobData, isLoading: isgettingJob } = useGetJobById(jobId || "");
  const { mutate: patchJob, isPending: patchingJob } = usePatchJob(jobId || "");
  const { mutate: publishJob, isPending: isPublishing } = usePublishJob(
    jobId || ""
  );

  if (isgettingJob || !jobData) {
    return <PageLoader />;
  }
  const automations = jobData.stages.flatMap((stage, stageIndex) =>
    stage.automations.map((automation, i) => (
      <div
        className="flex items-center gap-1"
        key={`${stage.id ?? stageIndex}-${automation.label ?? i}`}
      >
        <Bot className="text-primary size-3" />
        {automation.label}
      </div>
    ))
  );
  function publish(values: typeof initialValues) {
    patchJob(values, {
      onSuccess() {
        publishJob();
      },
    });
  }
  //   const options = jobData.channels.map((item) => ({
  //     label: item.channel,
  //     isEnabled: item.isEnabled,
  //   }));
  const initialValues = {
    channels: jobData.channels,
  };
  function goBack() {
    urlParams.set("step", "3");
    if (jobId) {
      urlParams.set("jobId", jobId);
    }
    router.replace(`/dashboard/jobs/create-job?${urlParams.toString()}`);
  }
  class Edit {
    step(step: string) {
      urlParams.set("step", step);
      if (jobId) {
        urlParams.set("jobId", jobId);
      }
      router.replace(`/dashboard/jobs/create-job?${urlParams.toString()}`);
    }
  }
  const edit = new Edit();
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={publish}>
        {({ isValid }) => {
          return (
            <Form className="space-y-20">
              <div className="grid grid-cols-[2fr_1fr] gap-4">
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-xl space-y-8">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-2">
                        <div className="size-8 bg-primary/5 rounded-md flex justify-center items-center">
                          <BriefcaseBusiness
                            className="size-4 text-primary"
                            strokeWidth={2.5}
                          />
                        </div>
                        <div className="">
                          <div className="uppercase text-sm text-gray-400">
                            Step 01 config
                          </div>
                          <div className="font-bold text-xl">
                            Job Description
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <Button
                          onClick={() => edit.step("1")}
                          label="Edit Section"
                          className="bg-primary/20! text-primary! text-sm w-fit! font-semibold"
                          icon={<Pen className="size-2.5" />}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-6 bg-slate-100 rounded-xl">
                        <div className="grid sm:grid-cols-2">
                          <div className="space-y-1">
                            <div className="text-xl font-bold">
                              {jobData.title}
                            </div>
                            <div className="text-sm">
                              {"Department name"} •{" "}
                              {labelCase(jobData.employmentType)}
                            </div>
                          </div>
                          <div className="text-right space-y-1">
                            <div className="font-bold text-lg">
                              {getCurrency(jobData.salaryMin, jobData.currency)}{" "}
                              -{" "}
                              {getCurrency(jobData.salaryMin, jobData.currency)}
                            </div>
                            <div className="text-sm">
                              {labelCase(jobData.workArrangement)}{" "}
                              {`(${jobData.locationCity})`}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-slate-100 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1">
                          <RefreshCcw className="size-4 text-primary" />
                          <div className="text-sm">
                            Linked to Organisation Role PD-L4-2024{" "}
                            <span>(Editable Overide enabled)</span>
                          </div>
                        </div>
                        <CheckCircle2 className="size-4 text-primary" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-bold">Job Overview</div>
                      <div className="text-sm text-gray-500">
                        {jobData.summary}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="font-bold">
                        Key Responsibilities ({jobData.responsibilities.length})
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {jobData.responsibilities.map((item) => (
                          <div
                            className="bg-slate-100 p-2 rounded-lg flex items-center gap-1 text-sm"
                            key={item.id}
                          >
                            <CheckCircle2 className="size-3" />
                            <div
                              className="flex-1 line-clamp-1"
                              title={item.body}
                            >
                              {item.body}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="font-bold">
                        Selected Benefits ({jobData.benefits.length})
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {jobData.benefits.map((item) => (
                          <div
                            className="bg-slate-100 p-2 rounded-full flex items-center gap-1 text-sm"
                            key={item.id}
                          >
                            <div
                              className="flex-1 line-clamp-1"
                              title={item.label}
                            >
                              {item.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl space-y-8">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-2">
                        <div className="size-8 bg-primary/5 rounded-md flex justify-center items-center">
                          <SlidersHorizontal
                            className="size-4 text-primary"
                            strokeWidth={2.5}
                          />
                        </div>
                        <div className="">
                          <div className="uppercase text-sm text-gray-400">
                            Step 02 config
                          </div>
                          <div className="font-bold text-xl">
                            ATS & Screening Engine
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <Button
                          onClick={() => edit.step("2")}
                          label="Edit Section"
                          className="bg-primary/20! text-primary! text-sm w-fit! font-semibold"
                          icon={<Pen className="size-2.5" />}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-[1fr_2fr] gap-2">
                      <div className="p-4 rounded-lg bg-slate-100 space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="">AI Match Engine</div>
                          <Bot className="size-4 text-primary" />
                        </div>
                        <div className="font-black text-3xl">80%</div>
                        <div className="text-sm text-gray-500">
                          Real-time CV vector parsing with Vita AI.
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-slate-100 space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="font-bold">
                            Hard Requirements ({jobData.qualifications.length}{" "}
                            Active)
                          </div>
                          <div className="text-xs text-red-700 bg-red-500/10 p-2 rounded-xl">
                            Knockout Enabled
                          </div>
                        </div>
                        <ul className="list-disc list-inside text-sm">
                          {jobData.qualifications.map((item) => (
                            <li className="" key={item.id}>
                              {item.body}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="font-bold">
                        Screening Questions & Weights
                      </div>
                      <div className="grid gap-2">
                        {jobData.screeningQuestions.map((item, i) => (
                          <div
                            className="bg-slate-100 p-2 rounded-lg flex items-center justify-between gap-1 text-sm"
                            key={i}
                          >
                            <div className="flex items-center gap-2">
                              <div className="size-7 rounded-md flex justify-center items-center bg-slate-200">
                                Q{i + 1}
                              </div>
                              <div
                                className="flex-1 line-clamp-1"
                                title={item.prompt}
                              >
                                {item.prompt}
                              </div>
                            </div>
                            <div className="px-3 bg-primary/10 py-0.5 rounded-2xl text-primary capitalize">
                              weight {item.weight}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl space-y-8">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-2">
                        <div className="size-8 bg-primary/5 rounded-md flex justify-center items-center">
                          <Network
                            className="size-4 text-primary"
                            strokeWidth={2.5}
                          />
                        </div>
                        <div className="">
                          <div className="uppercase text-sm text-gray-400">
                            Step 03 config
                          </div>
                          <div className="font-bold text-xl">
                            Pipeline & Assessment Setup
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <Button
                          onClick={() => edit.step("3")}
                          label="Edit Section"
                          className="bg-primary/20! text-primary! text-sm w-fit! font-semibold"
                          icon={<Pen className="size-2.5" />}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="uppercase text-sm text-gray-500 font-bold">
                        MINIATURIZED STAGES FLOW
                      </div>
                      <div
                        className={cn(
                          "grid gap-2",
                          GRID_COLS[jobData.stages.length] ?? "grid-cols-1"
                        )}
                      >
                        {jobData.stages.map((stage, i) => (
                          <div
                            className={cn("p-4 rounded-md")}
                            style={{
                              backgroundColor: stage.accent || "#F2F2FB",
                              color: stage.accent ? "white" : "black",
                            }}
                            key={i}
                          >
                            <div className="font-bold text-sm text-center">
                              <div className="">0{i + 1}.</div>
                              <div className="">{stage.name}</div>
                            </div>
                            <div className="line-clamp-1 text-xs opacity-50 text-center">
                              {stage.description || "..."}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-100 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <div className="font-bold">Assigned Team</div>
                          <div className="text-sm text-primary">
                            {jobData.hiringTeam.length} Reviewers
                          </div>
                        </div>
                        <ActivityEmptyState title="No team found" />
                      </div>
                      <div className="bg-slate-100 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <div className="font-bold">Automations</div>
                          <div className="text-sm bg-primary text-white px-3 py-0.5 rounded-full">
                            {jobData.automatedStageCount} Rules Active
                          </div>
                        </div>
                        <div className="">
                          {automations.length < 1 ? (
                            <ActivityEmptyState title="No automation found." />
                          ) : (
                            automations
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="bg-white p-6 rounded-xl">
                    <div className="flex gap-2">
                      <div className="size-8 flex justify-center items-center bg-primary/5 rounded-md">
                        <Share2 className="size-4" />
                      </div>
                      <div className="">
                        <div className="text-xl font-bold">
                          Publishing Channels
                        </div>
                        <div className="text-xs">
                          Manage where your role appears publicly
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <SwitchField
                        name="channels"
                        type="multiple"
                        optionClassName="bg-primary/5"
                        // options={options}
                      />
                    </div>
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
                    disabled={patchingJob || isPublishing}
                    icon={<Bookmark className="size-5" />}
                  />
                </div>
                <div className="flex gap-4 justify-between sm:justify-end">
                  <Button
                    className="w-fit!"
                    disabled={patchingJob || isPublishing || !isValid}
                    isLoading={patchingJob || isPublishing}
                    label="Publish Job Posting"
                    icon={<Rocket className="size-4.5" />}
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
}
