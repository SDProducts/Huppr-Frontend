"use client";
import { useGetLeave } from "@/hooks/hr/useLeave";

const LeaveOverviewPage = () => {
  useGetLeave();
  return <div>LeaveOverviewPage</div>;
};

export default LeaveOverviewPage;
