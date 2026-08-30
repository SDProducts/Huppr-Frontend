"use client";
import { useOnboarding } from "@/context/onboarding.state";

const Progress = () => {
  const { step, setStep } = useOnboarding();
  const totalSteps = 4;
  const progress = Math.round((step / totalSteps) * 100);
  return (
    <div className="mb-5 space-y-1">
      <div className="flex justify-between text-sm">
        <div className="">
          Step {step} of {totalSteps}
        </div>
        <div className="text-primary">{progress}%</div>
      </div>
      <div className="w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          onClick={() => setStep(1)}
          className="h-1.5 bg-linear-to-r from-primary to-orange-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;
