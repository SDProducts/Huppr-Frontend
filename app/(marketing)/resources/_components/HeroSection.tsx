import HeroWithBackground from "@/app/(marketing)/_components/HeroWithBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <HeroWithBackground>
      <div className="*:mx-auto grid gap-4 items-center px-4 sm:px-6 lg:px-8 ">
        <div className="space-y-4 *:mx-auto grid">
          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight md:max-w-3xl text-center">
            Resources to Help You Hire Smarter and Grow Your Career
          </h1>

          <p className="text-[clamp(1rem,1cqi+0.0125rem,1.125rem)] text-gray-600 max-w-lg leading-relaxed text-center">
            Explore practical guides, insights, templates and expert advice
            designed for employers and professionals.
          </p>

          <div className="mt-10 flex w-full max-w-2xl items-center rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm">
            <Search className="ml-3 h-4 w-4 text-slate-400" />

            <Input
              placeholder="Search articles, guides, templates..."
              className="h-11 border-0 bg-transparent shadow-none focus-visible:ring-0"
            />

            <Button className="h-10 rounded-md bg-blue-600 px-7 text-xs font-semibold hover:bg-blue-700">
              Search
            </Button>
          </div>
        </div>
      </div>
    </HeroWithBackground>
  );
};

export default HeroSection;
