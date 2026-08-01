"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="layout-header">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <Logo className="h-[2rem]" />
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

          <div className="hidden md:flex items-center gap-2">
            <Link
              className="ml-2 px-4 py-2 text-sm font-semibold transition"
              // variant="ghost"
              href="/auth/login"
            >
              Log In
            </Link>
            <Button className="ml-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-sm">
              Create Job
            </Button>
          </div>
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
            <Link
              className="ml-2 px-4 py-2 text-sm font-semibold transition"
              // variant="ghost"
              href="/auth/login"
            >
              Log In
            </Link>
            <Button className="ml-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-sm">
              Create Job
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
