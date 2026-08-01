import React from "react";
import { Canvas } from "@react-three/fiber";

import ViewerScene from "../scene/ViewerScene";

export default function AnatomyCanvas() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        minWidth: 0,
        minHeight: 0,
      }}
    >
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
        camera={{
          position: [0, 1.0, 3.5],
          fov: 45,
        }}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
        }}
        resize={{
          scroll: true,
          debounce: {
            scroll: 50,
            resize: 0,
          },
        }}
        eventPrefix="client"
      >
        <ViewerScene />
      </Canvas>
    </div>
  );
}