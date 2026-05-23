# Wrap Runway as a Native App (Tauri)

When you're ready to share Runway as a real installer your friends can double-click, wrap it with Tauri. Single command. Gets you native Windows .exe, macOS .app, and Linux .AppImage from the same `runway.html`.

Why Tauri over Electron:
- 3MB installer instead of 100MB+
- Uses the system webview (no bundled Chromium)
- Better security defaults
- Cross-platform from one command
- Free, open source, Rust-based

---

## Prerequisites

You need Rust and Node.js. If you don't have them:

- **Windows:** Install [Rust](https://rustup.rs/) and [Node.js LTS](https://nodejs.org/). Also install Visual Studio Build Tools (the installer prompts you).
- **macOS:** `xcode-select --install`, then [Rust](https://rustup.rs/), then [Node.js](https://nodejs.org/) (use brew if you have it: `brew install node`).
- **Linux:** See [Tauri prereqs](https://tauri.app/start/prerequisites/) for distro-specific packages.

---

## One-time setup (15 min)

```bash
# Create a new Tauri project
npm create tauri-app@latest runway-desktop
# When prompted:
#   - App name: runway
#   - Window title: Runway
#   - Frontend language: TypeScript / JavaScript
#   - Package manager: npm (or your preference)
#   - UI template: Vanilla
#   - UI flavor: JavaScript

cd runway-desktop

# Replace the placeholder frontend with runway.html
# The Vanilla template puts a starter index.html in src/
# Replace src/index.html with your runway.html (rename it)
cp /path/to/runway.html src/index.html

# Test in dev mode
npm run tauri dev
```

A native window opens with Runway inside. localStorage works. Sync works (provided your PocketBase is reachable).

---

## Building installers

```bash
# Build for your current platform
npm run tauri build

# Outputs land in:
# src-tauri/target/release/bundle/
#   - msi/ (Windows installer)
#   - dmg/ (macOS disk image)
#   - appimage/ (Linux portable binary)
#   - deb/ (Debian package)
```

Cross-platform builds require either running the build on each target OS or using GitHub Actions (Tauri has a ready-made action). For sharing with friends on Windows, just build on a Windows box.

---

## Recommended config tweaks

Edit `src-tauri/tauri.conf.json`:

```json
{
  "productName": "Runway",
  "version": "1.0.0",
  "identifier": "dev.brandon.runway",
  "app": {
    "windows": [{
      "title": "Runway",
      "width": 480,
      "height": 900,
      "minWidth": 380,
      "minHeight": 600,
      "resizable": true,
      "fullscreen": false,
      "decorations": true,
      "transparent": false
    }],
    "security": {
      "csp": null
    }
  },
  "bundle": {
    "active": true,
    "targets": "all",
    "icon": [
      "icons/icon.ico",
      "icons/icon.icns",
      "icons/icon.png"
    ]
  }
}
```

The 480×900 dimensions roughly match a phone aspect ratio, which is what Runway is designed for. Users can resize.

For icons, generate them from a single 1024×1024 PNG using `npm run tauri icon path/to/icon.png`.

---

## Code signing (Windows)

For Windows installers, your users will see a SmartScreen warning on first install unless the installer is code-signed.

- **Free option:** They click "More info → Run anyway" the first time. Fine for friends.
- **Paid option:** Buy a code signing cert (~$200-400/year from DigiCert, Sectigo). Set it up in `tauri.conf.json` under `bundle.windows.certificateThumbprint`.

For personal sharing, the free option is fine. For wider distribution, sign it.

---

## What this gets you

- `runway.exe` (Windows) — installer that puts Runway in Start Menu
- `runway.dmg` (macOS) — drag-to-Applications installer
- `runway.AppImage` (Linux) — portable binary
- All ~3-5MB each
- Same exact UI and sync behavior as the browser version
- Same localStorage (per-OS, per-user)

The PWA install on iPhone is still your phone experience. Tauri is for the desktop side.

---

## Future: shipping updates

Tauri has a built-in updater. Once you publish a binary on GitHub Releases, the app can self-update. Wire this up later when you have version 1.1 to ship.

See [Tauri updater docs](https://tauri.app/plugin/updater/) for setup.
