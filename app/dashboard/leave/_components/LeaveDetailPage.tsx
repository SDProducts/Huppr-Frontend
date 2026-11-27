"use client";
import { PageLoader } from "@/components/global/PageLoader";
import { Separator } from "@/components/ui/separator";
import { TaskStatusPill } from "@/components/utils/Pills";
import { useGetSingleLeavePolicy } from "@/hooks/employer/useLeave";
import { getInitials } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useParams } from "next/navigation";

export default function LeaveDetailPage() {
  const { policyId } = useParams();
  const { data: policy, isLoading } = useGetSingleLeavePolicy(String(policyId));
  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <div className="space-y-10">
      <div className="space-y-10">
        <div className="flex justify-between gap-4 items-start">
          <div className="flex-1">
            <h2 className="text-3xl font-extrabold">{policy?.name} Policy</h2>
            <p>{policy?.description || "..."}</p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-xl space-y-2">
          <div className="flex justify-between">
            <div className="text-2xl font-bold">Policy Information</div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4 text-sm mt-5">
            <div className="">
              <div className="uppercase font-semibold">Policy Name</div>
              <div className="">{policy?.name || "..."}</div>
            </div>
            <div className="">
              <div className="uppercase font-semibold">Policy Type</div>
              <div className="">{policy?.leaveType || "..."}</div>
            </div>
            <div className="">
              <div className="uppercase font-semibold">Status</div>
              <div className="">
                <TaskStatusPill status={policy?.description || "draft"} />
              </div>
            </div>
            <div className="">
              <div className="uppercase font-semibold">Description</div>
              <div className="">{policy?.description || "..."}</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl space-y-2">
          <div className="flex justify-between">
            <div className="text-2xl font-bold">Policy Eligibility</div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4 text-sm mt-5">
            <div className="">
              <div className="uppercase font-semibold">Departments</div>
              <div className="">
                {policy?.departmentIds.map((dept) => (
                  <div
                    key={dept}
                    className="bg-slate-100 rounded-full px-2 py-0.5 text-xs"
                  >
                    {dept}
                  </div>
                )) || "None"}
              </div>
            </div>
            <div className="">
              <div className="uppercase font-semibold">
                Policy Employement Type
              </div>
              <div className="">{policy?.employmentTypes || "..."}</div>
            </div>
            <div className="">
              <div className="uppercase font-semibold">TENURE REQUIREMENT</div>
              <div className="">{policy?.advanceNoticeDays || "..."}</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl space-y-2">
          <div className="flex justify-between">
            <div className="text-2xl font-bold">
              Policy Entitlement & Accrual
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4 text-sm mt-5">
            <div className="">
              <div className="uppercase font-semibold">BASE ALLOWANCE</div>
              <div className="">
                <span className="font-semibold text-2xl pr-1">
                  {policy?.daysPerYear || 0}
                </span>
                <span>days / year</span>
              </div>
            </div>
            <div className="">
              <div className="uppercase font-semibold">
                Policy ACCRUAL FREQUENCY
              </div>
              <div className="">{policy?.accrualFrequency || "..."}</div>
            </div>
            <div className="">
              <div className="uppercase font-semibold">Pro-Rating</div>
              <div className="">
                {policy?.proRateNewHires
                  ? "Enabled based on start date"
                  : "Disabled"}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl space-y-2">
          <div className="flex justify-between">
            <div className="text-2xl font-bold">Restrictions & Rules </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4 text-sm mt-5">
            <div className="">
              <div className="uppercase font-semibold">NOTICE PERIOD</div>
              <div className="">
                <span className="font-semibold text-2xl pr-1">
                  {policy?.advanceNoticeDays || 0}
                </span>
                <span>days</span>
              </div>
            </div>
            <div className="">
              <div className="uppercase font-semibold">CARRY FORWARD </div>
              <div className="">{policy?.carryoverExpiry || "..."}</div>
            </div>
            <div className="">
              <div className="uppercase font-semibold">
                Max Consecutive Days{" "}
              </div>
              <div className="">
                <span className="font-semibold text-2xl pr-1">
                  {policy?.maxConsecutiveDays || 0}
                </span>
                <span>days</span>
              </div>
            </div>
            <div className="">
              <div className="uppercase font-semibold">
                require Ducumentation
              </div>
              <div className="">
                {policy?.requireDocumentation ? "Yes" : "No"}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl space-y-2">
          <div className="flex justify-between">
            <div className="text-2xl font-bold">Workflow Details </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4 text-sm mt-5">
            <div className="">
              <div className="uppercase font-semibold">Approval chain</div>
              <div className="flex items-center gap-1 mt-1">
                {policy?.approvalChain.map((item, i) => (
                  <>
                    {i > 0 && <ArrowRight className="size-4 text-slate-300" />}
                    <div
                      key={i}
                      className="text-xs size-7 bg-primary/5 rounded-full flex justify-center items-center"
                    >
                      {getInitials(item.approverRole)}
                    </div>
                  </>
                ))}
              </div>
              <div className="flex items-center gap-1 mt-1">
                {policy?.approvalChain.map((item, i) => (
                  <>
                    {i > 0 && <ArrowRight className="size-4 text-slate-300" />}
                    <div key={i} className="text-xs">
                      {item.approverRole}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
