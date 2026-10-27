"use client";
import {
  Award,
  Banknote,
  BriefcaseBusiness,
  CalendarClock,
  Coins,
  Copy,
  FileText,
  Globe,
  GraduationCap,
  HeartHandshake,
  MapPin,
  Pen,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserCheck2,
  UserCog,
  UserPlus2,
  Users,
  Users2,
} from "lucide-react";

import CreateRoleStep1 from "@/app/dashboard/departments/_components/CreateRoleStep1";
import ActivityEmptyState from "@/components/EmptyState";
import { CreateRoleStep2Skeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { useModal } from "@/context/modal.state";
import { useGetRolesById } from "@/hooks/employer/useDepartment";
import { cn, getCurrency, labelCase } from "@/lib/utils";
import { useParams } from "next/navigation";
import React from "react";

const RoleDetail = () => {
  const { roleId } = useParams();
  const modal = useModal();
  const { data: role, isLoading } = useGetRolesById(String(roleId));
  if (isLoading || !role) {
    return <CreateRoleStep2Skeleton />;
  }
  function handleEditRole() {
    modal.open({
      content: <CreateRoleStep1 roleID={role?.id} />,
      size: "sm:w-5xl",
      bgColor: "bg-[#F7F9FC]",
    });
  }
  const { requirements, benefits, metrics } = role;

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="pt-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-slate-900">{role.name}</h2>
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-slate-600">
              <Meta icon={BriefcaseBusiness} text={labelCase(role.level)} />
              <Meta icon={Sparkles} text={labelCase(role.employmentType)} />
              <Meta icon={MapPin} text={role.location} />
              <Meta icon={UserCog} text={labelCase(role.workArrangement)} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleEditRole}
              className={cn(
                "bg-transparent text-primary border border-primary hover:text-white py-0"
              )}
            >
              <Pen />
              <span>Edit Role</span>
            </Button>
            <Button
              className={cn(
                "bg-transparent text-primary border border-primary hover:text-white py-0"
              )}
            >
              <Copy />
            </Button>
            <Button
              className={cn(
                "bg-transparent text-red-500 border border-red-500 hover:text-white py-0"
              )}
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          icon={Users}
          title="Total Positions"
          value={metrics.totalPositions}
        />
        <MetricCard
          icon={UserCheck2}
          title="Filled Positions"
          value={metrics.filledPositions}
        />
        <MetricCard
          icon={UserPlus2}
          title="Open Positions"
          value={metrics.openPositions}
        />
        <MetricCard
          icon={Banknote}
          title="Avg. Salary"
          value={getCurrency(metrics.averageSalaryByCurrency[0] || 0, "NGN")}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          <Section title="Role Overview" icon={FileText}>
            <p>{role.description}</p>
          </Section>
          {/* Responsibilities */}
          <Section title="Responsibilities" icon={FileText}>
            <BulletList items={requirements?.responsibilities} />
          </Section>

          {/* Qualifications */}
          <Section title="Qualifications" icon={GraduationCap}>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field
                label="Minimum degree"
                value={requirements?.minimumDegree}
              />
              <Field
                label="Field of study"
                value={requirements?.fieldOfStudy}
              />
              <Field
                label="Experience"
                value={
                  requirements?.minYears != null &&
                  requirements?.maxYears != null
                    ? `${requirements?.minYears} – ${requirements?.maxYears} years`
                    : "—"
                }
              />
              <Field
                label="Certifications"
                value={
                  requirements?.certifications?.length
                    ? requirements?.certifications.join(", ")
                    : "—"
                }
              />
            </dl>
          </Section>

          {/* Reporting */}
          <Section title="Reporting" icon={Users}>
            <dl className="space-y-2">
              <Field
                label="Reports to"
                value={
                  role.reportsToUserId ? role.reportsToUserId.slice(0, 8) : "—"
                }
                inline
                mono
              />
              <Field
                label="Reporting line"
                value={benefits?.reportingLine || ""}
                inline
              />
              <Field
                label="Succession path"
                value={benefits?.successionPath || ""}
                inline
              />
            </dl>
          </Section>

          {/* Permissions */}
          <Section title="Role Permissions" icon={ShieldCheck}>
            <TagList
              items={role.permissionIds}
              empty="No permissions assigned"
            />
          </Section>

          {/* Other requirements */}
          {requirements?.otherRequirements && (
            <Section title="Other Requirements" icon={FileText}>
              <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
                {requirements?.otherRequirements}
              </p>
            </Section>
          )}

          {/* Compensation */}

          <Section title="Compensation" icon={Coins}>
            <div className="space-y-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Salary range
                </p>
                <p className="mt-1 text-xl font-bold text-slate-900">
                  {getCurrency(
                    benefits?.minimumSalary || 0,
                    benefits?.currency || "NGN"
                  )}{" "}
                  –{" "}
                  {getCurrency(
                    benefits?.maximumSalary || 0,
                    benefits?.currency || "NGN"
                  )}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Reviewed {labelCase(benefits?.salaryReviewFrequency || "")}
                </p>
              </div>

              <dl className="space-y-2">
                <Field label="Currency" value={benefits?.currency} inline />
                <Field
                  label="Probation"
                  value={`${benefits?.probationMonths} months`}
                  inline
                />
                <Field
                  label="Growth review"
                  value={labelCase(benefits?.growthReviewFrequency)}
                  inline
                />
              </dl>
            </div>
          </Section>

          <div className="grid grid-cols-2 bg-white rounded-xl p-4">
            {/* Skills */}
            <Section title="Required Skills" icon={Award}>
              <TagList
                items={requirements?.skills}
                empty="No skills specified"
              />
            </Section>
            {/* Languages */}
            <Section title="Languages" icon={Globe}>
              <TagList
                items={requirements?.languages}
                empty="No languages specified"
              />
            </Section>
          </div>
          <div className="p-4 grid grid-cols-2 bg-white rounded-2xl">
            {/* Leave */}
            <Section title="Leave Entitlement" icon={CalendarClock}>
              <TagList
                items={benefits?.leaveTypes}
                empty="No Leave type specified"
              />
            </Section>

            {/* Benefits */}
            <Section title="Benefits" icon={HeartHandshake}>
              <TagList
                items={benefits?.benefits}
                empty="No benefits specified"
              />
            </Section>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-2">
          <div className="p-5 bg-white rounded-2xl space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Users2 className="size-4 text-primary" />
                <div className="text-xl font-bold">Current Team</div>
              </div>
              <div className="px-4 py-0.5 rounded-sm text-xs text-gray-800 bg-gray-300">
                4 Active
              </div>
            </div>
            <ActivityEmptyState title="No employees found" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleDetail;

/* ---------- Small building blocks ---------- */

function MetricCard({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string | number;
}) {
  return (
    <div className="bg-white p-8 rounded-md">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-primary/5 text-primary flex items-center justify-center">
            <Icon className="w-6 h-6" />
          </div>
          <div className="font-semibold">{title}</div>
        </div>
        <div className="text-3xl font-bold text-center">{value}</div>
      </div>
    </div>
  );
}

function Meta({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text?: string;
}) {
  if (!text) return null;
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className="h-4 w-4 text-slate-400" />
      {text}
    </span>
  );
}

