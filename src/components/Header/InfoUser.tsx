"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { ModeToggle } from "../ModeToggle";
import axiosClient from "@/utils/requestClient";
import { getSortName } from "@/helper/getSortName";
type User = {
  avatarUrl: string;
  createdAt: string;
  email: string;
  id: number;
  passwordHash: string;
  updatedAt: string;
  username: string;
};
export default function InfoUser() {
  const [user, setUser] = useState<User | null>(null);
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
    <div className="flex items-center gap-2">
      {user ? (
        <div className="flex items-center gap-2">
          <Avatar className="md:w-10 md:h-10 border-2 border-[var(--primary)]">
            {user.avatarUrl && (
              <AvatarImage src="http://localhost:3000/_next/image?url=%2Fassets%2Fimages%2FHomeLogo.png&w=1080&q=75" />
            )}
            <AvatarFallback>{getSortName(user.username)}</AvatarFallback>
          </Avatar>
          <span className="inline-block max-w-[160px] truncate">
            {user.username}
          </span>
        </div>
      ) : (
        <Link
          href={"/login"}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Đăng nhập
        </Link>
      )}

      <div className="hidden md:block ">
        <ModeToggle type="icon"></ModeToggle>
      </div>
    </div>
  );
}
