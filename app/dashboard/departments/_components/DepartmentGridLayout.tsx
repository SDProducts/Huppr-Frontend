import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { ChevronRight, Network } from "lucide-react";
import Link from "next/link";
interface Props {
  departments: DR_DepartmentItem[];
}
export default function DepartmentGridLayout({ departments }: Props) {
  return (
    <div className="grid sm:grid-cols-3 gap-2">
      {departments.map((dept, i) => (
        <Link
          href={`/dashboard/departments/${dept.id}`}
          key={i}
          className={cn(
            "rounded-md border bg-white max-w-md border-gray-200 p-3 space-y-2"
          )}
        >
          <div className="flex justify-between items-center">
            <Avatar className="h-10 w-10 bg-primary/10 flex justify-center items-center rounded-sm">
              <AvatarImage
                src={dept.icon.url || ""}
                alt={dept.name}
                className="h-6 w-6"
              />
              <AvatarFallback>
                <Network className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="text-green-500 bg-green-100 px-2 py-0.5 rounded-full text-xs">
              stable
            </div>
          </div>
          <div className="">
            <div className="font-semibold text-lg">{dept.name}</div>
            <div className="text-sm">{dept.description}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-primary-100 min-h-24 flex flex-col justify-center items-center rounded-md p-2">
              <div className="truncate min-w-0">Headcount</div>
              <div className="font-extrabold">{dept.metrics.headcount}</div>
            </div>
            <div className="bg-primary-100 min-h-24 flex flex-col justify-center items-center rounded-md p-2">
              <div className="truncate min-w-0">Attendance</div>
              <div className="font-extrabold">
                {dept.metrics.attendancePercent || 0}%
              </div>
            </div>
            <div className="bg-primary-100 min-h-24 flex flex-col justify-center items-center rounded-md p-2">
              <div className="truncate min-w-0">Subteams</div>
              <div className="font-extrabold">{dept.metrics.subteams}</div>
            </div>
            <div className="bg-primary-100 min-h-24 flex flex-col justify-center items-center rounded-md p-2">
              <div className="truncate min-w-0">Open roles</div>
              <div className="font-extrabold">{dept.metrics.openRoles}</div>
            </div>
          </div>
          <div className="border-t border-gray-200 py-2 mt-4">
            <div className="flex justify-between items-center">
              <div className="flex-1 flex items-center gap-1">
                <Avatar>
                  <AvatarFallback>{getInitials(dept.name)}</AvatarFallback>
                </Avatar>
                <div className="">
                  <div className="font-semibold">None Selected</div>
                  <div className="text-xs">Head of Dept.</div>
                </div>
              </div>
              <div className="">
                <ChevronRight />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
