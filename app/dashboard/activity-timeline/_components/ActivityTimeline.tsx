"use client";

import {
  AlertTriangle,
  Cake,
  CalendarDays,
  Star,
  UserPlus,
  Users,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ActivityType =
  | "leave"
  | "onboarding"
  | "interview"
  | "birthday"
  | "urgent"
  | "anniversary";

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  time: string;
  action?: string;
  secondaryAction?: string;
}

interface ActivityTimelineProps {
  activities?: Activity[];
  liveUpdates?: boolean;
  onAction?: (activity: Activity) => void;
  className?: string;
}

const defaultActivities: Activity[] = [
  {
    id: "1",
    type: "leave",
    title: "James submitted annual leave",
    description:
      "Proposed dates: Oct 12 – Oct 18 (5 work days). Project workload is currently green for this period.",
    time: "10m ago",
    action: "Approve →",
    secondaryAction: "Decline",
  },
  {
    id: "2",
    type: "onboarding",
    title: "Sarah Johnson joins today",
    description:
      "Role: Senior UX Designer. Welcome pack and hardware are confirmed as delivered.",
    time: "Today, 8:30 AM",
    action: "View Onboarding →",
  },
  {
    id: "3",
    type: "interview",
    title: "Frontend Developer Interview",
    description:
      "Candidate: Marco Rossi. Interviewers: Alex Rivera, Sarah Kim.\nRoom: Meeting Room 4 (Virtual).",
    time: "Starts in 15m",
    action: "Join Call",
  },
  {
    id: "4",
    type: "birthday",
    title: "Emily Blunt has a birthday today",
    description: "Let's celebrate! It's Emily's 3rd birthday with the company.",
    time: "Today",
    action: "Send Message ▷",
  },
  {
    id: "5",
    type: "urgent",
    title: "Passport expires in 5 days",
    description:
      "Employee: David Chen. Compliance requires updated documentation for international payroll.",
    time: "Urgent",
    action: "Review Now →",
  },
  {
    id: "6",
    type: "anniversary",
    title: "James Wilson - 5 Years today!",
    description:
      "A major milestone! James has been a pillar of the Engineering team for half a decade.",
    time: "Today",
    action: "Celebrate",
  },
];

export default function ActivityTimeline({
  activities = defaultActivities,
  liveUpdates = true,
  onAction,
  className,
}: ActivityTimelineProps) {
  return (
    <section className={cn("w-full", className)}>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-[28px] font-extrabold tracking-[-0.03em] text-[#171a1f]">
          Activity Timeline
        </h2>

        {liveUpdates && (
          <div className="flex items-center gap-2 text-[13px] font-medium text-[#596474]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#16b866]" />
            Live updates enabled
          </div>
        )}
      </div>

      {/* Activities */}
      <div className="space-y-8">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onAction={onAction}
          />
        ))}
      </div>
    </section>
  );
}

interface ActivityCardProps {
  activity: Activity;
  onAction?: (activity: Activity) => void;
}

function ActivityCard({ activity, onAction }: ActivityCardProps) {
  const isUrgent = activity.type === "urgent";

  return (
    <article
      className={cn(
        "rounded-[18px] border px-8 py-8",
        isUrgent ? "border-[#f0a6a6] bg-[#ffd9d6]" : "border-[#dfe3e8] bg-white"
      )}
    >
      <div className="flex gap-8">
        {/* Icon */}
        <ActivityIcon type={activity.type} />

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Title row */}
          <div className="flex items-start justify-between gap-6">
            <h3
              className={cn(
                "text-[18px] font-medium leading-[1.35]",
                isUrgent ? "text-[#c91f1f]" : "text-[#171a1f]"
              )}
            >
              {activity.title}
            </h3>

            <span
              className={cn(
                "shrink-0 pt-0.5 text-[13px] font-medium",
                isUrgent ? "text-[#596474]" : "text-[#596474]"
              )}
            >
              {activity.time}
            </span>
          </div>

          {/* Description */}
          <p
            className={cn(
              "mt-2 whitespace-pre-line text-[18px] font-normal leading-[1.7]",
              isUrgent ? "text-[#596474]" : "text-[#596474]"
            )}
          >
            {activity.description}
          </p>

          {/* Actions */}
          {(activity.action || activity.secondaryAction) && (
            <div className="mt-5 flex items-center gap-7">
              {activity.action && (
                <ActivityAction activity={activity} onAction={onAction} />
              )}

              {activity.secondaryAction && (
                <button
                  type="button"
                  onClick={() => onAction?.(activity)}
                  className="text-[18px] font-bold text-[#2864e8] transition-colors hover:text-[#1749b5]"
                >
                  {activity.secondaryAction}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function ActivityIcon({ type }: { type: ActivityType }) {
  const config = {
    leave: {
      className: "bg-[#dce8fa] text-[#2864e8]",
      icon: CalendarDays,
    },
    onboarding: {
      className: "bg-[#dce4ff] text-[#344b91]",
      icon: UserPlus,
    },
    interview: {
      className: "bg-[#e8ebef] text-[#697586]",
      icon: Users,
    },
    birthday: {
      className: "bg-[#fde9f3] text-[#ed4b9b]",
      icon: Cake,
    },
    urgent: {
      className: "bg-transparent text-[#c91f1f]",
      icon: AlertTriangle,
    },
    anniversary: {
      className: "bg-[#dce8fa] text-[#2864e8]",
      icon: Star,
    },
  }[type];

  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex h-16 w-16 shrink-0 items-center justify-center rounded-full",
        config.className
      )}
    >
      <Icon size={23} strokeWidth={2.2} />
    </div>
  );
}

function ActivityAction({
  activity,
  onAction,
}: {
  activity: Activity;
  onAction?: (activity: Activity) => void;
}) {
  const isUrgent = activity.type === "urgent";
  const isInterview = activity.type === "interview";
  const isBirthday = activity.type === "birthday";

  if (isBirthday) {
    return (
      <button
        type="button"
        onClick={() => onAction?.(activity)}
        className="text-[18px] font-bold text-[#2864e8] transition-colors hover:text-[#1749b5]"
      >
        {activity.action}
      </button>
    );
  }

  if (isUrgent) {
    return (
      <Button
        type="button"
        onClick={() => onAction?.(activity)}
        className="h-[48px] rounded-[10px] bg-[#c91f1f] px-5 text-[17px] font-bold text-white shadow-none hover:bg-[#ae1818]"
      >
        {activity.action}
      </Button>
    );
  }

  if (isInterview) {
    return (
      <Button
        type="button"
        onClick={() => onAction?.(activity)}
        className="h-[48px] rounded-[10px] bg-[#2864e8] px-5 text-[17px] font-bold text-white shadow-none hover:bg-[#1749b5]"
      >
        <Video size={17} />
        {activity.action}
      </Button>
    );
  }

  if (activity.type === "onboarding" || activity.type === "anniversary") {
    return (
      <Button
        type="button"
        variant="secondary"
        onClick={() => onAction?.(activity)}
        className="h-[48px] rounded-[10px] bg-[#dce7f8] px-5 text-[17px] font-bold text-[#2864e8] shadow-none hover:bg-[#cfdef3]"
      >
        {activity.action}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      onClick={() => onAction?.(activity)}
      className="h-[48px] rounded-[10px] bg-[#2864e8] px-5 text-[17px] font-bold text-white shadow-none hover:bg-[#1749b5]"
    >
      {activity.action}
    </Button>
  );
}
