"use client";

import { Bell, Search } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function NavigationMenuDemo() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="flex h-[72px] w-full items-center justify-between">
        {/* Left navigation */}
        <NavigationMenu className="px-4">
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem className={""}>
              <Link
                href="/"
                className=" shrink-0 text-xl font-extrabold tracking-tight text-gray-900"
              >
                Logo
              </Link>
            </NavigationMenuItem>
            {/* Teams */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-10 bg-transparent px-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 data-[state=open]:bg-gray-100">
                Teams
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="w-[250px] p-2">
                  <ListItem href="/teams/admin" title="Admin">
                    10 Employees
                  </ListItem>

                  <ListItem href="/teams/developers" title="Developers">
                    10 Employees
                  </ListItem>

                  <ListItem href="/teams/sales" title="Sales">
                    10 Employees
                  </ListItem>

                  <ListItem href="/teams/marketing" title="Marketing">
                    10 Employees
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Departments */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-10 bg-transparent px-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 data-[state=open]:bg-gray-100">
                Departments
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="w-[250px] p-2">
                  <ListItem href="/departments/admin" title="Admin">
                    10 Employees
                  </ListItem>

                  <ListItem href="/departments/developers" title="Developers">
                    10 Employees
                  </ListItem>

                  <ListItem href="/departments/sales" title="Sales">
                    10 Employees
                  </ListItem>

                  <ListItem href="/departments/marketing" title="Marketing">
                    10 Employees
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search */}
        <div className="ml-8 flex min-w-0 flex-1 justify-center">
          <div className="relative w-full max-w-[420px]">
            <Search
              size={18}
              strokeWidth={2}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              placeholder="Search employees..."
              className="h-10 w-full rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="ml-8 flex shrink-0 items-center gap-5">
          {/* Notification */}
          <div
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100"
            aria-label="Notifications"
          >
            <Bell size={20} strokeWidth={2} color="black" />

            {/* Notification indicator */}
            <span className="absolute right-[9px] top-[8px] h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </div>

          {/* User */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-full outline-none"
          >
            <Avatar className="h-10 w-10 border border-gray-200">
              <AvatarImage src="/images/avatar.jpg" alt="User" />

              <AvatarFallback className="bg-gray-100 text-sm font-semibold text-gray-700">
                JW
              </AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
    </header>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link
            href={href}
            className="block rounded-lg transition-colors hover:bg-gray-50"
          >
            <div className="flex flex-col gap-1 text-sm">
              <div className="font-semibold leading-none text-gray-900">
                {title}
              </div>

              <div className="text-xs text-muted-foreground">{children}</div>
            </div>
          </Link>
        }
      />
    </li>
  );
}
