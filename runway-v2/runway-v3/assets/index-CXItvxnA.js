(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();const q={"DevOps Fundamentals":{color:"#F5B842",code:"devops"},"MLOps Bridge":{color:"#E07856",code:"mlops"},"UPenn Semester":{color:"#8FA876",code:"upenn"}},ce={1:{label:"START",desc:"May 21, 2026 — runway begins"},9:{label:"ML BRIDGE",desc:"DevOps foundation → MLOps"},14:{label:"UPENN",desc:"Grad school begins, MLOps goes light"},20:{label:"CAPSTONE",desc:"Portfolio piece shipped"}},H=new Date("2026-05-21T00:00:00"),U=[{num:1,phase:"DevOps Fundamentals",title:"Linux & Bash",blockA:{task:"Write a Bash script daily — process monitor, log parser, service health checker",brief:{insight:"Bash literacy comes from writing, not reading. You will not learn it from a book. You will learn it from the third time you debug why your loop ate a variable name.",why:'Every alert you get in DevSecOps starts with "is the service running?" If you can answer that with a 20-line script in five minutes, you save an hour of guessing.',terms:["set -euo pipefail","parameter expansion","command substitution","exit codes","[[ ]] vs [ ]","heredocs","trap"],resource:"Greg's Wiki (mywiki.wooledge.org/BashGuide). ShellCheck.net — paste your script, get gotchas highlighted.",test:["What does set -euo pipefail actually do, line by line?",'Why is [ $x = "y" ] dangerous and what fixes it?',"How do you make sure your script exits cleanly if killed mid-run?"],doneWhen:"Three working scripts, each under 50 lines, each with error handling. Pass ShellCheck."}},blockB:{task:"Man pages, stdin/stdout/stderr flow, systemd unit files",brief:{insight:"In Linux everything is a file, including I/O streams. stdin/stdout/stderr are file descriptors 0/1/2. Redirect them with > < | and you can pipe anything to anything. systemd is just init replaced with a smarter manager that watches for crashes and restarts you.",why:'Ninety percent of "why is my service down" answers involve one of: stuck process, full disk, broken pipe, or systemd unit misconfiguration. This is the literacy that turns guessing into debugging.',terms:["file descriptor","redirection (> < >> 2>&1 &>)","pipes","exit codes","signals (SIGTERM, SIGKILL, SIGHUP)","systemd unit file","journalctl"],resource:"man bash (REDIRECTION section). man 7 signal. man systemd.service. Julia Evans zines.",test:["Difference between 2>&1 and &>?","Why is kill -9 considered rude?","How do you auto-restart a systemd service on failure?"]}},project:"Service health checker script that emails on failure",sd:{topicId:"networking-fundamentals",topic:"Networking Fundamentals — IP, TCP/UDP, HTTP/HTTPS, OSI model",source:"NeetCode SD Course · Grokking SD Fundamentals"},dsa:{patternId:"arrays-hashing",topic:"Arrays & Hashing — the foundation pattern"}},{num:2,phase:"DevOps Fundamentals",title:"Linux Deep Dive",blockA:{task:"Build a small CLI tool in Bash with proper error handling",brief:{insight:"A good CLI tool feels obvious to use and impossible to misuse. Flags have help text. Errors are clear. Exit codes are honest. Bash can do all of this with getopts and discipline.",why:`The "small tools" you write at SAIC become other people's muscle memory. A polished one earns trust. A janky one gets replaced.`,terms:["getopts","long flags","heredocs for help text","trap signal handlers","idempotent operations"],resource:'man getopts. "Bash Cookbook" by Albing & Vossen.',test:["Why is getopts safer than parsing $1, $2 manually?","How does trap let you clean up on Ctrl+C?","What exit code conventions do well-behaved CLIs follow?"],doneWhen:"One CLI tool with --help, --verbose, --dry-run, returns proper exit codes."}},blockB:{task:"Process lifecycle, signals, file descriptors — diagram the crash flow",brief:{insight:"A process is born via fork(), customized via exec(), runs until it exits or receives an uncaught signal. Parent must wait() on children or you get zombies. Signals are async interrupts — handle them or they kill you.",why:"Every container, daemon, and CI runner is a process tree. Understanding the lifecycle is understanding why things hang, leak, or won't die. This is the foundation under containerization.",terms:["fork / exec / wait","PID / PPID","zombie process","orphan process","SIGTERM vs SIGKILL","SIGCHLD","file descriptor leak"],resource:"man 2 fork. man 2 execve. man 7 signal. Julia Evans process zines.",test:["Why can't you catch SIGKILL?","What creates a zombie process?","What's an FD leak and how do you find one?"]}},project:'Diagram + 90-second explanation of "what happens when a Linux process crashes"',sd:{topicId:"dns-cdn",topic:"DNS & CDNs — resolution chain, edge caching",source:"Grokking SD Fundamentals"},dsa:{patternId:"arrays-hashing",topic:"Arrays & Hashing — continue practice"}},{num:3,phase:"DevOps Fundamentals",title:"Networking I",blockA:{task:"Set up local nginx reverse proxy with two upstream servers",brief:{insight:"A reverse proxy is the front door of every modern web stack. nginx is good at it because its config is declarative — you describe the topology, not the algorithm.",why:"Every K8s Ingress, every CDN edge, every API gateway is ultimately doing what nginx does. Master the config and the abstractions become readable.",terms:["upstream blocks","proxy_pass","X-Forwarded-For","keepalive","proxy_buffering"],resource:"nginx.com beginner's guide.",test:["Why does nginx need X-Forwarded-For when proxying?","What does keepalive between nginx and upstream actually save?","When does proxy_buffering hurt you?"],doneWhen:"curl through the LB hits backend1 and backend2 alternately. Headers show which backend served the request."}},blockB:{task:"TCP handshake, DNS resolution, HTTP lifecycle — draw it",brief:{insight:"Drawing the full HTTP lifecycle from address bar to byte-on-wire forces you to confront what you actually know. Make it a 90-second story you can tell on a whiteboard.",why:`Interviewers literally ask "what happens when you type a URL." If you can't draw it, you can't claim to know how the web works.`,terms:["DNS resolution","TCP 3-way handshake","TLS handshake","HTTP request","TCP teardown","connection reuse"],resource:'GitHub repo "what-happens-when". "High Performance Browser Networking" by Ilya Grigorik (free online).',test:["Where does the TLS handshake happen in the timeline?","What does HTTP/2 keep-alive save over HTTP/1.1?","Why are subsequent requests to the same host faster?"]}},project:"Draw full HTTP request lifecycle from browser to server in under 2 min",sd:{topicId:"load-balancers",topic:"Load Balancers — L4 vs L7, algorithms",source:"Grokking SD Fundamentals · NeetCode"},dsa:{patternId:"two-pointers",topic:"Two Pointers — the search pattern"}},{num:4,phase:"DevOps Fundamentals",title:"Networking II",blockA:{task:"tcpdump or Wireshark capture on your reverse proxy",brief:{insight:"tcpdump and Wireshark show what actually happened on the wire — not what your app thinks happened. When docs say one thing and behavior says another, the pcap is the tiebreaker.",why:'Once you can read a pcap, you stop being scared of network bugs. "Is the request reaching the server?" becomes a 30-second answer.',terms:["pcap","BPF filter syntax","TLS handshake messages","TCP retransmissions","window scaling"],resource:"tcpdump.org examples. Wireshark display filters reference.",test:["Filter for only TLS ClientHello messages — what command?","How do you tell a TCP retransmission from a duplicate?","What does window scaling mean and why does it matter?"],doneWhen:"Annotated pcap showing SYN → SYN-ACK → ACK → ClientHello → ServerHello with each step explained."}},blockB:{task:"TLS termination, load balancing strategies, subnetting basics",brief:{insight:'TLS is not "add an s to http." It is an asymmetric handshake establishing a symmetric session key, then encrypting everything after. Termination is where TLS unwraps — usually your LB, not your app.',why:"TLS termination location is a constant source of bugs: HTTP between LB and app, certificate mismatches, SNI failures. Knowing where the encryption boundary is fixes them.",terms:["TLS handshake","ClientHello / ServerHello","cipher suites","SNI","certificate chain","mutual TLS (mTLS)","perfect forward secrecy"],resource:'Cloudflare Learning Center on TLS. "Bulletproof SSL and TLS" by Ivan Ristic (Ch 1-3 free).',test:["Why does TLS need both asymmetric AND symmetric crypto?","What is SNI and why is it needed?","When would you use mTLS over regular TLS?"]}},project:"Annotated tcpdump trace of a TLS handshake",sd:{topicId:"databases-i",topic:"Databases I — SQL vs NoSQL, ACID, BASE",source:"NeetCode SD · Grokking DB"},dsa:{patternId:"two-pointers",topic:"Two Pointers — more practice"}},{num:5,phase:"DevOps Fundamentals",title:"Docker Internals",blockA:{task:"Multi-stage Dockerfile, rootless container, Trivy scan",brief:{insight:"A good production Dockerfile separates the toolchain from the runtime. Build stage has gcc, npm, the universe. Final stage has the binary and nothing else. Smaller image = faster pull = lower attack surface.",why:"Your DevSecOps work cares about both speed and security. Multi-stage builds + scanning + rootless gives you all three.",terms:["FROM ... AS stage","COPY --from=stage","USER directive",".dockerignore","layer caching","distroless"],resource:'Docker "best practices" docs. Trivy GitHub README. Snyk Dockerfile cheat sheet.',test:["Why is order of COPY/RUN in a Dockerfile crucial for cache?","Why is running as root in a container risky if containers are isolated?","Distroless vs Alpine vs Ubuntu — when does each win?"],doneWhen:"Image under 100MB for a small app. Runs as non-root. Trivy passes with zero HIGH/CRITICAL CVEs."}},blockB:{task:"Namespaces, cgroups, image layers, container escape conceptually",brief:{insight:"Containers are not VMs. They are processes with restricted views. Linux namespaces give isolation, cgroups give resource limits. Same kernel, different views.",why:'When you can explain THIS, you can explain why containers start fast, why escapes are possible, and why "Docker is lightweight" actually means something specific.',terms:["Namespaces (PID, NET, MNT, UTS, IPC, USER)","cgroups","OCI runtime","OverlayFS","PID 1 problem","capabilities"],resource:'Julia Evans "Containers are just processes". Liz Rice "Container from Scratch in Go" talk on YouTube — gold standard.',test:["Name 3 of the 6 Linux namespaces.","Why does kill in a container only kill that container?","What is the PID 1 problem and how does tini solve it?"]}},project:"Minimal hardened container with passing Trivy scan",sd:{topicId:"caching",topic:"Caching — Redis, strategies, eviction",source:"Grokking SD Fundamentals"},dsa:{patternId:"sliding-window",topic:"Sliding Window — the optimization pattern"}},{num:6,phase:"DevOps Fundamentals",title:"CI/CD Patterns",blockA:{task:"GitHub Actions: lint → test → build → deploy + manual gate + rollback",brief:{insight:"A real pipeline is a directed graph of jobs with gates between them. Linting before tests saves CI minutes. Approval gates before prod save your weekend. Rollback as a first-class job saves your year.",why:"Your Azure DevOps work translates directly. GitHub Actions has different YAML but same patterns — and FAANG-adjacent companies almost all use GitHub Actions.",terms:["workflow events","jobs vs steps","environments + approval","matrix builds","caching","OIDC for cloud auth","reusable workflows"],resource:'GitHub Actions "learn" docs. "GitHub Actions in Action" (Manning) for depth.',test:["Why use OIDC instead of stored AWS keys?","When matrix vs separate jobs?",`What do "environments" buy you that "if" conditions don't?`],doneWhen:"Push triggers full pipeline. Manual approval for deploy. One-button rollback works."}},blockB:{task:"GitOps vs push CI/CD, trunk-based dev, blue/green, canary",brief:{insight:"GitOps inverts the CI/CD arrow. Instead of CI pushing to prod, prod pulls from Git. Your repo IS your deployment state. Drift detection becomes possible because deviation from Git equals drift.",why:'ArgoCD and Flux are not "another CI tool" — a fundamentally different model. Knowing both lets you pick the right one. This is platform engineering thinking.',terms:["Push vs pull CI/CD","Declarative config","Drift detection","ArgoCD","Flux","Blue/green","Canary","Feature flags","Progressive delivery"],resource:'Weaveworks "GitOps Guide" PDF. OpenGitOps principles.',test:["When does GitOps fail or feel wrong?","Why is rollback easy in GitOps?","Blue/green vs canary — when does each win?"]}},project:"Working pipeline with rollback in a public repo",sd:{topicId:"message-queues",topic:"Message Queues — Kafka, RabbitMQ, pub/sub",source:"NeetCode SD · Grokking"},dsa:{patternId:"sliding-window",topic:"Sliding Window — more practice"}},{num:7,phase:"DevOps Fundamentals",title:"Kubernetes I",blockA:{task:"Multi-service deploy with Ingress, HPA, PDB, resource limits",brief:{insight:`Production K8s is not "kubectl apply deployment.yaml." It is requests so the scheduler can pack you, limits so neighbors can't crush you, HPA so you scale, and PDB so deploys don't kill your last replica.`,why:'Your on-prem K8s work plus these primitives equals a portfolio piece. Knowing the production checklist separates "deployed K8s" from "ran K8s in production."',terms:["Deployment vs StatefulSet vs DaemonSet","Service types","Ingress","HPA","PDB","requests vs limits","namespaces","resource quotas"],resource:'Kubernetes.io concepts docs (the official ones are great). "Kubernetes the Hard Way" by Kelsey Hightower.',test:["Why requests for scheduling, limits for runtime?","When does a StatefulSet beat a Deployment?","HPA vs VPA?"],doneWhen:"App reachable via Ingress, scales when load-tested, survives a kubectl drain of one node."}},blockB:{task:"Scheduler internals, etcd role, control plane flow",brief:{insight:`kubectl apply doesn't create a pod. It writes to etcd. Controller manager notices, makes a Deployment. Scheduler picks a node. Kubelet runs the container. This async chain is why "stuck in Pending" has 5 causes.`,why:'Every K8s debugging story is "where did the chain break?" Knowing the chain means knowing where to look.',terms:["Control plane","kubelet","kube-proxy","reconciliation loop","desired vs actual state","CRDs","operators"],resource:'"Kubernetes the Hard Way" (Kelsey Hightower, free on GitHub).',test:["What 4 components are involved between kubectl apply and a running pod?",'Why is K8s called "declarative"?',"What does the kubelet do that the scheduler doesn't?"]}},project:"Annotated diagram of pod lifecycle from kubectl apply to running",sd:{topicId:"databases-ii",topic:"Databases II — Sharding, replication, partitioning",source:"Grokking SD"},dsa:{patternId:"stack",topic:"Stack — the LIFO pattern"}},{num:8,phase:"DevOps Fundamentals",title:"Kubernetes II",blockA:{task:"Break your cluster deliberately and debug it",brief:{insight:"You learn K8s debugging by breaking things on purpose, predicting failure modes, then watching reality match (or not match) your prediction. The gap is your knowledge gap.",why:"Production K8s issues are inherently chaotic. Practicing on intentional failures means real failures feel familiar.",terms:["kubectl describe pod","kubectl logs --previous","CrashLoopBackOff","ImagePullBackOff","OOMKilled","kubectl events --sort-by"],resource:'K8s docs "Troubleshooting" section.',test:["Pod is Pending — what 5 things to check first?","CrashLoopBackOff — where do you look?","OOMKilled — too low limit, memory leak, or both?"],doneWhen:"Incident response writeup of 3 self-inflicted outages with root cause + fix."}},blockB:{task:"CNI, Services, Ingress controllers, NetworkPolicies",brief:{insight:"K8s networking is 5 layers: pod-to-pod (CNI), pod-to-service (kube-proxy), service-to-pod (Endpoints), external-to-service (Ingress), and the underlying node network. NetworkPolicies are firewall rules at the pod level.",why:`When you can map the actual packet path, you debug "why can't A reach B" instead of restarting random things.`,terms:["CNI","pod CIDR","ClusterIP / NodePort / LoadBalancer","Endpoints","Ingress vs Gateway API","NetworkPolicy","kube-proxy modes"],resource:'Calico "Kubernetes networking 101". learnk8s.io networking deep dive.',test:["Trace a packet from pod A in node 1 to pod B in node 2.","What does an Ingress controller actually do?","When would you reach for a NetworkPolicy?"]}},project:"Incident response writeup of a self-inflicted K8s outage",sd:{topicId:"cap-theorem",topic:"CAP Theorem & Consistency — strong vs eventual",source:"NeetCode SD · Grokking"},dsa:{patternId:"binary-search",topic:"Binary Search — the O(log n) pattern"}},{num:9,phase:"MLOps Bridge",title:"ML Fundamentals",blockA:{task:"fast.ai Lesson 1 — get a model running, no theory rabbit holes",brief:{insight:"Don't try to understand everything. Just get the training loop running and watch the numbers change. Theory clicks faster when you have a running thing to point at.",why:"Your engineering brain wants to understand the whole stack first. Fight that instinct here. Get something running, then learn why.",terms:["Dataset","DataLoader","Model","Loss function","Optimizer","Train/val split","Epoch"],resource:`fast.ai Lesson 1 video + Ch 1 of the free book. 3blue1brown's "But what IS a neural network" series.`,test:["What does the optimizer actually update?","Why do we split into train and val sets?","What does one epoch consist of?"],doneWhen:"A trained classifier with accuracy printed to console, weights saved to disk."}},blockB:{task:"What is a training loop, what does it produce, why track it",brief:{insight:"A training loop is just: forward pass (predict), compute loss (how wrong), backward pass (compute gradients), step optimizer (update weights). Repeat for batches. Track metrics. The rest is decoration.",why:'When ML demystifies into "a loop that minimizes a function," you stop being intimidated. The infra around it is normal SWE problems applied to ML.',terms:["Forward / backward pass","Gradient descent","Loss function","Optimizer (SGD, Adam)","Epoch vs batch vs step","Overfitting","Regularization"],resource:"fast.ai book Ch 1-2. 3blue1brown YouTube series.",test:["Difference between epoch and step?","Why train/val/test, not just train/val?","What does the optimizer actually do mathematically?"]}},project:"One working classifier you understand end-to-end",sd:{topicId:"url-shortener",topic:"Design URL Shortener — gateway problem",source:"Grokking SD Interview"},dsa:{patternId:"linked-list",topic:"Linked List — the pointer pattern"}},{num:10,phase:"MLOps Bridge",title:"scikit-learn + MLFlow",blockA:{task:"Train 3 models, log every run to MLFlow",brief:{insight:"sklearn is your training framework, MLFlow is your experiment tracker. Two libraries, two roles. Don't conflate them.",why:"Three models side by side, with all params and metrics logged — that's what a real ML team's workflow looks like.",terms:["sklearn Pipeline","mlflow.start_run()","log_params / log_metrics / log_artifact","Model registry"],resource:"MLFlow official quickstart. sklearn user guide on pipelines.",test:["Why log params and metrics separately?",`What goes in an "artifact" that's not a metric?`,"When does the model registry add value?"],doneWhen:"MLFlow UI shows 3 runs side-by-side with accuracy and downloadable models."}},blockB:{task:"Map MLFlow concepts to DevOps: registry=artifact store, run=build",brief:{insight:"MLFlow concepts map 1:1 to DevOps. Experiment = repo. Run = build. Params = build args. Artifacts = build outputs. Model registry = container registry.",why:"The MLOps world has invented new names for old patterns. Translating to your DevOps vocab cuts the learning curve in half.",terms:["Experiment","Run","Param","Metric","Artifact","Model registry","Model stage"],resource:"MLFlow concepts docs. Made-With-ML GitHub repo by goku-mohandas.",test:["Where does MLFlow store metrics — DB or files?","Difference between an experiment and a run?","How to promote model from Staging to Production?"]}},project:"MLFlow UI comparing 3+ runs with different hyperparameters",sd:{topicId:"pastebin",topic:"Design Pastebin — storage-heavy variant",source:"Grokking SD Interview"},dsa:{patternId:"linked-list",topic:"Linked List — more practice"}},{num:11,phase:"MLOps Bridge",title:"DVC",blockA:{task:"Add DVC to mlops-lab repo, version data in S3",brief:{insight:'DVC is Git for big files plus a pipeline runner. The "git for data" part stores tiny pointers in Git, actual data in S3. The pipeline part (dvc.yaml) makes training reproducible.',why:'A reproducible ML repo is a portfolio piece. Without DVC: "trust me, it works." With DVC: anyone clones, pulls, repros.',terms:["dvc init","dvc add",".dvc files","dvc remote","dvc.yaml","dvc repro","dvc.lock"],resource:'DVC "Get Started" tutorial. Made-With-ML repo DVC sections.',test:["Why store the .dvc pointer in Git but not the data?","What does dvc.lock track?","When dvc params vs dvc dataset versioning?"],doneWhen:"Repo is reproducible by another machine via clone + dvc pull + dvc repro."}},blockB:{task:"Why versioning data matters, DVC vs Git mental model",brief:{insight:"Git is bad at large binaries because it stores diffs forever. DVC stores tiny pointers in Git, actual data in object storage. Same UX, right tool for the data.",why:"Versioning data is half of reproducible ML. The other half is versioning code. DVC bridges them.",terms:["DVC pointer","DVC remote","CAS (content-addressable storage)","MD5 chunking","dvc.yaml stages"],resource:"DVC concepts docs. iterative.ai blog posts.",test:["What problem does CAS solve that file naming doesn't?","Why is rerunning reproducible only with dvc.lock?","When would you NOT use DVC?"]}},project:"Working dvc repro pipeline with versioned dataset",sd:{topicId:"twitter",topic:"Design Twitter — feed generation, fanout",source:"Grokking SD Interview"},dsa:{patternId:"trees",topic:"Trees — the recursive pattern"}},{num:12,phase:"MLOps Bridge",title:"Cloud-Native ML",blockA:{task:"Run one managed training job on SageMaker or Azure ML",brief:{insight:"Don't try to learn both clouds. Pick one. Run one training job. Deploy one endpoint. curl it. Done.",why:"Managed ML services are increasingly the default for production ML. Knowing one cloud's flow makes you fluent in the concepts.",terms:["Training job","Model artifact","Endpoint","Inference container","Instance type","Spot training"],resource:'AWS SageMaker workshops (sagemaker-workshop.com). Azure ML "MLOps with GitHub" tutorial.',test:["How does SageMaker know which Python script to run?","Why use a separate inference container vs training one?","When would Spot instances backfire?"],doneWhen:"curl https://your-endpoint with JSON payload returns a prediction."}},blockB:{task:"Cost vs control: managed ML vs self-hosted K8s",brief:{insight:'Managed ML services are "K8s for ML, abstracted." Speed-to-prototype but lose control. For experiments: managed wins. For high-volume serving with custom logic: self-hosted often wins.',why:"The cost/control tradeoff is the same as any cloud-vs-self-hosted decision. Knowing when each makes sense is platform engineering work.",terms:["Managed training","Managed endpoint","Instance type / family","Autoscaling endpoints","Batch vs real-time inference","Multi-model endpoints","A/B traffic split"],resource:"AWS Well-Architected ML Lens. Azure ML pricing calculator.",test:["When does SageMaker get expensive?","Batch vs real-time cost-wise?","When would you NOT use a managed service?"]}},project:"Deployed model endpoint with curl-able predictions",sd:{topicId:"youtube",topic:"Design YouTube — video storage, encoding, CDN",source:"Grokking SD Interview"},dsa:{patternId:"trees",topic:"Trees — more practice (BST, traversal)"}},{num:13,phase:"MLOps Bridge",title:"Buffer & Polish",blockA:{task:"Catch up on skipped work. Polish your mlops-lab README",brief:{insight:"A polished portfolio piece beats five unpolished ones. Spend this week making your mlops-lab repo something a stranger could clone and understand.",why:`This is the difference between "I learned MLOps" (forgettable) and "I shipped an MLOps system, here's the repo" (memorable).`,terms:["README structure","Architecture diagram (mermaid, excalidraw)","Quickstart section","Dependency pinning",".gitignore hygiene","License"],resource:"Browse top-starred MLOps repos on GitHub for README patterns. Made-With-ML's README is a good template.",test:["Does your README explain WHY, not just WHAT?","Can you reproduce your project from a fresh clone?","Is there a diagram?"],doneWhen:"A stranger could clone your repo and reproduce your work from the README alone."}},blockB:{task:"Write a 1-page summary of what you built",brief:{insight:`Writing about what you built is when you discover what you didn't understand. The "I'll explain it later" parts you skipped become visible the moment you try to put them in writing.`,why:"The skill of writing about your own work clearly separates engineers from senior engineers in interviews.",terms:["Technical writing","Narrative arc (problem → approach → result)","Audience awareness","Show don't tell"],resource:"Stripe engineering blog. Netflix tech blog. These are the gold standard.",test:["Could a non-technical recruiter understand the impact?","Could a senior engineer evaluate your skill from this?","Have you removed every adjective that doesn't earn its place?"]}},project:"Public mlops-lab repo with clean README — portfolio piece",sd:{topicId:"uber",topic:"Design Uber — geo-indexing, real-time matching",source:"Grokking SD Interview"},dsa:{patternId:"trees",topic:"Trees — Trie + Heap intro"}},{num:14,phase:"UPenn Semester",title:"UPenn Starts",blockA:{task:"[Reduced] UPenn coursework is primary. 30 min/day max on MLOps",brief:{insight:"Your job this week is to NOT collapse. Set up grad school workflow. Calendar blocks for school, work, MLOps. Pick a note-taking system and commit.",why:"First-week grad students who try to perfectly balance everything burn out by week 6. The ones who underschedule on purpose and add back what fits, thrive.",terms:["Time-blocking","Knowledge management (Obsidian, Notion)","Spaced repetition (Anki)","Strategic reading","Office hours"],resource:`Cal Newport "How to Become a Straight-A Student". Andy Matuschak's notes on spaced repetition.`,test:["Have you blocked time for school, work, AND MLOps?","Do you have at least one classmate you can DM?","Do you know who your TA is?"],doneWhen:"Weekly calendar template that's sustainable. At least one reading and one problem set started without burning out."}},blockB:{task:"Set up grad school workflow — notes, calendar blocks",brief:{insight:"Grad school is not undergrad with harder homework. The pace is faster, the abstraction higher, the support thinner. Adapt fast: skim before reading, identify the 20% that's tested, build a study group week 1.",why:"You're paying a lot for this degree. Treating it strategically isn't cynical, it's respectful of your time and money.",terms:["Skimming-first reading","Strategic reading","Study groups","Office hours","Problem-set-driven learning"],resource:'Cal Newport "Deep Work" + "Straight-A Student". Your UPenn TAs.',test:["Have you identified the 20% of material actually tested?","Joined or started a study group?","Do you have a sustainable weekly rhythm?"]}},project:"Sustainable weekly schedule for school + work + MLOps",sd:{topicId:"whatsapp",topic:"[Reduced] Design WhatsApp — websockets, delivery",source:"Grokking SD Interview"},dsa:{patternId:"graphs",topic:"Graphs intro — BFS/DFS basics"}},{num:15,phase:"UPenn Semester",title:"KubeFlow (Light)",blockA:{task:"One small KubeFlow pipeline — two steps, local cluster",brief:{insight:"KubeFlow takes the patterns you know from K8s and wraps them in ML-specific abstractions. Not magic — K8s with opinions about how ML workloads should look.",why:"Your existing K8s knowledge gives you a head start most ML folks don't have.",terms:["KubeFlow Pipelines (KFP)","Pipeline DSL","Component","Artifact","Tekton/Argo","Katib"],resource:"KubeFlow official tutorials. Arrikto blog for beginner pieces.",test:["What does KFP add over plain K8s Jobs?","Katib vs manual hyperparameter sweeps?","Why is artifact passing between steps important?"],doneWhen:"One pipeline runs end-to-end. You can see the graph in the KFP UI."}},blockB:{task:"How K8s patterns translate to ML pipelines",brief:{insight:'K8s gives you scheduling, isolation, resource limits, observability. KubeFlow says "ML workflows need these too" and adds artifact lineage on top. Same primitives, ML-shaped use case.',why:`If you can explain "KubeFlow is K8s with ML-specific lineage and DSL," you sound senior. If you can't, you sound like you read blog posts.`,terms:["Pipeline as DAG","Component","Artifact lineage","Parameter passing","Conditional execution","Loops in pipelines"],resource:"KubeFlow concepts page. Architecture docs.",test:['Why is "pipeline as code" valuable over YAML?',"How does artifact lineage help debugging?","When would you NOT use KubeFlow?"]}},project:"Working 2-step KubeFlow pipeline in mlops-lab",sd:{topicId:"dropbox",topic:"Design Dropbox — file sync, chunking, delta sync",source:"Grokking SD Interview"},dsa:{patternId:"graphs",topic:"Graphs — more patterns"}},{num:16,phase:"UPenn Semester",title:"Spark Mental Model",blockA:{task:"One 3-hour Spark intro — DataFrames only",brief:{insight:"Read a CSV with PySpark, do 3 transformations (filter, groupBy, agg), write to parquet. That's it. No clusters, no tuning, just the API and the lazy-evaluation mental model.",why:"Spark is overkill for most problems. Knowing when it's overkill (vs pandas) is more valuable than memorizing the API.",terms:["SparkSession","DataFrame","Transformations vs actions","Lazy evaluation",".show()",".explain()","Parquet"],resource:'Spark DataFrame quickstart. Holden Karau "Spark: The Definitive Guide" first chapters.',test:["What triggers actual computation in Spark?","Why does Spark output Parquet by default?","When does PySpark beat pandas?"],doneWhen:"A notebook that processes a real dataset in under 10 lines of Spark code."}},blockB:{task:"When you actually need Spark vs pandas",brief:{insight:"Spark equals lazy distributed pandas. You describe operations on a DataFrame, nothing runs until you trigger an action. The DAG gets optimized as a whole. .explain() shows what Spark plans to do.",why:'The honest answer to "when do you need Spark?" is: rarely if data fits in memory, often if not. The mental model lets you have that conversation.',terms:["SparkSession","DataFrame","RDD","Transformation vs action","Catalyst optimizer","Partition","Shuffle","Broadcast join"],resource:'Spark UI walkthrough on databricks.com. "Spark: Definitive Guide" (free PDF).',test:["When is Spark overkill?","Transformation vs action?","Why is .collect() dangerous on big data?"]}},project:"One Spark notebook processing a real dataset",sd:{topicId:"web-crawler",topic:"Design Web Crawler — distributed, politeness, dedup",source:"Grokking SD Interview"},dsa:{patternId:"dp",topic:"1-D Dynamic Programming — the memoization pattern"}},{num:17,phase:"UPenn Semester",title:"ML Monitoring",blockA:{task:"Add Evidently for data drift",brief:{insight:'Plug Evidently into a model in mlops-lab. Compute drift on synthetic "new" data. Export to JSON, ingest into Grafana.',why:"You know Prometheus and Grafana already. Adding ML-specific metrics to that stack is a way smaller jump than learning a whole new tool.",terms:["Data drift","Concept drift","PSI (Population Stability Index)","KS statistic","Grafana dashboards from JSON","Alerting rules"],resource:"Evidently AI's docs and blog. They literally wrote the book.",test:["Why JSON intermediate instead of pushing metrics directly?","What threshold for PSI alert?","When does drift detection give false positives?"],doneWhen:"Grafana shows a drift score over time that changes when you inject distribution-shifted data."}},blockB:{task:"Why model drift differs from infra monitoring",brief:{insight:"Infra monitoring catches things that are broken. ML monitoring catches things that are wrong. A model can have 100% uptime, perfect latency, and silently make worse predictions because the world changed. That's drift.",why:`This is the unique value of MLOps over DevOps. If you can explain WHY model monitoring is different, you've earned your "MLOps engineer" title.`,terms:["Data drift","Concept drift","Label drift","Prediction drift","PSI","KS statistic","Ground truth lag","Shadow deployment"],resource:'Evidently blog. "Reliable Machine Learning" book by Cathy Chen et al.',test:["Why is ground truth always delayed?","Difference between data drift and concept drift?","When would you NOT need drift monitoring?"]}},project:"Grafana dashboard with a drift metric over time",sd:{topicId:"news-feed",topic:"Design Facebook News Feed — ranking, push vs pull",source:"Grokking SD Interview"},dsa:{patternId:"dp",topic:"1-D DP — more practice"}},{num:18,phase:"UPenn Semester",title:"CML in CI/CD",blockA:{task:"GitHub Actions workflow that trains + posts metrics to PR",brief:{insight:'CML (Continuous Machine Learning) by Iterative posts model metrics as PR comments with plots. Suddenly every PR answers "did this make the model better?"',why:"This is the demo that wins interviews. Recruiters can SEE your work — they open a PR, see auto-generated metrics, instantly understand you do real MLOps.",terms:["CML GitHub Action","GITHUB_TOKEN","cml comment create","Vega plots","Self-hosted runners (GPU)"],resource:"iterative.ai's CML docs and example repos.",test:["Why use GITHUB_TOKEN vs a PAT?","How handle non-deterministic training in CI?","Cost model of training on every PR?"],doneWhen:"A PR you opened has an auto-generated comment with model metrics and a plot."}},blockB:{task:"Why ML deserves first-class CI/CD treatment",brief:{insight:`Treating models like code means every PR can answer "did this make the model better?" That's a deployment gate. It's what separates "we have a model in prod" from "we have a continuously-improving model in prod."`,why:"The promise of MLOps is fast, safe iteration. CML is one concrete way to deliver that. Also a visible portfolio piece.",terms:["Continuous training","Continuous evaluation","Model gating","Golden dataset","Shadow evaluation","Regression tests for ML"],resource:"Made-With-ML CI/CD chapter. iterative.ai blog on MLOps maturity.",test:["What metric would you regression-test on every PR?","How handle non-deterministic training in CI?","When does CML get expensive?"]}},project:"PR with auto-generated model performance comment",sd:{topicId:"recommendation",topic:"ML SD — Recommendation System",source:"Grokking ML SD Interview"},dsa:{patternId:"dp",topic:"2-D Dynamic Programming intro"}},{num:19,phase:"UPenn Semester",title:"Explainable AI",blockA:{task:"Add SHAP to your model, generate summary plots",brief:{insight:"SHAP tells you which features drove each prediction. Summary plot = global view. Force plot = local view (why this specific prediction).",why:"When your model is wrong, SHAP often tells you which feature betrayed you. Debugging superpower more than regulatory checkbox.",terms:["SHAP values","Summary plot","Force plot","LIME (alternative)","Feature importance vs attribution","TreeExplainer"],resource:'SHAP official docs (slundberg/shap). Christoph Molnar "Interpretable ML" book (free online).',test:['Why are SHAP values "fair" mathematically?',"When does global feature importance mislead you?","How embed a SHAP plot in a PR comment?"],doneWhen:"PR comment shows model performance AND a SHAP plot explaining feature drivers."}},blockB:{task:"When explainability is required vs nice-to-have",brief:{insight:"Explainability isn't optional in regulated domains (finance, healthcare, hiring, defense). Even where optional, it's a debugging superpower. SHAP, LIME, integrated gradients are the three big techniques.",why:'"Explainable AI" is a buzzword. Knowing the actual techniques is the substance. Especially relevant for defense — DoD increasingly requires it.',terms:["SHAP","LIME","Integrated gradients","Feature importance (global) vs attribution (local)","Counterfactual explanations","Model cards"],resource:`Christoph Molnar "Interpretable Machine Learning". Google's Model Cards paper.`,test:["When is global feature importance misleading?",'Why are SHAP values mathematically "fair"?',"What's a model card?"]}},project:"PR comment with SHAP plot via CML",sd:{topicId:"search-ranking",topic:"ML SD — Search Ranking, embeddings",source:"Grokking ML SD Interview"},dsa:{patternId:"dp",topic:"2-D DP — more practice"}},{num:20,phase:"UPenn Semester",title:"Capstone Polish",blockA:{task:"Tie mlops-lab into one story: data → model → serve → monitor → explain",brief:{insight:"Your mlops-lab should tell ONE story: dataset → versioning → training → registry → serving → monitoring → explainability. README walks a stranger through it.",why:`Time to compound. This week is the difference between "I studied MLOps" (forgettable) and "I shipped an MLOps system, here's the proof" (memorable).`,terms:["Narrative architecture","End-to-end demo","Video walkthrough (Loom)","Deployable demo","GitHub Pages for project sites"],resource:"How Stripe, Airbnb, Netflix engineering blogs structure project writeups.",test:["Can you demo the full pipeline in 5 minutes?","Does a 2-min video walkthrough exist?","Is the LinkedIn post drafted?"],doneWhen:"You can demo the full pipeline in 5 minutes. LinkedIn post published with link."}},blockB:{task:"Write portfolio narrative + LinkedIn post",brief:{insight:`The portfolio piece you ship in week 20 IS your value proposition to platform engineering hiring managers. It says: "I understand DevOps, MLOps, and how they connect." That's a rare profile.`,why:"Three-year career capital compounds from here. Portfolio + UPenn + clearance + DevSecOps + MLOps is rare enough to command $250K+ offers in 2027-2028.",terms:["Hiring signal","Recruiter-friendly summary","Public demo","Storytelling for engineers","LinkedIn as portfolio"],resource:"Stripe engineering blog. Airbnb tech blog. Read 5 posts, notice the structure, copy it.",test:["Can a non-technical recruiter understand what you built?","Can a senior engineer evaluate your skill?","Have you posted it?"]}},project:"Portfolio-ready mlops-lab + LinkedIn writeup published",sd:{topicId:"mock-week",topic:"Mock interview week — 3 problems under 45-min timer",source:"Self-directed · RESHADED framework"},dsa:{patternId:"review",topic:"Review weak patterns + mock LeetCode session"}}],X="runway:v2:progress",Z="runway:v2:sync",ee="runway:v2:ai",s={progress:{},activeTab:"today",selectedWeek:1,selectedLesson:null,expandedBriefs:new Set,showSettings:!1,showAI:!1,aiContext:null,syncConfig:{url:"",email:"",password:"",enabled:!1},syncStatus:"offline",aiConfig:{apiKey:"",enabled:!1}};let O=[];function pe(e){return O.push(e),()=>{O=O.filter(t=>t!==e)}}function k(){O.forEach(e=>e())}function ue(){try{const e=localStorage.getItem(X);e&&(s.progress=JSON.parse(e).progress||{})}catch(e){console.error("load progress",e)}try{const e=localStorage.getItem(Z);e&&Object.assign(s.syncConfig,JSON.parse(e))}catch(e){console.error("load sync",e)}try{const e=localStorage.getItem(ee);e&&Object.assign(s.aiConfig,JSON.parse(e))}catch(e){console.error("load ai",e)}s.selectedWeek=G()}function z(){try{localStorage.setItem(X,JSON.stringify({version:2,progress:s.progress,savedAt:new Date().toISOString()}))}catch(e){console.error("save progress",e)}}function te(){try{localStorage.setItem(Z,JSON.stringify(s.syncConfig))}catch(e){console.error("save sync",e)}}function se(){try{localStorage.setItem(ee,JSON.stringify(s.aiConfig))}catch(e){console.error("save ai",e)}}function he(e,t){s.progress[e]=t,z(),ye(),k()}function x(e){return!!s.progress[e]}function R(e){he(e,!s.progress[e])}function Y(e,t){const r=new Date(e.getFullYear(),e.getMonth(),e.getDate()),i=new Date(t.getFullYear(),t.getMonth(),t.getDate());return Math.floor((i-r)/864e5)}function G(){const e=Y(H,new Date);return Math.max(1,Math.min(20,Math.floor(e/7)+1))}function oe(){return(Y(H,new Date)%7+7)%7}function me(e){const t=new Date(H);return t.setDate(t.getDate()+(e-1)*7),t}function ie(){let e=0,t=0,r=0,i=0,o=0;for(let a=1;a<=20;a++){for(let c=0;c<7;c++)e+=2,s.progress[`w${a}_d${c}_a`]&&t++,s.progress[`w${a}_d${c}_b`]&&t++;s.progress[`w${a}_project`]&&r++,s.progress[`w${a}_sd`]&&i++,s.progress[`w${a}_dsa`]&&o++}const n=new Date;let d=0;for(let a=0;a<140;a++){const c=new Date(n);c.setDate(n.getDate()-a);const y=Y(H,c);if(y<0)break;const g=Math.floor(y/7)+1,v=y%7;if(!(g<1||g>20))if(s.progress[`w${g}_d${v}_a`]||s.progress[`w${g}_d${v}_b`])d++;else break}let l=0;return Object.keys(s.progress).forEach(a=>{a.startsWith("dsa_")&&s.progress[a]&&l++}),{totalBlocks:e,doneBlocks:t,projects:r,sds:i,dsas:o,dsaProbs:l,streak:d,pct:e?Math.round(t/e*100):0}}const D={token:null,userId:null,recordId:null};let j=null;async function re(){const e=await fetch(`${s.syncConfig.url}/api/collections/users/auth-with-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({identity:s.syncConfig.email,password:s.syncConfig.password})});if(!e.ok)throw new Error("Auth failed: "+e.status);const t=await e.json();D.token=t.token,D.userId=t.record.id}async function ae(){const e=`${s.syncConfig.url}/api/collections/state/records?filter=(user='${D.userId}')&perPage=1`,t=await fetch(e,{headers:{Authorization:D.token}});if(!t.ok)throw new Error("Fetch failed: "+t.status);return(await t.json()).items[0]||null}async function ge(){const e=JSON.stringify({user:D.userId,data:s.progress}),t={"Content-Type":"application/json",Authorization:D.token};let r;if(D.recordId?r=await fetch(`${s.syncConfig.url}/api/collections/state/records/${D.recordId}`,{method:"PATCH",headers:t,body:e}):r=await fetch(`${s.syncConfig.url}/api/collections/state/records`,{method:"POST",headers:t,body:e}),!r.ok)throw new Error("Save failed: "+r.status);const i=await r.json();D.recordId=i.id}async function E(){if(!(!s.syncConfig.enabled||!s.syncConfig.url))try{s.syncStatus="syncing",k(),D.token||await re();const e=await ae();e&&(D.recordId=e.id,s.progress=e.data||{},z()),s.syncStatus="synced",k()}catch(e){console.error("pull",e),s.syncStatus="error",k()}}async function ne(){if(!(!s.syncConfig.enabled||!s.syncConfig.url))try{if(s.syncStatus="syncing",k(),D.token||await re(),!D.recordId){const e=await ae();e&&(D.recordId=e.id)}await ge(),s.syncStatus="synced",k()}catch(e){console.error("push",e),s.syncStatus="error",k()}}function ye(){s.syncConfig.enabled&&(j&&clearTimeout(j),j=setTimeout(ne,800))}setInterval(()=>{s.syncConfig.enabled&&s.syncStatus!=="syncing"&&E()},45e3);window.addEventListener("focus",()=>{s.syncConfig.enabled&&s.syncStatus!=="syncing"&&E()});const be="claude-sonnet-4-5-20250929";async function le(e,t=null){if(!s.aiConfig.apiKey)throw new Error("No API key configured. Open settings.");const r={model:be,max_tokens:1024,messages:[{role:"user",content:e}]};t&&(r.system=t);const i=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":s.aiConfig.apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true","Content-Type":"application/json"},body:JSON.stringify(r)});if(!i.ok){const n=await i.text();throw new Error(`AI error ${i.status}: ${n.substring(0,200)}`)}return(await i.json()).content.filter(n=>n.type==="text").map(n=>n.text).join(`
`)}function fe(){const e=new Blob([JSON.stringify({progress:s.progress,exportedAt:new Date().toISOString()},null,2)],{type:"application/json"}),t=URL.createObjectURL(e),r=document.createElement("a");r.href=t,r.download=`runway-backup-${new Date().toISOString().split("T")[0]}.json`,r.click(),URL.revokeObjectURL(t)}function we(){confirm("Reset ALL progress? This cannot be undone.")&&(s.progress={},z(),k())}const T=e=>String(e||"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),ve=e=>["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][e];function V(){const e=G(),t=oe(),r=U[e-1];if(!r)return'<div class="view"><div class="empty">Plan starts May 21, 2026.</div></div>';const i=q[r.phase],o=x(`w${e}_d${t}_a`),n=x(`w${e}_d${t}_b`),d=x(`w${e}_project`),l=x(`w${e}_sd`),a=x(`w${e}_dsa`);return`
    <div class="view stagger">
      <div class="today-hero">
        <div class="today-date">${new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}).toUpperCase()}</div>
        <h1 class="today-day">${ve(t)}<span class="dot">.</span></h1>
        <div class="today-week-meta">
          <span class="chip chip-track-${i.code}">${r.phase}</span>
          <span class="chip">Week ${e} of 20</span>
          <span class="chip">${T(r.title)}</span>
        </div>
      </div>

      <section class="feed-section">
        <div class="kicker" style="margin-bottom: 12px;">Today's Focus · 2 blocks</div>
        ${_("a",e,t,r.blockA,o)}
        ${_("b",e,t,r.blockB,n)}
      </section>

      <section class="feed-section">
        <div class="kicker" style="margin-bottom: 12px;">This Week's Tracks</div>

        <div class="track-card sd ${l?"done":""}" data-action="open-sd" data-id="${r.sd.topicId}" style="cursor: pointer;">
          <div class="row between gap-3" style="margin-bottom: 8px;">
            <span class="chip chip-track-sd">◇ System Design</span>
            <button class="check-circle ${l?"done":""}" data-action="toggle-sd" data-week="${e}" onclick="event.stopPropagation();">${l?"✓":""}</button>
          </div>
          <div class="h4" style="margin-bottom: 4px;">${T(r.sd.topic)}</div>
          <div class="caption">${T(r.sd.source)} · 2–3 sessions of ~30 min · Tap to open lesson →</div>
        </div>

        <div class="track-card dsa ${a?"done":""}" data-action="open-dsa" data-id="${r.dsa.patternId}" style="cursor: pointer;">
          <div class="row between gap-3" style="margin-bottom: 8px;">
            <span class="chip chip-track-dsa">⌘ DSA Pattern</span>
            <button class="check-circle ${a?"done":""}" data-action="toggle-dsa" data-week="${e}" onclick="event.stopPropagation();">${a?"✓":""}</button>
          </div>
          <div class="h4" style="margin-bottom: 4px;">${T(r.dsa.topic)}</div>
          <div class="caption">NeetCode 150 pattern · 3–5 problems this week · Tap to open lesson →</div>
        </div>
      </section>

      <section class="feed-section">
        <div class="kicker" style="margin-bottom: 12px;">Week ${e} Mini-Project</div>
        <div class="card tappable ${d?"done":""}" data-action="toggle-project" data-week="${e}">
          <div class="row gap-3">
            <span class="check-circle ${d?"done":""}">${d?"✓":""}</span>
            <span class="body">${T(r.project)}</span>
          </div>
        </div>
      </section>

      <div class="caption" style="text-align: center; font-style: italic; margin-top: 24px;">
        Either daily block counts toward your streak. The goal is momentum.
      </div>
    </div>
  `}function _(e,t,r,i,o){const n=e==="a",d=`today-${e}-${t}`,l=s.expandedBriefs.has(d);return`
    <div class="block-card ${e}-block ${o?"done":""}">
      <div class="block-card-header" data-action="toggle-block" data-week="${t}" data-day="${r}" data-kind="${e}" style="cursor:pointer;">
        <span class="block-card-tag">Block ${e.toUpperCase()} · ${n?"Build":"Understand"}</span>
        <span class="check-circle ${o?"done":""}">${o?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>':""}</span>
      </div>
      <div class="block-card-task" data-action="toggle-block" data-week="${t}" data-day="${r}" data-kind="${e}" style="cursor:pointer;">${T(i.task)}</div>
      <div class="block-card-time">${n?"45 min · hands-on":"30 min · conceptual"}</div>

      <button class="learn-toggle ${l?"open":""}" data-action="toggle-brief" data-brief="${d}">
        <span class="arrow">›</span>
        <span>${l?"Hide":"Learn"} the concept</span>
      </button>
      <div class="brief ${n?"":"b"} ${l?"open":""}">
        ${ke(i.brief)}
      </div>
    </div>
  `}function ke(e,t){const r=(e.terms||[]).map(n=>`<span class="chip">${T(n)}</span>`).join(""),i=(e.test||[]).map(n=>`<li>${T(n)}</li>`).join(""),o=e.doneWhen?`
    <div class="brief-section">
      <div class="brief-label">Done When</div>
      <div class="brief-done">${T(e.doneWhen)}</div>
    </div>`:"";return`
    <div class="brief-section">
      <div class="brief-label">Core Insight</div>
      <div class="brief-text">${T(e.insight)}</div>
    </div>
    <div class="brief-section">
      <div class="brief-label">Why This Matters</div>
      <div class="brief-why">${T(e.why)}</div>
    </div>
    <div class="brief-section">
      <div class="brief-label">Key Terms</div>
      <div class="brief-terms">${r}</div>
    </div>
    <div class="brief-section">
      <div class="brief-label">Best Resource</div>
      <div class="brief-resource">${T(e.resource)}</div>
    </div>
    <div class="brief-section">
      <div class="brief-label">Self-Test</div>
      <ul class="brief-tests">${i}</ul>
    </div>
    ${o}
    ${s.aiConfig.enabled?`
      <button class="btn" style="margin-top: 12px;" data-action="ask-ai" data-context="${T(e.insight.substring(0,200))}">
        Ask Claude about this →
      </button>
    `:""}
  `}const K=[{id:"arrays-hashing",title:"Arrays & Hashing",blurb:"The foundation. Hash maps for O(1) lookups, arrays for ordered data. If you can't solve these fast, nothing else compiles.",color:"#F5B842",lessonId:"arrays-hashing",problems:[{id:"contains-duplicate",title:"Contains Duplicate",difficulty:"Easy",url:"https://leetcode.com/problems/contains-duplicate/"},{id:"valid-anagram",title:"Valid Anagram",difficulty:"Easy",url:"https://leetcode.com/problems/valid-anagram/"},{id:"two-sum",title:"Two Sum",difficulty:"Easy",url:"https://leetcode.com/problems/two-sum/"},{id:"group-anagrams",title:"Group Anagrams",difficulty:"Medium",url:"https://leetcode.com/problems/group-anagrams/"},{id:"top-k-frequent",title:"Top K Frequent Elements",difficulty:"Medium",url:"https://leetcode.com/problems/top-k-frequent-elements/"},{id:"product-except-self",title:"Product of Array Except Self",difficulty:"Medium",url:"https://leetcode.com/problems/product-of-array-except-self/"},{id:"valid-sudoku",title:"Valid Sudoku",difficulty:"Medium",url:"https://leetcode.com/problems/valid-sudoku/"},{id:"encode-decode-strings",title:"Encode and Decode Strings",difficulty:"Medium",url:"https://leetcode.com/problems/encode-and-decode-strings/"},{id:"longest-consecutive",title:"Longest Consecutive Sequence",difficulty:"Medium",url:"https://leetcode.com/problems/longest-consecutive-sequence/"}]},{id:"two-pointers",title:"Two Pointers",blurb:"Two indices walking through an array, often from opposite ends. Trades brute-force O(n²) for elegant O(n).",color:"#E07856",lessonId:"two-pointers",problems:[{id:"valid-palindrome",title:"Valid Palindrome",difficulty:"Easy",url:"https://leetcode.com/problems/valid-palindrome/"},{id:"two-sum-ii",title:"Two Sum II - Sorted Input",difficulty:"Medium",url:"https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/"},{id:"3sum",title:"3Sum",difficulty:"Medium",url:"https://leetcode.com/problems/3sum/"},{id:"container-most-water",title:"Container With Most Water",difficulty:"Medium",url:"https://leetcode.com/problems/container-with-most-water/"},{id:"trapping-rain-water",title:"Trapping Rain Water",difficulty:"Hard",url:"https://leetcode.com/problems/trapping-rain-water/"}]},{id:"sliding-window",title:"Sliding Window",blurb:'A window of indices that grows and shrinks as you traverse. Optimization for "find the best subarray/substring" problems.',color:"#8FA876",lessonId:"sliding-window",problems:[{id:"best-time-buy-sell",title:"Best Time to Buy and Sell Stock",difficulty:"Easy",url:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"},{id:"longest-substring-no-repeat",title:"Longest Substring Without Repeating",difficulty:"Medium",url:"https://leetcode.com/problems/longest-substring-without-repeating-characters/"},{id:"longest-repeat-replacement",title:"Longest Repeating Character Replacement",difficulty:"Medium",url:"https://leetcode.com/problems/longest-repeating-character-replacement/"},{id:"permutation-in-string",title:"Permutation in String",difficulty:"Medium",url:"https://leetcode.com/problems/permutation-in-string/"},{id:"min-window-substring",title:"Minimum Window Substring",difficulty:"Hard",url:"https://leetcode.com/problems/minimum-window-substring/"},{id:"sliding-window-max",title:"Sliding Window Maximum",difficulty:"Hard",url:"https://leetcode.com/problems/sliding-window-maximum/"}]},{id:"stack",title:"Stack",blurb:'LIFO data structure. The "I need to remember things in reverse order" pattern. Parentheses, expressions, monotonic stacks.',color:"#7B9FB5",lessonId:"stack",problems:[{id:"valid-parentheses",title:"Valid Parentheses",difficulty:"Easy",url:"https://leetcode.com/problems/valid-parentheses/"},{id:"min-stack",title:"Min Stack",difficulty:"Medium",url:"https://leetcode.com/problems/min-stack/"},{id:"eval-reverse-polish",title:"Evaluate Reverse Polish Notation",difficulty:"Medium",url:"https://leetcode.com/problems/evaluate-reverse-polish-notation/"},{id:"generate-parentheses",title:"Generate Parentheses",difficulty:"Medium",url:"https://leetcode.com/problems/generate-parentheses/"},{id:"daily-temperatures",title:"Daily Temperatures",difficulty:"Medium",url:"https://leetcode.com/problems/daily-temperatures/"},{id:"car-fleet",title:"Car Fleet",difficulty:"Medium",url:"https://leetcode.com/problems/car-fleet/"},{id:"largest-rectangle-histo",title:"Largest Rectangle in Histogram",difficulty:"Hard",url:"https://leetcode.com/problems/largest-rectangle-in-histogram/"}]},{id:"binary-search",title:"Binary Search",blurb:"Divide the search space in half each step. O(log n). Works on sorted data — and on monotonic answer spaces.",color:"#B888C0",lessonId:"binary-search",problems:[{id:"binary-search",title:"Binary Search",difficulty:"Easy",url:"https://leetcode.com/problems/binary-search/"},{id:"search-2d-matrix",title:"Search a 2D Matrix",difficulty:"Medium",url:"https://leetcode.com/problems/search-a-2d-matrix/"},{id:"koko-eating-bananas",title:"Koko Eating Bananas",difficulty:"Medium",url:"https://leetcode.com/problems/koko-eating-bananas/"},{id:"find-min-rotated",title:"Find Min in Rotated Sorted Array",difficulty:"Medium",url:"https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"},{id:"search-rotated-array",title:"Search in Rotated Sorted Array",difficulty:"Medium",url:"https://leetcode.com/problems/search-in-rotated-sorted-array/"},{id:"time-based-kv-store",title:"Time Based Key-Value Store",difficulty:"Medium",url:"https://leetcode.com/problems/time-based-key-value-store/"},{id:"median-two-sorted",title:"Median of Two Sorted Arrays",difficulty:"Hard",url:"https://leetcode.com/problems/median-of-two-sorted-arrays/"}]},{id:"linked-list",title:"Linked List",blurb:"Nodes connected by pointers. The data structure that teaches you to think in references. Fast/slow pointers, reversal, cycle detection.",color:"#F5B842",lessonId:"linked-list",problems:[{id:"reverse-linked-list",title:"Reverse Linked List",difficulty:"Easy",url:"https://leetcode.com/problems/reverse-linked-list/"},{id:"merge-two-sorted-lists",title:"Merge Two Sorted Lists",difficulty:"Easy",url:"https://leetcode.com/problems/merge-two-sorted-lists/"},{id:"reorder-list",title:"Reorder List",difficulty:"Medium",url:"https://leetcode.com/problems/reorder-list/"},{id:"remove-nth-from-end",title:"Remove Nth Node From End",difficulty:"Medium",url:"https://leetcode.com/problems/remove-nth-node-from-end-of-list/"},{id:"copy-list-random-pointer",title:"Copy List with Random Pointer",difficulty:"Medium",url:"https://leetcode.com/problems/copy-list-with-random-pointer/"},{id:"add-two-numbers",title:"Add Two Numbers",difficulty:"Medium",url:"https://leetcode.com/problems/add-two-numbers/"},{id:"linked-list-cycle",title:"Linked List Cycle",difficulty:"Easy",url:"https://leetcode.com/problems/linked-list-cycle/"},{id:"find-duplicate-number",title:"Find the Duplicate Number",difficulty:"Medium",url:"https://leetcode.com/problems/find-the-duplicate-number/"},{id:"lru-cache",title:"LRU Cache",difficulty:"Medium",url:"https://leetcode.com/problems/lru-cache/"},{id:"merge-k-sorted-lists",title:"Merge K Sorted Lists",difficulty:"Hard",url:"https://leetcode.com/problems/merge-k-sorted-lists/"},{id:"reverse-nodes-k-group",title:"Reverse Nodes in K-Group",difficulty:"Hard",url:"https://leetcode.com/problems/reverse-nodes-in-k-group/"}]},{id:"trees",title:"Trees",blurb:'Recursive structures. Most tree problems are "do thing for root, recurse on children, combine." BFS for level-order, DFS for path-based.',color:"#8FA876",lessonId:"trees",problems:[{id:"invert-tree",title:"Invert Binary Tree",difficulty:"Easy",url:"https://leetcode.com/problems/invert-binary-tree/"},{id:"max-depth-binary-tree",title:"Maximum Depth of Binary Tree",difficulty:"Easy",url:"https://leetcode.com/problems/maximum-depth-of-binary-tree/"},{id:"diameter-binary-tree",title:"Diameter of Binary Tree",difficulty:"Easy",url:"https://leetcode.com/problems/diameter-of-binary-tree/"},{id:"balanced-binary-tree",title:"Balanced Binary Tree",difficulty:"Easy",url:"https://leetcode.com/problems/balanced-binary-tree/"},{id:"same-tree",title:"Same Tree",difficulty:"Easy",url:"https://leetcode.com/problems/same-tree/"},{id:"subtree-of-another-tree",title:"Subtree of Another Tree",difficulty:"Easy",url:"https://leetcode.com/problems/subtree-of-another-tree/"},{id:"lca-bst",title:"Lowest Common Ancestor of BST",difficulty:"Medium",url:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"},{id:"level-order-traversal",title:"Binary Tree Level Order Traversal",difficulty:"Medium",url:"https://leetcode.com/problems/binary-tree-level-order-traversal/"},{id:"right-side-view",title:"Binary Tree Right Side View",difficulty:"Medium",url:"https://leetcode.com/problems/binary-tree-right-side-view/"},{id:"good-nodes",title:"Count Good Nodes in Binary Tree",difficulty:"Medium",url:"https://leetcode.com/problems/count-good-nodes-in-binary-tree/"},{id:"validate-bst",title:"Validate Binary Search Tree",difficulty:"Medium",url:"https://leetcode.com/problems/validate-binary-search-tree/"},{id:"kth-smallest-bst",title:"Kth Smallest Element in BST",difficulty:"Medium",url:"https://leetcode.com/problems/kth-smallest-element-in-a-bst/"},{id:"build-tree-from-preorder",title:"Construct Tree from Preorder/Inorder",difficulty:"Medium",url:"https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/"},{id:"binary-tree-max-path-sum",title:"Binary Tree Max Path Sum",difficulty:"Hard",url:"https://leetcode.com/problems/binary-tree-maximum-path-sum/"},{id:"serialize-deserialize-tree",title:"Serialize/Deserialize Binary Tree",difficulty:"Hard",url:"https://leetcode.com/problems/serialize-and-deserialize-binary-tree/"}]},{id:"tries",title:"Tries",blurb:`Prefix trees. The data structure that makes "search by prefix" O(L) where L is prefix length. Autocomplete's secret.`,color:"#7B9FB5",lessonId:"tries",problems:[{id:"implement-trie",title:"Implement Trie (Prefix Tree)",difficulty:"Medium",url:"https://leetcode.com/problems/implement-trie-prefix-tree/"},{id:"design-add-search-words",title:"Design Add and Search Words",difficulty:"Medium",url:"https://leetcode.com/problems/design-add-and-search-words-data-structure/"},{id:"word-search-ii",title:"Word Search II",difficulty:"Hard",url:"https://leetcode.com/problems/word-search-ii/"}]},{id:"heap",title:"Heap / Priority Queue",blurb:`A tree-based structure where the root is always the min (or max). O(log n) insert and extract. Use it whenever "what's the top/bottom K" comes up.`,color:"#B888C0",lessonId:"heap",problems:[{id:"kth-largest-stream",title:"Kth Largest Element in Stream",difficulty:"Easy",url:"https://leetcode.com/problems/kth-largest-element-in-a-stream/"},{id:"last-stone-weight",title:"Last Stone Weight",difficulty:"Easy",url:"https://leetcode.com/problems/last-stone-weight/"},{id:"k-closest-points-origin",title:"K Closest Points to Origin",difficulty:"Medium",url:"https://leetcode.com/problems/k-closest-points-to-origin/"},{id:"kth-largest-array",title:"Kth Largest Element in Array",difficulty:"Medium",url:"https://leetcode.com/problems/kth-largest-element-in-an-array/"},{id:"task-scheduler",title:"Task Scheduler",difficulty:"Medium",url:"https://leetcode.com/problems/task-scheduler/"},{id:"design-twitter",title:"Design Twitter",difficulty:"Medium",url:"https://leetcode.com/problems/design-twitter/"},{id:"find-median-stream",title:"Find Median from Data Stream",difficulty:"Hard",url:"https://leetcode.com/problems/find-median-from-data-stream/"}]},{id:"backtracking",title:"Backtracking",blurb:"Try a choice, recurse, undo the choice. The brute-force-with-pruning pattern. Permutations, combinations, subsets.",color:"#E07856",lessonId:"backtracking",problems:[{id:"subsets",title:"Subsets",difficulty:"Medium",url:"https://leetcode.com/problems/subsets/"},{id:"combination-sum",title:"Combination Sum",difficulty:"Medium",url:"https://leetcode.com/problems/combination-sum/"},{id:"permutations",title:"Permutations",difficulty:"Medium",url:"https://leetcode.com/problems/permutations/"},{id:"subsets-ii",title:"Subsets II",difficulty:"Medium",url:"https://leetcode.com/problems/subsets-ii/"},{id:"combination-sum-ii",title:"Combination Sum II",difficulty:"Medium",url:"https://leetcode.com/problems/combination-sum-ii/"},{id:"word-search",title:"Word Search",difficulty:"Medium",url:"https://leetcode.com/problems/word-search/"},{id:"palindrome-partitioning",title:"Palindrome Partitioning",difficulty:"Medium",url:"https://leetcode.com/problems/palindrome-partitioning/"},{id:"letter-combos-phone",title:"Letter Combinations of Phone Number",difficulty:"Medium",url:"https://leetcode.com/problems/letter-combinations-of-a-phone-number/"},{id:"n-queens",title:"N-Queens",difficulty:"Hard",url:"https://leetcode.com/problems/n-queens/"}]},{id:"graphs",title:"Graphs",blurb:"Nodes connected by edges. The most flexible data structure. BFS for shortest paths, DFS for connectivity, Union-Find for groups.",color:"#8FA876",lessonId:"graphs",problems:[{id:"number-of-islands",title:"Number of Islands",difficulty:"Medium",url:"https://leetcode.com/problems/number-of-islands/"},{id:"clone-graph",title:"Clone Graph",difficulty:"Medium",url:"https://leetcode.com/problems/clone-graph/"},{id:"max-area-of-island",title:"Max Area of Island",difficulty:"Medium",url:"https://leetcode.com/problems/max-area-of-island/"},{id:"pacific-atlantic-flow",title:"Pacific Atlantic Water Flow",difficulty:"Medium",url:"https://leetcode.com/problems/pacific-atlantic-water-flow/"},{id:"surrounded-regions",title:"Surrounded Regions",difficulty:"Medium",url:"https://leetcode.com/problems/surrounded-regions/"},{id:"rotting-oranges",title:"Rotting Oranges",difficulty:"Medium",url:"https://leetcode.com/problems/rotting-oranges/"},{id:"walls-and-gates",title:"Walls and Gates",difficulty:"Medium",url:"https://leetcode.com/problems/walls-and-gates/"},{id:"course-schedule",title:"Course Schedule",difficulty:"Medium",url:"https://leetcode.com/problems/course-schedule/"},{id:"course-schedule-ii",title:"Course Schedule II",difficulty:"Medium",url:"https://leetcode.com/problems/course-schedule-ii/"},{id:"redundant-connection",title:"Redundant Connection",difficulty:"Medium",url:"https://leetcode.com/problems/redundant-connection/"},{id:"word-ladder",title:"Word Ladder",difficulty:"Hard",url:"https://leetcode.com/problems/word-ladder/"},{id:"count-components",title:"Number of Connected Components",difficulty:"Medium",url:"https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/"},{id:"graph-valid-tree",title:"Graph Valid Tree",difficulty:"Medium",url:"https://leetcode.com/problems/graph-valid-tree/"}]},{id:"advanced-graphs",title:"Advanced Graphs",blurb:"Weighted graphs, shortest paths, MSTs. Dijkstra, Bellman-Ford, Prim, Kruskal. Less common in interviews but appears at FAANG.",color:"#B888C0",lessonId:"advanced-graphs",problems:[{id:"reconstruct-itinerary",title:"Reconstruct Itinerary",difficulty:"Hard",url:"https://leetcode.com/problems/reconstruct-itinerary/"},{id:"min-cost-connect-points",title:"Min Cost to Connect All Points",difficulty:"Medium",url:"https://leetcode.com/problems/min-cost-to-connect-all-points/"},{id:"network-delay-time",title:"Network Delay Time",difficulty:"Medium",url:"https://leetcode.com/problems/network-delay-time/"},{id:"swim-in-rising-water",title:"Swim in Rising Water",difficulty:"Hard",url:"https://leetcode.com/problems/swim-in-rising-water/"},{id:"alien-dictionary",title:"Alien Dictionary",difficulty:"Hard",url:"https://leetcode.com/problems/alien-dictionary/"},{id:"cheapest-flights-k-stops",title:"Cheapest Flights Within K Stops",difficulty:"Medium",url:"https://leetcode.com/problems/cheapest-flights-within-k-stops/"}]},{id:"1d-dp",title:"1-D Dynamic Programming",blurb:'Break a problem into overlapping subproblems and memoize. "If I knew the answer for n-1, could I get the answer for n?" Climbing stairs, coin change, LIS.',color:"#F5B842",lessonId:"1d-dp",problems:[{id:"climbing-stairs",title:"Climbing Stairs",difficulty:"Easy",url:"https://leetcode.com/problems/climbing-stairs/"},{id:"min-cost-climbing-stairs",title:"Min Cost Climbing Stairs",difficulty:"Easy",url:"https://leetcode.com/problems/min-cost-climbing-stairs/"},{id:"house-robber",title:"House Robber",difficulty:"Medium",url:"https://leetcode.com/problems/house-robber/"},{id:"house-robber-ii",title:"House Robber II",difficulty:"Medium",url:"https://leetcode.com/problems/house-robber-ii/"},{id:"longest-palindromic-substr",title:"Longest Palindromic Substring",difficulty:"Medium",url:"https://leetcode.com/problems/longest-palindromic-substring/"},{id:"palindromic-substrings",title:"Palindromic Substrings",difficulty:"Medium",url:"https://leetcode.com/problems/palindromic-substrings/"},{id:"decode-ways",title:"Decode Ways",difficulty:"Medium",url:"https://leetcode.com/problems/decode-ways/"},{id:"coin-change",title:"Coin Change",difficulty:"Medium",url:"https://leetcode.com/problems/coin-change/"},{id:"max-product-subarray",title:"Maximum Product Subarray",difficulty:"Medium",url:"https://leetcode.com/problems/maximum-product-subarray/"},{id:"word-break",title:"Word Break",difficulty:"Medium",url:"https://leetcode.com/problems/word-break/"},{id:"longest-increasing-subseq",title:"Longest Increasing Subsequence",difficulty:"Medium",url:"https://leetcode.com/problems/longest-increasing-subsequence/"},{id:"partition-equal-subset-sum",title:"Partition Equal Subset Sum",difficulty:"Medium",url:"https://leetcode.com/problems/partition-equal-subset-sum/"}]},{id:"2d-dp",title:"2-D Dynamic Programming",blurb:'DP where state has two dimensions. Grid problems, two-string problems (LCS, edit distance). The "two pointers but DP" pattern.',color:"#E07856",lessonId:"2d-dp",problems:[{id:"unique-paths",title:"Unique Paths",difficulty:"Medium",url:"https://leetcode.com/problems/unique-paths/"},{id:"longest-common-subseq",title:"Longest Common Subsequence",difficulty:"Medium",url:"https://leetcode.com/problems/longest-common-subsequence/"},{id:"best-time-buy-sell-cooldown",title:"Best Time Buy Sell with Cooldown",difficulty:"Medium",url:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/"},{id:"coin-change-ii",title:"Coin Change II",difficulty:"Medium",url:"https://leetcode.com/problems/coin-change-ii/"},{id:"target-sum",title:"Target Sum",difficulty:"Medium",url:"https://leetcode.com/problems/target-sum/"},{id:"interleaving-string",title:"Interleaving String",difficulty:"Medium",url:"https://leetcode.com/problems/interleaving-string/"},{id:"longest-increasing-path",title:"Longest Increasing Path in Matrix",difficulty:"Hard",url:"https://leetcode.com/problems/longest-increasing-path-in-a-matrix/"},{id:"distinct-subsequences",title:"Distinct Subsequences",difficulty:"Hard",url:"https://leetcode.com/problems/distinct-subsequences/"},{id:"edit-distance",title:"Edit Distance",difficulty:"Hard",url:"https://leetcode.com/problems/edit-distance/"},{id:"burst-balloons",title:"Burst Balloons",difficulty:"Hard",url:"https://leetcode.com/problems/burst-balloons/"},{id:"regex-matching",title:"Regular Expression Matching",difficulty:"Hard",url:"https://leetcode.com/problems/regular-expression-matching/"}]},{id:"greedy",title:"Greedy",blurb:"Make the locally optimal choice at each step. Sometimes that gets you the global optimum. Proving WHY it does is the hard part.",color:"#8FA876",lessonId:"greedy",problems:[{id:"max-subarray",title:"Maximum Subarray (Kadane)",difficulty:"Medium",url:"https://leetcode.com/problems/maximum-subarray/"},{id:"jump-game",title:"Jump Game",difficulty:"Medium",url:"https://leetcode.com/problems/jump-game/"},{id:"jump-game-ii",title:"Jump Game II",difficulty:"Medium",url:"https://leetcode.com/problems/jump-game-ii/"},{id:"gas-station",title:"Gas Station",difficulty:"Medium",url:"https://leetcode.com/problems/gas-station/"},{id:"hand-of-straights",title:"Hand of Straights",difficulty:"Medium",url:"https://leetcode.com/problems/hand-of-straights/"},{id:"merge-triplets",title:"Merge Triplets to Form Target",difficulty:"Medium",url:"https://leetcode.com/problems/merge-triplets-to-form-target-triplet/"},{id:"partition-labels",title:"Partition Labels",difficulty:"Medium",url:"https://leetcode.com/problems/partition-labels/"},{id:"valid-parenthesis-string",title:"Valid Parenthesis String",difficulty:"Medium",url:"https://leetcode.com/problems/valid-parenthesis-string/"}]},{id:"intervals",title:"Intervals",blurb:"Problems on ranges with start/end. Almost always sort first, then sweep. Meeting rooms, overlap detection, scheduling.",color:"#7B9FB5",lessonId:"intervals",problems:[{id:"insert-interval",title:"Insert Interval",difficulty:"Medium",url:"https://leetcode.com/problems/insert-interval/"},{id:"merge-intervals",title:"Merge Intervals",difficulty:"Medium",url:"https://leetcode.com/problems/merge-intervals/"},{id:"non-overlapping-intervals",title:"Non-overlapping Intervals",difficulty:"Medium",url:"https://leetcode.com/problems/non-overlapping-intervals/"},{id:"meeting-rooms",title:"Meeting Rooms",difficulty:"Easy",url:"https://leetcode.com/problems/meeting-rooms/"},{id:"meeting-rooms-ii",title:"Meeting Rooms II",difficulty:"Medium",url:"https://leetcode.com/problems/meeting-rooms-ii/"},{id:"min-interval-include-query",title:"Minimum Interval to Include Query",difficulty:"Hard",url:"https://leetcode.com/problems/minimum-interval-to-include-each-query/"}]},{id:"math-geometry",title:"Math & Geometry",blurb:`The "you either see the trick or you don't" category. Matrix manipulation, modular arithmetic, geometric reasoning.`,color:"#B888C0",lessonId:"math-geometry",problems:[{id:"rotate-image",title:"Rotate Image",difficulty:"Medium",url:"https://leetcode.com/problems/rotate-image/"},{id:"spiral-matrix",title:"Spiral Matrix",difficulty:"Medium",url:"https://leetcode.com/problems/spiral-matrix/"},{id:"set-matrix-zeroes",title:"Set Matrix Zeroes",difficulty:"Medium",url:"https://leetcode.com/problems/set-matrix-zeroes/"},{id:"happy-number",title:"Happy Number",difficulty:"Easy",url:"https://leetcode.com/problems/happy-number/"},{id:"plus-one",title:"Plus One",difficulty:"Easy",url:"https://leetcode.com/problems/plus-one/"},{id:"pow-x-n",title:"Pow(x, n)",difficulty:"Medium",url:"https://leetcode.com/problems/powx-n/"},{id:"multiply-strings",title:"Multiply Strings",difficulty:"Medium",url:"https://leetcode.com/problems/multiply-strings/"},{id:"detect-squares",title:"Detect Squares",difficulty:"Medium",url:"https://leetcode.com/problems/detect-squares/"}]},{id:"bit-manipulation",title:"Bit Manipulation",blurb:"XOR tricks, bit shifting, counting set bits. Niche but unmistakable when you need it. Often the difference between O(n) and O(1).",color:"#F5B842",lessonId:"bit-manipulation",problems:[{id:"single-number",title:"Single Number",difficulty:"Easy",url:"https://leetcode.com/problems/single-number/"},{id:"number-of-1-bits",title:"Number of 1 Bits",difficulty:"Easy",url:"https://leetcode.com/problems/number-of-1-bits/"},{id:"counting-bits",title:"Counting Bits",difficulty:"Easy",url:"https://leetcode.com/problems/counting-bits/"},{id:"reverse-bits",title:"Reverse Bits",difficulty:"Easy",url:"https://leetcode.com/problems/reverse-bits/"},{id:"missing-number",title:"Missing Number",difficulty:"Easy",url:"https://leetcode.com/problems/missing-number/"},{id:"sum-two-integers",title:"Sum of Two Integers",difficulty:"Medium",url:"https://leetcode.com/problems/sum-of-two-integers/"},{id:"reverse-integer",title:"Reverse Integer",difficulty:"Medium",url:"https://leetcode.com/problems/reverse-integer/"}]}],C=e=>String(e||"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Q=e=>e.toLocaleDateString("en-US",{month:"short",day:"numeric"}),xe=["M","T","W","T","F","S","S"];function Se(){const e=s.selectedWeek,t=U[e-1],r=me(e),i=e===G(),o=oe(),n=q[t.phase],d=Array.from({length:7},(y,g)=>{const v=new Date(r);v.setDate(r.getDate()+g);const m=i&&g===o,b=x(`w${e}_d${g}_a`),f=x(`w${e}_d${g}_b`);return`
      <div class="day-col ${m?"today":""}">
        <div class="day-label">${xe[g]}</div>
        <div class="day-date">${v.getDate()}</div>
        <button class="day-check ${b?"done-a":""}" data-action="toggle-block" data-week="${e}" data-day="${g}" data-kind="a">${b?"●":"A"}</button>
        <button class="day-check ${f?"done-b":""}" data-action="toggle-block" data-week="${e}" data-day="${g}" data-kind="b">${f?"●":"B"}</button>
      </div>
    `}).join(""),l=x(`w${e}_project`),a=x(`w${e}_sd`),c=x(`w${e}_dsa`);return`
    <div class="view stagger">
      <div class="week-nav">
        ${e>1?`<button class="btn btn-ghost" data-action="select-week" data-week="${e-1}">← W${e-1}</button>`:"<span></span>"}
        ${e<20?`<button class="btn btn-ghost" data-action="select-week" data-week="${e+1}">W${e+1} →</button>`:"<span></span>"}
      </div>

      <div class="week-header">
        <span class="chip chip-track-${n.code}" style="margin-bottom: 12px;">${t.phase}</span>
        <div class="week-meta">
          WEEK ${String(e).padStart(2,"0")} · ${Q(r)} – ${Q(new Date(r.getTime()+6*864e5))}
          ${i?'<span class="chip chip-solid">NOW</span>':""}
        </div>
        <h1 class="week-title">${C(t.title)}</h1>
      </div>

      <div class="card" style="margin-bottom: 12px;">
        <div class="kicker" style="color: var(--accent-amber); margin-bottom: 8px;">Block A · Build · 45 min</div>
        <div class="body" style="color: var(--text-primary);">${C(t.blockA.task)}</div>
      </div>

      <div class="card" style="margin-bottom: 12px;">
        <div class="kicker" style="color: var(--track-upenn); margin-bottom: 8px;">Block B · Understand · 30 min</div>
        <div class="body" style="color: var(--text-primary);">${C(t.blockB.task)}</div>
      </div>

      <div class="day-grid">${d}</div>

      <div class="card tappable ${l?"done":""}" data-action="toggle-project" data-week="${e}" style="margin-bottom: 12px;">
        <div class="kicker" style="margin-bottom: 8px;">Week Project</div>
        <div class="row gap-3">
          <span class="check-circle ${l?"done":""}">${l?"✓":""}</span>
          <span class="body">${C(t.project)}</span>
        </div>
      </div>

      <div class="track-card sd ${a?"done":""} tappable" data-action="open-sd" data-id="${t.sd.topicId}" style="margin-bottom: 12px;">
        <div class="row between" style="margin-bottom: 8px;">
          <span class="chip chip-track-sd">◇ System Design</span>
          <button class="check-circle ${a?"done":""}" data-action="toggle-sd" data-week="${e}" onclick="event.stopPropagation();">${a?"✓":""}</button>
        </div>
        <div class="h4">${C(t.sd.topic)}</div>
        <div class="caption" style="margin-top: 4px;">${C(t.sd.source)} · Tap to open lesson →</div>
      </div>

      <div class="track-card dsa ${c?"done":""} tappable" data-action="open-dsa" data-id="${t.dsa.patternId}">
        <div class="row between" style="margin-bottom: 8px;">
          <span class="chip chip-track-dsa">⌘ DSA Pattern</span>
          <button class="check-circle ${c?"done":""}" data-action="toggle-dsa" data-week="${e}" onclick="event.stopPropagation();">${c?"✓":""}</button>
        </div>
        <div class="h4">${C(t.dsa.topic)}</div>
        <div class="caption" style="margin-top: 4px;">NeetCode 150 · Tap to open pattern →</div>
      </div>
    </div>
  `}function $e(){const e=ie(),t=G(),r=U.map(i=>{const o=ce[i.num],n=Array.from({length:7}).reduce((v,m,b)=>v+(x(`w${i.num}_d${b}_a`)?1:0)+(x(`w${i.num}_d${b}_b`)?1:0),0),d=Math.round(n/14*100),l=i.num===t?"current":i.num<t?"past":"",a=x(`w${i.num}_project`),c=x(`w${i.num}_sd`),y=x(`w${i.num}_dsa`),g=`
      <span class="timeline-badge" style="background:${a?"#8FA876":"var(--border-subtle)"}"></span>
      <span class="timeline-badge" style="background:${c?"#7B9FB5":"var(--border-subtle)"}"></span>
      <span class="timeline-badge" style="background:${y?"#B888C0":"var(--border-subtle)"}"></span>
    `;return`
      ${o?`<div class="milestone"><span class="milestone-label">◆ ${o.label}</span><span class="milestone-desc">${o.desc}</span></div>`:""}
      <button class="timeline-row ${l}" data-action="select-week" data-week="${i.num}">
        <span class="timeline-dot" style="background: ${q[i.phase].color}"></span>
        <span class="timeline-num">W${String(i.num).padStart(2,"0")}</span>
        <span class="timeline-title">${C(i.title)}</span>
        <span class="timeline-meta">${g} ${d>0?d+"%":"·"}</span>
      </button>
    `}).join("");return`
    <div class="view stagger">
      <h1 class="h1" style="margin-bottom: 4px;">The Plan<span style="color: var(--accent-amber);">.</span></h1>
      <div class="caption" style="margin-bottom: 24px;">20 weeks · May 21, 2026 → Oct 8, 2026</div>

      <div class="row gap-3" style="margin-bottom: 24px;">
        <div class="stat-tile" style="flex:1;">
          <div class="stat-label">Blocks</div>
          <div class="stat-value">${e.doneBlocks}<span style="font-size:14px; color:var(--text-tertiary);">/${e.totalBlocks}</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:${e.pct}%"></div></div>
        </div>
        <div class="stat-tile" style="flex:1;">
          <div class="stat-label">Streak</div>
          <div class="stat-value">${e.streak}<span style="font-size:14px; color:var(--text-tertiary);">d</span></div>
          <div class="stat-meta">consecutive</div>
        </div>
      </div>

      <div class="row gap-3" style="margin-bottom: 24px;">
        <div class="stat-tile" style="flex:1;">
          <div class="stat-label">Projects</div>
          <div class="stat-value" style="font-size: 18px;">${e.projects}<span style="color:var(--text-tertiary); font-size:12px;">/20</span></div>
        </div>
        <div class="stat-tile" style="flex:1;">
          <div class="stat-label">SD Weeks</div>
          <div class="stat-value" style="font-size: 18px;">${e.sds}<span style="color:var(--text-tertiary); font-size:12px;">/20</span></div>
        </div>
        <div class="stat-tile" style="flex:1;">
          <div class="stat-label">DSA Probs</div>
          <div class="stat-value" style="font-size: 18px;">${e.dsaProbs}<span style="color:var(--text-tertiary); font-size:12px;">/150</span></div>
        </div>
      </div>

      <div class="kicker" style="margin-bottom: 12px;">Timeline</div>
      ${r}

      <div class="row between" style="margin-top: 32px;">
        <button class="btn" data-action="export">export backup</button>
        <button class="btn" data-action="reset">reset all</button>
      </div>
    </div>
  `}function De(){const e=K.reduce((o,n)=>o+n.problems.length,0);let t=0;K.forEach(o=>o.problems.forEach(n=>{x(`dsa_${n.id}`)&&t++}));const r=Math.round(t/e*100),i=K.map(o=>{const n=o.problems.filter(l=>x(`dsa_${l.id}`)).length,d=o.problems.map(l=>{const a=x(`dsa_${l.id}`),c=`chip-diff-${l.difficulty.toLowerCase()}`;return`
        <div class="problem-row ${a?"done":""}">
          <button class="problem-check ${a?"done":""}" data-action="toggle-problem" data-id="${l.id}">
            ${a?'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>':""}
          </button>
          <span class="problem-title">${C(l.title)}</span>
          <span class="chip ${c}">${l.difficulty}</span>
          <a href="${l.url}" target="_blank" rel="noopener" class="problem-link" title="Open on LeetCode" onclick="event.stopPropagation();">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      `}).join("");return`
      <div class="pattern-section">
        <div class="pattern-header">
          <button class="pattern-title" data-action="open-dsa-lesson" data-id="${o.lessonId}" style="text-align:left; cursor:pointer; background:none; border:none; padding:0;">
            ${C(o.title)} →
          </button>
          <span class="pattern-count">${n}/${o.problems.length}</span>
        </div>
        <div class="body-sm" style="margin-bottom: 12px;">${C(o.blurb)}</div>
        ${d}
      </div>
    `}).join("");return`
    <div class="view stagger">
      <h1 class="h1" style="margin-bottom: 4px;">NeetCode 150<span style="color: var(--accent-amber);">.</span></h1>
      <div class="caption" style="margin-bottom: 16px;">Pattern-organized roadmap · ${t} of ${e} done · ${r}%</div>
      <div class="progress-track" style="margin-bottom: 32px;"><div class="progress-fill" style="width:${r}%"></div></div>
      ${i}
    </div>
  `}function Te(){const e=[{id:"networking-fundamentals",title:"Networking Fundamentals",section:"Fundamentals",wn:1},{id:"dns-cdn",title:"DNS & CDNs",section:"Fundamentals",wn:2},{id:"load-balancers",title:"Load Balancers",section:"Fundamentals",wn:3},{id:"databases-i",title:"Databases I — SQL vs NoSQL",section:"Fundamentals",wn:4},{id:"caching",title:"Caching",section:"Fundamentals",wn:5},{id:"message-queues",title:"Message Queues",section:"Fundamentals",wn:6},{id:"databases-ii",title:"Databases II — Sharding",section:"Fundamentals",wn:7},{id:"cap-theorem",title:"CAP Theorem",section:"Fundamentals",wn:8},{id:"url-shortener",title:"Design URL Shortener",section:"Classic Problems",wn:9},{id:"pastebin",title:"Design Pastebin",section:"Classic Problems",wn:10},{id:"twitter",title:"Design Twitter",section:"Classic Problems",wn:11},{id:"youtube",title:"Design YouTube",section:"Classic Problems",wn:12},{id:"uber",title:"Design Uber",section:"Classic Problems",wn:13},{id:"whatsapp",title:"Design WhatsApp",section:"Advanced",wn:14},{id:"dropbox",title:"Design Dropbox",section:"Advanced",wn:15},{id:"web-crawler",title:"Design Web Crawler",section:"Advanced",wn:16},{id:"news-feed",title:"Design News Feed",section:"Advanced",wn:17},{id:"recommendation",title:"ML SD — Recommendation",section:"ML Systems",wn:18},{id:"search-ranking",title:"ML SD — Search Ranking",section:"ML Systems",wn:19},{id:"mock-week",title:"Mock Interview Week",section:"Practice",wn:20}],t={};e.forEach(o=>{t[o.section]||(t[o.section]=[]),t[o.section].push(o)});const r=Object.entries(t).map(([o,n])=>`
    <div class="pattern-section">
      <div class="pattern-header">
        <div class="pattern-title">${C(o)}</div>
        <span class="pattern-count">${n.length}</span>
      </div>
      ${n.map(d=>{const l=x(`w${d.wn}_sd`);return`
          <button class="problem-row" data-action="open-sd-lesson" data-id="${d.id}" style="border: none; background: none; width: 100%; text-align: left; cursor: pointer;">
            <span class="problem-check ${l?"done":""}">
              ${l?'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>':""}
            </span>
            <span class="problem-title">${C(d.title)}</span>
            <span class="chip">W${d.wn}</span>
            <span class="problem-link">→</span>
          </button>
        `}).join("")}
    </div>
  `).join("");return`
    <div class="view stagger">
      <h1 class="h1" style="margin-bottom: 4px;">System Design<span style="color: var(--accent-amber);">.</span></h1>
      <div class="caption" style="margin-bottom: 32px;">Grokking-style deep lessons · ${e.filter(o=>x(`w${o.wn}_sd`)).length} of ${e.length} done</div>
      ${r}
    </div>
  `}const p={bg:"#13110E",card:"#17140F",border:"#3A352D",text:"#F4EFE3",textDim:"#8E8773",amber:"#F5B842",sage:"#8FA876",blue:"#7B9FB5"};let Ce=0;const L=()=>`viz${++Ce}`;function S({nodes:e,edges:t,caption:r,height:i=240}){const o=L(),n={};e.forEach(a=>{n[a.id]=a});const d=e.map(a=>{const c=a.color||p.amber;return`
      <g transform="translate(${a.x},${a.y})" class="arch-node">
        <rect x="-${a.w/2}" y="-${a.h/2}" width="${a.w}" height="${a.h}" rx="6"
              fill="${p.card}" stroke="${c}" stroke-width="1.5"/>
        <text x="0" y="-2" text-anchor="middle" fill="${p.text}"
              font-family="Inter Tight, sans-serif" font-size="12" font-weight="600">${a.label}</text>
        ${a.sub?`<text x="0" y="14" text-anchor="middle" fill="${p.textDim}"
              font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="0.05em">${a.sub}</text>`:""}
      </g>
    `}).join(""),l=t.map((a,c)=>{const y=n[a.from],g=n[a.to];if(!y||!g)return"";const v=y.x+(a.fromOffset?.x||0),m=y.y+(a.fromOffset?.y||0),b=g.x+(a.toOffset?.x||0),f=g.y+(a.toOffset?.y||0),M=a.color||p.amber;return`
      <g class="arch-edge" style="--delay: ${c*.3}s">
        <line x1="${v}" y1="${m}" x2="${b}" y2="${f}"
              stroke="${M}" stroke-width="1.2" stroke-opacity="0.4"/>
        <line x1="${v}" y1="${m}" x2="${b}" y2="${f}"
              stroke="${M}" stroke-width="2" stroke-dasharray="6 6"
              class="arch-edge-flow"/>
        ${a.label?`<text x="${(v+b)/2}" y="${(m+f)/2-6}" text-anchor="middle"
              fill="${p.textDim}" font-family="JetBrains Mono, monospace" font-size="9">${a.label}</text>`:""}
      </g>
    `}).join("");return`
    <div class="lesson-viz">
      <svg viewBox="0 0 480 ${i}" width="100%" height="${i}" id="${o}">
        <defs>
          <marker id="${o}-arrow" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="${p.amber}" opacity="0.5"/>
          </marker>
        </defs>
        ${l}
        ${d}
      </svg>
      ${r?`<div class="lesson-viz-caption">${r}</div>`:""}
      <style>
        #${o} .arch-node { animation: fade-up 0.5s var(--ease-out) backwards; }
        #${o} .arch-node:nth-child(${e.length+1}) { animation-delay: 0.1s; }
        #${o} .arch-edge { animation: fade-in 0.6s var(--ease-out) backwards; animation-delay: var(--delay, 0s); }
        #${o} .arch-edge-flow { animation: flow-dash 1.2s linear infinite; }
      </style>
    </div>
  `}function J({actors:e,messages:t,caption:r,height:i=280}){const o=L(),d=460/e.length,l=30,a=30,c=70,y=36,g=e.map((m,b)=>{const f=l+b*d+d/2;return`
      <g class="seq-actor">
        <rect x="${f-50}" y="${a-14}" width="100" height="28" rx="4"
              fill="${p.card}" stroke="${p.amber}" stroke-width="1.2"/>
        <text x="${f}" y="${a+4}" text-anchor="middle" fill="${p.text}"
              font-family="Inter Tight, sans-serif" font-size="12" font-weight="600">${m}</text>
        <line x1="${f}" y1="${a+16}" x2="${f}" y2="${i-10}"
              stroke="${p.border}" stroke-width="1" stroke-dasharray="2 4"/>
      </g>
    `}).join(""),v=t.map((m,b)=>{const f=c+b*y,M=l+m.from*d+d/2,A=l+m.to*d+d/2,B=m.color||p.amber,W=m.return;return`
      <g class="seq-msg" style="--delay: ${b*.4}s">
        <line x1="${M}" y1="${f}" x2="${A}" y2="${f}"
              stroke="${B}" stroke-width="1.5" marker-end="url(#${o}-arrow)"
              ${W?'stroke-dasharray="4 4"':""}/>
        <text x="${(M+A)/2}" y="${f-6}" text-anchor="middle"
              fill="${p.text}" font-family="JetBrains Mono, monospace" font-size="10"
              font-weight="500">${m.label}</text>
      </g>
    `}).join("");return`
    <div class="lesson-viz">
      <svg viewBox="0 0 480 ${i}" width="100%" height="${i}" id="${o}">
        <defs>
          <marker id="${o}-arrow" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="${p.amber}"/>
          </marker>
        </defs>
        ${g}
        ${v}
      </svg>
      ${r?`<div class="lesson-viz-caption">${r}</div>`:""}
      <style>
        #${o} .seq-actor { animation: fade-down 0.4s var(--ease-out) backwards; }
        #${o} .seq-msg { animation: fade-in 0.5s var(--ease-out) backwards; animation-delay: var(--delay); }
        #${o} .seq-msg line { stroke-dasharray: 0; animation: seq-draw 0.6s var(--ease-out) backwards; animation-delay: var(--delay); }
        @keyframes seq-draw { from { stroke-dashoffset: 100; stroke-dasharray: 100; } to { stroke-dashoffset: 0; } }
      </style>
    </div>
  `}function $({values:e,pointers:t=[],window:r,highlight:i=[],caption:o,label:n}){const d=L(),l=44,a=44,c=(480-e.length*l)/2,y=60,g=e.map((m,b)=>{const f=c+b*l,M=r&&b>=r[0]&&b<=r[1],A=i.includes(b);let B=p.card,W=p.border;return A?(B=p.amber,W=p.amber):M&&(B="rgba(245, 184, 66, 0.15)",W=p.amber),`
      <g class="arr-cell" style="--i: ${b}">
        <rect x="${f}" y="${y}" width="${l-2}" height="${a}" rx="4"
              fill="${B}" stroke="${W}" stroke-width="1.5"/>
        <text x="${f+l/2-1}" y="${y+a/2+5}" text-anchor="middle"
              fill="${A?p.bg:p.text}" font-family="JetBrains Mono, monospace"
              font-size="14" font-weight="600">${m}</text>
        <text x="${f+l/2-1}" y="${y+a+16}" text-anchor="middle"
              fill="${p.textDim}" font-family="JetBrains Mono, monospace" font-size="9">${b}</text>
      </g>
    `}).join(""),v=t.map((m,b)=>{const f=c+m.at*l+l/2-1,M=m.color||(b===0?p.amber:p.blue);return`
      <g class="arr-pointer" style="--delay: ${b*.2}s">
        <path d="M ${f-6} ${y-10} L ${f+6} ${y-10} L ${f} ${y-2} z"
              fill="${M}"/>
        <text x="${f}" y="${y-16}" text-anchor="middle" fill="${M}"
              font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">${m.label}</text>
      </g>
    `}).join("");return`
    <div class="lesson-viz">
      <svg viewBox="0 0 480 ${y+a+40}" width="100%" id="${d}">
        ${n?`<text x="240" y="20" text-anchor="middle" fill="${p.textDim}"
              font-family="JetBrains Mono, monospace" font-size="11"
              letter-spacing="0.1em" text-transform="uppercase">${n}</text>`:""}
        ${g}
        ${v}
      </svg>
      ${o?`<div class="lesson-viz-caption">${o}</div>`:""}
      <style>
        #${d} .arr-cell { animation: fade-up 0.4s var(--ease-out) backwards;
                          animation-delay: calc(var(--i) * 0.04s); }
        #${d} .arr-pointer { animation: fade-down 0.5s var(--ease-out) backwards;
                              animation-delay: calc(0.5s + var(--delay)); }
      </style>
    </div>
  `}function Me({nodes:e,highlight:t=[],visited:r=[],caption:i}){const o=L(),n={};e.forEach(c=>{n[c.id]=c});const d=e.filter(c=>c.parent!=null).map(c=>{const y=n[c.parent];return`<line x1="${y.x}" y1="${y.y}" x2="${c.x}" y2="${c.y}"
                  stroke="${p.border}" stroke-width="1.5"/>`}).join(""),l=e.map((c,y)=>{const g=t.includes(c.id),v=r.includes(c.id);let m=p.card,b=p.border,f=p.text;return g?(m=p.amber,b=p.amber,f=p.bg):v&&(m="rgba(143, 168, 118, 0.2)",b=p.sage,f=p.sage),`
      <g class="tree-node" style="--i: ${y}">
        <circle cx="${c.x}" cy="${c.y}" r="18" fill="${m}" stroke="${b}" stroke-width="1.5"/>
        <text x="${c.x}" y="${c.y+5}" text-anchor="middle" fill="${f}"
              font-family="JetBrains Mono, monospace" font-size="13" font-weight="600">${c.value}</text>
      </g>
    `}).join("");return`
    <div class="lesson-viz">
      <svg viewBox="0 0 480 ${Math.max(...e.map(c=>c.y))+40}" width="100%" id="${o}">
        ${d}
        ${l}
      </svg>
      ${`<div class="lesson-viz-caption">${i}</div>`}
      <style>
        #${o} line { animation: fade-in 0.4s var(--ease-out) backwards; animation-delay: 0.1s; }
        #${o} .tree-node { animation: scale-in 0.4s var(--ease-out) backwards;
                            animation-delay: calc(var(--i) * 0.06s); transform-origin: center; transform-box: fill-box; }
      </style>
    </div>
  `}function Pe({values:e,pointers:t=[],caption:r}){const i=L(),o=56,n=16,l=(480-(e.length*o+(e.length-1)*n))/2,a=60,c=e.map((g,v)=>{const m=l+v*(o+n);return`
      <g class="ll-node" style="--i: ${v}">
        <rect x="${m}" y="${a}" width="${o}" height="40" rx="4"
              fill="${p.card}" stroke="${p.amber}" stroke-width="1.5"/>
        <text x="${m+o/2}" y="${a+25}" text-anchor="middle" fill="${p.text}"
              font-family="JetBrains Mono, monospace" font-size="13" font-weight="600">${g}</text>
        ${v<e.length-1?`
          <path d="M ${m+o+2} ${a+20} L ${m+o+n-4} ${a+20}"
                stroke="${p.amber}" stroke-width="1.5" marker-end="url(#${i}-arr)"/>
        `:`
          <text x="${m+o+8}" y="${a+24}" fill="${p.textDim}"
                font-family="JetBrains Mono, monospace" font-size="11">NULL</text>
        `}
      </g>
    `}).join(""),y=t.map((g,v)=>{const m=l+g.at*(o+n)+o/2;return`
      <g class="ll-pointer">
        <path d="M ${m-6} ${a-10} L ${m+6} ${a-10} L ${m} ${a-2} z"
              fill="${g.color||p.blue}"/>
        <text x="${m}" y="${a-16}" text-anchor="middle" fill="${g.color||p.blue}"
              font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">${g.label}</text>
      </g>
    `}).join("");return`
    <div class="lesson-viz">
      <svg viewBox="0 0 480 140" width="100%" id="${i}">
        <defs>
          <marker id="${i}-arr" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="${p.amber}"/>
          </marker>
        </defs>
        ${c}
        ${y}
      </svg>
      ${`<div class="lesson-viz-caption">${r}</div>`}
      <style>
        #${i} .ll-node { animation: fade-up 0.4s var(--ease-out) backwards;
                          animation-delay: calc(var(--i) * 0.08s); }
      </style>
    </div>
  `}function w({headers:e,rows:t,caption:r}){const i=e.map((n,d)=>{const l=d===0?"":`chip chip-track-${["devops","sd","mlops","dsa"][d-1]||"devops"}`;return`<th>${d===0?n:`<span class="${l}">${n}</span>`}</th>`}).join(""),o=t.map(n=>`
    <tr>${n.map((d,l)=>`<td>${d}</td>`).join("")}</tr>
  `).join("");return`
    <table class="lesson-table">
      <thead><tr>${i}</tr></thead>
      <tbody>${o}</tbody>
    </table>
    ${r?`<div class="lesson-viz-caption" style="margin-top:8px;">${r}</div>`:""}
  `}function u(e,t="info"){return`<div class="callout callout-${t}">${e}</div>`}function h(e,t){const r=L();return`
    <div class="lesson-quiz">
      <div class="lesson-quiz-label">◇ Self-check</div>
      <div class="lesson-quiz-q">${e}</div>
      <button class="lesson-quiz-reveal" onclick="document.getElementById('${r}').classList.toggle('open'); this.style.display='none';">
        Reveal answer →
      </button>
      <div class="lesson-quiz-a" id="${r}">${t}</div>
    </div>
  `}const Ie={"networking-fundamentals":{title:"Networking Fundamentals",subtitle:"How bytes actually get from your laptop to a server in Virginia",duration:"25 min read",difficulty:"Foundational",sections:[{title:"The Layered Model",body:()=>`
        <p>Every system you build sends bytes over a network. The mental model that matters: <strong>data gets wrapped in layers on send. Each layer adds a header. Each layer unwraps on receive.</strong></p>
        <p>You don't need all 7 OSI layers. You need the four that show up in real systems: <code>HTTP</code> (application), <code>TLS</code> (encryption), <code>TCP</code> (transport), <code>IP</code> (network).</p>
        ${S({height:220,nodes:[{id:"app",x:70,y:100,w:100,h:40,label:"HTTP",sub:"application"},{id:"tls",x:200,y:100,w:100,h:40,label:"TLS",sub:"encryption"},{id:"tcp",x:330,y:100,w:100,h:40,label:"TCP",sub:"transport",color:"#7B9FB5"},{id:"ip",x:70,y:180,w:100,h:40,label:"IP",sub:"network",color:"#8FA876"},{id:"eth",x:200,y:180,w:100,h:40,label:"Ethernet",sub:"link",color:"#B888C0"}],edges:[{from:"app",to:"tls",label:"wraps"},{from:"tls",to:"tcp",label:"wraps"},{from:"tcp",to:"ip",label:"wraps"},{from:"ip",to:"eth",label:"wraps"}],caption:"Send path: each layer wraps the payload in its own header"})}
        ${u("When debugging, ask which layer is broken. L7 issues look very different from L4. Your nginx is L7. Your firewall rules are L3/L4.","insight")}`},{title:"TCP vs UDP",body:()=>`
        ${w({headers:["Trait","TCP","UDP"],rows:[["Connection","Yes — 3-way handshake first","No — just send"],["Ordered delivery","Guaranteed","No guarantee"],["Retransmission","Automatic on loss","Your problem"],["Overhead per packet","~40 bytes header + state","~8 bytes header"],["Use cases","HTTP, SSH, email, anything correct","Video calls, DNS, game state, streaming"]]})}
        <p>The mental model: <strong>TCP is certified mail. UDP is a postcard.</strong></p>`},{title:"The 3-Way Handshake",body:()=>`
        ${J({actors:["Client","Server"],messages:[{from:0,to:1,label:"SYN (seq=x)"},{from:1,to:0,label:"SYN-ACK (seq=y, ack=x+1)"},{from:0,to:1,label:"ACK (ack=y+1)"},{from:0,to:1,label:"── data flows ──"}],caption:"TCP 3-way handshake — one round-trip before any data moves"})}
        <p>Why three messages? Each side must confirm the other can both send and receive. The first SYN proves the client can send. The SYN-ACK proves the server can receive and send. The final ACK proves the client can receive.</p>
        ${u("HTTP/2 multiplexes many requests over one TCP connection precisely to avoid this handshake repeatedly. HTTP/3 (over QUIC/UDP) avoids it entirely on reconnect.","info")}
        ${h("Your service has 1,000 RPS and you make a new TCP connection per request to a DB 50ms away. What's your wasted latency per second?","50ms × 1,000 = 50 seconds of latency. That's why connection pooling matters: reuse the handshake.")}`},{title:"HTTP Versions",body:()=>`
        ${w({headers:["Version","Transport","Big improvement"],rows:[["HTTP/1.1","TCP","Keep-alive — reuse one connection for multiple requests"],["HTTP/2","TCP + binary","Multiplexing — many requests in flight on one connection"],["HTTP/3","QUIC over UDP","No handshake on reconnect; head-of-line blocking gone"]]})}
        ${u(`"HTTP/3 uses UDP" sounds wrong but is correct. QUIC implements TCP-like reliability on top of UDP because TCP's in-kernel implementation is slow to evolve.`,"info")}`}],keyTerms:["OSI layers","TCP vs UDP","3-way handshake","HTTP/1.1 vs /2 vs /3","keep-alive","multiplexing","connection pooling"],sources:["NeetCode SD Course — Networking Essentials","Grokking SD Fundamentals — Network Protocols",'Ilya Grigorik, "High Performance Browser Networking"']},"dns-cdn":{title:"DNS & CDNs",subtitle:"How a URL becomes an IP, and how content lives near your users",duration:"20 min read",difficulty:"Foundational",sections:[{title:"DNS — The Phone Book",body:()=>`
        <p>DNS turns <code>github.com</code> into <code>140.82.121.4</code>. It's a hierarchical distributed database, designed so no single server holds all of it.</p>
        <p>The hierarchy: <strong>root → TLD → authoritative.</strong> For <code>api.example.com</code>: root knows who handles <code>.com</code>, the <code>.com</code> TLD knows who handles <code>example.com</code>, and the authoritative server knows the IP for <code>api</code>.</p>
        ${J({actors:["Your machine","Resolver","Root",".com TLD","example.com NS"],height:320,messages:[{from:0,to:1,label:"where is api.example.com?"},{from:1,to:2,label:"where is .com?"},{from:2,to:1,label:"try TLD server",return:!0},{from:1,to:3,label:"where is example.com?"},{from:3,to:1,label:"try authoritative NS",return:!0},{from:1,to:4,label:"where is api?"},{from:4,to:1,label:"140.82.121.4",return:!0},{from:1,to:0,label:"140.82.121.4 (TTL=300)",return:!0}],caption:"Recursive resolution: resolver does the legwork, caches for the TTL"})}`},{title:"Why CDNs Exist",body:()=>`
        <p>New York to Sydney takes ~80ms at the speed of light through fiber, and real networks add more. If every user fetched your homepage from Virginia, users in Singapore would wait half a second before anything loaded.</p>
        <p>A <strong>CDN</strong> places copies of static content at hundreds of edge locations. User hits nearest edge. Edge fetches from origin only on cache miss.</p>
        ${S({height:220,nodes:[{id:"u1",x:50,y:50,w:70,h:30,label:"User SG"},{id:"u2",x:50,y:130,w:70,h:30,label:"User UK"},{id:"e1",x:200,y:50,w:80,h:30,label:"Edge SG"},{id:"e2",x:200,y:130,w:80,h:30,label:"Edge UK"},{id:"origin",x:380,y:90,w:100,h:40,label:"Origin",sub:"US East",color:"#8FA876"}],edges:[{from:"u1",to:"e1",label:"5ms"},{from:"u2",to:"e2",label:"8ms"},{from:"e1",to:"origin",label:"miss only"},{from:"e2",to:"origin",label:"miss only"}],caption:"Edges serve cached responses fast; origin only sees misses"})}`},{title:"Push vs Pull CDN",body:()=>`
        ${w({headers:["Approach","How","When"],rows:[["Pull CDN","Fetches from origin on first request, caches with TTL","Default — works for most sites"],["Push CDN","You upload content explicitly (e.g. S3 + CloudFront)","Static assets you control"]]})}
        ${u("TTLs are a trade-off. Long TTL = great cache hit ratio but stale content. Use cache-busting URLs (foo.css?v=abc123) when you ship.","insight")}`},{title:"Anycast Routing",body:()=>`
        <p>How does CDN traffic get to the nearest edge? <strong>Anycast.</strong> The same IP is announced from many locations via BGP. The internet routes packets to the topologically-closest one.</p>
        <p>This is what makes Cloudflare's <code>1.1.1.1</code> resolver feel local everywhere — ~300 datacenters all announcing the same IP.</p>
        ${h("Why does a CDN reduce load on your origin, not just latency?","99% of requests are cache hits served from edge. Your origin only sees misses (first request per edge, or past-TTL).")}`}],keyTerms:["DNS hierarchy","TTL","CDN","Edge location","Origin","Pull vs push CDN","Anycast","BGP"],sources:["Cloudflare Learning Center on DNS","Grokking SD Fundamentals — CDN","AWS CloudFront docs"]},"load-balancers":{title:"Load Balancers",subtitle:"The traffic cop between users and your servers",duration:"20 min read",difficulty:"Foundational",sections:[{title:"What Problem They Solve",body:()=>`
        <p>One server can handle ~10,000 concurrent connections before it crawls. Your app has 1,000,000 users. The math says you need many servers. Now: <strong>which server handles this user's request?</strong></p>
        ${S({height:220,nodes:[{id:"u1",x:50,y:60,w:70,h:30,label:"User",sub:"A"},{id:"u2",x:50,y:110,w:70,h:30,label:"User",sub:"B"},{id:"u3",x:50,y:160,w:70,h:30,label:"User",sub:"C"},{id:"lb",x:230,y:110,w:100,h:50,label:"Load Balancer",sub:"nginx / HAProxy"},{id:"b1",x:410,y:60,w:60,h:30,label:"app-1"},{id:"b2",x:410,y:110,w:60,h:30,label:"app-2"},{id:"b3",x:410,y:160,w:60,h:30,label:"app-3"}],edges:[{from:"u1",to:"lb"},{from:"u2",to:"lb"},{from:"u3",to:"lb"},{from:"lb",to:"b1",color:"#7B9FB5"},{from:"lb",to:"b2",color:"#7B9FB5"},{from:"lb",to:"b3",color:"#7B9FB5"}],caption:"Users hit one address; the LB distributes work to many backends"})}
        <p><strong>Horizontal scale</strong> (add backends) and <strong>failure tolerance</strong> (one dies, LB routes around it).</p>`},{title:"L4 vs L7",body:()=>`
        ${w({headers:["Trait","L4 (Transport)","L7 (Application)"],rows:[["Sees","TCP/UDP connections, IPs, ports","HTTP — URL, headers, cookies, body"],["Routing","Connection-only","Can route by path (/api → A, /static → B)"],["Speed","Very fast, low CPU","Slower — must parse HTTP"],["SSL termination","Pass-through","Common termination point"],["Examples","AWS NLB, HAProxy TCP","nginx, AWS ALB, Cloudflare"]]})}
        ${u("Modern systems use both: L4 in front for raw throughput, L7 behind for app-aware routing.","insight")}`},{title:"Routing Algorithms",body:()=>`
        <p><strong>Round Robin.</strong> Cycle through servers. Simple. Bad when requests have variable cost.</p>
        <p><strong>Least Connections.</strong> Pick the server with fewest active connections. Self-balancing for variable request sizes.</p>
        <p><strong>IP Hash.</strong> Hash the client's IP, route to one specific server. Sticky sessions.</p>
        ${h("Video chat with long-lived WebSockets. Round robin, least connections, or IP hash?","Least connections. Round robin would dump new users on the same server while existing ones hold connections.")}`},{title:"Health Checks & Draining",body:()=>`
        <p><strong>Active health checks</strong> probe each backend (GET /healthz). N failures → pulled.</p>
        <p><strong>Passive health checks</strong> watch real traffic. Too many 5xx → pulled.</p>
        <p><strong>Connection draining</strong> on deploy: LB stops new requests, lets existing ones finish before kill. Without it, deploys cause 500s.</p>`}],keyTerms:["L4 vs L7","Round robin","Least connections","IP hash","Sticky sessions","Health checks","Connection draining"],sources:["NeetCode SD Course — Load Balancing","Grokking SD Fundamentals — Load Balancer","HAProxy and nginx documentation"]},"databases-i":{title:"Databases I — SQL vs NoSQL",subtitle:"ACID, BASE, and when each model wins",duration:"22 min read",difficulty:"Foundational",sections:[{title:"The Big Split",body:()=>`
        ${w({headers:["Dimension","SQL (e.g. Postgres)","NoSQL (e.g. DynamoDB)"],rows:[["Schema","Strict, enforced at write","Flexible, often per-record"],["Joins","First-class, optimized","Avoid; denormalize instead"],["Scaling","Vertical first (bigger box)","Horizontal first (more boxes)"],["Consistency","Strong (ACID)","Often eventual (BASE)"],["Best for","Complex queries, transactions, structured data","Massive scale, simple access, flexible shape"]]})}`},{title:"ACID",body:()=>`
        <p>The traditional database promise:</p>
        <p><strong>Atomicity.</strong> Transactions all-or-nothing. Transfer money: debit AND credit happen, or neither.</p>
        <p><strong>Consistency.</strong> Constraints hold across transactions.</p>
        <p><strong>Isolation.</strong> Concurrent transactions appear sequential.</p>
        <p><strong>Durability.</strong> Once committed, survives crash.</p>
        ${u('"Strong consistency" in ACID-C is different from CAP-C. ACID-C = constraint integrity. CAP-C = reads see latest write across nodes. Easy interview confusion.',"warning")}`},{title:"BASE",body:()=>`
        <p>The NoSQL counter-philosophy:</p>
        <p><strong>Basically Available.</strong> System keeps responding even if some nodes are down.</p>
        <p><strong>Soft state.</strong> Data may change without input.</p>
        <p><strong>Eventual consistency.</strong> Given no new writes, replicas eventually converge.</p>
        <p>The trade: availability and scale at the cost of "is this read 100% fresh?" Like-count off by seconds: fine. Bank balance off by seconds: lawsuit.</p>`},{title:"NoSQL Types",body:()=>`
        ${w({headers:["Type","Example","When"],rows:[["Key-Value","Redis, DynamoDB","Caches, session stores, simple lookups"],["Document","MongoDB, Couchbase","Semi-structured docs, varying schemas"],["Wide-column","Cassandra, ScyllaDB","Write-heavy time-series, IoT, massive scale"],["Graph","Neo4j, Neptune","Social networks, fraud, recommendations"]]})}
        ${h("You're building a banking system. SQL or NoSQL?","SQL. ACID transactions matter, schema is stable, you won't hit scale that breaks SQL.")}`}],keyTerms:["SQL","NoSQL","ACID","BASE","Eventual consistency","Key-value","Document","Wide-column","Graph DB"],sources:["Designing Data-Intensive Applications by Martin Kleppmann","Grokking SD Fundamentals — Databases"]},caching:{title:"Caching",subtitle:"Trading memory for latency, the most powerful lever",duration:"22 min read",difficulty:"Foundational",sections:[{title:"The Core Idea",body:()=>`
        <p>Cache = fast copy of slow data, close to where it's used. Disk ~10ms, cross-region ~100ms, DB ~10-100ms, memory <1µs.</p>
        ${S({height:180,nodes:[{id:"app",x:70,y:90,w:80,h:40,label:"App",sub:"1ms"},{id:"cache",x:240,y:90,w:90,h:40,label:"Redis",sub:"~1ms"},{id:"db",x:410,y:90,w:80,h:40,label:"DB",sub:"~20ms",color:"#8FA876"}],edges:[{from:"app",to:"cache",label:"try cache"},{from:"cache",to:"db",label:"miss → fetch"}],caption:"90% of reads stop at the cache"})}`},{title:"Write Strategies",body:()=>`
        ${w({headers:["Strategy","How","Trade-off"],rows:[["Cache-aside","App writes DB. Cache updated on next read.","Simple. Stale reads after write."],["Write-through","App writes cache AND DB synchronously.","No stale reads. Slower writes."],["Write-behind","App writes cache. Cache writes DB async.","Fast. Risk of loss on crash."]]})}
        ${u("Default is cache-aside. Reach for write-through when correctness > write speed. Write-behind for analytics/metrics.","insight")}`},{title:"Eviction",body:()=>`
        <p><strong>LRU.</strong> Drop entry not accessed in longest. Default.</p>
        <p><strong>LFU.</strong> Drop fewest hits. Good for stable popular items.</p>
        <p><strong>TTL.</strong> Every entry expires regardless of access.</p>
        ${u('Redis default eviction is "noeviction" — refuses writes when full. Switch to allkeys-lru.',"warning")}`},{title:"The Hard Problems",body:()=>`
        <p><strong>Cache stampede.</strong> Popular key expires → 10K simultaneous misses → DB falls over. Fix: probabilistic early refresh, single-flight locks.</p>
        <p><strong>Cache penetration.</strong> Attackers request nonexistent keys. Fix: cache "not found" briefly.</p>
        <p><strong>Hot key.</strong> One key gets 90% of traffic. Fix: replicate, multi-tier (local cache).</p>
        ${h("You add a cache, latency drops 10x. A week later users complain profile changes don't show. Fix?","Cache-aside without invalidation on write. Profile update wrote DB but didn't invalidate cache. Fix: invalidate cache key on every write.")}`}],keyTerms:["Cache-aside","Write-through","LRU/LFU/TTL","Cache stampede","Hot key"],sources:["NeetCode SD Course — Caching","Grokking SD Fundamentals — Caching"]},"message-queues":{title:"Message Queues",subtitle:"Decoupling producers from consumers",duration:"22 min read",difficulty:"Foundational",sections:[{title:"Why Queue?",body:()=>`
        <p>When service A calls B directly (sync HTTP), A waits for B and shares B's fate. A queue between them: A drops a message, queue holds it, B picks it up when it can. <strong>Decoupling, buffering, durability.</strong></p>
        ${S({height:180,nodes:[{id:"p",x:50,y:90,w:80,h:40,label:"Producer"},{id:"q",x:220,y:90,w:100,h:40,label:"Queue",sub:"Kafka",color:"#F5B842"},{id:"c1",x:400,y:50,w:70,h:30,label:"Worker 1"},{id:"c2",x:400,y:90,w:70,h:30,label:"Worker 2"},{id:"c3",x:400,y:130,w:70,h:30,label:"Worker 3"}],edges:[{from:"p",to:"q",label:"publish"},{from:"q",to:"c1"},{from:"q",to:"c2"},{from:"q",to:"c3"}],caption:"Producer publishes once, queue fans out to consumers"})}`},{title:"Queue vs Pub/Sub",body:()=>`
        ${w({headers:["Model","How","When"],rows:[["Queue (point-to-point)","Each message → ONE worker","Task distribution"],["Pub/Sub (topic)","Each message → EVERY subscriber","Event broadcasting"]]})}
        ${u("Kafka does both via consumer groups. Workers in same group share work (queue). Different groups all see all messages (pub/sub).","insight")}`},{title:"Kafka vs RabbitMQ",body:()=>`
        ${w({headers:["Trait","Kafka","RabbitMQ"],rows:[["Model","Log-based (append-only)","Queue-based (gone after ack)"],["Replay","Yes — rewind to any offset","No"],["Throughput","Very high (100K+ msg/sec)","High but lower"],["Use","Event streaming, analytics, audit","Task queues, RPC, complex routing"]]})}`},{title:"Delivery Guarantees",body:()=>`
        <p><strong>At-most-once.</strong> Fire and forget. May lose. (metrics, logs)</p>
        <p><strong>At-least-once.</strong> Retry until ack. May deliver twice. Default. Consumer must be idempotent.</p>
        <p><strong>Exactly-once.</strong> Hard. Kafka offers it within a topic via transactions.</p>
        ${h("Your worker processes payments from a queue. Why MUST it be idempotent?","At-least-once means the same message can arrive twice. If you charge the card both times, customer pays twice. Idempotency = dedup via idempotency-key.")}`}],keyTerms:["Producer","Consumer","Queue vs pub/sub","Consumer group","Partition","Offset","Idempotency","Dead letter queue"],sources:["Kafka documentation","Grokking SD Fundamentals — Messaging Queues"]},"databases-ii":{title:"Databases II — Sharding & Replication",subtitle:"How databases scale past one machine",duration:"25 min read",difficulty:"Intermediate",sections:[{title:"When One Box Stops Cutting It",body:()=>`
        <p>Vertical scaling works until it doesn't. Eventually you hit storage (~100TB), memory (~1TB), or write throughput (~50K/sec) ceilings.</p>
        <p>Two orthogonal strategies. <strong>Replication</strong> copies same data to multiple nodes (read scale, fault tolerance). <strong>Sharding</strong> splits different data across nodes (write scale, capacity).</p>`},{title:"Replication Topologies",body:()=>`
        ${S({height:220,nodes:[{id:"m",x:240,y:50,w:100,h:40,label:"Primary",color:"#F5B842"},{id:"r1",x:100,y:160,w:80,h:30,label:"Replica 1",color:"#8FA876"},{id:"r2",x:240,y:160,w:80,h:30,label:"Replica 2",color:"#8FA876"},{id:"r3",x:380,y:160,w:80,h:30,label:"Replica 3",color:"#8FA876"}],edges:[{from:"m",to:"r1",label:"WAL"},{from:"m",to:"r2",label:"WAL"},{from:"m",to:"r3",label:"WAL"}],caption:"Primary-replica: writes to primary, reads anywhere"})}
        ${w({headers:["Mode","How","Trade"],rows:[["Primary-replica","One writer, many readers","Easy. Replica lag = stale reads."],["Multi-primary","Multiple writers, replicate","No write bottleneck. Conflicts hard."],["Synchronous","Wait for replicas before ack","Zero lag. Higher latency."],["Asynchronous","Ack first, replicate after","Fast. Can lose recent writes."]]})}`},{title:"Sharding Strategies",body:()=>`
        <p><strong>Range sharding.</strong> Split by key range. A-M shard 1, N-Z shard 2. Pro: range queries efficient. Con: hot ranges.</p>
        <p><strong>Hash sharding.</strong> Hash key, modulo by shard count. Pro: uniform. Con: re-hashing on resize.</p>
        <p><strong>Directory sharding.</strong> Lookup table maps key → shard. Pro: flexible. Con: directory bottleneck.</p>
        ${u("Consistent hashing fixes the re-hash problem. Each shard owns a range on a hash ring. Adding a shard moves only 1/N of keys.","insight")}`},{title:"CAP Implications",body:()=>`
        <p>When nodes can't talk (partition), do you sacrifice <strong>Consistency</strong> (return stale data) or <strong>Availability</strong> (refuse to serve)?</p>
        ${h("Postgres primary fails. You promote a replica with 100ms lag. Problem?",'Lost writes. Last 100ms of committed transactions not replicated are gone. Users saw "success" for purchases that no longer exist.')}`}],keyTerms:["Replication","Sharding","Range/hash/directory","Consistent hashing","Replica lag","WAL"],sources:["Designing Data-Intensive Applications (Ch 5-6)","Grokking SD Fundamentals — Database Replication"]},"cap-theorem":{title:"CAP Theorem",subtitle:"You can't have all three. Choose wisely.",duration:"15 min read",difficulty:"Foundational",sections:[{title:"The Theorem",body:()=>`
        <p>In any distributed system, when a network partition happens, you must choose between <strong>C</strong>onsistency and <strong>A</strong>vailability. You can't have both.</p>
        ${S({height:180,nodes:[{id:"c",x:240,y:50,w:100,h:40,label:"Client"},{id:"n1",x:100,y:150,w:90,h:40,label:"Node 1",sub:"partition"},{id:"n2",x:380,y:150,w:90,h:40,label:"Node 2",sub:"partition",color:"#E07856"}],edges:[{from:"c",to:"n1",label:"write x=1"},{from:"c",to:"n2",label:"read x?",color:"#E07856"}],caption:"Network split: return stale x (AP) or refuse (CP)?"})}
        <p>Partition (P) isn't a choice — it happens. The choice is between <strong>CP</strong> (refuse during partition) and <strong>AP</strong> (serve possibly stale).</p>`},{title:"CP vs AP in Practice",body:()=>`
        ${w({headers:["System","Choice","Why"],rows:[["HBase, MongoDB default","CP","Errors during partition; correctness first"],["Cassandra, DynamoDB","AP","Always responds; may be stale"],["ZooKeeper, etcd","CP","Coordination needs consistent answers"],["Redis Cluster","AP (mostly)","Available even when split"]]})}
        ${u("Most NoSQL chose AP because web scale found slight staleness acceptable but downtime cost millions per minute.","info")}`},{title:"PACELC — The Honest Extension",body:()=>`
        <p>CAP only addresses partition case. PACELC: if Partition → A or C; <strong>Else → Latency or Consistency.</strong></p>
        <p>Cassandra is PA/EL. MongoDB is PC/EC.</p>
        ${h('E-commerce inventory across two warehouses. Network partitions. Both say "1 widget left." Two customers buy. CP vs AP?',"CP refuses one (timeout). AP allows both → oversold. For inventory, CP is usually correct.")}`}],keyTerms:["CAP","Consistency","Availability","Partition tolerance","CP","AP","PACELC"],sources:["Eric Brewer's CAP paper","Daniel Abadi PACELC","Designing Data-Intensive Applications (Ch 9)"]},"url-shortener":{title:"Design URL Shortener",subtitle:"The gateway interview problem",duration:"30 min read",difficulty:"Intermediate",sections:[{title:"Requirements",body:()=>`
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
        </ul>`},{title:"Capacity Estimation",body:()=>`
        <p><strong>Writes:</strong> 100M/month = ~40/sec.</p>
        <p><strong>Reads:</strong> 100:1 = ~4K/sec average, 10K spike.</p>
        <p><strong>Storage:</strong> 100M × 12 × 5 = 6B URLs × 500B = ~3TB.</p>
        ${u("Dominant constraint: read latency and availability. Cache aggressively.","insight")}`},{title:"Key Generation",body:()=>`
        <p><strong>Hash the URL.</strong> MD5, first 7 chars. Collisions need retry.</p>
        <p><strong>Counter + base62.</strong> Global counter, base62 encode. No collisions. 62⁷ = 3.5 trillion.</p>
        ${u("Counter wins. Coordinate via Snowflake IDs or pre-allocated ranges (each server gets 10K IDs).","insight")}`},{title:"Architecture",body:()=>`
        ${S({height:280,nodes:[{id:"usr",x:50,y:60,w:70,h:30,label:"User"},{id:"cdn",x:170,y:60,w:80,h:30,label:"CDN"},{id:"lb",x:300,y:60,w:80,h:30,label:"LB",color:"#7B9FB5"},{id:"app",x:430,y:60,w:80,h:30,label:"App",color:"#7B9FB5"},{id:"cache",x:250,y:160,w:100,h:40,label:"Redis",sub:"hot"},{id:"db",x:400,y:160,w:100,h:40,label:"Postgres",color:"#8FA876"}],edges:[{from:"usr",to:"cdn"},{from:"cdn",to:"lb"},{from:"lb",to:"app"},{from:"app",to:"cache"},{from:"cache",to:"db"}],caption:"CDN → LB → App → Cache → DB"})}
        <p>99% of redirects stop at cache. Misses fall to Postgres replica, populate cache.</p>`},{title:"Bottlenecks",body:()=>`
        <p><strong>Hot URL</strong> (celebrity tweet): CDN cache + multi-tier + rate limit.</p>
        <p><strong>Counter coordination</strong>: Snowflake or ranges.</p>
        <p><strong>Replica lag</strong>: write-through cache, read from primary briefly.</p>
        ${h("Why HTTP 302 not 301?","301 = permanent, browsers cache. Caching means no click counting and no future URL changes. 302 = temporary, browsers ask again.")}`}],keyTerms:["Base62","Counter vs hash","301 vs 302","Read-heavy","Multi-tier cache","Snowflake"],sources:["Grokking SD Interview — URL Shortener","NeetCode TinyURL","bit.ly architecture posts"]},pastebin:{title:"Design Pastebin",subtitle:"Storage-heavy variant — content lives somewhere else",duration:"20 min read",difficulty:"Intermediate",sections:[{title:"Different From URL Shortener",body:()=>`
        <p>Looks similar (short URL → content) but content can be megabytes. <strong>Storage architecture is completely different.</strong> Use object storage for content, DB only for metadata.</p>
        ${S({height:240,nodes:[{id:"usr",x:50,y:90,w:70,h:30,label:"User"},{id:"app",x:170,y:90,w:80,h:30,label:"App",color:"#7B9FB5"},{id:"db",x:320,y:50,w:100,h:40,label:"Metadata DB",sub:"tiny",color:"#8FA876"},{id:"s3",x:320,y:150,w:100,h:40,label:"S3",sub:"content blobs",color:"#F5B842"}],edges:[{from:"usr",to:"app",label:"create"},{from:"app",to:"db",label:"meta"},{from:"app",to:"s3",label:"blob"}],caption:"Two stores: metadata in SQL, content in object storage"})}`},{title:"Data Model",body:()=>`
        ${w({headers:["Field","Where","Why"],rows:[["paste_id","DB","PK, becomes URL slug"],["s3_key","DB","Pointer to S3"],["language","DB","Syntax highlighting"],["created_at, expires_at","DB","Time queries"],["actual content","S3","Up to 1-10MB blobs"]]})}`},{title:"Expiration",body:()=>`
        <p><strong>Lazy delete.</strong> On read, check expires_at. Past → 404, queue for delete. Simple but storage piles up.</p>
        <p><strong>Background sweep.</strong> Hourly cron deletes expired. Cleaner.</p>
        ${u("S3 lifecycle policies. Tag with expiry, S3 auto-deletes. Zero cron.","insight")}
        ${h("Pastebin gets a 50MB request. Allow?","Reject. Hard limit at 1-10MB. 50MB is abuse (storing files as text). Costs scale linearly with size.")}`}],keyTerms:["Object storage","Metadata vs content","S3 lifecycle","Lazy delete"],sources:["Grokking SD Interview — Pastebin","AWS S3 best practices"]},twitter:{title:"Design Twitter",subtitle:"Feed generation, fanout, the celebrity problem",duration:"35 min read",difficulty:"Advanced",sections:[{title:"Requirements",body:()=>`
        <p><strong>Functional:</strong> post tweet, follow, home timeline, profile timeline.</p>
        <p><strong>Non-functional:</strong> billions of users, read-heavy, real-time updates.</p>
        <p>Core question: <strong>when you load your feed, who computes it?</strong></p>`},{title:"Fanout-on-Write (Push)",body:()=>`
        <p>When you tweet, write it into every follower's precomputed timeline. Read = fetch precomputed list.</p>
        ${S({height:220,nodes:[{id:"u",x:50,y:100,w:80,h:40,label:"You tweet"},{id:"svc",x:200,y:100,w:100,h:40,label:"Fanout",color:"#F5B842"},{id:"f1",x:370,y:50,w:90,h:30,label:"follower 1 feed"},{id:"f2",x:370,y:100,w:90,h:30,label:"follower 2 feed"},{id:"f3",x:370,y:150,w:90,h:30,label:"follower 3 feed"}],edges:[{from:"u",to:"svc"},{from:"svc",to:"f1"},{from:"svc",to:"f2"},{from:"svc",to:"f3"}],caption:"Tweet fans out to every follower's precomputed timeline"})}
        <p>Reads O(1). Writes O(followers) — expensive if many.</p>`},{title:"Fanout-on-Read (Pull)",body:()=>`
        <p>When you tweet, just write to your own timeline. Feed read: look up everyone you follow, fetch each, merge. Writes O(1). Reads O(following) — slow for users following thousands.</p>`},{title:"The Celebrity Problem",body:()=>`
        <p>Push: Taylor Swift tweets → 90M inboxes. Massive write. Pull: every follower's read queries her timeline. Massive read.</p>
        <p><strong>Hybrid.</strong> Push for most users. Pull for celebrities (>1M followers). Feed = precomputed UNION recent celeb tweets.</p>
        ${u("Twitter does this. Celebrities flagged; tweets aren't fanned out, pulled on read.","insight")}
        ${h("Why isn't pure push viable at scale?","Average user 200 followers, fine. Celebrities have 100M. One tweet = 100M writes. Multiply by hundreds of celebs. Fanout workers never catch up.")}`}],keyTerms:["Fanout on write/read","Hybrid","Celebrity problem","Timeline","Materialized view"],sources:["Grokking SD Interview — Twitter","Twitter Engineering Blog"]},youtube:{title:"Design YouTube",subtitle:"Video upload, encoding, global delivery",duration:"35 min read",difficulty:"Advanced",sections:[{title:"Three Pipelines",body:()=>`
        ${S({height:240,nodes:[{id:"u",x:50,y:50,w:70,h:30,label:"Uploader"},{id:"ing",x:180,y:50,w:90,h:30,label:"Upload svc"},{id:"enc",x:320,y:50,w:90,h:30,label:"Encoder",sub:"multi-bitrate",color:"#F5B842"},{id:"s3",x:460,y:50,w:80,h:30,label:"Store",color:"#8FA876"},{id:"meta",x:320,y:130,w:90,h:30,label:"Metadata DB"},{id:"cdn",x:460,y:130,w:80,h:30,label:"CDN"},{id:"view",x:460,y:200,w:80,h:30,label:"Viewer"}],edges:[{from:"u",to:"ing"},{from:"ing",to:"enc"},{from:"enc",to:"s3"},{from:"ing",to:"meta"},{from:"s3",to:"cdn"},{from:"cdn",to:"view"}],caption:"Upload → encode → store → CDN → viewer"})}`},{title:"Multi-Bitrate Encoding",body:()=>`
        <p>Same video, encoded at 144p, 240p, 360p, 480p, 720p, 1080p, 4K. Each in ~10s chunks. Player chooses bitrate based on bandwidth (HLS/DASH).</p>
        <p><strong>Adaptive Bitrate Streaming.</strong> Phone on 3G gets 240p, laptop on fiber gets 4K. Transparent.</p>
        ${u("Encoding is most expensive. 10-min 4K = hours of compute. Use spot instances; encoding is interruptible.","insight")}`},{title:"Storage + CDN",body:()=>`
        <p>Raw chunks in cheap object storage. CDN caches popular at edge. 80/20 brutal: 80% of views are 20% of videos. Hot videos live in CDN entirely.</p>`},{title:"Scale Tricks",body:()=>`
        <p><strong>Resumable uploads.</strong> Chunk with resume tokens. Don't make users re-upload 2GB on dropped connection.</p>
        <p><strong>Cold storage tiering.</strong> No views in 90 days → cheaper slower storage.</p>
        ${h("Why encode multiple bitrates instead of one good one + client downscale?","Bandwidth. 3G user can't download 4K to display 240p. Multi-bitrate sends only what client uses.")}`}],keyTerms:["Adaptive bitrate","HLS","DASH","Multi-bitrate encoding","CDN tiering","Resumable upload"],sources:["Grokking SD Interview — YouTube","YouTube Engineering Blog","Netflix Open Connect"]},uber:{title:"Design Uber",subtitle:"Real-time geo, matching, websockets",duration:"35 min read",difficulty:"Advanced",sections:[{title:"The Core Problem",body:()=>`
        <p>Riders and drivers are moving objects on a map. System must: track drivers in real time, find drivers near a rider in <100ms, route the request, handle live trip, charge card. Millions of trips per day.</p>
        <p>Hard part: "find drivers near rider in 100ms." Naive: scan every driver. At 10M drivers, that's 10M ops per request. Won't work.</p>`},{title:"Geo-Indexing",body:()=>`
        <p><strong>Quadtree.</strong> Recursively divide map into 4 quadrants. Leaf nodes hold drivers. Search a region = traverse only relevant branches.</p>
        <p><strong>Geohash.</strong> Encode lat/lng into string where nearby locations share prefix. "dr5ru" = some area. Use prefix queries.</p>
        ${S({height:200,nodes:[{id:"d1",x:80,y:80,w:50,h:30,label:"D1"},{id:"d2",x:80,y:130,w:50,h:30,label:"D2"},{id:"d3",x:150,y:80,w:50,h:30,label:"D3"},{id:"d4",x:150,y:130,w:50,h:30,label:"D4"},{id:"gh",x:320,y:100,w:130,h:40,label:"Geohash Index",sub:'"dr5ru" → [D1,D2]'}],edges:[{from:"d1",to:"gh"},{from:"d2",to:"gh"},{from:"d3",to:"gh"},{from:"d4",to:"gh"}],caption:'Geohash bucket = quick "drivers in area" lookup'})}`},{title:"Real-Time Location Updates",body:()=>`
        <p>Driver app sends location every 4 sec. At 1M drivers, 250K writes/sec. Architecture: drivers → Kafka (partitioned by region) → Redis spatial index. Reads hit Redis directly. Periodic snapshot to durable storage.</p>`},{title:"Matching + Trip Lifecycle",body:()=>`
        <p>Rider requests → backend queries geohash for drivers within 2km → ranks by ETA + score → sends to top driver via websocket → driver accepts → both connected for live updates.</p>
        <p>Websocket mandatory. HTTP polling at this volume would melt servers.</p>
        ${h("Why not Postgres + PostGIS?","Latency. At 1M drivers × 4s updates, PostGIS adds disk I/O per write/read. Need in-memory (Redis or custom) with spatial structures.")}`}],keyTerms:["Quadtree","Geohash","Spatial index","Websocket","Real-time matching","Surge pricing"],sources:["Grokking SD Interview — Uber","Uber Engineering Blog","H3 hexagonal grid"]},whatsapp:{title:"Design WhatsApp",subtitle:"Messaging at scale: websockets, delivery, E2EE",duration:"30 min read",difficulty:"Advanced",sections:[{title:"Requirements",body:()=>`
        <p><strong>Functional:</strong> 1:1 chat, groups, online status, sent/delivered/read receipts, offline storage, media.</p>
        <p><strong>Non-functional:</strong> 2B+ users, billions msg/day, real-time, E2EE.</p>`},{title:"Websockets, Not Polling",body:()=>`
        <p>Active users hold persistent websocket to nearest gateway. Friend sends → gateway pushes to recipient's socket immediately.</p>
        ${S({height:200,nodes:[{id:"a",x:50,y:90,w:70,h:30,label:"Alice"},{id:"gw1",x:180,y:90,w:90,h:30,label:"Gateway",color:"#F5B842"},{id:"route",x:330,y:90,w:100,h:30,label:"Router"},{id:"gw2",x:480,y:90,w:60,h:30,label:"Gateway",color:"#F5B842"},{id:"b",x:580,y:90,w:60,h:30,label:"Bob"}],edges:[{from:"a",to:"gw1",label:"WS"},{from:"gw1",to:"route"},{from:"route",to:"gw2"},{from:"gw2",to:"b",label:"WS"}],caption:"Alice → Alice's gateway → router → Bob's gateway → Bob (~50ms)"})}
        <p>Gateways stateful (hold connections). Routing layer maps user → which gateway.</p>`},{title:"Delivery Guarantees",body:()=>`
        <p><strong>Three states:</strong> sent, delivered, read. Offline recipient: server stores until next connection, with TTL.</p>
        <p><strong>Idempotency:</strong> each message has client UUID. Retries deduped server-side.</p>`},{title:"End-to-End Encryption",body:()=>`
        <p>Signal protocol. Each user has long-term identity key + rotating message keys. Server stores ciphertext only — even WhatsApp can't read.</p>
        <p>Groups: sender key distributed at join. Each message encrypted with sender key, decrypted by members.</p>
        ${u("E2EE means server can't search message content. WhatsApp search is local-only on your phone.","info")}
        ${h("Bob offline 3 days. Alice sends 100. What happens?",'Each shows "sent" (one check). Server queues. Bob comes online → delivered (double check). Bob opens chat → read receipts → blue.')}`}],keyTerms:["Websocket","Gateway servers","Delivery receipts","Signal protocol","E2EE","Sender keys"],sources:["Grokking SD Interview — WhatsApp","WhatsApp Engineering","Signal Protocol docs"]},dropbox:{title:"Design Dropbox",subtitle:"File sync, chunking, conflict resolution",duration:"30 min read",difficulty:"Advanced",sections:[{title:"The Chunking Insight",body:()=>`
        <p>Naive: upload entire file on every change. 1GB file edited 10 times = 10GB upload.</p>
        <p>Dropbox: <strong>chunk into 4MB blocks, hash each, only upload changed blocks.</strong> Edit one paragraph in 1GB file = upload 4MB.</p>
        ${S({height:220,nodes:[{id:"f",x:50,y:100,w:80,h:40,label:"File (1GB)"},{id:"c",x:180,y:100,w:80,h:40,label:"Chunker",sub:"4MB",color:"#F5B842"},{id:"h",x:310,y:100,w:100,h:40,label:"Block index",sub:"hash → loc"},{id:"s",x:460,y:100,w:80,h:40,label:"Object store",color:"#8FA876"}],edges:[{from:"f",to:"c",label:"split"},{from:"c",to:"h",label:"hash"},{from:"h",to:"s",label:"new only"}],caption:"Files = lists of block hashes; only new blocks upload"})}`},{title:"Block-Level Dedup",body:()=>`
        <p>Hashing blocks means identical content stored once across users. 10 users upload same Linux ISO → stored once. Content-addressable storage.</p>
        ${u('Privacy: two users uploading identical "secret.txt" share storage. For E2EE you trade dedup for privacy.',"warning")}`},{title:"Metadata vs Block Stores",body:()=>`
        ${w({headers:["Layer","What","Storage"],rows:[["Metadata","Filename, owner, version, block hashes","SQL"],["Blocks","Raw 4MB binaries by hash","Object store"],["Notification",'"file X changed" to your devices',"Pub/sub"]]})}`},{title:"Conflict Resolution",body:()=>`
        <p>Two devices edit offline. Both push. Whose wins?</p>
        <p>Dropbox: <strong>both win.</strong> Loser becomes "filename (conflicted copy 2024-05-23).txt". Inelegant but no data loss.</p>
        ${h("Why upload changed blocks vs diffs?",'Diffs require server to know original. With block-hashing, client computes "what changed" locally and uploads. No round-trip. Also enables cross-user dedup.')}`}],keyTerms:["Block chunking","Content-addressable","Dedup","Delta sync","Conflict resolution"],sources:["Grokking SD Interview — Dropbox","Dropbox Engineering","Rsync algorithm"]},"web-crawler":{title:"Design Web Crawler",subtitle:"Distributed BFS, politeness, dedup at scale",duration:"30 min read",difficulty:"Advanced",sections:[{title:"The Core Loop",body:()=>`
        <p>A crawler is distributed BFS over the web graph. Pop URL, fetch, parse links, push back on queue, repeat.</p>
        ${S({height:220,nodes:[{id:"q",x:50,y:100,w:90,h:40,label:"URL Frontier",sub:"queue",color:"#F5B842"},{id:"w",x:200,y:100,w:90,h:40,label:"Workers"},{id:"p",x:350,y:50,w:90,h:40,label:"Parser"},{id:"s",x:350,y:150,w:90,h:40,label:"Storage",color:"#8FA876"},{id:"d",x:480,y:100,w:80,h:30,label:"Dedup",sub:"bloom"}],edges:[{from:"q",to:"w"},{from:"w",to:"p"},{from:"w",to:"s"},{from:"p",to:"d"},{from:"d",to:"q"}],caption:"Workers fetch, parse, dedup, push new URLs back"})}`},{title:"Politeness",body:()=>`
        <p><strong>robots.txt.</strong> Respect site's crawl rules.</p>
        <p><strong>Per-domain rate limit.</strong> Max 1 req/sec per domain. Frontier groups by domain.</p>
        <p><strong>User-agent honesty.</strong> Identify yourself, contact email.</p>`},{title:"Dedup at Scale",body:()=>`
        <p>URLs like <code>page?id=1&ref=home</code> and <code>page?ref=home&id=1</code> = same content. <strong>Canonicalize</strong> before dedup.</p>
        <p>Billions of URLs → exact dedup too expensive. Use <strong>bloom filter:</strong> no false negatives, small false positive rate.</p>
        ${u("1B URLs in a bloom filter = ~1GB RAM at 1% false positive. Real hash set = ~50GB.","insight")}`},{title:"Freshness",body:()=>`
        <p>Web changes constantly. News: hourly. Wikipedia: daily. Personal blogs: weekly. Each URL gets adaptive re-crawl interval based on observed change rate.</p>
        ${h("Why BFS over DFS for crawling?","BFS gives breadth coverage; important pages linked from many places early. DFS gets stuck deep in low-value subtrees (calendar pages, archives).")}`}],keyTerms:["URL frontier","robots.txt","Politeness","Canonicalization","Bloom filter","Distributed BFS"],sources:["Grokking SD Interview — Web Crawler","Mercator paper (1999)","Apache Nutch docs"]},"news-feed":{title:"Design Facebook News Feed",subtitle:"Ranking, infinite scroll, real-time push",duration:"30 min read",difficulty:"Advanced",sections:[{title:"It's Not Chronological",body:()=>`
        <p>Twitter (originally) showed reverse-chronological. Facebook: <strong>ranked feed.</strong> Order determined by a model predicting engagement.</p>
        <p>Feed isn't a list, it's a function. Every load can produce different order.</p>`},{title:"Architecture",body:()=>`
        ${S({height:220,nodes:[{id:"usr",x:50,y:100,w:70,h:30,label:"User"},{id:"feed",x:180,y:100,w:90,h:40,label:"Feed svc"},{id:"cand",x:330,y:50,w:100,h:40,label:"Candidates",sub:"last 500"},{id:"rank",x:330,y:150,w:100,h:40,label:"Ranker",sub:"ML",color:"#F5B842"},{id:"cache",x:480,y:100,w:80,h:40,label:"Top 50"}],edges:[{from:"usr",to:"feed"},{from:"feed",to:"cand"},{from:"cand",to:"rank"},{from:"rank",to:"cache"},{from:"cache",to:"feed"}],caption:"Two-stage: gather candidates → rank with ML → serve top N"})}`},{title:"Push vs Pull (Revisit)",body:()=>`
        <p>Like Twitter, hybrid. Most posts precomputed (push). Power users pulled. Plus ML ranking layer that re-orders both.</p>`},{title:"Real-Time Updates",body:()=>`
        <p><strong>Polling.</strong> Wasteful at scale.</p>
        <p><strong>Long polling.</strong> Better.</p>
        <p><strong>SSE / Websockets.</strong> Push as needed. Best for active users.</p>
        ${h('Why "10 new posts" banner instead of inserting?',"UX. Inserting shifts content above your scroll position, breaks reading flow. Banner lets you opt in.")}`}],keyTerms:["Ranked feed","Candidate generation","ML ranking","Hybrid push-pull","SSE","Long polling"],sources:["Grokking SD Interview — News Feed","Facebook Engineering on feed ranking"]},recommendation:{title:"ML SD — Recommendation System",subtitle:"Two-stage architecture, the ML platform staple",duration:"30 min read",difficulty:"Advanced",sections:[{title:"Why Two Stages",body:()=>`
        <p>100M items × 1B users. Can't score every item against every user — 10^17 ops. Modern recommenders use <strong>two-stage architecture.</strong></p>
        ${S({height:200,nodes:[{id:"usr",x:50,y:80,w:70,h:30,label:"User"},{id:"cg",x:180,y:80,w:100,h:40,label:"Candidate Gen",sub:"100M → 1K",color:"#F5B842"},{id:"rk",x:330,y:80,w:100,h:40,label:"Ranker",sub:"1K → 10",color:"#7B9FB5"},{id:"out",x:480,y:80,w:80,h:30,label:"Top 10"}],edges:[{from:"usr",to:"cg"},{from:"cg",to:"rk"},{from:"rk",to:"out"}],caption:"Stage 1: fast retrieval to ~1K. Stage 2: slow ML ranks to top 10"})}`},{title:"Candidate Generation",body:()=>`
        <p>Narrow 100M to ~1K fast. Need recall, not precision.</p>
        <p><strong>Collaborative filtering.</strong> "Users like you liked..." Matrix factorization, embeddings.</p>
        <p><strong>Content-based.</strong> "Items similar to ones you liked..." TF-IDF or item embeddings.</p>
        <p><strong>Two-tower neural.</strong> User and item → embeddings. Nearest neighbors = candidates. Modern, scales.</p>`},{title:"Ranking",body:()=>`
        <p>Of 1K candidates, predict which 10 user will engage with. GBDT historically (XGBoost). Now deep models with dense + sparse features.</p>
        ${u("Ranking model offline-trained, online-served at ms latency. Feature store provides consistent features at train and serve time.","insight")}`},{title:"Cold Start",body:()=>`
        <p><strong>New user:</strong> globally popular items, onboarding questions, demographic priors.</p>
        <p><strong>New item:</strong> content features (title, category) until engagement accumulates.</p>
        ${h("Why embeddings over explicit feature engineering?","Embeddings learn what matters. Hand-engineered features cap at what humans think of. Embeddings discover patterns and generalize.")}`}],keyTerms:["Candidate generation","Ranking","Collaborative filtering","Two-tower","Embedding","Cold start","Feature store"],sources:["Grokking ML SD",`YouTube's "Deep Neural Networks for YouTube Recommendations" paper`,"Pinterest PinSage"]},"search-ranking":{title:"ML SD — Search Ranking",subtitle:"Inverted indexes, BM25, learning to rank",duration:"30 min read",difficulty:"Advanced",sections:[{title:"The Inverted Index",body:()=>`
        <p>"Documents containing word X" fast = precompute inverse: <strong>word → list of docs containing it.</strong></p>
        ${w({headers:["Term","Posting list (doc IDs)"],rows:[["rust","[doc12, doc89, doc342, doc501]"],["async","[doc12, doc77, doc342]"],["runtime","[doc89, doc342, doc501]"]]})}
        <p>Query "rust async runtime" intersects three lists. Doc342 in all three → top candidate.</p>`},{title:"BM25 — The Classic Ranker",body:()=>`
        <p>Workhorse for 30 years:</p>
        <p><strong>Term frequency</strong> — query term appearances in doc (diminishing returns).</p>
        <p><strong>Inverse document frequency</strong> — rare terms score higher.</p>
        <p><strong>Length normalization</strong> — shorter docs with the term score higher.</p>
        ${u("Elasticsearch defaults to BM25. Good enough for 80% of search use cases without ML.","info")}`},{title:"Neural Retrieval",body:()=>`
        <p>Newer: train a model to embed queries and documents in same vector space. Search = nearest neighbors.</p>
        ${S({height:180,nodes:[{id:"q",x:50,y:90,w:80,h:30,label:"Query"},{id:"qe",x:180,y:90,w:90,h:30,label:"Query encoder",color:"#F5B842"},{id:"idx",x:330,y:50,w:100,h:30,label:"Doc embeddings",color:"#8FA876"},{id:"ann",x:330,y:130,w:100,h:30,label:"ANN search"},{id:"r",x:480,y:90,w:70,h:30,label:"Results"}],edges:[{from:"q",to:"qe"},{from:"qe",to:"ann"},{from:"idx",to:"ann"},{from:"ann",to:"r"}],caption:"Dense retrieval: query and docs share embedding space"})}
        <p>Better at synonyms and intent. Costs more compute. Hybrid combines BM25 + neural.</p>`},{title:"Learning to Rank",body:()=>`
        <p>Candidates from BM25/neural feed final ranker trained on click data. Features: relevance scores, CTR history, quality signals, personalization.</p>
        ${h("Why not rank everything with neural from the start?","Cost. Running neural on every doc in your index per query = too expensive. Retrieval narrows to ~100 fast, then expensive model ranks.")}`}],keyTerms:["Inverted index","BM25","TF-IDF","Dense retrieval","Two-tower","ANN","Learning to rank"],sources:["Grokking ML SD","Elasticsearch internals",'"Neural IR" by Mitra & Craswell']},"mock-week":{title:"Mock Interview Week",subtitle:"How to actually do SD interviews under time pressure",duration:"20 min read",difficulty:"Practice",sections:[{title:"The RESHADED Framework",body:()=>`
        <p>45-min SD interviews are stressful because no structure. RESHADED keeps you on rails.</p>
        ${w({headers:["Letter","Stands for","Spend"],rows:[["R","Requirements (functional + non-functional)","5 min"],["E","Estimation (QPS, storage, bandwidth)","3 min"],["S","System APIs","3 min"],["H","High-level architecture (blocks + arrows)","7 min"],["A","API/data layer details","5 min"],["D","Data model","5 min"],["E","Evaluation: bottlenecks, scale","7 min"],["D","Deep dives where interviewer steers","10 min"]]})}`},{title:"What Interviewers Grade",body:()=>`
        <p><strong>1. Communication.</strong> Thinking out loud, acknowledging trade-offs, asking clarifying questions, diagrams matching what you say.</p>
        <p><strong>2. Trade-off awareness.</strong> Every choice has costs. "I'd use SQL because consistency matters more than write scale" beats "I'd use SQL."</p>
        <p><strong>3. Depth in the right places.</strong> Interviewer pushes on one area. Be ready to go deep on caching, sharding, consistency.</p>`},{title:"Common Patterns",body:()=>`
        ${w({headers:["Problem family","Default pattern"],rows:[["URL-style","Read-heavy, cache, base62"],["Storage-heavy (paste, file)","Metadata DB + object store"],["Feed (Twitter, FB)","Fanout strategy, hybrid push-pull"],["Real-time (chat, Uber)","Websockets, spatial index"],["Search","Inverted index, two-stage rank"],["Recommendation","Two-stage retrieval + rank"],["Video","Multi-bitrate, CDN, chunked"]]})}`},{title:"Practice Plan",body:()=>`
        <p>Last week of runway. Three mocks minimum:</p>
        <ol>
          <li><strong>Solo timed.</strong> 45 min URL shortener. Paper. Talk out loud. Record.</li>
          <li><strong>With a peer.</strong> Pramp or Discord. 45 min each way.</li>
          <li><strong>Re-do.</strong> Pick the worst. Redo knowing what you missed.</li>
        </ol>
        ${u(`Don't obsess over the "right" answer. There isn't one. They grade your process.`,"insight")}
        ${h("30 min in, haven't talked about scaling. What now?",`Don't panic. Say: "Before more components, let me address scale." Cover caching, sharding, replication, monitoring. Showing you THINK about scale is what they want.`)}`}],keyTerms:["RESHADED","Functional vs non-functional","Back-of-envelope","Bottleneck analysis","Trade-off articulation"],sources:["Grokking SD Interview methodology",'Alex Xu, "System Design Interview" Vol 1 & 2',"Pramp.com"]}},Le={"arrays-hashing":{title:"Arrays & Hashing",subtitle:"The most common pattern — trading memory for time",duration:"20 min read",difficulty:"Foundational",pattern:"Arrays & Hashing",sections:[{title:"Core Insight",body:()=>`
        <p>When a problem mentions "find pairs," "find duplicates," "group by something," or "count occurrences" — reach for a hash map. You're trading O(n) memory for the ability to look things up in O(1) instead of scanning.</p>
        <p>This pattern alone solves about 20% of all easy interview problems.</p>
        ${u("Mental rule: if your brain wants to write a nested loop to check pairs, stop. There's probably a hash map solution that turns O(n²) into O(n).","insight")}`},{title:"Two Sum — Walkthrough",body:()=>`
        <p><strong>Problem:</strong> Given <code>nums = [2, 7, 11, 15]</code> and <code>target = 9</code>, return indices of two numbers that add to target.</p>
        <p><strong>Brute force:</strong> two nested loops, check every pair. O(n²).</p>
        <p><strong>Hash map:</strong> as you iterate, for each <code>num</code>, check if <code>target - num</code> is in the map. If yes, return both indices. If no, add <code>num</code> to map.</p>
        ${$({values:[2,7,11,15],pointers:[{index:0,label:"i",color:"#F5B842"}],caption:"i=0, num=2, need 7. Map: {} → check, not there. Add {2:0}."})}
        ${$({values:[2,7,11,15],pointers:[{index:1,label:"i",color:"#F5B842"}],highlight:[0,1],caption:"i=1, num=7, need 2. Map: {2:0} → FOUND! Return [0, 1]."})}
        <p>O(n) time, O(n) space. The hash map made the "is X in my array" check free.</p>`},{title:"When To Reach For Hashing",body:()=>`
        ${w({headers:["Signal","Likely solution"],rows:[['"Find two/three elements that..."',"Hash map for complements"],['"Group by some property"',"Map of property → list"],['"Find duplicates" / "first non-repeating"',"Map of element → count"],['"Check if anagram"',"Map of char → count, compare maps"],['"Subarray with sum K"',"Prefix sum + hash map"]]})}`},{title:"Common Variations",body:()=>`
        <p><strong>Group Anagrams.</strong> Map of sorted-string → list of originals.</p>
        <p><strong>Top K Frequent.</strong> Count with map, then bucket sort by count.</p>
        <p><strong>Longest Consecutive Sequence.</strong> Put all in a set, only start counting from numbers that are sequence starts (n-1 not in set).</p>
        ${h("You have an array of 10K integers. Find all pairs summing to 100. What's the time complexity using hashing vs brute force?","Brute force: O(n²) = 100M ops. Hashing: O(n) = 10K ops. 10,000x speedup for trivial memory cost.")}`}],template:`function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return [];
}`},"two-pointers":{title:"Two Pointers",subtitle:"When sorted matters — converge from both ends",duration:"20 min read",difficulty:"Foundational",pattern:"Two Pointers",sections:[{title:"Core Insight",body:()=>`
        <p>Two pointers, usually L (left) and R (right), move toward each other based on a condition. Each iteration moves at least one pointer, so you scan the array in O(n) instead of O(n²).</p>
        <p>The setup almost always requires <strong>sorted input</strong>, because you need ordered comparisons to know which pointer to move.</p>`},{title:"Two Sum Sorted — Walkthrough",body:()=>`
        <p><strong>Problem:</strong> Sorted <code>nums = [2, 4, 7, 11, 15]</code>, target = 18.</p>
        ${$({values:[2,4,7,11,15],pointers:[{index:0,label:"L",color:"#F5B842"},{index:4,label:"R",color:"#7B9FB5"}],caption:"L=2, R=15, sum=17 < 18. Need larger. Move L right."})}
        ${$({values:[2,4,7,11,15],pointers:[{index:1,label:"L",color:"#F5B842"},{index:4,label:"R",color:"#7B9FB5"}],caption:"L=4, R=15, sum=19 > 18. Need smaller. Move R left."})}
        ${$({values:[2,4,7,11,15],pointers:[{index:1,label:"L",color:"#F5B842"},{index:3,label:"R",color:"#7B9FB5"}],highlight:[1,3],caption:"L=4, R=11, sum=15... wait, target=18. Actually 4+11=15. Keep going. (Demo of the pattern.)"})}
        <p>The point: each step you eliminate one element from consideration. O(n) total.</p>`},{title:"Pattern Variations",body:()=>`
        ${w({headers:["Problem family","How","Example"],rows:[["Sum to target (sorted)","L + R, move based on sum vs target","Two Sum II, 3Sum"],["Container With Most Water","L + R, move shorter side","Maximize area"],["Reverse / palindrome check","L moves right, R moves left, compare","Valid Palindrome"],["Remove duplicates in-place","Slow + fast pointer","Remove Duplicates from Sorted Array"]]})}`},{title:"Sliding Window Connection",body:()=>`
        <p>Sliding window is really "two pointers that both move right." If you understand two pointers, sliding window is almost free.</p>
        ${h("Why does two-pointers fail on an UNSORTED array for the sum problem?","Without sort, sum comparison doesn't tell you which direction to move. Could need bigger AND smaller, no way to know which. Hash map handles unsorted in O(n).")}`}],template:`function twoSumSorted(nums, target) {
  let L = 0, R = nums.length - 1;
  while (L < R) {
    const sum = nums[L] + nums[R];
    if (sum === target) return [L, R];
    if (sum < target) L++;
    else R--;
  }
  return [];
}`},"sliding-window":{title:"Sliding Window",subtitle:"Find contiguous subarrays without re-scanning",duration:"22 min read",difficulty:"Foundational",pattern:"Sliding Window",sections:[{title:"Core Insight",body:()=>`
        <p>When a problem asks for the longest/shortest/max/min <strong>contiguous</strong> subarray meeting some condition, sliding window turns naive O(n²) into O(n).</p>
        <p>Two pointers <code>L</code> and <code>R</code>. Both start at 0. <code>R</code> expands the window. When the window violates the condition, <code>L</code> shrinks it. Each element entered and left at most once → O(n).</p>`},{title:"Longest Substring Without Repeat — Walkthrough",body:()=>`
        <p><strong>Problem:</strong> string = "abcabcbb", find longest substring with no repeating characters.</p>
        ${$({values:["a","b","c","a","b","c","b","b"],window:{},caption:"Window [a,b,c], length 3, all unique. Expand R."})}
        ${$({values:["a","b","c","a","b","c","b","b"],window:{},caption:"Add a at R=3. Duplicate! Window has two a's. Shrink L."})}
        ${$({values:["a","b","c","a","b","c","b","b"],window:{},caption:"Move L past first a → window [b,c,a], length 3, all unique again."})}
        <p>Track max length as you go. Use a set/map to know what's currently in the window.</p>`},{title:"Fixed vs Variable Windows",body:()=>`
        ${w({headers:["Type","How","Example"],rows:[["Fixed size","Slide a window of size K","Max sum subarray of size K"],["Variable, expand-then-shrink","R expands until invalid, L shrinks until valid","Longest substring no repeat"],["Variable, find smallest","R expands until valid, L shrinks while still valid","Min window containing all chars"]]})}
        ${u('The trick to most sliding window problems: ask "when do I shrink the window?" The answer is the condition that defines "invalid."',"insight")}`},{title:"Common Problems",body:()=>`
        <ul>
          <li><strong>Longest Substring Without Repeating</strong> — variable, hash set</li>
          <li><strong>Minimum Window Substring</strong> — variable, char counts</li>
          <li><strong>Permutation in String</strong> — fixed, char counts</li>
          <li><strong>Best Time to Buy & Sell Stock</strong> — two pointers / window</li>
        </ul>
        ${h("Why is sliding window O(n), not O(n²)?","L only moves right, never resets. R only moves right. Each pointer touches each index at most once. Total work = 2n = O(n).")}`}],template:`function lengthOfLongestSubstring(s) {
  let L = 0, maxLen = 0;
  const seen = new Set();
  for (let R = 0; R < s.length; R++) {
    while (seen.has(s[R])) { seen.delete(s[L]); L++; }
    seen.add(s[R]);
    maxLen = Math.max(maxLen, R - L + 1);
  }
  return maxLen;
}`},stack:{title:"Stack",subtitle:"LIFO and the monotonic stack pattern",duration:"20 min read",difficulty:"Foundational",pattern:"Stack",sections:[{title:"Core Insight",body:()=>`
        <p>A stack is LIFO — last in, first out. Used when you need to remember things in reverse order, or when you need to match opens with closes.</p>
        <p>Two flavors come up in interviews: <strong>basic stack</strong> (matching parens, undo history) and <strong>monotonic stack</strong> (next-greater-element problems).</p>`},{title:"Valid Parentheses — Walkthrough",body:()=>`
        <p><strong>Problem:</strong> Is "{[()]}" balanced?</p>
        <p>Iterate. On open bracket → push to stack. On close → check stack top is the matching open, pop. If mismatch or empty when expecting open → invalid.</p>
        ${$({values:["{","[","(",")","]","}"],pointers:[{index:0,label:"i",color:"#F5B842"}],caption:"i=0, push {. Stack: [{]"})}
        ${$({values:["{","[","(",")","]","}"],pointers:[{index:3,label:"i",color:"#F5B842"}],caption:"i=3, ). Top is (, match. Pop. Stack: [{, []"})}
        ${$({values:["{","[","(",")","]","}"],pointers:[{index:5,label:"i",color:"#F5B842"}],highlight:[0,5],caption:"i=5, }. Top is {, match. Pop. Stack empty → valid."})}`},{title:"Monotonic Stack",body:()=>`
        <p>A stack where elements are always in increasing (or decreasing) order. Used for "next greater element" style problems.</p>
        <p><strong>Daily Temperatures.</strong> For each day, how many days until a warmer day? Naive O(n²). Monotonic stack: O(n).</p>
        <p>Iterate left to right. Stack holds indices of days waiting for a warmer day. When today is warmer than stack-top, pop and record the gap.</p>
        ${u('Pattern: when you see "next greater," "next smaller," "previous greater" — think monotonic stack.',"insight")}`},{title:"Common Problems",body:()=>`
        <ul>
          <li><strong>Valid Parentheses</strong> — match opens and closes</li>
          <li><strong>Min Stack</strong> — getMin() in O(1), keep parallel stack of mins</li>
          <li><strong>Evaluate Reverse Polish Notation</strong> — push values, pop on operator</li>
          <li><strong>Daily Temperatures</strong> — monotonic decreasing stack</li>
          <li><strong>Largest Rectangle in Histogram</strong> — monotonic stack, hard but classic</li>
        </ul>
        ${h("Why does monotonic stack give O(n) when it looks like it could pop everything?","Each element pushed once and popped at most once. Total push+pop ≤ 2n = O(n). The inner pop loop is amortized constant.")}`}],template:`function isValid(s) {
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
}`},"binary-search":{title:"Binary Search",subtitle:"Halve the search space every step",duration:"22 min read",difficulty:"Foundational",pattern:"Binary Search",sections:[{title:"Core Insight",body:()=>`
        <p>Binary search isn't just "find a number in sorted array." It's a way of thinking: <strong>at every step, eliminate half the search space.</strong> O(log n).</p>
        <p>Two flavors come up: <strong>standard</strong> (find an exact element) and <strong>on the answer space</strong> (search for the smallest/largest value that satisfies a condition).</p>`},{title:"Standard Binary Search",body:()=>`
        <p><strong>Problem:</strong> Find target=7 in <code>[1, 3, 5, 7, 9, 11]</code>.</p>
        ${$({values:[1,3,5,7,9,11],pointers:[{index:0,label:"L"},{index:2,label:"M",color:"#F5B842"},{index:5,label:"R"}],caption:"L=0, R=5, M=2. nums[M]=5 < 7. Move L = M+1."})}
        ${$({values:[1,3,5,7,9,11],pointers:[{index:3,label:"L"},{index:4,label:"M",color:"#F5B842"},{index:5,label:"R"}],caption:"L=3, R=5, M=4. nums[M]=9 > 7. Move R = M-1."})}
        ${$({values:[1,3,5,7,9,11],pointers:[{index:3,label:"L=M=R",color:"#8FA876"}],highlight:[3],caption:"L=R=M=3. nums[M]=7. Found!"})}`},{title:"Common Bugs",body:()=>`
        ${w({headers:["Bug","Fix"],rows:[["(L + R) / 2 overflows for huge arrays","Use L + (R - L) / 2"],["while (L <= R) vs while (L < R)","Depends on exit condition; both valid"],["Infinite loop when condition leaves L unchanged","Always set L = M+1 or R = M-1, never just M"],['Off-by-one on "find first/last X"',"Use template: when found, keep searching for boundary"]]})}`},{title:"Search on Answer Space",body:()=>`
        <p>Powerful pattern: when you can't binary search the input directly, binary search the answer.</p>
        <p><strong>Koko Eating Bananas.</strong> Find min eating speed K such that all bananas eaten in H hours. Speed range is [1, max(piles)]. For each candidate K, compute hours needed. Binary search on K.</p>
        <p><strong>Find Min in Rotated Sorted Array.</strong> Binary search adapted: compare to right end to know which side is sorted.</p>
        ${u('If the answer is a number with a monotonic property — "K works → K+1 works" or "K works → K-1 works" — you can binary search the answer space.',"insight")}
        ${h("Array of size 1 billion. Linear scan vs binary search?","Linear: up to 1B ops. Binary: log₂(1B) ≈ 30 ops. 33 million times faster.")}`}],template:`function binarySearch(nums, target) {
  let L = 0, R = nums.length - 1;
  while (L <= R) {
    const M = L + Math.floor((R - L) / 2);
    if (nums[M] === target) return M;
    if (nums[M] < target) L = M + 1;
    else R = M - 1;
  }
  return -1;
}`},"linked-list":{title:"Linked List",subtitle:"Pointer manipulation, the great equalizer",duration:"25 min read",difficulty:"Foundational",pattern:"Linked List",sections:[{title:"Core Insight",body:()=>`
        <p>Linked lists test one thing: can you manipulate pointers without losing your place? Most problems boil down to careful next-pointer rewiring.</p>
        <p>Master techniques: <strong>dummy head node</strong> (simplifies edge cases), <strong>two pointers</strong> (cycle detection, find midpoint), <strong>iterative reverse</strong> (3-pointer dance).</p>`},{title:"Reverse a Linked List",body:()=>`
        <p>Classic. Walk through with three pointers: prev, curr, next.</p>
        ${Pe({values:[1,2,3,4],caption:"Initial: 1 → 2 → 3 → 4. We want: 4 → 3 → 2 → 1."})}
        <p>For each node: save next, point curr.next to prev, move prev to curr, move curr to saved next.</p>
        ${u("On paper, draw the arrows and rewire them physically. The code matches what you drew.","insight")}`},{title:"Cycle Detection — Floyd's Algorithm",body:()=>`
        <p><strong>Problem:</strong> Does this linked list have a cycle?</p>
        <p>Naive: hash set of visited nodes, O(n) space. Floyd's: O(1) space.</p>
        <p>Two pointers: <strong>slow</strong> moves one step, <strong>fast</strong> moves two. If there's a cycle, fast eventually laps slow and they meet. If no cycle, fast hits null first.</p>
        ${u("Why it works: in a cycle of length C, fast gains 1 step on slow per iteration. Within C iterations, fast catches slow.","insight")}`},{title:"Common Problems",body:()=>`
        <ul>
          <li><strong>Reverse Linked List</strong> — 3-pointer iterative</li>
          <li><strong>Merge Two Sorted Lists</strong> — dummy head, walk both</li>
          <li><strong>Linked List Cycle</strong> — Floyd's tortoise and hare</li>
          <li><strong>Remove Nth From End</strong> — two pointers, fast starts N ahead</li>
          <li><strong>Reorder List</strong> — find middle + reverse second half + merge</li>
        </ul>
        ${h("Why use a dummy head node in linked list problems?",'Edge case unification. Without dummy, "insert before head" is special-case logic. With dummy, every insert is identical: prev.next = newNode. Cleaner code, fewer bugs.')}`}],template:`function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`},trees:{title:"Trees",subtitle:"Recursion's natural habitat",duration:"25 min read",difficulty:"Foundational",pattern:"Trees",sections:[{title:"Core Insight",body:()=>`
        <p>Trees are recursive by nature. Most tree problems have the shape: "do something with the current node, recurse on left, recurse on right, combine results." When you can write that template, the problem solves itself.</p>
        ${Me({nodes:[{val:1},{val:2},{val:3},{val:4},{val:5},{val:6},{val:7}],highlight:[0],caption:"Root = node 0. Recurse left (subtree rooted at 1) and right (subtree rooted at 2)."})}`},{title:"DFS vs BFS",body:()=>`
        ${w({headers:["Strategy","How","When"],rows:[["DFS (depth-first)","Recursion or explicit stack","Path-based, height, sum, validate"],["BFS (breadth-first)","Queue","Level-by-level, shortest path in unweighted"]]})}
        <p>DFS has three sub-strategies: <strong>pre-order</strong> (node, left, right — used for copy/serialize), <strong>in-order</strong> (left, node, right — gives sorted output for BST), <strong>post-order</strong> (left, right, node — used for delete/aggregate).</p>`},{title:"BST — Binary Search Tree",body:()=>`
        <p>A BST has the property: for every node, all values in left subtree are smaller, all in right are larger. This makes search O(log n) in balanced trees.</p>
        <p><strong>Validate BST.</strong> Pass down (min, max) bounds. Each node must be within bounds. Recurse with updated bounds.</p>
        ${u("In-order traversal of a BST yields sorted values. Use this to validate, or to find kth smallest in O(k).","insight")}`},{title:"Common Tree Problems",body:()=>`
        ${w({headers:["Problem","Strategy"],rows:[["Max depth","DFS, return 1 + max(left, right)"],["Invert binary tree","DFS, swap children at each node"],["Same tree","Recurse both simultaneously"],["Lowest common ancestor (BST)","Walk down: go left/right by comparing to both targets"],["Level order","BFS with queue"],["Diameter","DFS returning depth, track max (leftDepth + rightDepth)"]]})}
        ${h("Recursive DFS uses O(h) call stack where h is tree height. When is this a problem?","When h ≈ n (skewed tree, e.g., right-only chain). Stack overflow possible at 10K+ depth. Fix: iterative DFS with explicit stack.")}`}],template:`function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`},tries:{title:"Tries",subtitle:"Prefix trees for word problems",duration:"20 min read",difficulty:"Intermediate",pattern:"Tries",sections:[{title:"Core Insight",body:()=>`
        <p>A trie (prefix tree) is a tree where each node represents a character, and paths from root spell words. Lookups are O(word length), not O(num words). Used for autocomplete, spell-check, IP routing.</p>
        <p>Each node: a map from char → child node, plus a flag "is this a word end?"</p>`},{title:"Why Trie Over Hash Set",body:()=>`
        ${w({headers:["Operation","Hash Set of words","Trie"],rows:[["Exact match","O(1) average","O(word length)"],["Prefix search","O(n × prefix len)","O(prefix length)"],["All words with prefix","Scan all n","DFS from prefix node"],["Memory","O(total chars)","O(unique paths) — saves on shared prefixes"]]})}
        <p>For autocomplete ("show me all words starting with 'app'"), trie crushes hash set.</p>`},{title:"Common Problems",body:()=>`
        <ul>
          <li><strong>Implement Trie</strong> — insert, search, startsWith</li>
          <li><strong>Word Search II</strong> — find which words from a list exist in 2D grid. Trie + DFS, prune aggressively.</li>
          <li><strong>Add and Search Word</strong> — supports wildcard '.', DFS through all children when wildcard.</li>
          <li><strong>Replace Words</strong> — replace each word with its shortest dict-root, trie lookup.</li>
        </ul>
        ${u("Tries shine when many strings share prefixes. For random strings with no shared prefixes, hash set is simpler and uses less memory.","insight")}
        ${h(`You're building autocomplete for a 100K-word dictionary. User types "intern". How does trie return all completions?`,'Walk down "i→n→t→e→r→n" (6 ops). Then DFS from that node, collecting every reachable word-end. Returns "intern, internal, internet, intern­ship, ..." in time proportional to output size.')}`}],template:`class TrieNode {
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
}`},heap:{title:"Heap / Priority Queue",subtitle:"Always get the min or max in O(log n)",duration:"22 min read",difficulty:"Intermediate",pattern:"Heap",sections:[{title:"Core Insight",body:()=>`
        <p>A heap is a binary tree where every parent is smaller (min-heap) or larger (max-heap) than its children. The min/max is always the root — O(1) peek. Insert and extract are O(log n).</p>
        <p>Used as a priority queue. When you need "smallest so far" or "kth largest" or "top K," reach for heap.</p>`},{title:"Kth Largest Pattern",body:()=>`
        <p><strong>Problem:</strong> Find the kth largest element in a stream of numbers.</p>
        <p>Maintain a <strong>min-heap of size K</strong>. For each new number: push it, if size > K pop the min. The heap always contains the K largest seen so far. The root is the kth largest.</p>
        <p>O(log K) per operation. With K=100 and a billion-number stream, this beats sorting (O(n log n)) by a massive factor.</p>
        ${u("Counter-intuitive: for kth LARGEST, use min-heap. For kth SMALLEST, use max-heap. The heap stores K candidates; you want to easily evict the worst one.","insight")}`},{title:"Two Heaps for Median",body:()=>`
        <p><strong>Problem:</strong> Find median of a stream of numbers.</p>
        <p>Two heaps. <strong>Max-heap</strong> holds smaller half. <strong>Min-heap</strong> holds larger half. Keep sizes balanced (differ by at most 1). Median = root of larger heap, or average of both roots.</p>
        ${u('Two-heap trick generalizes: any time you need to know "median" or "middle element" of a moving set, two heaps maintain it in O(log n) per operation.',"insight")}`},{title:"Common Problems",body:()=>`
        <ul>
          <li><strong>Kth Largest Element</strong> — min-heap size K</li>
          <li><strong>Top K Frequent Elements</strong> — heap of (frequency, element)</li>
          <li><strong>Merge K Sorted Lists</strong> — heap of K list-head pointers</li>
          <li><strong>Find Median from Data Stream</strong> — two heaps</li>
          <li><strong>Task Scheduler</strong> — max-heap of task counts</li>
        </ul>
        ${h("Why is heap better than sort for kth largest in a stream?","Sort is O(n log n) and needs all data first. Heap is O(log K) per element, processes streaming data, uses O(K) memory. Massive win for large n, small K.")}`}],template:`// JS doesn't have built-in heap; use a library or roll your own.
