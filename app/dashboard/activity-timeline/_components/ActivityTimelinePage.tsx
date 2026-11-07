"use client";
import ActivityAsideContainer from "@/app/dashboard/activity-timeline/_components/ActivityAsideContainer";
import { ActivityFilters } from "@/app/dashboard/activity-timeline/_components/ActivityFilter";
import ActivityTimeline from "@/app/dashboard/activity-timeline/_components/ActivityTimeline";
import { ActivityTimelineSkeleton } from "@/components/skeletons";
import { useGetActivityTimeline } from "@/hooks/employer/useActivity";
import Cookies from "js-cookie";
import { useState } from "react";

const ActivityPage = () => {
  const organisationId = Cookies.get("organisationId");
  const [filterParams, setfilterParams] = useState<ActivityFilters>({
    organisationId: organisationId,
  });
  const { data, isLoading } = useGetActivityTimeline(filterParams);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        {isLoading || !data ? (
          <ActivityTimelineSkeleton />
        ) : (
          <ActivityTimeline activities={data.items} />
        )}
      </div>
      <div className="space-y-4">
        <ActivityFilters
          filterParams={filterParams}
          setfilterParams={setfilterParams}
        />

        <ActivityAsideContainer />
      </div>
    </div>
  );
};

export default ActivityPage;
