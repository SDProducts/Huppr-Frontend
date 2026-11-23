"use client";
import { FilterSidebar } from "@/app/(marketing)/jobs/_components/Filters";
import JobListAndDetailBlock from "@/app/(marketing)/jobs/_components/JobListAndDetailBlock";
import { JobSearchBar } from "@/app/(marketing)/jobs/_components/JobSearchBar";
import { useGetJobs } from "@/hooks/job seeker/useJobs";
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
  const jobs = data?.items || [];
  console.log(jobs);

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
            {jobs.length > 0 && <JobListAndDetailBlock jobs={jobs} />}
            {/* <div className="">
              <Button
                className={cn("p-5")}
                onClick={() => {
                  const { limit, ...rest } = filterParams;
                  setfilterParams({
                    ...rest,
                    limit: limit || 0 + 10,
                  });
                }}
              >
                <span>{isLoading ? "Loading" : "Load more"}</span>
                <MoreHorizontal />
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
