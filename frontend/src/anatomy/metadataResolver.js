import { DEFAULT_STRUCTURE } from "./anatomyMetadata";
import { resolveStructureId } from "./structureIdResolver";

/**
 * Resolves a Three.js mesh into the canonical
 * anatomy structure.
 */
export function resolveMetadata(mesh) {
  return {
    ...DEFAULT_STRUCTURE,

    uuid: mesh.uuid,

    id: resolveStructureId(mesh),

    displayName: mesh.name || "Unknown Structure",

    latinName: "",

    aliases: [],

    system: "Skeleton",

    category: "",

    region: "",

    side: "",
  };
}