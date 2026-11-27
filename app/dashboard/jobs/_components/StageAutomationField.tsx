"use client";

import { useField } from "formik";
import {
  BotOff,
  CalendarDays,
  ChevronDown,
  Info,
  Mail,
  Plus,
  Settings2,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";

import { Placeholder } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  AutomationCatalogItem,
  AutomationConfigField,
  AutomationConfigValue,
  StageAutomation,
} from "@/types/job_by_id";

interface StageAutomationsFieldProps {
  name: string;
  catalog?: AutomationCatalogItem[];
  disabled?: boolean;
  className?: string;
}

export const AUTOMATION_CATALOG: AutomationCatalogItem[] = [
  {
    id: "email",
    kind: "email",
    name: "Email notification",
    description:
      "Queues an email on stage entry. Delivery uses the configured notification worker; email delays are not supported.",
    group: "communication",
    trigger: "stage_enter",
    status: "ready",
    executable: true,
    configFields: [
      {
        key: "recipient",
        name: "Recipient",
        type: "string",
        description:
          "candidate sends to the applicant; hiring_team sends to the job hiring team.",
        required: false,
        options: ["candidate", "hiring_team"],
        default: "candidate",
      },
      {
        key: "subject",
        name: "Subject",
        type: "string",
        description: "Email subject; defaults to an application update.",
        required: false,
        maxLength: 160,
      },
      {
        key: "body",
        name: "Body",
        type: "string",
        description: "Plain-text email body; defaults to a stage update.",
        required: false,
      },
      {
        key: "reviewerRole",
        name: "Reviewer role",
        type: "string",
        description:
          "When sending to the hiring team, restrict recipients to this role label.",
        required: false,
      },
    ],
    configExample: {
      recipient: "candidate",
      subject: "Application received",
      body: "Thank you for applying.",
    },
  },
  {
    id: "calendar",
    kind: "calendar",
    name: "Create interview event",
    description:
      "Creates an internal company-calendar event and interview record. Does not sync Google/Outlook or provide self-booking.",
    group: "interview_scheduling",
    trigger: "stage_enter",
    status: "ready",
    executable: true,
    configFields: [
      {
        key: "startsAt",
        name: "Starts at",
        type: "datetime",
        description:
          "Absolute ISO 8601 start; otherwise calculate from delayHours.",
        required: false,
      },
      {
        key: "endsAt",
        name: "Ends at",
        type: "datetime",
        description:
          "Absolute ISO 8601 end; otherwise calculate from durationMinutes.",
        required: false,
      },
      {
        key: "delayHours",
        name: "Delay hours",
        type: "integer",
        description: "Hours after stage entry if startsAt is omitted.",
        required: false,
        minimum: 0,
        maximum: 8760,
        default: 24,
      },
      {
        key: "durationMinutes",
        name: "Duration minutes",
        type: "integer",
        description: "Interview duration when endsAt is omitted.",
        required: false,
        minimum: 15,
        maximum: 480,
        default: 30,
      },
      {
        key: "title",
        name: "Title",
        type: "string",
        description: "Event title; defaults to candidate and stage.",
        required: false,
        maxLength: 160,
      },
      {
        key: "description",
        name: "Description",
        type: "string",
        description: "Event description.",
        required: false,
      },
      {
        key: "location",
        name: "Location",
        type: "string",
        description: "Physical location.",
        required: false,
        maxLength: 300,
      },
      {
        key: "meetingUrl",
        name: "Meeting URL",
        type: "string",
        description: "Existing meeting link; no link is generated.",
        required: false,
        maxLength: 2048,
      },
      {
        key: "reviewerRole",
        name: "Reviewer role",
        type: "string",
        description:
          "Select hiring-team attendees by role label; defaults to the hiring team, then actor.",
        required: false,
      },
    ],
    configExample: {
      delayHours: 24,
      durationMinutes: 60,
      title: "Technical interview",
    },
  },
  {
    id: "reviewer_assignment",
    kind: "reviewer_assignment",
    name: "Assign reviewers",
    description:
      "Assigns reviewers who belong to the workspace and sends internal notifications.",
    group: "reviewers",
    trigger: "stage_enter",
    status: "ready",
    executable: true,
    configFields: [
      {
        key: "reviewerUserIds",
        name: "Reviewer user IDs",
        type: "uuid_array",
        description:
          "Explicit reviewer user IDs from this workspace. Falls back to hiring team/reporting manager if none are eligible.",
        required: false,
      },
      {
        key: "reviewerRole",
        name: "Reviewer role",
        type: "string",
        description: "Filter the fallback hiring team by role label.",
        required: false,
      },
      {
        key: "reason",
        name: "Reason",
        type: "string",
        description: "Assignment reason recorded with each reviewer.",
        required: false,
        default: "stage_automation",
      },
    ],
    configExample: {
      reviewerRole: "reviewer",
      reason: "Technical review",
    },
  },
  {
    id: "ai_evaluation",
    kind: "ai_evaluation",
    name: "AI evaluation (deferred)",
    description:
      "Records a deferred placeholder. No real AI scoring, screening or evaluation is performed.",
    group: "ai_screening",
    trigger: "stage_enter",
    status: "deferred",
    executable: false,
    configFields: [],
    configExample: {},
  },
  {
    id: "custom",
    kind: "custom",
    name: "Custom rule (configuration only)",
    description:
      "Stores configuration; the executor records this rule as skipped. No custom action or external webhook is executed.",
    group: "custom",
    trigger: "stage_enter",
    status: "configuration_only",
    executable: false,
    configFields: [],
    configExample: {},
  },
];

