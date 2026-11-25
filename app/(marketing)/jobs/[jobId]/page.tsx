import ApplyForJob from "@/app/(marketing)/jobs/_components/ApplyForJob";
import JobDetailBlock from "@/app/(marketing)/jobs/_components/JobDetailBlock";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

export default function page() {
  return (
    <div className={cn("grid lg:grid-cols-2 gap-4 px-4 py-4 sm:px-10")}>
      <div className="">
        <JobDetailBlock />
      </div>
      <div className="hidden lg:block p-10 rounded-2xl shadow-xl border border-slate-200">
        <div className="space-y-10">
          <div className="flex gap-2">
            <div className="size-10 bg-primary/5 flex items-center justify-center rounded-md">
              <User className="size-6 text-primary" strokeWidth={3} />
            </div>
            <div className="">
              <div className="text-xl font-bold">Apply for this Job</div>
              <p className="text-sm">
                Provide candidates personal informations.
              </p>
            </div>
          </div>

          <ApplyForJob />
        </div>
      </div>
    </div>
  );
}