// MinHeap interface:
// heap.push(x), heap.pop(), heap.peek(), heap.size
function findKthLargest(nums, k) {
  const heap = new MinHeap();
  for (const num of nums) {
    heap.push(num);
    if (heap.size > k) heap.pop();
  }
  return heap.peek();
}`},backtracking:{title:"Backtracking",subtitle:"Try, recurse, undo — explore all possibilities",duration:"25 min read",difficulty:"Intermediate",pattern:"Backtracking",sections:[{title:"Core Insight",body:()=>`
        <p>When a problem says "find all combinations / permutations / subsets / paths," it's backtracking. The template is always: <strong>try a choice → recurse → undo the choice → try next choice.</strong></p>
        <p>The undo is what makes it backtracking. You leave no trace of the choice you abandoned, so the next branch starts clean.</p>`},{title:"The Template",body:()=>`
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
        <p>Three things to define for each problem: <strong>isComplete</strong>, <strong>choices</strong>, <strong>isValid</strong>.</p>`},{title:"Common Problems",body:()=>`
        ${w({headers:["Problem","isComplete","choices","pruning"],rows:[["Subsets","always (every state is valid)","include or skip each element","none"],["Permutations","state.length === n","remaining unused elements","used set"],["Combinations(n, k)","state.length === k","numbers > last chosen","monotonic"],["N-Queens","placed n queens","columns in current row","no conflict with prior"],["Word Search","matched all chars","adjacent cells","visited set, char match"]]})}`},{title:"Pruning is Everything",body:()=>`
        <p>Naive backtracking can blow up exponentially. Pruning — eliminating dead branches early — is what makes it tractable.</p>
        <p>Example: in N-Queens, before placing a queen, check if any prior queen attacks this cell. If yes, skip — don't recurse into the doomed subtree.</p>
        ${u("If your backtracking solution times out, the fix is almost always more aggressive pruning, not a different algorithm.","insight")}
        ${h('Why must you "undo" the choice in backtracking? What if you just skipped it?',"You're sharing one state object across all branches. Without undo, the next branch starts with the previous branch's additions. Undo restores the state so siblings get a clean slate.")}`}],template:`function subsets(nums) {
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
}`},graphs:{title:"Graphs",subtitle:"BFS, DFS, and topological sort",duration:"28 min read",difficulty:"Intermediate",pattern:"Graphs",sections:[{title:"Core Insight",body:()=>`
        <p>A graph is nodes connected by edges. Trees are graphs without cycles. Most graph problems boil down to: <strong>traverse from a starting node, do something with each reachable node.</strong></p>
        <p>Two main traversals: <strong>BFS</strong> (queue, level by level, shortest path in unweighted) and <strong>DFS</strong> (recursion or stack, exhaustive exploration).</p>`},{title:"Representation",body:()=>`
        ${w({headers:["Form","How","When"],rows:[["Adjacency list","Map: node → [neighbors]","Default for most problems. Memory: O(V+E)."],["Adjacency matrix","2D array: matrix[i][j] = 1 if edge","Dense graphs. Memory: O(V²)."],["Edge list","List of (u, v, weight)","Algorithms like Kruskal's MST."]]})}`},{title:"BFS — Shortest Path Unweighted",body:()=>`
        <p>BFS visits nodes in order of distance from start. First time you reach a node, you reached it via shortest path. Perfect for "minimum steps" problems on grids.</p>
        <p><strong>Number of Islands.</strong> Iterate grid. Each unvisited "1" → BFS/DFS marks the whole island as visited. Count islands.</p>
        <p><strong>Rotting Oranges.</strong> Multi-source BFS. Push all initially rotten oranges into queue at time 0. BFS, tracking max time. Answer = max time when queue empty.</p>`},{title:"Topological Sort",body:()=>`
        <p>For a DAG (directed acyclic graph), produce an ordering where every edge u→v has u before v.</p>
        <p><strong>Course Schedule.</strong> "Can I take all courses given prerequisites?" Build graph, do topo sort. If cycle exists, impossible.</p>
        <p>Two ways: Kahn's algorithm (BFS with in-degrees) or DFS post-order with cycle detection.</p>
        ${u('Topo sort is the answer to any "ordering with dependencies" problem. Build order, task scheduling, package install order, you name it.',"insight")}
        ${h("Why does BFS give shortest path in UNWEIGHTED graphs but not weighted?","BFS visits in order of edge count. If all edges have cost 1, edge count = path cost. With weights, fewest edges ≠ cheapest path. Need Dijkstra.")}`}],template:`function bfs(start, graph) {
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
}`},"advanced-graphs":{title:"Advanced Graphs",subtitle:"Dijkstra, Bellman-Ford, MST, Union-Find",duration:"30 min read",difficulty:"Advanced",pattern:"Advanced Graphs",sections:[{title:"Dijkstra — Shortest Path Weighted",body:()=>`
        <p>BFS for weighted graphs (with non-negative weights). Greedy: always expand the cheapest unvisited node.</p>
        <p>Implementation: priority queue (min-heap) keyed on distance. Pop cheapest, relax its neighbors, repeat.</p>
        <p>O((V + E) log V) with a heap. Used in maps, routing, network protocols.</p>
        ${u("Dijkstra fails on negative weights — once a node is finalized, you assume nothing cheaper comes. Negative edges can violate that.","warning")}`},{title:"Bellman-Ford — Handles Negative Weights",body:()=>`
        <p>Slower than Dijkstra (O(V × E)) but handles negative edges. Also detects negative cycles.</p>
        <p>Algorithm: relax every edge V-1 times. After that, if any edge can still be relaxed, there's a negative cycle.</p>`},{title:"MST — Minimum Spanning Tree",body:()=>`
        <p>Connect all nodes with minimum total edge weight. Two algorithms:</p>
        <p><strong>Prim's.</strong> Like Dijkstra but for MST. Grow tree from a start node, always add cheapest edge crossing tree boundary.</p>
        <p><strong>Kruskal's.</strong> Sort all edges by weight. Add cheapest, skip if it creates cycle (Union-Find). Continue until V-1 edges.</p>`},{title:"Union-Find (Disjoint Set Union)",body:()=>`
        <p>Data structure for "what group does X belong to" and "merge two groups." O(α(n)) per op (effectively constant).</p>
        <p>Two operations: <strong>find(x)</strong> = which group is X in, <strong>union(x, y)</strong> = merge X's group with Y's.</p>
        <p>Path compression + union by rank make it nearly O(1). Used in Kruskal's, connected components, dynamic connectivity.</p>
        ${h("When would you use Bellman-Ford over Dijkstra?","Negative edge weights. Currency arbitrage detection (negative cycle = arbitrage opportunity). Routing where some edges represent rebates/credits.")}`}],template:`function dijkstra(start, graph) {
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
}`},"1d-dp":{title:"1D Dynamic Programming",subtitle:"Memoize subproblems, build up the answer",duration:"30 min read",difficulty:"Intermediate",pattern:"1D Dynamic Programming",sections:[{title:"Core Insight",body:()=>`
        <p>DP is recursion + memoization. You break a problem into overlapping subproblems, solve each once, cache the result.</p>
        <p>Sign you're looking at DP: <strong>"how many ways..."</strong>, <strong>"maximum / minimum..."</strong>, or recursion that recomputes the same things.</p>
        <p>Two implementations: <strong>top-down</strong> (recursion + memo) or <strong>bottom-up</strong> (iterative tabulation). Same complexity; tab is often faster (no recursion overhead).</p>`},{title:'Climbing Stairs — The "Hello World" of DP',body:()=>`
        <p><strong>Problem:</strong> N stairs. Each step climbs 1 or 2 stairs. How many ways to reach the top?</p>
        <p>Recurrence: <code>ways(n) = ways(n-1) + ways(n-2)</code>. Base: ways(0) = 1, ways(1) = 1.</p>
        <p>That's Fibonacci. Top-down with memo: O(n). Bottom-up: O(n) time, O(1) space (only need last two values).</p>
        ${u("If your recurrence only references the last K values, you can drop the full DP array and use K rolling variables. Reduces O(n) space to O(1).","insight")}`},{title:"House Robber Family",body:()=>`
        <p><strong>Problem:</strong> houses in a row with money. Can't rob adjacent. Max money?</p>
        <p>Recurrence: <code>rob(i) = max(rob(i-1), rob(i-2) + money[i])</code>. Either skip house i (take previous best) or rob house i (take best ending two back, plus current).</p>
        <p>Variants: House Robber II (houses in circle — solve two linear subproblems), House Robber III (tree — recurse with two states).</p>`},{title:"Longest Increasing Subsequence",body:()=>`
        <p><strong>Problem:</strong> Length of longest strictly increasing subsequence (not contiguous).</p>
        <p>DP: <code>dp[i] = 1 + max(dp[j] for j < i if nums[j] < nums[i])</code>. O(n²).</p>
        <p>Hard mode: O(n log n) with patience sort / binary search. Maintain a "tails" array where tails[k] = smallest tail of an increasing subseq of length k+1.</p>
        ${h("Top-down vs bottom-up DP: when to prefer each?","Top-down (memoize recursion): natural when not all subproblems needed; great for sparse states. Bottom-up (tabulate): faster in practice (no call overhead), often allows space optimization.")}`}],template:`function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    [prev2, prev1] = [prev1, prev1 + prev2];
  }
  return prev1;
}`},"2d-dp":{title:"2D Dynamic Programming",subtitle:"Grids, two-string problems, expanding state",duration:"32 min read",difficulty:"Advanced",pattern:"2D Dynamic Programming",sections:[{title:"Core Insight",body:()=>`
        <p>2D DP appears when state needs two indices. Two patterns dominate:</p>
        <p><strong>Grid problems.</strong> Walking through a 2D grid, computing optimal path or count. dp[i][j] depends on dp[i-1][j] and dp[i][j-1].</p>
        <p><strong>Two-string problems.</strong> Comparing two strings character by character. dp[i][j] = best for first i of A and first j of B.</p>`},{title:"Unique Paths — Grid Counting",body:()=>`
        <p><strong>Problem:</strong> Robot at top-left of m×n grid. Goes only right or down. How many paths to bottom-right?</p>
        <p>Recurrence: <code>dp[i][j] = dp[i-1][j] + dp[i][j-1]</code>. Base: dp[0][...] = dp[...][0] = 1.</p>
        <p>Variant: with obstacles, set dp[i][j] = 0 where blocked.</p>
        ${u("Grid DP often reduces to 1D space — to compute row i you only need row i-1. Roll over the array.","insight")}`},{title:"Longest Common Subsequence",body:()=>`
        <p><strong>Problem:</strong> Length of LCS of two strings (not contiguous).</p>
        <p>Recurrence: if chars match, <code>dp[i][j] = 1 + dp[i-1][j-1]</code>. Else, <code>dp[i][j] = max(dp[i-1][j], dp[i][j-1])</code>.</p>
        <p>This pattern generalizes: edit distance, longest palindromic subseq, regex matching all use it.</p>`},{title:"Edit Distance",body:()=>`
        <p><strong>Problem:</strong> Min operations (insert, delete, replace) to convert string A to string B.</p>
        <p>Recurrence: if chars match, <code>dp[i][j] = dp[i-1][j-1]</code>. Else, <code>dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])</code> for insert/delete/replace.</p>
        <p>Used in spell-checkers, diff tools, DNA sequence alignment.</p>
        ${h("LCS and Edit Distance both fill a (m+1) × (n+1) table. Why m+1, not m?","The extra row/col represents the empty string. LCS of empty with anything is 0. Edit distance of empty to length-k string is k (k inserts). Empty case is the recursion base.")}`}],template:`function longestCommonSubsequence(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i-1] === b[j-1]) dp[i][j] = 1 + dp[i-1][j-1];
      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
  }
  return dp[m][n];
}`},greedy:{title:"Greedy",subtitle:"Take the locally optimal choice. Hope it works.",duration:"22 min read",difficulty:"Intermediate",pattern:"Greedy",sections:[{title:"Core Insight",body:()=>`
        <p>Greedy algorithms make the choice that looks best right now, without reconsidering. When greedy works, it's often O(n log n) or better — beating DP's typical O(n²).</p>
        <p>The catch: greedy doesn't always work. The hard part is recognizing when it does.</p>`},{title:"When Greedy Works",body:()=>`
        <p>Greedy is correct when the problem has the <strong>greedy choice property:</strong> a locally optimal choice leads to a globally optimal solution.</p>
        <p>Often you can prove it via <strong>exchange argument:</strong> if there's an optimal solution that doesn't make the greedy choice, you can swap to the greedy choice without making it worse.</p>`},{title:"Maximum Subarray (Kadane's)",body:()=>`
        <p><strong>Problem:</strong> Max sum of any contiguous subarray.</p>
        <p>Greedy: at each element, decide to <strong>extend current subarray or start fresh.</strong> If current sum + new element < new element alone, start fresh. Track max along the way.</p>
        <p>O(n) time, O(1) space. Beautiful in its simplicity.</p>`},{title:"Jump Game",body:()=>`
        <p><strong>Problem:</strong> Array of jump-lengths. Can you reach the last index?</p>
        <p>Greedy: track the <strong>maximum reachable index so far.</strong> Iterate. If at index i and i > maxReach, you're stuck. Otherwise, maxReach = max(maxReach, i + nums[i]).</p>
        <p>Why it works: at each step, knowing the farthest reachable is enough — no need to remember the path.</p>
        ${u("Don't use greedy when you can't prove it works. Greedy looks elegant but is often wrong. When in doubt, DP it.","warning")}
        ${h("Coin change: smallest coin count to make N. Greedy (always take largest coin ≤ N) works for [1, 5, 10, 25] but fails for [1, 3, 4] with N=6. Why?","For [1, 5, 10, 25] (US coins), greedy is optimal. For [1, 3, 4] with N=6: greedy takes 4+1+1=3 coins. Optimal is 3+3=2. The greedy property holds for some coin systems and not others. When in doubt, use DP.")}`}],template:`function maxSubArray(nums) {
  let curr = nums[0], max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    curr = Math.max(nums[i], curr + nums[i]);
    max = Math.max(max, curr);
  }
  return max;
}`},intervals:{title:"Intervals",subtitle:"Sort by start, sweep, merge",duration:"20 min read",difficulty:"Intermediate",pattern:"Intervals",sections:[{title:"Core Insight",body:()=>`
        <p>Interval problems are deceptively simple. Most reduce to: <strong>sort intervals by start time, then sweep left to right.</strong> Each interval either extends the current group or starts a new one.</p>
        <p>The hardest part is figuring out the comparator and the merge condition for your specific problem.</p>`},{title:"Merge Intervals",body:()=>`
        <p><strong>Problem:</strong> Given intervals like [[1,3], [2,6], [8,10]], merge overlapping.</p>
        <p>Sort by start. Iterate. If next interval starts before current ends → merge (extend end). Otherwise → push current, start new.</p>
        <p>O(n log n) for sort, O(n) for sweep.</p>`},{title:"Meeting Rooms II — Min Rooms",body:()=>`
        <p><strong>Problem:</strong> Given meeting time intervals, minimum rooms needed?</p>
        <p>Two approaches:</p>
        <p><strong>Sweep events.</strong> Create [(start, +1), (end, -1)] events. Sort. Sweep, track running sum, max sum = answer.</p>
        <p><strong>Min-heap of end times.</strong> Sort intervals by start. For each, if heap top ≤ start, pop (room freed). Push current end. Heap size = rooms needed.</p>`},{title:"Insert Interval",body:()=>`
        <p><strong>Problem:</strong> Insert new interval into sorted non-overlapping list. Merge as needed.</p>
        <p>Linear pass. Three phases: (1) intervals entirely before new — copy. (2) intervals overlapping new — merge into new. (3) intervals entirely after — copy.</p>
        ${u("Two intervals [a,b] and [c,d] overlap iff a ≤ d AND c ≤ b. Memorize this — every interval problem uses it.","insight")}
        ${h("Why sort by start for most interval problems, not end?",'Sorting by start lets you process in temporal order. As you sweep, "current interval" is well-defined, and "does the next one overlap" only needs to check vs current end. Sorting by end works for some problems (e.g. greedy interval scheduling for max non-overlap) but is less common.')}`}],template:`function merge(intervals) {
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
}`},"math-geometry":{title:"Math & Geometry",subtitle:"Modular arithmetic, matrix tricks, geometric patterns",duration:"20 min read",difficulty:"Intermediate",pattern:"Math & Geometry",sections:[{title:"Core Insight",body:()=>`
        <p>These problems are often about <strong>spotting a math trick</strong> that turns brute force into something elegant. They reward pattern recognition over algorithmic depth.</p>
        <p>Common families: matrix transformations (rotate, transpose), digit manipulation, modular arithmetic for huge numbers, geometric formulas.</p>`},{title:"Rotate Image — Matrix Trick",body:()=>`
        <p><strong>Problem:</strong> Rotate n×n matrix 90° clockwise in-place.</p>
        <p>Naive: build new matrix, copy with rotated indices. O(n²) time and space.</p>
        <p>Trick: <strong>transpose then reverse each row.</strong> Transpose flips along the diagonal. Reversing rows finishes the rotation. O(n²) time, O(1) space.</p>
        ${u('Many matrix problems have a "two-pass trick" — combine simple transformations to get the desired result. Always ask: can I decompose this rotation into known operations?',"insight")}`},{title:"Spiral Matrix",body:()=>`
        <p><strong>Problem:</strong> Traverse matrix in spiral order.</p>
        <p>Maintain four boundaries: top, bottom, left, right. Walk right (top boundary), then down (right boundary), then left, then up. Shrink the boundary you just traversed. Stop when boundaries cross.</p>`},{title:"Plus One — Carry Logic",body:()=>`
        <p><strong>Problem:</strong> Add 1 to a number represented as a digit array.</p>
        <p>Iterate from right. If digit < 9, increment and return. Otherwise set to 0 and carry. If you carry past the leftmost digit, prepend 1.</p>
        <p>Sounds trivial; the edge case (all 9s) is the test.</p>
        ${h("Pow(x, n) — compute x^n. Naive is O(n). Better?","Fast exponentiation: O(log n). x^n = (x^(n/2))² if n even, x × x^(n-1) if odd. Recurse. Same trick used in modular exponentiation for crypto.")}`}],template:`function rotate(matrix) {
  const n = matrix.length;
  // Transpose
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  // Reverse each row
  for (let i = 0; i < n; i++) matrix[i].reverse();
}`},"bit-manipulation":{title:"Bit Manipulation",subtitle:"XOR tricks, set bits, mask operations",duration:"20 min read",difficulty:"Intermediate",pattern:"Bit Manipulation",sections:[{title:"Core Insight",body:()=>`
        <p>Bit operations are O(1) but let you do magic. Most interview bit problems exploit one of three things:</p>
        <p><strong>XOR.</strong> x ^ x = 0, x ^ 0 = x. Pairs cancel; lone elements survive.</p>
        <p><strong>n & (n - 1).</strong> Clears the lowest set bit. Useful for counting bits, checking powers of 2.</p>
        <p><strong>1 << k.</strong> Build a mask with just bit k set. Toggle, test, set bits selectively.</p>`},{title:"Single Number",body:()=>`
        <p><strong>Problem:</strong> Array where every element appears twice except one. Find the lone one.</p>
        <p>Naive: hash map of counts. O(n) space.</p>
        <p>XOR trick: XOR all elements. Pairs cancel (x ^ x = 0). Result is the lone element. O(1) space.</p>
        ${u("XOR is your friend whenever pairs need to cancel. It's commutative and associative, so order doesn't matter.","insight")}`},{title:"Counting Bits",body:()=>`
        <p><strong>Problem:</strong> For numbers 0 to n, count set bits in each.</p>
        <p>Trick: <code>countBits(n) = countBits(n & (n-1)) + 1</code>. Because n & (n-1) clears one bit. DP gives O(n).</p>
        <p>Even slicker: <code>countBits(n) = countBits(n >> 1) + (n & 1)</code>. Same O(n).</p>`},{title:"Common Problems",body:()=>`
        <ul>
          <li><strong>Single Number</strong> — XOR all, lone survives</li>
          <li><strong>Number of 1 Bits</strong> — n & (n-1) trick</li>
          <li><strong>Counting Bits</strong> — DP using bit trick</li>
          <li><strong>Reverse Bits</strong> — shift in and out</li>
          <li><strong>Missing Number</strong> — XOR all + XOR indices, missing survives</li>
          <li><strong>Sum of Two Integers</strong> — without +; XOR for sum, AND<<1 for carry</li>
        </ul>
        ${h("How to check if a number is a power of 2?","n > 0 AND (n & (n-1)) === 0. Powers of 2 have exactly one bit set. n-1 flips all bits below; AND with n gives 0.")}`}],template:`function singleNumber(nums) {
  let result = 0;
  for (const num of nums) result ^= num;
  return result;
}`}},I=e=>String(e||"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Ae(){if(!s.selectedLesson)return'<div class="view"><div class="empty">No lesson selected</div></div>';const{kind:e,id:t}=s.selectedLesson,i=(e==="sd"?Ie:Le)[t];if(!i)return`<div class="view"><div class="empty">Lesson "${t}" not found.</div></div>`;const o=i.sections.map((a,c)=>`
    <section class="lesson-section">
      <div class="lesson-section-header">
        <span class="lesson-section-num">${String(c+1).padStart(2,"0")}</span>
        <h2 class="lesson-section-title">${I(a.title)}</h2>
      </div>
      <div class="lesson-body">${a.body()}</div>
    </section>
  `).join(""),n=(i.keyTerms||[]).length?`
    <div class="lesson-section">
      <div class="kicker" style="margin-bottom: 12px;">Key Terms to Know</div>
      <div class="brief-terms">${i.keyTerms.map(a=>`<span class="chip">${I(a)}</span>`).join("")}</div>
    </div>
  `:"",d=(i.sources||[]).length?`
    <div class="lesson-section">
      <div class="kicker" style="margin-bottom: 12px;">Sources & Further Reading</div>
      <ul style="list-style: none; padding: 0; color: var(--text-secondary); font-size: 14px; line-height: 1.7;">
        ${i.sources.map(a=>`<li style="padding: 4px 0;">• ${I(a)}</li>`).join("")}
      </ul>
    </div>
  `:"",l=s.aiConfig.enabled?`
    <button class="btn btn-primary" style="margin-top: 24px;" data-action="ask-ai" data-context="${I(i.title+" — "+(i.subtitle||""))}">
      Ask Claude about this lesson →
    </button>
  `:"";return`
    <div class="view animate-fade-up">
      <div class="lesson-header">
        <button class="lesson-back" data-action="back-from-lesson">← Back</button>
        <h1 class="lesson-title">${I(i.title)}</h1>
        ${i.subtitle?`<div class="body" style="margin-bottom: 12px;">${I(i.subtitle)}</div>`:""}
        <div class="lesson-meta">
          <span class="chip">${I(i.duration||"")}</span>
          ${i.difficulty?`<span class="chip">${I(i.difficulty)}</span>`:""}
          <span class="chip chip-track-${e}">${e==="sd"?"◇ System Design":"⌘ DSA Pattern"}</span>
        </div>
      </div>

      ${o}
      ${n}
      ${d}
      ${l}
    </div>
  `}const P=e=>String(e||"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Be(){return s.showSettings?`
    <div class="modal-backdrop" data-action="close-settings">
      <div class="modal" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h2 class="h2">Settings</h2>
          <button class="btn" data-action="close-settings">close</button>
        </div>

        <div class="kicker" style="margin-bottom: 16px;">Sync (PocketBase)</div>

        <div class="row between" style="padding: 12px 0; border-top: 1px solid var(--border-subtle);">
          <span class="body-sm">Cloud sync</span>
          <div class="toggle ${s.syncConfig.enabled?"on":""}" data-action="toggle-sync">
            <div class="toggle-knob"></div>
          </div>
        </div>

        <div class="field" style="margin-top: 16px;">
          <label class="field-label">PocketBase URL</label>
          <input class="field-input" id="syncUrl" type="text" placeholder="http://100.x.x.x:8090" value="${P(s.syncConfig.url)}" />
          <div class="field-hint">Your PocketBase server. Use your Tailscale IP for remote access.</div>
        </div>
        <div class="field">
          <label class="field-label">Email</label>
          <input class="field-input" id="syncEmail" type="email" placeholder="you@example.com" value="${P(s.syncConfig.email)}" />
        </div>
        <div class="field">
          <label class="field-label">Password</label>
          <input class="field-input" id="syncPassword" type="password" placeholder="••••••••" value="${P(s.syncConfig.password)}" />
          <div class="field-hint">Stored only in your browser. Never sent except to your PocketBase.</div>
        </div>
        <button class="btn btn-primary" style="width: 100%;" data-action="save-sync">Save & Test Sync</button>
        <div id="syncMsg" style="margin-top: 12px;"></div>

        <div class="kicker" style="margin-top: 32px; margin-bottom: 16px;">AI Assistant (Anthropic Claude)</div>

        <div class="row between" style="padding: 12px 0; border-top: 1px solid var(--border-subtle);">
          <span class="body-sm">Enable AI assist</span>
          <div class="toggle ${s.aiConfig.enabled?"on":""}" data-action="toggle-ai">
            <div class="toggle-knob"></div>
          </div>
        </div>

        <div class="field" style="margin-top: 16px;">
          <label class="field-label">Anthropic API Key</label>
          <input class="field-input" id="aiKey" type="password" placeholder="sk-ant-..." value="${P(s.aiConfig.apiKey)}" />
          <div class="field-hint">Get one at console.anthropic.com. Stored only in your browser, sent only to api.anthropic.com.</div>
        </div>
        <button class="btn btn-primary" style="width: 100%;" data-action="save-ai">Save API Key</button>
        <div id="aiMsg" style="margin-top: 12px;"></div>

        <div class="row between" style="margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--border-subtle);">
          <button class="btn" data-action="export">export backup</button>
          <button class="btn" data-action="reset">reset all data</button>
        </div>
      </div>
    </div>
  `:""}async function We(){const e=document.getElementById("syncUrl").value.trim().replace(/\/$/,""),t=document.getElementById("syncEmail").value.trim(),r=document.getElementById("syncPassword").value;s.syncConfig={...s.syncConfig,url:e,email:t,password:r},te();const i=document.getElementById("syncMsg");i.innerHTML='<div class="caption">Testing…</div>';try{await E(),await ne(),i.innerHTML='<div class="callout callout-insight">✓ Connected and synced.</div>'}catch(o){i.innerHTML=`<div class="callout callout-warning">✗ ${P(o.message)}</div>`}}async function Re(){const e=document.getElementById("aiKey").value.trim();s.aiConfig.apiKey=e,se();const t=document.getElementById("aiMsg");t.innerHTML='<div class="caption">Testing…</div>';try{const r=await le('Reply with just the word "OK".');t.innerHTML=`<div class="callout callout-insight">✓ Connected. Test response: ${P(r.substring(0,60))}</div>`}catch(r){t.innerHTML=`<div class="callout callout-warning">✗ ${P(r.message.substring(0,200))}</div>`}}let N=[];function Fe(){if(!s.showAI)return"";const e=N.map(t=>`
    <div style="padding: 12px; background: ${t.role==="user"?"var(--bg-elevated)":"var(--accent-amber-bg)"}; border-radius: 8px; margin-bottom: 8px;">
      <div class="kicker" style="margin-bottom: 4px; color: ${t.role==="user"?"var(--text-tertiary)":"var(--accent-amber)"};">${t.role==="user"?"You":"Claude"}</div>
      <div class="body-sm" style="white-space: pre-wrap;">${P(t.content)}</div>
    </div>
  `).join("");return`
    <div class="modal-backdrop" data-action="close-ai">
      <div class="modal" onclick="event.stopPropagation()" style="max-height: 90vh;">
        <div class="modal-header">
          <h2 class="h2">Ask Claude</h2>
          <button class="btn" data-action="close-ai">close</button>
        </div>
        ${s.aiContext?`<div class="caption" style="margin-bottom: 16px; padding: 10px; background: var(--bg-base); border-radius: 6px;">Context: ${P(s.aiContext)}</div>`:""}
        <div id="aiHistory" style="max-height: 50vh; overflow-y: auto; margin-bottom: 16px;">${e}</div>
        <textarea id="aiInput" class="field-input" rows="3" placeholder="Ask anything about this concept..." style="resize: vertical; min-height: 80px;"></textarea>
        <button class="btn btn-primary" style="width: 100%; margin-top: 12px;" data-action="send-ai">Ask Claude →</button>
      </div>
    </div>
  `}async function Ee(){const e=document.getElementById("aiInput"),t=e.value.trim();if(!t)return;const r=`You are a focused study assistant helping a DevSecOps engineer prepare for FAANG-adjacent interviews and a UPenn CS master's program. Be concise, technically precise, and direct. Use examples and analogies when they clarify. Avoid filler. If asked about a system design or DSA topic, structure your answer with clear sections.${s.aiContext?" Current learning context: "+s.aiContext:""}`;N.push({role:"user",content:t}),e.value="",k();const i=document.getElementById("aiHistory");i&&(i.innerHTML+='<div style="padding: 12px;"><div class="spinner"></div></div>',i.scrollTop=i.scrollHeight);try{const o=await le(t,r);N.push({role:"assistant",content:o})}catch(o){N.push({role:"assistant",content:"Error: "+o.message})}k()}function Oe(e=null){if(!s.aiConfig.enabled||!s.aiConfig.apiKey){alert("AI is not configured. Open Settings to add your Anthropic API key.");return}s.showAI=!0,s.aiContext=e,k()}function Ne(){s.showAI=!1,s.aiContext=null,k()}function de(){const e=ie(),t=document.getElementById("app");t.innerHTML=`
    <header class="topbar">
      <div class="brand">runway<span class="brand-dot">.</span></div>
      <div class="topbar-actions">
        <div class="sync-pill" data-action="open-settings">
          <span class="sync-dot ${s.syncStatus}"></span>
          <span>${s.syncStatus==="synced"?"synced":s.syncStatus==="syncing"?"sync…":s.syncStatus==="error"?"error":"local"}</span>
        </div>
        <div class="streak">
          <span class="streak-num">${e.streak}</span>
          <span class="streak-label">day${e.streak===1?"":"s"}</span>
        </div>
      </div>
    </header>

    <main id="view-container">${He()}</main>

    <nav class="tabbar">
      <div class="tabbar-inner">
        <button class="tab ${s.activeTab==="today"?"active":""}" data-action="set-tab" data-tab="today">
          <span class="tab-icon">${F("today")}</span>
          <span class="tab-label">Today</span>
        </button>
        <button class="tab ${s.activeTab==="week"?"active":""}" data-action="set-tab" data-tab="week">
          <span class="tab-icon">${F("week")}</span>
          <span class="tab-label">Week</span>
        </button>
        <button class="tab ${s.activeTab==="plan"?"active":""}" data-action="set-tab" data-tab="plan">
          <span class="tab-icon">${F("plan")}</span>
          <span class="tab-label">Plan</span>
        </button>
        <button class="tab ${s.activeTab==="sd"?"active":""}" data-action="set-tab" data-tab="sd">
          <span class="tab-icon">${F("sd")}</span>
          <span class="tab-label">SD</span>
        </button>
        <button class="tab ${s.activeTab==="dsa"?"active":""}" data-action="set-tab" data-tab="dsa">
          <span class="tab-icon">${F("dsa")}</span>
          <span class="tab-label">DSA</span>
        </button>
      </div>
    </nav>

    ${Be()}
    ${Fe()}
  `,Ge()}function He(){if(s.selectedLesson)return Ae();switch(s.activeTab){case"today":return V();case"week":return Se();case"plan":return $e();case"sd":return Te();case"dsa":return De();default:return V()}}function F(e){const r=Object.entries({width:18,height:18,fill:"none",stroke:"currentColor","stroke-width":1.8,"stroke-linecap":"round","stroke-linejoin":"round"}).map(([i,o])=>`${i}="${o}"`).join(" ");switch(e){case"today":return`<svg ${r}><circle cx="9" cy="9" r="6"/><circle cx="9" cy="9" r="2" fill="currentColor"/></svg>`;case"week":return`<svg ${r}><rect x="2" y="3" width="14" height="13" rx="2"/><line x1="2" y1="7" x2="16" y2="7"/><line x1="6" y1="3" x2="6" y2="7"/><line x1="12" y1="3" x2="12" y2="7"/></svg>`;case"plan":return`<svg ${r}><line x1="3" y1="5" x2="15" y2="5"/><line x1="3" y1="9" x2="15" y2="9"/><line x1="3" y1="13" x2="15" y2="13"/></svg>`;case"sd":return`<svg ${r}><rect x="2" y="2" width="6" height="6" rx="1"/><rect x="10" y="2" width="6" height="6" rx="1"/><rect x="2" y="10" width="6" height="6" rx="1"/><rect x="10" y="10" width="6" height="6" rx="1"/><line x1="8" y1="5" x2="10" y2="5"/><line x1="5" y1="8" x2="5" y2="10"/></svg>`;case"dsa":return`<svg ${r}><circle cx="9" cy="3" r="2"/><circle cx="4" cy="13" r="2"/><circle cx="14" cy="13" r="2"/><line x1="9" y1="5" x2="4" y2="11"/><line x1="9" y1="5" x2="14" y2="11"/></svg>`;default:return""}}function Ge(){document.querySelectorAll("[data-action]").forEach(e=>{e.addEventListener("click",async t=>{const r=e.dataset.action;if(r)switch(r){case"set-tab":s.activeTab=e.dataset.tab,s.selectedLesson=null,s.expandedBriefs.clear(),k(),window.scrollTo(0,0);break;case"toggle-block":{const i=+e.dataset.week,o=+e.dataset.day,n=e.dataset.kind;R(`w${i}_d${o}_${n}`);break}case"toggle-project":R(`w${e.dataset.week}_project`);break;case"toggle-sd":t.stopPropagation(),R(`w${e.dataset.week}_sd`);break;case"toggle-dsa":t.stopPropagation(),R(`w${e.dataset.week}_dsa`);break;case"toggle-problem":R(`dsa_${e.dataset.id}`);break;case"toggle-brief":{const i=e.dataset.brief;s.expandedBriefs.has(i)?s.expandedBriefs.delete(i):s.expandedBriefs.add(i),k();break}case"select-week":s.selectedWeek=+e.dataset.week,s.activeTab="week",s.expandedBriefs.clear(),k(),window.scrollTo(0,0);break;case"open-sd":case"open-sd-lesson":s.selectedLesson={kind:"sd",id:e.dataset.id},k(),window.scrollTo(0,0);break;case"open-dsa":case"open-dsa-lesson":s.selectedLesson={kind:"dsa",id:e.dataset.id},k(),window.scrollTo(0,0);break;case"back-from-lesson":s.selectedLesson=null,k();break;case"open-settings":s.showSettings=!0,k();break;case"close-settings":s.showSettings=!1,k();break;case"toggle-sync":s.syncConfig.enabled=!s.syncConfig.enabled,te(),s.syncConfig.enabled?E():s.syncStatus="offline",k();break;case"save-sync":await We();break;case"toggle-ai":s.aiConfig.enabled=!s.aiConfig.enabled,se(),k();break;case"save-ai":await Re();break;case"ask-ai":Oe(e.dataset.context);break;case"close-ai":Ne();break;case"send-ai":await Ee();break;case"export":fe();break;case"reset":we();break}})})}ue();pe(de);de();s.syncConfig.enabled&&E();
