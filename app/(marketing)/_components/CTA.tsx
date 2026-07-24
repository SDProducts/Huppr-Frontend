import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="my-[2rem]">
      <div className=" mx-auto px-8 sm:px-12 lg:px-20 text-center py-12  bg-[#111827] rounded-[2.5rem]">
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
          <Button size="lg" className="shadow-indigo-200 px-4">
            Get Started for Free
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="px-4 backdrop-blur-sm bg-white/20 text-white hover:bg-white/10"
          >
            Book a Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
