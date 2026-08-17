import DashboardMockup from "@/assets/Background+Border+Shadow.png";
import { Badge } from "@/components/ui/badge";
import { LucideBarChartBig, Sparkles } from "lucide-react";
import Image from "next/image";

export default function RecruitSmarter() {
  return (
    <section className="py-16 bg-light">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Recruit Smarter */}
          <div className="space-y-6">
            <Badge className="tracking-wide bg-primary-100/50 text-primary-badge text-xs font-semibold px-3 py-1">
              RECRUITMENT
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight">
              Recruit Smarter
            </h2>
            <p className=" mt-3 leading-relaxed max-w-[58ch]">
              Leverage AI to streamline your hiring process from description to
              screening. No more manual sorting—find the right fit in seconds
              with our intelligent ranking engine.
            </p>

            <div className="grid grid-cols-[auto_1fr] gap-4 mt-6">
              <div className="grid grid-cols-subgrid col-span-2">
                <Sparkles
                  className="text-primary-badge p-2 aspect-square bg-gray-100 size-fit rounded-md"
                  size="1.5rem"
                />
                <div>
                  <h3 className="text-2xl font-bold ">AI Job Descriptions</h3>
                  <p className=" max-w-[45ch]">
                    Generate high-converting job posts in seconds based on your
                    specific needs.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-subgrid col-span-2">
                <LucideBarChartBig
                  className="text-primary-badge p-2 aspect-square bg-gray-100 size-fit rounded-md"
                  size="1.5rem"
                />
                <div>
                  <h3 className="text-2xl font-bold">Automated Screening</h3>
                  <p className=" max-w-[45ch]">
                    Rank candidates based on skills and cultural fit instantly
                    with our proprietary scoring.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <Image
            src={DashboardMockup}
            alt="Dashboard Mockup"
            loading="eager"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
