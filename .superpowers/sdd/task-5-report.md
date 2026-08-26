Status: pending

Commits:
- chore: wire Server Action encryption key and build id into Docker

Test summary:
- Updated Dockerfile to accept build args and set env for NEXT_SERVER_ACTIONS_ENCRYPTION_KEY and NEXT_PUBLIC_BUILD_ID.
- Added .env.example with placeholders.
- No runtime tests performed here; manual build recommended.

Concerns:
- Ensure CI/ops supply NEXT_SERVER_ACTIONS_ENCRYPTION_KEY securely at build time.
- Do not commit real secrets into repository.

Report path: .superpowers/sdd/task-5-report.md

