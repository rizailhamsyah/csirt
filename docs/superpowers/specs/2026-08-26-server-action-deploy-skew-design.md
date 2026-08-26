# Design: Mitigasi Server Action Deploy Skew

**Date:** 2026-08-26  
**Status:** Approved for implementation planning  
**Context:** Production Docker (`pkc-csirt`), single container; error appears mainly right after deploy/rebuild.

## Problem

Logs repeatedly show:

```text
Error: Failed to find Server Action. This request might be from an older or newer deployment.
```

Per [Next.js docs](https://nextjs.org/docs/messages/failed-to-find-server-action), Server Action IDs are non-deterministic across builds. After replacing the single Docker container, open browser tabs still hold client assets from the previous build and POST action IDs the new server cannot resolve.

This codebase has no custom `"use server"` actions. The failures are deploy skew (and possibly scanners), not a missing business feature.

## Goals

1. Users are not stuck after deploy; tab recovers via one soft-reload.
2. `Failed to find Server Action` log spam from active user tabs drops quickly after recovery.
3. Build-time encryption key for Server Actions is stable across deploys.

## Non-goals

- Multi-replica / load-balancer skew protection (Vercel-style dual-version).
- Filtering bot/scanner noise from Docker logs.
- Full Dockerfile migration to `node .next/standalone` (optional follow-up only).
- Adding new business Server Actions.

## Chosen approach

**Stable encryption key + short-lived HTML cache + client soft-reload once.**

Rejected alternatives:

- Docs-only / manual hard-refresh — does not meet UX+log goals.
- Keep previous deployment alive — too heavy for single-container ops.

## Architecture

```text
[Browser tab, old JS] --POST Server Action ID--> [New container]
        |                                              |
        | fail / mismatch                              |
        v                                              |
[DeploymentSkewGuard] --sessionStorage guard--> location.reload() once
        |
        v
[Fresh HTML (no-store)] + new JS from current build
```

Build pipeline embeds a fixed `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` so encryption material is consistent with the intended production secret (required by Next.js for self-hosting consistency).

## Changes

### 1. Encryption key (build + runtime)

- Provide `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` at **build time** in Docker (`ARG`/`ENV` before `npm run build`).
- Key: base64-encoded AES key length 16, 24, or 32 bytes.
- Store the secret on the server / CI secrets; do **not** commit the real key to git.
- Document generation example (ops only), e.g. `openssl rand -base64 32`.
- Optionally set the same env at container runtime for clarity; Next embeds the key from build output.

### 2. Cache headers (`next.config.js`)

- Ensure **document** HTML responses use short/no cache (`Cache-Control: no-store` or `max-age=0, must-revalidate`) so the next navigation/load fetches the current deployment.
- Keep long cache for hashed static assets under `/_next/static/*` (Next default).
- Preserve existing headers for `.asc` / `.pdf` downloads.

### 3. Client recovery (`DeploymentSkewGuard`)

- New small client component mounted once from `app/layout.tsx`.
- On detection of Server Action / deploy mismatch failure:
  - If `sessionStorage` flag not set: set flag, optional short toast, `location.reload()` once.
  - If flag already set: do not loop; leave user to manual refresh.
- Detection strategy (implementation may use one or combine):
  - Catch failed RSC/Server Action-related fetch/error patterns, and/or
  - Compare a public build id (`NEXT_PUBLIC_BUILD_ID` or equivalent) if exposed at build time.
- Must not suppress unrelated application errors.

### 4. Dockerfile

- Pass through build arg for `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` into the build stage before `npm run build`.
- No requirement to change CMD to standalone in this iteration.

## Error handling

| Case | Behavior |
|------|----------|
| First Server Action mismatch after deploy | Soft-reload once |
| Second failure in same tab session | Stop; no reload loop |
| Bot / scanner POST with invalid ID | May still log; out of scope |
| Key missing at build | Document as ops prerequisite; build should fail or warn clearly |

## Testing

1. Build image with a fixed encryption key; run container.
2. Open site; leave tab open.
3. Redeploy (new image / restart with new build).
4. Interact or navigate on the old tab.
5. Expect: at most one automatic reload; page works afterward; logs quiet for that user.
6. New tab / hard refresh: no error.

## Success criteria

- Post-deploy UX recovers without requiring users to know “hard refresh”.
- Active-user log spam does not continue indefinitely for the same tab after recovery.
- Encryption key is stable across normal deploys (unless intentionally rotated).

## Follow-ups (optional)

- Switch production image to Next `standalone` output runner for thinner, more consistent artifacts.
- Reverse-proxy cache rules for HTML vs static if a CDN sits in front.
