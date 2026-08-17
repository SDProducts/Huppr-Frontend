/* eslint-disable react/no-unescaped-entities */
import Pricing from "@/app/(marketing)/_components/Pricing";
import { Badge } from "@/components/ui/badge";
import CTA from "../_components/CTA";
import FAQ from "../_components/FAQ";
import HeroWithBackground from "../_components/HeroWithBackground";
import WhyUpgrade from "../_components/WhyUpgrade";

export default function PricingPage() {
  return (
    <>
      <HeroWithBackground>
        <div className="*:mx-auto grid gap-4 items-center px-4 sm:px-6 lg:px-8 ">
          <div className="space-y-6 *:mx-auto grid">
            <Badge className="tracking-wide bg-primary-100/50 text-primary-badge text-xs font-semibold px-3 py-1">
              PRICING PLANS
            </Badge>

            <h1 className="text-[clamp(2rem,3.5cqi+0.25rem,3.75rem)] font-bold leading-[1.1] tracking-tight md:max-w-[20ch] text-center">
              Simple Pricing That{" "}
              <span className="text-primary-heading"> Grows </span> With{" "}
              <span className="text-primary-heading">Your Business</span>{" "}
            </h1>

            <p className="text-[clamp(1rem,1cqi+0.0125rem,1.125rem)] text-gray-600 max-w-lg leading-relaxed text-center">
              Start hiring for free. Upgrade when you're ready to manage your
              entire workforce from one intelligent platform.
            </p>
          </div>
        </div>
      </HeroWithBackground>
      <Pricing />
      <WhyUpgrade />
      <FAQ />
      <CTA />
    </>
  );
}
