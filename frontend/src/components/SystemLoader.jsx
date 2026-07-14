import { Suspense, useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";

import { buildMeshRegistry } from "../utils/meshUtils";
import useRaycastSelection from "../hooks/useRaycastSelection";
import { useAnatomyStore } from "../store/useAnatomyStore";
import { initializeMaterials } from "../rendering/materialManager";

import {
  getRegistrySize,
  getStructureByUUID,
} from "../anatomy/anatomyRegistry";

import { initializeAnatomy } from "../anatomy/anatomyEngine";

import { printModelReport } from "../utils/modelInspector";

/**
 * Internal component responsible for loading
 * a single anatomical system.
 */
function LoadingSystem({ system }) {
  const { scene } = useGLTF(system.model);

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

  // Populate Anatomy Registry
  useEffect(() => {
    initializeAnatomy(registry);

    console.log(
      `Registered ${getRegistrySize()} anatomical structures.`
    );
  }, [registry]);

  // Initialize rendering resources
  useEffect(() => {
    initializeMaterials(scene);

    console.group("ANATOMY MODEL");
    console.log("Mesh Count:", registry.size);
    console.groupEnd();

    printModelReport(registry);
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

    const selectedStructure = getStructureByUUID(clickedMesh.uuid);

    if (!selectedStructure) {
      clearSelectedStructure();
      return;
    }

    setSelectedStructure(selectedStructure);

    console.log("Selected:", selectedStructure.name);
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

/**
 * Public loader component.
 */
export default function SystemLoader({ system }) {
  return (
    <Suspense fallback={null}>
      <LoadingSystem system={system} />
    </Suspense>
  );
}