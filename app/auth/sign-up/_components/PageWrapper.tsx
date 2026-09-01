"use client";
import OTPForm from "@/app/auth/confirm-email/_components/OTPForm";
import SignUpForm from "@/app/auth/sign-up/_components/SignUpForm";
import { useState } from "react";
const PageWrapper = () => {
  const [step, setstep] = useState<AuthStep>("sign-up");
  const [email, setEmail] = useState("");
  return step === "verify" ? (
    <OTPForm email={email} />
  ) : (
    <SignUpForm setstep={setstep} setEmail={setEmail} />
  );
};

export default PageWrapper;
