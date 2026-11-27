"use client";

import { CircleHelp, FileText, Scale } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sections = [
  "Acceptance of Terms",
  "Description of Service",
  "User Obligations",
  "Data Privacy",
  "Intellectual Property",
  "Termination",
  "Limitation of Liability",
];

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = React.useState(
    "Description of Service"
  );

  const scrollToSection = (index: number, title: string) => {
    setActiveSection(title);

    document.getElementById(`section-${index + 1}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        {/* TOP INTRO */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-600">
            <Scale className="h-3.5 w-3.5" />
            Legal Documentation
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-[-0.04em] md:text-5xl">
            Terms of Service
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500">
            Last updated: October 24, 2024. Please read these terms carefully
            before using our HR management platform.
          </p>
        </div>

        {/* BODY */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-16">
          {/* TABLE OF CONTENTS */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                Table of Contents
              </p>

              <nav className="mt-5 space-y-1.5">
                {sections.map((section, index) => {
                  const active = activeSection === section;

                  return (
                    <button
                      key={section}
                      type="button"
                      onClick={() => scrollToSection(index, section)}
                      className={cn(
                        "relative w-full rounded-md py-2 pl-4 pr-2 text-left text-[11px] font-medium transition",
                        active
                          ? "text-blue-600"
                          : "text-slate-600 hover:bg-white hover:text-slate-950"
                      )}
                    >
                      {active && (
                        <span className="absolute bottom-2 left-0 top-2 w-0.5 rounded-full bg-blue-600" />
                      )}
                      {index + 1}. {section}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* CONTENT */}
          <div className="min-w-0 max-w-4xl">
            <TermsSection id="section-1" title="1. Acceptance of Terms">
              <p>
                By accessing or using the Huppr platform (“Service”), you agree
                to be bound by these Terms of Service. If you do not agree to
                all of the terms and conditions, you may not access or use our
                services.
              </p>

              <p className="mt-4">
                Huppr reserves the right to update and change these terms at any
                time without prior notice. Any new features that augment or
                enhance the current Service shall be subject to the Terms of
                Service. Continued use of the Service after any such changes
                shall constitute your consent to such changes.
              </p>
            </TermsSection>

            <TermsSection id="section-2" title="2. Description of Service">
              <p>
                Huppr provides a suite of online HR management tools, including
                but not limited to payroll processing, employee records
                management, benefits administration, and automated reporting.
                The Service is provided “as is” and “as available.”
              </p>

              <p className="mt-4">
                We leverage advanced data processing and automated intelligence
                to provide HR insights. While we strive for absolute accuracy,
                the platform is an administrative tool and does not constitute
                legal or professional advice.
              </p>

              <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80"
                  alt="HR management workspace"
                  className="h-[300px] w-full object-cover md:h-[360px]"
                />
              </div>
            </TermsSection>

            <TermsSection id="section-3" title="3. User Obligations">
              <p>
                You must be a human. Accounts registered by “bots” or other
                automated methods are not permitted. You are responsible for
                maintaining the security of your account and password.
              </p>

              <ul className="mt-4 space-y-3 pl-4">
                {[
                  "You must provide accurate and complete information during registration.",
                  "You are responsible for all content posted and activity that occurs under your account.",
                  "You may not use the Service for any illegal or unauthorized purpose.",
                  "You must not violate any laws in your jurisdiction, including copyright laws.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </TermsSection>

            <TermsSection id="section-4" title="4. Data Privacy">
              <p>
                Your privacy is critically important to us. Our{" "}
                <a
                  href="/privacy-policy"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Privacy Policy
                </a>{" "}
                explains how we treat your personal data and protect your
                privacy when you use our Service. By using Huppr, you agree that
                Huppr can use such data in accordance with our privacy policies.
              </p>

              <p className="mt-4">
                Huppr complies with major international data protection
                regulations, including GDPR and CCPA. We employ
                industry-standard encryption for all data at rest and in
                transit.
              </p>
            </TermsSection>

            <TermsSection id="section-5" title="5. Intellectual Property">
              <p>
                The look and feel of the Service is copyright © 2024 Huppr. All
                rights reserved. You may not duplicate, copy, or reuse any
                portion of the HTML/CSS, visual design elements, or concepts
                without express written permission from Huppr.
              </p>

              <p className="mt-4">
                However, you retain all intellectual property rights over the
                data and materials you provide to the Service. We claim no
                ownership over your employee records or company-specific
                documentation.
              </p>
            </TermsSection>

            <TermsSection id="section-6" title="6. Termination">
              <p>
                You are solely responsible for properly canceling your account.
                An email or phone request to cancel your account is not
                considered cancellation. You can cancel your account at any time
                through the “Settings” panel.
              </p>

              <p className="mt-4">
                Huppr, in its sole discretion, has the right to suspend or
                terminate your account and refuse any and all current or future
                use of the Service for any reason at any time.
              </p>
            </TermsSection>

            <TermsSection id="section-7" title="7. Limitation of Liability">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm italic leading-7 text-slate-700">
                You expressly understand and agree that Huppr shall not be
                liable for any direct, indirect, incidental, special,
                consequential or exemplary damages, including but not limited
                to, damages for loss of profits, goodwill, use, data or other
                intangible losses resulting from the use or the inability to use
                the service.
              </div>
            </TermsSection>

            {/* DIVIDER */}
            <div className="my-12 h-px bg-slate-200" />

            {/* CONTACT */}
            <section className="pb-10">
              <div className="flex items-start gap-3">
                <CircleHelp className="mt-1 h-5 w-5 text-slate-400" />

                <div>
                  <h2 className="text-xl font-bold tracking-tight">
                    Questions about these terms?
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Our legal team is here to help you understand your rights
                    and obligations.
                  </p>

                  <Button className="mt-6 h-11 bg-blue-600 px-6 text-xs font-semibold hover:bg-blue-700">
                    <FileText className="mr-2 h-4 w-4" />
                    Contact Legal Department
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

function TermsSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-10 pb-10">
      <h2 className="text-2xl font-bold tracking-[-0.03em] text-slate-950">
        {title}
      </h2>

      <div className="mt-5 text-sm leading-7 text-slate-500">{children}</div>
    </section>
  );
}
