import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import ScriptAdsence from "@/components/ScriptAdsence";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
