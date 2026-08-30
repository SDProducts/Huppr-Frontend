import { HeaderMenu } from "@/app/dashboard/_components/Header";
import SideNavBar from "@/app/dashboard/_components/SideNavBar";
import React from "react";
interface Prop {
  children: React.ReactNode;
}
const dashboardlayout: React.FC<Prop> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen bg-dashboard-background">
      {/* Sidebar */}
      <aside className="hidden w-75 bg-transparent text-adron-black md:flex flex-col border-r border-gray-200">
        <SideNavBar />
      </aside>

      {/* Main Content */}
      <main className="pt-17.5 md:pt-0 flex-1 overflow-y-auto md:mb-0 py-5 px-2 md:px-0 scrollbar-hide">
        <HeaderMenu />
        <div className="py-2 px-6">{children}</div>
      </main>
    </div>
  );
};

export default dashboardlayout;
