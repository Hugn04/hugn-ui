"use client";
import { navItem } from "@/types/navItems";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation({ items }: { items: navItem[] }) {
  const pathname = usePathname();
  return (
    <nav className="hidden md:flex space-x-2">
      {items.map((item) => {
        const isActive = `/${pathname.split("/")[1]}` === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 relative ${
              isActive
                ? "text-[var(--primary)] bg-[var(--primary-foreground)]"
                : "text-[var(--text-color)] hover:text-[var(--primary)] hover:bg-[var(--hover)]"
            }`}
          >
            {item.name}
            {isActive && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[var(--primary)] rounded-full"></div>
            )}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
          </Link>
        );
      })}
    </nav>
  );
}
