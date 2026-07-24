import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Building2, Rocket } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Best for early stage startups focusing on hiring.",
    features: [
      "3 Active Job Posts",
      "Basic AI Screening",
      "Unlimited Applicants",
    ],
    cta: "Get Started",
    highlight: false,
    icon: Rocket,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored",
    description: "For large organizations with complex needs.",
    features: [
      "Dedicated Account Manager",
      "Custom Workflows & API",
      "SSO & Enhanced Security",
    ],
    cta: "Contact Sales",
    highlight: true,
    icon: Building2,
  },
];

export default function Pricing() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge className="tracking-wide bg-primary-100/50 text-primary-badge text-xs font-semibold px-3 py-1">
            <Sparkles className="w-3.5 h-3.5" />
            Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Simple Pricing That Grows With Your Business
          </h2>
          <p className="text-gray-600 mt-3 leading-relaxed">
            Start with what you need today, upgrade as your team expands.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-8 transition-all duration-300 ${
                plan.highlight
                  ? "border-indigo-200 bg-gradient-to-b from-indigo-50/50 to-white shadow-xl shadow-indigo-100/50 scale-105"
                  : "border-gray-100 bg-white hover:shadow-lg"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    plan.highlight ? "bg-indigo-100" : "bg-gray-100"
                  }`}
                >
                  <plan.icon
                    className={`w-5 h-5 ${
                      plan.highlight ? "text-indigo-600" : "text-gray-600"
                    }`}
                  />
                </div>
                <span className="font-semibold text-gray-900">{plan.name}</span>
              </div>

              <div className="mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  {plan.price}
                </span>
                <span className="text-sm text-gray-500 ml-1.5">
                  /{plan.period}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-center gap-2.5 text-sm text-gray-700"
                  >
                    <Check
                      className={`w-4 h-4 ${
                        plan.highlight ? "text-indigo-600" : "text-gray-400"
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-semibold transition text-sm ${
                  plan.highlight
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
