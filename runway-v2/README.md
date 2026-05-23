# Runway

> Personal MLOps + DSA + System Design learning tracker. 20-week runway from DevSecOps to MLOps-fluent, with embedded Grokking-style lessons, NeetCode 150 DSA roadmap, and animated visualizations.

**Live:** https://bchocyn.github.io/MLOps-Fundaments-learning-page/

## What this is

Runway is a personal learning OS built for one user (me). It combines:

- **Daily.dev-style feed** — a Today view that surfaces the day's focus blocks, weekly system design topic, and DSA pattern
- **20-week curriculum** — DevOps Fundamentals (W1–8) → MLOps Bridge (W9–13) → UPenn Semester (W14–20), with two daily blocks (build + understand), weekly project, and parallel SD + DSA tracks
- **Grokking-style System Design lessons** — multi-section deep dives (Requirements → Estimation → API → Data Model → Architecture → Bottlenecks) with animated SVG diagrams
- **NeetCode 150 DSA roadmap** — full problem set organized by pattern, with LeetCode links and per-problem checkboxes
- **Animated visualizations** — architecture diagrams, sequence diagrams, array/tree/linked-list step-throughs, all rendered as animated SVG
- **Claude AI assist** — optional "Ask Claude" buttons in every lesson, powered by Anthropic API (BYOK)
- **Self-hosted sync** — PocketBase on my home server via Tailscale, keeps state across phone and laptop, fully owned data

## Tech stack

- **Vite** — bundler, dev server
- **Vanilla JS modules** — no framework, just ES modules
- **CSS variables** — design tokens, no preprocessor
- **localStorage** — primary state
- **PocketBase** — optional cross-device sync
- **Anthropic API** — optional AI assist (direct browser → api.anthropic.com)

## Project structure

```
runway/
├── index.html              # Entry HTML, loads main.js
├── vite.config.js          # Bundler config (base path for Pages)
├── package.json
└── src/
    ├── main.js             # App shell, routing, event handlers
    ├── state.js            # State mgmt, localStorage, PB sync, AI calls
    ├── components/
    │   └── viz.js          # Animated SVG visual library
    ├── data/
    │   ├── curriculum.js   # 20-week MLOps plan + briefs
    │   ├── neetcode.js     # NeetCode 150 problem set
    │   ├── sd-lessons.js   # System Design Grokking-style lessons
    │   └── dsa-lessons.js  # DSA pattern lessons w/ algorithm viz
    ├── views/
    │   ├── today.js        # Today feed (Daily.dev-style)
    │   ├── views.js        # Week / Plan / DSA / SD views
    │   ├── lesson.js       # Deep lesson renderer
    │   └── settings.js     # Sync + AI config modals
    └── styles/
        ├── tokens.css      # Design tokens (colors, type, spacing)
        ├── base.css        # Reset + typography
        ├── animations.css  # Keyframes + motion patterns
        ├── components.css  # Cards, buttons, chips, tabs
        └── views.css       # Per-view layouts
```

## Local dev

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # produces dist/
```

## Deployment (GitHub Pages)

1. Run `npm run build`
2. Copy `dist/index.html` to repo root
3. Copy `dist/assets/` to repo root
4. Commit and push — Pages serves from the root of main branch

## Optional: PocketBase sync

See `pocketbase/SETUP.md` (from v1) for the self-hosted setup. Once running:

1. Open Runway → tap the sync pill in the top-right → Settings
2. Enter your PocketBase URL (Tailscale IP works)
3. Enter email + password for your PB user
4. Toggle "Cloud sync" on

State syncs every 45s, on focus, and after every checkbox change.

## Optional: AI assist

1. Get an Anthropic API key at console.anthropic.com
2. Open Settings → AI Assistant section
3. Paste your key, toggle "Enable AI assist" on
4. "Ask Claude" buttons now appear on every lesson and brief

Uses `claude-sonnet-4-5-20250929`. Key is stored only in your browser localStorage and sent only to api.anthropic.com.

## Visual library

The `viz.js` module exports reusable SVG components used inside lessons:

- `archDiagram({ nodes, edges })` — boxes connected by arrows with animated data flow (for system design)
- `sequenceDiagram({ actors, messages })` — request/response timeline (TCP handshake, OAuth, etc.)
- `arrayViz({ values, pointers, window })` — array with animated pointers and windows (for DSA)
- `treeViz({ nodes, highlight, visited })` — binary trees with traversal highlighting
- `linkedListViz({ values, pointers })` — linked list with pointer animations
- `compareTable({ headers, rows })` — comparison tables (SQL vs NoSQL, etc.)
- `callout(text, kind)` — highlighted notes (info / warning / insight)
- `quiz(question, answer)` — collapsible self-check Q&A

Lessons embed these by importing and calling them inline in `body()` functions.

## Adding content

**New system design lesson:** add a key to `SD_LESSONS` in `src/data/sd-lessons.js`. Each lesson has `title`, `subtitle`, `duration`, `difficulty`, an array of `sections`, `keyTerms`, and `sources`. Sections have a `title` and a `body()` function that returns HTML, often built from viz components.

**New DSA pattern lesson:** same shape in `src/data/dsa-lessons.js`.

**Update curriculum:** edit `CURRICULUM` in `src/data/curriculum.js`. Each week has `blockA`, `blockB` (each with a detailed `brief`), `project`, `sd` (links to a lesson topic), `dsa` (links to a DSA pattern).

## License

All Rights Reserved. Personal project — public for portfolio visibility, not for forking.

---

Built by Brandon Chocyn · Huntsville, AL · 2026
