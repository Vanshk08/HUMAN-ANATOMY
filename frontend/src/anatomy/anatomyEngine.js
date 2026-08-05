import { registerStructure } from "./anatomyRegistry";
import { resolveMetadata } from "./metadataResolver";

/**
 * =====================================================
 * Anatomy Engine
 *
 * Converts loaded Three.js meshes into anatomical
 * structures and registers both:
 *
 * UUID → Structure Metadata
 * UUID → Three.js Mesh
 *
 * The registry lifecycle is controlled by AnatomyLoader.
 *
 * Sprint 8.5.5
 * =====================================================
 */

export function initializeAnatomy(meshRegistry, system) {
  if (!meshRegistry) {
    return;
  }

  meshRegistry.forEach((mesh) => {
    // ===================================================
    // Resolve Anatomical Metadata
    // ===================================================

    const structure = resolveMetadata(
      mesh,
      system
    );

    if (!structure) {
      return;
    }

    // ===================================================
    // Register Structure + Physical Mesh
    //
    // This allows:
    //
    // mesh UUID
    //    ↓
    // anatomical structure
    //
    // AND
    //
    // mesh UUID
    //    ↓
    // actual Three.js mesh
    //
    // The second mapping is required for highlighting,
    // isolation, transparency, focus, etc.
    // ===================================================

    registerStructure(
      structure,
      mesh
    );
  });
}