import { navItem, navItemIcon } from "@/types/navItems";
import { FileText, House, LayoutTemplate, Library } from "lucide-react";

export const navigationItems: navItem[] = [
  { name: "Trang chủ", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Mẫu", href: "/template" },
  // { name: "Mạng xã hội", href: "/social" },
  { name: "Thư viện", href: "/admin/library" },
];
export const navigationItemsIcon: navItemIcon[] = [
  { name: "Trang chủ", href: "/", icon: House },
  { name: "Blog", href: "/blog", icon: FileText },
  { name: "Mẫu", href: "/template", icon: LayoutTemplate },
  // { name: "Mạng xã hội", href: "/social", icon: Newspaper },
  { name: "Thư viện", href: "/admin/library", icon: Library },
];
