"use client";

import { FieldArray, useField, useFormikContext } from "formik";
import {
  BellDot,
  CalendarDays,
  FastForward,
  FishingHook,
  Mail,
  Sparkles,
  X,
} from "lucide-react";

// import Button from "@/components/ui/CustomButton";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn, labelCase } from "@/lib/utils";

type Props = {
  name?: string;
  className?: string;
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
  "stage_transition",
  "calendar",
  "notification",
  "webhook",
  "reviewer_assignment",
  "ai_evaluation",
  "custom",
];

export type AutomationKind =
  | "email"
  | "stage_transition"
  | "calendar"
  | "notification"
  | "webhook"
  | "reviewer_assignment"
  | "ai_evaluation"
  | "custom"
  | (string & {});

export interface AutomationConfig {
  recipient?: string;
  subject?: string;
  followUpDays?: number;
  reminderHoursBefore?: number;
  timingHoursBefore?: number;
  slotDurationMinutes?: number;
  bufferMinutes?: number;
  score?: number;
  threshold?: number;
  ratingThreshold?: number;
  targetStageName?: string;
  url?: string;
  channel?: string;
  [key: string]: unknown;
}

export interface AutomationItemLike {
  kind: AutomationKind;
  label?: string;
  config?: AutomationConfig | null;
  stageName?: string;
}

function formatRecipient(recipient?: string): string {
  if (!recipient) return "the recipient";
  return recipient.replaceAll("_", " ");
}

export function getAutomationDescription(item: AutomationItemLike): string {
  const config = item.config ?? {};
  const label = item.label?.trim() ?? "";
  const lowerLabel = label.toLowerCase();

  switch (item.kind) {
    case "email": {
      const recipient = formatRecipient(config.recipient);
      const parts: string[] = [`Sends an automated email to ${recipient}`];

      if (typeof config.subject === "string" && config.subject.trim()) {
        parts.push(`with subject "${config.subject.trim()}"`);
      } else if (label) {
        parts.push(`for "${label}"`);
      }

      if (typeof config.reminderHoursBefore === "number") {
        parts.push(`${config.reminderHoursBefore}h before the deadline`);
      } else if (typeof config.timingHoursBefore === "number") {
        parts.push(`${config.timingHoursBefore}h before the scheduled time`);
      }

      if (typeof config.followUpDays === "number") {
        parts.push(`with a follow-up after ${config.followUpDays} day(s)`);
      }

      return `${parts.join(" ")}.`;
    }

    case "calendar": {
      const hasSlot = typeof config.slotDurationMinutes === "number";
      const hasBuffer = typeof config.bufferMinutes === "number";

      if (hasSlot || hasBuffer) {
        const details: string[] = [];
        if (hasSlot) details.push(`${config.slotDurationMinutes}-min slots`);
        if (hasBuffer) details.push(`${config.bufferMinutes}-min buffer`);
        return `Enables candidate self-scheduling on the calendar (${details.join(
          ", "
        )}).`;
      }

      return label
        ? `Automates calendar scheduling for "${label}".`
        : "Automates interview calendar scheduling.";
    }

    case "stage_transition": {
      if (
        typeof config.targetStageName === "string" &&
        config.targetStageName.trim()
      ) {
        return `Moves candidates to the "${config.targetStageName.trim()}" stage automatically.`;
      }
      return "Automatically transitions candidates between pipeline stages.";
    }

    case "notification": {
      const recipient = config.recipient
        ? ` to ${formatRecipient(config.recipient)}`
        : "";
      const channel =
        typeof config.channel === "string" && config.channel.trim()
          ? ` via ${config.channel.trim()}`
          : "";
      return `Sends an in-app notification${recipient}${channel}${
        label ? ` for "${label}"` : ""
      }.`;
    }

    case "webhook": {
      if (typeof config.url === "string" && config.url.trim()) {
        return `Sends a webhook payload to ${config.url.trim()}.`;
      }
      return "Triggers an external webhook event when conditions are met.";
    }

    case "reviewer_assignment": {
      return label
        ? `Assigns reviewers and triggers "${label}".`
        : "Assigns reviewers and requests evaluation feedback.";
    }

    case "ai_evaluation": {
      return label
        ? `Runs AI evaluation ("${label}") on candidate profiles.`
        : "Automatically scores and evaluates candidates using AI.";
    }

    case "custom":
    default: {
      if (typeof config.score === "number") {
        return `Routes candidates when their match score reaches ${config.score} or higher.`;
      }

      if (typeof config.threshold === "number") {
        if (lowerLabel.includes("below")) {
          return `Triggers "${
            label || "rule"
          }" when a candidate's score is below ${config.threshold}.`;
        }
        if (lowerLabel.includes("above")) {
          return `Triggers "${
            label || "rule"
          }" when a candidate's score is above ${config.threshold}.`;
        }
        return `Evaluates candidates against a score threshold of ${config.threshold}.`;
      }

      if (typeof config.ratingThreshold === "number") {
        return `Routes candidates based on an interview rating threshold of ${config.ratingThreshold}.`;
      }

      if (label) {
        return `Executes the "${label}" automation rule${
          item.stageName ? ` in ${item.stageName}` : ""
        }.`;
      }

      return "Executes a custom workflow automation.";
    }
  }
}

