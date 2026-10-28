"use client";

import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  CalendarCheck,
  CalendarDays,
  Check,
  ChevronRight,
  FileText,
  FolderOpen,
  Globe2,
  LucideIcon,
  PieChart,
  Plus,
  RefreshCw,
  Settings,
  ShieldCheck,
  UserRoundCheck,
  Users,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const summaryCards = [
  {
    title: "Active Leave Policies",
    value: "0",
    link: "Manage policies",
    icon: FileText,
    color: "indigo",
  },
  {
    title: "Pending Requests",
    value: "0",
    link: "View requests",
    icon: CalendarCheck,
    color: "emerald",
  },
  {
    title: "On Leave Today",
    value: "0",
    link: "View employees",
    icon: Users,
    color: "orange",
  },
  {
    title: "Returning This Week",
    value: "0",
    link: "View returning list",
    icon: RefreshCw,
    color: "blue",
  },
  {
    title: "Leave Utilization",
    value: "0%",
    link: "View full report",
    icon: PieChart,
    color: "purple",
  },
] as const;

const setupSteps = [
  {
    title: "Set Leave Organisation",
    action: "set-leave-organisation",
    description: "Define your leave year, accrual settings and general rules.",
    icon: Building2,
    completed: true,
    status: "Completed",
  },
  {
    title: "Create Leave Policies",
    action: "create-leave-policy",
    description: "Create and configure the leave types and entitlements.",
    icon: ShieldCheck,
    status: "Set Up",
  },
  {
    title: "Configure Approvals",
    action: "configure-approvals",
    description: "Set up approval flows and escalation rules.",
    icon: UserRoundCheck,
    status: "Set Up",
  },
  {
    title: "Assign Policy to Employees",
    action: "assign-Policy-to-Employees",
    description: "Apply policies to departments, roles or employees.",
    icon: Users,
    status: "Set Up",
  },
];

const tabs = [
  "Leave Policies",
  "Leave Requests",
  "Balances Overview",
  "Calendar",
] as const;

const quickLinks = [
  {
    title: "Leave Calendar",
    description: "View team leave calendar",
    icon: CalendarDays,
    color: "indigo",
    tab: "Calendar",
  },
  {
    title: "Leave Balances",
    description: "View employee balances",
    icon: Wallet,
    color: "emerald",
    tab: "Balances Overview",
  },
  {
    title: "Public Holidays",
    description: "Manage public holidays",
    icon: Globe2,
    color: "blue",
    tab: "Calendar",
  },
  {
    title: "Leave Reports",
    description: "View leave analytics",
    icon: BarChart3,
    color: "orange",
    tab: "Leave Reports",
  },
] as const;

const colorStyles = {
  indigo: {
    icon: "bg-indigo-50 text-indigo-500",
    link: "text-indigo-600",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-600",
    link: "text-emerald-600",
  },
  orange: {
    icon: "bg-orange-50 text-orange-500",
    link: "text-orange-600",
  },
  blue: {
    icon: "bg-blue-50 text-blue-600",
    link: "text-blue-600",
  },
  purple: {
    icon: "bg-purple-50 text-purple-600",
    link: "text-purple-600",
  },
} as const;

type LeaveTab = (typeof tabs)[number];

