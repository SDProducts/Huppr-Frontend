/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { ErrorMessage, Field, useField } from "formik";
import { Info } from "lucide-react";
import React, { useEffect, useState } from "react";

const formatPrice = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined || value === "") return "";

  const numberValue = parseFloat(value.toString().replace(/[^0-9.]/g, ""));
  if (isNaN(numberValue)) return "";

  return (
    "₦" + numberValue.toLocaleString("en-NG", { minimumFractionDigits: 0 })
  );
};

interface InputProps {
  type?:
    | "text"
    | "email"
    | "tel"
    | "password"
    | "number"
    | "checkbox"
    | "textarea";
  placeholder?: string;
  name: string;
  label?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  LabelClassName?: string;
  rows?: number;
  theme?: string;
  formatMoney?: boolean;
  readonly?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  name,
  label,
  icon,
  rightIcon,
  className = "",
  LabelClassName = "",
  rows = 6,
  theme = "light",
  formatMoney = false,
  readonly = false,
}) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;

  const isTextarea = type === "textarea";
  const hasError = meta.touched && meta.error;
  const [displayValue, setDisplayValue] = useState<string>("");

  useEffect(() => {
    if (formatMoney && field.value !== undefined) {
      setDisplayValue(formatPrice(field.value));
    }
  }, [field.value, formatMoney]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value.replace(/[^0-9]/g, "");
    if (formatMoney) {
      setValue(inputVal);
      setDisplayValue(formatPrice(inputVal));
    } else {
      setValue(inputVal);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    field.onBlur(e); // Mark field as touched
  };

  return (
    <div className="w-full text-left">
      {label && (
        <div className={`text-gray-800 capitalize mb-0.5 ${LabelClassName}`}>
          {label}
        </div>
      )}
      <div
        className={`w-full relative flex ${
          isTextarea ? "flex-col" : "flex-row"
        } border rounded-lg py-3.5 ${
          hasError
            ? "border-red-500"
            : theme === "dark"
            ? "border-gray-400"
            : "border-gray-200 focus:border-blue-400 active:border-blue-400"
        } ${className}`}
      >
        {/* Left Icon */}
        {icon && !isTextarea && (
          <div className="flex items-center pl-3">{icon}</div>
        )}

        {/* Field */}
        {formatMoney ? (
          <input
            type="text"
            name={name}
            value={displayValue}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            readOnly={readonly}
            className={`text-gray-900 text-sm rounded-lg focus:ring-0 block w-full px-5 outline-none resize-none`}
          />
        ) : (
          <Field
            as={isTextarea ? "textarea" : "input"}
            {...field}
            type={isTextarea ? undefined : type}
            placeholder={placeholder}
            rows={isTextarea ? rows : undefined}
            className={`${
              theme === "dark" ? "text-gray-300" : "text-gray-900"
            } text-sm rounded-lg focus:ring-0 block w-full px-5 outline-none resize-none ${
              isTextarea ? "min-h-15" : ""
            }`}
          />
        )}

        {/* Error Icon */}
        {!isTextarea && hasError && (
          <div className="flex items-center px-3">
            <Info className="w-5 h-5 text-red-500" />
          </div>
        )}

        {/* Right Icon */}
        {rightIcon && <div className="flex items-center pr-3">{rightIcon}</div>}
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

export default Input;
