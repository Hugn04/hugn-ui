// import TextEditer from "@/components/BlogEditor";
"use client";
import dynamic from "next/dynamic";
import React from "react";

const TextEditer = dynamic(() => import("@/components/editer/BlogEditor"), {
  ssr: false,
});

export default function page() {
  return (
    <div>
      <TextEditer></TextEditer>
    </div>
  );
}
