"use client";
import { ErrorMessage, Field, useField } from "formik";
import { AlertCircle, ChevronDown } from "lucide-react";
import React from "react";

interface SelectProps {
  name: string;
  options: Array<{ value: string | number; label: string }>;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  theme?: string;
  label?: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  options,
  placeholder = "Select an option",
  className = "",
  labelClassName = "",
  disabled = false,
  icon,
  label,
  theme = "light",
}) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;

  return (
    <div className="w-full text-left">
      {label && (
        <div className={`capitalize text-gray-800 mb-0.5 ${labelClassName}`}>
          {label}
        </div>
      )}

      <div
        className={`w-full relative flex flex-row items-center border rounded-lg py-3.5 ${
          hasError
            ? "border-red-500"
            : theme === "dark"
            ? "border-gray-700"
            : "border-gray-200 focus-within:border-blue-400"
        } ${disabled ? "bg-gray-100" : ""} ${className}`}
      >
        {/* Left Icon */}
        {icon && <div className="flex items-center px-3">{icon}</div>}

        {/* Select Field */}
        <Field
          as="select"
          {...field}
          disabled={disabled}
          className={`appearance-none ${
            theme === "dark" ? "text-gray-300" : "text-gray-900"
          } text-sm rounded-lg focus:ring-0 block w-full px-5 outline-none bg-transparent ${
            !field.value ? "text-gray-400" : ""
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>

        {/* Chevron Icon */}
        <div className="flex items-center px-3 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>

        {/* Error Icon */}
        {hasError && (
          <div className="flex items-center px-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>

      {/* Error Message */}
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-[9px] mt-1 ml-2 text-left"
      />
    </div>
  );
};

export default Select;
