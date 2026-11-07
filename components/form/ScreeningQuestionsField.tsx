"use client";

import { FieldArray, useField, useFormikContext } from "formik";
import {
  CheckCircle2,
  FileQuestion,
  Hash,
  Link2,
  Pencil,
  Plus,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  X,
} from "lucide-react";
import * as React from "react";

import Button from "@/components/ui/CustomButton";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type ScreeningQuestionKind =
  | "short_answer"
  | "number"
  | "yes_no"
  | "url";

export type ScreeningQuestion = {
  id?: string;
  prompt: string;
  kind: ScreeningQuestionKind;
  threshold: string;
  weight: number;
  isKnockout: boolean;
  isRequired: boolean;
  expectedAnswer: string;
};

type ScreeningQuestionsFieldProps = {
  name?: string;
  description?: string;
  className?: string;
};

type QuestionDraft = ScreeningQuestion;

const QUESTION_TYPES: {
  label: string;
  value: ScreeningQuestionKind;
}[] = [
  { label: "Short Answer", value: "short_answer" },
  { label: "Number / Years", value: "number" },
  { label: "Yes / No", value: "yes_no" },
  { label: "Website URL", value: "url" },
];

const emptyQuestion = (): QuestionDraft => ({
  prompt: "",
  kind: "short_answer",
  threshold: "",
  weight: 50,
  isKnockout: false,
  isRequired: true,
  expectedAnswer: "",
});

const TYPE_LABELS: Record<ScreeningQuestionKind, string> = {
  short_answer: "Short Answer",
  number: "Number / Years",
  yes_no: "Yes / No",
  url: "Website URL",
};

