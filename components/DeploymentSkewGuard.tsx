"use client";

import { useEffect } from "react";
import {
  SKEW_BUILD_ID_KEY,
  SKEW_RELOAD_FLAG_KEY,
  buildIdChanged,
  isServerActionSkewError,
  shouldReloadOnce,
} from "@/lib/deployment-skew";

function markReloadedAndReload() {
  const already = sessionStorage.getItem(SKEW_RELOAD_FLAG_KEY) === "1";
  if (!shouldReloadOnce(already)) return;
  sessionStorage.setItem(SKEW_RELOAD_FLAG_KEY, "1");
  window.location.reload();
}

export function DeploymentSkewGuard() {
  useEffect(() => {
    let cancelled = false;

    async function checkBuildId() {
      try {
        const res = await fetch("/api/build-id", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { buildId?: string };
        const current = data.buildId ?? null;
        if (!current || current === "unknown") return;
        if (cancelled) return;

        const stored = sessionStorage.getItem(SKEW_BUILD_ID_KEY);
        if (!stored) {
          sessionStorage.setItem(SKEW_BUILD_ID_KEY, current);
          return;
        }

        if (buildIdChanged(stored, current)) {
          sessionStorage.setItem(SKEW_BUILD_ID_KEY, current);
          markReloadedAndReload();
        }
      } catch {
        // ignore network blips
      }
    }

    void checkBuildId();
    const onFocus = () => void checkBuildId();
    const onVisible = () => {
      if (document.visibilityState === "visible") void checkBuildId();
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message =
        typeof reason === "string"
          ? reason
          : reason instanceof Error
            ? reason.message
            : String(reason ?? "");
      if (isServerActionSkewError(message)) markReloadedAndReload();
    };

    const onError = (event: ErrorEvent) => {
      if (isServerActionSkewError(event.message || "")) markReloadedAndReload();
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("unhandledrejection", onRejection);
    window.addEventListener("error", onError);

    return () => {
      cancelled = true;
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("unhandledrejection", onRejection);
      window.removeEventListener("error", onError);
    };
  }, []);

  return null;
}
