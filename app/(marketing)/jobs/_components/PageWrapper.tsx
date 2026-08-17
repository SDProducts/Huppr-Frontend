import { JobSearchBar } from "@/app/(marketing)/jobs/_components/JobSearchBar";

const PageWrapper = () => {
  return (
    <div>
      <div className="py-12 sm:py-18 text-center">
        <h1 className="font-black text-gray-600 text-2xl sm:text-4xl">
          Find your dream jobs
        </h1>
      </div>
      <JobSearchBar />
      <div className="grid grid-cols-3">
        <div className=""></div>
        <div className="">Jobs</div>
        <div className="bg-white"></div>
      </div>
    </div>
  );
};

export default PageWrapper;
