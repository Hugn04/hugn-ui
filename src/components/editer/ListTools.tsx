"use client";
import React, { ReactNode, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type Event = {
  name: string;
  tile: ReactNode;
  action: () => void;
};

export default function ListTools({
  list,
  def,
  editorState,
  children,
}: {
  list: Event[];
  def: () => void;
  editorState: any;
  children: ReactNode;
}) {
  const [toolState, setToolState] = useState("");

  useEffect(() => {
    const activeItem = list.find((item) => editorState[item.name] === true);
    setToolState(activeItem?.name ?? "");
  }, [editorState, list]);
  return (
    <Select value={toolState} defaultValue="">
      <SelectTrigger
        className={`w-[70] custom-select-trigger ${
          toolState !== ""
            ? "!bg-[var(--primary)] [&_*]:text-[var(--primary-foreground)]"
            : "bg-transparent"
        }`}
      >
        <SelectValue placeholder={children} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {list.map((item) => (
            <SelectItem
              key={item.name}
              value={String(item.name)}
              onPointerDown={(e) => {
                e.preventDefault();
                if (toolState === String(String(item.name))) {
                  def();
                } else {
                  item.action();
                }
              }}
            >
              {item.tile}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
