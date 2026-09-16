import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { PluginMigrationRoot } from "@/chat/plugins/migrations";

/** Return the packaged Memory migration root while preserving its journal name. */
export function memoryMigrationRoot(): PluginMigrationRoot {
  const moduleDir = dirname(fileURLToPath(import.meta.url));
  const packageRoot =
    basename(moduleDir) === "dist"
      ? dirname(moduleDir)
      : basename(dirname(moduleDir)) === "dist"
        ? resolve(moduleDir, "../..")
        : resolve(moduleDir, "../../../");
  return {
    dir: join(packageRoot, "memory-migrations"),
    pluginName: "memory",
  };
}
