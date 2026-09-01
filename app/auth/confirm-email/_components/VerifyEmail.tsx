"use client";
/* eslint-disable react/no-unescaped-entities */
import { MailCheck, RefreshCcw } from "lucide-react";

import { Field } from "@/components/ui/field";
import { useResendOTP } from "@/hooks/auth/useAuth";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const VerifyEmail: React.FC = () => {
  const { mutate: resend, isPending: isResending } = useResendOTP();
  const email = Cookies.get("user_email");
  const [timer, settimer] = useState(60);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => settimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResend = () => {
    if (!isResending && email) {
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
          We've sent a verification link to{" "}
          <span className="font-medium">{email}</span>.
        </p>
        <p className="">Login to your email account to verify email.</p>
      </div>
      <div className="space-y-2">
        <div className="">
          <div className="font-semibold text-center space-x-1 flex items-center justify-center">
            <span className="">Didn't recieve a mail?</span>
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
          </div>
        </div>
        <Field>
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
export default VerifyEmail;
