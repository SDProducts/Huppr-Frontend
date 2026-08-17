import { Button } from "@/components/ui/button";

export default function BuildYourTeam() {
  return (
    <section className="my-[2rem]">
      <div className=" mx-auto px-8 sm:px-12 lg:px-20 text-center py-12  bg-white shadow-lg shadow-indigo-100 border-light rounded-[2.5rem]">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
          Ready to Build Your Team?
        </h2>
        <p className="text-lg my-5 max-w-[50ch] mx-auto leading-relaxed">
          Join thousands of companies using HeyHR to find and hire world-class
          talent.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Button size="lg" className="shadow-indigo-200 p-[1.5rem]">
            Create Job
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="p-[1.5rem] backdrop-blur-sm"
          >
            Browse Jobs
          </Button>
        </div>
      </div>
    </section>
  );
}
