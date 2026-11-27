// app/page.js

import CTA from "./_components/CTA";
import DiscoverOpportunities from "./_components/DiscoverOpportunities";
import FAQ from "./_components/FAQ";
import Features from "./_components/Features";
import Hero from "./_components/Hero";
import HRManagement from "./_components/HRManagement";
import Pricing from "./_components/Pricing";
import RecruitSmarter from "./_components/RecruitSmarter";
import Stats from "./_components/Stats";
import Testimonials from "./_components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <RecruitSmarter />
      <HRManagement />
      <Features />
      <DiscoverOpportunities />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
