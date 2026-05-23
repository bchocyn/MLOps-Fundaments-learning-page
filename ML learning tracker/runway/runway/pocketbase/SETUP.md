# Runway Sync Setup — PocketBase + Tailscale

End state: web app on your PC and iPhone PWA both sync to a PocketBase running on your PC. Tailscale makes your PC reachable from anywhere without exposing it to the public internet.

Total setup time: ~30 minutes one-time.

---

## Architecture

```
  ┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
  │   PC Browser    │      │  PocketBase      │      │  iPhone PWA     │
  │   runway.html   │◄────►│  (your PC)       │◄────►│  runway.html    │
  │   localStorage  │      │  SQLite + REST   │      │  localStorage   │
  └─────────────────┘      └──────────────────┘      └─────────────────┘
           │                        ▲                          │
           │                        │                          │
           └────────────────────────┴──────────────────────────┘
                            Tailscale mesh VPN
                       (encrypted, no port forwarding)
```

Both clients work offline. They sync to PocketBase when reachable. PocketBase stores a single JSON blob per user containing the full progress state.

---

## Step 1 — Install Tailscale (5 min)

Tailscale gives every device a stable IP that works anywhere without port forwarding or VPN configuration.

**On your PC:**
1. Sign up free at [tailscale.com](https://tailscale.com) (use a personal account, not work).
2. Download and install the Tailscale client.
3. Sign in. Note your PC's Tailscale IP (looks like `100.x.x.x`).

**On your iPhone:**
1. Install Tailscale from the App Store.
2. Sign in with the same account.
3. Toggle it on.

Test: from your phone, open Safari and try to ping your PC by Tailscale IP. (Or just confirm both devices show as "online" in the Tailscale admin console.)

Tailscale free tier covers up to 3 users and 100 devices. Personal use is free forever.

---

## Step 2 — Run PocketBase (10 min)

You have three options. Easiest first.

### Option A — Docker (recommended)

If you have Docker installed:

```bash
cd path/to/pocketbase
docker compose up -d
```

This:
- Starts PocketBase on port 8090
- Persists data to `./pb_data` (back this folder up periodically)
- Auto-runs migrations from `./pb_migrations` (creates the `state` collection)

Verify it's running: open `http://localhost:8090/_/` in your browser. You'll see the PocketBase admin setup wizard.

### Option B — Bare metal (no Docker)

Download the PocketBase binary from [pocketbase.io](https://pocketbase.io/docs/) for your OS.

```bash
# Extract somewhere permanent like ~/runway-server/
mkdir -p ~/runway-server && cd ~/runway-server
# Place the pocketbase binary here, then:
./pocketbase serve
```

Copy the migration file (`pb_migrations/1716336000_create_state_collection.js`) into your `pb_migrations/` folder before first start. PocketBase auto-applies it.

To keep it running as a Windows service, use [NSSM](https://nssm.cc/). On macOS use `launchd`. On Linux use `systemd`.

### Option C — Cloud VPS (later, if you want always-on)

When you're ready to not depend on your PC being on, rent a $5/month VPS from Hetzner, DigitalOcean, or similar, and run the same Docker setup there. Point Tailscale at it. Your data is still self-hosted, just not on your PC.

---

## Step 3 — Create your admin account (2 min)

1. Open `http://localhost:8090/_/`
2. Create the admin account (this is YOU as the server operator).
3. After login, you'll see the admin panel.

Verify the `state` collection exists: left sidebar should show **Collections → state**. If not, the migration didn't run — check the `pb_migrations` folder is mounted.

---

## Step 4 — Create your user account (2 min)

This is separate from the admin account. The admin manages the server; the user owns the data.

1. In the admin panel, go to **Collections → users → New record**.
2. Set:
   - Email: `you@example.com` (any email, doesn't have to be real)
   - Password: pick something secure
   - Verified: check this box
3. Save.

This is the credential you'll enter in the Runway app.

---

## Step 5 — Connect Runway (3 min)

1. Open Runway in your PC browser.
2. Tap the small "local" indicator in the top-right (next to the streak counter).
3. The Sync Settings modal opens.
4. Fill in:
   - **PocketBase URL**: `http://YOUR_TAILSCALE_IP:8090` (use the Tailscale IP, not localhost — otherwise iPhone can't reach it)
   - **Email**: the user account email from Step 4
   - **Password**: the user account password
5. Toggle "Cloud sync" ON.
6. Tap **Save & Test Connection**.

Expected: green "Synced" message. The indicator in the topbar turns sage-green and says "synced".

Now do the same on your iPhone. Open the PWA, tap the sync indicator, enter the same URL and credentials.

Both devices are now syncing through your PocketBase.

---

## Verification

Open both devices side by side. Check off a Block A on your phone. Within ~45 seconds (or sooner if you focus the PC window), the check should appear on PC. Same in reverse.

The sync is:
- **Push:** immediate (debounced 800ms after the last toggle)
- **Pull:** every 45 seconds OR when you focus the browser tab

---

## CORS — important

PocketBase by default only allows requests from `localhost`. To let your iPhone Safari (a different origin) talk to it, you need to allow CORS for your tracker's origin.

**If you're hosting `runway.html` on GitHub Pages**, your origin is `https://your-username.github.io`. PocketBase needs to allow it.

Edit `pb_data/settings.json` (or use the admin UI → Settings → Application) and add:
```json
"meta": {
  "appUrl": "https://your-username.github.io"
}
```

Then restart PocketBase. The CORS allowlist will include your app origin.

If you're getting CORS errors in the browser console, this is why. PocketBase logs the request and the rejection reason.

---

## Backup

Your data lives in `pb_data/data.db` (SQLite). To back up:

```bash
# Stop the server briefly, copy the file, restart
docker compose stop
cp pb_data/data.db backups/data-$(date +%F).db
docker compose start
```

Or set up a cron to do this nightly. SQLite is robust but the backup is your safety net.

The Runway app's local export (Plan tab → "export backup") is independent of this — it's a JSON dump of your progress only. Both layers of backup are good.

---

## Troubleshooting

**"Auth failed: 400"** in the app
Your email or password is wrong. Verify by logging in at `http://YOUR_IP:8090/_/` then trying user impersonation.

**"Auth failed: 0" / network error**
The app can't reach PocketBase. Check:
1. Is PocketBase running? Open the admin URL.
2. Are you using the Tailscale IP (not localhost) from the phone?
3. Is Tailscale on and showing both devices online?

**"Save failed: 403"**
The user account doesn't have permission. Check the `state` collection's API rules — they should be `@request.auth.id = user.id` for all 5 rules.

**CORS error in browser console**
See the CORS section above.

**Data on my phone overwrote my PC's data**
Last-write-wins is the trade-off for simplicity. If this becomes a real issue (you edit on both devices in parallel often), I can upgrade the sync to per-key records with merge logic. Tell me and I'll do it.

---

## Future-proofing for Xcode port

When your developer ports this to native iOS, PocketBase has an official Swift SDK: [pocketbase/js-sdk](https://github.com/pocketbase/js-sdk) is the JS one used here; Swift equivalents exist as community packages. The data model (single `state` record with JSON `data` field) is intentionally simple to port. The Swift app can talk to the same PocketBase the web app does — they're peer clients.

The schema in `pb_migrations/` IS the spec. Hand that to the iOS dev along with the API contract:

- Auth: `POST /api/collections/users/auth-with-password`
- Fetch: `GET /api/collections/state/records?filter=(user='<userId>')&perPage=1`
- Create: `POST /api/collections/state/records` with `{ user, data }`
- Update: `PATCH /api/collections/state/records/<recordId>` with `{ data }`
