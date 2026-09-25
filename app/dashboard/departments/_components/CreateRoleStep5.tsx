"use client";

import {
  Award,
  BriefcaseBusiness,
  CalendarClock,
  Coins,
  FileText,
  Globe,
  GraduationCap,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  UserCog,
  Users,
} from "lucide-react";

import Stepper from "@/app/dashboard/departments/_components/Steps&Progress";
import { CreateRoleStep2Skeleton } from "@/components/skeletons";
import { useGetRolesById } from "@/hooks/employer/useDepartment";
import { cn } from "@/lib/utils";

const currency = (n: number, code: string) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: code,
    maximumFractionDigits: 0,
  }).format(n);

const labelCase = (s?: string) =>
  s ? s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "—";

const date = (s?: string) =>
  s
    ? new Date(s).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

interface RolePreviewProps {
  className?: string;
  roleId: string;
}

export default function RolePreview({ roleId, className }: RolePreviewProps) {
  const { data: role, isLoading } = useGetRolesById(roleId);
  if (isLoading || !role) {
    return <CreateRoleStep2Skeleton />;
  }

  const { requirements, benefits } = role;

  return (
    <div className={cn("space-y-10 px-4", className)}>
      <div className="space-y-4">
        <div className="">
          <h2 className="text-2xl font-bold">Review & Create</h2>
          <p className="text-sm w-2/3">
            Please review the summarized details of the new role below. You can
            go back to edit any section or save this as a draft.{" "}
          </p>
        </div>
        <Stepper currentStep={5} />
      </div>
      <div className="space-y-4">
        {/* Header */}
        <header className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-slate-900">
                  {role.name}
                </h2>
                <StatusBadge status={role.status} />
                {!role.isSystem && (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                    Custom
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-slate-600">{role.description}</p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-slate-600">
                <Meta icon={BriefcaseBusiness} text={labelCase(role.level)} />
                <Meta icon={Sparkles} text={labelCase(role.employmentType)} />
                <Meta icon={MapPin} text={role.location} />
                <Meta icon={UserCog} text={labelCase(role.workArrangement)} />
              </div>
            </div>

            <div className="text-right text-xs text-slate-500">
              <p>Created {date(role.createdAt)}</p>
              <p>Updated {date(role.updatedAt)}</p>
              <p className="mt-1 font-mono text-[11px]">Rev {role.revision}</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-[2fr_1fr]">
          {/* LEFT COLUMN */}
          <div className="space-y-2">
            {/* Responsibilities */}
            <Section title="Responsibilities" icon={FileText}>
              <BulletList items={requirements.responsibilities} />
            </Section>

            {/* Qualifications */}
            <Section title="Qualifications" icon={GraduationCap}>
              <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field
                  label="Minimum degree"
                  value={requirements.minimumDegree}
                />
                <Field
                  label="Field of study"
                  value={requirements.fieldOfStudy}
                />
                <Field
                  label="Experience"
                  value={
                    requirements.minYears != null &&
                    requirements.maxYears != null
                      ? `${requirements.minYears} – ${requirements.maxYears} years`
                      : "—"
                  }
                />
                <Field
                  label="Certifications"
                  value={
                    requirements.certifications?.length
                      ? requirements.certifications.join(", ")
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
                    role.reportsToUserId
                      ? role.reportsToUserId.slice(0, 8)
                      : "—"
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
            <Section title="System Permissions" icon={ShieldCheck}>
              <TagList
                items={role.permissionIds}
                empty="No permissions assigned"
              />
            </Section>

            {/* Other requirements */}
            {requirements.otherRequirements && (
              <Section title="Other Requirements" icon={FileText}>
                <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
                  {requirements.otherRequirements}
                </p>
              </Section>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-2">
            {/* Compensation */}
            <Section title="Compensation" icon={Coins}>
              <div className="space-y-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Salary range
                  </p>
                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {currency(
                      benefits?.minimumSalary || 0,
                      benefits?.currency || "NGN"
                    )}{" "}
                    –{" "}
                    {currency(
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

            {/* Skills */}
            <Section title="Required Skills" icon={Award}>
              <TagList
                items={requirements.skills}
                empty="No skills specified"
              />
            </Section>

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

            {/* Languages */}
            <Section title="Languages" icon={Globe}>
              <TagList
                items={requirements.languages}
                empty="No languages specified"
              />
            </Section>
          </div>
        </div>
      </div>
      {/* Members */}
      {/* {metrics.members.length > 0 && (
        <Section title="Current Members" icon={Users}>
          <div className="space-y-2">
            {metrics.members.map((m) => (
              <div
                key={m.userId}
                className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"
              >
                {m.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.avatarUrl}
                    alt={m.displayName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                    {m.displayName.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {m.displayName}
                  </p>
                  <p className="text-xs text-slate-500">
                    Started {date(m.startsOn)}
                  </p>
                </div>
                <span className="font-mono text-[11px] text-slate-400">
                  {m.employeeId.slice(0, 8)}
                </span>
              </div>
            ))}
          </div>
        </Section>
      )} */}
    </div>
  );
}

/* ---------- Small building blocks ---------- */

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

function StatCard({
  label,
  value,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "default" | "accent";
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        tone === "accent"
          ? "border-blue-200 bg-blue-50"
          : "border-slate-200 bg-white"
      )}
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p
        className={cn(
          "mt-2 text-2xl font-bold",
          tone === "accent" ? "text-blue-700" : "text-slate-900"
        )}
      >
        {value}
      </p>
    </div>
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
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
        <Icon className="h-4 w-4 text-primary" />
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
    return <p className="text-sm text-slate-400">{empty}</p>;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it, i) => (
        <span
          key={i}
          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
        >
          {it}
        </span>
      ))}
    </div>
  );
}
