(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const g of l.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&o(g)}).observe(document,{childList:!0,subtree:!0});function s(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(r){if(r.ep)return;r.ep=!0;const l=s(r);fetch(r.href,l)}})();const Q={"DevOps Fundamentals":{color:"#F5B842",code:"devops"},"MLOps Bridge":{color:"#E07856",code:"mlops"},"UPenn Semester":{color:"#8FA876",code:"upenn"}},Ce={1:{label:"START",desc:"May 21, 2026 — runway begins"},9:{label:"ML BRIDGE",desc:"DevOps foundation → MLOps"},14:{label:"UPENN",desc:"Grad school begins, MLOps goes light"},20:{label:"CAPSTONE",desc:"Portfolio piece shipped"}},X=new Date("2026-05-21T00:00:00"),Z=[{num:1,phase:"DevOps Fundamentals",title:"Linux & Bash",blockA:{task:"Write a Bash script daily — process monitor, log parser, service health checker",brief:{insight:"Bash literacy comes from writing, not reading. You will not learn it from a book. You will learn it from the third time you debug why your loop ate a variable name.",why:'Every alert you get in DevSecOps starts with "is the service running?" If you can answer that with a 20-line script in five minutes, you save an hour of guessing.',terms:["set -euo pipefail","parameter expansion","command substitution","exit codes","[[ ]] vs [ ]","heredocs","trap"],resource:"Greg's Wiki (mywiki.wooledge.org/BashGuide). ShellCheck.net — paste your script, get gotchas highlighted.",test:["What does set -euo pipefail actually do, line by line?",'Why is [ $x = "y" ] dangerous and what fixes it?',"How do you make sure your script exits cleanly if killed mid-run?"],doneWhen:"Three working scripts, each under 50 lines, each with error handling. Pass ShellCheck."}},blockB:{task:"Man pages, stdin/stdout/stderr flow, systemd unit files",brief:{insight:"In Linux everything is a file, including I/O streams. stdin/stdout/stderr are file descriptors 0/1/2. Redirect them with > < | and you can pipe anything to anything. systemd is just init replaced with a smarter manager that watches for crashes and restarts you.",why:'Ninety percent of "why is my service down" answers involve one of: stuck process, full disk, broken pipe, or systemd unit misconfiguration. This is the literacy that turns guessing into debugging.',terms:["file descriptor","redirection (> < >> 2>&1 &>)","pipes","exit codes","signals (SIGTERM, SIGKILL, SIGHUP)","systemd unit file","journalctl"],resource:"man bash (REDIRECTION section). man 7 signal. man systemd.service. Julia Evans zines.",test:["Difference between 2>&1 and &>?","Why is kill -9 considered rude?","How do you auto-restart a systemd service on failure?"]}},project:"Service health checker script that emails on failure",sd:{topicId:"networking-fundamentals",topic:"Networking Fundamentals — IP, TCP/UDP, HTTP/HTTPS, OSI model",source:"NeetCode SD Course · Grokking SD Fundamentals"},dsa:{patternId:"arrays-hashing",topic:"Arrays & Hashing — the foundation pattern"}},{num:2,phase:"DevOps Fundamentals",title:"Linux Deep Dive",blockA:{task:"Build a small CLI tool in Bash with proper error handling",brief:{insight:"A good CLI tool feels obvious to use and impossible to misuse. Flags have help text. Errors are clear. Exit codes are honest. Bash can do all of this with getopts and discipline.",why:`The "small tools" you write at SAIC become other people's muscle memory. A polished one earns trust. A janky one gets replaced.`,terms:["getopts","long flags","heredocs for help text","trap signal handlers","idempotent operations"],resource:'man getopts. "Bash Cookbook" by Albing & Vossen.',test:["Why is getopts safer than parsing $1, $2 manually?","How does trap let you clean up on Ctrl+C?","What exit code conventions do well-behaved CLIs follow?"],doneWhen:"One CLI tool with --help, --verbose, --dry-run, returns proper exit codes."}},blockB:{task:"Process lifecycle, signals, file descriptors — diagram the crash flow",brief:{insight:"A process is born via fork(), customized via exec(), runs until it exits or receives an uncaught signal. Parent must wait() on children or you get zombies. Signals are async interrupts — handle them or they kill you.",why:"Every container, daemon, and CI runner is a process tree. Understanding the lifecycle is understanding why things hang, leak, or won't die. This is the foundation under containerization.",terms:["fork / exec / wait","PID / PPID","zombie process","orphan process","SIGTERM vs SIGKILL","SIGCHLD","file descriptor leak"],resource:"man 2 fork. man 2 execve. man 7 signal. Julia Evans process zines.",test:["Why can't you catch SIGKILL?","What creates a zombie process?","What's an FD leak and how do you find one?"]}},project:'Diagram + 90-second explanation of "what happens when a Linux process crashes"',sd:{topicId:"dns-cdn",topic:"DNS & CDNs — resolution chain, edge caching",source:"Grokking SD Fundamentals"},dsa:{patternId:"arrays-hashing",topic:"Arrays & Hashing — continue practice"}},{num:3,phase:"DevOps Fundamentals",title:"Networking I",blockA:{task:"Set up local nginx reverse proxy with two upstream servers",brief:{insight:"A reverse proxy is the front door of every modern web stack. nginx is good at it because its config is declarative — you describe the topology, not the algorithm.",why:"Every K8s Ingress, every CDN edge, every API gateway is ultimately doing what nginx does. Master the config and the abstractions become readable.",terms:["upstream blocks","proxy_pass","X-Forwarded-For","keepalive","proxy_buffering"],resource:"nginx.com beginner's guide.",test:["Why does nginx need X-Forwarded-For when proxying?","What does keepalive between nginx and upstream actually save?","When does proxy_buffering hurt you?"],doneWhen:"curl through the LB hits backend1 and backend2 alternately. Headers show which backend served the request."}},blockB:{task:"TCP handshake, DNS resolution, HTTP lifecycle — draw it",brief:{insight:"Drawing the full HTTP lifecycle from address bar to byte-on-wire forces you to confront what you actually know. Make it a 90-second story you can tell on a whiteboard.",why:`Interviewers literally ask "what happens when you type a URL." If you can't draw it, you can't claim to know how the web works.`,terms:["DNS resolution","TCP 3-way handshake","TLS handshake","HTTP request","TCP teardown","connection reuse"],resource:'GitHub repo "what-happens-when". "High Performance Browser Networking" by Ilya Grigorik (free online).',test:["Where does the TLS handshake happen in the timeline?","What does HTTP/2 keep-alive save over HTTP/1.1?","Why are subsequent requests to the same host faster?"]}},project:"Draw full HTTP request lifecycle from browser to server in under 2 min",sd:{topicId:"load-balancers",topic:"Load Balancers — L4 vs L7, algorithms",source:"Grokking SD Fundamentals · NeetCode"},dsa:{patternId:"two-pointers",topic:"Two Pointers — the search pattern"}},{num:4,phase:"DevOps Fundamentals",title:"Networking II",blockA:{task:"tcpdump or Wireshark capture on your reverse proxy",brief:{insight:"tcpdump and Wireshark show what actually happened on the wire — not what your app thinks happened. When docs say one thing and behavior says another, the pcap is the tiebreaker.",why:'Once you can read a pcap, you stop being scared of network bugs. "Is the request reaching the server?" becomes a 30-second answer.',terms:["pcap","BPF filter syntax","TLS handshake messages","TCP retransmissions","window scaling"],resource:"tcpdump.org examples. Wireshark display filters reference.",test:["Filter for only TLS ClientHello messages — what command?","How do you tell a TCP retransmission from a duplicate?","What does window scaling mean and why does it matter?"],doneWhen:"Annotated pcap showing SYN → SYN-ACK → ACK → ClientHello → ServerHello with each step explained."}},blockB:{task:"TLS termination, load balancing strategies, subnetting basics",brief:{insight:'TLS is not "add an s to http." It is an asymmetric handshake establishing a symmetric session key, then encrypting everything after. Termination is where TLS unwraps — usually your LB, not your app.',why:"TLS termination location is a constant source of bugs: HTTP between LB and app, certificate mismatches, SNI failures. Knowing where the encryption boundary is fixes them.",terms:["TLS handshake","ClientHello / ServerHello","cipher suites","SNI","certificate chain","mutual TLS (mTLS)","perfect forward secrecy"],resource:'Cloudflare Learning Center on TLS. "Bulletproof SSL and TLS" by Ivan Ristic (Ch 1-3 free).',test:["Why does TLS need both asymmetric AND symmetric crypto?","What is SNI and why is it needed?","When would you use mTLS over regular TLS?"]}},project:"Annotated tcpdump trace of a TLS handshake",sd:{topicId:"databases-i",topic:"Databases I — SQL vs NoSQL, ACID, BASE",source:"NeetCode SD · Grokking DB"},dsa:{patternId:"two-pointers",topic:"Two Pointers — more practice"}},{num:5,phase:"DevOps Fundamentals",title:"Docker Internals",blockA:{task:"Multi-stage Dockerfile, rootless container, Trivy scan",brief:{insight:"A good production Dockerfile separates the toolchain from the runtime. Build stage has gcc, npm, the universe. Final stage has the binary and nothing else. Smaller image = faster pull = lower attack surface.",why:"Your DevSecOps work cares about both speed and security. Multi-stage builds + scanning + rootless gives you all three.",terms:["FROM ... AS stage","COPY --from=stage","USER directive",".dockerignore","layer caching","distroless"],resource:'Docker "best practices" docs. Trivy GitHub README. Snyk Dockerfile cheat sheet.',test:["Why is order of COPY/RUN in a Dockerfile crucial for cache?","Why is running as root in a container risky if containers are isolated?","Distroless vs Alpine vs Ubuntu — when does each win?"],doneWhen:"Image under 100MB for a small app. Runs as non-root. Trivy passes with zero HIGH/CRITICAL CVEs."}},blockB:{task:"Namespaces, cgroups, image layers, container escape conceptually",brief:{insight:"Containers are not VMs. They are processes with restricted views. Linux namespaces give isolation, cgroups give resource limits. Same kernel, different views.",why:'When you can explain THIS, you can explain why containers start fast, why escapes are possible, and why "Docker is lightweight" actually means something specific.',terms:["Namespaces (PID, NET, MNT, UTS, IPC, USER)","cgroups","OCI runtime","OverlayFS","PID 1 problem","capabilities"],resource:'Julia Evans "Containers are just processes". Liz Rice "Container from Scratch in Go" talk on YouTube — gold standard.',test:["Name 3 of the 6 Linux namespaces.","Why does kill in a container only kill that container?","What is the PID 1 problem and how does tini solve it?"]}},project:"Minimal hardened container with passing Trivy scan",sd:{topicId:"caching",topic:"Caching — Redis, strategies, eviction",source:"Grokking SD Fundamentals"},dsa:{patternId:"sliding-window",topic:"Sliding Window — the optimization pattern"}},{num:6,phase:"DevOps Fundamentals",title:"CI/CD Patterns",blockA:{task:"GitHub Actions: lint → test → build → deploy + manual gate + rollback",brief:{insight:"A real pipeline is a directed graph of jobs with gates between them. Linting before tests saves CI minutes. Approval gates before prod save your weekend. Rollback as a first-class job saves your year.",why:"Your Azure DevOps work translates directly. GitHub Actions has different YAML but same patterns — and FAANG-adjacent companies almost all use GitHub Actions.",terms:["workflow events","jobs vs steps","environments + approval","matrix builds","caching","OIDC for cloud auth","reusable workflows"],resource:'GitHub Actions "learn" docs. "GitHub Actions in Action" (Manning) for depth.',test:["Why use OIDC instead of stored AWS keys?","When matrix vs separate jobs?",`What do "environments" buy you that "if" conditions don't?`],doneWhen:"Push triggers full pipeline. Manual approval for deploy. One-button rollback works."}},blockB:{task:"GitOps vs push CI/CD, trunk-based dev, blue/green, canary",brief:{insight:"GitOps inverts the CI/CD arrow. Instead of CI pushing to prod, prod pulls from Git. Your repo IS your deployment state. Drift detection becomes possible because deviation from Git equals drift.",why:'ArgoCD and Flux are not "another CI tool" — a fundamentally different model. Knowing both lets you pick the right one. This is platform engineering thinking.',terms:["Push vs pull CI/CD","Declarative config","Drift detection","ArgoCD","Flux","Blue/green","Canary","Feature flags","Progressive delivery"],resource:'Weaveworks "GitOps Guide" PDF. OpenGitOps principles.',test:["When does GitOps fail or feel wrong?","Why is rollback easy in GitOps?","Blue/green vs canary — when does each win?"]}},project:"Working pipeline with rollback in a public repo",sd:{topicId:"message-queues",topic:"Message Queues — Kafka, RabbitMQ, pub/sub",source:"NeetCode SD · Grokking"},dsa:{patternId:"sliding-window",topic:"Sliding Window — more practice"}},{num:7,phase:"DevOps Fundamentals",title:"Kubernetes I",blockA:{task:"Multi-service deploy with Ingress, HPA, PDB, resource limits",brief:{insight:`Production K8s is not "kubectl apply deployment.yaml." It is requests so the scheduler can pack you, limits so neighbors can't crush you, HPA so you scale, and PDB so deploys don't kill your last replica.`,why:'Your on-prem K8s work plus these primitives equals a portfolio piece. Knowing the production checklist separates "deployed K8s" from "ran K8s in production."',terms:["Deployment vs StatefulSet vs DaemonSet","Service types","Ingress","HPA","PDB","requests vs limits","namespaces","resource quotas"],resource:'Kubernetes.io concepts docs (the official ones are great). "Kubernetes the Hard Way" by Kelsey Hightower.',test:["Why requests for scheduling, limits for runtime?","When does a StatefulSet beat a Deployment?","HPA vs VPA?"],doneWhen:"App reachable via Ingress, scales when load-tested, survives a kubectl drain of one node."}},blockB:{task:"Scheduler internals, etcd role, control plane flow",brief:{insight:`kubectl apply doesn't create a pod. It writes to etcd. Controller manager notices, makes a Deployment. Scheduler picks a node. Kubelet runs the container. This async chain is why "stuck in Pending" has 5 causes.`,why:'Every K8s debugging story is "where did the chain break?" Knowing the chain means knowing where to look.',terms:["Control plane","kubelet","kube-proxy","reconciliation loop","desired vs actual state","CRDs","operators"],resource:'"Kubernetes the Hard Way" (Kelsey Hightower, free on GitHub).',test:["What 4 components are involved between kubectl apply and a running pod?",'Why is K8s called "declarative"?',"What does the kubelet do that the scheduler doesn't?"]}},project:"Annotated diagram of pod lifecycle from kubectl apply to running",sd:{topicId:"databases-ii",topic:"Databases II — Sharding, replication, partitioning",source:"Grokking SD"},dsa:{patternId:"stack",topic:"Stack — the LIFO pattern"}},{num:8,phase:"DevOps Fundamentals",title:"Kubernetes II",blockA:{task:"Break your cluster deliberately and debug it",brief:{insight:"You learn K8s debugging by breaking things on purpose, predicting failure modes, then watching reality match (or not match) your prediction. The gap is your knowledge gap.",why:"Production K8s issues are inherently chaotic. Practicing on intentional failures means real failures feel familiar.",terms:["kubectl describe pod","kubectl logs --previous","CrashLoopBackOff","ImagePullBackOff","OOMKilled","kubectl events --sort-by"],resource:'K8s docs "Troubleshooting" section.',test:["Pod is Pending — what 5 things to check first?","CrashLoopBackOff — where do you look?","OOMKilled — too low limit, memory leak, or both?"],doneWhen:"Incident response writeup of 3 self-inflicted outages with root cause + fix."}},blockB:{task:"CNI, Services, Ingress controllers, NetworkPolicies",brief:{insight:"K8s networking is 5 layers: pod-to-pod (CNI), pod-to-service (kube-proxy), service-to-pod (Endpoints), external-to-service (Ingress), and the underlying node network. NetworkPolicies are firewall rules at the pod level.",why:`When you can map the actual packet path, you debug "why can't A reach B" instead of restarting random things.`,terms:["CNI","pod CIDR","ClusterIP / NodePort / LoadBalancer","Endpoints","Ingress vs Gateway API","NetworkPolicy","kube-proxy modes"],resource:'Calico "Kubernetes networking 101". learnk8s.io networking deep dive.',test:["Trace a packet from pod A in node 1 to pod B in node 2.","What does an Ingress controller actually do?","When would you reach for a NetworkPolicy?"]}},project:"Incident response writeup of a self-inflicted K8s outage",sd:{topicId:"cap-theorem",topic:"CAP Theorem & Consistency — strong vs eventual",source:"NeetCode SD · Grokking"},dsa:{patternId:"binary-search",topic:"Binary Search — the O(log n) pattern"}},{num:9,phase:"MLOps Bridge",title:"ML Fundamentals",blockA:{task:"fast.ai Lesson 1 — get a model running, no theory rabbit holes",brief:{insight:"Don't try to understand everything. Just get the training loop running and watch the numbers change. Theory clicks faster when you have a running thing to point at.",why:"Your engineering brain wants to understand the whole stack first. Fight that instinct here. Get something running, then learn why.",terms:["Dataset","DataLoader","Model","Loss function","Optimizer","Train/val split","Epoch"],resource:`fast.ai Lesson 1 video + Ch 1 of the free book. 3blue1brown's "But what IS a neural network" series.`,test:["What does the optimizer actually update?","Why do we split into train and val sets?","What does one epoch consist of?"],doneWhen:"A trained classifier with accuracy printed to console, weights saved to disk."}},blockB:{task:"What is a training loop, what does it produce, why track it",brief:{insight:"A training loop is just: forward pass (predict), compute loss (how wrong), backward pass (compute gradients), step optimizer (update weights). Repeat for batches. Track metrics. The rest is decoration.",why:'When ML demystifies into "a loop that minimizes a function," you stop being intimidated. The infra around it is normal SWE problems applied to ML.',terms:["Forward / backward pass","Gradient descent","Loss function","Optimizer (SGD, Adam)","Epoch vs batch vs step","Overfitting","Regularization"],resource:"fast.ai book Ch 1-2. 3blue1brown YouTube series.",test:["Difference between epoch and step?","Why train/val/test, not just train/val?","What does the optimizer actually do mathematically?"]}},project:"One working classifier you understand end-to-end",sd:{topicId:"url-shortener",topic:"Design URL Shortener — gateway problem",source:"Grokking SD Interview"},dsa:{patternId:"linked-list",topic:"Linked List — the pointer pattern"}},{num:10,phase:"MLOps Bridge",title:"scikit-learn + MLFlow",blockA:{task:"Train 3 models, log every run to MLFlow",brief:{insight:"sklearn is your training framework, MLFlow is your experiment tracker. Two libraries, two roles. Don't conflate them.",why:"Three models side by side, with all params and metrics logged — that's what a real ML team's workflow looks like.",terms:["sklearn Pipeline","mlflow.start_run()","log_params / log_metrics / log_artifact","Model registry"],resource:"MLFlow official quickstart. sklearn user guide on pipelines.",test:["Why log params and metrics separately?",`What goes in an "artifact" that's not a metric?`,"When does the model registry add value?"],doneWhen:"MLFlow UI shows 3 runs side-by-side with accuracy and downloadable models."}},blockB:{task:"Map MLFlow concepts to DevOps: registry=artifact store, run=build",brief:{insight:"MLFlow concepts map 1:1 to DevOps. Experiment = repo. Run = build. Params = build args. Artifacts = build outputs. Model registry = container registry.",why:"The MLOps world has invented new names for old patterns. Translating to your DevOps vocab cuts the learning curve in half.",terms:["Experiment","Run","Param","Metric","Artifact","Model registry","Model stage"],resource:"MLFlow concepts docs. Made-With-ML GitHub repo by goku-mohandas.",test:["Where does MLFlow store metrics — DB or files?","Difference between an experiment and a run?","How to promote model from Staging to Production?"]}},project:"MLFlow UI comparing 3+ runs with different hyperparameters",sd:{topicId:"pastebin",topic:"Design Pastebin — storage-heavy variant",source:"Grokking SD Interview"},dsa:{patternId:"linked-list",topic:"Linked List — more practice"}},{num:11,phase:"MLOps Bridge",title:"DVC",blockA:{task:"Add DVC to mlops-lab repo, version data in S3",brief:{insight:'DVC is Git for big files plus a pipeline runner. The "git for data" part stores tiny pointers in Git, actual data in S3. The pipeline part (dvc.yaml) makes training reproducible.',why:'A reproducible ML repo is a portfolio piece. Without DVC: "trust me, it works." With DVC: anyone clones, pulls, repros.',terms:["dvc init","dvc add",".dvc files","dvc remote","dvc.yaml","dvc repro","dvc.lock"],resource:'DVC "Get Started" tutorial. Made-With-ML repo DVC sections.',test:["Why store the .dvc pointer in Git but not the data?","What does dvc.lock track?","When dvc params vs dvc dataset versioning?"],doneWhen:"Repo is reproducible by another machine via clone + dvc pull + dvc repro."}},blockB:{task:"Why versioning data matters, DVC vs Git mental model",brief:{insight:"Git is bad at large binaries because it stores diffs forever. DVC stores tiny pointers in Git, actual data in object storage. Same UX, right tool for the data.",why:"Versioning data is half of reproducible ML. The other half is versioning code. DVC bridges them.",terms:["DVC pointer","DVC remote","CAS (content-addressable storage)","MD5 chunking","dvc.yaml stages"],resource:"DVC concepts docs. iterative.ai blog posts.",test:["What problem does CAS solve that file naming doesn't?","Why is rerunning reproducible only with dvc.lock?","When would you NOT use DVC?"]}},project:"Working dvc repro pipeline with versioned dataset",sd:{topicId:"twitter",topic:"Design Twitter — feed generation, fanout",source:"Grokking SD Interview"},dsa:{patternId:"trees",topic:"Trees — the recursive pattern"}},{num:12,phase:"MLOps Bridge",title:"Cloud-Native ML",blockA:{task:"Run one managed training job on SageMaker or Azure ML",brief:{insight:"Don't try to learn both clouds. Pick one. Run one training job. Deploy one endpoint. curl it. Done.",why:"Managed ML services are increasingly the default for production ML. Knowing one cloud's flow makes you fluent in the concepts.",terms:["Training job","Model artifact","Endpoint","Inference container","Instance type","Spot training"],resource:'AWS SageMaker workshops (sagemaker-workshop.com). Azure ML "MLOps with GitHub" tutorial.',test:["How does SageMaker know which Python script to run?","Why use a separate inference container vs training one?","When would Spot instances backfire?"],doneWhen:"curl https://your-endpoint with JSON payload returns a prediction."}},blockB:{task:"Cost vs control: managed ML vs self-hosted K8s",brief:{insight:'Managed ML services are "K8s for ML, abstracted." Speed-to-prototype but lose control. For experiments: managed wins. For high-volume serving with custom logic: self-hosted often wins.',why:"The cost/control tradeoff is the same as any cloud-vs-self-hosted decision. Knowing when each makes sense is platform engineering work.",terms:["Managed training","Managed endpoint","Instance type / family","Autoscaling endpoints","Batch vs real-time inference","Multi-model endpoints","A/B traffic split"],resource:"AWS Well-Architected ML Lens. Azure ML pricing calculator.",test:["When does SageMaker get expensive?","Batch vs real-time cost-wise?","When would you NOT use a managed service?"]}},project:"Deployed model endpoint with curl-able predictions",sd:{topicId:"youtube",topic:"Design YouTube — video storage, encoding, CDN",source:"Grokking SD Interview"},dsa:{patternId:"trees",topic:"Trees — more practice (BST, traversal)"}},{num:13,phase:"MLOps Bridge",title:"Buffer & Polish",blockA:{task:"Catch up on skipped work. Polish your mlops-lab README",brief:{insight:"A polished portfolio piece beats five unpolished ones. Spend this week making your mlops-lab repo something a stranger could clone and understand.",why:`This is the difference between "I learned MLOps" (forgettable) and "I shipped an MLOps system, here's the repo" (memorable).`,terms:["README structure","Architecture diagram (mermaid, excalidraw)","Quickstart section","Dependency pinning",".gitignore hygiene","License"],resource:"Browse top-starred MLOps repos on GitHub for README patterns. Made-With-ML's README is a good template.",test:["Does your README explain WHY, not just WHAT?","Can you reproduce your project from a fresh clone?","Is there a diagram?"],doneWhen:"A stranger could clone your repo and reproduce your work from the README alone."}},blockB:{task:"Write a 1-page summary of what you built",brief:{insight:`Writing about what you built is when you discover what you didn't understand. The "I'll explain it later" parts you skipped become visible the moment you try to put them in writing.`,why:"The skill of writing about your own work clearly separates engineers from senior engineers in interviews.",terms:["Technical writing","Narrative arc (problem → approach → result)","Audience awareness","Show don't tell"],resource:"Stripe engineering blog. Netflix tech blog. These are the gold standard.",test:["Could a non-technical recruiter understand the impact?","Could a senior engineer evaluate your skill from this?","Have you removed every adjective that doesn't earn its place?"]}},project:"Public mlops-lab repo with clean README — portfolio piece",sd:{topicId:"uber",topic:"Design Uber — geo-indexing, real-time matching",source:"Grokking SD Interview"},dsa:{patternId:"trees",topic:"Trees — Trie + Heap intro"}},{num:14,phase:"UPenn Semester",title:"UPenn Starts",blockA:{task:"[Reduced] UPenn coursework is primary. 30 min/day max on MLOps",brief:{insight:"Your job this week is to NOT collapse. Set up grad school workflow. Calendar blocks for school, work, MLOps. Pick a note-taking system and commit.",why:"First-week grad students who try to perfectly balance everything burn out by week 6. The ones who underschedule on purpose and add back what fits, thrive.",terms:["Time-blocking","Knowledge management (Obsidian, Notion)","Spaced repetition (Anki)","Strategic reading","Office hours"],resource:`Cal Newport "How to Become a Straight-A Student". Andy Matuschak's notes on spaced repetition.`,test:["Have you blocked time for school, work, AND MLOps?","Do you have at least one classmate you can DM?","Do you know who your TA is?"],doneWhen:"Weekly calendar template that's sustainable. At least one reading and one problem set started without burning out."}},blockB:{task:"Set up grad school workflow — notes, calendar blocks",brief:{insight:"Grad school is not undergrad with harder homework. The pace is faster, the abstraction higher, the support thinner. Adapt fast: skim before reading, identify the 20% that's tested, build a study group week 1.",why:"You're paying a lot for this degree. Treating it strategically isn't cynical, it's respectful of your time and money.",terms:["Skimming-first reading","Strategic reading","Study groups","Office hours","Problem-set-driven learning"],resource:'Cal Newport "Deep Work" + "Straight-A Student". Your UPenn TAs.',test:["Have you identified the 20% of material actually tested?","Joined or started a study group?","Do you have a sustainable weekly rhythm?"]}},project:"Sustainable weekly schedule for school + work + MLOps",sd:{topicId:"whatsapp",topic:"[Reduced] Design WhatsApp — websockets, delivery",source:"Grokking SD Interview"},dsa:{patternId:"graphs",topic:"Graphs intro — BFS/DFS basics"}},{num:15,phase:"UPenn Semester",title:"KubeFlow (Light)",blockA:{task:"One small KubeFlow pipeline — two steps, local cluster",brief:{insight:"KubeFlow takes the patterns you know from K8s and wraps them in ML-specific abstractions. Not magic — K8s with opinions about how ML workloads should look.",why:"Your existing K8s knowledge gives you a head start most ML folks don't have.",terms:["KubeFlow Pipelines (KFP)","Pipeline DSL","Component","Artifact","Tekton/Argo","Katib"],resource:"KubeFlow official tutorials. Arrikto blog for beginner pieces.",test:["What does KFP add over plain K8s Jobs?","Katib vs manual hyperparameter sweeps?","Why is artifact passing between steps important?"],doneWhen:"One pipeline runs end-to-end. You can see the graph in the KFP UI."}},blockB:{task:"How K8s patterns translate to ML pipelines",brief:{insight:'K8s gives you scheduling, isolation, resource limits, observability. KubeFlow says "ML workflows need these too" and adds artifact lineage on top. Same primitives, ML-shaped use case.',why:`If you can explain "KubeFlow is K8s with ML-specific lineage and DSL," you sound senior. If you can't, you sound like you read blog posts.`,terms:["Pipeline as DAG","Component","Artifact lineage","Parameter passing","Conditional execution","Loops in pipelines"],resource:"KubeFlow concepts page. Architecture docs.",test:['Why is "pipeline as code" valuable over YAML?',"How does artifact lineage help debugging?","When would you NOT use KubeFlow?"]}},project:"Working 2-step KubeFlow pipeline in mlops-lab",sd:{topicId:"dropbox",topic:"Design Dropbox — file sync, chunking, delta sync",source:"Grokking SD Interview"},dsa:{patternId:"graphs",topic:"Graphs — more patterns"}},{num:16,phase:"UPenn Semester",title:"Spark Mental Model",blockA:{task:"One 3-hour Spark intro — DataFrames only",brief:{insight:"Read a CSV with PySpark, do 3 transformations (filter, groupBy, agg), write to parquet. That's it. No clusters, no tuning, just the API and the lazy-evaluation mental model.",why:"Spark is overkill for most problems. Knowing when it's overkill (vs pandas) is more valuable than memorizing the API.",terms:["SparkSession","DataFrame","Transformations vs actions","Lazy evaluation",".show()",".explain()","Parquet"],resource:'Spark DataFrame quickstart. Holden Karau "Spark: The Definitive Guide" first chapters.',test:["What triggers actual computation in Spark?","Why does Spark output Parquet by default?","When does PySpark beat pandas?"],doneWhen:"A notebook that processes a real dataset in under 10 lines of Spark code."}},blockB:{task:"When you actually need Spark vs pandas",brief:{insight:"Spark equals lazy distributed pandas. You describe operations on a DataFrame, nothing runs until you trigger an action. The DAG gets optimized as a whole. .explain() shows what Spark plans to do.",why:'The honest answer to "when do you need Spark?" is: rarely if data fits in memory, often if not. The mental model lets you have that conversation.',terms:["SparkSession","DataFrame","RDD","Transformation vs action","Catalyst optimizer","Partition","Shuffle","Broadcast join"],resource:'Spark UI walkthrough on databricks.com. "Spark: Definitive Guide" (free PDF).',test:["When is Spark overkill?","Transformation vs action?","Why is .collect() dangerous on big data?"]}},project:"One Spark notebook processing a real dataset",sd:{topicId:"web-crawler",topic:"Design Web Crawler — distributed, politeness, dedup",source:"Grokking SD Interview"},dsa:{patternId:"dp",topic:"1-D Dynamic Programming — the memoization pattern"}},{num:17,phase:"UPenn Semester",title:"ML Monitoring",blockA:{task:"Add Evidently for data drift",brief:{insight:'Plug Evidently into a model in mlops-lab. Compute drift on synthetic "new" data. Export to JSON, ingest into Grafana.',why:"You know Prometheus and Grafana already. Adding ML-specific metrics to that stack is a way smaller jump than learning a whole new tool.",terms:["Data drift","Concept drift","PSI (Population Stability Index)","KS statistic","Grafana dashboards from JSON","Alerting rules"],resource:"Evidently AI's docs and blog. They literally wrote the book.",test:["Why JSON intermediate instead of pushing metrics directly?","What threshold for PSI alert?","When does drift detection give false positives?"],doneWhen:"Grafana shows a drift score over time that changes when you inject distribution-shifted data."}},blockB:{task:"Why model drift differs from infra monitoring",brief:{insight:"Infra monitoring catches things that are broken. ML monitoring catches things that are wrong. A model can have 100% uptime, perfect latency, and silently make worse predictions because the world changed. That's drift.",why:`This is the unique value of MLOps over DevOps. If you can explain WHY model monitoring is different, you've earned your "MLOps engineer" title.`,terms:["Data drift","Concept drift","Label drift","Prediction drift","PSI","KS statistic","Ground truth lag","Shadow deployment"],resource:'Evidently blog. "Reliable Machine Learning" book by Cathy Chen et al.',test:["Why is ground truth always delayed?","Difference between data drift and concept drift?","When would you NOT need drift monitoring?"]}},project:"Grafana dashboard with a drift metric over time",sd:{topicId:"news-feed",topic:"Design Facebook News Feed — ranking, push vs pull",source:"Grokking SD Interview"},dsa:{patternId:"dp",topic:"1-D DP — more practice"}},{num:18,phase:"UPenn Semester",title:"CML in CI/CD",blockA:{task:"GitHub Actions workflow that trains + posts metrics to PR",brief:{insight:'CML (Continuous Machine Learning) by Iterative posts model metrics as PR comments with plots. Suddenly every PR answers "did this make the model better?"',why:"This is the demo that wins interviews. Recruiters can SEE your work — they open a PR, see auto-generated metrics, instantly understand you do real MLOps.",terms:["CML GitHub Action","GITHUB_TOKEN","cml comment create","Vega plots","Self-hosted runners (GPU)"],resource:"iterative.ai's CML docs and example repos.",test:["Why use GITHUB_TOKEN vs a PAT?","How handle non-deterministic training in CI?","Cost model of training on every PR?"],doneWhen:"A PR you opened has an auto-generated comment with model metrics and a plot."}},blockB:{task:"Why ML deserves first-class CI/CD treatment",brief:{insight:`Treating models like code means every PR can answer "did this make the model better?" That's a deployment gate. It's what separates "we have a model in prod" from "we have a continuously-improving model in prod."`,why:"The promise of MLOps is fast, safe iteration. CML is one concrete way to deliver that. Also a visible portfolio piece.",terms:["Continuous training","Continuous evaluation","Model gating","Golden dataset","Shadow evaluation","Regression tests for ML"],resource:"Made-With-ML CI/CD chapter. iterative.ai blog on MLOps maturity.",test:["What metric would you regression-test on every PR?","How handle non-deterministic training in CI?","When does CML get expensive?"]}},project:"PR with auto-generated model performance comment",sd:{topicId:"recommendation",topic:"ML SD — Recommendation System",source:"Grokking ML SD Interview"},dsa:{patternId:"dp",topic:"2-D Dynamic Programming intro"}},{num:19,phase:"UPenn Semester",title:"Explainable AI",blockA:{task:"Add SHAP to your model, generate summary plots",brief:{insight:"SHAP tells you which features drove each prediction. Summary plot = global view. Force plot = local view (why this specific prediction).",why:"When your model is wrong, SHAP often tells you which feature betrayed you. Debugging superpower more than regulatory checkbox.",terms:["SHAP values","Summary plot","Force plot","LIME (alternative)","Feature importance vs attribution","TreeExplainer"],resource:'SHAP official docs (slundberg/shap). Christoph Molnar "Interpretable ML" book (free online).',test:['Why are SHAP values "fair" mathematically?',"When does global feature importance mislead you?","How embed a SHAP plot in a PR comment?"],doneWhen:"PR comment shows model performance AND a SHAP plot explaining feature drivers."}},blockB:{task:"When explainability is required vs nice-to-have",brief:{insight:"Explainability isn't optional in regulated domains (finance, healthcare, hiring, defense). Even where optional, it's a debugging superpower. SHAP, LIME, integrated gradients are the three big techniques.",why:'"Explainable AI" is a buzzword. Knowing the actual techniques is the substance. Especially relevant for defense — DoD increasingly requires it.',terms:["SHAP","LIME","Integrated gradients","Feature importance (global) vs attribution (local)","Counterfactual explanations","Model cards"],resource:`Christoph Molnar "Interpretable Machine Learning". Google's Model Cards paper.`,test:["When is global feature importance misleading?",'Why are SHAP values mathematically "fair"?',"What's a model card?"]}},project:"PR comment with SHAP plot via CML",sd:{topicId:"search-ranking",topic:"ML SD — Search Ranking, embeddings",source:"Grokking ML SD Interview"},dsa:{patternId:"dp",topic:"2-D DP — more practice"}},{num:20,phase:"UPenn Semester",title:"Capstone Polish",blockA:{task:"Tie mlops-lab into one story: data → model → serve → monitor → explain",brief:{insight:"Your mlops-lab should tell ONE story: dataset → versioning → training → registry → serving → monitoring → explainability. README walks a stranger through it.",why:`Time to compound. This week is the difference between "I studied MLOps" (forgettable) and "I shipped an MLOps system, here's the proof" (memorable).`,terms:["Narrative architecture","End-to-end demo","Video walkthrough (Loom)","Deployable demo","GitHub Pages for project sites"],resource:"How Stripe, Airbnb, Netflix engineering blogs structure project writeups.",test:["Can you demo the full pipeline in 5 minutes?","Does a 2-min video walkthrough exist?","Is the LinkedIn post drafted?"],doneWhen:"You can demo the full pipeline in 5 minutes. LinkedIn post published with link."}},blockB:{task:"Write portfolio narrative + LinkedIn post",brief:{insight:`The portfolio piece you ship in week 20 IS your value proposition to platform engineering hiring managers. It says: "I understand DevOps, MLOps, and how they connect." That's a rare profile.`,why:"Three-year career capital compounds from here. Portfolio + UPenn + clearance + DevSecOps + MLOps is rare enough to command $250K+ offers in 2027-2028.",terms:["Hiring signal","Recruiter-friendly summary","Public demo","Storytelling for engineers","LinkedIn as portfolio"],resource:"Stripe engineering blog. Airbnb tech blog. Read 5 posts, notice the structure, copy it.",test:["Can a non-technical recruiter understand what you built?","Can a senior engineer evaluate your skill?","Have you posted it?"]}},project:"Portfolio-ready mlops-lab + LinkedIn writeup published",sd:{topicId:"mock-week",topic:"Mock interview week — 3 problems under 45-min timer",source:"Self-directed · RESHADED framework"},dsa:{patternId:"review",topic:"Review weak patterns + mock LeetCode session"}}],ue="runway:v2:progress",he="runway:v2:sync",me="runway:v2:ai",i={progress:{},activeTab:"today",selectedWeek:1,selectedLesson:null,expandedBriefs:new Set,showSettings:!1,showAI:!1,aiContext:null,syncConfig:{url:"",email:"",password:"",enabled:!1},syncStatus:"offline",aiConfig:{apiKey:"",enabled:!1}};let _=[];function $e(e){return _.push(e),()=>{_=_.filter(t=>t!==e)}}function S(){_.forEach(e=>e())}function Pe(){try{const e=localStorage.getItem(ue);e&&(i.progress=JSON.parse(e).progress||{})}catch(e){console.error("load progress",e)}try{const e=localStorage.getItem(he);e&&Object.assign(i.syncConfig,JSON.parse(e))}catch(e){console.error("load sync",e)}try{const e=localStorage.getItem(me);e&&Object.assign(i.aiConfig,JSON.parse(e))}catch(e){console.error("load ai",e)}i.selectedWeek=ee()}function ie(){try{localStorage.setItem(ue,JSON.stringify({version:2,progress:i.progress,savedAt:new Date().toISOString()}))}catch(e){console.error("save progress",e)}}function ge(){try{localStorage.setItem(he,JSON.stringify(i.syncConfig))}catch(e){console.error("save sync",e)}}function ye(){try{localStorage.setItem(me,JSON.stringify(i.aiConfig))}catch(e){console.error("save ai",e)}}function De(e,t){i.progress[e]=t,ie(),Me(),S()}function T(e){return!!i.progress[e]}function q(e){De(e,!i.progress[e])}function re(e,t){const s=new Date(e.getFullYear(),e.getMonth(),e.getDate()),o=new Date(t.getFullYear(),t.getMonth(),t.getDate());return Math.floor((o-s)/864e5)}function ee(){const e=re(X,new Date);return Math.max(1,Math.min(20,Math.floor(e/7)+1))}function be(){return(re(X,new Date)%7+7)%7}function Ae(e){const t=new Date(X);return t.setDate(t.getDate()+(e-1)*7),t}function ae(){let e=0,t=0,s=0,o=0,r=0;for(let a=1;a<=20;a++){for(let h=0;h<7;h++)e+=2,i.progress[`w${a}_d${h}_a`]&&t++,i.progress[`w${a}_d${h}_b`]&&t++;i.progress[`w${a}_project`]&&s++,i.progress[`w${a}_sd`]&&o++,i.progress[`w${a}_dsa`]&&r++}const l=new Date;let g=0;for(let a=0;a<140;a++){const h=new Date(l);h.setDate(l.getDate()-a);const d=re(X,h);if(d<0)break;const u=Math.floor(d/7)+1,v=d%7;if(!(u<1||u>20))if(i.progress[`w${u}_d${v}_a`]||i.progress[`w${u}_d${v}_b`])g++;else break}let p=0;return Object.keys(i.progress).forEach(a=>{a.startsWith("dsa_")&&i.progress[a]&&p++}),{totalBlocks:e,doneBlocks:t,projects:s,sds:o,dsas:r,dsaProbs:p,streak:g,pct:e?Math.round(t/e*100):0}}const A={token:null,userId:null,recordId:null};let oe=null;async function fe(){const e=await fetch(`${i.syncConfig.url}/api/collections/users/auth-with-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({identity:i.syncConfig.email,password:i.syncConfig.password})});if(!e.ok)throw new Error("Auth failed: "+e.status);const t=await e.json();A.token=t.token,A.userId=t.record.id}async function we(){const e=`${i.syncConfig.url}/api/collections/state/records?filter=(user='${A.userId}')&perPage=1`,t=await fetch(e,{headers:{Authorization:A.token}});if(!t.ok)throw new Error("Fetch failed: "+t.status);return(await t.json()).items[0]||null}async function Ie(){const e=JSON.stringify({user:A.userId,data:i.progress}),t={"Content-Type":"application/json",Authorization:A.token};let s;if(A.recordId?s=await fetch(`${i.syncConfig.url}/api/collections/state/records/${A.recordId}`,{method:"PATCH",headers:t,body:e}):s=await fetch(`${i.syncConfig.url}/api/collections/state/records`,{method:"POST",headers:t,body:e}),!s.ok)throw new Error("Save failed: "+s.status);const o=await s.json();A.recordId=o.id}async function K(){if(!(!i.syncConfig.enabled||!i.syncConfig.url))try{i.syncStatus="syncing",S(),A.token||await fe();const e=await we();e&&(A.recordId=e.id,i.progress=e.data||{},ie()),i.syncStatus="synced",S()}catch(e){console.error("pull",e),i.syncStatus="error",S()}}async function ve(){if(!(!i.syncConfig.enabled||!i.syncConfig.url))try{if(i.syncStatus="syncing",S(),A.token||await fe(),!A.recordId){const e=await we();e&&(A.recordId=e.id)}await Ie(),i.syncStatus="synced",S()}catch(e){console.error("push",e),i.syncStatus="error",S()}}function Me(){i.syncConfig.enabled&&(oe&&clearTimeout(oe),oe=setTimeout(ve,800))}setInterval(()=>{i.syncConfig.enabled&&i.syncStatus!=="syncing"&&K()},45e3);window.addEventListener("focus",()=>{i.syncConfig.enabled&&i.syncStatus!=="syncing"&&K()});const Le="claude-sonnet-4-5-20250929";async function ke(e,t=null){if(!i.aiConfig.apiKey)throw new Error("No API key configured. Open settings.");const s={model:Le,max_tokens:1024,messages:[{role:"user",content:e}]};t&&(s.system=t);const o=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":i.aiConfig.apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true","Content-Type":"application/json"},body:JSON.stringify(s)});if(!o.ok){const l=await o.text();throw new Error(`AI error ${o.status}: ${l.substring(0,200)}`)}return(await o.json()).content.filter(l=>l.type==="text").map(l=>l.text).join(`
`)}function Re(){const e=new Blob([JSON.stringify({progress:i.progress,exportedAt:new Date().toISOString()},null,2)],{type:"application/json"}),t=URL.createObjectURL(e),s=document.createElement("a");s.href=t,s.download=`runway-backup-${new Date().toISOString().split("T")[0]}.json`,s.click(),URL.revokeObjectURL(t)}function Be(){confirm("Reset ALL progress? This cannot be undone.")&&(i.progress={},ie(),S())}const D=e=>String(e||"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),ne=e=>["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][e];function Fe(e){const t=Z.map(o=>{const l=Array.from({length:7}).reduce((d,u,v)=>d+(T(`w${o.num}_d${v}_a`)?1:0)+(T(`w${o.num}_d${v}_b`)?1:0),0)/14,g=o.num<e,p=o.num===e,a=Q[o.phase];let h="var(--border-subtle)";return p?h=a.color:g?h=l>.5?a.color+"cc":a.color+"55":h=a.color+"22",`<button class="journey-tick ${p?"current":""}" data-action="set-tab-week" data-week="${o.num}" title="Week ${o.num}: ${D(o.title)}" style="background: ${h}; ${p?"box-shadow: 0 0 0 2px var(--accent-amber), 0 0 12px "+a.color+"99;":""}"></button>`}).join(""),s=Math.round(e/20*100);return`
    <div class="journey-strip">
      <div class="journey-strip-head">
        <span class="mono" style="font-size: 10px; color: var(--text-tertiary); letter-spacing: 0.15em; text-transform: uppercase;">The Runway</span>
        <span class="mono" style="font-size: 10px; color: var(--text-tertiary);">Week ${e} / 20 · ${s}%</span>
      </div>
      <div class="journey-ticks">${t}</div>
    </div>
  `}function le(){const e=ee(),t=be(),s=Z[e-1];if(!s)return'<div class="view"><div class="empty">Plan starts May 21, 2026.</div></div>';const o=Q[s.phase],r=T(`w${e}_d${t}_a`),l=T(`w${e}_d${t}_b`),g=T(`w${e}_project`),p=T(`w${e}_sd`),a=T(`w${e}_dsa`),h=new Date,d=ae();let u=null;return r?l?p?a?g||(u={label:"Project",text:s.project,kind:"project"}):u={label:"DSA Pattern",text:s.dsa.topic,kind:"dsa",action:`data-action="open-dsa" data-id="${s.dsa.patternId}"`}:u={label:"System Design",text:s.sd.topic,kind:"sd",action:`data-action="open-sd" data-id="${s.sd.topicId}"`}:u={label:"Block B · Understand",text:s.blockB.task,kind:"block-b"}:u={label:"Block A · Build",text:s.blockA.task,kind:"block-a"},`
    <div class="view stagger">
      <div class="today-hero">
        <div class="today-date">${h.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}).toUpperCase()}</div>
        <h1 class="today-day">${ne(t)}<span class="dot">.</span></h1>
        <div class="today-week-meta">
          <span class="chip chip-track-${o.code}">${s.phase}</span>
          <span class="chip">Week ${e} of 20</span>
          ${d.streak>0?`<span class="chip" style="background: var(--accent-amber)22; color: var(--accent-amber); border-color: var(--accent-amber)44;">🔥 ${d.streak}d streak</span>`:""}
        </div>
      </div>

      ${Fe(e)}

      ${u?`
        <section class="feed-section">
          <div class="kicker" style="margin-bottom: 12px;">Next Up</div>
          <div class="next-up-card" ${u.action||""}>
            <div class="next-up-glow"></div>
            <div class="next-up-label mono">${u.label}</div>
            <div class="next-up-text">${D(u.text)}</div>
          </div>
        </section>
      `:`
        <section class="feed-section">
          <div class="kicker" style="margin-bottom: 12px;">Today</div>
          <div class="card" style="text-align: center; padding: 32px;">
            <div style="font-size: 32px; margin-bottom: 8px;">🎯</div>
            <div class="h4" style="margin-bottom: 4px;">All ${ne(t)} targets done.</div>
            <div class="caption">Nothing left to tap today. Rest counts too.</div>
          </div>
        </section>
      `}

      <section class="feed-section">
        <div class="kicker" style="margin-bottom: 12px;">Today's Focus · 2 blocks</div>
        ${ce("a",e,t,s.blockA,r)}
        ${ce("b",e,t,s.blockB,l)}
      </section>

      <section class="feed-section">
        <div class="kicker" style="margin-bottom: 12px;">This Week's Tracks</div>

        <div class="track-card sd ${p?"done":""}" data-action="open-sd" data-id="${s.sd.topicId}" style="cursor: pointer;">
          <div class="row between gap-3" style="margin-bottom: 8px;">
            <span class="chip chip-track-sd">◇ System Design</span>
            <button class="check-circle ${p?"done":""}" data-action="toggle-sd" data-week="${e}" onclick="event.stopPropagation();">${p?"✓":""}</button>
          </div>
          <div class="h4" style="margin-bottom: 4px;">${D(s.sd.topic)}</div>
          <div class="caption">${D(s.sd.source)} · 2–3 sessions of ~30 min · Tap to open lesson →</div>
        </div>

        <div class="track-card dsa ${a?"done":""}" data-action="open-dsa" data-id="${s.dsa.patternId}" style="cursor: pointer;">
          <div class="row between gap-3" style="margin-bottom: 8px;">
            <span class="chip chip-track-dsa">⌘ DSA Pattern</span>
            <button class="check-circle ${a?"done":""}" data-action="toggle-dsa" data-week="${e}" onclick="event.stopPropagation();">${a?"✓":""}</button>
          </div>
          <div class="h4" style="margin-bottom: 4px;">${D(s.dsa.topic)}</div>
          <div class="caption">NeetCode 150 pattern · 3–5 problems this week · Tap to open lesson →</div>
        </div>
      </section>

      <section class="feed-section">
        <div class="kicker" style="margin-bottom: 12px;">Week ${e} Mini-Project</div>
        <div class="card tappable ${g?"done":""}" data-action="toggle-project" data-week="${e}">
          <div class="row gap-3">
            <span class="check-circle ${g?"done":""}">${g?"✓":""}</span>
            <span class="body">${D(s.project)}</span>
          </div>
        </div>
      </section>

      <div class="caption" style="text-align: center; font-style: italic; margin-top: 24px;">
        Either daily block counts toward your streak. The goal is momentum.
      </div>
    </div>
  `}function ce(e,t,s,o,r){const l=e==="a",g=`today-${e}-${t}`,p=i.expandedBriefs.has(g);return`
    <div class="block-card ${e}-block ${r?"done":""}">
      <div class="block-card-header" data-action="toggle-block" data-week="${t}" data-day="${s}" data-kind="${e}" style="cursor:pointer;">
        <span class="block-card-tag">Block ${e.toUpperCase()} · ${l?"Build":"Understand"}</span>
        <span class="check-circle ${r?"done":""}">${r?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>':""}</span>
      </div>
      <div class="block-card-task" data-action="toggle-block" data-week="${t}" data-day="${s}" data-kind="${e}" style="cursor:pointer;">${D(o.task)}</div>
      <div class="block-card-time">${l?"45 min · hands-on":"30 min · conceptual"}</div>

      <button class="learn-toggle ${p?"open":""}" data-action="toggle-brief" data-brief="${g}">
        <span class="arrow">›</span>
        <span>${p?"Hide":"Learn"} the concept</span>
      </button>
      <div class="brief ${l?"":"b"} ${p?"open":""}">
        ${Oe(o.brief)}
      </div>
    </div>
  `}function Oe(e,t){const s=(e.terms||[]).map(l=>`<span class="chip">${D(l)}</span>`).join(""),o=(e.test||[]).map(l=>`<li>${D(l)}</li>`).join(""),r=e.doneWhen?`
    <div class="brief-section">
      <div class="brief-label">Done When</div>
      <div class="brief-done">${D(e.doneWhen)}</div>
    </div>`:"";return`
    <div class="brief-section">
      <div class="brief-label">Core Insight</div>
      <div class="brief-text">${D(e.insight)}</div>
    </div>
    <div class="brief-section">
      <div class="brief-label">Why This Matters</div>
      <div class="brief-why">${D(e.why)}</div>
    </div>
    <div class="brief-section">
      <div class="brief-label">Key Terms</div>
      <div class="brief-terms">${s}</div>
    </div>
    <div class="brief-section">
      <div class="brief-label">Best Resource</div>
      <div class="brief-resource">${D(e.resource)}</div>
    </div>
    <div class="brief-section">
      <div class="brief-label">Self-Test</div>
      <ul class="brief-tests">${o}</ul>
    </div>
    ${r}
    ${i.aiConfig.enabled?`
      <button class="btn" style="margin-top: 12px;" data-action="ask-ai" data-context="${D(e.insight.substring(0,200))}">
        Ask Claude about this →
      </button>
    `:""}
  `}const se=[{id:"arrays-hashing",title:"Arrays & Hashing",blurb:"The foundation. Hash maps for O(1) lookups, arrays for ordered data. If you can't solve these fast, nothing else compiles.",color:"#F5B842",lessonId:"arrays-hashing",problems:[{id:"contains-duplicate",title:"Contains Duplicate",difficulty:"Easy",url:"https://leetcode.com/problems/contains-duplicate/"},{id:"valid-anagram",title:"Valid Anagram",difficulty:"Easy",url:"https://leetcode.com/problems/valid-anagram/"},{id:"two-sum",title:"Two Sum",difficulty:"Easy",url:"https://leetcode.com/problems/two-sum/"},{id:"group-anagrams",title:"Group Anagrams",difficulty:"Medium",url:"https://leetcode.com/problems/group-anagrams/"},{id:"top-k-frequent",title:"Top K Frequent Elements",difficulty:"Medium",url:"https://leetcode.com/problems/top-k-frequent-elements/"},{id:"product-except-self",title:"Product of Array Except Self",difficulty:"Medium",url:"https://leetcode.com/problems/product-of-array-except-self/"},{id:"valid-sudoku",title:"Valid Sudoku",difficulty:"Medium",url:"https://leetcode.com/problems/valid-sudoku/"},{id:"encode-decode-strings",title:"Encode and Decode Strings",difficulty:"Medium",url:"https://leetcode.com/problems/encode-and-decode-strings/"},{id:"longest-consecutive",title:"Longest Consecutive Sequence",difficulty:"Medium",url:"https://leetcode.com/problems/longest-consecutive-sequence/"}]},{id:"two-pointers",title:"Two Pointers",blurb:"Two indices walking through an array, often from opposite ends. Trades brute-force O(n²) for elegant O(n).",color:"#E07856",lessonId:"two-pointers",problems:[{id:"valid-palindrome",title:"Valid Palindrome",difficulty:"Easy",url:"https://leetcode.com/problems/valid-palindrome/"},{id:"two-sum-ii",title:"Two Sum II - Sorted Input",difficulty:"Medium",url:"https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/"},{id:"3sum",title:"3Sum",difficulty:"Medium",url:"https://leetcode.com/problems/3sum/"},{id:"container-most-water",title:"Container With Most Water",difficulty:"Medium",url:"https://leetcode.com/problems/container-with-most-water/"},{id:"trapping-rain-water",title:"Trapping Rain Water",difficulty:"Hard",url:"https://leetcode.com/problems/trapping-rain-water/"}]},{id:"sliding-window",title:"Sliding Window",blurb:'A window of indices that grows and shrinks as you traverse. Optimization for "find the best subarray/substring" problems.',color:"#8FA876",lessonId:"sliding-window",problems:[{id:"best-time-buy-sell",title:"Best Time to Buy and Sell Stock",difficulty:"Easy",url:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"},{id:"longest-substring-no-repeat",title:"Longest Substring Without Repeating",difficulty:"Medium",url:"https://leetcode.com/problems/longest-substring-without-repeating-characters/"},{id:"longest-repeat-replacement",title:"Longest Repeating Character Replacement",difficulty:"Medium",url:"https://leetcode.com/problems/longest-repeating-character-replacement/"},{id:"permutation-in-string",title:"Permutation in String",difficulty:"Medium",url:"https://leetcode.com/problems/permutation-in-string/"},{id:"min-window-substring",title:"Minimum Window Substring",difficulty:"Hard",url:"https://leetcode.com/problems/minimum-window-substring/"},{id:"sliding-window-max",title:"Sliding Window Maximum",difficulty:"Hard",url:"https://leetcode.com/problems/sliding-window-maximum/"}]},{id:"stack",title:"Stack",blurb:'LIFO data structure. The "I need to remember things in reverse order" pattern. Parentheses, expressions, monotonic stacks.',color:"#7B9FB5",lessonId:"stack",problems:[{id:"valid-parentheses",title:"Valid Parentheses",difficulty:"Easy",url:"https://leetcode.com/problems/valid-parentheses/"},{id:"min-stack",title:"Min Stack",difficulty:"Medium",url:"https://leetcode.com/problems/min-stack/"},{id:"eval-reverse-polish",title:"Evaluate Reverse Polish Notation",difficulty:"Medium",url:"https://leetcode.com/problems/evaluate-reverse-polish-notation/"},{id:"generate-parentheses",title:"Generate Parentheses",difficulty:"Medium",url:"https://leetcode.com/problems/generate-parentheses/"},{id:"daily-temperatures",title:"Daily Temperatures",difficulty:"Medium",url:"https://leetcode.com/problems/daily-temperatures/"},{id:"car-fleet",title:"Car Fleet",difficulty:"Medium",url:"https://leetcode.com/problems/car-fleet/"},{id:"largest-rectangle-histo",title:"Largest Rectangle in Histogram",difficulty:"Hard",url:"https://leetcode.com/problems/largest-rectangle-in-histogram/"}]},{id:"binary-search",title:"Binary Search",blurb:"Divide the search space in half each step. O(log n). Works on sorted data — and on monotonic answer spaces.",color:"#B888C0",lessonId:"binary-search",problems:[{id:"binary-search",title:"Binary Search",difficulty:"Easy",url:"https://leetcode.com/problems/binary-search/"},{id:"search-2d-matrix",title:"Search a 2D Matrix",difficulty:"Medium",url:"https://leetcode.com/problems/search-a-2d-matrix/"},{id:"koko-eating-bananas",title:"Koko Eating Bananas",difficulty:"Medium",url:"https://leetcode.com/problems/koko-eating-bananas/"},{id:"find-min-rotated",title:"Find Min in Rotated Sorted Array",difficulty:"Medium",url:"https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"},{id:"search-rotated-array",title:"Search in Rotated Sorted Array",difficulty:"Medium",url:"https://leetcode.com/problems/search-in-rotated-sorted-array/"},{id:"time-based-kv-store",title:"Time Based Key-Value Store",difficulty:"Medium",url:"https://leetcode.com/problems/time-based-key-value-store/"},{id:"median-two-sorted",title:"Median of Two Sorted Arrays",difficulty:"Hard",url:"https://leetcode.com/problems/median-of-two-sorted-arrays/"}]},{id:"linked-list",title:"Linked List",blurb:"Nodes connected by pointers. The data structure that teaches you to think in references. Fast/slow pointers, reversal, cycle detection.",color:"#F5B842",lessonId:"linked-list",problems:[{id:"reverse-linked-list",title:"Reverse Linked List",difficulty:"Easy",url:"https://leetcode.com/problems/reverse-linked-list/"},{id:"merge-two-sorted-lists",title:"Merge Two Sorted Lists",difficulty:"Easy",url:"https://leetcode.com/problems/merge-two-sorted-lists/"},{id:"reorder-list",title:"Reorder List",difficulty:"Medium",url:"https://leetcode.com/problems/reorder-list/"},{id:"remove-nth-from-end",title:"Remove Nth Node From End",difficulty:"Medium",url:"https://leetcode.com/problems/remove-nth-node-from-end-of-list/"},{id:"copy-list-random-pointer",title:"Copy List with Random Pointer",difficulty:"Medium",url:"https://leetcode.com/problems/copy-list-with-random-pointer/"},{id:"add-two-numbers",title:"Add Two Numbers",difficulty:"Medium",url:"https://leetcode.com/problems/add-two-numbers/"},{id:"linked-list-cycle",title:"Linked List Cycle",difficulty:"Easy",url:"https://leetcode.com/problems/linked-list-cycle/"},{id:"find-duplicate-number",title:"Find the Duplicate Number",difficulty:"Medium",url:"https://leetcode.com/problems/find-the-duplicate-number/"},{id:"lru-cache",title:"LRU Cache",difficulty:"Medium",url:"https://leetcode.com/problems/lru-cache/"},{id:"merge-k-sorted-lists",title:"Merge K Sorted Lists",difficulty:"Hard",url:"https://leetcode.com/problems/merge-k-sorted-lists/"},{id:"reverse-nodes-k-group",title:"Reverse Nodes in K-Group",difficulty:"Hard",url:"https://leetcode.com/problems/reverse-nodes-in-k-group/"}]},{id:"trees",title:"Trees",blurb:'Recursive structures. Most tree problems are "do thing for root, recurse on children, combine." BFS for level-order, DFS for path-based.',color:"#8FA876",lessonId:"trees",problems:[{id:"invert-tree",title:"Invert Binary Tree",difficulty:"Easy",url:"https://leetcode.com/problems/invert-binary-tree/"},{id:"max-depth-binary-tree",title:"Maximum Depth of Binary Tree",difficulty:"Easy",url:"https://leetcode.com/problems/maximum-depth-of-binary-tree/"},{id:"diameter-binary-tree",title:"Diameter of Binary Tree",difficulty:"Easy",url:"https://leetcode.com/problems/diameter-of-binary-tree/"},{id:"balanced-binary-tree",title:"Balanced Binary Tree",difficulty:"Easy",url:"https://leetcode.com/problems/balanced-binary-tree/"},{id:"same-tree",title:"Same Tree",difficulty:"Easy",url:"https://leetcode.com/problems/same-tree/"},{id:"subtree-of-another-tree",title:"Subtree of Another Tree",difficulty:"Easy",url:"https://leetcode.com/problems/subtree-of-another-tree/"},{id:"lca-bst",title:"Lowest Common Ancestor of BST",difficulty:"Medium",url:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"},{id:"level-order-traversal",title:"Binary Tree Level Order Traversal",difficulty:"Medium",url:"https://leetcode.com/problems/binary-tree-level-order-traversal/"},{id:"right-side-view",title:"Binary Tree Right Side View",difficulty:"Medium",url:"https://leetcode.com/problems/binary-tree-right-side-view/"},{id:"good-nodes",title:"Count Good Nodes in Binary Tree",difficulty:"Medium",url:"https://leetcode.com/problems/count-good-nodes-in-binary-tree/"},{id:"validate-bst",title:"Validate Binary Search Tree",difficulty:"Medium",url:"https://leetcode.com/problems/validate-binary-search-tree/"},{id:"kth-smallest-bst",title:"Kth Smallest Element in BST",difficulty:"Medium",url:"https://leetcode.com/problems/kth-smallest-element-in-a-bst/"},{id:"build-tree-from-preorder",title:"Construct Tree from Preorder/Inorder",difficulty:"Medium",url:"https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/"},{id:"binary-tree-max-path-sum",title:"Binary Tree Max Path Sum",difficulty:"Hard",url:"https://leetcode.com/problems/binary-tree-maximum-path-sum/"},{id:"serialize-deserialize-tree",title:"Serialize/Deserialize Binary Tree",difficulty:"Hard",url:"https://leetcode.com/problems/serialize-and-deserialize-binary-tree/"}]},{id:"tries",title:"Tries",blurb:`Prefix trees. The data structure that makes "search by prefix" O(L) where L is prefix length. Autocomplete's secret.`,color:"#7B9FB5",lessonId:"tries",problems:[{id:"implement-trie",title:"Implement Trie (Prefix Tree)",difficulty:"Medium",url:"https://leetcode.com/problems/implement-trie-prefix-tree/"},{id:"design-add-search-words",title:"Design Add and Search Words",difficulty:"Medium",url:"https://leetcode.com/problems/design-add-and-search-words-data-structure/"},{id:"word-search-ii",title:"Word Search II",difficulty:"Hard",url:"https://leetcode.com/problems/word-search-ii/"}]},{id:"heap",title:"Heap / Priority Queue",blurb:`A tree-based structure where the root is always the min (or max). O(log n) insert and extract. Use it whenever "what's the top/bottom K" comes up.`,color:"#B888C0",lessonId:"heap",problems:[{id:"kth-largest-stream",title:"Kth Largest Element in Stream",difficulty:"Easy",url:"https://leetcode.com/problems/kth-largest-element-in-a-stream/"},{id:"last-stone-weight",title:"Last Stone Weight",difficulty:"Easy",url:"https://leetcode.com/problems/last-stone-weight/"},{id:"k-closest-points-origin",title:"K Closest Points to Origin",difficulty:"Medium",url:"https://leetcode.com/problems/k-closest-points-to-origin/"},{id:"kth-largest-array",title:"Kth Largest Element in Array",difficulty:"Medium",url:"https://leetcode.com/problems/kth-largest-element-in-an-array/"},{id:"task-scheduler",title:"Task Scheduler",difficulty:"Medium",url:"https://leetcode.com/problems/task-scheduler/"},{id:"design-twitter",title:"Design Twitter",difficulty:"Medium",url:"https://leetcode.com/problems/design-twitter/"},{id:"find-median-stream",title:"Find Median from Data Stream",difficulty:"Hard",url:"https://leetcode.com/problems/find-median-from-data-stream/"}]},{id:"backtracking",title:"Backtracking",blurb:"Try a choice, recurse, undo the choice. The brute-force-with-pruning pattern. Permutations, combinations, subsets.",color:"#E07856",lessonId:"backtracking",problems:[{id:"subsets",title:"Subsets",difficulty:"Medium",url:"https://leetcode.com/problems/subsets/"},{id:"combination-sum",title:"Combination Sum",difficulty:"Medium",url:"https://leetcode.com/problems/combination-sum/"},{id:"permutations",title:"Permutations",difficulty:"Medium",url:"https://leetcode.com/problems/permutations/"},{id:"subsets-ii",title:"Subsets II",difficulty:"Medium",url:"https://leetcode.com/problems/subsets-ii/"},{id:"combination-sum-ii",title:"Combination Sum II",difficulty:"Medium",url:"https://leetcode.com/problems/combination-sum-ii/"},{id:"word-search",title:"Word Search",difficulty:"Medium",url:"https://leetcode.com/problems/word-search/"},{id:"palindrome-partitioning",title:"Palindrome Partitioning",difficulty:"Medium",url:"https://leetcode.com/problems/palindrome-partitioning/"},{id:"letter-combos-phone",title:"Letter Combinations of Phone Number",difficulty:"Medium",url:"https://leetcode.com/problems/letter-combinations-of-a-phone-number/"},{id:"n-queens",title:"N-Queens",difficulty:"Hard",url:"https://leetcode.com/problems/n-queens/"}]},{id:"graphs",title:"Graphs",blurb:"Nodes connected by edges. The most flexible data structure. BFS for shortest paths, DFS for connectivity, Union-Find for groups.",color:"#8FA876",lessonId:"graphs",problems:[{id:"number-of-islands",title:"Number of Islands",difficulty:"Medium",url:"https://leetcode.com/problems/number-of-islands/"},{id:"clone-graph",title:"Clone Graph",difficulty:"Medium",url:"https://leetcode.com/problems/clone-graph/"},{id:"max-area-of-island",title:"Max Area of Island",difficulty:"Medium",url:"https://leetcode.com/problems/max-area-of-island/"},{id:"pacific-atlantic-flow",title:"Pacific Atlantic Water Flow",difficulty:"Medium",url:"https://leetcode.com/problems/pacific-atlantic-water-flow/"},{id:"surrounded-regions",title:"Surrounded Regions",difficulty:"Medium",url:"https://leetcode.com/problems/surrounded-regions/"},{id:"rotting-oranges",title:"Rotting Oranges",difficulty:"Medium",url:"https://leetcode.com/problems/rotting-oranges/"},{id:"walls-and-gates",title:"Walls and Gates",difficulty:"Medium",url:"https://leetcode.com/problems/walls-and-gates/"},{id:"course-schedule",title:"Course Schedule",difficulty:"Medium",url:"https://leetcode.com/problems/course-schedule/"},{id:"course-schedule-ii",title:"Course Schedule II",difficulty:"Medium",url:"https://leetcode.com/problems/course-schedule-ii/"},{id:"redundant-connection",title:"Redundant Connection",difficulty:"Medium",url:"https://leetcode.com/problems/redundant-connection/"},{id:"word-ladder",title:"Word Ladder",difficulty:"Hard",url:"https://leetcode.com/problems/word-ladder/"},{id:"count-components",title:"Number of Connected Components",difficulty:"Medium",url:"https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/"},{id:"graph-valid-tree",title:"Graph Valid Tree",difficulty:"Medium",url:"https://leetcode.com/problems/graph-valid-tree/"}]},{id:"advanced-graphs",title:"Advanced Graphs",blurb:"Weighted graphs, shortest paths, MSTs. Dijkstra, Bellman-Ford, Prim, Kruskal. Less common in interviews but appears at FAANG.",color:"#B888C0",lessonId:"advanced-graphs",problems:[{id:"reconstruct-itinerary",title:"Reconstruct Itinerary",difficulty:"Hard",url:"https://leetcode.com/problems/reconstruct-itinerary/"},{id:"min-cost-connect-points",title:"Min Cost to Connect All Points",difficulty:"Medium",url:"https://leetcode.com/problems/min-cost-to-connect-all-points/"},{id:"network-delay-time",title:"Network Delay Time",difficulty:"Medium",url:"https://leetcode.com/problems/network-delay-time/"},{id:"swim-in-rising-water",title:"Swim in Rising Water",difficulty:"Hard",url:"https://leetcode.com/problems/swim-in-rising-water/"},{id:"alien-dictionary",title:"Alien Dictionary",difficulty:"Hard",url:"https://leetcode.com/problems/alien-dictionary/"},{id:"cheapest-flights-k-stops",title:"Cheapest Flights Within K Stops",difficulty:"Medium",url:"https://leetcode.com/problems/cheapest-flights-within-k-stops/"}]},{id:"1d-dp",title:"1-D Dynamic Programming",blurb:'Break a problem into overlapping subproblems and memoize. "If I knew the answer for n-1, could I get the answer for n?" Climbing stairs, coin change, LIS.',color:"#F5B842",lessonId:"1d-dp",problems:[{id:"climbing-stairs",title:"Climbing Stairs",difficulty:"Easy",url:"https://leetcode.com/problems/climbing-stairs/"},{id:"min-cost-climbing-stairs",title:"Min Cost Climbing Stairs",difficulty:"Easy",url:"https://leetcode.com/problems/min-cost-climbing-stairs/"},{id:"house-robber",title:"House Robber",difficulty:"Medium",url:"https://leetcode.com/problems/house-robber/"},{id:"house-robber-ii",title:"House Robber II",difficulty:"Medium",url:"https://leetcode.com/problems/house-robber-ii/"},{id:"longest-palindromic-substr",title:"Longest Palindromic Substring",difficulty:"Medium",url:"https://leetcode.com/problems/longest-palindromic-substring/"},{id:"palindromic-substrings",title:"Palindromic Substrings",difficulty:"Medium",url:"https://leetcode.com/problems/palindromic-substrings/"},{id:"decode-ways",title:"Decode Ways",difficulty:"Medium",url:"https://leetcode.com/problems/decode-ways/"},{id:"coin-change",title:"Coin Change",difficulty:"Medium",url:"https://leetcode.com/problems/coin-change/"},{id:"max-product-subarray",title:"Maximum Product Subarray",difficulty:"Medium",url:"https://leetcode.com/problems/maximum-product-subarray/"},{id:"word-break",title:"Word Break",difficulty:"Medium",url:"https://leetcode.com/problems/word-break/"},{id:"longest-increasing-subseq",title:"Longest Increasing Subsequence",difficulty:"Medium",url:"https://leetcode.com/problems/longest-increasing-subsequence/"},{id:"partition-equal-subset-sum",title:"Partition Equal Subset Sum",difficulty:"Medium",url:"https://leetcode.com/problems/partition-equal-subset-sum/"}]},{id:"2d-dp",title:"2-D Dynamic Programming",blurb:'DP where state has two dimensions. Grid problems, two-string problems (LCS, edit distance). The "two pointers but DP" pattern.',color:"#E07856",lessonId:"2d-dp",problems:[{id:"unique-paths",title:"Unique Paths",difficulty:"Medium",url:"https://leetcode.com/problems/unique-paths/"},{id:"longest-common-subseq",title:"Longest Common Subsequence",difficulty:"Medium",url:"https://leetcode.com/problems/longest-common-subsequence/"},{id:"best-time-buy-sell-cooldown",title:"Best Time Buy Sell with Cooldown",difficulty:"Medium",url:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/"},{id:"coin-change-ii",title:"Coin Change II",difficulty:"Medium",url:"https://leetcode.com/problems/coin-change-ii/"},{id:"target-sum",title:"Target Sum",difficulty:"Medium",url:"https://leetcode.com/problems/target-sum/"},{id:"interleaving-string",title:"Interleaving String",difficulty:"Medium",url:"https://leetcode.com/problems/interleaving-string/"},{id:"longest-increasing-path",title:"Longest Increasing Path in Matrix",difficulty:"Hard",url:"https://leetcode.com/problems/longest-increasing-path-in-a-matrix/"},{id:"distinct-subsequences",title:"Distinct Subsequences",difficulty:"Hard",url:"https://leetcode.com/problems/distinct-subsequences/"},{id:"edit-distance",title:"Edit Distance",difficulty:"Hard",url:"https://leetcode.com/problems/edit-distance/"},{id:"burst-balloons",title:"Burst Balloons",difficulty:"Hard",url:"https://leetcode.com/problems/burst-balloons/"},{id:"regex-matching",title:"Regular Expression Matching",difficulty:"Hard",url:"https://leetcode.com/problems/regular-expression-matching/"}]},{id:"greedy",title:"Greedy",blurb:"Make the locally optimal choice at each step. Sometimes that gets you the global optimum. Proving WHY it does is the hard part.",color:"#8FA876",lessonId:"greedy",problems:[{id:"max-subarray",title:"Maximum Subarray (Kadane)",difficulty:"Medium",url:"https://leetcode.com/problems/maximum-subarray/"},{id:"jump-game",title:"Jump Game",difficulty:"Medium",url:"https://leetcode.com/problems/jump-game/"},{id:"jump-game-ii",title:"Jump Game II",difficulty:"Medium",url:"https://leetcode.com/problems/jump-game-ii/"},{id:"gas-station",title:"Gas Station",difficulty:"Medium",url:"https://leetcode.com/problems/gas-station/"},{id:"hand-of-straights",title:"Hand of Straights",difficulty:"Medium",url:"https://leetcode.com/problems/hand-of-straights/"},{id:"merge-triplets",title:"Merge Triplets to Form Target",difficulty:"Medium",url:"https://leetcode.com/problems/merge-triplets-to-form-target-triplet/"},{id:"partition-labels",title:"Partition Labels",difficulty:"Medium",url:"https://leetcode.com/problems/partition-labels/"},{id:"valid-parenthesis-string",title:"Valid Parenthesis String",difficulty:"Medium",url:"https://leetcode.com/problems/valid-parenthesis-string/"}]},{id:"intervals",title:"Intervals",blurb:"Problems on ranges with start/end. Almost always sort first, then sweep. Meeting rooms, overlap detection, scheduling.",color:"#7B9FB5",lessonId:"intervals",problems:[{id:"insert-interval",title:"Insert Interval",difficulty:"Medium",url:"https://leetcode.com/problems/insert-interval/"},{id:"merge-intervals",title:"Merge Intervals",difficulty:"Medium",url:"https://leetcode.com/problems/merge-intervals/"},{id:"non-overlapping-intervals",title:"Non-overlapping Intervals",difficulty:"Medium",url:"https://leetcode.com/problems/non-overlapping-intervals/"},{id:"meeting-rooms",title:"Meeting Rooms",difficulty:"Easy",url:"https://leetcode.com/problems/meeting-rooms/"},{id:"meeting-rooms-ii",title:"Meeting Rooms II",difficulty:"Medium",url:"https://leetcode.com/problems/meeting-rooms-ii/"},{id:"min-interval-include-query",title:"Minimum Interval to Include Query",difficulty:"Hard",url:"https://leetcode.com/problems/minimum-interval-to-include-each-query/"}]},{id:"math-geometry",title:"Math & Geometry",blurb:`The "you either see the trick or you don't" category. Matrix manipulation, modular arithmetic, geometric reasoning.`,color:"#B888C0",lessonId:"math-geometry",problems:[{id:"rotate-image",title:"Rotate Image",difficulty:"Medium",url:"https://leetcode.com/problems/rotate-image/"},{id:"spiral-matrix",title:"Spiral Matrix",difficulty:"Medium",url:"https://leetcode.com/problems/spiral-matrix/"},{id:"set-matrix-zeroes",title:"Set Matrix Zeroes",difficulty:"Medium",url:"https://leetcode.com/problems/set-matrix-zeroes/"},{id:"happy-number",title:"Happy Number",difficulty:"Easy",url:"https://leetcode.com/problems/happy-number/"},{id:"plus-one",title:"Plus One",difficulty:"Easy",url:"https://leetcode.com/problems/plus-one/"},{id:"pow-x-n",title:"Pow(x, n)",difficulty:"Medium",url:"https://leetcode.com/problems/powx-n/"},{id:"multiply-strings",title:"Multiply Strings",difficulty:"Medium",url:"https://leetcode.com/problems/multiply-strings/"},{id:"detect-squares",title:"Detect Squares",difficulty:"Medium",url:"https://leetcode.com/problems/detect-squares/"}]},{id:"bit-manipulation",title:"Bit Manipulation",blurb:"XOR tricks, bit shifting, counting set bits. Niche but unmistakable when you need it. Often the difference between O(n) and O(1).",color:"#F5B842",lessonId:"bit-manipulation",problems:[{id:"single-number",title:"Single Number",difficulty:"Easy",url:"https://leetcode.com/problems/single-number/"},{id:"number-of-1-bits",title:"Number of 1 Bits",difficulty:"Easy",url:"https://leetcode.com/problems/number-of-1-bits/"},{id:"counting-bits",title:"Counting Bits",difficulty:"Easy",url:"https://leetcode.com/problems/counting-bits/"},{id:"reverse-bits",title:"Reverse Bits",difficulty:"Easy",url:"https://leetcode.com/problems/reverse-bits/"},{id:"missing-number",title:"Missing Number",difficulty:"Easy",url:"https://leetcode.com/problems/missing-number/"},{id:"sum-two-integers",title:"Sum of Two Integers",difficulty:"Medium",url:"https://leetcode.com/problems/sum-of-two-integers/"},{id:"reverse-integer",title:"Reverse Integer",difficulty:"Medium",url:"https://leetcode.com/problems/reverse-integer/"}]}],f={bg:"#13110E",card:"#17140F",border:"#3A352D",text:"#F4EFE3",textDim:"#8E8773",amber:"#F5B842",sage:"#8FA876",blue:"#7B9FB5"};let Ee=0;const z=()=>`viz${++Ee}`;function x({nodes:e,edges:t,caption:s,height:o=240}){const r=z(),l={};e.forEach(a=>{l[a.id]=a});const g=e.map(a=>{const h=a.color||f.amber;return`
      <g transform="translate(${a.x},${a.y})" class="arch-node">
        <rect x="-${a.w/2}" y="-${a.h/2}" width="${a.w}" height="${a.h}" rx="6"
              fill="${f.card}" stroke="${h}" stroke-width="1.5"/>
        <text x="0" y="-2" text-anchor="middle" fill="${f.text}"
              font-family="Inter Tight, sans-serif" font-size="12" font-weight="600">${a.label}</text>
        ${a.sub?`<text x="0" y="14" text-anchor="middle" fill="${f.textDim}"
              font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="0.05em">${a.sub}</text>`:""}
      </g>
    `}).join(""),p=t.map((a,h)=>{const d=l[a.from],u=l[a.to];if(!d||!u)return"";const v=d.x+(a.fromOffset?.x||0),y=d.y+(a.fromOffset?.y||0),b=u.x+(a.toOffset?.x||0),k=u.y+(a.toOffset?.y||0),$=a.color||f.amber;return`
      <g class="arch-edge" style="--delay: ${h*.3}s">
        <line x1="${v}" y1="${y}" x2="${b}" y2="${k}"
              stroke="${$}" stroke-width="1.2" stroke-opacity="0.4"/>
        <line x1="${v}" y1="${y}" x2="${b}" y2="${k}"
              stroke="${$}" stroke-width="2" stroke-dasharray="6 6"
              class="arch-edge-flow"/>
        ${a.label?`<text x="${(v+b)/2}" y="${(y+k)/2-6}" text-anchor="middle"
              fill="${f.textDim}" font-family="JetBrains Mono, monospace" font-size="9">${a.label}</text>`:""}
      </g>
    `}).join("");return`
    <div class="lesson-viz">
      <svg viewBox="0 0 480 ${o}" width="100%" height="${o}" id="${r}">
        <defs>
          <marker id="${r}-arrow" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="${f.amber}" opacity="0.5"/>
          </marker>
        </defs>
        ${p}
        ${g}
      </svg>
      ${s?`<div class="lesson-viz-caption">${s}</div>`:""}
      <style>
        #${r} .arch-node { animation: fade-up 0.5s var(--ease-out) backwards; }
        #${r} .arch-node:nth-child(${e.length+1}) { animation-delay: 0.1s; }
        #${r} .arch-edge { animation: fade-in 0.6s var(--ease-out) backwards; animation-delay: var(--delay, 0s); }
        #${r} .arch-edge-flow { animation: flow-dash 1.2s linear infinite; }
      </style>
    </div>
  `}function W({actors:e,messages:t,caption:s,height:o=280}){const r=z(),g=460/e.length,p=30,a=30,h=70,d=36,u=e.map((y,b)=>{const k=p+b*g+g/2;return`
      <g class="seq-actor">
        <rect x="${k-50}" y="${a-14}" width="100" height="28" rx="4"
              fill="${f.card}" stroke="${f.amber}" stroke-width="1.2"/>
        <text x="${k}" y="${a+4}" text-anchor="middle" fill="${f.text}"
              font-family="Inter Tight, sans-serif" font-size="12" font-weight="600">${y}</text>
        <line x1="${k}" y1="${a+16}" x2="${k}" y2="${o-10}"
              stroke="${f.border}" stroke-width="1" stroke-dasharray="2 4"/>
      </g>
    `}).join(""),v=t.map((y,b)=>{const k=h+b*d,$=p+y.from*g+g/2,M=p+y.to*g+g/2,R=y.color||f.amber,N=y.return;return`
      <g class="seq-msg" style="--delay: ${b*.4}s">
        <line x1="${$}" y1="${k}" x2="${M}" y2="${k}"
              stroke="${R}" stroke-width="1.5" marker-end="url(#${r}-arrow)"
              ${N?'stroke-dasharray="4 4"':""}/>
        <text x="${($+M)/2}" y="${k-6}" text-anchor="middle"
              fill="${f.text}" font-family="JetBrains Mono, monospace" font-size="10"
              font-weight="500">${y.label}</text>
      </g>
    `}).join("");return`
    <div class="lesson-viz">
      <svg viewBox="0 0 480 ${o}" width="100%" height="${o}" id="${r}">
        <defs>
          <marker id="${r}-arrow" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="${f.amber}"/>
          </marker>
        </defs>
        ${u}
        ${v}
      </svg>
      ${s?`<div class="lesson-viz-caption">${s}</div>`:""}
      <style>
        #${r} .seq-actor { animation: fade-down 0.4s var(--ease-out) backwards; }
        #${r} .seq-msg { animation: fade-in 0.5s var(--ease-out) backwards; animation-delay: var(--delay); }
        #${r} .seq-msg line { stroke-dasharray: 0; animation: seq-draw 0.6s var(--ease-out) backwards; animation-delay: var(--delay); }
        @keyframes seq-draw { from { stroke-dashoffset: 100; stroke-dasharray: 100; } to { stroke-dashoffset: 0; } }
      </style>
    </div>
  `}function P({values:e,pointers:t=[],window:s,highlight:o=[],caption:r,label:l}){const g=z(),p=44,a=44,h=(480-e.length*p)/2,d=60,u=e.map((y,b)=>{const k=h+b*p,$=s&&b>=s[0]&&b<=s[1],M=o.includes(b);let R=f.card,N=f.border;return M?(R=f.amber,N=f.amber):$&&(R="rgba(245, 184, 66, 0.15)",N=f.amber),`
      <g class="arr-cell" style="--i: ${b}">
        <rect x="${k}" y="${d}" width="${p-2}" height="${a}" rx="4"
              fill="${R}" stroke="${N}" stroke-width="1.5"/>
        <text x="${k+p/2-1}" y="${d+a/2+5}" text-anchor="middle"
              fill="${M?f.bg:f.text}" font-family="JetBrains Mono, monospace"
              font-size="14" font-weight="600">${y}</text>
        <text x="${k+p/2-1}" y="${d+a+16}" text-anchor="middle"
              fill="${f.textDim}" font-family="JetBrains Mono, monospace" font-size="9">${b}</text>
      </g>
    `}).join(""),v=t.map((y,b)=>{const k=h+y.at*p+p/2-1,$=y.color||(b===0?f.amber:f.blue);return`
      <g class="arr-pointer" style="--delay: ${b*.2}s">
        <path d="M ${k-6} ${d-10} L ${k+6} ${d-10} L ${k} ${d-2} z"
              fill="${$}"/>
        <text x="${k}" y="${d-16}" text-anchor="middle" fill="${$}"
              font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">${y.label}</text>
      </g>
    `}).join("");return`
    <div class="lesson-viz">
      <svg viewBox="0 0 480 ${d+a+40}" width="100%" id="${g}">
        ${l?`<text x="240" y="20" text-anchor="middle" fill="${f.textDim}"
              font-family="JetBrains Mono, monospace" font-size="11"
              letter-spacing="0.1em" text-transform="uppercase">${l}</text>`:""}
        ${u}
        ${v}
      </svg>
      ${r?`<div class="lesson-viz-caption">${r}</div>`:""}
      <style>
        #${g} .arr-cell { animation: fade-up 0.4s var(--ease-out) backwards;
                          animation-delay: calc(var(--i) * 0.04s); }
        #${g} .arr-pointer { animation: fade-down 0.5s var(--ease-out) backwards;
                              animation-delay: calc(0.5s + var(--delay)); }
      </style>
    </div>
  `}function We({nodes:e,highlight:t=[],visited:s=[],caption:o}){const r=z(),l={};e.forEach(h=>{l[h.id]=h});const g=e.filter(h=>h.parent!=null).map(h=>{const d=l[h.parent];return`<line x1="${d.x}" y1="${d.y}" x2="${h.x}" y2="${h.y}"
                  stroke="${f.border}" stroke-width="1.5"/>`}).join(""),p=e.map((h,d)=>{const u=t.includes(h.id),v=s.includes(h.id);let y=f.card,b=f.border,k=f.text;return u?(y=f.amber,b=f.amber,k=f.bg):v&&(y="rgba(143, 168, 118, 0.2)",b=f.sage,k=f.sage),`
      <g class="tree-node" style="--i: ${d}">
        <circle cx="${h.x}" cy="${h.y}" r="18" fill="${y}" stroke="${b}" stroke-width="1.5"/>
        <text x="${h.x}" y="${h.y+5}" text-anchor="middle" fill="${k}"
              font-family="JetBrains Mono, monospace" font-size="13" font-weight="600">${h.value}</text>
      </g>
    `}).join("");return`
    <div class="lesson-viz">
      <svg viewBox="0 0 480 ${Math.max(...e.map(h=>h.y))+40}" width="100%" id="${r}">
        ${g}
        ${p}
      </svg>
      ${`<div class="lesson-viz-caption">${o}</div>`}
      <style>
        #${r} line { animation: fade-in 0.4s var(--ease-out) backwards; animation-delay: 0.1s; }
        #${r} .tree-node { animation: scale-in 0.4s var(--ease-out) backwards;
                            animation-delay: calc(var(--i) * 0.06s); transform-origin: center; transform-box: fill-box; }
      </style>
    </div>
  `}function Ne({values:e,pointers:t=[],caption:s}){const o=z(),r=56,l=16,p=(480-(e.length*r+(e.length-1)*l))/2,a=60,h=e.map((u,v)=>{const y=p+v*(r+l);return`
      <g class="ll-node" style="--i: ${v}">
        <rect x="${y}" y="${a}" width="${r}" height="40" rx="4"
              fill="${f.card}" stroke="${f.amber}" stroke-width="1.5"/>
        <text x="${y+r/2}" y="${a+25}" text-anchor="middle" fill="${f.text}"
              font-family="JetBrains Mono, monospace" font-size="13" font-weight="600">${u}</text>
        ${v<e.length-1?`
          <path d="M ${y+r+2} ${a+20} L ${y+r+l-4} ${a+20}"
                stroke="${f.amber}" stroke-width="1.5" marker-end="url(#${o}-arr)"/>
        `:`
          <text x="${y+r+8}" y="${a+24}" fill="${f.textDim}"
                font-family="JetBrains Mono, monospace" font-size="11">NULL</text>
        `}
      </g>
    `}).join(""),d=t.map((u,v)=>{const y=p+u.at*(r+l)+r/2;return`
      <g class="ll-pointer">
        <path d="M ${y-6} ${a-10} L ${y+6} ${a-10} L ${y} ${a-2} z"
              fill="${u.color||f.blue}"/>
        <text x="${y}" y="${a-16}" text-anchor="middle" fill="${u.color||f.blue}"
              font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">${u.label}</text>
      </g>
    `}).join("");return`
    <div class="lesson-viz">
      <svg viewBox="0 0 480 140" width="100%" id="${o}">
        <defs>
          <marker id="${o}-arr" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="${f.amber}"/>
          </marker>
        </defs>
        ${h}
        ${d}
      </svg>
      ${`<div class="lesson-viz-caption">${s}</div>`}
      <style>
        #${o} .ll-node { animation: fade-up 0.4s var(--ease-out) backwards;
                          animation-delay: calc(var(--i) * 0.08s); }
      </style>
    </div>
  `}function m({headers:e,rows:t,caption:s}){const o=e.map((l,g)=>{const p=g===0?"":`chip chip-track-${["devops","sd","mlops","dsa"][g-1]||"devops"}`;return`<th>${g===0?l:`<span class="${p}">${l}</span>`}</th>`}).join(""),r=t.map(l=>`
    <tr>${l.map((g,p)=>`<td>${g}</td>`).join("")}</tr>
  `).join("");return`
    <table class="lesson-table">
      <thead><tr>${o}</tr></thead>
      <tbody>${r}</tbody>
    </table>
    ${s?`<div class="lesson-viz-caption" style="margin-top:8px;">${s}</div>`:""}
  `}function n(e,t="info"){return`<div class="callout callout-${t}">${e}</div>`}function c(e,t){const s=z();return`
    <div class="lesson-quiz">
      <div class="lesson-quiz-label">◇ Self-check</div>
      <div class="lesson-quiz-q">${e}</div>
      <button class="lesson-quiz-reveal" onclick="document.getElementById('${s}').classList.toggle('open'); this.style.display='none';">
        Reveal answer →
      </button>
      <div class="lesson-quiz-a" id="${s}">${t}</div>
    </div>
  `}const Y=[{id:"lang",name:"Languages & Config",icon:"⌨",color:"#F5B842",lessons:["python-basics","python-idioms","yaml","regex","bash"]},{id:"found",name:"Foundations / DevOps",icon:"◆",color:"#7B9FB5",lessons:["linux","git","docker","kubernetes","ci-cd","terraform","observability"]},{id:"ml",name:"Machine Learning",icon:"◉",color:"#E07856",lessons:["ml-lifecycle","features","training-eval","deployment","monitoring","ab-testing"]},{id:"os",name:"Operating Systems",icon:"▣",color:"#8FA876",lessons:["processes-threads","concurrency","memory","virtual-memory","file-systems"]},{id:"dist",name:"Distributed Systems Theory",icon:"⌬",color:"#B888C0",lessons:["time-clocks","consensus","consistency-models","distributed-txns"]},{id:"int",name:"Interview Prep",icon:"★",color:"#F5B842",lessons:["star-framework","negotiation","interview-loop"]}],J={"python-basics":{track:"lang",title:"Python Fundamentals",subtitle:"The 20% of Python you use 80% of the time",duration:"25 min read",difficulty:"Foundational",sections:[{title:"Why Python",body:()=>`
        <p>Python is the lingua franca of MLOps, DevOps automation, and data work. It's slow but readable, has a massive standard library, and the ecosystem (pandas, numpy, scikit-learn, FastAPI, requests) is the best in the world for what you'll be doing.</p>
        <p>Coming from JS or shell, the biggest mental shift: <strong>significant whitespace.</strong> Indentation defines blocks. There are no braces. Get this wrong once and you'll never forget.</p>`},{title:"Data Types You Actually Use",body:()=>`
        ${m({headers:["Type","Mutable?","Example"],rows:[["int, float, str","No",'42, 3.14, "hello"'],["list","Yes","[1, 2, 3] — ordered, indexed"],["tuple","No","(1, 2, 3) — immutable list"],["dict","Yes",'{"a": 1, "b": 2} — key/value'],["set","Yes","{1, 2, 3} — unique unordered"],["None","N/A","Python's null"]]})}
        <p>The dict is your Swiss Army knife. The set kills duplicates and tests membership in O(1).</p>`},{title:"Control Flow",body:()=>`
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
        ${n('No "for (int i = 0; i < n; i++)" in Python. Use range(n) or enumerate(). The C-style loop will mark you as not really knowing Python.',"insight")}`},{title:"Functions, Args, and Defaults",body:()=>`
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
        ${n("NEVER use a mutable default argument like def f(x=[]). The list is shared across calls — a classic bug. Use def f(x=None): if x is None: x = []","warning")}
        ${c("What's the difference between a list and a tuple beyond mutability?","Tuples can be dict keys (immutable). Tuples are slightly faster to construct. Use tuple for fixed-size records (coordinates, RGB colors), list for collections that grow.")}`}],keyTerms:["list / tuple / dict / set","enumerate","f-string","*args / **kwargs","mutable defaults gotcha"],sources:["Official Python tutorial (docs.python.org/3/tutorial)","Fluent Python by Luciano Ramalho","Real Python (realpython.com)"]},"python-idioms":{track:"lang",title:"Python Idioms",subtitle:"Comprehensions, generators, context managers — write like a native",duration:"25 min read",difficulty:"Foundational",sections:[{title:"List Comprehensions",body:()=>`
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
unique_lengths = {len(w) for w in words}</code></pre>`},{title:"Generators — Lazy Lists",body:()=>`
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
        ${n("Anywhere a list comprehension would create something you only iterate once, use a generator expression instead. Same syntax, swap [] for ().","insight")}`},{title:"Context Managers (with)",body:()=>`
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
# Auto-commit on success, rollback on exception</code></pre>`},{title:"Idioms That Mark You As Fluent",body:()=>`
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
        ${c(`What's the time complexity of "x in my_list" vs "x in my_set"?`,'list: O(n) — linear scan. set: O(1) average — hash lookup. If you do "in" checks often, build a set first.')}`}],keyTerms:["list comp","generator","with statement","unpacking","Counter / defaultdict","walrus operator","truthiness"],sources:["Fluent Python by Luciano Ramalho","Effective Python by Brett Slatkin","PEP 8 style guide"]},yaml:{track:"lang",title:"YAML",subtitle:"The config language every infra tool insists on",duration:"18 min read",difficulty:"Foundational",sections:[{title:"Why YAML",body:()=>`
        <p>YAML (YAML Ain't Markup Language) is JSON with less syntax noise. Kubernetes manifests, GitHub Actions workflows, Terraform sometimes, Ansible playbooks, Docker Compose, CI/CD configs — all YAML. You will write thousands of lines of it.</p>
        <p><strong>Indentation matters.</strong> Like Python. Tabs are forbidden — use spaces (2 is the convention).</p>`},{title:"The Three Container Types",body:()=>`
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
person: {name: brandon, age: 22}</code></pre>`},{title:"Multiline Strings — the Trap",body:()=>`
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
        ${n("In Kubernetes ConfigMaps and shell scripts, always use | (preserve newlines). > breaks bash because it joins lines with spaces — your multi-line script becomes one giant unreadable line.","warning")}`},{title:"Anchors & Aliases (the DRY trick)",body:()=>`
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
        <p>Used heavily in GitLab CI and other repetitive configs. Most tools (Kubernetes!) <strong>don't actually evaluate anchors</strong> server-side — they expand at parse time on the client.</p>`},{title:"Gotchas",body:()=>`
        ${m({headers:["You wrote","Got parsed as","Fix"],rows:[["version: 1.10",'string "1.10"',"OK — most parsers treat unquoted as string"],["version: 1.1","float 1.1",'Quote it: "1.1"'],["port: 8080","int","OK"],['port: "08080"',"string","Often what you want for env vars"],["enabled: yes","bool true",'Quote if you meant string: "yes"'],["country: NO","bool false",'Norway problem — quote: "NO"'],["date: 2024-01-15","datetime object","Quote if you need string"]]})}
        ${c("Why is YAML preferred over JSON for human-edited config files?","Comments (JSON doesn't allow #), multiline strings without escaping, less syntax noise (no commas/braces), references via anchors. JSON wins for machine-generated config (smaller, faster to parse, no ambiguity).")}`}],keyTerms:["Scalar / sequence / mapping","| (literal) vs > (folded)","Anchors (&) and aliases (*)","Norway problem","Tabs forbidden"],sources:["YAML 1.2 spec (yaml.org)","noyaml.com (rants but accurate)","Kubernetes YAML reference"]},regex:{track:"lang",title:"Regex Essentials",subtitle:"Pattern matching that will save you 1000 lines of code",duration:"20 min read",difficulty:"Foundational",sections:[{title:"The Core Vocabulary",body:()=>`
        ${m({headers:["Token","Means","Example"],rows:[[".","any char (except newline)","a.c matches abc, axc"],["*","0 or more of previous","ab* matches a, ab, abb"],["+","1 or more","ab+ matches ab, abb (not a)"],["?","0 or 1","colou?r matches color, colour"],["^ $","start, end of line",'^abc$ matches only "abc"'],["[abc]","any of a, b, c","[aeiou] = any vowel"],["[^abc]","NOT a, b, c","[^0-9] = any non-digit"],["\\\\d \\\\w \\\\s","digit / word char / whitespace","\\\\d+ = 1+ digits"],["{n,m}","n to m repetitions","a{2,4} = aa, aaa, or aaaa"],["(abc)","capture group","reference back via \\\\1"],["a|b","a OR b","cat|dog matches either"]]})}`},{title:"Greedy vs Lazy",body:()=>`
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># Greedy (default) — matches as much as possible
"&lt;p&gt;hello&lt;/p&gt;&lt;p&gt;world&lt;/p&gt;".match(/&lt;p&gt;.*&lt;\\/p&gt;/)
// matches ENTIRE string

# Lazy with ? — matches as little as possible
"&lt;p&gt;hello&lt;/p&gt;&lt;p&gt;world&lt;/p&gt;".match(/&lt;p&gt;.*?&lt;\\/p&gt;/)
// matches just "&lt;p&gt;hello&lt;/p&gt;"</code></pre>
        ${n("Greedy is the default. If you're matching HTML/JSON-like content and pulling too much, add ? to make quantifiers lazy. Better yet, don't parse HTML with regex.","warning")}`},{title:"Capture Groups & Back-References",body:()=>`
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
# "XXX-1234"</code></pre>`},{title:"Patterns You'll Actually Use",body:()=>`
        ${m({headers:["Need","Pattern"],rows:[["Email-ish","[\\\\w.+-]+@[\\\\w-]+\\\\.[\\\\w.-]+"],["IPv4","\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}"],["URL","https?://[\\\\w./?=&-]+"],["UUID","[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"],["Whitespace only","^\\\\s*$"],["Strip ANSI color codes","\\\\x1b\\\\[[0-9;]*m"],["Comment line","^\\\\s*#"]]})}
        ${n(`Use raw strings r"..." in Python so you don't double-escape backslashes. Without raw: "\\\\\\\\d+" is awful.`,"insight")}
        ${c("Why does regex have catastrophic backtracking, and how do you avoid it?","Nested quantifiers like (a+)+ can explore exponentially many matches before failing. Avoid: use atomic groups (?>...) where available, avoid nested quantifiers, prefer specific patterns over .*")}`}],keyTerms:["Character classes","Quantifiers","Anchors (^ $)","Greedy vs lazy","Capture groups","Back-references","Catastrophic backtracking"],sources:["regex101.com (interactive tester)","Mastering Regular Expressions by Friedl","Python re module docs"]},bash:{track:"lang",title:"Bash & Shell Scripting",subtitle:"The glue language that holds your infrastructure together",duration:"25 min read",difficulty:"Foundational",sections:[{title:"The Three Streams",body:()=>`
        ${m({headers:["Stream","Number","Default"],rows:[["stdin","0","keyboard"],["stdout","1","terminal"],["stderr","2","terminal"]]})}
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># Redirect stdout
echo "hi" > file.txt          # overwrite
echo "hi" >> file.txt         # append

# Redirect stderr
command 2> errors.log

# Both to same place
command > out.log 2>&1
command &> out.log            # bash shortcut

# Discard
command > /dev/null 2>&1      # silence everything</code></pre>`},{title:"Pipes & Composability",body:()=>`
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
ps aux | grep 'python' | grep -v grep | awk '{print $2}' | xargs kill</code></pre>`},{title:"Variables, Quoting, and the $ Gotcha",body:()=>`
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
        ${n("Always quote your variables in bash. Always. This single rule prevents 90% of shell script bugs around filenames with spaces.","warning")}`},{title:"Conditionals & Loops",body:()=>`
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
deploy production</code></pre>`},{title:"set -euo pipefail (Mandatory)",body:()=>`
        <p>Put this at the top of every non-trivial script. It turns Bash from "shell of footguns" into "almost safe":</p>
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code>#!/usr/bin/env bash
set -euo pipefail

# -e  exit on first error
# -u  exit on undefined variable
# -o pipefail  exit if any command in pipe fails

# Without -e, this would continue after rm fails
rm /nonexistent/file
echo "still running, oops"</code></pre>
        ${c('Why is "set -e" not enough by itself?',`"set -e" only catches errors from commands run directly. Without -o pipefail, "false | true" succeeds (exit code 0) because only the last command's exit code counts. Without -u, typos in variable names silently expand to empty strings.`)}`}],keyTerms:["stdin / stdout / stderr","Pipes","Quoting","set -euo pipefail","[[ tests ]]","jq","xargs","awk basics"],sources:["Bash manual (man bash)","Google Shell Style Guide","explainshell.com (interactive)"]},linux:{track:"found",title:"Linux Fundamentals",subtitle:"The OS your production runs on",duration:"25 min read",difficulty:"Foundational",sections:[{title:"The Filesystem Tree",body:()=>`
        ${m({headers:["Path","What lives there"],rows:[["/","root of everything"],["/etc","system config files"],["/var","logs, databases, runtime state"],["/var/log","log files"],["/usr/bin","system binaries"],["/usr/local/bin","manually-installed binaries"],["/home/$USER","your home directory"],["/tmp","temporary files (cleared on reboot)"],["/proc","process info (virtual filesystem)"],["/dev","device files (disks, terminals)"]]})}`},{title:"Permissions (rwx for ugo)",body:()=>`
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
        ${n("SSH private keys MUST be 600. If they're world-readable, ssh refuses to use them.","warning")}`},{title:"Processes",body:()=>`
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
bg                  # resume in background</code></pre>`},{title:"The Toolkit You Need",body:()=>`
        ${m({headers:["Command","Does"],rows:[["grep","search text in files"],["find","find files by name/size/age"],["sed","stream editing (find/replace)"],["awk","column-based text processing"],["cut","extract columns by delimiter"],["sort + uniq","sort, dedupe (often combined)"],["tail -f","follow log as it grows"],["curl / wget","HTTP from command line"],["ssh / scp / rsync","remote shell, copy, sync"],["tar + gzip","archive and compress"],["systemctl","manage services (start/stop/status)"],["journalctl","view systemd logs"]]})}
        ${c("You SSH to a server. Your terminal disconnects. The script you were running dies. How to prevent this next time?","tmux or screen — terminal multiplexers. ssh in, tmux to open a session, run your script there, detach with Ctrl+B D, reconnect later with tmux attach. Or nohup ./script.sh & to fully detach.")}`}],keyTerms:["Filesystem layout","rwx permissions","chmod octal","Process management","kill signals","systemd","tmux"],sources:["The Linux Command Line by William Shotts (free PDF)","Linux man pages (man <command>)","Linuxjourney.com"]},git:{track:"found",title:"Git Deep Dive",subtitle:"Not just add-commit-push — the model that makes it click",duration:"28 min read",difficulty:"Foundational",sections:[{title:"The Mental Model",body:()=>`
        <p>Git is not a "save my files" tool. It's a database of <strong>commits</strong>, each a snapshot of your project. <strong>Branches</strong> are just labels pointing to commits. Once you internalize this, everything makes sense.</p>
        ${x({height:200,nodes:[{id:"wd",x:50,y:90,w:100,h:40,label:"Working dir",sub:"your files"},{id:"idx",x:220,y:90,w:100,h:40,label:"Staging",sub:"next commit",color:"#F5B842"},{id:"repo",x:390,y:90,w:100,h:40,label:".git",sub:"history",color:"#8FA876"}],edges:[{from:"wd",to:"idx",label:"git add"},{from:"idx",to:"repo",label:"git commit"}],caption:"Three states: working → staging → committed"})}`},{title:"Branches Are Labels",body:()=>`
        <p>A branch is a movable pointer to a commit. <code>git checkout -b feature</code> creates a new label pointing to where you are now. Switching branches just moves <code>HEAD</code> (the "you are here" pointer) to a different label.</p>
        <p>This is why branching is essentially free in Git — no copying, just relabeling.</p>`},{title:"The Daily Workflow",body:()=>`
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
git branch -d feature/new-thing</code></pre>`},{title:"Merge vs Rebase",body:()=>`
        ${m({headers:["Operation","What it does","When"],rows:[["merge","Combines branches, creates merge commit","When you want history to reflect that work happened in parallel"],["rebase","Replays your commits on top of target branch","When you want linear history"],["cherry-pick","Copy one specific commit","Hotfix to multiple branches"],["revert","New commit that undoes a previous one","Undoing in shared history (safe)"],["reset","Moves branch pointer (destructive)","Undoing locally (DANGEROUS)"]]})}
        ${n("Never rebase commits that other people have based work on. You'll rewrite their history and break everything. Rebase your own unpushed work freely.","warning")}`},{title:"Getting Out of Trouble",body:()=>`
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
        ${c("You force-pushed and overwrote your teammate's commits. How do you recover their work?","git reflog on the remote (if they have local copies) shows every HEAD movement. Find the SHA of their pre-force-push state, cherry-pick or reset to it. This is also why force-push to main should be banned via branch protection.")}`}],keyTerms:["commit / branch / HEAD","staging area","merge vs rebase","reset (soft/hard)","reflog","cherry-pick","revert"],sources:["Pro Git book (free at git-scm.com/book)","Oh My Git! (interactive game)","learngitbranching.js.org"]},docker:{track:"found",title:"Docker & Containers",subtitle:"Package once, run anywhere — without VM overhead",duration:"25 min read",difficulty:"Foundational",sections:[{title:"What a Container Actually Is",body:()=>`
        <p>A container is a process running on the host kernel, isolated via <strong>namespaces</strong> (sees its own PIDs, network, filesystem) and <strong>cgroups</strong> (limited CPU/memory). It's NOT a VM. No guest OS. Just isolation primitives.</p>
        ${x({height:220,nodes:[{id:"h",x:200,y:180,w:140,h:35,label:"Host kernel (Linux)",color:"#8FA876"},{id:"d",x:200,y:130,w:140,h:35,label:"Docker daemon"},{id:"c1",x:80,y:60,w:100,h:50,label:"Container A",sub:"python app"},{id:"c2",x:220,y:60,w:100,h:50,label:"Container B",sub:"postgres"},{id:"c3",x:360,y:60,w:100,h:50,label:"Container C",sub:"redis"}],edges:[{from:"c1",to:"d"},{from:"c2",to:"d"},{from:"c3",to:"d"},{from:"d",to:"h"}],caption:"Containers share the host kernel; only userspace differs"})}
        <p>This is why containers start in milliseconds and use little RAM — VM-level isolation, near-zero overhead.</p>`},{title:"Dockerfile — Build Instructions",body:()=>`
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code>FROM python:3.11-slim          # base image

WORKDIR /app                    # cd into /app

COPY requirements.txt .         # copy deps first
RUN pip install -r requirements.txt   # install (this layer cached if reqs unchanged)

COPY . .                        # then copy code (changes often)

EXPOSE 8000                     # docs only — doesn't open port
CMD ["python", "app.py"]        # what to run on start</code></pre>
        ${n("Order matters because of layer caching. Copy and install dependencies BEFORE copying your source code. That way, code changes don't invalidate the dep cache.","insight")}`},{title:"The Commands",body:()=>`
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
docker system prune -a          # nuke unused stuff</code></pre>`},{title:"Multi-Stage Builds — The Pro Move",body:()=>`
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
        ${n("Production rule: your final image should NOT contain compilers, source code, or package managers. Multi-stage shrinks attack surface and image size dramatically.","insight")}
        ${c("What's the difference between an image and a container?","Image = blueprint (read-only template). Container = running instance (read-write layer on top of image). Like class vs object. You can run many containers from one image.")}`}],keyTerms:["Image vs container","Layer caching","Dockerfile directives","Volumes & bind mounts","Port mapping","Multi-stage builds"],sources:["Docker official docs","Dive (tool to inspect image layers)","Best practices for writing Dockerfiles"]},kubernetes:{track:"found",title:"Kubernetes Essentials",subtitle:'Orchestration: from "running containers" to "self-healing apps"',duration:"32 min read",difficulty:"Intermediate",sections:[{title:"The Core Objects",body:()=>`
        ${m({headers:["Object","What","Mental model"],rows:[["Pod","One or more containers run together","The atom — smallest deployable unit"],["Deployment","Declares N replicas of a pod template","Manages pods, handles rolling updates"],["Service","Stable network endpoint for a set of pods","Internal DNS + load balancing"],["Ingress","External HTTP routing rules","L7 routing into the cluster"],["ConfigMap","Non-secret config (env vars, files)","Externalize config from images"],["Secret","Same as ConfigMap but base64-encoded","For passwords, tokens, keys"],["Namespace","Logical partition of the cluster","Multi-team isolation"]]})}`},{title:"A Real Deployment",body:()=>`
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
    targetPort: 8000</code></pre>`},{title:"The Self-Healing Loop",body:()=>`
        <p>K8s constantly compares <strong>desired state</strong> (your YAML) to <strong>actual state</strong> (what's running). Any drift triggers correction.</p>
        ${W({actors:["You","API server","Controller","Kubelet"],height:280,messages:[{from:0,to:1,label:"apply deployment.yaml"},{from:1,to:2,label:"observe: 0 pods, want 3"},{from:2,to:1,label:"create 3 pods",return:!0},{from:1,to:3,label:"schedule pods to nodes"},{from:3,to:1,label:"pods running",return:!0},{from:2,to:1,label:"liveness probe fails on pod 2"},{from:1,to:3,label:"restart pod 2 automatically"}],caption:"Reconciliation loop: K8s never stops checking"})}`},{title:"kubectl — The Daily Driver",body:()=>`
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
kubectl rollout undo deployment api</code></pre>`},{title:"Probes — Why Things Self-Heal",body:()=>`
        ${m({headers:["Probe","Asks","On failure"],rows:[["liveness","Is the app alive?","Restart the container"],["readiness","Is the app ready to serve?","Remove from Service load balancer"],["startup","Has the app finished starting?","Disables other probes during startup"]]})}
        ${n('Without probes, K8s assumes "process running = healthy." Apps that deadlock or block on startup will silently fail traffic. Always set at least liveness + readiness.',"warning")}
        ${c("Pod CrashLoopBackOff means what, and how do you debug it?","Container started, exited, K8s restarted it, it crashed again — backing off. Debug: kubectl logs --previous (logs from the dead one), kubectl describe pod (events, OOMKilled?), check resource limits, env vars, image tag.")}`}],keyTerms:["Pod","Deployment","Service","Ingress","ConfigMap / Secret","Probes (liveness/readiness)","Reconciliation loop","kubectl basics"],sources:["Kubernetes Up & Running by Brendan Burns","kubernetes.io docs","KubeCon talks on YouTube"]},"ci-cd":{track:"found",title:"CI/CD Pipelines",subtitle:"Automate the path from commit to production",duration:"22 min read",difficulty:"Foundational",sections:[{title:"CI vs CD vs CD",body:()=>`
        ${m({headers:["Term","Stands for","Goal"],rows:[["CI","Continuous Integration","Every commit auto-builds + tests"],["CD","Continuous Delivery","Every passing build is ready to deploy (manual trigger)"],["CD","Continuous Deployment","Every passing build auto-deploys to prod"]]})}
        <p>Most companies do CI + Delivery. Full Deployment to prod takes serious test coverage, feature flags, and observability.</p>`},{title:"A Typical Pipeline",body:()=>`
        ${x({height:200,nodes:[{id:"commit",x:30,y:90,w:80,h:30,label:"git push"},{id:"lint",x:130,y:90,w:70,h:30,label:"lint"},{id:"test",x:220,y:90,w:70,h:30,label:"test"},{id:"build",x:310,y:90,w:70,h:30,label:"build image"},{id:"scan",x:400,y:90,w:70,h:30,label:"scan"},{id:"deploy",x:490,y:90,w:80,h:30,label:"deploy",color:"#8FA876"}],edges:[{from:"commit",to:"lint"},{from:"lint",to:"test"},{from:"test",to:"build"},{from:"build",to:"scan"},{from:"scan",to:"deploy"}],caption:"Each stage is a gate — fail fast, save compute"})}`},{title:"GitHub Actions Example",body:()=>`
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
          username: \${{ secrets.DOCKER_USER }}
          password: \${{ secrets.DOCKER_PASS }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: myapp:\${{ github.sha }}</code></pre>`},{title:"Deployment Strategies",body:()=>`
        ${m({headers:["Strategy","How","Risk"],rows:[["Recreate","Stop old, start new","Downtime. Only for dev."],["Rolling","Replace pods one at a time","Low — K8s default"],["Blue/Green","Run both versions, switch traffic atomically","Easy rollback, 2x resources"],["Canary","Send 1% → 5% → 25% → 100% of traffic","Safest. Detect issues early."]]})}
        ${n("Always have a rollback button. The fastest fix to a bad deploy is reverting to the previous version, not debugging in prod.","insight")}
        ${c("Why run tests in CI rather than relying on developers running them locally?",'1) Consistency — same env every time. 2) No "works on my machine" excuses. 3) Tests run on EVERY commit, not just when someone remembers. 4) Blocks merge if broken.')}`}],keyTerms:["CI / CD","Pipeline stages","Artifact","Rolling / blue-green / canary","Rollback","Secret management in CI"],sources:["GitHub Actions docs","GitLab CI docs","The Phoenix Project (novel about IT)"]},terraform:{track:"found",title:"Terraform & IaC",subtitle:"Infrastructure as code: declarative, versioned, reviewable",duration:"25 min read",difficulty:"Intermediate",sections:[{title:"Why IaC",body:()=>`
        <p>Clicking through AWS console works until it doesn't. <strong>"What's actually deployed?"</strong> becomes unanswerable. <strong>"How do I replicate prod in staging?"</strong> becomes impossible.</p>
        <p>IaC means infrastructure is defined in code, version-controlled, code-reviewed, and applied via automation. Same discipline as application code.</p>`},{title:"The Terraform Loop",body:()=>`
        ${W({actors:["You","Terraform","State","AWS API"],height:280,messages:[{from:0,to:1,label:"terraform plan"},{from:1,to:2,label:"read current state"},{from:1,to:3,label:"read live infrastructure"},{from:1,to:0,label:"show diff: +S3 bucket, ~EC2 size",return:!0},{from:0,to:1,label:"terraform apply (looks good)"},{from:1,to:3,label:"create / update / destroy"},{from:1,to:2,label:"update state"}],caption:"Plan shows diff. Apply makes it real. State tracks ownership."})}`},{title:"Anatomy of a Config",body:()=>`
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
}</code></pre>`},{title:"State — The Critical Concept",body:()=>`
        <p>Terraform keeps a <code>terraform.tfstate</code> file mapping config to real resources. Without it, Terraform can't tell what it owns vs what existed already.</p>
        <p><strong>Never store state in Git.</strong> Use a remote backend (S3 + DynamoDB lock, Terraform Cloud, or GCS). State contains secrets in plain text.</p>
        ${n("If your state file is lost or corrupted, you essentially have to import every resource manually or rebuild from scratch. Treat state like the most critical data in your infra — back it up, encrypt it, lock it.","warning")}`},{title:"Modules — Reusable Building Blocks",body:()=>`
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
        ${c("You ran terraform apply, then someone changed the resource in the AWS console. What happens on the next apply?",`Terraform detects drift — the live state doesn't match what it expects. It will revert the console changes to match the config. That's why "console changes" are forbidden in IaC shops.`)}`}],keyTerms:["Provider","Resource","State file","Backend","Module","Plan vs Apply","Drift"],sources:["Terraform official tutorials (HashiCorp Learn)","Terraform Up & Running by Yevgeniy Brikman","AWS provider docs"]},observability:{track:"found",title:"Observability — Logs, Metrics, Traces",subtitle:"Knowing what your system is doing in production",duration:"22 min read",difficulty:"Foundational",sections:[{title:"The Three Pillars",body:()=>`
        ${m({headers:["Pillar","What","Tool examples"],rows:[["Logs","Discrete events, timestamped, often text","Loki, ELK, CloudWatch, Splunk"],["Metrics","Numbers over time (counters, gauges)","Prometheus, Datadog, CloudWatch"],["Traces","How a request flowed across services","Jaeger, Tempo, Honeycomb, Datadog APM"]]})}
        <p><strong>Logs</strong> answer "what happened?" <strong>Metrics</strong> answer "is anything weird?" <strong>Traces</strong> answer "why is this request slow?"</p>`},{title:"Metrics — The 4 Golden Signals",body:()=>`
        <p>Google's SRE book identifies four metrics that every service should track:</p>
        <ol>
          <li><strong>Latency</strong> — how long requests take (especially p50, p95, p99)</li>
          <li><strong>Traffic</strong> — how much demand (RPS)</li>
          <li><strong>Errors</strong> — rate of failed requests</li>
          <li><strong>Saturation</strong> — how full the system is (CPU, memory, queue depth)</li>
        </ol>
        ${n("p99 latency matters more than average. Average hides the bad experience for your worst 1% of users — who are often your most valuable.","insight")}`},{title:"Prometheus Metric Types",body:()=>`
        ${m({headers:["Type","Example use","Goes up/down?"],rows:[["Counter","Requests served, errors raised","Only up"],["Gauge","Memory used, queue depth, temperature","Up and down"],["Histogram","Request duration buckets","Distribution"],["Summary","Like histogram but pre-computed quantiles","Distribution"]]})}
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 11px;"><code># PromQL examples
http_requests_total{status="500"}                    # error count
rate(http_requests_total[5m])                        # requests per second
histogram_quantile(0.95, http_request_duration_seconds_bucket)  # p95
sum by (status) (rate(http_requests_total[5m]))     # RPS by status code</code></pre>`},{title:"Structured Logging",body:()=>`
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
        <p>Now you can run <code>SELECT count(*) WHERE event = "login_failed" AND ip = "..."</code> in your log tool.</p>`},{title:"Distributed Tracing",body:()=>`
        <p>One user request might hit 8 microservices. Without traces, "why was this slow?" is unanswerable. With traces, you see a waterfall: API gateway 5ms → auth 12ms → user-svc 200ms ← here's your problem.</p>
        <p>Implementation: at the entry point, generate a <code>trace_id</code>. Pass it via HTTP headers to every downstream call. Each service logs spans (start/end times) tagged with the trace_id. A trace UI assembles them.</p>
        ${c("Your service's p99 latency just spiked from 100ms to 500ms. Average barely moved. What does this tell you?","A small fraction of requests got dramatically slower. Could be: GC pause, cache miss on hot key, one slow DB query for specific users, slow-loading large records. Average hides this; p99 reveals it. Action: look at traces of slowest requests.")}`}],keyTerms:["Logs / metrics / traces","4 golden signals","p50/p95/p99 latency","Counter / gauge / histogram","Structured logging","trace_id propagation"],sources:["Google SRE Book (free online)","Prometheus docs",'"Observability Engineering" by Majors, Fong-Jones, Miranda']},"ml-lifecycle":{track:"ml",title:"The ML Lifecycle",subtitle:"From data to deployed model — the whole arc",duration:"20 min read",difficulty:"Foundational",sections:[{title:"The Eight Stages",body:()=>`
        ${x({height:220,nodes:[{id:"d",x:30,y:50,w:70,h:30,label:"Data"},{id:"f",x:120,y:50,w:70,h:30,label:"Features"},{id:"tr",x:210,y:50,w:70,h:30,label:"Train"},{id:"ev",x:300,y:50,w:70,h:30,label:"Evaluate"},{id:"dep",x:390,y:50,w:70,h:30,label:"Deploy",color:"#F5B842"},{id:"mon",x:480,y:50,w:70,h:30,label:"Monitor"},{id:"rt",x:300,y:150,w:110,h:35,label:"Retrain trigger",color:"#E07856"}],edges:[{from:"d",to:"f"},{from:"f",to:"tr"},{from:"tr",to:"ev"},{from:"ev",to:"dep"},{from:"dep",to:"mon"},{from:"mon",to:"rt"},{from:"rt",to:"tr"}],caption:"It's a loop. Models degrade. Monitoring triggers retraining."})}`},{title:"Why MLOps Exists",body:()=>`
        <p>Traditional software: write code, deploy code, code behavior is deterministic. ML: <strong>write code AND collect data, train model on data, deploy model, model behavior depends on data distribution that shifts over time.</strong></p>
        <p>Three new failure modes traditional DevOps doesn't handle:</p>
        <ul>
          <li><strong>Data drift.</strong> Input distribution shifts (new user behaviors, seasonal changes).</li>
          <li><strong>Concept drift.</strong> Relationship between input and label changes (fraud patterns evolve).</li>
          <li><strong>Training/serving skew.</strong> Features computed differently at train vs serve time → silent accuracy loss.</li>
        </ul>
        ${n("MLOps = DevOps + data versioning + model versioning + drift monitoring. Most of the work isn't the model — it's the plumbing around it.","insight")}`},{title:"Online vs Batch ML",body:()=>`
        ${m({headers:["Property","Batch","Online (real-time)"],rows:[["Predictions computed","Ahead of time, stored","On request"],["Latency tolerated","Hours","Milliseconds"],["Examples","Daily recommendations, churn scores","Fraud detection, ad ranking"],["Complexity","Lower — just a cron + ETL","Higher — feature serving, low-latency inference"]]})}`},{title:"Where DevSecOps Skills Translate",body:()=>`
        <p>Your current toolkit maps directly:</p>
        ${m({headers:["Your DevOps skill","MLOps equivalent"],rows:[["Docker","Same — package model + runtime"],["Kubernetes","Same — serve model containers"],["CI/CD pipelines","Same — but pipelines also retrain"],["Terraform","Same — provision GPU clusters"],["Prometheus","Same — plus model-specific metrics (drift, latency)"],["Vault","Model registry — store and version models"]]})}
        <p>The new skills: training pipelines (Kubeflow, MLflow), feature stores (Feast, Tecton), model serving (TorchServe, BentoML, KServe).</p>
        ${c("Why do ML models degrade over time even when the code doesn't change?","Data drift. The world changes — user demographics shift, products evolve, attack patterns adapt. Model was trained on yesterday's distribution; today's distribution differs. Accuracy quietly decreases. Monitor or you'll find out from your CEO.")}`}],keyTerms:["ML lifecycle","Data / concept drift","Training/serving skew","Batch vs online inference","Feature store","Model registry"],sources:['"Machine Learning Engineering" by Andriy Burkov',"Google's ML rules",'"Designing ML Systems" by Chip Huyen']},features:{track:"ml",title:"Feature Engineering & Feature Stores",subtitle:"Your model is only as good as its features",duration:"22 min read",difficulty:"Foundational",sections:[{title:"Features Are The Game",body:()=>`
        <p>In classical ML, feature engineering matters more than model choice. A simple logistic regression with great features beats a tuned XGBoost with bad features. Deep learning shifts this somewhat (it learns features from raw input) but for tabular data, hand-crafted features still rule.</p>`},{title:"Common Feature Transformations",body:()=>`
        ${m({headers:["Type","What","When"],rows:[["Standardization","(x - mean) / std","Linear models, neural nets"],["Min-max scaling","(x - min) / (max - min)","Bounded inputs needed"],["Log transform","log(x + 1)","Heavy-tailed distributions (prices, durations)"],["One-hot encoding","category → boolean columns","Low-cardinality categoricals"],["Target encoding","category → mean target","High-cardinality categoricals (zip codes)"],["Binning","continuous → discrete buckets","Capture non-linear effects in linear models"]]})}`},{title:"Time-Based Features",body:()=>`
        <p>Almost every dataset has timestamps. Don't feed raw datetimes to a model.</p>
        <p>Extract: day-of-week, hour-of-day, is-weekend, is-holiday, day-of-month, week-of-year. For cyclic features (hour, day of week), encode as sin/cos pair so Sunday is close to Monday in feature space.</p>
        <p><strong>Lag features.</strong> "User's spend over last 7 days" is a powerful predictor of future spend. Window aggregations over recent history.</p>`},{title:"Feature Store — The Pattern",body:()=>`
        <p>Two problems feature stores solve:</p>
        <ol>
          <li><strong>Training/serving skew.</strong> Feature must be computed identically at train time (historical data) and serve time (live request).</li>
          <li><strong>Feature reuse.</strong> "User's 30-day spend" useful for fraud, recommendations, churn. Don't recompute three times.</li>
        </ol>
        ${x({height:220,nodes:[{id:"src",x:40,y:100,w:90,h:40,label:"Raw data",sub:"events, txns"},{id:"ing",x:170,y:100,w:90,h:40,label:"Feature pipeline",color:"#F5B842"},{id:"off",x:310,y:50,w:110,h:40,label:"Offline store",sub:"historical (training)",color:"#8FA876"},{id:"on",x:310,y:150,w:110,h:40,label:"Online store",sub:"real-time (serving)",color:"#7B9FB5"},{id:"tr",x:460,y:50,w:90,h:40,label:"Training"},{id:"inf",x:460,y:150,w:90,h:40,label:"Inference"}],edges:[{from:"src",to:"ing"},{from:"ing",to:"off"},{from:"ing",to:"on"},{from:"off",to:"tr"},{from:"on",to:"inf"}],caption:"One pipeline, two stores. Offline for training, online for serving."})}
        <p>Tools: Feast (open-source), Tecton (managed), AWS SageMaker Feature Store, Databricks Feature Store.</p>
        ${c('Why is "training/serving skew" so dangerous and so common?',`You compute "user's 7-day avg purchase" in Spark for training, then in Python for serving. Subtle differences (timezone, edge cases) → features don't match. Model trained on slightly-wrong values, accuracy degrades. Feature stores prevent this by providing one definition used everywhere.`)}`}],keyTerms:["Feature engineering","Standardization / scaling","One-hot / target encoding","Lag features","Feature store","Online vs offline store","Training/serving skew"],sources:['"Feature Engineering for ML" by Alice Zheng',"Feast docs (feast.dev)","Uber's Michelangelo paper"]},"training-eval":{track:"ml",title:"Training & Evaluation",subtitle:"How to train models without fooling yourself",duration:"25 min read",difficulty:"Foundational",sections:[{title:"The Sacred Train/Val/Test Split",body:()=>`
        <p>You must split your data into three sets — never let test data leak into training. The setup:</p>
        ${m({headers:["Set","Use","Typical size"],rows:[["Train","Model learns parameters","70-80%"],["Validation","Tune hyperparameters","10-15%"],["Test","Final unbiased accuracy","10-15%"]]})}
        ${n(`Test set is sacred. Look at it ONCE at the very end. If you keep checking test accuracy and tweaking, you're fitting to it — and your "test accuracy" becomes meaningless.`,"warning")}`},{title:"Time-Series Split (Crucial)",body:()=>`
        <p>For any data with time, random split is WRONG. You must split chronologically — train on past, validate on future. Otherwise you're "predicting" the past from the future, which leaks information that won't exist at serving time.</p>
        <p>For fraud detection trained on 2024 data: train on Jan-Sep, validate on Oct, test on Nov-Dec.</p>`},{title:"Overfitting vs Underfitting",body:()=>`
        ${m({headers:["Symptom","Cause","Fix"],rows:[["Train acc high, val acc much lower","Overfitting","More data, regularization, simpler model, dropout, early stopping"],["Train acc and val acc both low","Underfitting","More complex model, more features, less regularization"],["Both improve together over epochs","Healthy","Keep training"],["Val acc improving then degrading","Overfitting late","Early stopping at peak val acc"]]})}`},{title:"Evaluation Metrics by Task",body:()=>`
        ${m({headers:["Task","Default metric","When"],rows:[["Binary classification (balanced)","Accuracy","When classes ~50/50"],["Binary classification (imbalanced)","Precision, Recall, F1, AUC-PR","99% negative, 1% positive (fraud)"],["Multi-class","Accuracy, F1 (macro/weighted)","Many classes"],["Regression","RMSE, MAE, R²","Predicting numbers"],["Ranking","NDCG, MAP","Search, recommendations"]]})}
        ${n('For imbalanced data, accuracy LIES. A model that always predicts "not fraud" gets 99% accuracy and is useless. Use precision/recall.',"warning")}`},{title:"Precision vs Recall — The Trade-off",body:()=>`
        <p><strong>Precision.</strong> Of the items we flagged, what fraction were correct?</p>
        <p><strong>Recall.</strong> Of all actual positives, what fraction did we catch?</p>
        <p>Tuning the decision threshold trades them off. Lower threshold → catch more positives (high recall, low precision). Higher threshold → only flag confident ones (high precision, low recall).</p>
        ${c("Cancer screening: optimize for precision or recall?",'Recall. Missing a true cancer (false negative) is catastrophic. False positives lead to follow-up tests — annoying but recoverable. Recall = 1 means "we catch every cancer."')}`}],keyTerms:["Train/val/test split","Time-series split","Overfitting / underfitting","Precision / Recall / F1","AUC","Early stopping","Cross-validation"],sources:['"Hands-On ML" by Aurélien Géron',"scikit-learn user guide",'"Pattern Recognition and ML" by Bishop']},deployment:{track:"ml",title:"Model Deployment",subtitle:"Turning trained weights into a production service",duration:"22 min read",difficulty:"Intermediate",sections:[{title:"Three Deployment Patterns",body:()=>`
        ${m({headers:["Pattern","How","When"],rows:[["Batch","Cron job runs predictions on stored data, writes to DB","Daily reports, scoring, recommendations refreshed nightly"],["Real-time API","HTTP service serves predictions on request","Fraud, ad ranking, search, anything user-facing"],["Embedded","Model runs on-device (phone, IoT)","Privacy-sensitive, offline-capable, low-latency"]]})}`},{title:"Serving Tools",body:()=>`
        <ul>
          <li><strong>FastAPI + your code.</strong> Simplest. Fine for low scale.</li>
          <li><strong>TorchServe, TF Serving.</strong> Production model servers from PyTorch/TF teams. Optimized inference, multi-model, batching.</li>
          <li><strong>BentoML, MLflow Serving.</strong> Framework-agnostic, packaging + serving. Common choice.</li>
          <li><strong>KServe (formerly KFServing).</strong> Kubernetes-native, autoscaling, canary deployments.</li>
          <li><strong>SageMaker, Vertex AI.</strong> Managed services. Less ops, more lock-in.</li>
        </ul>`},{title:"Latency Optimization",body:()=>`
        <p>Inference is often slower than you'd hope. Common levers:</p>
        ${m({headers:["Technique","Speedup","Cost"],rows:[["Batching requests","5-50x throughput","Higher latency per request"],["Quantization (FP32 → INT8)","2-4x","Small accuracy loss"],["Distillation (big → small model)","10x","Accuracy loss, training work"],["Caching common predictions","∞","Only works for repeated inputs"],["GPU vs CPU","5-100x depending on model","$$$"],["ONNX runtime","1.5-3x","Conversion work"]]})}`},{title:"Deployment Strategies for ML",body:()=>`
        <p>Same as application deployment — but with a model-specific twist: <strong>shadow mode.</strong></p>
        <p><strong>Shadow.</strong> New model runs alongside old, predictions logged but not served. You compare predictions, accuracy, latency before any user sees the new model.</p>
        <p><strong>Canary.</strong> 1% → 5% → 25% of traffic to new model. Watch metrics for regressions.</p>
        <p><strong>A/B test.</strong> Random users get new model. Measure business metrics (CTR, conversion), not just accuracy.</p>
        ${n("A model that's 2% more accurate on offline test might LOWER conversion in production. Why? Trained on different distribution, optimized for wrong objective, or accuracy doesn't map to user value. Always validate with online metrics.","insight")}
        ${c("You deploy a fraud detection model. Precision went up but customer complaints about declined cards spiked. What happened?","You optimized for precision (when you flag, you're right) at the expense of recall. The model is now confident but conservative — true fraud detected is high, but you're also missing fraud (false negatives). Wait — increased complaints suggests you're also flagging legit transactions more (false positives). Verify with confusion matrix in prod. Maybe the threshold shifted, or training data drifted.")}`}],keyTerms:["Batch vs real-time vs embedded","Model servers","Quantization","Distillation","Shadow / canary / A/B","GPU inference"],sources:["BentoML docs","KServe docs",'"Designing ML Systems" by Chip Huyen Ch 7']},monitoring:{track:"ml",title:"Model Monitoring & Drift",subtitle:"The model is deployed. Now what?",duration:"22 min read",difficulty:"Intermediate",sections:[{title:"What to Monitor",body:()=>`
        <p>Four layers, each catches different failures:</p>
        ${m({headers:["Layer","Watch for","Example metric"],rows:[["Infrastructure","Service down, slow","Latency p99, error rate, CPU/mem"],["Input data","Distribution shift","Feature mean/std vs training"],["Predictions","Output distribution shift","Fraction of positive predictions"],["Outcomes","Real accuracy in production","F1, conversion rate, click-through"]]})}`},{title:"Data Drift Detection",body:()=>`
        <p>Compare current input distribution to training distribution. If they diverge significantly, model accuracy is probably degrading.</p>
        <p><strong>Methods:</strong> KL divergence, PSI (Population Stability Index), Kolmogorov-Smirnov test, simple mean/std comparison.</p>
        <p>Set thresholds — e.g., alert if any feature's PSI > 0.2 over the last 24 hours. Investigate when triggered.</p>
        ${n("Drift detection ≠ accuracy monitoring. Drift might happen without accuracy dropping. Accuracy might drop without drift (concept drift — same inputs, different labels). Monitor both.","insight")}`},{title:"The Feedback Loop Problem",body:()=>`
        <p>You often don't know if a prediction was correct for a long time.</p>
        <ul>
          <li>Fraud detection: ground truth comes in days/weeks via chargebacks</li>
          <li>Recommendations: did user click? buy? in 7 days? 30?</li>
          <li>Medical diagnosis: outcome may take years</li>
        </ul>
        <p>This makes "live accuracy monitoring" hard. Proxies help: prediction confidence trends, agreement with other models, downstream business metrics.</p>`},{title:"Retraining Triggers",body:()=>`
        <p>When should you retrain? Three common policies:</p>
        ${m({headers:["Trigger","Pros","Cons"],rows:[["Scheduled (weekly, daily)","Predictable, simple","Wastes compute if no drift; too slow for fast drift"],["Drift-triggered","Retrains exactly when needed","Complex setup; may retrain on noisy signal"],["Performance-triggered","Driven by real degradation","Requires labeled ground truth (slow)"],["Continuous (online learning)","Always current","Risk of catastrophic forgetting, hard to audit"]]})}
        ${c("Your fraud model's precision/recall metrics look stable, but complaint volume just spiked. What's likely going on?","Concept drift. Fraudsters changed tactics. Your model still classifies confidently — but is increasingly wrong on the NEW patterns. The features it trusted no longer correlate with fraud. Metrics look stable because you're evaluating on yesterday's definition of fraud. Need fresh labels + retrain.")}`}],keyTerms:["Data drift","Concept drift","PSI / KL divergence","Prediction monitoring","Outcome monitoring","Retraining triggers","Feedback delay"],sources:["EvidentlyAI blog and docs",'"Reliable ML" by Cathy Chen et al',"Google Vertex AI monitoring docs"]},"ab-testing":{track:"ml",title:"A/B Testing for ML",subtitle:"How to know if your new model is actually better",duration:"20 min read",difficulty:"Intermediate",sections:[{title:"Why Offline Eval Isn't Enough",body:()=>`
        <p>You measure new model on test set: AUC up 2%. You deploy. Conversion drops 1%. What?</p>
        <p>Test set was collected under OLD model's behavior. New model changes user experience — which changes user behavior — which changes the data. Offline metrics can't capture this.</p>
        <p>The only way to know if a model change is good is to <strong>run it in production on real users and measure business metrics.</strong></p>`},{title:"A/B Test Setup",body:()=>`
        <p>Random assignment: each user (or session, or request) consistently routed to control (old model) or treatment (new model). Measure the metric you actually care about.</p>
        ${x({height:200,nodes:[{id:"u",x:50,y:90,w:70,h:30,label:"User"},{id:"split",x:170,y:90,w:90,h:40,label:"Splitter",sub:"50/50 by user_id",color:"#F5B842"},{id:"a",x:320,y:50,w:100,h:40,label:"Model A",sub:"control"},{id:"b",x:320,y:130,w:100,h:40,label:"Model B",sub:"treatment"},{id:"m",x:460,y:90,w:90,h:40,label:"Metrics",sub:"CTR, $$, etc",color:"#8FA876"}],edges:[{from:"u",to:"split"},{from:"split",to:"a"},{from:"split",to:"b"},{from:"a",to:"m"},{from:"b",to:"m"}],caption:"Random split, parallel serving, compare outcomes"})}`},{title:"Statistical Significance",body:()=>`
        <p>If you flip a coin 10 times and get 6 heads, is the coin biased? No — small samples are noisy. Same for A/B tests.</p>
        <p>Calculate <strong>sample size</strong> needed BEFORE running. Depends on: baseline conversion rate, minimum detectable effect (smallest difference worth caring about), statistical power (usually 0.8), significance level (usually 0.05).</p>
        ${n(`Don't peek and stop early. Deciding "test is done" when you happen to see significance inflates false positive rate. Pre-commit to sample size, then check at end.`,"warning")}`},{title:"Pitfalls",body:()=>`
        ${m({headers:["Pitfall","Fix"],rows:[["Test set used in offline eval is biased by old model","Run online A/B test"],["Network effects (treatment users influence control)","Cluster randomization (whole regions or social cohorts)"],["Novelty effect (users react to anything new)","Run test for at least 1-2 weeks, observe stabilization"],["Metric chosen poorly (engagement up, revenue down)","Define primary metric upfront, watch guardrail metrics"],["Multiple tests running simultaneously","Account for interactions or run sequentially"]]})}
        ${c("Your A/B test shows new model has 1% lift, p-value 0.04. Should you ship it?","Maybe — but check: is 1% lift worth the complexity? Was sample size pre-committed? Are guardrail metrics OK? Did you run for at least one full business cycle? Statistical significance ≠ practical significance ≠ shipping decision.")}`}],keyTerms:["Online vs offline metrics","Statistical significance","Sample size","p-value","Guardrail metrics","Novelty effect","Network effects"],sources:['"Trustworthy Online Controlled Experiments" by Kohavi, Tang, Xu',"Microsoft ExP team blog","Statsig and Eppo docs"]},"processes-threads":{track:"os",title:"Processes vs Threads",subtitle:"The two units of execution, and when to use each",duration:"22 min read",difficulty:"Foundational",sections:[{title:"The Difference",body:()=>`
        ${m({headers:["Property","Process","Thread"],rows:[["Memory","Own address space","Shared with siblings"],["Communication","IPC (pipes, sockets, shm)","Direct (shared memory)"],["Creation cost","Heavy (~ms)","Light (~μs)"],["Crash isolation","One process crash doesn't affect others","One thread crash kills the whole process"],["Use when","Strong isolation, security boundaries","Lightweight parallelism, shared state"]]})}
        ${x({height:200,nodes:[{id:"p1",x:60,y:60,w:120,h:110,label:"Process A",sub:"isolated"},{id:"t1",x:80,y:100,w:80,h:25,label:"Thread 1"},{id:"t2",x:80,y:130,w:80,h:25,label:"Thread 2"},{id:"p2",x:220,y:60,w:120,h:110,label:"Process B",sub:"isolated"}],edges:[],caption:"Processes are isolated; threads inside a process share memory"})}`},{title:"Why Threads Are Hard",body:()=>`
        <p>Shared memory means race conditions. Two threads incrementing the same counter can lose updates because <code>counter++</code> is actually <em>load, increment, store</em> — interleaving causes lost updates.</p>
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code>// Thread A         | Thread B
load counter (=5) |
                  | load counter (=5)
increment (=6)    |
                  | increment (=6)
store counter (=6)|
                  | store counter (=6)

// Final value: 6, should be 7. ONE INCREMENT LOST.</code></pre>
        <p>Fix: synchronization (mutex, atomic operations). Adding sync introduces deadlock risk, bottlenecks, and complexity.</p>`},{title:"Python's GIL",body:()=>`
        <p>CPython has a Global Interpreter Lock. Only one thread executes Python bytecode at a time. So Python threads <strong>don't give you CPU parallelism</strong>.</p>
        <p>They DO give you I/O concurrency — while one thread waits on a network read, another can run. Useful for I/O-bound work.</p>
        <p>For CPU-bound work, use <code>multiprocessing</code> (separate processes, no GIL) or call into C extensions (NumPy, etc.) that release the GIL.</p>`},{title:"Common Scaling Patterns",body:()=>`
        ${m({headers:["Workload","Best fit"],rows:[["CPU-bound (math, image processing)","Process pool (multiprocessing) or compiled C/Rust"],["I/O-bound (web requests, DB calls)","Threads or async (asyncio, Node, Go)"],["Mixed","Async I/O + process pool for CPU spikes"],["Massive concurrency (10K+ connections)","Async (event loop) or Go (goroutines)"]]})}
        ${c("Your Python web server handles 100 RPS fine. You add a CPU-heavy ML inference call per request. Now it crawls. Why?","GIL. Even with threads, ML inference holds the GIL, blocking other threads. Fix: process pool for inference, or offload to a separate service, or use a model server (TorchServe) that handles parallelism internally.")}`}],keyTerms:["Process vs thread","Address space","Race condition","GIL","CPU-bound vs I/O-bound","fork vs exec"],sources:['"Operating Systems: Three Easy Pieces" (free online)',"Real Python on concurrency","Python multiprocessing docs"]},concurrency:{track:"os",title:"Concurrency Primitives",subtitle:"Mutex, semaphore, condition variable — the synchronization toolkit",duration:"25 min read",difficulty:"Intermediate",sections:[{title:"Mutex (Mutual Exclusion)",body:()=>`
        <p>The basic lock. Only one thread can hold it at a time. Protect critical sections — code that touches shared state.</p>
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code>lock = threading.Lock()

def safe_increment():
    with lock:        # acquire on enter, release on exit
        counter[0] += 1</code></pre>
        ${n('Always use "with lock:" (Python) or RAII guards (C++). Manual lock/unlock leads to bugs where an exception path skips unlock and deadlocks everything.',"warning")}`},{title:"Read/Write Lock",body:()=>`
        <p>Many readers OK simultaneously. Writers exclusive. Used when reads vastly outnumber writes.</p>
        <p>Example: cache that's read 10,000 times per write. RWLock lets reads parallelize, writes serialize.</p>`},{title:"Semaphore",body:()=>`
        <p>Counter-based lock. Allows up to N concurrent holders. Used for limiting concurrent access to a resource.</p>
        <pre style="background: var(--bg-elevated); padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px;"><code># Limit to 10 concurrent DB connections
db_pool = threading.Semaphore(10)

def query(sql):
    with db_pool:        # waits if 10 already in flight
        return db.execute(sql)</code></pre>`},{title:"Condition Variable",body:()=>`
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
        <p>This is the classic producer/consumer pattern. Higher-level abstractions like <code>queue.Queue</code> in Python wrap this for you.</p>`},{title:"Deadlock — The Boogeyman",body:()=>`
        <p>Thread A holds lock 1, wants lock 2. Thread B holds lock 2, wants lock 1. Neither moves. Forever.</p>
        <p>Four conditions for deadlock (Coffman conditions): mutual exclusion, hold and wait, no preemption, circular wait. Break any one and deadlock is impossible.</p>
        <p>Practical rules:</p>
        <ul>
          <li>Always acquire multiple locks in a consistent order across threads</li>
          <li>Use lock timeouts where possible</li>
          <li>Prefer lock-free structures (atomic operations, immutable data, channels)</li>
        </ul>
        ${c("What's the difference between deadlock and livelock?","Deadlock: threads frozen waiting on each other. Livelock: threads active but making no progress (e.g., two threads politely yielding back and forth, never executing). Both are bad. Livelock harder to spot — CPU usage looks normal.")}`}],keyTerms:["Mutex","Semaphore","Read/Write lock","Condition variable","Critical section","Deadlock","Coffman conditions"],sources:['"OS Three Easy Pieces" concurrency section','"Java Concurrency in Practice" by Brian Goetz (concepts universal)',"Python threading docs"]},memory:{track:"os",title:"Memory — Stack, Heap, GC",subtitle:"Where your variables actually live",duration:"22 min read",difficulty:"Foundational",sections:[{title:"Stack vs Heap",body:()=>`
        ${m({headers:["Property","Stack","Heap"],rows:[["Allocation","Automatic (function call)","Manual (malloc / new)"],["Deallocation","Automatic (function return)","Manual (free) or GC"],["Speed","Very fast (pointer increment)","Slower (find free block)"],["Size","Small (~MB per thread)","Large (limited by RAM)"],["Lifetime","Scoped to function","As long as referenced"],["Holds","Local primitives, function frames","Objects, dynamic data structures"]]})}
        ${x({height:200,nodes:[{id:"s",x:80,y:50,w:120,h:130,label:"Stack",sub:"grows down ↓",color:"#7B9FB5"},{id:"h",x:280,y:50,w:120,h:130,label:"Heap",sub:"grows up ↑",color:"#F5B842"}],edges:[],caption:"Stack and heap grow toward each other in process memory"})}`},{title:"Garbage Collection",body:()=>`
        <p>Languages like Python, Java, Go free heap memory automatically by tracking object references. Three common strategies:</p>
        ${m({headers:["Algorithm","How","Where used"],rows:[["Reference counting","Each object tracks count of refs; free at 0","Python (primary), Swift"],["Mark-and-sweep","Walk from roots, mark reachable, sweep unmarked","Java HotSpot, V8"],["Generational","Young objects die fast; collect young gen frequently, old gen rarely","Java, V8, .NET"]]})}
        <p>Reference counting handles cycles poorly (Python uses a cycle detector for that). Mark-and-sweep handles cycles but pauses execution. Generational exploits the empirical observation that most objects die young.</p>`},{title:"Memory Leaks Despite GC",body:()=>`
        <p>GC doesn't prevent leaks — it prevents <em>unreachable</em> garbage from accumulating. If your code keeps a reference to something it no longer needs, GC can't help.</p>
        <ul>
          <li>Caches that grow unbounded</li>
          <li>Event listeners not removed</li>
          <li>Global lists you keep appending to</li>
          <li>Closures capturing large variables</li>
        </ul>
        ${n("In Node and Java, set max heap size and configure restarts on OOM. Leaks happen; survive them with auto-restart in K8s.","insight")}`},{title:"Manual Memory — When You Care",body:()=>`
        <p>C, C++, Rust force you to manage memory explicitly. Two paths:</p>
        <p><strong>C/C++.</strong> malloc/new + free/delete. Manual, error-prone, fast. Leaks if you forget free. Use-after-free if you free then access.</p>
        <p><strong>Rust.</strong> Ownership model. Compiler tracks who owns each piece of memory. Frees automatically when owner goes out of scope. No leaks, no use-after-free, no GC pauses.</p>
        ${c("Why is GC pause time often a problem for low-latency services?","Stop-the-world GC pauses can be 100ms+ on large heaps. For p99 latency targets of, say, 10ms, a single GC pause blows past it. Solutions: low-pause GCs (G1, ZGC, Shenandoah in Java), GC-free languages (Rust, C++), heap tuning to minimize allocation rate.")}`}],keyTerms:["Stack vs heap","Allocation / free","Garbage collection","Reference counting","Mark and sweep","Generational GC","Memory leak","Use-after-free"],sources:['"OS Three Easy Pieces" memory chapters','"What Every Programmer Should Know About Memory" by Ulrich Drepper',"Java Performance by Scott Oaks"]},"virtual-memory":{track:"os",title:"Virtual Memory & Paging",subtitle:"Why your 8GB laptop runs programs as if it had 128GB",duration:"22 min read",difficulty:"Intermediate",sections:[{title:"The Illusion",body:()=>`
        <p>Each process gets its own private address space — typically 256TB on 64-bit systems. Way more than physical RAM. How?</p>
        <p><strong>Virtual memory.</strong> The OS maps virtual addresses (what your program sees) to physical addresses (actual RAM). The mapping is managed in <strong>pages</strong> — typically 4KB chunks.</p>
        ${x({height:200,nodes:[{id:"v",x:50,y:80,w:120,h:40,label:"Virtual address",sub:"0x...8000"},{id:"pt",x:220,y:80,w:120,h:40,label:"Page Table",sub:"translation",color:"#F5B842"},{id:"p",x:390,y:80,w:120,h:40,label:"Physical RAM",sub:"frame 0x42",color:"#8FA876"}],edges:[{from:"v",to:"pt"},{from:"pt",to:"p"}],caption:"Every memory access goes through the page table"})}`},{title:"Paging & Swap",body:()=>`
        <p>When RAM fills up, the OS moves least-recently-used pages to disk (swap). When the program accesses one of these "swapped out" pages, the CPU raises a <strong>page fault</strong>. The OS reads the page back from disk into RAM (evicting something else).</p>
        <p>This is why your laptop slows to a crawl when low on RAM — every access becomes a disk read. Disk is ~100,000x slower than RAM.</p>`},{title:"TLB — The Cache Behind The Scenes",body:()=>`
        <p>Page table lookups are themselves memory accesses, which would themselves need page table lookups, recursively. Solution: the <strong>Translation Lookaside Buffer (TLB)</strong> — a tiny CPU cache of recent virtual-to-physical mappings.</p>
        <p>TLB hit: ~1 cycle. TLB miss: hundreds of cycles. Process context switches flush the TLB — one reason context switches are expensive.</p>`},{title:"Memory-Mapped Files (mmap)",body:()=>`
        <p>You can map a file directly into virtual address space. Now reading byte offset X in the file is the same as reading address (base + X). The OS handles loading pages from disk on demand.</p>
        <p>Used for: shared memory between processes, fast random access to large files (databases love this), zero-copy file serving.</p>
        ${n("Reading a 10GB file: read() copies into your buffer, then your code copies to its struct. mmap maps directly — zero copies. SQLite, LevelDB, RocksDB use mmap for this reason.","insight")}`},{title:"OOM Killer",body:()=>`
        <p>When Linux runs out of memory AND swap, the OOM killer picks a process to kill based on a heuristic score (memory usage + flags). Kernel kills it, frees memory, system survives.</p>
        <p>This is why your container suddenly disappears with no logs. Check <code>dmesg</code> for "Out of memory: Killed process". In K8s, OOMKilled appears in pod events.</p>
        ${c("Your service's memory grows steadily over hours, then gets OOMKilled. GC isn't freeing it. What's the diagnostic flow?","1) Confirm with metrics (memory_used over time). 2) Heap dump while running (jmap for Java, py-spy for Python). 3) Analyze for retained objects — usually unbounded cache, list, or queue. 4) Fix root cause (bounded cache, LRU eviction). 5) Set K8s resource limit + restart policy as safety net.")}`}],keyTerms:["Virtual memory","Page","Page table","Page fault","Swap","TLB","mmap","OOM killer"],sources:['"OS Three Easy Pieces" virtual memory chapters',"Linux kernel docs","Brendan Gregg memory analysis posts"]},"file-systems":{track:"os",title:"File Systems",subtitle:"How bytes on disk become files, directories, and durability",duration:"20 min read",difficulty:"Foundational",sections:[{title:"The Abstraction Layers",body:()=>`
        ${m({headers:["Layer","What","Example"],rows:[["File API","open/read/write/close","POSIX system calls"],["Virtual FS (VFS)","Unified interface over many FS types","Linux VFS layer"],["File system","On-disk layout: inodes, blocks, journals","ext4, xfs, zfs, btrfs"],["Block layer","I/O scheduling, caching, queues","Linux block layer"],["Device driver","Talks to specific hardware","NVMe driver, SATA driver"]]})}`},{title:"Inodes — Files Without Names",body:()=>`
        <p>A file is really an <strong>inode</strong>: metadata (size, permissions, timestamps, owner) + pointers to data blocks. The name is just a directory entry pointing to the inode.</p>
        <p>This is why <strong>hardlinks</strong> exist — multiple names for the same inode. Same file, two names. Delete one, file remains (inode kept until link count = 0).</p>
        <p><strong>Symlinks</strong> are different: a tiny file containing a path. Following a symlink resolves to whatever path points to (might be missing).</p>`},{title:"Durability — fsync is Real",body:()=>`
        <p>When you <code>write()</code>, data goes to the OS buffer cache, not disk. Power loss before flush = data gone.</p>
        <p><code>fsync(fd)</code> forces the data and metadata to actually hit disk. Slow (milliseconds) but durable.</p>
        <p>Databases call fsync after every commit. That's why transaction throughput is limited by disk fsync latency — and why putting WAL on a fast SSD matters.</p>
        ${n("Cloud disks may lie about fsync. AWS EBS, GCP PD, and Azure Disks all confirm writes before they're fully durable on the persistent layer. For paranoid use cases, replicate.","warning")}`},{title:"Journaling",body:()=>`
        <p>What happens if power fails mid-write? Without protection: filesystem can be corrupted (block written but inode not updated, or vice versa).</p>
        <p><strong>Journaling.</strong> Filesystem writes intended changes to a journal first, then applies them to the actual structures. On crash, replay journal to get to a consistent state. ext4, NTFS, xfs all journal.</p>`},{title:"Caching & The Page Cache",body:()=>`
        <p>Linux aggressively caches file data in unused RAM. <code>htop</code> shows "buff/cache" — this is the page cache.</p>
        <p>Reading a recently-read file = cache hit, no disk I/O. Writing is buffered; flush happens later (or on fsync).</p>
        <p>This is why benchmarking IO with "first run" gives wildly different numbers than "second run" — and why "free" Linux memory is misleading. The kernel will release page cache instantly if processes need RAM.</p>
        ${c("Your service writes records to a file, calls write() not fsync(). Power outage. What did you lose?","Up to seconds of writes. Linux flushes dirty pages every ~5s by default (vm.dirty_writeback_centisecs). On crash, anything in buffer cache but not yet flushed is gone. Fix: call fsync() after critical writes, accept the latency hit.")}`}],keyTerms:["Inode","Hardlink / symlink","Block","fsync","Journal","Page cache","POSIX file API"],sources:['"OS Three Easy Pieces" file system chapters',"ext4 wiki","Bryan Cantrill talks on file systems"]},"time-clocks":{track:"dist",title:"Time & Clocks",subtitle:'Why "what happened first" is hard in distributed systems',duration:"22 min read",difficulty:"Intermediate",sections:[{title:"The Problem",body:()=>`
        <p>One computer: time is easy. Two computers in different datacenters: their clocks differ by milliseconds, sometimes seconds. Wall-clock timestamps are not a reliable ordering of events across machines.</p>
        <p><strong>Worse:</strong> NTP can move time backwards. If you log "event A at 10:00:05" and "event B at 10:00:03" you can't conclude B happened first.</p>`},{title:"Lamport Clocks",body:()=>`
        <p>Leslie Lamport's insight: we don't need real time. We need <strong>logical time</strong> — an ordering that respects causality.</p>
        <p>Each process keeps an integer counter. Rules:</p>
        <ol>
          <li>On any local event, increment counter</li>
          <li>On send, attach counter to message</li>
          <li>On receive, counter = max(local, received) + 1</li>
        </ol>
        <p>Result: if event A caused B, then A's timestamp < B's timestamp. (Inverse not guaranteed — two unrelated events can have any order.)</p>`},{title:"Vector Clocks",body:()=>`
        <p>Lamport tells you "A → B" implies "ts(A) < ts(B)". <strong>Vector clocks</strong> tell you exact causal relationships.</p>
        <p>Each process holds a vector [count from each process]. On send, increment own, send vector. On receive, take elementwise max + increment own.</p>
        <p>Compare two vector clocks V1 and V2:</p>
        <ul>
          <li>V1 ≤ V2 everywhere → V1 happened before V2</li>
          <li>V1 ≥ V2 everywhere → V2 happened before V1</li>
          <li>Neither → events are concurrent (no causal relationship)</li>
        </ul>
        ${n(`Vector clocks underpin Dynamo-style databases. Multiple concurrent writes to same key produce multiple "vector clock siblings" — system can't auto-merge, returns all to client.`,"info")}`},{title:"Real-World Time: TrueTime",body:()=>`
        <p>Google's Spanner solves "what really happened first" using <strong>TrueTime</strong> — APIs that return time with explicit uncertainty bounds.</p>
        <p>Implementation: GPS + atomic clocks in every datacenter. API returns "TT.now() = [earliest, latest]". To order events globally, wait out the uncertainty interval. Costs latency but enables externally-consistent transactions.</p>
        ${c("Why don't we just sync clocks with NTP and use timestamps?",'NTP can be off by tens of ms even on good days, more under load. Timestamps can go BACKWARDS. Two events at different machines with "different" NTP-synced timestamps might have happened in either order. For ordering, use logical clocks. For real time with bounded error, use TrueTime-style systems.')}`}],keyTerms:["Wall clock","NTP","Logical clock","Lamport clock","Vector clock","Causal order","Concurrent events","TrueTime"],sources:['Leslie Lamport "Time, Clocks, and the Ordering of Events" (1978)',"Designing Data-Intensive Applications Ch 8-9","Spanner paper"]},consensus:{track:"dist",title:"Consensus — Paxos & Raft",subtitle:"How distributed systems agree on anything",duration:"25 min read",difficulty:"Advanced",sections:[{title:"The Problem",body:()=>`
        <p>N machines need to agree on a single value (next leader, transaction order, config update). Network can drop messages. Machines can crash and restart. How do you get them to all decide the same thing?</p>
        <p>This is the <strong>consensus problem</strong>. It's one of the foundational problems in distributed systems. Solutions are infamously difficult to implement correctly.</p>
        ${n('FLP impossibility: in an async network with at least one crash, no algorithm can guarantee both safety AND liveness. Real systems work around it by assuming the network is "usually" responsive.',"info")}`},{title:"Paxos — The Original",body:()=>`
        <p>Leslie Lamport, 1989. Mathematically beautiful. Famously incomprehensible from the original paper. Used in production by Google's Chubby, Spanner, etc.</p>
        <p>High level: two phases per decision. Prepare (proposer asks acceptors to promise). Accept (proposer sends value, acceptors accept if their promise hasn't been superseded). A value is "chosen" when a majority accepts it.</p>
        <p>Why it works: any future proposer learns of chosen values through the promise mechanism. Any two majorities overlap, so chosen values can't be lost.</p>`},{title:"Raft — The Understandable One",body:()=>`
        <p>Diego Ongaro and John Ousterhout, 2014. Explicit design goal: be understandable. Same guarantees as Paxos. Used by etcd, Consul, TiKV, CockroachDB.</p>
        <p>Three pieces:</p>
        <p><strong>Leader election.</strong> One leader at a time. If leader dies, followers timeout and start election. Highest-ranked candidate (by log up-to-date-ness) wins.</p>
        <p><strong>Log replication.</strong> Clients send commands to leader. Leader appends to its log, replicates to followers. Once a majority has it, leader commits and tells followers.</p>
        <p><strong>Safety.</strong> Strict rules about what can be elected and what can be committed prevent the cluster from forgetting decisions.</p>
        ${W({actors:["Client","Leader","Follower 1","Follower 2"],height:280,messages:[{from:0,to:1,label:"SET x=5"},{from:1,to:2,label:"AppendEntries(x=5)"},{from:1,to:3,label:"AppendEntries(x=5)"},{from:2,to:1,label:"ACK",return:!0},{from:3,to:1,label:"ACK",return:!0},{from:1,to:0,label:"OK (committed)",return:!0}],caption:"Raft commit: leader writes locally, replicates, waits for majority, acks client"})}`},{title:"When You'll Touch This",body:()=>`
        <p>You almost certainly will not implement Raft. You WILL configure systems that use it:</p>
        <ul>
          <li>etcd cluster for K8s — must have odd number of nodes (3, 5, 7) to form quorum</li>
          <li>Kafka with KRaft — Zookeeper-free Kafka uses Raft for metadata</li>
          <li>CockroachDB / TiKV — Raft per shard</li>
          <li>Consul — Raft for service discovery state</li>
        </ul>
        <p>Operationally, the things to know: needs odd node count (majority), tolerates floor((N-1)/2) failures, leader is bottleneck for writes, performance suffers if network is flaky.</p>
        ${c("Your 3-node etcd cluster has 1 node down. K8s still works fine. You take a second down for maintenance. K8s freezes. Why?","3 nodes can tolerate 1 failure (majority = 2). With 2 down, only 1 left, can't form majority. Raft refuses to commit anything. K8s API server depends on etcd writes for any state change. Always run odd # of nodes and never take multiple down simultaneously.")}`}],keyTerms:["Consensus","Paxos","Raft","Leader election","Log replication","Quorum / majority","FLP impossibility","Split-brain"],sources:["Raft paper (raft.github.io)","Diego Ongaro's Raft talk on YouTube","Designing Data-Intensive Applications Ch 9"]},"consistency-models":{track:"dist",title:"Consistency Models",subtitle:"Strong, eventual, causal, and the spectrum between",duration:"22 min read",difficulty:"Advanced",sections:[{title:"The Spectrum",body:()=>`
        <p>"Consistency" is not one thing. It's a spectrum from strong (single-machine illusion) to weak (basically anything goes). Stronger models are easier to reason about but more expensive. Weaker models scale better but require more care.</p>
        ${m({headers:["Model","Guarantee","Cost"],rows:[["Linearizable","Reads see latest write, globally","High — coordination per op"],["Sequential","All operations in same order across nodes","Lower than linearizable"],["Causal","Causally-related ops in order; concurrent ops can differ","Cheaper"],["Eventual","Eventually all replicas converge","Cheapest"]]})}`},{title:"Linearizable — The Gold Standard",body:()=>`
        <p>System behaves as if there's a single copy, and every operation happens atomically at some point between its start and finish. Once a write commits, ALL subsequent reads see it.</p>
        <p>This is what you want for: bank balances, inventory, leader election, unique IDs.</p>
        <p>Costs: cross-region writes need consensus, latency = network round-trip × 2+, throughput limited by leader.</p>`},{title:"Eventual Consistency",body:()=>`
        <p>Given no new writes, all replicas eventually return the same value. No bound on "eventually" — could be 100ms, could be 10 minutes during a network partition.</p>
        <p>OK for: like counts, view counts, recommendations, search indexes.</p>
        <p>NOT OK for: inventory ("we have 5 widgets" sold to two customers), authentication tokens, monetary balances.</p>
        ${n(`Eventual consistency is fine for human-facing reads where slight staleness is invisible. It's catastrophic for read-your-own-writes UX. "I just posted, where's my post?" "I just enabled feature, why isn't it on?"`,"warning")}`},{title:"Read-Your-Own-Writes",body:()=>`
        <p>A weaker-than-linearizable but stronger-than-eventual model: after you write, YOUR subsequent reads see it. Other users might see stale data briefly.</p>
        <p>Implementations:</p>
        <ul>
          <li>Pin user to primary for N seconds after write</li>
          <li>Pass a "version vector" in cookie; route reads to nodes with that version</li>
          <li>Cache writes client-side, merge with reads</li>
        </ul>`},{title:"Choosing",body:()=>`
        ${m({headers:["Use case","Model"],rows:[["Auth tokens, sessions","Linearizable or read-your-writes"],["User profile (you edit yours)","Read-your-writes"],["Comments on a post","Eventual + read-your-writes for author"],["Real-time chat","Causal (cause/reply order matters)"],["Analytics, metrics","Eventual"],["Banking","Linearizable, with consensus"]]})}
        ${c('Your social app shows "5 likes" everywhere on page load. User likes the post, count stays at 5 briefly, then updates to 6. What consistency level is this and is it OK?',"Eventual consistency on the like count, optimized for read throughput (likely cached). UX could be improved by showing the user's OWN like immediately (optimistic UI) while async-confirming with backend (read-your-writes for the user). Other users' counts can still be eventually consistent — they don't notice the lag.")}`}],keyTerms:["Linearizability","Sequential consistency","Causal consistency","Eventual consistency","Read-your-writes","Monotonic reads","Quorum reads/writes"],sources:["Designing Data-Intensive Applications Ch 9","Jepsen.io consistency reports",`"Consistency Models" by Adya, Liskov, O'Neil`]},"distributed-txns":{track:"dist",title:"Distributed Transactions",subtitle:'2PC, sagas, and why "ACID across services" is hard',duration:"25 min read",difficulty:"Advanced",sections:[{title:"The Problem",body:()=>`
        <p>Inside one database, transactions are easy — the DB engine handles ACID. Across multiple services or databases, you have to coordinate yourself. Three approaches: 2PC, sagas, and "don't."</p>`},{title:"Two-Phase Commit (2PC)",body:()=>`
        <p>Strong consistency across services. Coordinator asks each participant "can you commit?", waits for all YES, then tells everyone "commit." Any NO → tell everyone "abort."</p>
        ${W({actors:["Coordinator","Service A","Service B"],height:280,messages:[{from:0,to:1,label:"Phase 1: prepare?"},{from:0,to:2,label:"Phase 1: prepare?"},{from:1,to:0,label:"YES",return:!0},{from:2,to:0,label:"YES",return:!0},{from:0,to:1,label:"Phase 2: commit"},{from:0,to:2,label:"Phase 2: commit"}],caption:"2PC: prepare phase ensures all can commit before committing"})}
        <p><strong>The killer flaw:</strong> if coordinator dies between phase 1 and 2, participants are stuck. They've voted YES (so they can't abort) but haven't been told to commit. They hold locks indefinitely.</p>
        <p>This is why 2PC is rarely used in modern systems. Latency is bad, failure modes are scary.</p>`},{title:"Sagas — The Modern Answer",body:()=>`
        <p>Break the distributed transaction into a sequence of local transactions, each with a <strong>compensating action</strong> that undoes it. If any step fails, run the compensations of completed steps.</p>
        <p>Example: book trip = (reserve flight, reserve hotel, charge card). If charge fails, run cancel-hotel and cancel-flight.</p>
        ${x({height:200,nodes:[{id:"f",x:50,y:100,w:90,h:40,label:"Reserve flight",color:"#8FA876"},{id:"h",x:180,y:100,w:90,h:40,label:"Reserve hotel",color:"#8FA876"},{id:"c",x:310,y:100,w:90,h:40,label:"Charge card",color:"#E07856"},{id:"ch",x:180,y:50,w:90,h:30,label:"Cancel hotel"},{id:"cf",x:50,y:50,w:90,h:30,label:"Cancel flight"}],edges:[{from:"f",to:"h"},{from:"h",to:"c"},{from:"c",to:"ch",label:"on fail"},{from:"ch",to:"cf"}],caption:"Saga: forward path commits step-by-step; failure triggers compensation chain"})}
        <p>No global locks. Each local transaction commits immediately. Trade-off: temporary inconsistency is visible (briefly, the hotel is booked but the flight isn't paid for).</p>`},{title:"Outbox Pattern — Reliable Async",body:()=>`
        <p>How do you reliably publish events when you update a DB? "Update DB, then publish message" can fail between the two steps — DB updated but event lost.</p>
        <p><strong>Outbox.</strong> In the same DB transaction, write the message to an "outbox" table. A separate process polls the outbox and publishes. If publish fails, retry until success. Idempotent consumers handle duplicates.</p>
        <p>Used everywhere modern microservices need reliable event publishing. CDC (Change Data Capture) tools like Debezium implement this pattern.</p>`},{title:"When You Can Avoid All This",body:()=>`
        <p>The honest truth: distributed transactions are painful, so well-designed systems avoid them. Strategies:</p>
        <ul>
          <li>Co-locate related data in one DB so local transactions cover the work</li>
          <li>Make operations idempotent and eventually-consistent</li>
          <li>Design around the failure mode — accept temporary inconsistency for non-critical operations</li>
        </ul>
        ${c('Why do banks tolerate "pending" transactions visible for hours rather than using 2PC for instant consistency?',`Reliability over consistency. 2PC would make the system fragile — any coordinator failure freezes funds. Instead: locally commit "pending" status, async settle later, reconcile end-of-day. Customers see "pending" UX that's well-understood. Banks have been doing this since long before computers.`)}`}],keyTerms:["2PC (two-phase commit)","Saga","Compensating action","Outbox pattern","CDC (Change Data Capture)","Idempotency","Distributed lock"],sources:['"Designing Data-Intensive Applications" Ch 9',"Chris Richardson's microservices.io patterns",'Pat Helland "Life Beyond Distributed Transactions" paper']},"star-framework":{track:"int",title:"STAR Framework for Behavioral",subtitle:"How to tell your stories so they actually land",duration:"15 min read",difficulty:"Foundational",sections:[{title:"Why Structure Matters",body:()=>`
        <p>Behavioral questions test pattern matching: have you done this kind of thing before? Interviewers grade on specifics, not adjectives. "I led a project" tells them nothing. "I led a project where I migrated 30 microservices from VMs to Kubernetes over 4 months, reducing deploy time from 45 min to 6 min" tells them everything.</p>
        <p>STAR is just a recipe to force specifics.</p>`},{title:"The Recipe",body:()=>`
        ${m({headers:["Letter","What you say","Time"],rows:[["S - Situation","Brief context: company, team, what was happening","15 sec"],["T - Task","What you specifically owned","15 sec"],["A - Action",'What YOU did (not "we") — be specific',"60-90 sec"],["R - Result","Quantified outcome + lesson","30 sec"]]})}
        ${n('Spend the most time on Action. Interviewers want to know what YOU did, not what the team did. Use "I" much more than "we" — your interviewer is hiring YOU.',"insight")}`},{title:'Example — "Tell me about a difficult problem"',body:()=>`
        <p><strong>Bad version:</strong> "At SAIC we had a CI pipeline that was slow. I worked with my team to optimize it and it got better."</p>
        <p><strong>STAR version:</strong></p>
        <p><em>S:</em> "At SAIC I was on a team running CI for 50+ developers. Build times had crept from 8 minutes to 22 minutes over 6 months."</p>
        <p><em>T:</em> "I was asked to investigate and propose fixes."</p>
        <p><em>A:</em> "I started by adding metrics to break down build time by stage. Found 60% was Docker image rebuilds because we weren't using layer caching. I refactored the Dockerfile to put dependencies before code. Then I noticed unit tests ran serially even though they were independent — split them across 4 parallel jobs in Azure DevOps. Finally, I added a build artifact cache so deps weren't re-downloaded every run."</p>
        <p><em>R:</em> "Build time dropped from 22 min to 6 min, saving the team ~3 dev-hours per day. I documented the patterns in our wiki so other teams could apply them."</p>
        <p>Notice: specific tools, specific numbers, specific actions YOU took, concrete outcome with measurement.</p>`},{title:"Stories To Have Ready",body:()=>`
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
        ${c(`Interviewer asks "Tell me about a time you disagreed with your manager." You don't want to throw your manager under the bus. How do you structure this?`,"Pick a respectful disagreement. Situation: technical decision your manager favored. Action: gathered data, presented alternative with trade-offs, listened to their reasoning, found a middle path or agreed to disagree professionally. Result: outcome (your idea won, theirs won and you supported it, you compromised). Always frame the manager respectfully — interviewer is imagining themselves as your future manager.")}`}],keyTerms:["STAR","Situation / Task / Action / Result","I vs we","Quantified outcomes","Story bank"],sources:['"Cracking the Coding Interview" behavioral chapters',"Amazon's Leadership Principles (every Amazon-influenced company uses some version)","Practice on Pramp, interviewing.io"]},negotiation:{track:"int",title:"Salary Negotiation",subtitle:"The single highest-ROI conversation of your career",duration:"18 min read",difficulty:"Foundational",sections:[{title:"The Math",body:()=>`
        <p>You're going to be paid for ~40 years. A 10% higher starting salary, compounded with 4% raises, is roughly $300K-$500K more lifetime earnings depending on field. The negotiation conversation takes 1 hour. That's the highest hourly rate of your life.</p>
        ${n("Every dollar you negotiate up now propagates forward. Future raises are percentages of your current salary. Future job offers anchor on your current salary. Compound interest of negotiation.","insight")}`},{title:"The Rules",body:()=>`
        <p><strong>1. Never give a number first.</strong> The first number anchors the rest of the negotiation. If forced: "I'd like to understand more about the role and the comp structure before discussing numbers." If REALLY forced: give a range with your target as the bottom.</p>
        <p><strong>2. Always negotiate.</strong> Even if the offer feels good. Recruiters expect it; the worst case is "this is our best offer." You will never get less for asking.</p>
        <p><strong>3. Have a competing offer or signal market value.</strong> "I'm in late stages with two other companies" is the single most powerful phrase. Even without a competing offer: "Levels.fyi shows the median for this level at $X" is data.</p>
        <p><strong>4. Negotiate the package, not just base.</strong> Sign-on bonus, equity refresh, equity vesting cliff, relocation, target bonus %, extra PTO. Some companies can't flex base but CAN flex sign-on.</p>`},{title:"The Script",body:()=>`
        <p>Recruiter: "We'd like to offer you $X base, $Y RSUs, $Z sign-on."</p>
        <p>You: "Thank you so much, I'm really excited about this opportunity. I want to take a couple days to consider and review the details. Can I get back to you by [date]?"</p>
        <p>(Time creates leverage. Never accept on the call.)</p>
        <p>Two days later: "I'm really enthusiastic about joining. Based on my research and the other conversations I'm having, I was hoping we could land closer to $X+15% base, with the sign-on adjusted to bridge the equity vesting cliff. Is there flexibility on those?"</p>
        <p>(Specific ask. Justification. Open question that invites a counter.)</p>`},{title:"What Not To Do",body:()=>`
        <ul>
          <li><strong>Don't reveal your current salary</strong> unless you're in a state that requires it. "I'd rather discuss the market rate for this role and my expectations" — illegal to ask in many jurisdictions now (CA, NY, etc.)</li>
          <li><strong>Don't lie about competing offers.</strong> Reputable companies will sometimes ask for proof. Caught = offer rescinded.</li>
          <li><strong>Don't negotiate small.</strong> "Could we do $96K instead of $95K?" wastes everyone's time and signals you don't know your value. Ask for 15-25% more or don't bother.</li>
          <li><strong>Don't threaten.</strong> "If you can't do $X I'm walking" only works if you'll actually walk. Better: "I'd need X to make this work over my other options."</li>
        </ul>
        ${c("You get an offer $20K below your target. You're excited about the role and don't have a competing offer. What do you say?",`Use market data: "I've been looking at Levels.fyi data for L4 SWEs at companies of similar size, and the median I'm seeing is $X. Could we get closer to that?" If no flex on base, ask about sign-on bonus or extra equity. If no flex anywhere and the offer's still good — take it. Negotiating shows you value yourself; failing to negotiate signals the opposite.`)}`}],keyTerms:["Anchoring","Competing offer","Total comp","Sign-on bonus","Refresh grants","Vesting cliff","Levels.fyi"],sources:['"10 Rules for Negotiating a Job Offer" by Haseeb Qureshi (essential read)',"Levels.fyi for benchmarking",'Patrick McKenzie "Salary Negotiation"']},"interview-loop":{track:"int",title:"The Big Tech Interview Loop",subtitle:"What to expect across 5-6 rounds and how to prepare",duration:"20 min read",difficulty:"Foundational",sections:[{title:"The Standard Loop",body:()=>`
        ${m({headers:["Stage","What","Cuts"],rows:[["Recruiter screen","30 min phone — about your background, salary expectations","Reject if obviously not a fit"],["Online assessment","HackerRank-style coding, 1-2 problems","Filter mass applicants"],["Tech screen","60 min coding interview, often DSA + design","Filter to onsite-worthy"],["Onsite (virtual)","4-5 back-to-back interviews: 2 coding, 1-2 system design, 1 behavioral","The real decision"],["Hiring committee","You don't see this — they review all signals","Final yes/no"],["Offer + negotiation","See the negotiation lesson","-"]]})}`},{title:"What Each Round Actually Tests",body:()=>`
        <p><strong>Coding rounds.</strong> Can you write working code in 45 min on an unfamiliar problem? Communication is graded as heavily as correctness. Think out loud. Discuss trade-offs. Test your own code.</p>
        <p><strong>System design.</strong> Can you architect a non-trivial system without freezing? See the SD Mock Week lesson — RESHADED framework, talk through trade-offs.</p>
        <p><strong>Behavioral.</strong> Are you someone people want to work with? Use STAR. Have stories ready for the standard themes. Show humility on failures, leadership without arrogance.</p>`},{title:"Common Mistakes",body:()=>`
        ${m({headers:["Mistake","Fix"],rows:[["Jumping into code without clarifying","5 min on requirements/edge cases up front. Always."],["Silent thinking",`Narrate. "I'm thinking about whether to use a hashmap or sort first..."`],["No tests / examples","After you write code, trace through with an example."],["Defending wrong code","If interviewer hints something is off, treat it as gold. They're trying to help."],["Asking for the answer",`"I'm stuck on X. Can you give me a hint?" is OK once. Don't do it twice.`],["Ignoring time pressure","Get something working, then optimize. Working O(n²) > nothing."]]})}`},{title:"Preparation Timeline",body:()=>`
        <p>For someone with your background (DevSecOps L2, going to UPenn), realistic prep:</p>
        ${m({headers:["Time","Focus"],rows:[["3 months out","~80 NeetCode problems. Master 5-10 patterns deeply."],["2 months out","NeetCode 150 grind. Add system design (1 problem/week)."],["1 month out","Mock interviews (Pramp, peers). Behavioral story bank."],["2 weeks out","Re-do hardest patterns. Practice timing."],["Week of","Lighter prep. Sleep. Mock the day before to warm up."]]})}
        ${n("Don't aim to solve every NeetCode 150 perfectly. Aim to recognize 80% of LeetCode mediums as variants of patterns you've internalized. Pattern recognition > memorization.","insight")}
        ${c("You get to the onsite. You bomb the second coding round badly. Should you give up the rest?","Absolutely not. Each round is evaluated independently, and a strong showing on the remaining 3 rounds can outweigh one bad round. Also, interviewers calibrate differently — what FEELS like a bomb to you might actually be a borderline. Show up to the next round fresh and focused. Many offers come from candidates who had one rough round.")}`}],keyTerms:["Recruiter screen","Tech screen","Onsite loop","Hiring committee","Leveling","Calibration","Bar raiser (Amazon)"],sources:['"Cracking the Coding Interview" by Gayle McDowell',"Tech Interview Handbook (techinterviewhandbook.org)","Levels.fyi salaries + interview reports"]}},H={"networking-fundamentals":{title:"Networking Fundamentals",subtitle:"How bytes actually get from your laptop to a server in Virginia",duration:"25 min read",difficulty:"Foundational",sections:[{title:"The Layered Model",body:()=>`
        <p>Every system you build sends bytes over a network. The mental model that matters: <strong>data gets wrapped in layers on send. Each layer adds a header. Each layer unwraps on receive.</strong></p>
        <p>You don't need all 7 OSI layers. You need the four that show up in real systems: <code>HTTP</code> (application), <code>TLS</code> (encryption), <code>TCP</code> (transport), <code>IP</code> (network).</p>
        ${x({height:220,nodes:[{id:"app",x:70,y:100,w:100,h:40,label:"HTTP",sub:"application"},{id:"tls",x:200,y:100,w:100,h:40,label:"TLS",sub:"encryption"},{id:"tcp",x:330,y:100,w:100,h:40,label:"TCP",sub:"transport",color:"#7B9FB5"},{id:"ip",x:70,y:180,w:100,h:40,label:"IP",sub:"network",color:"#8FA876"},{id:"eth",x:200,y:180,w:100,h:40,label:"Ethernet",sub:"link",color:"#B888C0"}],edges:[{from:"app",to:"tls",label:"wraps"},{from:"tls",to:"tcp",label:"wraps"},{from:"tcp",to:"ip",label:"wraps"},{from:"ip",to:"eth",label:"wraps"}],caption:"Send path: each layer wraps the payload in its own header"})}
        ${n("When debugging, ask which layer is broken. L7 issues look very different from L4. Your nginx is L7. Your firewall rules are L3/L4.","insight")}`},{title:"TCP vs UDP",body:()=>`
        ${m({headers:["Trait","TCP","UDP"],rows:[["Connection","Yes — 3-way handshake first","No — just send"],["Ordered delivery","Guaranteed","No guarantee"],["Retransmission","Automatic on loss","Your problem"],["Overhead per packet","~40 bytes header + state","~8 bytes header"],["Use cases","HTTP, SSH, email, anything correct","Video calls, DNS, game state, streaming"]]})}
        <p>The mental model: <strong>TCP is certified mail. UDP is a postcard.</strong></p>`},{title:"The 3-Way Handshake",body:()=>`
        ${W({actors:["Client","Server"],messages:[{from:0,to:1,label:"SYN (seq=x)"},{from:1,to:0,label:"SYN-ACK (seq=y, ack=x+1)"},{from:0,to:1,label:"ACK (ack=y+1)"},{from:0,to:1,label:"── data flows ──"}],caption:"TCP 3-way handshake — one round-trip before any data moves"})}
        <p>Why three messages? Each side must confirm the other can both send and receive. The first SYN proves the client can send. The SYN-ACK proves the server can receive and send. The final ACK proves the client can receive.</p>
        ${n("HTTP/2 multiplexes many requests over one TCP connection precisely to avoid this handshake repeatedly. HTTP/3 (over QUIC/UDP) avoids it entirely on reconnect.","info")}
        ${c("Your service has 1,000 RPS and you make a new TCP connection per request to a DB 50ms away. What's your wasted latency per second?","50ms × 1,000 = 50 seconds of latency. That's why connection pooling matters: reuse the handshake.")}`},{title:"HTTP Versions",body:()=>`
        ${m({headers:["Version","Transport","Big improvement"],rows:[["HTTP/1.1","TCP","Keep-alive — reuse one connection for multiple requests"],["HTTP/2","TCP + binary","Multiplexing — many requests in flight on one connection"],["HTTP/3","QUIC over UDP","No handshake on reconnect; head-of-line blocking gone"]]})}
        ${n(`"HTTP/3 uses UDP" sounds wrong but is correct. QUIC implements TCP-like reliability on top of UDP because TCP's in-kernel implementation is slow to evolve.`,"info")}`}],keyTerms:["OSI layers","TCP vs UDP","3-way handshake","HTTP/1.1 vs /2 vs /3","keep-alive","multiplexing","connection pooling"],sources:["NeetCode SD Course — Networking Essentials","Grokking SD Fundamentals — Network Protocols",'Ilya Grigorik, "High Performance Browser Networking"']},"dns-cdn":{title:"DNS & CDNs",subtitle:"How a URL becomes an IP, and how content lives near your users",duration:"20 min read",difficulty:"Foundational",sections:[{title:"DNS — The Phone Book",body:()=>`
        <p>DNS turns <code>github.com</code> into <code>140.82.121.4</code>. It's a hierarchical distributed database, designed so no single server holds all of it.</p>
        <p>The hierarchy: <strong>root → TLD → authoritative.</strong> For <code>api.example.com</code>: root knows who handles <code>.com</code>, the <code>.com</code> TLD knows who handles <code>example.com</code>, and the authoritative server knows the IP for <code>api</code>.</p>
        ${W({actors:["Your machine","Resolver","Root",".com TLD","example.com NS"],height:320,messages:[{from:0,to:1,label:"where is api.example.com?"},{from:1,to:2,label:"where is .com?"},{from:2,to:1,label:"try TLD server",return:!0},{from:1,to:3,label:"where is example.com?"},{from:3,to:1,label:"try authoritative NS",return:!0},{from:1,to:4,label:"where is api?"},{from:4,to:1,label:"140.82.121.4",return:!0},{from:1,to:0,label:"140.82.121.4 (TTL=300)",return:!0}],caption:"Recursive resolution: resolver does the legwork, caches for the TTL"})}`},{title:"Why CDNs Exist",body:()=>`
        <p>New York to Sydney takes ~80ms at the speed of light through fiber, and real networks add more. If every user fetched your homepage from Virginia, users in Singapore would wait half a second before anything loaded.</p>
        <p>A <strong>CDN</strong> places copies of static content at hundreds of edge locations. User hits nearest edge. Edge fetches from origin only on cache miss.</p>
        ${x({height:220,nodes:[{id:"u1",x:50,y:50,w:70,h:30,label:"User SG"},{id:"u2",x:50,y:130,w:70,h:30,label:"User UK"},{id:"e1",x:200,y:50,w:80,h:30,label:"Edge SG"},{id:"e2",x:200,y:130,w:80,h:30,label:"Edge UK"},{id:"origin",x:380,y:90,w:100,h:40,label:"Origin",sub:"US East",color:"#8FA876"}],edges:[{from:"u1",to:"e1",label:"5ms"},{from:"u2",to:"e2",label:"8ms"},{from:"e1",to:"origin",label:"miss only"},{from:"e2",to:"origin",label:"miss only"}],caption:"Edges serve cached responses fast; origin only sees misses"})}`},{title:"Push vs Pull CDN",body:()=>`
        ${m({headers:["Approach","How","When"],rows:[["Pull CDN","Fetches from origin on first request, caches with TTL","Default — works for most sites"],["Push CDN","You upload content explicitly (e.g. S3 + CloudFront)","Static assets you control"]]})}
        ${n("TTLs are a trade-off. Long TTL = great cache hit ratio but stale content. Use cache-busting URLs (foo.css?v=abc123) when you ship.","insight")}`},{title:"Anycast Routing",body:()=>`
        <p>How does CDN traffic get to the nearest edge? <strong>Anycast.</strong> The same IP is announced from many locations via BGP. The internet routes packets to the topologically-closest one.</p>
        <p>This is what makes Cloudflare's <code>1.1.1.1</code> resolver feel local everywhere — ~300 datacenters all announcing the same IP.</p>
        ${c("Why does a CDN reduce load on your origin, not just latency?","99% of requests are cache hits served from edge. Your origin only sees misses (first request per edge, or past-TTL).")}`}],keyTerms:["DNS hierarchy","TTL","CDN","Edge location","Origin","Pull vs push CDN","Anycast","BGP"],sources:["Cloudflare Learning Center on DNS","Grokking SD Fundamentals — CDN","AWS CloudFront docs"]},"load-balancers":{title:"Load Balancers",subtitle:"The traffic cop between users and your servers",duration:"20 min read",difficulty:"Foundational",sections:[{title:"What Problem They Solve",body:()=>`
        <p>One server can handle ~10,000 concurrent connections before it crawls. Your app has 1,000,000 users. The math says you need many servers. Now: <strong>which server handles this user's request?</strong></p>
        ${x({height:220,nodes:[{id:"u1",x:50,y:60,w:70,h:30,label:"User",sub:"A"},{id:"u2",x:50,y:110,w:70,h:30,label:"User",sub:"B"},{id:"u3",x:50,y:160,w:70,h:30,label:"User",sub:"C"},{id:"lb",x:230,y:110,w:100,h:50,label:"Load Balancer",sub:"nginx / HAProxy"},{id:"b1",x:410,y:60,w:60,h:30,label:"app-1"},{id:"b2",x:410,y:110,w:60,h:30,label:"app-2"},{id:"b3",x:410,y:160,w:60,h:30,label:"app-3"}],edges:[{from:"u1",to:"lb"},{from:"u2",to:"lb"},{from:"u3",to:"lb"},{from:"lb",to:"b1",color:"#7B9FB5"},{from:"lb",to:"b2",color:"#7B9FB5"},{from:"lb",to:"b3",color:"#7B9FB5"}],caption:"Users hit one address; the LB distributes work to many backends"})}
        <p><strong>Horizontal scale</strong> (add backends) and <strong>failure tolerance</strong> (one dies, LB routes around it).</p>`},{title:"L4 vs L7",body:()=>`
        ${m({headers:["Trait","L4 (Transport)","L7 (Application)"],rows:[["Sees","TCP/UDP connections, IPs, ports","HTTP — URL, headers, cookies, body"],["Routing","Connection-only","Can route by path (/api → A, /static → B)"],["Speed","Very fast, low CPU","Slower — must parse HTTP"],["SSL termination","Pass-through","Common termination point"],["Examples","AWS NLB, HAProxy TCP","nginx, AWS ALB, Cloudflare"]]})}
        ${n("Modern systems use both: L4 in front for raw throughput, L7 behind for app-aware routing.","insight")}`},{title:"Routing Algorithms",body:()=>`
        <p><strong>Round Robin.</strong> Cycle through servers. Simple. Bad when requests have variable cost.</p>
        <p><strong>Least Connections.</strong> Pick the server with fewest active connections. Self-balancing for variable request sizes.</p>
        <p><strong>IP Hash.</strong> Hash the client's IP, route to one specific server. Sticky sessions.</p>
        ${c("Video chat with long-lived WebSockets. Round robin, least connections, or IP hash?","Least connections. Round robin would dump new users on the same server while existing ones hold connections.")}`},{title:"Health Checks & Draining",body:()=>`
        <p><strong>Active health checks</strong> probe each backend (GET /healthz). N failures → pulled.</p>
        <p><strong>Passive health checks</strong> watch real traffic. Too many 5xx → pulled.</p>
        <p><strong>Connection draining</strong> on deploy: LB stops new requests, lets existing ones finish before kill. Without it, deploys cause 500s.</p>`}],keyTerms:["L4 vs L7","Round robin","Least connections","IP hash","Sticky sessions","Health checks","Connection draining"],sources:["NeetCode SD Course — Load Balancing","Grokking SD Fundamentals — Load Balancer","HAProxy and nginx documentation"]},"databases-i":{title:"Databases I — SQL vs NoSQL",subtitle:"ACID, BASE, and when each model wins",duration:"22 min read",difficulty:"Foundational",sections:[{title:"The Big Split",body:()=>`
        ${m({headers:["Dimension","SQL (e.g. Postgres)","NoSQL (e.g. DynamoDB)"],rows:[["Schema","Strict, enforced at write","Flexible, often per-record"],["Joins","First-class, optimized","Avoid; denormalize instead"],["Scaling","Vertical first (bigger box)","Horizontal first (more boxes)"],["Consistency","Strong (ACID)","Often eventual (BASE)"],["Best for","Complex queries, transactions, structured data","Massive scale, simple access, flexible shape"]]})}`},{title:"ACID",body:()=>`
        <p>The traditional database promise:</p>
        <p><strong>Atomicity.</strong> Transactions all-or-nothing. Transfer money: debit AND credit happen, or neither.</p>
        <p><strong>Consistency.</strong> Constraints hold across transactions.</p>
        <p><strong>Isolation.</strong> Concurrent transactions appear sequential.</p>
        <p><strong>Durability.</strong> Once committed, survives crash.</p>
        ${n('"Strong consistency" in ACID-C is different from CAP-C. ACID-C = constraint integrity. CAP-C = reads see latest write across nodes. Easy interview confusion.',"warning")}`},{title:"BASE",body:()=>`
        <p>The NoSQL counter-philosophy:</p>
        <p><strong>Basically Available.</strong> System keeps responding even if some nodes are down.</p>
        <p><strong>Soft state.</strong> Data may change without input.</p>
        <p><strong>Eventual consistency.</strong> Given no new writes, replicas eventually converge.</p>
        <p>The trade: availability and scale at the cost of "is this read 100% fresh?" Like-count off by seconds: fine. Bank balance off by seconds: lawsuit.</p>`},{title:"NoSQL Types",body:()=>`
        ${m({headers:["Type","Example","When"],rows:[["Key-Value","Redis, DynamoDB","Caches, session stores, simple lookups"],["Document","MongoDB, Couchbase","Semi-structured docs, varying schemas"],["Wide-column","Cassandra, ScyllaDB","Write-heavy time-series, IoT, massive scale"],["Graph","Neo4j, Neptune","Social networks, fraud, recommendations"]]})}
        ${c("You're building a banking system. SQL or NoSQL?","SQL. ACID transactions matter, schema is stable, you won't hit scale that breaks SQL.")}`}],keyTerms:["SQL","NoSQL","ACID","BASE","Eventual consistency","Key-value","Document","Wide-column","Graph DB"],sources:["Designing Data-Intensive Applications by Martin Kleppmann","Grokking SD Fundamentals — Databases"]},caching:{title:"Caching",subtitle:"Trading memory for latency, the most powerful lever",duration:"22 min read",difficulty:"Foundational",sections:[{title:"The Core Idea",body:()=>`
        <p>Cache = fast copy of slow data, close to where it's used. Disk ~10ms, cross-region ~100ms, DB ~10-100ms, memory <1µs.</p>
        ${x({height:180,nodes:[{id:"app",x:70,y:90,w:80,h:40,label:"App",sub:"1ms"},{id:"cache",x:240,y:90,w:90,h:40,label:"Redis",sub:"~1ms"},{id:"db",x:410,y:90,w:80,h:40,label:"DB",sub:"~20ms",color:"#8FA876"}],edges:[{from:"app",to:"cache",label:"try cache"},{from:"cache",to:"db",label:"miss → fetch"}],caption:"90% of reads stop at the cache"})}`},{title:"Write Strategies",body:()=>`
        ${m({headers:["Strategy","How","Trade-off"],rows:[["Cache-aside","App writes DB. Cache updated on next read.","Simple. Stale reads after write."],["Write-through","App writes cache AND DB synchronously.","No stale reads. Slower writes."],["Write-behind","App writes cache. Cache writes DB async.","Fast. Risk of loss on crash."]]})}
        ${n("Default is cache-aside. Reach for write-through when correctness > write speed. Write-behind for analytics/metrics.","insight")}`},{title:"Eviction",body:()=>`
        <p><strong>LRU.</strong> Drop entry not accessed in longest. Default.</p>
        <p><strong>LFU.</strong> Drop fewest hits. Good for stable popular items.</p>
        <p><strong>TTL.</strong> Every entry expires regardless of access.</p>
        ${n('Redis default eviction is "noeviction" — refuses writes when full. Switch to allkeys-lru.',"warning")}`},{title:"The Hard Problems",body:()=>`
        <p><strong>Cache stampede.</strong> Popular key expires → 10K simultaneous misses → DB falls over. Fix: probabilistic early refresh, single-flight locks.</p>
        <p><strong>Cache penetration.</strong> Attackers request nonexistent keys. Fix: cache "not found" briefly.</p>
        <p><strong>Hot key.</strong> One key gets 90% of traffic. Fix: replicate, multi-tier (local cache).</p>
        ${c("You add a cache, latency drops 10x. A week later users complain profile changes don't show. Fix?","Cache-aside without invalidation on write. Profile update wrote DB but didn't invalidate cache. Fix: invalidate cache key on every write.")}`}],keyTerms:["Cache-aside","Write-through","LRU/LFU/TTL","Cache stampede","Hot key"],sources:["NeetCode SD Course — Caching","Grokking SD Fundamentals — Caching"]},"message-queues":{title:"Message Queues",subtitle:"Decoupling producers from consumers",duration:"22 min read",difficulty:"Foundational",sections:[{title:"Why Queue?",body:()=>`
        <p>When service A calls B directly (sync HTTP), A waits for B and shares B's fate. A queue between them: A drops a message, queue holds it, B picks it up when it can. <strong>Decoupling, buffering, durability.</strong></p>
        ${x({height:180,nodes:[{id:"p",x:50,y:90,w:80,h:40,label:"Producer"},{id:"q",x:220,y:90,w:100,h:40,label:"Queue",sub:"Kafka",color:"#F5B842"},{id:"c1",x:400,y:50,w:70,h:30,label:"Worker 1"},{id:"c2",x:400,y:90,w:70,h:30,label:"Worker 2"},{id:"c3",x:400,y:130,w:70,h:30,label:"Worker 3"}],edges:[{from:"p",to:"q",label:"publish"},{from:"q",to:"c1"},{from:"q",to:"c2"},{from:"q",to:"c3"}],caption:"Producer publishes once, queue fans out to consumers"})}`},{title:"Queue vs Pub/Sub",body:()=>`
        ${m({headers:["Model","How","When"],rows:[["Queue (point-to-point)","Each message → ONE worker","Task distribution"],["Pub/Sub (topic)","Each message → EVERY subscriber","Event broadcasting"]]})}
        ${n("Kafka does both via consumer groups. Workers in same group share work (queue). Different groups all see all messages (pub/sub).","insight")}`},{title:"Kafka vs RabbitMQ",body:()=>`
        ${m({headers:["Trait","Kafka","RabbitMQ"],rows:[["Model","Log-based (append-only)","Queue-based (gone after ack)"],["Replay","Yes — rewind to any offset","No"],["Throughput","Very high (100K+ msg/sec)","High but lower"],["Use","Event streaming, analytics, audit","Task queues, RPC, complex routing"]]})}`},{title:"Delivery Guarantees",body:()=>`
        <p><strong>At-most-once.</strong> Fire and forget. May lose. (metrics, logs)</p>
        <p><strong>At-least-once.</strong> Retry until ack. May deliver twice. Default. Consumer must be idempotent.</p>
        <p><strong>Exactly-once.</strong> Hard. Kafka offers it within a topic via transactions.</p>
        ${c("Your worker processes payments from a queue. Why MUST it be idempotent?","At-least-once means the same message can arrive twice. If you charge the card both times, customer pays twice. Idempotency = dedup via idempotency-key.")}`}],keyTerms:["Producer","Consumer","Queue vs pub/sub","Consumer group","Partition","Offset","Idempotency","Dead letter queue"],sources:["Kafka documentation","Grokking SD Fundamentals — Messaging Queues"]},"databases-ii":{title:"Databases II — Sharding & Replication",subtitle:"How databases scale past one machine",duration:"25 min read",difficulty:"Intermediate",sections:[{title:"When One Box Stops Cutting It",body:()=>`
        <p>Vertical scaling works until it doesn't. Eventually you hit storage (~100TB), memory (~1TB), or write throughput (~50K/sec) ceilings.</p>
        <p>Two orthogonal strategies. <strong>Replication</strong> copies same data to multiple nodes (read scale, fault tolerance). <strong>Sharding</strong> splits different data across nodes (write scale, capacity).</p>`},{title:"Replication Topologies",body:()=>`
        ${x({height:220,nodes:[{id:"m",x:240,y:50,w:100,h:40,label:"Primary",color:"#F5B842"},{id:"r1",x:100,y:160,w:80,h:30,label:"Replica 1",color:"#8FA876"},{id:"r2",x:240,y:160,w:80,h:30,label:"Replica 2",color:"#8FA876"},{id:"r3",x:380,y:160,w:80,h:30,label:"Replica 3",color:"#8FA876"}],edges:[{from:"m",to:"r1",label:"WAL"},{from:"m",to:"r2",label:"WAL"},{from:"m",to:"r3",label:"WAL"}],caption:"Primary-replica: writes to primary, reads anywhere"})}
        ${m({headers:["Mode","How","Trade"],rows:[["Primary-replica","One writer, many readers","Easy. Replica lag = stale reads."],["Multi-primary","Multiple writers, replicate","No write bottleneck. Conflicts hard."],["Synchronous","Wait for replicas before ack","Zero lag. Higher latency."],["Asynchronous","Ack first, replicate after","Fast. Can lose recent writes."]]})}`},{title:"Sharding Strategies",body:()=>`
        <p><strong>Range sharding.</strong> Split by key range. A-M shard 1, N-Z shard 2. Pro: range queries efficient. Con: hot ranges.</p>
        <p><strong>Hash sharding.</strong> Hash key, modulo by shard count. Pro: uniform. Con: re-hashing on resize.</p>
        <p><strong>Directory sharding.</strong> Lookup table maps key → shard. Pro: flexible. Con: directory bottleneck.</p>
        ${n("Consistent hashing fixes the re-hash problem. Each shard owns a range on a hash ring. Adding a shard moves only 1/N of keys.","insight")}`},{title:"CAP Implications",body:()=>`
        <p>When nodes can't talk (partition), do you sacrifice <strong>Consistency</strong> (return stale data) or <strong>Availability</strong> (refuse to serve)?</p>
        ${c("Postgres primary fails. You promote a replica with 100ms lag. Problem?",'Lost writes. Last 100ms of committed transactions not replicated are gone. Users saw "success" for purchases that no longer exist.')}`}],keyTerms:["Replication","Sharding","Range/hash/directory","Consistent hashing","Replica lag","WAL"],sources:["Designing Data-Intensive Applications (Ch 5-6)","Grokking SD Fundamentals — Database Replication"]},"cap-theorem":{title:"CAP Theorem",subtitle:"You can't have all three. Choose wisely.",duration:"15 min read",difficulty:"Foundational",sections:[{title:"The Theorem",body:()=>`
        <p>In any distributed system, when a network partition happens, you must choose between <strong>C</strong>onsistency and <strong>A</strong>vailability. You can't have both.</p>
        ${x({height:180,nodes:[{id:"c",x:240,y:50,w:100,h:40,label:"Client"},{id:"n1",x:100,y:150,w:90,h:40,label:"Node 1",sub:"partition"},{id:"n2",x:380,y:150,w:90,h:40,label:"Node 2",sub:"partition",color:"#E07856"}],edges:[{from:"c",to:"n1",label:"write x=1"},{from:"c",to:"n2",label:"read x?",color:"#E07856"}],caption:"Network split: return stale x (AP) or refuse (CP)?"})}
        <p>Partition (P) isn't a choice — it happens. The choice is between <strong>CP</strong> (refuse during partition) and <strong>AP</strong> (serve possibly stale).</p>`},{title:"CP vs AP in Practice",body:()=>`
        ${m({headers:["System","Choice","Why"],rows:[["HBase, MongoDB default","CP","Errors during partition; correctness first"],["Cassandra, DynamoDB","AP","Always responds; may be stale"],["ZooKeeper, etcd","CP","Coordination needs consistent answers"],["Redis Cluster","AP (mostly)","Available even when split"]]})}
        ${n("Most NoSQL chose AP because web scale found slight staleness acceptable but downtime cost millions per minute.","info")}`},{title:"PACELC — The Honest Extension",body:()=>`
        <p>CAP only addresses partition case. PACELC: if Partition → A or C; <strong>Else → Latency or Consistency.</strong></p>
        <p>Cassandra is PA/EL. MongoDB is PC/EC.</p>
        ${c('E-commerce inventory across two warehouses. Network partitions. Both say "1 widget left." Two customers buy. CP vs AP?',"CP refuses one (timeout). AP allows both → oversold. For inventory, CP is usually correct.")}`}],keyTerms:["CAP","Consistency","Availability","Partition tolerance","CP","AP","PACELC"],sources:["Eric Brewer's CAP paper","Daniel Abadi PACELC","Designing Data-Intensive Applications (Ch 9)"]},"url-shortener":{title:"Design URL Shortener",subtitle:"The gateway interview problem",duration:"30 min read",difficulty:"Intermediate",sections:[{title:"Requirements",body:()=>`
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
        ${n("Dominant constraint: read latency and availability. Cache aggressively.","insight")}`},{title:"Key Generation",body:()=>`
        <p><strong>Hash the URL.</strong> MD5, first 7 chars. Collisions need retry.</p>
        <p><strong>Counter + base62.</strong> Global counter, base62 encode. No collisions. 62⁷ = 3.5 trillion.</p>
        ${n("Counter wins. Coordinate via Snowflake IDs or pre-allocated ranges (each server gets 10K IDs).","insight")}`},{title:"Architecture",body:()=>`
        ${x({height:280,nodes:[{id:"usr",x:50,y:60,w:70,h:30,label:"User"},{id:"cdn",x:170,y:60,w:80,h:30,label:"CDN"},{id:"lb",x:300,y:60,w:80,h:30,label:"LB",color:"#7B9FB5"},{id:"app",x:430,y:60,w:80,h:30,label:"App",color:"#7B9FB5"},{id:"cache",x:250,y:160,w:100,h:40,label:"Redis",sub:"hot"},{id:"db",x:400,y:160,w:100,h:40,label:"Postgres",color:"#8FA876"}],edges:[{from:"usr",to:"cdn"},{from:"cdn",to:"lb"},{from:"lb",to:"app"},{from:"app",to:"cache"},{from:"cache",to:"db"}],caption:"CDN → LB → App → Cache → DB"})}
        <p>99% of redirects stop at cache. Misses fall to Postgres replica, populate cache.</p>`},{title:"Bottlenecks",body:()=>`
        <p><strong>Hot URL</strong> (celebrity tweet): CDN cache + multi-tier + rate limit.</p>
        <p><strong>Counter coordination</strong>: Snowflake or ranges.</p>
        <p><strong>Replica lag</strong>: write-through cache, read from primary briefly.</p>
        ${c("Why HTTP 302 not 301?","301 = permanent, browsers cache. Caching means no click counting and no future URL changes. 302 = temporary, browsers ask again.")}`}],keyTerms:["Base62","Counter vs hash","301 vs 302","Read-heavy","Multi-tier cache","Snowflake"],sources:["Grokking SD Interview — URL Shortener","NeetCode TinyURL","bit.ly architecture posts"]},pastebin:{title:"Design Pastebin",subtitle:"Storage-heavy variant — content lives somewhere else",duration:"20 min read",difficulty:"Intermediate",sections:[{title:"Different From URL Shortener",body:()=>`
        <p>Looks similar (short URL → content) but content can be megabytes. <strong>Storage architecture is completely different.</strong> Use object storage for content, DB only for metadata.</p>
        ${x({height:240,nodes:[{id:"usr",x:50,y:90,w:70,h:30,label:"User"},{id:"app",x:170,y:90,w:80,h:30,label:"App",color:"#7B9FB5"},{id:"db",x:320,y:50,w:100,h:40,label:"Metadata DB",sub:"tiny",color:"#8FA876"},{id:"s3",x:320,y:150,w:100,h:40,label:"S3",sub:"content blobs",color:"#F5B842"}],edges:[{from:"usr",to:"app",label:"create"},{from:"app",to:"db",label:"meta"},{from:"app",to:"s3",label:"blob"}],caption:"Two stores: metadata in SQL, content in object storage"})}`},{title:"Data Model",body:()=>`
        ${m({headers:["Field","Where","Why"],rows:[["paste_id","DB","PK, becomes URL slug"],["s3_key","DB","Pointer to S3"],["language","DB","Syntax highlighting"],["created_at, expires_at","DB","Time queries"],["actual content","S3","Up to 1-10MB blobs"]]})}`},{title:"Expiration",body:()=>`
        <p><strong>Lazy delete.</strong> On read, check expires_at. Past → 404, queue for delete. Simple but storage piles up.</p>
        <p><strong>Background sweep.</strong> Hourly cron deletes expired. Cleaner.</p>
        ${n("S3 lifecycle policies. Tag with expiry, S3 auto-deletes. Zero cron.","insight")}
        ${c("Pastebin gets a 50MB request. Allow?","Reject. Hard limit at 1-10MB. 50MB is abuse (storing files as text). Costs scale linearly with size.")}`}],keyTerms:["Object storage","Metadata vs content","S3 lifecycle","Lazy delete"],sources:["Grokking SD Interview — Pastebin","AWS S3 best practices"]},twitter:{title:"Design Twitter",subtitle:"Feed generation, fanout, the celebrity problem",duration:"35 min read",difficulty:"Advanced",sections:[{title:"Requirements",body:()=>`
        <p><strong>Functional:</strong> post tweet, follow, home timeline, profile timeline.</p>
        <p><strong>Non-functional:</strong> billions of users, read-heavy, real-time updates.</p>
        <p>Core question: <strong>when you load your feed, who computes it?</strong></p>`},{title:"Fanout-on-Write (Push)",body:()=>`
        <p>When you tweet, write it into every follower's precomputed timeline. Read = fetch precomputed list.</p>
        ${x({height:220,nodes:[{id:"u",x:50,y:100,w:80,h:40,label:"You tweet"},{id:"svc",x:200,y:100,w:100,h:40,label:"Fanout",color:"#F5B842"},{id:"f1",x:370,y:50,w:90,h:30,label:"follower 1 feed"},{id:"f2",x:370,y:100,w:90,h:30,label:"follower 2 feed"},{id:"f3",x:370,y:150,w:90,h:30,label:"follower 3 feed"}],edges:[{from:"u",to:"svc"},{from:"svc",to:"f1"},{from:"svc",to:"f2"},{from:"svc",to:"f3"}],caption:"Tweet fans out to every follower's precomputed timeline"})}
        <p>Reads O(1). Writes O(followers) — expensive if many.</p>`},{title:"Fanout-on-Read (Pull)",body:()=>`
        <p>When you tweet, just write to your own timeline. Feed read: look up everyone you follow, fetch each, merge. Writes O(1). Reads O(following) — slow for users following thousands.</p>`},{title:"The Celebrity Problem",body:()=>`
        <p>Push: Taylor Swift tweets → 90M inboxes. Massive write. Pull: every follower's read queries her timeline. Massive read.</p>
        <p><strong>Hybrid.</strong> Push for most users. Pull for celebrities (>1M followers). Feed = precomputed UNION recent celeb tweets.</p>
        ${n("Twitter does this. Celebrities flagged; tweets aren't fanned out, pulled on read.","insight")}
        ${c("Why isn't pure push viable at scale?","Average user 200 followers, fine. Celebrities have 100M. One tweet = 100M writes. Multiply by hundreds of celebs. Fanout workers never catch up.")}`}],keyTerms:["Fanout on write/read","Hybrid","Celebrity problem","Timeline","Materialized view"],sources:["Grokking SD Interview — Twitter","Twitter Engineering Blog"]},youtube:{title:"Design YouTube",subtitle:"Video upload, encoding, global delivery",duration:"35 min read",difficulty:"Advanced",sections:[{title:"Three Pipelines",body:()=>`
        ${x({height:240,nodes:[{id:"u",x:50,y:50,w:70,h:30,label:"Uploader"},{id:"ing",x:180,y:50,w:90,h:30,label:"Upload svc"},{id:"enc",x:320,y:50,w:90,h:30,label:"Encoder",sub:"multi-bitrate",color:"#F5B842"},{id:"s3",x:460,y:50,w:80,h:30,label:"Store",color:"#8FA876"},{id:"meta",x:320,y:130,w:90,h:30,label:"Metadata DB"},{id:"cdn",x:460,y:130,w:80,h:30,label:"CDN"},{id:"view",x:460,y:200,w:80,h:30,label:"Viewer"}],edges:[{from:"u",to:"ing"},{from:"ing",to:"enc"},{from:"enc",to:"s3"},{from:"ing",to:"meta"},{from:"s3",to:"cdn"},{from:"cdn",to:"view"}],caption:"Upload → encode → store → CDN → viewer"})}`},{title:"Multi-Bitrate Encoding",body:()=>`
        <p>Same video, encoded at 144p, 240p, 360p, 480p, 720p, 1080p, 4K. Each in ~10s chunks. Player chooses bitrate based on bandwidth (HLS/DASH).</p>
        <p><strong>Adaptive Bitrate Streaming.</strong> Phone on 3G gets 240p, laptop on fiber gets 4K. Transparent.</p>
        ${n("Encoding is most expensive. 10-min 4K = hours of compute. Use spot instances; encoding is interruptible.","insight")}`},{title:"Storage + CDN",body:()=>`
        <p>Raw chunks in cheap object storage. CDN caches popular at edge. 80/20 brutal: 80% of views are 20% of videos. Hot videos live in CDN entirely.</p>`},{title:"Scale Tricks",body:()=>`
        <p><strong>Resumable uploads.</strong> Chunk with resume tokens. Don't make users re-upload 2GB on dropped connection.</p>
        <p><strong>Cold storage tiering.</strong> No views in 90 days → cheaper slower storage.</p>
        ${c("Why encode multiple bitrates instead of one good one + client downscale?","Bandwidth. 3G user can't download 4K to display 240p. Multi-bitrate sends only what client uses.")}`}],keyTerms:["Adaptive bitrate","HLS","DASH","Multi-bitrate encoding","CDN tiering","Resumable upload"],sources:["Grokking SD Interview — YouTube","YouTube Engineering Blog","Netflix Open Connect"]},uber:{title:"Design Uber",subtitle:"Real-time geo, matching, websockets",duration:"35 min read",difficulty:"Advanced",sections:[{title:"The Core Problem",body:()=>`
        <p>Riders and drivers are moving objects on a map. System must: track drivers in real time, find drivers near a rider in <100ms, route the request, handle live trip, charge card. Millions of trips per day.</p>
        <p>Hard part: "find drivers near rider in 100ms." Naive: scan every driver. At 10M drivers, that's 10M ops per request. Won't work.</p>`},{title:"Geo-Indexing",body:()=>`
        <p><strong>Quadtree.</strong> Recursively divide map into 4 quadrants. Leaf nodes hold drivers. Search a region = traverse only relevant branches.</p>
        <p><strong>Geohash.</strong> Encode lat/lng into string where nearby locations share prefix. "dr5ru" = some area. Use prefix queries.</p>
        ${x({height:200,nodes:[{id:"d1",x:80,y:80,w:50,h:30,label:"D1"},{id:"d2",x:80,y:130,w:50,h:30,label:"D2"},{id:"d3",x:150,y:80,w:50,h:30,label:"D3"},{id:"d4",x:150,y:130,w:50,h:30,label:"D4"},{id:"gh",x:320,y:100,w:130,h:40,label:"Geohash Index",sub:'"dr5ru" → [D1,D2]'}],edges:[{from:"d1",to:"gh"},{from:"d2",to:"gh"},{from:"d3",to:"gh"},{from:"d4",to:"gh"}],caption:'Geohash bucket = quick "drivers in area" lookup'})}`},{title:"Real-Time Location Updates",body:()=>`
        <p>Driver app sends location every 4 sec. At 1M drivers, 250K writes/sec. Architecture: drivers → Kafka (partitioned by region) → Redis spatial index. Reads hit Redis directly. Periodic snapshot to durable storage.</p>`},{title:"Matching + Trip Lifecycle",body:()=>`
        <p>Rider requests → backend queries geohash for drivers within 2km → ranks by ETA + score → sends to top driver via websocket → driver accepts → both connected for live updates.</p>
        <p>Websocket mandatory. HTTP polling at this volume would melt servers.</p>
        ${c("Why not Postgres + PostGIS?","Latency. At 1M drivers × 4s updates, PostGIS adds disk I/O per write/read. Need in-memory (Redis or custom) with spatial structures.")}`}],keyTerms:["Quadtree","Geohash","Spatial index","Websocket","Real-time matching","Surge pricing"],sources:["Grokking SD Interview — Uber","Uber Engineering Blog","H3 hexagonal grid"]},whatsapp:{title:"Design WhatsApp",subtitle:"Messaging at scale: websockets, delivery, E2EE",duration:"30 min read",difficulty:"Advanced",sections:[{title:"Requirements",body:()=>`
        <p><strong>Functional:</strong> 1:1 chat, groups, online status, sent/delivered/read receipts, offline storage, media.</p>
        <p><strong>Non-functional:</strong> 2B+ users, billions msg/day, real-time, E2EE.</p>`},{title:"Websockets, Not Polling",body:()=>`
        <p>Active users hold persistent websocket to nearest gateway. Friend sends → gateway pushes to recipient's socket immediately.</p>
        ${x({height:200,nodes:[{id:"a",x:50,y:90,w:70,h:30,label:"Alice"},{id:"gw1",x:180,y:90,w:90,h:30,label:"Gateway",color:"#F5B842"},{id:"route",x:330,y:90,w:100,h:30,label:"Router"},{id:"gw2",x:480,y:90,w:60,h:30,label:"Gateway",color:"#F5B842"},{id:"b",x:580,y:90,w:60,h:30,label:"Bob"}],edges:[{from:"a",to:"gw1",label:"WS"},{from:"gw1",to:"route"},{from:"route",to:"gw2"},{from:"gw2",to:"b",label:"WS"}],caption:"Alice → Alice's gateway → router → Bob's gateway → Bob (~50ms)"})}
        <p>Gateways stateful (hold connections). Routing layer maps user → which gateway.</p>`},{title:"Delivery Guarantees",body:()=>`
        <p><strong>Three states:</strong> sent, delivered, read. Offline recipient: server stores until next connection, with TTL.</p>
        <p><strong>Idempotency:</strong> each message has client UUID. Retries deduped server-side.</p>`},{title:"End-to-End Encryption",body:()=>`
        <p>Signal protocol. Each user has long-term identity key + rotating message keys. Server stores ciphertext only — even WhatsApp can't read.</p>
        <p>Groups: sender key distributed at join. Each message encrypted with sender key, decrypted by members.</p>
        ${n("E2EE means server can't search message content. WhatsApp search is local-only on your phone.","info")}
        ${c("Bob offline 3 days. Alice sends 100. What happens?",'Each shows "sent" (one check). Server queues. Bob comes online → delivered (double check). Bob opens chat → read receipts → blue.')}`}],keyTerms:["Websocket","Gateway servers","Delivery receipts","Signal protocol","E2EE","Sender keys"],sources:["Grokking SD Interview — WhatsApp","WhatsApp Engineering","Signal Protocol docs"]},dropbox:{title:"Design Dropbox",subtitle:"File sync, chunking, conflict resolution",duration:"30 min read",difficulty:"Advanced",sections:[{title:"The Chunking Insight",body:()=>`
        <p>Naive: upload entire file on every change. 1GB file edited 10 times = 10GB upload.</p>
        <p>Dropbox: <strong>chunk into 4MB blocks, hash each, only upload changed blocks.</strong> Edit one paragraph in 1GB file = upload 4MB.</p>
        ${x({height:220,nodes:[{id:"f",x:50,y:100,w:80,h:40,label:"File (1GB)"},{id:"c",x:180,y:100,w:80,h:40,label:"Chunker",sub:"4MB",color:"#F5B842"},{id:"h",x:310,y:100,w:100,h:40,label:"Block index",sub:"hash → loc"},{id:"s",x:460,y:100,w:80,h:40,label:"Object store",color:"#8FA876"}],edges:[{from:"f",to:"c",label:"split"},{from:"c",to:"h",label:"hash"},{from:"h",to:"s",label:"new only"}],caption:"Files = lists of block hashes; only new blocks upload"})}`},{title:"Block-Level Dedup",body:()=>`
        <p>Hashing blocks means identical content stored once across users. 10 users upload same Linux ISO → stored once. Content-addressable storage.</p>
        ${n('Privacy: two users uploading identical "secret.txt" share storage. For E2EE you trade dedup for privacy.',"warning")}`},{title:"Metadata vs Block Stores",body:()=>`
        ${m({headers:["Layer","What","Storage"],rows:[["Metadata","Filename, owner, version, block hashes","SQL"],["Blocks","Raw 4MB binaries by hash","Object store"],["Notification",'"file X changed" to your devices',"Pub/sub"]]})}`},{title:"Conflict Resolution",body:()=>`
        <p>Two devices edit offline. Both push. Whose wins?</p>
        <p>Dropbox: <strong>both win.</strong> Loser becomes "filename (conflicted copy 2024-05-23).txt". Inelegant but no data loss.</p>
        ${c("Why upload changed blocks vs diffs?",'Diffs require server to know original. With block-hashing, client computes "what changed" locally and uploads. No round-trip. Also enables cross-user dedup.')}`}],keyTerms:["Block chunking","Content-addressable","Dedup","Delta sync","Conflict resolution"],sources:["Grokking SD Interview — Dropbox","Dropbox Engineering","Rsync algorithm"]},"web-crawler":{title:"Design Web Crawler",subtitle:"Distributed BFS, politeness, dedup at scale",duration:"30 min read",difficulty:"Advanced",sections:[{title:"The Core Loop",body:()=>`
        <p>A crawler is distributed BFS over the web graph. Pop URL, fetch, parse links, push back on queue, repeat.</p>
        ${x({height:220,nodes:[{id:"q",x:50,y:100,w:90,h:40,label:"URL Frontier",sub:"queue",color:"#F5B842"},{id:"w",x:200,y:100,w:90,h:40,label:"Workers"},{id:"p",x:350,y:50,w:90,h:40,label:"Parser"},{id:"s",x:350,y:150,w:90,h:40,label:"Storage",color:"#8FA876"},{id:"d",x:480,y:100,w:80,h:30,label:"Dedup",sub:"bloom"}],edges:[{from:"q",to:"w"},{from:"w",to:"p"},{from:"w",to:"s"},{from:"p",to:"d"},{from:"d",to:"q"}],caption:"Workers fetch, parse, dedup, push new URLs back"})}`},{title:"Politeness",body:()=>`
        <p><strong>robots.txt.</strong> Respect site's crawl rules.</p>
        <p><strong>Per-domain rate limit.</strong> Max 1 req/sec per domain. Frontier groups by domain.</p>
        <p><strong>User-agent honesty.</strong> Identify yourself, contact email.</p>`},{title:"Dedup at Scale",body:()=>`
        <p>URLs like <code>page?id=1&ref=home</code> and <code>page?ref=home&id=1</code> = same content. <strong>Canonicalize</strong> before dedup.</p>
        <p>Billions of URLs → exact dedup too expensive. Use <strong>bloom filter:</strong> no false negatives, small false positive rate.</p>
        ${n("1B URLs in a bloom filter = ~1GB RAM at 1% false positive. Real hash set = ~50GB.","insight")}`},{title:"Freshness",body:()=>`
        <p>Web changes constantly. News: hourly. Wikipedia: daily. Personal blogs: weekly. Each URL gets adaptive re-crawl interval based on observed change rate.</p>
        ${c("Why BFS over DFS for crawling?","BFS gives breadth coverage; important pages linked from many places early. DFS gets stuck deep in low-value subtrees (calendar pages, archives).")}`}],keyTerms:["URL frontier","robots.txt","Politeness","Canonicalization","Bloom filter","Distributed BFS"],sources:["Grokking SD Interview — Web Crawler","Mercator paper (1999)","Apache Nutch docs"]},"news-feed":{title:"Design Facebook News Feed",subtitle:"Ranking, infinite scroll, real-time push",duration:"30 min read",difficulty:"Advanced",sections:[{title:"It's Not Chronological",body:()=>`
        <p>Twitter (originally) showed reverse-chronological. Facebook: <strong>ranked feed.</strong> Order determined by a model predicting engagement.</p>
        <p>Feed isn't a list, it's a function. Every load can produce different order.</p>`},{title:"Architecture",body:()=>`
        ${x({height:220,nodes:[{id:"usr",x:50,y:100,w:70,h:30,label:"User"},{id:"feed",x:180,y:100,w:90,h:40,label:"Feed svc"},{id:"cand",x:330,y:50,w:100,h:40,label:"Candidates",sub:"last 500"},{id:"rank",x:330,y:150,w:100,h:40,label:"Ranker",sub:"ML",color:"#F5B842"},{id:"cache",x:480,y:100,w:80,h:40,label:"Top 50"}],edges:[{from:"usr",to:"feed"},{from:"feed",to:"cand"},{from:"cand",to:"rank"},{from:"rank",to:"cache"},{from:"cache",to:"feed"}],caption:"Two-stage: gather candidates → rank with ML → serve top N"})}`},{title:"Push vs Pull (Revisit)",body:()=>`
        <p>Like Twitter, hybrid. Most posts precomputed (push). Power users pulled. Plus ML ranking layer that re-orders both.</p>`},{title:"Real-Time Updates",body:()=>`
        <p><strong>Polling.</strong> Wasteful at scale.</p>
        <p><strong>Long polling.</strong> Better.</p>
        <p><strong>SSE / Websockets.</strong> Push as needed. Best for active users.</p>
        ${c('Why "10 new posts" banner instead of inserting?',"UX. Inserting shifts content above your scroll position, breaks reading flow. Banner lets you opt in.")}`}],keyTerms:["Ranked feed","Candidate generation","ML ranking","Hybrid push-pull","SSE","Long polling"],sources:["Grokking SD Interview — News Feed","Facebook Engineering on feed ranking"]},recommendation:{title:"ML SD — Recommendation System",subtitle:"Two-stage architecture, the ML platform staple",duration:"30 min read",difficulty:"Advanced",sections:[{title:"Why Two Stages",body:()=>`
        <p>100M items × 1B users. Can't score every item against every user — 10^17 ops. Modern recommenders use <strong>two-stage architecture.</strong></p>
        ${x({height:200,nodes:[{id:"usr",x:50,y:80,w:70,h:30,label:"User"},{id:"cg",x:180,y:80,w:100,h:40,label:"Candidate Gen",sub:"100M → 1K",color:"#F5B842"},{id:"rk",x:330,y:80,w:100,h:40,label:"Ranker",sub:"1K → 10",color:"#7B9FB5"},{id:"out",x:480,y:80,w:80,h:30,label:"Top 10"}],edges:[{from:"usr",to:"cg"},{from:"cg",to:"rk"},{from:"rk",to:"out"}],caption:"Stage 1: fast retrieval to ~1K. Stage 2: slow ML ranks to top 10"})}`},{title:"Candidate Generation",body:()=>`
        <p>Narrow 100M to ~1K fast. Need recall, not precision.</p>
        <p><strong>Collaborative filtering.</strong> "Users like you liked..." Matrix factorization, embeddings.</p>
        <p><strong>Content-based.</strong> "Items similar to ones you liked..." TF-IDF or item embeddings.</p>
        <p><strong>Two-tower neural.</strong> User and item → embeddings. Nearest neighbors = candidates. Modern, scales.</p>`},{title:"Ranking",body:()=>`
        <p>Of 1K candidates, predict which 10 user will engage with. GBDT historically (XGBoost). Now deep models with dense + sparse features.</p>
        ${n("Ranking model offline-trained, online-served at ms latency. Feature store provides consistent features at train and serve time.","insight")}`},{title:"Cold Start",body:()=>`
        <p><strong>New user:</strong> globally popular items, onboarding questions, demographic priors.</p>
        <p><strong>New item:</strong> content features (title, category) until engagement accumulates.</p>
        ${c("Why embeddings over explicit feature engineering?","Embeddings learn what matters. Hand-engineered features cap at what humans think of. Embeddings discover patterns and generalize.")}`}],keyTerms:["Candidate generation","Ranking","Collaborative filtering","Two-tower","Embedding","Cold start","Feature store"],sources:["Grokking ML SD",`YouTube's "Deep Neural Networks for YouTube Recommendations" paper`,"Pinterest PinSage"]},"search-ranking":{title:"ML SD — Search Ranking",subtitle:"Inverted indexes, BM25, learning to rank",duration:"30 min read",difficulty:"Advanced",sections:[{title:"The Inverted Index",body:()=>`
        <p>"Documents containing word X" fast = precompute inverse: <strong>word → list of docs containing it.</strong></p>
        ${m({headers:["Term","Posting list (doc IDs)"],rows:[["rust","[doc12, doc89, doc342, doc501]"],["async","[doc12, doc77, doc342]"],["runtime","[doc89, doc342, doc501]"]]})}
        <p>Query "rust async runtime" intersects three lists. Doc342 in all three → top candidate.</p>`},{title:"BM25 — The Classic Ranker",body:()=>`
        <p>Workhorse for 30 years:</p>
        <p><strong>Term frequency</strong> — query term appearances in doc (diminishing returns).</p>
        <p><strong>Inverse document frequency</strong> — rare terms score higher.</p>
        <p><strong>Length normalization</strong> — shorter docs with the term score higher.</p>
        ${n("Elasticsearch defaults to BM25. Good enough for 80% of search use cases without ML.","info")}`},{title:"Neural Retrieval",body:()=>`
        <p>Newer: train a model to embed queries and documents in same vector space. Search = nearest neighbors.</p>
        ${x({height:180,nodes:[{id:"q",x:50,y:90,w:80,h:30,label:"Query"},{id:"qe",x:180,y:90,w:90,h:30,label:"Query encoder",color:"#F5B842"},{id:"idx",x:330,y:50,w:100,h:30,label:"Doc embeddings",color:"#8FA876"},{id:"ann",x:330,y:130,w:100,h:30,label:"ANN search"},{id:"r",x:480,y:90,w:70,h:30,label:"Results"}],edges:[{from:"q",to:"qe"},{from:"qe",to:"ann"},{from:"idx",to:"ann"},{from:"ann",to:"r"}],caption:"Dense retrieval: query and docs share embedding space"})}
        <p>Better at synonyms and intent. Costs more compute. Hybrid combines BM25 + neural.</p>`},{title:"Learning to Rank",body:()=>`
        <p>Candidates from BM25/neural feed final ranker trained on click data. Features: relevance scores, CTR history, quality signals, personalization.</p>
        ${c("Why not rank everything with neural from the start?","Cost. Running neural on every doc in your index per query = too expensive. Retrieval narrows to ~100 fast, then expensive model ranks.")}`}],keyTerms:["Inverted index","BM25","TF-IDF","Dense retrieval","Two-tower","ANN","Learning to rank"],sources:["Grokking ML SD","Elasticsearch internals",'"Neural IR" by Mitra & Craswell']},"mock-week":{title:"Mock Interview Week",subtitle:"How to actually do SD interviews under time pressure",duration:"20 min read",difficulty:"Practice",sections:[{title:"The RESHADED Framework",body:()=>`
        <p>45-min SD interviews are stressful because no structure. RESHADED keeps you on rails.</p>
        ${m({headers:["Letter","Stands for","Spend"],rows:[["R","Requirements (functional + non-functional)","5 min"],["E","Estimation (QPS, storage, bandwidth)","3 min"],["S","System APIs","3 min"],["H","High-level architecture (blocks + arrows)","7 min"],["A","API/data layer details","5 min"],["D","Data model","5 min"],["E","Evaluation: bottlenecks, scale","7 min"],["D","Deep dives where interviewer steers","10 min"]]})}`},{title:"What Interviewers Grade",body:()=>`
        <p><strong>1. Communication.</strong> Thinking out loud, acknowledging trade-offs, asking clarifying questions, diagrams matching what you say.</p>
        <p><strong>2. Trade-off awareness.</strong> Every choice has costs. "I'd use SQL because consistency matters more than write scale" beats "I'd use SQL."</p>
        <p><strong>3. Depth in the right places.</strong> Interviewer pushes on one area. Be ready to go deep on caching, sharding, consistency.</p>`},{title:"Common Patterns",body:()=>`
        ${m({headers:["Problem family","Default pattern"],rows:[["URL-style","Read-heavy, cache, base62"],["Storage-heavy (paste, file)","Metadata DB + object store"],["Feed (Twitter, FB)","Fanout strategy, hybrid push-pull"],["Real-time (chat, Uber)","Websockets, spatial index"],["Search","Inverted index, two-stage rank"],["Recommendation","Two-stage retrieval + rank"],["Video","Multi-bitrate, CDN, chunked"]]})}`},{title:"Practice Plan",body:()=>`
        <p>Last week of runway. Three mocks minimum:</p>
        <ol>
          <li><strong>Solo timed.</strong> 45 min URL shortener. Paper. Talk out loud. Record.</li>
          <li><strong>With a peer.</strong> Pramp or Discord. 45 min each way.</li>
          <li><strong>Re-do.</strong> Pick the worst. Redo knowing what you missed.</li>
        </ol>
        ${n(`Don't obsess over the "right" answer. There isn't one. They grade your process.`,"insight")}
        ${c("30 min in, haven't talked about scaling. What now?",`Don't panic. Say: "Before more components, let me address scale." Cover caching, sharding, replication, monitoring. Showing you THINK about scale is what they want.`)}`}],keyTerms:["RESHADED","Functional vs non-functional","Back-of-envelope","Bottleneck analysis","Trade-off articulation"],sources:["Grokking SD Interview methodology",'Alex Xu, "System Design Interview" Vol 1 & 2',"Pramp.com"]}},G={"arrays-hashing":{title:"Arrays & Hashing",subtitle:"The most common pattern — trading memory for time",duration:"20 min read",difficulty:"Foundational",pattern:"Arrays & Hashing",sections:[{title:"Core Insight",body:()=>`
        <p>When a problem mentions "find pairs," "find duplicates," "group by something," or "count occurrences" — reach for a hash map. You're trading O(n) memory for the ability to look things up in O(1) instead of scanning.</p>
        <p>This pattern alone solves about 20% of all easy interview problems.</p>
        ${n("Mental rule: if your brain wants to write a nested loop to check pairs, stop. There's probably a hash map solution that turns O(n²) into O(n).","insight")}`},{title:"Two Sum — Walkthrough",body:()=>`
        <p><strong>Problem:</strong> Given <code>nums = [2, 7, 11, 15]</code> and <code>target = 9</code>, return indices of two numbers that add to target.</p>
        <p><strong>Brute force:</strong> two nested loops, check every pair. O(n²).</p>
        <p><strong>Hash map:</strong> as you iterate, for each <code>num</code>, check if <code>target - num</code> is in the map. If yes, return both indices. If no, add <code>num</code> to map.</p>
        ${P({values:[2,7,11,15],pointers:[{index:0,label:"i",color:"#F5B842"}],caption:"i=0, num=2, need 7. Map: {} → check, not there. Add {2:0}."})}
        ${P({values:[2,7,11,15],pointers:[{index:1,label:"i",color:"#F5B842"}],highlight:[0,1],caption:"i=1, num=7, need 2. Map: {2:0} → FOUND! Return [0, 1]."})}
        <p>O(n) time, O(n) space. The hash map made the "is X in my array" check free.</p>`},{title:"When To Reach For Hashing",body:()=>`
        ${m({headers:["Signal","Likely solution"],rows:[['"Find two/three elements that..."',"Hash map for complements"],['"Group by some property"',"Map of property → list"],['"Find duplicates" / "first non-repeating"',"Map of element → count"],['"Check if anagram"',"Map of char → count, compare maps"],['"Subarray with sum K"',"Prefix sum + hash map"]]})}`},{title:"Common Variations",body:()=>`
        <p><strong>Group Anagrams.</strong> Map of sorted-string → list of originals.</p>
        <p><strong>Top K Frequent.</strong> Count with map, then bucket sort by count.</p>
        <p><strong>Longest Consecutive Sequence.</strong> Put all in a set, only start counting from numbers that are sequence starts (n-1 not in set).</p>
        ${c("You have an array of 10K integers. Find all pairs summing to 100. What's the time complexity using hashing vs brute force?","Brute force: O(n²) = 100M ops. Hashing: O(n) = 10K ops. 10,000x speedup for trivial memory cost.")}`}],template:`function twoSum(nums, target) {
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
        ${P({values:[2,4,7,11,15],pointers:[{index:0,label:"L",color:"#F5B842"},{index:4,label:"R",color:"#7B9FB5"}],caption:"L=2, R=15, sum=17 < 18. Need larger. Move L right."})}
        ${P({values:[2,4,7,11,15],pointers:[{index:1,label:"L",color:"#F5B842"},{index:4,label:"R",color:"#7B9FB5"}],caption:"L=4, R=15, sum=19 > 18. Need smaller. Move R left."})}
        ${P({values:[2,4,7,11,15],pointers:[{index:1,label:"L",color:"#F5B842"},{index:3,label:"R",color:"#7B9FB5"}],highlight:[1,3],caption:"L=4, R=11, sum=15... wait, target=18. Actually 4+11=15. Keep going. (Demo of the pattern.)"})}
        <p>The point: each step you eliminate one element from consideration. O(n) total.</p>`},{title:"Pattern Variations",body:()=>`
        ${m({headers:["Problem family","How","Example"],rows:[["Sum to target (sorted)","L + R, move based on sum vs target","Two Sum II, 3Sum"],["Container With Most Water","L + R, move shorter side","Maximize area"],["Reverse / palindrome check","L moves right, R moves left, compare","Valid Palindrome"],["Remove duplicates in-place","Slow + fast pointer","Remove Duplicates from Sorted Array"]]})}`},{title:"Sliding Window Connection",body:()=>`
        <p>Sliding window is really "two pointers that both move right." If you understand two pointers, sliding window is almost free.</p>
        ${c("Why does two-pointers fail on an UNSORTED array for the sum problem?","Without sort, sum comparison doesn't tell you which direction to move. Could need bigger AND smaller, no way to know which. Hash map handles unsorted in O(n).")}`}],template:`function twoSumSorted(nums, target) {
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
        ${P({values:["a","b","c","a","b","c","b","b"],window:{},caption:"Window [a,b,c], length 3, all unique. Expand R."})}
        ${P({values:["a","b","c","a","b","c","b","b"],window:{},caption:"Add a at R=3. Duplicate! Window has two a's. Shrink L."})}
        ${P({values:["a","b","c","a","b","c","b","b"],window:{},caption:"Move L past first a → window [b,c,a], length 3, all unique again."})}
        <p>Track max length as you go. Use a set/map to know what's currently in the window.</p>`},{title:"Fixed vs Variable Windows",body:()=>`
        ${m({headers:["Type","How","Example"],rows:[["Fixed size","Slide a window of size K","Max sum subarray of size K"],["Variable, expand-then-shrink","R expands until invalid, L shrinks until valid","Longest substring no repeat"],["Variable, find smallest","R expands until valid, L shrinks while still valid","Min window containing all chars"]]})}
        ${n('The trick to most sliding window problems: ask "when do I shrink the window?" The answer is the condition that defines "invalid."',"insight")}`},{title:"Common Problems",body:()=>`
        <ul>
          <li><strong>Longest Substring Without Repeating</strong> — variable, hash set</li>
          <li><strong>Minimum Window Substring</strong> — variable, char counts</li>
          <li><strong>Permutation in String</strong> — fixed, char counts</li>
          <li><strong>Best Time to Buy & Sell Stock</strong> — two pointers / window</li>
        </ul>
        ${c("Why is sliding window O(n), not O(n²)?","L only moves right, never resets. R only moves right. Each pointer touches each index at most once. Total work = 2n = O(n).")}`}],template:`function lengthOfLongestSubstring(s) {
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
        ${P({values:["{","[","(",")","]","}"],pointers:[{index:0,label:"i",color:"#F5B842"}],caption:"i=0, push {. Stack: [{]"})}
        ${P({values:["{","[","(",")","]","}"],pointers:[{index:3,label:"i",color:"#F5B842"}],caption:"i=3, ). Top is (, match. Pop. Stack: [{, []"})}
        ${P({values:["{","[","(",")","]","}"],pointers:[{index:5,label:"i",color:"#F5B842"}],highlight:[0,5],caption:"i=5, }. Top is {, match. Pop. Stack empty → valid."})}`},{title:"Monotonic Stack",body:()=>`
        <p>A stack where elements are always in increasing (or decreasing) order. Used for "next greater element" style problems.</p>
        <p><strong>Daily Temperatures.</strong> For each day, how many days until a warmer day? Naive O(n²). Monotonic stack: O(n).</p>
        <p>Iterate left to right. Stack holds indices of days waiting for a warmer day. When today is warmer than stack-top, pop and record the gap.</p>
        ${n('Pattern: when you see "next greater," "next smaller," "previous greater" — think monotonic stack.',"insight")}`},{title:"Common Problems",body:()=>`
        <ul>
          <li><strong>Valid Parentheses</strong> — match opens and closes</li>
          <li><strong>Min Stack</strong> — getMin() in O(1), keep parallel stack of mins</li>
          <li><strong>Evaluate Reverse Polish Notation</strong> — push values, pop on operator</li>
          <li><strong>Daily Temperatures</strong> — monotonic decreasing stack</li>
          <li><strong>Largest Rectangle in Histogram</strong> — monotonic stack, hard but classic</li>
        </ul>
        ${c("Why does monotonic stack give O(n) when it looks like it could pop everything?","Each element pushed once and popped at most once. Total push+pop ≤ 2n = O(n). The inner pop loop is amortized constant.")}`}],template:`function isValid(s) {
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
        ${P({values:[1,3,5,7,9,11],pointers:[{index:0,label:"L"},{index:2,label:"M",color:"#F5B842"},{index:5,label:"R"}],caption:"L=0, R=5, M=2. nums[M]=5 < 7. Move L = M+1."})}
        ${P({values:[1,3,5,7,9,11],pointers:[{index:3,label:"L"},{index:4,label:"M",color:"#F5B842"},{index:5,label:"R"}],caption:"L=3, R=5, M=4. nums[M]=9 > 7. Move R = M-1."})}
        ${P({values:[1,3,5,7,9,11],pointers:[{index:3,label:"L=M=R",color:"#8FA876"}],highlight:[3],caption:"L=R=M=3. nums[M]=7. Found!"})}`},{title:"Common Bugs",body:()=>`
        ${m({headers:["Bug","Fix"],rows:[["(L + R) / 2 overflows for huge arrays","Use L + (R - L) / 2"],["while (L <= R) vs while (L < R)","Depends on exit condition; both valid"],["Infinite loop when condition leaves L unchanged","Always set L = M+1 or R = M-1, never just M"],['Off-by-one on "find first/last X"',"Use template: when found, keep searching for boundary"]]})}`},{title:"Search on Answer Space",body:()=>`
        <p>Powerful pattern: when you can't binary search the input directly, binary search the answer.</p>
        <p><strong>Koko Eating Bananas.</strong> Find min eating speed K such that all bananas eaten in H hours. Speed range is [1, max(piles)]. For each candidate K, compute hours needed. Binary search on K.</p>
        <p><strong>Find Min in Rotated Sorted Array.</strong> Binary search adapted: compare to right end to know which side is sorted.</p>
        ${n('If the answer is a number with a monotonic property — "K works → K+1 works" or "K works → K-1 works" — you can binary search the answer space.',"insight")}
        ${c("Array of size 1 billion. Linear scan vs binary search?","Linear: up to 1B ops. Binary: log₂(1B) ≈ 30 ops. 33 million times faster.")}`}],template:`function binarySearch(nums, target) {
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
        ${Ne({values:[1,2,3,4],caption:"Initial: 1 → 2 → 3 → 4. We want: 4 → 3 → 2 → 1."})}
        <p>For each node: save next, point curr.next to prev, move prev to curr, move curr to saved next.</p>
        ${n("On paper, draw the arrows and rewire them physically. The code matches what you drew.","insight")}`},{title:"Cycle Detection — Floyd's Algorithm",body:()=>`
        <p><strong>Problem:</strong> Does this linked list have a cycle?</p>
        <p>Naive: hash set of visited nodes, O(n) space. Floyd's: O(1) space.</p>
        <p>Two pointers: <strong>slow</strong> moves one step, <strong>fast</strong> moves two. If there's a cycle, fast eventually laps slow and they meet. If no cycle, fast hits null first.</p>
        ${n("Why it works: in a cycle of length C, fast gains 1 step on slow per iteration. Within C iterations, fast catches slow.","insight")}`},{title:"Common Problems",body:()=>`
        <ul>
          <li><strong>Reverse Linked List</strong> — 3-pointer iterative</li>
          <li><strong>Merge Two Sorted Lists</strong> — dummy head, walk both</li>
          <li><strong>Linked List Cycle</strong> — Floyd's tortoise and hare</li>
          <li><strong>Remove Nth From End</strong> — two pointers, fast starts N ahead</li>
          <li><strong>Reorder List</strong> — find middle + reverse second half + merge</li>
        </ul>
        ${c("Why use a dummy head node in linked list problems?",'Edge case unification. Without dummy, "insert before head" is special-case logic. With dummy, every insert is identical: prev.next = newNode. Cleaner code, fewer bugs.')}`}],template:`function reverseList(head) {
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
        ${We({nodes:[{val:1},{val:2},{val:3},{val:4},{val:5},{val:6},{val:7}],highlight:[0],caption:"Root = node 0. Recurse left (subtree rooted at 1) and right (subtree rooted at 2)."})}`},{title:"DFS vs BFS",body:()=>`
        ${m({headers:["Strategy","How","When"],rows:[["DFS (depth-first)","Recursion or explicit stack","Path-based, height, sum, validate"],["BFS (breadth-first)","Queue","Level-by-level, shortest path in unweighted"]]})}
        <p>DFS has three sub-strategies: <strong>pre-order</strong> (node, left, right — used for copy/serialize), <strong>in-order</strong> (left, node, right — gives sorted output for BST), <strong>post-order</strong> (left, right, node — used for delete/aggregate).</p>`},{title:"BST — Binary Search Tree",body:()=>`
        <p>A BST has the property: for every node, all values in left subtree are smaller, all in right are larger. This makes search O(log n) in balanced trees.</p>
        <p><strong>Validate BST.</strong> Pass down (min, max) bounds. Each node must be within bounds. Recurse with updated bounds.</p>
        ${n("In-order traversal of a BST yields sorted values. Use this to validate, or to find kth smallest in O(k).","insight")}`},{title:"Common Tree Problems",body:()=>`
        ${m({headers:["Problem","Strategy"],rows:[["Max depth","DFS, return 1 + max(left, right)"],["Invert binary tree","DFS, swap children at each node"],["Same tree","Recurse both simultaneously"],["Lowest common ancestor (BST)","Walk down: go left/right by comparing to both targets"],["Level order","BFS with queue"],["Diameter","DFS returning depth, track max (leftDepth + rightDepth)"]]})}
        ${c("Recursive DFS uses O(h) call stack where h is tree height. When is this a problem?","When h ≈ n (skewed tree, e.g., right-only chain). Stack overflow possible at 10K+ depth. Fix: iterative DFS with explicit stack.")}`}],template:`function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`},tries:{title:"Tries",subtitle:"Prefix trees for word problems",duration:"20 min read",difficulty:"Intermediate",pattern:"Tries",sections:[{title:"Core Insight",body:()=>`
        <p>A trie (prefix tree) is a tree where each node represents a character, and paths from root spell words. Lookups are O(word length), not O(num words). Used for autocomplete, spell-check, IP routing.</p>
        <p>Each node: a map from char → child node, plus a flag "is this a word end?"</p>`},{title:"Why Trie Over Hash Set",body:()=>`
        ${m({headers:["Operation","Hash Set of words","Trie"],rows:[["Exact match","O(1) average","O(word length)"],["Prefix search","O(n × prefix len)","O(prefix length)"],["All words with prefix","Scan all n","DFS from prefix node"],["Memory","O(total chars)","O(unique paths) — saves on shared prefixes"]]})}
        <p>For autocomplete ("show me all words starting with 'app'"), trie crushes hash set.</p>`},{title:"Common Problems",body:()=>`
        <ul>
          <li><strong>Implement Trie</strong> — insert, search, startsWith</li>
          <li><strong>Word Search II</strong> — find which words from a list exist in 2D grid. Trie + DFS, prune aggressively.</li>
          <li><strong>Add and Search Word</strong> — supports wildcard '.', DFS through all children when wildcard.</li>
          <li><strong>Replace Words</strong> — replace each word with its shortest dict-root, trie lookup.</li>
        </ul>
        ${n("Tries shine when many strings share prefixes. For random strings with no shared prefixes, hash set is simpler and uses less memory.","insight")}
        ${c(`You're building autocomplete for a 100K-word dictionary. User types "intern". How does trie return all completions?`,'Walk down "i→n→t→e→r→n" (6 ops). Then DFS from that node, collecting every reachable word-end. Returns "intern, internal, internet, intern­ship, ..." in time proportional to output size.')}`}],template:`class TrieNode {
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
        ${n("Counter-intuitive: for kth LARGEST, use min-heap. For kth SMALLEST, use max-heap. The heap stores K candidates; you want to easily evict the worst one.","insight")}`},{title:"Two Heaps for Median",body:()=>`
        <p><strong>Problem:</strong> Find median of a stream of numbers.</p>
        <p>Two heaps. <strong>Max-heap</strong> holds smaller half. <strong>Min-heap</strong> holds larger half. Keep sizes balanced (differ by at most 1). Median = root of larger heap, or average of both roots.</p>
        ${n('Two-heap trick generalizes: any time you need to know "median" or "middle element" of a moving set, two heaps maintain it in O(log n) per operation.',"insight")}`},{title:"Common Problems",body:()=>`
        <ul>
          <li><strong>Kth Largest Element</strong> — min-heap size K</li>
          <li><strong>Top K Frequent Elements</strong> — heap of (frequency, element)</li>
          <li><strong>Merge K Sorted Lists</strong> — heap of K list-head pointers</li>
          <li><strong>Find Median from Data Stream</strong> — two heaps</li>
          <li><strong>Task Scheduler</strong> — max-heap of task counts</li>
        </ul>
        ${c("Why is heap better than sort for kth largest in a stream?","Sort is O(n log n) and needs all data first. Heap is O(log K) per element, processes streaming data, uses O(K) memory. Massive win for large n, small K.")}`}],template:`// JS doesn't have built-in heap; use a library or roll your own.
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
        ${m({headers:["Problem","isComplete","choices","pruning"],rows:[["Subsets","always (every state is valid)","include or skip each element","none"],["Permutations","state.length === n","remaining unused elements","used set"],["Combinations(n, k)","state.length === k","numbers > last chosen","monotonic"],["N-Queens","placed n queens","columns in current row","no conflict with prior"],["Word Search","matched all chars","adjacent cells","visited set, char match"]]})}`},{title:"Pruning is Everything",body:()=>`
        <p>Naive backtracking can blow up exponentially. Pruning — eliminating dead branches early — is what makes it tractable.</p>
        <p>Example: in N-Queens, before placing a queen, check if any prior queen attacks this cell. If yes, skip — don't recurse into the doomed subtree.</p>
        ${n("If your backtracking solution times out, the fix is almost always more aggressive pruning, not a different algorithm.","insight")}
        ${c('Why must you "undo" the choice in backtracking? What if you just skipped it?',"You're sharing one state object across all branches. Without undo, the next branch starts with the previous branch's additions. Undo restores the state so siblings get a clean slate.")}`}],template:`function subsets(nums) {
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
        ${m({headers:["Form","How","When"],rows:[["Adjacency list","Map: node → [neighbors]","Default for most problems. Memory: O(V+E)."],["Adjacency matrix","2D array: matrix[i][j] = 1 if edge","Dense graphs. Memory: O(V²)."],["Edge list","List of (u, v, weight)","Algorithms like Kruskal's MST."]]})}`},{title:"BFS — Shortest Path Unweighted",body:()=>`
        <p>BFS visits nodes in order of distance from start. First time you reach a node, you reached it via shortest path. Perfect for "minimum steps" problems on grids.</p>
        <p><strong>Number of Islands.</strong> Iterate grid. Each unvisited "1" → BFS/DFS marks the whole island as visited. Count islands.</p>
        <p><strong>Rotting Oranges.</strong> Multi-source BFS. Push all initially rotten oranges into queue at time 0. BFS, tracking max time. Answer = max time when queue empty.</p>`},{title:"Topological Sort",body:()=>`
        <p>For a DAG (directed acyclic graph), produce an ordering where every edge u→v has u before v.</p>
        <p><strong>Course Schedule.</strong> "Can I take all courses given prerequisites?" Build graph, do topo sort. If cycle exists, impossible.</p>
        <p>Two ways: Kahn's algorithm (BFS with in-degrees) or DFS post-order with cycle detection.</p>
        ${n('Topo sort is the answer to any "ordering with dependencies" problem. Build order, task scheduling, package install order, you name it.',"insight")}
        ${c("Why does BFS give shortest path in UNWEIGHTED graphs but not weighted?","BFS visits in order of edge count. If all edges have cost 1, edge count = path cost. With weights, fewest edges ≠ cheapest path. Need Dijkstra.")}`}],template:`function bfs(start, graph) {
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
        ${n("Dijkstra fails on negative weights — once a node is finalized, you assume nothing cheaper comes. Negative edges can violate that.","warning")}`},{title:"Bellman-Ford — Handles Negative Weights",body:()=>`
        <p>Slower than Dijkstra (O(V × E)) but handles negative edges. Also detects negative cycles.</p>
        <p>Algorithm: relax every edge V-1 times. After that, if any edge can still be relaxed, there's a negative cycle.</p>`},{title:"MST — Minimum Spanning Tree",body:()=>`
        <p>Connect all nodes with minimum total edge weight. Two algorithms:</p>
        <p><strong>Prim's.</strong> Like Dijkstra but for MST. Grow tree from a start node, always add cheapest edge crossing tree boundary.</p>
        <p><strong>Kruskal's.</strong> Sort all edges by weight. Add cheapest, skip if it creates cycle (Union-Find). Continue until V-1 edges.</p>`},{title:"Union-Find (Disjoint Set Union)",body:()=>`
        <p>Data structure for "what group does X belong to" and "merge two groups." O(α(n)) per op (effectively constant).</p>
        <p>Two operations: <strong>find(x)</strong> = which group is X in, <strong>union(x, y)</strong> = merge X's group with Y's.</p>
        <p>Path compression + union by rank make it nearly O(1). Used in Kruskal's, connected components, dynamic connectivity.</p>
        ${c("When would you use Bellman-Ford over Dijkstra?","Negative edge weights. Currency arbitrage detection (negative cycle = arbitrage opportunity). Routing where some edges represent rebates/credits.")}`}],template:`function dijkstra(start, graph) {
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
        ${n("If your recurrence only references the last K values, you can drop the full DP array and use K rolling variables. Reduces O(n) space to O(1).","insight")}`},{title:"House Robber Family",body:()=>`
        <p><strong>Problem:</strong> houses in a row with money. Can't rob adjacent. Max money?</p>
        <p>Recurrence: <code>rob(i) = max(rob(i-1), rob(i-2) + money[i])</code>. Either skip house i (take previous best) or rob house i (take best ending two back, plus current).</p>
        <p>Variants: House Robber II (houses in circle — solve two linear subproblems), House Robber III (tree — recurse with two states).</p>`},{title:"Longest Increasing Subsequence",body:()=>`
        <p><strong>Problem:</strong> Length of longest strictly increasing subsequence (not contiguous).</p>
        <p>DP: <code>dp[i] = 1 + max(dp[j] for j < i if nums[j] < nums[i])</code>. O(n²).</p>
        <p>Hard mode: O(n log n) with patience sort / binary search. Maintain a "tails" array where tails[k] = smallest tail of an increasing subseq of length k+1.</p>
        ${c("Top-down vs bottom-up DP: when to prefer each?","Top-down (memoize recursion): natural when not all subproblems needed; great for sparse states. Bottom-up (tabulate): faster in practice (no call overhead), often allows space optimization.")}`}],template:`function climbStairs(n) {
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
        ${n("Grid DP often reduces to 1D space — to compute row i you only need row i-1. Roll over the array.","insight")}`},{title:"Longest Common Subsequence",body:()=>`
        <p><strong>Problem:</strong> Length of LCS of two strings (not contiguous).</p>
        <p>Recurrence: if chars match, <code>dp[i][j] = 1 + dp[i-1][j-1]</code>. Else, <code>dp[i][j] = max(dp[i-1][j], dp[i][j-1])</code>.</p>
        <p>This pattern generalizes: edit distance, longest palindromic subseq, regex matching all use it.</p>`},{title:"Edit Distance",body:()=>`
        <p><strong>Problem:</strong> Min operations (insert, delete, replace) to convert string A to string B.</p>
        <p>Recurrence: if chars match, <code>dp[i][j] = dp[i-1][j-1]</code>. Else, <code>dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])</code> for insert/delete/replace.</p>
        <p>Used in spell-checkers, diff tools, DNA sequence alignment.</p>
        ${c("LCS and Edit Distance both fill a (m+1) × (n+1) table. Why m+1, not m?","The extra row/col represents the empty string. LCS of empty with anything is 0. Edit distance of empty to length-k string is k (k inserts). Empty case is the recursion base.")}`}],template:`function longestCommonSubsequence(a, b) {
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
        ${n("Don't use greedy when you can't prove it works. Greedy looks elegant but is often wrong. When in doubt, DP it.","warning")}
        ${c("Coin change: smallest coin count to make N. Greedy (always take largest coin ≤ N) works for [1, 5, 10, 25] but fails for [1, 3, 4] with N=6. Why?","For [1, 5, 10, 25] (US coins), greedy is optimal. For [1, 3, 4] with N=6: greedy takes 4+1+1=3 coins. Optimal is 3+3=2. The greedy property holds for some coin systems and not others. When in doubt, use DP.")}`}],template:`function maxSubArray(nums) {
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
        ${n("Two intervals [a,b] and [c,d] overlap iff a ≤ d AND c ≤ b. Memorize this — every interval problem uses it.","insight")}
        ${c("Why sort by start for most interval problems, not end?",'Sorting by start lets you process in temporal order. As you sweep, "current interval" is well-defined, and "does the next one overlap" only needs to check vs current end. Sorting by end works for some problems (e.g. greedy interval scheduling for max non-overlap) but is less common.')}`}],template:`function merge(intervals) {
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
        ${n('Many matrix problems have a "two-pass trick" — combine simple transformations to get the desired result. Always ask: can I decompose this rotation into known operations?',"insight")}`},{title:"Spiral Matrix",body:()=>`
        <p><strong>Problem:</strong> Traverse matrix in spiral order.</p>
        <p>Maintain four boundaries: top, bottom, left, right. Walk right (top boundary), then down (right boundary), then left, then up. Shrink the boundary you just traversed. Stop when boundaries cross.</p>`},{title:"Plus One — Carry Logic",body:()=>`
        <p><strong>Problem:</strong> Add 1 to a number represented as a digit array.</p>
        <p>Iterate from right. If digit < 9, increment and return. Otherwise set to 0 and carry. If you carry past the leftmost digit, prepend 1.</p>
        <p>Sounds trivial; the edge case (all 9s) is the test.</p>
        ${c("Pow(x, n) — compute x^n. Naive is O(n). Better?","Fast exponentiation: O(log n). x^n = (x^(n/2))² if n even, x × x^(n-1) if odd. Recurse. Same trick used in modular exponentiation for crypto.")}`}],template:`function rotate(matrix) {
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
        ${n("XOR is your friend whenever pairs need to cancel. It's commutative and associative, so order doesn't matter.","insight")}`},{title:"Counting Bits",body:()=>`
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
        ${c("How to check if a number is a power of 2?","n > 0 AND (n & (n-1)) === 0. Powers of 2 have exactly one bit set. n-1 flips all bits below; AND with n gives 0.")}`}],template:`function singleNumber(nums) {
  let result = 0;
  for (const num of nums) result ^= num;
  return result;
}`}},I={name:"Mini-Projects",icon:"⌂",color:"#E07856",lessons:["health-watchdog","hardened-container","cicd-rollback","k8s-lab","ml-inference-api","drift-detector","rate-limiter","capstone"]},He={2:"health-watchdog",5:"hardened-container",6:"cicd-rollback",7:"k8s-lab",8:"k8s-lab",11:"ml-inference-api",12:"drift-detector",20:"capstone"},w=(e,t)=>({title:e,body:()=>t}),B=e=>`
  <ul style="list-style: none; padding: 0; margin: 0;">
    ${e.map(t=>`<li style="padding: 8px 0; border-bottom: 1px solid var(--border-subtle); display: flex; gap: 10px;">
      <span style="color: var(--accent-amber); font-family: var(--font-mono); font-size: 11px; padding-top: 2px;">▸</span>
      <span>${t}</span>
    </li>`).join("")}
  </ul>`,O=e=>`
  <ol style="list-style: none; padding: 0; counter-reset: step;">
    ${e.map(t=>`<li style="counter-increment: step; padding: 14px 0; border-bottom: 1px solid var(--border-subtle); display: grid; grid-template-columns: 32px 1fr; gap: 14px;">
      <div style="font-family: var(--font-mono); font-size: 13px; color: var(--accent-amber); font-weight: 600;">${String(t.n||"").padStart(2,"0")||"<span style='color:transparent'>0</span>"}</div>
      <div>
        <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">${t.title}</div>
        <div style="color: var(--text-secondary); font-size: 14px; line-height: 1.6;">${t.body}</div>
      </div>
    </li>`).join("")}
  </ol>`,E=e=>`
  <ul style="list-style: none; padding: 0; margin: 0;">
    ${e.map(t=>`<li style="padding: 10px 0; border-bottom: 1px solid var(--border-subtle); display: flex; gap: 10px;">
      <span style="color: #8FA876; font-size: 14px; line-height: 1.4;">✓</span>
      <span>${t}</span>
    </li>`).join("")}
  </ul>`,te={"health-watchdog":{track:"projects",title:"Service Health Watchdog",subtitle:"A bash script that pings your services and shouts when something dies",duration:"2-4 hours · Week 2",difficulty:"Foundational",sections:[w("Summary",`
        <p>Build a small daemon-style bash script that periodically hits a list of HTTP endpoints, logs status, and sends an alert (email or Slack webhook) when any of them go down. Runs on a free EC2 t2.micro or your laptop in a tmux session.</p>
        <p>This teaches: bash fundamentals, curl, cron, structured logging, alerting plumbing — the bones of every monitoring system.</p>
      `),w("What you build",`
        ${x({height:220,nodes:[{id:"cron",x:30,y:100,w:90,h:40,label:"cron / loop",sub:"every 60s",color:"#F5B842"},{id:"sh",x:160,y:100,w:110,h:40,label:"watchdog.sh",sub:"curl + parse"},{id:"svc1",x:320,y:30,w:110,h:35,label:"service A",sub:"health endpoint"},{id:"svc2",x:320,y:80,w:110,h:35,label:"service B",sub:"health endpoint"},{id:"svc3",x:320,y:130,w:110,h:35,label:"service C",sub:"health endpoint"},{id:"log",x:470,y:60,w:100,h:40,label:"structured log",sub:"/var/log/...",color:"#8FA876"},{id:"alert",x:470,y:130,w:100,h:40,label:"alert",sub:"slack/email",color:"#E07856"}],edges:[{from:"cron",to:"sh"},{from:"sh",to:"svc1"},{from:"sh",to:"svc2"},{from:"sh",to:"svc3"},{from:"sh",to:"log"},{from:"sh",to:"alert",label:"on fail"}],caption:"Scheduled check loop with structured logging and conditional alert"})}
      `),w("Requirements",`
        ${B(["<strong>Functional:</strong> Reads a list of URLs from a config file (one per line, with optional expected status code)","<strong>Functional:</strong> Hits each endpoint with curl, with a 5-second timeout","<strong>Functional:</strong> Logs every check as JSON to a log file with timestamp, url, status, latency","<strong>Functional:</strong> Sends a Slack webhook (or email) when a check fails — but only once per outage (debounce)","<strong>Non-functional:</strong> Survives bad input (malformed URLs, network errors) without crashing","<strong>Non-functional:</strong> Uses <code>set -euo pipefail</code> and quotes all variables","<strong>Non-functional:</strong> README explains: how to install, configure, run, and test the alert path"])}
      `),w("Steps",`
        ${O([{n:1,title:"Plain script first",body:"Hardcode 3 URLs. curl each. echo the status. Don't worry about anything else."},{n:2,title:"Move URLs to config",body:"Read from <code>watchdog.conf</code>. Loop with <code>while read line</code>. Skip blank lines and # comments."},{n:3,title:"Structured logs",body:'Format each result as JSON: <code>{"ts": "...", "url": "...", "status": 200, "ms": 12}</code>. Append to <code>watchdog.log</code>.'},{n:4,title:"Webhook on failure",body:"On non-2xx status, curl-POST a JSON payload to Slack webhook URL. Read the URL from <code>SLACK_WEBHOOK</code> env var."},{n:5,title:"Debounce",body:"Track outage state in <code>/tmp/watchdog-state-$urlhash</code>. Only alert on the FIRST failure and the recovery — not every minute the service is down."},{n:6,title:"Schedule it",body:"Either: (a) wrap in <code>while true; do ...; sleep 60; done</code> and run under tmux, or (b) crontab entry with <code>* * * * *</code>."},{n:7,title:"Test the alert path",body:"Add a deliberately-wrong URL to config. Confirm Slack message arrives within 60s. Remove it. Confirm recovery message arrives."},{n:8,title:"Ship to GitHub",body:"README with install/usage. Make scripts executable. Tag a v0.1 release."}])}
      `),w("Success criteria",`
        ${E(["Script runs unattended for 24 hours without crashing","Alerts arrive within 60-120 seconds of an outage starting","No spam — one alert per outage, one alert per recovery","Log file is valid JSON Lines (each line independently parseable)","Public GitHub repo with README screenshots of an alert in Slack"])}
        ${n('Stretch: add response-body assertions ("expect JSON containing status:ok"), Prometheus textfile exporter, or a tiny status page that reads the log and shows a 24h uptime chart.',"insight")}
      `)],keyTerms:["bash","curl","cron","webhooks","debouncing","JSON Lines logs"],sources:["Slack incoming webhook docs","cron man page","Pingdom / UptimeRobot for inspiration"]},"hardened-container":{track:"projects",title:"Hardened Container Build",subtitle:"Multi-stage Dockerfile that passes Trivy with zero high/critical CVEs",duration:"3-5 hours · Week 5",difficulty:"Foundational",sections:[w("Summary",`
        <p>Take a Python (or Go) web service. Produce a Docker image that is: smaller than 50MB, runs as a non-root user, has no shell or compilers, and passes Trivy/Grype security scan with zero High or Critical CVEs.</p>
        <p>This teaches: multi-stage builds, base image selection, least-privilege containers, vulnerability scanning. These are the table-stakes for any container you ship to prod.</p>
      `),w("Architecture",`
        ${x({height:240,nodes:[{id:"src",x:30,y:100,w:90,h:40,label:"source",sub:"your app"},{id:"b",x:150,y:100,w:110,h:50,label:"Stage 1: build",sub:"python:3.11 + tools",color:"#F5B842"},{id:"r",x:290,y:100,w:110,h:50,label:"Stage 2: runtime",sub:"distroless / alpine",color:"#8FA876"},{id:"img",x:430,y:100,w:110,h:40,label:"final image",sub:"< 50 MB"},{id:"sc",x:290,y:190,w:110,h:35,label:"trivy scan",color:"#E07856"}],edges:[{from:"src",to:"b"},{from:"b",to:"r",label:"COPY artifact"},{from:"r",to:"img"},{from:"img",to:"sc"}],caption:"Builder image contains tools; runtime image has only the artifact"})}
      `),w("Requirements",`
        ${B(["<strong>Multi-stage Dockerfile.</strong> Builder installs deps and compiles; runtime contains only the artifact.","<strong>Non-root user.</strong> Final image runs as UID 1000+, not root. <code>USER appuser</code>.","<strong>No shell in final image.</strong> Use distroless or scratch where possible. <code>kubectl exec -- bash</code> should fail.","<strong>Minimal layers.</strong> Combine RUN commands. Use <code>.dockerignore</code> aggressively.","<strong>Size budget.</strong> Final image &lt; 50 MB. Compare to naive build to see the win.","<strong>CVE scan clean.</strong> Trivy or Grype reports zero High or Critical CVEs.","<strong>Read-only filesystem.</strong> Image works with <code>--read-only</code> flag (write to /tmp tmpfs if needed)."])}
      `),w("Steps",`
        ${O([{n:1,title:"Baseline measurement",body:"Write naive Dockerfile (FROM python:3.11, COPY ., RUN pip install). Build. Note image size and Trivy CVE count."},{n:2,title:"Multi-stage refactor",body:"Split into builder + runtime. Builder uses full python:3.11. Runtime uses python:3.11-slim. COPY --from=builder the venv or wheel."},{n:3,title:"Try distroless",body:"Replace runtime base with <code>gcr.io/distroless/python3-debian12</code>. May require building your venv to be standalone. Pure-Python apps are easier."},{n:4,title:"Add non-root user",body:"In runtime stage: <code>USER nonroot</code> (distroless ships this already). For alpine: <code>RUN adduser -D appuser && USER appuser</code>."},{n:5,title:"Install Trivy",body:"<code>brew install trivy</code> or download binary. Scan: <code>trivy image yourapp:latest</code>. Note any High/Critical."},{n:6,title:"Fix CVEs",body:"Update base image tags. Pin to latest patch versions of deps. Some CVEs unfixable — document accepted risks in SECURITY.md."},{n:7,title:"Verify hardening",body:"Run with <code>--read-only --cap-drop=ALL --security-opt=no-new-privileges</code>. Confirm app still works."},{n:8,title:"Document the deltas",body:"README table: naive vs hardened. Image size, layer count, CVE count, attack surface notes."}])}
      `),w("Success criteria",`
        ${E(["Final image &lt; 50 MB (or &lt; 20 MB for distroless Python with a small app)","Trivy/Grype scan shows zero High or Critical CVEs","<code>docker run --user 1000:1000 --read-only --cap-drop=ALL</code> works","<code>docker exec -it ... sh</code> fails (no shell in image)","README documents the before/after metrics with screenshots"])}
        ${n("Going further: sign images with Cosign, generate SBOM with syft, add CI gate that fails build on new High CVEs. This is the path to supply-chain security maturity (SLSA levels).","insight")}
      `)],keyTerms:["multi-stage build","distroless","Trivy / Grype","non-root","read-only filesystem","CVE"],sources:["Docker multi-stage docs","distroless GitHub (gcr.io/distroless)","Trivy docs (aquasecurity.github.io/trivy)"]},"cicd-rollback":{track:"projects",title:"CI/CD Pipeline with Rollback",subtitle:"GitHub Actions pipeline: test, build, deploy, one-click revert",duration:"4-6 hours · Week 6",difficulty:"Foundational",sections:[w("Summary",`
        <p>Build a real CI/CD pipeline using GitHub Actions for a small web app. Every PR runs tests. Every merge to main builds an image, tags it with the git SHA, and deploys to a staging environment. Promotion to production requires a manual approval. A separate "Rollback" workflow lets you revert to any previous image with one click.</p>
        <p>This teaches: pipeline stages, secret management, image tagging conventions, deployment environments, rollback safety nets. The exact same shape as a real production pipeline at a tech company.</p>
      `),w("Pipeline architecture",`
        ${W({actors:["PR","CI","Registry","Staging","Prod"],height:320,messages:[{from:0,to:1,label:"open PR"},{from:1,to:1,label:"lint + test"},{from:1,to:0,label:"green ✓ → merge",return:!0},{from:1,to:2,label:"build + push :sha"},{from:1,to:3,label:"kubectl set image (auto)"},{from:1,to:0,label:"staging live",return:!0},{from:0,to:1,label:"manual: promote"},{from:1,to:4,label:"kubectl set image"},{from:4,to:0,label:"prod live ✓",return:!0}],caption:"Auto to staging, manual gate to prod"})}
      `),w("Requirements",`
        ${B(["<strong>PR pipeline:</strong> lint + unit tests + (optional) coverage report","<strong>Main pipeline:</strong> tests + build image + push to GHCR or Docker Hub with <code>:$&lcub;GITHUB_SHA&rcub;</code> tag and <code>:latest</code>","<strong>Staging deploy:</strong> auto on every main commit, no human in the loop","<strong>Prod deploy:</strong> requires manual approval (GitHub Environment with required reviewers)","<strong>Rollback workflow:</strong> separate workflow_dispatch that takes a tag/SHA input and deploys it","<strong>Secrets in GitHub Secrets,</strong> never in YAML","<strong>Notifications:</strong> Slack message on deploy success/failure (bonus)"])}
      `),w("Steps",`
        ${O([{n:1,title:"Scaffold the app",body:"Tiny FastAPI/Express app with a /health endpoint and one unit test. Dockerfile already done."},{n:2,title:"CI workflow",body:"Create <code>.github/workflows/ci.yml</code>. Trigger on push + pull_request. Steps: checkout, setup language, install, lint, test."},{n:3,title:"Build & push",body:"Add job that runs only on push to main. Use <code>docker/login-action</code> + <code>docker/build-push-action</code>. Tag with SHA and latest."},{n:4,title:"Set up staging cluster",body:"Easiest: a free Fly.io app or a tiny K8s on Civo/Kind. Get kubectl context working."},{n:5,title:"Staging deploy job",body:"After build, kubectl apply or <code>kubectl set image deployment/api api=ghcr.io/you/app:$&lcub;sha&rcub;</code>. Smoke test the new pod."},{n:6,title:"Production environment",body:'In GitHub repo settings → Environments → New: "production". Add yourself as required reviewer.'},{n:7,title:"Promote workflow",body:"New job <code>environment: production</code>. GitHub blocks until you approve. Same kubectl set image, against prod context."},{n:8,title:"Rollback workflow",body:"New <code>rollback.yml</code> with <code>workflow_dispatch</code> taking input <code>image_tag</code>. Single kubectl step. Test by deploying current version - 1."},{n:9,title:"Document",body:"README with arch diagram, secrets needed, how to trigger a rollback. Screenshot of the approval gate."}])}
      `),w("Success criteria",`
        ${E(["Every PR shows green/red check in GitHub UI","Merging to main results in staging being updated within 5 min, automatically",'Promoting to prod is blocked until you click "Approve" in GitHub',"Rollback workflow successfully reverts to previous SHA in &lt; 2 min","No secrets in any committed file (verify with git log + grep)"])}
        ${n("Stretch: add canary deploy (route 10% traffic to new version, wait, then 100%). Add automatic rollback on error rate > threshold. This is where SLO-driven deployment lives.","insight")}
      `)],keyTerms:["GitHub Actions","GHCR / Docker Hub","GitHub Environments","workflow_dispatch","rollback","manual approval gate"],sources:["GitHub Actions docs","docker/build-push-action README","GitHub Environments docs"]},"k8s-lab":{track:"projects",title:"Kubernetes Deploy Lab",subtitle:"Local cluster, deploy a service, probes, rolling update, intentional outage",duration:"4-6 hours · Week 7-8",difficulty:"Intermediate",sections:[w("Summary",`
        <p>Run a local Kubernetes cluster (kind or minikube). Deploy a small HTTP service with proper liveness/readiness probes, resource limits, and 3 replicas behind a Service. Perform a rolling update without dropping traffic. Then deliberately break it and write up the incident.</p>
        <p>This teaches: K8s primitives, probe semantics, deployment strategies, debugging methodology. The hands-on intuition that makes the K8s lesson actually stick.</p>
      `),w("What you build",`
        ${x({height:240,nodes:[{id:"kind",x:30,y:30,w:100,h:35,label:"kind cluster",sub:"3 nodes"},{id:"d",x:160,y:30,w:110,h:35,label:"Deployment",sub:"api · 3 replicas",color:"#F5B842"},{id:"p1",x:300,y:20,w:80,h:30,label:"pod-1"},{id:"p2",x:300,y:60,w:80,h:30,label:"pod-2"},{id:"p3",x:300,y:100,w:80,h:30,label:"pod-3"},{id:"s",x:160,y:140,w:110,h:35,label:"Service",sub:"ClusterIP",color:"#8FA876"},{id:"i",x:30,y:140,w:100,h:35,label:"Ingress",sub:"localhost:8080"}],edges:[{from:"i",to:"s"},{from:"s",to:"p1"},{from:"s",to:"p2"},{from:"s",to:"p3"},{from:"d",to:"p1"},{from:"d",to:"p2"},{from:"d",to:"p3"}],caption:"Standard K8s primitives wired together"})}
      `),w("Requirements",`
        ${B(["<strong>Local cluster</strong> running via kind or minikube (free, runs on laptop)","<strong>Deployment manifest</strong> with 3 replicas, image pull policy, resource requests/limits","<strong>Liveness probe:</strong> HTTP GET /healthz, expects 200, otherwise restart","<strong>Readiness probe:</strong> HTTP GET /readyz that returns 503 during warmup","<strong>Service</strong> selecting the deployment, exposing port 80 → 8000","<strong>Ingress or NodePort</strong> for external access (curl from host)","<strong>Rolling update</strong> from v1 to v2 with zero dropped requests","<strong>Incident writeup</strong> after deliberately breaking it (see step 7)"])}
      `),w("Steps",`
        ${O([{n:1,title:"Install kind",body:"<code>brew install kind</code> or <code>go install sigs.k8s.io/kind</code>. Create a cluster: <code>kind create cluster --name lab</code>."},{n:2,title:"Tiny service with health endpoints",body:"FastAPI or Go with /healthz (always 200) and /readyz (returns 503 for first 5s after startup)."},{n:3,title:"Build & load image into kind",body:"<code>docker build -t myapp:v1 .</code> then <code>kind load docker-image myapp:v1 --name lab</code> (kind doesn't use the host registry)."},{n:4,title:"Write the YAML",body:"Deployment with 3 replicas, both probes, resources. Service with selector matching the deployment labels. Apply with <code>kubectl apply -f</code>."},{n:5,title:"Verify and port-forward",body:"<code>kubectl get pods</code> shows 3 running. <code>kubectl port-forward svc/api 8080:80</code>. curl localhost:8080/healthz returns 200."},{n:6,title:"Rolling update",body:"Change something visible (env var or response). Build as v2. Load into kind. <code>kubectl set image deployment/api api=myapp:v2</code>. Watch <code>kubectl rollout status</code> and confirm with a loop: <code>while true; do curl ...; sleep 0.5; done</code>. Zero failures."},{n:7,title:"Deliberately break it",body:"Pick one: ship an image that crashes on startup, OR set memory limit too low (OOMKilled), OR break the liveness endpoint. Observe what happens. <code>kubectl describe pod</code>, <code>kubectl logs --previous</code>."},{n:8,title:"Incident writeup",body:"In INCIDENT.md: timeline, symptoms, root cause, what kubectl commands gave you the answer, fix. This is gold for behavioral interviews."}])}
      `),w("Success criteria",`
        ${E(["kubectl get pods shows 3/3 Running consistently","Rolling update from v1 to v2 with zero failed requests","Killing a pod (<code>kubectl delete pod ...</code>) results in K8s creating a new one within 30 seconds","Incident writeup is honest, specific, and shows debugging methodology — not a recipe","Everything is in a public GitHub repo with reproducible setup instructions"])}
        ${n("Stretch: add HorizontalPodAutoscaler that scales on CPU, then load-test with hey or k6 to see it scale up under load.","insight")}
      `)],keyTerms:["kind / minikube","Deployment","Service","Liveness/Readiness probes","Rolling update","kubectl describe / logs --previous"],sources:["Kubernetes official tutorials","kind quick start (kind.sigs.k8s.io)",'"K8s the Hard Way" (advanced reference)']},"ml-inference-api":{track:"projects",title:"ML Inference API",subtitle:"Train a model. Serve it via FastAPI. Measure latency.",duration:"4-6 hours · Week 11",difficulty:"Intermediate",sections:[w("Summary",`
        <p>Train a simple classifier (sklearn) on a real dataset. Save the model artifact. Build a FastAPI service that loads the model at startup and exposes a /predict endpoint. Add Prometheus-style metrics for latency and prediction distribution. Containerize it. Load-test it.</p>
        <p>This teaches: the entire path from notebook to production endpoint. The artifact is something you can show on a resume.</p>
      `),w("System architecture",`
        ${x({height:240,nodes:[{id:"d",x:30,y:30,w:100,h:35,label:"dataset",sub:"CSV / Parquet"},{id:"t",x:160,y:30,w:110,h:35,label:"train.py",sub:"sklearn fit",color:"#F5B842"},{id:"a",x:300,y:30,w:110,h:35,label:"model.pkl",sub:"pickle / joblib"},{id:"api",x:160,y:110,w:110,h:45,label:"FastAPI",sub:"POST /predict",color:"#7B9FB5"},{id:"cli",x:30,y:110,w:100,h:45,label:"client",sub:"curl / k6"},{id:"m",x:300,y:110,w:110,h:45,label:"/metrics",sub:"prom format",color:"#8FA876"}],edges:[{from:"d",to:"t"},{from:"t",to:"a"},{from:"a",to:"api",label:"load on start"},{from:"cli",to:"api"},{from:"api",to:"m"}],caption:"Trained artifact loaded at startup; metrics exposed for scraping"})}
      `),w("Requirements",`
        ${B(["<strong>train.py:</strong> loads dataset, splits, trains, evaluates, persists model with metadata (date, metrics, version)","<strong>serve.py:</strong> FastAPI app. Loads model at startup (not per request). /predict accepts JSON, returns prediction + confidence.","<strong>/healthz:</strong> returns 200 if model loaded","<strong>/metrics:</strong> exposes Prometheus-format: request count, p50/p95/p99 latency, prediction distribution","<strong>Containerized</strong> with the hardened-container pattern from Week 5","<strong>Load test results</strong> documented (using hey, k6, or wrk): RPS sustained, p95 latency","<strong>Input validation:</strong> bad input returns 400, not 500"])}
      `),w("Steps",`
        ${O([{n:1,title:"Pick a dataset",body:"Iris (boring but fast), Titanic, or a Kaggle binary classification with &lt; 10 features. Smaller is better for this project."},{n:2,title:"train.py",body:'Load with pandas. Split 80/20. Fit LogisticRegression. Print accuracy, precision, recall. <code>joblib.dump(model, "model.pkl")</code>.'},{n:3,title:"Save metadata",body:"Alongside model.pkl: model_meta.json with training_date, dataset_hash, metrics, feature_names, sklearn_version."},{n:4,title:"Build FastAPI",body:"Single endpoint POST /predict. Use Pydantic for input schema validation. Load model in startup event, not request handler."},{n:5,title:"Add metrics",body:"Install <code>prometheus-fastapi-instrumentator</code>. Expose /metrics. Add a Histogram for prediction values to detect drift later."},{n:6,title:"Dockerize",body:"Multi-stage. Builder installs deps. Runtime is python:3.11-slim with just model.pkl + serve.py. Non-root user."},{n:7,title:"Load test",body:"Install hey or k6. Hit /predict with 100 concurrent requests for 30 seconds: <code>hey -z 30s -c 100 -m POST -d '...' http://localhost:8000/predict</code>. Record p50/p95/p99."},{n:8,title:"Document",body:"README with: architecture diagram, model card (what it predicts, training data, known limitations), API spec, load test results."}])}
      `),w("Success criteria",`
        ${E(["curl POST /predict returns a sensible prediction in &lt; 100ms p99","/metrics returns valid Prometheus format with at least 5 metric series","Load test sustains &gt;= 500 RPS without errors","Invalid input (wrong types, missing fields) returns 422 with helpful error","Container image &lt; 200 MB total, runs as non-root"])}
        ${n("Stretch: add batching (collect requests for 10ms, predict together) for ~10x throughput. Add a shadow mode endpoint that runs a second model and logs the disagreement rate.","insight")}
      `)],keyTerms:["FastAPI","sklearn / joblib","Pydantic validation","Prometheus metrics","Histogram","Load testing (hey / k6)","Model artifact"],sources:["FastAPI docs","sklearn user guide","prometheus-fastapi-instrumentator","k6.io load testing"]},"drift-detector":{track:"projects",title:"Drift Detection Service",subtitle:"Monitor a model's input distribution and alert when it shifts",duration:"5-7 hours · Week 12",difficulty:"Intermediate",sections:[w("Summary",`
        <p>Build a service that ingests inference requests from your ML API (the previous project), stores feature statistics over a sliding window, compares to the training distribution, and raises an alert when drift exceeds a threshold.</p>
        <p>This is the missing piece between "model deployed" and "model trusted in production." Drift detection is one of the most underrated MLOps skills and one of the easiest to demo at interviews.</p>
      `),w("System flow",`
        ${W({actors:["Client","Inference API","Drift Service","Alerts"],height:290,messages:[{from:0,to:1,label:"POST /predict"},{from:1,to:0,label:"prediction",return:!0},{from:1,to:2,label:"log features async"},{from:2,to:2,label:"update windowed stats"},{from:2,to:2,label:"compare vs training baseline"},{from:2,to:3,label:"PSI &gt; 0.2 → alert",return:!0}],caption:"Async logging keeps inference latency unaffected"})}
      `),w("Requirements",`
        ${B(["<strong>Training baseline:</strong> compute mean, std, histogram of each feature on your training set. Save as <code>baseline.json</code>.","<strong>Stats collector:</strong> service that receives feature payloads (HTTP POST or read from log file)","<strong>Sliding window:</strong> keep last N hours of feature values","<strong>Drift metric:</strong> calculate Population Stability Index (PSI) per feature, every 5 minutes","<strong>Alerting:</strong> when any feature's PSI > 0.2, fire a Slack alert with which feature and the drift magnitude","<strong>Dashboard:</strong> simple HTML page showing each feature's baseline vs current distribution","<strong>Integration:</strong> ML inference API from previous project logs to this service"])}
      `),w("Steps",`
        ${O([{n:1,title:"Compute baseline",body:'After training (from previous project), iterate your training set. For each feature: store mean, std, and histogram (10 buckets). Save as baseline.json. This is what "normal" looks like.'},{n:2,title:"Async logging in inference API",body:"In serve.py, after prediction, fire-and-forget POST to drift service with the input features. Use httpx.AsyncClient. Never block the prediction response."},{n:3,title:"Drift service skeleton",body:"New FastAPI app. POST /log accepts feature payloads. Stores in an in-memory deque (or Redis list) capped at last 10K rows."},{n:4,title:"PSI calculation",body:"Every 5 minutes (background task): bucket the recent features using baseline's histogram edges. Calculate PSI = Σ (current% - baseline%) * ln(current% / baseline%). PSI &gt; 0.2 = significant drift."},{n:5,title:"Alert on drift",body:"When PSI > 0.2 for any feature, fire Slack webhook with feature name, PSI value, top-3 most-shifted bins. Debounce so you don't alert every 5 min."},{n:6,title:"Dashboard",body:"Endpoint GET / returns HTML showing each feature: baseline distribution (gray), current distribution (amber), current PSI value. Refreshes every 30s."},{n:7,title:"Simulate drift",body:"Write a script that calls /predict with deliberately shifted inputs (e.g., add +2 to all values of one feature). Confirm alert fires within ~10 min."},{n:8,title:"Write up",body:"README with PSI explainer, dashboard screenshot, simulated alert screenshot. Bonus: explain when you'd trigger retraining vs investigate."}])}
      `),w("Success criteria",`
        ${E(["Inference API latency p99 unchanged (drift logging is non-blocking)","Drift service correctly computes PSI matching scipy reference calc within 1%","Simulated input shift triggers Slack alert within 10 minutes","Dashboard visually shows the distribution change","No alerts during normal operation (proves baseline is good)"])}
        ${n("Stretch: also monitor prediction drift (output distribution), correlation between features (covariate shift), and add KL divergence as a second metric for cross-validation of alerts.","insight")}
      `)],keyTerms:["Drift","PSI (Population Stability Index)","Baseline","Sliding window","Async logging","Debounced alerts"],sources:["EvidentlyAI blog (best resource)","Aporia drift detection docs","Original PSI paper (Yurdakul, 2018)"]},"rate-limiter":{track:"projects",title:"Rate Limiter from Scratch",subtitle:"Token bucket implementation, Redis-backed, with tests",duration:"3-5 hours · anytime",difficulty:"Intermediate",sections:[w("Summary",`
        <p>Implement a rate limiter as a reusable Python (or Go) library. Token-bucket algorithm, backed by Redis so it works across multiple service instances. Include unit tests for correctness and a small benchmark. This is a classic system design interview problem AND a useful real-world component.</p>
      `),w("Token bucket model",`
        ${x({height:200,nodes:[{id:"req",x:30,y:80,w:80,h:40,label:"request"},{id:"lim",x:150,y:80,w:130,h:60,label:"rate limiter",sub:"allow? consume?",color:"#F5B842"},{id:"b",x:320,y:30,w:100,h:40,label:"token bucket",sub:"capacity=10"},{id:"r",x:320,y:130,w:100,h:40,label:"Redis",sub:"shared state",color:"#7B9FB5"},{id:"ok",x:450,y:50,w:90,h:30,label:"200 OK",color:"#8FA876"},{id:"no",x:450,y:110,w:90,h:30,label:"429",color:"#E07856"}],edges:[{from:"req",to:"lim"},{from:"lim",to:"b"},{from:"lim",to:"r"},{from:"lim",to:"ok",label:"token available"},{from:"lim",to:"no",label:"no token"}],caption:"Bucket refills at fixed rate. Each request consumes one token. Empty bucket → reject."})}
      `),w("Requirements",`
        ${B(["<strong>API:</strong> <code>is_allowed(key, rate, capacity) -> bool</code>","<strong>Algorithm:</strong> token bucket. Tokens refill continuously at <code>rate</code> per second up to <code>capacity</code>.","<strong>Atomic:</strong> uses Redis Lua script to ensure check-and-decrement is atomic (no race conditions)","<strong>Per-key:</strong> different rate limits for different keys (user_id, IP, API token)","<strong>Tests:</strong> verify behavior with concurrent calls; show that we don't leak tokens","<strong>Benchmarks:</strong> measure latency overhead (target: &lt; 1ms p99)","<strong>Headers:</strong> when integrated, returns standard <code>X-RateLimit-*</code> headers"])}
      `),w("Steps",`
        ${O([{n:1,title:"In-memory version first",body:"Class TokenBucket with capacity, rate, last_refill_ts, tokens. Method consume() that refills + returns True/False. Tests with mocked time."},{n:2,title:"Single-instance Redis",body:"Move state to Redis. Use HSET with fields: tokens, last_refill_ts. Lua script (eval) ensures atomicity."},{n:3,title:"Write the Lua script",body:"Compute elapsed time, refill tokens (capped at capacity), check if &gt;= 1, decrement if yes, write back, return result. Run as single Redis command."},{n:4,title:"Concurrent test",body:"Spin up 100 threads all calling is_allowed simultaneously with the same key. Total allowed should match expected (bucket capacity). No more, no less."},{n:5,title:"Multiple buckets",body:"Hash key by user_id so each user gets own bucket. Test that one heavy user doesn't affect others."},{n:6,title:"FastAPI middleware",body:"Wrap as middleware that extracts user from auth header, checks rate limit, adds X-RateLimit-* headers, returns 429 if limited."},{n:7,title:"Benchmark",body:"Hit a /test endpoint with hey at high concurrency. Compare latency with vs without rate limit middleware. Should be &lt; 1ms overhead."},{n:8,title:"Edge cases",body:'What if Redis is down? Document the "fail open" vs "fail closed" decision. Production usually fails open to not break the service.'}])}
      `),w("Success criteria",`
        ${E(["Concurrent test passes — never more than capacity requests in one burst","Latency overhead &lt; 1ms p99 when Redis is local","100% test coverage on the core logic","Clean separation: algorithm logic, storage, integration are 3 files","README explains token bucket vs leaky bucket vs sliding window, with diagrams"])}
        ${n("Stretch: implement sliding window log algorithm too, then benchmark both for memory + accuracy tradeoffs. Both algorithms are common SD interview asks.","insight")}
      `)],keyTerms:["Token bucket","Leaky bucket","Sliding window","Redis Lua scripting","Atomic operations","Fail open / closed","429 Too Many Requests"],sources:["Stripe engineering blog on rate limiting","Cloudflare blog on sliding window","Redis Lua scripting docs"]},capstone:{track:"projects",title:"Capstone Portfolio Project",subtitle:"The end-to-end ML system you put at the top of your resume",duration:"20-40 hours · Week 20",difficulty:"Advanced",sections:[w("Summary",`
        <p>The capstone combines everything from the runway into one deployable, demoable, screenshottable artifact. The goal: one project on your GitHub that, by itself, gets you to the recruiter screen at companies like Datadog, GitLab, HashiCorp, or any platform engineering role.</p>
        <p>The pitch: "I built and deployed an end-to-end machine learning system on Kubernetes with monitoring, drift detection, A/B testing, and a live demo URL." That sentence, plus a great README, opens doors.</p>
      `),w("Full architecture",`
        ${x({height:320,nodes:[{id:"u",x:30,y:30,w:90,h:35,label:"user",sub:"web demo"},{id:"lb",x:150,y:30,w:100,h:35,label:"load balancer",sub:"A/B split",color:"#F5B842"},{id:"ma",x:280,y:10,w:100,h:30,label:"model v1",sub:"90%"},{id:"mb",x:280,y:50,w:100,h:30,label:"model v2",sub:"10%"},{id:"fs",x:410,y:30,w:100,h:35,label:"feature store",sub:"Redis"},{id:"log",x:280,y:100,w:100,h:30,label:"prediction log",color:"#7B9FB5"},{id:"d",x:410,y:100,w:100,h:30,label:"drift detector",color:"#E07856"},{id:"m",x:540,y:30,w:90,h:35,label:"Prometheus"},{id:"g",x:540,y:100,w:90,h:35,label:"Grafana"},{id:"k",x:280,y:180,w:230,h:40,label:"Kubernetes (kind / GKE / EKS)",color:"#8FA876"},{id:"ci",x:30,y:180,w:200,h:40,label:"GitHub Actions: train → build → deploy"}],edges:[{from:"u",to:"lb"},{from:"lb",to:"ma"},{from:"lb",to:"mb"},{from:"ma",to:"fs"},{from:"mb",to:"fs"},{from:"ma",to:"log"},{from:"mb",to:"log"},{from:"log",to:"d"},{from:"d",to:"m"},{from:"m",to:"g"},{from:"ci",to:"k"}],caption:"Composed from every previous mini-project — capstone = sum of parts"})}
      `),w("Requirements (must have)",`
        ${B(["<strong>Pick a real problem.</strong> Not Iris. Examples: predict GitHub repo star growth, classify Hacker News story trends, detect anomalies in your own server logs.","<strong>Train pipeline:</strong> data ingest → features → train → eval → versioned artifact","<strong>Serving:</strong> FastAPI deployed on K8s with multiple replicas","<strong>A/B test infrastructure:</strong> two model versions running, traffic split","<strong>Monitoring:</strong> Prometheus metrics + Grafana dashboard, public link","<strong>Drift detection:</strong> from the drift-detector project, integrated","<strong>CI/CD:</strong> GitHub Actions builds + deploys on merge","<strong>Public demo URL</strong> people can hit. Spend the $5/month on Fly.io or Civo."])}
      `),w("Requirements (should have)",`
        ${B(["README with: 30-second pitch, architecture diagram, design decisions explained","Model card documenting what it does, limitations, biases","Runbook for the on-call (you) — what to do when each alert fires","Loom video walkthrough (3-5 min) embedded in README","One technical blog post (Hashnode, dev.to, personal site) explaining the most interesting decision"])}
      `),w("Steps",`
        ${O([{n:1,title:"Scope ruthlessly (week 1)",body:"Pick problem. Sketch architecture. Define success metric (one number). Resist scope creep. Better to ship something narrow than build something half-finished."},{n:2,title:"Train pipeline (week 1-2)",body:'Get to "I can rebuild the model from scratch with one command." This is more important than model accuracy.'},{n:3,title:"Serving + Docker (week 2)",body:"Use the hardened-container + ml-inference-api projects as templates."},{n:4,title:"K8s deploy + CI/CD (week 2-3)",body:'Use k8s-lab + cicd-rollback as templates. Get to "git push → live in 5 min."'},{n:5,title:"Monitoring + drift (week 3)",body:"Use drift-detector. Add Grafana dashboard with the 4 golden signals."},{n:6,title:"A/B infrastructure (week 4)",body:"Two deployments, weighted Service or Istio VirtualService. Track conversion metric per variant."},{n:7,title:"Polish (week 4)",body:"README, model card, runbook. Loom video. Blog post draft."},{n:8,title:"Get feedback",body:"Show to 3 senior engineers (LinkedIn, ex-colleagues, mentors). Iterate. Then put it at the top of your resume."}])}
      `),w("Success criteria",`
        ${E(["Demo URL works. A recruiter can hit it in 10 seconds.","README is a 5-minute read that explains what, why, how, results","Architecture diagram tells the story without the prose","Runbook would let someone else operate it (test: send to a friend)","You can give a 5-minute live walkthrough during a screen-share interview"])}
        ${n("This is the project that gets you the interview. Spend 10% of the runway's time on this. It's the single most concrete artifact of everything else you've learned.","insight")}
      `)],keyTerms:["End-to-end ML system","A/B testing","Model card","Runbook","Demo URL","Portfolio project"],sources:['Chip Huyen "Designing ML Systems" Ch 11','Real ML project READMEs (search GitHub for "production ML")',"Eugene Yan's blog"]}},C=e=>String(e||"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),de=e=>e.toLocaleDateString("en-US",{month:"short",day:"numeric"}),Ge=["M","T","W","T","F","S","S"];function je(){const e=i.selectedWeek,t=Z[e-1],s=Ae(e),o=e===ee(),r=be(),l=Q[t.phase],g=Array.from({length:7},(d,u)=>{const v=new Date(s);v.setDate(s.getDate()+u);const y=o&&u===r,b=T(`w${e}_d${u}_a`),k=T(`w${e}_d${u}_b`);return`
      <div class="day-col ${y?"today":""}">
        <div class="day-label">${Ge[u]}</div>
        <div class="day-date">${v.getDate()}</div>
        <button class="day-check ${b?"done-a":""}" data-action="toggle-block" data-week="${e}" data-day="${u}" data-kind="a">${b?"●":"A"}</button>
        <button class="day-check ${k?"done-b":""}" data-action="toggle-block" data-week="${e}" data-day="${u}" data-kind="b">${k?"●":"B"}</button>
      </div>
    `}).join(""),p=T(`w${e}_project`),a=T(`w${e}_sd`),h=T(`w${e}_dsa`);return`
    <div class="view stagger">
      <div class="week-nav">
        ${e>1?`<button class="btn btn-ghost" data-action="select-week" data-week="${e-1}">← W${e-1}</button>`:"<span></span>"}
        ${e<20?`<button class="btn btn-ghost" data-action="select-week" data-week="${e+1}">W${e+1} →</button>`:"<span></span>"}
      </div>

      <div class="week-header">
        <span class="chip chip-track-${l.code}" style="margin-bottom: 12px;">${t.phase}</span>
        <div class="week-meta">
          WEEK ${String(e).padStart(2,"0")} · ${de(s)} – ${de(new Date(s.getTime()+6*864e5))}
          ${o?'<span class="chip chip-solid">NOW</span>':""}
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

      <div class="day-grid">${g}</div>

      ${(()=>{const d=He[e],u=d?te[d]:null,v=`expand_w${e}_project`,y=i.expandedBriefs.has(v);return u?`
            <div class="accordion-card ${p?"done":""}" style="margin-bottom: 12px;">
              <div class="accordion-head" data-action="toggle-expand" data-key="${v}">
                <div style="flex: 1;">
                  <div class="kicker" style="color: ${I.color}; margin-bottom: 6px;">⌂ Week Project · structured</div>
                  <div class="h4" style="margin: 0;">${C(u.title)}</div>
                  <div class="caption" style="margin-top: 4px;">${C(u.subtitle||"")}</div>
                </div>
                <div class="row gap-2" style="align-items: center;">
                  <button class="check-circle ${p?"done":""}" data-action="toggle-project" data-week="${e}" onclick="event.stopPropagation();">${p?"✓":""}</button>
                  <span class="accordion-chev" style="transform: rotate(${y?90:0}deg);">›</span>
                </div>
              </div>
              ${y?`<div class="accordion-body">${u.sections.map((b,k)=>`
                <section class="lesson-section" style="margin-top: ${k===0?0:20}px;">
                  <div class="lesson-section-header"><span class="lesson-section-num">${String(k+1).padStart(2,"0")}</span><h2 class="lesson-section-title">${C(b.title)}</h2></div>
                  <div class="lesson-body">${b.body()}</div>
                </section>
              `).join("")}
              <div class="row" style="justify-content: flex-end; margin-top: 16px;">
                <button class="btn btn-ghost" data-action="select-lesson" data-kind="project" data-id="${d}">Open full project page →</button>
              </div>
              </div>`:""}
            </div>
          `:`
          <div class="card tappable ${p?"done":""}" data-action="toggle-project" data-week="${e}" style="margin-bottom: 12px;">
            <div class="kicker" style="margin-bottom: 8px;">Week Project</div>
            <div class="row gap-3">
              <span class="check-circle ${p?"done":""}">${p?"✓":""}</span>
              <span class="body">${C(t.project)}</span>
            </div>
          </div>
        `})()}

      ${(()=>{const d=H[t.sd.topicId],u=`expand_w${e}_sd`,v=i.expandedBriefs.has(u);return`
          <div class="accordion-card sd ${a?"done":""}" style="margin-bottom: 12px;">
            <div class="accordion-head" data-action="toggle-expand" data-key="${u}">
              <div style="flex: 1;">
                <span class="chip chip-track-sd" style="margin-bottom: 8px;">◇ System Design</span>
                <div class="h4" style="margin-top: 6px;">${C(t.sd.topic)}</div>
                <div class="caption" style="margin-top: 4px;">${C(t.sd.source)}</div>
              </div>
              <div class="row gap-2" style="align-items: center;">
                <button class="check-circle ${a?"done":""}" data-action="toggle-sd" data-week="${e}" onclick="event.stopPropagation();">${a?"✓":""}</button>
                <span class="accordion-chev" style="transform: rotate(${v?90:0}deg);">›</span>
              </div>
            </div>
            ${v&&d?`<div class="accordion-body">${d.sections.map((y,b)=>`
              <section class="lesson-section" style="margin-top: ${b===0?0:20}px;">
                <div class="lesson-section-header"><span class="lesson-section-num">${String(b+1).padStart(2,"0")}</span><h2 class="lesson-section-title">${C(y.title)}</h2></div>
                <div class="lesson-body">${y.body()}</div>
              </section>
            `).join("")}
            <div class="row" style="justify-content: flex-end; margin-top: 16px;">
              <button class="btn btn-ghost" data-action="open-sd" data-id="${t.sd.topicId}">Open full lesson →</button>
            </div>
            </div>`:v?'<div class="accordion-body"><div class="caption">Lesson not yet written for this topic.</div></div>':""}
          </div>
        `})()}

      ${(()=>{const d=G[t.dsa.patternId],u=`expand_w${e}_dsa`,v=i.expandedBriefs.has(u);return`
          <div class="accordion-card dsa ${h?"done":""}">
            <div class="accordion-head" data-action="toggle-expand" data-key="${u}">
              <div style="flex: 1;">
                <span class="chip chip-track-dsa" style="margin-bottom: 8px;">⌘ DSA Pattern</span>
                <div class="h4" style="margin-top: 6px;">${C(t.dsa.topic)}</div>
                <div class="caption" style="margin-top: 4px;">NeetCode 150</div>
              </div>
              <div class="row gap-2" style="align-items: center;">
                <button class="check-circle ${h?"done":""}" data-action="toggle-dsa" data-week="${e}" onclick="event.stopPropagation();">${h?"✓":""}</button>
                <span class="accordion-chev" style="transform: rotate(${v?90:0}deg);">›</span>
              </div>
            </div>
            ${v&&d?`<div class="accordion-body">${d.sections.map((y,b)=>`
              <section class="lesson-section" style="margin-top: ${b===0?0:20}px;">
                <div class="lesson-section-header"><span class="lesson-section-num">${String(b+1).padStart(2,"0")}</span><h2 class="lesson-section-title">${C(y.title)}</h2></div>
                <div class="lesson-body">${y.body()}</div>
              </section>
            `).join("")}
            <div class="row" style="justify-content: flex-end; margin-top: 16px;">
              <button class="btn btn-ghost" data-action="open-dsa" data-id="${t.dsa.patternId}">Open full lesson →</button>
            </div>
            </div>`:v?'<div class="accordion-body"><div class="caption">Lesson not yet written for this pattern.</div></div>':""}
          </div>
        `})()}
    </div>
  `}function qe(){const e=ae(),t=ee(),s=Z.map(o=>{const r=Ce[o.num],l=Array.from({length:7}).reduce((v,y,b)=>v+(T(`w${o.num}_d${b}_a`)?1:0)+(T(`w${o.num}_d${b}_b`)?1:0),0),g=Math.round(l/14*100),p=o.num===t?"current":o.num<t?"past":"",a=T(`w${o.num}_project`),h=T(`w${o.num}_sd`),d=T(`w${o.num}_dsa`),u=`
      <span class="timeline-badge" style="background:${a?"#8FA876":"var(--border-subtle)"}"></span>
      <span class="timeline-badge" style="background:${h?"#7B9FB5":"var(--border-subtle)"}"></span>
      <span class="timeline-badge" style="background:${d?"#B888C0":"var(--border-subtle)"}"></span>
    `;return`
      ${r?`<div class="milestone"><span class="milestone-label">◆ ${r.label}</span><span class="milestone-desc">${r.desc}</span></div>`:""}
      <button class="timeline-row ${p}" data-action="select-week" data-week="${o.num}">
        <span class="timeline-dot" style="background: ${Q[o.phase].color}"></span>
        <span class="timeline-num">W${String(o.num).padStart(2,"0")}</span>
        <span class="timeline-title">${C(o.title)}</span>
        <span class="timeline-meta">${u} ${g>0?g+"%":"·"}</span>
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
      ${s}

      <div class="row between" style="margin-top: 32px;">
        <button class="btn" data-action="export">export backup</button>
        <button class="btn" data-action="reset">reset all</button>
      </div>
    </div>
  `}function Ue(){const e=se.reduce((r,l)=>r+l.problems.length,0);let t=0;se.forEach(r=>r.problems.forEach(l=>{T(`dsa_${l.id}`)&&t++}));const s=Math.round(t/e*100),o=se.map(r=>{const l=r.problems.filter(p=>T(`dsa_${p.id}`)).length,g=r.problems.map(p=>{const a=T(`dsa_${p.id}`),h=`chip-diff-${p.difficulty.toLowerCase()}`;return`
        <div class="problem-row ${a?"done":""}">
          <button class="problem-check ${a?"done":""}" data-action="toggle-problem" data-id="${p.id}">
            ${a?'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>':""}
          </button>
          <span class="problem-title">${C(p.title)}</span>
          <span class="chip ${h}">${p.difficulty}</span>
          <a href="${p.url}" target="_blank" rel="noopener" class="problem-link" title="Open on LeetCode" onclick="event.stopPropagation();">
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
          <button class="pattern-title" data-action="open-dsa-lesson" data-id="${r.lessonId}" style="text-align:left; cursor:pointer; background:none; border:none; padding:0;">
            ${C(r.title)} →
          </button>
          <span class="pattern-count">${l}/${r.problems.length}</span>
        </div>
        <div class="body-sm" style="margin-bottom: 12px;">${C(r.blurb)}</div>
        ${g}
      </div>
    `}).join("");return`
    <div class="view stagger">
      <h1 class="h1" style="margin-bottom: 4px;">NeetCode 150<span style="color: var(--accent-amber);">.</span></h1>
      <div class="caption" style="margin-bottom: 16px;">Pattern-organized roadmap · ${t} of ${e} done · ${s}%</div>
      <div class="progress-track" style="margin-bottom: 32px;"><div class="progress-fill" style="width:${s}%"></div></div>
      ${o}
    </div>
  `}function ze(){const e=[{id:"networking-fundamentals",title:"Networking Fundamentals",section:"Fundamentals",wn:1},{id:"dns-cdn",title:"DNS & CDNs",section:"Fundamentals",wn:2},{id:"load-balancers",title:"Load Balancers",section:"Fundamentals",wn:3},{id:"databases-i",title:"Databases I — SQL vs NoSQL",section:"Fundamentals",wn:4},{id:"caching",title:"Caching",section:"Fundamentals",wn:5},{id:"message-queues",title:"Message Queues",section:"Fundamentals",wn:6},{id:"databases-ii",title:"Databases II — Sharding",section:"Fundamentals",wn:7},{id:"cap-theorem",title:"CAP Theorem",section:"Fundamentals",wn:8},{id:"url-shortener",title:"Design URL Shortener",section:"Classic Problems",wn:9},{id:"pastebin",title:"Design Pastebin",section:"Classic Problems",wn:10},{id:"twitter",title:"Design Twitter",section:"Classic Problems",wn:11},{id:"youtube",title:"Design YouTube",section:"Classic Problems",wn:12},{id:"uber",title:"Design Uber",section:"Classic Problems",wn:13},{id:"whatsapp",title:"Design WhatsApp",section:"Advanced",wn:14},{id:"dropbox",title:"Design Dropbox",section:"Advanced",wn:15},{id:"web-crawler",title:"Design Web Crawler",section:"Advanced",wn:16},{id:"news-feed",title:"Design News Feed",section:"Advanced",wn:17},{id:"recommendation",title:"ML SD — Recommendation",section:"ML Systems",wn:18},{id:"search-ranking",title:"ML SD — Search Ranking",section:"ML Systems",wn:19},{id:"mock-week",title:"Mock Interview Week",section:"Practice",wn:20}],t={};e.forEach(r=>{t[r.section]||(t[r.section]=[]),t[r.section].push(r)});const s=Object.entries(t).map(([r,l])=>`
    <div class="pattern-section">
      <div class="pattern-header">
        <div class="pattern-title">${C(r)}</div>
        <span class="pattern-count">${l.length}</span>
      </div>
      ${l.map(g=>{const p=T(`w${g.wn}_sd`);return`
          <button class="problem-row" data-action="open-sd-lesson" data-id="${g.id}" style="border: none; background: none; width: 100%; text-align: left; cursor: pointer;">
            <span class="problem-check ${p?"done":""}">
              ${p?'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>':""}
            </span>
            <span class="problem-title">${C(g.title)}</span>
            <span class="chip">W${g.wn}</span>
            <span class="problem-link">→</span>
          </button>
        `}).join("")}
    </div>
  `).join("");return`
    <div class="view stagger">
      <h1 class="h1" style="margin-bottom: 4px;">System Design<span style="color: var(--accent-amber);">.</span></h1>
      <div class="caption" style="margin-bottom: 32px;">Grokking-style deep lessons · ${e.filter(r=>T(`w${r.wn}_sd`)).length} of ${e.length} done</div>
      ${s}
    </div>
  `}function Ke(){const e=(d,u,v,y)=>{const b=u.length;return`
      <div class="library-track">
        <div class="library-track-head" style="border-left: 3px solid ${d.color};">
          <span class="library-track-icon" style="color: ${d.color};">${d.icon}</span>
          <div>
            <div class="library-track-name">${C(d.name)}</div>
            <div class="library-track-meta">${b} lesson${b===1?"":"s"}</div>
          </div>
        </div>
        <div class="library-lesson-list">
          ${u.map((k,$)=>{const M=v(k),R=(y==="core"?J[k]:y==="sd"?H[k]:G[k])?.subtitle||"";return`
              <button class="library-lesson-item" data-action="select-lesson" data-kind="${y}" data-id="${k}">
                <span class="library-lesson-num mono">${String($+1).padStart(2,"0")}</span>
                <div class="library-lesson-text">
                  <div class="library-lesson-title">${C(M)}</div>
                  ${R?`<div class="library-lesson-sub">${C(R)}</div>`:""}
                </div>
                <span class="library-lesson-arrow">→</span>
              </button>
            `}).join("")}
        </div>
      </div>
    `},t=Y.map(d=>e(d,d.lessons,u=>J[u]?.title||u,"core")).join(""),s=e(I,I.lessons,d=>te[d]?.title||d,"project"),o=Object.keys(H),l=e({name:"System Design",icon:"◇",color:"#7B9FB5"},o,d=>H[d]?.title||d,"sd"),g=Object.keys(G),a=e({name:"DSA Patterns",icon:"⌘",color:"#B888C0"},g,d=>G[d]?.title||d,"dsa");return`
    <div class="view stagger">
      <h1 class="h1" style="margin-bottom: 4px;">Library<span style="color: var(--accent-amber);">.</span></h1>
      <div class="caption" style="margin-bottom: 32px;">${Y.reduce((d,u)=>d+u.lessons.length,0)+o.length+g.length+I.lessons.length} lessons + projects across ${Y.length+3} tracks. Tap any to read, Next/Prev between them.</div>
      ${s}
      ${t}
      ${l}
      ${a}
    </div>
  `}const L=e=>String(e||"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function _e(e,t){if(e==="sd"){const s=Object.keys(H),o=s.indexOf(t);return{lesson:H[t],deckName:"System Design",deckCode:"sd",deckColor:"#7B9FB5",siblings:s,idx:o,prev:o>0?{kind:"sd",id:s[o-1]}:null,next:o<s.length-1?{kind:"sd",id:s[o+1]}:null}}if(e==="dsa"){const s=Object.keys(G),o=s.indexOf(t);return{lesson:G[t],deckName:"DSA Patterns",deckCode:"dsa",deckColor:"#B888C0",siblings:s,idx:o,prev:o>0?{kind:"dsa",id:s[o-1]}:null,next:o<s.length-1?{kind:"dsa",id:s[o+1]}:null}}if(e==="core"){const s=J[t];if(!s)return{lesson:null};const o=Y.find(l=>l.id===s.track);if(!o)return{lesson:s,deckName:"Library",deckCode:"core",deckColor:"#F5B842",siblings:[],idx:0,prev:null,next:null};const r=o.lessons.indexOf(t);return{lesson:s,deckName:o.name,deckCode:"core",deckColor:o.color,trackIcon:o.icon,siblings:o.lessons,idx:r,prev:r>0?{kind:"core",id:o.lessons[r-1]}:null,next:r<o.lessons.length-1?{kind:"core",id:o.lessons[r+1]}:null}}if(e==="project"){const s=te[t];if(!s)return{lesson:null};const o=I.lessons.indexOf(t);return{lesson:s,deckName:I.name,deckCode:"project",deckColor:I.color,trackIcon:I.icon,siblings:I.lessons,idx:o,prev:o>0?{kind:"project",id:I.lessons[o-1]}:null,next:o<I.lessons.length-1?{kind:"project",id:I.lessons[o+1]}:null}}return{lesson:null}}function pe(e,t){return e==="sd"?H[t]?.title||t:e==="dsa"?G[t]?.title||t:e==="core"?J[t]?.title||t:e==="project"&&te[t]?.title||t}function Ye(){if(!i.selectedLesson)return'<div class="view"><div class="empty">No lesson selected</div></div>';const{kind:e,id:t}=i.selectedLesson,s=_e(e,t);if(!s.lesson)return`<div class="view"><div class="empty">Lesson "${t}" not found.</div></div>`;const{lesson:o,deckName:r,deckColor:l,siblings:g,idx:p,prev:a,next:h,trackIcon:d}=s,u=o.sections.map((j,Te)=>`
    <section class="lesson-section">
      <div class="lesson-section-header">
        <span class="lesson-section-num">${String(Te+1).padStart(2,"0")}</span>
        <h2 class="lesson-section-title">${L(j.title)}</h2>
      </div>
      <div class="lesson-body">${j.body()}</div>
    </section>
  `).join(""),v=(o.keyTerms||[]).length?`
    <div class="lesson-section">
      <div class="kicker" style="margin-bottom: 12px;">Key Terms to Know</div>
      <div class="brief-terms">${o.keyTerms.map(j=>`<span class="chip">${L(j)}</span>`).join("")}</div>
    </div>
  `:"",y=(o.sources||[]).length?`
    <div class="lesson-section">
      <div class="kicker" style="margin-bottom: 12px;">Sources & Further Reading</div>
      <ul style="list-style: none; padding: 0; color: var(--text-secondary); font-size: 14px; line-height: 1.7;">
        ${o.sources.map(j=>`<li style="padding: 4px 0;">• ${L(j)}</li>`).join("")}
      </ul>
    </div>
  `:"",b=i.aiConfig.enabled?`
    <button class="btn btn-primary" style="margin-top: 24px;" data-action="ask-ai" data-context="${L(o.title+" — "+(o.subtitle||""))}">
      Ask Claude about this lesson →
    </button>
  `:"",k=g.length>1?`
    <div style="margin-top: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
        <span class="mono" style="font-size: 10px; color: var(--text-tertiary); letter-spacing: 0.12em; text-transform: uppercase;">Lesson ${p+1} of ${g.length}</span>
        <span class="mono" style="font-size: 10px; color: var(--text-tertiary);">${Math.round((p+1)/g.length*100)}%</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width: ${(p+1)/g.length*100}%; background: linear-gradient(90deg, ${l}, ${l}cc);"></div>
      </div>
    </div>
  `:"",$=`lesson_${e}_${t}`,M=T($),R=`
    <div class="lesson-complete-zone" style="margin-top: 40px; padding: 24px; background: ${M?"linear-gradient(135deg, #8FA87622, #8FA87611)":"var(--bg-elevated)"}; border-radius: 12px; border: 1px solid ${M?"#8FA87655":"var(--border-subtle)"}; text-align: center; transition: all var(--duration-base) var(--ease-out);">
      ${M?`
        <div class="checkmark-animate" style="font-size: 36px; color: #8FA876; margin-bottom: 8px; line-height: 1;">✓</div>
        <div style="font-family: var(--font-serif); font-size: 18px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">Lesson complete</div>
        <div style="color: var(--text-tertiary); font-size: 13px; margin-bottom: 16px;">Nice work. ${h?"Keep the momentum.":"End of the track."}</div>
        <button class="btn-ghost" data-action="toggle-lesson-complete" data-key="${$}" style="font-size: 12px; color: var(--text-tertiary);">Mark as not done</button>
      `:`
        <div style="font-family: var(--font-serif); font-size: 18px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">Done with this lesson?</div>
        <div style="color: var(--text-tertiary); font-size: 13px; margin-bottom: 16px;">Mark it complete to track your runway progress.</div>
        <button class="btn btn-primary" data-action="toggle-lesson-complete" data-key="${$}" style="min-width: 200px;">Mark Complete ✓</button>
      `}
    </div>
  `,N=a||h?`
    <div class="lesson-nav" style="margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--border-subtle); display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
      ${a?`
        <button class="lesson-nav-card prev" data-action="select-lesson" data-kind="${a.kind}" data-id="${a.id}" style="text-align: left;">
          <div class="mono" style="font-size: 9px; color: var(--text-tertiary); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 4px;">← Previous</div>
          <div style="font-family: var(--font-serif); font-size: 15px; font-weight: 600; color: var(--text-primary); line-height: 1.3;">${L(pe(a.kind,a.id))}</div>
        </button>
      `:"<div></div>"}
      ${h?`
        <button class="lesson-nav-card next" data-action="select-lesson" data-kind="${h.kind}" data-id="${h.id}" style="text-align: right;">
          <div class="mono" style="font-size: 9px; color: var(--text-tertiary); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 4px;">Next →</div>
          <div style="font-family: var(--font-serif); font-size: 15px; font-weight: 600; color: var(--text-primary); line-height: 1.3;">${L(pe(h.kind,h.id))}</div>
        </button>
      `:"<div></div>"}
    </div>
  `:"",Se=`<span class="chip" style="background: ${l}1a; color: ${l}; border-color: ${l}40;">${d?d+" ":""}${L(r)}</span>`;return`
    <div class="view animate-fade-up">
      <div class="lesson-header">
        <button class="lesson-back" data-action="back-from-lesson">← Back</button>
        <h1 class="lesson-title">${L(o.title)}</h1>
        ${o.subtitle?`<div class="body" style="margin-bottom: 12px;">${L(o.subtitle)}</div>`:""}
        <div class="lesson-meta">
          <span class="chip">${L(o.duration||"")}</span>
          ${o.difficulty?`<span class="chip">${L(o.difficulty)}</span>`:""}
          ${Se}
        </div>
        ${k}
      </div>

      ${u}
      ${v}
      ${y}
      ${b}
      ${R}
      ${N}
    </div>
  `}const F=e=>String(e||"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Ve(){return i.showSettings?`
    <div class="modal-backdrop" data-action="close-settings">
      <div class="modal" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h2 class="h2">Settings</h2>
          <button class="btn" data-action="close-settings">close</button>
        </div>

        <div class="kicker" style="margin-bottom: 16px;">Sync (PocketBase)</div>

        <div class="row between" style="padding: 12px 0; border-top: 1px solid var(--border-subtle);">
          <span class="body-sm">Cloud sync</span>
          <div class="toggle ${i.syncConfig.enabled?"on":""}" data-action="toggle-sync">
            <div class="toggle-knob"></div>
          </div>
        </div>

        <div class="field" style="margin-top: 16px;">
          <label class="field-label">PocketBase URL</label>
          <input class="field-input" id="syncUrl" type="text" placeholder="http://100.x.x.x:8090" value="${F(i.syncConfig.url)}" />
          <div class="field-hint">Your PocketBase server. Use your Tailscale IP for remote access.</div>
        </div>
        <div class="field">
          <label class="field-label">Email</label>
          <input class="field-input" id="syncEmail" type="email" placeholder="you@example.com" value="${F(i.syncConfig.email)}" />
        </div>
        <div class="field">
          <label class="field-label">Password</label>
          <input class="field-input" id="syncPassword" type="password" placeholder="••••••••" value="${F(i.syncConfig.password)}" />
          <div class="field-hint">Stored only in your browser. Never sent except to your PocketBase.</div>
        </div>
        <button class="btn btn-primary" style="width: 100%;" data-action="save-sync">Save & Test Sync</button>
        <div id="syncMsg" style="margin-top: 12px;"></div>

        <div class="kicker" style="margin-top: 32px; margin-bottom: 16px;">AI Assistant (Anthropic Claude)</div>

        <div class="row between" style="padding: 12px 0; border-top: 1px solid var(--border-subtle);">
          <span class="body-sm">Enable AI assist</span>
          <div class="toggle ${i.aiConfig.enabled?"on":""}" data-action="toggle-ai">
            <div class="toggle-knob"></div>
          </div>
        </div>

        <div class="field" style="margin-top: 16px;">
          <label class="field-label">Anthropic API Key</label>
          <input class="field-input" id="aiKey" type="password" placeholder="sk-ant-..." value="${F(i.aiConfig.apiKey)}" />
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
  `:""}async function Je(){const e=document.getElementById("syncUrl").value.trim().replace(/\/$/,""),t=document.getElementById("syncEmail").value.trim(),s=document.getElementById("syncPassword").value;i.syncConfig={...i.syncConfig,url:e,email:t,password:s},ge();const o=document.getElementById("syncMsg");o.innerHTML='<div class="caption">Testing…</div>';try{await K(),await ve(),o.innerHTML='<div class="callout callout-insight">✓ Connected and synced.</div>'}catch(r){o.innerHTML=`<div class="callout callout-warning">✗ ${F(r.message)}</div>`}}async function Qe(){const e=document.getElementById("aiKey").value.trim();i.aiConfig.apiKey=e,ye();const t=document.getElementById("aiMsg");t.innerHTML='<div class="caption">Testing…</div>';try{const s=await ke('Reply with just the word "OK".');t.innerHTML=`<div class="callout callout-insight">✓ Connected. Test response: ${F(s.substring(0,60))}</div>`}catch(s){t.innerHTML=`<div class="callout callout-warning">✗ ${F(s.message.substring(0,200))}</div>`}}let V=[];function Xe(){if(!i.showAI)return"";const e=V.map(t=>`
    <div style="padding: 12px; background: ${t.role==="user"?"var(--bg-elevated)":"var(--accent-amber-bg)"}; border-radius: 8px; margin-bottom: 8px;">
      <div class="kicker" style="margin-bottom: 4px; color: ${t.role==="user"?"var(--text-tertiary)":"var(--accent-amber)"};">${t.role==="user"?"You":"Claude"}</div>
      <div class="body-sm" style="white-space: pre-wrap;">${F(t.content)}</div>
    </div>
  `).join("");return`
    <div class="modal-backdrop" data-action="close-ai">
      <div class="modal" onclick="event.stopPropagation()" style="max-height: 90vh;">
        <div class="modal-header">
          <h2 class="h2">Ask Claude</h2>
          <button class="btn" data-action="close-ai">close</button>
        </div>
        ${i.aiContext?`<div class="caption" style="margin-bottom: 16px; padding: 10px; background: var(--bg-base); border-radius: 6px;">Context: ${F(i.aiContext)}</div>`:""}
        <div id="aiHistory" style="max-height: 50vh; overflow-y: auto; margin-bottom: 16px;">${e}</div>
        <textarea id="aiInput" class="field-input" rows="3" placeholder="Ask anything about this concept..." style="resize: vertical; min-height: 80px;"></textarea>
        <button class="btn btn-primary" style="width: 100%; margin-top: 12px;" data-action="send-ai">Ask Claude →</button>
      </div>
    </div>
  `}async function Ze(){const e=document.getElementById("aiInput"),t=e.value.trim();if(!t)return;const s=`You are a focused study assistant helping a DevSecOps engineer prepare for FAANG-adjacent interviews and a UPenn CS master's program. Be concise, technically precise, and direct. Use examples and analogies when they clarify. Avoid filler. If asked about a system design or DSA topic, structure your answer with clear sections.${i.aiContext?" Current learning context: "+i.aiContext:""}`;V.push({role:"user",content:t}),e.value="",S();const o=document.getElementById("aiHistory");o&&(o.innerHTML+='<div style="padding: 12px;"><div class="spinner"></div></div>',o.scrollTop=o.scrollHeight);try{const r=await ke(t,s);V.push({role:"assistant",content:r})}catch(r){V.push({role:"assistant",content:"Error: "+r.message})}S()}function et(e=null){if(!i.aiConfig.enabled||!i.aiConfig.apiKey){alert("AI is not configured. Open Settings to add your Anthropic API key.");return}i.showAI=!0,i.aiContext=e,S()}function tt(){i.showAI=!1,i.aiContext=null,S()}function xe(){const e=ae(),t=document.getElementById("app");t.innerHTML=`
    <header class="topbar">
      <div class="brand">runway<span class="brand-dot">.</span></div>
      <div class="topbar-actions">
        <div class="sync-pill" data-action="open-settings">
          <span class="sync-dot ${i.syncStatus}"></span>
          <span>${i.syncStatus==="synced"?"synced":i.syncStatus==="syncing"?"sync…":i.syncStatus==="error"?"error":"local"}</span>
        </div>
        <div class="streak">
          <span class="streak-num">${e.streak}</span>
          <span class="streak-label">day${e.streak===1?"":"s"}</span>
        </div>
      </div>
    </header>

    <main id="view-container">${ot()}</main>

    <nav class="tabbar">
      <div class="tabbar-inner">
        <button class="tab ${i.activeTab==="today"?"active":""}" data-action="set-tab" data-tab="today">
          <span class="tab-icon">${U("today")}</span>
          <span class="tab-label">Today</span>
        </button>
        <button class="tab ${i.activeTab==="week"?"active":""}" data-action="set-tab" data-tab="week">
          <span class="tab-icon">${U("week")}</span>
          <span class="tab-label">Week</span>
        </button>
        <button class="tab ${i.activeTab==="plan"?"active":""}" data-action="set-tab" data-tab="plan">
          <span class="tab-icon">${U("plan")}</span>
          <span class="tab-label">Plan</span>
        </button>
        <button class="tab ${i.activeTab==="sd"?"active":""}" data-action="set-tab" data-tab="sd">
          <span class="tab-icon">${U("sd")}</span>
          <span class="tab-label">SD</span>
        </button>
        <button class="tab ${i.activeTab==="dsa"?"active":""}" data-action="set-tab" data-tab="dsa">
          <span class="tab-icon">${U("dsa")}</span>
          <span class="tab-label">DSA</span>
        </button>
        <button class="tab ${i.activeTab==="library"?"active":""}" data-action="set-tab" data-tab="library">
          <span class="tab-icon">${U("library")}</span>
          <span class="tab-label">Library</span>
        </button>
      </div>
    </nav>

    ${Ve()}
    ${Xe()}
  `,st()}function ot(){if(i.selectedLesson)return Ye();switch(i.activeTab){case"today":return le();case"week":return je();case"plan":return qe();case"sd":return ze();case"dsa":return Ue();case"library":return Ke();default:return le()}}function U(e){const s=Object.entries({width:18,height:18,fill:"none",stroke:"currentColor","stroke-width":1.8,"stroke-linecap":"round","stroke-linejoin":"round"}).map(([o,r])=>`${o}="${r}"`).join(" ");switch(e){case"today":return`<svg ${s}><circle cx="9" cy="9" r="6"/><circle cx="9" cy="9" r="2" fill="currentColor"/></svg>`;case"week":return`<svg ${s}><rect x="2" y="3" width="14" height="13" rx="2"/><line x1="2" y1="7" x2="16" y2="7"/><line x1="6" y1="3" x2="6" y2="7"/><line x1="12" y1="3" x2="12" y2="7"/></svg>`;case"plan":return`<svg ${s}><line x1="3" y1="5" x2="15" y2="5"/><line x1="3" y1="9" x2="15" y2="9"/><line x1="3" y1="13" x2="15" y2="13"/></svg>`;case"sd":return`<svg ${s}><rect x="2" y="2" width="6" height="6" rx="1"/><rect x="10" y="2" width="6" height="6" rx="1"/><rect x="2" y="10" width="6" height="6" rx="1"/><rect x="10" y="10" width="6" height="6" rx="1"/><line x1="8" y1="5" x2="10" y2="5"/><line x1="5" y1="8" x2="5" y2="10"/></svg>`;case"dsa":return`<svg ${s}><circle cx="9" cy="3" r="2"/><circle cx="4" cy="13" r="2"/><circle cx="14" cy="13" r="2"/><line x1="9" y1="5" x2="4" y2="11"/><line x1="9" y1="5" x2="14" y2="11"/></svg>`;case"library":return`<svg ${s}><path d="M3 3h5a2 2 0 0 1 2 2v11a2 2 0 0 0-2-2H3z"/><path d="M17 3h-5a2 2 0 0 0-2 2v11a2 2 0 0 1 2-2h5z"/></svg>`;default:return""}}function st(){document.querySelectorAll("[data-action]").forEach(e=>{e.addEventListener("click",async t=>{const s=e.dataset.action;if(s)switch(s){case"set-tab":i.activeTab=e.dataset.tab,i.selectedLesson=null,i.expandedBriefs.clear(),S(),window.scrollTo(0,0);break;case"toggle-block":{const o=+e.dataset.week,r=+e.dataset.day,l=e.dataset.kind;q(`w${o}_d${r}_${l}`);break}case"toggle-project":q(`w${e.dataset.week}_project`);break;case"toggle-sd":t.stopPropagation(),q(`w${e.dataset.week}_sd`);break;case"toggle-dsa":t.stopPropagation(),q(`w${e.dataset.week}_dsa`);break;case"toggle-problem":q(`dsa_${e.dataset.id}`);break;case"toggle-brief":{const o=e.dataset.brief;i.expandedBriefs.has(o)?i.expandedBriefs.delete(o):i.expandedBriefs.add(o),S();break}case"select-week":i.selectedWeek=+e.dataset.week,i.activeTab="week",i.expandedBriefs.clear(),S(),window.scrollTo(0,0);break;case"open-sd":case"open-sd-lesson":i.selectedLesson={kind:"sd",id:e.dataset.id},S(),window.scrollTo(0,0);break;case"open-dsa":case"open-dsa-lesson":i.selectedLesson={kind:"dsa",id:e.dataset.id},S(),window.scrollTo(0,0);break;case"select-lesson":i.selectedLesson={kind:e.dataset.kind,id:e.dataset.id},S(),window.scrollTo(0,0);break;case"toggle-lesson-complete":q(e.dataset.key),S();break;case"toggle-expand":{const o=e.dataset.key;i.expandedBriefs.has(o)?i.expandedBriefs.delete(o):i.expandedBriefs.add(o),S();break}case"set-tab-week":{i.selectedWeek=parseInt(e.dataset.week,10),i.activeTab="week",S(),window.scrollTo(0,0);break}case"back-from-lesson":i.selectedLesson=null,S();break;case"open-settings":i.showSettings=!0,S();break;case"close-settings":i.showSettings=!1,S();break;case"toggle-sync":i.syncConfig.enabled=!i.syncConfig.enabled,ge(),i.syncConfig.enabled?K():i.syncStatus="offline",S();break;case"save-sync":await Je();break;case"toggle-ai":i.aiConfig.enabled=!i.aiConfig.enabled,ye(),S();break;case"save-ai":await Qe();break;case"ask-ai":et(e.dataset.context);break;case"close-ai":tt();break;case"send-ai":await Ze();break;case"export":Re();break;case"reset":Be();break}})})}Pe();$e(xe);xe();i.syncConfig.enabled&&K();
