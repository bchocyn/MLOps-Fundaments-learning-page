// ============================================================
// DSA LESSONS — Pattern deep dives with algorithm visualizations
// Each lesson teaches a pattern with: insight, visualization,
// template code, when to use, and common variations.
// ============================================================

import { arrayViz, linkedListViz, treeViz, callout, quiz, compareTable } from '../components/viz.js';

export const DSA_LESSONS = {

  // ============================================================
  // ARRAYS & HASHING
  // ============================================================
  'arrays-hashing': {
    title: 'Arrays & Hashing',
    subtitle: 'The foundation pattern. Master this before everything else.',
    duration: '15 min read',
    difficulty: 'Foundational',
    sections: [
      {
        title: 'The Core Insight',
        body: () => `
          <p>Almost every algorithm interview starts with one of two structures: an <strong>array</strong> (ordered, O(1) random access) or a <strong>hash map</strong> (unordered, O(1) lookup by key).</p>
          <p>If you remember one thing: <strong>"can I make this faster by trading space for time?" almost always means "use a hash map."</strong></p>
          ${callout('The classic Two Sum problem: brute force is O(n²) by checking every pair. With a hash map, it\'s O(n) — one pass, store seen numbers, check if complement exists. Same problem, vastly different solution, just by adding a hash map.', 'insight')}
        `
      },
      {
        title: 'The Two Sum Pattern',
        body: () => `
          <p>Given <code>nums = [2, 7, 11, 15]</code> and <code>target = 9</code>, find indices of two numbers that add to target.</p>
          ${arrayViz({
            values: [2, 7, 11, 15],
            pointers: [{ at: 0, label: 'i' }],
            label: 'Step 1: i=0, num=2, need 7 in map?',
            caption: 'For each num, check if (target - num) is in the hash map. If yes, done. If no, add this num.'
          })}
          ${arrayViz({
            values: [2, 7, 11, 15],
            pointers: [{ at: 1, label: 'i', color: '#8FA876' }],
            highlight: [0, 1],
            label: 'Step 2: i=1, num=7, need 2 in map? YES!',
            caption: 'Found: indices [0, 1]. Total time: O(n) instead of O(n²).'
          })}
          <pre style="background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px; font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); line-height: 1.6; overflow-x: auto;">function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i &lt; nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
}</pre>
        `
      },
      {
        title: 'When To Reach For Hashing',
        body: () => `
          <p>Signs that a hash map will collapse a problem from O(n²) to O(n):</p>
          <ul>
            <li>Need to find pairs that satisfy some property → <strong>store complements</strong></li>
            <li>Need to detect duplicates → <strong>set of seen values</strong></li>
            <li>Need to group by some key (anagrams, etc.) → <strong>map of key → list</strong></li>
            <li>Need to count occurrences → <strong>map of value → count</strong></li>
            <li>Need O(1) lookup by some derived key → <strong>precompute and store</strong></li>
          </ul>
          ${callout('A common interview "tell" is when the brute force is obvious and O(n²). The interviewer wants you to optimize. The optimization is almost always a hash map.', 'info')}
        `
      },
      {
        title: 'Common Variations',
        body: () => `
          ${compareTable({
            headers: ['Problem', 'Trick'],
            rows: [
              ['Contains Duplicate', 'Set of seen values'],
              ['Valid Anagram', 'Count chars in both strings, compare'],
              ['Group Anagrams', 'Key by sorted string OR char counts'],
              ['Top K Frequent', 'Map for counts, then heap or bucket sort'],
              ['Longest Consecutive Sequence', 'Set membership for O(1) lookups; only start counting from sequence starts'],
            ]
          })}
          ${quiz(
            'You have an array of integers and need to check if any value appears more than once. What\'s the fastest solution and what is its time/space complexity?',
            'Use a Set: iterate the array, if the value is already in the set return true, else add it. Time: O(n). Space: O(n). The space cost is the price you pay for the speedup.'
          )}
        `
      }
    ],
    pattern: 'arrays-hashing',
    template: `for each item:
  if condition with hash map:
    return answer
  add item to hash map`,
  },

  // ============================================================
  // TWO POINTERS
  // ============================================================
  'two-pointers': {
    title: 'Two Pointers',
    subtitle: 'Two indices walking the array, eliminating O(n²) work',
    duration: '12 min read',
    difficulty: 'Foundational',
    sections: [
      {
        title: 'The Core Insight',
        body: () => `
          <p>When a problem involves a sorted array and asks for pairs or subarrays with a property, two pointers usually beats brute force.</p>
          <p>The key insight: <strong>if you know which direction to move based on the current state, you can avoid backtracking.</strong></p>
          ${arrayViz({
            values: [-2, 1, 2, 4, 5, 7],
            pointers: [{ at: 0, label: 'L' }, { at: 5, label: 'R', color: '#8FA876' }],
            caption: 'Two pointers from opposite ends — converge based on comparison'
          })}
          <p>Example: <strong>Two Sum II</strong> on a sorted array. Sum the two pointed values. If too small, move left right (bigger value). If too big, move right left (smaller value). O(n) instead of O(n²).</p>
        `
      },
      {
        title: 'The Two-Sum-Sorted Walk',
        body: () => `
          <p>Target = 6. Array = [-2, 1, 2, 4, 5, 7].</p>
          ${arrayViz({
            values: [-2, 1, 2, 4, 5, 7],
            pointers: [{ at: 0, label: 'L' }, { at: 5, label: 'R', color: '#8FA876' }],
            label: 'L + R = -2 + 7 = 5. Too small → L++',
          })}
          ${arrayViz({
            values: [-2, 1, 2, 4, 5, 7],
            pointers: [{ at: 1, label: 'L' }, { at: 5, label: 'R', color: '#8FA876' }],
            label: 'L + R = 1 + 7 = 8. Too big → R--',
          })}
          ${arrayViz({
            values: [-2, 1, 2, 4, 5, 7],
            pointers: [{ at: 1, label: 'L' }, { at: 4, label: 'R', color: '#8FA876' }],
            highlight: [1, 4],
            label: 'L + R = 1 + 5 = 6. Match!',
            caption: 'Each pointer moved at most n times → O(n) total.'
          })}
          <pre style="background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px; font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); line-height: 1.6; overflow-x: auto;">function twoSumSorted(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l &lt; r) {
    const sum = nums[l] + nums[r];
    if (sum === target) return [l, r];
    if (sum &lt; target) l++;
    else r--;
  }
}</pre>
        `
      },
      {
        title: 'Pattern Variations',
        body: () => `
          ${compareTable({
            headers: ['Variation', 'Pointers move how'],
            rows: [
              ['Opposite ends', 'Start at 0 and n-1, converge'],
              ['Same direction (fast/slow)', 'Both start at 0, slow advances by 1, fast by 2'],
              ['Sliding window (special case)', 'Both move right, never go back'],
            ]
          })}
          ${callout('Reverse linked list, detect cycle (Floyd\'s), find middle of list — all use the fast/slow pointer variant. Same family.', 'info')}
          ${quiz(
            'You have a sorted array and want to remove duplicates in-place, returning the new length. How do you use two pointers?',
            'Slow pointer tracks the position to write to. Fast pointer scans. When fast finds a value different from slow, increment slow and copy fast\'s value there. O(n) time, O(1) space.'
          )}
        `
      }
    ],
    pattern: 'two-pointers',
    template: `l = 0, r = n - 1
while l < r:
  if condition: return result
  if too_small: l++
  else: r--`,
  },

  // ============================================================
  // SLIDING WINDOW
  // ============================================================
  'sliding-window': {
    title: 'Sliding Window',
    subtitle: 'A window that grows and shrinks as you traverse',
    duration: '15 min read',
    difficulty: 'Foundational',
    sections: [
      {
        title: 'The Core Insight',
        body: () => `
          <p>When a problem asks for "the best <strong>subarray</strong> or <strong>substring</strong> satisfying some property," sliding window often wins.</p>
          <p>The trick: <strong>maintain a window of valid indices [L, R]. Expand R when possible. Shrink L when the window violates the constraint.</strong> Each element is visited at most twice (once by R, once by L) → O(n).</p>
          ${arrayViz({
            values: [3, 1, 4, 1, 5, 9, 2, 6],
            window: [1, 4],
            pointers: [{ at: 1, label: 'L' }, { at: 4, label: 'R', color: '#8FA876' }],
            caption: 'Window [L, R] expands and contracts to maintain a property'
          })}
        `
      },
      {
        title: 'Walking Through "Longest Substring No Repeat"',
        body: () => `
          <p>Find the longest substring without repeating characters. Input: <code>"abcabcbb"</code>.</p>
          ${arrayViz({
            values: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'],
            window: [0, 2],
            pointers: [{ at: 0, label: 'L' }, { at: 2, label: 'R', color: '#8FA876' }],
            label: 'Window "abc" — all unique. Length 3.'
          })}
          ${arrayViz({
            values: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'],
            window: [0, 3],
            pointers: [{ at: 0, label: 'L' }, { at: 3, label: 'R', color: '#8FA876' }],
            highlight: [0, 3],
            label: 'R advances to "a". Now duplicate! Shrink L.'
          })}
          ${arrayViz({
            values: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'],
            window: [1, 3],
            pointers: [{ at: 1, label: 'L' }, { at: 3, label: 'R', color: '#8FA876' }],
            label: 'L = 1. Window "bca" — unique again.',
            caption: 'Each character visited at most twice. O(n) total.'
          })}
          <pre style="background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px; font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); line-height: 1.6; overflow-x: auto;">function longestSubstring(s) {
  const seen = new Set();
  let l = 0, best = 0;
  for (let r = 0; r &lt; s.length; r++) {
    while (seen.has(s[r])) {
      seen.delete(s[l]);
      l++;
    }
    seen.add(s[r]);
    best = Math.max(best, r - l + 1);
  }
  return best;
}</pre>
        `
      },
      {
        title: 'Fixed vs Variable Windows',
        body: () => `
          <p>Two flavors:</p>
          <p><strong>Fixed-size window.</strong> Maintain a window of exactly K elements. Slide one element at a time, adding the new one and removing the old. Use for "max sum of K consecutive elements" type problems.</p>
          <p><strong>Variable-size window.</strong> Grow R until a constraint is violated, shrink L until it's restored. Use for "longest/shortest substring with property X" problems.</p>
          ${callout('If the problem says "exactly K" → fixed window. If it says "at most K" or "longest/shortest with property" → variable window.', 'insight')}
          ${quiz(
            'You need to find the smallest substring that contains all characters of a target string. Fixed or variable window?',
            'Variable. Expand R until the window has all required chars, then shrink L as much as possible while still valid, then expand R again. Track the smallest valid window seen.'
          )}
        `
      }
    ],
    pattern: 'sliding-window',
    template: `l = 0
for r in range(n):
  expand window with arr[r]
  while window violates constraint:
    shrink window from l
    l++
  update best answer`,
  },

  // ============================================================
  // TREES
  // ============================================================
  'trees': {
    title: 'Trees',
    subtitle: 'Recursive structures, recursive solutions',
    duration: '18 min read',
    difficulty: 'Intermediate',
    sections: [
      {
        title: 'The Core Insight',
        body: () => `
          <p>A tree is a node plus a list of subtrees. That recursive definition <strong>is</strong> the solution template for most tree problems.</p>
          <p>The mental model: <strong>"do something for this node, recurse on each child, combine."</strong></p>
          ${treeViz({
            nodes: [
              { id: 1, value: 1, x: 240, y: 40 },
              { id: 2, value: 2, x: 140, y: 100, parent: 1 },
              { id: 3, value: 3, x: 340, y: 100, parent: 1 },
              { id: 4, value: 4, x: 80, y: 160, parent: 2 },
              { id: 5, value: 5, x: 200, y: 160, parent: 2 },
              { id: 6, value: 6, x: 400, y: 160, parent: 3 },
            ],
            caption: 'A binary tree. Each node has up to 2 children. Depth = 3.'
          })}
        `
      },
      {
        title: 'DFS vs BFS',
        body: () => `
          <p>Two ways to traverse. Pick based on what you need.</p>
          ${compareTable({
            headers: ['Traversal', 'Order', 'Use when'],
            rows: [
              ['DFS (recursion)', 'Go deep before wide', 'Path-based questions (max depth, sum of paths)'],
              ['BFS (queue)', 'Level by level', 'Shortest path, level-order output'],
            ]
          })}
          ${treeViz({
            nodes: [
              { id: 1, value: 1, x: 240, y: 40 },
              { id: 2, value: 2, x: 140, y: 100, parent: 1 },
              { id: 3, value: 3, x: 340, y: 100, parent: 1 },
              { id: 4, value: 4, x: 80, y: 160, parent: 2 },
              { id: 5, value: 5, x: 200, y: 160, parent: 2 },
              { id: 6, value: 6, x: 400, y: 160, parent: 3 },
            ],
            visited: [1, 2, 4, 5, 3, 6],
            caption: 'DFS preorder visits: 1 → 2 → 4 → 5 → 3 → 6'
          })}
          <pre style="background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px; font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); line-height: 1.6; overflow-x: auto;">// The template for DFS solutions
function dfs(node) {
  if (!node) return baseCase;
  const left = dfs(node.left);
  const right = dfs(node.right);
  return combine(node, left, right);
}</pre>
        `
      },
      {
        title: 'BST — Binary Search Tree',
        body: () => `
          <p>A binary tree with an extra rule: <strong>for any node, all values in the left subtree are smaller, all values in the right subtree are larger.</strong></p>
          ${treeViz({
            nodes: [
              { id: 1, value: 5, x: 240, y: 40 },
              { id: 2, value: 3, x: 140, y: 100, parent: 1 },
              { id: 3, value: 8, x: 340, y: 100, parent: 1 },
              { id: 4, value: 1, x: 80, y: 160, parent: 2 },
              { id: 5, value: 4, x: 200, y: 160, parent: 2 },
              { id: 6, value: 7, x: 290, y: 160, parent: 3 },
              { id: 7, value: 9, x: 390, y: 160, parent: 3 },
            ],
            caption: 'BST: left subtree < node < right subtree. Search is O(log n) when balanced.'
          })}
          <p>Searching: at each node, go left if target is smaller, right if bigger. O(log n) in a balanced BST. O(n) in a pathological one (a linked list in disguise).</p>
          ${quiz(
            'Given a BST and a target value, how do you find the smallest value strictly greater than target?',
            'Modified search: if current node value > target, candidate = current, go left. If current ≤ target, go right. Return final candidate. This is "successor" in BST terms.'
          )}
        `
      },
      {
        title: 'Common Tree Problems',
        body: () => `
          ${compareTable({
            headers: ['Problem', 'Pattern'],
            rows: [
              ['Max depth', 'Recursive: 1 + max(left depth, right depth)'],
              ['Same tree', 'Recursive: both null OR both same value AND both subtrees same'],
              ['Invert tree', 'Recursive: swap left/right children, recurse'],
              ['Validate BST', 'Recursive with min/max bounds passed down'],
              ['Level order', 'BFS with queue, track level boundaries'],
              ['LCA (Lowest Common Ancestor)', 'Recursive: if both p and q found in different subtrees, current node is LCA'],
              ['Serialize/Deserialize', 'Pre-order DFS with explicit null markers'],
            ]
          })}
        `
      }
    ],
    pattern: 'trees',
    template: `function solve(node):
  if not node: return baseCase
  left = solve(node.left)
  right = solve(node.right)
  return combine(node.val, left, right)`,
  },

  // ============================================================
  // STUBS for remaining patterns
  // ============================================================
  'stack':            stub('Stack', 'LIFO and monotonic stacks'),
  'binary-search':    stub('Binary Search', 'Divide and conquer on sorted data and monotonic answer spaces'),
  'linked-list':      stub('Linked List', 'Pointer manipulation, cycle detection, reversal'),
  'tries':            stub('Tries', 'Prefix tree for autocomplete and word search'),
  'heap':             stub('Heap', 'Priority queue for top-K and median tracking'),
  'backtracking':     stub('Backtracking', 'Try-recurse-undo for permutations, subsets, search'),
  'graphs':           stub('Graphs', 'BFS, DFS, Union-Find, topological sort'),
  'advanced-graphs':  stub('Advanced Graphs', 'Dijkstra, Bellman-Ford, MST'),
  '1d-dp':            stub('1-D Dynamic Programming', 'Memoize subproblems on a single dimension'),
  '2d-dp':            stub('2-D Dynamic Programming', 'Grid problems and two-string problems'),
  'greedy':           stub('Greedy', 'Locally optimal choices that produce a globally optimal answer'),
  'intervals':        stub('Intervals', 'Sort + sweep for overlap detection'),
  'math-geometry':    stub('Math & Geometry', 'Modular arithmetic, matrix manipulation, geometric reasoning'),
  'bit-manipulation': stub('Bit Manipulation', 'XOR tricks, bit shifting, set bit counting'),
};

function stub(title, subtitle) {
  return {
    title,
    subtitle,
    duration: 'Coming soon',
    difficulty: 'TBD',
    isStub: true,
    sections: [
      {
        title: 'Pattern lesson in progress',
        body: () => `
          <p>This pattern lesson follows the same structure as the flagship DSA lessons: core insight, animated walk-through, common variations, and template code.</p>
          <p>For now, use the recommended external resources:</p>
          <ul>
            <li><strong>NeetCode.io</strong> — video solutions for every problem in this pattern</li>
            <li><strong>LeetCode</strong> — try the problems listed under this pattern</li>
            <li><strong>"Cracking the Coding Interview"</strong> — chapters by topic</li>
          </ul>
        `
      }
    ],
    pattern: '',
    template: ''
  };
}
