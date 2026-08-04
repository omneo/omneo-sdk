# CLAUDE.md

All repository guidance lives in @AGENTS.md — architecture, resource patterns, code style, git/release rules, and testing.

⚠️ Critical: every test in this repo is a live integration test against a real tenant. Run targeted files only (`npx vitest run <path>`) — never `npm test` unless explicitly asked. Details in AGENTS.md.
