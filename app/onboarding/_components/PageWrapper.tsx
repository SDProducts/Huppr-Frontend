/* eslint-disable react/no-unescaped-entities */
"use client";

import CompanyDetailForm from "@/app/onboarding/_components/CompanyDetailForm";
import DepartmentsSelect from "@/app/onboarding/_components/DepartmentsSelect";
import OnboardingComplete from "@/app/onboarding/_components/OnboardingComplete";
import WorkspaceSettings from "@/app/onboarding/_components/WorkspaceSettings";
import WelcomeImage from "@/assets/Background+Border+Shadow.png";
import Button from "@/components/ui/CustomButton";
import { useOnboarding } from "@/context/onboarding.state";
import { useGetOnboarding } from "@/hooks/auth/useOnboarding";
import { ArrowRight, LockKeyhole } from "lucide-react";
import Image from "next/image";

const PageWrapper = () => {
  useGetOnboarding();
  const { step, setStep, completed } = useOnboarding();
  if (step === 1) {
    return <CompanyDetailForm />;
  }
  if (step === 2) {
    return <DepartmentsSelect />;
  }
  if (step === 3) {
    return <WorkspaceSettings />;
  }
  if (step === 4) {
    return <OnboardingComplete />;
  }
  return (
    <div className="text-center space-y-8">
      <div className="">
        <div className="">
          <Image
            src={WelcomeImage}
            alt="Onboarding image"
            loading="eager"
            className="h-75 w-auto mx-auto"
          />
        </div>
        <h2 className="text-3xl font-bold">Welcome to Huppr</h2>
        <p className="mt-2">
          Let's get your workspace ready. This only takes a couple of minutes.
        </p>
      </div>
      <div className="space-y-4">
        <Button
          label="Get Started"
          className="text-xl w-fit! px-20"
          rightIcon={<ArrowRight size={20} />}
          onClick={() => setStep(step + 1)}
        />
        <div className="flex items-center justify-center gap-1 text-gray-500">
          <LockKeyhole size={18} />{" "}
          <div className="">Secured workspace setup</div>
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
