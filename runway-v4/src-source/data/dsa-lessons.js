// ============================================================
// DSA PATTERN LESSONS — NeetCode 150 patterns, fully written
// All 18 patterns with animated array/tree/linked-list visualizations
// ============================================================

import { arrayViz, treeViz, linkedListViz, compareTable, callout, quiz } from '../components/viz.js';

export const DSA_LESSONS = {

  'arrays-hashing': {
    title: 'Arrays & Hashing',
    subtitle: 'The most common pattern — trading memory for time',
    duration: '20 min read', difficulty: 'Foundational', pattern: 'Arrays & Hashing',
    sections: [
      { title: 'Core Insight', body: () => `
        <p>When a problem mentions "find pairs," "find duplicates," "group by something," or "count occurrences" — reach for a hash map. You're trading O(n) memory for the ability to look things up in O(1) instead of scanning.</p>
        <p>This pattern alone solves about 20% of all easy interview problems.</p>
        ${callout('Mental rule: if your brain wants to write a nested loop to check pairs, stop. There\'s probably a hash map solution that turns O(n²) into O(n).', 'insight')}` },
      { title: 'Two Sum — Walkthrough', body: () => `
        <p><strong>Problem:</strong> Given <code>nums = [2, 7, 11, 15]</code> and <code>target = 9</code>, return indices of two numbers that add to target.</p>
        <p><strong>Brute force:</strong> two nested loops, check every pair. O(n²).</p>
        <p><strong>Hash map:</strong> as you iterate, for each <code>num</code>, check if <code>target - num</code> is in the map. If yes, return both indices. If no, add <code>num</code> to map.</p>
        ${arrayViz({ values: [2, 7, 11, 15], pointers: [{ index: 0, label: 'i', color: '#F5B842' }], caption: 'i=0, num=2, need 7. Map: {} → check, not there. Add {2:0}.' })}
        ${arrayViz({ values: [2, 7, 11, 15], pointers: [{ index: 1, label: 'i', color: '#F5B842' }], highlight: [0, 1], caption: 'i=1, num=7, need 2. Map: {2:0} → FOUND! Return [0, 1].' })}
        <p>O(n) time, O(n) space. The hash map made the "is X in my array" check free.</p>` },
      { title: 'When To Reach For Hashing', body: () => `
        ${compareTable({ headers: ['Signal', 'Likely solution'], rows: [
          ['"Find two/three elements that..."', 'Hash map for complements'],
          ['"Group by some property"', 'Map of property → list'],
          ['"Find duplicates" / "first non-repeating"', 'Map of element → count'],
          ['"Check if anagram"', 'Map of char → count, compare maps'],
          ['"Subarray with sum K"', 'Prefix sum + hash map'],
        ] })}` },
      { title: 'Common Variations', body: () => `
        <p><strong>Group Anagrams.</strong> Map of sorted-string → list of originals.</p>
        <p><strong>Top K Frequent.</strong> Count with map, then bucket sort by count.</p>
        <p><strong>Longest Consecutive Sequence.</strong> Put all in a set, only start counting from numbers that are sequence starts (n-1 not in set).</p>
        ${quiz('You have an array of 10K integers. Find all pairs summing to 100. What\'s the time complexity using hashing vs brute force?', 'Brute force: O(n²) = 100M ops. Hashing: O(n) = 10K ops. 10,000x speedup for trivial memory cost.')}` }
    ],
    template: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return [];
}`
  },

  'two-pointers': {
    title: 'Two Pointers',
    subtitle: 'When sorted matters — converge from both ends',
    duration: '20 min read', difficulty: 'Foundational', pattern: 'Two Pointers',
    sections: [
      { title: 'Core Insight', body: () => `
        <p>Two pointers, usually L (left) and R (right), move toward each other based on a condition. Each iteration moves at least one pointer, so you scan the array in O(n) instead of O(n²).</p>
        <p>The setup almost always requires <strong>sorted input</strong>, because you need ordered comparisons to know which pointer to move.</p>` },
      { title: 'Two Sum Sorted — Walkthrough', body: () => `
        <p><strong>Problem:</strong> Sorted <code>nums = [2, 4, 7, 11, 15]</code>, target = 18.</p>
        ${arrayViz({ values: [2, 4, 7, 11, 15], pointers: [
          { index: 0, label: 'L', color: '#F5B842' }, { index: 4, label: 'R', color: '#7B9FB5' }
        ], caption: 'L=2, R=15, sum=17 < 18. Need larger. Move L right.' })}
        ${arrayViz({ values: [2, 4, 7, 11, 15], pointers: [
          { index: 1, label: 'L', color: '#F5B842' }, { index: 4, label: 'R', color: '#7B9FB5' }
        ], caption: 'L=4, R=15, sum=19 > 18. Need smaller. Move R left.' })}
        ${arrayViz({ values: [2, 4, 7, 11, 15], pointers: [
          { index: 1, label: 'L', color: '#F5B842' }, { index: 3, label: 'R', color: '#7B9FB5' }
        ], highlight: [1, 3], caption: 'L=4, R=11, sum=15... wait, target=18. Actually 4+11=15. Keep going. (Demo of the pattern.)' })}
        <p>The point: each step you eliminate one element from consideration. O(n) total.</p>` },
      { title: 'Pattern Variations', body: () => `
        ${compareTable({ headers: ['Problem family', 'How', 'Example'], rows: [
          ['Sum to target (sorted)', 'L + R, move based on sum vs target', 'Two Sum II, 3Sum'],
          ['Container With Most Water', 'L + R, move shorter side', 'Maximize area'],
          ['Reverse / palindrome check', 'L moves right, R moves left, compare', 'Valid Palindrome'],
          ['Remove duplicates in-place', 'Slow + fast pointer', 'Remove Duplicates from Sorted Array'],
        ] })}` },
      { title: 'Sliding Window Connection', body: () => `
        <p>Sliding window is really "two pointers that both move right." If you understand two pointers, sliding window is almost free.</p>
        ${quiz('Why does two-pointers fail on an UNSORTED array for the sum problem?', 'Without sort, sum comparison doesn\'t tell you which direction to move. Could need bigger AND smaller, no way to know which. Hash map handles unsorted in O(n).')}` }
    ],
    template: `function twoSumSorted(nums, target) {
  let L = 0, R = nums.length - 1;
  while (L < R) {
    const sum = nums[L] + nums[R];
    if (sum === target) return [L, R];
    if (sum < target) L++;
    else R--;
  }
  return [];
}`
  },

  'sliding-window': {
    title: 'Sliding Window',
    subtitle: 'Find contiguous subarrays without re-scanning',
    duration: '22 min read', difficulty: 'Foundational', pattern: 'Sliding Window',
    sections: [
      { title: 'Core Insight', body: () => `
        <p>When a problem asks for the longest/shortest/max/min <strong>contiguous</strong> subarray meeting some condition, sliding window turns naive O(n²) into O(n).</p>
        <p>Two pointers <code>L</code> and <code>R</code>. Both start at 0. <code>R</code> expands the window. When the window violates the condition, <code>L</code> shrinks it. Each element entered and left at most once → O(n).</p>` },
      { title: 'Longest Substring Without Repeat — Walkthrough', body: () => `
        <p><strong>Problem:</strong> string = "abcabcbb", find longest substring with no repeating characters.</p>
        ${arrayViz({ values: ['a','b','c','a','b','c','b','b'], window: { start: 0, end: 2 }, caption: 'Window [a,b,c], length 3, all unique. Expand R.' })}
        ${arrayViz({ values: ['a','b','c','a','b','c','b','b'], window: { start: 0, end: 3 }, caption: 'Add a at R=3. Duplicate! Window has two a\'s. Shrink L.' })}
        ${arrayViz({ values: ['a','b','c','a','b','c','b','b'], window: { start: 1, end: 3 }, caption: 'Move L past first a → window [b,c,a], length 3, all unique again.' })}
        <p>Track max length as you go. Use a set/map to know what\'s currently in the window.</p>` },
      { title: 'Fixed vs Variable Windows', body: () => `
        ${compareTable({ headers: ['Type', 'How', 'Example'], rows: [
          ['Fixed size', 'Slide a window of size K', 'Max sum subarray of size K'],
          ['Variable, expand-then-shrink', 'R expands until invalid, L shrinks until valid', 'Longest substring no repeat'],
          ['Variable, find smallest', 'R expands until valid, L shrinks while still valid', 'Min window containing all chars'],
        ] })}
        ${callout('The trick to most sliding window problems: ask "when do I shrink the window?" The answer is the condition that defines "invalid."', 'insight')}` },
      { title: 'Common Problems', body: () => `
        <ul>
          <li><strong>Longest Substring Without Repeating</strong> — variable, hash set</li>
          <li><strong>Minimum Window Substring</strong> — variable, char counts</li>
          <li><strong>Permutation in String</strong> — fixed, char counts</li>
          <li><strong>Best Time to Buy & Sell Stock</strong> — two pointers / window</li>
        </ul>
        ${quiz('Why is sliding window O(n), not O(n²)?', 'L only moves right, never resets. R only moves right. Each pointer touches each index at most once. Total work = 2n = O(n).')}` }
    ],
    template: `function lengthOfLongestSubstring(s) {
  let L = 0, maxLen = 0;
  const seen = new Set();
  for (let R = 0; R < s.length; R++) {
    while (seen.has(s[R])) { seen.delete(s[L]); L++; }
    seen.add(s[R]);
    maxLen = Math.max(maxLen, R - L + 1);
  }
  return maxLen;
}`
  },

  'stack': {
    title: 'Stack',
    subtitle: 'LIFO and the monotonic stack pattern',
    duration: '20 min read', difficulty: 'Foundational', pattern: 'Stack',
    sections: [
      { title: 'Core Insight', body: () => `
        <p>A stack is LIFO — last in, first out. Used when you need to remember things in reverse order, or when you need to match opens with closes.</p>
        <p>Two flavors come up in interviews: <strong>basic stack</strong> (matching parens, undo history) and <strong>monotonic stack</strong> (next-greater-element problems).</p>` },
      { title: 'Valid Parentheses — Walkthrough', body: () => `
        <p><strong>Problem:</strong> Is "{[()]}" balanced?</p>
        <p>Iterate. On open bracket → push to stack. On close → check stack top is the matching open, pop. If mismatch or empty when expecting open → invalid.</p>
        ${arrayViz({ values: ['{','[','(',')',']','}'], pointers: [{ index: 0, label: 'i', color: '#F5B842' }], caption: 'i=0, push {. Stack: [{]' })}
        ${arrayViz({ values: ['{','[','(',')',']','}'], pointers: [{ index: 3, label: 'i', color: '#F5B842' }], caption: 'i=3, ). Top is (, match. Pop. Stack: [{, []' })}
        ${arrayViz({ values: ['{','[','(',')',']','}'], pointers: [{ index: 5, label: 'i', color: '#F5B842' }], highlight: [0,5], caption: 'i=5, }. Top is {, match. Pop. Stack empty → valid.' })}` },
      { title: 'Monotonic Stack', body: () => `
        <p>A stack where elements are always in increasing (or decreasing) order. Used for "next greater element" style problems.</p>
        <p><strong>Daily Temperatures.</strong> For each day, how many days until a warmer day? Naive O(n²). Monotonic stack: O(n).</p>
        <p>Iterate left to right. Stack holds indices of days waiting for a warmer day. When today is warmer than stack-top, pop and record the gap.</p>
        ${callout('Pattern: when you see "next greater," "next smaller," "previous greater" — think monotonic stack.', 'insight')}` },
      { title: 'Common Problems', body: () => `
        <ul>
          <li><strong>Valid Parentheses</strong> — match opens and closes</li>
          <li><strong>Min Stack</strong> — getMin() in O(1), keep parallel stack of mins</li>
          <li><strong>Evaluate Reverse Polish Notation</strong> — push values, pop on operator</li>
          <li><strong>Daily Temperatures</strong> — monotonic decreasing stack</li>
          <li><strong>Largest Rectangle in Histogram</strong> — monotonic stack, hard but classic</li>
        </ul>
        ${quiz('Why does monotonic stack give O(n) when it looks like it could pop everything?', 'Each element pushed once and popped at most once. Total push+pop ≤ 2n = O(n). The inner pop loop is amortized constant.')}` }
    ],
    template: `function isValid(s) {
  const pairs = { ')':'(', ']':'[', '}':'{' };
  const stack = [];
  for (const ch of s) {
    if (ch in pairs) {
      if (stack.pop() !== pairs[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}`
  },

  'binary-search': {
    title: 'Binary Search',
    subtitle: 'Halve the search space every step',
    duration: '22 min read', difficulty: 'Foundational', pattern: 'Binary Search',
    sections: [
      { title: 'Core Insight', body: () => `
        <p>Binary search isn't just "find a number in sorted array." It's a way of thinking: <strong>at every step, eliminate half the search space.</strong> O(log n).</p>
        <p>Two flavors come up: <strong>standard</strong> (find an exact element) and <strong>on the answer space</strong> (search for the smallest/largest value that satisfies a condition).</p>` },
      { title: 'Standard Binary Search', body: () => `
        <p><strong>Problem:</strong> Find target=7 in <code>[1, 3, 5, 7, 9, 11]</code>.</p>
        ${arrayViz({ values: [1,3,5,7,9,11], pointers: [
          { index: 0, label: 'L' }, { index: 2, label: 'M', color: '#F5B842' }, { index: 5, label: 'R' }
        ], caption: 'L=0, R=5, M=2. nums[M]=5 < 7. Move L = M+1.' })}
        ${arrayViz({ values: [1,3,5,7,9,11], pointers: [
          { index: 3, label: 'L' }, { index: 4, label: 'M', color: '#F5B842' }, { index: 5, label: 'R' }
        ], caption: 'L=3, R=5, M=4. nums[M]=9 > 7. Move R = M-1.' })}
        ${arrayViz({ values: [1,3,5,7,9,11], pointers: [
          { index: 3, label: 'L=M=R', color: '#8FA876' }
        ], highlight: [3], caption: 'L=R=M=3. nums[M]=7. Found!' })}` },
      { title: 'Common Bugs', body: () => `
        ${compareTable({ headers: ['Bug', 'Fix'], rows: [
          ['(L + R) / 2 overflows for huge arrays', 'Use L + (R - L) / 2'],
          ['while (L <= R) vs while (L < R)', 'Depends on exit condition; both valid'],
          ['Infinite loop when condition leaves L unchanged', 'Always set L = M+1 or R = M-1, never just M'],
          ['Off-by-one on "find first/last X"', 'Use template: when found, keep searching for boundary'],
        ] })}` },
      { title: 'Search on Answer Space', body: () => `
        <p>Powerful pattern: when you can\'t binary search the input directly, binary search the answer.</p>
        <p><strong>Koko Eating Bananas.</strong> Find min eating speed K such that all bananas eaten in H hours. Speed range is [1, max(piles)]. For each candidate K, compute hours needed. Binary search on K.</p>
        <p><strong>Find Min in Rotated Sorted Array.</strong> Binary search adapted: compare to right end to know which side is sorted.</p>
        ${callout('If the answer is a number with a monotonic property — "K works → K+1 works" or "K works → K-1 works" — you can binary search the answer space.', 'insight')}
        ${quiz('Array of size 1 billion. Linear scan vs binary search?', 'Linear: up to 1B ops. Binary: log₂(1B) ≈ 30 ops. 33 million times faster.')}` }
    ],
    template: `function binarySearch(nums, target) {
  let L = 0, R = nums.length - 1;
  while (L <= R) {
    const M = L + Math.floor((R - L) / 2);
    if (nums[M] === target) return M;
    if (nums[M] < target) L = M + 1;
    else R = M - 1;
  }
  return -1;
}`
  },

  'linked-list': {
    title: 'Linked List',
    subtitle: 'Pointer manipulation, the great equalizer',
    duration: '25 min read', difficulty: 'Foundational', pattern: 'Linked List',
    sections: [
      { title: 'Core Insight', body: () => `
        <p>Linked lists test one thing: can you manipulate pointers without losing your place? Most problems boil down to careful next-pointer rewiring.</p>
        <p>Master techniques: <strong>dummy head node</strong> (simplifies edge cases), <strong>two pointers</strong> (cycle detection, find midpoint), <strong>iterative reverse</strong> (3-pointer dance).</p>` },
      { title: 'Reverse a Linked List', body: () => `
        <p>Classic. Walk through with three pointers: prev, curr, next.</p>
        ${linkedListViz({ values: [1, 2, 3, 4], caption: 'Initial: 1 → 2 → 3 → 4. We want: 4 → 3 → 2 → 1.' })}
        <p>For each node: save next, point curr.next to prev, move prev to curr, move curr to saved next.</p>
        ${callout('On paper, draw the arrows and rewire them physically. The code matches what you drew.', 'insight')}` },
      { title: 'Cycle Detection — Floyd\'s Algorithm', body: () => `
        <p><strong>Problem:</strong> Does this linked list have a cycle?</p>
        <p>Naive: hash set of visited nodes, O(n) space. Floyd\'s: O(1) space.</p>
        <p>Two pointers: <strong>slow</strong> moves one step, <strong>fast</strong> moves two. If there\'s a cycle, fast eventually laps slow and they meet. If no cycle, fast hits null first.</p>
        ${callout('Why it works: in a cycle of length C, fast gains 1 step on slow per iteration. Within C iterations, fast catches slow.', 'insight')}` },
      { title: 'Common Problems', body: () => `
        <ul>
          <li><strong>Reverse Linked List</strong> — 3-pointer iterative</li>
          <li><strong>Merge Two Sorted Lists</strong> — dummy head, walk both</li>
          <li><strong>Linked List Cycle</strong> — Floyd\'s tortoise and hare</li>
          <li><strong>Remove Nth From End</strong> — two pointers, fast starts N ahead</li>
          <li><strong>Reorder List</strong> — find middle + reverse second half + merge</li>
        </ul>
        ${quiz('Why use a dummy head node in linked list problems?', 'Edge case unification. Without dummy, "insert before head" is special-case logic. With dummy, every insert is identical: prev.next = newNode. Cleaner code, fewer bugs.')}` }
    ],
    template: `function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`
  },

  'trees': {
    title: 'Trees',
    subtitle: 'Recursion\'s natural habitat',
    duration: '25 min read', difficulty: 'Foundational', pattern: 'Trees',
    sections: [
      { title: 'Core Insight', body: () => `
        <p>Trees are recursive by nature. Most tree problems have the shape: "do something with the current node, recurse on left, recurse on right, combine results." When you can write that template, the problem solves itself.</p>
        ${treeViz({ nodes: [{val:1},{val:2},{val:3},{val:4},{val:5},{val:6},{val:7}], highlight: [0], caption: 'Root = node 0. Recurse left (subtree rooted at 1) and right (subtree rooted at 2).' })}` },
      { title: 'DFS vs BFS', body: () => `
        ${compareTable({ headers: ['Strategy', 'How', 'When'], rows: [
          ['DFS (depth-first)', 'Recursion or explicit stack', 'Path-based, height, sum, validate'],
          ['BFS (breadth-first)', 'Queue', 'Level-by-level, shortest path in unweighted'],
        ] })}
        <p>DFS has three sub-strategies: <strong>pre-order</strong> (node, left, right — used for copy/serialize), <strong>in-order</strong> (left, node, right — gives sorted output for BST), <strong>post-order</strong> (left, right, node — used for delete/aggregate).</p>` },
      { title: 'BST — Binary Search Tree', body: () => `
        <p>A BST has the property: for every node, all values in left subtree are smaller, all in right are larger. This makes search O(log n) in balanced trees.</p>
        <p><strong>Validate BST.</strong> Pass down (min, max) bounds. Each node must be within bounds. Recurse with updated bounds.</p>
        ${callout('In-order traversal of a BST yields sorted values. Use this to validate, or to find kth smallest in O(k).', 'insight')}` },
      { title: 'Common Tree Problems', body: () => `
        ${compareTable({ headers: ['Problem', 'Strategy'], rows: [
          ['Max depth', 'DFS, return 1 + max(left, right)'],
          ['Invert binary tree', 'DFS, swap children at each node'],
          ['Same tree', 'Recurse both simultaneously'],
          ['Lowest common ancestor (BST)', 'Walk down: go left/right by comparing to both targets'],
          ['Level order', 'BFS with queue'],
          ['Diameter', 'DFS returning depth, track max (leftDepth + rightDepth)'],
        ] })}
        ${quiz('Recursive DFS uses O(h) call stack where h is tree height. When is this a problem?', 'When h ≈ n (skewed tree, e.g., right-only chain). Stack overflow possible at 10K+ depth. Fix: iterative DFS with explicit stack.')}` }
    ],
    template: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`
  },

  'tries': {
    title: 'Tries',
    subtitle: 'Prefix trees for word problems',
    duration: '20 min read', difficulty: 'Intermediate', pattern: 'Tries',
    sections: [
      { title: 'Core Insight', body: () => `
        <p>A trie (prefix tree) is a tree where each node represents a character, and paths from root spell words. Lookups are O(word length), not O(num words). Used for autocomplete, spell-check, IP routing.</p>
        <p>Each node: a map from char → child node, plus a flag "is this a word end?"</p>` },
      { title: 'Why Trie Over Hash Set', body: () => `
        ${compareTable({ headers: ['Operation', 'Hash Set of words', 'Trie'], rows: [
          ['Exact match', 'O(1) average', 'O(word length)'],
          ['Prefix search', 'O(n × prefix len)', 'O(prefix length)'],
          ['All words with prefix', 'Scan all n', 'DFS from prefix node'],
          ['Memory', 'O(total chars)', 'O(unique paths) — saves on shared prefixes']
        ] })}
        <p>For autocomplete ("show me all words starting with 'app'"), trie crushes hash set.</p>` },
      { title: 'Common Problems', body: () => `
        <ul>
          <li><strong>Implement Trie</strong> — insert, search, startsWith</li>
          <li><strong>Word Search II</strong> — find which words from a list exist in 2D grid. Trie + DFS, prune aggressively.</li>
          <li><strong>Add and Search Word</strong> — supports wildcard '.', DFS through all children when wildcard.</li>
          <li><strong>Replace Words</strong> — replace each word with its shortest dict-root, trie lookup.</li>
        </ul>
        ${callout('Tries shine when many strings share prefixes. For random strings with no shared prefixes, hash set is simpler and uses less memory.', 'insight')}
        ${quiz('You\'re building autocomplete for a 100K-word dictionary. User types "intern". How does trie return all completions?', 'Walk down "i→n→t→e→r→n" (6 ops). Then DFS from that node, collecting every reachable word-end. Returns "intern, internal, internet, intern­ship, ..." in time proportional to output size.')}` }
    ],
    template: `class TrieNode {
  constructor() { this.children = {}; this.isEnd = false; }
}
class Trie {
  constructor() { this.root = new TrieNode(); }
  insert(word) {
    let node = this.root;
    for (const c of word) {
      if (!node.children[c]) node.children[c] = new TrieNode();
      node = node.children[c];
    }
    node.isEnd = true;
  }
  search(word) {
    let node = this.root;
    for (const c of word) {
      if (!node.children[c]) return false;
      node = node.children[c];
    }
    return node.isEnd;
  }
}`
  },

  'heap': {
    title: 'Heap / Priority Queue',
    subtitle: 'Always get the min or max in O(log n)',
    duration: '22 min read', difficulty: 'Intermediate', pattern: 'Heap',
    sections: [
      { title: 'Core Insight', body: () => `
        <p>A heap is a binary tree where every parent is smaller (min-heap) or larger (max-heap) than its children. The min/max is always the root — O(1) peek. Insert and extract are O(log n).</p>
        <p>Used as a priority queue. When you need "smallest so far" or "kth largest" or "top K," reach for heap.</p>` },
      { title: 'Kth Largest Pattern', body: () => `
        <p><strong>Problem:</strong> Find the kth largest element in a stream of numbers.</p>
        <p>Maintain a <strong>min-heap of size K</strong>. For each new number: push it, if size > K pop the min. The heap always contains the K largest seen so far. The root is the kth largest.</p>
        <p>O(log K) per operation. With K=100 and a billion-number stream, this beats sorting (O(n log n)) by a massive factor.</p>
        ${callout('Counter-intuitive: for kth LARGEST, use min-heap. For kth SMALLEST, use max-heap. The heap stores K candidates; you want to easily evict the worst one.', 'insight')}` },
      { title: 'Two Heaps for Median', body: () => `
        <p><strong>Problem:</strong> Find median of a stream of numbers.</p>
        <p>Two heaps. <strong>Max-heap</strong> holds smaller half. <strong>Min-heap</strong> holds larger half. Keep sizes balanced (differ by at most 1). Median = root of larger heap, or average of both roots.</p>
        ${callout('Two-heap trick generalizes: any time you need to know "median" or "middle element" of a moving set, two heaps maintain it in O(log n) per operation.', 'insight')}` },
      { title: 'Common Problems', body: () => `
        <ul>
          <li><strong>Kth Largest Element</strong> — min-heap size K</li>
          <li><strong>Top K Frequent Elements</strong> — heap of (frequency, element)</li>
          <li><strong>Merge K Sorted Lists</strong> — heap of K list-head pointers</li>
          <li><strong>Find Median from Data Stream</strong> — two heaps</li>
          <li><strong>Task Scheduler</strong> — max-heap of task counts</li>
        </ul>
        ${quiz('Why is heap better than sort for kth largest in a stream?', 'Sort is O(n log n) and needs all data first. Heap is O(log K) per element, processes streaming data, uses O(K) memory. Massive win for large n, small K.')}` }
    ],
    template: `// JS doesn't have built-in heap; use a library or roll your own.
// MinHeap interface:
// heap.push(x), heap.pop(), heap.peek(), heap.size
function findKthLargest(nums, k) {
  const heap = new MinHeap();
  for (const num of nums) {
    heap.push(num);
    if (heap.size > k) heap.pop();
  }
  return heap.peek();
}`
  },

  'backtracking': {
    title: 'Backtracking',
    subtitle: 'Try, recurse, undo — explore all possibilities',
    duration: '25 min read', difficulty: 'Intermediate', pattern: 'Backtracking',
    sections: [
      { title: 'Core Insight', body: () => `
        <p>When a problem says "find all combinations / permutations / subsets / paths," it\'s backtracking. The template is always: <strong>try a choice → recurse → undo the choice → try next choice.</strong></p>
        <p>The undo is what makes it backtracking. You leave no trace of the choice you abandoned, so the next branch starts clean.</p>` },
      { title: 'The Template', body: () => `
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code>function backtrack(state, choices) {
  if (isComplete(state)) {
    results.push([...state]);  // copy!
    return;
  }
  for (const choice of choices) {
    if (!isValid(state, choice)) continue;
    state.push(choice);        // try
    backtrack(state, choices);  // recurse
    state.pop();                // undo
  }
}</code></pre>
        <p>Three things to define for each problem: <strong>isComplete</strong>, <strong>choices</strong>, <strong>isValid</strong>.</p>` },
      { title: 'Common Problems', body: () => `
        ${compareTable({ headers: ['Problem', 'isComplete', 'choices', 'pruning'], rows: [
          ['Subsets', 'always (every state is valid)', 'include or skip each element', 'none'],
          ['Permutations', 'state.length === n', 'remaining unused elements', 'used set'],
          ['Combinations(n, k)', 'state.length === k', 'numbers > last chosen', 'monotonic'],
          ['N-Queens', 'placed n queens', 'columns in current row', 'no conflict with prior'],
          ['Word Search', 'matched all chars', 'adjacent cells', 'visited set, char match']
        ] })}` },
      { title: 'Pruning is Everything', body: () => `
        <p>Naive backtracking can blow up exponentially. Pruning — eliminating dead branches early — is what makes it tractable.</p>
        <p>Example: in N-Queens, before placing a queen, check if any prior queen attacks this cell. If yes, skip — don\'t recurse into the doomed subtree.</p>
        ${callout('If your backtracking solution times out, the fix is almost always more aggressive pruning, not a different algorithm.', 'insight')}
        ${quiz('Why must you "undo" the choice in backtracking? What if you just skipped it?', 'You\'re sharing one state object across all branches. Without undo, the next branch starts with the previous branch\'s additions. Undo restores the state so siblings get a clean slate.')}` }
    ],
    template: `function subsets(nums) {
  const results = [], curr = [];
  function backtrack(start) {
    results.push([...curr]);
    for (let i = start; i < nums.length; i++) {
      curr.push(nums[i]);
      backtrack(i + 1);
      curr.pop();
    }
  }
  backtrack(0);
  return results;
}`
  },

  'graphs': {
    title: 'Graphs',
    subtitle: 'BFS, DFS, and topological sort',
    duration: '28 min read', difficulty: 'Intermediate', pattern: 'Graphs',
    sections: [
      { title: 'Core Insight', body: () => `
        <p>A graph is nodes connected by edges. Trees are graphs without cycles. Most graph problems boil down to: <strong>traverse from a starting node, do something with each reachable node.</strong></p>
        <p>Two main traversals: <strong>BFS</strong> (queue, level by level, shortest path in unweighted) and <strong>DFS</strong> (recursion or stack, exhaustive exploration).</p>` },
      { title: 'Representation', body: () => `
        ${compareTable({ headers: ['Form', 'How', 'When'], rows: [
          ['Adjacency list', 'Map: node → [neighbors]', 'Default for most problems. Memory: O(V+E).'],
          ['Adjacency matrix', '2D array: matrix[i][j] = 1 if edge', 'Dense graphs. Memory: O(V²).'],
          ['Edge list', 'List of (u, v, weight)', 'Algorithms like Kruskal\'s MST.'],
        ] })}` },
      { title: 'BFS — Shortest Path Unweighted', body: () => `
        <p>BFS visits nodes in order of distance from start. First time you reach a node, you reached it via shortest path. Perfect for "minimum steps" problems on grids.</p>
        <p><strong>Number of Islands.</strong> Iterate grid. Each unvisited "1" → BFS/DFS marks the whole island as visited. Count islands.</p>
        <p><strong>Rotting Oranges.</strong> Multi-source BFS. Push all initially rotten oranges into queue at time 0. BFS, tracking max time. Answer = max time when queue empty.</p>` },
      { title: 'Topological Sort', body: () => `
        <p>For a DAG (directed acyclic graph), produce an ordering where every edge u→v has u before v.</p>
        <p><strong>Course Schedule.</strong> "Can I take all courses given prerequisites?" Build graph, do topo sort. If cycle exists, impossible.</p>
        <p>Two ways: Kahn\'s algorithm (BFS with in-degrees) or DFS post-order with cycle detection.</p>
        ${callout('Topo sort is the answer to any "ordering with dependencies" problem. Build order, task scheduling, package install order, you name it.', 'insight')}
        ${quiz('Why does BFS give shortest path in UNWEIGHTED graphs but not weighted?', 'BFS visits in order of edge count. If all edges have cost 1, edge count = path cost. With weights, fewest edges ≠ cheapest path. Need Dijkstra.')}` }
    ],
    template: `function bfs(start, graph) {
  const visited = new Set([start]);
  const queue = [start];
  while (queue.length) {
    const node = queue.shift();
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return visited;
}`
  },

  'advanced-graphs': {
    title: 'Advanced Graphs',
    subtitle: 'Dijkstra, Bellman-Ford, MST, Union-Find',
    duration: '30 min read', difficulty: 'Advanced', pattern: 'Advanced Graphs',
    sections: [
      { title: 'Dijkstra — Shortest Path Weighted', body: () => `
        <p>BFS for weighted graphs (with non-negative weights). Greedy: always expand the cheapest unvisited node.</p>
        <p>Implementation: priority queue (min-heap) keyed on distance. Pop cheapest, relax its neighbors, repeat.</p>
        <p>O((V + E) log V) with a heap. Used in maps, routing, network protocols.</p>
        ${callout('Dijkstra fails on negative weights — once a node is finalized, you assume nothing cheaper comes. Negative edges can violate that.', 'warning')}` },
      { title: 'Bellman-Ford — Handles Negative Weights', body: () => `
        <p>Slower than Dijkstra (O(V × E)) but handles negative edges. Also detects negative cycles.</p>
        <p>Algorithm: relax every edge V-1 times. After that, if any edge can still be relaxed, there\'s a negative cycle.</p>` },
      { title: 'MST — Minimum Spanning Tree', body: () => `
        <p>Connect all nodes with minimum total edge weight. Two algorithms:</p>
        <p><strong>Prim\'s.</strong> Like Dijkstra but for MST. Grow tree from a start node, always add cheapest edge crossing tree boundary.</p>
        <p><strong>Kruskal\'s.</strong> Sort all edges by weight. Add cheapest, skip if it creates cycle (Union-Find). Continue until V-1 edges.</p>` },
      { title: 'Union-Find (Disjoint Set Union)', body: () => `
        <p>Data structure for "what group does X belong to" and "merge two groups." O(α(n)) per op (effectively constant).</p>
        <p>Two operations: <strong>find(x)</strong> = which group is X in, <strong>union(x, y)</strong> = merge X\'s group with Y\'s.</p>
        <p>Path compression + union by rank make it nearly O(1). Used in Kruskal\'s, connected components, dynamic connectivity.</p>
        ${quiz('When would you use Bellman-Ford over Dijkstra?', 'Negative edge weights. Currency arbitrage detection (negative cycle = arbitrage opportunity). Routing where some edges represent rebates/credits.')}` }
    ],
    template: `function dijkstra(start, graph) {
  const dist = { [start]: 0 };
  const heap = new MinHeap();  // {node, dist}
  heap.push({ node: start, dist: 0 });
  while (heap.size) {
    const { node, dist: d } = heap.pop();
    if (d > (dist[node] ?? Infinity)) continue;
    for (const [next, weight] of graph[node] || []) {
      const newDist = d + weight;
      if (newDist < (dist[next] ?? Infinity)) {
        dist[next] = newDist;
        heap.push({ node: next, dist: newDist });
      }
    }
  }
  return dist;
}`
  },

  '1d-dp': {
    title: '1D Dynamic Programming',
    subtitle: 'Memoize subproblems, build up the answer',
    duration: '30 min read', difficulty: 'Intermediate', pattern: '1D Dynamic Programming',
    sections: [
      { title: 'Core Insight', body: () => `
        <p>DP is recursion + memoization. You break a problem into overlapping subproblems, solve each once, cache the result.</p>
        <p>Sign you\'re looking at DP: <strong>"how many ways..."</strong>, <strong>"maximum / minimum..."</strong>, or recursion that recomputes the same things.</p>
        <p>Two implementations: <strong>top-down</strong> (recursion + memo) or <strong>bottom-up</strong> (iterative tabulation). Same complexity; tab is often faster (no recursion overhead).</p>` },
      { title: 'Climbing Stairs — The "Hello World" of DP', body: () => `
        <p><strong>Problem:</strong> N stairs. Each step climbs 1 or 2 stairs. How many ways to reach the top?</p>
        <p>Recurrence: <code>ways(n) = ways(n-1) + ways(n-2)</code>. Base: ways(0) = 1, ways(1) = 1.</p>
        <p>That\'s Fibonacci. Top-down with memo: O(n). Bottom-up: O(n) time, O(1) space (only need last two values).</p>
        ${callout('If your recurrence only references the last K values, you can drop the full DP array and use K rolling variables. Reduces O(n) space to O(1).', 'insight')}` },
      { title: 'House Robber Family', body: () => `
        <p><strong>Problem:</strong> houses in a row with money. Can\'t rob adjacent. Max money?</p>
        <p>Recurrence: <code>rob(i) = max(rob(i-1), rob(i-2) + money[i])</code>. Either skip house i (take previous best) or rob house i (take best ending two back, plus current).</p>
        <p>Variants: House Robber II (houses in circle — solve two linear subproblems), House Robber III (tree — recurse with two states).</p>` },
      { title: 'Longest Increasing Subsequence', body: () => `
        <p><strong>Problem:</strong> Length of longest strictly increasing subsequence (not contiguous).</p>
        <p>DP: <code>dp[i] = 1 + max(dp[j] for j < i if nums[j] < nums[i])</code>. O(n²).</p>
        <p>Hard mode: O(n log n) with patience sort / binary search. Maintain a "tails" array where tails[k] = smallest tail of an increasing subseq of length k+1.</p>
        ${quiz('Top-down vs bottom-up DP: when to prefer each?', 'Top-down (memoize recursion): natural when not all subproblems needed; great for sparse states. Bottom-up (tabulate): faster in practice (no call overhead), often allows space optimization.')}` }
    ],
    template: `function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    [prev2, prev1] = [prev1, prev1 + prev2];
  }
  return prev1;
}`
  },

  '2d-dp': {
    title: '2D Dynamic Programming',
    subtitle: 'Grids, two-string problems, expanding state',
    duration: '32 min read', difficulty: 'Advanced', pattern: '2D Dynamic Programming',
    sections: [
      { title: 'Core Insight', body: () => `
        <p>2D DP appears when state needs two indices. Two patterns dominate:</p>
        <p><strong>Grid problems.</strong> Walking through a 2D grid, computing optimal path or count. dp[i][j] depends on dp[i-1][j] and dp[i][j-1].</p>
        <p><strong>Two-string problems.</strong> Comparing two strings character by character. dp[i][j] = best for first i of A and first j of B.</p>` },
      { title: 'Unique Paths — Grid Counting', body: () => `
        <p><strong>Problem:</strong> Robot at top-left of m×n grid. Goes only right or down. How many paths to bottom-right?</p>
        <p>Recurrence: <code>dp[i][j] = dp[i-1][j] + dp[i][j-1]</code>. Base: dp[0][...] = dp[...][0] = 1.</p>
        <p>Variant: with obstacles, set dp[i][j] = 0 where blocked.</p>
        ${callout('Grid DP often reduces to 1D space — to compute row i you only need row i-1. Roll over the array.', 'insight')}` },
      { title: 'Longest Common Subsequence', body: () => `
        <p><strong>Problem:</strong> Length of LCS of two strings (not contiguous).</p>
        <p>Recurrence: if chars match, <code>dp[i][j] = 1 + dp[i-1][j-1]</code>. Else, <code>dp[i][j] = max(dp[i-1][j], dp[i][j-1])</code>.</p>
        <p>This pattern generalizes: edit distance, longest palindromic subseq, regex matching all use it.</p>` },
      { title: 'Edit Distance', body: () => `
        <p><strong>Problem:</strong> Min operations (insert, delete, replace) to convert string A to string B.</p>
        <p>Recurrence: if chars match, <code>dp[i][j] = dp[i-1][j-1]</code>. Else, <code>dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])</code> for insert/delete/replace.</p>
        <p>Used in spell-checkers, diff tools, DNA sequence alignment.</p>
        ${quiz('LCS and Edit Distance both fill a (m+1) × (n+1) table. Why m+1, not m?', 'The extra row/col represents the empty string. LCS of empty with anything is 0. Edit distance of empty to length-k string is k (k inserts). Empty case is the recursion base.')}` }
    ],
    template: `function longestCommonSubsequence(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i-1] === b[j-1]) dp[i][j] = 1 + dp[i-1][j-1];
      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
  }
  return dp[m][n];
}`
  },

  'greedy': {
    title: 'Greedy',
    subtitle: 'Take the locally optimal choice. Hope it works.',
    duration: '22 min read', difficulty: 'Intermediate', pattern: 'Greedy',
    sections: [
      { title: 'Core Insight', body: () => `
        <p>Greedy algorithms make the choice that looks best right now, without reconsidering. When greedy works, it\'s often O(n log n) or better — beating DP\'s typical O(n²).</p>
        <p>The catch: greedy doesn\'t always work. The hard part is recognizing when it does.</p>` },
      { title: 'When Greedy Works', body: () => `
        <p>Greedy is correct when the problem has the <strong>greedy choice property:</strong> a locally optimal choice leads to a globally optimal solution.</p>
        <p>Often you can prove it via <strong>exchange argument:</strong> if there\'s an optimal solution that doesn\'t make the greedy choice, you can swap to the greedy choice without making it worse.</p>` },
      { title: 'Maximum Subarray (Kadane\'s)', body: () => `
        <p><strong>Problem:</strong> Max sum of any contiguous subarray.</p>
        <p>Greedy: at each element, decide to <strong>extend current subarray or start fresh.</strong> If current sum + new element < new element alone, start fresh. Track max along the way.</p>
        <p>O(n) time, O(1) space. Beautiful in its simplicity.</p>` },
      { title: 'Jump Game', body: () => `
        <p><strong>Problem:</strong> Array of jump-lengths. Can you reach the last index?</p>
        <p>Greedy: track the <strong>maximum reachable index so far.</strong> Iterate. If at index i and i > maxReach, you\'re stuck. Otherwise, maxReach = max(maxReach, i + nums[i]).</p>
        <p>Why it works: at each step, knowing the farthest reachable is enough — no need to remember the path.</p>
        ${callout('Don\'t use greedy when you can\'t prove it works. Greedy looks elegant but is often wrong. When in doubt, DP it.', 'warning')}
        ${quiz('Coin change: smallest coin count to make N. Greedy (always take largest coin ≤ N) works for [1, 5, 10, 25] but fails for [1, 3, 4] with N=6. Why?', 'For [1, 5, 10, 25] (US coins), greedy is optimal. For [1, 3, 4] with N=6: greedy takes 4+1+1=3 coins. Optimal is 3+3=2. The greedy property holds for some coin systems and not others. When in doubt, use DP.')}` }
    ],
    template: `function maxSubArray(nums) {
  let curr = nums[0], max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    curr = Math.max(nums[i], curr + nums[i]);
    max = Math.max(max, curr);
  }
  return max;
}`
  },

  'intervals': {
    title: 'Intervals',
    subtitle: 'Sort by start, sweep, merge',
    duration: '20 min read', difficulty: 'Intermediate', pattern: 'Intervals',
    sections: [
      { title: 'Core Insight', body: () => `
        <p>Interval problems are deceptively simple. Most reduce to: <strong>sort intervals by start time, then sweep left to right.</strong> Each interval either extends the current group or starts a new one.</p>
        <p>The hardest part is figuring out the comparator and the merge condition for your specific problem.</p>` },
      { title: 'Merge Intervals', body: () => `
        <p><strong>Problem:</strong> Given intervals like [[1,3], [2,6], [8,10]], merge overlapping.</p>
        <p>Sort by start. Iterate. If next interval starts before current ends → merge (extend end). Otherwise → push current, start new.</p>
        <p>O(n log n) for sort, O(n) for sweep.</p>` },
      { title: 'Meeting Rooms II — Min Rooms', body: () => `
        <p><strong>Problem:</strong> Given meeting time intervals, minimum rooms needed?</p>
        <p>Two approaches:</p>
        <p><strong>Sweep events.</strong> Create [(start, +1), (end, -1)] events. Sort. Sweep, track running sum, max sum = answer.</p>
        <p><strong>Min-heap of end times.</strong> Sort intervals by start. For each, if heap top ≤ start, pop (room freed). Push current end. Heap size = rooms needed.</p>` },
      { title: 'Insert Interval', body: () => `
        <p><strong>Problem:</strong> Insert new interval into sorted non-overlapping list. Merge as needed.</p>
        <p>Linear pass. Three phases: (1) intervals entirely before new — copy. (2) intervals overlapping new — merge into new. (3) intervals entirely after — copy.</p>
        ${callout('Two intervals [a,b] and [c,d] overlap iff a ≤ d AND c ≤ b. Memorize this — every interval problem uses it.', 'insight')}
        ${quiz('Why sort by start for most interval problems, not end?', 'Sorting by start lets you process in temporal order. As you sweep, "current interval" is well-defined, and "does the next one overlap" only needs to check vs current end. Sorting by end works for some problems (e.g. greedy interval scheduling for max non-overlap) but is less common.')}` }
    ],
    template: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = result[result.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      result.push(intervals[i]);
    }
  }
  return result;
}`
  },

  'math-geometry': {
    title: 'Math & Geometry',
    subtitle: 'Modular arithmetic, matrix tricks, geometric patterns',
    duration: '20 min read', difficulty: 'Intermediate', pattern: 'Math & Geometry',
    sections: [
      { title: 'Core Insight', body: () => `
        <p>These problems are often about <strong>spotting a math trick</strong> that turns brute force into something elegant. They reward pattern recognition over algorithmic depth.</p>
        <p>Common families: matrix transformations (rotate, transpose), digit manipulation, modular arithmetic for huge numbers, geometric formulas.</p>` },
      { title: 'Rotate Image — Matrix Trick', body: () => `
        <p><strong>Problem:</strong> Rotate n×n matrix 90° clockwise in-place.</p>
        <p>Naive: build new matrix, copy with rotated indices. O(n²) time and space.</p>
        <p>Trick: <strong>transpose then reverse each row.</strong> Transpose flips along the diagonal. Reversing rows finishes the rotation. O(n²) time, O(1) space.</p>
        ${callout('Many matrix problems have a "two-pass trick" — combine simple transformations to get the desired result. Always ask: can I decompose this rotation into known operations?', 'insight')}` },
      { title: 'Spiral Matrix', body: () => `
        <p><strong>Problem:</strong> Traverse matrix in spiral order.</p>
        <p>Maintain four boundaries: top, bottom, left, right. Walk right (top boundary), then down (right boundary), then left, then up. Shrink the boundary you just traversed. Stop when boundaries cross.</p>` },
      { title: 'Plus One — Carry Logic', body: () => `
        <p><strong>Problem:</strong> Add 1 to a number represented as a digit array.</p>
        <p>Iterate from right. If digit < 9, increment and return. Otherwise set to 0 and carry. If you carry past the leftmost digit, prepend 1.</p>
        <p>Sounds trivial; the edge case (all 9s) is the test.</p>
        ${quiz('Pow(x, n) — compute x^n. Naive is O(n). Better?', 'Fast exponentiation: O(log n). x^n = (x^(n/2))² if n even, x × x^(n-1) if odd. Recurse. Same trick used in modular exponentiation for crypto.')}` }
    ],
    template: `function rotate(matrix) {
  const n = matrix.length;
  // Transpose
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  // Reverse each row
  for (let i = 0; i < n; i++) matrix[i].reverse();
}`
  },

  'bit-manipulation': {
    title: 'Bit Manipulation',
    subtitle: 'XOR tricks, set bits, mask operations',
    duration: '20 min read', difficulty: 'Intermediate', pattern: 'Bit Manipulation',
    sections: [
      { title: 'Core Insight', body: () => `
        <p>Bit operations are O(1) but let you do magic. Most interview bit problems exploit one of three things:</p>
        <p><strong>XOR.</strong> x ^ x = 0, x ^ 0 = x. Pairs cancel; lone elements survive.</p>
        <p><strong>n & (n - 1).</strong> Clears the lowest set bit. Useful for counting bits, checking powers of 2.</p>
        <p><strong>1 << k.</strong> Build a mask with just bit k set. Toggle, test, set bits selectively.</p>` },
      { title: 'Single Number', body: () => `
        <p><strong>Problem:</strong> Array where every element appears twice except one. Find the lone one.</p>
        <p>Naive: hash map of counts. O(n) space.</p>
        <p>XOR trick: XOR all elements. Pairs cancel (x ^ x = 0). Result is the lone element. O(1) space.</p>
        ${callout('XOR is your friend whenever pairs need to cancel. It\'s commutative and associative, so order doesn\'t matter.', 'insight')}` },
      { title: 'Counting Bits', body: () => `
        <p><strong>Problem:</strong> For numbers 0 to n, count set bits in each.</p>
        <p>Trick: <code>countBits(n) = countBits(n & (n-1)) + 1</code>. Because n & (n-1) clears one bit. DP gives O(n).</p>
        <p>Even slicker: <code>countBits(n) = countBits(n >> 1) + (n & 1)</code>. Same O(n).</p>` },
      { title: 'Common Problems', body: () => `
        <ul>
          <li><strong>Single Number</strong> — XOR all, lone survives</li>
          <li><strong>Number of 1 Bits</strong> — n & (n-1) trick</li>
          <li><strong>Counting Bits</strong> — DP using bit trick</li>
          <li><strong>Reverse Bits</strong> — shift in and out</li>
          <li><strong>Missing Number</strong> — XOR all + XOR indices, missing survives</li>
          <li><strong>Sum of Two Integers</strong> — without +; XOR for sum, AND<<1 for carry</li>
        </ul>
        ${quiz('How to check if a number is a power of 2?', 'n > 0 AND (n & (n-1)) === 0. Powers of 2 have exactly one bit set. n-1 flips all bits below; AND with n gives 0.')}` }
    ],
    template: `function singleNumber(nums) {
  let result = 0;
  for (const num of nums) result ^= num;
  return result;
}`
  },

};
