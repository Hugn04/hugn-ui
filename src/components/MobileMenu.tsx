"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { navItem } from "@/types/navItems";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
export default function MobileMenu({ items }: { items: navItem[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-[var(--foreground)] focus:outline-none p-2 rounded-lg hover:bg-[var(--hover)] transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[var(--background)] border-t border-gray-200 shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "text-[var(--primary)] bg-[var(--primary-foreground)] border-l-4 border-[var(--primary)]"
                      : "text-[var(--text-color)] hover:text-[var(--primary)] hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="flex pt-4 border-t border-gray-200 justify-around">
              <Button>
                <Link href="/login">Đăng nhập</Link>
              </Button>
              <ModeToggle></ModeToggle>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
