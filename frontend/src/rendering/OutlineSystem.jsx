import { EffectComposer, Outline } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useAnatomyStore } from "../store/useAnatomyStore";

export default function OutlineSystem() {
  const selectedStructure = useAnatomyStore(
    (state) => state.selectedStructure
  );

  return (
    <EffectComposer multisampling={4} autoClear={false}>
      <Outline
        blendFunction={BlendFunction.SCREEN}
        selection={selectedStructure ? [selectedStructure] : []}

        edgeStrength={8}
        pulseSpeed={0}

        visibleEdgeColor="#4da6ff"
        hiddenEdgeColor="#4da6ff"

        width={1000}
        xRay={false}

        blur={false}
      />
    </EffectComposer>
  );
}