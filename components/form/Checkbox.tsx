"use client";
import { ErrorMessage, useField } from "formik";
import { Check, Info } from "lucide-react";
import React, { useEffect } from "react";
interface Option {
  label: string;
  value: string;
}

interface CheckboxProps {
  name: string;
  label?: string | React.ReactNode;
  type?: "multiple" | "single";
  labelPosition?: "left" | "right";
  options?: Option[];
  className?: string;
  disabled?: boolean;
  maxSelections?: number;
  minSelections?: number;
  defaultSelectAll?: boolean; // New prop for default select all
  orientation?: "horizontal" | "vertical";
  optionClassName?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  type = "single",
  labelPosition = "right",
  options = [],
  className = "",
  disabled = false,
  maxSelections,
  minSelections,
  defaultSelectAll = false, // Default to false
  orientation = "vertical",
  optionClassName,
  size = "sm",
}) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && meta.error;

  // Handle checkbox toggle
  const handleChange = () => {
    helpers.setValue(!field.value);
    // helpers.setTouched(true);
  };

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

  if (type === "multiple") {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium text-gray-700 text-sm">{label}</p>

            {/* Select All / Deselect All button */}
            {options.length > 1 && !disabled && !defaultSelectAll && (
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-xs hover:text-shadow-sm font-medium"
              >
                {isAllSelected ? "Deselect All" : "Select All"}
              </button>
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

        <div
          className={`flex gap-0 ${
            orientation === "horizontal"
              ? "flex-row flex-wrap"
              : "flex-col border border-gray-200 rounded-lg overflow-hidden"
          }`}
        >
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
                className={`flex items-center justify-between ${
                  size === "xs" && "p.1.5"
                } ${size === "sm" && "p-2"} cursor-pointer transition-all 
                ${
                  isSelected
                    ? !hasError
                      ? "bg-primary/5"
                      : "border bg-red-100"
                    : "border-gray-300"
                }
                ${hasError ? "border-red-500" : ""}
                ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                ${optionClassName}
              `}
              >
                <div className="flex items-center gap-3">
                  {/* Custom Checkbox Square */}
                  <div
                    className={`
                    w-5 h-5 rounded-md border flex items-center justify-center transition-all
                    ${
                      isSelected
                        ? !hasError
                          ? "border-primary bg-primary"
                          : "border-red-500 bg-red-500"
                        : "border-gray-400 bg-white"
                    }
                    ${isDisabled ? "opacity-50" : ""}
                  `}
                  >
                    {isSelected && (
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>

                  <span
                    className={`text-gray-800 text-xs capitalize ${
                      isDisabled ? "opacity-50" : ""
                    }`}
                  >
                    {option.label}
                  </span>
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

  return (
    <div className={`w-full text-left ${className}`}>
      <label className="flex items-center cursor-pointer">
        {label && labelPosition === "left" && (
          <span className="text-sm mr-2">{label}</span>
        )}

        <div className={`relative flex items-center`}>
          {/* Hidden checkbox for Formik */}
          <input
            type="checkbox"
            name={field.name}
            checked={field.value || false}
            onChange={handleChange}
            onBlur={field.onBlur}
            disabled={disabled}
            className="sr-only"
          />

          {/* Custom checkbox appearance */}
          <div
            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
              hasError ? "border-red-500" : "border-gray-300"
            }
             ${field.value ? "bg-transparent border-primary" : "bg-white"}
            `}
            onClick={handleChange}
          >
            {field.value && <Check className="w-3 h-3 text-primary" />}
          </div>

          {/* Error Icon */}
          {/* {hasError && (
            <div className="ml-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
            </div>
          )} */}
        </div>

        {label && labelPosition === "right" && (
          <span className="text-sm ml-2">{label}</span>
        )}
      </label>

      {/* Error Message */}
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-[10px] ml-7 text-left"
      />
    </div>
  );
};

export default Checkbox;
