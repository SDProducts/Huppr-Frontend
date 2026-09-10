/* eslint-disable react/no-unescaped-entities */
// components/Features.js
import FeatureCard from "@/components/FeatureCard";
import {
  BadgeCheck,
  Brain,
  Calendar,
  FileText,
  Filter,
  Heart,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";

const recruitFeatures = [
  {
    icon: Brain,
    title: "Recruit Smarter",
    description:
      "Leverage AI to streamline your hiring process from description to screening.",
  },
  // {
  //   icon: LayoutDashboardIcon,
  //   title: "Recruitment Dashboard",
  //   description:
  //     "No more manual sorting—find the right fit in seconds with our intelligent ranking engine.",
  // },
  {
    icon: FileText,
    title: "AI Job Descriptions",
    description:
      "Generate high-converting job posts in seconds based on your specific needs.",
  },
  {
    icon: Filter,
    title: "Automated Screening",
    description:
      "Rank candidates based on skills and cultural fit instantly with proprietary scoring.",
  },
];

const hrFeatures = [
  {
    icon: Users,
    title: "Employee Directory",
    description:
      "A centralized hub for all team member information and documentation.",
  },
  {
    icon: Calendar,
    title: "Leave Management",
    description:
      "Streamline time-off requests, approvals, and balance tracking in one place.",
  },
  {
    icon: Sparkles,
    title: "Smart Summarization",
    description:
      "Get instant highlights from resumes and interviews, focusing on the experience that matters most.",
  },
  {
    icon: Heart,
    title: "Cultural Fit Analysis",
    description:
      "Assess alignment with your core company values through automated sentiment analysis.",
  },
  {
    icon: Shield,
    title: "Bias Mitigation",
    description:
      "Advanced algorithms help identify and filter out unconscious bias, ensuring you hire purely based on potential and skill.",
  },
];

export default function Features() {
  const features = [
    {
      icon: (
        <span className="p-2 bg-primary rounded w-fit grid place-content-center">
          <Brain size="1.5rem" className="text-white" />
        </span>
      ),
      title: "Smart Summarization",
      description:
        "Get instant highlights from resumes and interviews, focusing on the experience that matters most.",
    },
    {
      icon: (
        <span className="p-2 bg-primary rounded w-fit grid place-content-center">
          <Users size="1.5rem" className="text-white" />
        </span>
      ),
      title: "Cultural Fit Analysis",
      description:
        "Assess alignment with your core company values through automated sentiment analysis.",
    },
    {
      icon: (
        <span className="p-2 bg-primary rounded w-fit grid place-content-center">
          <BadgeCheck size="1.5rem" className="text-white" />
        </span>
      ),
      title: "Bias Mitigation",
      description:
        "Advanced algorithms help identify and filter out unconscious bias, ensuring you hire purely based on potential and skill.",
    },
  ];
  return (
    <section className="py-20 bg-linear-to-b from-dark via-blue-950 to-primary">
      <div className="*:mx-auto px-4 sm:px-10 lg:px-20 space-y-4">
        <h2 className="text-4xl font-bold tracking-tight text-white  text-center">
          AI That Works Alongside Your Team
        </h2>
        <p className="leading-relaxed max-w-[60ch] font-ligh text-light  text-center">
          Our intelligence doesn't replace humans; it gives them superpowers to
          build better cultures.
        </p>

        <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(min(20rem,100%),1fr))] grid-rows-[auto_auto_auto]">
          {features.map((feat, idx) => (
            <FeatureCard
              {...feat}
              key={idx}
              className="bg-blue-950 border-blue-500 **:[p]:text-light **:[strong]:text-white py-6 row-span-3 grid-rows-subgrid"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
