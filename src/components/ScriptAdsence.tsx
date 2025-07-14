"use client";
import Script from "next/script";
import React from "react";

export default function ScriptAdsence() {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7830893162068089"
      crossOrigin="anonymous"
    ></Script>
  );
}
