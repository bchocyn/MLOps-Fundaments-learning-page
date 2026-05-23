# Runway — Personal MLOps Learning Tracker

A self-hosted, sync-capable learning tracker for Brandon's 20-week MLOps runway leading into UPenn MAS-CS.

Single HTML file. Works in any browser. Installs to iPhone home screen as a PWA. Syncs across devices via your own PocketBase. Eventually wrap-able as a native Windows/Mac/Linux app via Tauri.

---

## What's in this folder

| File | Purpose |
|---|---|
| `runway.html` | The app. Single self-contained HTML. Open in any browser. |
| `pocketbase/docker-compose.yml` | PocketBase server (Docker) |
| `pocketbase/pb_migrations/` | Auto-applied schema for the `state` collection |
| `pocketbase/SETUP.md` | Sync server setup walkthrough (PocketBase + Tailscale) |
| `TAURI.md` | Optional: wrap as native Windows/Mac/Linux installer |
| `README.md` | This file |

---

## Quick start (no sync, just use it)

The fastest path: download `runway.html`, open in any browser. Done.

**To use on iPhone:**
1. Push `runway.html` to a public GitHub repo as `index.html`
2. Enable GitHub Pages (Settings → Pages → main branch)
3. Open the URL on iPhone Safari
4. Share icon → Add to Home Screen
5. Now opens like a native app, data stored in Safari localStorage

Without sync, each device has independent progress. Fine for solo use on one device.

---

## With sync (recommended)

For the PC + iPhone experience where both sync, see `pocketbase/SETUP.md`. ~30 min one-time setup.

Architecture:
```
PC browser → PocketBase (your PC) ← iPhone PWA
                  ↑
            Tailscale mesh VPN
```

After setup, tap the small "local" indicator in the app's top-right to open Sync Settings. Enter your PocketBase URL and credentials. Flip the sync toggle. Done.

---

## What the app teaches

Three tracks running across 20 weeks:

1. **Daily Block A (Build, 45 min)** — Hands-on tasks. Each comes with a learning brief: what you'll build, key concepts to touch, gotchas, what "done" looks like.
2. **Daily Block B (Understand, 30 min)** — Conceptual depth. Briefs include core insight, why it matters for your specific career, key terms, best free resource, and self-test questions.
3. **Weekly Mini Project** — One shippable thing per week. Compounds into a portfolio.
4. **Weekly System Design (2-3 sessions of ~30 min)** — From Design Gurus' Grokking and NeetCode's SD course. Sequenced to reinforce the DevOps and MLOps work. Full teaching briefs included.

Tap any "Learn the concept" button on a card to expand the full brief. Briefs are not a substitute for the linked resources — they're scaffolding to help you orient and self-test.

---

## Three tabs

- **Now** — today's two blocks as big tappable cards. Open, tap, close. The killer feature.
- **Week** — full week view with daily check grid, mini project, and SD topic.
- **Plan** — all 20 weeks with completion badges. Tap any to jump. Backup/reset at bottom.

---

## Phase colors

- **Amber** = DevOps Fundamentals (Weeks 1-8)
- **Burnt orange** = MLOps Bridge (Weeks 9-13)
- **Sage** = UPenn Semester (Weeks 14-20, reduced pace)
- **Dusty blue** = System Design track (all 20 weeks)

---

## Streak rule

Either Block A OR Block B counts for the day. Forgiving by design — the goal is momentum, not perfection. Projects and SD weeks are tracked separately, don't affect streak.

---

## Data ownership

Without sync: data lives in browser localStorage. Per-device, per-origin. If you clear Safari data, it's gone. Use the export button on the Plan tab to back up to JSON.

With sync: data lives in your PocketBase (your PC or your VPS). Encrypted in transit by Tailscale. Never touches anyone else's servers. Use both the PocketBase SQLite backup and the app's JSON export for two layers of safety.

---

## For the future Xcode developer

When you (or someone) ports this to native iOS via Xcode:

- **Data model:** see the `CURRICULUM` const at the top of `runway.html`. It's the source of truth.
- **Storage schema:** see the comment block at the top of `runway.html`.
- **Sync API contract:** see `pocketbase/SETUP.md` "Future-proofing" section.
- **UI reference:** three tabs (Now/Week/Plan), one modal (Settings). The web version IS the spec.
- **PocketBase Swift SDK:** community packages exist; PocketBase REST is simple enough to wrap by hand if needed.

The web app, the PocketBase backend, and a future native iOS app are all peer clients of the same data. The native app can be added without disrupting anything else.

---

## Roadmap

Reasonable next steps depending on what you want:

1. **Native iOS via Xcode** (when you find a developer): use the same PocketBase, write a SwiftUI app that mirrors the three tabs.
2. **Tauri desktop installer**: see `TAURI.md`. ~15 min to wrap `runway.html` into a native .exe / .app / .AppImage.
3. **Multi-user / team mode**: if you want to share this with study buddies, the schema can extend to multiple users with their own progress. Tell me and I'll evolve it.
4. **Per-key sync with merge**: if last-write-wins ever bites you, upgrade to per-key records with merge logic. Currently overkill.
5. **Web push notifications for streak reminders**: PWAs can do this on Android, only partially on iOS. Tell me if you want it.
