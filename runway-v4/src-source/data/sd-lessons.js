// ============================================================
// SYSTEM DESIGN LESSONS — Grokking-style multi-section deep dives
// All 21 lessons fully written. Each embeds animated SVG viz.
// ============================================================

import { archDiagram, sequenceDiagram, compareTable, callout, quiz } from '../components/viz.js';

export const SD_LESSONS = {

  'networking-fundamentals': {
    title: 'Networking Fundamentals',
    subtitle: 'How bytes actually get from your laptop to a server in Virginia',
    duration: '25 min read', difficulty: 'Foundational',
    sections: [
      { title: 'The Layered Model', body: () => `
        <p>Every system you build sends bytes over a network. The mental model that matters: <strong>data gets wrapped in layers on send. Each layer adds a header. Each layer unwraps on receive.</strong></p>
        <p>You don't need all 7 OSI layers. You need the four that show up in real systems: <code>HTTP</code> (application), <code>TLS</code> (encryption), <code>TCP</code> (transport), <code>IP</code> (network).</p>
        ${archDiagram({ height: 220, nodes: [
          { id: 'app', x: 70, y: 100, w: 100, h: 40, label: 'HTTP', sub: 'application' },
          { id: 'tls', x: 200, y: 100, w: 100, h: 40, label: 'TLS', sub: 'encryption' },
          { id: 'tcp', x: 330, y: 100, w: 100, h: 40, label: 'TCP', sub: 'transport', color: '#7B9FB5' },
          { id: 'ip',  x: 70, y: 180, w: 100, h: 40, label: 'IP',  sub: 'network',   color: '#8FA876' },
          { id: 'eth', x: 200, y: 180, w: 100, h: 40, label: 'Ethernet', sub: 'link', color: '#B888C0' },
        ], edges: [
          { from: 'app', to: 'tls', label: 'wraps' }, { from: 'tls', to: 'tcp', label: 'wraps' },
          { from: 'tcp', to: 'ip', label: 'wraps' }, { from: 'ip', to: 'eth', label: 'wraps' },
        ], caption: 'Send path: each layer wraps the payload in its own header' })}
        ${callout('When debugging, ask which layer is broken. L7 issues look very different from L4. Your nginx is L7. Your firewall rules are L3/L4.', 'insight')}` },
      { title: 'TCP vs UDP', body: () => `
        ${compareTable({ headers: ['Trait', 'TCP', 'UDP'], rows: [
          ['Connection', 'Yes — 3-way handshake first', 'No — just send'],
          ['Ordered delivery', 'Guaranteed', 'No guarantee'],
          ['Retransmission', 'Automatic on loss', 'Your problem'],
          ['Overhead per packet', '~40 bytes header + state', '~8 bytes header'],
          ['Use cases', 'HTTP, SSH, email, anything correct', 'Video calls, DNS, game state, streaming']
        ] })}
        <p>The mental model: <strong>TCP is certified mail. UDP is a postcard.</strong></p>` },
      { title: 'The 3-Way Handshake', body: () => `
        ${sequenceDiagram({ actors: ['Client', 'Server'], messages: [
          { from: 0, to: 1, label: 'SYN (seq=x)' },
          { from: 1, to: 0, label: 'SYN-ACK (seq=y, ack=x+1)' },
          { from: 0, to: 1, label: 'ACK (ack=y+1)' },
          { from: 0, to: 1, label: '── data flows ──' },
        ], caption: 'TCP 3-way handshake — one round-trip before any data moves' })}
        <p>Why three messages? Each side must confirm the other can both send and receive. The first SYN proves the client can send. The SYN-ACK proves the server can receive and send. The final ACK proves the client can receive.</p>
        ${callout('HTTP/2 multiplexes many requests over one TCP connection precisely to avoid this handshake repeatedly. HTTP/3 (over QUIC/UDP) avoids it entirely on reconnect.', 'info')}
        ${quiz('Your service has 1,000 RPS and you make a new TCP connection per request to a DB 50ms away. What\'s your wasted latency per second?', '50ms × 1,000 = 50 seconds of latency. That\'s why connection pooling matters: reuse the handshake.')}` },
      { title: 'HTTP Versions', body: () => `
        ${compareTable({ headers: ['Version', 'Transport', 'Big improvement'], rows: [
          ['HTTP/1.1', 'TCP', 'Keep-alive — reuse one connection for multiple requests'],
          ['HTTP/2',   'TCP + binary', 'Multiplexing — many requests in flight on one connection'],
          ['HTTP/3',   'QUIC over UDP', 'No handshake on reconnect; head-of-line blocking gone']
        ] })}
        ${callout('"HTTP/3 uses UDP" sounds wrong but is correct. QUIC implements TCP-like reliability on top of UDP because TCP\'s in-kernel implementation is slow to evolve.', 'info')}` }
    ],
    keyTerms: ['OSI layers', 'TCP vs UDP', '3-way handshake', 'HTTP/1.1 vs /2 vs /3', 'keep-alive', 'multiplexing', 'connection pooling'],
    sources: ['NeetCode SD Course — Networking Essentials', 'Grokking SD Fundamentals — Network Protocols', 'Ilya Grigorik, "High Performance Browser Networking"']
  },

  'dns-cdn': {
    title: 'DNS & CDNs',
    subtitle: 'How a URL becomes an IP, and how content lives near your users',
    duration: '20 min read', difficulty: 'Foundational',
    sections: [
      { title: 'DNS — The Phone Book', body: () => `
        <p>DNS turns <code>github.com</code> into <code>140.82.121.4</code>. It's a hierarchical distributed database, designed so no single server holds all of it.</p>
        <p>The hierarchy: <strong>root → TLD → authoritative.</strong> For <code>api.example.com</code>: root knows who handles <code>.com</code>, the <code>.com</code> TLD knows who handles <code>example.com</code>, and the authoritative server knows the IP for <code>api</code>.</p>
        ${sequenceDiagram({ actors: ['Your machine', 'Resolver', 'Root', '.com TLD', 'example.com NS'], height: 320, messages: [
          { from: 0, to: 1, label: 'where is api.example.com?' },
          { from: 1, to: 2, label: 'where is .com?' },
          { from: 2, to: 1, label: 'try TLD server', return: true },
          { from: 1, to: 3, label: 'where is example.com?' },
          { from: 3, to: 1, label: 'try authoritative NS', return: true },
          { from: 1, to: 4, label: 'where is api?' },
          { from: 4, to: 1, label: '140.82.121.4', return: true },
          { from: 1, to: 0, label: '140.82.121.4 (TTL=300)', return: true },
        ], caption: 'Recursive resolution: resolver does the legwork, caches for the TTL' })}` },
      { title: 'Why CDNs Exist', body: () => `
        <p>New York to Sydney takes ~80ms at the speed of light through fiber, and real networks add more. If every user fetched your homepage from Virginia, users in Singapore would wait half a second before anything loaded.</p>
        <p>A <strong>CDN</strong> places copies of static content at hundreds of edge locations. User hits nearest edge. Edge fetches from origin only on cache miss.</p>
        ${archDiagram({ height: 220, nodes: [
          { id: 'u1', x: 50, y: 50, w: 70, h: 30, label: 'User SG' },
          { id: 'u2', x: 50, y: 130, w: 70, h: 30, label: 'User UK' },
          { id: 'e1', x: 200, y: 50, w: 80, h: 30, label: 'Edge SG' },
          { id: 'e2', x: 200, y: 130, w: 80, h: 30, label: 'Edge UK' },
          { id: 'origin', x: 380, y: 90, w: 100, h: 40, label: 'Origin', sub: 'US East', color: '#8FA876' },
        ], edges: [
          { from: 'u1', to: 'e1', label: '5ms' }, { from: 'u2', to: 'e2', label: '8ms' },
          { from: 'e1', to: 'origin', label: 'miss only' }, { from: 'e2', to: 'origin', label: 'miss only' },
        ], caption: 'Edges serve cached responses fast; origin only sees misses' })}` },
      { title: 'Push vs Pull CDN', body: () => `
        ${compareTable({ headers: ['Approach', 'How', 'When'], rows: [
          ['Pull CDN', 'Fetches from origin on first request, caches with TTL', 'Default — works for most sites'],
          ['Push CDN', 'You upload content explicitly (e.g. S3 + CloudFront)', 'Static assets you control'],
        ] })}
        ${callout('TTLs are a trade-off. Long TTL = great cache hit ratio but stale content. Use cache-busting URLs (foo.css?v=abc123) when you ship.', 'insight')}` },
      { title: 'Anycast Routing', body: () => `
        <p>How does CDN traffic get to the nearest edge? <strong>Anycast.</strong> The same IP is announced from many locations via BGP. The internet routes packets to the topologically-closest one.</p>
        <p>This is what makes Cloudflare's <code>1.1.1.1</code> resolver feel local everywhere — ~300 datacenters all announcing the same IP.</p>
        ${quiz('Why does a CDN reduce load on your origin, not just latency?', '99% of requests are cache hits served from edge. Your origin only sees misses (first request per edge, or past-TTL).')}` }
    ],
    keyTerms: ['DNS hierarchy', 'TTL', 'CDN', 'Edge location', 'Origin', 'Pull vs push CDN', 'Anycast', 'BGP'],
    sources: ['Cloudflare Learning Center on DNS', 'Grokking SD Fundamentals — CDN', 'AWS CloudFront docs']
  },

  'load-balancers': {
    title: 'Load Balancers',
    subtitle: 'The traffic cop between users and your servers',
    duration: '20 min read', difficulty: 'Foundational',
    sections: [
      { title: 'What Problem They Solve', body: () => `
        <p>One server can handle ~10,000 concurrent connections before it crawls. Your app has 1,000,000 users. The math says you need many servers. Now: <strong>which server handles this user's request?</strong></p>
        ${archDiagram({ height: 220, nodes: [
          { id: 'u1', x: 50, y: 60, w: 70, h: 30, label: 'User', sub: 'A' },
          { id: 'u2', x: 50, y: 110, w: 70, h: 30, label: 'User', sub: 'B' },
          { id: 'u3', x: 50, y: 160, w: 70, h: 30, label: 'User', sub: 'C' },
          { id: 'lb', x: 230, y: 110, w: 100, h: 50, label: 'Load Balancer', sub: 'nginx / HAProxy' },
          { id: 'b1', x: 410, y: 60, w: 60, h: 30, label: 'app-1' },
          { id: 'b2', x: 410, y: 110, w: 60, h: 30, label: 'app-2' },
          { id: 'b3', x: 410, y: 160, w: 60, h: 30, label: 'app-3' },
        ], edges: [
          { from: 'u1', to: 'lb' }, { from: 'u2', to: 'lb' }, { from: 'u3', to: 'lb' },
          { from: 'lb', to: 'b1', color: '#7B9FB5' }, { from: 'lb', to: 'b2', color: '#7B9FB5' }, { from: 'lb', to: 'b3', color: '#7B9FB5' },
        ], caption: 'Users hit one address; the LB distributes work to many backends' })}
        <p><strong>Horizontal scale</strong> (add backends) and <strong>failure tolerance</strong> (one dies, LB routes around it).</p>` },
      { title: 'L4 vs L7', body: () => `
        ${compareTable({ headers: ['Trait', 'L4 (Transport)', 'L7 (Application)'], rows: [
          ['Sees', 'TCP/UDP connections, IPs, ports', 'HTTP — URL, headers, cookies, body'],
          ['Routing', 'Connection-only', 'Can route by path (/api → A, /static → B)'],
          ['Speed', 'Very fast, low CPU', 'Slower — must parse HTTP'],
          ['SSL termination', 'Pass-through', 'Common termination point'],
          ['Examples', 'AWS NLB, HAProxy TCP', 'nginx, AWS ALB, Cloudflare']
        ] })}
        ${callout('Modern systems use both: L4 in front for raw throughput, L7 behind for app-aware routing.', 'insight')}` },
      { title: 'Routing Algorithms', body: () => `
        <p><strong>Round Robin.</strong> Cycle through servers. Simple. Bad when requests have variable cost.</p>
        <p><strong>Least Connections.</strong> Pick the server with fewest active connections. Self-balancing for variable request sizes.</p>
        <p><strong>IP Hash.</strong> Hash the client's IP, route to one specific server. Sticky sessions.</p>
        ${quiz('Video chat with long-lived WebSockets. Round robin, least connections, or IP hash?', 'Least connections. Round robin would dump new users on the same server while existing ones hold connections.')}` },
      { title: 'Health Checks & Draining', body: () => `
        <p><strong>Active health checks</strong> probe each backend (GET /healthz). N failures → pulled.</p>
        <p><strong>Passive health checks</strong> watch real traffic. Too many 5xx → pulled.</p>
        <p><strong>Connection draining</strong> on deploy: LB stops new requests, lets existing ones finish before kill. Without it, deploys cause 500s.</p>` }
    ],
    keyTerms: ['L4 vs L7', 'Round robin', 'Least connections', 'IP hash', 'Sticky sessions', 'Health checks', 'Connection draining'],
    sources: ['NeetCode SD Course — Load Balancing', 'Grokking SD Fundamentals — Load Balancer', 'HAProxy and nginx documentation']
  },

  'databases-i': {
    title: 'Databases I — SQL vs NoSQL',
    subtitle: 'ACID, BASE, and when each model wins',
    duration: '22 min read', difficulty: 'Foundational',
    sections: [
      { title: 'The Big Split', body: () => `
        ${compareTable({ headers: ['Dimension', 'SQL (e.g. Postgres)', 'NoSQL (e.g. DynamoDB)'], rows: [
          ['Schema', 'Strict, enforced at write', 'Flexible, often per-record'],
          ['Joins', 'First-class, optimized', 'Avoid; denormalize instead'],
          ['Scaling', 'Vertical first (bigger box)', 'Horizontal first (more boxes)'],
          ['Consistency', 'Strong (ACID)', 'Often eventual (BASE)'],
          ['Best for', 'Complex queries, transactions, structured data', 'Massive scale, simple access, flexible shape']
        ] })}` },
      { title: 'ACID', body: () => `
        <p>The traditional database promise:</p>
        <p><strong>Atomicity.</strong> Transactions all-or-nothing. Transfer money: debit AND credit happen, or neither.</p>
        <p><strong>Consistency.</strong> Constraints hold across transactions.</p>
        <p><strong>Isolation.</strong> Concurrent transactions appear sequential.</p>
        <p><strong>Durability.</strong> Once committed, survives crash.</p>
        ${callout('"Strong consistency" in ACID-C is different from CAP-C. ACID-C = constraint integrity. CAP-C = reads see latest write across nodes. Easy interview confusion.', 'warning')}` },
      { title: 'BASE', body: () => `
        <p>The NoSQL counter-philosophy:</p>
        <p><strong>Basically Available.</strong> System keeps responding even if some nodes are down.</p>
        <p><strong>Soft state.</strong> Data may change without input.</p>
        <p><strong>Eventual consistency.</strong> Given no new writes, replicas eventually converge.</p>
        <p>The trade: availability and scale at the cost of "is this read 100% fresh?" Like-count off by seconds: fine. Bank balance off by seconds: lawsuit.</p>` },
      { title: 'NoSQL Types', body: () => `
        ${compareTable({ headers: ['Type', 'Example', 'When'], rows: [
          ['Key-Value', 'Redis, DynamoDB', 'Caches, session stores, simple lookups'],
          ['Document', 'MongoDB, Couchbase', 'Semi-structured docs, varying schemas'],
          ['Wide-column', 'Cassandra, ScyllaDB', 'Write-heavy time-series, IoT, massive scale'],
          ['Graph', 'Neo4j, Neptune', 'Social networks, fraud, recommendations'],
        ] })}
        ${quiz('You\'re building a banking system. SQL or NoSQL?', 'SQL. ACID transactions matter, schema is stable, you won\'t hit scale that breaks SQL.')}` }
    ],
    keyTerms: ['SQL', 'NoSQL', 'ACID', 'BASE', 'Eventual consistency', 'Key-value', 'Document', 'Wide-column', 'Graph DB'],
    sources: ['Designing Data-Intensive Applications by Martin Kleppmann', 'Grokking SD Fundamentals — Databases']
  },

  'caching': {
    title: 'Caching',
    subtitle: 'Trading memory for latency, the most powerful lever',
    duration: '22 min read', difficulty: 'Foundational',
    sections: [
      { title: 'The Core Idea', body: () => `
        <p>Cache = fast copy of slow data, close to where it's used. Disk ~10ms, cross-region ~100ms, DB ~10-100ms, memory <1µs.</p>
        ${archDiagram({ height: 180, nodes: [
          { id: 'app', x: 70, y: 90, w: 80, h: 40, label: 'App', sub: '1ms' },
          { id: 'cache', x: 240, y: 90, w: 90, h: 40, label: 'Redis', sub: '~1ms' },
          { id: 'db', x: 410, y: 90, w: 80, h: 40, label: 'DB', sub: '~20ms', color: '#8FA876' },
        ], edges: [
          { from: 'app', to: 'cache', label: 'try cache' }, { from: 'cache', to: 'db', label: 'miss → fetch' },
        ], caption: '90% of reads stop at the cache' })}` },
      { title: 'Write Strategies', body: () => `
        ${compareTable({ headers: ['Strategy', 'How', 'Trade-off'], rows: [
          ['Cache-aside', 'App writes DB. Cache updated on next read.', 'Simple. Stale reads after write.'],
          ['Write-through', 'App writes cache AND DB synchronously.', 'No stale reads. Slower writes.'],
          ['Write-behind', 'App writes cache. Cache writes DB async.', 'Fast. Risk of loss on crash.']
        ] })}
        ${callout('Default is cache-aside. Reach for write-through when correctness > write speed. Write-behind for analytics/metrics.', 'insight')}` },
      { title: 'Eviction', body: () => `
        <p><strong>LRU.</strong> Drop entry not accessed in longest. Default.</p>
        <p><strong>LFU.</strong> Drop fewest hits. Good for stable popular items.</p>
        <p><strong>TTL.</strong> Every entry expires regardless of access.</p>
        ${callout('Redis default eviction is "noeviction" — refuses writes when full. Switch to allkeys-lru.', 'warning')}` },
      { title: 'The Hard Problems', body: () => `
        <p><strong>Cache stampede.</strong> Popular key expires → 10K simultaneous misses → DB falls over. Fix: probabilistic early refresh, single-flight locks.</p>
        <p><strong>Cache penetration.</strong> Attackers request nonexistent keys. Fix: cache "not found" briefly.</p>
        <p><strong>Hot key.</strong> One key gets 90% of traffic. Fix: replicate, multi-tier (local cache).</p>
        ${quiz('You add a cache, latency drops 10x. A week later users complain profile changes don\'t show. Fix?', 'Cache-aside without invalidation on write. Profile update wrote DB but didn\'t invalidate cache. Fix: invalidate cache key on every write.')}` }
    ],
    keyTerms: ['Cache-aside', 'Write-through', 'LRU/LFU/TTL', 'Cache stampede', 'Hot key'],
    sources: ['NeetCode SD Course — Caching', 'Grokking SD Fundamentals — Caching']
  },

  'message-queues': {
    title: 'Message Queues',
    subtitle: 'Decoupling producers from consumers',
    duration: '22 min read', difficulty: 'Foundational',
    sections: [
      { title: 'Why Queue?', body: () => `
        <p>When service A calls B directly (sync HTTP), A waits for B and shares B's fate. A queue between them: A drops a message, queue holds it, B picks it up when it can. <strong>Decoupling, buffering, durability.</strong></p>
        ${archDiagram({ height: 180, nodes: [
          { id: 'p', x: 50, y: 90, w: 80, h: 40, label: 'Producer' },
          { id: 'q', x: 220, y: 90, w: 100, h: 40, label: 'Queue', sub: 'Kafka', color: '#F5B842' },
          { id: 'c1', x: 400, y: 50, w: 70, h: 30, label: 'Worker 1' },
          { id: 'c2', x: 400, y: 90, w: 70, h: 30, label: 'Worker 2' },
          { id: 'c3', x: 400, y: 130, w: 70, h: 30, label: 'Worker 3' },
        ], edges: [
          { from: 'p', to: 'q', label: 'publish' },
          { from: 'q', to: 'c1' }, { from: 'q', to: 'c2' }, { from: 'q', to: 'c3' },
        ], caption: 'Producer publishes once, queue fans out to consumers' })}` },
      { title: 'Queue vs Pub/Sub', body: () => `
        ${compareTable({ headers: ['Model', 'How', 'When'], rows: [
          ['Queue (point-to-point)', 'Each message → ONE worker', 'Task distribution'],
          ['Pub/Sub (topic)', 'Each message → EVERY subscriber', 'Event broadcasting'],
        ] })}
        ${callout('Kafka does both via consumer groups. Workers in same group share work (queue). Different groups all see all messages (pub/sub).', 'insight')}` },
      { title: 'Kafka vs RabbitMQ', body: () => `
        ${compareTable({ headers: ['Trait', 'Kafka', 'RabbitMQ'], rows: [
          ['Model', 'Log-based (append-only)', 'Queue-based (gone after ack)'],
          ['Replay', 'Yes — rewind to any offset', 'No'],
          ['Throughput', 'Very high (100K+ msg/sec)', 'High but lower'],
          ['Use', 'Event streaming, analytics, audit', 'Task queues, RPC, complex routing'],
        ] })}` },
      { title: 'Delivery Guarantees', body: () => `
        <p><strong>At-most-once.</strong> Fire and forget. May lose. (metrics, logs)</p>
        <p><strong>At-least-once.</strong> Retry until ack. May deliver twice. Default. Consumer must be idempotent.</p>
        <p><strong>Exactly-once.</strong> Hard. Kafka offers it within a topic via transactions.</p>
        ${quiz('Your worker processes payments from a queue. Why MUST it be idempotent?', 'At-least-once means the same message can arrive twice. If you charge the card both times, customer pays twice. Idempotency = dedup via idempotency-key.')}` }
    ],
    keyTerms: ['Producer', 'Consumer', 'Queue vs pub/sub', 'Consumer group', 'Partition', 'Offset', 'Idempotency', 'Dead letter queue'],
    sources: ['Kafka documentation', 'Grokking SD Fundamentals — Messaging Queues']
  },

  'databases-ii': {
    title: 'Databases II — Sharding & Replication',
    subtitle: 'How databases scale past one machine',
    duration: '25 min read', difficulty: 'Intermediate',
    sections: [
      { title: 'When One Box Stops Cutting It', body: () => `
        <p>Vertical scaling works until it doesn't. Eventually you hit storage (~100TB), memory (~1TB), or write throughput (~50K/sec) ceilings.</p>
        <p>Two orthogonal strategies. <strong>Replication</strong> copies same data to multiple nodes (read scale, fault tolerance). <strong>Sharding</strong> splits different data across nodes (write scale, capacity).</p>` },
      { title: 'Replication Topologies', body: () => `
        ${archDiagram({ height: 220, nodes: [
          { id: 'm', x: 240, y: 50, w: 100, h: 40, label: 'Primary', color: '#F5B842' },
          { id: 'r1', x: 100, y: 160, w: 80, h: 30, label: 'Replica 1', color: '#8FA876' },
          { id: 'r2', x: 240, y: 160, w: 80, h: 30, label: 'Replica 2', color: '#8FA876' },
          { id: 'r3', x: 380, y: 160, w: 80, h: 30, label: 'Replica 3', color: '#8FA876' },
        ], edges: [
          { from: 'm', to: 'r1', label: 'WAL' }, { from: 'm', to: 'r2', label: 'WAL' }, { from: 'm', to: 'r3', label: 'WAL' },
        ], caption: 'Primary-replica: writes to primary, reads anywhere' })}
        ${compareTable({ headers: ['Mode', 'How', 'Trade'], rows: [
          ['Primary-replica', 'One writer, many readers', 'Easy. Replica lag = stale reads.'],
          ['Multi-primary', 'Multiple writers, replicate', 'No write bottleneck. Conflicts hard.'],
          ['Synchronous', 'Wait for replicas before ack', 'Zero lag. Higher latency.'],
          ['Asynchronous', 'Ack first, replicate after', 'Fast. Can lose recent writes.'],
        ] })}` },
      { title: 'Sharding Strategies', body: () => `
        <p><strong>Range sharding.</strong> Split by key range. A-M shard 1, N-Z shard 2. Pro: range queries efficient. Con: hot ranges.</p>
        <p><strong>Hash sharding.</strong> Hash key, modulo by shard count. Pro: uniform. Con: re-hashing on resize.</p>
        <p><strong>Directory sharding.</strong> Lookup table maps key → shard. Pro: flexible. Con: directory bottleneck.</p>
        ${callout('Consistent hashing fixes the re-hash problem. Each shard owns a range on a hash ring. Adding a shard moves only 1/N of keys.', 'insight')}` },
      { title: 'CAP Implications', body: () => `
        <p>When nodes can't talk (partition), do you sacrifice <strong>Consistency</strong> (return stale data) or <strong>Availability</strong> (refuse to serve)?</p>
        ${quiz('Postgres primary fails. You promote a replica with 100ms lag. Problem?', 'Lost writes. Last 100ms of committed transactions not replicated are gone. Users saw "success" for purchases that no longer exist.')}` }
    ],
    keyTerms: ['Replication', 'Sharding', 'Range/hash/directory', 'Consistent hashing', 'Replica lag', 'WAL'],
    sources: ['Designing Data-Intensive Applications (Ch 5-6)', 'Grokking SD Fundamentals — Database Replication']
  },

  'cap-theorem': {
    title: 'CAP Theorem',
    subtitle: 'You can\'t have all three. Choose wisely.',
    duration: '15 min read', difficulty: 'Foundational',
    sections: [
      { title: 'The Theorem', body: () => `
        <p>In any distributed system, when a network partition happens, you must choose between <strong>C</strong>onsistency and <strong>A</strong>vailability. You can't have both.</p>
        ${archDiagram({ height: 180, nodes: [
          { id: 'c', x: 240, y: 50, w: 100, h: 40, label: 'Client' },
          { id: 'n1', x: 100, y: 150, w: 90, h: 40, label: 'Node 1', sub: 'partition' },
          { id: 'n2', x: 380, y: 150, w: 90, h: 40, label: 'Node 2', sub: 'partition', color: '#E07856' },
        ], edges: [
          { from: 'c', to: 'n1', label: 'write x=1' },
          { from: 'c', to: 'n2', label: 'read x?', color: '#E07856' },
        ], caption: 'Network split: return stale x (AP) or refuse (CP)?' })}
        <p>Partition (P) isn't a choice — it happens. The choice is between <strong>CP</strong> (refuse during partition) and <strong>AP</strong> (serve possibly stale).</p>` },
      { title: 'CP vs AP in Practice', body: () => `
        ${compareTable({ headers: ['System', 'Choice', 'Why'], rows: [
          ['HBase, MongoDB default', 'CP', 'Errors during partition; correctness first'],
          ['Cassandra, DynamoDB', 'AP', 'Always responds; may be stale'],
          ['ZooKeeper, etcd', 'CP', 'Coordination needs consistent answers'],
          ['Redis Cluster', 'AP (mostly)', 'Available even when split'],
        ] })}
        ${callout('Most NoSQL chose AP because web scale found slight staleness acceptable but downtime cost millions per minute.', 'info')}` },
      { title: 'PACELC — The Honest Extension', body: () => `
        <p>CAP only addresses partition case. PACELC: if Partition → A or C; <strong>Else → Latency or Consistency.</strong></p>
        <p>Cassandra is PA/EL. MongoDB is PC/EC.</p>
        ${quiz('E-commerce inventory across two warehouses. Network partitions. Both say "1 widget left." Two customers buy. CP vs AP?', 'CP refuses one (timeout). AP allows both → oversold. For inventory, CP is usually correct.')}` }
    ],
    keyTerms: ['CAP', 'Consistency', 'Availability', 'Partition tolerance', 'CP', 'AP', 'PACELC'],
    sources: ['Eric Brewer\'s CAP paper', 'Daniel Abadi PACELC', 'Designing Data-Intensive Applications (Ch 9)']
  },

  'url-shortener': {
    title: 'Design URL Shortener',
    subtitle: 'The gateway interview problem',
    duration: '30 min read', difficulty: 'Intermediate',
    sections: [
      { title: 'Requirements', body: () => `
        <h4 style="margin-top: 16px; margin-bottom: 8px; color: var(--text-primary);">Functional</h4>
        <ul>
          <li>Long URL in, short URL out (<code>short.io/aB3xY9</code>)</li>
          <li>Short URL → redirects to long URL</li>
          <li>Stretch: custom slugs, expiration, analytics</li>
        </ul>
        <h4 style="margin-top: 16px; margin-bottom: 8px; color: var(--text-primary);">Non-Functional</h4>
        <ul>
          <li><strong>Read-heavy.</strong> 100:1 click:create</li>
          <li><strong>Low latency.</strong> ~100ms</li>
          <li><strong>High availability.</strong> Multi-region</li>
          <li><strong>Eventual consistency OK</strong></li>
        </ul>` },
      { title: 'Capacity Estimation', body: () => `
        <p><strong>Writes:</strong> 100M/month = ~40/sec.</p>
        <p><strong>Reads:</strong> 100:1 = ~4K/sec average, 10K spike.</p>
        <p><strong>Storage:</strong> 100M × 12 × 5 = 6B URLs × 500B = ~3TB.</p>
        ${callout('Dominant constraint: read latency and availability. Cache aggressively.', 'insight')}` },
      { title: 'Key Generation', body: () => `
        <p><strong>Hash the URL.</strong> MD5, first 7 chars. Collisions need retry.</p>
        <p><strong>Counter + base62.</strong> Global counter, base62 encode. No collisions. 62⁷ = 3.5 trillion.</p>
        ${callout('Counter wins. Coordinate via Snowflake IDs or pre-allocated ranges (each server gets 10K IDs).', 'insight')}` },
      { title: 'Architecture', body: () => `
        ${archDiagram({ height: 280, nodes: [
          { id: 'usr', x: 50, y: 60, w: 70, h: 30, label: 'User' },
          { id: 'cdn', x: 170, y: 60, w: 80, h: 30, label: 'CDN' },
          { id: 'lb',  x: 300, y: 60, w: 80, h: 30, label: 'LB', color: '#7B9FB5' },
          { id: 'app', x: 430, y: 60, w: 80, h: 30, label: 'App', color: '#7B9FB5' },
          { id: 'cache', x: 250, y: 160, w: 100, h: 40, label: 'Redis', sub: 'hot' },
          { id: 'db', x: 400, y: 160, w: 100, h: 40, label: 'Postgres', color: '#8FA876' },
        ], edges: [
          { from: 'usr', to: 'cdn' }, { from: 'cdn', to: 'lb' }, { from: 'lb', to: 'app' },
          { from: 'app', to: 'cache' }, { from: 'cache', to: 'db' },
        ], caption: 'CDN → LB → App → Cache → DB' })}
        <p>99% of redirects stop at cache. Misses fall to Postgres replica, populate cache.</p>` },
      { title: 'Bottlenecks', body: () => `
        <p><strong>Hot URL</strong> (celebrity tweet): CDN cache + multi-tier + rate limit.</p>
        <p><strong>Counter coordination</strong>: Snowflake or ranges.</p>
        <p><strong>Replica lag</strong>: write-through cache, read from primary briefly.</p>
        ${quiz('Why HTTP 302 not 301?', '301 = permanent, browsers cache. Caching means no click counting and no future URL changes. 302 = temporary, browsers ask again.')}` }
    ],
    keyTerms: ['Base62', 'Counter vs hash', '301 vs 302', 'Read-heavy', 'Multi-tier cache', 'Snowflake'],
    sources: ['Grokking SD Interview — URL Shortener', 'NeetCode TinyURL', 'bit.ly architecture posts']
  },

  'pastebin': {
    title: 'Design Pastebin',
    subtitle: 'Storage-heavy variant — content lives somewhere else',
    duration: '20 min read', difficulty: 'Intermediate',
    sections: [
      { title: 'Different From URL Shortener', body: () => `
        <p>Looks similar (short URL → content) but content can be megabytes. <strong>Storage architecture is completely different.</strong> Use object storage for content, DB only for metadata.</p>
        ${archDiagram({ height: 240, nodes: [
          { id: 'usr', x: 50, y: 90, w: 70, h: 30, label: 'User' },
          { id: 'app', x: 170, y: 90, w: 80, h: 30, label: 'App', color: '#7B9FB5' },
          { id: 'db', x: 320, y: 50, w: 100, h: 40, label: 'Metadata DB', sub: 'tiny', color: '#8FA876' },
          { id: 's3', x: 320, y: 150, w: 100, h: 40, label: 'S3', sub: 'content blobs', color: '#F5B842' },
        ], edges: [
          { from: 'usr', to: 'app', label: 'create' },
          { from: 'app', to: 'db', label: 'meta' },
          { from: 'app', to: 's3', label: 'blob' },
        ], caption: 'Two stores: metadata in SQL, content in object storage' })}` },
      { title: 'Data Model', body: () => `
        ${compareTable({ headers: ['Field', 'Where', 'Why'], rows: [
          ['paste_id', 'DB', 'PK, becomes URL slug'],
          ['s3_key', 'DB', 'Pointer to S3'],
          ['language', 'DB', 'Syntax highlighting'],
          ['created_at, expires_at', 'DB', 'Time queries'],
          ['actual content', 'S3', 'Up to 1-10MB blobs'],
        ] })}` },
      { title: 'Expiration', body: () => `
        <p><strong>Lazy delete.</strong> On read, check expires_at. Past → 404, queue for delete. Simple but storage piles up.</p>
        <p><strong>Background sweep.</strong> Hourly cron deletes expired. Cleaner.</p>
        ${callout('S3 lifecycle policies. Tag with expiry, S3 auto-deletes. Zero cron.', 'insight')}
        ${quiz('Pastebin gets a 50MB request. Allow?', 'Reject. Hard limit at 1-10MB. 50MB is abuse (storing files as text). Costs scale linearly with size.')}` }
    ],
    keyTerms: ['Object storage', 'Metadata vs content', 'S3 lifecycle', 'Lazy delete'],
    sources: ['Grokking SD Interview — Pastebin', 'AWS S3 best practices']
  },

  'twitter': {
    title: 'Design Twitter',
    subtitle: 'Feed generation, fanout, the celebrity problem',
    duration: '35 min read', difficulty: 'Advanced',
    sections: [
      { title: 'Requirements', body: () => `
        <p><strong>Functional:</strong> post tweet, follow, home timeline, profile timeline.</p>
        <p><strong>Non-functional:</strong> billions of users, read-heavy, real-time updates.</p>
        <p>Core question: <strong>when you load your feed, who computes it?</strong></p>` },
      { title: 'Fanout-on-Write (Push)', body: () => `
        <p>When you tweet, write it into every follower's precomputed timeline. Read = fetch precomputed list.</p>
        ${archDiagram({ height: 220, nodes: [
          { id: 'u', x: 50, y: 100, w: 80, h: 40, label: 'You tweet' },
          { id: 'svc', x: 200, y: 100, w: 100, h: 40, label: 'Fanout', color: '#F5B842' },
          { id: 'f1', x: 370, y: 50, w: 90, h: 30, label: 'follower 1 feed' },
          { id: 'f2', x: 370, y: 100, w: 90, h: 30, label: 'follower 2 feed' },
          { id: 'f3', x: 370, y: 150, w: 90, h: 30, label: 'follower 3 feed' },
        ], edges: [
          { from: 'u', to: 'svc' }, { from: 'svc', to: 'f1' }, { from: 'svc', to: 'f2' }, { from: 'svc', to: 'f3' },
        ], caption: 'Tweet fans out to every follower\'s precomputed timeline' })}
        <p>Reads O(1). Writes O(followers) — expensive if many.</p>` },
      { title: 'Fanout-on-Read (Pull)', body: () => `
        <p>When you tweet, just write to your own timeline. Feed read: look up everyone you follow, fetch each, merge. Writes O(1). Reads O(following) — slow for users following thousands.</p>` },
      { title: 'The Celebrity Problem', body: () => `
        <p>Push: Taylor Swift tweets → 90M inboxes. Massive write. Pull: every follower's read queries her timeline. Massive read.</p>
        <p><strong>Hybrid.</strong> Push for most users. Pull for celebrities (>1M followers). Feed = precomputed UNION recent celeb tweets.</p>
        ${callout('Twitter does this. Celebrities flagged; tweets aren\'t fanned out, pulled on read.', 'insight')}
        ${quiz('Why isn\'t pure push viable at scale?', 'Average user 200 followers, fine. Celebrities have 100M. One tweet = 100M writes. Multiply by hundreds of celebs. Fanout workers never catch up.')}` }
    ],
    keyTerms: ['Fanout on write/read', 'Hybrid', 'Celebrity problem', 'Timeline', 'Materialized view'],
    sources: ['Grokking SD Interview — Twitter', 'Twitter Engineering Blog']
  },

  'youtube': {
    title: 'Design YouTube',
    subtitle: 'Video upload, encoding, global delivery',
    duration: '35 min read', difficulty: 'Advanced',
    sections: [
      { title: 'Three Pipelines', body: () => `
        ${archDiagram({ height: 240, nodes: [
          { id: 'u', x: 50, y: 50, w: 70, h: 30, label: 'Uploader' },
          { id: 'ing', x: 180, y: 50, w: 90, h: 30, label: 'Upload svc' },
          { id: 'enc', x: 320, y: 50, w: 90, h: 30, label: 'Encoder', sub: 'multi-bitrate', color: '#F5B842' },
          { id: 's3', x: 460, y: 50, w: 80, h: 30, label: 'Store', color: '#8FA876' },
          { id: 'meta', x: 320, y: 130, w: 90, h: 30, label: 'Metadata DB' },
          { id: 'cdn', x: 460, y: 130, w: 80, h: 30, label: 'CDN' },
          { id: 'view', x: 460, y: 200, w: 80, h: 30, label: 'Viewer' },
        ], edges: [
          { from: 'u', to: 'ing' }, { from: 'ing', to: 'enc' }, { from: 'enc', to: 's3' },
          { from: 'ing', to: 'meta' }, { from: 's3', to: 'cdn' }, { from: 'cdn', to: 'view' },
        ], caption: 'Upload → encode → store → CDN → viewer' })}` },
      { title: 'Multi-Bitrate Encoding', body: () => `
        <p>Same video, encoded at 144p, 240p, 360p, 480p, 720p, 1080p, 4K. Each in ~10s chunks. Player chooses bitrate based on bandwidth (HLS/DASH).</p>
        <p><strong>Adaptive Bitrate Streaming.</strong> Phone on 3G gets 240p, laptop on fiber gets 4K. Transparent.</p>
        ${callout('Encoding is most expensive. 10-min 4K = hours of compute. Use spot instances; encoding is interruptible.', 'insight')}` },
      { title: 'Storage + CDN', body: () => `
        <p>Raw chunks in cheap object storage. CDN caches popular at edge. 80/20 brutal: 80% of views are 20% of videos. Hot videos live in CDN entirely.</p>` },
      { title: 'Scale Tricks', body: () => `
        <p><strong>Resumable uploads.</strong> Chunk with resume tokens. Don't make users re-upload 2GB on dropped connection.</p>
        <p><strong>Cold storage tiering.</strong> No views in 90 days → cheaper slower storage.</p>
        ${quiz('Why encode multiple bitrates instead of one good one + client downscale?', 'Bandwidth. 3G user can\'t download 4K to display 240p. Multi-bitrate sends only what client uses.')}` }
    ],
    keyTerms: ['Adaptive bitrate', 'HLS', 'DASH', 'Multi-bitrate encoding', 'CDN tiering', 'Resumable upload'],
    sources: ['Grokking SD Interview — YouTube', 'YouTube Engineering Blog', 'Netflix Open Connect']
  },

  'uber': {
    title: 'Design Uber',
    subtitle: 'Real-time geo, matching, websockets',
    duration: '35 min read', difficulty: 'Advanced',
    sections: [
      { title: 'The Core Problem', body: () => `
        <p>Riders and drivers are moving objects on a map. System must: track drivers in real time, find drivers near a rider in <100ms, route the request, handle live trip, charge card. Millions of trips per day.</p>
        <p>Hard part: "find drivers near rider in 100ms." Naive: scan every driver. At 10M drivers, that's 10M ops per request. Won't work.</p>` },
      { title: 'Geo-Indexing', body: () => `
        <p><strong>Quadtree.</strong> Recursively divide map into 4 quadrants. Leaf nodes hold drivers. Search a region = traverse only relevant branches.</p>
        <p><strong>Geohash.</strong> Encode lat/lng into string where nearby locations share prefix. "dr5ru" = some area. Use prefix queries.</p>
        ${archDiagram({ height: 200, nodes: [
          { id: 'd1', x: 80, y: 80, w: 50, h: 30, label: 'D1' },
          { id: 'd2', x: 80, y: 130, w: 50, h: 30, label: 'D2' },
          { id: 'd3', x: 150, y: 80, w: 50, h: 30, label: 'D3' },
          { id: 'd4', x: 150, y: 130, w: 50, h: 30, label: 'D4' },
          { id: 'gh', x: 320, y: 100, w: 130, h: 40, label: 'Geohash Index', sub: '"dr5ru" → [D1,D2]' },
        ], edges: [
          { from: 'd1', to: 'gh' }, { from: 'd2', to: 'gh' }, { from: 'd3', to: 'gh' }, { from: 'd4', to: 'gh' },
        ], caption: 'Geohash bucket = quick "drivers in area" lookup' })}` },
      { title: 'Real-Time Location Updates', body: () => `
        <p>Driver app sends location every 4 sec. At 1M drivers, 250K writes/sec. Architecture: drivers → Kafka (partitioned by region) → Redis spatial index. Reads hit Redis directly. Periodic snapshot to durable storage.</p>` },
      { title: 'Matching + Trip Lifecycle', body: () => `
        <p>Rider requests → backend queries geohash for drivers within 2km → ranks by ETA + score → sends to top driver via websocket → driver accepts → both connected for live updates.</p>
        <p>Websocket mandatory. HTTP polling at this volume would melt servers.</p>
        ${quiz('Why not Postgres + PostGIS?', 'Latency. At 1M drivers × 4s updates, PostGIS adds disk I/O per write/read. Need in-memory (Redis or custom) with spatial structures.')}` }
    ],
    keyTerms: ['Quadtree', 'Geohash', 'Spatial index', 'Websocket', 'Real-time matching', 'Surge pricing'],
    sources: ['Grokking SD Interview — Uber', 'Uber Engineering Blog', 'H3 hexagonal grid']
  },

  'whatsapp': {
    title: 'Design WhatsApp',
    subtitle: 'Messaging at scale: websockets, delivery, E2EE',
    duration: '30 min read', difficulty: 'Advanced',
    sections: [
      { title: 'Requirements', body: () => `
        <p><strong>Functional:</strong> 1:1 chat, groups, online status, sent/delivered/read receipts, offline storage, media.</p>
        <p><strong>Non-functional:</strong> 2B+ users, billions msg/day, real-time, E2EE.</p>` },
      { title: 'Websockets, Not Polling', body: () => `
        <p>Active users hold persistent websocket to nearest gateway. Friend sends → gateway pushes to recipient's socket immediately.</p>
        ${archDiagram({ height: 200, nodes: [
          { id: 'a', x: 50, y: 90, w: 70, h: 30, label: 'Alice' },
          { id: 'gw1', x: 180, y: 90, w: 90, h: 30, label: 'Gateway', color: '#F5B842' },
          { id: 'route', x: 330, y: 90, w: 100, h: 30, label: 'Router' },
          { id: 'gw2', x: 480, y: 90, w: 60, h: 30, label: 'Gateway', color: '#F5B842' },
          { id: 'b', x: 580, y: 90, w: 60, h: 30, label: 'Bob' },
        ], edges: [
          { from: 'a', to: 'gw1', label: 'WS' }, { from: 'gw1', to: 'route' },
          { from: 'route', to: 'gw2' }, { from: 'gw2', to: 'b', label: 'WS' },
        ], caption: 'Alice → Alice\'s gateway → router → Bob\'s gateway → Bob (~50ms)' })}
        <p>Gateways stateful (hold connections). Routing layer maps user → which gateway.</p>` },
      { title: 'Delivery Guarantees', body: () => `
        <p><strong>Three states:</strong> sent, delivered, read. Offline recipient: server stores until next connection, with TTL.</p>
        <p><strong>Idempotency:</strong> each message has client UUID. Retries deduped server-side.</p>` },
      { title: 'End-to-End Encryption', body: () => `
        <p>Signal protocol. Each user has long-term identity key + rotating message keys. Server stores ciphertext only — even WhatsApp can't read.</p>
        <p>Groups: sender key distributed at join. Each message encrypted with sender key, decrypted by members.</p>
        ${callout('E2EE means server can\'t search message content. WhatsApp search is local-only on your phone.', 'info')}
        ${quiz('Bob offline 3 days. Alice sends 100. What happens?', 'Each shows "sent" (one check). Server queues. Bob comes online → delivered (double check). Bob opens chat → read receipts → blue.')}` }
    ],
    keyTerms: ['Websocket', 'Gateway servers', 'Delivery receipts', 'Signal protocol', 'E2EE', 'Sender keys'],
    sources: ['Grokking SD Interview — WhatsApp', 'WhatsApp Engineering', 'Signal Protocol docs']
  },

  'dropbox': {
    title: 'Design Dropbox',
    subtitle: 'File sync, chunking, conflict resolution',
    duration: '30 min read', difficulty: 'Advanced',
    sections: [
      { title: 'The Chunking Insight', body: () => `
        <p>Naive: upload entire file on every change. 1GB file edited 10 times = 10GB upload.</p>
        <p>Dropbox: <strong>chunk into 4MB blocks, hash each, only upload changed blocks.</strong> Edit one paragraph in 1GB file = upload 4MB.</p>
        ${archDiagram({ height: 220, nodes: [
          { id: 'f', x: 50, y: 100, w: 80, h: 40, label: 'File (1GB)' },
          { id: 'c', x: 180, y: 100, w: 80, h: 40, label: 'Chunker', sub: '4MB', color: '#F5B842' },
          { id: 'h', x: 310, y: 100, w: 100, h: 40, label: 'Block index', sub: 'hash → loc' },
          { id: 's', x: 460, y: 100, w: 80, h: 40, label: 'Object store', color: '#8FA876' },
        ], edges: [
          { from: 'f', to: 'c', label: 'split' }, { from: 'c', to: 'h', label: 'hash' }, { from: 'h', to: 's', label: 'new only' },
        ], caption: 'Files = lists of block hashes; only new blocks upload' })}` },
      { title: 'Block-Level Dedup', body: () => `
        <p>Hashing blocks means identical content stored once across users. 10 users upload same Linux ISO → stored once. Content-addressable storage.</p>
        ${callout('Privacy: two users uploading identical "secret.txt" share storage. For E2EE you trade dedup for privacy.', 'warning')}` },
      { title: 'Metadata vs Block Stores', body: () => `
        ${compareTable({ headers: ['Layer', 'What', 'Storage'], rows: [
          ['Metadata', 'Filename, owner, version, block hashes', 'SQL'],
          ['Blocks', 'Raw 4MB binaries by hash', 'Object store'],
          ['Notification', '"file X changed" to your devices', 'Pub/sub'],
        ] })}` },
      { title: 'Conflict Resolution', body: () => `
        <p>Two devices edit offline. Both push. Whose wins?</p>
        <p>Dropbox: <strong>both win.</strong> Loser becomes "filename (conflicted copy 2024-05-23).txt". Inelegant but no data loss.</p>
        ${quiz('Why upload changed blocks vs diffs?', 'Diffs require server to know original. With block-hashing, client computes "what changed" locally and uploads. No round-trip. Also enables cross-user dedup.')}` }
    ],
    keyTerms: ['Block chunking', 'Content-addressable', 'Dedup', 'Delta sync', 'Conflict resolution'],
    sources: ['Grokking SD Interview — Dropbox', 'Dropbox Engineering', 'Rsync algorithm']
  },

  'web-crawler': {
    title: 'Design Web Crawler',
    subtitle: 'Distributed BFS, politeness, dedup at scale',
    duration: '30 min read', difficulty: 'Advanced',
    sections: [
      { title: 'The Core Loop', body: () => `
        <p>A crawler is distributed BFS over the web graph. Pop URL, fetch, parse links, push back on queue, repeat.</p>
        ${archDiagram({ height: 220, nodes: [
          { id: 'q', x: 50, y: 100, w: 90, h: 40, label: 'URL Frontier', sub: 'queue', color: '#F5B842' },
          { id: 'w', x: 200, y: 100, w: 90, h: 40, label: 'Workers' },
          { id: 'p', x: 350, y: 50, w: 90, h: 40, label: 'Parser' },
          { id: 's', x: 350, y: 150, w: 90, h: 40, label: 'Storage', color: '#8FA876' },
          { id: 'd', x: 480, y: 100, w: 80, h: 30, label: 'Dedup', sub: 'bloom' },
        ], edges: [
          { from: 'q', to: 'w' }, { from: 'w', to: 'p' }, { from: 'w', to: 's' },
          { from: 'p', to: 'd' }, { from: 'd', to: 'q' },
        ], caption: 'Workers fetch, parse, dedup, push new URLs back' })}` },
      { title: 'Politeness', body: () => `
        <p><strong>robots.txt.</strong> Respect site's crawl rules.</p>
        <p><strong>Per-domain rate limit.</strong> Max 1 req/sec per domain. Frontier groups by domain.</p>
        <p><strong>User-agent honesty.</strong> Identify yourself, contact email.</p>` },
      { title: 'Dedup at Scale', body: () => `
        <p>URLs like <code>page?id=1&ref=home</code> and <code>page?ref=home&id=1</code> = same content. <strong>Canonicalize</strong> before dedup.</p>
        <p>Billions of URLs → exact dedup too expensive. Use <strong>bloom filter:</strong> no false negatives, small false positive rate.</p>
        ${callout('1B URLs in a bloom filter = ~1GB RAM at 1% false positive. Real hash set = ~50GB.', 'insight')}` },
      { title: 'Freshness', body: () => `
        <p>Web changes constantly. News: hourly. Wikipedia: daily. Personal blogs: weekly. Each URL gets adaptive re-crawl interval based on observed change rate.</p>
        ${quiz('Why BFS over DFS for crawling?', 'BFS gives breadth coverage; important pages linked from many places early. DFS gets stuck deep in low-value subtrees (calendar pages, archives).')}` }
    ],
    keyTerms: ['URL frontier', 'robots.txt', 'Politeness', 'Canonicalization', 'Bloom filter', 'Distributed BFS'],
    sources: ['Grokking SD Interview — Web Crawler', 'Mercator paper (1999)', 'Apache Nutch docs']
  },

  'news-feed': {
    title: 'Design Facebook News Feed',
    subtitle: 'Ranking, infinite scroll, real-time push',
    duration: '30 min read', difficulty: 'Advanced',
    sections: [
      { title: 'It\'s Not Chronological', body: () => `
        <p>Twitter (originally) showed reverse-chronological. Facebook: <strong>ranked feed.</strong> Order determined by a model predicting engagement.</p>
        <p>Feed isn't a list, it's a function. Every load can produce different order.</p>` },
      { title: 'Architecture', body: () => `
        ${archDiagram({ height: 220, nodes: [
          { id: 'usr', x: 50, y: 100, w: 70, h: 30, label: 'User' },
          { id: 'feed', x: 180, y: 100, w: 90, h: 40, label: 'Feed svc' },
          { id: 'cand', x: 330, y: 50, w: 100, h: 40, label: 'Candidates', sub: 'last 500' },
          { id: 'rank', x: 330, y: 150, w: 100, h: 40, label: 'Ranker', sub: 'ML', color: '#F5B842' },
          { id: 'cache', x: 480, y: 100, w: 80, h: 40, label: 'Top 50' },
        ], edges: [
          { from: 'usr', to: 'feed' }, { from: 'feed', to: 'cand' }, { from: 'cand', to: 'rank' },
          { from: 'rank', to: 'cache' }, { from: 'cache', to: 'feed' },
        ], caption: 'Two-stage: gather candidates → rank with ML → serve top N' })}` },
      { title: 'Push vs Pull (Revisit)', body: () => `
        <p>Like Twitter, hybrid. Most posts precomputed (push). Power users pulled. Plus ML ranking layer that re-orders both.</p>` },
      { title: 'Real-Time Updates', body: () => `
        <p><strong>Polling.</strong> Wasteful at scale.</p>
        <p><strong>Long polling.</strong> Better.</p>
        <p><strong>SSE / Websockets.</strong> Push as needed. Best for active users.</p>
        ${quiz('Why "10 new posts" banner instead of inserting?', 'UX. Inserting shifts content above your scroll position, breaks reading flow. Banner lets you opt in.')}` }
    ],
    keyTerms: ['Ranked feed', 'Candidate generation', 'ML ranking', 'Hybrid push-pull', 'SSE', 'Long polling'],
    sources: ['Grokking SD Interview — News Feed', 'Facebook Engineering on feed ranking']
  },

  'recommendation': {
    title: 'ML SD — Recommendation System',
    subtitle: 'Two-stage architecture, the ML platform staple',
    duration: '30 min read', difficulty: 'Advanced',
    sections: [
      { title: 'Why Two Stages', body: () => `
        <p>100M items × 1B users. Can't score every item against every user — 10^17 ops. Modern recommenders use <strong>two-stage architecture.</strong></p>
        ${archDiagram({ height: 200, nodes: [
          { id: 'usr', x: 50, y: 80, w: 70, h: 30, label: 'User' },
          { id: 'cg', x: 180, y: 80, w: 100, h: 40, label: 'Candidate Gen', sub: '100M → 1K', color: '#F5B842' },
          { id: 'rk', x: 330, y: 80, w: 100, h: 40, label: 'Ranker', sub: '1K → 10', color: '#7B9FB5' },
          { id: 'out', x: 480, y: 80, w: 80, h: 30, label: 'Top 10' },
        ], edges: [
          { from: 'usr', to: 'cg' }, { from: 'cg', to: 'rk' }, { from: 'rk', to: 'out' },
        ], caption: 'Stage 1: fast retrieval to ~1K. Stage 2: slow ML ranks to top 10' })}` },
      { title: 'Candidate Generation', body: () => `
        <p>Narrow 100M to ~1K fast. Need recall, not precision.</p>
        <p><strong>Collaborative filtering.</strong> "Users like you liked..." Matrix factorization, embeddings.</p>
        <p><strong>Content-based.</strong> "Items similar to ones you liked..." TF-IDF or item embeddings.</p>
        <p><strong>Two-tower neural.</strong> User and item → embeddings. Nearest neighbors = candidates. Modern, scales.</p>` },
      { title: 'Ranking', body: () => `
        <p>Of 1K candidates, predict which 10 user will engage with. GBDT historically (XGBoost). Now deep models with dense + sparse features.</p>
        ${callout('Ranking model offline-trained, online-served at ms latency. Feature store provides consistent features at train and serve time.', 'insight')}` },
      { title: 'Cold Start', body: () => `
        <p><strong>New user:</strong> globally popular items, onboarding questions, demographic priors.</p>
        <p><strong>New item:</strong> content features (title, category) until engagement accumulates.</p>
        ${quiz('Why embeddings over explicit feature engineering?', 'Embeddings learn what matters. Hand-engineered features cap at what humans think of. Embeddings discover patterns and generalize.')}` }
    ],
    keyTerms: ['Candidate generation', 'Ranking', 'Collaborative filtering', 'Two-tower', 'Embedding', 'Cold start', 'Feature store'],
    sources: ['Grokking ML SD', 'YouTube\'s "Deep Neural Networks for YouTube Recommendations" paper', 'Pinterest PinSage']
  },

  'search-ranking': {
    title: 'ML SD — Search Ranking',
    subtitle: 'Inverted indexes, BM25, learning to rank',
    duration: '30 min read', difficulty: 'Advanced',
    sections: [
      { title: 'The Inverted Index', body: () => `
        <p>"Documents containing word X" fast = precompute inverse: <strong>word → list of docs containing it.</strong></p>
        ${compareTable({ headers: ['Term', 'Posting list (doc IDs)'], rows: [
          ['rust', '[doc12, doc89, doc342, doc501]'],
          ['async', '[doc12, doc77, doc342]'],
          ['runtime', '[doc89, doc342, doc501]'],
        ] })}
        <p>Query "rust async runtime" intersects three lists. Doc342 in all three → top candidate.</p>` },
      { title: 'BM25 — The Classic Ranker', body: () => `
        <p>Workhorse for 30 years:</p>
        <p><strong>Term frequency</strong> — query term appearances in doc (diminishing returns).</p>
        <p><strong>Inverse document frequency</strong> — rare terms score higher.</p>
        <p><strong>Length normalization</strong> — shorter docs with the term score higher.</p>
        ${callout('Elasticsearch defaults to BM25. Good enough for 80% of search use cases without ML.', 'info')}` },
      { title: 'Neural Retrieval', body: () => `
        <p>Newer: train a model to embed queries and documents in same vector space. Search = nearest neighbors.</p>
        ${archDiagram({ height: 180, nodes: [
          { id: 'q', x: 50, y: 90, w: 80, h: 30, label: 'Query' },
          { id: 'qe', x: 180, y: 90, w: 90, h: 30, label: 'Query encoder', color: '#F5B842' },
          { id: 'idx', x: 330, y: 50, w: 100, h: 30, label: 'Doc embeddings', color: '#8FA876' },
          { id: 'ann', x: 330, y: 130, w: 100, h: 30, label: 'ANN search' },
          { id: 'r', x: 480, y: 90, w: 70, h: 30, label: 'Results' },
        ], edges: [
          { from: 'q', to: 'qe' }, { from: 'qe', to: 'ann' }, { from: 'idx', to: 'ann' }, { from: 'ann', to: 'r' },
        ], caption: 'Dense retrieval: query and docs share embedding space' })}
        <p>Better at synonyms and intent. Costs more compute. Hybrid combines BM25 + neural.</p>` },
      { title: 'Learning to Rank', body: () => `
        <p>Candidates from BM25/neural feed final ranker trained on click data. Features: relevance scores, CTR history, quality signals, personalization.</p>
        ${quiz('Why not rank everything with neural from the start?', 'Cost. Running neural on every doc in your index per query = too expensive. Retrieval narrows to ~100 fast, then expensive model ranks.')}` }
    ],
    keyTerms: ['Inverted index', 'BM25', 'TF-IDF', 'Dense retrieval', 'Two-tower', 'ANN', 'Learning to rank'],
    sources: ['Grokking ML SD', 'Elasticsearch internals', '"Neural IR" by Mitra & Craswell']
  },

  'mock-week': {
    title: 'Mock Interview Week',
    subtitle: 'How to actually do SD interviews under time pressure',
    duration: '20 min read', difficulty: 'Practice',
    sections: [
      { title: 'The RESHADED Framework', body: () => `
        <p>45-min SD interviews are stressful because no structure. RESHADED keeps you on rails.</p>
        ${compareTable({ headers: ['Letter', 'Stands for', 'Spend'], rows: [
          ['R', 'Requirements (functional + non-functional)', '5 min'],
          ['E', 'Estimation (QPS, storage, bandwidth)', '3 min'],
          ['S', 'System APIs', '3 min'],
          ['H', 'High-level architecture (blocks + arrows)', '7 min'],
          ['A', 'API/data layer details', '5 min'],
          ['D', 'Data model', '5 min'],
          ['E', 'Evaluation: bottlenecks, scale', '7 min'],
          ['D', 'Deep dives where interviewer steers', '10 min'],
        ] })}` },
      { title: 'What Interviewers Grade', body: () => `
        <p><strong>1. Communication.</strong> Thinking out loud, acknowledging trade-offs, asking clarifying questions, diagrams matching what you say.</p>
        <p><strong>2. Trade-off awareness.</strong> Every choice has costs. "I\'d use SQL because consistency matters more than write scale" beats "I\'d use SQL."</p>
        <p><strong>3. Depth in the right places.</strong> Interviewer pushes on one area. Be ready to go deep on caching, sharding, consistency.</p>` },
      { title: 'Common Patterns', body: () => `
        ${compareTable({ headers: ['Problem family', 'Default pattern'], rows: [
          ['URL-style', 'Read-heavy, cache, base62'],
          ['Storage-heavy (paste, file)', 'Metadata DB + object store'],
          ['Feed (Twitter, FB)', 'Fanout strategy, hybrid push-pull'],
          ['Real-time (chat, Uber)', 'Websockets, spatial index'],
          ['Search', 'Inverted index, two-stage rank'],
          ['Recommendation', 'Two-stage retrieval + rank'],
          ['Video', 'Multi-bitrate, CDN, chunked'],
        ] })}` },
      { title: 'Practice Plan', body: () => `
        <p>Last week of runway. Three mocks minimum:</p>
        <ol>
          <li><strong>Solo timed.</strong> 45 min URL shortener. Paper. Talk out loud. Record.</li>
          <li><strong>With a peer.</strong> Pramp or Discord. 45 min each way.</li>
          <li><strong>Re-do.</strong> Pick the worst. Redo knowing what you missed.</li>
        </ol>
        ${callout('Don\'t obsess over the "right" answer. There isn\'t one. They grade your process.', 'insight')}
        ${quiz('30 min in, haven\'t talked about scaling. What now?', 'Don\'t panic. Say: "Before more components, let me address scale." Cover caching, sharding, replication, monitoring. Showing you THINK about scale is what they want.')}` }
    ],
    keyTerms: ['RESHADED', 'Functional vs non-functional', 'Back-of-envelope', 'Bottleneck analysis', 'Trade-off articulation'],
    sources: ['Grokking SD Interview methodology', 'Alex Xu, "System Design Interview" Vol 1 & 2', 'Pramp.com']
  },

};
