import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hugn - Đăng nhập tài khoản",
  description:
    "Đăng nhập để trải nghiệm đầy đủ các tính năng của Hugn, quản lý tài khoản, lịch sử đặt hàng và nhiều hơn nữa.",
  openGraph: {
    title: "Hugn - Đăng nhập tài khoản",
    description:
      "Truy cập tài khoản Hugn của bạn để quản lý thông tin và sử dụng các dịch vụ ưu việt.",
    url: `http${process.env.NEXT_PUBLIC_APP_URL}/assets/images/HomeLogo.png`,
    siteName: "Hugn",
    type: "website",
    images: [
      {
        url: `http${process.env.NEXT_PUBLIC_APP_URL}/assets/images/HomeLogo.png`,
        width: 1200,
        height: 630,
        alt: "Hugn Login",
      },
    ],
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hugn - Đăng nhập tài khoản",
    description: "Đăng nhập để khám phá các tính năng tuyệt vời của Hugn.",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/assets/images/HomeLogo.png`],
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
