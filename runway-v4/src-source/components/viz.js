// ============================================================
// VISUAL LIBRARY
// Reusable animated SVG components for lessons.
// Each function returns an HTML string ready to embed.
// ============================================================

const C = {
  bg: '#13110E',
  card: '#17140F',
  border: '#3A352D',
  text: '#F4EFE3',
  textDim: '#8E8773',
  amber: '#F5B842',
  sage: '#8FA876',
  blue: '#7B9FB5',
  terra: '#E07856',
  plum: '#B888C0',
};

let _vizId = 0;
const nextId = () => `viz${++_vizId}`;

// ============================================================
// ARCH DIAGRAM — boxes connected by arrows with animated request flow
// Use for: load balancers, microservices, ML pipelines
// ============================================================
export function archDiagram({ nodes, edges, caption, height = 240 }) {
  const id = nextId();
  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });

  const nodeSvg = nodes.map(n => {
    const color = n.color || C.amber;
    return `
      <g transform="translate(${n.x},${n.y})" class="arch-node">
        <rect x="-${n.w/2}" y="-${n.h/2}" width="${n.w}" height="${n.h}" rx="6"
              fill="${C.card}" stroke="${color}" stroke-width="1.5"/>
        <text x="0" y="-2" text-anchor="middle" fill="${C.text}"
              font-family="Inter Tight, sans-serif" font-size="12" font-weight="600">${n.label}</text>
        ${n.sub ? `<text x="0" y="14" text-anchor="middle" fill="${C.textDim}"
              font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="0.05em">${n.sub}</text>` : ''}
      </g>
    `;
  }).join('');

  // Edges with animated flow
  const edgeSvg = edges.map((e, i) => {
    const from = nodeMap[e.from];
    const to = nodeMap[e.to];
    if (!from || !to) return '';
    const x1 = from.x + (e.fromOffset?.x || 0);
    const y1 = from.y + (e.fromOffset?.y || 0);
    const x2 = to.x + (e.toOffset?.x || 0);
    const y2 = to.y + (e.toOffset?.y || 0);
    const color = e.color || C.amber;
    return `
      <g class="arch-edge" style="--delay: ${i * 0.3}s">
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
              stroke="${color}" stroke-width="1.2" stroke-opacity="0.4"/>
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
              stroke="${color}" stroke-width="2" stroke-dasharray="6 6"
              class="arch-edge-flow"/>
        ${e.label ? `<text x="${(x1+x2)/2}" y="${(y1+y2)/2 - 6}" text-anchor="middle"
              fill="${C.textDim}" font-family="JetBrains Mono, monospace" font-size="9">${e.label}</text>` : ''}
      </g>
    `;
  }).join('');

  return `
    <div class="lesson-viz">
      <svg viewBox="0 0 480 ${height}" width="100%" height="${height}" id="${id}">
        <defs>
          <marker id="${id}-arrow" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="${C.amber}" opacity="0.5"/>
          </marker>
        </defs>
        ${edgeSvg}
        ${nodeSvg}
      </svg>
      ${caption ? `<div class="lesson-viz-caption">${caption}</div>` : ''}
      <style>
        #${id} .arch-node { animation: fade-up 0.5s var(--ease-out) backwards; }
        #${id} .arch-node:nth-child(${nodes.length + 1}) { animation-delay: 0.1s; }
        #${id} .arch-edge { animation: fade-in 0.6s var(--ease-out) backwards; animation-delay: var(--delay, 0s); }
        #${id} .arch-edge-flow { animation: flow-dash 1.2s linear infinite; }
      </style>
    </div>
  `;
}

