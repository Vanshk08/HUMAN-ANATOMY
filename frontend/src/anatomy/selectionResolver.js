import {
  getStructureByUUID,
  getRegistrySize,
} from "./anatomyRegistry";

import { getVisceralSubsystem } from "./visceralResolver";

/**
 * Resolves a clicked Three.js mesh into a complete
 * whole-body selection context.
 */
export function resolveSelection(mesh) {
  console.group("SELECTION RESOLVER");

  // =====================================================
  // Validate Mesh
  // =====================================================

  if (!mesh?.uuid) {
    console.warn("Mesh has no UUID.");
    console.groupEnd();

    return null;
  }

  console.log("Mesh Name:", mesh.name);
  console.log("Mesh UUID:", mesh.uuid);
  console.log("Global Registry Size:", getRegistrySize());

  // =====================================================
  // Resolve Anatomical Structure
  // =====================================================

  const structure = getStructureByUUID(mesh.uuid);

  console.log("Registry Lookup Result:", structure);

  if (!structure) {
    console.warn(
      "STRUCTURE NOT FOUND IN ANATOMY REGISTRY:",
      mesh.uuid,
      mesh.name
    );

    console.groupEnd();

    return null;
  }

  // =====================================================
  // Selectability
  // =====================================================

  console.log(
    "Structure Selectable:",
    structure.selectable
  );

  if (structure.selectable === false) {
    console.warn(
      "Structure exists but is not selectable."
    );

    console.groupEnd();

    return null;
  }

  // =====================================================
  // Physical System
  // =====================================================

  const system =
    structure.system ?? null;

  // =====================================================
  // Optional Subsystem
  // =====================================================

  let subsystem = null;

  if (system === "visceral") {
    subsystem =
      getVisceralSubsystem(mesh);
  }

  // =====================================================
  // Selection Context
  // =====================================================

  const selectionContext = {
    meshUUID: mesh.uuid,
    structure,
    system,
    subsystem,
  };

  console.log(
    "Selection Context:",
    selectionContext
  );

  console.groupEnd();

  return selectionContext;
}