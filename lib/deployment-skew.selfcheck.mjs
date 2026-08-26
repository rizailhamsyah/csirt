import assert from "node:assert/strict";

// Duplicate the pure functions here so Node can run the self-check without ts loader.
// Duplication intentional: Node can't strip TypeScript types at runtime.
function isServerActionSkewError(message) {
  if (typeof message !== "string") return false;
  const m = message.toLowerCase();
  return (
    m.includes("failed to find server action") ||
    (m.includes("server action") && m.includes("older or newer deployment"))
  );
}

function shouldReloadOnce(alreadyReloaded) {
  return !alreadyReloaded;
}

function buildIdChanged(stored, current) {
  // explicit null checks so empty-string build ids are handled correctly
  if (stored === null || current === null) return false;
  return stored !== current;
}

assert.equal(
  isServerActionSkewError(
    "Failed to find Server Action. This request might be from an older or newer deployment.",
  ),
  true,
);
assert.equal(isServerActionSkewError("NetworkError"), false);
assert.equal(isServerActionSkewError(null), false);
assert.equal(shouldReloadOnce(false), true);
assert.equal(shouldReloadOnce(true), false);
assert.equal(buildIdChanged("a", "b"), true);
assert.equal(buildIdChanged("a", "a"), false);
assert.equal(buildIdChanged(null, "b"), false);
console.log("deployment-skew selfcheck ok");

