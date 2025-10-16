"use client";

import { useRouter } from "next/navigation.js";
import { useEffect, useRef } from "react";

export default function Login() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();
  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data.type === "SSO") {
        // const token = event.data.access_tokens;
        window.location.href = "/";
      }
    });
    // return () => window.removeEventListener("message", onMessage);
  }, [router]);
  return (
    <div className="w-sc h-screen">
      <iframe
        ref={iframeRef}
        className="w-full h-full"
        src={`${process.env.NEXT_PUBLIC_SSO_URL}/login`}
        style={{ border: "1px solid black" }}
      ></iframe>
    </div>
  );
}
