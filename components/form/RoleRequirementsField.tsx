"use client";

import { FieldArray, useField, useFormikContext } from "formik";
import {
  Boxes,
  ClipboardCheck,
  Gauge,
  Plus,
  Shield,
  ShieldCheck,
  X,
} from "lucide-react";

import Button from "@/components/ui/CustomButton";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export type RequirementCategory =
  | "Experience"
  | "Skills"
  | "Compliance"
  | "Methodology"
  | "Education"
  | "Other";

export type RoleRequirement = {
  id: string;
  category: RequirementCategory;
  isMustHave: boolean;
  note: string;
  body: string;
  kind: string;
};

type RoleRequirementsFieldProps = {
  name?: string;
  className?: string;
};

const CATEGORIES: RequirementCategory[] = [
  "Experience",
  "Skills",
  "Compliance",
  "Methodology",
  "Education",
  "Other",
];

const CATEGORY_DETAILS: Record<RequirementCategory, string> = {
  Experience: "High weight in AI screening",
  Skills: "Automated token audit validation",
  Compliance: "Hard knockout if unverified",
  Methodology: "Adds bonus score weight",
  Education: "Education requirement",
  Other: "Additional screening criteria",
};

function getRequirementIcon(category: RequirementCategory) {
  switch (category) {
    case "Experience":
      return <Shield className="size-4" />;
    case "Skills":
      return <Boxes className="size-4" />;
    case "Compliance":
      return <ClipboardCheck className="size-4" />;
    case "Methodology":
      return <Gauge className="size-4" />;
    case "Education":
      return <ShieldCheck className="size-4" />;
    default:
      return <Shield className="size-4" />;
  }
}

export default function RoleRequirementsField({
  name = "requirements",
  className,
}: RoleRequirementsFieldProps) {
  const [field, meta] = useField<RoleRequirement[]>(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const requirements = field.value ?? [];

  const addRequirement = () => {
    const newRequirement: RoleRequirement = {
      id: `req-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      body: "",
      kind: "preferred",
      category: "Skills",
      isMustHave: false,
      note: CATEGORY_DETAILS.Skills,
    };

    setFieldValue(name, [...requirements, newRequirement]);
  };

  return (
    <section
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-6 sm:p-8",
        className
      )}
    >
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-1 size-5 shrink-0 text-blue-600" />

          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Role Requirements
            </h2>

            <p className="mt-1 max-w-lg text-sm text-slate-600">
              Set non-negotiable criteria. Candidates who do not meet Must-Have
              requirements will be flagged for review.
            </p>
          </div>
        </div>

        <Button
          onClick={addRequirement}
          className="shrink-0 w-fit! gap-2 self-start bg-slate-100 text-primary! text-sm hover:bg-slate-200 sm:self-center"
          icon={<Plus className="size-4" />}
          label="Add Requirement"
        />
      </div>

      <FieldArray name={name}>
        {({ remove }) => (
          <div className="space-y-3">
            {requirements.map((requirement, index) => {
              const isMustHave = requirement.kind === "must_have";

              return (
                <div
                  key={requirement.id}
                  className={cn("rounded-xl bg-slate-50 p-4")}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      {getRequirementIcon(requirement.category)}
                    </div>

                    <div className="min-w-0 flex-1 space-y-0">
                      <Input
                        value={requirement.body}
                        // disabled={!isMustHave}
                        onChange={(event) =>
                          setFieldValue(
                            `${name}[${index}].body`,
                            event.target.value
                          )
                        }
                        onBlur={() =>
                          setFieldTouched(`${name}[${index}].body`, true)
                        }
                        placeholder="Enter a role requirement..."
                        aria-label={`Requirement ${index + 1} body`}
                        className="h-auto min-h-7 border-transparent bg-transparent px-0 py-0 text-sm font-semibold text-slate-900 shadow-none focus-visible:border-transparent focus-visible:ring-0"
                      />

                      <div className="flex mt-1 flex-wrap items-center gap-2">
                        <button
                          type="button"
                          disabled={!isMustHave}
                          // onClick={() =>
                          //   setFieldValue(
                          //     `${name}[${index}].isMustHave`,
                          //     !isMustHave
                          //   )
                          // }
                          className={cn(
                            "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                            isMustHave
                              ? "bg-blue-600 text-white"
                              : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                          )}
                        >
                          {isMustHave ? "Must Have" : "Preferred"}
                        </button>
                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <label
                          className="sr-only"
                          htmlFor={`${name}-${index}-category`}
                        >
                          Requirement category
                        </label>

                        <select
                          id={`${name}-${index}-category`}
                          value={requirement.category}
                          // disabled={!isMustHave}
                          onChange={(event) => {
                            const category = event.target
                              .value as RequirementCategory;

                            setFieldValue(
                              `${name}[${index}].category`,
                              category
                            );
                            setFieldValue(
                              `${name}[${index}].note`,
                              CATEGORY_DETAILS[category]
                            );
                          }}
                          className="h-7 w-fit max-w-full rounded-md border-0 bg-transparent p-0 text-xs text-slate-600 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {CATEGORIES.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>

                        <span className="hidden text-slate-400 sm:inline">
                          •
                        </span>

                        <Input
                          value={requirement.note}
                          // disabled={!isMustHave}
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
                        checked={isMustHave}
                        onCheckedChange={(checked) =>
                          setFieldValue(
                            `${name}[${index}].kind`,
                            checked ? "must_have" : "preferred"
                          )
                        }
                        aria-label={`Must have requirement ${index + 1}`}
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

            {requirements.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center">
                <p className="text-sm text-slate-500">
                  No requirements added yet.
                </p>
                <Button
                  onClick={addRequirement}
                  className="mt-2 text-primary! w-fit! bg-transparent hover:underline underline-offset-4"
                  icon={<Plus className="mr-1 size-4" />}
                  label="Add your first requirement"
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
