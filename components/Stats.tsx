// components/Stats.js
'use client';

import { useEffect, useRef, useState } from 'react';
import { Users, Building2, Briefcase, TrendingUp } from 'lucide-react';

const stats = [
    {
        icon: Briefcase,
        value: 15000,
        label: 'Jobs Posted Monthly',
        suffix: '+',
    },
    {
        icon: Building2,
        value: 3500,
        label: 'Active Businesses',
        suffix: '+',
    },
    {
        icon: Users,
        value: 120000,
        label: 'Top Professionals',
        suffix: '+',
    },
    {
        icon: TrendingUp,
        value: 92,
        label: 'Match Rate',
        suffix: '%',
    },
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

            setCounts(
                stats.map((s) => Math.round(eased * s.value))
            );

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }, [isVisible]);

    return (
        <section ref={ref} className="py-16 bg-[#0F172A] border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center bg-white rounded-[2rem] p-[1rem]">
                            <div className="flex justify-center mb-3">
                                {/*<div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                                    <stat.icon className="w-5 h-5 text-indigo-600" />
                                </div>*/}
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                                {counts[index].toLocaleString()}
                                {stat.suffix}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
