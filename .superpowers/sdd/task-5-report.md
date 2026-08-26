Status: done

Commits:
- b7f7ab5 chore: wire Server Action encryption key and build id into Docker

Test summary:
- Dockerfile updated: build stage and production stage now accept ARG and expose ENV for NEXT_SERVER_ACTIONS_ENCRYPTION_KEY and NEXT_PUBLIC_BUILD_ID.
- Added `.env.example` with placeholders only.
- No automated runtime build/test was run in this environment; recommend ops run the provided example build command to verify image.

Concerns:
- Ensure CI/ops supply NEXT_SERVER_ACTIONS_ENCRYPTION_KEY securely at build time.
- Do not commit real secrets into repository.

Report path: .superpowers/sdd/task-5-report.md

