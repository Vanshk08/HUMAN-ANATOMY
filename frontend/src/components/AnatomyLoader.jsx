import { Suspense, useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { buildMeshRegistry, findMesh } from "../utils/meshUtils";
import useRaycastSelection from "../hooks/useRaycastSelection";
import { useAnatomyStore } from "../store/useAnatomyStore";

function Skeleton() {
  const { scene } = useGLTF("/models/skeleton.glb");

  const { getIntersections } = useRaycastSelection();

  const setSelectedStructure = useAnatomyStore(
    (state) => state.setSelectedStructure
  );

  const clearSelectedStructure = useAnatomyStore(
    (state) => state.clearSelectedStructure
  );

  // Build the mesh registry only once per loaded scene
  const registry = useMemo(() => {
    return buildMeshRegistry(scene);
  }, [scene]);

  useEffect(() => {
    console.group("ANATOMY MODEL");

    console.log("Mesh Count:", registry.size);
    console.log("Femur:", registry.get("Femur"));
    console.log("Radius:", registry.get("Radius"));

    console.groupEnd();
  }, [registry]);

  function handlePointerDown(event) {
    event.stopPropagation();

    const intersections = getIntersections(event, [scene]);

    if (intersections.length === 0) {
      clearSelectedStructure();
      console.log("Selection cleared");
      return;
    }

    const clickedMesh = intersections[0].object;

    const selectedMesh = findMesh(registry, clickedMesh.name);

    if (!selectedMesh) {
      clearSelectedStructure();
      return;
    }

    setSelectedStructure(selectedMesh);

    console.log("Selected:", selectedMesh.name);
  }

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, 0, 0]}
      onPointerDown={handlePointerDown}
    />
  );
}

export default function AnatomyLoader() {
  return (
    <Suspense fallback={null}>
      <Skeleton />
    </Suspense>
  );
}