// ============================================================
// SYSTEM DESIGN LESSONS — Grokking-style multi-section deep dives
// Each lesson has sections (Requirements → Estimation → API → Data Model →
// Architecture → Bottlenecks) and embeds animated SVG diagrams.
//
// To add a new lesson: add an entry keyed by topicId.
// To render: import renderLesson(topicId) from views/lesson.js
// ============================================================

import { archDiagram, sequenceDiagram, compareTable, callout, quiz } from '../components/viz.js';

export const SD_LESSONS = {

  // ============================================================
  // NETWORKING FUNDAMENTALS — Week 1
  // ============================================================
  'networking-fundamentals': {
    title: 'Networking Fundamentals',
    subtitle: 'How bytes actually get from your laptop to a server in Virginia',
    duration: '25 min read',
    difficulty: 'Foundational',
    sections: [
      {
        title: 'The Layered Model',
        body: () => `
          <p>Every system you build sends bytes over a network, and most system design questions touch the OSI model whether they explicitly mention it or not. The mental model that matters:</p>
          <p><strong>Data gets wrapped in layers on send. Each layer adds a header. Each layer unwraps on receive.</strong></p>
          <p>You don't need to memorize all 7 OSI layers. You need to know the four that show up in real systems: <code>HTTP</code> (application), <code>TLS</code> (encryption), <code>TCP</code> (transport), <code>IP</code> (network).</p>
          ${archDiagram({
            height: 220,
            nodes: [
              { id: 'app', x: 70, y: 100, w: 100, h: 40, label: 'HTTP', sub: 'application' },
              { id: 'tls', x: 200, y: 100, w: 100, h: 40, label: 'TLS', sub: 'encryption' },
              { id: 'tcp', x: 330, y: 100, w: 100, h: 40, label: 'TCP', sub: 'transport', color: '#7B9FB5' },
              { id: 'ip',  x: 70, y: 180, w: 100, h: 40, label: 'IP',  sub: 'network',   color: '#8FA876' },
              { id: 'eth', x: 200, y: 180, w: 100, h: 40, label: 'Ethernet', sub: 'link', color: '#B888C0' },
            ],
            edges: [
              { from: 'app', to: 'tls', label: 'wraps' },
              { from: 'tls', to: 'tcp', label: 'wraps' },
              { from: 'tcp', to: 'ip', label: 'wraps' },
              { from: 'ip', to: 'eth', label: 'wraps' },
            ],
            caption: 'Send path: each layer wraps the payload in its own header'
          })}
          ${callout('When debugging, ask: "which layer is broken?" L7 (HTTP) issues look very different from L4 (TCP) issues. Your nginx is L7. Your firewall rules are L3/L4.', 'insight')}
        `
      },
      {
        title: 'TCP vs UDP',
        body: () => `
          <p>Two protocols at the transport layer. Pick one based on what failure mode you can tolerate.</p>
          ${compareTable({
            headers: ['Trait', 'TCP', 'UDP'],
            rows: [
              ['Connection', 'Yes — 3-way handshake first', 'No — just send'],
              ['Ordered delivery', 'Guaranteed', 'No guarantee'],
              ['Retransmission', 'Automatic on loss', 'Your problem'],
              ['Overhead per packet', '~40 bytes header + state', '~8 bytes header'],
              ['Use cases', 'HTTP, SSH, email, anything you need correct', 'Video calls, DNS, game state, streaming']
            ]
          })}
          <p>The mental model: <strong>TCP is certified mail. UDP is a postcard.</strong> TCP is slow because it guarantees delivery. UDP is fast because it doesn't care if your packet got dropped.</p>
        `
      },
      {
        title: 'The 3-Way Handshake',
        body: () => `
          <p>Before TCP can send data, both sides must agree they're talking to each other. This takes three messages.</p>
          ${sequenceDiagram({
            actors: ['Client', 'Server'],
            messages: [
              { from: 0, to: 1, label: 'SYN (seq=x)' },
              { from: 1, to: 0, label: 'SYN-ACK (seq=y, ack=x+1)' },
              { from: 0, to: 1, label: 'ACK (ack=y+1)' },
              { from: 0, to: 1, label: '── data flows ──' },
            ],
            caption: 'TCP 3-way handshake — one round-trip before any data moves'
          })}
          <p>Why three messages, not two? Because each side needs to confirm the other side can both <strong>send</strong> and <strong>receive</strong>. The first SYN proves the client can send. The SYN-ACK proves the server can receive AND send. The final ACK proves the client can receive. Now both sides trust the connection.</p>
          ${callout('This is why opening a TCP connection has latency cost. HTTP/2 multiplexes many requests over one TCP connection precisely to avoid this handshake repeatedly. HTTP/3 (over QUIC/UDP) avoids it entirely.', 'info')}
          ${quiz(
            'If your service has 1,000 RPS and you make a new TCP connection per request to a database 50ms away, what\'s your wasted latency budget per second?',
            '50ms × 1,000 = 50 seconds of latency. That\'s why connection pooling matters: reuse the handshake.'
          )}
        `
      },
      {
        title: 'HTTP Versions',
        body: () => `
          <p>HTTP has evolved to fight the latency problem.</p>
          ${compareTable({
            headers: ['Version', 'Transport', 'Big improvement'],
            rows: [
              ['HTTP/1.1', 'TCP', 'Keep-alive — reuse one connection for multiple requests'],
              ['HTTP/2',   'TCP + binary', 'Multiplexing — many requests in flight on one connection'],
              ['HTTP/3',   'QUIC over UDP', 'No 3-way handshake on reconnect; head-of-line blocking gone']
            ]
          })}
          ${callout('Interview tip: "HTTP/3 uses UDP" sounds wrong but is correct. QUIC implements TCP-like reliability on top of UDP because TCP\'s in-kernel implementation is slow to evolve.', 'info')}
        `
      }
    ],
    keyTerms: ['OSI layers', 'TCP vs UDP', '3-way handshake', 'HTTP/1.1 vs /2 vs /3', 'keep-alive', 'multiplexing', 'connection pooling'],
    sources: ['NeetCode SD Course — Networking Essentials', 'Grokking SD Fundamentals — Network Protocols', 'Ilya Grigorik, "High Performance Browser Networking" (free online)']
  },

  // ============================================================
  // LOAD BALANCERS — Week 3
  // ============================================================
  'load-balancers': {
    title: 'Load Balancers',
    subtitle: 'The traffic cop between users and your servers',
    duration: '20 min read',
    difficulty: 'Foundational',
    sections: [
      {
        title: 'What Problem They Solve',
        body: () => `
          <p>One server can handle ~10,000 concurrent connections before it crawls. Your app has 1,000,000 users. The math says you need many servers. Now the question becomes: <strong>which server handles this user's request?</strong></p>
          <p>That's the load balancer's job. It sits between the public internet and your fleet of backend servers, and it routes each incoming request to one of them.</p>
          ${archDiagram({
            height: 220,
            nodes: [
              { id: 'u1', x: 50, y: 60, w: 70, h: 30, label: 'User', sub: 'A' },
              { id: 'u2', x: 50, y: 110, w: 70, h: 30, label: 'User', sub: 'B' },
              { id: 'u3', x: 50, y: 160, w: 70, h: 30, label: 'User', sub: 'C' },
              { id: 'lb', x: 230, y: 110, w: 100, h: 50, label: 'Load Balancer', sub: 'nginx / HAProxy' },
              { id: 'b1', x: 410, y: 60, w: 60, h: 30, label: 'app-1' },
              { id: 'b2', x: 410, y: 110, w: 60, h: 30, label: 'app-2' },
              { id: 'b3', x: 410, y: 160, w: 60, h: 30, label: 'app-3' },
            ],
            edges: [
              { from: 'u1', to: 'lb', color: '#F5B842' },
              { from: 'u2', to: 'lb', color: '#F5B842' },
              { from: 'u3', to: 'lb', color: '#F5B842' },
              { from: 'lb', to: 'b1', color: '#7B9FB5' },
              { from: 'lb', to: 'b2', color: '#7B9FB5' },
              { from: 'lb', to: 'b3', color: '#7B9FB5' },
            ],
            caption: 'Users hit one address; the LB distributes work to many backends'
          })}
          <p>This buys you two things: <strong>horizontal scale</strong> (add backends to handle more load) and <strong>failure tolerance</strong> (one backend dies, LB routes around it).</p>
        `
      },
      {
        title: 'L4 vs L7',
        body: () => `
          <p>Load balancers operate at one of two OSI layers, and the choice matters.</p>
          ${compareTable({
            headers: ['Trait', 'L4 (Transport)', 'L7 (Application)'],
            rows: [
              ['Sees', 'TCP/UDP connections, IPs, ports', 'HTTP request — URL, headers, cookies, body'],
              ['Routing decisions', 'Based on connection only', 'Can route by path (/api → A, /static → B)'],
              ['Speed', 'Very fast, low CPU', 'Slower — must parse HTTP'],
              ['SSL termination', 'Pass-through (or none)', 'Common termination point'],
              ['Examples', 'AWS NLB, HAProxy in TCP mode', 'nginx, AWS ALB, Cloudflare']
            ]
          })}
          ${callout('Modern systems use both: L4 in front for raw throughput, L7 behind for app-aware routing. Your nginx reverse proxy is an L7 LB.', 'insight')}
        `
      },
      {
        title: 'Routing Algorithms',
        body: () => `
          <p>The LB has multiple servers to choose from. Which one gets the request? Four common strategies:</p>
          <p><strong>Round Robin.</strong> Cycle through servers in order. Simple, predictable. Bad when requests have variable cost (one heavy request can pile up).</p>
          <p><strong>Least Connections.</strong> Pick whichever server has the fewest active connections right now. Self-balancing for variable request sizes. Slightly more state to track.</p>
          <p><strong>IP Hash.</strong> Hash the client's IP and route to one specific server. Same user always lands on the same server — useful for session affinity (sticky sessions).</p>
          <p><strong>Weighted variants.</strong> All of the above, but you can give one server a higher weight (e.g., your new beefier box gets 3x traffic).</p>
          ${quiz(
            'You\'re running a video chat service. Each connection is a long-lived WebSocket. Which algorithm makes sense — round robin, least connections, or IP hash?',
            'Least connections. Round robin would dump all new users onto the same server while existing ones still hold connections. IP hash forces session affinity which you don\'t need here.'
          )}
        `
      },
      {
        title: 'Health Checks',
        body: () => `
          <p>An LB is only as good as its knowledge of which backends are alive. Two kinds of health checks:</p>
          <p><strong>Active health checks.</strong> The LB sends a probe request (e.g., GET /healthz) on a schedule. If it fails N times in a row, the backend is marked unhealthy and pulled from rotation.</p>
          <p><strong>Passive health checks.</strong> The LB watches real production traffic. If too many requests to backend X are timing out or returning 5xx, X gets pulled.</p>
          ${callout('In production you want both. Active catches problems before users see them; passive catches problems your healthz endpoint missed.', 'info')}
          ${callout('"Connection draining" is what happens during a deploy: the LB stops sending new requests to a backend but lets existing requests finish before it\'s killed. Without this, deploys cause 500s.', 'info')}
        `
      },
      {
        title: 'Global Load Balancing',
        body: () => `
          <p>At very large scale you also need a <strong>GSLB</strong> (Global Server Load Balancer) — a layer above your regional LBs that picks which datacenter the user hits, usually based on geography and latency. DNS-based GSLB returns different IPs based on the user's location. Anycast-based GSLB advertises the same IP from multiple datacenters and routes via BGP.</p>
          <p>This is what Cloudflare, AWS Route 53, and similar do.</p>
        `
      },
    ],
    keyTerms: ['L4 vs L7', 'Round robin', 'Least connections', 'IP hash', 'Sticky sessions', 'Health checks', 'GSLB', 'Connection draining'],
    sources: ['NeetCode SD Course — Load Balancing', 'Grokking SD Fundamentals — Load Balancer', 'HAProxy and nginx documentation']
  },

  // ============================================================
  // URL SHORTENER — Week 9
  // ============================================================
  'url-shortener': {
    title: 'Design URL Shortener',
    subtitle: 'The gateway interview problem',
    duration: '30 min read',
    difficulty: 'Intermediate',
    sections: [
      {
        title: 'Requirements',
        body: () => `
          <p>Before designing anything, separate functional from non-functional requirements. This 2-minute clarification is the #1 thing interviewers grade you on.</p>
          <h4 style="margin-top: 16px; margin-bottom: 8px; color: var(--text-primary);">Functional</h4>
          <ul>
            <li>Given a long URL, return a short URL (e.g., <code>short.io/aB3xY9</code>).</li>
            <li>Given a short URL, redirect to the original long URL.</li>
            <li>(Stretch) Custom slugs: user picks <code>short.io/my-link</code>.</li>
            <li>(Stretch) Expiration: links auto-expire after N days.</li>
            <li>(Stretch) Analytics: count clicks per short URL.</li>
          </ul>
          <h4 style="margin-top: 16px; margin-bottom: 8px; color: var(--text-primary);">Non-Functional</h4>
          <ul>
            <li><strong>Read-heavy.</strong> Click rate >> create rate (probably 100:1).</li>
            <li><strong>Low latency on redirect.</strong> User typed a URL, you have ~100ms before they think the site is broken.</li>
            <li><strong>High availability.</strong> A dead URL shortener kills every link that points to it. Multi-region.</li>
            <li><strong>Eventual consistency is fine.</strong> If a new short URL takes 1 second to propagate to all regions, no one cares.</li>
          </ul>
        `
      },
      {
        title: 'Capacity Estimation',
        body: () => `
          <p>Back-of-envelope math sets the design constraints. Interviewer expects you to do this aloud.</p>
          <p><strong>Writes:</strong> 100M new URLs per month = ~40/sec. Tiny.</p>
          <p><strong>Reads:</strong> 100:1 ratio = ~4,000/sec average. Spikes to 10,000+. Substantial.</p>
          <p><strong>Storage:</strong> 100M × 12 months × 5 years = 6 billion URLs. Each entry ~500 bytes (short, long, metadata) = ~3 TB. Manageable.</p>
          <p><strong>Bandwidth:</strong> Redirect responses are tiny (HTTP 302 with Location header), ~500 bytes. 4,000 RPS × 500 bytes = 2 MB/s. Trivial.</p>
          ${callout('The dominant constraint is read latency and availability, not storage or compute. This means you\'ll cache aggressively.', 'insight')}
        `
      },
      {
        title: 'System APIs',
        body: () => `
          <p>Two endpoints, RESTful.</p>
          <pre style="background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px; font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); line-height: 1.6; overflow-x: auto;">POST /api/v1/urls
  body: { long_url, custom_slug?, expiry_days? }
  returns: { short_url, short_code, expires_at }

GET /:short_code
  returns: HTTP 302 with Location: long_url</pre>
          <p>The redirect endpoint is <strong>not</strong> versioned because users paste raw short URLs. The API endpoint is versioned because clients call it programmatically and you may want to evolve it.</p>
        `
      },
      {
        title: 'Key Generation Strategy',
        body: () => `
          <p>The interesting design question: <strong>how do you generate a unique short code?</strong> Two approaches:</p>
          <p><strong>Approach 1 — Hash the long URL.</strong> Take MD5(long_url), take first 7 chars. Pros: deterministic, no coordination. Cons: collisions (need to retry with offset), same URL maps to same code (bad if you want analytics per-creator).</p>
          <p><strong>Approach 2 — Counter + base62 encode.</strong> Maintain a global counter. Each new URL gets the next ID. Encode the ID in base62 (a-z, A-Z, 0-9) to make it short. Pros: no collisions, deterministic length, sortable. Cons: the counter needs coordination across servers.</p>
          ${callout('Counter approach wins in practice. The coordination is solved with a Twitter Snowflake-style ID generator or by pre-allocating ranges to each server (each app server gets a block of 10,000 IDs and uses them).', 'insight')}
          <p><strong>How short is "short"?</strong> Base62 with 7 characters gives 62⁷ = 3.5 trillion combinations. That's enough for the heat death of the URL universe.</p>
        `
      },
      {
        title: 'Data Model',
        body: () => `
          <p>One table, designed for read-by-short-code.</p>
          ${compareTable({
            headers: ['Column', 'Type', 'Notes'],
            rows: [
              ['short_code', 'VARCHAR(10) PK', 'Indexed (it IS the PK)'],
              ['long_url', 'TEXT', '~500 bytes typical, 2KB max'],
              ['created_at', 'TIMESTAMP', ''],
              ['expires_at', 'TIMESTAMP NULL', 'NULL = never expires'],
              ['user_id', 'UUID NULL', 'For analytics and custom slugs'],
              ['click_count', 'BIGINT', 'Approximate — periodic batch update'],
            ]
          })}
          <p>SQL or NoSQL? Either works. <strong>Postgres</strong> if you also want a users table with proper relations. <strong>DynamoDB / Cassandra</strong> if you want simpler horizontal scaling and don't care about joins.</p>
        `
      },
      {
        title: 'High-Level Architecture',
        body: () => `
          ${archDiagram({
            height: 280,
            nodes: [
              { id: 'usr', x: 50, y: 60, w: 70, h: 30, label: 'User' },
              { id: 'cdn', x: 170, y: 60, w: 80, h: 30, label: 'CDN', sub: 'Cloudflare' },
              { id: 'lb',  x: 300, y: 60, w: 80, h: 30, label: 'LB', color: '#7B9FB5' },
              { id: 'app', x: 430, y: 60, w: 80, h: 30, label: 'App servers', color: '#7B9FB5' },
              { id: 'cache', x: 250, y: 160, w: 100, h: 40, label: 'Redis', sub: 'hot URLs' },
              { id: 'db', x: 400, y: 160, w: 100, h: 40, label: 'Postgres', sub: 'primary', color: '#8FA876' },
              { id: 'replicas', x: 400, y: 230, w: 100, h: 30, label: 'read replicas', color: '#8FA876' },
            ],
            edges: [
              { from: 'usr', to: 'cdn' },
              { from: 'cdn', to: 'lb' },
              { from: 'lb', to: 'app' },
              { from: 'app', to: 'cache' },
              { from: 'cache', to: 'db' },
              { from: 'db', to: 'replicas' },
            ],
            caption: 'Request flow: CDN → LB → App → Cache → DB. The cache is where most lookups stop.'
          })}
          <p><strong>The read path.</strong> 99% of requests are redirects. They flow CDN → LB → App → Redis cache. Cache hit returns long_url instantly. Cache miss falls through to Postgres read replica, then populates cache for next time.</p>
          <p><strong>The write path.</strong> POST /api/v1/urls hits App → Postgres primary → invalidate any related cache → return short URL.</p>
          ${callout('Redirect responses can be cached at the CDN edge (cache-control header). Most redirects then never touch your servers. Massive cost savings.', 'insight')}
        `
      },
      {
        title: 'Bottlenecks & Trade-offs',
        body: () => `
          <p>Where this design breaks under load and what you do about it:</p>
          <p><strong>Hot URL problem.</strong> A celebrity tweets a short URL → millions of requests in seconds → cache and DB both melt. Mitigation: CDN-level caching with high TTL, multi-tier cache (browser → CDN → Redis → DB), rate limiting.</p>
          <p><strong>Counter coordination.</strong> Single global counter is a bottleneck. Mitigation: Snowflake ID, or assign each app server a range of IDs to give out.</p>
          <p><strong>Read replica lag.</strong> Newly created short URL might not be on a read replica yet, so the first redirect 404s. Mitigation: write-through cache (cache the new URL immediately on create), or read from primary for the first N seconds after creation.</p>
          <p><strong>Spam URLs.</strong> Attackers create millions of links to malware. Mitigation: per-IP rate limiting, captcha for unauthenticated creation, async URL safety scanning (Google Safe Browsing API).</p>
          ${quiz(
            'Why use HTTP 302 redirect, not 301?',
            '301 is "permanently moved" — browsers cache it. If you cache the redirect, you can never count the click again, and you can never change where the short URL points. 302 is "temporary," so the browser asks again next time.'
          )}
        `
      }
    ],
    keyTerms: ['Base62 encoding', 'Counter vs hash key generation', '301 vs 302 redirect', 'Read-heavy systems', 'Multi-tier caching', 'Snowflake IDs'],
    sources: ['Grokking SD Interview — Designing a URL Shortener', 'NeetCode TinyURL walkthrough', 'High Scalability blog on bit.ly architecture']
  },

  // ============================================================
  // CACHING — Week 5
  // ============================================================
  'caching': {
    title: 'Caching',
    subtitle: 'Trading memory for latency, the most powerful lever in systems',
    duration: '22 min read',
    difficulty: 'Foundational',
    sections: [
      {
        title: 'The Core Idea',
        body: () => `
          <p>Cache = a fast copy of slow data, kept close to where it's used.</p>
          <p>The slowest things in computing are <strong>disk reads</strong> (10ms), <strong>cross-region network</strong> (100ms+), and <strong>database queries that hit disk</strong> (also 10-100ms). The fastest is <strong>memory</strong> (<1µs). Caching means putting frequently-accessed slow data into memory.</p>
          ${archDiagram({
            height: 180,
            nodes: [
              { id: 'app', x: 70, y: 90, w: 80, h: 40, label: 'App', sub: '1ms' },
              { id: 'cache', x: 240, y: 90, w: 90, h: 40, label: 'Redis', sub: '~1ms' },
              { id: 'db', x: 410, y: 90, w: 80, h: 40, label: 'DB', sub: '~20ms', color: '#8FA876' },
            ],
            edges: [
              { from: 'app', to: 'cache', label: 'try cache first' },
              { from: 'cache', to: 'db', label: 'miss → fetch' },
            ],
            caption: '90% of reads stop at the cache. 10% fall through to the DB.'
          })}
        `
      },
      {
        title: 'Write Strategies',
        body: () => `
          <p>What happens when data <strong>changes</strong>? You have three choices.</p>
          ${compareTable({
            headers: ['Strategy', 'How it works', 'Trade-off'],
            rows: [
              ['Cache-aside', 'App writes to DB. Cache is updated lazily on next read.', 'Simple. Stale reads possible right after a write.'],
              ['Write-through', 'App writes to cache AND DB synchronously.', 'No stale reads. Slower writes.'],
              ['Write-behind', 'App writes to cache. Cache writes to DB async.', 'Very fast writes. Risk of data loss if cache dies.']
            ]
          })}
          ${callout('Default is cache-aside. Reach for write-through when correctness matters more than write speed. Reach for write-behind in extreme write-heavy scenarios (analytics, metrics).', 'insight')}
        `
      },
      {
        title: 'Eviction Policies',
        body: () => `
          <p>Memory is finite. When the cache fills up, you must drop something. The policy decides what.</p>
          <p><strong>LRU (Least Recently Used).</strong> Drop the entry that hasn't been accessed in the longest time. The default for most caches because it matches typical access patterns (recently used = likely to be used again).</p>
          <p><strong>LFU (Least Frequently Used).</strong> Drop the entry with the fewest hits over time. Good when you have stable popular items.</p>
          <p><strong>TTL (Time To Live).</strong> Every entry has an expiration. Entries die when their TTL passes regardless of access. Good for data that has a natural freshness window.</p>
          ${callout('In Redis, the default eviction policy is "noeviction" — it just refuses new writes when full. Switch to allkeys-lru for most use cases.', 'warning')}
        `
      },
      {
        title: 'The Hard Problems',
        body: () => `
          <p>"Cache invalidation is one of the two hard things in computer science." Why?</p>
          <p><strong>Cache stampede.</strong> A popular cache key expires. Now 10,000 simultaneous requests all miss the cache and hit the DB at once. The DB falls over. Solutions: probabilistic early refresh (a small % of requests refresh before TTL), or single-flight locks (only one request fetches; others wait).</p>
          <p><strong>Cache penetration.</strong> Attackers request keys that don't exist (and never will). Each request falls through to DB. Solution: cache the "not found" result with a short TTL.</p>
          <p><strong>Hot key.</strong> One key gets 90% of traffic (e.g., the homepage). The single Redis node holding it becomes the bottleneck. Solution: replicate hot keys across nodes, or use a local in-process cache for hot keys (multi-tier).</p>
          ${quiz(
            'You add a cache in front of your DB. Latency drops 10x. A week later, users start reporting "my profile change isn\'t showing up." What\'s likely the cause and the fix?',
            'You\'re using cache-aside. When the user updates their profile, you wrote to DB but didn\'t invalidate or update the cache. The fix is to also invalidate (delete) the relevant cache key on every write.'
          )}
        `
      }
    ],
    keyTerms: ['Cache-aside', 'Write-through', 'Write-behind', 'LRU / LFU / TTL', 'Cache stampede', 'Cache penetration', 'Hot key'],
    sources: ['NeetCode SD Course — Caching', 'Grokking SD Fundamentals — Caching', 'Redis docs — patterns guide']
  },

  // ============================================================
  // STUBS for remaining topics — to be filled in later
  // ============================================================
  'dns-cdn': stub('DNS & CDNs', 'How DNS resolves and how CDNs reduce latency via edge caching'),
  'databases-i': stub('Databases I — SQL vs NoSQL', 'When ACID matters, when BASE wins'),
  'databases-ii': stub('Databases II — Sharding & Replication', 'Horizontal vs vertical scaling, master-replica vs multi-master'),
  'message-queues': stub('Message Queues', 'Kafka, RabbitMQ, pub/sub vs point-to-point, delivery guarantees'),
  'cap-theorem': stub('CAP Theorem', 'Choosing CP vs AP under network partitions'),
  'pastebin': stub('Design Pastebin', 'Object storage for content, metadata in DB'),
  'twitter': stub('Design Twitter', 'Fanout-on-write vs fanout-on-read, the celebrity problem'),
  'youtube': stub('Design YouTube', 'Video encoding, adaptive bitrate streaming, CDN tiering'),
  'uber': stub('Design Uber', 'Geo-indexing with quadtrees, real-time matching, websockets'),
  'whatsapp': stub('Design WhatsApp', 'Websockets, message delivery guarantees, E2EE'),
  'dropbox': stub('Design Dropbox', 'File chunking, delta sync, conflict resolution'),
  'web-crawler': stub('Design Web Crawler', 'Distributed BFS, politeness, URL dedup, freshness'),
  'news-feed': stub('Design News Feed', 'Ranking, push vs pull, ML feed scoring'),
  'recommendation': stub('ML SD — Recommendation', 'Two-stage architecture, candidate generation + ranking'),
  'search-ranking': stub('ML SD — Search Ranking', 'Sparse + dense retrieval, learning to rank'),
  'mock-week': stub('Mock interview week', 'RESHADED framework, timed practice, self-assessment'),
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
        title: 'Lesson in progress',
        body: () => `
          <p>This lesson follows the same Grokking-style structure as the flagship lessons (Networking Fundamentals, Load Balancers, URL Shortener, Caching). Sections include Requirements, Capacity Estimation, System APIs, Data Model, High-Level Architecture, and Bottlenecks &amp; Trade-offs.</p>
          <p>For now, use the recommended external resources:</p>
          <ul>
            <li>Grokking the System Design Interview (designgurus.io) — the canonical writeup</li>
            <li>NeetCode SD Course — video walkthroughs</li>
            <li>Alex Xu, "System Design Interview" Vol 1 &amp; 2 — best book on the topic</li>
          </ul>
        `
      }
    ],
    keyTerms: [],
    sources: []
  };
}
