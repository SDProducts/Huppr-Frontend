import { EmptyState } from "@/app/dashboard/leave/_components/LeaveOverviewPage";
import { TableRowSkeleton } from "@/components/skeletons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TaskStatusPill } from "@/components/utils/Pills";
import { useGetLeavePolicies } from "@/hooks/employer/useLeave";
import { cn, labelCase } from "@/lib/utils";
import { Edit, Eye, FileText, MoreHorizontal, Pen, Trash2 } from "lucide-react";
import Link from "next/link";
export default function LeavePolicyListTable() {
  const { data, isLoading } = useGetLeavePolicies();
  const policies = data?.items || [];
  function renderList() {
    if (isLoading) {
      return (
        <>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRowSkeleton key={i} />
            // <TableRow key={i}>
            //   <TableCell>
            //     <div className="bg-gray-200 h-5 animate-pulse" />
            //   </TableCell>
            //   <TableCell>
            //     <div className="bg-gray-200 h-5 animate-pulse" />
            //   </TableCell>
            //   <TableCell>
            //     <div className="bg-gray-200 h-5 animate-pulse" />
            //   </TableCell>
            //   <TableCell>
            //     <div className="bg-gray-200 h-5 animate-pulse" />
            //   </TableCell>
            //   <TableCell className="flex justify-end">
            //     <div className="bg-gray-200 h-5 w-30 animate-pulse" />
            //   </TableCell>
            // </TableRow>
          ))}
        </>
      );
    }
    if (policies.length < 1) {
      return (
        <TableCell colSpan={6}>
          <EmptyState selectedTab="Leave polices" />
        </TableCell>
      );
    }
    return (
      <>
        {policies.map((policy) => (
          <>
            <TableRow className="hidden sm:table-row" key={policy.id}>
              <TableCell>
                <div className="size-7 flex justify-center items-center rounded-sm bg-primary/15 text-primary relative">
                  <FileText className="size-4" />
                </div>
              </TableCell>
              <TableCell className="font-medium">
                <Link href={`/dashboard/leave/policies/${policy.id}`}>
                  {policy.name}
                </Link>
              </TableCell>
              <TableCell>{labelCase(policy.leaveType)}</TableCell>
              <TableCell>
                <TaskStatusPill status={policy.status} />
              </TableCell>
              <TableCell className="text-right">{policy.minDuration}</TableCell>
              <TableCell className="text-right flex justify-end">
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
                      className={cn(
                        "hover:bg-primary-100! hover:text-primary!"
                      )}
                    >
                      <Link
                        href={`/dashboard/leave/policies/${policy.id}`}
                        className="flex items-center gap-2 w-full"
                      >
                        <div className="h-6 w-6 bg-primary-100 flex justify-center items-center rounded-md">
                          <Eye className="size-3" />
                        </div>
                        <div className="flex-1">View</div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger
                      //   className={cn(
                      //     "hover:bg-primary/10! text-primary! hover:text-primary! flex items-center gap-2"
                      //   )}
                      >
                        <div className="h-6 w-6 bg-primary/5 flex justify-center items-center rounded-md">
                          <Edit className="size-3" />
                        </div>
                        Edit
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className={cn("min-w-50")}>
                        <DropdownMenuItem className={cn("hover:bg-gray-100")}>
                          <Link
                            href={`/dashboard/leave/create-leave-policy?step=eligibility&policyId=${policy.id}`}
                            className="flex items-center gap-2 w-full text-sm text-gray-600"
                          >
                            <div className="h-6 w-6 bg-primary-100 flex justify-center items-center rounded-md">
                              <Pen className="size-3" />
                            </div>
                            Edit Policy Info (step 1)
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className={cn("hover:bg-gray-100")}>
                          <Link
                            href={`/dashboard/leave/create-leave-policy?step=eligibility&policyId=${policy.id}`}
                            className="flex items-center gap-2 w-full text-sm text-gray-600"
                          >
                            <div className="h-6 w-6 bg-primary-100 flex justify-center items-center rounded-md">
                              <Pen className="size-3" />
                            </div>
                            Edit Leave Eligibility (step 2)
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className={cn("hover:bg-gray-100")}>
                          <Link
                            href={`/dashboard/leave/create-leave-policy?step=request_rules&policyId=${policy.id}`}
                            className="flex items-center gap-2 w-full text-sm text-gray-600"
                          >
                            <div className="h-6 w-6 bg-primary-100 flex justify-center items-center rounded-md">
                              <Pen className="size-3" />
                            </div>
                            Edit Request Rules (step 3)
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className={cn("hover:bg-gray-100")}>
                          <Link
                            href={`/dashboard/jobs/create-job?step=approval_config&policyId=${policy.id}`}
                            className="flex items-center gap-2 w-full text-sm text-gray-600"
                          >
                            <div className="h-6 w-6 bg-primary-100 flex justify-center items-center rounded-md">
                              <Pen className="size-3" />
                            </div>
                            Configure Approval (step 4)
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
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
              </TableCell>
            </TableRow>

            {/* mobile view */}
            <TableRow className="table-row sm:hidden">
              <TableCell className="flex gap-2">
                <FileText className="size-8" />
                <div className="flex-1 space-y-1">
                  <Link
                    href={`/dashboard/leave/policies/${policy.id}`}
                    className="font-semibold"
                  >
                    {policy.name}
                  </Link>

                  <div className="bg-gray-200 text-xs! px-2 rounded-xs py-0.5 w-fit text-gray-500">
                    {policy.leaveType}
                  </div>
                  <div className="flex items-center gap-2">
                    <TaskStatusPill status={policy.status} />
                    <div className="">{policy.minDuration}</div>
                  </div>
                </div>
                <div className="">
                  <div className="size-7 flex justify-center items-center rounded-xs cursor-pointer hover:bg-gray-200">
                    <MoreHorizontal className="size-4" />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </>
        ))}
      </>
    );
  }

  return (
    <Table>
      <TableCaption>A list of your leave policies.</TableCaption>
      <TableHeader className="">
        <TableRow className="hidden sm:table-row">
          <TableHead className="font-semibold">I/N</TableHead>
          <TableHead className="font-semibold">Name</TableHead>
          <TableHead className="font-semibold">Type</TableHead>
          <TableHead className="font-semibold">Status</TableHead>
          <TableHead className="text-right font-semibold">Duration</TableHead>
          <TableHead className="text-right font-semibold"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{renderList()}</TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}
