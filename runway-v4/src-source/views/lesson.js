// Lesson view — renders deep lessons with Next/Prev navigation
import { SD_LESSONS } from '../data/sd-lessons.js';
import { DSA_LESSONS } from '../data/dsa-lessons.js';
import { CORE_LESSONS, CORE_TRACKS } from '../data/core-lessons.js';
import { state } from '../state.js';

const esc = s => String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Resolve a lesson by its (kind, id) and figure out its position in the appropriate deck
function resolveLesson(kind, id) {
  if (kind === 'sd') {
    const keys = Object.keys(SD_LESSONS);
    const idx = keys.indexOf(id);
    return {
      lesson: SD_LESSONS[id],
      deckName: 'System Design',
      deckCode: 'sd',
      deckColor: '#7B9FB5',
      siblings: keys,
      idx,
      prev: idx > 0 ? { kind: 'sd', id: keys[idx - 1] } : null,
      next: idx < keys.length - 1 ? { kind: 'sd', id: keys[idx + 1] } : null,
    };
  }
  if (kind === 'dsa') {
    const keys = Object.keys(DSA_LESSONS);
    const idx = keys.indexOf(id);
    return {
      lesson: DSA_LESSONS[id],
      deckName: 'DSA Patterns',
      deckCode: 'dsa',
      deckColor: '#B888C0',
      siblings: keys,
      idx,
      prev: idx > 0 ? { kind: 'dsa', id: keys[idx - 1] } : null,
      next: idx < keys.length - 1 ? { kind: 'dsa', id: keys[idx + 1] } : null,
    };
  }
  if (kind === 'core') {
    const lesson = CORE_LESSONS[id];
    if (!lesson) return { lesson: null };
    const track = CORE_TRACKS.find(t => t.id === lesson.track);
    if (!track) return { lesson, deckName: 'Library', deckCode: 'core', deckColor: '#F5B842', siblings: [], idx: 0, prev: null, next: null };
    const idx = track.lessons.indexOf(id);
    return {
      lesson,
      deckName: track.name,
      deckCode: 'core',
      deckColor: track.color,
      trackIcon: track.icon,
      siblings: track.lessons,
      idx,
      prev: idx > 0 ? { kind: 'core', id: track.lessons[idx - 1] } : null,
      next: idx < track.lessons.length - 1 ? { kind: 'core', id: track.lessons[idx + 1] } : null,
    };
  }
  return { lesson: null };
}

function lessonTitleFor(kind, id) {
  if (kind === 'sd') return SD_LESSONS[id]?.title || id;
  if (kind === 'dsa') return DSA_LESSONS[id]?.title || id;
  if (kind === 'core') return CORE_LESSONS[id]?.title || id;
  return id;
}

export function renderLesson() {
  if (!state.selectedLesson) return '<div class="view"><div class="empty">No lesson selected</div></div>';
  const { kind, id } = state.selectedLesson;
  const ctx = resolveLesson(kind, id);
  if (!ctx.lesson) return `<div class="view"><div class="empty">Lesson "${id}" not found.</div></div>`;

  const { lesson, deckName, deckColor, siblings, idx, prev, next, trackIcon } = ctx;

  const sections = lesson.sections.map((sec, i) => `
    <section class="lesson-section">
      <div class="lesson-section-header">
        <span class="lesson-section-num">${String(i + 1).padStart(2, '0')}</span>
        <h2 class="lesson-section-title">${esc(sec.title)}</h2>
      </div>
      <div class="lesson-body">${sec.body()}</div>
    </section>
  `).join('');

  const termsHtml = (lesson.keyTerms || []).length ? `
    <div class="lesson-section">
      <div class="kicker" style="margin-bottom: 12px;">Key Terms to Know</div>
      <div class="brief-terms">${lesson.keyTerms.map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>
    </div>
  ` : '';

  const sourcesHtml = (lesson.sources || []).length ? `
    <div class="lesson-section">
      <div class="kicker" style="margin-bottom: 12px;">Sources & Further Reading</div>
      <ul style="list-style: none; padding: 0; color: var(--text-secondary); font-size: 14px; line-height: 1.7;">
        ${lesson.sources.map(s => `<li style="padding: 4px 0;">• ${esc(s)}</li>`).join('')}
      </ul>
    </div>
  ` : '';

  const aiBtn = state.aiConfig.enabled ? `
    <button class="btn btn-primary" style="margin-top: 24px;" data-action="ask-ai" data-context="${esc(lesson.title + ' — ' + (lesson.subtitle || ''))}">
      Ask Claude about this lesson →
    </button>
  ` : '';

  const progressBar = siblings.length > 1 ? `
    <div style="margin-top: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
        <span class="mono" style="font-size: 10px; color: var(--text-tertiary); letter-spacing: 0.12em; text-transform: uppercase;">Lesson ${idx + 1} of ${siblings.length}</span>
        <span class="mono" style="font-size: 10px; color: var(--text-tertiary);">${Math.round(((idx + 1) / siblings.length) * 100)}%</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width: ${((idx + 1) / siblings.length) * 100}%; background: linear-gradient(90deg, ${deckColor}, ${deckColor}cc);"></div>
      </div>
    </div>
  ` : '';

  const nextPrevHtml = (prev || next) ? `
    <div class="lesson-nav" style="margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--border-subtle); display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
      ${prev ? `
        <button class="lesson-nav-card prev" data-action="select-lesson" data-kind="${prev.kind}" data-id="${prev.id}" style="text-align: left;">
          <div class="mono" style="font-size: 9px; color: var(--text-tertiary); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 4px;">← Previous</div>
          <div style="font-family: var(--font-serif); font-size: 15px; font-weight: 600; color: var(--text-primary); line-height: 1.3;">${esc(lessonTitleFor(prev.kind, prev.id))}</div>
        </button>
      ` : '<div></div>'}
      ${next ? `
        <button class="lesson-nav-card next" data-action="select-lesson" data-kind="${next.kind}" data-id="${next.id}" style="text-align: right;">
          <div class="mono" style="font-size: 9px; color: var(--text-tertiary); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 4px;">Next →</div>
          <div style="font-family: var(--font-serif); font-size: 15px; font-weight: 600; color: var(--text-primary); line-height: 1.3;">${esc(lessonTitleFor(next.kind, next.id))}</div>
        </button>
      ` : '<div></div>'}
    </div>
  ` : '';

  const trackBadge = `<span class="chip" style="background: ${deckColor}1a; color: ${deckColor}; border-color: ${deckColor}40;">${trackIcon ? trackIcon + ' ' : ''}${esc(deckName)}</span>`;

  return `
    <div class="view animate-fade-up">
      <div class="lesson-header">
        <button class="lesson-back" data-action="back-from-lesson">← Back</button>
        <h1 class="lesson-title">${esc(lesson.title)}</h1>
        ${lesson.subtitle ? `<div class="body" style="margin-bottom: 12px;">${esc(lesson.subtitle)}</div>` : ''}
        <div class="lesson-meta">
          <span class="chip">${esc(lesson.duration || '')}</span>
          ${lesson.difficulty ? `<span class="chip">${esc(lesson.difficulty)}</span>` : ''}
          ${trackBadge}
        </div>
        ${progressBar}
      </div>

      ${sections}
      ${termsHtml}
      ${sourcesHtml}
      ${aiBtn}
      ${nextPrevHtml}
    </div>
  `;
}
