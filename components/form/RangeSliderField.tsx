"use client";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useField } from "formik";

interface RangeSliderFieldProps {
  name: string;
  label?: string;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  className?: string;
  sliderClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export default function RangeSliderField({
  name,
  label,
  description,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = true,
  formatValue,
  className,
  sliderClassName,
  labelClassName,
  valueClassName,
}: RangeSliderFieldProps) {
  const [field, meta, helpers] = useField<[number, number]>(name);

  const currentValue = Array.isArray(field.value) ? field.value : [min, max];

  const values: [number, number] = [
    Math.max(min, Math.min(max, Number(currentValue[0]) || min)),
    Math.max(min, Math.min(max, Number(currentValue[1]) || max)),
  ];

  const format = (value: number) =>
    formatValue ? formatValue(value) : String(value);

  return (
    <div className={cn("w-full space-y-3", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-3">
          {label && (
            <label className={cn("text-sm font-medium", labelClassName)}>
              {label}
            </label>
          )}

          {showValue && (
            <div
              className={cn(
                "flex items-center gap-2 text-sm font-semibold",
                valueClassName
              )}
            >
              <span>{format(values[0])}</span>
              <span className="text-muted-foreground">–</span>
              <span>{format(values[1])}</span>
            </div>
          )}
        </div>
      )}

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      <Slider
        min={min}
        max={max}
        step={step}
        //   minStepsBetweenThumbs={0}
        value={values}
        disabled={disabled}
        onValueChange={(nextValues) => {
          if (!Array.isArray(nextValues) || nextValues.length !== 2) return;

          helpers.setValue([nextValues[0], nextValues[1]]);
        }}
        onValueCommitted={() => {
          void helpers.setTouched(true);
        }}
        className={cn("py-2", sliderClassName)}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>

      {meta.touched && meta.error && (
        <p className="text-xs text-destructive">
          {typeof meta.error === "string"
            ? meta.error
            : "Please provide a valid range."}
        </p>
      )}
    </div>
  );
}
