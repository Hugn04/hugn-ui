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
import useSWR, { mutate } from "swr";
import UploadImage from "./UploadImage";
import { useSearchParams } from "next/navigation";

export type Asset = {
  id: number;
  public_id: string;
  url: string;
  type: string;
  width: number;
  height: number;
  size: number;
  createdAt: string;
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

const fetcher = <T,>(url: string, params?: Record<string, any>) =>
  axiosClient.get<T>(url, { params }).then((res) => res.data);

const AssetLibrary: React.FC<AssetLibraryProps> = ({
  numberColumns = 7,
  onSelect,
}) => {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");
  const [preview, setPreview] = useState<Asset | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(Number(pageParam) || 1);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const updatePage = (newPage: number) => {
    if (!onSelect) {
      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());
      window.history.pushState({}, "", `${window.location.pathname}?${params}`);
    }
    setCurrentPage(newPage);
  };

  const {
    data: assets,
    isLoading,
    error,
  } = useSWR<AssetsPagination>(
    ["/assets", { page: currentPage, limit: limitParam || 21 }],
    (args: [string, Record<string, any>]) => fetcher(args[0], args[1]),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1 phút mới gọi lại
    }
  );
  // Lưu totalPages vào client tránh reload
  useEffect(() => {
    if (assets?.totalPages) setTotalPages(assets.totalPages);
  }, [assets?.totalPages]);

  return (
    <div className="flex flex-col w-full h-full px-4 py-2">
      <div className="flex items-center justify-between pb-2 mb-4 border-b-2">
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
          <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
            <Button
              onClick={() => {
                setUploadOpen(true);
              }}
            >
              <Upload></Upload>
              Upload Asset
            </Button>
            <DialogContent
              className="z-60 w-auto h-auto p-0 [&_[data-slot=dialog-close]]:hidden"
              style={{ maxWidth: "100vw" }}
            >
              <DialogTitle className="sr-only">Upload Assets</DialogTitle>
              <UploadImage
                onUpload={(asset) => {
                  if (onSelect) {
                    onSelect(asset);
                  }
                  setUploadOpen(false);
                  mutate(
                    // Lọc ra tất cả key bắt đầu bằng "/assets"
                    (key) => Array.isArray(key) && key[0] === "/assets",
                    undefined, // để re-fetch toàn bộ các key match
                    true // revalidate
                  );
                }}
              ></UploadImage>
            </DialogContent>
          </Dialog>
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
        {error && "Lỗi phía server"}
        {isLoading
          ? "Loading"
          : assets?.data.map((asset) => (
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
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer select-none"
                onClick={() => updatePage(Math.max(1, currentPage - 1))}
              />
            </PaginationItem>

            {getPaginationItems(currentPage, totalPages, 9).map((item, i) =>
              item === "..." ? (
                <PaginationItem key={`ellipsis-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={item}>
                  <PaginationLink
                    className="cursor-pointer select-none"
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
                className="cursor-pointer select-none"
                onClick={() =>
                  updatePage(Math.min(totalPages, currentPage + 1))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogContent className="z-60 w-auto h-auto p-0 focus:outline-none border-none [&_[data-slot=dialog-close]]:hidden">
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
