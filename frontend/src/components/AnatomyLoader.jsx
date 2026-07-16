import { Suspense, useEffect } from "react";
import AnatomySystem from "./AnatomySystem";
import { clearRegistry } from "../anatomy/anatomyRegistry";

export default function AnatomyLoader() {
   useEffect(() => {
    clearRegistry();

    console.log("Anatomy Registry initialized.");
  }, []);
  return (
    <Suspense fallback={null}>
      <AnatomySystem
        modelPath="/models/skeleton.glb"
        system="skeleton"
      />

      <AnatomySystem
        modelPath="/models/muscles.glb"
        system="muscles"
      />
    </Suspense>
  );
}