import { useAnatomyStore } from "../store/useAnatomyStore";

export default function SelectedStructurePanel() {
  // =====================================================
  // Canonical Selection State
  // =====================================================

  const selectionContext = useAnatomyStore(
    (state) => state.selectionContext
  );

  const clearSelectionContext = useAnatomyStore(
    (state) => state.clearSelectionContext
  );

  // =====================================================
  // Structure Actions
  // Sprint 8.6
  // =====================================================

  const hideStructure = useAnatomyStore(
    (state) => state.hideStructure
  );

  const isolateStructure = useAnatomyStore(
    (state) => state.isolateStructure
  );

  const isolatedStructureUUID = useAnatomyStore(
    (state) => state.isolatedStructureUUID
  );

  // =====================================================
  // Nothing Selected
  // =====================================================

  if (!selectionContext?.structure) {
    return null;
  }

  // =====================================================
  // Selection Data
  // =====================================================

  const {
    meshUUID,
    structure,
    system,
    subsystem,
  } = selectionContext;

  const structureName =
    structure.displayName ||
    structure.name ||
    structure.id ||
    "Unknown Structure";

  const isCurrentStructureIsolated =
    isolatedStructureUUID === meshUUID;

  // =====================================================
  // Hide Structure
  // =====================================================

  function handleHideStructure() {
    if (!meshUUID) {
      return;
    }

    hideStructure(meshUUID);

    // Hidden structure can no longer remain selected.
    clearSelectionContext();
  }

  // =====================================================
  // Isolate Structure
  // Sprint 8.6.5C
  // =====================================================

  function handleIsolateStructure() {
    if (!meshUUID) {
      return;
    }

    isolateStructure(meshUUID);

    // Do NOT clear selection.
    // The isolated structure remains visible and selected.
  }

  // =====================================================
  // Render
  // =====================================================

  return (
    <div
      className="
        absolute
        right-6
        top-24
        z-30
        w-72
        rounded-2xl
        border
        border-gray-200
        bg-white/95
        p-5
        shadow-xl
        backdrop-blur-md

        dark:border-gray-700
        dark:bg-neutral-900/95
        dark:text-white
      "
    >
      {/* =================================================
          Header
      ================================================= */}

      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Selected Structure
          </p>

          <h2 className="mt-1 text-lg font-semibold">
            {structureName}
          </h2>
        </div>

        <button
          type="button"
          onClick={clearSelectionContext}
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            text-gray-400
            transition
            hover:bg-gray-100
            hover:text-gray-700

            dark:hover:bg-neutral-800
            dark:hover:text-white
          "
          aria-label="Close selected structure panel"
        >
          ×
        </button>
      </div>

      {/* =================================================
          System
      ================================================= */}

      <div className="border-t border-gray-100 py-3 dark:border-gray-800">
        <p className="text-xs uppercase tracking-wide text-gray-400">
          System
        </p>

        <p className="mt-1 text-sm font-medium capitalize">
          {system || "Unknown"}
        </p>
      </div>

      {/* =================================================
          Subsystem
      ================================================= */}

      <div className="border-t border-gray-100 py-3 dark:border-gray-800">
        <p className="text-xs uppercase tracking-wide text-gray-400">
          Subsystem
        </p>

        <p className="mt-1 text-sm font-medium capitalize">
          {subsystem || "—"}
        </p>
      </div>

      {/* =================================================
          Structure ID
      ================================================= */}

      {structure.id && (
        <div className="border-t border-gray-100 py-3 dark:border-gray-800">
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Structure ID
          </p>

          <p className="mt-1 break-words text-xs text-gray-500 dark:text-gray-400">
            {structure.id}
          </p>
        </div>
      )}

      {/* =================================================
          Structure Actions
          Sprint 8.6.5C
      ================================================= */}

      <div className="border-t border-gray-100 pt-4 dark:border-gray-800">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Actions
        </p>

        <div className="flex flex-col gap-2">

          {/* Isolate */}

          <button
            type="button"
            onClick={handleIsolateStructure}
            disabled={isCurrentStructureIsolated}
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-2.5
              text-sm
              font-medium
              text-gray-700
              transition

              hover:bg-gray-100
              hover:text-gray-900

              disabled:cursor-default
              disabled:opacity-50

              dark:border-gray-700
              dark:text-gray-300
              dark:hover:bg-neutral-800
              dark:hover:text-white
            "
          >
            {isCurrentStructureIsolated
              ? "Structure Isolated"
              : "Isolate Structure"}
          </button>

          {/* Hide */}

          <button
            type="button"
            onClick={handleHideStructure}
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-2.5
              text-sm
              font-medium
              text-gray-700
              transition

              hover:bg-gray-100
              hover:text-gray-900

              dark:border-gray-700
              dark:text-gray-300
              dark:hover:bg-neutral-800
              dark:hover:text-white
            "
          >
            Hide Structure
          </button>

        </div>
      </div>
    </div>
  );
}