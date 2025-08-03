"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Grid3X3, List, Upload } from "lucide-react";
import AssetItem from "./AssetItem";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { cn } from "@/lib/utils";
import axiosClient from "@/utils/requestClient";

export type Asset = {
  id: number;
  type: "image" | "video" | "file";
  url: string;
  size: number; // Kích thước file (tùy chọn)
};

interface AssetLibraryProps {
  numberColumns?: number;
  onSelect?: (asset: Asset) => void;
}

const mockAssets: Asset[] = [
  {
    id: 1,
    type: "image",
    url: "https://res.cloudinary.com/dfrk1gorf/image/upload/v1750864431/img_quiz/q6thh7wmofaocclg3enj.jpg",
    size: 345678,
  },
  {
    id: 2,
    type: "image",
    url: "https://res.cloudinary.com/dfrk1gorf/image/upload/v1743057244/img_quiz/vd85ok1jqczx6wgpvnzd.jpg",
    size: 345678,
  },
  {
    id: 3,
    type: "image",
    url: "https://res.cloudinary.com/dfrk1gorf/image/upload/v1743240083/img_quiz/ccj8jg5xwb7aqwttmrpl.jpg",
    size: 345678,
  },
];

const AssetLibrary: React.FC<AssetLibraryProps> = ({
  numberColumns = 7,
  onSelect,
}) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [preview, setPreview] = useState<Asset | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const data = await axiosClient.get("/assets");
        console.log(data.data);

        // setAssets(data.data);
      } catch (error) {
        console.log("Error fetching assets:", error);
      }
    };
    fetchAssets();
    setAssets(mockAssets);
  }, []);

  return (
    <div className="w-full h-full p-4">
      <div className="flex items-center justify-between pb-2 border-b-2">
        <h2 className="text-lg font-bold mb-4 ">Asset Library</h2>
        <Button>
          <Upload></Upload>
          Upload Asset
        </Button>
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
          viewMode === "grid"
            ? `grid grid-cols-2 md:grid-cols-3 gap-4`
            : "flex flex-col gap-4"
        )}
        style={{
          gridTemplateColumns: `repeat(${numberColumns}, minmax(0, 1fr))`,
        }}
      >
        {assets.map((asset) => (
          <AssetItem
            mode={viewMode}
            asset={asset}
            setPreview={setPreview}
            onSelect={onSelect}
            key={asset.id}
          ></AssetItem>
        ))}
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
