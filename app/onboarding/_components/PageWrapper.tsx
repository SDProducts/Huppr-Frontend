"use client";

import CompanyDetailForm from "@/app/onboarding/_components/CompanyDetailForm";
import DepartmentsSelect from "@/app/onboarding/_components/DepartmentsSelect";
import OnboardingComplete from "@/app/onboarding/_components/OnboardingComplete";
import WorkspaceSettings from "@/app/onboarding/_components/WorkspaceSettings";
import { redirect, useParams } from "next/navigation";

const PageWrapper = () => {
  const { step } = useParams();
  if (step === "company_setup") {
    return <CompanyDetailForm />;
  }
  if (step === "departments") {
    return <DepartmentsSelect />;
  }
  if (step === "workspace_settings") {
    return <WorkspaceSettings />;
  }
  if (step === "review") {
    return <OnboardingComplete />;
  }
  return redirect("/onboarding");
};

export default PageWrapper;
