// components/Hero.js
import { ArrowRight, Sparkles, Zap, Users, BarChart3 } from "lucide-react";
import DashboardMockup from "@/assets/Dashboard.png";
import Image from "next/image";import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"

export default function Hero() {
  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-gradient-to-b from-indigo-50/50 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold tracking-wide border border-indigo-100/50">
              <Sparkles className="w-3.5 h-3.5" />
              New: AI-Powered Candidate Screening
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              Everything you need to <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Hire, manage and Grow
              </span> Your workforce
            </h1>

            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              Recruit top talent, streamline HR operations and build high-performing teams from one
              intelligent platform designed for growing businesses.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center gap-2">
                Create Job
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition border border-gray-200">
                Find Jobs
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-sm text-gray-500">
                <AvatarGroup className="grayscale">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
                        <AvatarFallback>LR</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/evilrabbit.png"
                          alt="@evilrabbit"
                        />
                        <AvatarFallback>ER</AvatarFallback>
                      </Avatar>
                      <AvatarGroupCount>+3</AvatarGroupCount>
                    </AvatarGroup>
              <div className="flex items-center gap-1.5">
                Join 15,000+ companies already hiring smarter
              </div>
            </div>
          </div>

          {/* Right Dashboard Mock */}
          <div className="relative">
            <Image src={DashboardMockup} alt="Dashboard Mockup" />
          </div>
        </div>
      </div>
    </section>
  );
}
