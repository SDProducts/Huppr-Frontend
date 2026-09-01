"use client";
import { useField } from "formik";
import { Check, Info } from "lucide-react";
import React from "react";

interface Option {
  label: string;
  description?: string;
  value: string;
}

interface RadioGroupProps {
  name: string;
  label?: string;
  options: Option[];
  className?: string;
  labelClassName?: string;
  optionClassName?: string;
  orientation?: "horizontal" | "vertical";
  size?: "xs" | "sm" | "md" | "lg";
  hideIcon?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  options,
  className = "",
  labelClassName = "",
  optionClassName = "",
  orientation = "vertical",
  size = "sm",
  hideIcon = false,
}) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && meta.error;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <p
          className={`mb-2 font-medium text-gray-600 text-sm ${labelClassName}`}
        >
          {label}
        </p>
      )}
      <div
        className={`flex ${size === "xs" && "gap-1"} ${
          size === "sm" && "gap-2"
        } ${
          orientation === "horizontal" ? "flex-row flex-wrap" : "flex-col"
        } ${className}`}
      >
        {options.map((option) => {
          const isSelected = field.value === option.value;

          return (
            <label
              key={option.value}
              className={`flex items-center justify-between border ${
                size === "xs" && "rounded-md p-1.5"
              } ${
                size === "sm" && "rounded-lg p-2"
              } cursor-pointer transition-all 
                ${
                  isSelected
                    ? !hasError
                      ? "border-primary bg-primary/20"
                      : "border-red-500"
                    : "border-gray-300"
                }
                ${hasError ? "border-red-500" : ""} ${optionClassName}
              `}
            >
              <div className="space-y-0.5">
                {/* Custom Radio Circle */}
                <div className="flex items-center gap-1.5">
                  {!hideIcon && (
                    <div
                      className={`
                    ${size === "sm" && "w-4 h-4"} ${
                        size === "xs" && "w-3 h-3"
                      } rounded-full border flex items-center justify-center
                    ${
                      isSelected
                        ? !hasError
                          ? "border-primary/70 bg-primary/70"
                          : "border-red-500 bg-red-500"
                        : "border-gray-400"
                    }
                  `}
                    >
                      {isSelected && (
                        <Check
                          strokeWidth={4}
                          className={`text-white ${
                            size === "xs" && "w-2 h-2"
                          } ${size === "sm" && "w-2.5 h-2.5"}`}
                        />
                        // <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      )}
                    </div>
                  )}

                  <div
                    className={`text-gray-800 whitespace-pre-line flex-1 ${
                      size === "xs" && "text-xs"
                    } ${size === "sm" && "text-sm"} capitalize`}
                  >
                    {option.label}
                  </div>
                </div>
                {option.description && (
                  <div className="text-xs text-gray-500 line-clamp-2">
                    {option.description}
                  </div>
                )}
              </div>

              {/* Hidden native radio input */}
              <input
                type="radio"
                {...field}
                value={option.value}
                checked={isSelected}
                onChange={() => helpers.setValue(option.value)}
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
};

export default RadioGroup;
