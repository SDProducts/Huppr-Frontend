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
      <div className="flex justify-between items-end text-sm">
        <div className="">
          <div className="flex items-center gap-1.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
              H
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">Huppr</p>
              <p className="text-[11px] text-slate-500">Employer onboarding</p>
            </div>
          </div>
        </div>
        <div className="text-right text-xs">
          <div className="text-slate-500">
            Step{" "}
            <span className="font-semibold text-slate-900">{currentStep}</span>{" "}
            of {totalSteps}
          </div>

          {/* <div className="text-primary">{progress}%</div> */}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-full bg-gray-200 rounded-full overflow-hidden flex-1">
          <div
            className="h-1.5 bg-linear-to-r from-primary to-orange-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-primary text-xs">{progress}%</div>
      </div>
    </div>
  );
};

export default Progress;
