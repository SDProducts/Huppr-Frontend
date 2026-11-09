"use client";
import { CreateLeavePolicyStep } from "@/app/dashboard/departments/_components/Steps&Progress";
import Button from "@/components/ui/CustomButton";
import { Separator } from "@/components/ui/separator";
import { TaskStatusPill } from "@/components/utils/Pills";
import {
  useGetSingleLeavePolicy,
  usePatchLeavePolicy,
} from "@/hooks/employer/useLeave";
import { getInitials } from "@/lib/utils";
import { ArrowRight, Bookmark, Pen } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PreviewLeavePolicy() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const policyId = searchParams.get("policyId");
  const { data: policy, isLoading: isGetttingPolicy } = useGetSingleLeavePolicy(
    policyId || ""
  );
  const { mutate: patchPolicy, isPending } = usePatchLeavePolicy(
    policyId || ""
  );
  function editPolicy(params: string) {
    if (params) {
      router.replace(
        `/dashboard/leave/create-leave-policy?step=${params}&policyId=${policyId}`
      );
    }
  }

  return (
    <div className="space-y-10">
      <div className="space-y-10">
        <div className="flex justify-between gap-4 items-start">
          <div className="flex-1">
            <h2 className="text-3xl font-extrabold">Create Leave Policy</h2>
            <p>
              Define a leave policy and configure eligibility, entitlement and
              approval rules.
            </p>
          </div>
          <div className="">
            <Button
              type="submit"
              label="Save Draft"
              icon={<Bookmark className="size-4" />}
              className="bg-transparent! border text-primary! w-fit! text-sm"
            />
          </div>
        </div>
        <CreateLeavePolicyStep currentStep={6} />
        <div className="flex justify-between gap-4 items-start">
          <div className="flex-1">
            <h2 className="text-xl font-bold">Preview Leave Policy</h2>
            <p>Verify policy details before finalizing. </p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-xl space-y-2">
          <div className="flex justify-between">
            <div className="text-2xl font-bold">Policy Information</div>
            <Button
              label="Edit"
              onClick={() => editPolicy("policy_info")}
              icon={<Pen className="size-4" />}
              className="w-fit! px-2 bg-transparent! text-primary!"
            />
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
            <Button
              onClick={() => editPolicy("eligibility")}
              label="Edit"
              icon={<Pen className="size-4" />}
              className="w-fit! px-2 bg-transparent! text-primary!"
            />
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
            <Button
              onClick={() => editPolicy("entitlement")}
              label="Edit"
              icon={<Pen className="size-4" />}
              className="w-fit! px-2 bg-transparent! text-primary!"
            />
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
            <Button
              label="Edit"
              onClick={() => editPolicy("request_rules")}
              icon={<Pen className="size-4" />}
              className="w-fit! px-2 bg-transparent! text-primary!"
            />
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
            <Button
              label="Edit"
              onClick={() => editPolicy("approval_config")}
              icon={<Pen className="size-4" />}
              className="w-fit! px-2 bg-transparent! text-primary!"
            />
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
      <div className="flex justify-end gap-4 border-t border-gray-200 py-5">
        <Button
          label="Save Draft"
          onClick={() => {
            patchPolicy({ status: "draft" });
          }}
          icon={<Bookmark className="size-4" />}
          isLoading={isPending}
          disabled={isPending}
          className="bg-transparent! border text-primary! w-fit! text-sm"
        />

        <Button
          label="Publish changes"
          onClick={() => {
            patchPolicy(
              { status: "active" },
              {
                onSuccess(data) {
                  router.push(`/dashboard/leave/${data.id}`);
                },
              }
            );
          }}
          className="w-fit!"
          isLoading={isPending}
          disabled={isPending || isGetttingPolicy}
          rightIcon={<ArrowRight className="size-4" />}
        />
      </div>
    </div>
  );
}
