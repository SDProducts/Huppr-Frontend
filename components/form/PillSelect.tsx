"use client";
import { cn } from "@/lib/utils";
import { useField } from "formik";
import { Info } from "lucide-react";
import React, { useEffect } from "react";
interface Props {
  name: string;
  label?: string | React.ReactNode;
  options: Option[];
  className?: string;
  disabled?: boolean;
  maxSelections?: number;
  minSelections?: number;
  defaultSelectAll?: boolean; // New prop for default select all
  orientationStyle?: string;
  optionClassName?: string;
  labelClassName?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

export default function PillSelect({
  name,
  label,
  labelClassName,
  className,
  optionClassName,
  options,
  disabled,
  defaultSelectAll,
  maxSelections,
  minSelections,
  orientationStyle,
  size,
}: Props) {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && meta.error;
  const selectedValues: string[] = Array.isArray(field.value)
    ? field.value
    : [];

  // Handle default select all on initial load
  useEffect(() => {
    // Only run if defaultSelectAll is true and field value is empty/undefined
    if (options) {
      if (defaultSelectAll && options.length > 0 && !field.value) {
        const allValues = options.map((opt) => opt.value);

        // Respect maxSelections if provided
        if (maxSelections && allValues.length > maxSelections) {
          helpers.setValue(allValues.slice(0, maxSelections));
        } else {
          helpers.setValue(allValues);
        }
      }
    }

    // Validate minSelections if value exists
    if (minSelections && field.value && field.value.length < minSelections) {
      helpers.setError(`Please select at least ${minSelections} option(s)`);
    }
  }, [
    defaultSelectAll,
    field.value,
    helpers,
    maxSelections,
    minSelections,
    options,
  ]); // Run only once on mount

  // Re-run when options change (if defaultSelectAll is true and no value set)
  useEffect(() => {
    if (options) {
      if (
        defaultSelectAll &&
        options.length > 0 &&
        (!field.value || field.value.length === 0)
      ) {
        const allValues = options.map((opt) => opt.value);

        if (maxSelections && allValues.length > maxSelections) {
          helpers.setValue(allValues.slice(0, maxSelections));
        } else {
          helpers.setValue(allValues);
        }
      }
    }
  }, [options, defaultSelectAll, maxSelections, field.value, helpers]);

  // Handle Multiple checkbox toggle
  const handleMultipleChange = (value: string, checked: boolean) => {
    let newValues: string[];

    if (checked) {
      // Add value if under max limit
      if (maxSelections && selectedValues.length >= maxSelections) {
        return;
      }
      newValues = [...selectedValues, value];
    } else {
      // Remove value
      newValues = selectedValues.filter((v) => v !== value);
    }

    helpers.setValue(newValues);
  };

  const handleSelectAll = () => {
    if (disabled) return;
    if (options) {
      if (selectedValues.length === options.length) {
        // Deselect all
        helpers.setValue([]);
      } else {
        // Select all (respecting max limit if any)
        const allValues = options.map((opt) => opt.value);
        if (maxSelections && allValues.length > maxSelections) {
          helpers.setValue(allValues.slice(0, maxSelections));
        } else {
          helpers.setValue(allValues);
        }
      }
    }
  };

  const isAllSelected =
    selectedValues.length === options.length && options.length > 0;
  const isIndeterminate =
    selectedValues.length > 0 && selectedValues.length < options.length;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex flex-wrap justify-between items-center mb-2">
          <p
            className={cn("font-medium text-gray-700 text-sm", labelClassName)}
          >
            {label}
          </p>

          {/* Select All / Deselect All button */}
          {options.length > 1 && !disabled && !defaultSelectAll && (
            <div
              onClick={handleSelectAll}
              className="text-xs hover:text-shadow-sm font-medium"
            >
              {isAllSelected ? "Deselect All" : "Select All"}
            </div>
          )}
        </div>
      )}

      {/* Selection counter (if max/min defined) */}
      {(maxSelections || minSelections) && (
        <p
          className={`text-xs mb-2 ${
            selectedValues.length > (maxSelections || Infinity)
              ? "text-red-500"
              : "text-gray-500"
          }`}
        >
          {selectedValues.length} selected
          {maxSelections && ` / ${maxSelections} max`}
          {minSelections && ` (min: ${minSelections})`}
        </p>
      )}

      <div className={`flex gap-1 ${orientationStyle}`}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          const isDisabled =
            disabled ||
            (maxSelections &&
              !isSelected &&
              selectedValues.length >= maxSelections);

          return (
            <label
              key={option.value}
              className={cn(
                "flex items-center justify-between rounded-sm px-4 py-2",
                "cursor-pointer transition-all",
                isSelected
                  ? !hasError
                    ? "bg-primary text-white"
                    : " bg-red-100"
                  : "bg-slate-200",
                size === "xs" && "p.1.5",
                size === "sm" && "p-3",

                hasError ? "border border-red-500" : "",
                isDisabled ? "opacity-50 cursor-not-allowed" : "",
                optionClassName
              )}
            >
              <div
                className={cn(
                  "flex items-center",
                  size === "xs" ? "gap-1.5" : "gap-3"
                )}
              >
                <div className="flex-1">
                  <div
                    className={`text-sm font-semibold capitalize ${
                      isDisabled ? "opacity-50" : ""
                    } ${
                      size === "xs"
                        ? "text-xs"
                        : size === "sm"
                        ? "text-sm"
                        : "text-sm"
                    }`}
                  >
                    {option.label}
                  </div>
                  {option.description && (
                    <div className="text-xs line-clamp-1">
                      {option.description}
                    </div>
                  )}
                </div>
              </div>

              {/* Hidden native checkbox input */}
              <input
                type="checkbox"
                value={option.value}
                checked={isSelected}
                onChange={(e) =>
                  handleMultipleChange(option.value, e.target.checked)
                }
                disabled={isDisabled ? true : false}
                className="hidden"
              />
            </label>
          );
        })}
      </div>

      {/* Error Message */}
      {hasError && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <Info className="w-4 h-4" />
          {meta.error}
        </p>
      )}
    </div>
  );
}
