import { registerStructure } from "./anatomyRegistry";
import { resolveMetadata } from "./metadataResolver";

/**
 * =====================================================
 * Anatomy Engine
 *
 * Initializes anatomical structures from a mesh registry.
 *
 * Registers:
 * - canonical anatomical metadata
 * - runtime Three.js mesh reference
 *
 * visceralSubsystemRegistry is optional.
 *
 * Map structure:
 * meshUUID -> subsystem
 *
 * Example:
 * "uuid-123" -> "respiratory"
 * =====================================================
 */

export function initializeAnatomy(
  meshRegistry,
  system,
  visceralSubsystemRegistry = null
) {
  if (!meshRegistry) {
    return;
  }

  meshRegistry.forEach((mesh) => {
    // ===================================================
    // Validate Mesh
    // ===================================================

    if (!mesh?.isMesh) {
      return;
    }

    // ===================================================
    // Resolve Optional Subsystem
    // ===================================================

    const subsystem =
      visceralSubsystemRegistry?.get(
        mesh.uuid
      ) ?? null;

    // ===================================================
    // Resolve Canonical Metadata
    // ===================================================

    const structure =
      resolveMetadata(
        mesh,
        system,
        subsystem
      );

    if (!structure) {
      return;
    }

    // ===================================================
    // Register Structure + Runtime Mesh
    //
    // IMPORTANT:
    // SelectionHighlight needs the actual Three.js mesh.
    // ===================================================

    registerStructure(
      structure,
      mesh
    );
  });
}