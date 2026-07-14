import {
  clearRegistry,
  registerStructure,
} from "./anatomyRegistry";

import { resolveMetadata } from "./metadataResolver";

/**
 * Initializes the Anatomy Registry from a mesh registry.
 *
 * Translates Three.js meshes into anatomy-domain objects.
 */
export function initializeAnatomy(meshRegistry) {
  clearRegistry();

  meshRegistry.forEach((mesh) => {
  const structure = resolveMetadata(mesh);

  registerStructure(structure);
});
}