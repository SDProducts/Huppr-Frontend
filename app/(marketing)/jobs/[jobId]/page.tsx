import ApplyForJob from "@/app/(marketing)/jobs/_components/ApplyForJob";
import { cn } from "@/lib/utils";

export default function page() {
  return (
    <div className={cn("grid sm:grid-cols-2 gap-4 px-4 py-4 sm:px-10")}>
      <div className="">
        <div className=""></div>
        {/* <JobDetail jobData={} /> */}
      </div>
      <div className="">
        <ApplyForJob />
      </div>
    </div>
  );
}
