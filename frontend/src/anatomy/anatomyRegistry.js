/**
 * =====================================================
 * Anatomy Registry
 *
 * Single source of truth for anatomical structures
 * loaded into the viewer.
 *
 * Responsibilities:
 * - Map mesh UUID → anatomical structure
 * - Map mesh UUID → actual Three.js mesh
 * - Provide structure lookup
 * - Provide mesh lookup for rendering systems
 *
 * Sprint 8.5.5
 * =====================================================
 */

// =====================================================
// Registries
// =====================================================

const anatomyRegistry = new Map();

const meshRegistry = new Map();

// =====================================================
// Register Structure
// =====================================================

export function registerStructure(structure, mesh = null) {
  if (!structure) {
    return;
  }

  const {
    uuid,
    id,
    name,
    system,
    latin,
    description,
    region,
    visible = true,
    selectable = true,
  } = structure;

  if (!uuid) {
    return;
  }

  // ---------------------------------------------------
  // Anatomical metadata
  // ---------------------------------------------------

  anatomyRegistry.set(uuid, {
    uuid,
    id,
    name,
    system,
    latin,
    description,
    region,
    visible,
    selectable,
  });

  // ---------------------------------------------------
  // Three.js mesh reference
  // ---------------------------------------------------

  if (mesh?.isMesh) {
    meshRegistry.set(uuid, mesh);
  }
}

// =====================================================
// Structure Lookup
// =====================================================

export function getStructureByUUID(uuid) {
  return anatomyRegistry.get(uuid) || null;
}

// =====================================================
// Mesh Lookup
// =====================================================

export function getMeshByUUID(uuid) {
  return meshRegistry.get(uuid) || null;
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
// All Meshes
// =====================================================

export function getAllRegisteredMeshes() {
  return Array.from(
    meshRegistry.values()
  );
}

// =====================================================
// Clear Registry
// =====================================================

export function clearRegistry() {
  anatomyRegistry.clear();
  meshRegistry.clear();
}

// =====================================================
// Registry Size
// =====================================================

export function getRegistrySize() {
  return anatomyRegistry.size;
}

export function getMeshRegistrySize() {
  return meshRegistry.size;
}