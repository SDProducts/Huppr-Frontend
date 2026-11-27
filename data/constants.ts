import RecruitmentSettingForm from "@/app/dashboard/settings/_components/RecruitmentSettingForm";
import WorkScheduleAndAttendanceForm from "@/app/dashboard/settings/_components/WorkScheduleAndAttendanceForm";
import { CreateJobPayload } from "@/types/create_job_payload";
import Cookies from "js-cookie";
import {
  BanknoteArrowDown,
  BarChartBig,
  Bell,
  BookUser,
  Boxes,
  BriefcaseBusiness,
  Building,
  CalendarDays,
  CalendarMinus,
  ChartNoAxesCombined,
  ClipboardList,
  CreditCard,
  FileText,
  GraduationCap,
  HelpCircle,
  Layers,
  LayoutTemplate,
  LineChart,
  LockKeyhole,
  LogIn,
  Plug,
  Rocket,
  Settings,
  ShieldUser,
  SlidersVertical,
  UserPlus2,
  Users,
  Users2,
} from "lucide-react";
export const token = Cookies.get("access_token");

class Navigation {
  workspace = [
    {
      label: "Overview",
      icon: LayoutTemplate,
      path: "/dashboard",
    },
    {
      label: "Departments",
      icon: Layers,
      path: "/dashboard/departments",
    },
    {
      label: "Jobs",
      icon: BriefcaseBusiness,
      path: "/dashboard/jobs",
    },
    {
      label: "Employees",
      icon: Users2,
      path: "/dashboard/employees",
    },
    {
      label: "Projects",
      icon: Rocket,
      path: "/dashboard/projects",
    },
    {
      label: "Onboarding",
      icon: UserPlus2,
      path: "/dashboard/onboarding",
    },
    {
      label: "attendance",
      icon: CalendarDays,
      path: "/dashboard/attendance",
    },
    {
      label: "leave",
      icon: CalendarMinus,
      path: "/dashboard/leave",
    },
    {
      label: "performance",
      icon: ChartNoAxesCombined,
      path: "/dashboard/performance",
    },
    {
      label: "learning",
      icon: GraduationCap,
      path: "/dashboard/learning",
    },
    {
      label: "documents",
      icon: FileText,
      path: "/dashboard/documents",
    },
  ];
  system = [
    {
      label: " report",
      icon: BarChartBig,
      path: "/dashboard/reports",
    },

    {
      label: "settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
    {
      label: "Surport",
      icon: HelpCircle,
      path: "/dashboard/support",
    },
  ];
}
export const navigation = new Navigation();

class InitialValues {
  createProjectPayload = {
    departmentId: "",
    teamId: "",
    name: "",
    description: "",
    priority: "",
    status: "todo",
    startDate: "",
    endDate: "",
    resourceManagerId: "",
  };
  createTask: {
    name?: string;
    description?: string;
    priority?: string;
    assignee?: string | undefined;
    startDate?: string;
    dueDate?: string;
    status?: string;
  } = {
    name: "",
    description: "",
    priority: "normal",
    assignee: undefined, // Or "" if you want an empty string default
    startDate: "",
    dueDate: "",
    status: "todo",
  };
  addTaskNote = {
    body: "",
  };
  uploadTaskAttachment = {
    file: undefined,
  };
  createJobPayload: CreateJobPayload = {
    title: undefined,
    roleId: undefined,
    departmentId: undefined,
    teamId: undefined,
    reportingManagerId: undefined,
    reference: undefined,
    summary: undefined,
    employmentType: "full_time",
    workArrangement: "hybrid",
    seniorityLevel: undefined,
    experienceMinYears: 0,
    educationRequirement: undefined,
    primaryTooling: undefined,
    reviewSlaHours: 24,
    locationCountry: undefined,
    locationCity: undefined,
    salaryMin: 0,
    salaryMax: 0,
    currency: "NGN",
    positions: 1,
    postedOn: undefined,
    closesOn: undefined,
    responsibilities: undefined,
    qualifications: undefined,
    skills: undefined,
    screeningQuestions: undefined,
    stages: undefined,
    channels: undefined,
    benefits: undefined,
    hiringTeam: undefined,
    expectedRevision: 0,
  };
}
export const initialvalues = new InitialValues();

export const months = [
  { label: "January", value: "january", numberOfDays: 31 },
  { label: "February", value: "february", numberOfDays: 28 }, // 29 during leap years
  { label: "March", value: "march", numberOfDays: 31 },
  { label: "April", value: "april", numberOfDays: 30 },
  { label: "May", value: "may", numberOfDays: 31 },
  { label: "June", value: "june", numberOfDays: 30 },
  { label: "July", value: "july", numberOfDays: 31 },
  { label: "August", value: "august", numberOfDays: 31 },
  { label: "September", value: "september", numberOfDays: 30 },
  { label: "October", value: "october", numberOfDays: 31 },
  { label: "November", value: "november", numberOfDays: 30 },
  { label: "December", value: "december", numberOfDays: 31 },
];

class SettingsNavigation {
  settings: SettingItem[] = [
    {
      icon: Building,
      name: "Company Profile",
      path: "company-profile",
      description:
        "Update your company information, logo, industry, contact details and office locations.",
      className: "bg-primary/10 text-primary",
      component: null,
    },
    {
      icon: Users,
      name: "People & Organisation",
      path: "people-and-organisation",
      description:
        "Manage departments, job titles, employment types, employee ID format and organisational structure.",
      className: "bg-green-500/10 text-green-500",
      component: null,
    },
    {
      icon: ShieldUser,
      name: "Roles & Permissions",
      path: "roles-and-permissions",
      description:
        "Create roles, manage permissions and control access to modules and data.",
      className: "bg-indigo-500/10 text-indigo-500",
      component: null,
    },
    {
      icon: CalendarDays,
      name: "Work Schedule & Attendance",
      path: "work-schedule-and-attendance",
      description:
        "Configure working days, office hours, shifts, attendance methods, overtime rules and public holidays.",
      className: "bg-yellow-500/10 text-yellow-500",
      component: WorkScheduleAndAttendanceForm,
    },
    {
      icon: CalendarMinus,
      name: "Leave & Absence",
      path: "leave-and-absence",
      description:
        "Manage leave types, entitlement rules, accrual settings, eligibility and approval workflows.",
      className: "bg-red-500/10 text-red-500",
      component: null,
    },
    {
      icon: ClipboardList,
      name: "Workflows & Approvals",
      path: "workflows-and-approvals",
      description:
        "Set up approval chains for leave, expenses, recruitment, onboarding and other HR requests.",
      className: "bg-blue-500/10 text-blue-500",
      component: null,
    },
    {
      icon: Bell,
      name: "Notifications & Communication",
      path: "notifications-and-communication",
      description:
        "Configure email and in-app notifications, reminder schedules and announcement settings.",
      className: "bg-emerald-500/10 text-emerald-500",
      component: null,
    },
    {
      icon: Plug,
      name: "Integrations",
      path: "integrations",
      description:
        "Connect Google Workspace, Google Calendar & Meet, email providers, payroll, job boards and other tools.",
      className: "bg-purple-500/10 text-purple-500",
      component: null,
    },
    {
      icon: LockKeyhole,
      name: "Security & Access",
      path: "security-and-access",
      description:
        "Manage authentication, multi-factor authentication, login controls, audit logs and data retention.",
      className: "bg-primary/10 text-primary",
      component: null,
    },
    {
      icon: FileText,
      name: "Documents & Templates",
      path: "documents-and-templates",
      description:
        "Create and manage HR document templates, employment letters, contracts and signature settings.",
      className: "bg-primary/10 text-primary",
      component: null,
    },
    {
      icon: SlidersVertical,
      name: "General Preferences",
      path: "general-preferences",
      description:
        "Set timezone, date and time formats, language, currency, fiscal year and other company-wide preferences.",
      className: "bg-primary/10 text-primary",
      component: null,
    },
    {
      icon: CreditCard,
      name: "Subscription & Billing",
      path: "subscription-and-billing",
      description:
        "View your plan, manage billing, invoices, payment methods and usage limits.",
      className: "bg-primary/10 text-primary",
      component: null,
    },
  ];

