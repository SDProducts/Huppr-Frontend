import { Button } from "@/components/ui/button";

export default function FinalCTA() {
  return (
    <div className="bg-[#f8faff] px-6 py-24">
      <div className="mx-auto max-w-4xl rounded-[30px] border border-slate-100 bg-white px-8 py-16 text-center shadow-sm md:px-16">
        <h2 className="text-3xl font-bold tracking-tight">
          Ready to Build Your Team?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500">
          Join thousands of companies using Huppr to find and hire world-class
          talent.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button className="h-12 bg-blue-600 px-8 hover:bg-blue-700">
            Create Job
          </Button>

          <Button
            variant="secondary"
            className="h-12 bg-blue-50 px-8 text-blue-600 hover:bg-blue-100"
          >
            Browse Jobs
          </Button>
        </div>
      </div>
    </div>
  );
}
