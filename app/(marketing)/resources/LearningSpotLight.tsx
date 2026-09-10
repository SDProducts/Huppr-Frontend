import { Button } from "@/components/ui/button";

export default function LearningSpotlight() {
  return (
    <div className="pb-24">
      <div className="mx-auto  px-6">
        <div className="grid overflow-hidden rounded-[26px] bg-white shadow-[0_25px_80px_rgba(15,23,42,0.12)] lg:grid-cols-[0.95fr_1.4fr]">
          <div className="flex flex-col justify-center bg-[#181c1f] px-12 py-14 text-white md:px-16">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-300">
              Learning Spotlight
            </span>

            <h2 className="mt-6 max-w-md text-4xl font-bold leading-[1.05] tracking-tight text-white">
              The Future of
              <br />
              Remote HR in
              <br />
              2024
            </h2>

            <p className="mt-8 max-w-md text-sm leading-6 text-slate-400">
              Our most comprehensive guide yet. Discover how top global
              companies are managing culture, compliance, and talent across
              borders without losing the human touch.
            </p>

            <Button className="mt-8 w-fit bg-blue-600 px-7 hover:bg-blue-700">
              Read the Guide
            </Button>
          </div>

          <div className="min-h-[410px]">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1400&q=80"
              alt="Global remote work"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
