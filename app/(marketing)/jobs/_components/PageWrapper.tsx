"use client";
import {
  FilterSidebar,
  SortingSection,
} from "@/app/(marketing)/jobs/_components/Filters";
import JobListAndDetailBlock from "@/app/(marketing)/jobs/_components/JobListAndDetailBlock";
import { JobSearchBar } from "@/app/(marketing)/jobs/_components/JobSearchBar";
import { Placeholder } from "@/components/EmptyState";
import { JobDetailsSkeleton, JobListSkeleton } from "@/components/skeletons";
import { useGetJobs } from "@/hooks/job seeker/useJobs";
import { cn } from "@/lib/utils";
import { useState } from "react";

const PageWrapper = () => {
  const [filterParams, setfilterParams] = useState<JobsFilters>({
    experienceLevel: "",
    employmentType: "",
    workArrangement: "",
    industry: "all",
    salary_rage: {
      min: 40,
      max: 500,
    },
    search: "",
    // limit: 1,
    // page: 1,
  });
  const { data, isLoading } = useGetJobs(filterParams);
  const jobs = data?.items;

  function renderWrapper() {
    if (!jobs || isLoading) {
      return (
        <div className={cn("grid lg:grid-cols-2 gap-2")}>
          <JobListSkeleton count={5} />
          <JobDetailsSkeleton />
        </div>
      );
    }
    if (jobs.length > 0) {
      return <JobListAndDetailBlock jobs={jobs} />;
    } else {
      return (
        <div className={cn("grid lg:grid-cols-2 gap-2")}>
          <Placeholder
            className="h-80"
            title="No jobs found"
            description="Sorry... no jobs found matching your requirements."
          />
          <JobDetailsSkeleton />
        </div>
      );
    }
  }
  return (
    <div className="px-2 sm:px-10">
      <div className="py-12 sm:py-18 text-center">
        <h1 className="font-black text-gray-600 text-2xl sm:text-4xl">
          Find your dream jobs
        </h1>
      </div>
      <div className="space-y-10">
        <JobSearchBar onSearch={setfilterParams} filterParams={filterParams} />
        {/* <JobsPage /> */}
        <div className="grid sm:grid-cols-[1.3fr_4fr] gap-6">
          <div className="border border-slate-200 rounded-md p-4 h-fit hidden sm:block">
            <FilterSidebar
              filter={filterParams}
              onSetFilter={setfilterParams}
            />
          </div>
          {/* Jobs */}
          <div className="">
            <div className="grid lg:grid-cols-2">
              <div className="">
                <div className="flex justify-between items-center">
                  <h2 className="text-xs font-semibold text-slate-400">
                    <span className="text-slate-700">{jobs?.length}</span> open
                    positions
                  </h2>
                  <SortingSection
                    filter={filterParams}
                    onSetFilter={setfilterParams}
                  />
                </div>
              </div>
            </div>
            {renderWrapper()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