export default function ScreeningQuestionsField({
  name = "screeningQuestions",
  description = "Candidates answer these upon submission. Rules trigger automated scoring and pipeline placement.",
  className,
}: ScreeningQuestionsFieldProps) {
  const [field, meta] = useField<ScreeningQuestion[]>(name);
  const { setFieldValue, setFieldTouched } =
    useFormikContext<Record<string, ScreeningQuestion[]>>();

  const questions = field.value ?? [];

  const [isAdding, setIsAdding] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [draft, setDraft] = React.useState<QuestionDraft>(emptyQuestion());

  const promptId = React.useId();

  const updateDraft = <K extends keyof QuestionDraft>(
    key: K,
    value: QuestionDraft[K]
  ) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const resetDraft = () => {
    setDraft(emptyQuestion());
    setIsAdding(false);
    setEditingIndex(null);
  };

  const startAdding = () => {
    setDraft(emptyQuestion());
    setEditingIndex(null);
    setIsAdding(true);
  };

  const startEditing = (index: number) => {
    setDraft({
      ...emptyQuestion(),
      ...questions[index],
    });
    setEditingIndex(index);
    setIsAdding(true);
  };

  const saveQuestion = (
    push: (value: ScreeningQuestion) => void,
    replace: (index: number, value: ScreeningQuestion) => void
  ) => {
    const prompt = draft.prompt.trim();

    if (!prompt) return;

    const question: ScreeningQuestion = {
      ...draft,
      prompt,
      threshold: draft.threshold.trim(),
      expectedAnswer: draft.expectedAnswer.trim(),
      weight: Math.min(100, Math.max(0, Number(draft.weight) || 0)),
    };

    if (editingIndex !== null) {
      replace(editingIndex, question);
    } else {
      push(question);
    }

    setFieldTouched(name, true, false);
    resetDraft();
  };

  const questionIcon = (kind: ScreeningQuestionKind) => {
    switch (kind) {
      case "number":
        return <Hash className="size-4 text-blue-600" />;
      case "url":
        return <Link2 className="size-4 text-blue-600" />;
      case "yes_no":
        return <CheckCircle2 className="size-4 text-blue-600" />;
      default:
        return <FileQuestion className="size-4 text-blue-600" />;
    }
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
          <FileQuestion className="mt-1 size-6 shrink-0 text-blue-600" />

          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Screening Questions
            </h2>
            <p className="mt-2 max-w-lg text-sm text-slate-600">
              {description}
            </p>
          </div>
        </div>

        <Button
          type="button"
          onClick={startAdding}
          className="h-auto w-fit! shrink-0 text-sm bg-blue-600 text-white hover:bg-blue-700"
          label="
        Add Screening Question
        "
          icon={<Plus className="size-4 shrink-0" />}
        />
      </div>

      <FieldArray name={name}>
        {({ push, remove, replace }) => (
          <div className="space-y-5">
            {questions.map((question, index) => (
              <article
                key={question.id ?? `${index}-${question.prompt}`}
                className="rounded-2xl bg-slate-50 p-5 sm:p-7"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-blue-600">
                      {index + 1}
                    </span>

                    <span
                      className={cn(
                        "text-sm font-bold uppercase tracking-wide",
                        question.isKnockout ? "text-red-600" : "text-slate-600"
                      )}
                    >
                      {question.isKnockout
                        ? "Knockout Rule"
                        : question.kind === "number"
                        ? "Numerical Evaluation"
                        : question.kind === "url"
                        ? "Portfolio Validation"
                        : question.kind === "yes_no"
                        ? "Yes / No Evaluation"
                        : "Screening Question"}
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <div
                      className="flex size-8 rounded-md cursor-pointer justify-center items-center hover:bg-gray-200 text-slate-500 hover:text-primary"
                      onClick={() => startEditing(index)}
                    >
                      <Pencil className="size-4" />
                    </div>
                    <div
                      onClick={() => remove(index)}
                      className="flex size-8 rounded-md cursor-pointer justify-center items-center hover:bg-gray-200 text-slate-500 hover:text-red-500"
                    >
                      <Trash2 className="size-4 " />
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                  {question.prompt}
                </h3>

                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1.5">
                    {questionIcon(question.kind)}
                    Type: <strong>{TYPE_LABELS[question.kind]}</strong>
                  </span>

                  {question.threshold && (
                    <span>
                      Threshold: <strong>{question.threshold}</strong>
                    </span>
                  )}

                  {question.expectedAnswer && (
                    <span>
                      Expected: <strong>{question.expectedAnswer}</strong>
                    </span>
                  )}

                  <span>
                    Weight:{" "}
                    <strong className="text-blue-600">
                      {question.weight}%
                    </strong>
                  </span>

                  {question.isRequired && (
                    <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600">
                      Required
                    </span>
                  )}
                </div>

                {question.isKnockout ? (
                  <div className="mt-3 flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                    <p>
                      <strong>Knockout Rule:</strong> This question is
                      configured to flag candidates who fail the required
                      criteria.
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 flex items-start gap-3 rounded-xl bg-white p-4 text-sm text-slate-600">
                    <SlidersHorizontal className="mt-0.5 size-4 shrink-0 text-blue-600" />
                    <p>
                      <strong className="text-slate-900">
                        Automated Evaluation:
                      </strong>{" "}
                      This question contributes {question.weight}% to the
                      configured screening score.
                    </p>
                  </div>
                )}
              </article>
            ))}

            {questions.length === 0 && !isAdding && (
              <div className="rounded-xl border border-dashed border-slate-300 px-5 py-10 text-center">
                <FileQuestion className="mx-auto size-8 text-slate-400" />
                <p className="mt-3 font-medium text-slate-700">
                  No screening questions yet
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Add questions to evaluate candidates during application.
                </p>
                <Button
                  onClick={startAdding}
                  className="mt-4 gap-2"
                  icon={<Plus className="size-4" />}
                  label="Add your first question"
                />
              </div>
            )}

            {isAdding && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-slate-900">
                    {editingIndex !== null
                      ? "Edit Screening Question"
                      : "New Screening Question"}
                  </h3>
                  <div
                    onClick={resetDraft}
                    className="cursor-pointer flex justify-center items-center p-2 rounded-md hover:bg-gray-100"
                  >
                    <X className="size-4" />
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label
                      htmlFor={`${promptId}-prompt`}
                      className="text-sm font-medium text-slate-700"
                    >
                      Question prompt *
                    </label>

                    <textarea
                      id={`${promptId}-prompt`}
                      value={draft.prompt}
                      onChange={(event) =>
                        updateDraft("prompt", event.target.value)
                      }
                      placeholder="e.g. How many years of experience do you have?"
                      rows={3}
                      className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor={`${promptId}-kind`}
                        className="text-sm font-medium text-slate-700"
                      >
                        Answer type
                      </label>

                      <select
                        id={`${promptId}-kind`}
                        value={draft.kind}
                        onChange={(event) =>
                          updateDraft(
                            "kind",
                            event.target.value as ScreeningQuestionKind
                          )
                        }
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                      >
                        {QUESTION_TYPES.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`${promptId}-threshold`}
                        className="text-sm font-medium text-slate-700"
                      >
                        Threshold
                      </label>

                      <Input
                        id={`${promptId}-threshold`}
                        value={draft.threshold}
                        onChange={(event) =>
                          updateDraft("threshold", event.target.value)
                        }
                        placeholder={
                          draft.kind === "number"
                            ? "e.g. 5+ years"
                            : "e.g. Valid web address"
                        }
                        className="py-5"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`${promptId}-weight`}
                        className="text-sm font-medium text-slate-700"
                      >
                        Scoring weight (%)
                      </label>

                      <Input
                        id={`${promptId}-weight`}
                        type="number"
                        className="py-5"
                        min={0}
                        max={100}
                        value={draft.weight}
                        onChange={(event) =>
                          updateDraft("weight", Number(event.target.value))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`${promptId}-expected`}
                        className="text-sm font-medium text-slate-700"
                      >
                        Expected answer
                      </label>

                      {draft.kind === "yes_no" ? (
                        <select
                          id={`${promptId}-expected`}
                          value={draft.expectedAnswer}
                          onChange={(event) =>
                            updateDraft("expectedAnswer", event.target.value)
                          }
                          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                        >
                          <option value="">Select answer</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      ) : (
                        <Input
                          id={`${promptId}-expected`}
                          value={draft.expectedAnswer}
                          onChange={(event) =>
                            updateDraft("expectedAnswer", event.target.value)
                          }
                          placeholder="Expected answer or evaluation criteria"
                        />
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 rounded-md bg-slate-50 p-4">
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={draft.isRequired}
                        onChange={(event) =>
                          updateDraft("isRequired", event.target.checked)
                        }
                        className="size-4 accent-blue-600"
                      />
                      <span>
                        <strong className="block text-slate-900">
                          Required question
                        </strong>
                        Candidates must answer this question.
                      </span>
                    </label>

                    <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={draft.isKnockout}
                        onChange={(event) =>
                          updateDraft("isKnockout", event.target.checked)
                        }
                        className="size-4 accent-red-600"
                      />
                      <span>
                        <strong className="block text-slate-900">
                          Knockout rule
                        </strong>
                        Flag candidates who do not meet this criterion.
                      </span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={resetDraft}
                      label="Cancel"
                      className="bg-gray-100! w-fit! text-gray-800!"
                    />

                    <Button
                      type="button"
                      disabled={!draft.prompt.trim()}
                      onClick={() => saveQuestion(push, replace)}
                      className="w-fit! bg-blue-600 text-white hover:bg-blue-700"
                      icon={<Plus className="size-4" />}
                      label={
                        editingIndex !== null ? "Save Changes" : "Add Question"
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {meta.touched && meta.error && (
              <p className="text-sm text-destructive">
                {typeof meta.error === "string" ? meta.error : ""}
              </p>
            )}
          </div>
        )}
      </FieldArray>
    </section>
  );
}
