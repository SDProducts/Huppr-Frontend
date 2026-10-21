"use client";
import ActivityEmptyState from "@/components/EmptyState";
import AssessmentSetupField from "@/components/form/AssessmentSetupField";
import StageAutomationsField from "@/components/form/StageAutomationField";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Button from "@/components/ui/CustomButton";
import { Progress } from "@/components/ui/progress";
import { useGetJobById, usePatchJob } from "@/hooks/employer/useJobs";
import { JobStage } from "@/types/create_job_payload";
import { Form, Formik } from "formik";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  LineChart,
  MoreVertical,
  UserPlus2,
  Users2,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { SortableStageCard } from "@/app/dashboard/jobs/_components/SortableStageCard";
import { arrayMove } from "@dnd-kit/sortable";

const CreateJobStep3 = () => {
  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams();
  const router = useRouter();
  const jobId = searchParams.get("jobId");
  const { data: jobData, isLoading: isgettingJob } = useGetJobById(jobId || "");
  const { mutate: patchJob, isPending: patchingJob } = usePatchJob(jobId || "");
  const [activeStage, setactiveStage] = useState("screening");
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (isgettingJob || !jobData) {
    return <div className="">Loading...</div>;
  }
  const job = jobData;
  const jobStages = job?.stages || [];
  const hiringTeam = job?.hiringTeam || [];
  const jobStagesValues: JobStage[] = jobStages.map((stage) => ({
    name: stage.name,
    description: stage.description,
    category: stage.category,
    accent: stage.accent,
    isAssessment: stage.isAssessment,
    automations: stage.automations.map((automation) => ({
      kind: automation.kind,
      label: automation.label,
      isEnabled: automation.isEnabled,
      config: automation.config,
    })),
  }));
  const formInitialvalues = {
    stages: jobStagesValues,
    automations: [],
  };
  const stageOptions = jobStages.map((stage) => stage.category);
  const submit = (values: typeof formInitialvalues) => {
    patchJob(values);
  };
  function goBack() {
    urlParams.set("step", "2");
    if (jobId) {
      urlParams.set("jobId", jobId);
    }
    router.replace(`/dashboard/jobs/create-job?${urlParams.toString()}`);
  }
  return (
    <div>
      <Formik initialValues={formInitialvalues} onSubmit={submit}>
        {({ isValid, values, setFieldValue }) => {
          const handleDragEnd = (event: DragEndEvent) => {
            const { active, over } = event;

            if (!over || active.id === over.id) return;

            const oldIndex = values.stages.findIndex(
              (stage) => stage.category === active.id
            );

            const newIndex = values.stages.findIndex(
              (stage) => stage.category === over.id
            );

            if (oldIndex === -1 || newIndex === -1) return;

            setFieldValue(
              "stages",
              arrayMove(values.stages, oldIndex, newIndex)
            );
          };

          return (
            <Form className="space-y-10">
              <div className="space-y-10">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <h2 className="font-bold text-xl">
                        Visual Recruitment Pipeline
                      </h2>
                      <div className="bg-gray-200 text-gray-500 px-3 py-1 text-xs rounded-full">
                        {jobStages.length} Active stages
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full gap-4 overflow-x-auto rounded-xl bg-white p-4">
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={values.stages.map((stage) => stage.category)}
                        strategy={horizontalListSortingStrategy}
                      >
                        {values.stages.map((stage, index) => (
                          <SortableStageCard
                            key={stage.category}
                            stage={stage}
                            index={index}
                            activeStage={activeStage}
                            onSelect={() => setactiveStage(stage.category)}
                          />
                        ))}
                      </SortableContext>
                    </DndContext>
                  </div>

                  {/* <div className="flex w-full overflow-x-scroll p-4 rounded-xl bg-white gap-4">
                    {jobStages.map((stage, i) => (
                      <div
                        className="flex items-center gap-4 cursor-pointer"
                        key={i}
                        onClick={() => setactiveStage(stage.category)}
                      >
                        {i > 0 && (
                          <div className="">
                            <ChevronRight
                              className={cn(
                                "size-10",
                                activeStage === stage.category
                                  ? "text-primary"
                                  : "text-gray-300"
                              )}
                              strokeWidth={4}
                            />
                          </div>
                        )}

                        <div
                          className={cn(
                            "p-4 rounded-lg w-55 space-y-4 relative",
                            activeStage === stage.category
                              ? "bg-primary/15 text-primary"
                              : "bg-primary/5"
                          )}
                        >
                          {activeStage === stage.category && (
                            <div className="absolute -top-2 right-4 bg-primary text-white px-3 py-0.5 rounded-full text-xs">
                              Configuring
                            </div>
                          )}
                          <div className="text-sm font-semibold">
                            0{i + 1} .{" "}
                            {activeStage === stage.category
                              ? "selected"
                              : "stage"}
                          </div>
                          <div className="">
                            <div className="font-bold">{stage.name}</div>
                            <div className="">{stage.description || "..."}</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="flex gap-1 text-xs items-center">
                              {stage.hasEnabledAutomation ? (
                                <>
                                  <Bot className="size-4" />
                                  Automated
                                </>
                              ) : (
                                <>
                                  <BotOff className="size-4" />
                                  Not Automated
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div> */}
                </div>
                <div className="grid grid-cols-[2fr_1fr] gap-4">
                  <div className="space-y-4 ">
                    <div className="bg-white rounded-2xl">
                      {values.stages.map((stage, index) => {
                        if (activeStage === stage.category) {
                          return (
                            <AssessmentSetupField
                              key={stage.category}
                              value={stage.assessment}
                              onChange={(assessment) =>
                                setFieldValue(
                                  `stages.${index}.assessment`,
                                  assessment
                                )
                              }
                              isAssessment={stage.isAssessment}
                              onIsAssessmentChange={(enabled) =>
                                setFieldValue(
                                  `stages.${index}.isAssessment`,
                                  enabled
                                )
                              }
                              assessmentTitle={`${stage.name} Assessment`}
                            />
                          );
                        }
                        return null;
                      })}
                    </div>
                    <div className="">
                      <StageAutomationsField
                        name="automations"
                        stages={stageOptions}
                        activeStage={activeStage}
                      />{" "}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl">
                      <div className="">
                        <div className="flex justify-between">
                          <div className="flex gap-1 items-center">
                            <Users2 className="size-4 text-primary" />
                            <h2 className="text-xl font-bold">Hiring Team</h2>
                          </div>
                          <Button
                            label="Add"
                            icon={<UserPlus2 className="size-3" />}
                            className="text-xs text-primary! w-fit! px-0! bg-transparent"
                          />
                        </div>
                        <p className="text-xs">
                          Assigned team members receive real-time notifications,
                          review scorecards, and attend stage evaluations.
                        </p>
                      </div>
                      <div className="">
                        {hiringTeam.length < 1 && (
                          <ActivityEmptyState title="No team found" />
                        )}
                        {hiringTeam.map((team, i) => (
                          <div
                            className="flex items-center gap-2 p-2 rounded-md bg-primary/5"
                            key={i}
                          >
                            <Avatar>
                              <AvatarImage src={team.userId} />
                              <AvatarFallback>MD</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 flex justify-between items-center">
                              <div className="">
                                <div className="">{team.userId}</div>
                                <div className="">{team.roleLabel}</div>
                              </div>
                              <div className="size-7 rounded-md hover:bg-gray-100">
                                <MoreVertical className="size-4" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl space-y-6">
                      <div className="">
                        <div className="flex justify-between">
                          <div className="flex gap-1 items-center">
                            {/* <Users2 className="size-4 text-primary" /> */}
                            <h2 className="text-xl font-bold">
                              Pipeline Efficency
                            </h2>
                          </div>
                          <Button
                            label="AI Prediction"
                            className="text-xs text-primary! w-fit! px-0! bg-transparent"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <div className="">Expected Time-to-Hire</div>
                            <div className="">18 - 22 Days</div>
                          </div>
                          <Progress indicatorClassName="" value={78} />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <div className="">Automation Ratio</div>
                            <div className="">64% Automated</div>
                          </div>
                          <Progress indicatorClassName="" value={64} />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="size-10 bg-primary/5 rounded-full flex justify-center items-center">
                          <LineChart className="size-5" />
                        </div>
                        <div className="flex-1 text-sm">
                          Adding an automatic test in Stage 3 reduces
                          unqualified panel interviews by 43%.
                        </div>
                      </div>
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

export default CreateJobStep3;
