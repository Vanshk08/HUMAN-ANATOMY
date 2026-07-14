/**
 * Resolves a stable anatomy ID from a mesh.
 *
 * Today we fall back to the mesh name.
 * Later this resolver will map exported mesh names
 * to canonical anatomy IDs.
 */

export function resolveStructureId(mesh) {
  return mesh.name || mesh.uuid;
}