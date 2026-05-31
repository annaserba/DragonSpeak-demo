# DragonSpeak

DragonSpeak is a realtime gamified Mandarin learning platform built as a public demo version. AI, billing and production backend are intentionally replaced with mocks. The goal is to demonstrate frontend architecture, realtime event handling, state management and product thinking.

The demo quest is **Restaurant in Shanghai**: the player enters a restaurant, talks to an NPC seller in Mandarin, chooses an answer, unlocks words, watches fake online players, and inspects every typed event in a developer panel.

## Why This Exists

This repository is designed as a public GitHub portfolio project for Senior Frontend interviews. It focuses on architecture, state transitions, realtime UX, testable business logic, and readable component boundaries instead of paid APIs or private product code.

## Screenshots

Add screenshots after deploying or recording the demo:

- `docs/screenshots/home.png`
- `docs/screenshots/quest.png`
- `docs/screenshots/vocabulary.png`
- `docs/screenshots/inspector.png`

## Architecture

Detailed architecture artifacts:

- [Architecture overview in English](docs/architecture/ARCHITECTURE.en.md)
- [Описание архитектуры на русском](docs/architecture/ARCHITECTURE.ru.md)

```text
MockQuestSocket
  -> typed GameEvent stream
  -> buffered Zustand store
  -> gameReducer / quest state machine
  -> pages, widgets, features, entities
  -> Developer Event Inspector
```

```text
src/
  app/                 app router and providers
  pages/               route-level screens
  widgets/             composed UI blocks
  features/            user actions and feature controls
  entities/            domain data models
  shared/
    api/mock-websocket mocked realtime transport
    game-engine/       events, state, reducer, quest machine
    lib/               utilities
```

## Tech Stack

- React, TypeScript, Vite
- React Router
- Zustand
- TanStack Table
- Mock WebSocket event server
- Vitest
- Playwright dependency included for browser-level checks when expanded
- ESLint and Prettier

## Run Locally

Use the latest Vercel-supported Node runtime pinned for this repository:

```bash
nvm use
```

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run test
npm run lint
```

## Vercel

This project is configured for Vercel with `vercel.json`:

- Framework: Vite
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`
- SPA rewrites route React Router paths such as `/quest` back to `index.html`
- Node runtime: `24.x` via `package.json` engines and `.nvmrc`

## Frontend Highlights

- Realtime WebSocket event streaming
- Event-driven quest engine
- Typed state machine
- Reconnect handling
- Event buffering
- Developer Event Inspector
- EN/RU interface language switcher
- Interactive Three.js restaurant scene
- Modular frontend architecture
- Zustand store
- TanStack Table vocabulary screen
- Testable business logic
- Mock server without external API dependencies

## Demo vs Commercial Version

The public demo intentionally has no real AI, no payments, no external secrets, and no production backend. The mock WebSocket produces deterministic quest events, fake player activity, leaderboard updates, latency changes, reconnect states, and quest completion.

A commercial version could replace the mock transport with a real backend while keeping the same event contract:

- speech or chat AI service behind `NPC_MESSAGE`
- production multiplayer service behind `PLAYER_ANSWERED` and `LEADERBOARD_UPDATED`
- account and progress persistence behind `WORD_UNLOCKED`
- billing outside this public demo repository

## Interview Talking Points

- Why quest state is derived from events instead of direct UI mutation
- How event buffering protects UI rendering during bursts
- How the reducer stays unit-testable
- How the mock socket mirrors production integration boundaries
- Why Feature-Sliced-style folders improve ownership and navigation
- How the Developer Event Inspector helps debugging, QA, and stakeholder demos
