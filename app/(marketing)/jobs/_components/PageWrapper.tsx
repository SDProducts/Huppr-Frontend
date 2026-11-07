"use client";
import {
  FilterParams,
  FilterSidebar,
  TopFilter,
} from "@/app/(marketing)/jobs/_components/Filters";
import JobCard from "@/app/(marketing)/jobs/_components/JobCard";
import JobDetails from "@/app/(marketing)/jobs/_components/JobDetails";
import { JobSearchBar } from "@/app/(marketing)/jobs/_components/JobSearchBar";
import {
  BriefcaseBusiness,
  Plane,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { useState } from "react";

export type Job2 = {
  id: number;
  title: string;
  company: string;
  location: string;
  employment: string;
  level: string;
  salary: string;
  description: string;
  logo: string;
  hot?: boolean;
  about: string;
  responsibilities: string[];
  benefits: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
};

/* -------------------------------------------------------------------------- */
/*                                  DATA                                      */
/* -------------------------------------------------------------------------- */

export const jobs: Job2[] = [
  {
    id: 1,
    title: "Senior UI Designer",
    company: "Luminary Cloud",
    location: "San Francisco (Remote)",
    employment: "Full-time",
    level: "Senior",
    salary: "$140k - $190k",
    description:
      "We are looking for a visionary UI Designer to help us craft the next generation of cloud computing interfaces",
    logo: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=100&q=80",
    hot: true,
    about:
      "At Luminary Cloud, we are building the future of simulation-based design. As a Senior UI Designer, you will be responsible for the end-to-end visual identity and interface design of our web platform. You’ll work closely with product managers and engineers to turn complex technical requirements into elegant, intuitive, and high-performance user experiences.",
    responsibilities: [
      "Design high-fidelity UI mockups and interactive prototypes for core product features.",
      "Maintain and expand our design system, ensuring visual consistency across all products.",
      "Collaborate with engineers to ensure pixel-perfect implementation of designs.",
      "Lead user research sessions to validate design decisions with data.",
      "Mentor junior designers and contribute to the team's design culture.",
    ],
    benefits: [
      {
        title: "Premium Health",
        description: "100% Covered",
        icon: <ShieldCheck className="h-5 w-5" />,
      },
      {
        title: "Remote Setup",
        description: "$3k Stipend",
        icon: <BriefcaseBusiness className="h-5 w-5" />,
      },
      {
        title: "Unlimited PTO",
        description: "4 Weeks Min",
        icon: <Plane className="h-5 w-5" />,
      },
      {
        title: "401(k) Match",
        description: "Up to 4%",
        icon: <WalletCards className="h-5 w-5" />,
      },
    ],
  },
  {
    id: 2,
    title: "Frontend Architect",
    company: "StrucTech Systems",
    location: "New York, NY",
    employment: "Full-time",
    level: "Senior",
    salary: "$160k - $210k",
    description:
      "Help us build robust and scalable design systems for our global infrastructure monitoring tools using React...",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&q=80",
    about:
      "StrucTech Systems is looking for an experienced frontend architect to lead the technical direction of our web platform.",
    responsibilities: [
      "Define frontend architecture and development standards.",
      "Build scalable React applications.",
      "Work closely with product and engineering teams.",
      "Review technical implementations and mentor developers.",
    ],
    benefits: [],
  },
  {
    id: 3,
    title: "Product Marketing Lead",
    company: "Verda Earth",
    location: "Austin, TX",
    employment: "Full-time",
    level: "Senior",
    salary: "$120k - $150k",
    description:
      "Driving growth for a greener future. We need a storyteller who can bridge the gap between complex...",
    logo: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=100&q=80",
    about:
      "Verda Earth is building products that help organizations transition toward a more sustainable future.",
    responsibilities: [
      "Develop product positioning and messaging.",
      "Create go-to-market strategies.",
      "Collaborate with sales and product teams.",
    ],
    benefits: [],
  },
  {
    id: 4,
    title: "Lead Data Scientist",
    company: "Vault Financial",
    location: "Remote, EU",
    employment: "Contract",
    level: "Senior",
    salary: "$180k - $230k",
    description:
      "Scale our predictive models to process millions of daily transactions while maintaining extreme precision and...",
    logo: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=100&q=80",
    about:
      "Vault Financial uses advanced data science and machine learning to build the next generation of financial products.",
    responsibilities: [
      "Lead machine learning initiatives.",
      "Build predictive models.",
      "Work with large financial datasets.",
    ],
    benefits: [],
  },
];

const PageWrapper = () => {
  const [filterParams, setfilterParams] = useState<FilterParams>({
    experience_level: "",
    employement_type: "",
    industry: "all",
    salary_rage: {
      min: 40,
      max: 500,
    },
  });
  const [selectedJobId, setSelectedJobId] = useState(1);

  const selectedJob = jobs.find((job) => job.id === selectedJobId) ?? jobs[0];

  return (
    <div className="px-2 sm:px-10">
      <div className="py-12 sm:py-18 text-center">
        <h1 className="font-black text-gray-600 text-2xl sm:text-4xl">
          Find your dream jobs
        </h1>
      </div>
      <div className="space-y-10">
        <JobSearchBar />
        {/* <JobsPage /> */}
        <div className="grid sm:grid-cols-5 gap-6">
          <div className="border border-slate-200 rounded-md px-4 h-fit hidden sm:block">
            <FilterSidebar
              filter={filterParams}
              onSetFilter={setfilterParams}
            />
          </div>
          {/* Jobs */}
          <div className="sm:col-span-2">
            <TopFilter />
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  selected={selectedJobId === job.id}
                  onClick={() => setSelectedJobId(job.id)}
                />
              ))}
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div className="hidden col-span-2 rounded-md border border-slate-200 lg:block">
            <JobDetails job={selectedJob} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