// const AUTOMATION_KIND_DETAILS: Record<AutomationKind, string> = {
//   email: "Send Acknowledgement Email",
//   stage_transition: "Fast-Track to Interview",
//   calendar: "Self-Scheduling Booking Link",
//   notification: "Notify Recruiter & Advance to Offer",
//   webhook: "Anti-Ghosting Empathetic Email (24h Delay)",
// };

function getAutomationKindIcon(kind: AutomationKind) {
  switch (kind) {
    case "email":
      return <Mail className="size-3.5" strokeWidth={2} />;
    case "stage_transition":
      return <FastForward className="size-3.5" strokeWidth={2} />;
    case "calendar":
      return <CalendarDays className="size-3.5" strokeWidth={2} />;
    case "notification":
      return <BellDot className="size-3.5" strokeWidth={2} />;
    case "webhook":
      return <FishingHook className="size-3.5" strokeWidth={2} />;
    default:
      return <Sparkles className="size-3.5" strokeWidth={2} />;
  }
}

export default function AutomationToggle({
  name = "automations",
  className,
}: Props) {
  const [field, meta] = useField<AutomationCatalogWithConfig[]>(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const automationRules = field.value ?? [];
  const allEnabled =
    automationRules.length > 0 &&
    automationRules.every((rule) => rule.isEnabled);

  const toggleAll = (checked: boolean) => {
    setFieldValue(
      name,
      automationRules.map((rule) => ({
        ...rule,
        isEnabled: checked,
      }))
    );

    setFieldTouched(name, true, false);
  };
  return (
    <section className={cn("", className)}>
      {automationRules.length > 0 && (
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-700">
            {allEnabled ? "All automations enabled" : "Manage all automations"}
          </p>

          <Button variant={"ghost"} onClick={() => toggleAll(!allEnabled)}>
            <span>{allEnabled ? "Disable" : "Enable"} All</span>
          </Button>
        </div>
      )}
      <FieldArray name={name}>
        {({ remove }) => (
          <div className="space-y-1">
            {automationRules.map((rule, index) => {
              const isEnabled = rule.isEnabled;

              return (
                <div key={index} className={cn("rounded-md bg-slate-50 p-3")}>
                  <div className="flex items-start gap-2">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-sm bg-blue-100 text-blue-600">
                      {getAutomationKindIcon(rule.kind)}
                    </div>

                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex items-center gap-1 text-xs">
                        <div className="capitalize bg-primary/10 text-primary px-2 py-1 rounded-sm">
                          {labelCase(rule.kind)}
                        </div>
                        <div className="bg-gray-200 rounded-sm py-1 px-2 font-semibold">
                          {rule.label}
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground flex gap-1 items-center line-clamp-1">
                        {getAutomationDescription(rule)}
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
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
