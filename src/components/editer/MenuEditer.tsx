"use client";
import React, { useRef, useState } from "react";
import { useEditorState, type Editor } from "@tiptap/react";
import { Button } from "../ui/button";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Image as ImageIcon,
  ImageUpscale,
  Italic,
  List,
  ListOrdered,
  Redo2,
  RemoveFormatting,
  SquareCode,
  Strikethrough,
  TextQuote,
  Underline,
  Undo2,
} from "lucide-react";
import { ModeToggle } from "../ModeToggle";
import ListTools from "./ListTools";
import type { Event } from "./ListTools";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import AssetLibrary from "../AssetLibrary/AssetLibrary";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

export default function MenuEditer({ editor }: { editor: Editor }) {
  const imageSizeRef = useRef<HTMLInputElement>(null);
  const [assetOpen, setAssetOpen] = useState<boolean>(false);
  const obj: Event[] = [
    {
      name: "isHeading1",
      tile: "H1",
      action: editor.chain().focus().toggleHeading({ level: 1 }).run,
    },
    {
      name: "isHeading2",
      tile: "H2",
      action: editor.chain().focus().toggleHeading({ level: 2 }).run,
    },
    {
      name: "isHeading3",
      tile: "H3",
      action: editor.chain().focus().toggleHeading({ level: 3 }).run,
    },
    {
      name: "isHeading4",
      tile: "H4",
      action: editor.chain().focus().toggleHeading({ level: 4 }).run,
    },
    {
      name: "isHeading5",
      tile: "H5",
      action: editor.chain().focus().toggleHeading({ level: 5 }).run,
    },
    {
      name: "isHeading6",
      tile: "H6",
      action: editor.chain().focus().toggleHeading({ level: 6 }).run,
    },
  ];
  const obj2: Event[] = [
    {
      name: "isBulletList",
      tile: <List></List>,
      action: editor.chain().focus().toggleBulletList().run,
    },
    {
      name: "isOrderedList",
      tile: <ListOrdered></ListOrdered>,
      action: editor.chain().focus().toggleOrderedList().run,
    },
  ];
  const addImage = (url: string) => {
    if (url) {
      editor
        .chain()
        .focus()
        .setImage({
          src: url,
          alt: "",
        })
        .run();
    }
  };

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold"),
        canBold: ctx.editor.can().chain().focus().toggleBold().run(),
        isUnderLine: ctx.editor.isActive("underline"),
        canUnderLine: ctx.editor.can().chain().focus().toggleUnderline().run(),
        isItalic: ctx.editor.isActive("italic"),
        canItalic: ctx.editor.can().chain().focus().toggleItalic().run(),
        isStrike: ctx.editor.isActive("strike"),
        canStrike: ctx.editor.can().chain().focus().toggleStrike().run(),
        isCode: ctx.editor.isActive("code"),
        canCode: ctx.editor.can().chain().focus().toggleCode().run(),
        canClearMarks: ctx.editor.can().chain().focus().unsetAllMarks().run(),
        isParagraph: ctx.editor.isActive("paragraph"),
        isHeading1: ctx.editor.isActive("heading", { level: 1 }),
        isHeading2: ctx.editor.isActive("heading", { level: 2 }),
        isHeading3: ctx.editor.isActive("heading", { level: 3 }),
        isHeading4: ctx.editor.isActive("heading", { level: 4 }),
        isHeading5: ctx.editor.isActive("heading", { level: 5 }),
        isHeading6: ctx.editor.isActive("heading", { level: 6 }),
        isBulletList: ctx.editor.isActive("bulletList"),
        isOrderedList: ctx.editor.isActive("orderedList"),
        isCodeBlock: ctx.editor.isActive("codeBlock"),
        isBlockquote: ctx.editor.isActive("blockquote"),
        isLeft: ctx.editor.isActive({ textAlign: "left" }),
        isCenter: ctx.editor.isActive({ textAlign: "center" }),
        isRight: ctx.editor.isActive({ textAlign: "right" }),
        isJustify: ctx.editor.isActive({ textAlign: "justify" }),
        isImage: ctx.editor.isActive("imageComponent"),
        canUndo: ctx.editor.can().chain().focus().undo().run(),
        canRedo: ctx.editor.can().chain().focus().redo().run(),
      };
    },
  });

  return (
    <div className="flex justify-center px-2 bg-[var(--background)] border-b-[var(--hover)] border-b-[2] sticky top-0 z-50">
      <div className="flex gap-[2]">
        {/* <Button>Cỡ chữ</Button> */}
        {/* Undo  */}
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
        >
          <Undo2></Undo2>
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
        >
          <Redo2></Redo2>
        </Button>
        <Button
          onClick={() => {
            localStorage.setItem("data", editor.getHTML());
          }}
        >
          Save
        </Button>
        {/* Block 2 */}
        <ListTools
          list={obj}
          def={editor.chain().focus().setParagraph().run}
          editorState={editorState}
        >
          H
        </ListTools>
        <ListTools
          list={obj2}
          def={editor.chain().focus().clearNodes().run}
          editorState={editorState}
        >
          <List />
        </ListTools>
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          variant={editorState.isBold ? "active" : "unactive"}
        >
          <Bold></Bold>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          variant={editorState.isUnderLine ? "active" : "unactive"}
        >
          <Underline />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          variant={editorState.isItalic ? "active" : "unactive"}
        >
          <Italic></Italic>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          variant={editorState.isStrike ? "active" : "unactive"}
        >
          <Strikethrough></Strikethrough>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          variant={editorState.isCode ? "active" : "unactive"}
        >
          <Code></Code>
        </Button>
        <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <RemoveFormatting> </RemoveFormatting>
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          variant={editorState.isCodeBlock ? "active" : "unactive"}
        >
          <SquareCode />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          variant={editorState.isBlockquote ? "active" : "unactive"}
        >
          <TextQuote></TextQuote>
        </Button>
        {/* Align */}
        <Button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          variant={editorState.isLeft ? "active" : "unactive"}
        >
          <AlignLeft></AlignLeft>
        </Button>
        <Button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          variant={editorState.isCenter ? "active" : "unactive"}
        >
          <AlignCenter></AlignCenter>
        </Button>
        <Button
          onClick={() => {
            console.log(editor.isActive({ textAlign: "right" }));
            editor.chain().focus().setTextAlign("right").run();
          }}
          variant={editorState.isRight ? "active" : "unactive"}
        >
          <AlignRight></AlignRight>
        </Button>
        <Button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          variant={editorState.isJustify ? "active" : "unactive"}
        >
          <AlignJustify></AlignJustify>
        </Button>
        <Dialog open={assetOpen} onOpenChange={() => setAssetOpen(false)}>
          <Button onClick={() => setAssetOpen(true)}>
            <ImageIcon></ImageIcon>
          </Button>
          <DialogContent
            className="w-[80vw] h-[90vh] max-w-screen max-h-screen p-0 [&_[data-slot=dialog-close]]:hidden"
            style={{ maxWidth: "100vw" }}
          >
            <DialogTitle className="sr-only">Asset Library</DialogTitle>
            <AssetLibrary
              numberColumns={6}
              onSelect={(asset) => {
                addImage(asset.url);
                setAssetOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              disabled={!editorState.isImage}
              variant={editorState.isImage ? "active" : "unactive"}
              onClick={() => {
                const image = editor.getAttributes("imageComponent") as {
                  src: string;
                  width: number;
                  height?: number;
                  alt?: string;
                };
                if (imageSizeRef.current) {
                  console.log(image.width);

                  imageSizeRef.current.value = image.width.toString();
                }
              }}
            >
              <ImageUpscale />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="leading-none font-medium">Dimensions</h4>
                <p className="text-muted-foreground text-sm">
                  Set the dimensions for the layer.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <label htmlFor="width">Width</label>
                  <Input
                    id="width"
                    min={200}
                    // defaultValue={100}
                    className="col-span-2 h-8"
                    type="number"
                    ref={imageSizeRef}
                  />
                </div>
              </div>
              <Button
                onClick={() => {
                  const imageSize = Number.parseInt(
                    imageSizeRef.current?.value || "100"
                  );
                  if (imageSize > 100) {
                    if (imageSize > 864)
                      editor
                        .chain()
                        .focus()
                        .updateAttributes("imageComponent", {
                          width: "100%",
                        })
                        .run();
                  } else {
                    editor
                      .chain()
                      .focus()
                      .updateAttributes("imageComponent", {
                        width: "100%",
                      })
                      .run();
                    alert("Image size must be greater than 100px");
                  }
                }}
              >
                Ok
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <ModeToggle></ModeToggle>
      </div>
    </div>
  );
}
