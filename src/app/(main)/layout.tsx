import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hugn - Nền tảng Game và Mẫu Thiết Kế",
  description:
    "Khám phá các mẫu thiết kế, trò chơi và bài viết chất lượng tại Hugn.",
  openGraph: {
    title: "Hugn - Nền tảng Game và Mẫu Thiết Kế",
    description:
      "Khám phá các mẫu thiết kế, trò chơi và bài viết chất lượng tại Hugn.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Hugn",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hugn - Nền tảng Game và Mẫu Thiết Kế",
    description:
      "Khám phá các mẫu thiết kế, trò chơi và bài viết chất lượng tại Hugn.",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/og-image.jpg`],
  },
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </main>
  );
}
