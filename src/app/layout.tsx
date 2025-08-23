import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import ScriptAdsence from "@/components/ScriptAdsence";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import ToastHandler from "./ToastHandler";

const geistSans = Roboto({
  variable: "--font-geist-mondo",
  subsets: ["vietnamese"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Hugn",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        {/* Script Google AdSense */}
        <ScriptAdsence></ScriptAdsence>
      </head>
      <body className={`${geistSans.className} antialiased`}>
        <ToastHandler></ToastHandler>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
          <Toaster></Toaster>
        </ThemeProvider>
      </body>
    </html>
  );
}
