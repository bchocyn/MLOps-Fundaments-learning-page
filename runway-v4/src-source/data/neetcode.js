// ============================================================
// NEETCODE 150 — DSA problem dataset
// Organized by pattern. Each problem: id, title, difficulty, leetcode URL.
// ============================================================

export const PATTERNS = [
  {
    id: 'arrays-hashing',
    title: 'Arrays & Hashing',
    blurb: 'The foundation. Hash maps for O(1) lookups, arrays for ordered data. If you can\'t solve these fast, nothing else compiles.',
    color: '#F5B842',
    lessonId: 'arrays-hashing',
    problems: [
      { id: 'contains-duplicate',         title: 'Contains Duplicate',                  difficulty: 'Easy',   url: 'https://leetcode.com/problems/contains-duplicate/' },
      { id: 'valid-anagram',              title: 'Valid Anagram',                       difficulty: 'Easy',   url: 'https://leetcode.com/problems/valid-anagram/' },
      { id: 'two-sum',                    title: 'Two Sum',                             difficulty: 'Easy',   url: 'https://leetcode.com/problems/two-sum/' },
      { id: 'group-anagrams',             title: 'Group Anagrams',                      difficulty: 'Medium', url: 'https://leetcode.com/problems/group-anagrams/' },
      { id: 'top-k-frequent',             title: 'Top K Frequent Elements',             difficulty: 'Medium', url: 'https://leetcode.com/problems/top-k-frequent-elements/' },
      { id: 'product-except-self',        title: 'Product of Array Except Self',        difficulty: 'Medium', url: 'https://leetcode.com/problems/product-of-array-except-self/' },
      { id: 'valid-sudoku',               title: 'Valid Sudoku',                        difficulty: 'Medium', url: 'https://leetcode.com/problems/valid-sudoku/' },
      { id: 'encode-decode-strings',      title: 'Encode and Decode Strings',           difficulty: 'Medium', url: 'https://leetcode.com/problems/encode-and-decode-strings/' },
      { id: 'longest-consecutive',        title: 'Longest Consecutive Sequence',        difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-consecutive-sequence/' },
    ]
  },
  {
    id: 'two-pointers',
    title: 'Two Pointers',
    blurb: 'Two indices walking through an array, often from opposite ends. Trades brute-force O(n²) for elegant O(n).',
    color: '#E07856',
    lessonId: 'two-pointers',
    problems: [
      { id: 'valid-palindrome',           title: 'Valid Palindrome',                    difficulty: 'Easy',   url: 'https://leetcode.com/problems/valid-palindrome/' },
      { id: 'two-sum-ii',                 title: 'Two Sum II - Sorted Input',           difficulty: 'Medium', url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/' },
      { id: '3sum',                       title: '3Sum',                                difficulty: 'Medium', url: 'https://leetcode.com/problems/3sum/' },
      { id: 'container-most-water',       title: 'Container With Most Water',           difficulty: 'Medium', url: 'https://leetcode.com/problems/container-with-most-water/' },
      { id: 'trapping-rain-water',        title: 'Trapping Rain Water',                 difficulty: 'Hard',   url: 'https://leetcode.com/problems/trapping-rain-water/' },
    ]
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window',
    blurb: 'A window of indices that grows and shrinks as you traverse. Optimization for "find the best subarray/substring" problems.',
    color: '#8FA876',
    lessonId: 'sliding-window',
    problems: [
      { id: 'best-time-buy-sell',         title: 'Best Time to Buy and Sell Stock',     difficulty: 'Easy',   url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
      { id: 'longest-substring-no-repeat',title: 'Longest Substring Without Repeating', difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
      { id: 'longest-repeat-replacement', title: 'Longest Repeating Character Replacement', difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-repeating-character-replacement/' },
      { id: 'permutation-in-string',      title: 'Permutation in String',               difficulty: 'Medium', url: 'https://leetcode.com/problems/permutation-in-string/' },
      { id: 'min-window-substring',       title: 'Minimum Window Substring',            difficulty: 'Hard',   url: 'https://leetcode.com/problems/minimum-window-substring/' },
      { id: 'sliding-window-max',         title: 'Sliding Window Maximum',              difficulty: 'Hard',   url: 'https://leetcode.com/problems/sliding-window-maximum/' },
    ]
  },
  {
    id: 'stack',
    title: 'Stack',
    blurb: 'LIFO data structure. The "I need to remember things in reverse order" pattern. Parentheses, expressions, monotonic stacks.',
    color: '#7B9FB5',
    lessonId: 'stack',
    problems: [
      { id: 'valid-parentheses',          title: 'Valid Parentheses',                   difficulty: 'Easy',   url: 'https://leetcode.com/problems/valid-parentheses/' },
      { id: 'min-stack',                  title: 'Min Stack',                           difficulty: 'Medium', url: 'https://leetcode.com/problems/min-stack/' },
      { id: 'eval-reverse-polish',        title: 'Evaluate Reverse Polish Notation',    difficulty: 'Medium', url: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/' },
      { id: 'generate-parentheses',       title: 'Generate Parentheses',                difficulty: 'Medium', url: 'https://leetcode.com/problems/generate-parentheses/' },
      { id: 'daily-temperatures',         title: 'Daily Temperatures',                  difficulty: 'Medium', url: 'https://leetcode.com/problems/daily-temperatures/' },
      { id: 'car-fleet',                  title: 'Car Fleet',                           difficulty: 'Medium', url: 'https://leetcode.com/problems/car-fleet/' },
      { id: 'largest-rectangle-histo',    title: 'Largest Rectangle in Histogram',      difficulty: 'Hard',   url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/' },
    ]
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    blurb: 'Divide the search space in half each step. O(log n). Works on sorted data — and on monotonic answer spaces.',
    color: '#B888C0',
    lessonId: 'binary-search',
    problems: [
      { id: 'binary-search',              title: 'Binary Search',                       difficulty: 'Easy',   url: 'https://leetcode.com/problems/binary-search/' },
      { id: 'search-2d-matrix',           title: 'Search a 2D Matrix',                  difficulty: 'Medium', url: 'https://leetcode.com/problems/search-a-2d-matrix/' },
      { id: 'koko-eating-bananas',        title: 'Koko Eating Bananas',                 difficulty: 'Medium', url: 'https://leetcode.com/problems/koko-eating-bananas/' },
      { id: 'find-min-rotated',           title: 'Find Min in Rotated Sorted Array',    difficulty: 'Medium', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' },
      { id: 'search-rotated-array',       title: 'Search in Rotated Sorted Array',      difficulty: 'Medium', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
      { id: 'time-based-kv-store',        title: 'Time Based Key-Value Store',          difficulty: 'Medium', url: 'https://leetcode.com/problems/time-based-key-value-store/' },
      { id: 'median-two-sorted',          title: 'Median of Two Sorted Arrays',         difficulty: 'Hard',   url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' },
    ]
  },
  {
    id: 'linked-list',
    title: 'Linked List',
    blurb: 'Nodes connected by pointers. The data structure that teaches you to think in references. Fast/slow pointers, reversal, cycle detection.',
    color: '#F5B842',
    lessonId: 'linked-list',
    problems: [
      { id: 'reverse-linked-list',        title: 'Reverse Linked List',                 difficulty: 'Easy',   url: 'https://leetcode.com/problems/reverse-linked-list/' },
      { id: 'merge-two-sorted-lists',     title: 'Merge Two Sorted Lists',              difficulty: 'Easy',   url: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
      { id: 'reorder-list',               title: 'Reorder List',                        difficulty: 'Medium', url: 'https://leetcode.com/problems/reorder-list/' },
      { id: 'remove-nth-from-end',        title: 'Remove Nth Node From End',            difficulty: 'Medium', url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
      { id: 'copy-list-random-pointer',   title: 'Copy List with Random Pointer',       difficulty: 'Medium', url: 'https://leetcode.com/problems/copy-list-with-random-pointer/' },
      { id: 'add-two-numbers',            title: 'Add Two Numbers',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/add-two-numbers/' },
      { id: 'linked-list-cycle',          title: 'Linked List Cycle',                   difficulty: 'Easy',   url: 'https://leetcode.com/problems/linked-list-cycle/' },
      { id: 'find-duplicate-number',      title: 'Find the Duplicate Number',           difficulty: 'Medium', url: 'https://leetcode.com/problems/find-the-duplicate-number/' },
      { id: 'lru-cache',                  title: 'LRU Cache',                           difficulty: 'Medium', url: 'https://leetcode.com/problems/lru-cache/' },
      { id: 'merge-k-sorted-lists',       title: 'Merge K Sorted Lists',                difficulty: 'Hard',   url: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
      { id: 'reverse-nodes-k-group',      title: 'Reverse Nodes in K-Group',            difficulty: 'Hard',   url: 'https://leetcode.com/problems/reverse-nodes-in-k-group/' },
    ]
  },
  {
    id: 'trees',
    title: 'Trees',
    blurb: 'Recursive structures. Most tree problems are "do thing for root, recurse on children, combine." BFS for level-order, DFS for path-based.',
    color: '#8FA876',
    lessonId: 'trees',
    problems: [
      { id: 'invert-tree',                title: 'Invert Binary Tree',                  difficulty: 'Easy',   url: 'https://leetcode.com/problems/invert-binary-tree/' },
      { id: 'max-depth-binary-tree',      title: 'Maximum Depth of Binary Tree',        difficulty: 'Easy',   url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
      { id: 'diameter-binary-tree',       title: 'Diameter of Binary Tree',             difficulty: 'Easy',   url: 'https://leetcode.com/problems/diameter-of-binary-tree/' },
      { id: 'balanced-binary-tree',       title: 'Balanced Binary Tree',                difficulty: 'Easy',   url: 'https://leetcode.com/problems/balanced-binary-tree/' },
      { id: 'same-tree',                  title: 'Same Tree',                           difficulty: 'Easy',   url: 'https://leetcode.com/problems/same-tree/' },
      { id: 'subtree-of-another-tree',    title: 'Subtree of Another Tree',             difficulty: 'Easy',   url: 'https://leetcode.com/problems/subtree-of-another-tree/' },
      { id: 'lca-bst',                    title: 'Lowest Common Ancestor of BST',       difficulty: 'Medium', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/' },
      { id: 'level-order-traversal',      title: 'Binary Tree Level Order Traversal',   difficulty: 'Medium', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
      { id: 'right-side-view',            title: 'Binary Tree Right Side View',         difficulty: 'Medium', url: 'https://leetcode.com/problems/binary-tree-right-side-view/' },
      { id: 'good-nodes',                 title: 'Count Good Nodes in Binary Tree',     difficulty: 'Medium', url: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/' },
      { id: 'validate-bst',               title: 'Validate Binary Search Tree',         difficulty: 'Medium', url: 'https://leetcode.com/problems/validate-binary-search-tree/' },
      { id: 'kth-smallest-bst',           title: 'Kth Smallest Element in BST',         difficulty: 'Medium', url: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/' },
      { id: 'build-tree-from-preorder',   title: 'Construct Tree from Preorder/Inorder', difficulty: 'Medium', url: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/' },
      { id: 'binary-tree-max-path-sum',   title: 'Binary Tree Max Path Sum',            difficulty: 'Hard',   url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/' },
      { id: 'serialize-deserialize-tree', title: 'Serialize/Deserialize Binary Tree',   difficulty: 'Hard',   url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/' },
    ]
  },
  {
    id: 'tries',
    title: 'Tries',
    blurb: 'Prefix trees. The data structure that makes "search by prefix" O(L) where L is prefix length. Autocomplete\'s secret.',
    color: '#7B9FB5',
    lessonId: 'tries',
    problems: [
      { id: 'implement-trie',             title: 'Implement Trie (Prefix Tree)',        difficulty: 'Medium', url: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
      { id: 'design-add-search-words',    title: 'Design Add and Search Words',         difficulty: 'Medium', url: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/' },
      { id: 'word-search-ii',             title: 'Word Search II',                      difficulty: 'Hard',   url: 'https://leetcode.com/problems/word-search-ii/' },
    ]
  },
  {
    id: 'heap',
    title: 'Heap / Priority Queue',
    blurb: 'A tree-based structure where the root is always the min (or max). O(log n) insert and extract. Use it whenever "what\'s the top/bottom K" comes up.',
    color: '#B888C0',
    lessonId: 'heap',
    problems: [
      { id: 'kth-largest-stream',         title: 'Kth Largest Element in Stream',       difficulty: 'Easy',   url: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/' },
      { id: 'last-stone-weight',          title: 'Last Stone Weight',                   difficulty: 'Easy',   url: 'https://leetcode.com/problems/last-stone-weight/' },
      { id: 'k-closest-points-origin',    title: 'K Closest Points to Origin',          difficulty: 'Medium', url: 'https://leetcode.com/problems/k-closest-points-to-origin/' },
      { id: 'kth-largest-array',          title: 'Kth Largest Element in Array',        difficulty: 'Medium', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
      { id: 'task-scheduler',             title: 'Task Scheduler',                      difficulty: 'Medium', url: 'https://leetcode.com/problems/task-scheduler/' },
      { id: 'design-twitter',             title: 'Design Twitter',                      difficulty: 'Medium', url: 'https://leetcode.com/problems/design-twitter/' },
      { id: 'find-median-stream',         title: 'Find Median from Data Stream',        difficulty: 'Hard',   url: 'https://leetcode.com/problems/find-median-from-data-stream/' },
    ]
  },
  {
    id: 'backtracking',
    title: 'Backtracking',
    blurb: 'Try a choice, recurse, undo the choice. The brute-force-with-pruning pattern. Permutations, combinations, subsets.',
    color: '#E07856',
    lessonId: 'backtracking',
    problems: [
      { id: 'subsets',                    title: 'Subsets',                             difficulty: 'Medium', url: 'https://leetcode.com/problems/subsets/' },
      { id: 'combination-sum',            title: 'Combination Sum',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/combination-sum/' },
      { id: 'permutations',               title: 'Permutations',                        difficulty: 'Medium', url: 'https://leetcode.com/problems/permutations/' },
      { id: 'subsets-ii',                 title: 'Subsets II',                          difficulty: 'Medium', url: 'https://leetcode.com/problems/subsets-ii/' },
      { id: 'combination-sum-ii',         title: 'Combination Sum II',                  difficulty: 'Medium', url: 'https://leetcode.com/problems/combination-sum-ii/' },
      { id: 'word-search',                title: 'Word Search',                         difficulty: 'Medium', url: 'https://leetcode.com/problems/word-search/' },
      { id: 'palindrome-partitioning',    title: 'Palindrome Partitioning',             difficulty: 'Medium', url: 'https://leetcode.com/problems/palindrome-partitioning/' },
      { id: 'letter-combos-phone',        title: 'Letter Combinations of Phone Number', difficulty: 'Medium', url: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/' },
      { id: 'n-queens',                   title: 'N-Queens',                            difficulty: 'Hard',   url: 'https://leetcode.com/problems/n-queens/' },
    ]
  },
  {
    id: 'graphs',
    title: 'Graphs',
    blurb: 'Nodes connected by edges. The most flexible data structure. BFS for shortest paths, DFS for connectivity, Union-Find for groups.',
    color: '#8FA876',
    lessonId: 'graphs',
    problems: [
      { id: 'number-of-islands',          title: 'Number of Islands',                   difficulty: 'Medium', url: 'https://leetcode.com/problems/number-of-islands/' },
      { id: 'clone-graph',                title: 'Clone Graph',                         difficulty: 'Medium', url: 'https://leetcode.com/problems/clone-graph/' },
      { id: 'max-area-of-island',         title: 'Max Area of Island',                  difficulty: 'Medium', url: 'https://leetcode.com/problems/max-area-of-island/' },
      { id: 'pacific-atlantic-flow',      title: 'Pacific Atlantic Water Flow',         difficulty: 'Medium', url: 'https://leetcode.com/problems/pacific-atlantic-water-flow/' },
      { id: 'surrounded-regions',         title: 'Surrounded Regions',                  difficulty: 'Medium', url: 'https://leetcode.com/problems/surrounded-regions/' },
      { id: 'rotting-oranges',            title: 'Rotting Oranges',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/rotting-oranges/' },
      { id: 'walls-and-gates',            title: 'Walls and Gates',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/walls-and-gates/' },
      { id: 'course-schedule',            title: 'Course Schedule',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/course-schedule/' },
      { id: 'course-schedule-ii',         title: 'Course Schedule II',                  difficulty: 'Medium', url: 'https://leetcode.com/problems/course-schedule-ii/' },
      { id: 'redundant-connection',       title: 'Redundant Connection',                difficulty: 'Medium', url: 'https://leetcode.com/problems/redundant-connection/' },
      { id: 'word-ladder',                title: 'Word Ladder',                         difficulty: 'Hard',   url: 'https://leetcode.com/problems/word-ladder/' },
      { id: 'count-components',           title: 'Number of Connected Components',      difficulty: 'Medium', url: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/' },
      { id: 'graph-valid-tree',           title: 'Graph Valid Tree',                    difficulty: 'Medium', url: 'https://leetcode.com/problems/graph-valid-tree/' },
    ]
  },
  {
    id: 'advanced-graphs',
    title: 'Advanced Graphs',
    blurb: 'Weighted graphs, shortest paths, MSTs. Dijkstra, Bellman-Ford, Prim, Kruskal. Less common in interviews but appears at FAANG.',
    color: '#B888C0',
    lessonId: 'advanced-graphs',
    problems: [
      { id: 'reconstruct-itinerary',      title: 'Reconstruct Itinerary',               difficulty: 'Hard',   url: 'https://leetcode.com/problems/reconstruct-itinerary/' },
      { id: 'min-cost-connect-points',    title: 'Min Cost to Connect All Points',      difficulty: 'Medium', url: 'https://leetcode.com/problems/min-cost-to-connect-all-points/' },
      { id: 'network-delay-time',         title: 'Network Delay Time',                  difficulty: 'Medium', url: 'https://leetcode.com/problems/network-delay-time/' },
      { id: 'swim-in-rising-water',       title: 'Swim in Rising Water',                difficulty: 'Hard',   url: 'https://leetcode.com/problems/swim-in-rising-water/' },
      { id: 'alien-dictionary',           title: 'Alien Dictionary',                    difficulty: 'Hard',   url: 'https://leetcode.com/problems/alien-dictionary/' },
      { id: 'cheapest-flights-k-stops',   title: 'Cheapest Flights Within K Stops',     difficulty: 'Medium', url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/' },
    ]
  },
  {
    id: '1d-dp',
    title: '1-D Dynamic Programming',
    blurb: 'Break a problem into overlapping subproblems and memoize. "If I knew the answer for n-1, could I get the answer for n?" Climbing stairs, coin change, LIS.',
    color: '#F5B842',
    lessonId: '1d-dp',
    problems: [
      { id: 'climbing-stairs',            title: 'Climbing Stairs',                     difficulty: 'Easy',   url: 'https://leetcode.com/problems/climbing-stairs/' },
      { id: 'min-cost-climbing-stairs',   title: 'Min Cost Climbing Stairs',            difficulty: 'Easy',   url: 'https://leetcode.com/problems/min-cost-climbing-stairs/' },
      { id: 'house-robber',               title: 'House Robber',                        difficulty: 'Medium', url: 'https://leetcode.com/problems/house-robber/' },
      { id: 'house-robber-ii',            title: 'House Robber II',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/house-robber-ii/' },
      { id: 'longest-palindromic-substr', title: 'Longest Palindromic Substring',       difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-palindromic-substring/' },
      { id: 'palindromic-substrings',     title: 'Palindromic Substrings',              difficulty: 'Medium', url: 'https://leetcode.com/problems/palindromic-substrings/' },
      { id: 'decode-ways',                title: 'Decode Ways',                         difficulty: 'Medium', url: 'https://leetcode.com/problems/decode-ways/' },
      { id: 'coin-change',                title: 'Coin Change',                         difficulty: 'Medium', url: 'https://leetcode.com/problems/coin-change/' },
      { id: 'max-product-subarray',       title: 'Maximum Product Subarray',            difficulty: 'Medium', url: 'https://leetcode.com/problems/maximum-product-subarray/' },
      { id: 'word-break',                 title: 'Word Break',                          difficulty: 'Medium', url: 'https://leetcode.com/problems/word-break/' },
      { id: 'longest-increasing-subseq',  title: 'Longest Increasing Subsequence',      difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
      { id: 'partition-equal-subset-sum', title: 'Partition Equal Subset Sum',          difficulty: 'Medium', url: 'https://leetcode.com/problems/partition-equal-subset-sum/' },
    ]
  },
  {
    id: '2d-dp',
    title: '2-D Dynamic Programming',
    blurb: 'DP where state has two dimensions. Grid problems, two-string problems (LCS, edit distance). The "two pointers but DP" pattern.',
    color: '#E07856',
    lessonId: '2d-dp',
    problems: [
      { id: 'unique-paths',               title: 'Unique Paths',                        difficulty: 'Medium', url: 'https://leetcode.com/problems/unique-paths/' },
      { id: 'longest-common-subseq',      title: 'Longest Common Subsequence',          difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-common-subsequence/' },
      { id: 'best-time-buy-sell-cooldown',title: 'Best Time Buy Sell with Cooldown',    difficulty: 'Medium', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/' },
      { id: 'coin-change-ii',             title: 'Coin Change II',                      difficulty: 'Medium', url: 'https://leetcode.com/problems/coin-change-ii/' },
      { id: 'target-sum',                 title: 'Target Sum',                          difficulty: 'Medium', url: 'https://leetcode.com/problems/target-sum/' },
      { id: 'interleaving-string',        title: 'Interleaving String',                 difficulty: 'Medium', url: 'https://leetcode.com/problems/interleaving-string/' },
      { id: 'longest-increasing-path',    title: 'Longest Increasing Path in Matrix',   difficulty: 'Hard',   url: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/' },
      { id: 'distinct-subsequences',      title: 'Distinct Subsequences',               difficulty: 'Hard',   url: 'https://leetcode.com/problems/distinct-subsequences/' },
      { id: 'edit-distance',              title: 'Edit Distance',                       difficulty: 'Hard',   url: 'https://leetcode.com/problems/edit-distance/' },
      { id: 'burst-balloons',             title: 'Burst Balloons',                      difficulty: 'Hard',   url: 'https://leetcode.com/problems/burst-balloons/' },
      { id: 'regex-matching',             title: 'Regular Expression Matching',         difficulty: 'Hard',   url: 'https://leetcode.com/problems/regular-expression-matching/' },
    ]
  },
  {
    id: 'greedy',
    title: 'Greedy',
    blurb: 'Make the locally optimal choice at each step. Sometimes that gets you the global optimum. Proving WHY it does is the hard part.',
    color: '#8FA876',
    lessonId: 'greedy',
    problems: [
      { id: 'max-subarray',               title: 'Maximum Subarray (Kadane)',           difficulty: 'Medium', url: 'https://leetcode.com/problems/maximum-subarray/' },
      { id: 'jump-game',                  title: 'Jump Game',                           difficulty: 'Medium', url: 'https://leetcode.com/problems/jump-game/' },
      { id: 'jump-game-ii',               title: 'Jump Game II',                        difficulty: 'Medium', url: 'https://leetcode.com/problems/jump-game-ii/' },
      { id: 'gas-station',                title: 'Gas Station',                         difficulty: 'Medium', url: 'https://leetcode.com/problems/gas-station/' },
      { id: 'hand-of-straights',          title: 'Hand of Straights',                   difficulty: 'Medium', url: 'https://leetcode.com/problems/hand-of-straights/' },
      { id: 'merge-triplets',             title: 'Merge Triplets to Form Target',       difficulty: 'Medium', url: 'https://leetcode.com/problems/merge-triplets-to-form-target-triplet/' },
      { id: 'partition-labels',           title: 'Partition Labels',                    difficulty: 'Medium', url: 'https://leetcode.com/problems/partition-labels/' },
      { id: 'valid-parenthesis-string',   title: 'Valid Parenthesis String',            difficulty: 'Medium', url: 'https://leetcode.com/problems/valid-parenthesis-string/' },
    ]
  },
  {
    id: 'intervals',
    title: 'Intervals',
    blurb: 'Problems on ranges with start/end. Almost always sort first, then sweep. Meeting rooms, overlap detection, scheduling.',
    color: '#7B9FB5',
    lessonId: 'intervals',
    problems: [
      { id: 'insert-interval',            title: 'Insert Interval',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/insert-interval/' },
      { id: 'merge-intervals',            title: 'Merge Intervals',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/merge-intervals/' },
      { id: 'non-overlapping-intervals',  title: 'Non-overlapping Intervals',           difficulty: 'Medium', url: 'https://leetcode.com/problems/non-overlapping-intervals/' },
      { id: 'meeting-rooms',              title: 'Meeting Rooms',                       difficulty: 'Easy',   url: 'https://leetcode.com/problems/meeting-rooms/' },
      { id: 'meeting-rooms-ii',           title: 'Meeting Rooms II',                    difficulty: 'Medium', url: 'https://leetcode.com/problems/meeting-rooms-ii/' },
      { id: 'min-interval-include-query', title: 'Minimum Interval to Include Query',   difficulty: 'Hard',   url: 'https://leetcode.com/problems/minimum-interval-to-include-each-query/' },
    ]
  },
  {
    id: 'math-geometry',
    title: 'Math & Geometry',
    blurb: 'The "you either see the trick or you don\'t" category. Matrix manipulation, modular arithmetic, geometric reasoning.',
    color: '#B888C0',
    lessonId: 'math-geometry',
    problems: [
      { id: 'rotate-image',               title: 'Rotate Image',                        difficulty: 'Medium', url: 'https://leetcode.com/problems/rotate-image/' },
      { id: 'spiral-matrix',              title: 'Spiral Matrix',                       difficulty: 'Medium', url: 'https://leetcode.com/problems/spiral-matrix/' },
      { id: 'set-matrix-zeroes',          title: 'Set Matrix Zeroes',                   difficulty: 'Medium', url: 'https://leetcode.com/problems/set-matrix-zeroes/' },
      { id: 'happy-number',               title: 'Happy Number',                        difficulty: 'Easy',   url: 'https://leetcode.com/problems/happy-number/' },
      { id: 'plus-one',                   title: 'Plus One',                            difficulty: 'Easy',   url: 'https://leetcode.com/problems/plus-one/' },
      { id: 'pow-x-n',                    title: 'Pow(x, n)',                           difficulty: 'Medium', url: 'https://leetcode.com/problems/powx-n/' },
      { id: 'multiply-strings',           title: 'Multiply Strings',                    difficulty: 'Medium', url: 'https://leetcode.com/problems/multiply-strings/' },
      { id: 'detect-squares',             title: 'Detect Squares',                      difficulty: 'Medium', url: 'https://leetcode.com/problems/detect-squares/' },
    ]
  },
  {
    id: 'bit-manipulation',
    title: 'Bit Manipulation',
    blurb: 'XOR tricks, bit shifting, counting set bits. Niche but unmistakable when you need it. Often the difference between O(n) and O(1).',
    color: '#F5B842',
    lessonId: 'bit-manipulation',
    problems: [
      { id: 'single-number',              title: 'Single Number',                       difficulty: 'Easy',   url: 'https://leetcode.com/problems/single-number/' },
      { id: 'number-of-1-bits',           title: 'Number of 1 Bits',                    difficulty: 'Easy',   url: 'https://leetcode.com/problems/number-of-1-bits/' },
      { id: 'counting-bits',              title: 'Counting Bits',                       difficulty: 'Easy',   url: 'https://leetcode.com/problems/counting-bits/' },
      { id: 'reverse-bits',               title: 'Reverse Bits',                        difficulty: 'Easy',   url: 'https://leetcode.com/problems/reverse-bits/' },
      { id: 'missing-number',             title: 'Missing Number',                      difficulty: 'Easy',   url: 'https://leetcode.com/problems/missing-number/' },
      { id: 'sum-two-integers',           title: 'Sum of Two Integers',                 difficulty: 'Medium', url: 'https://leetcode.com/problems/sum-of-two-integers/' },
      { id: 'reverse-integer',            title: 'Reverse Integer',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/reverse-integer/' },
    ]
  },
];

// Helpers
export function allProblems() {
  return PATTERNS.flatMap(p => p.problems.map(prob => ({ ...prob, patternId: p.id, patternTitle: p.title })));
}

export function problemCount() {
  return PATTERNS.reduce((acc, p) => acc + p.problems.length, 0);
}
