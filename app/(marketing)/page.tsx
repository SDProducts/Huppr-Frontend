// app/page.js
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import ApplicantsOverview from '@/components/ApplicantsOverview';
import Features from '@/components/Features';
import JobListings from '@/components/JobListings';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';

export default function Home() {
    return (
        <>
            <Hero />
            <Stats />
            <ApplicantsOverview />
            <Features />
            <JobListings />
            <Pricing />
            <Testimonials />
            <FAQ />
            <CTA />
        </>
    );
}
