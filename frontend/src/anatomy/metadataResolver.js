import { DEFAULT_STRUCTURE } from "./anatomyMetadata";
import { resolveStructureId } from "./structureIdResolver";

/**
 * Resolves a Three.js mesh into the canonical
 * anatomy structure.
 *
 * The physical system and optional subsystem are supplied
 * by the runtime that owns/classifies the loaded GLB.
 */
export function resolveMetadata(
  mesh,
  system,
  subsystem = null
) {
  const displayName =
    mesh.name || "Unknown Structure";

  return {
    ...DEFAULT_STRUCTURE,

    uuid: mesh.uuid,

    id: resolveStructureId(mesh),

    // ===================================================
    // Canonical Anatomy Identity
    // ===================================================

    name: displayName,

    system:
      system ?? null,

    subsystem:
      subsystem ?? null,

    latin: "",
    description: "",
    region: "",

    visible: true,
    selectable: true,

    // ===================================================
    // Extended Metadata
    // ===================================================

    displayName,
    latinName: "",
    aliases: [],
    category: "",
    side: "",
  };
}