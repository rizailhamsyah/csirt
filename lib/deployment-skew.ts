export const SKEW_RELOAD_FLAG_KEY = "csirt-skew-reloaded";
export const SKEW_BUILD_ID_KEY = "csirt-build-id";

export function isServerActionSkewError(message: string): boolean {
  const m = message.toLowerCase();
  return (
    m.includes("failed to find server action") ||
    (m.includes("server action") && m.includes("older or newer deployment"))
  );
}

export function shouldReloadOnce(alreadyReloaded: boolean): boolean {
  return !alreadyReloaded;
}

export function buildIdChanged(
  stored: string | null,
  current: string | null,
): boolean {
  if (!stored || !current) return false;
  return stored !== current;
}

