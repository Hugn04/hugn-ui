import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7830893162068089"
          crossOrigin="anonymous"
        ></script>
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
