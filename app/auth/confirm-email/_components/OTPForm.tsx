"use client";

/* eslint-disable react/no-unescaped-entities */

import { Button } from "@/components/ui/button";
import { Field, FieldDescription } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Cookies from "js-cookie";
import { MailCheck, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

import { useConfirmOTP, useResendOTP } from "@/hooks/auth/useAuth";

const OTPForm: React.FC = () => {
  const email = Cookies.get("user_email");

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  const { mutate: confirm, isPending: isConfirming } = useConfirmOTP();

  const { mutate: resend, isPending: isResending } = useResendOTP();

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    if (isResending || timer > 0) return;

    setTimer(60);
    setOtp("");
    if (email) {
      resend(email);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otp.length !== 6 || isConfirming) return;
    if (email) {
      confirm({
        email,
        otp,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Header */}
      <div className="text-center flex flex-col items-center">
        <div className="h-20 w-20 bg-primary-100 rounded-full flex justify-center items-center">
          <MailCheck className="h-10 w-10" />
        </div>

        <h2 className="text-[clamp(1.5rem,2cqi+0.025rem,2rem)] font-semibold tracking-normal">
          Verify Your Email
        </h2>

        <p className="mt-2">
          We've sent a verification code to{" "}
          <span className="font-medium">{email}</span>.
        </p>

        <p>Enter six-digit code below to continue.</p>
      </div>

      {/* OTP */}
      <div>
        <Field>
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              id="otp-verification"
              value={otp}
              onChange={(value) => setOtp(value)}
              disabled={isConfirming}
              required
            >
              <InputOTPGroup
                className="
                  *:data-[slot=input-otp-slot]:h-10
                  sm:*:data-[slot=input-otp-slot]:h-16
                  *:data-[slot=input-otp-slot]:w-10
                  sm:*:data-[slot=input-otp-slot]:w-16
                  *:data-[slot=input-otp-slot]:text-xl
                  space-x-2
                "
              >
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
            <span>Didn't receive a code?</span>

            {timer > 0 ? (
              <span className="text-primary cursor-not-allowed">
                Resend in {timer}s
              </span>
            ) : (
              <button
                type="button"
                className="flex items-center gap-1 text-primary cursor-pointer"
                onClick={handleResend}
                disabled={isResending}
              >
                {isResending ? (
                  "Resending..."
                ) : (
                  <>
                    Resend
                    <RefreshCcw size={12} />
                  </>
                )}
              </button>
            )}
          </FieldDescription>
        </Field>
      </div>

      {/* Submit */}
      <div>
        <Field>
          <Button
            type="submit"
            className="w-full text-xl font-normal"
            disabled={otp.length !== 6 || isConfirming}
          >
            {isConfirming ? "Verifying..." : "Verify Email"}
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
    </form>
  );
};

export default OTPForm;
