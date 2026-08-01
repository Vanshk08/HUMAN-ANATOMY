/**
 * Model Inspector
 *
 * Development utility for analyzing
 * imported anatomy models.
 */

/**
 * Returns an array describing every mesh
 * in the loaded model.
 */
export function inspectModel(meshRegistry) {
  const structures = [];

  meshRegistry.forEach((mesh) => {
    structures.push({
      uuid: mesh.uuid,
      name: mesh.name || "Unnamed",
      type: mesh.type,

      // Sprint 8.4 debugging information
      parent: mesh.parent?.name || "No Parent",
      parentType: mesh.parent?.type || "Unknown",

      visible: mesh.visible,

      childCount: mesh.children?.length || 0,
    });
  });

  return structures;
}

/**
 * Prints a summary of the model.
 */
export function printModelReport(meshRegistry) {
  const structures = inspectModel(meshRegistry);

  console.group("MODEL INSPECTOR");

  console.log("Total Structures:", structures.length);

  console.table(structures);

  // -----------------------------------------------------
  // Sprint 8.4 — Parent hierarchy analysis
  // -----------------------------------------------------

  const parentGroups = {};

  structures.forEach((structure) => {
    const parent = structure.parent;

    if (!parentGroups[parent]) {
      parentGroups[parent] = [];
    }

    parentGroups[parent].push(structure.name);
  });

  console.group("PARENT GROUPS");

  Object.entries(parentGroups).forEach(([parent, children]) => {
    console.log(`${parent} (${children.length})`, children);
  });

  console.groupEnd();

  // -----------------------------------------------------
  // Unique parent names
  // -----------------------------------------------------

  const uniqueParents = [
    ...new Set(structures.map((structure) => structure.parent)),
  ];

  console.log("Unique Parents:", uniqueParents);

  console.groupEnd();

  return structures;
}