"use client";

import { usePathname } from "next/navigation";

export default function Info() {
  const pathname = usePathname();
  const isLogin = pathname === "/login" || pathname === "/auth/login";

  return (
    <div className="info grid place-content-center gap-4 grow max-h-[100dvh] text-white text-center *:mx-auto ">
      {isLogin ? <LoginInfo /> : <DefaultInfo />}
    </div>
  );
}

const DefaultInfo = () => (
  <>
    <h1 className="w-[12ch] text-[clamp(2rem,_3.5cqi_+_0.25rem,_3.75rem)] font-bold leading-[1.1] tracking-tight text-white">
      Hire Smarter. Grow Faster.
    </h1>
    <p className="">
      Join thousands of growing businesses using HeyHR to recruit, manage and
      grow their workforce.
    </p>
  </>
);

const LoginInfo = () => (
  <>
    <h1 className="w-[7ch] text-[clamp(2rem,_3.5cqi_+_0.25rem,_3.75rem)] font-bold leading-[1.1] tracking-tight text-white">
      Welcome Back.
    </h1>
    <p className="">
      Log in to manage your workforce and find your next great hire with our
      AI-driven insights.
    </p>
  </>
);
