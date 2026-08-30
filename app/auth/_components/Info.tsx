/* eslint-disable react/no-unescaped-entities */
"use client";

import { usePathname } from "next/navigation";

export default function Info() {
  const pathname = usePathname();
  const isLogin = pathname === "/login" || pathname === "/auth/login";
  const isOnboarding =
    pathname === "/onboarding" || pathname === "/auth/onboarding";

  if (isOnboarding)
    return (
      <div className="w-2/3 gap-4 grow max-h-dvh text-white text-center *:mx-auto ">
        <OnboardingInfo />
      </div>
    );

  return (
    <div className="w-2/3 gap-4 grow max-h-dvh text-white text-center *:mx-auto ">
      {isLogin ? <LoginInfo /> : <DefaultInfo />}
    </div>
  );
}

const DefaultInfo = () => (
  <>
    <h1 className="w-[12ch] text-[clamp(2rem,3.5cqi+0.25rem,3.75rem)] font-bold leading-[1.1] tracking-tight text-white">
      Hire Smarter. Grow Faster.
    </h1>
    <p className="tracking-widest mt-3">
      Join thousands of growing businesses using HeyHR to recruit, manage and
      grow their workforce.
    </p>
  </>
);

const LoginInfo = () => (
  <>
    <h1 className="w-[7ch] text-[clamp(2rem,3.5cqi+0.25rem,3.75rem)] font-bold leading-[1.1] tracking-tight text-white">
      Welcome Back.
    </h1>
    <p className="tracking-widest mt-3">
      Log in to manage your workforce and find your next great hire with our
      AI-driven insights.
    </p>
  </>
);
const OnboardingInfo = () => (
  <>
    <h1 className="text-[clamp(2rem,3.5cqi+0.25rem,3.75rem)] font-bold leading-[1.1] tracking-tight text-white">
      Workspace Setup.
    </h1>
    <p className="tracking-widest mt-3">
      Let's get your workspace ready. This only takes a couple of minutes.{" "}
    </p>
  </>
);
