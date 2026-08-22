"use client";
import { ActivityFilters } from "@/app/dashboard/activity-timeline/_components/ActivityFilter";
import { ActivityStatCard } from "@/app/dashboard/activity-timeline/_components/ActivityStatsCard";
import LeaveRequestsModal from "@/app/dashboard/activity-timeline/_components/LeaveRequestModal";
import PayrollModal from "@/app/dashboard/activity-timeline/_components/PayrollModal";
import { PayrollReminder } from "@/app/dashboard/activity-timeline/_components/PayrollReminder";
import ScheduledInterviewModal from "@/app/dashboard/activity-timeline/_components/ScheduledInterviewModal";
import { useModal } from "@/context/modal.state";

const ActivityAsideContainer = () => {
  const modal = useModal();
  const viewPendingLeave = () => {
    modal.open({
      title: "",
      size: "sm:w-2xl",
      content: <LeaveRequestsModal />,
    });
  };
  const viewPayrollModal = () => {
    modal.open({
      title: "",
      size: "sm:w-2xl",
      content: <PayrollModal />,
    });
  };
  const viewInterviewsModal = () => {
    modal.open({
      title: "",
      size: "sm:w-2xl",
      content: <ScheduledInterviewModal />,
    });
  };

  return (
    <div className="space-y-4">
      <ActivityFilters />
      {/* Pending approvals */}
      <ActivityStatCard
        value={3}
        label="Pending Approvals"
        variant="approval"
        onClick={viewPendingLeave}
      />

      {/* Expiring documents */}
      <ActivityStatCard
        value={5}
        label="Expiring Documents"
        variant="document"
      />

      {/* Interviews */}
      <ActivityStatCard
        value={2}
        label="Interviews Today"
        variant="interview"
        onClick={viewInterviewsModal}
      />
      <PayrollReminder onOpen={viewPayrollModal} />
    </div>
  );
};

export default ActivityAsideContainer;
