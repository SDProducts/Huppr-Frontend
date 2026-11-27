"use client";

import VerifyEmail from "@/app/auth/confirm-email/_components/VerifyEmail";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ConfirmationSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) return;

    // Remove "#" and parse the parameters
    const params = new URLSearchParams(hash.substring(1));

    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const expiration = params.get("expires_in");

    // expires_in is usually in seconds,
    // while js-cookie expects expires in days.
    const expiresInDays = expiration ? Number(expiration) / (60 * 60 * 24) : 1;

    if (accessToken) {
      Cookies.set("access_token", accessToken, {
        expires: expiresInDays,
        secure: true,
      });
    }

    if (refreshToken) {
      Cookies.set("refresh_token", refreshToken, {
        expires: expiresInDays,
        secure: true,
      });
    }

    if (accessToken) {
      router.replace("/onboarding");
    }
  }, [router]);

  return <VerifyEmail />;
};

export default ConfirmationSuccess;
