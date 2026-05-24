// Settings modal + AI chat modal
import { state, saveSyncConfig, saveAIConfig, syncPull, syncPush, askAI, notify } from '../state.js';

const esc = s => String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function renderSettingsModal() {
  if (!state.showSettings) return '';
  return `
    <div class="modal-backdrop" data-action="close-settings">
      <div class="modal" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h2 class="h2">Settings</h2>
          <button class="btn" data-action="close-settings">close</button>
        </div>

        <div class="kicker" style="margin-bottom: 16px;">Sync (PocketBase)</div>

        <div class="row between" style="padding: 12px 0; border-top: 1px solid var(--border-subtle);">
          <span class="body-sm">Cloud sync</span>
          <div class="toggle ${state.syncConfig.enabled ? 'on' : ''}" data-action="toggle-sync">
            <div class="toggle-knob"></div>
          </div>
        </div>

        <div class="field" style="margin-top: 16px;">
          <label class="field-label">PocketBase URL</label>
          <input class="field-input" id="syncUrl" type="text" placeholder="http://100.x.x.x:8090" value="${esc(state.syncConfig.url)}" />
          <div class="field-hint">Your PocketBase server. Use your Tailscale IP for remote access.</div>
        </div>
        <div class="field">
          <label class="field-label">Email</label>
          <input class="field-input" id="syncEmail" type="email" placeholder="you@example.com" value="${esc(state.syncConfig.email)}" />
        </div>
        <div class="field">
          <label class="field-label">Password</label>
          <input class="field-input" id="syncPassword" type="password" placeholder="••••••••" value="${esc(state.syncConfig.password)}" />
          <div class="field-hint">Stored only in your browser. Never sent except to your PocketBase.</div>
        </div>
        <button class="btn btn-primary" style="width: 100%;" data-action="save-sync">Save & Test Sync</button>
        <div id="syncMsg" style="margin-top: 12px;"></div>

        <div class="kicker" style="margin-top: 32px; margin-bottom: 16px;">AI Assistant (Anthropic Claude)</div>

        <div class="row between" style="padding: 12px 0; border-top: 1px solid var(--border-subtle);">
          <span class="body-sm">Enable AI assist</span>
          <div class="toggle ${state.aiConfig.enabled ? 'on' : ''}" data-action="toggle-ai">
            <div class="toggle-knob"></div>
          </div>
        </div>

        <div class="field" style="margin-top: 16px;">
          <label class="field-label">Anthropic API Key</label>
          <input class="field-input" id="aiKey" type="password" placeholder="sk-ant-..." value="${esc(state.aiConfig.apiKey)}" />
          <div class="field-hint">Get one at console.anthropic.com. Stored only in your browser, sent only to api.anthropic.com.</div>
        </div>
        <button class="btn btn-primary" style="width: 100%;" data-action="save-ai">Save API Key</button>
        <div id="aiMsg" style="margin-top: 12px;"></div>

        <div class="row between" style="margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--border-subtle);">
          <button class="btn" data-action="export">export backup</button>
          <button class="btn" data-action="reset">reset all data</button>
        </div>
      </div>
    </div>
  `;
}

export async function handleSaveSync() {
  const url = document.getElementById('syncUrl').value.trim().replace(/\/$/, '');
  const email = document.getElementById('syncEmail').value.trim();
  const password = document.getElementById('syncPassword').value;
  state.syncConfig = { ...state.syncConfig, url, email, password };
  saveSyncConfig();
  const msg = document.getElementById('syncMsg');
  msg.innerHTML = '<div class="caption">Testing…</div>';
  try {
    await syncPull();
    await syncPush();
    msg.innerHTML = '<div class="callout callout-insight">✓ Connected and synced.</div>';
  } catch (e) {
    msg.innerHTML = `<div class="callout callout-warning">✗ ${esc(e.message)}</div>`;
  }
}

export async function handleSaveAI() {
  const key = document.getElementById('aiKey').value.trim();
  state.aiConfig.apiKey = key;
  saveAIConfig();
  const msg = document.getElementById('aiMsg');
  msg.innerHTML = '<div class="caption">Testing…</div>';
  try {
    const result = await askAI('Reply with just the word "OK".');
    msg.innerHTML = `<div class="callout callout-insight">✓ Connected. Test response: ${esc(result.substring(0, 60))}</div>`;
  } catch (e) {
    msg.innerHTML = `<div class="callout callout-warning">✗ ${esc(e.message.substring(0, 200))}</div>`;
  }
}

// ============================================================
// AI CHAT MODAL
// ============================================================
let aiChatHistory = [];

export function renderAIModal() {
  if (!state.showAI) return '';
  const historyHtml = aiChatHistory.map(m => `
    <div style="padding: 12px; background: ${m.role === 'user' ? 'var(--bg-elevated)' : 'var(--accent-amber-bg)'}; border-radius: 8px; margin-bottom: 8px;">
      <div class="kicker" style="margin-bottom: 4px; color: ${m.role === 'user' ? 'var(--text-tertiary)' : 'var(--accent-amber)'};">${m.role === 'user' ? 'You' : 'Claude'}</div>
      <div class="body-sm" style="white-space: pre-wrap;">${esc(m.content)}</div>
    </div>
  `).join('');

  return `
    <div class="modal-backdrop" data-action="close-ai">
      <div class="modal" onclick="event.stopPropagation()" style="max-height: 90vh;">
        <div class="modal-header">
          <h2 class="h2">Ask Claude</h2>
          <button class="btn" data-action="close-ai">close</button>
        </div>
        ${state.aiContext ? `<div class="caption" style="margin-bottom: 16px; padding: 10px; background: var(--bg-base); border-radius: 6px;">Context: ${esc(state.aiContext)}</div>` : ''}
        <div id="aiHistory" style="max-height: 50vh; overflow-y: auto; margin-bottom: 16px;">${historyHtml}</div>
        <textarea id="aiInput" class="field-input" rows="3" placeholder="Ask anything about this concept..." style="resize: vertical; min-height: 80px;"></textarea>
        <button class="btn btn-primary" style="width: 100%; margin-top: 12px;" data-action="send-ai">Ask Claude →</button>
      </div>
    </div>
  `;
}

export async function handleSendAI() {
  const input = document.getElementById('aiInput');
  const question = input.value.trim();
  if (!question) return;

  const systemPrompt = `You are a focused study assistant helping a DevSecOps engineer prepare for FAANG-adjacent interviews and a UPenn CS master's program. Be concise, technically precise, and direct. Use examples and analogies when they clarify. Avoid filler. If asked about a system design or DSA topic, structure your answer with clear sections.${state.aiContext ? ' Current learning context: ' + state.aiContext : ''}`;

  aiChatHistory.push({ role: 'user', content: question });
  input.value = '';
  notify();

  // Show loading
  const historyEl = document.getElementById('aiHistory');
  if (historyEl) {
    historyEl.innerHTML += `<div style="padding: 12px;"><div class="spinner"></div></div>`;
    historyEl.scrollTop = historyEl.scrollHeight;
  }

  try {
    const response = await askAI(question, systemPrompt);
    aiChatHistory.push({ role: 'assistant', content: response });
  } catch (e) {
    aiChatHistory.push({ role: 'assistant', content: 'Error: ' + e.message });
  }
  notify();
}

export function openAI(context = null) {
  if (!state.aiConfig.enabled || !state.aiConfig.apiKey) {
    alert('AI is not configured. Open Settings to add your Anthropic API key.');
    return;
  }
  state.showAI = true;
  state.aiContext = context;
  notify();
}

export function closeAI() {
  state.showAI = false;
  state.aiContext = null;
  notify();
}
