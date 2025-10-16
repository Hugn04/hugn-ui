import { CircleX, Plus } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
type BaseRequired = {
  id: number;
  name: string;
};
type ChipSelectProps<T extends BaseRequired> = {
  data: T[];
  selectData: T[];
  onChange?: (data: T[]) => void;
};

export default function ChipSelect<T extends BaseRequired>({
  data: initData,
  selectData,
  onChange = () => {},
}: ChipSelectProps<T>) {
  const [data, setData] = useState(initData);
  const [select, setSelect] = useState<T[]>(selectData);

  const handleDelete = (deleteItem: T) => {
    const newData = select.filter((item) => item.id !== deleteItem.id);
    setData((prev) => [...prev, deleteItem]);
    setSelect(newData);
  };
  useEffect(() => {
    // lọc những item trong initData mà không có trong selectData
    const result = initData.filter(
      (item) => !selectData.some((s) => s.id === item.id)
    );
    setData(result);
  }, [initData, selectData]);
  useEffect(() => {
    onChange(select);
  }, [onChange, select]);
  const handleSelect = (selectItem: T) => {
    const newData = data.filter((item) => item.id !== selectItem.id);
    setSelect((prev) => [...prev, selectItem]);
    setData(newData);
  };
  return (
    <div className="w-full h-full">
      <div className="flex gap-2 justify-center items-center flex-wrap">
        {select.map((item) => {
          return (
            <ChipItem
              onDelete={() => {
                handleDelete(item);
              }}
              key={item.id}
            >
              {item.name}
            </ChipItem>
          );
        })}
        {data.length !== 0 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-4xl">
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Thêm vai trò mới</DialogTitle>
              </DialogHeader>
              <div className="flex gap-2 justify-center items-center flex-wrap">
                {data.map((item) => {
                  return (
                    <ChipItem
                      key={item.id}
                      onSelect={() => {
                        onChange(select);
                        handleSelect(item);
                      }}
                    >
                      {item.name}
                    </ChipItem>
                  );
                })}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
type ChipItemProps = {
  children: ReactNode;
  onDelete?: () => void;
  onSelect?: () => void;
};

export function ChipItem({ children, onDelete, onSelect }: ChipItemProps) {
  return (
    <div
      onClick={onSelect}
      className={`flex border-[1.5px] hover:bg-[var(--hover)] select-none gap-1 rounded-4xl bg-[var(--background)] border-[var(--foreground)] px-[9px] py-[3px] ${
        onSelect && "cursor-pointer"
      }`}
    >
      <span>{children}</span>
      {onDelete && (
        <button
          onClick={onDelete}
          className="outline-none rounded-4xl cursor-pointer"
        >
          <CircleX className="hover:text-red-600" size={20}></CircleX>
        </button>
      )}
    </div>
  );
}
