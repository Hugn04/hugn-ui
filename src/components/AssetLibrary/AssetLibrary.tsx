"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Grid3X3, List, Upload } from "lucide-react";
import AssetItem from "./AssetItem";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { cn } from "@/lib/utils";
import axiosClient from "@/utils/requestClient";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import getPaginationItems from "@/helper/getPaginationItems";
import { useRouter, useSearchParams } from "next/navigation";
import { DialogTrigger } from "@radix-ui/react-dialog";
import UploadImage from "./UploadImage";

export type Asset = {
  id: number;
  url: string;
  type: "image" | "video" | "file";
  format: "jpg" | "png" | "gif" | "mp4" | "pdf" | string; // Định dạng file (tùy chọn)
  width: number; // Chiều rộng (tùy chọn)
  height: number; // Chiều cao (tùy chọn)
  size: number; // Kích thước file (tùy chọn)
  createdAt: string; // Ngày tạo (tùy chọn)
};

type AssetsPagination = {
  data: Asset[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

interface AssetLibraryProps {
  numberColumns?: number;
  onSelect?: (asset: Asset) => void;
}

// const mockAssets: Asset[] = [
//   {
//     id: 1,
//     type: "image",
//     url: "https://res.cloudinary.com/dfrk1gorf/image/upload/v1750864431/img_quiz/q6thh7wmofaocclg3enj.jpg",
//     size: 345678,
//   },
//   {
//     id: 2,
//     type: "image",
//     url: "https://res.cloudinary.com/dfrk1gorf/image/upload/v1743057244/img_quiz/vd85ok1jqczx6wgpvnzd.jpg",
//     size: 345678,
//   },
//   {
//     id: 3,
//     type: "image",
//     url: "https://res.cloudinary.com/dfrk1gorf/image/upload/v1743240083/img_quiz/ccj8jg5xwb7aqwttmrpl.jpg",
//     size: 345678,
//   },
// ];

const AssetLibrary: React.FC<AssetLibraryProps> = ({
  numberColumns = 7,
  onSelect,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");
  const [assets, setAssets] = useState<AssetsPagination | null>(null);
  const [preview, setPreview] = useState<Asset | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(Number(pageParam) || 1);

  const updatePage = (newPage: number) => {
    if (!onSelect) {
      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());
      router.push(`?${params.toString()}`);
    }
    setCurrentPage(newPage); // Nếu bạn vẫn cần state nội bộ
  };

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const { data } = await axiosClient.get("/assets", {
          params: { page: currentPage, limit: limitParam || 21 },
        });
        setAssets(data);
      } catch (error) {
        console.log("Error fetching assets:", error);
      }
    };
    fetchAssets();
  }, [currentPage, limitParam]);

  return (
    <div className="flex flex-col w-full h-full p-4">
      <div className="flex items-center justify-between pb-2 border-b-2">
        <h2 className="text-lg font-bold mb-4 ">Asset Library</h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Upload></Upload>
              Upload Asset
            </Button>
          </DialogTrigger>
          <DialogContent className="z-60 w-auto h-auto p-4 [&_[data-slot=dialog-close]]:hidden">
            <DialogTitle className="sr-only">Upload Assets</DialogTitle>
            <UploadImage></UploadImage>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center justify-between py-2 mb-4 border-b-2">
        <input
          type="text"
          placeholder="Tìm kiếm tài sản..."
          className="border p-2 rounded w-full max-w-xs"
        />
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setViewMode("grid")}
            variant={viewMode === "grid" ? "active" : "unactive"}
          >
            <Grid3X3></Grid3X3>
          </Button>
          <Button
            onClick={() => setViewMode("list")}
            variant={viewMode === "list" ? "active" : "unactive"}
          >
            <List></List>
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "flex-1 overflow-y-visible overflow-x-hidden px-2",
          viewMode === "grid"
            ? `grid grid-cols-2 md:grid-cols-3 gap-4 items-start`
            : "flex flex-col gap-2 px-2"
        )}
        style={{
          gridTemplateColumns: `repeat(${numberColumns}, minmax(0, 1fr))`,
        }}
      >
        {assets?.data.map((asset) => (
          <AssetItem
            mode={viewMode}
            asset={asset}
            setPreview={setPreview}
            onSelect={onSelect}
            key={asset.id}
          ></AssetItem>
        ))}
      </div>
      <div className="px-2 pt-4">
        {assets && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="cursor-pointer"
                  onClick={() => updatePage(Math.max(1, currentPage - 1))}
                />
              </PaginationItem>

              {getPaginationItems(currentPage, assets.totalPages, 9).map(
                (item, i) =>
                  item === "..." ? (
                    <PaginationItem key={`ellipsis-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={item}>
                      <PaginationLink
                        className="cursor-pointer"
                        isActive={item === currentPage}
                        onClick={() => updatePage(item as number)}
                      >
                        {item}
                      </PaginationLink>
                    </PaginationItem>
                  )
              )}
              <PaginationItem>
                <PaginationNext
                  className="cursor-pointer"
                  onClick={() =>
                    updatePage(Math.min(assets.totalPages, currentPage + 1))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogContent className="z-60 w-auto h-auto p-0 border-none [&_[data-slot=dialog-close]]:hidden">
          <DialogTitle className="sr-only">Asset Library</DialogTitle>
          {preview && (
            <div className="flex justify-center">
              <Image
                src={preview ? preview.url : ""}
                alt=""
                width={300}
                height={300}
                className="w-[50vw]"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssetLibrary;
