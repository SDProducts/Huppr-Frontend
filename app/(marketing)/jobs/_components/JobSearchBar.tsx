"use client";

import { MapPin, Search } from "lucide-react";

import Input from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import { Form, Formik } from "formik";

interface JobSearchBarProps {
  filterParams: JobsFilters;

  onSearch: (params: JobsFilters) => void;
}

export function JobSearchBar({ onSearch, filterParams }: JobSearchBarProps) {
  const formData = {
    search: filterParams.search || "",
    // location: filterParams.locationCity || "",
  };
  function handleSubmit(params: typeof formData) {
    onSearch({
      ...filterParams,
      search: params.search,
    });
  }
  return (
    <div className="sticky top-2 z-40 w-full bg-white shadow rounded-2xl px-4 py-4">
      <Formik initialValues={formData} onSubmit={handleSubmit}>
        {() => {
          return (
            <Form
              className="mx-auto flex w-full max-w-7xl flex-col gap-3 lg:flex-row lg:items-center lg:gap-4"
              // className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6"
            >
              <div className="flex flex-col sm:flex-row items-center gap-2 flex-1">
                {/* Job title / keyword */}
                <Input
                  name="search"
                  icon={<Search />}
                  placeholder="Search by Job Title or Keywords"
                  className="rounded-xl bg-gray-200 text-sm shadow-none focus-visible:border-[#2563eb] focus-visible:ring-1 focus-visible:ring-[#2563eb]"
                />
                <Input
                  icon={<MapPin />}
                  name="location"
                  placeholder="Search by Location"
                  className="rounded-xl bg-gray-200 text-sm shadow-none focus-visible:border-[#2563eb] focus-visible:ring-1 focus-visible:ring-[#2563eb]"
                />
              </div>
              <div className="grid items-center justify-center gap-1">
                {/* Search */}
                <Button
                  type="submit"
                  className="h-12 shrink-0 rounded-xl bg-[#2563eb] px-8 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-[#1d4ed8]"
                >
                  Search Jobs
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
