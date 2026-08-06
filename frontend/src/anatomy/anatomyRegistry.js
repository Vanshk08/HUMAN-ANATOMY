/**
 * =====================================================
 * Anatomy Registry
 *
 * Single source of truth for anatomical structures
 * loaded into the viewer.
 *
 * Maintains:
 *
 * 1. Structure Registry
 *    mesh UUID -> canonical anatomy metadata
 *
 * 2. Mesh Registry
 *    mesh UUID -> Three.js mesh
 *
 * Three.js meshes remain outside Zustand.
 * =====================================================
 */

// =====================================================
// Registries
// =====================================================

const anatomyRegistry = new Map();

const anatomyMeshRegistry = new Map();

// =====================================================
// Register Structure
// =====================================================

export function registerStructure(
  structure,
  mesh = null
) {
  if (!structure?.uuid) {
    return;
  }

  const {
    uuid,
    id,
    name,
    system,
    subsystem,

    latin,
    description,
    region,

    visible = true,
    selectable = true,

    displayName,
    latinName,
    aliases,
    category,
    side,
  } = structure;

  // -----------------------------------------------------
  // Canonical Metadata
  // -----------------------------------------------------

  anatomyRegistry.set(uuid, {
    uuid,

    id: id ?? null,

    name:
      name ??
      "Unknown Structure",

    system:
      system ?? null,

    subsystem:
      subsystem ?? null,

    latin:
      latin ?? "",

    description:
      description ?? "",

    region:
      region ?? "",

    visible,

    selectable,

    displayName:
      displayName ??
      name ??
      "Unknown Structure",

    latinName:
      latinName ?? "",

    aliases:
      aliases ?? [],

    category:
      category ?? "",

    side:
      side ?? "",
  });

  // -----------------------------------------------------
  // Runtime Mesh Reference
  // -----------------------------------------------------

  if (mesh?.isMesh) {
    anatomyMeshRegistry.set(
      uuid,
      mesh
    );
  }
}

// =====================================================
// Structure Lookup
// =====================================================

export function getStructureByUUID(uuid) {
  if (!uuid) {
    return null;
  }

  return (
    anatomyRegistry.get(uuid) ??
    null
  );
}

// =====================================================
// Mesh Lookup
// =====================================================

export function getMeshByUUID(uuid) {
  if (!uuid) {
    return null;
  }

  return (
    anatomyMeshRegistry.get(uuid) ??
    null
  );
}

// =====================================================
// All Structures
// =====================================================

export function getAllStructures() {
  return Array.from(
    anatomyRegistry.values()
  );
}

// =====================================================
// Registry Size
// =====================================================

export function getRegistrySize() {
  return anatomyRegistry.size;
}

// =====================================================
// Clear Registry
// =====================================================

export function clearRegistry() {
  anatomyRegistry.clear();
  anatomyMeshRegistry.clear();
}