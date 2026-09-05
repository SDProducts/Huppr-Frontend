"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Input from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/auth/useAuth";
import { supabase } from "@/lib/client";
import { cn } from "@/lib/utils";
import { signInSchema } from "@/lib/validation/auth_validations";
import { Form, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setshowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();
  const router = useRouter();
  const togglePassword = () => {
    setshowPassword(!showPassword);
  };
  const initialValues = {
    email: "",
    password: "",
  };
  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Error signing in:", error.message);
        throw error;
      }

      // The user will be redirected to Google's OAuth page
      // After successful auth, they'll be redirected back to /auth/callback
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const handleLogin = async (values: typeof initialValues) => {
    setError(null);
    try {
      login(values, {
        onSuccess(data) {},
        onError(data) {
          if (typeof data.message === "string") {
            const message = data.message;
            if (message === "Email address has not been confirmed") {
              router.push("/auth/verify-email");
            }
          }
        },
      });
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div>
        <h2 className="text-[clamp(1.5rem,2cqi+0.025rem,2rem)] font-semibold tracking-normal ">
          Log In to Your Account
        </h2>
        <p>Enter your details to continue where you left off.</p>
      </div>

      <Button
        type="button"
        className="w-full bg-white shadow shadow-primary/5 p-[1.5rem] flex items-center gap-2"
        disabled={isPending}
        variant="secondary"
        onClick={handleGoogleSignIn}
      >
        {isPending ? (
          "Logging in..."
        ) : (
          <span className="flex items-center gap-2">
            <Icon icon="material-icon-theme:google" />
            <span>Continue with Google</span>
          </span>
        )}
      </Button>

      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 place-content-center items-center text-muted">
        <span className="h-px bg-gray-300" />
        <small>OR</small>
        <span className="h-px bg-gray-300" />
      </div>
      <Formik
        initialValues={initialValues}
        validateOnMount
        validationSchema={signInSchema}
        onSubmit={handleLogin}
      >
        {() => (
          <Form className="space-y-4">
            <div className="space-y-6">
              <Input
                label="Bussiness Email Address"
                name="email"
                placeholder="name@company.com"
              />
              <div className="">
                <div className="flex justify-end -mb-5">
                  <Link
                    href={"/auth/forgot-password"}
                    className="capitalize text-xs text-primary"
                  >
                    {" "}
                    forgot password?
                  </Link>
                </div>
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  rightIcon={
                    showPassword ? (
                      <EyeOff onClick={togglePassword} size={18} />
                    ) : (
                      <Eye onClick={togglePassword} size={18} />
                    )
                  }
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full p-[1.5rem]"
                disabled={isPending}
              >
                {isPending ? "Logging in..." : "Login"}
              </Button>
            </div>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/sign-up" className="text-primary font-semibold">
                Sign up
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
