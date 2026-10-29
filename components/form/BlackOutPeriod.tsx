"use client";

import { cn } from "@/lib/utils";
import { useField, useFormikContext } from "formik";
import { CalendarX, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export interface BlackoutPeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

interface BlackoutPeriodsFieldProps {
  name: string;
  description?: string;
  className?: string;
  disabled?: boolean;
}

const formatDate = (date: string) => {
  if (!date) return "";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function BlackoutPeriodsField({
  name,
  description = "Dates where leave requests are automatically restricted or require special approval.",
  className,
  disabled = false,
}: BlackoutPeriodsFieldProps) {
  const [field, meta] = useField<BlackoutPeriod[]>(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const periods = Array.isArray(field.value) ? field.value : [];

  const [isAdding, setIsAdding] = useState(false);
  const [periodName, setPeriodName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [formError, setFormError] = useState("");

  const resetForm = () => {
    setPeriodName("");
    setStartDate("");
    setEndDate("");
    setFormError("");
    setIsAdding(false);
  };

  const handleAdd = async () => {
    if (!periodName.trim() || !startDate || !endDate) {
      setFormError("Please complete all fields.");
      return;
    }

    if (endDate < startDate) {
      setFormError("End date cannot be before the start date.");
      return;
    }

    const newPeriod: BlackoutPeriod = {
      id: crypto.randomUUID(),
      name: periodName.trim(),
      startDate,
      endDate,
    };

    await setFieldValue(name, [...periods, newPeriod]);
    await setFieldTouched(name, true, false);

    resetForm();
  };

  const handleDelete = (id: string) => {
    setFieldValue(
      name,
      periods.filter((period) => period.id !== id)
    );
    setFieldTouched(name, true, false);
  };

  return (
    <section className={cn("w-full rounded-xl bg-white p-6", className)}>
      {/* Header */}
      <div className="flex flex-col justify-between items-start gap-4 pb-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/5">
            <CalendarX className="size-6 text-primary" strokeWidth={2.5} />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Blackout Periods
          </h2>
        </div>

        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            setFormError("");
            setIsAdding((current) => !current);
          }}
          className="inline-flex p-0 items-center gap-2 font-medium text-primary transition hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="size-4" />
          Add Period
        </button>
      </div>

      {/* Description */}
      <p className=" text-base text-slate-600">{description}</p>

      {/* Existing periods */}
      <div className="mt-5 space-y-3">
        {periods.map((period) => (
          <div
            key={period.id}
            className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 p-3"
          >
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-900">{period.name}</h3>

              <p className="text-sm text-slate-600">
                {formatDate(period.startDate)} - {formatDate(period.endDate)}
              </p>
            </div>

            <button
              type="button"
              disabled={disabled}
              onClick={() => handleDelete(period.id)}
              aria-label={`Delete ${period.name}`}
              className="shrink-0 rounded-md p-1 text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      {periods.length === 0 && !isAdding && (
        <p className="mt-5 rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
          No blackout periods added yet.
        </p>
      )}

      {/* Add period form */}
      {isAdding && (
        <div className="mt-5 space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div className="space-y-1.5">
            <label
              htmlFor={`${name}-period-name`}
              className="text-sm font-medium text-slate-700"
            >
              Period name
            </label>

            <input
              id={`${name}-period-name`}
              value={periodName}
              onChange={(event) => setPeriodName(event.target.value)}
              placeholder="e.g. End of Year Freeze"
              disabled={disabled}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor={`${name}-start-date`}
                className="text-sm font-medium text-slate-700"
              >
                Start date
              </label>

              <input
                id={`${name}-start-date`}
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                disabled={disabled}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor={`${name}-end-date`}
                className="text-sm font-medium text-slate-700"
              >
                End date
              </label>

              <input
                id={`${name}-end-date`}
                type="date"
                min={startDate || undefined}
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                disabled={disabled}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {formError && (
            <p role="alert" className="text-sm text-red-600">
              {formError}
            </p>
          )}

          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={disabled}
              onClick={handleAdd}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              Save Period
            </button>
          </div>
        </div>
      )}

      {meta.touched && typeof meta.error === "string" && (
        <p className="mt-2 text-sm text-red-600">{meta.error}</p>
      )}
    </section>
  );
}
