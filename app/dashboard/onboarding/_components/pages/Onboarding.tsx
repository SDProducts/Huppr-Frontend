import { MetricCard } from "@/app/dashboard/onboarding/_components/MetricCard";
import OnboardingTable, {
  OnboardingEmployee,
} from "@/app/dashboard/onboarding/_components/OnboardingTable";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Plus, Settings, UsersIcon } from "lucide-react";

const employees: OnboardingEmployee[] = [
  {
    id: "1",
    name: "Aisha Bello",
    email: "aisha.bello@acme.com",
    employeeId: "EMP-015",
    department: "Product",
    position: "Product Designer",
    startDate: "1 Nov 2026",
    progress: 62,
    status: "in_progress",
    nextAction: "Upload ID",
    deadline: "2 days left",
    avatar: "/images/employees/aisha.jpg",
  },
  {
    id: "2",
    name: "James Okafor",
    email: "james.okafor@acme.com",
    employeeId: "EMP-016",
    department: "Engineering",
    position: "Software Engineer",
    startDate: "15 Oct 2026",
    progress: 88,
    status: "awaiting_review",
    nextAction: "Review documents",
    deadline: "1 day left",
  },
  {
    id: "3",
    name: "David Brown",
    email: "david.brown@acme.com",
    employeeId: "EMP-018",
    department: "Marketing",
    position: "Marketing Manager",
    startDate: "20 Oct 2026",
    progress: 100,
    status: "pending_activation",
    nextAction: "Activate employee",
  },
];

export default function Onboarding() {
  return (
    <div className="space-y-15">
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div className="flex-1 space-y-2">
            <h2 className="text-4xl font-bold">Onboarding</h2>
            <p className="text-sm text-gray-500">
              Track and manage the onboarding of new employees. Set up your
              onboarding flow, monitor progress and ensure a smooth start for
              every new hire.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant={"white"} className={cn("px-4 py-2 h-10")}>
              <Settings />
              <span>Setup Onboarding Flow</span>
            </Button>
            <Button className={cn("px-4 py-2 h-10")}>
              <Plus />
              <span>Add Employee</span>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <MetricCard
            icon={UsersIcon}
            iconClass="bg-blue-100 text-blue-600"
            label="Total Onboarding"
            value={0}
            change="Active onboarding processes"
          />
          <MetricCard
            icon={Check}
            iconClass="bg-green-100 text-green-600"
            label="In Progress"
            value={0}
            change="2 from last month"
          />
          <MetricCard
            icon={UsersIcon}
            iconClass="bg-amber-100 text-amber-600"
            label="Awaiting Review"
            value={0}
            change="2 from last month"
          />
          <MetricCard
            icon={UsersIcon}
            iconClass="bg-red-100 text-red-600"
            label="Changes Required"
            value={0}
            change="2 from last month"
          />
          <MetricCard
            icon={UsersIcon}
            iconClass="bg-purple-100 text-purple-600"
            label="Not Started"
            value={0}
            change="11% in total"
          />
        </div>
      </div>
      <div className="">
        <OnboardingTable employees={employees} />
      </div>
    </div>
  );
}
