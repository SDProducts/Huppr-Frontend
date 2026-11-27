import ActivityEmptyState from "@/components/EmptyState";
import { TaskStatusPill } from "@/components/utils/Pills";
import { cn, getCurrency, GRID_COLS, labelCase } from "@/lib/utils";
import { JobDetailResponse } from "@/types/job_by_id";
import {
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  Network,
  RefreshCcw,
  SlidersHorizontal,
} from "lucide-react";
interface Prop {
  jobData: JobDetailResponse;
}
export default function JobDetail({ jobData }: Prop) {
  const automations = jobData.stages.flatMap((stage, stageIndex) =>
    stage.automations.map((automation, i) => (
      <div
        className="flex items-center gap-1"
        key={`${stage.id ?? stageIndex}-${automation.label ?? i}`}
      >
        <Bot className="text-primary size-4" />
        <div className="flex-1 text-xs">{automation.label}</div>
        <div className="">
          <TaskStatusPill
            status={automation.isEnabled ? "enabled" : "disabled"}
          />
        </div>
      </div>
    ))
  );

  return (
    <div>
      <div className="">
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
                  <div className="font-bold text-xl">Job Description</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-6 bg-slate-100 rounded-xl">
                <div className="grid sm:grid-cols-2">
                  <div className="space-y-1">
                    <div className="text-xl font-bold">{jobData.title}</div>
                    <div className="text-sm">
                      {"Department name"} • {labelCase(jobData.employmentType)}
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-bold text-lg">
                      {getCurrency(jobData.salaryMin, jobData.currency)} -{" "}
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
              <div className="text-sm text-gray-500">{jobData.summary}</div>
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
                    <div className="flex-1 line-clamp-1" title={item.body}>
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
                    <div className="flex-1 line-clamp-1" title={item.label}>
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
                  <div className="font-bold text-xl">
                    ATS & Screening Engine
                  </div>
                </div>
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
                    Hard Requirements ({jobData.qualifications.length} Active)
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
              <div className="font-bold">Screening Questions & Weights</div>
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
                      <div className="flex-1 line-clamp-1" title={item.prompt}>
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
                  <Network className="size-4 text-primary" strokeWidth={2.5} />
                </div>
                <div className="">
                  <div className="font-bold text-xl">
                    Pipeline & Assessment Setup
                  </div>
                </div>
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
              <div className="bg-slate-100 p-4 rounded-lg space-y-5">
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
        <div className=""></div>
      </div>
    </div>
  );
}
