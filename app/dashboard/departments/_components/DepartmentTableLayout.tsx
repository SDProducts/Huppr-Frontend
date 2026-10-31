import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TableRowSkeleton } from "@/components/skeletons";
import { Pill } from "@/components/utils/Pills";
import { TableHead } from "@/components/utils/Table";
import { cn, getInitials } from "@/lib/utils";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
interface Props {
  departments: DR_DepartmentItem[];
  isLoading: boolean;
}
export default function DepartmentTableLayout({
  departments,
  isLoading,
}: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl">
      <table>
        <thead>
          <tr className="border-b border-slate-100">
            <TableHead>Department Name</TableHead>
            <TableHead>Head of Dept.</TableHead>
            <TableHead>Head count</TableHead>
            <TableHead>Teams</TableHead>
            <TableHead>Open roles</TableHead>
            <TableHead>Status</TableHead>
            {/* <TableHead>Attendance</TableHead> */}
            <th className="w-12 px-4" />
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <>
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </>
          ) : (
            <>
              {departments.map((dept) => (
                <TableRow key={dept.id} department={dept} />
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

function TableRow({ department }: { department: DR_DepartmentItem }) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 bg-blue-100 text-primary shrink-0 items-center justify-center rounded-md text-xs font-bold"
            )}
          >
            {getInitials(department.name)}
          </div>

          <Link
            href={`/dashboard/departments/${department.id}`}
            className="max-w-45"
          >
            <div className="whitespace-nowrap hover:underline focus:underline text-sm font-bold text-slate-900">
              {department.name}
            </div>

            <p className="mt-1 whitespace-nowrap text-xs text-slate-500 truncate">
              {department.description}
            </p>
          </Link>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-1">
          <Avatar size="sm">
            <AvatarImage src={department.name || ""} alt="department lead" />
            <AvatarFallback>{getInitials(department.name)}</AvatarFallback>
          </Avatar>
          <p className="whitespace-nowrap text-sm text-slate-500">
            {"No one selected yet"}
          </p>
        </div>
      </td>
      <td className="px-6 py-4 text-xs text-slate-500">
        {department.metrics.headcount || "no"} employees
      </td>

      <td className="px-6 py-4 text-slate-500">
        <p className="text-xs">{department.metrics.subteams || "no"} teams</p>
      </td>
      <td className="px-6 py-4 text-slate-500">
        <p className="text-xs">{department.metrics.openRoles || "no"} roles</p>
      </td>
      <td className="px-6 py-4 text-slate-500">
        <Pill priority={department.metrics.operationalStatus || "active"} />
      </td>

      {/* <td className="px-6 py-4 min-w-40">
        <div className="space-y-0.5">
          <div className="flex text-[9px] justify-between items-center">
            <div className="">32/44</div>
            <div className="">{department.metrics.attendancePercent || 0}%</div>
          </div>
          <Progress
            indicatorClassName=""
            value={department.metrics.attendancePercent}
          />
        </div>
      </td>
 */}
      <td className="px-4">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={
              "p-2 rounded-lg cursor-pointer text-slate-500 hover:bg-gray-200"
            }
          >
            <div className="">
              <MoreHorizontal className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={cn("min-w-50")}>
            <DropdownMenuItem
              className={cn("hover:bg-primary-100! hover:text-primary!")}
            >
              <Link
                href={`/dashboard/departments/${department.id}`}
                className="flex items-center gap-2 w-full"
              >
                <div className="h-6 w-6 bg-primary-100 flex justify-center items-center rounded-md">
                  <Eye className="size-3" />
                </div>
                <div className="flex-1">View</div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(
                "hover:bg-primary/10! text-primary! hover:text-primary! flex items-center gap-2"
              )}
            >
              <div className="h-6 w-6 bg-primary/5 flex justify-center items-center rounded-md">
                <Edit className="size-3" />
              </div>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(
                "hover:bg-red-100! text-red-500! hover:text-red-500! flex items-center gap-2"
              )}
            >
              <div className="h-6 w-6 bg-red-100 flex justify-center items-center rounded-md">
                <Trash2 className="size-3" />
              </div>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>{" "}
      </td>
    </tr>
  );
}
