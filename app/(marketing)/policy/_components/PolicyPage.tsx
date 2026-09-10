"use client";

import {
  Building2,
  CircleCheckBig,
  Database,
  Download,
  FileText,
  Info,
  LockKeyhole,
  Mail,
  Scale,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const toc = [
  "Key Points Summary",
  "Information Collection",
  "How We Use Data",
  "Data Sharing",
  "Cookies & Tracking",
  "Security Measures",
  "Your Rights",
  "Changes to Policy",
];

const rights = [
  {
    title: "Right to Portability",
    description:
      "Request a copy of your data in a structured, machine-readable format.",
    icon: Download,
  },
  {
    title: "Right to Rectification",
    description: "Ask us to correct any inaccurate or incomplete information.",
    icon: FileText,
  },
  {
    title: "Right to Erasure",
    description:
      "Request that we delete your personal information under certain conditions.",
    icon: Trash2,
  },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] =
    React.useState("Key Points Summary");

  return (
    <main className="bg-white text-slate-950">
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        {/* HEADER */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Transparency Matters
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">
            We believe your data belongs to you. This policy outlines how Huppr
            collects, uses, and protects your information with the highest
            standards of security and ethics.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span>Last Updated: May 24, 2024</span>
            <span>•</span>
            <span>Version 1.0</span>
          </div>
        </div>

        {/* PAGE BODY */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">
          {/* SIDEBAR TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                Table of Contents
              </p>

              <nav className="space-y-1">
                {toc.map((item, index) => {
                  const active = activeSection === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setActiveSection(item);

                        document
                          .getElementById(`section-${index}`)
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-xs font-medium transition",
                        active
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          active ? "bg-blue-600" : "bg-slate-300"
                        )}
                      />

                      <span>
                        {index + 1}. {item}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* CONTENT */}
          <div className="min-w-0 max-w-4xl">
            <KeyPointsSection />

            <PolicySection
              id="section-1"
              number="1."
              title="Information Collection"
            >
              <p>
                We collect information that you provide directly to us when you
                create an account, update your profile, or communicate with our
                support team. This includes personal identifiers such as your
                name, email address, and professional experience.
              </p>

              <p className="mt-4">
                Additionally, as an HR platform, we process data on behalf of
                your employer. This may include employment records, payroll
                information, and performance metrics. We act as a data processor
                for this information, while your employer remains the data
                controller.
              </p>

              <div className="mt-6 flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-5 text-xs leading-6 text-slate-500">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />

                <p className="italic">
                  Note: We also automatically collect technical data like your
                  IP address, browser type, and usage patterns through our
                  server logs and analytics partners to ensure platform
                  stability.
                </p>
              </div>
            </PolicySection>

            <PolicySection id="section-2" number="2." title="How We Use Data">
              <p>
                Your information is used primarily to provide the core Huppr
                services, including streamlining HR workflows, personalizing
                available features, and delivering communication between team
                members. Specifically, we use data to:
              </p>

              <ul className="mt-5 space-y-3 pl-4">
                {[
                  "Process payroll and benefit enrollments.",
                  "Personalize the dashboard experience for each user role.",
                  "Provide AI-driven insights to assist in recruiting and hiring.",
                  "Prevent security incidents and unauthorized access.",
                  "Communicate critical system updates and security alerts.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </PolicySection>

            <PolicySection id="section-3" number="3." title="Data Sharing">
              <p>
                Huppr does not share your personal information with third
                parties except in the following limited circumstances:
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <SharingCard
                  title="Service Providers"
                  description="Trusted partners who help us maintain our platform, such as cloud hosting, email, and payment processing providers."
                  icon={Building2}
                />

                <SharingCard
                  title="Legal Requirements"
                  description="When required by law to comply with a subpoena or other legal process, or to protect the safety of our users."
                  icon={Scale}
                />
              </div>
            </PolicySection>

            <PolicySection
              id="section-4"
              number="4."
              title="Cookies & Tracking"
            >
              <p>
                We use cookies and similar technologies to remember your
                preferences and analyze how you interact with our site. You can
                manage your cookie preferences through your browser settings,
                though some features may be limited if cookies are disabled.
              </p>

              <div className="mt-6 overflow-hidden rounded-lg border border-slate-200">
                <div className="grid grid-cols-[1fr_2fr_1fr] bg-slate-100 px-4 py-3 text-[11px] font-bold text-slate-700">
                  <span>Type</span>
                  <span>Purpose</span>
                  <span>Duration</span>
                </div>

                <CookieRow
                  type="Essential"
                  purpose="Required for login and security."
                  duration="Session"
                />

                <CookieRow
                  type="Performance"
                  purpose="Anonymous analysis for site optimization."
                  duration="1 Year"
                />
              </div>
            </PolicySection>

            <PolicySection id="section-5" number="5." title="Security Measures">
              <p>
                We maintain multiple layers of security to protect your data.
                This includes physical security at our data centers,
                organizational controls, and application-level encryption.
              </p>

              <p className="mt-4">
                Our security team conducts regular penetration testing and
                vulnerability assessments. All Huppr employees undergo mandatory
                background checks and comprehensive data privacy training.
              </p>
            </PolicySection>

            <PolicySection id="section-6" number="6." title="Your Rights">
              <p>
                Depending on your location, you may have specific rights
                regarding your personal data:
              </p>

              <div className="mt-6 space-y-4">
                {rights.map((right) => {
                  const Icon = right.icon;

                  return (
                    <div
                      key={right.title}
                      className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <Icon className="h-4 w-4" />
                      </div>

                      <div>
                        <h3 className="text-sm font-bold">{right.title}</h3>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {right.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </PolicySection>

            <PolicySection id="section-7" number="7." title="Changes to Policy">
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or for other operational, legal, or
                regulatory reasons. We will notify you of any material changes
                by posting the new policy on this page and updating the “Last
                Updated” date at the top.
              </p>

              <p className="mt-4">
                Continued use of the website after such changes constitutes your
                acceptance of the new policy.
              </p>
            </PolicySection>

            <ContactCard />
          </div>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* KEY POINTS                                                                 */
/* -------------------------------------------------------------------------- */

function KeyPointsSection() {
  return (
    <section
      id="section-0"
      className="scroll-mt-8 rounded-xl bg-primary-100 px-6 py-7 md:px-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <FileText className="h-5 w-5 text-blue-100" />

        <h2 className="text-lg font-bold text-primary">Key Points Summary</h2>
      </div>

      <div className="grid gap-x-10 gap-y-7 md:grid-cols-2">
        <SummaryItem
          icon={CircleCheckBig}
          title="Zero Sale of Data"
          description="We never sell your personal or employee data to third parties."
        />

        <SummaryItem
          icon={LockKeyhole}
          title="Enterprise Encryption"
          description="All data is encrypted both at rest and in transit using AES-256 standards."
        />

        <SummaryItem
          icon={ShieldCheck}
          title="Compliance Ready"
          description="Full alignment with GDPR, CCPA, and SOC2 Type II requirements."
        />

        <SummaryItem
          icon={Database}
          title="Total Transparency"
          description="Direct access to your data portability and deletion rights at any time."
        />
      </div>
    </section>
  );
}

function SummaryItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

      <div>
        <h3 className="text-xs font-bold">{title}</h3>

        <p className="mt-1 text-[11px] leading-5 text-gray-700">
          {description}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* GENERIC POLICY SECTION                                                     */
/* -------------------------------------------------------------------------- */

function PolicySection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8 pt-10">
      <h2 className="text-2xl font-bold tracking-tight text-blue-600">
        {number} {title}
      </h2>

      <div className="mt-4 text-sm leading-7 text-slate-600">{children}</div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SHARING CARD                                                               */
/* -------------------------------------------------------------------------- */

function SharingCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-lg border-2 border-slate-200 p-5">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-slate-500" />
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      </div>

      <p className="mt-4 text-xs leading-6 text-slate-500">{description}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* COOKIE ROW                                                                 */
/* -------------------------------------------------------------------------- */

function CookieRow({
  type,
  purpose,
  duration,
}: {
  type: string;
  purpose: string;
  duration: string;
}) {
  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] border-t border-slate-200 px-4 py-3 text-xs text-slate-600">
      <span className="font-medium text-slate-800">{type}</span>
      <span>{purpose}</span>
      <span>{duration}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CONTACT                                                                    */
/* -------------------------------------------------------------------------- */

function ContactCard() {
  return (
    <section className="mt-12 rounded-xl bg-slate-100 px-6 py-10 text-center">
      <h2 className="text-xl font-bold text-slate-900">
        Have questions about your data?
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
        Our Data Protection Officer (DPO) is here to help clarify any concerns
        you might have regarding our privacy practices.
      </p>

      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Button className="h-11 bg-blue-600 px-7 hover:bg-blue-700">
          <Mail className="mr-2 h-4 w-4" />
          Contact Privacy Team
        </Button>

        <Button
          variant="outline"
          className="h-11 border-blue-300 bg-transparent px-7 text-blue-600 hover:bg-blue-50"
        >
          <Info className="mr-2 h-4 w-4" />
          Visit Help Center
        </Button>
      </div>
    </section>
  );
}
