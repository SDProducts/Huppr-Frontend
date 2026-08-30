import Info from "@/app/auth/_components/Info";
import Progress from "@/app/onboarding/_components/Progress";
import Logo from "@/components/ui/logo";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="layout grid sm:grid-cols-2 h-screen max-h-screen overflow-hidden">
      <aside className="bg-linear-to-b from-primary via-primary-badge to-accent animate-[bg_resize] hidden h-full w-full sm:flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-4">
          <Link href="/">
            <Logo color="white" icon="white" className="logo aspect-auto h-7" />
          </Link>
          <Info />
        </div>
      </aside>
      <section className="px-4 sm:px-10 pt-4 h-screen max-h-screen overflow-y-auto flex flex-col">
        <Progress />
        <div className="w-full flex-1 sm:min-w-md mt-8">{children}</div>

        <small className="text-center py-5">
          © 2026 Hoopr Technologies Inc. All rights reserved.
        </small>
      </section>
    </main>
  );
}
