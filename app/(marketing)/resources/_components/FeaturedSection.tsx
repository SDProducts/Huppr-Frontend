import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const featuredResources = [
  {
    id: 1,
    type: "Article",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    readTime: "8 min read",
    title: "How to Write Better Job Descriptions",
    description:
      "Attract top talent with job postings that actually resonate and convert the right candidates.",
  },
  {
    id: 2,
    type: "Article",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
    readTime: "6 min read",
    title: "10 Interview Questions Every Startup Should Ask",
    description:
      "Go beyond the resume to find cultural fits and problem solvers for your growing team.",
  },
];

export default function FeaturedSection() {
  return (
    <div className="border-b border-slate-100 bg-white py-16">
      <div className="mx-auto grid  gap-6 px-4 sm:px-10 lg:px-20 lg:grid-cols-[1fr_1fr_0.95fr]">
        {featuredResources.map((resource) => (
          <FeaturedCard key={resource.id} {...resource} />
        ))}

        <TemplateCard />
      </div>
    </div>
  );
}

function FeaturedCard({
  type,
  image,
  readTime,
  title,
  description,
}: {
  type: string;
  image: string;
  readTime: string;
  title: string;
  description: string;
}) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-[205px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-semibold text-white">
          {type}
        </span>
      </div>

      <div className="p-6">
        <p className="text-[11px] font-medium text-slate-500">{readTime}</p>

        <h3 className="mt-2 text-xl font-bold leading-tight tracking-tight">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </article>
  );
}

function TemplateCard() {
  return (
    <article className="flex min-h-[385px] flex-col justify-center rounded-xl border border-slate-200 bg-[#f3f6fc] p-8">
      <span className="w-fit rounded-full bg-blue-600 px-3 py-1 text-[10px] font-semibold text-white">
        Template
      </span>

      <h3 className="mt-6 text-2xl font-bold leading-tight tracking-tight">
        Employee Onboarding
        <br />
        Checklist
      </h3>

      <p className="mt-4 text-sm leading-6 text-slate-500">
        A comprehensive guide to ensuring your new hires feel welcome and ready
        from day one.
      </p>

      <Button className="mt-8 h-12 bg-blue-600 text-sm hover:bg-blue-700">
        <Download className="mr-2 h-4 w-4" />
        Download Template
      </Button>
    </article>
  );
}
