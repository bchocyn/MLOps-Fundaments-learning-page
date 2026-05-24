// ============================================================
// STATE — central app state with localStorage + PocketBase sync
// ============================================================

import { START_DATE, CURRICULUM } from './data/curriculum.js';

const STORAGE_KEY = 'runway:v2:progress';
const SYNC_KEY = 'runway:v2:sync';
const AI_KEY = 'runway:v2:ai';

// ============================================================
// IN-MEMORY STATE
// ============================================================
export const state = {
  progress: {},           // { 'w1_d0_a': true, ... }
  activeTab: 'today',     // today | week | plan | dsa | sd
  selectedWeek: 1,
  selectedLesson: null,   // { kind: 'sd'|'dsa', id: '...' }
  expandedBriefs: new Set(),
  showSettings: false,
  showAI: false,
  aiContext: null,        // the topic the AI is helping with
  syncConfig: { url: '', email: '', password: '', enabled: false },
  syncStatus: 'offline',  // offline | syncing | synced | error
  aiConfig: { apiKey: '', enabled: false },
};

let _listeners = [];
export function onStateChange(fn) { _listeners.push(fn); return () => { _listeners = _listeners.filter(f => f !== fn); }; }
export function notify() { _listeners.forEach(fn => fn()); }

// ============================================================
// STORAGE
// ============================================================
export function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state.progress = JSON.parse(raw).progress || {};
  } catch (e) { console.error('load progress', e); }
  try {
    const s = localStorage.getItem(SYNC_KEY);
    if (s) Object.assign(state.syncConfig, JSON.parse(s));
  } catch (e) { console.error('load sync', e); }
  try {
    const a = localStorage.getItem(AI_KEY);
    if (a) Object.assign(state.aiConfig, JSON.parse(a));
  } catch (e) { console.error('load ai', e); }
  state.selectedWeek = currentWeekNum();
}

export function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: 2, progress: state.progress, savedAt: new Date().toISOString()
    }));
  } catch (e) { console.error('save progress', e); }
}

export function saveSyncConfig() {
  try { localStorage.setItem(SYNC_KEY, JSON.stringify(state.syncConfig)); }
  catch (e) { console.error('save sync', e); }
}

export function saveAIConfig() {
  try { localStorage.setItem(AI_KEY, JSON.stringify(state.aiConfig)); }
  catch (e) { console.error('save ai', e); }
}

// ============================================================
// PROGRESS HELPERS
// ============================================================
export function setProgress(key, value) {
  state.progress[key] = value;
  saveProgress();
  debouncedPush();
  notify();
}
export function getProgress(key) { return !!state.progress[key]; }
export function toggleProgress(key) { setProgress(key, !state.progress[key]); }

// ============================================================
// DATE / WEEK HELPERS
// ============================================================
export function daysBetween(a, b) {
  const A = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const B = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((B - A) / 86400000);
}
export function currentWeekNum() {
  const d = daysBetween(START_DATE, new Date());
  return Math.max(1, Math.min(20, Math.floor(d / 7) + 1));
}
export function currentDayIdx() {
  const d = daysBetween(START_DATE, new Date());
  return ((d % 7) + 7) % 7;
}
export function weekStartDate(weekNum) {
  const d = new Date(START_DATE);
  d.setDate(d.getDate() + (weekNum - 1) * 7);
  return d;
}

// ============================================================
// STATS
// ============================================================
export function computeStats() {
  let totalBlocks = 0, doneBlocks = 0, projects = 0, sds = 0, dsas = 0;
  for (let w = 1; w <= 20; w++) {
    for (let d = 0; d < 7; d++) {
      totalBlocks += 2;
      if (state.progress[`w${w}_d${d}_a`]) doneBlocks++;
      if (state.progress[`w${w}_d${d}_b`]) doneBlocks++;
    }
    if (state.progress[`w${w}_project`]) projects++;
    if (state.progress[`w${w}_sd`]) sds++;
    if (state.progress[`w${w}_dsa`]) dsas++;
  }
  // Streak
  const today = new Date();
  let streak = 0;
  for (let back = 0; back < 140; back++) {
    const d = new Date(today); d.setDate(today.getDate() - back);
    const diff = daysBetween(START_DATE, d);
    if (diff < 0) break;
    const w = Math.floor(diff / 7) + 1;
    const di = diff % 7;
    if (w < 1 || w > 20) continue;
    if (state.progress[`w${w}_d${di}_a`] || state.progress[`w${w}_d${di}_b`]) streak++;
    else break;
  }
  // DSA problems
  let dsaProbs = 0;
  Object.keys(state.progress).forEach(k => { if (k.startsWith('dsa_') && state.progress[k]) dsaProbs++; });
  return { totalBlocks, doneBlocks, projects, sds, dsas, dsaProbs, streak,
           pct: totalBlocks ? Math.round(doneBlocks / totalBlocks * 100) : 0 };
}

