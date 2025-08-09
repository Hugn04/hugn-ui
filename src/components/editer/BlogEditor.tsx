"use client";
import { TextStyleKit } from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import { ResizableImage } from "tiptap-extension-resizable-image";

// import Image from "@tiptap/extension-image";
import "./style.scss";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import MenuEditer from "./MenuEditer";
// import { CustomImage } from "./CustomImage";
import { Image } from "@tiptap/extension-image";

const extensions = [
  TextStyleKit,
  ResizableImage,
  Image,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  StarterKit,
];
const data = localStorage.getItem("data");
export default function TextEditer() {
  const editor = useEditor({
    extensions,
    immediatelyRender: false,
    content: data,
  });
  if (!editor) return null;

  return (
    <div className="">
      <MenuEditer editor={editor} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <EditorContent
          editor={editor}
          className="prose prose-lg max-w-none dark:prose-invert"
        />
      </div>
    </div>
  );
}
