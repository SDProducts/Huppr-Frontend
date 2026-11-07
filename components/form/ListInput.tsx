"use client";

import Button from "@/components/ui/CustomButton";
import { FieldArray, getIn, useField } from "formik";
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
        // ✅ Use getIn so dot-paths like "requirements.responsibilities" work
        const values: string[] = getIn(form.values, name) || [];

        const clearAll = () => {
          for (let i = values.length - 1; i >= 0; i--) {
            remove(i);
          }
        };

        return (
          <div
            className={`w-full space-y-5 rounded-lg border border-gray-200 p-2 ${className}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-bold capitalize sm:text-lg">
                  {label}
                </div>
                <p className="text-xs">{helpText}</p>
              </div>
              <div className="flex flex-col items-end gap-1 text-xs">
                <Button
                  label="Clear all"
                  onClick={clearAll}
                  className="hidden w-fit! rounded-lg border border-red-100 bg-transparent px-4 py-1! text-red-500! hover:bg-red-100 md:flex"
                  icon={<Trash2 size={12} />}
                />
                <div className="flex gap-2 md:hidden">
                  <Trash2
                    size={16}
                    className="text-red-500"
                    onClick={clearAll}
                  />
                  <PlusCircle
                    size={16}
                    className="cursor-pointer text-primary"
                    onClick={() => push("")}
                  />
                </div>
                {values.length < maxItems && (
                  <Button
                    label={addButtonText}
                    onClick={() => push("")}
                    icon={<PlusCircle size={12} />}
                    className="hidden w-fit! rounded-lg border border-blue-100 bg-transparent px-4 py-1! text-blue-500! hover:bg-blue-100 md:flex"
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
                    <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-gray-100 text-sm text-gray-700">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div
                        className={`relative flex w-full flex-row rounded-sm border bg-transparent py-1.5 ${
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
                          className="block w-full rounded-lg px-5 text-sm text-gray-900 outline-none focus:ring-0"
                        />

                        {hasItemError && (
                          <div className="flex items-center px-3">
                            <Info className="h-5 w-5 text-red-500" />
                          </div>
                        )}
                      </div>

                      {hasItemError && (
                        <p className="mt-1 text-left text-xs text-red-500">
                          {itemError}
                        </p>
                      )}
                    </div>

                    {showDeleteButton && values.length > minItems && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="rounded-sm border border-red-100 p-2 text-red-500 transition-colors hover:bg-red-100"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {hasError && typeof meta.error === "string" && (
              <p className="mt-1 text-left text-xs text-red-500">
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
