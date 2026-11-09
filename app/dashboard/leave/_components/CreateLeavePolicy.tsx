"use client";
import ApprovalConfiguration from "@/app/dashboard/leave/_components/ApprovalConfiguration";
import EligibilityForm from "@/app/dashboard/leave/_components/EligibilityForm";
import EntitlementForm from "@/app/dashboard/leave/_components/EntitlementForm";
import PolicyInfoForm from "@/app/dashboard/leave/_components/PolicyInfoForm";
import PreviewLeavePolicy from "@/app/dashboard/leave/_components/PreviewLeavePolicy";
import RequestRulesForm from "@/app/dashboard/leave/_components/RequestRulesForm";
import { useSearchParams } from "next/navigation";

export default function CreateLeavePolicy() {
  const stepParams = useSearchParams();
  const step = stepParams.get("step");
  const policyId = stepParams.get("policyId");
  if (step === "eligibility") {
    return policyId ? <EligibilityForm /> : <PolicyInfoForm />;
  }
  if (step === "entitlement") {
    return policyId ? <EntitlementForm /> : <PolicyInfoForm />;
  }
  if (step === "request_rules") {
    return policyId ? <RequestRulesForm /> : <PolicyInfoForm />;
  }
  if (step === "approval_config") {
    return policyId ? <ApprovalConfiguration /> : <PolicyInfoForm />;
  }
  if (step === "preview_leave_policy") {
    return policyId ? <PreviewLeavePolicy /> : <PolicyInfoForm />;
  }
  return (
    <div>
      <PolicyInfoForm />
    </div>
  );
}
