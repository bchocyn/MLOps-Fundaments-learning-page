// ============================================================
// MAIN ENTRY POINT
// ============================================================

import './styles/base.css';
import {
  state, loadAll, notify, onStateChange,
  toggleProgress, computeStats, exportData, resetAll,
  syncPull, saveSyncConfig, saveAIConfig
} from './state.js';
import { renderToday } from './views/today.js';
import { renderWeek, renderPlan, renderDSA, renderSD, renderLibrary } from './views/views.js';
import { renderLesson } from './views/lesson.js';
import {
  renderSettingsModal, renderAIModal,
  handleSaveSync, handleSaveAI, handleSendAI,
  openAI, closeAI
} from './views/settings.js';

// ============================================================
// APP SHELL
// ============================================================
function renderApp() {
  const stats = computeStats();
  const root = document.getElementById('app');
  root.innerHTML = `
    <header class="topbar">
      <div class="brand">runway<span class="brand-dot">.</span></div>
      <div class="topbar-actions">
        <div class="sync-pill" data-action="open-settings">
          <span class="sync-dot ${state.syncStatus}"></span>
          <span>${state.syncStatus === 'synced' ? 'synced' : state.syncStatus === 'syncing' ? 'sync…' : state.syncStatus === 'error' ? 'error' : 'local'}</span>
        </div>
        <div class="streak">
          <span class="streak-num">${stats.streak}</span>
          <span class="streak-label">day${stats.streak === 1 ? '' : 's'}</span>
        </div>
      </div>
    </header>

    <main id="view-container">${renderActiveView()}</main>

    <nav class="tabbar">
      <div class="tabbar-inner">
        <button class="tab ${state.activeTab === 'today' ? 'active' : ''}" data-action="set-tab" data-tab="today">
          <span class="tab-icon">${icon('today')}</span>
          <span class="tab-label">Today</span>
        </button>
        <button class="tab ${state.activeTab === 'week' ? 'active' : ''}" data-action="set-tab" data-tab="week">
          <span class="tab-icon">${icon('week')}</span>
          <span class="tab-label">Week</span>
        </button>
        <button class="tab ${state.activeTab === 'plan' ? 'active' : ''}" data-action="set-tab" data-tab="plan">
          <span class="tab-icon">${icon('plan')}</span>
          <span class="tab-label">Plan</span>
        </button>
        <button class="tab ${state.activeTab === 'sd' ? 'active' : ''}" data-action="set-tab" data-tab="sd">
          <span class="tab-icon">${icon('sd')}</span>
          <span class="tab-label">SD</span>
        </button>
        <button class="tab ${state.activeTab === 'dsa' ? 'active' : ''}" data-action="set-tab" data-tab="dsa">
          <span class="tab-icon">${icon('dsa')}</span>
          <span class="tab-label">DSA</span>
        </button>
        <button class="tab ${state.activeTab === 'library' ? 'active' : ''}" data-action="set-tab" data-tab="library">
          <span class="tab-icon">${icon('library')}</span>
          <span class="tab-label">Library</span>
        </button>
      </div>
    </nav>

    ${renderSettingsModal()}
    ${renderAIModal()}
  `;
  attachHandlers();
}

function renderActiveView() {
  if (state.selectedLesson) return renderLesson();
  switch (state.activeTab) {
    case 'today': return renderToday();
    case 'week':  return renderWeek();
    case 'plan':  return renderPlan();
    case 'sd':    return renderSD();
    case 'dsa':   return renderDSA();
    case 'library': return renderLibrary();
    default:      return renderToday();
  }
}

