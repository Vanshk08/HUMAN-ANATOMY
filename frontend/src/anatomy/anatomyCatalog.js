/**
 * Anatomy Catalog
 *
 * Stores all anatomical structures known to the engine.
 *
 * This catalog is independent from rendering.
 */

const anatomyCatalog = new Map();

/**
 * Add or update a structure.
 */
export function addCatalogEntry(structure) {
  anatomyCatalog.set(structure.id, structure);
}

/**
 * Get a structure by its canonical ID.
 */
export function getCatalogEntry(id) {
  return anatomyCatalog.get(id) || null;
}

/**
 * Get every catalog entry.
 */
export function getCatalogEntries() {
  return Array.from(anatomyCatalog.values());
}

/**
 * Clear the catalog.
 */
export function clearCatalog() {
  anatomyCatalog.clear();
}

/**
 * Number of entries.
 */
export function getCatalogSize() {
  return anatomyCatalog.size;
}