"use client";
import React, { Suspense } from "react";
// import AssetLibrary, { Asset } from "./components/AssetLibrary";

import AssetLibrary from "@/components/AssetLibrary/AssetLibrary";

function App() {
  return (
    <div className="h-full ">
      <Suspense>
        <AssetLibrary numberColumns={5} />
      </Suspense>
    </div>
  );
}

export default App;
