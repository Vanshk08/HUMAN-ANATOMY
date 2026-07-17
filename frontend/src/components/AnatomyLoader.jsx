import { Suspense, useEffect } from "react";

import AnatomySystem from "./AnatomySystem";
import { clearRegistry } from "../anatomy/anatomyRegistry";
import { anatomySystems } from "../anatomy/anatomySystems";

export default function AnatomyLoader() {
  useEffect(() => {
    clearRegistry();
    console.log("Anatomy Registry initialized.");
  }, []);

  return (
    <Suspense fallback={null}>
      {anatomySystems
        .filter((system) => system.modelPath)
        .map((system) => (
          <AnatomySystem
            key={system.id}
            modelPath={system.modelPath}
            system={system.id}
          />
        ))}
    </Suspense>
  );
}