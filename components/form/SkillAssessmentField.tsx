"use client";

import { FieldArray, useField, useFormikContext } from "formik";
import { Award, Plus, ShieldCheck, Sparkles, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type SkillLevel = "working" | "proficient" | "expert";

export type Skill = {
  id?: string;
  name: string;
  level: SkillLevel;
  isRequired: boolean;
};

type SkillsAssessmentFieldProps = {
  name?: string;
  description?: string;
  className?: string;
  onSuggestMore?: () => void | Promise<void>;
};

const SKILL_LEVELS: {
  label: string;
  value: SkillLevel;
  className: string;
}[] = [
  {
    label: "Working",
    value: "working",
    className: "bg-slate-200 text-slate-600",
  },
  {
    label: "Proficient",
    value: "proficient",
    className: "bg-slate-200 text-slate-600",
  },
  {
    label: "Expert",
    value: "expert",
    className: "bg-indigo-100 text-blue-600",
  },
];

export default function SkillsAssessmentField({
  name = "skills",
  description = "Inherited from the job description. Vita AI scans resumes and portfolio artifacts for these tags.",
  className,
  onSuggestMore,
}: SkillsAssessmentFieldProps) {
  const [field, meta] = useField<Skill[]>(name);
  const { setFieldValue } = useFormikContext<Record<string, Skill[]>>();

  const skills: Skill[] = field.value ?? [];

  const [newSkill, setNewSkill] = React.useState("");
  const [newLevel, setNewLevel] = React.useState<SkillLevel>("proficient");
  const [newIsRequired, setNewIsRequired] = React.useState(true);
  const [isAdding, setIsAdding] = React.useState(false);

  const inputId = React.useId();

  const addSkill = (push: (skill: Skill) => void) => {
    const trimmedName = newSkill.trim();

    if (!trimmedName) return;

    const alreadyExists = skills.some(
      (skill) => skill.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (alreadyExists) {
      setNewSkill("");
      return;
    }

    push({
      name: trimmedName,
      level: newLevel,
      isRequired: newIsRequired,
    });

    setNewSkill("");
    setNewLevel("proficient");
    setNewIsRequired(true);
    setIsAdding(false);
  };

  return (
    <section
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5 sm:p-8",
        className
      )}
    >
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="flex items-start gap-3">
          <Award className="mt-1 size-6 shrink-0 text-blue-600" />

          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Skills Assessment &amp; Keywords
            </h2>

            <p className="mt-2 max-w-lg text-sm text-slate-600">
              {description}
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={onSuggestMore}
          disabled={!onSuggestMore}
          className="h-auto shrink-0 gap-2 whitespace-normal bg-blue-50 px-4 py-3 text-blue-600 hover:bg-blue-100 disabled:opacity-100"
        >
          <Sparkles className="size-4 shrink-0" />
          <span>
            AI Suggest
            <br />
            More
          </span>
        </Button>
      </div>

      <FieldArray name={name}>
        {({ push, remove }) => (
          <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-3">
              {skills.map((skill, index) => {
                const level =
                  SKILL_LEVELS.find((item) => item.value === skill.level) ??
                  SKILL_LEVELS[1];

                return (
                  <div
                    key={`${skill.name}-${index}`}
                    className="inline-flex min-w-0 max-w-full items-center gap-2 rounded-full border border-slate-100 bg-white py-1.5 pl-3 pr-2 shadow-sm"
                  >
                    <span className="max-w-[150px] truncate text-sm font-medium text-slate-900 sm:max-w-none">
                      {skill.name}
                    </span>

                    <label className="sr-only" htmlFor={`${inputId}-${index}`}>
                      {skill.name} proficiency level
                    </label>

                    <select
                      id={`${inputId}-${index}`}
                      value={skill.level}
                      onChange={(event) =>
                        setFieldValue(
                          `${name}[${index}].level`,
                          event.target.value
                        )
                      }
                      className={cn(
                        "max-w-[115px] cursor-pointer appearance-none rounded px-2 py-1 text-xs font-semibold outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                        level.className
                      )}
                    >
                      {SKILL_LEVELS.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      title={
                        skill.isRequired
                          ? "Mark as optional"
                          : "Mark as required"
                      }
                      aria-label={`${skill.name}: ${
                        skill.isRequired ? "required" : "optional"
                      }. Click to change.`}
                      onClick={() =>
                        setFieldValue(
                          `${name}[${index}].isRequired`,
                          !skill.isRequired
                        )
                      }
                      className={cn(
                        "rounded-full p-1 transition-colors hover:bg-slate-100",
                        skill.isRequired ? "text-blue-600" : "text-slate-300"
                      )}
                    >
                      <ShieldCheck className="size-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      aria-label={`Remove ${skill.name}`}
                      className="rounded-full p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                );
              })}

              <button
                type="button"
                onClick={() => setIsAdding((current) => !current)}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-100 bg-white px-3.5 py-2 text-sm font-medium text-blue-600 shadow-sm transition-colors hover:bg-blue-50"
              >
                <Plus className="size-4" />
                Add Skill
              </button>
            </div>

            {isAdding && (
              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
                <div
                  //   onSubmit={(event) => {
                  //     event.preventDefault();
                  //     addSkill(push);
                  //   }}
                  className="space-y-3"
                >
                  <label
                    htmlFor={`${inputId}-new`}
                    className="text-sm font-medium text-slate-700"
                  >
                    Skill name
                  </label>

                  <Input
                    id={`${inputId}-new`}
                    value={newSkill}
                    onChange={(event) => setNewSkill(event.target.value)}
                    placeholder="e.g. User Research"
                    autoFocus
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">
                        Proficiency level
                      </label>

                      <select
                        value={newLevel}
                        onChange={(event) =>
                          setNewLevel(event.target.value as SkillLevel)
                        }
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                      >
                        {SKILL_LEVELS.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">
                        Requirement
                      </label>

                      <select
                        value={String(newIsRequired)}
                        onChange={(event) =>
                          setNewIsRequired(event.target.value === "true")
                        }
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                      >
                        <option value="true">Required</option>
                        <option value="false">Preferred / Optional</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setIsAdding(false);
                        setNewSkill("");
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      //   type="submit"
                      onClick={() => addSkill(push)}
                      disabled={!newSkill.trim()}
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <Plus className="mr-1 size-4" />
                      Add Skill
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </FieldArray>
    </section>
  );
}
