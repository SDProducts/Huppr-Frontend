"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface BreadcrumbProps {
  /** Optional custom labels to override raw URL segment names */
  labels?: Record<string, string>;
  /** Optional custom root label (defaults to Home icon) */
  homeLabel?: React.ReactNode;
}

export function Breadcrumb({ labels = {}, homeLabel }: BreadcrumbProps) {
  const pathname = usePathname();

  // Split path into segments and remove empty strings
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-sm">
      <ol className="flex items-center space-x-1.5 md:space-x-2 text-muted-foreground">
        {/* Home / Root Link */}
        <li className="inline-flex items-center">
          <Link
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            href="/"
          >
            {homeLabel ?? <Home className="h-4 w-4" />}
          </Link>
        </li>

        {/* Dynamic Path Segments */}
        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;

          // Format segment string (e.g., "resource-manager" -> "Resource Manager")
          const defaultFormatted = segment
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());

          const label = labels[segment] || defaultFormatted;

          return (
            <React.Fragment key={href}>
              <li
                aria-hidden="true"
                className="text-muted-foreground/60 select-none"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li>
                {isLast ? (
                  <span
                    aria-current="page"
                    className="font-medium text-foreground truncate max-w-[200px] inline-block align-bottom"
                  >
                    {label}
                  </span>
                ) : (
                  <Link
                    className="hover:text-foreground transition-colors truncate max-w-[150px] inline-block align-bottom"
                    href={href}
                  >
                    {label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
