import { useAnatomyStore } from "../store/useAnatomyStore";

export default function SelectedStructurePanel() {
  // =====================================================
  // Canonical Selection State
  // Sprint 8.5.4
  // =====================================================

  const selectionContext = useAnatomyStore(
    (state) => state.selectionContext
  );

  const clearSelectionContext = useAnatomyStore(
    (state) => state.clearSelectionContext
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
    structure,
    system,
    subsystem,
  } = selectionContext;

  const structureName =
    structure.displayName ||
    structure.name ||
    structure.id ||
    "Unknown Structure";

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
      {/* Header */}
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

      {/* System */}
      <div className="border-t border-gray-100 py-3 dark:border-gray-800">
        <p className="text-xs uppercase tracking-wide text-gray-400">
          System
        </p>

        <p className="mt-1 text-sm font-medium capitalize">
          {system || "Unknown"}
        </p>
      </div>

      {/* Subsystem */}
      <div className="border-t border-gray-100 py-3 dark:border-gray-800">
        <p className="text-xs uppercase tracking-wide text-gray-400">
          Subsystem
        </p>

        <p className="mt-1 text-sm font-medium capitalize">
          {subsystem || "—"}
        </p>
      </div>

      {/* Structure ID */}
      {structure.id && (
        <div className="border-t border-gray-100 pt-3 dark:border-gray-800">
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Structure ID
          </p>

          <p className="mt-1 break-words text-xs text-gray-500 dark:text-gray-400">
            {structure.id}
          </p>
        </div>
      )}
    </div>
  );
}