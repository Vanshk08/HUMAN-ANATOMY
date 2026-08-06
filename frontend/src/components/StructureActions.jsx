import React from "react";
import {
  FiRotateCcw,
  FiMinimize2,
} from "react-icons/fi";
import { motion } from "framer-motion";

import { useAnatomyStore } from "../store/useAnatomyStore";

export default function StructureActions() {
  // =====================================================
  // Hidden Structure State
  // =====================================================

  const hiddenStructureUUIDs = useAnatomyStore(
    (state) => state.hiddenStructureUUIDs
  );

  const restoreAllStructures = useAnatomyStore(
    (state) => state.restoreAllStructures
  );

  // =====================================================
  // Isolation State
  // Sprint 8.6.5C
  // =====================================================

  const isolatedStructureUUID = useAnatomyStore(
    (state) => state.isolatedStructureUUID
  );

  const clearIsolation = useAnatomyStore(
    (state) => state.clearIsolation
  );

  // =====================================================
  // Derived State
  // =====================================================

  const hiddenCount =
    hiddenStructureUUIDs.length;

  const isolationActive =
    isolatedStructureUUID !== null;

  // =====================================================
  // Nothing To Show
  // =====================================================

  if (
    hiddenCount === 0 &&
    !isolationActive
  ) {
    return null;
  }

  // =====================================================
  // Actions
  // =====================================================

  function handleRestoreAll() {
    restoreAllStructures();
  }

  function handleExitIsolation() {
    clearIsolation();
  }

  // =====================================================
  // Shared Button Style
  // =====================================================

  const buttonClassName = `
    flex
    items-center
    gap-2
    rounded-xl
    border
    border-gray-200/60
    bg-white/90
    px-3
    py-2
    text-xs
    font-semibold
    text-gray-600
    shadow-premium
    backdrop-blur-md
    transition-colors

    hover:bg-gray-100
    hover:text-gray-900

    dark:border-dark-border/60
    dark:bg-dark-panel/90
    dark:text-gray-400
    dark:hover:bg-white/5
    dark:hover:text-white

    pointer-events-auto
    cursor-pointer
  `;

  // =====================================================
  // Render
  // =====================================================

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        flex
        items-center
        gap-2
        pointer-events-auto
      "
    >
      {/* =================================================
          Exit Isolation
      ================================================= */}

      {isolationActive && (
        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          type="button"
          onClick={handleExitIsolation}
          className={buttonClassName}
          title="Exit structure isolation"
        >
          <FiMinimize2 size={14} />

          <span>
            Exit Isolation
          </span>
        </motion.button>
      )}

      {/* =================================================
          Restore Hidden
      ================================================= */}

      {hiddenCount > 0 && (
        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          type="button"
          onClick={handleRestoreAll}
          className={buttonClassName}
          title="Restore all hidden structures"
        >
          <FiRotateCcw size={14} />

          <span>
            Restore Hidden
          </span>

          <span
            className="
              flex
              min-w-5
              items-center
              justify-center
              rounded-full
              bg-gray-100
              px-1.5
              py-0.5
              text-[9px]
              font-bold
              text-gray-500

              dark:bg-white/10
              dark:text-gray-300
            "
          >
            {hiddenCount}
          </span>
        </motion.button>
      )}
    </motion.div>
  );
}