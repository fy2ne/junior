import type { PluginRegistration } from "@sentry/junior-plugin-api";
import { isBriefsEnabled } from "@/chat/briefs/registration";
import { briefsTaskRegistration } from "@/chat/briefs/task";

const coreFeatures = [
  { isEnabled: isBriefsEnabled, registration: briefsTaskRegistration },
];
const CORE_FEATURE_NAMES = new Set(
  coreFeatures.map((feature) => feature.registration.manifest.name),
);

/** Return enabled core feature registrations. */
export function coreFeatureRegistrations(): PluginRegistration[] {
  return coreFeatures
    .filter((feature) => feature.isEnabled())
    .map((feature) => feature.registration);
}

/** Return core features followed by installed plugins. */
export function runtimeFeatureRegistrations(
  plugins: PluginRegistration[],
  options: { includeDisabled?: boolean } = {},
): PluginRegistration[] {
  const coreRegistrations = options.includeDisabled
    ? coreFeatures.map((feature) => feature.registration)
    : coreFeatureRegistrations();
  return [...coreRegistrations, ...plugins];
}

/** Reject a plugin that claims a core feature name. */
export function assertNoCoreFeatureNameCollisions(
  plugins: PluginRegistration[],
): void {
  for (const plugin of plugins) {
    const name = plugin.manifest.name;
    if (CORE_FEATURE_NAMES.has(name)) {
      throw new Error(`Plugin registration name "${name}" is reserved by core`);
    }
  }
}
