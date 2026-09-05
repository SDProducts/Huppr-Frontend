"use client";
import { useGetOnboarding } from "@/hooks/auth/useOnboarding";

const Progress = () => {
  const { data, isLoading } = useGetOnboarding();
  const currentStep = data?.currentStep;
  const totalSteps = data?.totalSteps;
  const progress = data?.progressPercentage;
  if (isLoading) {
    <div className="space-y-2">
      <div className="flex justify-between items-cnter">
        <div className="h-3 w-20 bg-gray-300 rounded-sm animate-pulse" />
        <div className="h-3 w-20 bg-gray-300 rounded-sm animate-pulse" />
      </div>
      <div className="h-1.5 animate-pulse w-full"></div>
    </div>;
  }
  return (
    <div className="mb-5 space-y-1">
      <div className="flex justify-between text-sm">
        <div className="">
          Step {currentStep} of {totalSteps}
        </div>
        <div className="text-primary">{progress}%</div>
      </div>
      <div className="w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-1.5 bg-linear-to-r from-primary to-orange-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;
