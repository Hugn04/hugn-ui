import Header from "@/components/Header/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Dashboard",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="flex flex-col h-screen min-h-screen max-w-screen overflow-x-hidden">
        <Header />
        <main className="h-[calc(100vh-75px)]">{children}</main>
      </div>
    </main>
  );
}
