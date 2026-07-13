import React from "react";
import { Canvas } from "@react-three/fiber";

import ViewerScene from "../scene/ViewerScene";

export default function AnatomyCanvas() {
  return (
    <Canvas
      camera={{
        position: [0, 1.0, 3.5],
        fov: 45,
      }}
      gl={{
        antialias: true,
        preserveDrawingBuffer: true,
      }}
    >
      <ViewerScene />
    </Canvas>
  );
}