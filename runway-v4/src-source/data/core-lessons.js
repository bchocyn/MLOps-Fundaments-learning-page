// ============================================================
// CORE LESSONS — Foundations, Languages, ML, OS, Distributed, Interview
// 30 lessons across 6 tracks. Sequenced for Next/Prev navigation.
// ============================================================

import { archDiagram, sequenceDiagram, compareTable, callout, quiz } from '../components/viz.js';

// Track metadata — order here drives Next/Prev navigation
export const CORE_TRACKS = [
  { id: 'lang', name: 'Languages & Config', icon: '⌨', color: '#F5B842',
    lessons: ['python-basics', 'python-idioms', 'yaml', 'regex', 'bash'] },
  { id: 'found', name: 'Foundations / DevOps', icon: '◆', color: '#7B9FB5',
    lessons: ['linux', 'git', 'docker', 'kubernetes', 'ci-cd', 'terraform', 'observability'] },
  { id: 'ml', name: 'Machine Learning', icon: '◉', color: '#E07856',
    lessons: ['ml-lifecycle', 'features', 'training-eval', 'deployment', 'monitoring', 'ab-testing'] },
  { id: 'os', name: 'Operating Systems', icon: '▣', color: '#8FA876',
    lessons: ['processes-threads', 'concurrency', 'memory', 'virtual-memory', 'file-systems'] },
  { id: 'dist', name: 'Distributed Systems Theory', icon: '⌬', color: '#B888C0',
    lessons: ['time-clocks', 'consensus', 'consistency-models', 'distributed-txns'] },
  { id: 'int', name: 'Interview Prep', icon: '★', color: '#F5B842',
    lessons: ['star-framework', 'negotiation', 'interview-loop'] },
];

