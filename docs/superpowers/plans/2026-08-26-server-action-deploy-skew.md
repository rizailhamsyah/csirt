# Server Action Deploy Skew Mitigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** After a single-container Docker redeploy, open tabs recover with one soft-reload and Server Action mismatch log spam stops for those users.

**Architecture:** Stable `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` at Docker build time; HTML responses `Cache-Control: no-store`; small client `DeploymentSkewGuard` compares server build id + catches Server Action error text, then reloads once via `sessionStorage` guard.

**Tech Stack:** Next.js 16 App Router, React 19, Docker multi-stage build, Node assert self-check (no new test framework).

## Global Constraints

- Do not commit real encryption keys to git; only `.env.example` placeholders.
- Do not add business Server Actions (`"use server"`).
- Do not migrate Dockerfile to standalone runner in this plan.
- Soft-reload at most once per browser tab session (`sessionStorage`).
- Prefer fewest files; pure logic in `lib/` for a runnable assert check.
- Spec: `docs/superpowers/specs/2026-08-26-server-action-deploy-skew-design.md`.

---

## File map

| File | Responsibility |
|------|----------------|
| `lib/deployment-skew.ts` | Pure helpers: storage key, error detection, shouldReloadOnce |
| `lib/deployment-skew.selfcheck.mjs` | Node assert self-check for helpers |
| `app/api/build-id/route.ts` | Returns current `NEXT_PUBLIC_BUILD_ID` JSON |
| `components/DeploymentSkewGuard.tsx` | Client: poll/fetch build-id + error listeners → reload once |
| `app/layout.tsx` | Mount `DeploymentSkewGuard` |
| `next.config.js` | Document `Cache-Control: no-store`; keep long cache for `/_next/static` |
| `Dockerfile` | `ARG`/`ENV` encryption key + build id at build stage |
| `.env.example` | Document required env vars (no secrets) |

---

### Task 1: Pure skew helpers + self-check

**Files:**
- Create: `lib/deployment-skew.ts`
- Create: `lib/deployment-skew.selfcheck.mjs`
- Modify: `package.json` (add script `check:skew`)

**Interfaces:**
- Consumes: none
- Produces:
  - `export const SKEW_RELOAD_FLAG_KEY = "csirt-skew-reloaded"`
  - `export const SKEW_BUILD_ID_KEY = "csirt-build-id"`
  - `export function isServerActionSkewError(message: string): boolean`
  - `export function shouldReloadOnce(alreadyReloaded: boolean): boolean`
  - `export function buildIdChanged(stored: string | null, current: string | null): boolean`

- [ ] **Step 1: Write helpers**

```ts
// lib/deployment-skew.ts
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
```

- [ ] **Step 2: Write self-check**

```js
// lib/deployment-skew.selfcheck.mjs
import assert from "node:assert/strict";
import {
  isServerActionSkewError,
  shouldReloadOnce,
  buildIdChanged,
} from "./deployment-skew.ts";

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
```

If the project cannot import `.ts` from `.mjs` via Node without a loader, instead duplicate the three pure functions inline inside the `.mjs` file for the assert check only, and keep the TypeScript module as the source of truth used by the app — OR use:

```json
"check:skew": "node --experimental-strip-types lib/deployment-skew.selfcheck.mjs"
```

(Node 20+ / 22 strip-types). Prefer `node --experimental-strip-types` with importing from `./deployment-skew.ts`.

- [ ] **Step 3: Add npm script and run self-check**

In `package.json` scripts:

```json
"check:skew": "node --experimental-strip-types lib/deployment-skew.selfcheck.mjs"
```

Run: `npm run check:skew`  
Expected: `deployment-skew selfcheck ok` and exit 0.

- [ ] **Step 4: Commit**

```bash
git add lib/deployment-skew.ts lib/deployment-skew.selfcheck.mjs package.json
git commit -m "feat: add deployment skew helper self-check"
```

---

### Task 2: Build-id API route

**Files:**
- Create: `app/api/build-id/route.ts`

