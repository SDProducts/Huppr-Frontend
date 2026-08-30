"use client";

import {
  Bell,
  Building2,
  CalendarDays,
  ChevronDown,
  Search,
  Sparkles,
} from "lucide-react";
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

import { Button } from "@/components/ui/button";

export function HeaderMenu() {
  return (
    <header className="w-full border-b border-gray-200">
      <div className="flex h-[72px] w-full items-center px-5">
        {/* ------------------------------------------------ */}
        {/* Company / Logo */}
        {/* ------------------------------------------------ */}

        <div className="flex shrink-0 items-center">
          <button
            type="button"
            className="flex h-[36px] items-center gap-2 rounded-[10px] bg-white px-3 text-[13px] font-semibold text-[#20242a] transition hover:bg-gray-100"
          >
            <Building2 size={15} strokeWidth={2.2} className="text-[#2864e8]" />

            <span>Sterling Tech</span>

            <ChevronDown size={14} strokeWidth={2} className="text-[#20242a]" />
          </button>
        </div>

        {/* ------------------------------------------------ */}
        {/* Navigation */}
        {/* ------------------------------------------------ */}

        <NavigationMenu className="ml-8 max-w-none">
          <NavigationMenuList className="gap-1">
            {/* Teams */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="
                  h-9
                  bg-transparent
                  px-3
                  text-[13px]
                  font-medium
                "
              >
                Teams
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="w-[250px] p-2">
                  <ListItem href="/teams/admin" title="PR Team">
                    4 Employees
                  </ListItem>

                  <ListItem href="/teams/developers" title="Engineering Team">
                    10 Employees
                  </ListItem>

                  <ListItem href="/teams/sales" title="Sales Team">
                    6 Employees
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Departments */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="
                  h-9
                  bg-transparent
                  px-3
                  text-[13px]
                  font-medium
                "
              >
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

        {/* ------------------------------------------------ */}
        {/* Search */}
        {/* ------------------------------------------------ */}

        <div className="flex min-w-0 flex-1 justify-center px-8">
          <div className="relative w-full max-w-[420px]">
            <Search
              size={17}
              strokeWidth={2}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#59616d]"
            />

            <input
              type="search"
              placeholder="Search employees, jobs, documents or ask Vita..."
              className="
                h-[38px]
                w-full
                rounded-full
                border
                border-[#e1e4e8]
                bg-[#f7f8fa]
                pl-10
                pr-4
                text-[12px]
                font-medium
                text-[#20242a]
                outline-none
                transition
                placeholder:text-[#858c97]
                focus:border-[#2864e8]
                focus:bg-white
                focus:ring-2
                focus:ring-[#2864e8]/10
              "
            />
          </div>
        </div>

        {/* ------------------------------------------------ */}
        {/* Right actions */}
        {/* ------------------------------------------------ */}

        <div className="flex shrink-0 items-center gap-4">
          {/* Calendar */}
          <button
            type="button"
            className="
              flex
              h-9
              items-center
              gap-2
              rounded-lg
              px-2
              text-[12px]
              font-semibold
              text-[#747b86]
              transition
              hover:bg-primary/5
            "
          >
            <CalendarDays size={16} strokeWidth={2} />

            <span>Calendar</span>
          </button>

          {/* Vita AI */}
          <Button
            type="button"
            className="
              h-[36px]
              rounded-[10px]
              bg-[#e7ecff]
              px-3
              text-[12px]
              font-bold
              text-[#2864e8]
              shadow-none
              hover:bg-[#dbe3ff]
            "
          >
            <Sparkles size={14} strokeWidth={2.5} />
            Vita AI
          </Button>

          {/* Notification */}
          <div
            // type="button"
            aria-label="Notifications"
            className="
              relative
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              text-[#737a86]
              transition
              hover:bg-primary/5
            "
          >
            <Bell size={18} strokeWidth={2} />

            {/* Notification count */}
            <span
              className="
                absolute
                -right-0.5
                -top-0.5
                flex
                h-[17px]
                min-w-[17px]
                items-center
                justify-center
                rounded-full
                bg-[#e31b23]
                px-1
                text-[9px]
                font-bold
                leading-none
                text-white
                ring-2
                ring-[#050505]
              "
            >
              3
            </span>
          </div>

          {/* User avatar */}
          <button
            type="button"
            aria-label="Open user menu"
            className="rounded-full outline-none ring-offset-[#050505] focus-visible:ring-2 focus-visible:ring-[#2864e8]"
          >
            <Avatar className="h-[34px] w-[34px] border border-[#454950]">
              <AvatarImage
                src="/images/avatar.jpg"
                alt="User"
                className="object-cover"
              />

              <AvatarFallback className="bg-[#25282d] text-[11px] font-bold text-white">
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
            className="block rounded-lg p-3 transition-colors hover:bg-gray-50"
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
