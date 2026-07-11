import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
    return (
        <section className="py-20 bg-[#111827] my-[2rem] max-w-3xl mx-auto rounded-[2.5rem]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                  Start Hiring Today.
                </h2>
                <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                    Grow With HeyHR Tomorrow.
                </h2>
                <p className="text-indigo-100 text-lg my-5 max-w-lg mx-auto leading-relaxed">
                    Join 3,500+ high-performing teams. No credit card required to start.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                    <button className="px-8 py-3.5 bg-primary text-white font-semibold rounded-xl transition shadow-lg flex items-center gap-2">
                        Get Started for Free
                        <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="px-8 py-3.5 text-white font-medium rounded-xl border border-white/30 hover:bg-white/10 transition backdrop-blur-sm">
                        Book a Demo
                    </button>
                </div>
            </div>
        </section>
    );
}
