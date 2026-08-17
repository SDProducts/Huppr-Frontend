/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/client";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {success ? (
        <div>
          <h2 className="text-[clamp(1.5rem,2cqi+0.025rem,2rem)] font-semibold tracking-normal ">
            Check Your Email
          </h2>
          <p className="text-sm text-muted-foreground">
            If you registered using your email and password, you will receive a
            password reset email.
          </p>
        </div>
      ) : (
        <>
          <div>
            <h2 className="text-[clamp(1.5rem,2cqi+0.025rem,2rem)] font-semibold tracking-normal ">
              Reset Your Password
            </h2>
            <p>
              Enter the business email address associated with your account and
              we'll send you a recovery link.
            </p>
          </div>
          <form onSubmit={handleForgotPassword}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Business Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full p-[1.5rem]"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Sending..."
                ) : (
                  <span className="flex gap-2">
                    Send reset email <ArrowRight />{" "}
                  </span>
                )}
              </Button>
            </div>
            <div className="mt-10 text-center text-sm grid place-content-center">
              <Link
                href="/auth/login"
                className="underline underline-offset-4 flex gap-2 items-center text-primary"
              >
                <ChevronLeft /> Back to Login
              </Link>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