function getAutomationIcon(kind: string) {
  switch (kind) {
    case "email":
      return Mail;
    case "calendar":
      return CalendarDays;
    case "reviewer_assignment":
      return Users;
    case "ai_evaluation":
      return Sparkles;
    default:
      return Settings2;
  }
}

function getAutomationBadge(kind: string) {
  switch (kind) {
    case "email":
      return "EMAIL";
    case "calendar":
      return "CALENDAR";
    case "reviewer_assignment":
      return "REVIEWERS";
    case "ai_evaluation":
      return "VITA AI";
    default:
      return "CUSTOM";
  }
}

function getInitialConfig(
  automation: AutomationCatalogItem
): Record<string, AutomationConfigValue> {
  const config: Record<string, AutomationConfigValue> = {
    ...automation.configExample,
  };

  automation.configFields.forEach((field) => {
    if (field.default !== undefined) {
      config[field.key] = field.default;
    }
  });

  return config;
}
function getDateTimeInputValue(value: AutomationConfigValue) {
  if (typeof value !== "string" || !value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const offset = date.getTimezoneOffset() * 60000;

  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function AutomationConfigInput({
  field,
  value,
  onChange,
  disabled,
}: {
  field: AutomationConfigField;
  value: AutomationConfigValue;
  onChange: (value: AutomationConfigValue) => void;
  disabled?: boolean;
}) {
  const inputClassName =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-slate-50";

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">
        {field.name}
        {field.required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {field.options?.length ? (
        <div className="relative">
          <select
            value={typeof value === "string" ? value : ""}
            onChange={(event) => onChange(event.target.value)}
            disabled={disabled}
            required={field.required}
            className={cn(inputClassName, "appearance-none pr-9")}
          >
            <option value="">Select {field.name.toLowerCase()}</option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option.replaceAll("_", " ")}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        </div>
      ) : field.type === "integer" ? (
        <input
          type="number"
          value={typeof value === "number" ? value : ""}
          onChange={(event) =>
            onChange(
              event.target.value === "" ? null : Number(event.target.value)
            )
          }
          min={field.minimum}
          max={field.maximum}
          disabled={disabled}
          required={field.required}
          className={inputClassName}
        />
      ) : field.type === "datetime" ? (
        <input
          type="datetime-local"
          value={getDateTimeInputValue(value)}
          onChange={(event) => {
            const nextValue = event.target.value;
            onChange(nextValue ? new Date(nextValue).toISOString() : null);
          }}
          disabled={disabled}
          required={field.required}
          className={inputClassName}
        />
      ) : field.type === "uuid_array" ? (
        <textarea
          value={Array.isArray(value) ? value.join("\n") : ""}
          onChange={(event) =>
            onChange(
              event.target.value
                .split(/[\n,]/)
                .map((item) => item.trim())
                .filter(Boolean)
            )
          }
          placeholder="Enter one reviewer ID per line"
          rows={3}
          disabled={disabled}
          required={field.required}
          className={cn(inputClassName, "resize-y")}
        />
      ) : field.key === "body" || field.key === "description" ? (
        <textarea
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChange(event.target.value)}
          rows={3}
          maxLength={field.maxLength}
          disabled={disabled}
          required={field.required}
          className={cn(inputClassName, "resize-y")}
        />
      ) : (
        <input
          type="text"
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChange(event.target.value)}
          maxLength={field.maxLength}
          disabled={disabled}
          required={field.required}
          className={inputClassName}
        />
      )}

      {field.description && (
        <p className="text-xs leading-5 text-slate-400">{field.description}</p>
      )}
    </div>
  );
}

