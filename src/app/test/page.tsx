"use client";
import React from "react";
// import AssetLibrary, { Asset } from "./components/AssetLibrary";

import AssetLibrary from "@/components/AssetLibrary/AssetLibrary";

function App() {
  return (
    <div className="h-screen w-screen p-8">
      <AssetLibrary />
    </div>
    // <div className="w-[800px] h-[600px] p-8">
    // </div>
    // <div className="p-8">
    //   <h1 className="text-2xl font-bold mb-6">✨ Demo Thư viện tài sản</h1>

    //   {selectedAsset && (
    //     <div className="mt-6">
    //       <h3 className="font-semibold">Asset đã chọn:</h3>
    //       <Image
    //         src={selectedAsset.url}
    //         alt=""
    //         width={300}
    //         height={300}
    //         className="max-w-xs border mt-2"
    //       />
    //     </div>
    //   )}
    // </div>
  );
}

export default App;
