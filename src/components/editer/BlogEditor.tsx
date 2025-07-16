"use client";
import { TextStyleKit } from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import { ResizableImage } from "tiptap-extension-resizable-image";

import Image from "@tiptap/extension-image";
import "./style.scss";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import MenuEditer from "./MenuEditer";

const extensions = [
  TextStyleKit,
  ResizableImage,
  Image.configure({
    inline: false,
    allowBase64: true,
    HTMLAttributes: {
      class: "my-image",
    },
  }),
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
    <div>
      <MenuEditer editor={editor} />
      <EditorContent
        editor={editor}
        className="tiptap p-4 border-none focus:border-none"
      />
    </div>
  );
}
