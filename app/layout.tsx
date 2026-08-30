import { poppins } from "@/app/fonts";
import Modal from "@/components/global/Modal";
import { QCProvider } from "@/components/global/QueryClientProvider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
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
  title: "Huppr",
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
      <QCProvider>
        <body className="">
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                borderRadius: "10px",
                fontSize: 14,
              },
            }}
          />

          <Modal />
          {children}
        </body>
      </QCProvider>
    </html>
  );
}
