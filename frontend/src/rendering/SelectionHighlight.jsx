import { useEffect, useRef } from "react";

import { useAnatomyStore } from "../store/useAnatomyStore";

import {
  getMeshByUUID,
} from "../anatomy/anatomyRegistry";

import {
  highlightMesh,
  restoreMesh,
} from "./materialManager";

/**
 * =====================================================
 * Selection Highlight
 *
 * Observes global selection state and applies visual
 * feedback to the corresponding Three.js mesh.
 *
 * Sprint 8.5.5
 * =====================================================
 */

export default function SelectionHighlight() {
  // =====================================================
  // Global Selection
  // =====================================================

  const selectionContext = useAnatomyStore(
    (state) => state.selectionContext
  );

  // Previous highlighted mesh.
  const previousMeshRef = useRef(null);

  // =====================================================
  // Selection Highlight Lifecycle
  // =====================================================

  useEffect(() => {
    // ---------------------------------------------------
    // Restore previous selection
    // ---------------------------------------------------

    if (previousMeshRef.current) {
      restoreMesh(previousMeshRef.current);

      previousMeshRef.current = null;
    }

    // ---------------------------------------------------
    // No current selection
    // ---------------------------------------------------

    if (!selectionContext?.meshUUID) {
      return;
    }

    // ---------------------------------------------------
    // Resolve actual Three.js mesh
    // ---------------------------------------------------

    const mesh = getMeshByUUID(
      selectionContext.meshUUID
    );
    
    console.log(
  "[SelectionHighlight] Lookup:",
  {
    uuid: selectionContext.meshUUID,
    mesh,
    isMesh: mesh?.isMesh,
    materialInitialized:
      mesh?.userData?.materialInitialized,
  }
);
    if (!mesh) {
      console.warn(
        "[SelectionHighlight] Mesh not found:",
        selectionContext.meshUUID
      );

      return;
    }

    // ---------------------------------------------------
    // Apply highlight
    // ---------------------------------------------------

    highlightMesh(mesh);

    previousMeshRef.current = mesh;

    // ---------------------------------------------------
    // Cleanup
    // ---------------------------------------------------

    return () => {
      if (previousMeshRef.current === mesh) {
        restoreMesh(mesh);

        previousMeshRef.current = null;
      }
    };
  }, [selectionContext]);

  return null;
}