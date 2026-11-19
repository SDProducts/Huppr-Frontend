"use client";

import { FieldArray, useField, useFormikContext } from "formik";
import {
  ArrowRight,
  BellDot,
  Bot,
  CalendarDays,
  FastForward,
  FishingHook,
  Mail,
  Plus,
  Sparkles,
  X,
} from "lucide-react";

import Button from "@/components/ui/CustomButton";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { AutomationKind } from "@/types/create_job_payload";

// export type RoleRequirement = {
//   id: string;
//   title: string;
//   category: RequirementCategory;
//   isEnabled: boolean;
//   note: string;
// };

type StageAutomationFieldProps = {
  name?: string;
  className?: string;
  stages: string[];
  activeStage: string;
};
export interface AutomationValues {
  kind: AutomationKind;
  stage: string;
  label: string;
  isEnabled: boolean;
  config: Record<string, unknown>;
}

const AUTOMATION_KIND: AutomationKind[] = [
  "email",
  "calendar",
  "notification",
  "stage_transition",
  "webhook",
];

const AUTOMATION_KIND_DETAILS: Record<AutomationKind, string> = {
  email: "Send Acknowledgement Email",
  stage_transition: "Fast-Track to Interview",
  calendar: "Self-Scheduling Booking Link",
  notification: "Notify Recruiter & Advance to Offer",
  webhook: "Anti-Ghosting Empathetic Email (24h Delay)",
};

function getAutomationKindIcon(kind: AutomationKind) {
  switch (kind) {
    case "email":
      return <Mail className="size-4" strokeWidth={3} />;
    case "stage_transition":
      return <FastForward className="size-4" strokeWidth={3} />;
    case "calendar":
      return <CalendarDays className="size-4" strokeWidth={3} />;
    case "notification":
      return <BellDot className="size-4" strokeWidth={3} />;
    case "webhook":
      return <FishingHook className="size-4" strokeWidth={3} />;
    default:
      return <Sparkles className="size-4" strokeWidth={3} />;
  }
}

export default function StageAutomationToggle({
  name = "automations",
  className,
  stages,
  activeStage,
}: StageAutomationFieldProps) {
  const [field, meta] = useField<AutomationValues[]>(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const automationRules = field.value ?? [];

  return (
    <section className={cn("rounded-2xl bg-white p-6 sm:p-8", className)}>
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <Bot className="mt-1 size-5 shrink-0 text-blue-600" />

          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Automated Stage Rules{" "}
            </h2>

            <p className="mt-1 max-w-lg text-sm text-slate-600">
              Set pipeline logic to run hands-free with zero friction{" "}
            </p>
          </div>
        </div>
      </div>

      <FieldArray name={name}>
        {({ remove }) => (
          <div className="space-y-1">
            {automationRules.map((rule, index) => {
              const isEnabled = rule.isEnabled;

              return (
                <div key={index} className={cn("rounded-xl bg-slate-50 p-4")}>
                  <div className="flex items-start gap-2">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      {getAutomationKindIcon(rule.kind)}
                    </div>

                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex items-center gap-1 text-sm">
                        <div className="bg-gray-200 rounded-sm py-1 px-2 font-semibold">
                          {activeStage} Stage
                        </div>
                        <div className="capitalize bg-primary/10 text-primary px-2 py-1 rounded-sm">
                          {rule.kind}
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground flex gap-1 items-center">
                        {rule.label}
                        <ArrowRight className="size-3" />
                        {AUTOMATION_KIND_DETAILS[rule.kind]}
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 pt-1">
                      <Switch
                        checked={isEnabled}
                        onCheckedChange={(checked) =>
                          setFieldValue(`${name}[${index}].isEnabled`, checked)
                        }
                        aria-label={`Must have rule ${index + 1}`}
                      />

                      <button
                        type="button"
                        onClick={() => remove(index)}
                        aria-label={`Remove requirement ${index + 1}`}
                        className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {automationRules.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center">
                <p className="text-sm text-slate-500">
                  No automation rules added yet.
                </p>
                <Button
                  //   onClick={}
                  className="mt-2 text-primary! w-fit! bg-transparent hover:underline underline-offset-4"
                  icon={<Plus className="mr-1 size-4" />}
                  label="Add your first rule"
                />
              </div>
            )}
          </div>
        )}
      </FieldArray>

      {meta.touched && meta.error && typeof meta.error === "string" && (
        <p className="mt-3 text-sm text-destructive">{meta.error}</p>
      )}
    </section>
  );
}
