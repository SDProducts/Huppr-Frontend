import { poppins } from "@/app/fonts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Hoopr",
  description: "Everything you need to Hire, manage and Grow Your workforce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        // geistSans.variable,
        // geistMono.variable,
        // // "font-sans",
        // inter.variable,
        poppins.className
      )}
    >
      <body className="">{children}</body>
    </html>
  );
}
