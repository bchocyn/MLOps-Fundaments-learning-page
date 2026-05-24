// ============================================================
// CURRICULUM — 20-week MLOps runway
// Source of truth for the daily/weekly tracker.
// Each week: phase, title, blockA, blockB, project, sd (system design)
// blockA/blockB have a brief with insight, why, terms, resource, test, doneWhen
// ============================================================

export const PHASES = {
  'DevOps Fundamentals': { color: '#F5B842', code: 'devops' },
  'MLOps Bridge':        { color: '#E07856', code: 'mlops' },
  'UPenn Semester':      { color: '#8FA876', code: 'upenn' },
};

export const MILESTONES = {
  1:  { label: 'START',     desc: 'May 21, 2026 — runway begins' },
  9:  { label: 'ML BRIDGE', desc: 'DevOps foundation → MLOps' },
  14: { label: 'UPENN',     desc: 'Grad school begins, MLOps goes light' },
  20: { label: 'CAPSTONE',  desc: 'Portfolio piece shipped' },
};

export const START_DATE = new Date('2026-05-21T00:00:00');

export const CURRICULUM = [
  {
    num: 1, phase: 'DevOps Fundamentals', title: 'Linux & Bash',
    blockA: {
      task: 'Write a Bash script daily — process monitor, log parser, service health checker',
      brief: {
        insight: 'Bash literacy comes from writing, not reading. You will not learn it from a book. You will learn it from the third time you debug why your loop ate a variable name.',
        why: 'Every alert you get in DevSecOps starts with "is the service running?" If you can answer that with a 20-line script in five minutes, you save an hour of guessing.',
        terms: ['set -euo pipefail', 'parameter expansion', 'command substitution', 'exit codes', '[[ ]] vs [ ]', 'heredocs', 'trap'],
        resource: "Greg's Wiki (mywiki.wooledge.org/BashGuide). ShellCheck.net — paste your script, get gotchas highlighted.",
        test: ['What does set -euo pipefail actually do, line by line?', 'Why is [ $x = "y" ] dangerous and what fixes it?', 'How do you make sure your script exits cleanly if killed mid-run?'],
        doneWhen: 'Three working scripts, each under 50 lines, each with error handling. Pass ShellCheck.'
      }
    },
    blockB: {
      task: 'Man pages, stdin/stdout/stderr flow, systemd unit files',
      brief: {
        insight: 'In Linux everything is a file, including I/O streams. stdin/stdout/stderr are file descriptors 0/1/2. Redirect them with > < | and you can pipe anything to anything. systemd is just init replaced with a smarter manager that watches for crashes and restarts you.',
        why: 'Ninety percent of "why is my service down" answers involve one of: stuck process, full disk, broken pipe, or systemd unit misconfiguration. This is the literacy that turns guessing into debugging.',
        terms: ['file descriptor', 'redirection (> < >> 2>&1 &>)', 'pipes', 'exit codes', 'signals (SIGTERM, SIGKILL, SIGHUP)', 'systemd unit file', 'journalctl'],
        resource: 'man bash (REDIRECTION section). man 7 signal. man systemd.service. Julia Evans zines.',
        test: ['Difference between 2>&1 and &>?', 'Why is kill -9 considered rude?', 'How do you auto-restart a systemd service on failure?']
      }
    },
    project: 'Service health checker script that emails on failure',
    sd: {
      topicId: 'networking-fundamentals',
      topic: 'Networking Fundamentals — IP, TCP/UDP, HTTP/HTTPS, OSI model',
      source: 'NeetCode SD Course · Grokking SD Fundamentals',
    },
    dsa: { patternId: 'arrays-hashing', topic: 'Arrays & Hashing — the foundation pattern' }
  },
  {
    num: 2, phase: 'DevOps Fundamentals', title: 'Linux Deep Dive',
    blockA: {
      task: 'Build a small CLI tool in Bash with proper error handling',
      brief: {
        insight: 'A good CLI tool feels obvious to use and impossible to misuse. Flags have help text. Errors are clear. Exit codes are honest. Bash can do all of this with getopts and discipline.',
        why: 'The "small tools" you write at SAIC become other people\'s muscle memory. A polished one earns trust. A janky one gets replaced.',
        terms: ['getopts', 'long flags', 'heredocs for help text', 'trap signal handlers', 'idempotent operations'],
        resource: 'man getopts. "Bash Cookbook" by Albing & Vossen.',
        test: ['Why is getopts safer than parsing $1, $2 manually?', 'How does trap let you clean up on Ctrl+C?', 'What exit code conventions do well-behaved CLIs follow?'],
        doneWhen: 'One CLI tool with --help, --verbose, --dry-run, returns proper exit codes.'
      }
    },
    blockB: {
      task: 'Process lifecycle, signals, file descriptors — diagram the crash flow',
      brief: {
        insight: 'A process is born via fork(), customized via exec(), runs until it exits or receives an uncaught signal. Parent must wait() on children or you get zombies. Signals are async interrupts — handle them or they kill you.',
        why: 'Every container, daemon, and CI runner is a process tree. Understanding the lifecycle is understanding why things hang, leak, or won\'t die. This is the foundation under containerization.',
        terms: ['fork / exec / wait', 'PID / PPID', 'zombie process', 'orphan process', 'SIGTERM vs SIGKILL', 'SIGCHLD', 'file descriptor leak'],
        resource: 'man 2 fork. man 2 execve. man 7 signal. Julia Evans process zines.',
        test: ['Why can\'t you catch SIGKILL?', 'What creates a zombie process?', 'What\'s an FD leak and how do you find one?']
      }
    },
    project: 'Diagram + 90-second explanation of "what happens when a Linux process crashes"',
    sd: { topicId: 'dns-cdn', topic: 'DNS & CDNs — resolution chain, edge caching', source: 'Grokking SD Fundamentals' },
    dsa: { patternId: 'arrays-hashing', topic: 'Arrays & Hashing — continue practice' }
  },
  {
    num: 3, phase: 'DevOps Fundamentals', title: 'Networking I',
    blockA: {
      task: 'Set up local nginx reverse proxy with two upstream servers',
      brief: {
        insight: 'A reverse proxy is the front door of every modern web stack. nginx is good at it because its config is declarative — you describe the topology, not the algorithm.',
        why: 'Every K8s Ingress, every CDN edge, every API gateway is ultimately doing what nginx does. Master the config and the abstractions become readable.',
        terms: ['upstream blocks', 'proxy_pass', 'X-Forwarded-For', 'keepalive', 'proxy_buffering'],
        resource: 'nginx.com beginner\'s guide.',
        test: ['Why does nginx need X-Forwarded-For when proxying?', 'What does keepalive between nginx and upstream actually save?', 'When does proxy_buffering hurt you?'],
        doneWhen: 'curl through the LB hits backend1 and backend2 alternately. Headers show which backend served the request.'
      }
    },
    blockB: {
      task: 'TCP handshake, DNS resolution, HTTP lifecycle — draw it',
      brief: {
        insight: 'Drawing the full HTTP lifecycle from address bar to byte-on-wire forces you to confront what you actually know. Make it a 90-second story you can tell on a whiteboard.',
        why: 'Interviewers literally ask "what happens when you type a URL." If you can\'t draw it, you can\'t claim to know how the web works.',
        terms: ['DNS resolution', 'TCP 3-way handshake', 'TLS handshake', 'HTTP request', 'TCP teardown', 'connection reuse'],
        resource: 'GitHub repo "what-happens-when". "High Performance Browser Networking" by Ilya Grigorik (free online).',
        test: ['Where does the TLS handshake happen in the timeline?', 'What does HTTP/2 keep-alive save over HTTP/1.1?', 'Why are subsequent requests to the same host faster?']
      }
    },
    project: 'Draw full HTTP request lifecycle from browser to server in under 2 min',
    sd: { topicId: 'load-balancers', topic: 'Load Balancers — L4 vs L7, algorithms', source: 'Grokking SD Fundamentals · NeetCode' },
    dsa: { patternId: 'two-pointers', topic: 'Two Pointers — the search pattern' }
  },
  {
    num: 4, phase: 'DevOps Fundamentals', title: 'Networking II',
    blockA: {
      task: 'tcpdump or Wireshark capture on your reverse proxy',
      brief: {
        insight: 'tcpdump and Wireshark show what actually happened on the wire — not what your app thinks happened. When docs say one thing and behavior says another, the pcap is the tiebreaker.',
        why: 'Once you can read a pcap, you stop being scared of network bugs. "Is the request reaching the server?" becomes a 30-second answer.',
        terms: ['pcap', 'BPF filter syntax', 'TLS handshake messages', 'TCP retransmissions', 'window scaling'],
        resource: 'tcpdump.org examples. Wireshark display filters reference.',
        test: ['Filter for only TLS ClientHello messages — what command?', 'How do you tell a TCP retransmission from a duplicate?', 'What does window scaling mean and why does it matter?'],
        doneWhen: 'Annotated pcap showing SYN → SYN-ACK → ACK → ClientHello → ServerHello with each step explained.'
      }
    },
    blockB: {
      task: 'TLS termination, load balancing strategies, subnetting basics',
      brief: {
        insight: 'TLS is not "add an s to http." It is an asymmetric handshake establishing a symmetric session key, then encrypting everything after. Termination is where TLS unwraps — usually your LB, not your app.',
        why: 'TLS termination location is a constant source of bugs: HTTP between LB and app, certificate mismatches, SNI failures. Knowing where the encryption boundary is fixes them.',
        terms: ['TLS handshake', 'ClientHello / ServerHello', 'cipher suites', 'SNI', 'certificate chain', 'mutual TLS (mTLS)', 'perfect forward secrecy'],
        resource: 'Cloudflare Learning Center on TLS. "Bulletproof SSL and TLS" by Ivan Ristic (Ch 1-3 free).',
        test: ['Why does TLS need both asymmetric AND symmetric crypto?', 'What is SNI and why is it needed?', 'When would you use mTLS over regular TLS?']
      }
    },
    project: 'Annotated tcpdump trace of a TLS handshake',
    sd: { topicId: 'databases-i', topic: 'Databases I — SQL vs NoSQL, ACID, BASE', source: 'NeetCode SD · Grokking DB' },
    dsa: { patternId: 'two-pointers', topic: 'Two Pointers — more practice' }
  },
  {
    num: 5, phase: 'DevOps Fundamentals', title: 'Docker Internals',
    blockA: {
      task: 'Multi-stage Dockerfile, rootless container, Trivy scan',
      brief: {
        insight: 'A good production Dockerfile separates the toolchain from the runtime. Build stage has gcc, npm, the universe. Final stage has the binary and nothing else. Smaller image = faster pull = lower attack surface.',
        why: 'Your DevSecOps work cares about both speed and security. Multi-stage builds + scanning + rootless gives you all three.',
        terms: ['FROM ... AS stage', 'COPY --from=stage', 'USER directive', '.dockerignore', 'layer caching', 'distroless'],
        resource: 'Docker "best practices" docs. Trivy GitHub README. Snyk Dockerfile cheat sheet.',
        test: ['Why is order of COPY/RUN in a Dockerfile crucial for cache?', 'Why is running as root in a container risky if containers are isolated?', 'Distroless vs Alpine vs Ubuntu — when does each win?'],
        doneWhen: 'Image under 100MB for a small app. Runs as non-root. Trivy passes with zero HIGH/CRITICAL CVEs.'
      }
    },
    blockB: {
      task: 'Namespaces, cgroups, image layers, container escape conceptually',
      brief: {
        insight: 'Containers are not VMs. They are processes with restricted views. Linux namespaces give isolation, cgroups give resource limits. Same kernel, different views.',
        why: 'When you can explain THIS, you can explain why containers start fast, why escapes are possible, and why "Docker is lightweight" actually means something specific.',
        terms: ['Namespaces (PID, NET, MNT, UTS, IPC, USER)', 'cgroups', 'OCI runtime', 'OverlayFS', 'PID 1 problem', 'capabilities'],
        resource: 'Julia Evans "Containers are just processes". Liz Rice "Container from Scratch in Go" talk on YouTube — gold standard.',
        test: ['Name 3 of the 6 Linux namespaces.', 'Why does kill in a container only kill that container?', 'What is the PID 1 problem and how does tini solve it?']
      }
    },
    project: 'Minimal hardened container with passing Trivy scan',
    sd: { topicId: 'caching', topic: 'Caching — Redis, strategies, eviction', source: 'Grokking SD Fundamentals' },
    dsa: { patternId: 'sliding-window', topic: 'Sliding Window — the optimization pattern' }
  },
  {
    num: 6, phase: 'DevOps Fundamentals', title: 'CI/CD Patterns',
    blockA: {
      task: 'GitHub Actions: lint → test → build → deploy + manual gate + rollback',
      brief: {
        insight: 'A real pipeline is a directed graph of jobs with gates between them. Linting before tests saves CI minutes. Approval gates before prod save your weekend. Rollback as a first-class job saves your year.',
        why: 'Your Azure DevOps work translates directly. GitHub Actions has different YAML but same patterns — and FAANG-adjacent companies almost all use GitHub Actions.',
        terms: ['workflow events', 'jobs vs steps', 'environments + approval', 'matrix builds', 'caching', 'OIDC for cloud auth', 'reusable workflows'],
        resource: 'GitHub Actions "learn" docs. "GitHub Actions in Action" (Manning) for depth.',
        test: ['Why use OIDC instead of stored AWS keys?', 'When matrix vs separate jobs?', 'What do "environments" buy you that "if" conditions don\'t?'],
        doneWhen: 'Push triggers full pipeline. Manual approval for deploy. One-button rollback works.'
      }
    },
    blockB: {
      task: 'GitOps vs push CI/CD, trunk-based dev, blue/green, canary',
      brief: {
        insight: 'GitOps inverts the CI/CD arrow. Instead of CI pushing to prod, prod pulls from Git. Your repo IS your deployment state. Drift detection becomes possible because deviation from Git equals drift.',
        why: 'ArgoCD and Flux are not "another CI tool" — a fundamentally different model. Knowing both lets you pick the right one. This is platform engineering thinking.',
        terms: ['Push vs pull CI/CD', 'Declarative config', 'Drift detection', 'ArgoCD', 'Flux', 'Blue/green', 'Canary', 'Feature flags', 'Progressive delivery'],
        resource: 'Weaveworks "GitOps Guide" PDF. OpenGitOps principles.',
        test: ['When does GitOps fail or feel wrong?', 'Why is rollback easy in GitOps?', 'Blue/green vs canary — when does each win?']
      }
    },
    project: 'Working pipeline with rollback in a public repo',
    sd: { topicId: 'message-queues', topic: 'Message Queues — Kafka, RabbitMQ, pub/sub', source: 'NeetCode SD · Grokking' },
    dsa: { patternId: 'sliding-window', topic: 'Sliding Window — more practice' }
  },
  {
    num: 7, phase: 'DevOps Fundamentals', title: 'Kubernetes I',
    blockA: {
      task: 'Multi-service deploy with Ingress, HPA, PDB, resource limits',
      brief: {
        insight: 'Production K8s is not "kubectl apply deployment.yaml." It is requests so the scheduler can pack you, limits so neighbors can\'t crush you, HPA so you scale, and PDB so deploys don\'t kill your last replica.',
        why: 'Your on-prem K8s work plus these primitives equals a portfolio piece. Knowing the production checklist separates "deployed K8s" from "ran K8s in production."',
        terms: ['Deployment vs StatefulSet vs DaemonSet', 'Service types', 'Ingress', 'HPA', 'PDB', 'requests vs limits', 'namespaces', 'resource quotas'],
        resource: 'Kubernetes.io concepts docs (the official ones are great). "Kubernetes the Hard Way" by Kelsey Hightower.',
        test: ['Why requests for scheduling, limits for runtime?', 'When does a StatefulSet beat a Deployment?', 'HPA vs VPA?'],
        doneWhen: 'App reachable via Ingress, scales when load-tested, survives a kubectl drain of one node.'
      }
    },
    blockB: {
      task: 'Scheduler internals, etcd role, control plane flow',
      brief: {
        insight: 'kubectl apply doesn\'t create a pod. It writes to etcd. Controller manager notices, makes a Deployment. Scheduler picks a node. Kubelet runs the container. This async chain is why "stuck in Pending" has 5 causes.',
        why: 'Every K8s debugging story is "where did the chain break?" Knowing the chain means knowing where to look.',
        terms: ['Control plane', 'kubelet', 'kube-proxy', 'reconciliation loop', 'desired vs actual state', 'CRDs', 'operators'],
        resource: '"Kubernetes the Hard Way" (Kelsey Hightower, free on GitHub).',
        test: ['What 4 components are involved between kubectl apply and a running pod?', 'Why is K8s called "declarative"?', 'What does the kubelet do that the scheduler doesn\'t?']
      }
    },
    project: 'Annotated diagram of pod lifecycle from kubectl apply to running',
    sd: { topicId: 'databases-ii', topic: 'Databases II — Sharding, replication, partitioning', source: 'Grokking SD' },
    dsa: { patternId: 'stack', topic: 'Stack — the LIFO pattern' }
  },
  {
    num: 8, phase: 'DevOps Fundamentals', title: 'Kubernetes II',
    blockA: {
      task: 'Break your cluster deliberately and debug it',
      brief: {
        insight: 'You learn K8s debugging by breaking things on purpose, predicting failure modes, then watching reality match (or not match) your prediction. The gap is your knowledge gap.',
        why: 'Production K8s issues are inherently chaotic. Practicing on intentional failures means real failures feel familiar.',
        terms: ['kubectl describe pod', 'kubectl logs --previous', 'CrashLoopBackOff', 'ImagePullBackOff', 'OOMKilled', 'kubectl events --sort-by'],
        resource: 'K8s docs "Troubleshooting" section.',
        test: ['Pod is Pending — what 5 things to check first?', 'CrashLoopBackOff — where do you look?', 'OOMKilled — too low limit, memory leak, or both?'],
        doneWhen: 'Incident response writeup of 3 self-inflicted outages with root cause + fix.'
      }
    },
    blockB: {
      task: 'CNI, Services, Ingress controllers, NetworkPolicies',
      brief: {
        insight: 'K8s networking is 5 layers: pod-to-pod (CNI), pod-to-service (kube-proxy), service-to-pod (Endpoints), external-to-service (Ingress), and the underlying node network. NetworkPolicies are firewall rules at the pod level.',
        why: 'When you can map the actual packet path, you debug "why can\'t A reach B" instead of restarting random things.',
        terms: ['CNI', 'pod CIDR', 'ClusterIP / NodePort / LoadBalancer', 'Endpoints', 'Ingress vs Gateway API', 'NetworkPolicy', 'kube-proxy modes'],
        resource: 'Calico "Kubernetes networking 101". learnk8s.io networking deep dive.',
        test: ['Trace a packet from pod A in node 1 to pod B in node 2.', 'What does an Ingress controller actually do?', 'When would you reach for a NetworkPolicy?']
      }
    },
    project: 'Incident response writeup of a self-inflicted K8s outage',
    sd: { topicId: 'cap-theorem', topic: 'CAP Theorem & Consistency — strong vs eventual', source: 'NeetCode SD · Grokking' },
    dsa: { patternId: 'binary-search', topic: 'Binary Search — the O(log n) pattern' }
  },
  {
    num: 9, phase: 'MLOps Bridge', title: 'ML Fundamentals',
    blockA: {
      task: 'fast.ai Lesson 1 — get a model running, no theory rabbit holes',
      brief: {
        insight: 'Don\'t try to understand everything. Just get the training loop running and watch the numbers change. Theory clicks faster when you have a running thing to point at.',
        why: 'Your engineering brain wants to understand the whole stack first. Fight that instinct here. Get something running, then learn why.',
        terms: ['Dataset', 'DataLoader', 'Model', 'Loss function', 'Optimizer', 'Train/val split', 'Epoch'],
        resource: 'fast.ai Lesson 1 video + Ch 1 of the free book. 3blue1brown\'s "But what IS a neural network" series.',
        test: ['What does the optimizer actually update?', 'Why do we split into train and val sets?', 'What does one epoch consist of?'],
        doneWhen: 'A trained classifier with accuracy printed to console, weights saved to disk.'
      }
    },
    blockB: {
      task: 'What is a training loop, what does it produce, why track it',
      brief: {
        insight: 'A training loop is just: forward pass (predict), compute loss (how wrong), backward pass (compute gradients), step optimizer (update weights). Repeat for batches. Track metrics. The rest is decoration.',
        why: 'When ML demystifies into "a loop that minimizes a function," you stop being intimidated. The infra around it is normal SWE problems applied to ML.',
        terms: ['Forward / backward pass', 'Gradient descent', 'Loss function', 'Optimizer (SGD, Adam)', 'Epoch vs batch vs step', 'Overfitting', 'Regularization'],
        resource: 'fast.ai book Ch 1-2. 3blue1brown YouTube series.',
        test: ['Difference between epoch and step?', 'Why train/val/test, not just train/val?', 'What does the optimizer actually do mathematically?']
      }
    },
    project: 'One working classifier you understand end-to-end',
    sd: { topicId: 'url-shortener', topic: 'Design URL Shortener — gateway problem', source: 'Grokking SD Interview' },
    dsa: { patternId: 'linked-list', topic: 'Linked List — the pointer pattern' }
  },
  {
    num: 10, phase: 'MLOps Bridge', title: 'scikit-learn + MLFlow',
    blockA: {
      task: 'Train 3 models, log every run to MLFlow',
      brief: {
        insight: 'sklearn is your training framework, MLFlow is your experiment tracker. Two libraries, two roles. Don\'t conflate them.',
        why: 'Three models side by side, with all params and metrics logged — that\'s what a real ML team\'s workflow looks like.',
        terms: ['sklearn Pipeline', 'mlflow.start_run()', 'log_params / log_metrics / log_artifact', 'Model registry'],
        resource: 'MLFlow official quickstart. sklearn user guide on pipelines.',
        test: ['Why log params and metrics separately?', 'What goes in an "artifact" that\'s not a metric?', 'When does the model registry add value?'],
        doneWhen: 'MLFlow UI shows 3 runs side-by-side with accuracy and downloadable models.'
      }
    },
    blockB: {
      task: 'Map MLFlow concepts to DevOps: registry=artifact store, run=build',
      brief: {
        insight: 'MLFlow concepts map 1:1 to DevOps. Experiment = repo. Run = build. Params = build args. Artifacts = build outputs. Model registry = container registry.',
        why: 'The MLOps world has invented new names for old patterns. Translating to your DevOps vocab cuts the learning curve in half.',
        terms: ['Experiment', 'Run', 'Param', 'Metric', 'Artifact', 'Model registry', 'Model stage'],
        resource: 'MLFlow concepts docs. Made-With-ML GitHub repo by goku-mohandas.',
        test: ['Where does MLFlow store metrics — DB or files?', 'Difference between an experiment and a run?', 'How to promote model from Staging to Production?']
      }
    },
    project: 'MLFlow UI comparing 3+ runs with different hyperparameters',
    sd: { topicId: 'pastebin', topic: 'Design Pastebin — storage-heavy variant', source: 'Grokking SD Interview' },
    dsa: { patternId: 'linked-list', topic: 'Linked List — more practice' }
  },
  {
    num: 11, phase: 'MLOps Bridge', title: 'DVC',
    blockA: {
      task: 'Add DVC to mlops-lab repo, version data in S3',
      brief: {
        insight: 'DVC is Git for big files plus a pipeline runner. The "git for data" part stores tiny pointers in Git, actual data in S3. The pipeline part (dvc.yaml) makes training reproducible.',
        why: 'A reproducible ML repo is a portfolio piece. Without DVC: "trust me, it works." With DVC: anyone clones, pulls, repros.',
        terms: ['dvc init', 'dvc add', '.dvc files', 'dvc remote', 'dvc.yaml', 'dvc repro', 'dvc.lock'],
        resource: 'DVC "Get Started" tutorial. Made-With-ML repo DVC sections.',
        test: ['Why store the .dvc pointer in Git but not the data?', 'What does dvc.lock track?', 'When dvc params vs dvc dataset versioning?'],
        doneWhen: 'Repo is reproducible by another machine via clone + dvc pull + dvc repro.'
      }
    },
    blockB: {
      task: 'Why versioning data matters, DVC vs Git mental model',
      brief: {
        insight: 'Git is bad at large binaries because it stores diffs forever. DVC stores tiny pointers in Git, actual data in object storage. Same UX, right tool for the data.',
        why: 'Versioning data is half of reproducible ML. The other half is versioning code. DVC bridges them.',
        terms: ['DVC pointer', 'DVC remote', 'CAS (content-addressable storage)', 'MD5 chunking', 'dvc.yaml stages'],
        resource: 'DVC concepts docs. iterative.ai blog posts.',
        test: ['What problem does CAS solve that file naming doesn\'t?', 'Why is rerunning reproducible only with dvc.lock?', 'When would you NOT use DVC?']
      }
    },
    project: 'Working dvc repro pipeline with versioned dataset',
    sd: { topicId: 'twitter', topic: 'Design Twitter — feed generation, fanout', source: 'Grokking SD Interview' },
    dsa: { patternId: 'trees', topic: 'Trees — the recursive pattern' }
  },
  {
    num: 12, phase: 'MLOps Bridge', title: 'Cloud-Native ML',
    blockA: {
      task: 'Run one managed training job on SageMaker or Azure ML',
      brief: {
        insight: 'Don\'t try to learn both clouds. Pick one. Run one training job. Deploy one endpoint. curl it. Done.',
        why: 'Managed ML services are increasingly the default for production ML. Knowing one cloud\'s flow makes you fluent in the concepts.',
        terms: ['Training job', 'Model artifact', 'Endpoint', 'Inference container', 'Instance type', 'Spot training'],
        resource: 'AWS SageMaker workshops (sagemaker-workshop.com). Azure ML "MLOps with GitHub" tutorial.',
        test: ['How does SageMaker know which Python script to run?', 'Why use a separate inference container vs training one?', 'When would Spot instances backfire?'],
        doneWhen: 'curl https://your-endpoint with JSON payload returns a prediction.'
      }
    },
    blockB: {
      task: 'Cost vs control: managed ML vs self-hosted K8s',
      brief: {
        insight: 'Managed ML services are "K8s for ML, abstracted." Speed-to-prototype but lose control. For experiments: managed wins. For high-volume serving with custom logic: self-hosted often wins.',
        why: 'The cost/control tradeoff is the same as any cloud-vs-self-hosted decision. Knowing when each makes sense is platform engineering work.',
        terms: ['Managed training', 'Managed endpoint', 'Instance type / family', 'Autoscaling endpoints', 'Batch vs real-time inference', 'Multi-model endpoints', 'A/B traffic split'],
        resource: 'AWS Well-Architected ML Lens. Azure ML pricing calculator.',
        test: ['When does SageMaker get expensive?', 'Batch vs real-time cost-wise?', 'When would you NOT use a managed service?']
      }
    },
    project: 'Deployed model endpoint with curl-able predictions',
    sd: { topicId: 'youtube', topic: 'Design YouTube — video storage, encoding, CDN', source: 'Grokking SD Interview' },
    dsa: { patternId: 'trees', topic: 'Trees — more practice (BST, traversal)' }
  },
  {
    num: 13, phase: 'MLOps Bridge', title: 'Buffer & Polish',
    blockA: {
      task: 'Catch up on skipped work. Polish your mlops-lab README',
      brief: {
        insight: 'A polished portfolio piece beats five unpolished ones. Spend this week making your mlops-lab repo something a stranger could clone and understand.',
        why: 'This is the difference between "I learned MLOps" (forgettable) and "I shipped an MLOps system, here\'s the repo" (memorable).',
        terms: ['README structure', 'Architecture diagram (mermaid, excalidraw)', 'Quickstart section', 'Dependency pinning', '.gitignore hygiene', 'License'],
        resource: 'Browse top-starred MLOps repos on GitHub for README patterns. Made-With-ML\'s README is a good template.',
        test: ['Does your README explain WHY, not just WHAT?', 'Can you reproduce your project from a fresh clone?', 'Is there a diagram?'],
        doneWhen: 'A stranger could clone your repo and reproduce your work from the README alone.'
      }
    },
    blockB: {
      task: 'Write a 1-page summary of what you built',
      brief: {
        insight: 'Writing about what you built is when you discover what you didn\'t understand. The "I\'ll explain it later" parts you skipped become visible the moment you try to put them in writing.',
        why: 'The skill of writing about your own work clearly separates engineers from senior engineers in interviews.',
        terms: ['Technical writing', 'Narrative arc (problem → approach → result)', 'Audience awareness', 'Show don\'t tell'],
        resource: 'Stripe engineering blog. Netflix tech blog. These are the gold standard.',
        test: ['Could a non-technical recruiter understand the impact?', 'Could a senior engineer evaluate your skill from this?', 'Have you removed every adjective that doesn\'t earn its place?']
      }
    },
    project: 'Public mlops-lab repo with clean README — portfolio piece',
    sd: { topicId: 'uber', topic: 'Design Uber — geo-indexing, real-time matching', source: 'Grokking SD Interview' },
    dsa: { patternId: 'trees', topic: 'Trees — Trie + Heap intro' }
  },
  {
    num: 14, phase: 'UPenn Semester', title: 'UPenn Starts',
    blockA: {
      task: '[Reduced] UPenn coursework is primary. 30 min/day max on MLOps',
      brief: {
        insight: 'Your job this week is to NOT collapse. Set up grad school workflow. Calendar blocks for school, work, MLOps. Pick a note-taking system and commit.',
        why: 'First-week grad students who try to perfectly balance everything burn out by week 6. The ones who underschedule on purpose and add back what fits, thrive.',
        terms: ['Time-blocking', 'Knowledge management (Obsidian, Notion)', 'Spaced repetition (Anki)', 'Strategic reading', 'Office hours'],
        resource: 'Cal Newport "How to Become a Straight-A Student". Andy Matuschak\'s notes on spaced repetition.',
        test: ['Have you blocked time for school, work, AND MLOps?', 'Do you have at least one classmate you can DM?', 'Do you know who your TA is?'],
        doneWhen: 'Weekly calendar template that\'s sustainable. At least one reading and one problem set started without burning out.'
      }
    },
    blockB: {
      task: 'Set up grad school workflow — notes, calendar blocks',
      brief: {
        insight: 'Grad school is not undergrad with harder homework. The pace is faster, the abstraction higher, the support thinner. Adapt fast: skim before reading, identify the 20% that\'s tested, build a study group week 1.',
        why: 'You\'re paying a lot for this degree. Treating it strategically isn\'t cynical, it\'s respectful of your time and money.',
        terms: ['Skimming-first reading', 'Strategic reading', 'Study groups', 'Office hours', 'Problem-set-driven learning'],
        resource: 'Cal Newport "Deep Work" + "Straight-A Student". Your UPenn TAs.',
        test: ['Have you identified the 20% of material actually tested?', 'Joined or started a study group?', 'Do you have a sustainable weekly rhythm?']
      }
    },
    project: 'Sustainable weekly schedule for school + work + MLOps',
    sd: { topicId: 'whatsapp', topic: '[Reduced] Design WhatsApp — websockets, delivery', source: 'Grokking SD Interview' },
    dsa: { patternId: 'graphs', topic: 'Graphs intro — BFS/DFS basics' }
  },
  {
    num: 15, phase: 'UPenn Semester', title: 'KubeFlow (Light)',
    blockA: {
      task: 'One small KubeFlow pipeline — two steps, local cluster',
      brief: {
        insight: 'KubeFlow takes the patterns you know from K8s and wraps them in ML-specific abstractions. Not magic — K8s with opinions about how ML workloads should look.',
        why: 'Your existing K8s knowledge gives you a head start most ML folks don\'t have.',
        terms: ['KubeFlow Pipelines (KFP)', 'Pipeline DSL', 'Component', 'Artifact', 'Tekton/Argo', 'Katib'],
        resource: 'KubeFlow official tutorials. Arrikto blog for beginner pieces.',
        test: ['What does KFP add over plain K8s Jobs?', 'Katib vs manual hyperparameter sweeps?', 'Why is artifact passing between steps important?'],
        doneWhen: 'One pipeline runs end-to-end. You can see the graph in the KFP UI.'
      }
    },
    blockB: {
      task: 'How K8s patterns translate to ML pipelines',
      brief: {
        insight: 'K8s gives you scheduling, isolation, resource limits, observability. KubeFlow says "ML workflows need these too" and adds artifact lineage on top. Same primitives, ML-shaped use case.',
        why: 'If you can explain "KubeFlow is K8s with ML-specific lineage and DSL," you sound senior. If you can\'t, you sound like you read blog posts.',
        terms: ['Pipeline as DAG', 'Component', 'Artifact lineage', 'Parameter passing', 'Conditional execution', 'Loops in pipelines'],
        resource: 'KubeFlow concepts page. Architecture docs.',
        test: ['Why is "pipeline as code" valuable over YAML?', 'How does artifact lineage help debugging?', 'When would you NOT use KubeFlow?']
      }
    },
    project: 'Working 2-step KubeFlow pipeline in mlops-lab',
    sd: { topicId: 'dropbox', topic: 'Design Dropbox — file sync, chunking, delta sync', source: 'Grokking SD Interview' },
    dsa: { patternId: 'graphs', topic: 'Graphs — more patterns' }
  },
  {
    num: 16, phase: 'UPenn Semester', title: 'Spark Mental Model',
    blockA: {
      task: 'One 3-hour Spark intro — DataFrames only',
      brief: {
        insight: 'Read a CSV with PySpark, do 3 transformations (filter, groupBy, agg), write to parquet. That\'s it. No clusters, no tuning, just the API and the lazy-evaluation mental model.',
        why: 'Spark is overkill for most problems. Knowing when it\'s overkill (vs pandas) is more valuable than memorizing the API.',
        terms: ['SparkSession', 'DataFrame', 'Transformations vs actions', 'Lazy evaluation', '.show()', '.explain()', 'Parquet'],
        resource: 'Spark DataFrame quickstart. Holden Karau "Spark: The Definitive Guide" first chapters.',
        test: ['What triggers actual computation in Spark?', 'Why does Spark output Parquet by default?', 'When does PySpark beat pandas?'],
        doneWhen: 'A notebook that processes a real dataset in under 10 lines of Spark code.'
      }
    },
    blockB: {
      task: 'When you actually need Spark vs pandas',
      brief: {
        insight: 'Spark equals lazy distributed pandas. You describe operations on a DataFrame, nothing runs until you trigger an action. The DAG gets optimized as a whole. .explain() shows what Spark plans to do.',
        why: 'The honest answer to "when do you need Spark?" is: rarely if data fits in memory, often if not. The mental model lets you have that conversation.',
        terms: ['SparkSession', 'DataFrame', 'RDD', 'Transformation vs action', 'Catalyst optimizer', 'Partition', 'Shuffle', 'Broadcast join'],
        resource: 'Spark UI walkthrough on databricks.com. "Spark: Definitive Guide" (free PDF).',
        test: ['When is Spark overkill?', 'Transformation vs action?', 'Why is .collect() dangerous on big data?']
      }
    },
    project: 'One Spark notebook processing a real dataset',
    sd: { topicId: 'web-crawler', topic: 'Design Web Crawler — distributed, politeness, dedup', source: 'Grokking SD Interview' },
    dsa: { patternId: 'dp', topic: '1-D Dynamic Programming — the memoization pattern' }
  },
  {
    num: 17, phase: 'UPenn Semester', title: 'ML Monitoring',
    blockA: {
      task: 'Add Evidently for data drift',
      brief: {
        insight: 'Plug Evidently into a model in mlops-lab. Compute drift on synthetic "new" data. Export to JSON, ingest into Grafana.',
        why: 'You know Prometheus and Grafana already. Adding ML-specific metrics to that stack is a way smaller jump than learning a whole new tool.',
        terms: ['Data drift', 'Concept drift', 'PSI (Population Stability Index)', 'KS statistic', 'Grafana dashboards from JSON', 'Alerting rules'],
        resource: 'Evidently AI\'s docs and blog. They literally wrote the book.',
        test: ['Why JSON intermediate instead of pushing metrics directly?', 'What threshold for PSI alert?', 'When does drift detection give false positives?'],
        doneWhen: 'Grafana shows a drift score over time that changes when you inject distribution-shifted data.'
      }
    },
    blockB: {
      task: 'Why model drift differs from infra monitoring',
      brief: {
        insight: 'Infra monitoring catches things that are broken. ML monitoring catches things that are wrong. A model can have 100% uptime, perfect latency, and silently make worse predictions because the world changed. That\'s drift.',
        why: 'This is the unique value of MLOps over DevOps. If you can explain WHY model monitoring is different, you\'ve earned your "MLOps engineer" title.',
        terms: ['Data drift', 'Concept drift', 'Label drift', 'Prediction drift', 'PSI', 'KS statistic', 'Ground truth lag', 'Shadow deployment'],
        resource: 'Evidently blog. "Reliable Machine Learning" book by Cathy Chen et al.',
        test: ['Why is ground truth always delayed?', 'Difference between data drift and concept drift?', 'When would you NOT need drift monitoring?']
      }
    },
    project: 'Grafana dashboard with a drift metric over time',
    sd: { topicId: 'news-feed', topic: 'Design Facebook News Feed — ranking, push vs pull', source: 'Grokking SD Interview' },
    dsa: { patternId: 'dp', topic: '1-D DP — more practice' }
  },
  {
    num: 18, phase: 'UPenn Semester', title: 'CML in CI/CD',
    blockA: {
      task: 'GitHub Actions workflow that trains + posts metrics to PR',
      brief: {
        insight: 'CML (Continuous Machine Learning) by Iterative posts model metrics as PR comments with plots. Suddenly every PR answers "did this make the model better?"',
        why: 'This is the demo that wins interviews. Recruiters can SEE your work — they open a PR, see auto-generated metrics, instantly understand you do real MLOps.',
        terms: ['CML GitHub Action', 'GITHUB_TOKEN', 'cml comment create', 'Vega plots', 'Self-hosted runners (GPU)'],
        resource: 'iterative.ai\'s CML docs and example repos.',
        test: ['Why use GITHUB_TOKEN vs a PAT?', 'How handle non-deterministic training in CI?', 'Cost model of training on every PR?'],
        doneWhen: 'A PR you opened has an auto-generated comment with model metrics and a plot.'
      }
    },
    blockB: {
      task: 'Why ML deserves first-class CI/CD treatment',
      brief: {
        insight: 'Treating models like code means every PR can answer "did this make the model better?" That\'s a deployment gate. It\'s what separates "we have a model in prod" from "we have a continuously-improving model in prod."',
        why: 'The promise of MLOps is fast, safe iteration. CML is one concrete way to deliver that. Also a visible portfolio piece.',
        terms: ['Continuous training', 'Continuous evaluation', 'Model gating', 'Golden dataset', 'Shadow evaluation', 'Regression tests for ML'],
        resource: 'Made-With-ML CI/CD chapter. iterative.ai blog on MLOps maturity.',
        test: ['What metric would you regression-test on every PR?', 'How handle non-deterministic training in CI?', 'When does CML get expensive?']
      }
    },
    project: 'PR with auto-generated model performance comment',
    sd: { topicId: 'recommendation', topic: 'ML SD — Recommendation System', source: 'Grokking ML SD Interview' },
    dsa: { patternId: 'dp', topic: '2-D Dynamic Programming intro' }
  },
  {
    num: 19, phase: 'UPenn Semester', title: 'Explainable AI',
    blockA: {
      task: 'Add SHAP to your model, generate summary plots',
      brief: {
        insight: 'SHAP tells you which features drove each prediction. Summary plot = global view. Force plot = local view (why this specific prediction).',
        why: 'When your model is wrong, SHAP often tells you which feature betrayed you. Debugging superpower more than regulatory checkbox.',
        terms: ['SHAP values', 'Summary plot', 'Force plot', 'LIME (alternative)', 'Feature importance vs attribution', 'TreeExplainer'],
        resource: 'SHAP official docs (slundberg/shap). Christoph Molnar "Interpretable ML" book (free online).',
        test: ['Why are SHAP values "fair" mathematically?', 'When does global feature importance mislead you?', 'How embed a SHAP plot in a PR comment?'],
        doneWhen: 'PR comment shows model performance AND a SHAP plot explaining feature drivers.'
      }
    },
    blockB: {
      task: 'When explainability is required vs nice-to-have',
      brief: {
        insight: 'Explainability isn\'t optional in regulated domains (finance, healthcare, hiring, defense). Even where optional, it\'s a debugging superpower. SHAP, LIME, integrated gradients are the three big techniques.',
        why: '"Explainable AI" is a buzzword. Knowing the actual techniques is the substance. Especially relevant for defense — DoD increasingly requires it.',
        terms: ['SHAP', 'LIME', 'Integrated gradients', 'Feature importance (global) vs attribution (local)', 'Counterfactual explanations', 'Model cards'],
        resource: 'Christoph Molnar "Interpretable Machine Learning". Google\'s Model Cards paper.',
        test: ['When is global feature importance misleading?', 'Why are SHAP values mathematically "fair"?', 'What\'s a model card?']
      }
    },
    project: 'PR comment with SHAP plot via CML',
    sd: { topicId: 'search-ranking', topic: 'ML SD — Search Ranking, embeddings', source: 'Grokking ML SD Interview' },
    dsa: { patternId: 'dp', topic: '2-D DP — more practice' }
  },
  {
    num: 20, phase: 'UPenn Semester', title: 'Capstone Polish',
    blockA: {
      task: 'Tie mlops-lab into one story: data → model → serve → monitor → explain',
      brief: {
        insight: 'Your mlops-lab should tell ONE story: dataset → versioning → training → registry → serving → monitoring → explainability. README walks a stranger through it.',
        why: 'Time to compound. This week is the difference between "I studied MLOps" (forgettable) and "I shipped an MLOps system, here\'s the proof" (memorable).',
        terms: ['Narrative architecture', 'End-to-end demo', 'Video walkthrough (Loom)', 'Deployable demo', 'GitHub Pages for project sites'],
        resource: 'How Stripe, Airbnb, Netflix engineering blogs structure project writeups.',
        test: ['Can you demo the full pipeline in 5 minutes?', 'Does a 2-min video walkthrough exist?', 'Is the LinkedIn post drafted?'],
        doneWhen: 'You can demo the full pipeline in 5 minutes. LinkedIn post published with link.'
      }
    },
    blockB: {
      task: 'Write portfolio narrative + LinkedIn post',
      brief: {
        insight: 'The portfolio piece you ship in week 20 IS your value proposition to platform engineering hiring managers. It says: "I understand DevOps, MLOps, and how they connect." That\'s a rare profile.',
        why: 'Three-year career capital compounds from here. Portfolio + UPenn + clearance + DevSecOps + MLOps is rare enough to command $250K+ offers in 2027-2028.',
        terms: ['Hiring signal', 'Recruiter-friendly summary', 'Public demo', 'Storytelling for engineers', 'LinkedIn as portfolio'],
        resource: 'Stripe engineering blog. Airbnb tech blog. Read 5 posts, notice the structure, copy it.',
        test: ['Can a non-technical recruiter understand what you built?', 'Can a senior engineer evaluate your skill?', 'Have you posted it?']
      }
    },
    project: 'Portfolio-ready mlops-lab + LinkedIn writeup published',
    sd: { topicId: 'mock-week', topic: 'Mock interview week — 3 problems under 45-min timer', source: 'Self-directed · RESHADED framework' },
    dsa: { patternId: 'review', topic: 'Review weak patterns + mock LeetCode session' }
  }
];
