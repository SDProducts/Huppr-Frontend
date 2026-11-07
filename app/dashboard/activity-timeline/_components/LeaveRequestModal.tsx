"use client";

import { DeclineRequest } from "@/app/dashboard/activity-timeline/_components/LeaveRequestActionModals";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { useModal } from "@/context/modal.state";
import { cn } from "@/lib/utils";

interface LeaveRequest {
  id: string;
  name: string;
  role: string;
  type: "Annual Leave" | "Sick Leave";
  dates: string;
  image?: string;
}

interface LeaveRequestsModalProps {
  requests?: LeaveRequest[];
  onApproveAll?: () => void;
}

const defaultRequests: LeaveRequest[] = [
  {
    id: "1",
    name: "Sarah Jenkins",
    role: "Senior Designer",
    type: "Annual Leave",
    dates: "Oct 12 - Oct 16 (4 days)",
    image: "/images/sarah-jenkins.jpg",
  },
  {
    id: "2",
    name: "David Chen",
    role: "Frontend Developer",
    type: "Sick Leave",
    dates: "Today, Oct 5 (1 day)",
    image: "/images/david-chen.jpg",
  },
  {
    id: "3",
    name: "Elena Kova",
    role: "Marketing Manager",
    type: "Annual Leave",
    dates: "Nov 20 - Nov 27 (6 days)",
  },
];

export default function LeaveRequestsModal({
  requests = defaultRequests,
  onApproveAll,
}: LeaveRequestsModalProps) {
  const modal = useModal();
  const onApproveRequest = () => {
    modal.open({
      content: <div>Approve</div>,
    });
  };
  const onDeclineRequest = () => {
    modal.open({
      size: "sm:w-xl",
      content: <DeclineRequest />,
      goBack: () => {
        modal.open({
          size: "sm:w-2xl",
          content: <LeaveRequestsModal />,
        });
      },
    });
  };
  return (
    <div>
      <div className="px-12 space-y-7">
        {/* Header */}
        <div className="border-b border-gray-200 text-left">
          <div className="text-[40px] font-extrabold leading-none tracking-[-0.035em] text-[#171a1f]">
            Leave Requests
          </div>

          <div className="text-gray-500 py-1">
            {requests.length} pending requests require your attention.
          </div>
        </div>

        {/* Request list */}
        <div className="">
          <div className="space-y-2">
            {requests.map((request) => (
              <LeaveRequestCard
                key={request.id}
                request={request}
                onApprove={onApproveRequest}
                onDecline={onDeclineRequest}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 border-t border-[#e6e9ee] ">
          <button
            type="button"
            className="
              text-base
              font-medium
              text-[#2864e8]
              transition-colors
              hover:text-[#1749b5]
            "
          >
            Cancel
          </button>

          <Button
            type="button"
            onClick={onApproveAll}
            className="
              rounded-[14px]
              bg-[#e4efff]
              px-10
              text-base
              font-medium
              text-[#2864e8]
              shadow-none
              hover:bg-[#d8e8ff]
            "
          >
            Approve All
          </Button>
        </div>
      </div>
    </div>
  );
}

interface LeaveRequestCardProps {
  request: LeaveRequest;
  onApprove?: (request: LeaveRequest) => void;
  onDecline?: (request: LeaveRequest) => void;
}

function LeaveRequestCard({
  request,
  onApprove,
  onDecline,
}: LeaveRequestCardProps) {
  const initials = request.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  const isSickLeave = request.type === "Sick Leave";

  return (
    <div className="flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2">
      {/* Employee */}
      <div className="flex flex-1 min-w-0 items-start gap-2">
        <Avatar className="h-10 w-10 shrink-0 border border-[#e5e8ec]">
          {request.image && (
            <AvatarImage
              src={request.image}
              alt={request.name}
              className="object-cover"
            />
          )}

          <AvatarFallback
            className={cn(
              "font-medium",
              isSickLeave
                ? "bg-[#eef0f3] text-[#2864e8]"
                : "bg-[#eef0f3] text-[#2864e8]"
            )}
          >
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <h3 className="font-extrabold leading-tight tracking-[-0.02em] text-[#171a1f]">
            {request.name}
          </h3>

          <p className="mt-0.5 text-sm leading-tight text-[#596474]">
            {request.role}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-4">
            <span
              className={cn(
                "rounded-full px-2 py-1 text-xs font-bold leading-none",
                isSickLeave
                  ? "bg-[#ffd9d6] text-[#a81717]"
                  : "bg-[#e1edff] text-[#2864e8]"
              )}
            >
              {request.type}
            </span>

            <span className="text-xs font-semibold text-[#697586]">
              {request.dates}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1">
        <Button
          type="button"
          variant="outline"
          onClick={() => onDecline?.(request)}
          className="
            border-[#ffcbc7]
            bg-[#fff8f7]
            text-sm
            px-4
            font-medium
            text-[#c91f1f]
            hover:bg-[#fff0ee]
            hover:text-[#b01818]
          "
        >
          Decline
        </Button>

        <Button
          type="button"
          onClick={() => onApprove?.(request)}
          className="
            bg-[#2864e8]
            text-sm
            px-4
            font-medium
            text-white
            hover:bg-[#1749b5]
          "
        >
          Approve
        </Button>
      </div>
    </div>
  );
}
