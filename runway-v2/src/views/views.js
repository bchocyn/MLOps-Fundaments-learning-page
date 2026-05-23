// Week, Plan, DSA roadmap, SD roadmap views

import { CURRICULUM, PHASES, MILESTONES, START_DATE } from '../data/curriculum.js';
import { PATTERNS } from '../data/neetcode.js';
import { state, getProgress, currentWeekNum, currentDayIdx, computeStats, weekStartDate } from '../state.js';

const esc = s => String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
const DOW = ['M','T','W','T','F','S','S'];

// ============================================================
// WEEK VIEW
// ============================================================
export function renderWeek() {
  const wn = state.selectedWeek;
  const week = CURRICULUM[wn - 1];
  const wStart = weekStartDate(wn);
  const isNow = wn === currentWeekNum();
  const curDay = currentDayIdx();
  const phase = PHASES[week.phase];

  const days = Array.from({length: 7}, (_, d) => {
    const date = new Date(wStart); date.setDate(wStart.getDate() + d);
    const isToday = isNow && d === curDay;
    const aDone = getProgress(`w${wn}_d${d}_a`);
    const bDone = getProgress(`w${wn}_d${d}_b`);
    return `
      <div class="day-col ${isToday ? 'today' : ''}">
        <div class="day-label">${DOW[d]}</div>
        <div class="day-date">${date.getDate()}</div>
        <button class="day-check ${aDone ? 'done-a' : ''}" data-action="toggle-block" data-week="${wn}" data-day="${d}" data-kind="a">${aDone ? '●' : 'A'}</button>
        <button class="day-check ${bDone ? 'done-b' : ''}" data-action="toggle-block" data-week="${wn}" data-day="${d}" data-kind="b">${bDone ? '●' : 'B'}</button>
      </div>
    `;
  }).join('');

  const projDone = getProgress(`w${wn}_project`);
  const sdDone = getProgress(`w${wn}_sd`);
  const dsaDone = getProgress(`w${wn}_dsa`);

  return `
    <div class="view stagger">
      <div class="week-nav">
        ${wn > 1 ? `<button class="btn btn-ghost" data-action="select-week" data-week="${wn-1}">← W${wn-1}</button>` : '<span></span>'}
        ${wn < 20 ? `<button class="btn btn-ghost" data-action="select-week" data-week="${wn+1}">W${wn+1} →</button>` : '<span></span>'}
      </div>

      <div class="week-header">
        <span class="chip chip-track-${phase.code}" style="margin-bottom: 12px;">${week.phase}</span>
        <div class="week-meta">
          WEEK ${String(wn).padStart(2,'0')} · ${fmt(wStart)} – ${fmt(new Date(wStart.getTime() + 6 * 86400000))}
          ${isNow ? `<span class="chip chip-solid">NOW</span>` : ''}
        </div>
        <h1 class="week-title">${esc(week.title)}</h1>
      </div>

      <div class="card" style="margin-bottom: 12px;">
        <div class="kicker" style="color: var(--accent-amber); margin-bottom: 8px;">Block A · Build · 45 min</div>
        <div class="body" style="color: var(--text-primary);">${esc(week.blockA.task)}</div>
      </div>

      <div class="card" style="margin-bottom: 12px;">
        <div class="kicker" style="color: var(--track-upenn); margin-bottom: 8px;">Block B · Understand · 30 min</div>
        <div class="body" style="color: var(--text-primary);">${esc(week.blockB.task)}</div>
      </div>

      <div class="day-grid">${days}</div>

      <div class="card tappable ${projDone ? 'done' : ''}" data-action="toggle-project" data-week="${wn}" style="margin-bottom: 12px;">
        <div class="kicker" style="margin-bottom: 8px;">Week Project</div>
        <div class="row gap-3">
          <span class="check-circle ${projDone ? 'done' : ''}">${projDone ? '✓' : ''}</span>
          <span class="body">${esc(week.project)}</span>
        </div>
      </div>

      <div class="track-card sd ${sdDone ? 'done' : ''} tappable" data-action="open-sd" data-id="${week.sd.topicId}" style="margin-bottom: 12px;">
        <div class="row between" style="margin-bottom: 8px;">
          <span class="chip chip-track-sd">◇ System Design</span>
          <button class="check-circle ${sdDone ? 'done' : ''}" data-action="toggle-sd" data-week="${wn}" onclick="event.stopPropagation();">${sdDone ? '✓' : ''}</button>
        </div>
        <div class="h4">${esc(week.sd.topic)}</div>
        <div class="caption" style="margin-top: 4px;">${esc(week.sd.source)} · Tap to open lesson →</div>
      </div>

      <div class="track-card dsa ${dsaDone ? 'done' : ''} tappable" data-action="open-dsa" data-id="${week.dsa.patternId}">
        <div class="row between" style="margin-bottom: 8px;">
          <span class="chip chip-track-dsa">⌘ DSA Pattern</span>
          <button class="check-circle ${dsaDone ? 'done' : ''}" data-action="toggle-dsa" data-week="${wn}" onclick="event.stopPropagation();">${dsaDone ? '✓' : ''}</button>
        </div>
        <div class="h4">${esc(week.dsa.topic)}</div>
        <div class="caption" style="margin-top: 4px;">NeetCode 150 · Tap to open pattern →</div>
      </div>
    </div>
  `;
}

