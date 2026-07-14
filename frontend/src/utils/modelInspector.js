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

  console.groupEnd();

  return structures;
}