export const CORE_LESSONS = {

  // ========================================
  // TRACK: LANGUAGES & CONFIG
  // ========================================

  'python-basics': {
    track: 'lang',
    title: 'Python Fundamentals',
    subtitle: 'The 20% of Python you use 80% of the time',
    duration: '25 min read', difficulty: 'Foundational',
    sections: [
      { title: 'Why Python', body: () => `
        <p>Python is the lingua franca of MLOps, DevOps automation, and data work. It's slow but readable, has a massive standard library, and the ecosystem (pandas, numpy, scikit-learn, FastAPI, requests) is the best in the world for what you'll be doing.</p>
        <p>Coming from JS or shell, the biggest mental shift: <strong>significant whitespace.</strong> Indentation defines blocks. There are no braces. Get this wrong once and you'll never forget.</p>` },
      { title: 'Data Types You Actually Use', body: () => `
        ${compareTable({ headers: ['Type', 'Mutable?', 'Example'], rows: [
          ['int, float, str', 'No', '42, 3.14, "hello"'],
          ['list', 'Yes', '[1, 2, 3] — ordered, indexed'],
          ['tuple', 'No', '(1, 2, 3) — immutable list'],
          ['dict', 'Yes', '{"a": 1, "b": 2} — key/value'],
          ['set', 'Yes', '{1, 2, 3} — unique unordered'],
          ['None', 'N/A', 'Python\'s null'],
        ] })}
        <p>The dict is your Swiss Army knife. The set kills duplicates and tests membership in O(1).</p>` },
      { title: 'Control Flow', body: () => `
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># if / elif / else — no parens needed
if x > 10:
    print("big")
elif x > 0:
    print("small")
else:
    print("zero or negative")

# for — always iterates over a sequence
for item in [1, 2, 3]:
    print(item)

# for with index
for i, item in enumerate(["a", "b", "c"]):
    print(i, item)

# while
while x > 0:
    x -= 1

# break, continue work like everywhere</code></pre>
        ${callout('No "for (int i = 0; i < n; i++)" in Python. Use range(n) or enumerate(). The C-style loop will mark you as not really knowing Python.', 'insight')}` },
      { title: 'Functions, Args, and Defaults', body: () => `
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code>def greet(name, greeting="Hello", **kwargs):
    return f"{greeting}, {name}!"

# Positional
greet("Brandon")
# "Hello, Brandon!"

# Keyword args
greet(name="Brandon", greeting="Hey")

# *args and **kwargs catch extras
def log(level, *messages, **metadata):
    print(level, messages, metadata)

log("INFO", "started", "ok", user="brandon", time=1234)</code></pre>
        ${callout('NEVER use a mutable default argument like def f(x=[]). The list is shared across calls — a classic bug. Use def f(x=None): if x is None: x = []', 'warning')}
        ${quiz('What\'s the difference between a list and a tuple beyond mutability?', 'Tuples can be dict keys (immutable). Tuples are slightly faster to construct. Use tuple for fixed-size records (coordinates, RGB colors), list for collections that grow.')}` },
    ],
    keyTerms: ['list / tuple / dict / set', 'enumerate', 'f-string', '*args / **kwargs', 'mutable defaults gotcha'],
    sources: ['Official Python tutorial (docs.python.org/3/tutorial)', 'Fluent Python by Luciano Ramalho', 'Real Python (realpython.com)']
  },

  'python-idioms': {
    track: 'lang',
    title: 'Python Idioms',
    subtitle: 'Comprehensions, generators, context managers — write like a native',
    duration: '25 min read', difficulty: 'Foundational',
    sections: [
      { title: 'List Comprehensions', body: () => `
        <p>The most "Pythonic" pattern. Replaces map/filter and most for-loops that build a list.</p>
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># Old way
squares = []
for x in range(10):
    squares.append(x * x)

# Pythonic
squares = [x * x for x in range(10)]

# With filter
evens = [x for x in range(20) if x % 2 == 0]

# Nested
matrix = [[i * j for j in range(5)] for i in range(5)]

# Dict comprehension
char_count = {c: word.count(c) for c in set(word)}

# Set comprehension
unique_lengths = {len(w) for w in words}</code></pre>` },
      { title: 'Generators — Lazy Lists', body: () => `
        <p>Generators yield values one at a time. They use O(1) memory regardless of how many values they produce. Critical for large data.</p>
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># List comp — builds all in memory
nums = [x * x for x in range(10**9)]   # crashes, 8GB+

# Generator expression — produces on demand
nums = (x * x for x in range(10**9))   # fine, lazy

# Sum it without materializing
total = sum(x * x for x in range(10**9))

# yield in a function makes it a generator
def fib():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Infinite sequence, take first 10
import itertools
first_ten = list(itertools.islice(fib(), 10))</code></pre>
        ${callout('Anywhere a list comprehension would create something you only iterate once, use a generator expression instead. Same syntax, swap [] for ().', 'insight')}` },
      { title: 'Context Managers (with)', body: () => `
        <p>Ensures cleanup happens. Files close, locks release, connections return to pool — even on exceptions.</p>
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># File: auto-closed at end of block
with open("data.txt") as f:
    for line in f:
        process(line)
# f is closed here, even if process() raised

# Multiple at once
with open("in.txt") as fin, open("out.txt", "w") as fout:
    fout.write(fin.read().upper())

# DB transaction example
with db.transaction():
    user.save()
    audit.log()
# Auto-commit on success, rollback on exception</code></pre>` },
      { title: 'Idioms That Mark You As Fluent', body: () => `
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># Swap variables
a, b = b, a

# Unpack into named pieces
name, age, *rest = ["brandon", 22, "huntsville", "engineer"]

# Default dict get
counts.get("key", 0)
counts.setdefault("key", []).append(value)

# Or use collections.defaultdict / Counter
from collections import Counter, defaultdict
counter = Counter(words)
top_3 = counter.most_common(3)

# String join (faster than +=)
csv = ",".join(str(x) for x in values)

# Truthiness — empty containers are falsy
if not my_list:  # empty
    ...

# Walrus operator (3.8+)
if (n := len(data)) > 100:
    print(f"Too much data: {n}")</code></pre>
        ${quiz('What\'s the time complexity of "x in my_list" vs "x in my_set"?', 'list: O(n) — linear scan. set: O(1) average — hash lookup. If you do "in" checks often, build a set first.')}` },
    ],
    keyTerms: ['list comp', 'generator', 'with statement', 'unpacking', 'Counter / defaultdict', 'walrus operator', 'truthiness'],
    sources: ['Fluent Python by Luciano Ramalho', 'Effective Python by Brett Slatkin', 'PEP 8 style guide']
  },

  'yaml': {
    track: 'lang',
    title: 'YAML',
    subtitle: 'The config language every infra tool insists on',
    duration: '18 min read', difficulty: 'Foundational',
    sections: [
      { title: 'Why YAML', body: () => `
        <p>YAML (YAML Ain't Markup Language) is JSON with less syntax noise. Kubernetes manifests, GitHub Actions workflows, Terraform sometimes, Ansible playbooks, Docker Compose, CI/CD configs — all YAML. You will write thousands of lines of it.</p>
        <p><strong>Indentation matters.</strong> Like Python. Tabs are forbidden — use spaces (2 is the convention).</p>` },
      { title: 'The Three Container Types', body: () => `
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># 1. Scalars (strings, numbers, bools)
name: brandon
age: 22
active: true
empty:  # this is null

# 2. Sequences (lists)
languages:
  - python
  - go
  - rust

# Inline flow style (like JSON)
languages: [python, go, rust]

# 3. Mappings (dicts)
person:
  name: brandon
  age: 22
  skills:
    - kubernetes
    - terraform

# Inline mapping
person: {name: brandon, age: 22}</code></pre>` },
      { title: 'Multiline Strings — the Trap', body: () => `
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># | preserves newlines (block scalar)
script: |
  echo "line 1"
  echo "line 2"
# value = "echo \\"line 1\\"\\necho \\"line 2\\"\\n"

# > folds newlines into spaces
description: >
  This is one
  long sentence
  on multiple lines.
# value = "This is one long sentence on multiple lines.\\n"

# |- strips trailing newline
# >- folds AND strips trailing newline</code></pre>
        ${callout('In Kubernetes ConfigMaps and shell scripts, always use | (preserve newlines). > breaks bash because it joins lines with spaces — your multi-line script becomes one giant unreadable line.', 'warning')}` },
      { title: 'Anchors & Aliases (the DRY trick)', body: () => `
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># Define an anchor with &
defaults: &defaults
  retries: 3
  timeout: 30
  region: us-east-1

# Reference it with *
prod:
  &lt;&lt;: *defaults   # merge defaults in
  hosts: 10

staging:
  &lt;&lt;: *defaults
  hosts: 2
  timeout: 60     # override one field</code></pre>
        <p>Used heavily in GitLab CI and other repetitive configs. Most tools (Kubernetes!) <strong>don't actually evaluate anchors</strong> server-side — they expand at parse time on the client.</p>` },
      { title: 'Gotchas', body: () => `
        ${compareTable({ headers: ['You wrote', 'Got parsed as', 'Fix'], rows: [
          ['version: 1.10', 'string "1.10"', 'OK — most parsers treat unquoted as string'],
          ['version: 1.1', 'float 1.1', 'Quote it: "1.1"'],
          ['port: 8080', 'int', 'OK'],
          ['port: "08080"', 'string', 'Often what you want for env vars'],
          ['enabled: yes', 'bool true', 'Quote if you meant string: "yes"'],
          ['country: NO', 'bool false', 'Norway problem — quote: "NO"'],
          ['date: 2024-01-15', 'datetime object', 'Quote if you need string'],
        ] })}
        ${quiz('Why is YAML preferred over JSON for human-edited config files?', 'Comments (JSON doesn\'t allow #), multiline strings without escaping, less syntax noise (no commas/braces), references via anchors. JSON wins for machine-generated config (smaller, faster to parse, no ambiguity).')}` },
    ],
    keyTerms: ['Scalar / sequence / mapping', '| (literal) vs > (folded)', 'Anchors (&) and aliases (*)', 'Norway problem', 'Tabs forbidden'],
    sources: ['YAML 1.2 spec (yaml.org)', 'noyaml.com (rants but accurate)', 'Kubernetes YAML reference']
  },

  'regex': {
    track: 'lang',
    title: 'Regex Essentials',
    subtitle: 'Pattern matching that will save you 1000 lines of code',
    duration: '20 min read', difficulty: 'Foundational',
    sections: [
      { title: 'The Core Vocabulary', body: () => `
        ${compareTable({ headers: ['Token', 'Means', 'Example'], rows: [
          ['.', 'any char (except newline)', 'a.c matches abc, axc'],
          ['*', '0 or more of previous', 'ab* matches a, ab, abb'],
          ['+', '1 or more', 'ab+ matches ab, abb (not a)'],
          ['?', '0 or 1', 'colou?r matches color, colour'],
          ['^ $', 'start, end of line', '^abc$ matches only "abc"'],
          ['[abc]', 'any of a, b, c', '[aeiou] = any vowel'],
          ['[^abc]', 'NOT a, b, c', '[^0-9] = any non-digit'],
          ['\\\\d \\\\w \\\\s', 'digit / word char / whitespace', '\\\\d+ = 1+ digits'],
          ['{n,m}', 'n to m repetitions', 'a{2,4} = aa, aaa, or aaaa'],
          ['(abc)', 'capture group', 'reference back via \\\\1'],
          ['a|b', 'a OR b', 'cat|dog matches either'],
        ] })}` },
      { title: 'Greedy vs Lazy', body: () => `
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># Greedy (default) — matches as much as possible
"&lt;p&gt;hello&lt;/p&gt;&lt;p&gt;world&lt;/p&gt;".match(/&lt;p&gt;.*&lt;\\/p&gt;/)
// matches ENTIRE string

# Lazy with ? — matches as little as possible
"&lt;p&gt;hello&lt;/p&gt;&lt;p&gt;world&lt;/p&gt;".match(/&lt;p&gt;.*?&lt;\\/p&gt;/)
// matches just "&lt;p&gt;hello&lt;/p&gt;"</code></pre>
        ${callout('Greedy is the default. If you\'re matching HTML/JSON-like content and pulling too much, add ? to make quantifiers lazy. Better yet, don\'t parse HTML with regex.', 'warning')}` },
      { title: 'Capture Groups & Back-References', body: () => `
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># Capture date parts
re.match(r"(\\d{4})-(\\d{2})-(\\d{2})", "2024-01-15")
# group(1) = "2024", group(2) = "01", group(3) = "15"

# Named groups (cleaner)
m = re.match(r"(?P&lt;year&gt;\\d{4})-(?P&lt;month&gt;\\d{2})", "2024-01")
m.group("year")   # "2024"

# Back-references — match same text again
re.search(r"\\b(\\w+)\\s+\\1\\b", "the the dog")
# finds "the the" — same word twice

# Substitution with capture
re.sub(r"(\\d{3})-(\\d{4})", r"XXX-\\2", "555-1234")
# "XXX-1234"</code></pre>` },
      { title: 'Patterns You\'ll Actually Use', body: () => `
        ${compareTable({ headers: ['Need', 'Pattern'], rows: [
          ['Email-ish', '[\\\\w.+-]+@[\\\\w-]+\\\\.[\\\\w.-]+'],
          ['IPv4', '\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}'],
          ['URL', 'https?://[\\\\w./?=&-]+'],
          ['UUID', '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'],
          ['Whitespace only', '^\\\\s*$'],
          ['Strip ANSI color codes', '\\\\x1b\\\\[[0-9;]*m'],
          ['Comment line', '^\\\\s*#'],
        ] })}
        ${callout('Use raw strings r"..." in Python so you don\'t double-escape backslashes. Without raw: "\\\\\\\\d+" is awful.', 'insight')}
        ${quiz('Why does regex have catastrophic backtracking, and how do you avoid it?', 'Nested quantifiers like (a+)+ can explore exponentially many matches before failing. Avoid: use atomic groups (?>...) where available, avoid nested quantifiers, prefer specific patterns over .*')}` },
    ],
    keyTerms: ['Character classes', 'Quantifiers', 'Anchors (^ $)', 'Greedy vs lazy', 'Capture groups', 'Back-references', 'Catastrophic backtracking'],
    sources: ['regex101.com (interactive tester)', 'Mastering Regular Expressions by Friedl', 'Python re module docs']
  },

  'bash': {
    track: 'lang',
    title: 'Bash & Shell Scripting',
    subtitle: 'The glue language that holds your infrastructure together',
    duration: '25 min read', difficulty: 'Foundational',
    sections: [
      { title: 'The Three Streams', body: () => `
        ${compareTable({ headers: ['Stream', 'Number', 'Default'], rows: [
          ['stdin', '0', 'keyboard'],
          ['stdout', '1', 'terminal'],
          ['stderr', '2', 'terminal'],
        ] })}
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># Redirect stdout
echo "hi" > file.txt          # overwrite
echo "hi" >> file.txt         # append

# Redirect stderr
command 2> errors.log

# Both to same place
command > out.log 2>&1
command &> out.log            # bash shortcut

# Discard
command > /dev/null 2>&1      # silence everything</code></pre>` },
      { title: 'Pipes & Composability', body: () => `
        <p>The Unix philosophy: small tools that do one thing well, composed via pipes.</p>
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># Find the 5 largest files in current directory
du -sh * | sort -h | tail -5

# Count unique IPs in nginx access log
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head

# Find python files containing "TODO"
grep -rln "TODO" --include="*.py"

# Process JSON with jq
curl https://api.github.com/users/bchocyn | jq '.public_repos'

# Kill all processes matching pattern
ps aux | grep 'python' | grep -v grep | awk '{print $2}' | xargs kill</code></pre>` },
      { title: 'Variables, Quoting, and the $ Gotcha', body: () => `
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code>name="brandon"
echo "Hello $name"      # "Hello brandon"  — expanded
echo 'Hello $name'      # "Hello $name"    — literal

# Command substitution
files=$(ls *.txt)
count=$(echo "$files" | wc -l)

# Arithmetic
n=$((5 + 3))

# Always quote variables to handle spaces
file="my report.pdf"
rm $file       # WRONG — tries to delete "my" and "report.pdf"
rm "$file"     # RIGHT</code></pre>
        ${callout('Always quote your variables in bash. Always. This single rule prevents 90% of shell script bugs around filenames with spaces.', 'warning')}` },
      { title: 'Conditionals & Loops', body: () => `
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># if with [[ ... ]] — bash extended test
if [[ -f "$file" ]]; then
    echo "file exists"
elif [[ -z "$var" ]]; then
    echo "var is empty"
fi

# Useful test operators:
#  -f file exists, -d dir exists, -z empty, -n non-empty
#  -eq -ne -lt -gt for integers
#  == != for strings

# for loop over args, files, or list
for f in *.txt; do
    echo "Processing $f"
done

for i in {1..10}; do
    echo $i
done

# while
while read line; do
    echo "&gt; $line"
done &lt; input.txt

# Functions
deploy() {
    local env=$1
    echo "Deploying to $env"
}
deploy production</code></pre>` },
      { title: 'set -euo pipefail (Mandatory)', body: () => `
        <p>Put this at the top of every non-trivial script. It turns Bash from "shell of footguns" into "almost safe":</p>
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code>#!/usr/bin/env bash
set -euo pipefail

# -e  exit on first error
# -u  exit on undefined variable
# -o pipefail  exit if any command in pipe fails

# Without -e, this would continue after rm fails
rm /nonexistent/file
echo "still running, oops"</code></pre>
        ${quiz('Why is "set -e" not enough by itself?', '"set -e" only catches errors from commands run directly. Without -o pipefail, "false | true" succeeds (exit code 0) because only the last command\'s exit code counts. Without -u, typos in variable names silently expand to empty strings.')}` },
    ],
    keyTerms: ['stdin / stdout / stderr', 'Pipes', 'Quoting', 'set -euo pipefail', '[[ tests ]]', 'jq', 'xargs', 'awk basics'],
    sources: ['Bash manual (man bash)', 'Google Shell Style Guide', 'explainshell.com (interactive)']
  },

  // ========================================
  // TRACK: FOUNDATIONS / DEVOPS
  // ========================================

  'linux': {
    track: 'found',
    title: 'Linux Fundamentals',
    subtitle: 'The OS your production runs on',
    duration: '25 min read', difficulty: 'Foundational',
    sections: [
      { title: 'The Filesystem Tree', body: () => `
        ${compareTable({ headers: ['Path', 'What lives there'], rows: [
          ['/', 'root of everything'],
          ['/etc', 'system config files'],
          ['/var', 'logs, databases, runtime state'],
          ['/var/log', 'log files'],
          ['/usr/bin', 'system binaries'],
          ['/usr/local/bin', 'manually-installed binaries'],
          ['/home/$USER', 'your home directory'],
          ['/tmp', 'temporary files (cleared on reboot)'],
          ['/proc', 'process info (virtual filesystem)'],
          ['/dev', 'device files (disks, terminals)'],
        ] })}` },
      { title: 'Permissions (rwx for ugo)', body: () => `
        <p>Every file has three permission groups: <strong>user</strong> (owner), <strong>group</strong>, <strong>other</strong>. Each has read/write/execute bits.</p>
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code>$ ls -l script.sh
-rwxr-xr-- 1 brandon devs 1234 Jan 15 script.sh
 |||||||||
 |||||||\\__ other can read only
 ||||\\______ group can read + execute
 |\\__________ user can read + write + execute

# Numeric: rwx as bits  r=4, w=2, x=1
chmod 755 script.sh   # rwxr-xr-x  (common for scripts)
chmod 644 file.txt    # rw-r--r--  (common for docs)
chmod 600 ~/.ssh/id_rsa   # rw------- (private key!)

# Symbolic
chmod u+x script.sh   # add execute for user
chmod o-r secret.txt  # remove read from other

# Change owner
chown user:group file.txt</code></pre>
        ${callout('SSH private keys MUST be 600. If they\'re world-readable, ssh refuses to use them.', 'warning')}` },
      { title: 'Processes', body: () => `
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># List processes
ps aux | grep nginx
top                # interactive, refreshes
htop               # nicer top (often must install)

# Background a process
long_running_command &
nohup long_running_command &  # survives terminal close

# Kill by PID
kill 12345          # gentle SIGTERM
kill -9 12345       # forceful SIGKILL

# Kill by name
pkill -f "python myscript"

# Job control
jobs                # list bg jobs
fg %1               # bring job 1 to foreground
Ctrl+Z              # suspend current
bg                  # resume in background</code></pre>` },
      { title: 'The Toolkit You Need', body: () => `
        ${compareTable({ headers: ['Command', 'Does'], rows: [
          ['grep', 'search text in files'],
          ['find', 'find files by name/size/age'],
          ['sed', 'stream editing (find/replace)'],
          ['awk', 'column-based text processing'],
          ['cut', 'extract columns by delimiter'],
          ['sort + uniq', 'sort, dedupe (often combined)'],
          ['tail -f', 'follow log as it grows'],
          ['curl / wget', 'HTTP from command line'],
          ['ssh / scp / rsync', 'remote shell, copy, sync'],
          ['tar + gzip', 'archive and compress'],
          ['systemctl', 'manage services (start/stop/status)'],
          ['journalctl', 'view systemd logs'],
        ] })}
        ${quiz('You SSH to a server. Your terminal disconnects. The script you were running dies. How to prevent this next time?', 'tmux or screen — terminal multiplexers. ssh in, tmux to open a session, run your script there, detach with Ctrl+B D, reconnect later with tmux attach. Or nohup ./script.sh & to fully detach.')}` },
    ],
    keyTerms: ['Filesystem layout', 'rwx permissions', 'chmod octal', 'Process management', 'kill signals', 'systemd', 'tmux'],
    sources: ['The Linux Command Line by William Shotts (free PDF)', 'Linux man pages (man <command>)', 'Linuxjourney.com']
  },

  'git': {
    track: 'found',
    title: 'Git Deep Dive',
    subtitle: 'Not just add-commit-push — the model that makes it click',
    duration: '28 min read', difficulty: 'Foundational',
    sections: [
      { title: 'The Mental Model', body: () => `
        <p>Git is not a "save my files" tool. It's a database of <strong>commits</strong>, each a snapshot of your project. <strong>Branches</strong> are just labels pointing to commits. Once you internalize this, everything makes sense.</p>
        ${archDiagram({ height: 200, nodes: [
          { id: 'wd', x: 50, y: 90, w: 100, h: 40, label: 'Working dir', sub: 'your files' },
          { id: 'idx', x: 220, y: 90, w: 100, h: 40, label: 'Staging', sub: 'next commit', color: '#F5B842' },
          { id: 'repo', x: 390, y: 90, w: 100, h: 40, label: '.git', sub: 'history', color: '#8FA876' },
        ], edges: [
          { from: 'wd', to: 'idx', label: 'git add' },
          { from: 'idx', to: 'repo', label: 'git commit' },
        ], caption: 'Three states: working → staging → committed' })}` },
      { title: 'Branches Are Labels', body: () => `
        <p>A branch is a movable pointer to a commit. <code>git checkout -b feature</code> creates a new label pointing to where you are now. Switching branches just moves <code>HEAD</code> (the "you are here" pointer) to a different label.</p>
        <p>This is why branching is essentially free in Git — no copying, just relabeling.</p>` },
      { title: 'The Daily Workflow', body: () => `
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># Pull latest
git checkout main
git pull

# Branch for work
git checkout -b feature/new-thing

# Make changes
vim ...
git status              # what changed?
git diff                # show unstaged changes
git add file.py         # stage one file
git add -p              # stage hunks interactively
git commit -m "msg"

# Push to remote
git push -u origin feature/new-thing

# Update branch with latest main
git fetch
git rebase origin/main  # cleaner than merge

# After PR merged
git checkout main
git pull
git branch -d feature/new-thing</code></pre>` },
      { title: 'Merge vs Rebase', body: () => `
        ${compareTable({ headers: ['Operation', 'What it does', 'When'], rows: [
          ['merge', 'Combines branches, creates merge commit', 'When you want history to reflect that work happened in parallel'],
          ['rebase', 'Replays your commits on top of target branch', 'When you want linear history'],
          ['cherry-pick', 'Copy one specific commit', 'Hotfix to multiple branches'],
          ['revert', 'New commit that undoes a previous one', 'Undoing in shared history (safe)'],
          ['reset', 'Moves branch pointer (destructive)', 'Undoing locally (DANGEROUS)'],
        ] })}
        ${callout('Never rebase commits that other people have based work on. You\'ll rewrite their history and break everything. Rebase your own unpushed work freely.', 'warning')}` },
      { title: 'Getting Out of Trouble', body: () => `
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># Discard local changes to a file
git restore file.py

# Unstage a file
git restore --staged file.py

# Amend last commit (message or add files)
git commit --amend

# Undo last commit, keep changes
git reset --soft HEAD~1

# Undo last commit, discard changes (DESTRUCTIVE)
git reset --hard HEAD~1

# View commit graph
git log --graph --oneline --all

# What did I do recently? (saves your life)
git reflog</code></pre>
        ${quiz('You force-pushed and overwrote your teammate\'s commits. How do you recover their work?', 'git reflog on the remote (if they have local copies) shows every HEAD movement. Find the SHA of their pre-force-push state, cherry-pick or reset to it. This is also why force-push to main should be banned via branch protection.')}` },
    ],
    keyTerms: ['commit / branch / HEAD', 'staging area', 'merge vs rebase', 'reset (soft/hard)', 'reflog', 'cherry-pick', 'revert'],
    sources: ['Pro Git book (free at git-scm.com/book)', 'Oh My Git! (interactive game)', 'learngitbranching.js.org']
  },

  'docker': {
    track: 'found',
    title: 'Docker & Containers',
    subtitle: 'Package once, run anywhere — without VM overhead',
    duration: '25 min read', difficulty: 'Foundational',
    sections: [
      { title: 'What a Container Actually Is', body: () => `
        <p>A container is a process running on the host kernel, isolated via <strong>namespaces</strong> (sees its own PIDs, network, filesystem) and <strong>cgroups</strong> (limited CPU/memory). It's NOT a VM. No guest OS. Just isolation primitives.</p>
        ${archDiagram({ height: 220, nodes: [
          { id: 'h', x: 200, y: 180, w: 140, h: 35, label: 'Host kernel (Linux)', color: '#8FA876' },
          { id: 'd', x: 200, y: 130, w: 140, h: 35, label: 'Docker daemon' },
          { id: 'c1', x: 80, y: 60, w: 100, h: 50, label: 'Container A', sub: 'python app' },
          { id: 'c2', x: 220, y: 60, w: 100, h: 50, label: 'Container B', sub: 'postgres' },
          { id: 'c3', x: 360, y: 60, w: 100, h: 50, label: 'Container C', sub: 'redis' },
        ], edges: [
          { from: 'c1', to: 'd' }, { from: 'c2', to: 'd' }, { from: 'c3', to: 'd' },
          { from: 'd', to: 'h' },
        ], caption: 'Containers share the host kernel; only userspace differs' })}
        <p>This is why containers start in milliseconds and use little RAM — VM-level isolation, near-zero overhead.</p>` },
      { title: 'Dockerfile — Build Instructions', body: () => `
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code>FROM python:3.11-slim          # base image

WORKDIR /app                    # cd into /app

COPY requirements.txt .         # copy deps first
RUN pip install -r requirements.txt   # install (this layer cached if reqs unchanged)

COPY . .                        # then copy code (changes often)

EXPOSE 8000                     # docs only — doesn't open port
CMD ["python", "app.py"]        # what to run on start</code></pre>
        ${callout('Order matters because of layer caching. Copy and install dependencies BEFORE copying your source code. That way, code changes don\'t invalidate the dep cache.', 'insight')}` },
      { title: 'The Commands', body: () => `
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># Build
docker build -t myapp:v1 .

# Run
docker run -d \\               # detached
  -p 8000:8000 \\              # map host:container port
  -e DATABASE_URL=... \\        # env var
  -v $(pwd)/data:/data \\      # mount volume
  --name myapp-prod \\
  myapp:v1

# Inspect running
docker ps                       # running containers
docker ps -a                    # include stopped
docker logs -f myapp-prod       # tail logs
docker exec -it myapp-prod bash # shell into running container

# Clean up
docker stop myapp-prod
docker rm myapp-prod
docker rmi myapp:v1             # remove image
docker system prune -a          # nuke unused stuff</code></pre>` },
      { title: 'Multi-Stage Builds — The Pro Move', body: () => `
        <p>Build in one image (with compilers, dev tools), copy only the artifact into a tiny final image.</p>
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># Stage 1: build
FROM golang:1.21 AS builder
WORKDIR /src
COPY . .
RUN go build -o /app/server .

# Stage 2: tiny runtime
FROM alpine:3.19
COPY --from=builder /app/server /server
CMD ["/server"]
# Final image: ~10MB instead of 1GB+</code></pre>
        ${callout('Production rule: your final image should NOT contain compilers, source code, or package managers. Multi-stage shrinks attack surface and image size dramatically.', 'insight')}
        ${quiz('What\'s the difference between an image and a container?', 'Image = blueprint (read-only template). Container = running instance (read-write layer on top of image). Like class vs object. You can run many containers from one image.')}` },
    ],
    keyTerms: ['Image vs container', 'Layer caching', 'Dockerfile directives', 'Volumes & bind mounts', 'Port mapping', 'Multi-stage builds'],
    sources: ['Docker official docs', 'Dive (tool to inspect image layers)', 'Best practices for writing Dockerfiles']
  },

  'kubernetes': {
    track: 'found',
    title: 'Kubernetes Essentials',
    subtitle: 'Orchestration: from "running containers" to "self-healing apps"',
    duration: '32 min read', difficulty: 'Intermediate',
    sections: [
      { title: 'The Core Objects', body: () => `
        ${compareTable({ headers: ['Object', 'What', 'Mental model'], rows: [
          ['Pod', 'One or more containers run together', 'The atom — smallest deployable unit'],
          ['Deployment', 'Declares N replicas of a pod template', 'Manages pods, handles rolling updates'],
          ['Service', 'Stable network endpoint for a set of pods', 'Internal DNS + load balancing'],
          ['Ingress', 'External HTTP routing rules', 'L7 routing into the cluster'],
          ['ConfigMap', 'Non-secret config (env vars, files)', 'Externalize config from images'],
          ['Secret', 'Same as ConfigMap but base64-encoded', 'For passwords, tokens, keys'],
          ['Namespace', 'Logical partition of the cluster', 'Multi-team isolation'],
        ] })}` },
      { title: 'A Real Deployment', body: () => `
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 11px;"><code>apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api
        image: myapp:v1.2.3
        ports:
        - containerPort: 8000
        resources:
          requests: {cpu: 100m, memory: 128Mi}
          limits:   {cpu: 500m, memory: 256Mi}
        livenessProbe:
          httpGet: {path: /healthz, port: 8000}
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef: {name: db-creds, key: url}
---
apiVersion: v1
kind: Service
metadata: {name: api}
spec:
  selector: {app: api}
  ports:
  - port: 80
    targetPort: 8000</code></pre>` },
      { title: 'The Self-Healing Loop', body: () => `
        <p>K8s constantly compares <strong>desired state</strong> (your YAML) to <strong>actual state</strong> (what's running). Any drift triggers correction.</p>
        ${sequenceDiagram({ actors: ['You', 'API server', 'Controller', 'Kubelet'], height: 280, messages: [
          { from: 0, to: 1, label: 'apply deployment.yaml' },
          { from: 1, to: 2, label: 'observe: 0 pods, want 3' },
          { from: 2, to: 1, label: 'create 3 pods', return: true },
          { from: 1, to: 3, label: 'schedule pods to nodes' },
          { from: 3, to: 1, label: 'pods running', return: true },
          { from: 2, to: 1, label: 'liveness probe fails on pod 2' },
          { from: 1, to: 3, label: 'restart pod 2 automatically' },
        ], caption: 'Reconciliation loop: K8s never stops checking' })}` },
      { title: 'kubectl — The Daily Driver', body: () => `
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># Apply changes
kubectl apply -f deployment.yaml

# What's running?
kubectl get pods
kubectl get pods -n my-namespace
kubectl get all                  # all resources

# Inspect
kubectl describe pod api-xyz     # events, conditions
kubectl logs -f api-xyz          # tail logs
kubectl logs --previous api-xyz  # crashed pod's logs

# Debug
kubectl exec -it api-xyz -- bash
kubectl port-forward api-xyz 8000:8000   # access locally

# Scale
kubectl scale deployment api --replicas=5

# Rollout
kubectl rollout status deployment api
kubectl rollout undo deployment api</code></pre>` },
      { title: 'Probes — Why Things Self-Heal', body: () => `
        ${compareTable({ headers: ['Probe', 'Asks', 'On failure'], rows: [
          ['liveness', 'Is the app alive?', 'Restart the container'],
          ['readiness', 'Is the app ready to serve?', 'Remove from Service load balancer'],
          ['startup', 'Has the app finished starting?', 'Disables other probes during startup'],
        ] })}
        ${callout('Without probes, K8s assumes "process running = healthy." Apps that deadlock or block on startup will silently fail traffic. Always set at least liveness + readiness.', 'warning')}
        ${quiz('Pod CrashLoopBackOff means what, and how do you debug it?', 'Container started, exited, K8s restarted it, it crashed again — backing off. Debug: kubectl logs --previous (logs from the dead one), kubectl describe pod (events, OOMKilled?), check resource limits, env vars, image tag.')}` },
    ],
    keyTerms: ['Pod', 'Deployment', 'Service', 'Ingress', 'ConfigMap / Secret', 'Probes (liveness/readiness)', 'Reconciliation loop', 'kubectl basics'],
    sources: ['Kubernetes Up & Running by Brendan Burns', 'kubernetes.io docs', 'KubeCon talks on YouTube']
  },

  'ci-cd': {
    track: 'found',
    title: 'CI/CD Pipelines',
    subtitle: 'Automate the path from commit to production',
    duration: '22 min read', difficulty: 'Foundational',
    sections: [
      { title: 'CI vs CD vs CD', body: () => `
        ${compareTable({ headers: ['Term', 'Stands for', 'Goal'], rows: [
          ['CI', 'Continuous Integration', 'Every commit auto-builds + tests'],
          ['CD', 'Continuous Delivery', 'Every passing build is ready to deploy (manual trigger)'],
          ['CD', 'Continuous Deployment', 'Every passing build auto-deploys to prod'],
        ] })}
        <p>Most companies do CI + Delivery. Full Deployment to prod takes serious test coverage, feature flags, and observability.</p>` },
      { title: 'A Typical Pipeline', body: () => `
        ${archDiagram({ height: 200, nodes: [
          { id: 'commit', x: 30, y: 90, w: 80, h: 30, label: 'git push' },
          { id: 'lint', x: 130, y: 90, w: 70, h: 30, label: 'lint' },
          { id: 'test', x: 220, y: 90, w: 70, h: 30, label: 'test' },
          { id: 'build', x: 310, y: 90, w: 70, h: 30, label: 'build image' },
          { id: 'scan', x: 400, y: 90, w: 70, h: 30, label: 'scan' },
          { id: 'deploy', x: 490, y: 90, w: 80, h: 30, label: 'deploy', color: '#8FA876' },
        ], edges: [
          { from: 'commit', to: 'lint' }, { from: 'lint', to: 'test' }, { from: 'test', to: 'build' },
          { from: 'build', to: 'scan' }, { from: 'scan', to: 'deploy' },
        ], caption: 'Each stage is a gate — fail fast, save compute' })}` },
      { title: 'GitHub Actions Example', body: () => `
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 11px;"><code>name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pip'
      - run: pip install -r requirements.txt
      - run: ruff check .
      - run: pytest --cov

  build-push:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          username: ${ '$' }{{ secrets.DOCKER_USER }}
          password: ${ '$' }{{ secrets.DOCKER_PASS }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: myapp:${ '$' }{{ github.sha }}</code></pre>` },
      { title: 'Deployment Strategies', body: () => `
        ${compareTable({ headers: ['Strategy', 'How', 'Risk'], rows: [
          ['Recreate', 'Stop old, start new', 'Downtime. Only for dev.'],
          ['Rolling', 'Replace pods one at a time', 'Low — K8s default'],
          ['Blue/Green', 'Run both versions, switch traffic atomically', 'Easy rollback, 2x resources'],
          ['Canary', 'Send 1% → 5% → 25% → 100% of traffic', 'Safest. Detect issues early.'],
        ] })}
        ${callout('Always have a rollback button. The fastest fix to a bad deploy is reverting to the previous version, not debugging in prod.', 'insight')}
        ${quiz('Why run tests in CI rather than relying on developers running them locally?', '1) Consistency — same env every time. 2) No "works on my machine" excuses. 3) Tests run on EVERY commit, not just when someone remembers. 4) Blocks merge if broken.')}` },
    ],
    keyTerms: ['CI / CD', 'Pipeline stages', 'Artifact', 'Rolling / blue-green / canary', 'Rollback', 'Secret management in CI'],
    sources: ['GitHub Actions docs', 'GitLab CI docs', 'The Phoenix Project (novel about IT)']
  },

  'terraform': {
    track: 'found',
    title: 'Terraform & IaC',
    subtitle: 'Infrastructure as code: declarative, versioned, reviewable',
    duration: '25 min read', difficulty: 'Intermediate',
    sections: [
      { title: 'Why IaC', body: () => `
        <p>Clicking through AWS console works until it doesn't. <strong>"What\'s actually deployed?"</strong> becomes unanswerable. <strong>"How do I replicate prod in staging?"</strong> becomes impossible.</p>
        <p>IaC means infrastructure is defined in code, version-controlled, code-reviewed, and applied via automation. Same discipline as application code.</p>` },
      { title: 'The Terraform Loop', body: () => `
        ${sequenceDiagram({ actors: ['You', 'Terraform', 'State', 'AWS API'], height: 280, messages: [
          { from: 0, to: 1, label: 'terraform plan' },
          { from: 1, to: 2, label: 'read current state' },
          { from: 1, to: 3, label: 'read live infrastructure' },
          { from: 1, to: 0, label: 'show diff: +S3 bucket, ~EC2 size', return: true },
          { from: 0, to: 1, label: 'terraform apply (looks good)' },
          { from: 1, to: 3, label: 'create / update / destroy' },
          { from: 1, to: 2, label: 'update state' },
        ], caption: 'Plan shows diff. Apply makes it real. State tracks ownership.' })}` },
      { title: 'Anatomy of a Config', body: () => `
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 11px;"><code>terraform {
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
  backend "s3" {
    bucket = "my-tf-state"
    key    = "prod/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}

# Variable
variable "instance_size" {
  type    = string
  default = "t3.micro"
}

# Resource
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = var.instance_size
  tags = {
    Name = "web-server"
    Env  = "production"
  }
}

# Output
output "public_ip" {
  value = aws_instance.web.public_ip
}</code></pre>` },
      { title: 'State — The Critical Concept', body: () => `
        <p>Terraform keeps a <code>terraform.tfstate</code> file mapping config to real resources. Without it, Terraform can't tell what it owns vs what existed already.</p>
        <p><strong>Never store state in Git.</strong> Use a remote backend (S3 + DynamoDB lock, Terraform Cloud, or GCS). State contains secrets in plain text.</p>
        ${callout('If your state file is lost or corrupted, you essentially have to import every resource manually or rebuild from scratch. Treat state like the most critical data in your infra — back it up, encrypt it, lock it.', 'warning')}` },
      { title: 'Modules — Reusable Building Blocks', body: () => `
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 11px;"><code># Use a community module
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "my-vpc"
  cidr = "10.0.0.0/16"
  azs  = ["us-east-1a", "us-east-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]
}

# Reference its outputs
resource "aws_instance" "app" {
  subnet_id = module.vpc.private_subnets[0]
  ...
}</code></pre>
        ${quiz('You ran terraform apply, then someone changed the resource in the AWS console. What happens on the next apply?', 'Terraform detects drift — the live state doesn\'t match what it expects. It will revert the console changes to match the config. That\'s why "console changes" are forbidden in IaC shops.')}` },
    ],
    keyTerms: ['Provider', 'Resource', 'State file', 'Backend', 'Module', 'Plan vs Apply', 'Drift'],
    sources: ['Terraform official tutorials (HashiCorp Learn)', 'Terraform Up & Running by Yevgeniy Brikman', 'AWS provider docs']
  },

  'observability': {
    track: 'found',
    title: 'Observability — Logs, Metrics, Traces',
    subtitle: 'Knowing what your system is doing in production',
    duration: '22 min read', difficulty: 'Foundational',
    sections: [
      { title: 'The Three Pillars', body: () => `
        ${compareTable({ headers: ['Pillar', 'What', 'Tool examples'], rows: [
          ['Logs', 'Discrete events, timestamped, often text', 'Loki, ELK, CloudWatch, Splunk'],
          ['Metrics', 'Numbers over time (counters, gauges)', 'Prometheus, Datadog, CloudWatch'],
          ['Traces', 'How a request flowed across services', 'Jaeger, Tempo, Honeycomb, Datadog APM'],
        ] })}
        <p><strong>Logs</strong> answer "what happened?" <strong>Metrics</strong> answer "is anything weird?" <strong>Traces</strong> answer "why is this request slow?"</p>` },
      { title: 'Metrics — The 4 Golden Signals', body: () => `
        <p>Google\'s SRE book identifies four metrics that every service should track:</p>
        <ol>
          <li><strong>Latency</strong> — how long requests take (especially p50, p95, p99)</li>
          <li><strong>Traffic</strong> — how much demand (RPS)</li>
          <li><strong>Errors</strong> — rate of failed requests</li>
          <li><strong>Saturation</strong> — how full the system is (CPU, memory, queue depth)</li>
        </ol>
        ${callout('p99 latency matters more than average. Average hides the bad experience for your worst 1% of users — who are often your most valuable.', 'insight')}` },
      { title: 'Prometheus Metric Types', body: () => `
        ${compareTable({ headers: ['Type', 'Example use', 'Goes up/down?'], rows: [
          ['Counter', 'Requests served, errors raised', 'Only up'],
          ['Gauge', 'Memory used, queue depth, temperature', 'Up and down'],
          ['Histogram', 'Request duration buckets', 'Distribution'],
          ['Summary', 'Like histogram but pre-computed quantiles', 'Distribution'],
        ] })}
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 11px;"><code># PromQL examples
http_requests_total{status="500"}                    # error count
rate(http_requests_total[5m])                        # requests per second
histogram_quantile(0.95, http_request_duration_seconds_bucket)  # p95
sum by (status) (rate(http_requests_total[5m]))     # RPS by status code</code></pre>` },
      { title: 'Structured Logging', body: () => `
        <p>Log lines like <code>"User 12345 failed login"</code> are useless at scale. <strong>Structured logs</strong> (JSON) are queryable:</p>
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 11px;"><code>{
  "timestamp": "2024-05-23T14:30:00Z",
  "level": "error",
  "service": "auth",
  "event": "login_failed",
  "user_id": 12345,
  "reason": "invalid_password",
  "ip": "10.0.0.5",
  "trace_id": "abc-123"
}</code></pre>
        <p>Now you can run <code>SELECT count(*) WHERE event = "login_failed" AND ip = "..."</code> in your log tool.</p>` },
      { title: 'Distributed Tracing', body: () => `
        <p>One user request might hit 8 microservices. Without traces, "why was this slow?" is unanswerable. With traces, you see a waterfall: API gateway 5ms → auth 12ms → user-svc 200ms ← here\'s your problem.</p>
        <p>Implementation: at the entry point, generate a <code>trace_id</code>. Pass it via HTTP headers to every downstream call. Each service logs spans (start/end times) tagged with the trace_id. A trace UI assembles them.</p>
        ${quiz('Your service\'s p99 latency just spiked from 100ms to 500ms. Average barely moved. What does this tell you?', 'A small fraction of requests got dramatically slower. Could be: GC pause, cache miss on hot key, one slow DB query for specific users, slow-loading large records. Average hides this; p99 reveals it. Action: look at traces of slowest requests.')}` },
    ],
    keyTerms: ['Logs / metrics / traces', '4 golden signals', 'p50/p95/p99 latency', 'Counter / gauge / histogram', 'Structured logging', 'trace_id propagation'],
    sources: ['Google SRE Book (free online)', 'Prometheus docs', '"Observability Engineering" by Majors, Fong-Jones, Miranda']
  },

  // ========================================
  // TRACK: MACHINE LEARNING
  // ========================================

  'ml-lifecycle': {
    track: 'ml',
    title: 'The ML Lifecycle',
    subtitle: 'From data to deployed model — the whole arc',
    duration: '20 min read', difficulty: 'Foundational',
    sections: [
      { title: 'The Eight Stages', body: () => `
        ${archDiagram({ height: 220, nodes: [
          { id: 'd', x: 30, y: 50, w: 70, h: 30, label: 'Data' },
          { id: 'f', x: 120, y: 50, w: 70, h: 30, label: 'Features' },
          { id: 'tr', x: 210, y: 50, w: 70, h: 30, label: 'Train' },
          { id: 'ev', x: 300, y: 50, w: 70, h: 30, label: 'Evaluate' },
          { id: 'dep', x: 390, y: 50, w: 70, h: 30, label: 'Deploy', color: '#F5B842' },
          { id: 'mon', x: 480, y: 50, w: 70, h: 30, label: 'Monitor' },
          { id: 'rt', x: 300, y: 150, w: 110, h: 35, label: 'Retrain trigger', color: '#E07856' },
        ], edges: [
          { from: 'd', to: 'f' }, { from: 'f', to: 'tr' }, { from: 'tr', to: 'ev' },
          { from: 'ev', to: 'dep' }, { from: 'dep', to: 'mon' }, { from: 'mon', to: 'rt' },
          { from: 'rt', to: 'tr' },
        ], caption: 'It\'s a loop. Models degrade. Monitoring triggers retraining.' })}` },
      { title: 'Why MLOps Exists', body: () => `
        <p>Traditional software: write code, deploy code, code behavior is deterministic. ML: <strong>write code AND collect data, train model on data, deploy model, model behavior depends on data distribution that shifts over time.</strong></p>
        <p>Three new failure modes traditional DevOps doesn\'t handle:</p>
        <ul>
          <li><strong>Data drift.</strong> Input distribution shifts (new user behaviors, seasonal changes).</li>
          <li><strong>Concept drift.</strong> Relationship between input and label changes (fraud patterns evolve).</li>
          <li><strong>Training/serving skew.</strong> Features computed differently at train vs serve time → silent accuracy loss.</li>
        </ul>
        ${callout('MLOps = DevOps + data versioning + model versioning + drift monitoring. Most of the work isn\'t the model — it\'s the plumbing around it.', 'insight')}` },
      { title: 'Online vs Batch ML', body: () => `
        ${compareTable({ headers: ['Property', 'Batch', 'Online (real-time)'], rows: [
          ['Predictions computed', 'Ahead of time, stored', 'On request'],
          ['Latency tolerated', 'Hours', 'Milliseconds'],
          ['Examples', 'Daily recommendations, churn scores', 'Fraud detection, ad ranking'],
          ['Complexity', 'Lower — just a cron + ETL', 'Higher — feature serving, low-latency inference'],
        ] })}` },
      { title: 'Where DevSecOps Skills Translate', body: () => `
        <p>Your current toolkit maps directly:</p>
        ${compareTable({ headers: ['Your DevOps skill', 'MLOps equivalent'], rows: [
          ['Docker', 'Same — package model + runtime'],
          ['Kubernetes', 'Same — serve model containers'],
          ['CI/CD pipelines', 'Same — but pipelines also retrain'],
          ['Terraform', 'Same — provision GPU clusters'],
          ['Prometheus', 'Same — plus model-specific metrics (drift, latency)'],
          ['Vault', 'Model registry — store and version models'],
        ] })}
        <p>The new skills: training pipelines (Kubeflow, MLflow), feature stores (Feast, Tecton), model serving (TorchServe, BentoML, KServe).</p>
        ${quiz('Why do ML models degrade over time even when the code doesn\'t change?', 'Data drift. The world changes — user demographics shift, products evolve, attack patterns adapt. Model was trained on yesterday\'s distribution; today\'s distribution differs. Accuracy quietly decreases. Monitor or you\'ll find out from your CEO.')}` },
    ],
    keyTerms: ['ML lifecycle', 'Data / concept drift', 'Training/serving skew', 'Batch vs online inference', 'Feature store', 'Model registry'],
    sources: ['"Machine Learning Engineering" by Andriy Burkov', 'Google\'s ML rules', '"Designing ML Systems" by Chip Huyen']
  },

  'features': {
    track: 'ml',
    title: 'Feature Engineering & Feature Stores',
    subtitle: 'Your model is only as good as its features',
    duration: '22 min read', difficulty: 'Foundational',
    sections: [
      { title: 'Features Are The Game', body: () => `
        <p>In classical ML, feature engineering matters more than model choice. A simple logistic regression with great features beats a tuned XGBoost with bad features. Deep learning shifts this somewhat (it learns features from raw input) but for tabular data, hand-crafted features still rule.</p>` },
      { title: 'Common Feature Transformations', body: () => `
        ${compareTable({ headers: ['Type', 'What', 'When'], rows: [
          ['Standardization', '(x - mean) / std', 'Linear models, neural nets'],
          ['Min-max scaling', '(x - min) / (max - min)', 'Bounded inputs needed'],
          ['Log transform', 'log(x + 1)', 'Heavy-tailed distributions (prices, durations)'],
          ['One-hot encoding', 'category → boolean columns', 'Low-cardinality categoricals'],
          ['Target encoding', 'category → mean target', 'High-cardinality categoricals (zip codes)'],
          ['Binning', 'continuous → discrete buckets', 'Capture non-linear effects in linear models'],
        ] })}` },
      { title: 'Time-Based Features', body: () => `
        <p>Almost every dataset has timestamps. Don\'t feed raw datetimes to a model.</p>
        <p>Extract: day-of-week, hour-of-day, is-weekend, is-holiday, day-of-month, week-of-year. For cyclic features (hour, day of week), encode as sin/cos pair so Sunday is close to Monday in feature space.</p>
        <p><strong>Lag features.</strong> "User\'s spend over last 7 days" is a powerful predictor of future spend. Window aggregations over recent history.</p>` },
      { title: 'Feature Store — The Pattern', body: () => `
        <p>Two problems feature stores solve:</p>
        <ol>
          <li><strong>Training/serving skew.</strong> Feature must be computed identically at train time (historical data) and serve time (live request).</li>
          <li><strong>Feature reuse.</strong> "User\'s 30-day spend" useful for fraud, recommendations, churn. Don\'t recompute three times.</li>
        </ol>
        ${archDiagram({ height: 220, nodes: [
          { id: 'src', x: 40, y: 100, w: 90, h: 40, label: 'Raw data', sub: 'events, txns' },
          { id: 'ing', x: 170, y: 100, w: 90, h: 40, label: 'Feature pipeline', color: '#F5B842' },
          { id: 'off', x: 310, y: 50, w: 110, h: 40, label: 'Offline store', sub: 'historical (training)', color: '#8FA876' },
          { id: 'on', x: 310, y: 150, w: 110, h: 40, label: 'Online store', sub: 'real-time (serving)', color: '#7B9FB5' },
          { id: 'tr', x: 460, y: 50, w: 90, h: 40, label: 'Training' },
          { id: 'inf', x: 460, y: 150, w: 90, h: 40, label: 'Inference' },
        ], edges: [
          { from: 'src', to: 'ing' }, { from: 'ing', to: 'off' }, { from: 'ing', to: 'on' },
          { from: 'off', to: 'tr' }, { from: 'on', to: 'inf' },
        ], caption: 'One pipeline, two stores. Offline for training, online for serving.' })}
        <p>Tools: Feast (open-source), Tecton (managed), AWS SageMaker Feature Store, Databricks Feature Store.</p>
        ${quiz('Why is "training/serving skew" so dangerous and so common?', 'You compute "user\'s 7-day avg purchase" in Spark for training, then in Python for serving. Subtle differences (timezone, edge cases) → features don\'t match. Model trained on slightly-wrong values, accuracy degrades. Feature stores prevent this by providing one definition used everywhere.')}` },
    ],
    keyTerms: ['Feature engineering', 'Standardization / scaling', 'One-hot / target encoding', 'Lag features', 'Feature store', 'Online vs offline store', 'Training/serving skew'],
    sources: ['"Feature Engineering for ML" by Alice Zheng', 'Feast docs (feast.dev)', 'Uber\'s Michelangelo paper']
  },

  'training-eval': {
    track: 'ml',
    title: 'Training & Evaluation',
    subtitle: 'How to train models without fooling yourself',
    duration: '25 min read', difficulty: 'Foundational',
    sections: [
      { title: 'The Sacred Train/Val/Test Split', body: () => `
        <p>You must split your data into three sets — never let test data leak into training. The setup:</p>
        ${compareTable({ headers: ['Set', 'Use', 'Typical size'], rows: [
          ['Train', 'Model learns parameters', '70-80%'],
          ['Validation', 'Tune hyperparameters', '10-15%'],
          ['Test', 'Final unbiased accuracy', '10-15%'],
        ] })}
        ${callout('Test set is sacred. Look at it ONCE at the very end. If you keep checking test accuracy and tweaking, you\'re fitting to it — and your "test accuracy" becomes meaningless.', 'warning')}` },
      { title: 'Time-Series Split (Crucial)', body: () => `
        <p>For any data with time, random split is WRONG. You must split chronologically — train on past, validate on future. Otherwise you\'re "predicting" the past from the future, which leaks information that won\'t exist at serving time.</p>
        <p>For fraud detection trained on 2024 data: train on Jan-Sep, validate on Oct, test on Nov-Dec.</p>` },
      { title: 'Overfitting vs Underfitting', body: () => `
        ${compareTable({ headers: ['Symptom', 'Cause', 'Fix'], rows: [
          ['Train acc high, val acc much lower', 'Overfitting', 'More data, regularization, simpler model, dropout, early stopping'],
          ['Train acc and val acc both low', 'Underfitting', 'More complex model, more features, less regularization'],
          ['Both improve together over epochs', 'Healthy', 'Keep training'],
          ['Val acc improving then degrading', 'Overfitting late', 'Early stopping at peak val acc'],
        ] })}` },
      { title: 'Evaluation Metrics by Task', body: () => `
        ${compareTable({ headers: ['Task', 'Default metric', 'When'], rows: [
          ['Binary classification (balanced)', 'Accuracy', 'When classes ~50/50'],
          ['Binary classification (imbalanced)', 'Precision, Recall, F1, AUC-PR', '99% negative, 1% positive (fraud)'],
          ['Multi-class', 'Accuracy, F1 (macro/weighted)', 'Many classes'],
          ['Regression', 'RMSE, MAE, R²', 'Predicting numbers'],
          ['Ranking', 'NDCG, MAP', 'Search, recommendations'],
        ] })}
        ${callout('For imbalanced data, accuracy LIES. A model that always predicts "not fraud" gets 99% accuracy and is useless. Use precision/recall.', 'warning')}` },
      { title: 'Precision vs Recall — The Trade-off', body: () => `
        <p><strong>Precision.</strong> Of the items we flagged, what fraction were correct?</p>
        <p><strong>Recall.</strong> Of all actual positives, what fraction did we catch?</p>
        <p>Tuning the decision threshold trades them off. Lower threshold → catch more positives (high recall, low precision). Higher threshold → only flag confident ones (high precision, low recall).</p>
        ${quiz('Cancer screening: optimize for precision or recall?', 'Recall. Missing a true cancer (false negative) is catastrophic. False positives lead to follow-up tests — annoying but recoverable. Recall = 1 means "we catch every cancer."')}` },
    ],
    keyTerms: ['Train/val/test split', 'Time-series split', 'Overfitting / underfitting', 'Precision / Recall / F1', 'AUC', 'Early stopping', 'Cross-validation'],
    sources: ['"Hands-On ML" by Aurélien Géron', 'scikit-learn user guide', '"Pattern Recognition and ML" by Bishop']
  },

  'deployment': {
    track: 'ml',
    title: 'Model Deployment',
    subtitle: 'Turning trained weights into a production service',
    duration: '22 min read', difficulty: 'Intermediate',
    sections: [
      { title: 'Three Deployment Patterns', body: () => `
        ${compareTable({ headers: ['Pattern', 'How', 'When'], rows: [
          ['Batch', 'Cron job runs predictions on stored data, writes to DB', 'Daily reports, scoring, recommendations refreshed nightly'],
          ['Real-time API', 'HTTP service serves predictions on request', 'Fraud, ad ranking, search, anything user-facing'],
          ['Embedded', 'Model runs on-device (phone, IoT)', 'Privacy-sensitive, offline-capable, low-latency'],
        ] })}` },
      { title: 'Serving Tools', body: () => `
        <ul>
          <li><strong>FastAPI + your code.</strong> Simplest. Fine for low scale.</li>
          <li><strong>TorchServe, TF Serving.</strong> Production model servers from PyTorch/TF teams. Optimized inference, multi-model, batching.</li>
          <li><strong>BentoML, MLflow Serving.</strong> Framework-agnostic, packaging + serving. Common choice.</li>
          <li><strong>KServe (formerly KFServing).</strong> Kubernetes-native, autoscaling, canary deployments.</li>
          <li><strong>SageMaker, Vertex AI.</strong> Managed services. Less ops, more lock-in.</li>
        </ul>` },
      { title: 'Latency Optimization', body: () => `
        <p>Inference is often slower than you\'d hope. Common levers:</p>
        ${compareTable({ headers: ['Technique', 'Speedup', 'Cost'], rows: [
          ['Batching requests', '5-50x throughput', 'Higher latency per request'],
          ['Quantization (FP32 → INT8)', '2-4x', 'Small accuracy loss'],
          ['Distillation (big → small model)', '10x', 'Accuracy loss, training work'],
          ['Caching common predictions', '∞', 'Only works for repeated inputs'],
          ['GPU vs CPU', '5-100x depending on model', '$$$'],
          ['ONNX runtime', '1.5-3x', 'Conversion work'],
        ] })}` },
      { title: 'Deployment Strategies for ML', body: () => `
        <p>Same as application deployment — but with a model-specific twist: <strong>shadow mode.</strong></p>
        <p><strong>Shadow.</strong> New model runs alongside old, predictions logged but not served. You compare predictions, accuracy, latency before any user sees the new model.</p>
        <p><strong>Canary.</strong> 1% → 5% → 25% of traffic to new model. Watch metrics for regressions.</p>
        <p><strong>A/B test.</strong> Random users get new model. Measure business metrics (CTR, conversion), not just accuracy.</p>
        ${callout('A model that\'s 2% more accurate on offline test might LOWER conversion in production. Why? Trained on different distribution, optimized for wrong objective, or accuracy doesn\'t map to user value. Always validate with online metrics.', 'insight')}
        ${quiz('You deploy a fraud detection model. Precision went up but customer complaints about declined cards spiked. What happened?', 'You optimized for precision (when you flag, you\'re right) at the expense of recall. The model is now confident but conservative — true fraud detected is high, but you\'re also missing fraud (false negatives). Wait — increased complaints suggests you\'re also flagging legit transactions more (false positives). Verify with confusion matrix in prod. Maybe the threshold shifted, or training data drifted.')}` },
    ],
    keyTerms: ['Batch vs real-time vs embedded', 'Model servers', 'Quantization', 'Distillation', 'Shadow / canary / A/B', 'GPU inference'],
    sources: ['BentoML docs', 'KServe docs', '"Designing ML Systems" by Chip Huyen Ch 7']
  },

  'monitoring': {
    track: 'ml',
    title: 'Model Monitoring & Drift',
    subtitle: 'The model is deployed. Now what?',
    duration: '22 min read', difficulty: 'Intermediate',
    sections: [
      { title: 'What to Monitor', body: () => `
        <p>Four layers, each catches different failures:</p>
        ${compareTable({ headers: ['Layer', 'Watch for', 'Example metric'], rows: [
          ['Infrastructure', 'Service down, slow', 'Latency p99, error rate, CPU/mem'],
          ['Input data', 'Distribution shift', 'Feature mean/std vs training'],
          ['Predictions', 'Output distribution shift', 'Fraction of positive predictions'],
          ['Outcomes', 'Real accuracy in production', 'F1, conversion rate, click-through'],
        ] })}` },
      { title: 'Data Drift Detection', body: () => `
        <p>Compare current input distribution to training distribution. If they diverge significantly, model accuracy is probably degrading.</p>
        <p><strong>Methods:</strong> KL divergence, PSI (Population Stability Index), Kolmogorov-Smirnov test, simple mean/std comparison.</p>
        <p>Set thresholds — e.g., alert if any feature\'s PSI > 0.2 over the last 24 hours. Investigate when triggered.</p>
        ${callout('Drift detection ≠ accuracy monitoring. Drift might happen without accuracy dropping. Accuracy might drop without drift (concept drift — same inputs, different labels). Monitor both.', 'insight')}` },
      { title: 'The Feedback Loop Problem', body: () => `
        <p>You often don\'t know if a prediction was correct for a long time.</p>
        <ul>
          <li>Fraud detection: ground truth comes in days/weeks via chargebacks</li>
          <li>Recommendations: did user click? buy? in 7 days? 30?</li>
          <li>Medical diagnosis: outcome may take years</li>
        </ul>
        <p>This makes "live accuracy monitoring" hard. Proxies help: prediction confidence trends, agreement with other models, downstream business metrics.</p>` },
      { title: 'Retraining Triggers', body: () => `
        <p>When should you retrain? Three common policies:</p>
        ${compareTable({ headers: ['Trigger', 'Pros', 'Cons'], rows: [
          ['Scheduled (weekly, daily)', 'Predictable, simple', 'Wastes compute if no drift; too slow for fast drift'],
          ['Drift-triggered', 'Retrains exactly when needed', 'Complex setup; may retrain on noisy signal'],
          ['Performance-triggered', 'Driven by real degradation', 'Requires labeled ground truth (slow)'],
          ['Continuous (online learning)', 'Always current', 'Risk of catastrophic forgetting, hard to audit'],
        ] })}
        ${quiz('Your fraud model\'s precision/recall metrics look stable, but complaint volume just spiked. What\'s likely going on?', 'Concept drift. Fraudsters changed tactics. Your model still classifies confidently — but is increasingly wrong on the NEW patterns. The features it trusted no longer correlate with fraud. Metrics look stable because you\'re evaluating on yesterday\'s definition of fraud. Need fresh labels + retrain.')}` },
    ],
    keyTerms: ['Data drift', 'Concept drift', 'PSI / KL divergence', 'Prediction monitoring', 'Outcome monitoring', 'Retraining triggers', 'Feedback delay'],
    sources: ['EvidentlyAI blog and docs', '"Reliable ML" by Cathy Chen et al', 'Google Vertex AI monitoring docs']
  },

  'ab-testing': {
    track: 'ml',
    title: 'A/B Testing for ML',
    subtitle: 'How to know if your new model is actually better',
    duration: '20 min read', difficulty: 'Intermediate',
    sections: [
      { title: 'Why Offline Eval Isn\'t Enough', body: () => `
        <p>You measure new model on test set: AUC up 2%. You deploy. Conversion drops 1%. What?</p>
        <p>Test set was collected under OLD model\'s behavior. New model changes user experience — which changes user behavior — which changes the data. Offline metrics can\'t capture this.</p>
        <p>The only way to know if a model change is good is to <strong>run it in production on real users and measure business metrics.</strong></p>` },
      { title: 'A/B Test Setup', body: () => `
        <p>Random assignment: each user (or session, or request) consistently routed to control (old model) or treatment (new model). Measure the metric you actually care about.</p>
        ${archDiagram({ height: 200, nodes: [
          { id: 'u', x: 50, y: 90, w: 70, h: 30, label: 'User' },
          { id: 'split', x: 170, y: 90, w: 90, h: 40, label: 'Splitter', sub: '50/50 by user_id', color: '#F5B842' },
          { id: 'a', x: 320, y: 50, w: 100, h: 40, label: 'Model A', sub: 'control' },
          { id: 'b', x: 320, y: 130, w: 100, h: 40, label: 'Model B', sub: 'treatment' },
          { id: 'm', x: 460, y: 90, w: 90, h: 40, label: 'Metrics', sub: 'CTR, $$, etc', color: '#8FA876' },
        ], edges: [
          { from: 'u', to: 'split' }, { from: 'split', to: 'a' }, { from: 'split', to: 'b' },
          { from: 'a', to: 'm' }, { from: 'b', to: 'm' },
        ], caption: 'Random split, parallel serving, compare outcomes' })}` },
      { title: 'Statistical Significance', body: () => `
        <p>If you flip a coin 10 times and get 6 heads, is the coin biased? No — small samples are noisy. Same for A/B tests.</p>
        <p>Calculate <strong>sample size</strong> needed BEFORE running. Depends on: baseline conversion rate, minimum detectable effect (smallest difference worth caring about), statistical power (usually 0.8), significance level (usually 0.05).</p>
        ${callout('Don\'t peek and stop early. Deciding "test is done" when you happen to see significance inflates false positive rate. Pre-commit to sample size, then check at end.', 'warning')}` },
      { title: 'Pitfalls', body: () => `
        ${compareTable({ headers: ['Pitfall', 'Fix'], rows: [
          ['Test set used in offline eval is biased by old model', 'Run online A/B test'],
          ['Network effects (treatment users influence control)', 'Cluster randomization (whole regions or social cohorts)'],
          ['Novelty effect (users react to anything new)', 'Run test for at least 1-2 weeks, observe stabilization'],
          ['Metric chosen poorly (engagement up, revenue down)', 'Define primary metric upfront, watch guardrail metrics'],
          ['Multiple tests running simultaneously', 'Account for interactions or run sequentially'],
        ] })}
        ${quiz('Your A/B test shows new model has 1% lift, p-value 0.04. Should you ship it?', 'Maybe — but check: is 1% lift worth the complexity? Was sample size pre-committed? Are guardrail metrics OK? Did you run for at least one full business cycle? Statistical significance ≠ practical significance ≠ shipping decision.')}` },
    ],
    keyTerms: ['Online vs offline metrics', 'Statistical significance', 'Sample size', 'p-value', 'Guardrail metrics', 'Novelty effect', 'Network effects'],
    sources: ['"Trustworthy Online Controlled Experiments" by Kohavi, Tang, Xu', 'Microsoft ExP team blog', 'Statsig and Eppo docs']
  },

  // ========================================
  // TRACK: OPERATING SYSTEMS
  // ========================================

  'processes-threads': {
    track: 'os',
    title: 'Processes vs Threads',
    subtitle: 'The two units of execution, and when to use each',
    duration: '22 min read', difficulty: 'Foundational',
    sections: [
      { title: 'The Difference', body: () => `
        ${compareTable({ headers: ['Property', 'Process', 'Thread'], rows: [
          ['Memory', 'Own address space', 'Shared with siblings'],
          ['Communication', 'IPC (pipes, sockets, shm)', 'Direct (shared memory)'],
          ['Creation cost', 'Heavy (~ms)', 'Light (~μs)'],
          ['Crash isolation', 'One process crash doesn\'t affect others', 'One thread crash kills the whole process'],
          ['Use when', 'Strong isolation, security boundaries', 'Lightweight parallelism, shared state'],
        ] })}
        ${archDiagram({ height: 200, nodes: [
          { id: 'p1', x: 60, y: 60, w: 120, h: 110, label: 'Process A', sub: 'isolated' },
          { id: 't1', x: 80, y: 100, w: 80, h: 25, label: 'Thread 1' },
          { id: 't2', x: 80, y: 130, w: 80, h: 25, label: 'Thread 2' },
          { id: 'p2', x: 220, y: 60, w: 120, h: 110, label: 'Process B', sub: 'isolated' },
        ], edges: [], caption: 'Processes are isolated; threads inside a process share memory' })}` },
      { title: 'Why Threads Are Hard', body: () => `
        <p>Shared memory means race conditions. Two threads incrementing the same counter can lose updates because <code>counter++</code> is actually <em>load, increment, store</em> — interleaving causes lost updates.</p>
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code>// Thread A         | Thread B
load counter (=5) |
                  | load counter (=5)
increment (=6)    |
                  | increment (=6)
store counter (=6)|
                  | store counter (=6)

// Final value: 6, should be 7. ONE INCREMENT LOST.</code></pre>
        <p>Fix: synchronization (mutex, atomic operations). Adding sync introduces deadlock risk, bottlenecks, and complexity.</p>` },
      { title: 'Python\'s GIL', body: () => `
        <p>CPython has a Global Interpreter Lock. Only one thread executes Python bytecode at a time. So Python threads <strong>don\'t give you CPU parallelism</strong>.</p>
        <p>They DO give you I/O concurrency — while one thread waits on a network read, another can run. Useful for I/O-bound work.</p>
        <p>For CPU-bound work, use <code>multiprocessing</code> (separate processes, no GIL) or call into C extensions (NumPy, etc.) that release the GIL.</p>` },
      { title: 'Common Scaling Patterns', body: () => `
        ${compareTable({ headers: ['Workload', 'Best fit'], rows: [
          ['CPU-bound (math, image processing)', 'Process pool (multiprocessing) or compiled C/Rust'],
          ['I/O-bound (web requests, DB calls)', 'Threads or async (asyncio, Node, Go)'],
          ['Mixed', 'Async I/O + process pool for CPU spikes'],
          ['Massive concurrency (10K+ connections)', 'Async (event loop) or Go (goroutines)'],
        ] })}
        ${quiz('Your Python web server handles 100 RPS fine. You add a CPU-heavy ML inference call per request. Now it crawls. Why?', 'GIL. Even with threads, ML inference holds the GIL, blocking other threads. Fix: process pool for inference, or offload to a separate service, or use a model server (TorchServe) that handles parallelism internally.')}` },
    ],
    keyTerms: ['Process vs thread', 'Address space', 'Race condition', 'GIL', 'CPU-bound vs I/O-bound', 'fork vs exec'],
    sources: ['"Operating Systems: Three Easy Pieces" (free online)', 'Real Python on concurrency', 'Python multiprocessing docs']
  },

  'concurrency': {
    track: 'os',
    title: 'Concurrency Primitives',
    subtitle: 'Mutex, semaphore, condition variable — the synchronization toolkit',
    duration: '25 min read', difficulty: 'Intermediate',
    sections: [
      { title: 'Mutex (Mutual Exclusion)', body: () => `
        <p>The basic lock. Only one thread can hold it at a time. Protect critical sections — code that touches shared state.</p>
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code>lock = threading.Lock()

def safe_increment():
    with lock:        # acquire on enter, release on exit
        counter[0] += 1</code></pre>
        ${callout('Always use "with lock:" (Python) or RAII guards (C++). Manual lock/unlock leads to bugs where an exception path skips unlock and deadlocks everything.', 'warning')}` },
      { title: 'Read/Write Lock', body: () => `
        <p>Many readers OK simultaneously. Writers exclusive. Used when reads vastly outnumber writes.</p>
        <p>Example: cache that\'s read 10,000 times per write. RWLock lets reads parallelize, writes serialize.</p>` },
      { title: 'Semaphore', body: () => `
        <p>Counter-based lock. Allows up to N concurrent holders. Used for limiting concurrent access to a resource.</p>
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># Limit to 10 concurrent DB connections
db_pool = threading.Semaphore(10)

def query(sql):
    with db_pool:        # waits if 10 already in flight
        return db.execute(sql)</code></pre>` },
      { title: 'Condition Variable', body: () => `
        <p>Wait for a condition to become true, signaled by another thread.</p>
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># Producer / consumer
buffer = []
cv = threading.Condition()

def producer():
    while True:
        item = make_item()
        with cv:
            buffer.append(item)
            cv.notify()           # wake up a consumer

def consumer():
    while True:
        with cv:
            while not buffer:
                cv.wait()         # release lock, wait, reacquire
            item = buffer.pop()
        process(item)</code></pre>
        <p>This is the classic producer/consumer pattern. Higher-level abstractions like <code>queue.Queue</code> in Python wrap this for you.</p>` },
      { title: 'Deadlock — The Boogeyman', body: () => `
        <p>Thread A holds lock 1, wants lock 2. Thread B holds lock 2, wants lock 1. Neither moves. Forever.</p>
        <p>Four conditions for deadlock (Coffman conditions): mutual exclusion, hold and wait, no preemption, circular wait. Break any one and deadlock is impossible.</p>
        <p>Practical rules:</p>
        <ul>
          <li>Always acquire multiple locks in a consistent order across threads</li>
          <li>Use lock timeouts where possible</li>
          <li>Prefer lock-free structures (atomic operations, immutable data, channels)</li>
        </ul>
        ${quiz('What\'s the difference between deadlock and livelock?', 'Deadlock: threads frozen waiting on each other. Livelock: threads active but making no progress (e.g., two threads politely yielding back and forth, never executing). Both are bad. Livelock harder to spot — CPU usage looks normal.')}` },
    ],
    keyTerms: ['Mutex', 'Semaphore', 'Read/Write lock', 'Condition variable', 'Critical section', 'Deadlock', 'Coffman conditions'],
    sources: ['"OS Three Easy Pieces" concurrency section', '"Java Concurrency in Practice" by Brian Goetz (concepts universal)', 'Python threading docs']
  },

  'memory': {
    track: 'os',
    title: 'Memory — Stack, Heap, GC',
    subtitle: 'Where your variables actually live',
    duration: '22 min read', difficulty: 'Foundational',
    sections: [
      { title: 'Stack vs Heap', body: () => `
        ${compareTable({ headers: ['Property', 'Stack', 'Heap'], rows: [
          ['Allocation', 'Automatic (function call)', 'Manual (malloc / new)'],
          ['Deallocation', 'Automatic (function return)', 'Manual (free) or GC'],
          ['Speed', 'Very fast (pointer increment)', 'Slower (find free block)'],
          ['Size', 'Small (~MB per thread)', 'Large (limited by RAM)'],
          ['Lifetime', 'Scoped to function', 'As long as referenced'],
          ['Holds', 'Local primitives, function frames', 'Objects, dynamic data structures'],
        ] })}
        ${archDiagram({ height: 200, nodes: [
          { id: 's', x: 80, y: 50, w: 120, h: 130, label: 'Stack', sub: 'grows down ↓', color: '#7B9FB5' },
          { id: 'h', x: 280, y: 50, w: 120, h: 130, label: 'Heap', sub: 'grows up ↑', color: '#F5B842' },
        ], edges: [], caption: 'Stack and heap grow toward each other in process memory' })}` },
      { title: 'Garbage Collection', body: () => `
        <p>Languages like Python, Java, Go free heap memory automatically by tracking object references. Three common strategies:</p>
        ${compareTable({ headers: ['Algorithm', 'How', 'Where used'], rows: [
          ['Reference counting', 'Each object tracks count of refs; free at 0', 'Python (primary), Swift'],
          ['Mark-and-sweep', 'Walk from roots, mark reachable, sweep unmarked', 'Java HotSpot, V8'],
          ['Generational', 'Young objects die fast; collect young gen frequently, old gen rarely', 'Java, V8, .NET'],
        ] })}
        <p>Reference counting handles cycles poorly (Python uses a cycle detector for that). Mark-and-sweep handles cycles but pauses execution. Generational exploits the empirical observation that most objects die young.</p>` },
      { title: 'Memory Leaks Despite GC', body: () => `
        <p>GC doesn\'t prevent leaks — it prevents <em>unreachable</em> garbage from accumulating. If your code keeps a reference to something it no longer needs, GC can\'t help.</p>
        <ul>
          <li>Caches that grow unbounded</li>
          <li>Event listeners not removed</li>
          <li>Global lists you keep appending to</li>
          <li>Closures capturing large variables</li>
        </ul>
        ${callout('In Node and Java, set max heap size and configure restarts on OOM. Leaks happen; survive them with auto-restart in K8s.', 'insight')}` },
      { title: 'Manual Memory — When You Care', body: () => `
        <p>C, C++, Rust force you to manage memory explicitly. Two paths:</p>
        <p><strong>C/C++.</strong> malloc/new + free/delete. Manual, error-prone, fast. Leaks if you forget free. Use-after-free if you free then access.</p>
        <p><strong>Rust.</strong> Ownership model. Compiler tracks who owns each piece of memory. Frees automatically when owner goes out of scope. No leaks, no use-after-free, no GC pauses.</p>
        ${quiz('Why is GC pause time often a problem for low-latency services?', 'Stop-the-world GC pauses can be 100ms+ on large heaps. For p99 latency targets of, say, 10ms, a single GC pause blows past it. Solutions: low-pause GCs (G1, ZGC, Shenandoah in Java), GC-free languages (Rust, C++), heap tuning to minimize allocation rate.')}` },
    ],
    keyTerms: ['Stack vs heap', 'Allocation / free', 'Garbage collection', 'Reference counting', 'Mark and sweep', 'Generational GC', 'Memory leak', 'Use-after-free'],
    sources: ['"OS Three Easy Pieces" memory chapters', '"What Every Programmer Should Know About Memory" by Ulrich Drepper', 'Java Performance by Scott Oaks']
  },

  'virtual-memory': {
    track: 'os',
    title: 'Virtual Memory & Paging',
    subtitle: 'Why your 8GB laptop runs programs as if it had 128GB',
    duration: '22 min read', difficulty: 'Intermediate',
    sections: [
      { title: 'The Illusion', body: () => `
        <p>Each process gets its own private address space — typically 256TB on 64-bit systems. Way more than physical RAM. How?</p>
        <p><strong>Virtual memory.</strong> The OS maps virtual addresses (what your program sees) to physical addresses (actual RAM). The mapping is managed in <strong>pages</strong> — typically 4KB chunks.</p>
        ${archDiagram({ height: 200, nodes: [
          { id: 'v', x: 50, y: 80, w: 120, h: 40, label: 'Virtual address', sub: '0x...8000' },
          { id: 'pt', x: 220, y: 80, w: 120, h: 40, label: 'Page Table', sub: 'translation', color: '#F5B842' },
          { id: 'p', x: 390, y: 80, w: 120, h: 40, label: 'Physical RAM', sub: 'frame 0x42', color: '#8FA876' },
        ], edges: [
          { from: 'v', to: 'pt' }, { from: 'pt', to: 'p' },
        ], caption: 'Every memory access goes through the page table' })}` },
      { title: 'Paging & Swap', body: () => `
        <p>When RAM fills up, the OS moves least-recently-used pages to disk (swap). When the program accesses one of these "swapped out" pages, the CPU raises a <strong>page fault</strong>. The OS reads the page back from disk into RAM (evicting something else).</p>
        <p>This is why your laptop slows to a crawl when low on RAM — every access becomes a disk read. Disk is ~100,000x slower than RAM.</p>` },
      { title: 'TLB — The Cache Behind The Scenes', body: () => `
        <p>Page table lookups are themselves memory accesses, which would themselves need page table lookups, recursively. Solution: the <strong>Translation Lookaside Buffer (TLB)</strong> — a tiny CPU cache of recent virtual-to-physical mappings.</p>
        <p>TLB hit: ~1 cycle. TLB miss: hundreds of cycles. Process context switches flush the TLB — one reason context switches are expensive.</p>` },
      { title: 'Memory-Mapped Files (mmap)', body: () => `
        <p>You can map a file directly into virtual address space. Now reading byte offset X in the file is the same as reading address (base + X). The OS handles loading pages from disk on demand.</p>
        <p>Used for: shared memory between processes, fast random access to large files (databases love this), zero-copy file serving.</p>
        ${callout('Reading a 10GB file: read() copies into your buffer, then your code copies to its struct. mmap maps directly — zero copies. SQLite, LevelDB, RocksDB use mmap for this reason.', 'insight')}` },
      { title: 'OOM Killer', body: () => `
        <p>When Linux runs out of memory AND swap, the OOM killer picks a process to kill based on a heuristic score (memory usage + flags). Kernel kills it, frees memory, system survives.</p>
        <p>This is why your container suddenly disappears with no logs. Check <code>dmesg</code> for "Out of memory: Killed process". In K8s, OOMKilled appears in pod events.</p>
        ${quiz('Your service\'s memory grows steadily over hours, then gets OOMKilled. GC isn\'t freeing it. What\'s the diagnostic flow?', '1) Confirm with metrics (memory_used over time). 2) Heap dump while running (jmap for Java, py-spy for Python). 3) Analyze for retained objects — usually unbounded cache, list, or queue. 4) Fix root cause (bounded cache, LRU eviction). 5) Set K8s resource limit + restart policy as safety net.')}` },
    ],
    keyTerms: ['Virtual memory', 'Page', 'Page table', 'Page fault', 'Swap', 'TLB', 'mmap', 'OOM killer'],
    sources: ['"OS Three Easy Pieces" virtual memory chapters', 'Linux kernel docs', 'Brendan Gregg memory analysis posts']
  },

  'file-systems': {
    track: 'os',
    title: 'File Systems',
    subtitle: 'How bytes on disk become files, directories, and durability',
    duration: '20 min read', difficulty: 'Foundational',
    sections: [
      { title: 'The Abstraction Layers', body: () => `
        ${compareTable({ headers: ['Layer', 'What', 'Example'], rows: [
          ['File API', 'open/read/write/close', 'POSIX system calls'],
          ['Virtual FS (VFS)', 'Unified interface over many FS types', 'Linux VFS layer'],
          ['File system', 'On-disk layout: inodes, blocks, journals', 'ext4, xfs, zfs, btrfs'],
          ['Block layer', 'I/O scheduling, caching, queues', 'Linux block layer'],
          ['Device driver', 'Talks to specific hardware', 'NVMe driver, SATA driver'],
        ] })}` },
      { title: 'Inodes — Files Without Names', body: () => `
        <p>A file is really an <strong>inode</strong>: metadata (size, permissions, timestamps, owner) + pointers to data blocks. The name is just a directory entry pointing to the inode.</p>
        <p>This is why <strong>hardlinks</strong> exist — multiple names for the same inode. Same file, two names. Delete one, file remains (inode kept until link count = 0).</p>
        <p><strong>Symlinks</strong> are different: a tiny file containing a path. Following a symlink resolves to whatever path points to (might be missing).</p>` },
      { title: 'Durability — fsync is Real', body: () => `
        <p>When you <code>write()</code>, data goes to the OS buffer cache, not disk. Power loss before flush = data gone.</p>
        <p><code>fsync(fd)</code> forces the data and metadata to actually hit disk. Slow (milliseconds) but durable.</p>
        <p>Databases call fsync after every commit. That\'s why transaction throughput is limited by disk fsync latency — and why putting WAL on a fast SSD matters.</p>
        ${callout('Cloud disks may lie about fsync. AWS EBS, GCP PD, and Azure Disks all confirm writes before they\'re fully durable on the persistent layer. For paranoid use cases, replicate.', 'warning')}` },
      { title: 'Journaling', body: () => `
        <p>What happens if power fails mid-write? Without protection: filesystem can be corrupted (block written but inode not updated, or vice versa).</p>
        <p><strong>Journaling.</strong> Filesystem writes intended changes to a journal first, then applies them to the actual structures. On crash, replay journal to get to a consistent state. ext4, NTFS, xfs all journal.</p>` },
      { title: 'Caching & The Page Cache', body: () => `
        <p>Linux aggressively caches file data in unused RAM. <code>htop</code> shows "buff/cache" — this is the page cache.</p>
        <p>Reading a recently-read file = cache hit, no disk I/O. Writing is buffered; flush happens later (or on fsync).</p>
        <p>This is why benchmarking IO with "first run" gives wildly different numbers than "second run" — and why "free" Linux memory is misleading. The kernel will release page cache instantly if processes need RAM.</p>
        ${quiz('Your service writes records to a file, calls write() not fsync(). Power outage. What did you lose?', 'Up to seconds of writes. Linux flushes dirty pages every ~5s by default (vm.dirty_writeback_centisecs). On crash, anything in buffer cache but not yet flushed is gone. Fix: call fsync() after critical writes, accept the latency hit.')}` },
    ],
    keyTerms: ['Inode', 'Hardlink / symlink', 'Block', 'fsync', 'Journal', 'Page cache', 'POSIX file API'],
    sources: ['"OS Three Easy Pieces" file system chapters', 'ext4 wiki', 'Bryan Cantrill talks on file systems']
  },

  // ========================================
  // TRACK: DISTRIBUTED SYSTEMS THEORY
  // ========================================

  'time-clocks': {
    track: 'dist',
    title: 'Time & Clocks',
    subtitle: 'Why "what happened first" is hard in distributed systems',
    duration: '22 min read', difficulty: 'Intermediate',
    sections: [
      { title: 'The Problem', body: () => `
        <p>One computer: time is easy. Two computers in different datacenters: their clocks differ by milliseconds, sometimes seconds. Wall-clock timestamps are not a reliable ordering of events across machines.</p>
        <p><strong>Worse:</strong> NTP can move time backwards. If you log "event A at 10:00:05" and "event B at 10:00:03" you can\'t conclude B happened first.</p>` },
      { title: 'Lamport Clocks', body: () => `
        <p>Leslie Lamport\'s insight: we don\'t need real time. We need <strong>logical time</strong> — an ordering that respects causality.</p>
        <p>Each process keeps an integer counter. Rules:</p>
        <ol>
          <li>On any local event, increment counter</li>
          <li>On send, attach counter to message</li>
          <li>On receive, counter = max(local, received) + 1</li>
        </ol>
        <p>Result: if event A caused B, then A\'s timestamp < B\'s timestamp. (Inverse not guaranteed — two unrelated events can have any order.)</p>` },
      { title: 'Vector Clocks', body: () => `
        <p>Lamport tells you "A → B" implies "ts(A) < ts(B)". <strong>Vector clocks</strong> tell you exact causal relationships.</p>
        <p>Each process holds a vector [count from each process]. On send, increment own, send vector. On receive, take elementwise max + increment own.</p>
        <p>Compare two vector clocks V1 and V2:</p>
        <ul>
          <li>V1 ≤ V2 everywhere → V1 happened before V2</li>
          <li>V1 ≥ V2 everywhere → V2 happened before V1</li>
          <li>Neither → events are concurrent (no causal relationship)</li>
        </ul>
        ${callout('Vector clocks underpin Dynamo-style databases. Multiple concurrent writes to same key produce multiple "vector clock siblings" — system can\'t auto-merge, returns all to client.', 'info')}` },
      { title: 'Real-World Time: TrueTime', body: () => `
        <p>Google\'s Spanner solves "what really happened first" using <strong>TrueTime</strong> — APIs that return time with explicit uncertainty bounds.</p>
        <p>Implementation: GPS + atomic clocks in every datacenter. API returns "TT.now() = [earliest, latest]". To order events globally, wait out the uncertainty interval. Costs latency but enables externally-consistent transactions.</p>
        ${quiz('Why don\'t we just sync clocks with NTP and use timestamps?', 'NTP can be off by tens of ms even on good days, more under load. Timestamps can go BACKWARDS. Two events at different machines with "different" NTP-synced timestamps might have happened in either order. For ordering, use logical clocks. For real time with bounded error, use TrueTime-style systems.')}` },
    ],
    keyTerms: ['Wall clock', 'NTP', 'Logical clock', 'Lamport clock', 'Vector clock', 'Causal order', 'Concurrent events', 'TrueTime'],
    sources: ['Leslie Lamport "Time, Clocks, and the Ordering of Events" (1978)', 'Designing Data-Intensive Applications Ch 8-9', 'Spanner paper']
  },

  'consensus': {
    track: 'dist',
    title: 'Consensus — Paxos & Raft',
    subtitle: 'How distributed systems agree on anything',
    duration: '25 min read', difficulty: 'Advanced',
    sections: [
      { title: 'The Problem', body: () => `
        <p>N machines need to agree on a single value (next leader, transaction order, config update). Network can drop messages. Machines can crash and restart. How do you get them to all decide the same thing?</p>
        <p>This is the <strong>consensus problem</strong>. It\'s one of the foundational problems in distributed systems. Solutions are infamously difficult to implement correctly.</p>
        ${callout('FLP impossibility: in an async network with at least one crash, no algorithm can guarantee both safety AND liveness. Real systems work around it by assuming the network is "usually" responsive.', 'info')}` },
      { title: 'Paxos — The Original', body: () => `
        <p>Leslie Lamport, 1989. Mathematically beautiful. Famously incomprehensible from the original paper. Used in production by Google\'s Chubby, Spanner, etc.</p>
        <p>High level: two phases per decision. Prepare (proposer asks acceptors to promise). Accept (proposer sends value, acceptors accept if their promise hasn\'t been superseded). A value is "chosen" when a majority accepts it.</p>
        <p>Why it works: any future proposer learns of chosen values through the promise mechanism. Any two majorities overlap, so chosen values can\'t be lost.</p>` },
      { title: 'Raft — The Understandable One', body: () => `
        <p>Diego Ongaro and John Ousterhout, 2014. Explicit design goal: be understandable. Same guarantees as Paxos. Used by etcd, Consul, TiKV, CockroachDB.</p>
        <p>Three pieces:</p>
        <p><strong>Leader election.</strong> One leader at a time. If leader dies, followers timeout and start election. Highest-ranked candidate (by log up-to-date-ness) wins.</p>
        <p><strong>Log replication.</strong> Clients send commands to leader. Leader appends to its log, replicates to followers. Once a majority has it, leader commits and tells followers.</p>
        <p><strong>Safety.</strong> Strict rules about what can be elected and what can be committed prevent the cluster from forgetting decisions.</p>
        ${sequenceDiagram({ actors: ['Client', 'Leader', 'Follower 1', 'Follower 2'], height: 280, messages: [
          { from: 0, to: 1, label: 'SET x=5' },
          { from: 1, to: 2, label: 'AppendEntries(x=5)' },
          { from: 1, to: 3, label: 'AppendEntries(x=5)' },
          { from: 2, to: 1, label: 'ACK', return: true },
          { from: 3, to: 1, label: 'ACK', return: true },
          { from: 1, to: 0, label: 'OK (committed)', return: true },
        ], caption: 'Raft commit: leader writes locally, replicates, waits for majority, acks client' })}` },
      { title: 'When You\'ll Touch This', body: () => `
        <p>You almost certainly will not implement Raft. You WILL configure systems that use it:</p>
        <ul>
          <li>etcd cluster for K8s — must have odd number of nodes (3, 5, 7) to form quorum</li>
          <li>Kafka with KRaft — Zookeeper-free Kafka uses Raft for metadata</li>
          <li>CockroachDB / TiKV — Raft per shard</li>
          <li>Consul — Raft for service discovery state</li>
        </ul>
        <p>Operationally, the things to know: needs odd node count (majority), tolerates floor((N-1)/2) failures, leader is bottleneck for writes, performance suffers if network is flaky.</p>
        ${quiz('Your 3-node etcd cluster has 1 node down. K8s still works fine. You take a second down for maintenance. K8s freezes. Why?', '3 nodes can tolerate 1 failure (majority = 2). With 2 down, only 1 left, can\'t form majority. Raft refuses to commit anything. K8s API server depends on etcd writes for any state change. Always run odd # of nodes and never take multiple down simultaneously.')}` },
    ],
    keyTerms: ['Consensus', 'Paxos', 'Raft', 'Leader election', 'Log replication', 'Quorum / majority', 'FLP impossibility', 'Split-brain'],
    sources: ['Raft paper (raft.github.io)', 'Diego Ongaro\'s Raft talk on YouTube', 'Designing Data-Intensive Applications Ch 9']
  },

  'consistency-models': {
    track: 'dist',
    title: 'Consistency Models',
    subtitle: 'Strong, eventual, causal, and the spectrum between',
    duration: '22 min read', difficulty: 'Advanced',
    sections: [
      { title: 'The Spectrum', body: () => `
        <p>"Consistency" is not one thing. It\'s a spectrum from strong (single-machine illusion) to weak (basically anything goes). Stronger models are easier to reason about but more expensive. Weaker models scale better but require more care.</p>
        ${compareTable({ headers: ['Model', 'Guarantee', 'Cost'], rows: [
          ['Linearizable', 'Reads see latest write, globally', 'High — coordination per op'],
          ['Sequential', 'All operations in same order across nodes', 'Lower than linearizable'],
          ['Causal', 'Causally-related ops in order; concurrent ops can differ', 'Cheaper'],
          ['Eventual', 'Eventually all replicas converge', 'Cheapest'],
        ] })}` },
      { title: 'Linearizable — The Gold Standard', body: () => `
        <p>System behaves as if there\'s a single copy, and every operation happens atomically at some point between its start and finish. Once a write commits, ALL subsequent reads see it.</p>
        <p>This is what you want for: bank balances, inventory, leader election, unique IDs.</p>
        <p>Costs: cross-region writes need consensus, latency = network round-trip × 2+, throughput limited by leader.</p>` },
      { title: 'Eventual Consistency', body: () => `
        <p>Given no new writes, all replicas eventually return the same value. No bound on "eventually" — could be 100ms, could be 10 minutes during a network partition.</p>
        <p>OK for: like counts, view counts, recommendations, search indexes.</p>
        <p>NOT OK for: inventory ("we have 5 widgets" sold to two customers), authentication tokens, monetary balances.</p>
        ${callout('Eventual consistency is fine for human-facing reads where slight staleness is invisible. It\'s catastrophic for read-your-own-writes UX. "I just posted, where\'s my post?" "I just enabled feature, why isn\'t it on?"', 'warning')}` },
      { title: 'Read-Your-Own-Writes', body: () => `
        <p>A weaker-than-linearizable but stronger-than-eventual model: after you write, YOUR subsequent reads see it. Other users might see stale data briefly.</p>
        <p>Implementations:</p>
        <ul>
          <li>Pin user to primary for N seconds after write</li>
          <li>Pass a "version vector" in cookie; route reads to nodes with that version</li>
          <li>Cache writes client-side, merge with reads</li>
        </ul>` },
      { title: 'Choosing', body: () => `
        ${compareTable({ headers: ['Use case', 'Model'], rows: [
          ['Auth tokens, sessions', 'Linearizable or read-your-writes'],
          ['User profile (you edit yours)', 'Read-your-writes'],
          ['Comments on a post', 'Eventual + read-your-writes for author'],
          ['Real-time chat', 'Causal (cause/reply order matters)'],
          ['Analytics, metrics', 'Eventual'],
          ['Banking', 'Linearizable, with consensus'],
        ] })}
        ${quiz('Your social app shows "5 likes" everywhere on page load. User likes the post, count stays at 5 briefly, then updates to 6. What consistency level is this and is it OK?', 'Eventual consistency on the like count, optimized for read throughput (likely cached). UX could be improved by showing the user\'s OWN like immediately (optimistic UI) while async-confirming with backend (read-your-writes for the user). Other users\' counts can still be eventually consistent — they don\'t notice the lag.')}` },
    ],
    keyTerms: ['Linearizability', 'Sequential consistency', 'Causal consistency', 'Eventual consistency', 'Read-your-writes', 'Monotonic reads', 'Quorum reads/writes'],
    sources: ['Designing Data-Intensive Applications Ch 9', 'Jepsen.io consistency reports', '"Consistency Models" by Adya, Liskov, O\'Neil']
  },

  'distributed-txns': {
    track: 'dist',
    title: 'Distributed Transactions',
    subtitle: '2PC, sagas, and why "ACID across services" is hard',
    duration: '25 min read', difficulty: 'Advanced',
    sections: [
      { title: 'The Problem', body: () => `
        <p>Inside one database, transactions are easy — the DB engine handles ACID. Across multiple services or databases, you have to coordinate yourself. Three approaches: 2PC, sagas, and "don\'t."</p>` },
      { title: 'Two-Phase Commit (2PC)', body: () => `
        <p>Strong consistency across services. Coordinator asks each participant "can you commit?", waits for all YES, then tells everyone "commit." Any NO → tell everyone "abort."</p>
        ${sequenceDiagram({ actors: ['Coordinator', 'Service A', 'Service B'], height: 280, messages: [
          { from: 0, to: 1, label: 'Phase 1: prepare?' },
          { from: 0, to: 2, label: 'Phase 1: prepare?' },
          { from: 1, to: 0, label: 'YES', return: true },
          { from: 2, to: 0, label: 'YES', return: true },
          { from: 0, to: 1, label: 'Phase 2: commit' },
          { from: 0, to: 2, label: 'Phase 2: commit' },
        ], caption: '2PC: prepare phase ensures all can commit before committing' })}
        <p><strong>The killer flaw:</strong> if coordinator dies between phase 1 and 2, participants are stuck. They\'ve voted YES (so they can\'t abort) but haven\'t been told to commit. They hold locks indefinitely.</p>
        <p>This is why 2PC is rarely used in modern systems. Latency is bad, failure modes are scary.</p>` },
      { title: 'Sagas — The Modern Answer', body: () => `
        <p>Break the distributed transaction into a sequence of local transactions, each with a <strong>compensating action</strong> that undoes it. If any step fails, run the compensations of completed steps.</p>
        <p>Example: book trip = (reserve flight, reserve hotel, charge card). If charge fails, run cancel-hotel and cancel-flight.</p>
        ${archDiagram({ height: 200, nodes: [
          { id: 'f', x: 50, y: 100, w: 90, h: 40, label: 'Reserve flight', color: '#8FA876' },
          { id: 'h', x: 180, y: 100, w: 90, h: 40, label: 'Reserve hotel', color: '#8FA876' },
          { id: 'c', x: 310, y: 100, w: 90, h: 40, label: 'Charge card', color: '#E07856' },
          { id: 'ch', x: 180, y: 50, w: 90, h: 30, label: 'Cancel hotel' },
          { id: 'cf', x: 50, y: 50, w: 90, h: 30, label: 'Cancel flight' },
        ], edges: [
          { from: 'f', to: 'h' }, { from: 'h', to: 'c' },
          { from: 'c', to: 'ch', label: 'on fail' }, { from: 'ch', to: 'cf' },
        ], caption: 'Saga: forward path commits step-by-step; failure triggers compensation chain' })}
        <p>No global locks. Each local transaction commits immediately. Trade-off: temporary inconsistency is visible (briefly, the hotel is booked but the flight isn\'t paid for).</p>` },
      { title: 'Outbox Pattern — Reliable Async', body: () => `
        <p>How do you reliably publish events when you update a DB? "Update DB, then publish message" can fail between the two steps — DB updated but event lost.</p>
        <p><strong>Outbox.</strong> In the same DB transaction, write the message to an "outbox" table. A separate process polls the outbox and publishes. If publish fails, retry until success. Idempotent consumers handle duplicates.</p>
        <p>Used everywhere modern microservices need reliable event publishing. CDC (Change Data Capture) tools like Debezium implement this pattern.</p>` },
      { title: 'When You Can Avoid All This', body: () => `
        <p>The honest truth: distributed transactions are painful, so well-designed systems avoid them. Strategies:</p>
        <ul>
          <li>Co-locate related data in one DB so local transactions cover the work</li>
          <li>Make operations idempotent and eventually-consistent</li>
          <li>Design around the failure mode — accept temporary inconsistency for non-critical operations</li>
        </ul>
        ${quiz('Why do banks tolerate "pending" transactions visible for hours rather than using 2PC for instant consistency?', 'Reliability over consistency. 2PC would make the system fragile — any coordinator failure freezes funds. Instead: locally commit "pending" status, async settle later, reconcile end-of-day. Customers see "pending" UX that\'s well-understood. Banks have been doing this since long before computers.')}` },
    ],
    keyTerms: ['2PC (two-phase commit)', 'Saga', 'Compensating action', 'Outbox pattern', 'CDC (Change Data Capture)', 'Idempotency', 'Distributed lock'],
    sources: ['"Designing Data-Intensive Applications" Ch 9', 'Chris Richardson\'s microservices.io patterns', 'Pat Helland "Life Beyond Distributed Transactions" paper']
  },

  // ========================================
  // TRACK: INTERVIEW PREP
  // ========================================

  'star-framework': {
    track: 'int',
    title: 'STAR Framework for Behavioral',
    subtitle: 'How to tell your stories so they actually land',
    duration: '15 min read', difficulty: 'Foundational',
    sections: [
      { title: 'Why Structure Matters', body: () => `
        <p>Behavioral questions test pattern matching: have you done this kind of thing before? Interviewers grade on specifics, not adjectives. "I led a project" tells them nothing. "I led a project where I migrated 30 microservices from VMs to Kubernetes over 4 months, reducing deploy time from 45 min to 6 min" tells them everything.</p>
        <p>STAR is just a recipe to force specifics.</p>` },
      { title: 'The Recipe', body: () => `
        ${compareTable({ headers: ['Letter', 'What you say', 'Time'], rows: [
          ['S - Situation', 'Brief context: company, team, what was happening', '15 sec'],
          ['T - Task', 'What you specifically owned', '15 sec'],
          ['A - Action', 'What YOU did (not "we") — be specific', '60-90 sec'],
          ['R - Result', 'Quantified outcome + lesson', '30 sec'],
        ] })}
        ${callout('Spend the most time on Action. Interviewers want to know what YOU did, not what the team did. Use "I" much more than "we" — your interviewer is hiring YOU.', 'insight')}` },
      { title: 'Example — "Tell me about a difficult problem"', body: () => `
        <p><strong>Bad version:</strong> "At SAIC we had a CI pipeline that was slow. I worked with my team to optimize it and it got better."</p>
        <p><strong>STAR version:</strong></p>
        <p><em>S:</em> "At SAIC I was on a team running CI for 50+ developers. Build times had crept from 8 minutes to 22 minutes over 6 months."</p>
        <p><em>T:</em> "I was asked to investigate and propose fixes."</p>
        <p><em>A:</em> "I started by adding metrics to break down build time by stage. Found 60% was Docker image rebuilds because we weren\'t using layer caching. I refactored the Dockerfile to put dependencies before code. Then I noticed unit tests ran serially even though they were independent — split them across 4 parallel jobs in Azure DevOps. Finally, I added a build artifact cache so deps weren\'t re-downloaded every run."</p>
        <p><em>R:</em> "Build time dropped from 22 min to 6 min, saving the team ~3 dev-hours per day. I documented the patterns in our wiki so other teams could apply them."</p>
        <p>Notice: specific tools, specific numbers, specific actions YOU took, concrete outcome with measurement.</p>` },
      { title: 'Stories To Have Ready', body: () => `
        <p>Prepare 6-8 STAR stories covering common themes. Most behavioral questions are variants of these:</p>
        <ul>
          <li>A time you led without authority</li>
          <li>A conflict with a teammate or stakeholder</li>
          <li>A time you failed and what you learned</li>
          <li>A time you had to learn something quickly</li>
          <li>A time you simplified something complex</li>
          <li>A time you pushed back on a decision</li>
          <li>Your proudest project</li>
          <li>A time you missed a deadline</li>
        </ul>
        ${quiz('Interviewer asks "Tell me about a time you disagreed with your manager." You don\'t want to throw your manager under the bus. How do you structure this?', 'Pick a respectful disagreement. Situation: technical decision your manager favored. Action: gathered data, presented alternative with trade-offs, listened to their reasoning, found a middle path or agreed to disagree professionally. Result: outcome (your idea won, theirs won and you supported it, you compromised). Always frame the manager respectfully — interviewer is imagining themselves as your future manager.')}` },
    ],
    keyTerms: ['STAR', 'Situation / Task / Action / Result', 'I vs we', 'Quantified outcomes', 'Story bank'],
    sources: ['"Cracking the Coding Interview" behavioral chapters', 'Amazon\'s Leadership Principles (every Amazon-influenced company uses some version)', 'Practice on Pramp, interviewing.io']
  },

  'negotiation': {
    track: 'int',
    title: 'Salary Negotiation',
    subtitle: 'The single highest-ROI conversation of your career',
    duration: '18 min read', difficulty: 'Foundational',
    sections: [
      { title: 'The Math', body: () => `
        <p>You\'re going to be paid for ~40 years. A 10% higher starting salary, compounded with 4% raises, is roughly $300K-$500K more lifetime earnings depending on field. The negotiation conversation takes 1 hour. That\'s the highest hourly rate of your life.</p>
        ${callout('Every dollar you negotiate up now propagates forward. Future raises are percentages of your current salary. Future job offers anchor on your current salary. Compound interest of negotiation.', 'insight')}` },
      { title: 'The Rules', body: () => `
        <p><strong>1. Never give a number first.</strong> The first number anchors the rest of the negotiation. If forced: "I\'d like to understand more about the role and the comp structure before discussing numbers." If REALLY forced: give a range with your target as the bottom.</p>
        <p><strong>2. Always negotiate.</strong> Even if the offer feels good. Recruiters expect it; the worst case is "this is our best offer." You will never get less for asking.</p>
        <p><strong>3. Have a competing offer or signal market value.</strong> "I\'m in late stages with two other companies" is the single most powerful phrase. Even without a competing offer: "Levels.fyi shows the median for this level at $X" is data.</p>
        <p><strong>4. Negotiate the package, not just base.</strong> Sign-on bonus, equity refresh, equity vesting cliff, relocation, target bonus %, extra PTO. Some companies can\'t flex base but CAN flex sign-on.</p>` },
      { title: 'The Script', body: () => `
        <p>Recruiter: "We\'d like to offer you $X base, $Y RSUs, $Z sign-on."</p>
        <p>You: "Thank you so much, I\'m really excited about this opportunity. I want to take a couple days to consider and review the details. Can I get back to you by [date]?"</p>
        <p>(Time creates leverage. Never accept on the call.)</p>
        <p>Two days later: "I\'m really enthusiastic about joining. Based on my research and the other conversations I\'m having, I was hoping we could land closer to $X+15% base, with the sign-on adjusted to bridge the equity vesting cliff. Is there flexibility on those?"</p>
        <p>(Specific ask. Justification. Open question that invites a counter.)</p>` },
      { title: 'What Not To Do', body: () => `
        <ul>
          <li><strong>Don\'t reveal your current salary</strong> unless you\'re in a state that requires it. "I\'d rather discuss the market rate for this role and my expectations" — illegal to ask in many jurisdictions now (CA, NY, etc.)</li>
          <li><strong>Don\'t lie about competing offers.</strong> Reputable companies will sometimes ask for proof. Caught = offer rescinded.</li>
          <li><strong>Don\'t negotiate small.</strong> "Could we do $96K instead of $95K?" wastes everyone\'s time and signals you don\'t know your value. Ask for 15-25% more or don\'t bother.</li>
          <li><strong>Don\'t threaten.</strong> "If you can\'t do $X I\'m walking" only works if you\'ll actually walk. Better: "I\'d need X to make this work over my other options."</li>
        </ul>
        ${quiz('You get an offer $20K below your target. You\'re excited about the role and don\'t have a competing offer. What do you say?', 'Use market data: "I\'ve been looking at Levels.fyi data for L4 SWEs at companies of similar size, and the median I\'m seeing is $X. Could we get closer to that?" If no flex on base, ask about sign-on bonus or extra equity. If no flex anywhere and the offer\'s still good — take it. Negotiating shows you value yourself; failing to negotiate signals the opposite.')}` },
    ],
    keyTerms: ['Anchoring', 'Competing offer', 'Total comp', 'Sign-on bonus', 'Refresh grants', 'Vesting cliff', 'Levels.fyi'],
    sources: ['"10 Rules for Negotiating a Job Offer" by Haseeb Qureshi (essential read)', 'Levels.fyi for benchmarking', 'Patrick McKenzie "Salary Negotiation"']
  },

  'interview-loop': {
    track: 'int',
    title: 'The Big Tech Interview Loop',
    subtitle: 'What to expect across 5-6 rounds and how to prepare',
    duration: '20 min read', difficulty: 'Foundational',
    sections: [
      { title: 'The Standard Loop', body: () => `
        ${compareTable({ headers: ['Stage', 'What', 'Cuts'], rows: [
          ['Recruiter screen', '30 min phone — about your background, salary expectations', 'Reject if obviously not a fit'],
          ['Online assessment', 'HackerRank-style coding, 1-2 problems', 'Filter mass applicants'],
          ['Tech screen', '60 min coding interview, often DSA + design', 'Filter to onsite-worthy'],
          ['Onsite (virtual)', '4-5 back-to-back interviews: 2 coding, 1-2 system design, 1 behavioral', 'The real decision'],
          ['Hiring committee', 'You don\'t see this — they review all signals', 'Final yes/no'],
          ['Offer + negotiation', 'See the negotiation lesson', '-'],
        ] })}` },
      { title: 'What Each Round Actually Tests', body: () => `
        <p><strong>Coding rounds.</strong> Can you write working code in 45 min on an unfamiliar problem? Communication is graded as heavily as correctness. Think out loud. Discuss trade-offs. Test your own code.</p>
        <p><strong>System design.</strong> Can you architect a non-trivial system without freezing? See the SD Mock Week lesson — RESHADED framework, talk through trade-offs.</p>
        <p><strong>Behavioral.</strong> Are you someone people want to work with? Use STAR. Have stories ready for the standard themes. Show humility on failures, leadership without arrogance.</p>` },
      { title: 'Common Mistakes', body: () => `
        ${compareTable({ headers: ['Mistake', 'Fix'], rows: [
          ['Jumping into code without clarifying', '5 min on requirements/edge cases up front. Always.'],
          ['Silent thinking', 'Narrate. "I\'m thinking about whether to use a hashmap or sort first..."'],
          ['No tests / examples', 'After you write code, trace through with an example.'],
          ['Defending wrong code', 'If interviewer hints something is off, treat it as gold. They\'re trying to help.'],
          ['Asking for the answer', '"I\'m stuck on X. Can you give me a hint?" is OK once. Don\'t do it twice.'],
          ['Ignoring time pressure', 'Get something working, then optimize. Working O(n²) > nothing.'],
        ] })}` },
      { title: 'Preparation Timeline', body: () => `
        <p>For someone with your background (DevSecOps L2, going to UPenn), realistic prep:</p>
        ${compareTable({ headers: ['Time', 'Focus'], rows: [
          ['3 months out', '~80 NeetCode problems. Master 5-10 patterns deeply.'],
          ['2 months out', 'NeetCode 150 grind. Add system design (1 problem/week).'],
          ['1 month out', 'Mock interviews (Pramp, peers). Behavioral story bank.'],
          ['2 weeks out', 'Re-do hardest patterns. Practice timing.'],
          ['Week of', 'Lighter prep. Sleep. Mock the day before to warm up.'],
        ] })}
        ${callout('Don\'t aim to solve every NeetCode 150 perfectly. Aim to recognize 80% of LeetCode mediums as variants of patterns you\'ve internalized. Pattern recognition > memorization.', 'insight')}
        ${quiz('You get to the onsite. You bomb the second coding round badly. Should you give up the rest?', 'Absolutely not. Each round is evaluated independently, and a strong showing on the remaining 3 rounds can outweigh one bad round. Also, interviewers calibrate differently — what FEELS like a bomb to you might actually be a borderline. Show up to the next round fresh and focused. Many offers come from candidates who had one rough round.')}` },
    ],
    keyTerms: ['Recruiter screen', 'Tech screen', 'Onsite loop', 'Hiring committee', 'Leveling', 'Calibration', 'Bar raiser (Amazon)'],
    sources: ['"Cracking the Coding Interview" by Gayle McDowell', 'Tech Interview Handbook (techinterviewhandbook.org)', 'Levels.fyi salaries + interview reports']
  },

};
