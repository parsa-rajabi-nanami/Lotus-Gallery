# Codex plugins relevant to Lotus Gallery

The project uses the following user-level plugin for its current frontend
workflow:

- `build-web-apps@openai-official`: React/Vite implementation, debugging, and
  React performance guidance.

The following globally enabled plugins were reviewed and intentionally left at
user scope because this repository does not use their runtime capabilities:

- documents, pdf, spreadsheets, presentations, template-creator
- codex-app-tools, computer-use, unified-computer-use, visualize
- sentry, remotion, supabase, vercel, github, codex-security

Keeping those integrations user-scoped avoids copying credentials, desktop
runtime files, MCP endpoints, or unrelated plugin code into the repository.
