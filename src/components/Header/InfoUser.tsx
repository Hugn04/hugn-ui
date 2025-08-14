"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import axiosClient from "@/utils/requestClient";
import { getSortName } from "@/helper/getSortName";
import { Home, LogOut, LucideIcon, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
type User = {
  avatarUrl: string;
  createdAt: string;
  email: string;
  id: number;
  passwordHash: string;
  updatedAt: string;
  username: string;
};

type Menu = {
  title: string;
  icon: LucideIcon;
  onClick?: () => void;
  href?: string;
};

type UserInfoProps = {
  menu?: Menu[];
  side?: "right" | "top" | "bottom" | "left" | undefined;
};
const menu: Menu[] = [
  {
    title: "Trang chủ",
    icon: Home,
    onClick: () => {
      console.log(123);
    },
    href: "/",
  },
  { title: "Profile", icon: User2 },
  { title: "Đăng xuất", icon: LogOut },
];
export default function InfoUser({ side }: UserInfoProps) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosClient.get("/verify");
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  return (
    <div>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 rounded-[8px] px-2 py-1 hover:bg-[var(--hover)] cursor-pointer">
              <Avatar className="md:w-10 md:h-10 border-2 border-[var(--primary)]">
                {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
                <AvatarFallback>{getSortName(user.username)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="inline-block max-w-[120px] truncate text-sm font-medium">
                  {user.username}
                </span>
                <span className="inline-block max-w-[135px] truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side={side} align="end">
            {menu.map((item, index) => {
              const Icon = item.icon;
              return (
                <DropdownMenuItem
                  key={index}
                  onSelect={() => {
                    if (item.href) {
                      router.push(item.href);
                    }
                    item.onClick?.();
                  }}
                >
                  <Icon></Icon>
                  {item.title}
                  {/* <Button variant={"outline"} className="outline-none w-full">
                    dsak
                  </Button> */}
                </DropdownMenuItem>
              );
            })}
            {/* <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href={"/login"}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Đăng nhập
        </Link>
      )}
    </div>
  );
}
