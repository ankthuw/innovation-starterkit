"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

export function I3Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <Link href="/i3-prototype" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Innovation Platform i³
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              href="/i3-prototype"
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600",
                pathname === "/i3-prototype"
                  ? "text-blue-600"
                  : "text-gray-600"
              )}
            >
              Home
            </Link>
            <Link
              href="/i3-prototype/campaign"
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600",
                pathname?.startsWith("/i3-prototype/campaign")
                  ? "text-blue-600"
                  : "text-gray-600"
              )}
            >
              Campaigns
            </Link>
            <Link
              href="/i3-prototype/idea"
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600",
              pathname?.startsWith("/i3-prototype/idea")
                  ? "text-blue-600"
                  : "text-gray-600"
              )}
            >
              My Ideas
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
