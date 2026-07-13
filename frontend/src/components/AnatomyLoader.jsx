import { Suspense, useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";

import { buildMeshRegistry, findMesh } from "../utils/meshUtils";
import useRaycastSelection from "../hooks/useRaycastSelection";
import { useAnatomyStore } from "../store/useAnatomyStore";
import { initializeMaterials } from "../rendering/materialManager";

function Skeleton() {
  const { scene } = useGLTF("/models/skeleton.glb");

  const { getIntersections } = useRaycastSelection();

  const setSelectedStructure = useAnatomyStore(
    (state) => state.setSelectedStructure
  );

  const clearSelectedStructure = useAnatomyStore(
    (state) => state.clearSelectedStructure
  );

  // Build mesh registry once
  const registry = useMemo(() => {
    return buildMeshRegistry(scene);
  }, [scene]);

  // Initialize rendering resources once
  useEffect(() => {
    initializeMaterials(scene);

    console.group("ANATOMY MODEL");
    console.log("Mesh Count:", registry.size);
    console.groupEnd();
  }, [scene, registry]);

  function handlePointerDown(event) {
    event.stopPropagation();

    const intersections = getIntersections(event, [scene]);

    if (intersections.length === 0) {
      clearSelectedStructure();
      console.log("Selection cleared");
      return;
    }

    const clickedMesh = intersections[0].object;

    const selectedMesh = findMesh(registry, clickedMesh.uuid);

    if (!selectedMesh) {
      clearSelectedStructure();
      return;
    }

    setSelectedStructure(selectedMesh);

    console.log("Selected:", selectedMesh.name);
  }

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, 0, 0]}
      onPointerDown={handlePointerDown}
    />
  );
}

export default function AnatomyLoader() {
  return (
    <Suspense fallback={null}>
      <Skeleton />
    </Suspense>
  );
}