import Logo from "@/components/ui/logo";
import Link from "next/link";
import Info from "./_components/Info";
import "./styles.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="layout grid sm:grid-cols-2 h-screen max-h-screen overflow-hidden">
      <aside className="bg-linear-to-b from-[#2563EB] via-[#7C6CF8] to-[#F59E0B] animate-[bg_resize] hidden h-full w-full sm:flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-4">
          <Link href="/">
            <Logo color="white" icon="white" className="logo aspect-auto h-7" />
          </Link>
          <Info />
        </div>
      </aside>
      <section className="px-4 sm:px-10 lg:px-30 pt-20 pb-16 h-screen max-h-screen overflow-x-hidden overflow-y-auto flex flex-col">
        <div className="sm:min-w-xs lg:min-w-md">{children}</div>

        <small className="text-center py-5">
          © 2026 Hoopr Technologies Inc. All rights reserved.
        </small>
      </section>
    </main>
  );
}
