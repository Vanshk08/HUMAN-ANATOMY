import { Suspense } from "react";

import AnatomySystem from "./AnatomySystem";
import { anatomySystems } from "../anatomy/anatomySystems";

export default function AnatomyLoader() {
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