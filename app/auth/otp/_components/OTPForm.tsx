"use client";
/* eslint-disable react/no-unescaped-entities */
import { MailCheck, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useResendOTP } from "@/hooks/auth/useAuth";
import { useEffect, useState } from "react";
interface Prop {
  email: string;
}
const OTPForm: React.FC<Prop> = ({ email }) => {
  const { mutate: resend, isPending: isResending } = useResendOTP();
  const [timer, settimer] = useState(60);
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => settimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResend = () => {
    if (!isResending) {
      settimer(60);
      resend(email);
    }
  };

  return (
    <div className="space-y-10">
      <div className="text-center flex flex-col items-center">
        <div className="h-20 w-20 bg-primary-100 rounded-full flex justify-center items-center">
          <MailCheck className="h-10 w-10" />
        </div>
        <h2 className="text-[clamp(1.5rem,2cqi+0.025rem,2rem)] font-semibold tracking-normal ">
          Verify Your Email
        </h2>
        <p className="mt-2">
          We've sent a verification code to{" "}
          <span className="font-medium">{email}</span>.
        </p>
        <p className="">Enter six-digit code below to contnue.</p>
      </div>
      <div>
        <Field>
          <div className="flex justify-center">
            <InputOTP maxLength={6} id="otp-verification" required>
              <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-16 *:data-[slot=input-otp-slot]:text-xl space-x-2">
                <InputOTPSlot index={0} className="border rounded-md!" />
                <InputOTPSlot index={1} className="border rounded-md!" />
                <InputOTPSlot index={2} className="border rounded-md!" />
                <InputOTPSlot index={3} className="border rounded-md!" />
                <InputOTPSlot index={4} className="border rounded-md!" />
                <InputOTPSlot index={5} className="border rounded-md!" />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <FieldDescription className="font-semibold text-center space-x-1 flex items-center justify-center">
            <span className="">Didn't recieve a code?</span>
            {timer > 0 ? (
              <span className="text-primary cursor-not-allowed">
                Resend in {timer}s
              </span>
            ) : (
              <span
                className="flex items-center gap-1 text-primary cursor-pointer"
                onClick={handleResend}
              >
                {isResending ? (
                  "Resending..."
                ) : (
                  <>
                    Resend <RefreshCcw size={12} />
                  </>
                )}
              </span>
            )}
          </FieldDescription>
        </Field>
      </div>
      <div className="">
        <Field>
          <Button type="submit" className="w-full text-xl font-normal">
            Verify Email
          </Button>
          <div className="text-sm text-muted-foreground text-center">
            Having trouble signing in?{" "}
            <a
              href="#"
              className="underline underline-offset-4 transition-colors hover:text-primary"
            >
              Contact support
            </a>
          </div>
        </Field>
      </div>
    </div>
  );
};
export default OTPForm;
