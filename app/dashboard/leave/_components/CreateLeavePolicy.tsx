"use client";
import EligibilityForm from "@/app/dashboard/leave/_components/EligibilityForm";
import EntitlementForm from "@/app/dashboard/leave/_components/EntitlementForm";
import PolicyInfoForm from "@/app/dashboard/leave/_components/PolicyInfoForm";
import RequestRulesForm from "@/app/dashboard/leave/_components/RequestRulesForm";
import { useSearchParams } from "next/navigation";

export default function CreateLeavePolicy() {
  const stepParams = useSearchParams();
  const step = stepParams.get("step");
  if (step === "eligibility") {
    return <EligibilityForm />;
  }
  if (step === "entitlement") {
    return <EntitlementForm />;
  }
  if (step === "request_rules") {
    return <RequestRulesForm />;
  }
  return (
    <div>
      <PolicyInfoForm />
    </div>
  );
}
