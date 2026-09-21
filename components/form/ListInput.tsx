"use client";

import Button from "@/components/ui/CustomButton";
import { FieldArray, useField } from "formik";
import { Info, PlusCircle, Trash2 } from "lucide-react";
import React from "react";

interface ListInputFieldProps {
  name: string;
  label: string;
  helpText?: string;
  placeholder?: string;
  addButtonText?: string;
  minItems?: number;
  maxItems?: number;
  className?: string;
  showDeleteButton?: boolean;
}

const ListInputField: React.FC<ListInputFieldProps> = ({
  name,
  label,
  helpText,
  placeholder = "Enter text...",
  addButtonText = "Add item",
  minItems = 0,
  maxItems = 10,
  className = "",
  showDeleteButton = true,
}) => {
  const [, meta] = useField<string[]>(name);
  const hasError = meta.touched && meta.error;

  return (
    <FieldArray name={name}>
      {({ push, remove, form }) => {
        const values: string[] = form.values[name] || [];

        return (
          <div
            className={`w-full space-y-5 border border-gray-200 p-2 rounded-lg ${className}`}
          >
            <div className="flex items-start justify-between">
              <div className="">
                <div className="text-xs capitalize sm:text-lg font-bold">
                  {label}
                </div>
                <p className="text-xs">{helpText}</p>
              </div>
              <div className="flex flex-col items-end gap-1 text-xs">
                <Button
                  label="Clear all"
                  onClick={() => {
                    for (let index = 0; index < values.length; index++) {
                      remove(0);
                    }
                  }}
                  className="w-fit! rounded-lg py-1! px-4 bg-transparent border border-red-100 hover:bg-red-100 text-red-500!"
                  icon={<Trash2 size={12} />}
                />
                {/* Add Button */}
                {values.length < maxItems && (
                  <Button
                    label={addButtonText}
                    onClick={() => push("")}
                    icon={<PlusCircle size={12} />}
                    className="w-fit! rounded-lg py-1! px-4 border bg-transparent border-blue-100 hover:bg-blue-100 text-blue-500!"
                  />
                )}
              </div>
            </div>
            <div className="space-y-2">
              {values.map((value, index) => {
                const itemError = Array.isArray(meta.error)
                  ? meta.error[index]
                  : undefined;
                const itemTouched = Array.isArray(meta.touched)
                  ? meta.touched[index]
                  : undefined;
                const hasItemError = itemTouched && itemError;

                return (
                  <div key={index} className="flex items-stretch gap-1">
                    <div className="h-8 w-8 flex items-center justify-center text-gray-700 text-sm bg-gray-100 rounded-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div
                        className={`w-full relative flex flex-row border bg-transparent rounded-sm py-1.5 ${
                          hasItemError ? "border-red-500" : "border-zinc-200"
                        }`}
                      >
                        <input
                          type="text"
                          placeholder={placeholder}
                          value={value}
                          onChange={(e) =>
                            form.setFieldValue(
                              `${name}[${index}]`,
                              e.target.value
                            )
                          }
                          onBlur={() =>
                            form.setFieldTouched(`${name}[${index}]`, true)
                          }
                          className="text-gray-900 text-sm rounded-lg focus:ring-0 block w-full px-5 outline-none"
                        />

                        {/* Error Icon */}
                        {hasItemError && (
                          <div className="flex items-center px-3">
                            <Info className="w-5 h-5 text-red-500" />
                          </div>
                        )}
                      </div>

                      {/* Item Error Message */}
                      {hasItemError && (
                        <p className="text-red-500 text-xs mt-1 text-left">
                          {itemError}
                        </p>
                      )}
                    </div>

                    {/* Delete Button */}
                    {showDeleteButton && values.length > minItems && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="p-2 rounded-sm border border-red-100 hover:bg-red-100 text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Array Error Message */}
            {hasError && typeof meta.error === "string" && (
              <p className="text-red-500 text-xs mt-1 text-left">
                {meta.error}
              </p>
            )}
          </div>
        );
      }}
    </FieldArray>
  );
};

export default ListInputField;