  modules: SettingItem[] = [
    {
      icon: UserPlus2,
      name: "Recruitment Settings",
      path: "recruitment-settings",
      description:
        "Manage hiring stages, scorecards, interview templates and candidate communication.",
      className: "bg-primary/10 text-primary",
      component: RecruitmentSettingForm,
    },
    {
      icon: LogIn,
      name: "Onboarding & Offboarding",
      path: "onboarding-and-offboarding",
      description:
        "Set up workflow templates, task lists, document requirements and clearance rules.",
      className: "bg-primary/10 text-primary",
      component: null,
    },
    {
      icon: LineChart,
      name: "Performance Management",
      path: "performance-management",
      description:
        "Configure review cycles, rating scales, competencies and appraisal templates.",
      className: "bg-primary/10 text-primary",
      component: null,
    },
    {
      icon: BookUser,
      name: "Learning & Development",
      path: "learning-and-development",
      description:
        "Manage course catalogue, learning requirements, certifications and completion rules.",
      className: "bg-primary/10 text-primary",
      component: null,
    },
    {
      icon: BanknoteArrowDown,
      name: "Expenses & Payroll",
      path: "expenses-and-payroll",
      description:
        "Configure expense categories, reimbursement rules and payroll settings.",
      className: "bg-primary/10 text-primary",
      component: null,
    },
    {
      icon: Boxes,
      name: "Assets & Equipment",
      path: "assets-and-equipment",
      description:
        "Manage asset categories, assignment rules and return procedures.",
      className: "bg-primary/10 text-primary",
      component: null,
    },
  ];
}
export const settingCategories = new SettingsNavigation();
