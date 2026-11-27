// components/Stats.js
"use client";

import { Briefcase, Building2, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

export default function Stats() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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
      <div className="grid gap-[1.5rem] px-2 sm:px-10 lg:px-20 text-white">
        <h3 className="text-center font-bold text-white ">
          TRUSTED BY FAST-GROWING COMPANIES
        </h3>
        <div className="h-8 bg-white"></div>
        <div className="px-auto grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatsCard
              value={counts[index].toLocaleString()}
              key={index}
              suffix={stat.suffix}
              label={stat.label}
              // className="text-center bg-white rounded-[2rem] p-[1rem]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const StatsCard = ({
  value,
  label,
  suffix,
}: {
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
