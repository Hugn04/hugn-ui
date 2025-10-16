"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home, User2 } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbItems = [{ label: "Admin", href: "/admin", icon: User2 }];

  // Build breadcrumb items based on current path
  let currentPath = "";
  segments.forEach((segment) => {
    if (segment === "admin") return; // Skip admin segment as it's already in breadcrumbItems

    currentPath += `/${segment}`;

    let label = segment;
    switch (segment) {
      case "posts":
        label = "Bài viết";
        break;
      case "role":
        label = "Quyền";
        break;
      case "settings":
        label = "Cài đặt";
        break;
      case "new":
        label = "Tạo mới";
        break;
      case "edit":
        label = "Chỉnh sửa";
        break;
      default:
        // For dynamic segments like post IDs, keep original
        label = segment;
    }

    breadcrumbItems.push({
      label: label.charAt(0).toUpperCase() + label.slice(1),
      href: `/admin${currentPath}`,
      icon: Home,
    });
  });

  if (breadcrumbItems.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        const Icon = item.icon;

        return (
          <div key={item.href} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
            {isLast ? (
              <span className="font-medium text-foreground flex items-center gap-1">
                {Icon && <Icon className="h-4 w-4" />}
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors flex items-center gap-1"
              >
                {Icon && <Icon className="h-4 w-4" />}
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
