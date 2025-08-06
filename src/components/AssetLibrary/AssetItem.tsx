import Image from "next/image";
import React from "react";
import { Asset } from "./AssetLibrary";
import { Button } from "../ui/button";
import { Eye, Trash2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import copyTextToClipboard from "@/utils/copyTextToClipboard";
import { formatDate } from "@/helper/formatDate";

interface AssetItemProps {
  mode: "grid" | "list";
  asset: Asset;
  onSelect?: (asset: Asset) => void;
  setPreview: (asset: Asset | null) => void;
}
export default function AssetItem({
  mode,
  asset,
  onSelect,
  setPreview,
}: AssetItemProps) {
  const getName = (url: string) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  return (
    <div
      className={
        mode === "grid"
          ? "border-2 rounded shadow transition"
          : "flex border-y-2 py-1"
      }
    >
      <div
        className={`relative group ${
          mode === "grid"
            ? "w-full h-35 rounded-t"
            : "flex items-center gap-2 h-12"
        }`}
      >
        <Checkbox
          className={`${
            mode === "grid" && "absolute top-2 left-2 z-50"
          } bg-white dark:bg-white data-[state=checked]:bg-white dark:data-[state=checked]:bg-white border-gray-300 [&>span]:text-black`}
        />
        <Image
          src={asset.url}
          alt=""
          width={150}
          height={150}
          className={`object-cover  ${
            mode === "grid" ? "w-full h-36 rounded-t" : "w-12 h-12 rounded"
          }`}
        />
        {mode === "grid" && (
          <div
            onClick={() => setPreview(asset)}
            className="absolute inset-0 bg-black/20 flex items-center cursor-pointer justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
          >
            <span className="flex items-center gap-1 text-white text-sm">
              <Eye /> Preview
            </span>
          </div>
        )}
      </div>

      <div
        className={
          mode === "grid"
            ? "p-2"
            : "flex px-4 gap-2 justify-between items-center w-full"
        }
      >
        <div className="mb-2 truncate max-w-full"> {getName(asset.url)}</div>
        <div className="flex justify-between items-center text-sm text-gray-500 gap-2">
          <div>Size: {`${asset.width}x${asset.height}`}</div>
          <div className="text-right text-sm text-gray-500">
            {formatDate(asset.createdAt)}
          </div>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2 gap-2">
          <div>
            Type: {asset.type}/{asset.format}
          </div>
          <div>{(asset.size / 1024).toFixed(2)} KB</div>
        </div>
        <div className="flex items-center justify-between gap-2">
          {mode === "list" && (
            <Button variant={"ghost"} onClick={() => setPreview(asset)}>
              <Eye></Eye>
            </Button>
          )}
          {onSelect ? (
            <Button className="flex-1/2" onClick={() => onSelect(asset)}>
              Chọn
            </Button>
          ) : (
            <Button
              className="flex-1/2"
              onClick={() => {
                copyTextToClipboard(asset.url);
              }}
            >
              Copy URL
            </Button>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-red-500 hover:bg-red-600">
                <Trash2></Trash2>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Bạn có muốn xóa ảnh này không ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Bạn có chắc chắn muốn xóa ảnh này? Hành động này không thể
                  hoàn tác.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy </AlertDialogCancel>
                <AlertDialogAction>Tiếp tục</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
