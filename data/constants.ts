import { CreateJobPayload } from "@/types/create_job_payload";
import Cookies from "js-cookie";
import {
  BarChartBig,
  BriefcaseBusiness,
  CalendarDays,
  CalendarMinus,
  ChartNoAxesCombined,
  FileText,
  GraduationCap,
  HelpCircle,
  Layers,
  LayoutTemplate,
  Rocket,
  Settings,
  UserPlus2,
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
