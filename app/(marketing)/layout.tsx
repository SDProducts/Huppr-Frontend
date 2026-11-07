import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./styles.css";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="page-layout">
      <Header />
      <main className="layout-body">{children}</main>
      <Footer />
    </div>
  );
}
