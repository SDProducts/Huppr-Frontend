"use client";

import {
  HelpCircle,
  LayoutTemplate,
  LogOut,
  Menu,
  Settings,
  UserCircle,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
// import Logo from "@/components/ui/logo";
import Logo from "@/assets/huppr_logo2.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Button from "@/components/ui/CustomButton";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useGetMyDetails, useLogout } from "@/hooks/auth/useAuth";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: signOut, isPending: isSigningOut } = useLogout();
  const { data: userData, isLoading } = useGetMyDetails();
  const PROFILE_MENU_ITEMS = [
    {
      name: "Profile",
      icon: UserCircle,
      path: "/profile",
      access: ["job_seeker", "employer", "employee"],
    },
    {
      name: "Dashboard",
      icon: LayoutTemplate,
      path: "/dashboard",
      access: ["employer", "employee"],
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
      access: ["job_seeker", "employer", "employee"],
    },
    {
      name: "Help",
      icon: HelpCircle,
      path: "/contact",
      access: ["job_seeker", "employer", "employee"],
    },
  ];

  return (
    <header className="layout-header">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="">
            <Image
              src={Logo}
              alt="Huppr Logo"
              loading="eager"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-secondary-brand hover:text-primary/75 active:text-primary transition"
            >
              Home
            </Link>
            <Link
              href="/jobs"
              className="text-sm font-medium text-secondary-brand hover:text-primary/75 active:text-primary transition"
            >
              Jobs
            </Link>
            <Link
              href="pricing"
              className="text-sm font-medium text-secondary-brand hover:text-primary/75 active:text-primary transition"
            >
              Pricing
            </Link>
            <Link
              href="resources"
              className="text-sm font-medium text-secondary-brand hover:text-primary/75 active:text-primary transition"
            >
              Resources
            </Link>
          </div>

          {/* <div className="hidden md:flex items-center gap-2"> */}
          <NavigationMenu className={cn("hidden md:flex items-center gap-2")}>
            {isLoading ? (
              <div className="h-10 w-50 bg-gray-100 animate-pulse rounded-lg" />
            ) : userData ? (
              <NavigationMenuList>
                <NavigationMenuItem className={cn("cursor-pointer!")}>
                  <NavigationMenuTrigger
                    className={cn(
                      "cursor-pointer border border-primary/10 h-10 rounded-2xl focus:bg-primary/10 font-semibold"
                    )}
                  >
                    <Avatar className={cn("mr-1.5")}>
                      <AvatarImage src={userData?.id} alt={userData?.id} />
                      <AvatarFallback>
                        {getInitials(userData?.email || "")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{userData?.email}</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className={cn("min-h-50 min-w-65")}>
                    <div className="p-4 divide-y divide-gray-100 text-sm">
                      {PROFILE_MENU_ITEMS.map((item, i) => {
                        if (
                          item.access.some((role) =>
                            userData.roles.includes(role)
                          )
                        ) {
                          return (
                            <Link
                              href={item.path}
                              className="flex items-center gap-2 p-1.5 text-gray-500 hover:font-semibold focus:font-semibold hover:bg-gray-100 focus:bg-gray-100"
                              key={i}
                            >
                              <item.icon className="size-4" strokeWidth={2} />
                              <div className="">{item.name}</div>
                            </Link>
                          );
                        }
                        return null;
                      })}
                    </div>
                    <Button
                      onClick={signOut}
                      disabled={isSigningOut}
                      isLoading={isSigningOut}
                      loadingLabel="Signing Out"
                      label="Sign out"
                      icon={<LogOut className="size-4" />}
                      className="bg-transparent text-red-500! border border-red-200"
                    />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            ) : (
              <>
                <Link
                  className="ml-2 px-4 py-2 text-sm font-semibold transition"
                  // variant="ghost"
                  href="/auth/login"
                >
                  Log In
                </Link>
                <Link
                  href="/employers/jobs/create"
                  className="ml-2 px-4 py-2.5 text-sm font-semibold text-white bg-primary-heading rounded-lg hover:bg-primary-heading/75 transition shadow-sm"
                >
                  Create Job
                </Link>
              </>
            )}
          </NavigationMenu>
          {/* </div> */}
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 py-4 px-4">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="text-sm font-medium text-secondary-brand hover:text-primary/75 active:text-primary transition px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              href="/jobs"
              className="text-sm font-medium text-secondary-brand hover:text-primary/75 active:text-primary transition px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              Jobs
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-secondary-brand hover:text-primary/75 active:text-primary transition px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              Pricing
            </Link>
            <Link
              href="/resources"
              className="text-sm font-medium text-secondary-brand hover:text-primary/75 active:text-primary transition px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              Resources
            </Link>
            <div className="">
              {userData ? (
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem className={cn("cursor-pointer!")}>
                      <NavigationMenuTrigger
                        className={cn(
                          "cursor-pointer border border-primary/10 h-10 rounded-2xl focus:bg-primary/10 font-semibold"
                        )}
                      >
                        <Avatar className={cn("mr-1.5")}>
                          <AvatarImage src={userData?.id} alt={userData?.id} />
                          <AvatarFallback>
                            {getInitials(userData?.email || "")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{userData?.email}</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent
                        className={cn("min-h-50 min-w-65")}
                      >
                        <div className="p-4 divide-y divide-gray-100 text-sm">
                          {PROFILE_MENU_ITEMS.map((item, i) => {
                            if (
                              item.access.some((role) =>
                                userData.roles.includes(role)
                              )
                            ) {
                              return (
                                <Link
                                  href={item.path}
                                  className="flex items-center gap-2 p-1.5 text-gray-500 hover:font-semibold focus:font-semibold hover:bg-gray-100 focus:bg-gray-100"
                                  key={i}
                                >
                                  <item.icon
                                    className="size-4"
                                    strokeWidth={2}
                                  />
                                  <div className="">{item.name}</div>
                                </Link>
                              );
                            }
                            return null;
                          })}
                        </div>
                        <Button
                          onClick={signOut}
                          disabled={isSigningOut}
                          isLoading={isSigningOut}
                          loadingLabel="Signing Out"
                          label="Sign out"
                          icon={<LogOut className="size-4" />}
                          className="bg-transparent text-red-500! border border-red-200"
                        />
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                <div className="grid grid-cols-2 mt-5">
                  <Link
                    className="ml-2 px-4 py-2 text-sm text-center font-semibold transition"
                    // variant="ghost"
                    href="/auth/login"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/employers/jobs/create"
                    className="ml-2 px-4 py-2 text-sm text-center font-semibold text-white bg-primary-heading rounded-lg hover:bg-primary-heading/75 transition shadow-sm"
                  >
                    Create Job
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
