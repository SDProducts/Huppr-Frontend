import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://qqqntzkmlmmxfevkxizb.supabase.co", // Replace with your image provider's domain
        port: "", // Leave empty unless the URL requires a specific port
        // pathname: "/photo-**", // Restrict to a specific folder path (optional)
      },
    ],
  },
};
