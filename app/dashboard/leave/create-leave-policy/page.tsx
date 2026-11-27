import CreateLeavePolicy from "@/app/dashboard/leave/_components/CreateLeavePolicy";
import { PageLoader } from "@/components/global/PageLoader";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<PageLoader />}>
      <CreateLeavePolicy />
    </Suspense>
  );
}
