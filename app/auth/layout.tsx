import Logo from "@/components/ui/logo";
import Info from "./_components/Info";
import Link from "next/link";
import "./styles.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="layout">
      <aside className="">
        <Link href="/">
          <Logo color="white" icon="white" className="logo aspect-auto" />
        </Link>
        <Info />
      </aside>
      <section className="content">
        {children}
        <small className="text-center py-5">
          © 2026 Hoopr Technologies Inc. All rights reserved.
        </small>
      </section>
    </main>
  );
}
