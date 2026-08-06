import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";

import { buildMeshRegistry } from "../utils/meshUtils";
import { useAnatomyStore } from "../store/useAnatomyStore";

import { initializeMaterials } from "../rendering/materialManager";
import { resolveSelection } from "../anatomy/selectionResolver";

import {
  getRegistrySize,
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
  // Global Selection State
  // =====================================================

  const setSelectionContext = useAnatomyStore(
    (state) => state.setSelectionContext
  );

  const clearSelectionContext = useAnatomyStore(
    (state) => state.clearSelectionContext
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
  // Individual Structure Visibility
  // Sprint 8.6.2
  // =====================================================

  const hiddenStructureUUIDs = useAnatomyStore(
    (state) => state.hiddenStructureUUIDs
  );

  // =====================================================
  // Structure Isolation
  // Sprint 8.6.5B
  // =====================================================

  const isolatedStructureUUID = useAnatomyStore(
    (state) => state.isolatedStructureUUID
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

    return buildVisceralSubsystemRegistry(
      registry
    );
  }, [
    registry,
    system,
  ]);

  // =====================================================
  // Anatomy Registry
  //
  // Registers:
  // UUID -> anatomical metadata
  // UUID -> actual Three.js mesh
  //
  // Visceral structures also receive their subsystem.
  // =====================================================

  useEffect(() => {
    initializeAnatomy(
      registry,
      system,
      visceralSubsystemRegistry
    );

    console.log(
      `[${system}] Global registry size: ${getRegistrySize()}`
    );
  }, [
    registry,
    system,
    visceralSubsystemRegistry,
  ]);

  // =====================================================
  // Materials + Inspector
  // =====================================================

  useEffect(() => {
    initializeMaterials(scene);

    console.group(
      `${system.toUpperCase()} MODEL`
    );

    console.log(
      "Mesh Count:",
      registry.size
    );

    console.groupEnd();

    printModelReport(registry);
  }, [
    scene,
    registry,
    system,
  ]);

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

    visceralSubsystemRegistry.forEach(
      (subsystem) => {
        counts[subsystem] =
          (counts[subsystem] || 0) + 1;
      }
    );

    console.group(
      "VISCERAL SUBSYSTEM REGISTRY"
    );

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
  // Mesh Visibility Engine
  // Sprint 8.6.5B
  //
  // SINGLE source of truth for mesh-level visibility.
  //
  // Visibility is composed from:
  //
  // 1. Individual hidden state
  // 2. Visceral subsystem state
  // 3. Isolation state
  //
  // Hide and Isolation remain independent.
  // =====================================================

  useEffect(() => {
    const hiddenUUIDs = new Set(
      hiddenStructureUUIDs
    );

    registry.forEach((mesh) => {
      // -------------------------------------------------
      // Individual Structure Visibility
      // -------------------------------------------------

      const individuallyHidden =
        hiddenUUIDs.has(mesh.uuid);

      // -------------------------------------------------
      // Isolation Visibility
      //
      // No isolation:
      // every mesh passes.
      //
      // Isolation active:
      // only the isolated UUID passes.
      // -------------------------------------------------

      const passesIsolation =
        !isolatedStructureUUID ||
        mesh.uuid === isolatedStructureUUID;

      // -------------------------------------------------
      // Non-Visceral Systems
      // -------------------------------------------------

      if (system !== "visceral") {
        mesh.visible =
          !individuallyHidden &&
          passesIsolation;

        return;
      }

      // -------------------------------------------------
      // Visceral Systems
      // -------------------------------------------------

      const subsystem =
        visceralSubsystemRegistry?.get(
          mesh.uuid
        );

      // -------------------------------------------------
      // Unclassified Visceral Structure
      // -------------------------------------------------

      if (!subsystem) {
        mesh.visible =
          !individuallyHidden &&
          passesIsolation;

        return;
      }

      // -------------------------------------------------
      // Classified Visceral Structure
      // -------------------------------------------------

      const subsystemVisible =
        visceralSubsystemVisibility[
          subsystem
        ] ?? true;

      mesh.visible =
        subsystemVisible &&
        !individuallyHidden &&
        passesIsolation;
    });
  }, [
    registry,
    system,
    visceralSubsystemRegistry,
    visceralSubsystemVisibility,
    hiddenStructureUUIDs,
    isolatedStructureUUID,
  ]);

  // =====================================================
  // Whole-Body Selection
  // =====================================================

  function handlePointerDown(event) {
    event.stopPropagation();

    // React Three Fiber already performs raycasting.
    const clickedMesh =
      event.object;

    if (!clickedMesh?.uuid) {
      clearSelectionContext();
      return;
    }

    // ===================================================
    // Resolve Canonical Selection Context
    // ===================================================

    const selectionContext =
      resolveSelection(
        clickedMesh
      );

    if (!selectionContext) {
      clearSelectionContext();
      return;
    }

    // ===================================================
    // Write Selection Context -> Zustand
    // ===================================================

    setSelectionContext(
      selectionContext
    );

    // ===================================================
    // Development Verification
    // ===================================================

    console.group(
      `[${system}] GLOBAL SELECTION`
    );

    console.log(
      "Structure:",
      selectionContext.structure
    );

    console.log(
      "System:",
      selectionContext.system
    );

    console.log(
      "Subsystem:",
      selectionContext.subsystem
    );

    console.log(
      "Mesh UUID:",
      selectionContext.meshUUID
    );

    console.groupEnd();
  }

  // =====================================================
  // Render / Interaction Boundary
  //
  // System-level visibility remains separate from
  // mesh-level visibility.
  //
  // A disabled system is completely removed from the
  // R3F render/raycast tree.
  // =====================================================

  if (!visible) {
    return null;
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