export default function StageAutomationsField({
  name,
  catalog = AUTOMATION_CATALOG,
  disabled = false,
  className,
}: StageAutomationsFieldProps) {
  const [field, , helpers] = useField<StageAutomation[]>(name);
  const [selectedAutomation, setSelectedAutomation] = useState("");

  const automations = Array.isArray(field.value) ? field.value : [];

  const availableAutomations = catalog;

  const enabledCount = automations.filter(
    (automation) => automation.isEnabled
  ).length;

  const updateAutomation = (
    index: number,
    updates: Partial<StageAutomation>
  ) => {
    const updated = automations.map((automation, i) =>
      i === index ? { ...automation, ...updates } : automation
    );

    helpers.setValue(updated);
  };

  const updateConfig = (
    index: number,
    key: string,
    value: AutomationConfigValue
  ) => {
    const automation = automations[index];

    updateAutomation(index, {
      config: {
        ...automation.config,
        [key]: value,
      },
    });
  };

  const addAutomation = () => {
    if (!selectedAutomation) return;

    const catalogItem = catalog.find((item) => item.id === selectedAutomation);

    if (!catalogItem) return;

    const newAutomation: StageAutomation = {
      kind: catalogItem.kind,
      label: catalogItem.name,
      isEnabled: true,
      config: getInitialConfig(catalogItem),
    };

    helpers.setValue([...automations, newAutomation]);
    setSelectedAutomation("");
  };
  const removeAutomation = (index: number) => {
    helpers.setValue(automations.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Selected automations */}
      <div className="space-y-3">
        {automations.length > 0 || selectedAutomation ? (
          automations.map((automation, index) => {
            const catalogItem = catalog.find(
              (item) => item.kind === automation.kind
            );

            if (!catalogItem) return null;

            const Icon = getAutomationIcon(automation.kind);
            const isAi = automation.kind === "ai_evaluation";

            return (
              <div
                key={`${automation.kind}-${index}`}
                className={cn(
                  "overflow-hidden rounded-2xl border p-4 sm:p-5",
                  isAi
                    ? "border-purple-100 bg-purple-50/60"
                    : "border-blue-100 bg-blue-50/40",
                  !automation.isEnabled && "opacity-70"
                )}
              >
                {/* Automation heading */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Icon
                        className={cn(
                          "size-4",
                          isAi ? "text-purple-700" : "text-blue-600"
                        )}
                      />

                      <h4 className="text-sm font-semibold text-slate-900">
                        {automation.label}
                      </h4>

                      <span
                        className={cn(
                          "rounded-md px-2 py-1 text-[10px] font-semibold",
                          isAi
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        )}
                      >
                        {getAutomationBadge(automation.kind)}
                      </span>
                    </div>

                    <p className="text-xs leading-5 text-slate-500">
                      {catalogItem.description}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Switch
                      checked={automation.isEnabled}
                      onCheckedChange={(checked) =>
                        updateAutomation(index, { isEnabled: checked })
                      }
                      disabled={disabled}
                      aria-label={`Enable ${automation.label}`}
                    />

                    <button
                      type="button"
                      onClick={() => removeAutomation(index)}
                      disabled={disabled}
                      className="rounded-md p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed"
                      aria-label={`Remove ${automation.label}`}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Automation configuration */}
                {catalogItem.configFields.length > 0 && (
                  <div className="mt-4 space-y-4 border-t border-slate-200/70 pt-4">
                    <div className="flex items-center gap-2">
                      <Settings2 className="size-3.5 text-slate-500" />
                      <span className="text-xs font-semibold text-slate-700">
                        Automation configuration
                      </span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {catalogItem.configFields.map((configField) => (
                        <div
                          key={configField.key}
                          className={
                            configField.key === "body" ||
                            configField.key === "description" ||
                            configField.key === "reviewerUserIds"
                              ? "sm:col-span-2"
                              : ""
                          }
                        >
                          <AutomationConfigInput
                            field={configField}
                            value={automation.config?.[configField.key] ?? ""}
                            disabled={disabled || !automation.isEnabled}
                            onChange={(value) =>
                              updateConfig(index, configField.key, value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Non-executable automation warning */}
                {!catalogItem.executable && (
                  <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800">
                    <Info className="mt-0.5 size-4 shrink-0" />
                    <span>
                      {catalogItem.status === "deferred"
                        ? "This automation is deferred. It can be configured and stored, but actual AI evaluation is not currently executed."
                        : "This rule is configuration-only. It will be stored, but no custom action or external webhook will execute."}
                    </span>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <Placeholder
            title="No Automations"
            icon={BotOff}
            description="No automations set yet."
            actionLabel="Setup Automations"
            onAction={async () => {
              setSelectedAutomation(availableAutomations[0].id);
            }}
            className="py-4"
          />
        )}
      </div>

      {/* Add automation */}
      {availableAutomations.length > 0 && (
        <div className="flex flex-col gap-2 rounded-xl border border-dashed border-slate-300 p-3 sm:flex-row">
          <div className="relative flex-1">
            <select
              value={selectedAutomation}
              onChange={(event) => setSelectedAutomation(event.target.value)}
              disabled={disabled}
              className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed"
            >
              <option value="">Select an automation to add</option>

              {availableAutomations.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                  {!item.executable ? " (Not executable)" : ""}
                </option>
              ))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={addAutomation}
            disabled={disabled || !selectedAutomation}
            className="py-2 h-10 text-xs text-slate-600 hover:border-primary hover:text-primary"
          >
            <Plus className="size-4" />
            Add Automation Rule
          </Button>
        </div>
      )}

      {availableAutomations.length === 0 && (
        <p className="rounded-lg bg-slate-50 p-3 text-center text-xs text-slate-500">
          All available automation rules have been added.
        </p>
      )}
    </div>
  );
}
