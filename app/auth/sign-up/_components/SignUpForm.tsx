"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/client";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // const handleSocialLogin = async (provider: string) => {
  //   const supabase = createClient();
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const { error } = await supabase.auth.signInWithOAuth({
  //       provider: provider,
  //       options: {
  //         redirectTo: `${window.location.origin}/auth/oauth?next=/protected`,
  //       },
  //     });

  //     if (error) throw error;
  //   } catch (error: unknown) {
  //     setError(error instanceof Error ? error.message : "An error occurred");
  //     setIsLoading(false);
  //   }
  // };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="text-center">
        <h2 className="text-[clamp(1.5rem,2cqi+0.025rem,2rem)] font-semibold tracking-normal ">
          Create Your Employer Account
        </h2>
        <p>Start hiring in minutes.</p>
      </div>

      <Button
        type="button"
        className="w-full bg-white shadow shadow-primary/5 p-[1.5rem]"
        disabled={isLoading}
        variant="secondary"
        // onClick={() => handleSocialLogin("google")}
      >
        {isLoading ? (
          "Logging in..."
        ) : (
          <span className="flex items-center gap-2">
            <Icon icon="material-icon-theme:google" />
            <span>Continue with Google</span>
          </span>
        )}
      </Button>

      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 place-content-center items-center text-muted">
        <span className="h-px bg-muted" />
        <small>OR</small>
        <span className="h-px bg-muted" />
      </div>

      <form onSubmit={handleSignUp}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              className="bg-white"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              className="bg-white"
              placeholder="Min. 8 characters"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="repeat-password">Confirm Password</Label>
            </div>
            <Input
              id="repeat-password"
              type="password"
              required
              value={repeatPassword}
              placeholder="Repeat your password"
              className="bg-white"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button
            type="submit"
            className="w-full p-[1.5rem]"
            disabled={isLoading}
          >
            {isLoading ? "Creating an account..." : "Create Account"}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary font-semibold">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
