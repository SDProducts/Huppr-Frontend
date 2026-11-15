import SetUpLeaveOrganisation from "@/app/dashboard/leave/_components/SetUpLeaveOrganisation";
import { PageLoader } from "@/components/global/PageLoader";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<PageLoader text="Setting up Leave..." />}>
      <SetUpLeaveOrganisation />
    </Suspense>
  );
}