function icon(kind) {
  const s = { width: 18, height: 18, fill: 'none', stroke: 'currentColor', 'stroke-width': 1.8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
  const a = Object.entries(s).map(([k,v]) => `${k}="${v}"`).join(' ');
  switch(kind) {
    case 'today': return `<svg ${a}><circle cx="9" cy="9" r="6"/><circle cx="9" cy="9" r="2" fill="currentColor"/></svg>`;
    case 'week':  return `<svg ${a}><rect x="2" y="3" width="14" height="13" rx="2"/><line x1="2" y1="7" x2="16" y2="7"/><line x1="6" y1="3" x2="6" y2="7"/><line x1="12" y1="3" x2="12" y2="7"/></svg>`;
    case 'plan':  return `<svg ${a}><line x1="3" y1="5" x2="15" y2="5"/><line x1="3" y1="9" x2="15" y2="9"/><line x1="3" y1="13" x2="15" y2="13"/></svg>`;
    case 'sd':    return `<svg ${a}><rect x="2" y="2" width="6" height="6" rx="1"/><rect x="10" y="2" width="6" height="6" rx="1"/><rect x="2" y="10" width="6" height="6" rx="1"/><rect x="10" y="10" width="6" height="6" rx="1"/><line x1="8" y1="5" x2="10" y2="5"/><line x1="5" y1="8" x2="5" y2="10"/></svg>`;
    case 'dsa':   return `<svg ${a}><circle cx="9" cy="3" r="2"/><circle cx="4" cy="13" r="2"/><circle cx="14" cy="13" r="2"/><line x1="9" y1="5" x2="4" y2="11"/><line x1="9" y1="5" x2="14" y2="11"/></svg>`;
    case 'library': return `<svg ${a}><path d="M3 3h5a2 2 0 0 1 2 2v11a2 2 0 0 0-2-2H3z"/><path d="M17 3h-5a2 2 0 0 0-2 2v11a2 2 0 0 1 2-2h5z"/></svg>`;
    default: return '';
  }
}

// ============================================================
// EVENT HANDLERS
// ============================================================
function attachHandlers() {
  document.querySelectorAll('[data-action]').forEach(el => {
    el.addEventListener('click', async e => {
      const a = el.dataset.action;
      if (!a) return;

      switch(a) {
        case 'set-tab':
          state.activeTab = el.dataset.tab;
          state.selectedLesson = null;
          state.expandedBriefs.clear();
          notify();
          window.scrollTo(0, 0);
          break;

        case 'toggle-block': {
          const w = +el.dataset.week, d = +el.dataset.day, k = el.dataset.kind;
          toggleProgress(`w${w}_d${d}_${k}`);
          break;
        }
        case 'toggle-project':
          toggleProgress(`w${el.dataset.week}_project`);
          break;
        case 'toggle-sd':
          e.stopPropagation();
          toggleProgress(`w${el.dataset.week}_sd`);
          break;
        case 'toggle-dsa':
          e.stopPropagation();
          toggleProgress(`w${el.dataset.week}_dsa`);
          break;
        case 'toggle-problem':
          toggleProgress(`dsa_${el.dataset.id}`);
          break;
        case 'toggle-brief': {
          const id = el.dataset.brief;
          if (state.expandedBriefs.has(id)) state.expandedBriefs.delete(id);
          else state.expandedBriefs.add(id);
          notify();
          break;
        }

        case 'select-week':
          state.selectedWeek = +el.dataset.week;
          state.activeTab = 'week';
          state.expandedBriefs.clear();
          notify();
          window.scrollTo(0, 0);
          break;

        case 'open-sd':
        case 'open-sd-lesson':
          state.selectedLesson = { kind: 'sd', id: el.dataset.id };
          notify();
          window.scrollTo(0, 0);
          break;
        case 'open-dsa':
        case 'open-dsa-lesson':
          state.selectedLesson = { kind: 'dsa', id: el.dataset.id };
          notify();
          window.scrollTo(0, 0);
          break;
        case 'select-lesson':
          state.selectedLesson = { kind: el.dataset.kind, id: el.dataset.id };
          notify();
          window.scrollTo(0, 0);
          break;
        case 'back-from-lesson':
          state.selectedLesson = null;
          notify();
          break;

        case 'open-settings':
          state.showSettings = true;
          notify();
          break;
        case 'close-settings':
          state.showSettings = false;
          notify();
          break;

        case 'toggle-sync':
          state.syncConfig.enabled = !state.syncConfig.enabled;
          saveSyncConfig();
          if (state.syncConfig.enabled) syncPull();
          else state.syncStatus = 'offline';
          notify();
          break;
        case 'save-sync':
          await handleSaveSync();
          break;
        case 'toggle-ai':
          state.aiConfig.enabled = !state.aiConfig.enabled;
          saveAIConfig();
          notify();
          break;
        case 'save-ai':
          await handleSaveAI();
          break;
        case 'ask-ai':
          openAI(el.dataset.context);
          break;
        case 'close-ai':
          closeAI();
          break;
        case 'send-ai':
          await handleSendAI();
          break;

        case 'export':
          exportData();
          break;
        case 'reset':
          resetAll();
          break;
      }
    });
  });
}

// ============================================================
// BOOT
// ============================================================
loadAll();
onStateChange(renderApp);
renderApp();
if (state.syncConfig.enabled) syncPull();
