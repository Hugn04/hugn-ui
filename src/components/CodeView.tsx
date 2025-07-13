"use client";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import React from "react";
interface MyMonacoProps {
  code: string;
  language?: string;
  readonly?: boolean;
}
export default function CodeView({
  code,
  language = "html",
  readonly = false,
}: MyMonacoProps) {
  const { theme } = useTheme();
  return (
    <Editor
      className="h-full"
      defaultLanguage={language}
      defaultValue={code}
      theme={theme === "light" ? "light" : "vs-dark"}
      options={{
        readOnly: readonly,
        minimap: { enabled: false },
        fontSize: 14,
        scrollBeyondLastLine: false,
      }}
    />
  );
}
