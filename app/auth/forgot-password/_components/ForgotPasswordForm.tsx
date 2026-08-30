/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";

import Input from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import { useForgotPassword } from "@/hooks/auth/useAuth";
import { cn } from "@/lib/utils";
import { ForgotPasswordSchema } from "@/lib/validation/auth_validations";
import { Form, Formik } from "formik";
import { ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { mutate: sendOTP, isPending } = useForgotPassword();
  const initialValues = {
    email: "",
  };
  const handleForgotPassword = async (values: typeof initialValues) => {
    sendOTP(values, {
      onSuccess() {
        setSuccess(true);
      },
    });
    router.push("/auth/update-password");
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
        <div className="space-y-10">
          <div>
            <h2 className="text-[clamp(1.5rem,2cqi+0.025rem,2rem)] font-semibold tracking-normal ">
              Reset Your Password
            </h2>
            <p className="text-sm">
              Enter the business email address associated with your account and
              we'll send you a recovery link.
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={ForgotPasswordSchema}
            validateOnMount
            onSubmit={handleForgotPassword}
          >
            {({ isValid }) => (
              <Form>
                <div className="grid gap-6">
                  <Input
                    label="Email"
                    name="email"
                    placeholder="example@company.com"
                  />{" "}
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button
                    type="submit"
                    className="w-full p-[1.5rem]"
                    disabled={isPending || !isValid}
                  >
                    {isPending ? (
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
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}
