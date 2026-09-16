import type { PluginRegistration } from "@sentry/junior-plugin-api";
import { isBriefsEnabled } from "@/chat/briefs/registration";
import { briefsFeatureRegistration } from "@/chat/briefs/task";

const coreFeatures = [
  { isEnabled: isBriefsEnabled, registration: briefsFeatureRegistration },
];
/** Return all core registrations, including disabled features. */
export function allCoreFeatureRegistrations(): PluginRegistration[] {
  return coreFeatures.map((feature) => feature.registration);
}

/** Return enabled core feature registrations. */
export function coreFeatureRegistrations(): PluginRegistration[] {
  return coreFeatures
    .filter((feature) => feature.isEnabled())
    .map((feature) => feature.registration);
}

/** Return enabled core features followed by installed plugins. */
export function runtimeFeatureRegistrations(
  plugins: PluginRegistration[],
): PluginRegistration[] {
  return [...coreFeatureRegistrations(), ...plugins];
}

/** Reject a plugin that claims a core feature name. */
export function assertNoCoreFeatureNameCollisions(
  plugins: PluginRegistration[],
): void {
  const coreNames = new Set(
    allCoreFeatureRegistrations().map((feature) => feature.manifest.name),
  );
  for (const plugin of plugins) {
    const name = plugin.manifest.name;
    if (coreNames.has(name)) {
      throw new Error(`Plugin registration name "${name}" is reserved by core`);
    }
  }
}
