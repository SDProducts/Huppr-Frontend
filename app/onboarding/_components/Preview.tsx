"use client";

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  Edit3,
  Flag,
  Globe2,
  Mail,
  MapPin,
  Users,
} from "lucide-react";
import * as React from "react";

// import { Button } from "@/components/ui/button";
import { CompanyFormSkeleton } from "@/components/skeletons";
import Button from "@/components/ui/CustomButton";
import { Separator } from "@/components/ui/separator";
import { useGetMyDetails } from "@/hooks/auth/useAuth";
import {
  useCompleteOnboarding,
  useGetOnboarding,
} from "@/hooks/auth/useOnboarding";
import Link from "next/link";

export default function EmployerOnboardingPreview() {
  const { mutate: complete, isPending } = useCompleteOnboarding();

  const { data } = useGetOnboarding();
  const { data: myDataRes } = useGetMyDetails();
  if (!data || !myDataRes) {
    return <CompanyFormSkeleton />;
  }
  const company = data.company;
  const departments = data.departments;
  const workspace = data.workspaceSettings;
  return (
    <main className="min-h-screen">
      {/* Main */}
      <div className="mx-auto">
        {/* Intro */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="h-25 w-25 mx-auto rounded-full flex justify-center items-center bg-primary text-white">
            <Check className="h-15 w-15" strokeWidth={5} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Review your company profile
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Everything looks good? Review your company information below before
            creating your employer profile.
          </p>
        </div>

        {/* Preview Card */}
        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Company Cover */}
          <div className="h-32 bg-linear-to-r from-primary via-blue-500 to-indigo-500" />

          {/* Company identity */}
          <div className="px-6 pb-7 sm:px-8">
            <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-white shadow-sm">
                  {company.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt={company.name}
                      className="h-full w-full rounded-xl object-cover"
                    />
                  ) : (
                    <Building2 className="h-9 w-9 text-blue-600" />
                  )}
                </div>

                <div className="">
                  <h2 className="text-xl font-bold text-slate-950">
                    {company.name}
                  </h2>

                  <p className="text-sm text-slate-500">
                    {company.industryName}
                  </p>
                </div>
              </div>
            </div>

            {/* Company details */}
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <h3 className="text-sm border-b border-gray-400 font-bold text-slate-900">
                  Company information
                </h3>

                <Link
                  href={"/onboarding/company_setup"}
                  className="flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  <Edit3 className="h-3 w-3" />
                  Edit
                </Link>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <InfoItem
                  icon={Building2}
                  label="Industry"
                  value={company.industryName}
                />

                <InfoItem
                  icon={Users}
                  label="Company size"
                  value={company.sizeLabel}
                />

                <InfoItem
                  icon={Globe2}
                  label="Website"
                  value={company.website}
                />

                <InfoItem
                  icon={Mail}
                  label="Company email"
                  value={myDataRes?.email}
                />
              </div>
            </div>

            <Separator className="my-7" />

            {/* Departments details */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm border-b border-gray-400 font-bold text-slate-900">
                  Departments information
                </h3>

                <Link
                  href={"/onboarding/departments"}
                  className="flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  <Edit3 className="h-3 w-3" />
                  Edit
                </Link>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {departments.map((item, i) => (
                  <DeptItem key={i} icon={Building2} label={item.name} />
                ))}
              </div>
            </div>
            <Separator className="my-7" />

            {/* Workspace details */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm border-b border-gray-400 font-bold text-slate-900">
                  Workspace Settings
                </h3>

                <Link
                  href={"/onboarding/workspace_settings"}
                  className="flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  <Edit3 className="h-3 w-3" />
                  Edit
                </Link>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <InfoItem
                  icon={MapPin}
                  label="Country"
                  value={workspace.countryName}
                />

                <InfoItem
                  icon={Flag}
                  label="Country code & Locale"
                  value={`${workspace.countryCode} | ${workspace.locale}`}
                />

                <InfoItem
                  icon={Globe2}
                  label="Timezone"
                  value={workspace.timezone}
                />

                <InfoItem
                  icon={CalendarDays}
                  label="Week Starts"
                  value={workspace.weekStartsOn}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Public profile preview */}
        <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
              <Globe2 className="h-4 w-4" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Your company profile is ready
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                This information will be used to create your employer profile
                and help candidates learn more about your company when viewing
                your job postings.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mx-auto mt-8 flex max-w-3xl flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button
            type="link"
            href="/onboarding/workspace_settings"
            icon={<ArrowLeft className="mr-2 h-4 w-4" />}
            label="Back to details"
            className="h-11 w-fit! px-5 bg-transparent! text-primary! border border-gray-300"
          />

          <Button
            label="Complete Company Profile"
            loadingLabel="Completing company profile"
            rightIcon={<ArrowRight className="ml-2 h-4 w-4" />}
            className="h-11 w-fit!"
            onClick={complete}
            isLoading={isPending}
            disabled={isPending}
          />
        </div>

        <p className="mt-4 text-center text-[11px] text-slate-400">
          You can update your company information anytime from your employer
          dashboard.
        </p>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* INFO ITEM                                                                  */
/* -------------------------------------------------------------------------- */

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-medium text-slate-400">{label}</p>

        <p className="mt-1 truncate text-sm font-medium text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}
function DeptItem({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex gap-1.5 items-center bg-slate-50 rounded-lg py-2 px-4">
      <div className="flex shrink-0 items-center justify-center text-slate-500">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-slate-800">{label}</p>
      </div>
    </div>
  );
}
