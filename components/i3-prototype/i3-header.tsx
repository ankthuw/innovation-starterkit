"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Lightbulb,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  FolderOpen,
  ChevronDown,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function I3Header() {
  const pathname = usePathname();
  const [newMenuOpen, setNewMenuOpen] = useState(false);
  const [myContentMenuOpen, setMyContentMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      {/* Main Header - 72px height like i3 */}
      <div className="h-[72px] flex items-center px-4">
        <div className="flex items-center flex-1 gap-6">
          {/* Logo */}
          <Link href="/i3-prototype" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">
              Innovation Platform i³
            </span>
          </Link>

          {/* Main Navigation */}
          <nav className="flex items-center gap-1">
            {/* Activity */}
            <Link
              href="/i3-prototype"
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors rounded hover:bg-gray-100",
                pathname === "/i3-prototype"
                  ? "text-blue-600"
                  : "text-gray-700"
              )}
            >
              Activity
            </Link>

            {/* Explore */}
            <Link
              href="/i3-prototype/campaign"
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors rounded hover:bg-gray-100",
                pathname?.startsWith("/i3-prototype/campaign")
                  ? "text-blue-600"
                  : "text-gray-700"
              )}
            >
              Explore
            </Link>

            {/* New Menu */}
            <div className="relative">
              <button
                onClick={() => setNewMenuOpen(!newMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 rounded hover:bg-gray-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
                New
                <ChevronDown className="w-3 h-3" />
              </button>

              {newMenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <Link
                    href="/i3-prototype/idea"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setNewMenuOpen(false)}
                  >
                    Idea
                  </Link>
                </div>
              )}
            </div>

            {/* My Content Menu */}
            <div className="relative">
              <button
                onClick={() => setMyContentMenuOpen(!myContentMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 rounded hover:bg-gray-100 transition-colors"
              >
                <FolderOpen className="w-4 h-4" />
                My Content
                <ChevronDown className="w-3 h-3" />
              </button>

              {myContentMenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setMyContentMenuOpen(false)}
                  >
                    My Library
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setMyContentMenuOpen(false)}
                  >
                    My Notifications
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center ml-2">
            <span className="text-sm font-medium text-blue-600">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
}