function StatusBadge({ status }: { status?: string }) {
  const tone =
    status === "active"
      ? "bg-green-50 text-green-700"
      : status === "draft"
      ? "bg-amber-50 text-amber-700"
      : "bg-slate-100 text-slate-600";
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        tone
      )}
    >
      {status ?? "unknown"}
    </span>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white p-5">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold uppercase tracking-wide">
        <Icon className="h-6 w-6 text-primary" />
        {title}
      </h3>
      {children}
    </section>
  );
}

function Field({
  label,
  value,
  inline,
  mono,
}: {
  label: string;
  value?: string | number | null;
  inline?: boolean;
  mono?: boolean;
}) {
  const display = value ?? "—";
  if (inline) {
    return (
      <div className="flex items-center justify-between gap-4">
        <dt className="text-sm text-slate-500">{label}</dt>
        <dd
          className={cn(
            "truncate text-sm font-medium text-slate-900",
            mono && "font-mono"
          )}
        >
          {display}
        </dd>
      </div>
    );
  }
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-medium text-slate-900">{display}</dd>
    </div>
  );
}

function BulletList({ items }: { items?: string[] }) {
  if (!items?.length) {
    return <p className="text-sm text-slate-400">No items specified</p>;
  }
  return (
    <ul className="space-y-1.5">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function TagList({
  items,
  empty = "None",
}: {
  items?: string[];
  empty?: string;
}) {
  if (!items?.length) {
    return <p className="text-base text-slate-400">{empty}</p>;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it, i) => (
        <span
          key={i}
          className="rounded-full bg-slate-100 px-4 py-0.5 text-sm font-medium text-slate-700"
        >
          {it}
        </span>
      ))}
    </div>
  );
}
