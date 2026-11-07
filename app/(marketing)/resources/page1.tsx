import { Badge } from "@/components/ui/badge";
import HeroWithBackground from "../_components/HeroWithBackground";
import FAQ from "../_components/FAQ";
import NewsLetter from "./_components/NewsLetter";
import WhyUpgrade from "../_components/WhyUpgrade";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Search, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import BuildYourTeam from "./_components/BuildYourTeam";
import { Input } from "@/components/ui/input";
const categories = [
  {
    name: "Hiring",
    icon: <TrendingUp className="text-primary-badge" />,
  },
  {
    name: "HR Management",
    icon: <Users className="text-primary-badge" />,
  },
  {
    name: "Performance",
    icon: <TrendingUp className="text-primary-badge" />,
  },
  {
    name: "Career Development",
    icon: <TrendingUp className="text-primary-badge" />,
  },
  {
    name: "Workplace",
    icon: <TrendingUp className="text-primary-badge" />,
  },
  {
    name: "Templates",
    icon: <TrendingUp className="text-primary-badge" />,
  },
  {
    name: "Product Updates",
    icon: <TrendingUp className="text-primary-badge" />,
  },
  {
    name: "Hiring",
    icon: <TrendingUp className="text-primary-badge" />,
  },
  {
    name: "HR Management",
    icon: <Users className="text-primary-badge" />,
  },
  {
    name: "Performance",
    icon: <TrendingUp className="text-primary-badge" />,
  },
  {
    name: "Career Development",
    icon: <TrendingUp className="text-primary-badge" />,
  },
  {
    name: "Workplace",
    icon: <TrendingUp className="text-primary-badge" />,
  },
  {
    name: "Templates",
    icon: <TrendingUp className="text-primary-badge" />,
  },
  {
    name: "Product Updates",
    icon: <TrendingUp className="text-primary-badge" />,
  },
];
export default function Pricing() {
  return (
    <>
      <HeroWithBackground>
        <div className="*:mx-auto grid gap-4 items-center px-4 sm:px-6 lg:px-8 ">
          <div className="space-y-6 *:mx-auto grid">
            <h1 className="text-[clamp(2rem,_3.5cqi_+_0.25rem,_3.75rem)] font-bold leading-[1.1] tracking-tight md:max-w-[22ch] text-center">
              Resources to Help You Hire Smarter and Grow Your Career
            </h1>

            <p className="text-[clamp(1rem,_1cqi_+0.0125rem,_1.125rem)] text-gray-600 max-w-lg leading-relaxed text-center">
              Explore practical guides, insights, templates and expert advice
              designed for employers and professionals.
            </p>

            <form className="w-full max-w-[40rem] md:min-w-[28rem] flex gap-2 items-center bg-white p-2 rounded-lg shadow shadow-brand/25">
              <Search />
              <Input
                type="text"
                placeholder="Search articles, guides, templates..."
                className="bg-transparent border-none shadow-none"
              />
              <Button type="submit" className="p-[1rem]">
                Search
              </Button>
            </form>
          </div>
        </div>
      </HeroWithBackground>
      <section className="pt-6 pb-12 bg-[#0F172A] border-y border-gray-100">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="items-center overflow-x-clip overflow-y-visible full"
        >
          <CarouselContent>
            {categories.map((cat, idx) => (
              <CarouselItem key={idx} className="basis-auto">
                <Button
                  variant="secondary"
                  className="rounded-[2rem] px-[1rem] py-[1.5rem] mr-[1rem]"
                >
                  {" "}
                  {cat.icon} {cat.name}{" "}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="bg-transparent text-light -left-10" />
          <CarouselNext className="bg-transparent text-light -right-10" />
        </Carousel>
      </section>
      <FAQ />
      <NewsLetter />
      <BuildYourTeam />
    </>
  );
}

// const
