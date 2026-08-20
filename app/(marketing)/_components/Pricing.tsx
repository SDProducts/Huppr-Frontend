import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Subscription } from "@/types";
import { CheckCircle2 } from "lucide-react";

const plans: Subscription[] = [
  {
    name: "Free",
    price_amount: "0",
    price_currency: "NGN",
    period: "forever",
    description: "Best for early stage startups focusing on hiring.",
    benefits: [
      "3 Active Job Posts",
      "Basic AI Screening",
      "Unlimited Applicants",
    ],
    cta: "Get Started",
    // highlight: false,
    // icon: Rocket,
  },
  {
    name: "Pro",
    price_amount: 20000,
    price_currency: "NGN",
    period: "user/mo",
    description: "Complete HR Management for growing teams.",
    benefits: [
      "Unlimited Job Posts",
      "Advanced AI Recruitment",
      "Employee Directory",
      "Upgrade to Pro",
    ],
    cta: "Start Hiring Free",
    tag: "MOST POPULAR",
    // highlight: false,
    // icon: Rocket,
  },
  {
    name: "Enterprise",
    price_amount: "Custom",
    // period: "tailored",
    description: "For large organizations with complex needs.",
    benefits: [
      "Dedicated Account Manager",
      "Custom Workflows & API",
      "SSO & Enhanced Security",
    ],
    cta: "Contact Sales",
    // highlight: true,
    // icon: Building2,
  },
];

export default function Pricing() {
  return (
    <section className="py-20 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Simple Pricing That Grows With Your Business
          </h2>
          <p className="mt-3 leading-relaxed">
            Start with what you need today, upgrade as your team expands.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <SubscriptionCard {...plan} key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

const SubscriptionCard = (sub: Subscription) => (
  <Card className="@container rounded-[2.5rem] relative isolate hover:bg-primary hover:text-white hover:**:text-white transition-all hover:scale-101">
    {sub.tag && (
      <Badge className="absolute top-[1rem] right-[1rem] text-current bg-current/10">
        {sub.tag}{" "}
      </Badge>
    )}
    <CardContent className="h-full">
      <div className="flex flex-col h-full">
        <strong className="text-[clamp(1.2rem,25cqi+0.025rem,2.25rem)] mb-2">
          {sub.name}
        </strong>
        <strong className="text-[clamp(1.5rem,30cqi+0.125rem,2rem)] leading-[1.5ch]">
          {sub.price_amount != 0 &&
          typeof sub.price_amount !== "number" &&
          Number(sub.price_amount).toString().toLowerCase() === "nan"
            ? sub.price_amount
            : new Intl.NumberFormat("en", {
                currency: sub.price_currency ?? "NGN",
                // notation: "compact",
                style: "currency",
              }).format(Number(sub.price_amount))}
        </strong>
        <span>/{sub.period ?? "month"}</span>
        <p className="max-w-[70cqi] my-3">{sub.description}</p>

        <ul className="grow my-3 space-y-2">
          {sub.benefits.map((ben, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckCircle2 className="text-primary" /> {ben}
            </li>
          ))}
        </ul>
        <Button
          className="cta bg-white! p-[1.5rem] text-primary! border-primary border-2 mt-5 fon-semibold rounded-2xl"
          variant="outline"
        >
          {sub.cta}
        </Button>
      </div>
    </CardContent>
  </Card>
);
