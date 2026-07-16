import { useEffect, useMemo } from "react";
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

export default function AnatomySystem({
  modelPath,
  system,
}) {
  const { scene } = useGLTF(modelPath);

  const { getIntersections } = useRaycastSelection();

  const setSelectedStructure = useAnatomyStore(
    (state) => state.setSelectedStructure
  );

  const clearSelectedStructure = useAnatomyStore(
    (state) => state.clearSelectedStructure
  );

  const visible = useAnatomyStore(
    (state) => state.visibilitySettings[system]
  );

  const registry = useMemo(() => {
    return buildMeshRegistry(scene);
  }, [scene]);

  useEffect(() => {
    initializeAnatomy(registry, system);

    console.log(
      `[${system}] Registered ${getRegistrySize()} anatomical structures.`
    );
  }, [registry, system]);

  useEffect(() => {
    initializeMaterials(scene);

    console.group(`${system.toUpperCase()} MODEL`);
    console.log("Mesh Count:", registry.size);
    console.groupEnd();

    printModelReport(registry);
  }, [scene, registry, system]);

  function handlePointerDown(event) {
    event.stopPropagation();

    const intersections = getIntersections(event, [scene]);

    if (intersections.length === 0) {
      clearSelectedStructure();
      return;
    }

    const clickedMesh = intersections[0].object;

    const selectedStructure = getStructureByUUID(clickedMesh.uuid);

    if (!selectedStructure) {
      clearSelectedStructure();
      return;
    }

    setSelectedStructure(selectedStructure);

    console.log(`[${system}]`, selectedStructure.name);
  }

  return (
    <group visible={visible}>
        <primitive
            object={scene}
            scale={1}
            position={[0,0,0]}
            onPointerDown={handlePointerDown}
        />
    </group>
    );
}