// ============================================================
// SYNC (PocketBase)
// ============================================================
const pbCtx = { token: null, userId: null, recordId: null };
let pushTimer = null;

async function pbAuth() {
  const r = await fetch(`${state.syncConfig.url}/api/collections/users/auth-with-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: state.syncConfig.email, password: state.syncConfig.password })
  });
  if (!r.ok) throw new Error('Auth failed: ' + r.status);
  const d = await r.json();
  pbCtx.token = d.token;
  pbCtx.userId = d.record.id;
}

async function pbFetch() {
  const url = `${state.syncConfig.url}/api/collections/state/records?filter=(user='${pbCtx.userId}')&perPage=1`;
  const r = await fetch(url, { headers: { Authorization: pbCtx.token } });
  if (!r.ok) throw new Error('Fetch failed: ' + r.status);
  const d = await r.json();
  return d.items[0] || null;
}

async function pbSave() {
  const body = JSON.stringify({ user: pbCtx.userId, data: state.progress });
  const headers = { 'Content-Type': 'application/json', Authorization: pbCtx.token };
  let r;
  if (pbCtx.recordId) {
    r = await fetch(`${state.syncConfig.url}/api/collections/state/records/${pbCtx.recordId}`,
                    { method: 'PATCH', headers, body });
  } else {
    r = await fetch(`${state.syncConfig.url}/api/collections/state/records`,
                    { method: 'POST', headers, body });
  }
  if (!r.ok) throw new Error('Save failed: ' + r.status);
  const d = await r.json();
  pbCtx.recordId = d.id;
}

export async function syncPull() {
  if (!state.syncConfig.enabled || !state.syncConfig.url) return;
  try {
    state.syncStatus = 'syncing'; notify();
    if (!pbCtx.token) await pbAuth();
    const rec = await pbFetch();
    if (rec) {
      pbCtx.recordId = rec.id;
      state.progress = rec.data || {};
      saveProgress();
    }
    state.syncStatus = 'synced'; notify();
  } catch (e) {
    console.error('pull', e);
    state.syncStatus = 'error'; notify();
  }
}

export async function syncPush() {
  if (!state.syncConfig.enabled || !state.syncConfig.url) return;
  try {
    state.syncStatus = 'syncing'; notify();
    if (!pbCtx.token) await pbAuth();
    if (!pbCtx.recordId) {
      const existing = await pbFetch();
      if (existing) pbCtx.recordId = existing.id;
    }
    await pbSave();
    state.syncStatus = 'synced'; notify();
  } catch (e) {
    console.error('push', e);
    state.syncStatus = 'error'; notify();
  }
}

export function debouncedPush() {
  if (!state.syncConfig.enabled) return;
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(syncPush, 800);
}

// Background poll
setInterval(() => {
  if (state.syncConfig.enabled && state.syncStatus !== 'syncing') syncPull();
}, 45000);
window.addEventListener('focus', () => {
  if (state.syncConfig.enabled && state.syncStatus !== 'syncing') syncPull();
});

// ============================================================
// AI (Anthropic API)
// ============================================================
const AI_MODEL = 'claude-sonnet-4-5-20250929';

export async function askAI(prompt, systemPrompt = null) {
  if (!state.aiConfig.apiKey) throw new Error('No API key configured. Open settings.');

  const body = {
    model: AI_MODEL,
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }]
  };
  if (systemPrompt) body.system = systemPrompt;

  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': state.aiConfig.apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!r.ok) {
    const err = await r.text();
    throw new Error(`AI error ${r.status}: ${err.substring(0, 200)}`);
  }
  const d = await r.json();
  return d.content.filter(c => c.type === 'text').map(c => c.text).join('\n');
}

// ============================================================
// EXPORT / RESET
// ============================================================
export function exportData() {
  const blob = new Blob([JSON.stringify({
    progress: state.progress,
    exportedAt: new Date().toISOString()
  }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `runway-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function resetAll() {
  if (!confirm('Reset ALL progress? This cannot be undone.')) return;
  state.progress = {};
  saveProgress();
  notify();
}
