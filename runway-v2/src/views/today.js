// Today view — the Daily.dev-style landing
import { CURRICULUM, PHASES } from '../data/curriculum.js';
import { state, getProgress, toggleProgress, currentWeekNum, currentDayIdx } from '../state.js';

const escapeHtml = s => String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dayName = i => ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][i];

export function renderToday() {
  const wn = currentWeekNum();
  const di = currentDayIdx();
  const week = CURRICULUM[wn - 1];
  if (!week) return `<div class="view"><div class="empty">Plan starts May 21, 2026.</div></div>`;

  const phase = PHASES[week.phase];
  const aDone = getProgress(`w${wn}_d${di}_a`);
  const bDone = getProgress(`w${wn}_d${di}_b`);
  const projDone = getProgress(`w${wn}_project`);
  const sdDone = getProgress(`w${wn}_sd`);
  const dsaDone = getProgress(`w${wn}_dsa`);
  const today = new Date();

  return `
    <div class="view stagger">
      <div class="today-hero">
        <div class="today-date">${today.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' }).toUpperCase()}</div>
        <h1 class="today-day">${dayName(di)}<span class="dot">.</span></h1>
        <div class="today-week-meta">
          <span class="chip chip-track-${phase.code}">${week.phase}</span>
          <span class="chip">Week ${wn} of 20</span>
          <span class="chip">${escapeHtml(week.title)}</span>
        </div>
      </div>

      <section class="feed-section">
        <div class="kicker" style="margin-bottom: 12px;">Today's Focus · 2 blocks</div>
        ${renderBlockCard('a', wn, di, week.blockA, aDone)}
        ${renderBlockCard('b', wn, di, week.blockB, bDone)}
      </section>

      <section class="feed-section">
        <div class="kicker" style="margin-bottom: 12px;">This Week's Tracks</div>

        <div class="track-card sd ${sdDone ? 'done' : ''}" data-action="open-sd" data-id="${week.sd.topicId}" style="cursor: pointer;">
          <div class="row between gap-3" style="margin-bottom: 8px;">
            <span class="chip chip-track-sd">◇ System Design</span>
            <button class="check-circle ${sdDone ? 'done' : ''}" data-action="toggle-sd" data-week="${wn}" onclick="event.stopPropagation();">${sdDone ? '✓' : ''}</button>
          </div>
          <div class="h4" style="margin-bottom: 4px;">${escapeHtml(week.sd.topic)}</div>
          <div class="caption">${escapeHtml(week.sd.source)} · 2–3 sessions of ~30 min · Tap to open lesson →</div>
        </div>

        <div class="track-card dsa ${dsaDone ? 'done' : ''}" data-action="open-dsa" data-id="${week.dsa.patternId}" style="cursor: pointer;">
          <div class="row between gap-3" style="margin-bottom: 8px;">
            <span class="chip chip-track-dsa">⌘ DSA Pattern</span>
            <button class="check-circle ${dsaDone ? 'done' : ''}" data-action="toggle-dsa" data-week="${wn}" onclick="event.stopPropagation();">${dsaDone ? '✓' : ''}</button>
          </div>
          <div class="h4" style="margin-bottom: 4px;">${escapeHtml(week.dsa.topic)}</div>
          <div class="caption">NeetCode 150 pattern · 3–5 problems this week · Tap to open lesson →</div>
        </div>
      </section>

      <section class="feed-section">
        <div class="kicker" style="margin-bottom: 12px;">Week ${wn} Mini-Project</div>
        <div class="card tappable ${projDone ? 'done' : ''}" data-action="toggle-project" data-week="${wn}">
          <div class="row gap-3">
            <span class="check-circle ${projDone ? 'done' : ''}">${projDone ? '✓' : ''}</span>
            <span class="body">${escapeHtml(week.project)}</span>
          </div>
        </div>
      </section>

      <div class="caption" style="text-align: center; font-style: italic; margin-top: 24px;">
        Either daily block counts toward your streak. The goal is momentum.
      </div>
    </div>
  `;
}

function renderBlockCard(kind, wn, di, block, done) {
  const isA = kind === 'a';
  const briefId = `today-${kind}-${wn}`;
  const open = state.expandedBriefs.has(briefId);
  return `
    <div class="block-card ${kind}-block ${done ? 'done' : ''}">
      <div class="block-card-header" data-action="toggle-block" data-week="${wn}" data-day="${di}" data-kind="${kind}" style="cursor:pointer;">
        <span class="block-card-tag">Block ${kind.toUpperCase()} · ${isA ? 'Build' : 'Understand'}</span>
        <span class="check-circle ${done ? 'done' : ''}">${done ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` : ''}</span>
      </div>
      <div class="block-card-task" data-action="toggle-block" data-week="${wn}" data-day="${di}" data-kind="${kind}" style="cursor:pointer;">${escapeHtml(block.task)}</div>
      <div class="block-card-time">${isA ? '45 min · hands-on' : '30 min · conceptual'}</div>

      <button class="learn-toggle ${open ? 'open' : ''}" data-action="toggle-brief" data-brief="${briefId}">
        <span class="arrow">›</span>
        <span>${open ? 'Hide' : 'Learn'} the concept</span>
      </button>
      <div class="brief ${isA ? '' : 'b'} ${open ? 'open' : ''}">
        ${renderBrief(block.brief, isA)}
      </div>
    </div>
  `;
}

function renderBrief(brief, isA) {
  const terms = (brief.terms || []).map(t => `<span class="chip">${escapeHtml(t)}</span>`).join('');
  const tests = (brief.test || []).map(t => `<li>${escapeHtml(t)}</li>`).join('');
  const doneWhen = brief.doneWhen ? `
    <div class="brief-section">
      <div class="brief-label">Done When</div>
      <div class="brief-done">${escapeHtml(brief.doneWhen)}</div>
    </div>` : '';
  return `
    <div class="brief-section">
      <div class="brief-label">Core Insight</div>
      <div class="brief-text">${escapeHtml(brief.insight)}</div>
    </div>
    <div class="brief-section">
      <div class="brief-label">Why This Matters</div>
      <div class="brief-why">${escapeHtml(brief.why)}</div>
    </div>
    <div class="brief-section">
      <div class="brief-label">Key Terms</div>
      <div class="brief-terms">${terms}</div>
    </div>
    <div class="brief-section">
      <div class="brief-label">Best Resource</div>
      <div class="brief-resource">${escapeHtml(brief.resource)}</div>
    </div>
    <div class="brief-section">
      <div class="brief-label">Self-Test</div>
      <ul class="brief-tests">${tests}</ul>
    </div>
    ${doneWhen}
    ${state.aiConfig.enabled ? `
      <button class="btn" style="margin-top: 12px;" data-action="ask-ai" data-context="${escapeHtml(brief.insight.substring(0, 200))}">
        Ask Claude about this →
      </button>
    ` : ''}
  `;
}
