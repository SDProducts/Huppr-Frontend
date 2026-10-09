"use client";

import { cn } from "@/lib/utils";
import { useField, useFormikContext } from "formik";

// type Option = {
//   label: string;
//   value: string;
// };

type TabsSelectFieldProps = {
  name?: string;
  label?: string;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
  options: Option[];
};

export default function TabsSelectField({
  name = "priority",
  label = "Priority level",
  className,
  labelClassName,
  disabled = false,
  options,
}: TabsSelectFieldProps) {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  return (
    <div className={cn("space-y-1")}>
      <div className={cn("text-sm font-medium", labelClassName)}>{label}</div>

      <div
        role="group"
        aria-label={label}
        className={cn(
          "grid gap-1 rounded-md bg-gray-100 p-1",
          `grid-cols-${options.length}`,
          className
        )}
      >
        {options.map((item) => {
          const isSelected = field.value === item.value;

          return (
            <button
              key={item.value}
              type="button"
              disabled={disabled}
              aria-pressed={isSelected}
              onClick={() => {
                setFieldValue(name, item.value);
                setFieldTouched(name, true, false);
              }}
              className={cn(
                "flex items-center justify-center rounded-sm p-2 cursor-pointer",
                "text-sm capitalize transition-colors",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-blue-500",
                isSelected
                  ? "bg-white font-semibold text-primary"
                  : "text-gray-600 hover:bg-white/60",
                disabled && "cursor-not-allowed opacity-50"
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {meta.touched && meta.error && (
        <p className="text-sm text-destructive">{meta.error}</p>
      )}
    </div>
  );
}
