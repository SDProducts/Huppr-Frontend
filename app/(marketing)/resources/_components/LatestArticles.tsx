import { ArrowRight } from "lucide-react";
const latestArticles = [
  {
    category: "Workplace",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80",
    title: "The Rise of Hybrid Work Culture",
    description:
      "How to maintain team cohesion when everyone is working from different time zones.",
    date: "June 12, 2024",
    readTime: "5 min read",
  },
  {
    category: "Product Updates",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    title: "New: AI-Powered Candidate Matching",
    description:
      "Our latest feature helps you filter thousands of applications in seconds with smart ranking.",
    date: "June 08, 2024",
    readTime: "3 min read",
  },
  {
    category: "Career",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
    title: "How to Pivot Careers in Your 30s",
    description:
      "It's never too late to find your passion. Here's a step-by-step guide to a successful transition.",
    date: "June 05, 2024",
    readTime: "7 min read",
  },
];

export default function LatestArticlesSection() {
  return (
    <div className="pb-24">
      <div className="mx-auto  px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Latest Articles</h2>

          <button className="flex items-center gap-2 text-xs font-semibold text-blue-600">
            See all posts
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {latestArticles.map((article) => (
            <LatestArticleCard key={article.title} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LatestArticleCard({
  category,
  image,
  title,
  description,
  date,
  readTime,
}: {
  category: string;
  image: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
}) {
  return (
    <article className="group">
      <div className="aspect-[1.6/1] overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <span className="mt-4 inline-block rounded bg-blue-50 px-2 py-1 text-[9px] font-semibold text-blue-600">
        {category}
      </span>

      <h3 className="mt-3 text-lg font-bold leading-tight tracking-tight">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>

      <div className="mt-4 flex items-center gap-2 text-[10px] font-medium text-slate-700">
        <span>{date}</span>
        <span>•</span>
        <span>{readTime}</span>
      </div>
    </article>
  );
}