**Interfaces:**
- Consumes: `process.env.NEXT_PUBLIC_BUILD_ID`
- Produces: `GET /api/build-id` → `200` JSON `{ "buildId": string }`  
  If env missing, return `{ "buildId": "unknown" }` (still 200 so client does not treat as network failure).

- [ ] **Step 1: Create route**

```ts
// app/api/build-id/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  const buildId = process.env.NEXT_PUBLIC_BUILD_ID || "unknown";
  return NextResponse.json(
    { buildId },
    {
      headers: {
        "Cache-Control": "no-store, must-revalidate",
      },
    },
  );
}
```

- [ ] **Step 2: Smoke-check locally (dev)**

Run: `npm run dev` then `curl -s http://localhost:3000/api/build-id`  
Expected: JSON containing `"buildId"` (may be `"unknown"` until env set).

- [ ] **Step 3: Commit**

```bash
git add app/api/build-id/route.ts
git commit -m "feat: expose build id endpoint for skew detection"
```

---

### Task 3: DeploymentSkewGuard + layout mount

**Files:**
- Create: `components/DeploymentSkewGuard.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: helpers from `lib/deployment-skew.ts`; `GET /api/build-id`
- Produces: client component that reloads once when build id changes or Server Action skew error is seen

- [ ] **Step 1: Implement guard**

```tsx
// components/DeploymentSkewGuard.tsx
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
```

- [ ] **Step 2: Mount in root layout**

```tsx
// app/layout.tsx — inside <body>, before {children}
import { DeploymentSkewGuard } from "@/components/DeploymentSkewGuard";

// ...
<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
  <DeploymentSkewGuard />
  {children}
</body>
```

- [ ] **Step 3: Manual smoke**

1. `NEXT_PUBLIC_BUILD_ID=build-a npm run dev`
2. Open home; confirm `sessionStorage` has `csirt-build-id=build-a`.
3. Stop server; restart with `NEXT_PUBLIC_BUILD_ID=build-b npm run dev`.
4. Focus the old tab (or switch away/back).
5. Expected: one automatic reload; after reload, page works; `csirt-skew-reloaded=1`.

- [ ] **Step 4: Commit**

```bash
git add components/DeploymentSkewGuard.tsx app/layout.tsx
git commit -m "feat: soft-reload once on deploy skew"
```

---

### Task 4: HTML cache headers in next.config.js

**Files:**
- Modify: `next.config.js`

**Interfaces:**
- Consumes: existing `headers()` array
- Produces: document paths get `Cache-Control: no-store, must-revalidate`; `/_next/static/:path*` keeps long immutable cache

- [ ] **Step 1: Add header rules at the start of the returned array (before the catch-all security headers is fine; order by specificity)**

Add these two entries inside `headers()` return value (keep existing security + `.asc`/`.pdf` rules):

```js
{
  source: "/_next/static/:path*",
  headers: [
    {
      key: "Cache-Control",
      value: "public, max-age=31536000, immutable",
    },
  ],
},
{
  source: "/:path*",
  headers: [
    {
      key: "Cache-Control",
      value: "no-store, must-revalidate",
    },
  ],
},
```

Note: Next applies matching header sources; static assets under `/_next/static` must keep immutable caching. If both match, prefer verifying with curl that `/_next/static/...` still has long `max-age`. If the broad `/:path*` overrides static in practice, narrow document caching by removing `Cache-Control` from `/:path*` and instead set `Cache-Control: no-store` only on the `app/api/build-id` route (already done) plus rely on soft-reload — but attempt the two-rule approach first and verify.

- [ ] **Step 2: Verify with production build**

```bash
npm run build && npm start
# in another terminal:
curl -sI http://localhost:3000/ | grep -i cache-control
curl -sI http://localhost:3000/api/build-id | grep -i cache-control
```

Expected: both show `no-store` (or equivalent).

- [ ] **Step 3: Commit**

```bash
git add next.config.js
git commit -m "fix: avoid caching HTML documents across deploys"
```

---

### Task 5: Dockerfile + .env.example ops wiring

**Files:**
- Modify: `Dockerfile`
- Create or modify: `.env.example`

**Interfaces:**
- Consumes: build args `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`, `NEXT_PUBLIC_BUILD_ID`
- Produces: build stage embeds both before `npm run build`; production stage may receive same env at runtime for clarity

- [ ] **Step 1: Update Dockerfile build stage**

After `WORKDIR /app` in the **build** stage, before `RUN npm run build`:

```dockerfile
# Stable Server Actions encryption key (base64 AES 16/24/32 bytes). Required at BUILD time.
ARG NEXT_SERVER_ACTIONS_ENCRYPTION_KEY
ENV NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=$NEXT_SERVER_ACTIONS_ENCRYPTION_KEY

