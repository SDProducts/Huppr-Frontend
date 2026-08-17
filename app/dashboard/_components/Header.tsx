"use client";
import { ArrowLeft, BellDot, Settings, Smile } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <div className="hidden relative md:flex justify-between items-center border-b border-gray-200 bg-white p-8 mb-5 ">
      <div
        onClick={() => router.back()}
        className="absolute cursor-pointer bg-white hover:bg-wonderhub-200 -bottom-2 left-0.5 p-2 rounded-full border border-wonderhub-200"
      >
        <ArrowLeft size={20} className="text-gray-600 hover:text-wonderhub" />
      </div>
      <div className="flex flex-1 items-center gap-1">
        <div className="text-3xl">
          <span className="text-gray-400 text-xl">Welcome, </span>
          {true ? (
            <span className=" font-bold">Victoria</span>
          ) : (
            <span className="px-20 ml-1 w-10 rounded-lg bg-gray-200 animate-pulse"></span>
          )}
        </div>
        <Smile />
      </div>

      <div className="flex items-center gap-1">
        <Link
          href={"/dashboard/notifications"}
          className="p-2 text-wonderhub hover:bg-wonderhub-200 flex justify-center items-center rounded-full"
        >
          <BellDot className="" size={18} />
        </Link>
        <Link
          href={"/dashboard/settings"}
          className="p-2 text-wonderhub hover:bg-wonderhub-200 flex justify-center items-center rounded-full"
        >
          <Settings className="" size={18} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
