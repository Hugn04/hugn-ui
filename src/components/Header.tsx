"use client";
import Link from "next/link";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import type { navItem } from "@/types/navItems";
import { ModeToggle } from "./ModeToggle";
export default function Header() {
  const navigationItems: navItem[] = [
    { name: "Trang chủ", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Mẫu", href: "/template" },
    { name: "Mạng xã hội", href: "/social" },
    { name: "Liên hệ", href: "/contact" },
  ];

  return (
    <header className="bg-[var(--background)] border-b-[var(--hover)] border-b-[2] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="ml-3 text-2xl font-bold text-[var(--foreground)] group-hover:text-blue-600 transition-colors duration-200">
                HUGN
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <Navigation items={navigationItems} />

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <button className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-lg hover:bg-gray-100">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button> */}
            <Link
              href={"/login"}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Đăng nhập
            </Link>
            <ModeToggle></ModeToggle>
          </div>

          {/* Mobile menu button */}
          <MobileMenu items={navigationItems} />
        </div>
      </div>
    </header>
  );
}