# Public build id for client skew detection (change every image build).
ARG NEXT_PUBLIC_BUILD_ID
ENV NEXT_PUBLIC_BUILD_ID=$NEXT_PUBLIC_BUILD_ID
```

In **production** stage, before `CMD`:

```dockerfile
ARG NEXT_SERVER_ACTIONS_ENCRYPTION_KEY
ENV NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=$NEXT_SERVER_ACTIONS_ENCRYPTION_KEY
ARG NEXT_PUBLIC_BUILD_ID
ENV NEXT_PUBLIC_BUILD_ID=$NEXT_PUBLIC_BUILD_ID
```

Do not hardcode secret values in the Dockerfile.

- [ ] **Step 2: Add `.env.example` entries**

```env
# Generate once and reuse across deploys: openssl rand -base64 32
NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=

# Change every deploy/image build, e.g. git sha or timestamp
NEXT_PUBLIC_BUILD_ID=
```

- [ ] **Step 3: Document build command in a short comment block at top of Dockerfile or in README snippet (one paragraph)**

Example ops build:

```bash
export NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="$(openssl rand -base64 32)" # only first time; then reuse
export NEXT_PUBLIC_BUILD_ID="$(date -u +%Y%m%d%H%M%S)"
docker build \
  --build-arg NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="$NEXT_SERVER_ACTIONS_ENCRYPTION_KEY" \
  --build-arg NEXT_PUBLIC_BUILD_ID="$NEXT_PUBLIC_BUILD_ID" \
  -t pkc-csirt .
```

If `.gitignore` ignores `.env.example`, still add the keys to whatever env template the repo already uses.

- [ ] **Step 4: Commit**

```bash
git add Dockerfile .env.example
git commit -m "chore: wire Server Action encryption key and build id into Docker"
```

---

### Task 6: End-to-end verification checklist

**Files:** none (ops verification only)

- [ ] **Step 1: Run unit self-check**

Run: `npm run check:skew`  
Expected: ok.

- [ ] **Step 2: Local skew simulation**

1. `NEXT_PUBLIC_BUILD_ID=v1 NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=<same-key> npm run build && npm start`
2. Open site, leave tab open.
3. Stop; rebuild with `NEXT_PUBLIC_BUILD_ID=v2` and **same** encryption key; start again.
4. Focus old tab → expect one reload, then healthy page.
5. Confirm second focus does not reload-loop (`csirt-skew-reloaded` already set; after successful reload you may clear flag only on full new session — current design keeps flag for the session, which is correct to prevent loops).

- [ ] **Step 3: Confirm no new Server Action business code**

Run: `rg '"use server"' --glob '*.{ts,tsx}'`  
Expected: no matches (or only unrelated if any appear later — this plan must not add any).

- [ ] **Step 4: Final commit only if verification prompted doc tweaks; otherwise done**

If README/ops notes needed:

```bash
git add README.md
git commit -m "docs: note deploy env for Server Action skew mitigation"
```

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| Stable encryption key at build time | Task 5 |
| HTML short/no cache | Task 4 |
| Client soft-reload once | Task 3 (+ helpers Task 1) |
| Build id detection | Task 2 + Task 3 |
| Dockerfile ARG/ENV | Task 5 |
| No standalone migration | Global Constraints |
| No business Server Actions | Global Constraints + Task 6 |
| Testing after redeploy | Task 6 |

Placeholder scan: none intentional.  
Type consistency: `SKEW_*` keys and helper names shared across Task 1 and Task 3.
