import { DEFAULT_STRUCTURE } from "./anatomyMetadata";
import { resolveStructureId } from "./structureIdResolver";

/**
 * Resolves a Three.js mesh into the canonical
 * anatomy structure.
 *
 * The physical system is supplied by the runtime
 * that owns the loaded GLB.
 */
export function resolveMetadata(mesh, system) {
  const displayName =
    mesh.name || "Unknown Structure";

  return {
    ...DEFAULT_STRUCTURE,

    uuid: mesh.uuid,

    id: resolveStructureId(mesh),

    // Canonical registry fields
    name: displayName,
    system: system ?? null,

    latin: "",
    description: "",
    region: "",

    visible: true,
    selectable: true,

    // Extended metadata
    displayName,
    latinName: "",
    aliases: [],
    category: "",
    side: "",
  };
}