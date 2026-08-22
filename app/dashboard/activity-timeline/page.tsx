import ActivityAsideContainer from "@/app/dashboard/activity-timeline/_components/ActivityAsideContainer";
import ActivityTimeline from "@/app/dashboard/activity-timeline/_components/ActivityTimeline";

const page = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <ActivityTimeline />
      </div>
      <ActivityAsideContainer />
    </div>
  );
};

export default page;