// ============================================================
// SEQUENCE DIAGRAM — actors with timeline of messages
// Use for: TCP handshake, TLS handshake, OAuth flow, API calls
// ============================================================
export function sequenceDiagram({ actors, messages, caption, height = 280 }) {
  const id = nextId();
  const cols = actors.length;
  const colWidth = 460 / cols;
  const startX = 30;
  const actorY = 30;
  const baseY = 70;
  const stepY = 36;

  const actorSvg = actors.map((a, i) => {
    const x = startX + i * colWidth + colWidth / 2;
    return `
      <g class="seq-actor">
        <rect x="${x - 50}" y="${actorY - 14}" width="100" height="28" rx="4"
              fill="${C.card}" stroke="${C.amber}" stroke-width="1.2"/>
        <text x="${x}" y="${actorY + 4}" text-anchor="middle" fill="${C.text}"
              font-family="Inter Tight, sans-serif" font-size="12" font-weight="600">${a}</text>
        <line x1="${x}" y1="${actorY + 16}" x2="${x}" y2="${height - 10}"
              stroke="${C.border}" stroke-width="1" stroke-dasharray="2 4"/>
      </g>
    `;
  }).join('');

  const messageSvg = messages.map((m, i) => {
    const y = baseY + i * stepY;
    const fromX = startX + m.from * colWidth + colWidth / 2;
    const toX = startX + m.to * colWidth + colWidth / 2;
    const color = m.color || C.amber;
    const isReturn = m.return;
    return `
      <g class="seq-msg" style="--delay: ${i * 0.4}s">
        <line x1="${fromX}" y1="${y}" x2="${toX}" y2="${y}"
              stroke="${color}" stroke-width="1.5" marker-end="url(#${id}-arrow)"
              ${isReturn ? 'stroke-dasharray="4 4"' : ''}/>
        <text x="${(fromX + toX) / 2}" y="${y - 6}" text-anchor="middle"
              fill="${C.text}" font-family="JetBrains Mono, monospace" font-size="10"
              font-weight="500">${m.label}</text>
      </g>
    `;
  }).join('');

  return `
    <div class="lesson-viz">
      <svg viewBox="0 0 480 ${height}" width="100%" height="${height}" id="${id}">
        <defs>
          <marker id="${id}-arrow" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="${C.amber}"/>
          </marker>
        </defs>
        ${actorSvg}
        ${messageSvg}
      </svg>
      ${caption ? `<div class="lesson-viz-caption">${caption}</div>` : ''}
      <style>
        #${id} .seq-actor { animation: fade-down 0.4s var(--ease-out) backwards; }
        #${id} .seq-msg { animation: fade-in 0.5s var(--ease-out) backwards; animation-delay: var(--delay); }
        #${id} .seq-msg line { stroke-dasharray: 0; animation: seq-draw 0.6s var(--ease-out) backwards; animation-delay: var(--delay); }
        @keyframes seq-draw { from { stroke-dashoffset: 100; stroke-dasharray: 100; } to { stroke-dashoffset: 0; } }
      </style>
    </div>
  `;
}

