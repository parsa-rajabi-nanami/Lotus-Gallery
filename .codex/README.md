# Project Codex setup

This project keeps a local copy of the Codex skills that match its current
stack and workflow: React/Vite, Tailwind UI, GSAP animation, frontend testing,
performance, accessibility, and focused verification.

## Included skills

- `frontend-app-builder`, `frontend-testing-debugging`, `react-best-practices`
- `gsap-core`, `gsap-react`, `gsap-performance`, `gsap-scrolltrigger`,
  `gsap-timeline`, `gsap-utils`
- `ui-ux-pro-max`, `web-design-guidelines`
- `investigate-first`, `lean-build`, `surgical-patch`, `verify-and-stop`

## Runtime plugins

The enabled Codex plugins remain installed and configured at user scope. The
project does not vendor plugin runtimes, credentials, MCP configuration, or
desktop integrations into Git. The relevant current plugin is:

- `build-web-apps@openai-official`

The local skills above are the portable project guidance extracted from that
plugin and the user-level Codex skill library.
