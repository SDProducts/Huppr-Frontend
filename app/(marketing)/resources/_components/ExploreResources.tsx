import {
  ArrowRight,
  BookOpen,
  CheckSquare,
  FileText,
  LayoutGrid,
} from "lucide-react";
const employerResources = [
  {
    icon: FileText,
    title: "Recruitment Guide",
    description: "A handbook your hiring pipeline for consistency",
  },
  {
    icon: CheckSquare,
    title: "Interview Checklist",
    description: "A structured framework for each hiring interview.",
  },
  {
    icon: BookOpen,
    title: "Employee Handbook",
    description: "Essential policies and cultural guidelines.",
  },
  {
    icon: LayoutGrid,
    title: "Leave Policy",
    description: "Clear rules for time off and remote work.",
  },
];

export default function EmployerResourcesSection() {
  return (
    <div className="py-20">
      <div className="mx-auto px-4 sm:px-10 lg:px-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Everything Employers Need
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Ready-to-use documents to streamline your HR processes.
            </p>
          </div>

          <button className="hidden items-center gap-2 text-xs font-semibold text-blue-600 sm:flex">
            View All Templates
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {employerResources.map((resource) => (
            <EmployerResourceCard key={resource.title} {...resource} />
          ))}
        </div>
      </div>
    </div>
  );
}

function EmployerResourceCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-lg">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <Icon className="h-4 w-4" />
      </div>

      <h3 className="mt-6 text-sm font-bold">{title}</h3>

      <p className="mt-2 min-h-10 text-xs leading-5 text-slate-500">
        {description}
      </p>

      <div className="mt-6 flex gap-4 text-[11px] font-semibold">
        <button className="text-blue-600">View</button>
        <button className="text-slate-700">Download</button>
      </div>
    </article>
  );
}
