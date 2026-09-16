# Core features

Core features use the plugin runtime contract for shared execution context. They do not use plugin package discovery or the installed plugin catalog.

`registration.ts` is the source of truth for core feature names and enabled registrations. Runtime consumers must join core features with installed plugins through `runtimeFeatureRegistrations()`. Stored Conversation events also include disabled core features so old events remain readable.

An installed plugin must not use a core feature name.
