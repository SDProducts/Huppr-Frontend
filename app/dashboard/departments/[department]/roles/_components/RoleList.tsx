"use client";
import CreateRoleStep1 from "@/app/dashboard/departments/_components/CreateRoleStep1";
import ActivityEmptyState from "@/components/EmptyState";
import { RolesListSkeleton } from "@/components/skeletons";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/context/modal.state";
import { useGetRoles } from "@/hooks/employer/useDepartment";
import { cn, labelCase } from "@/lib/utils";
import { MoreVertical, UserSquare } from "lucide-react";
import { useParams } from "next/navigation";

const RoleList = () => {
  const modal = useModal();
  const { department } = useParams();
  const { data, isLoading } = useGetRoles({ departmentId: String(department) });
  if (isLoading && !data) {
    return <RolesListSkeleton />;
  }
  const roles = data?.items || [];
  if (roles.length < 1) {
    return <ActivityEmptyState title="No Roles Found" />;
  }

  return (
    <div className="space-y-2">
      {roles.map((item, i) => (
        <div
          className="flex items-center gap-2 bg-white p-4 rounded-lg"
          key={i}
        >
          <div className="grid grid-cols-[3fr_1fr_1fr_2fr] flex-1">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 flex items-center justify-center bg-primary-100 rounded-md">
                <UserSquare />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm capitalize">
                  {labelCase(item.workArrangement)} / {item.location}
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold">Positions</div>
              <div className="text-sm">{item.metrics.openPositions || 0}</div>
            </div>
            <div className="bg-green-100 text-green-500 h-fit w-fit text-sm px-3 py-0.5 rounded-2xl">
              {item.status}
            </div>
            <div className="">
              <AvatarGroup>
                {item.metrics.members.map((staff) => (
                  <Avatar key={staff} className={cn("bg-white")}>
                    <AvatarFallback>{staff}</AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className={"p-0!"}>
              <div>
                <MoreVertical size={18} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className={cn("hover:bg-primary-100! hover:text-primary!")}
              >
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  modal.open({
                    content: <CreateRoleStep1 roleID={item.id} />,
                    size: "sm:w-3xl",
                    bgColor: "bg-[#F7F9FC]",
                  });
                }}
                className={cn("hover:bg-primary-100! hover:text-primary!")}
              >
                Edit
              </DropdownMenuItem>

              {/* <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Edit</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                    <DropdownMenuItem>Change owner</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub> */}

              <DropdownMenuItem
                className={cn(
                  "hover:bg-red-100! text-red-500 hover:text-red-500!"
                )}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>{" "}
        </div>
      ))}
    </div>
  );
};
export default RoleList;
