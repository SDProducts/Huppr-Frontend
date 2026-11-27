"use cleint";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";

const Steps = () => {
  const params = useSearchParams();
  const currentStep = Number(params.get("step"));
  const steps = [
    { id: 1, label: "Job Details" },
    { id: 2, label: "ATS & Screening" },
    { id: 3, label: "Hiring Process" },
    { id: 4, label: "Review & Publish" },
  ];

  return (
    <div className={cn("w-full bg-white p-4 rounded-xl")}>
      <div className="grid grid-cols-4 gap-4">
        {steps.map((step, i) => {
          const isActive = step.id === currentStep;
          const isComplete = step.id < currentStep;
          const isNext = step.id - currentStep === 1;

          return (
            <div
              key={i}
              className={cn(
                "flex items-center gap-3",
                isActive || isComplete
                  ? "bg-primary/5 py-2 px-5 rounded-md"
                  : ""
              )}
            >
              {/* Numbered circle */}
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-md text-sm font-semibold transition-colors",
                  isActive || isComplete
                    ? "bg-primary text-white"
                    : "bg-[#E6E8EB] text-[#596474]"
                )}
              >
                {isComplete ? (
                  <Check className="size-4" strokeWidth={4} />
                ) : (
                  step.id
                )}
              </div>

              {/* Label */}
              <div className="text-left">
                {isActive ? (
                  <div className="text-primary uppercase font-bold">
                    Current Step
                  </div>
                ) : isComplete ? (
                  <div className="text-primary uppercase font-bold">
                    Completed
                  </div>
                ) : isNext ? (
                  <div className="font-bold uppercase">Next Step</div>
                ) : (
                  <div className="font-bold uppercase">Upcoming</div>
                )}
                <div
                  className={cn(
                    "text-xs transition-colors",

                    "font-medium text-[#596474]"
                  )}
                >
                  {step.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Steps;
