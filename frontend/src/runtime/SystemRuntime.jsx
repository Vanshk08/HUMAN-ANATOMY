import { anatomyManifest } from "../systems/anatomyManifest";
import SystemLoader from "../components/SystemLoader";

/**
 * System Runtime
 *
 * Responsible for mounting all enabled
 * anatomical systems.
 */
export default function SystemRuntime() {
  console.group("SYSTEM RUNTIME");

  console.log("Manifest:", anatomyManifest);

  const skeleton = anatomyManifest.find(
    (system) => system.id === "skeleton"
  );

  console.log("Skeleton system:", skeleton);

  console.groupEnd();

  return <SystemLoader system={skeleton} />;
}