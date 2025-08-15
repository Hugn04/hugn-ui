"use client";
import { Home, User2 } from "lucide-react";
import React from "react";
import InfoUser, { Menu } from "../InfoUser";

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
];
export default function InfoUserHeader() {
  return <InfoUser menu={menu}></InfoUser>;
}
