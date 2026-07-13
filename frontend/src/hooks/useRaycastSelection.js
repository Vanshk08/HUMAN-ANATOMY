import { useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";

export default function useRaycastSelection() {
  const { camera, gl } = useThree();

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const pointer = useMemo(() => new THREE.Vector2(), []);

  function getIntersections(event, objects) {
    const rect = gl.domElement.getBoundingClientRect();

    pointer.x =
      ((event.clientX - rect.left) / rect.width) * 2 - 1;

    pointer.y =
      -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);

    return raycaster.intersectObjects(objects, true);
  }

  return {
    getIntersections,
  };
}