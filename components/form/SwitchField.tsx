"use client";

import { Switch } from "@/components/ui/switch";
import { cn, labelCase } from "@/lib/utils";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { Check, Info } from "lucide-react";
import React from "react";

interface SwitchFieldProps {
  name: string;
  label?: string | React.ReactNode;
  type?: "multiple" | "single";
  labelPosition?: "left" | "right";
  className?: string;
  disabled?: boolean;
  maxSelections?: number;
  minSelections?: number;
  labelKey?: string;
  classNameKey?: string;
  orientationStyle?: string;
  optionClassName?: string;
  labelClassName?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const SwitchField: React.FC<SwitchFieldProps> = ({
  name,
  label,
  type = "single",
  labelPosition = "right",
  className,
  disabled = false,
  maxSelections,
  minSelections,
  labelKey = "label",
  orientationStyle,
  optionClassName,
  labelClassName,
  size = "md",
}) => {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue } = useFormikContext();

  const items: Record<string, unknown>[] = Array.isArray(field.value)
    ? field.value
    : [];

  const enabledCount = items.filter((item) => item.isEnabled === true).length;

  const isAllSelected = items.length > 0 && enabledCount === items.length;

  const handleMultipleChange = (index: number, checked: boolean) => {
    const item = items[index];

    if (!item || disabled) return;

    const isEnabled = item.isEnabled === true;

    if (
      checked &&
      !isEnabled &&
      maxSelections !== undefined &&
      enabledCount >= maxSelections
    ) {
      return;
    }

    if (
      !checked &&
      isEnabled &&
      minSelections !== undefined &&
      enabledCount <= minSelections
    ) {
      return;
    }

    // Update only this item's isEnabled property.
    setFieldValue(`${name}[${index}].isEnabled`, checked);
  };

  const handleSelectAll = (checked: boolean) => {
    if (disabled) return;

    let enabled = 0;

    items.forEach((item, index) => {
      let shouldEnable = checked;

      if (checked && maxSelections !== undefined) {
        shouldEnable = enabled < maxSelections;
      }

      if (shouldEnable) enabled++;

      if (item.isEnabled !== shouldEnable) {
        setFieldValue(`${name}[${index}].isEnabled`, shouldEnable, false);
      }
    });

    // If deselecting all, restore the minimum number of enabled items.
    if (!checked && minSelections) {
      items.slice(0, minSelections).forEach((item, index) => {
        if (item.isEnabled !== true) {
          setFieldValue(`${name}[${index}].isEnabled`, true, false);
        }
      });
    }
  };

  const sizeClasses: Record<NonNullable<SwitchFieldProps["size"]>, string> = {
    xs: "p-1.5 text-xs",
    sm: "p-2 text-sm",
    md: "p-3 text-sm",
    lg: "p-4 text-base",
  };

  const hasError = Boolean(meta.touched && meta.error);

  if (type === "multiple") {
    return (
      <div className={cn("w-full space-y-3", className)}>
        <div className="flex items-center justify-between gap-3">
          {label && (
            <div className={cn("text-sm font-medium", labelClassName)}>
              {label}
            </div>
          )}

          {items.length > 1 && (
            <button
              type="button"
              disabled={disabled}
              onClick={() => handleSelectAll(!isAllSelected)}
              className="text-sm font-medium text-primary hover:underline disabled:opacity-50"
            >
              {isAllSelected ? "Deselect all" : "Select all"}
            </button>
          )}
        </div>

        <div className={cn("space-y-2", orientationStyle)}>
          {items.map((item, index) => {
            const isEnabled = item.isEnabled === true;

            // Display the value of any property other than isEnabled.
            const labelValue = Object.entries(item).find(
              ([key, value]) => key !== "isEnabled" && value != null
            )?.[1];

            const atMaximum =
              maxSelections !== undefined &&
              enabledCount >= maxSelections &&
              !isEnabled;

            const atMinimum =
              minSelections !== undefined &&
              enabledCount <= minSelections &&
              isEnabled;

            return (
              <div
                key={`${name}-${index}`}
                className={cn(
                  "flex items-center justify-between gap-4 rounded-lg",
                  sizeClasses[size],
                  optionClassName,
                  (disabled || atMaximum || atMinimum) && "opacity-60"
                )}
              >
                <p className="min-w-0 flex-1 font-medium">
                  {labelCase(String(labelValue ?? ""))}
                </p>

                <Switch
                  checked={isEnabled}
                  onCheckedChange={(checked) =>
                    handleMultipleChange(index, checked)
                  }
                  disabled={disabled || atMaximum || atMinimum}
                  aria-label={String(labelValue ?? "")}
                />
              </div>
            );
          })}{" "}
        </div>

        {hasError && (
          <p className="flex items-center gap-1.5 text-sm text-destructive">
            <Info className="h-4 w-4 shrink-0" />
            {meta.error}
          </p>
        )}
      </div>
    );
  }

  const isChecked = Boolean(field.value);

  return (
    <div className={cn("w-full", className)}>
      <label
        className={cn(
          "flex items-center gap-3",
          labelPosition === "left" && "flex-row-reverse justify-between",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
          labelClassName
        )}
      >
        <span
          className={cn(
            "relative flex shrink-0 items-center justify-center rounded-md border transition-colors",
            size === "xs" && "h-4 w-4",
            size === "sm" && "h-4 w-4",
            size === "md" && "h-5 w-5",
            size === "lg" && "h-6 w-6",
            isChecked
              ? "border-primary bg-primary text-primary-foreground"
              : "border-input bg-background"
          )}
        >
          {isChecked && (
            <Check className={cn(size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5")} />
          )}

          <input
            type="checkbox"
            checked={isChecked}
            onChange={(event) => helpers.setValue(event.target.checked)}
            disabled={disabled}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-label={typeof label === "string" ? label : name}
          />
        </span>

        {label && <span className="text-sm font-medium">{label}</span>}
      </label>

      <ErrorMessage name={name}>
        {(errorMessage) => (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-destructive">
            <Info className="h-4 w-4 shrink-0" />
            {errorMessage}
          </p>
        )}
      </ErrorMessage>
    </div>
  );
};

export default SwitchField;
