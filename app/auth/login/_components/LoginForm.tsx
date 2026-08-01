"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSocialLogin = async (provider: string) => {
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/oauth?next=/protected`,
        },
      });

      if (error) throw error;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div>
        <h2 className="text-[clamp(1.5rem,_2cqi_+_0.025rem,_2rem)] font-semibold tracking-normal ">
          Log In to Your Account
        </h2>
        <p>Enter your details to continue where you left off.</p>
      </div>

      <Button
        type="button"
        className="w-full bg-white shadow shadow-primary/5 p-[1.5rem]"
        disabled={isLoading}
        variant="secondary"
        onClick={() => handleSocialLogin("google")}
      >
        {isLoading ? "Logging in..." : "Continue with Google"}
      </Button>

      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 place-content-center items-center text-muted">
        <span className="h-[1px] bg-muted" />
        <small>OR</small>
        <span className="h-[1px] bg-muted" />
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Business Email Address</Label>
            <Input
              id="email"
              type="email"
              className="bg-white"
              placeholder="name@company.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/auth/forgot-password"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-primary font-semibold"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              className="bg-white"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button
            type="submit"
            className="w-full p-[1.5rem]"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign-up" className="text-primary font-semibold">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
