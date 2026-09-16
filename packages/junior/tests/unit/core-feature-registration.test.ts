import { defineJuniorPlugin } from "@sentry/junior-plugin-api";
import { afterEach, describe, expect, it } from "vitest";
import { setBriefsConfig } from "@/chat/briefs/registration";
import {
  allCoreFeatureRegistrations,
  coreFeatureRegistrations,
} from "@/chat/core-features/registration";
import { validatePlugins } from "@/chat/plugins/agent-hooks";

const briefsPlugin = defineJuniorPlugin({
  manifest: {
    name: "briefs",
    displayName: "Briefs",
    description: "Conflicting Briefs plugin",
  },
});

afterEach(() => {
  setBriefsConfig(undefined);
});

describe("core feature registration", () => {
  it("enables Briefs from app config but keeps its registration available", () => {
    expect(coreFeatureRegistrations()).toEqual([]);
    expect(
      allCoreFeatureRegistrations().map((feature) => feature.manifest.name),
    ).toEqual(["briefs"]);

    setBriefsConfig({ enabled: true });

    expect(
      coreFeatureRegistrations().map((feature) => feature.manifest.name),
    ).toEqual(["briefs"]);
  });

  it("reserves core feature names", () => {
    expect(() => validatePlugins([briefsPlugin])).toThrow(
      'Plugin registration name "briefs" is reserved by core',
    );
  });
});