// ============================================================
// ARRAY VIZ — array with pointer animations
// Use for: Sliding window, two pointers, binary search
// ============================================================
export function arrayViz({ values, pointers = [], window, highlight = [], caption, label }) {
  const id = nextId();
  const cellW = 44;
  const cellH = 44;
  const startX = (480 - values.length * cellW) / 2;
  const baseY = 60;

  const cells = values.map((v, i) => {
    const x = startX + i * cellW;
    const inWindow = window && i >= window[0] && i <= window[1];
    const isHi = highlight.includes(i);
    let fill = C.card;
    let stroke = C.border;
    if (isHi) { fill = C.amber; stroke = C.amber; }
    else if (inWindow) { fill = 'rgba(245, 184, 66, 0.15)'; stroke = C.amber; }
    return `
      <g class="arr-cell" style="--i: ${i}">
        <rect x="${x}" y="${baseY}" width="${cellW - 2}" height="${cellH}" rx="4"
              fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>
        <text x="${x + cellW/2 - 1}" y="${baseY + cellH/2 + 5}" text-anchor="middle"
              fill="${isHi ? C.bg : C.text}" font-family="JetBrains Mono, monospace"
              font-size="14" font-weight="600">${v}</text>
        <text x="${x + cellW/2 - 1}" y="${baseY + cellH + 16}" text-anchor="middle"
              fill="${C.textDim}" font-family="JetBrains Mono, monospace" font-size="9">${i}</text>
      </g>
    `;
  }).join('');

  const pointerSvg = pointers.map((p, idx) => {
    const x = startX + p.at * cellW + cellW / 2 - 1;
    const color = p.color || (idx === 0 ? C.amber : C.blue);
    return `
      <g class="arr-pointer" style="--delay: ${idx * 0.2}s">
        <path d="M ${x - 6} ${baseY - 10} L ${x + 6} ${baseY - 10} L ${x} ${baseY - 2} z"
              fill="${color}"/>
        <text x="${x}" y="${baseY - 16}" text-anchor="middle" fill="${color}"
              font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">${p.label}</text>
      </g>
    `;
  }).join('');

  return `
    <div class="lesson-viz">
      <svg viewBox="0 0 480 ${baseY + cellH + 40}" width="100%" id="${id}">
        ${label ? `<text x="240" y="20" text-anchor="middle" fill="${C.textDim}"
              font-family="JetBrains Mono, monospace" font-size="11"
              letter-spacing="0.1em" text-transform="uppercase">${label}</text>` : ''}
        ${cells}
        ${pointerSvg}
      </svg>
      ${caption ? `<div class="lesson-viz-caption">${caption}</div>` : ''}
      <style>
        #${id} .arr-cell { animation: fade-up 0.4s var(--ease-out) backwards;
                          animation-delay: calc(var(--i) * 0.04s); }
        #${id} .arr-pointer { animation: fade-down 0.5s var(--ease-out) backwards;
                              animation-delay: calc(0.5s + var(--delay)); }
      </style>
    </div>
  `;
}

// ============================================================
// TREE VIZ — binary tree or general tree
// Use for: BFS/DFS, BST, Trie, Heap
// nodes: [{id, value, x, y, parent}]
// ============================================================
export function treeViz({ nodes, highlight = [], visited = [], caption }) {
  const id = nextId();
  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });

  const edges = nodes.filter(n => n.parent != null).map(n => {
    const p = nodeMap[n.parent];
    return `<line x1="${p.x}" y1="${p.y}" x2="${n.x}" y2="${n.y}"
                  stroke="${C.border}" stroke-width="1.5"/>`;
  }).join('');

  const nodeSvg = nodes.map((n, i) => {
    const isHi = highlight.includes(n.id);
    const isVis = visited.includes(n.id);
    let fill = C.card;
    let stroke = C.border;
    let textColor = C.text;
    if (isHi) { fill = C.amber; stroke = C.amber; textColor = C.bg; }
    else if (isVis) { fill = 'rgba(143, 168, 118, 0.2)'; stroke = C.sage; textColor = C.sage; }
    return `
      <g class="tree-node" style="--i: ${i}">
        <circle cx="${n.x}" cy="${n.y}" r="18" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>
        <text x="${n.x}" y="${n.y + 5}" text-anchor="middle" fill="${textColor}"
              font-family="JetBrains Mono, monospace" font-size="13" font-weight="600">${n.value}</text>
      </g>
    `;
  }).join('');

  const maxY = Math.max(...nodes.map(n => n.y)) + 40;
  return `
    <div class="lesson-viz">
      <svg viewBox="0 0 480 ${maxY}" width="100%" id="${id}">
        ${edges}
        ${nodeSvg}
      </svg>
      ${caption ? `<div class="lesson-viz-caption">${caption}</div>` : ''}
      <style>
        #${id} line { animation: fade-in 0.4s var(--ease-out) backwards; animation-delay: 0.1s; }
        #${id} .tree-node { animation: scale-in 0.4s var(--ease-out) backwards;
                            animation-delay: calc(var(--i) * 0.06s); transform-origin: center; transform-box: fill-box; }
      </style>
    </div>
  `;
}

