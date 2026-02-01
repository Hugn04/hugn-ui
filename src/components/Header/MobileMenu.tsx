"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItemsIcon } from "@/config/header.config";

export default function MobileMenu() {
  const pathname = usePathname();

  return (
    <div className="flex md:hidden px-0 sm:px-20 justify-between items-center border-t-[var(--hover)] border-t-[2]">
      {navigationItemsIcon.map((item) => {
        const isActive = `/${pathname.split("/")[1]}` === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`block px-4 py-3 text-base font-medium transition-all duration-200 ${
              isActive
                ? "text-[var(--primary)] bg-[var(--primary-foreground)] border-b-4 border-[var(--primary)]"
                : "text-[var(--text-color)] hover:text-[var(--primary)] hover:bg-gray-100"
            }`}
          >
            <Icon></Icon>
          </Link>
        );
      })}
    </div>
  );
}
