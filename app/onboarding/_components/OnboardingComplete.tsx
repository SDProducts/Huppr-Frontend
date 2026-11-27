/* eslint-disable react/no-unescaped-entities */
"use client";
import { CompanyFormSkeleton } from "@/components/skeletons";
import Button from "@/components/ui/CustomButton";
import { useGetOnboarding } from "@/hooks/auth/useOnboarding";
import { ArrowRight, Check } from "lucide-react";
import { redirect } from "next/navigation";

const OnboardingComplete = () => {
  const { data } = useGetOnboarding();
  const completedSteps = [
    {
      name: "Company Created",
      desc: "Organization profile and branding settings finalized.",
    },
    {
      name: "Departments Added",
      desc: "Heirarchical structures and teams leads assigned.",
    },
    {
      name: "Workspace ready",
      desc: "All modules, permissions and tools are live.",
    },
  ];
  if (!data) {
    return <CompanyFormSkeleton />;
  }
  if (data.status === "completed") {
    return redirect("/onboarding");
  }
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center">
        <div className="h-50 w-50 rounded-full flex justify-center items-center bg-primary text-white">
          <Check className="h-35 w-35" strokeWidth={5} />
        </div>
        <h2 className="font-bold text-3xl mt-4">Your workspace is ready</h2>
        <div className="">
          We've configured everything based on your preferences. You are now
          ready to start managing your team with calm intelligence.
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-1">
        {completedSteps.map((item, i) => (
          <div
            className="border border-gray-200 rounded-md p-2 space-y-1"
            key={i}
          >
            <div className="flex gap-1 items-center">
              <div className="h-7 w-7 flex justify-center rounded-full items-center bg-green-500/20 text-green-500">
                <Check className="h-3.5 w-3.5" strokeWidth={4} />
              </div>
              <div className="text-sm flex-1 font-medium">{item.name}</div>
            </div>
            <div className="text-xs">{item.desc}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          type="link"
          href="/dashboard"
          label="Go to Dashboard"
          loadingLabel="Completing company profile"
          rightIcon={<ArrowRight />}
          className="w-fit! px-6 bg-primary! text-white!"
        />
      </div>
    </div>
  );
};

export default OnboardingComplete;
