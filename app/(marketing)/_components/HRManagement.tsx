import DashboardMockup from "@/assets/Background+Border+Shadow-2.png";
import FeatureCard from "@/components/FeatureCard";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Info, UsersRound } from "lucide-react";
import Image from "next/image";

export default function HRManagement() {
  const features = [
    {
      icon: <UsersRound className="text-primary-badge" />,
      title: "Employee Directory",
      description:
        "A centralized hub for all team member information and documentation.",
    },
    {
      icon: <CalendarCheck className="text-primary-badge" />,
      title: "Employee Directory",
      description:
        "A centralized hub for all team member information and documentation.",
    },
  ];
  return (
    <section className="py-16">
      <div className="mx-auto px-4 sm:px-10 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Applicants Overview */}
          <div className="space-y-6">
            <Badge className="tracking-wide bg-dark/5 text-dark text-xs font-semibold px-3 py-1">
              HR MANAGEMENT
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight">
              Built for Growing Teams
            </h2>
            <p className=" mt-3 leading-relaxed">
              Transition seamlessly from hiring to managing. Our Pro tools
              provide everything needed to support your workforce as it expands.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              {features.map((feat, idx) => (
                <FeatureCard {...feat} key={idx} />
              ))}
            </div>

            <div className="flex items-center gap-4 tracking-wide bg-light text-primary p-4 w-full border-primary/50 justify-start rounded-2xl">
              <Info size="1.5rem" />
              HR Management features are available on our Pro plans.
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
