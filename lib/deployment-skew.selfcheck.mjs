import assert from "node:assert/strict";

// Duplicate the pure functions here so Node can run the self-check without ts loader.
function isServerActionSkewError(message) {
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
  if (!stored || !current) return false;
  return stored !== current;
}

assert.equal(
  isServerActionSkewError(
    "Failed to find Server Action. This request might be from an older or newer deployment.",
  ),
  true,
);
assert.equal(isServerActionSkewError("NetworkError"), false);
assert.equal(shouldReloadOnce(false), true);
assert.equal(shouldReloadOnce(true), false);
assert.equal(buildIdChanged("a", "b"), true);
assert.equal(buildIdChanged("a", "a"), false);
assert.equal(buildIdChanged(null, "b"), false);
console.log("deployment-skew selfcheck ok");

