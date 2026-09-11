"use client";
import Logo from "@/assets/huppr_logo2.png";
import { navigation } from "@/data/constants";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function SideNavBar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex flex-col p-5 gap-0 h-screen justify-between overflow-y-auto scrollbar-hide">
      <div className="flex items-center gap-2 px-5">
        <Image
          src={Logo}
          alt="HeyHR"
          loading="eager"
          quality={100}
          className="w-auto h-10"
        />
        <div className="text-sm text-gray-500 flex-1">workspace</div>
      </div>
      <div className="w-full py-1.5 h-fit! rounded-2xl">
        <nav className="space-y-2 px-5 text-sm">
          <div className="flex items-center mt-7 gap-2">
            <h4 className="text-gray-400 text-xs font-bold">WORKSPACE</h4>
            <hr className="text-gray-300 w-full" />
          </div>

          {navigation.workspace.map((item, i) => (
            <Link
              key={i}
              href={item.path}
              className={`flex gap-2 items-center p-2 rounded-lg capitalize ${
                pathname === item.path
                  ? "bg-primary/5 text-primary font-bold"
                  : "text-gray-700 hover:bg-primary/40 hover:text-white"
              }`}
            >
              <item.icon
                strokeWidth={pathname === item.path ? 2.5 : 1.5}
                size={18}
              />
              {item.label}
            </Link>
          ))}
          <div className="flex items-center mt-7 gap-2">
            <h4 className="text-gray-400 text-xs font-bold">SYSTEM</h4>
            <hr className="text-gray-300 w-full" />
          </div>
          {navigation.system.map((item, i) => (
            <Link
              key={i}
              href={item.path}
              className={`flex gap-2 items-center p-2 rounded-lg capitalize ${
                pathname === item.path
                  ? "bg-primary/5 text-primary font-bold"
                  : "text-gray-700 hover:bg-primary/40 hover:text-white"
              }`}
            >
              <item.icon
                strokeWidth={pathname === item.path ? 2.5 : 1.5}
                size={18}
              />
              {item.label}
            </Link>
          ))}

          <button
            onClick={() => {
              //   logout();
              router.refresh();
            }}
            className="flex items-center w-full px-7 py-1.75 text-[12px] text-red-500 rounded-xl hover:bg-[#FFE6E6]"
          >
            <LogOut className="mr-2 w-4 h-4" />
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
}

export default SideNavBar;
