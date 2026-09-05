"use client";
import { supabase } from "@/lib/client";
import { useRouter } from "next/navigation"; // ✅ Changed from next/router to next/navigation
import { useEffect, useState } from "react";

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the code from URL
        const code = new URLSearchParams(window.location.search).get("code");

        if (code) {
          // Exchange code for session
          const { error } = await supabase.auth.exchangeCodeForSession(
            String(code)
          );
          if (error) throw error;
        }

        // Get the session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (!session) {
          throw new Error("No session found");
        }

        // Send to your backend
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to authenticate with backend");
        }

        const userData = await response.json();

        // Redirect based on roles
        if (userData.roles && userData.roles.length === 0) {
          router.push("/select-account-type");
        } else if (userData.roles.includes("employer")) {
          router.push("/employer/onboarding");
        } else if (userData.roles.includes("job_seeker")) {
          router.push("/jobs");
        } else {
          router.push("/dashboard");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Auth callback error:", error);
        setError(error.message);
        setTimeout(() => {
          router.push("/login?error=auth_failed");
        }, 3000);
      }
    };

    handleCallback();
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Authentication Error
          </h1>
          <p className="text-gray-600">{error}</p>
          <p className="text-sm text-gray-500 mt-4">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <p className="mt-4 text-gray-600">Completing your sign-in...</p>
    </div>
  );
}
