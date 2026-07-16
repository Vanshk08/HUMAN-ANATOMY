import { registerStructure } from "./anatomyRegistry";
import { resolveMetadata } from "./metadataResolver";

/**
 * Initializes anatomical structures from a mesh registry.
 *
 * NOTE:
 * This function no longer clears the registry.
 * The registry lifecycle is now controlled by the application,
 * not by individual anatomy systems.
 */
export function initializeAnatomy(meshRegistry, system) {
  meshRegistry.forEach((mesh) => {
    const structure = resolveMetadata(mesh, system);

    registerStructure(structure);
  });
}