// components/Stats.js
"use client";

import { useEffect, useRef, useState } from "react";
import {
  Users,
  Building2,
  Briefcase,
  TrendingUp,
  UsersRound,
  Sparkles,
} from "lucide-react";
import FeatureCard from "@/components/FeatureCard";

const stats = [
  {
    icon: Briefcase,
    value: 15000,
    label: "Jobs Posted Monthly",
    suffix: "+",
  },
  {
    icon: Building2,
    value: 3500,
    label: "Active Businesses",
    suffix: "+",
  },
  {
    icon: Users,
    value: 120000,
    label: "Top Professionals",
    suffix: "+",
  },
  // {
  //   icon: TrendingUp,
  //   value: 92,
  //   label: "Match Rate",
  //   suffix: "%",
  // },
];

export default function WhyUpgrade() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const features = [
    {
      icon: (
        <span className="p-2 bg-light rounded w-fit grid place-content-center">
          <UsersRound size="1.5rem" className="text-primary-badge" />
        </span>
      ),
      title: (
        <div className="text-xl text-white">Manage Your Entire Workforce</div>
      ),
      description:
        "Transition from just hiring to managing. Keep all your employee data, leave records, and documents in one secure place.",
    },
    {
      icon: (
        <span className="p-2 bg-light rounded w-fit grid place-content-center">
          <Sparkles size="1.5rem" className="text-primary-badge" />
        </span>
      ),
      title: <div className="text-xl text-white">Save Time with AI</div>,
      description:
        "Automate repetitive HR tasks with our AI Assistant. Generate job descriptions and get performance insights in seconds.",
    },
    {
      icon: (
        <span className="p-2 bg-light rounded w-fit grid place-content-center">
          <TrendingUp size="1.5rem" className="text-primary-badge" />
        </span>
      ),
      title: <div className="text-xl text-white">Scale with Confidence</div>,
      description:
        "Gain visibility with advanced reporting and analytics. Make data-driven decisions that help your culture and bottom line grow.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(stats.map((s) => Math.round(eased * s.value)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isVisible]);

  return (
    <section ref={ref} className="py-16 bg-[#0F172A] border-y border-gray-100">
      <div className="grid gap-[1.5rem] px-4 sm:px-6 lg:px-8  text-white">
        <div className="grid gap-2 mx-auto">
          <h2 className="text-4xl text-center font-bold text-white ">
            Why upgrade to a paid plan?
          </h2>

          <p className="leading-relaxed max-w-[58ch] mx-auto text-center">
            Unlock the full power of HeyHR to scale your business effortlessly.
          </p>
        </div>

        <div className="px-auto grid md:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <FeatureCard
              key={idx}
              {...feat}
              className=" bg-current/10 text-white rounded-[2rem] px-[1.5rem] py-[2rem]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const StatsCard = ({
  icon,
  value,
  label,
  suffix,
}: {
  icon: any;
  value: string | number;
  label: string;
  suffix: string;
}) => (
  <div className="text-center bg-white rounded-[2rem] p-[2rem]">
    <div className="text-2xl sm:text-3xl font-bold text-dark tracking-tight">
      {value}
      {suffix}
    </div>
    <div className="text-sm mt-1 text-muted">{label}</div>
  </div>
);
