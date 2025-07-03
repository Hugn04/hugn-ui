"use client";
import { useEffect, useRef } from "react";

type AdType = "auto" | "in-article" | "in-feed" | "rectangle";

interface AdUnitProps {
  type: AdType;
}

export default function AdUnit({ type }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && adRef.current) {
      const ins = document.createElement("ins");
      ins.className = "adsbygoogle";
      ins.style.display = "block";
      ins.setAttribute("data-ad-client", "ca-pub-7830893162068089");

      switch (type) {
        case "auto":
          ins.setAttribute("data-ad-slot", "7176355192");
          ins.setAttribute("data-ad-format", "auto");
          ins.setAttribute("data-full-width-responsive", "true");
          break;
        case "in-article":
          ins.style.textAlign = "center";
          ins.setAttribute("data-ad-slot", "7841186715");
          ins.setAttribute("data-ad-format", "fluid");
          ins.setAttribute("data-ad-layout", "in-article");
          break;
        case "in-feed":
          ins.setAttribute("data-ad-format", "fluid");
          ins.setAttribute("data-ad-layout", "in-feed");
          break;
        case "rectangle":
          ins.setAttribute("data-ad-format", "rectangle");
          break;
      }

      adRef.current.innerHTML = ""; // xóa ad cũ nếu có
      adRef.current.appendChild(ins);

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("adsbygoogle error:", e);
      }
    }
  }, [type]);

  return <div ref={adRef} />;
}