// ============================================================
// PLAN VIEW
// ============================================================
export function renderPlan() {
  const stats = computeStats();
  const curWeek = currentWeekNum();
  const rows = CURRICULUM.map(w => {
    const ms = MILESTONES[w.num];
    const blocks = Array.from({length:7}).reduce((s, _, d) =>
      s + (getProgress(`w${w.num}_d${d}_a`)?1:0) + (getProgress(`w${w.num}_d${d}_b`)?1:0), 0);
    const pct = Math.round(blocks/14*100);
    const cls = w.num === curWeek ? 'current' : (w.num < curWeek ? 'past' : '');
    const proj = getProgress(`w${w.num}_project`);
    const sd = getProgress(`w${w.num}_sd`);
    const dsa = getProgress(`w${w.num}_dsa`);
    const badges = `
      <span class="timeline-badge" style="background:${proj?'#8FA876':'var(--border-subtle)'}"></span>
      <span class="timeline-badge" style="background:${sd?'#7B9FB5':'var(--border-subtle)'}"></span>
      <span class="timeline-badge" style="background:${dsa?'#B888C0':'var(--border-subtle)'}"></span>
    `;
    return `
      ${ms ? `<div class="milestone"><span class="milestone-label">◆ ${ms.label}</span><span class="milestone-desc">${ms.desc}</span></div>` : ''}
      <button class="timeline-row ${cls}" data-action="select-week" data-week="${w.num}">
        <span class="timeline-dot" style="background: ${PHASES[w.phase].color}"></span>
        <span class="timeline-num">W${String(w.num).padStart(2,'0')}</span>
        <span class="timeline-title">${esc(w.title)}</span>
        <span class="timeline-meta">${badges} ${pct>0?pct+'%':'·'}</span>
      </button>
    `;
  }).join('');

  return `
    <div class="view stagger">
      <h1 class="h1" style="margin-bottom: 4px;">The Plan<span style="color: var(--accent-amber);">.</span></h1>
      <div class="caption" style="margin-bottom: 24px;">20 weeks · May 21, 2026 → Oct 8, 2026</div>

      <div class="row gap-3" style="margin-bottom: 24px;">
        <div class="stat-tile" style="flex:1;">
          <div class="stat-label">Blocks</div>
          <div class="stat-value">${stats.doneBlocks}<span style="font-size:14px; color:var(--text-tertiary);">/${stats.totalBlocks}</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:${stats.pct}%"></div></div>
        </div>
        <div class="stat-tile" style="flex:1;">
          <div class="stat-label">Streak</div>
          <div class="stat-value">${stats.streak}<span style="font-size:14px; color:var(--text-tertiary);">d</span></div>
          <div class="stat-meta">consecutive</div>
        </div>
      </div>

      <div class="row gap-3" style="margin-bottom: 24px;">
        <div class="stat-tile" style="flex:1;">
          <div class="stat-label">Projects</div>
          <div class="stat-value" style="font-size: 18px;">${stats.projects}<span style="color:var(--text-tertiary); font-size:12px;">/20</span></div>
        </div>
        <div class="stat-tile" style="flex:1;">
          <div class="stat-label">SD Weeks</div>
          <div class="stat-value" style="font-size: 18px;">${stats.sds}<span style="color:var(--text-tertiary); font-size:12px;">/20</span></div>
        </div>
        <div class="stat-tile" style="flex:1;">
          <div class="stat-label">DSA Probs</div>
          <div class="stat-value" style="font-size: 18px;">${stats.dsaProbs}<span style="color:var(--text-tertiary); font-size:12px;">/150</span></div>
        </div>
      </div>

      <div class="kicker" style="margin-bottom: 12px;">Timeline</div>
      ${rows}

      <div class="row between" style="margin-top: 32px;">
        <button class="btn" data-action="export">export backup</button>
        <button class="btn" data-action="reset">reset all</button>
      </div>
    </div>
  `;
}

