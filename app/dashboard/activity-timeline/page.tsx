import ActivityTimeline from "@/app/dashboard/activity-timeline/_components/ActivityTimeline";

const page = () => {
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2">
        <ActivityTimeline />
      </div>
      <div className=""></div>
    </div>
  );
};

export default page;
