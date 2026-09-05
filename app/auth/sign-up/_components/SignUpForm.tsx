"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Input from "@/components/form/Input";
import RadioGroup from "@/components/form/RadioGroup";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/auth/useAuth";
import { supabase } from "@/lib/client";
import { cn } from "@/lib/utils";
import { signUpSchema } from "@/lib/validation/auth_validations";
import { Form, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
interface Prop {
  setstep: (step: AuthStep) => void;
  setEmail: (email: string) => void;
}
const SignUpForm: React.FC<Prop> = ({ setstep, setEmail }) => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword1, setshowPassword1] = useState(false);
  const [showPassword2, setshowPassword2] = useState(false);
  const { mutate: register, isPending } = useRegister();
  const router = useRouter();
  const ROLES: Option[] = [
    {
      label: "a Job Seeker",
      value: "job_seeker",
      description: "Looking to get hired for new jobs or career growth",
    },
    {
      label: "an Employer",
      value: "employer",
      description: "Looking to hire and manage my organisation & employees",
    },
  ];

  const initialValues = {
    email: "",
    password: "",
    // confirm_password: "",
    role: "employer",
  };
  const togglePassword1 = () => {
    setshowPassword1(!showPassword1);
  };
  const togglePassword2 = () => {
    setshowPassword2(!showPassword2);
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
  const handleSignUp = async (values: typeof initialValues) => {
    register(values);
  };

  return (
    <div className={cn("grid gap-6")}>
      <div className="text-center">
        <h2 className="text-[clamp(1.5rem,2cqi+0.025rem,2rem)] font-semibold tracking-normal ">
          Create Your Employer Account
        </h2>
        <p>Start hiring in minutes.</p>
      </div>

      <Button
        type="button"
        className="w-full bg-white shadow shadow-primary/5 p-[1.5rem]"
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
        validationSchema={signUpSchema}
        onSubmit={handleSignUp}
      >
        {({ isValid }) => (
          <Form>
            <div className="flex flex-col gap-4">
              <Input
                label="Email Address"
                name="email"
                placeholder="name@company.com"
              />
              <Input
                label="Password"
                name="password"
                placeholder="Min. 8 characters"
                type={showPassword1 ? "text" : "password"}
                rightIcon={
                  showPassword1 ? (
                    <EyeOff onClick={togglePassword1} size={18} />
                  ) : (
                    <Eye onClick={togglePassword1} size={18} />
                  )
                }
              />
              <RadioGroup
                label="Continue as:"
                options={ROLES}
                //   hideIcon
                name="role"
                orientation="horizontal"
                size="sm"
                labelClassName=""
                optionClassName="font-medium min-w-[calc(48%)] max-w-[calc(48%)]"
              />

              {/* <Input
                label="Confirm Password"
                name="confirm_password"
                placeholder="Repeat your password"
                type={showPassword2 ? "text" : "password"}
                rightIcon={
                  showPassword2 ? (
                    <EyeOff onClick={togglePassword2} size={18} />
                  ) : (
                    <Eye onClick={togglePassword2} size={18} />
                  )
                }
              /> */}
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full p-[1.5rem]"
                disabled={isPending || !isValid}
              >
                {isPending ? "Creating an account..." : "Create Account"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primary font-semibold">
          Sign In
        </Link>
      </div>
    </div>
  );
};
export default SignUpForm;
