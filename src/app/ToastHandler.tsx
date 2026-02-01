"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner"; // hoặc react-hot-toast
export default function ToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const error = searchParams.get("error");

    if (error === "403") {
      toast.error("Bạn không có quyền truy cập trang này!");
    }
    if (error === "401") {
      toast.error("Bạn phải đăng nhập mới vào được trang này!");
    }
    // Xóa param sau khi hiện toast
    const params = new URLSearchParams(searchParams.toString());
    params.delete("error");
    router.replace(`${window.location.pathname}?${params.toString()}`);
  }, [searchParams, router]);

  return null;
}
