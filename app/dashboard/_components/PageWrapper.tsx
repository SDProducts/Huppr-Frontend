"use client";
/* eslint-disable react/no-unescaped-entities */
import { TodayActivities } from "@/app/dashboard/_components/Activities";
import { AttendanceCard } from "@/app/dashboard/_components/AttendanceChartCard";
import AwayToday from "@/app/dashboard/_components/AwayToday";
import DepartmentOverview from "@/app/dashboard/_components/DepartmentOverview";
import LeaveOverview from "@/app/dashboard/_components/LeaveOverview";
import { MetricCard } from "@/app/dashboard/_components/MetricCard";
import { CompanyCalendar } from "@/app/dashboard/_components/MiniCalendar";
import UpcomingInterviews from "@/app/dashboard/_components/UpcomingInterviews";
import UpcomingBirthdays from "@/app/dashboard/_components/UpcommingBirthdays";
import WorkAnniversaries from "@/app/dashboard/_components/WorkAnniversary";
import { useGetMyDetails } from "@/hooks/auth/useAuth";
import {
  BadgeDollarSign,
  CalendarDays,
  CircleAlert,
  ClipboardCheck,
  ClipboardList,
  FileText,
  Megaphone,
  MessageSquare,
  UserRound,
  Users,
} from "lucide-react";

const PageWrapper = () => {
  useGetMyDetails();
  const metrics = [
    {
      icon: Users,
      value: 153,
      label: "Total Headcount",
      meta: "↑ 11 this month",
      subMeta: "+4 vs last month",
      variant: "blue" as const,
    },
    {
      icon: CalendarDays,
      value: 3,
      label: "Leave Requests",
      meta: "Awaiting approval",
      variant: "purple" as const,
    },
    {
      icon: MessageSquare,
      value: 2,
      label: "Interviews",
      meta: "Today",
      variant: "green" as const,
    },
    {
      icon: Megaphone,
      value: "Sarah",
      label: "Starts Today",
      meta: "New starter",
      variant: "teal" as const,
    },
    {
      icon: BadgeDollarSign,
      value: "Payroll Closes",
      label: "Due Friday",
      meta: "Financials",
      variant: "red" as const,
    },
    {
      icon: ClipboardCheck,
      value: 2,
      label: "Reviews Due",
      meta: "This week",
      variant: "yellow" as const,
    },
  ];
  const activities = [
    {
      id: 1,
      icon: ClipboardList,
      message: "3 leave requests are awaiting your approval",
      time: "2m ago",
      color: "orange" as const,
    },
    {
      id: 2,
      icon: UserRound,
      message: "Sarah Johnson starts today in Marketing",
      time: "1h ago",
      color: "green" as const,
    },
    {
      id: 3,
      icon: CalendarDays,
      message: "2 interviews scheduled for today",
      time: "2h ago",
      color: "blue" as const,
    },
    {
      id: 4,
      icon: CircleAlert,
      message: "Payroll closes this Friday",
      time: "3h ago",
      color: "red" as const,
    },
    {
      id: 5,
      icon: FileText,
      message: "5 documents are expiring this week",
      time: "4h ago",
      color: "yellow" as const,
    },
  ];

  const attendance = [
    {
      label: "Present",
      value: 142,
      color: "#16b879",
    },
    {
      label: "Late",
      value: 8,
      color: "#f59e0b",
    },
    {
      label: "Absent",
      value: 3,
      color: "#ef4444",
    },
    {
      label: "Leave",
      value: 6,
      color: "#3b82f6",
    },
  ];

  return (
    <div className="h-svh w-full">
      <div className="py-5 flex justify-between items-start">
        <div className="">
          <h3 className="text-3xl font-extrabold">Good Day, Victoria 👋</h3>
          <div className="">
            Here's what's happening across Sterling Tech today.
          </div>
        </div>
        <div className="bg-white px-4 py-1 rounded-full flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <div className="">
            Workspace Pulse: Everything is running smoothly today.{" "}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>
      <div className="grid grid-cols-3 mt-4 gap-6">
        <div className="col-span-2 space-y-2">
          <TodayActivities activities={activities} />
          <CompanyCalendar
            month="October 2023"
            days={[
              { date: 25, day: "MON", isCurrentMonth: false },
              { date: 26, day: "TUE", isCurrentMonth: false },
              { date: 27, day: "WED", isCurrentMonth: false },
              { date: 28, day: "THU", isCurrentMonth: false },
              { date: 29, day: "FRI", isCurrentMonth: false },
              { date: 30, day: "SAT", isCurrentMonth: false },
              {
                date: 1,
                day: "SUN",
                isCurrentMonth: true,
                isToday: true,
                leaveCount: 2,
              },
            ]}
            // onPreviousMonth={() => console.log("previous")}
            // onNextMonth={() => console.log("next")}
            // onViewCalendar={() => console.log("view calendar")}
          />
          <DepartmentOverview
            departments={[
              {
                name: "Engineering",
                employees: 42,
                attendance: 96,
              },
              {
                name: "Marketing",
                employees: 18,
                attendance: 88,
              },
              {
                name: "Finance",
                employees: 12,
                attendance: 100,
              },
            ]}
          />
          <WorkAnniversaries />
          <UpcomingBirthdays />
          <LeaveOverview />
        </div>
        <div className="space-y-2">
          <AttendanceCard total={159} items={attendance} />
          <UpcomingInterviews
            interviews={[
              {
                time: "10:00",
                period: "AM",
                title: "Product Designer",
                interviewer: "Alex Morgan",
                candidates: 2,
              },
              {
                time: "11:30",
                period: "AM",
                title: "Frontend Developer",
                interviewer: "Marcus Lee",
                candidates: 3,
              },
              {
                time: "02:00",
                period: "PM",
                title: "UX Researcher",
                interviewer: "Sophie Turner",
                candidates: 2,
              },
            ]}
          />
          <AwayToday
            totalAway={12}
            employees={[
              {
                name: "James Wilson",
                leaveType: "Annual Leave",
                department: "Engineering",
                image: "/images/james-wilson.jpg",
              },
              {
                name: "Maria Rodriguez",
                leaveType: "Medical",
                department: "Operations",
                image: "/images/maria-rodriguez.jpg",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
