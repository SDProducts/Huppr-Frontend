"use client";

import { FieldArray, useField, useFormikContext } from "formik";
import {
  ArrowRight,
  BellDot,
  Bot,
  CalendarSync,
  FastForward,
  FishingHook,
  Mail,
  Plus,
  Sparkles,
  X,
} from "lucide-react";

import Button from "@/components/ui/CustomButton";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn, labelCase } from "@/lib/utils";
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
      return <Mail className="size-4" />;
    case "stage_transition":
      return <FastForward className="size-4" />;
    case "calendar":
      return <CalendarSync className="size-4" />;
    case "notification":
      return <BellDot className="size-4" />;
    case "webhook":
      return <FishingHook className="size-4" />;
    default:
      return <Sparkles className="size-4" />;
  }
}

export default function StageAutomationField({
  name = "automations",
  className,
  stages,
  activeStage,
}: StageAutomationFieldProps) {
  const [field, meta] = useField<AutomationValues[]>(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const automationRules = field.value ?? [];

  const addRule = () => {
    const newautomationRule: AutomationValues = {
      kind: "",
      label: "",
      stage: activeStage,
      isEnabled: true,
      config: {},
    };

    setFieldValue(name, [...automationRules, newautomationRule]);
  };

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

        <Button
          onClick={addRule}
          className="shrink-0 w-fit! gap-2 self-start bg-slate-100 text-primary! text-sm hover:bg-slate-200 sm:self-center"
          icon={<Plus className="size-4" />}
          label="Add Custom Rule"
        />
      </div>

      <FieldArray name={name}>
        {({ remove }) => (
          <div className="space-y-3">
            {automationRules.map((rule, index) => {
              const isEnabled = rule.isEnabled;

              return (
                <div key={index} className={cn("rounded-xl bg-slate-50 p-4")}>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      {getAutomationKindIcon(rule.kind)}
                    </div>

                    <div className="min-w-0 flex-1 space-y-0">
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-200 rounded-sm p-1">
                          <select
                            id={`${name}-${index}-stage`}
                            value={rule.stage}
                            // disabled={!isEnabled}
                            onChange={(event) => {
                              const stage = event.target.value;

                              setFieldValue(`${name}[${index}].stage`, stage);
                            }}
                            className="h-fit w-fit max-w-full p-0  border-0 font-bold  text-xs text-slate-600 outline-none uppercase"
                          >
                            {stages.map((stage) => (
                              <option key={stage} value={stage}>
                                {stage}
                              </option>
                            ))}
                          </select>
                        </div>
                        <ArrowRight className="size-4" />

                        <Input
                          value={rule.label}
                          // disabled={!isEnabled}
                          onChange={(event) =>
                            setFieldValue(
                              `${name}[${index}].title`,
                              event.target.value
                            )
                          }
                          onBlur={() =>
                            setFieldTouched(`${name}[${index}].title`, true)
                          }
                          placeholder="Enter a role rule..."
                          aria-label={`rule ${index + 1} title`}
                          className="h-auto min-h-7 border-transparent bg-transparent px-0 py-0 text-sm font-semibold text-slate-900 shadow-none focus-visible:border-transparent focus-visible:ring-0"
                        />
                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <div className="border px-1 rounded-sm border-gray-200">
                          <label
                            className="sr-only"
                            htmlFor={`${name}-${index}-category`}
                          >
                            Requirement category
                          </label>
                          <select
                            id={`${name}-${index}-kind`}
                            value={rule.kind}
                            // disabled={!isEnabled}
                            onChange={(event) => {
                              const kind = event.target.value as AutomationKind;

                              setFieldValue(`${name}[${index}].kind`, kind);
                              setFieldValue(
                                `${name}[${index}].label`,
                                AUTOMATION_KIND_DETAILS[kind]
                              );
                            }}
                            className="h-7 w-fit max-w-full rounded-sm border-0 bg-transparent p-0 text-xs text-slate-600 outline-none"
                          >
                            {AUTOMATION_KIND.map((kind) => (
                              <option key={kind} value={kind}>
                                {labelCase(kind)}
                              </option>
                            ))}
                          </select>
                        </div>

                        <span className="hidden text-slate-400 sm:inline">
                          •
                        </span>

                        <Input
                          value={rule.label}
                          // disabled={!isEnabled}
                          onChange={(event) =>
                            setFieldValue(
                              `${name}[${index}].note`,
                              event.target.value
                            )
                          }
                          placeholder="Screening note"
                          aria-label={`Requirement ${index + 1} screening note`}
                          className="h-7 border-transparent bg-transparent px-0 text-xs text-slate-600 shadow-none focus-visible:border-transparent focus-visible:ring-0"
                        />
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
                  onClick={addRule}
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
