import CreateJobPage from "@/app/dashboard/jobs/_components/CreateJobPage";
import { PageLoader } from "@/components/global/PageLoader";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<PageLoader />}>
      <CreateJobPage />
    </Suspense>
  );
}
