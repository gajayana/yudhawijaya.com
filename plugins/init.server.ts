// No-op: CV is no longer needed at runtime.
// Server API routes fetch directly from Redis cache.
// Cache is pre-warmed via pnpm sb:cache:all.
export default defineNuxtPlugin(() => {});
