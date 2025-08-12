import { LucideIcon } from "lucide-react";

export type navItem = {
  name: string;
  href: string;
};

export type navItemIcon = navItem & {
  icon: LucideIcon;
};