export default function LeaveOverviewPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<LeaveTab>("Leave Policies");
  function handleAction(action: string) {
    router.push(`/dashboard/leave/${action}`);
  }
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[1600px] space-y-7">
        {/* Page header */}
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-extrabold">Leave</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage leave policies, requests and balances
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="cursor-pointer inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-2.5 text-sm font-semibold transition hover:bg-muted">
              <BarChart3 className="h-4 w-4" />
              Leave Reports
              <ChevronRight className="h-4 w-4" />
            </button>

            <button className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
              <Settings className="h-4 w-4" />
              Leave Settings
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Summary cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {summaryCards.map((card, i) => {
            const Icon = card.icon;
            const styles = colorStyles[card.color];

            return (
              <StatCard
                key={i}
                title={card.title}
                value={card.value}
                link={card.link}
                linkStyle={styles.link}
                iconStyle={styles.icon}
                icon={Icon}
              />
            );
          })}
        </section>

        {/* Setup wizard */}
        <section className="rounded-xl bg-white p-5 shadow-sm sm:p-8">
          <div>
            <h2 className="text-lg font-bold">
              Set up Leave for your organisation
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Complete these quick steps to get leave management up and running.
            </p>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {setupSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Connector between steps */}
                  {index < setupSteps.length - 1 && (
                    <div className="absolute left-[calc(50%+55px)] top-10 hidden h-0.5 w-[calc(100%-90px)] bg-blue-100 xl:block" />
                  )}

                  <div className="relative flex h-[84px] w-[84px] items-center justify-center rounded-full border-2 border-gray-200">
                    <div className="flex h-[66px] w-[66px] items-center justify-center rounded-full bg-primary/5">
                      <Icon className="h-7 w-7 text-blue-600" />
                    </div>

                    <span
                      className={cn(
                        "absolute -right-0.5 -top-0.5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white",
                        step.completed ? "bg-emerald-500" : "bg-primary"
                      )}
                    >
                      {step.completed ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        index + 1
                      )}
                    </span>
                  </div>

                  <h3 className="mt-5 text-sm font-bold">{step.title}</h3>
                  <p className="mt-2 min-h-[42px] max-w-[230px] text-xs leading-5 text-muted-foreground">
                    {step.description}
                  </p>

                  <button
                    disabled={step.completed}
                    onClick={() => handleAction(step.action)}
                    className={cn(
                      "mt-4 w-full max-w-[160px] rounded-lg px-4 py-2.5 text-xs font-semibold transition",
                      step.completed
                        ? "cursor-default bg-blue-50 text-blue-600"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    )}
                  >
                    {step.status}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Main content and sidebar */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          {/* Tabbed content */}
          <section className="min-h-[560px] overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="overflow-x-auto scrollbar-hide border-b border-gray-200">
              <div className="grid grid-cols-4">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "relative whitespace-nowrap py-4 text-sm transition",
                      activeTab === tab
                        ? "font-semibold text-blue-600"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex min-h-[490px] items-center justify-center p-6 sm:p-10">
              <div className="flex max-w-md flex-col items-center text-center">
                <div className="relative mb-7">
                  <FolderOpen className="h-16 w-16 text-blue-200" />
                  <span className="absolute -left-4 top-5 text-blue-200">
                    ✦
                  </span>
                  <span className="absolute -right-3 -top-2 text-blue-200">
                    ✧
                  </span>
                </div>

                <h2 className="text-xl font-bold">
                  {activeTab === "Leave Policies"
                    ? "No leave policies yet"
                    : activeTab === "Leave Requests"
                    ? "No leave requests yet"
                    : activeTab === "Balances Overview"
                    ? "No leave balances yet"
                    : "No calendar entries yet"}
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {activeTab === "Leave Policies"
                    ? "Create your first leave policy to define entitlements and start managing leave."
                    : activeTab === "Leave Requests"
                    ? "Employee leave requests will appear here when submitted."
                    : activeTab === "Balances Overview"
                    ? "Employee leave balances will appear here once policies are assigned."
                    : "Your team's leave schedules and public holidays will appear here."}
                </p>

                <button
                  // onClick={() =>
                  //   navigate(
                  //     activeTab === "Leave Policies"
                  //       ? "Create Leave Policy"
                  //       : activeTab
                  //   )
                  // }
                  className="mt-7 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  {activeTab === "Leave Policies"
                    ? "Create Leave Policy"
                    : activeTab === "Leave Requests"
                    ? "View Leave Requests"
                    : activeTab === "Balances Overview"
                    ? "Manage Balances"
                    : "Open Calendar"}
                </button>
              </div>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-5">
            <section className="rounded-xl bg-card p-5 shadow-sm">
              <h2 className="text-sm font-bold">Quick Links</h2>

              <div className="mt-5 space-y-3">
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  const styles = colorStyles[link.color];

                  return (
                    <div
                      key={link.title}
                      // onClick={() => navigate(link.title)}
                      className="flex w-full items-center gap-4 text-left"
                    >
                      <span
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg",
                          styles.icon
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>

                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">
                          {link.title}
                        </span>
                        <span className="mt-1 block text-xs leading-4 text-muted-foreground">
                          {link.description}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-xl bg-card p-5 shadow-sm">
              <h2 className="text-sm font-bold">Need Help?</h2>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                Vita can help you set up leave policies, configure approvals and
                more.
              </p>

              <div className="mt-5 flex items-center justify-between gap-3">
                <button
                  // onClick={onAskAI}
                  className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  Ask Vita AI
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <Bot className="h-8 w-8 text-blue-200" />
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

interface StatProp {
  title: string;
  value: string | number;
  iconStyle: string;
  icon: LucideIcon;
  link?: string;
  linkStyle?: string;
}

function StatCard(stat: StatProp) {
  return (
    <div
      key={stat.title}
      // onClick={() => navigate(stat.title)}
      className="flex min-h-[126px] items-start gap-2 rounded-xl bg-white p-4 text-left shadow-sm transition hover:border-blue-200 hover:shadow-md"
    >
      <div
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-xl",
          stat.iconStyle
        )}
      >
        <stat.icon className="size-6" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold leading-5 sm:text-sm">
          {stat.title}
        </p>
        <p className="mt-1 text-2xl font-bold">{stat.value}</p>
        <span
          className={cn(
            "mt-1 inline-flex items-center gap-1 text-xs font-medium",
            stat.linkStyle
          )}
        >
          {stat.link}
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}
