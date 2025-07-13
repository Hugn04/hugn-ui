"use client";

import React, { useEffect, useRef, useState } from "react";

type Size = {
  width: number;
  height: number;
};

export default function PreviewTemplate({
  code = "",
  mobile = false,
}: {
  code: string;
  mobile: boolean;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size & { scale: number }>({
    width: 100,
    height: 200,
    scale: 1,
  });
  const [realSize, setRealSize] = useState<Size>({ width: 375, height: 667 });

  useEffect(() => {
    if (mobile) {
      setRealSize({ width: 375, height: 667 });
    } else {
      setRealSize({ width: 1600, height: 900 });
    }
  }, [mobile]);
  function getMaxSizeByRatio(size: Size, ratio: number) {
    // ratio = width / height
    const { width: w, height: h } = size;
    let width = w;
    let height = w / ratio;

    if (height > h) {
      height = h;
      width = h * ratio;
    }

    return { width, height };
  }
  function getScaleToFit(size: Size, origWidth = 1600, origHeight = 900) {
    const { width: w, height: h } = size;
    const scaleW = w / origWidth;
    const scaleH = h / origHeight;
    return Math.min(scaleW, scaleH);
  }

  const ratio = mobile ? 9 / 16 : 16 / 9;

  useEffect(() => {
    if (!divRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const newSize = { width, height };
        const convertSize = getMaxSizeByRatio(newSize, ratio);
        const scale = getScaleToFit(
          convertSize,
          realSize.width,
          realSize.height
        );
        const newState = { ...convertSize, scale };
        setSize(newState);
      }
    });

    observer.observe(divRef.current);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobile, realSize]);

  return (
    <div
      ref={divRef}
      className="flex w-full h-full items-center flex-col justify-center"
    >
      <div
        style={{ width: size.width, height: size.height }}
        // className="border-2 border-[var(--foreground)] rounded-2xl"
      >
        <iframe
          style={{
            width: `${realSize.width}px`,
            height: `${realSize.height}px`,
            transform: `scale(${size.scale})`,
            transformOrigin: "top left",
            // border: "0",
          }}
          className="border-2 border-[var(--foreground)] rounded-2xl"
          srcDoc={code}
        ></iframe>
      </div>
    </div>
  );
}
