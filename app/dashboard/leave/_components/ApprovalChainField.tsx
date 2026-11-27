"use client";

import { cn } from "@/lib/utils";
import { useField, useFormikContext } from "formik";
import { ChevronDown, Plus, Trash2 } from "lucide-react";

export interface ApprovalChainPayload {
  level: number;
  approverRole: string;
  action: string;
}

interface ApprovalChainFieldProps {
  name: string;
  approverRoles?: string[];
  actionOptions?: {
    label: string;
    value: string;
  }[];
  disabled?: boolean;
  className?: string;
}

const DEFAULT_APPROVER_ROLES = [
  "Direct Manager",
  "Department Manager",
  "HR Administrator",
  "Line Manager",
  "Department Head",
  "CEO",
];

const DEFAULT_ACTION_OPTIONS = [
  {
    label: "Approval Required",
    value: "approval_required",
  },
  {
    label: "Notification Only",
    value: "notification_only",
  },
];

export default function ApprovalChainField({
  name,
  approverRoles = DEFAULT_APPROVER_ROLES,
  actionOptions = DEFAULT_ACTION_OPTIONS,
  disabled = false,
  className,
}: ApprovalChainFieldProps) {
  const [field] = useField<ApprovalChainPayload[]>(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const approvalChain = Array.isArray(field.value) ? field.value : [];

  const updateChain = (updatedChain: ApprovalChainPayload[]) => {
    setFieldValue(name, updatedChain);
    setFieldTouched(name, true, false);
  };

  const handleAddLevel = () => {
    const newLevel: ApprovalChainPayload = {
      level: approvalChain.length + 1,
      approverRole: approverRoles[0] ?? "",
      action: actionOptions[0]?.value ?? "approval_required",
    };

    updateChain([...approvalChain, newLevel]);
  };

  const handleRemoveLevel = (index: number) => {
    const updatedChain = approvalChain
      .filter((_, i) => i !== index)
      .map((item, i) => ({
        ...item,
        level: i + 1,
      }));

    updateChain(updatedChain);
  };

  const handleChange = (
    index: number,
    property: keyof ApprovalChainPayload,
    value: string
  ) => {
    const updatedChain = approvalChain.map((item, i) =>
      i === index
        ? {
            ...item,
            [property]: value,
          }
        : item
    );

    updateChain(updatedChain);
  };

  return (
    <div className={cn("space-y-5", className)}>
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-800">
          Custom Approval Chain
        </h3>

        <button
          type="button"
          onClick={handleAddLevel}
          disabled={disabled}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="size-4" />
          Add Level
        </button>
      </div>

      {/* Approval levels */}
      {approvalChain.length > 0 ? (
        <div className="relative space-y-3">
          {approvalChain.map((item, index) => (
            <div key={`${name}-${index}`} className="relative">
              {/* Connector between levels */}
              {index < approvalChain.length - 1 && (
                <div className="absolute left-[27px] top-[58px] z-0 h-[calc(100%+12px)] w-px bg-slate-300" />
              )}

              <div className="relative z-10 flex flex-col items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row">
                {/* Level indicator */}
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-white bg-primary/15 text-xs font-semibold text-primary shadow-sm">
                  Lvl {item.level}
                </div>

                {/* Approver role */}
                <div className="w-full flex-1 space-y-1.5">
                  <label
                    htmlFor={`${name}-${index}-role`}
                    className="block text-sm font-semibold text-slate-600"
                  >
                    Approver Role
                  </label>

                  <div className="relative">
                    <select
                      id={`${name}-${index}-role`}
                      value={item.approverRole}
                      onChange={(event) =>
                        handleChange(index, "approverRole", event.target.value)
                      }
                      disabled={disabled}
                      className="h-12 w-full appearance-none rounded-md border border-slate-200 bg-white px-4 pr-10 text-base text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {approverRoles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
                  </div>
                </div>

                {/* Action required */}
                <div className="w-full flex-1 space-y-1.5">
                  <label
                    htmlFor={`${name}-${index}-action`}
                    className="block text-sm font-semibold text-slate-600"
                  >
                    Action Required
                  </label>

                  <div className="relative">
                    <select
                      id={`${name}-${index}-action`}
                      value={item.action}
                      onChange={(event) =>
                        handleChange(index, "action", event.target.value)
                      }
                      disabled={disabled}
                      className="h-12 w-full appearance-none rounded-md border border-slate-200 bg-white px-4 pr-10 text-base text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {actionOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
                  </div>
                </div>

                {/* Delete level */}
                <button
                  type="button"
                  onClick={() => handleRemoveLevel(index)}
                  disabled={disabled}
                  aria-label={`Remove approval level ${item.level}`}
                  className="shrink-0 cursor-pointer rounded-md p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 className="size-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center">
          <p className="text-sm font-medium text-slate-700">
            No approval levels configured
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Add a level to define who should review and approve leave requests.
          </p>
        </div>
      )}
    </div>
  );
}
