import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  FileText,
  LayoutGrid,
  Sparkles,
  Users,
} from "lucide-react";
const categories = [
  "Hiring",
  "HR Management",
  "Performance",
  "Career Development",
  "Workplace",
  "Templates",
  "Product Updates",
];

export default function CategoryBar() {
  return (
    <div className="bg-[#111a2d]">
      <div className="mx-auto flex gap-3 overflow-x-auto px-4 sm:px-10 lg:px-20 py-5 scrollbar-none">
        {categories.map((category, index) => (
          <div
            key={category}
            className="flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
          >
            {index === 0 && <BriefcaseBusiness className="h-3.5 w-3.5" />}
            {index === 1 && <Users className="h-3.5 w-3.5" />}
            {index === 2 && <Sparkles className="h-3.5 w-3.5" />}
            {index === 3 && <ArrowRight className="h-3.5 w-3.5" />}
            {index === 4 && <LayoutGrid className="h-3.5 w-3.5" />}
            {index === 5 && <FileText className="h-3.5 w-3.5" />}
            {index === 6 && <BookOpen className="h-3.5 w-3.5" />}
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}