// ============================================================
// DSA VIEW — NeetCode 150 roadmap
// ============================================================
export function renderDSA() {
  const total = PATTERNS.reduce((s,p) => s + p.problems.length, 0);
  let done = 0;
  PATTERNS.forEach(p => p.problems.forEach(prob => {
    if (getProgress(`dsa_${prob.id}`)) done++;
  }));
  const pct = Math.round(done/total*100);

  const patternSections = PATTERNS.map(p => {
    const patternDone = p.problems.filter(prob => getProgress(`dsa_${prob.id}`)).length;
    const problemRows = p.problems.map(prob => {
      const isDone = getProgress(`dsa_${prob.id}`);
      const diffClass = `chip-diff-${prob.difficulty.toLowerCase()}`;
      return `
        <div class="problem-row ${isDone ? 'done' : ''}">
          <button class="problem-check ${isDone ? 'done' : ''}" data-action="toggle-problem" data-id="${prob.id}">
            ${isDone ? '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
          </button>
          <span class="problem-title">${esc(prob.title)}</span>
          <span class="chip ${diffClass}">${prob.difficulty}</span>
          <a href="${prob.url}" target="_blank" rel="noopener" class="problem-link" title="Open on LeetCode" onclick="event.stopPropagation();">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      `;
    }).join('');

    return `
      <div class="pattern-section">
        <div class="pattern-header">
          <button class="pattern-title" data-action="open-dsa-lesson" data-id="${p.lessonId}" style="text-align:left; cursor:pointer; background:none; border:none; padding:0;">
            ${esc(p.title)} →
          </button>
          <span class="pattern-count">${patternDone}/${p.problems.length}</span>
        </div>
        <div class="body-sm" style="margin-bottom: 12px;">${esc(p.blurb)}</div>
        ${problemRows}
      </div>
    `;
  }).join('');

  return `
    <div class="view stagger">
      <h1 class="h1" style="margin-bottom: 4px;">NeetCode 150<span style="color: var(--accent-amber);">.</span></h1>
      <div class="caption" style="margin-bottom: 16px;">Pattern-organized roadmap · ${done} of ${total} done · ${pct}%</div>
      <div class="progress-track" style="margin-bottom: 32px;"><div class="progress-fill" style="width:${pct}%"></div></div>
      ${patternSections}
    </div>
  `;
}

// ============================================================
// SD VIEW — System design roadmap (links to lessons)
// ============================================================
export function renderSD() {
  const allSDTopics = [
    { id: 'networking-fundamentals', title: 'Networking Fundamentals', section: 'Fundamentals', wn: 1 },
    { id: 'dns-cdn',                 title: 'DNS & CDNs',              section: 'Fundamentals', wn: 2 },
    { id: 'load-balancers',          title: 'Load Balancers',          section: 'Fundamentals', wn: 3 },
    { id: 'databases-i',             title: 'Databases I — SQL vs NoSQL', section: 'Fundamentals', wn: 4 },
    { id: 'caching',                 title: 'Caching',                 section: 'Fundamentals', wn: 5 },
    { id: 'message-queues',          title: 'Message Queues',          section: 'Fundamentals', wn: 6 },
    { id: 'databases-ii',            title: 'Databases II — Sharding', section: 'Fundamentals', wn: 7 },
    { id: 'cap-theorem',             title: 'CAP Theorem',             section: 'Fundamentals', wn: 8 },
    { id: 'url-shortener',           title: 'Design URL Shortener',    section: 'Classic Problems', wn: 9 },
    { id: 'pastebin',                title: 'Design Pastebin',         section: 'Classic Problems', wn: 10 },
    { id: 'twitter',                 title: 'Design Twitter',          section: 'Classic Problems', wn: 11 },
    { id: 'youtube',                 title: 'Design YouTube',          section: 'Classic Problems', wn: 12 },
    { id: 'uber',                    title: 'Design Uber',             section: 'Classic Problems', wn: 13 },
    { id: 'whatsapp',                title: 'Design WhatsApp',         section: 'Advanced', wn: 14 },
    { id: 'dropbox',                 title: 'Design Dropbox',          section: 'Advanced', wn: 15 },
    { id: 'web-crawler',             title: 'Design Web Crawler',      section: 'Advanced', wn: 16 },
    { id: 'news-feed',               title: 'Design News Feed',        section: 'Advanced', wn: 17 },
    { id: 'recommendation',          title: 'ML SD — Recommendation',  section: 'ML Systems', wn: 18 },
    { id: 'search-ranking',          title: 'ML SD — Search Ranking',  section: 'ML Systems', wn: 19 },
    { id: 'mock-week',               title: 'Mock Interview Week',     section: 'Practice', wn: 20 },
  ];

  const sections = {};
  allSDTopics.forEach(t => {
    if (!sections[t.section]) sections[t.section] = [];
    sections[t.section].push(t);
  });

  const sectionHtml = Object.entries(sections).map(([secName, topics]) => `
    <div class="pattern-section">
      <div class="pattern-header">
        <div class="pattern-title">${esc(secName)}</div>
        <span class="pattern-count">${topics.length}</span>
      </div>
      ${topics.map(t => {
        const done = getProgress(`w${t.wn}_sd`);
        return `
          <button class="problem-row" data-action="open-sd-lesson" data-id="${t.id}" style="border: none; background: none; width: 100%; text-align: left; cursor: pointer;">
            <span class="problem-check ${done ? 'done' : ''}">
              ${done ? '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
            </span>
            <span class="problem-title">${esc(t.title)}</span>
            <span class="chip">W${t.wn}</span>
            <span class="problem-link">→</span>
          </button>
        `;
      }).join('')}
    </div>
  `).join('');

  const doneCount = allSDTopics.filter(t => getProgress(`w${t.wn}_sd`)).length;
  return `
    <div class="view stagger">
      <h1 class="h1" style="margin-bottom: 4px;">System Design<span style="color: var(--accent-amber);">.</span></h1>
      <div class="caption" style="margin-bottom: 32px;">Grokking-style deep lessons · ${doneCount} of ${allSDTopics.length} done</div>
      ${sectionHtml}
    </div>
  `;
}
