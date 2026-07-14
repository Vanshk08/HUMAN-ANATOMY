/**
 * Anatomy Registry
 *
 * This module is the single source of truth for anatomical
 * structures loaded into the viewer.
 *
 * Every selectable mesh UUID maps to a structure object.
 */

const anatomyRegistry = new Map();

/**
 * Register a structure.
 */
export function registerStructure(structure) {
    if (!structure) return;

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

    if (!uuid) return;

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
}

/**
 * Get a structure by UUID.
 */
export function getStructureByUUID(uuid) {
    return anatomyRegistry.get(uuid) || null;
}

/**
 * Get every registered structure.
 */
export function getAllStructures() {
    return Array.from(anatomyRegistry.values());
}

/**
 * Remove all structures.
 */
export function clearRegistry() {
    anatomyRegistry.clear();
}

/**
 * Total registered structures.
 */
export function getRegistrySize() {
    return anatomyRegistry.size;
}