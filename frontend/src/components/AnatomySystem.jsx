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

import {
  buildVisceralSubsystemRegistry,
} from "../anatomy/visceralResolver";

export default function AnatomySystem({
  modelPath,
  system,
}) {
  // =====================================================
  // GLTF
  // =====================================================

  const { scene } = useGLTF(modelPath);

  // =====================================================
  // Interaction
  // =====================================================

  const { getIntersections } = useRaycastSelection();

  const setSelectedStructure = useAnatomyStore(
    (state) => state.setSelectedStructure
  );

  const clearSelectedStructure = useAnatomyStore(
    (state) => state.clearSelectedStructure
  );

  // =====================================================
  // System Visibility
  // =====================================================

  const visible = useAnatomyStore(
    (state) => state.visibilitySettings[system]
  );

  // =====================================================
  // Visceral Subsystem Visibility
  // =====================================================

  const visceralSubsystemVisibility = useAnatomyStore(
    (state) => state.visceralSubsystemVisibility
  );

  // =====================================================
  // Mesh Registry
  // =====================================================

  const registry = useMemo(() => {
    return buildMeshRegistry(scene);
  }, [scene]);

  // =====================================================
  // Visceral Subsystem Registry
  // =====================================================

  const visceralSubsystemRegistry = useMemo(() => {
    if (system !== "visceral") {
      return null;
    }

    return buildVisceralSubsystemRegistry(registry);
  }, [registry, system]);

  // =====================================================
  // Anatomy Registry
  // =====================================================

  useEffect(() => {
    initializeAnatomy(registry, system);

    console.log(
      `[${system}] Registered ${getRegistrySize()} anatomical structures.`
    );
  }, [registry, system]);

  // =====================================================
  // Materials + Inspector
  // =====================================================

  useEffect(() => {
    initializeMaterials(scene);

    console.group(`${system.toUpperCase()} MODEL`);
    console.log("Mesh Count:", registry.size);
    console.groupEnd();

    printModelReport(registry);
  }, [scene, registry, system]);

  // =====================================================
  // Visceral Subsystem Classification Report
  // =====================================================

  useEffect(() => {
    if (
      system !== "visceral" ||
      !visceralSubsystemRegistry
    ) {
      return;
    }

    const counts = {};

    visceralSubsystemRegistry.forEach((subsystem) => {
      counts[subsystem] =
        (counts[subsystem] || 0) + 1;
    });

    console.group("VISCERAL SUBSYSTEM REGISTRY");

    console.log(
      "Total visceral meshes:",
      registry.size
    );

    console.log(
      "Classified meshes:",
      visceralSubsystemRegistry.size
    );

    console.log(
      "Unclassified meshes:",
      registry.size -
        visceralSubsystemRegistry.size
    );

    console.table(counts);

    console.groupEnd();
  }, [
    system,
    registry,
    visceralSubsystemRegistry,
  ]);

  // =====================================================
  // Visceral Subsystem Visibility Engine
  // =====================================================

  useEffect(() => {
    if (
      system !== "visceral" ||
      !visceralSubsystemRegistry
    ) {
      return;
    }

    registry.forEach((mesh) => {
      const subsystem =
        visceralSubsystemRegistry.get(mesh.uuid);

      // Defensive fallback.
      // Never accidentally hide an unclassified structure.
      if (!subsystem) {
        mesh.visible = true;
        return;
      }

      mesh.visible =
        visceralSubsystemVisibility[subsystem] ?? true;
    });
  }, [
    system,
    registry,
    visceralSubsystemRegistry,
    visceralSubsystemVisibility,
  ]);

  // =====================================================
  // Selection
  // =====================================================

  function handlePointerDown(event) {
    event.stopPropagation();

    const intersections = getIntersections(
      event,
      [scene]
    );

    if (intersections.length === 0) {
      clearSelectedStructure();
      return;
    }

    const clickedMesh =
      intersections[0].object;

    const selectedStructure =
      getStructureByUUID(clickedMesh.uuid);

    if (!selectedStructure) {
      clearSelectedStructure();
      return;
    }

    setSelectedStructure(selectedStructure);

    console.log(
      `[${system}]`,
      selectedStructure.name
    );
  }

  // =====================================================
  // Render
  // =====================================================

  return (
    <group visible={visible}>
      <primitive
        object={scene}
        scale={1}
        position={[0, 0, 0]}
        onPointerDown={handlePointerDown}
      />
    </group>
  );
}