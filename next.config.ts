import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com", "th.bing.com"], // ✅ thêm các domain bạn muốn dùng ảnh từ đó
  },
};

export default nextConfig;