// ============================================================
// LINKED LIST VIZ — nodes with arrows showing next pointers
// Use for: Linked list problems
// ============================================================
export function linkedListViz({ values, pointers = [], caption }) {
  const id = nextId();
  const nodeW = 56;
  const gap = 16;
  const totalW = values.length * nodeW + (values.length - 1) * gap;
  const startX = (480 - totalW) / 2;
  const y = 60;

  const cells = values.map((v, i) => {
    const x = startX + i * (nodeW + gap);
    return `
      <g class="ll-node" style="--i: ${i}">
        <rect x="${x}" y="${y}" width="${nodeW}" height="40" rx="4"
              fill="${C.card}" stroke="${C.amber}" stroke-width="1.5"/>
        <text x="${x + nodeW/2}" y="${y + 25}" text-anchor="middle" fill="${C.text}"
              font-family="JetBrains Mono, monospace" font-size="13" font-weight="600">${v}</text>
        ${i < values.length - 1 ? `
          <path d="M ${x + nodeW + 2} ${y + 20} L ${x + nodeW + gap - 4} ${y + 20}"
                stroke="${C.amber}" stroke-width="1.5" marker-end="url(#${id}-arr)"/>
        ` : `
          <text x="${x + nodeW + 8}" y="${y + 24}" fill="${C.textDim}"
                font-family="JetBrains Mono, monospace" font-size="11">NULL</text>
        `}
      </g>
    `;
  }).join('');

  const pointerSvg = pointers.map((p, i) => {
    const x = startX + p.at * (nodeW + gap) + nodeW / 2;
    return `
      <g class="ll-pointer">
        <path d="M ${x - 6} ${y - 10} L ${x + 6} ${y - 10} L ${x} ${y - 2} z"
              fill="${p.color || C.blue}"/>
        <text x="${x}" y="${y - 16}" text-anchor="middle" fill="${p.color || C.blue}"
              font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">${p.label}</text>
      </g>
    `;
  }).join('');

  return `
    <div class="lesson-viz">
      <svg viewBox="0 0 480 140" width="100%" id="${id}">
        <defs>
          <marker id="${id}-arr" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="${C.amber}"/>
          </marker>
        </defs>
        ${cells}
        ${pointerSvg}
      </svg>
      ${caption ? `<div class="lesson-viz-caption">${caption}</div>` : ''}
      <style>
        #${id} .ll-node { animation: fade-up 0.4s var(--ease-out) backwards;
                          animation-delay: calc(var(--i) * 0.08s); }
      </style>
    </div>
  `;
}

// ============================================================
// COMPARISON TABLE — side-by-side visual
// Use for: SQL vs NoSQL, TCP vs UDP, etc.
// ============================================================
export function compareTable({ headers, rows, caption }) {
  const headerRow = headers.map((h, i) => {
    const cls = i === 0 ? '' : `chip chip-track-${['devops', 'sd', 'mlops', 'dsa'][i - 1] || 'devops'}`;
    return `<th>${i === 0 ? h : `<span class="${cls}">${h}</span>`}</th>`;
  }).join('');
  const bodyRows = rows.map(r => `
    <tr>${r.map((c, i) => `<td>${c}</td>`).join('')}</tr>
  `).join('');
  return `
    <table class="lesson-table">
      <thead><tr>${headerRow}</tr></thead>
      <tbody>${bodyRows}</tbody>
    </table>
    ${caption ? `<div class="lesson-viz-caption" style="margin-top:8px;">${caption}</div>` : ''}
  `;
}

// ============================================================
// CALLOUT — highlighted notes
// ============================================================
export function callout(text, kind = 'info') {
  return `<div class="callout callout-${kind}">${text}</div>`;
}

// ============================================================
// QUIZ — collapsible question/answer
// ============================================================
export function quiz(q, a) {
  const id = nextId();
  return `
    <div class="lesson-quiz">
      <div class="lesson-quiz-label">◇ Self-check</div>
      <div class="lesson-quiz-q">${q}</div>
      <button class="lesson-quiz-reveal" onclick="document.getElementById('${id}').classList.toggle('open'); this.style.display='none';">
        Reveal answer →
      </button>
      <div class="lesson-quiz-a" id="${id}">${a}</div>
    </div>
  `;
}
