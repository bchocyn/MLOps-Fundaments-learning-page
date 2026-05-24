// Lesson view — renders deep lessons (Grokking-style)
import { SD_LESSONS } from '../data/sd-lessons.js';
import { DSA_LESSONS } from '../data/dsa-lessons.js';
import { state } from '../state.js';

const esc = s => String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function renderLesson() {
  if (!state.selectedLesson) return '<div class="view"><div class="empty">No lesson selected</div></div>';
  const { kind, id } = state.selectedLesson;
  const lessons = kind === 'sd' ? SD_LESSONS : DSA_LESSONS;
  const lesson = lessons[id];
  if (!lesson) return `<div class="view"><div class="empty">Lesson "${id}" not found.</div></div>`;

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

  return `
    <div class="view animate-fade-up">
      <div class="lesson-header">
        <button class="lesson-back" data-action="back-from-lesson">← Back</button>
        <h1 class="lesson-title">${esc(lesson.title)}</h1>
        ${lesson.subtitle ? `<div class="body" style="margin-bottom: 12px;">${esc(lesson.subtitle)}</div>` : ''}
        <div class="lesson-meta">
          <span class="chip">${esc(lesson.duration || '')}</span>
          ${lesson.difficulty ? `<span class="chip">${esc(lesson.difficulty)}</span>` : ''}
          <span class="chip chip-track-${kind}">${kind === 'sd' ? '◇ System Design' : '⌘ DSA Pattern'}</span>
        </div>
      </div>

      ${sections}
      ${termsHtml}
      ${sourcesHtml}
      ${aiBtn}
    </div>
  `;
}
