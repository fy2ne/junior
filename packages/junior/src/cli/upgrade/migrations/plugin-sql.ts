import {
  migratePluginSchemas,
  type PluginMigrationSummary,
} from "@/chat/plugins/migrations";
import { createPluginCatalogRuntime } from "@/chat/plugins/registry";
import { resolveUpgradePluginCatalog } from "./upgrade-plugins";
import { memoryMigrationRoot } from "@/chat/memory/migrations";
import type { MigrationSummary, UpgradeContext } from "../types";

/** Apply SQL schema migrations owned by explicitly enabled plugins. */
export async function migratePluginsToSql(
  context: UpgradeContext,
  options: {
    onPluginMigration?: (summary: PluginMigrationSummary) => void;
  } = {},
): Promise<MigrationSummary> {
  const pluginCatalog = createPluginCatalogRuntime();
  pluginCatalog.setConfig(await resolveUpgradePluginCatalog(context));
  const pluginRoots = pluginCatalog
    .getMigrationRoots()
    .filter((root) => root.pluginName !== "memory");
  return await migratePluginSchemas(
    context.sqlExecutor,
    [memoryMigrationRoot(), ...pluginRoots],
    options,
  );
}
