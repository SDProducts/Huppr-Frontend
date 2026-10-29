"use client";
import EmployeeTable, {
  Employee,
} from "@/app/dashboard/employees/_components/EmployeeListTable";
const employees: Employee[] = [
  {
    id: "1",
    name: "Ada Okafor",
    email: "ada.okafor@huppr.app",
    department: "Product",
    role: "Product Designer",
    employmentType: "Full-time",
    status: "Active",
    startDate: "Jan 15, 2025",
    avatar: "/images/employees/ada.jpg",
  },
  {
    id: "2",
    name: "Tunde Adebayo",
    email: "tunde.adebayo@huppr.app",
    department: "Engineering",
    role: "Frontend Developer",
    employmentType: "Full-time",
    status: "Active",
    startDate: "Feb 3, 2025",
  },
];

export default function EmployeeOverview() {
  return (
    <div>
      <EmployeeTable
        employees={employees}
        pageSize={5}
        onEmployeeClick={(employee) => {
          console.log("Open employee:", employee.id);
        }}
        onEmployeeAction={(action, employee) => {
          console.log(action, employee.id);
        }}
      />
    </div>
  );
}
