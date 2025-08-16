"use client";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import axiosClient from "@/utils/requestClient";
import { toast } from "sonner";
import { Asset } from "./AssetLibrary";

type UploadImageProps = { onUpload?: (url: Asset) => void };

export default function UploadImage({ onUpload = () => {} }: UploadImageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [uploading, setUploading] = useState(false);
  // const [image, setImage] = useState("");
  const [text, setText] = useState("Kéo và thả để tải ảnh lên");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const previewRef = useRef<HTMLImageElement | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("img", file);
    formData.append("status", "private");

    try {
      toast.loading("Đang tải ảnh lên...", {
        id: "uploading",
      });
      setUploading(true);
      const { data } = await axiosClient.post<Asset>(
        "/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onUpload(data);
      toast.success("Tải ảnh lên thành công!", {
        id: "uploading",
      });
      // reset hoặc xử lý tiếp
    } catch (error) {
      toast.error("Tải ảnh lên thất bại!", {
        id: "uploading",
      });
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };
  const handleImageUpload = (file: File) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      setPreview(fileReader.result as string);
      setFile(file);
    };
  };

  return (
    <div
      className={`flex flex-col justify-center items-center border-2 border-dashed border-gray-300 min-w-100 min-h-50 rounded-lg p-4 text-center cursor-pointer transition-colors duration-300
    ${preview ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}`}
      onDragOver={(e) => {
        e.preventDefault();
        setText("Thả để tải ảnh");
      }}
      onDragLeave={() => {
        setText("Kéo và thả để tải ảnh lên");
      }}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
          handleImageUpload(file);
        } else {
          alert("Định dạng file không đúng");
        }
      }}
    >
      {preview ? (
        <div className="relative inline-block">
          <button
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
            onClick={() => {
              setPreview("");
              setText("Kéo và thả để tải ảnh lên");
            }}
          >
            ×
          </button>
          <Image
            className="min-w-100 max-h-100 mb-4 rounded-md object-contain"
            width={200}
            height={200}
            ref={previewRef}
            src={preview}
            alt="Ảnh được tải lên"
          />
          <Button
            onClick={() => {
              handleUpload();
            }}
          >
            Upload
          </Button>
        </div>
      ) : (
        <>
          <div className="text-gray-600 mb-2">{text}</div>
          <span className="text-gray-400 text-sm mb-2 block">hoặc</span>
          <Button
            onClick={() => {
              inputRef.current?.click();
            }}
            className="mt-2"
          >
            Chọn File
          </Button>
          <input
            ref={inputRef}
            accept="image/*"
            type="file"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0] as File;
              handleImageUpload(file);
            }}
          />
        </>
      )}
    </div>
  );
}
