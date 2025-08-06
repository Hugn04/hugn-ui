"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import axiosClient from "@/utils/requestClient";

export default function UploadImage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const { data } = await axiosClient.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload thành công:", data);
      // reset hoặc xử lý tiếp
    } catch (error) {
      console.error("Upload lỗi:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <Image
          src={preview}
          width={200}
          height={200}
          alt="Preview"
          className="w-[200px] h-auto rounded shadow"
        />
      )}

      <Button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? "Đang tải lên..." : "Tải ảnh lên"}
      </Button>
    </div>
  );
}
