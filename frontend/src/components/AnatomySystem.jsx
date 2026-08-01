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
  // Sprint 8.5.4
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
    initializeAnatomy(
      registry,
      system
    );

    console.log(
      `[${system}] Global registry size: ${getRegistrySize()}`
    );
  }, [registry, system]);

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
        visceralSubsystemRegistry.get(
          mesh.uuid
        );

      // Defensive fallback:
      // never accidentally hide an
      // unclassified visceral structure.
      if (!subsystem) {
        mesh.visible = true;
        return;
      }

      mesh.visible =
        visceralSubsystemVisibility[
          subsystem
        ] ?? true;
    });
  }, [
    system,
    registry,
    visceralSubsystemRegistry,
    visceralSubsystemVisibility,
  ]);

  // =====================================================
  // Whole-Body Selection
  // Sprint 8.5.4
  //
  // React Three Fiber already performs raycasting.
  // event.object is the actual intersected mesh.
  // =====================================================

  function handlePointerDown(event) {
    // ===================================================
    // STEP 1 — Verify R3F Event
    // ===================================================

    console.log("CLICK DETECTED");

    event.stopPropagation();

    // ===================================================
    // STEP 2 — Actual Intersected Mesh
    // ===================================================

    const clickedMesh = event.object;

    console.log(
      "EVENT OBJECT:",
      clickedMesh
    );

    console.log(
      "EVENT OBJECT NAME:",
      clickedMesh?.name
    );

    console.log(
      "EVENT OBJECT UUID:",
      clickedMesh?.uuid
    );

    console.log(
      "CURRENT SYSTEM:",
      system
    );

    // ===================================================
    // STEP 3 — Validate Mesh
    // ===================================================

    if (!clickedMesh?.uuid) {
      console.warn(
        "CLICKED OBJECT HAS NO UUID"
      );

      clearSelectionContext();
      return;
    }

    console.log(
      "CLICKED MESH VALID"
    );

    // ===================================================
    // STEP 4 — Resolve Canonical Selection Context
    // ===================================================

    const selectionContext =
      resolveSelection(
        clickedMesh
      );

    console.log(
      "RESOLVED SELECTION CONTEXT:",
      selectionContext
    );

    if (!selectionContext) {
      console.warn(
        `[${system}] Selection resolver returned null`
      );

      clearSelectionContext();
      return;
    }

    // ===================================================
    // STEP 5 — Write Selection Context → Zustand
    // ===================================================

    setSelectionContext(
      selectionContext
    );

    // ===================================================
    // STEP 6 — Verify Zustand
    // ===================================================

    const storeState =
      useAnatomyStore.getState();

    console.log(
      `[${system}] ZUSTAND SELECTION`,
      {
        selectedStructure:
          storeState.selectedStructure,

        selectedSystem:
          storeState.selectedSystem,

        selectedSubsystem:
          storeState.selectedSubsystem,

        selectionContext:
          storeState.selectionContext,
      }
    );

    // ===================================================
    // Final Selection Report
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
  // Hidden systems must not participate in raycasting.
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