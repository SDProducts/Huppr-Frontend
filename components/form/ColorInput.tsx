"use client";

import { ErrorMessage, useField } from "formik";
import { Info, Pipette } from "lucide-react";
import React from "react";

interface ColorInputProps {
  name: string;
  label?: string;
  helpText?: string;
  className?: string;
  LabelClassName?: string;
  theme?: string;
  defaultColor?: string;
  readonly?: boolean;
}

const HEX_COLOR_REGEX = /^#(?:[\da-f]{3}|[\da-f]{6})$/i;

const ColorInput: React.FC<ColorInputProps> = ({
  name,
  label,
  helpText,
  className = "",
  LabelClassName = "",
  theme = "light",
  defaultColor = "#3b82f6",
  readonly = false,
}) => {
  const [field, meta, helpers] = useField<string>(name);

  const color =
    typeof field.value === "string" && HEX_COLOR_REGEX.test(field.value)
      ? field.value
      : defaultColor;

  const hasError = meta.touched && meta.error;

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    helpers.setValue(event.target.value);
  };

  const handleHexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    helpers.setValue(event.target.value);
  };

  const handleHexBlur = () => {
    helpers.setTouched(true);

    if (!HEX_COLOR_REGEX.test(field.value || "")) {
      return;
    }

    // Normalize shorthand hex values, e.g. #abc -> #aabbcc.
    const normalized =
      field.value.length === 4
        ? `#${field.value[1]}${field.value[1]}${field.value[2]}${field.value[2]}${field.value[3]}${field.value[3]}`
        : field.value;

    helpers.setValue(normalized.toLowerCase());
  };

  return (
    <div className="w-full text-left">
      {label && (
        <div className="mb-1">
          <div className={`text-gray-800 capitalize ${LabelClassName}`}>
            {label}
          </div>

          {helpText && (
            <p className="text-xs text-muted-foreground">{helpText}</p>
          )}
        </div>
      )}

      <div
        className={`relative flex w-full items-center gap-3 rounded-md border p-1 ${
          hasError
            ? "border-red-500"
            : theme === "dark"
            ? "border-gray-400"
            : "border-gray-200 focus-within:border-blue-400"
        } ${className}`}
      >
        <label
          className={`relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md border ${
            readonly ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          style={{ backgroundColor: color }}
          title="Choose accent color"
        >
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            onBlur={() => helpers.setTouched(true)}
            disabled={readonly}
            aria-label={label || "Choose accent color"}
            className="absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          />

          <Pipette className="pointer-events-none size-4 text-white drop-shadow" />
        </label>

        <div className="min-w-0 flex-1">
          <label
            htmlFor={`${name}-hex`}
            className="block text-xs text-gray-500"
          >
            Hex color
          </label>

          <input
            id={`${name}-hex`}
            name={field.name}
            type="text"
            value={field.value ?? ""}
            onChange={handleHexChange}
            onBlur={handleHexBlur}
            readOnly={readonly}
            placeholder={defaultColor}
            spellCheck={false}
            autoComplete="off"
            aria-invalid={Boolean(hasError)}
            className={`w-full bg-transparent text-sm uppercase outline-none ${
              theme === "dark" ? "text-gray-300" : "text-gray-900"
            }`}
          />
        </div>

        <div
          className="size-8 shrink-0 rounded-md border border-black/10"
          style={{ backgroundColor: color }}
          aria-label={`Color preview ${color}`}
        />

        {hasError && <Info className="size-5 shrink-0 text-red-500" />}
      </div>

      <ErrorMessage
        name={name}
        component="p"
        className="ml-2 mt-1 text-left text-[9px] text-red-500"
      />
    </div>
  );
};

export default ColorInput;
