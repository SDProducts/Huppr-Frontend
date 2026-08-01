import { ArrowRight, Sparkles, Zap, Users, BarChart3 } from "lucide-react";
import DashboardMockup from "@/assets/Dashboard.png";
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="py-12 bg-linear-to-b from-white via-indigo-50/50  to-white full overflow-clip">
      <div className="relative isolate">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center px-4 sm:px-6 lg:px-8 ">
          {/* Left Content */}
          <div className="space-y-6">
            <Badge
              // variant="secondary"
              className="tracking-wide bg-primary-100/50 text-primary-badge text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              New: AI-Powered Candidate Screening
            </Badge>

            <h1 className="text-[clamp(2rem,_3.5cqi_+_0.25rem,_3.75rem)] font-bold leading-[1.1] tracking-tight md:max-w-[15ch]">
              Everything you need to{" "}
              <span className="text-primary-heading">
                Hire, manage and Grow
              </span>{" "}
              Your workforce
            </h1>

            <p className="text-[clamp(1rem,_1cqi_+0.0125rem,_1.125rem)] text-gray-600 max-w-lg leading-relaxed">
              Recruit top talent, streamline HR operations and build
              high-performing teams from one intelligent platform designed for
              growing businesses.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                className="shadow-lg shadow-indigo-200 p-[1.5rem]"
                size="lg"
              >
                Create Job
              </Button>
              <Button
                variant="secondary"
                className="bg-white border-[#C4C5D9] p-[1.5rem]"
                size="lg"
              >
                Find Jobs
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-sm text-gray-500">
              <AvatarGroup className="grayscale -space-x-4">
                <Avatar size="lg">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback className="text-gray-200">CN</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage
                    src="https://github.com/maxleiter.png"
                    alt="@maxleiter"
                  />
                  <AvatarFallback className="text-gray-200">LR</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback className="text-gray-200">ER</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback className="text-gray-200">ER</AvatarFallback>
                </Avatar>
                {/*<AvatarGroupCount size="lg">+3</AvatarGroupCount>*/}
              </AvatarGroup>
              <div className="flex items-center gap-1.5">
                Join 15,000+ companies already hiring smarter
              </div>
            </div>
          </div>

          {/* Right Dashboard Mock */}
          <div className="relative">
            <Image
              src={DashboardMockup}
              alt="Dashboard Mockup"
              loading="eager"
            />
          </div>
        </div>

        <div className="rounded-full aspect-square w-[10rem] absolute -bottom-[2rem] left-0 bg-primary/15 -z-50 blur-3xl"></div>
        <div className="rounded-full aspect-square w-[15rem] absolute -bottom-[2rem] right-0 bg-accent -z-50 blur-3xl"></div>
      </div>
    </section>
  );
}
