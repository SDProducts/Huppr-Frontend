"use client";

import { cn } from "@/lib/utils";

export interface Step {
  id: string;
  label: string;
}

interface StepperProps {
  //   steps: Step[];
  currentStep: number; // 1-based
  className?: string;
}

export default function Stepper({
  //   steps,
  currentStep,
  className,
}: StepperProps) {
  const steps = [
    { id: "basic", label: "Basic Info" },
    { id: "requirements", label: "Requirements" },
    { id: "organisation", label: "Organisation" },
    { id: "benefits", label: "Benefits" },
    { id: "review", label: "Review" },
  ];

  return (
    <div className={cn("w-full", className)}>
      <ol className="flex items-start">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isComplete = stepNumber < currentStep;

          return (
            <li
              key={step.id}
              className="relative flex flex-1 flex-col items-center"
            >
              {/* Connector line (skip on first item) */}
              {index > 0 && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-[-50%] right-[50%] top-3.5 h-px",
                    isComplete || isActive ? "bg-primary" : "bg-[#E6E8EB]"
                  )}
                />
              )}

              {/* Numbered circle */}
              <div
                className={cn(
                  "relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  isActive || isComplete
                    ? "bg-primary text-white"
                    : "bg-[#E6E8EB] text-[#596474]"
                )}
              >
                {stepNumber}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "mt-1.5 text-center text-xs transition-colors",
                  isActive
                    ? "font-semibold text-[#2864e8]"
                    : "font-medium text-[#596474]"
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
