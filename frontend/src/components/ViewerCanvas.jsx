import React from "react";
import AnatomyCanvas from "./AnatomyCanvas";

export default function ViewerCanvas() {
  return (
    <div
      className="w-full h-full relative canvas-container"
      style={{
        width: "100%",
        height: "100%",
        minWidth: 0,
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      <AnatomyCanvas />
    </div>
  );
}