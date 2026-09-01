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
  LayoutTemplate,
  Settings,
  UserPlus2,
  Users2,
} from "lucide-react";
export const token = Cookies.get("auth_token");
export const jobs: Job[] = [
  {
    id: "job-00001-000000",
    title: "Senior Product Designer",
    company_name: "Lumina Creative",
    location_state: "New York, NY",
    work_mode: "remote",

    department: "DESIGN",
    description: "",
    employment_type: "Full time",

    salary_min: 120000,
    salary_max: 160000,
    salary_currency: "NGN",
    salary_period: "month",

    requirements: [],
    responsibilities: [],
    preferred_qualifications: [],
    skills: [],
    benefits: [],

    openings: 1,
    application_deadline: "25-08-2026",

    internal_notes: "",
    created_by: "",
    created_at: "25-07-2026",
    updated_at: "29-08-2026",
  },
];

class Navigation {
  workspace = [
    {
      label: "Overview",
      icon: LayoutTemplate,
      path: "/dashboard",
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
      path: "/dashboard/report",
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
