(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();const _={"DevOps Fundamentals":{color:"#F5B842",code:"devops"},"MLOps Bridge":{color:"#E07856",code:"mlops"},"UPenn Semester":{color:"#8FA876",code:"upenn"}},ue={1:{label:"START",desc:"May 21, 2026 — runway begins"},9:{label:"ML BRIDGE",desc:"DevOps foundation → MLOps"},14:{label:"UPENN",desc:"Grad school begins, MLOps goes light"},20:{label:"CAPSTONE",desc:"Portfolio piece shipped"}},U=new Date("2026-05-21T00:00:00"),Y=[{num:1,phase:"DevOps Fundamentals",title:"Linux & Bash",blockA:{task:"Write a Bash script daily — process monitor, log parser, service health checker",brief:{insight:"Bash literacy comes from writing, not reading. You will not learn it from a book. You will learn it from the third time you debug why your loop ate a variable name.",why:'Every alert you get in DevSecOps starts with "is the service running?" If you can answer that with a 20-line script in five minutes, you save an hour of guessing.',terms:["set -euo pipefail","parameter expansion","command substitution","exit codes","[[ ]] vs [ ]","heredocs","trap"],resource:"Greg's Wiki (mywiki.wooledge.org/BashGuide). ShellCheck.net — paste your script, get gotchas highlighted.",test:["What does set -euo pipefail actually do, line by line?",'Why is [ $x = "y" ] dangerous and what fixes it?',"How do you make sure your script exits cleanly if killed mid-run?"],doneWhen:"Three working scripts, each under 50 lines, each with error handling. Pass ShellCheck."}},blockB:{task:"Man pages, stdin/stdout/stderr flow, systemd unit files",brief:{insight:"In Linux everything is a file, including I/O streams. stdin/stdout/stderr are file descriptors 0/1/2. Redirect them with > < | and you can pipe anything to anything. systemd is just init replaced with a smarter manager that watches for crashes and restarts you.",why:'Ninety percent of "why is my service down" answers involve one of: stuck process, full disk, broken pipe, or systemd unit misconfiguration. This is the literacy that turns guessing into debugging.',terms:["file descriptor","redirection (> < >> 2>&1 &>)","pipes","exit codes","signals (SIGTERM, SIGKILL, SIGHUP)","systemd unit file","journalctl"],resource:"man bash (REDIRECTION section). man 7 signal. man systemd.service. Julia Evans zines.",test:["Difference between 2>&1 and &>?","Why is kill -9 considered rude?","How do you auto-restart a systemd service on failure?"]}},project:"Service health checker script that emails on failure",sd:{topicId:"networking-fundamentals",topic:"Networking Fundamentals — IP, TCP/UDP, HTTP/HTTPS, OSI model",source:"NeetCode SD Course · Grokking SD Fundamentals"},dsa:{patternId:"arrays-hashing",topic:"Arrays & Hashing — the foundation pattern"}},{num:2,phase:"DevOps Fundamentals",title:"Linux Deep Dive",blockA:{task:"Build a small CLI tool in Bash with proper error handling",brief:{insight:"A good CLI tool feels obvious to use and impossible to misuse. Flags have help text. Errors are clear. Exit codes are honest. Bash can do all of this with getopts and discipline.",why:`The "small tools" you write at SAIC become other people's muscle memory. A polished one earns trust. A janky one gets replaced.`,terms:["getopts","long flags","heredocs for help text","trap signal handlers","idempotent operations"],resource:'man getopts. "Bash Cookbook" by Albing & Vossen.',test:["Why is getopts safer than parsing $1, $2 manually?","How does trap let you clean up on Ctrl+C?","What exit code conventions do well-behaved CLIs follow?"],doneWhen:"One CLI tool with --help, --verbose, --dry-run, returns proper exit codes."}},blockB:{task:"Process lifecycle, signals, file descriptors — diagram the crash flow",brief:{insight:"A process is born via fork(), customized via exec(), runs until it exits or receives an uncaught signal. Parent must wait() on children or you get zombies. Signals are async interrupts — handle them or they kill you.",why:"Every container, daemon, and CI runner is a process tree. Understanding the lifecycle is understanding why things hang, leak, or won't die. This is the foundation under containerization.",terms:["fork / exec / wait","PID / PPID","zombie process","orphan process","SIGTERM vs SIGKILL","SIGCHLD","file descriptor leak"],resource:"man 2 fork. man 2 execve. man 7 signal. Julia Evans process zines.",test:["Why can't you catch SIGKILL?","What creates a zombie process?","What's an FD leak and how do you find one?"]}},project:'Diagram + 90-second explanation of "what happens when a Linux process crashes"',sd:{topicId:"dns-cdn",topic:"DNS & CDNs — resolution chain, edge caching",source:"Grokking SD Fundamentals"},dsa:{patternId:"arrays-hashing",topic:"Arrays & Hashing — continue practice"}},{num:3,phase:"DevOps Fundamentals",title:"Networking I",blockA:{task:"Set up local nginx reverse proxy with two upstream servers",brief:{insight:"A reverse proxy is the front door of every modern web stack. nginx is good at it because its config is declarative — you describe the topology, not the algorithm.",why:"Every K8s Ingress, every CDN edge, every API gateway is ultimately doing what nginx does. Master the config and the abstractions become readable.",terms:["upstream blocks","proxy_pass","X-Forwarded-For","keepalive","proxy_buffering"],resource:"nginx.com beginner's guide.",test:["Why does nginx need X-Forwarded-For when proxying?","What does keepalive between nginx and upstream actually save?","When does proxy_buffering hurt you?"],doneWhen:"curl through the LB hits backend1 and backend2 alternately. Headers show which backend served the request."}},blockB:{task:"TCP handshake, DNS resolution, HTTP lifecycle — draw it",brief:{insight:"Drawing the full HTTP lifecycle from address bar to byte-on-wire forces you to confront what you actually know. Make it a 90-second story you can tell on a whiteboard.",why:`Interviewers literally ask "what happens when you type a URL." If you can't draw it, you can't claim to know how the web works.`,terms:["DNS resolution","TCP 3-way handshake","TLS handshake","HTTP request","TCP teardown","connection reuse"],resource:'GitHub repo "what-happens-when". "High Performance Browser Networking" by Ilya Grigorik (free online).',test:["Where does the TLS handshake happen in the timeline?","What does HTTP/2 keep-alive save over HTTP/1.1?","Why are subsequent requests to the same host faster?"]}},project:"Draw full HTTP request lifecycle from browser to server in under 2 min",sd:{topicId:"load-balancers",topic:"Load Balancers — L4 vs L7, algorithms",source:"Grokking SD Fundamentals · NeetCode"},dsa:{patternId:"two-pointers",topic:"Two Pointers — the search pattern"}},{num:4,phase:"DevOps Fundamentals",title:"Networking II",blockA:{task:"tcpdump or Wireshark capture on your reverse proxy",brief:{insight:"tcpdump and Wireshark show what actually happened on the wire — not what your app thinks happened. When docs say one thing and behavior says another, the pcap is the tiebreaker.",why:'Once you can read a pcap, you stop being scared of network bugs. "Is the request reaching the server?" becomes a 30-second answer.',terms:["pcap","BPF filter syntax","TLS handshake messages","TCP retransmissions","window scaling"],resource:"tcpdump.org examples. Wireshark display filters reference.",test:["Filter for only TLS ClientHello messages — what command?","How do you tell a TCP retransmission from a duplicate?","What does window scaling mean and why does it matter?"],doneWhen:"Annotated pcap showing SYN → SYN-ACK → ACK → ClientHello → ServerHello with each step explained."}},blockB:{task:"TLS termination, load balancing strategies, subnetting basics",brief:{insight:'TLS is not "add an s to http." It is an asymmetric handshake establishing a symmetric session key, then encrypting everything after. Termination is where TLS unwraps — usually your LB, not your app.',why:"TLS termination location is a constant source of bugs: HTTP between LB and app, certificate mismatches, SNI failures. Knowing where the encryption boundary is fixes them.",terms:["TLS handshake","ClientHello / ServerHello","cipher suites","SNI","certificate chain","mutual TLS (mTLS)","perfect forward secrecy"],resource:'Cloudflare Learning Center on TLS. "Bulletproof SSL and TLS" by Ivan Ristic (Ch 1-3 free).',test:["Why does TLS need both asymmetric AND symmetric crypto?","What is SNI and why is it needed?","When would you use mTLS over regular TLS?"]}},project:"Annotated tcpdump trace of a TLS handshake",sd:{topicId:"databases-i",topic:"Databases I — SQL vs NoSQL, ACID, BASE",source:"NeetCode SD · Grokking DB"},dsa:{patternId:"two-pointers",topic:"Two Pointers — more practice"}},{num:5,phase:"DevOps Fundamentals",title:"Docker Internals",blockA:{task:"Multi-stage Dockerfile, rootless container, Trivy scan",brief:{insight:"A good production Dockerfile separates the toolchain from the runtime. Build stage has gcc, npm, the universe. Final stage has the binary and nothing else. Smaller image = faster pull = lower attack surface.",why:"Your DevSecOps work cares about both speed and security. Multi-stage builds + scanning + rootless gives you all three.",terms:["FROM ... AS stage","COPY --from=stage","USER directive",".dockerignore","layer caching","distroless"],resource:'Docker "best practices" docs. Trivy GitHub README. Snyk Dockerfile cheat sheet.',test:["Why is order of COPY/RUN in a Dockerfile crucial for cache?","Why is running as root in a container risky if containers are isolated?","Distroless vs Alpine vs Ubuntu — when does each win?"],doneWhen:"Image under 100MB for a small app. Runs as non-root. Trivy passes with zero HIGH/CRITICAL CVEs."}},blockB:{task:"Namespaces, cgroups, image layers, container escape conceptually",brief:{insight:"Containers are not VMs. They are processes with restricted views. Linux namespaces give isolation, cgroups give resource limits. Same kernel, different views.",why:'When you can explain THIS, you can explain why containers start fast, why escapes are possible, and why "Docker is lightweight" actually means something specific.',terms:["Namespaces (PID, NET, MNT, UTS, IPC, USER)","cgroups","OCI runtime","OverlayFS","PID 1 problem","capabilities"],resource:'Julia Evans "Containers are just processes". Liz Rice "Container from Scratch in Go" talk on YouTube — gold standard.',test:["Name 3 of the 6 Linux namespaces.","Why does kill in a container only kill that container?","What is the PID 1 problem and how does tini solve it?"]}},project:"Minimal hardened container with passing Trivy scan",sd:{topicId:"caching",topic:"Caching — Redis, strategies, eviction",source:"Grokking SD Fundamentals"},dsa:{patternId:"sliding-window",topic:"Sliding Window — the optimization pattern"}},{num:6,phase:"DevOps Fundamentals",title:"CI/CD Patterns",blockA:{task:"GitHub Actions: lint → test → build → deploy + manual gate + rollback",brief:{insight:"A real pipeline is a directed graph of jobs with gates between them. Linting before tests saves CI minutes. Approval gates before prod save your weekend. Rollback as a first-class job saves your year.",why:"Your Azure DevOps work translates directly. GitHub Actions has different YAML but same patterns — and FAANG-adjacent companies almost all use GitHub Actions.",terms:["workflow events","jobs vs steps","environments + approval","matrix builds","caching","OIDC for cloud auth","reusable workflows"],resource:'GitHub Actions "learn" docs. "GitHub Actions in Action" (Manning) for depth.',test:["Why use OIDC instead of stored AWS keys?","When matrix vs separate jobs?",`What do "environments" buy you that "if" conditions don't?`],doneWhen:"Push triggers full pipeline. Manual approval for deploy. One-button rollback works."}},blockB:{task:"GitOps vs push CI/CD, trunk-based dev, blue/green, canary",brief:{insight:"GitOps inverts the CI/CD arrow. Instead of CI pushing to prod, prod pulls from Git. Your repo IS your deployment state. Drift detection becomes possible because deviation from Git equals drift.",why:'ArgoCD and Flux are not "another CI tool" — a fundamentally different model. Knowing both lets you pick the right one. This is platform engineering thinking.',terms:["Push vs pull CI/CD","Declarative config","Drift detection","ArgoCD","Flux","Blue/green","Canary","Feature flags","Progressive delivery"],resource:'Weaveworks "GitOps Guide" PDF. OpenGitOps principles.',test:["When does GitOps fail or feel wrong?","Why is rollback easy in GitOps?","Blue/green vs canary — when does each win?"]}},project:"Working pipeline with rollback in a public repo",sd:{topicId:"message-queues",topic:"Message Queues — Kafka, RabbitMQ, pub/sub",source:"NeetCode SD · Grokking"},dsa:{patternId:"sliding-window",topic:"Sliding Window — more practice"}},{num:7,phase:"DevOps Fundamentals",title:"Kubernetes I",blockA:{task:"Multi-service deploy with Ingress, HPA, PDB, resource limits",brief:{insight:`Production K8s is not "kubectl apply deployment.yaml." It is requests so the scheduler can pack you, limits so neighbors can't crush you, HPA so you scale, and PDB so deploys don't kill your last replica.`,why:'Your on-prem K8s work plus these primitives equals a portfolio piece. Knowing the production checklist separates "deployed K8s" from "ran K8s in production."',terms:["Deployment vs StatefulSet vs DaemonSet","Service types","Ingress","HPA","PDB","requests vs limits","namespaces","resource quotas"],resource:'Kubernetes.io concepts docs (the official ones are great). "Kubernetes the Hard Way" by Kelsey Hightower.',test:["Why requests for scheduling, limits for runtime?","When does a StatefulSet beat a Deployment?","HPA vs VPA?"],doneWhen:"App reachable via Ingress, scales when load-tested, survives a kubectl drain of one node."}},blockB:{task:"Scheduler internals, etcd role, control plane flow",brief:{insight:`kubectl apply doesn't create a pod. It writes to etcd. Controller manager notices, makes a Deployment. Scheduler picks a node. Kubelet runs the container. This async chain is why "stuck in Pending" has 5 causes.`,why:'Every K8s debugging story is "where did the chain break?" Knowing the chain means knowing where to look.',terms:["Control plane","kubelet","kube-proxy","reconciliation loop","desired vs actual state","CRDs","operators"],resource:'"Kubernetes the Hard Way" (Kelsey Hightower, free on GitHub).',test:["What 4 components are involved between kubectl apply and a running pod?",'Why is K8s called "declarative"?',"What does the kubelet do that the scheduler doesn't?"]}},project:"Annotated diagram of pod lifecycle from kubectl apply to running",sd:{topicId:"databases-ii",topic:"Databases II — Sharding, replication, partitioning",source:"Grokking SD"},dsa:{patternId:"stack",topic:"Stack — the LIFO pattern"}},{num:8,phase:"DevOps Fundamentals",title:"Kubernetes II",blockA:{task:"Break your cluster deliberately and debug it",brief:{insight:"You learn K8s debugging by breaking things on purpose, predicting failure modes, then watching reality match (or not match) your prediction. The gap is your knowledge gap.",why:"Production K8s issues are inherently chaotic. Practicing on intentional failures means real failures feel familiar.",terms:["kubectl describe pod","kubectl logs --previous","CrashLoopBackOff","ImagePullBackOff","OOMKilled","kubectl events --sort-by"],resource:'K8s docs "Troubleshooting" section.',test:["Pod is Pending — what 5 things to check first?","CrashLoopBackOff — where do you look?","OOMKilled — too low limit, memory leak, or both?"],doneWhen:"Incident response writeup of 3 self-inflicted outages with root cause + fix."}},blockB:{task:"CNI, Services, Ingress controllers, NetworkPolicies",brief:{insight:"K8s networking is 5 layers: pod-to-pod (CNI), pod-to-service (kube-proxy), service-to-pod (Endpoints), external-to-service (Ingress), and the underlying node network. NetworkPolicies are firewall rules at the pod level.",why:`When you can map the actual packet path, you debug "why can't A reach B" instead of restarting random things.`,terms:["CNI","pod CIDR","ClusterIP / NodePort / LoadBalancer","Endpoints","Ingress vs Gateway API","NetworkPolicy","kube-proxy modes"],resource:'Calico "Kubernetes networking 101". learnk8s.io networking deep dive.',test:["Trace a packet from pod A in node 1 to pod B in node 2.","What does an Ingress controller actually do?","When would you reach for a NetworkPolicy?"]}},project:"Incident response writeup of a self-inflicted K8s outage",sd:{topicId:"cap-theorem",topic:"CAP Theorem & Consistency — strong vs eventual",source:"NeetCode SD · Grokking"},dsa:{patternId:"binary-search",topic:"Binary Search — the O(log n) pattern"}},{num:9,phase:"MLOps Bridge",title:"ML Fundamentals",blockA:{task:"fast.ai Lesson 1 — get a model running, no theory rabbit holes",brief:{insight:"Don't try to understand everything. Just get the training loop running and watch the numbers change. Theory clicks faster when you have a running thing to point at.",why:"Your engineering brain wants to understand the whole stack first. Fight that instinct here. Get something running, then learn why.",terms:["Dataset","DataLoader","Model","Loss function","Optimizer","Train/val split","Epoch"],resource:`fast.ai Lesson 1 video + Ch 1 of the free book. 3blue1brown's "But what IS a neural network" series.`,test:["What does the optimizer actually update?","Why do we split into train and val sets?","What does one epoch consist of?"],doneWhen:"A trained classifier with accuracy printed to console, weights saved to disk."}},blockB:{task:"What is a training loop, what does it produce, why track it",brief:{insight:"A training loop is just: forward pass (predict), compute loss (how wrong), backward pass (compute gradients), step optimizer (update weights). Repeat for batches. Track metrics. The rest is decoration.",why:'When ML demystifies into "a loop that minimizes a function," you stop being intimidated. The infra around it is normal SWE problems applied to ML.',terms:["Forward / backward pass","Gradient descent","Loss function","Optimizer (SGD, Adam)","Epoch vs batch vs step","Overfitting","Regularization"],resource:"fast.ai book Ch 1-2. 3blue1brown YouTube series.",test:["Difference between epoch and step?","Why train/val/test, not just train/val?","What does the optimizer actually do mathematically?"]}},project:"One working classifier you understand end-to-end",sd:{topicId:"url-shortener",topic:"Design URL Shortener — gateway problem",source:"Grokking SD Interview"},dsa:{patternId:"linked-list",topic:"Linked List — the pointer pattern"}},{num:10,phase:"MLOps Bridge",title:"scikit-learn + MLFlow",blockA:{task:"Train 3 models, log every run to MLFlow",brief:{insight:"sklearn is your training framework, MLFlow is your experiment tracker. Two libraries, two roles. Don't conflate them.",why:"Three models side by side, with all params and metrics logged — that's what a real ML team's workflow looks like.",terms:["sklearn Pipeline","mlflow.start_run()","log_params / log_metrics / log_artifact","Model registry"],resource:"MLFlow official quickstart. sklearn user guide on pipelines.",test:["Why log params and metrics separately?",`What goes in an "artifact" that's not a metric?`,"When does the model registry add value?"],doneWhen:"MLFlow UI shows 3 runs side-by-side with accuracy and downloadable models."}},blockB:{task:"Map MLFlow concepts to DevOps: registry=artifact store, run=build",brief:{insight:"MLFlow concepts map 1:1 to DevOps. Experiment = repo. Run = build. Params = build args. Artifacts = build outputs. Model registry = container registry.",why:"The MLOps world has invented new names for old patterns. Translating to your DevOps vocab cuts the learning curve in half.",terms:["Experiment","Run","Param","Metric","Artifact","Model registry","Model stage"],resource:"MLFlow concepts docs. Made-With-ML GitHub repo by goku-mohandas.",test:["Where does MLFlow store metrics — DB or files?","Difference between an experiment and a run?","How to promote model from Staging to Production?"]}},project:"MLFlow UI comparing 3+ runs with different hyperparameters",sd:{topicId:"pastebin",topic:"Design Pastebin — storage-heavy variant",source:"Grokking SD Interview"},dsa:{patternId:"linked-list",topic:"Linked List — more practice"}},{num:11,phase:"MLOps Bridge",title:"DVC",blockA:{task:"Add DVC to mlops-lab repo, version data in S3",brief:{insight:'DVC is Git for big files plus a pipeline runner. The "git for data" part stores tiny pointers in Git, actual data in S3. The pipeline part (dvc.yaml) makes training reproducible.',why:'A reproducible ML repo is a portfolio piece. Without DVC: "trust me, it works." With DVC: anyone clones, pulls, repros.',terms:["dvc init","dvc add",".dvc files","dvc remote","dvc.yaml","dvc repro","dvc.lock"],resource:'DVC "Get Started" tutorial. Made-With-ML repo DVC sections.',test:["Why store the .dvc pointer in Git but not the data?","What does dvc.lock track?","When dvc params vs dvc dataset versioning?"],doneWhen:"Repo is reproducible by another machine via clone + dvc pull + dvc repro."}},blockB:{task:"Why versioning data matters, DVC vs Git mental model",brief:{insight:"Git is bad at large binaries because it stores diffs forever. DVC stores tiny pointers in Git, actual data in object storage. Same UX, right tool for the data.",why:"Versioning data is half of reproducible ML. The other half is versioning code. DVC bridges them.",terms:["DVC pointer","DVC remote","CAS (content-addressable storage)","MD5 chunking","dvc.yaml stages"],resource:"DVC concepts docs. iterative.ai blog posts.",test:["What problem does CAS solve that file naming doesn't?","Why is rerunning reproducible only with dvc.lock?","When would you NOT use DVC?"]}},project:"Working dvc repro pipeline with versioned dataset",sd:{topicId:"twitter",topic:"Design Twitter — feed generation, fanout",source:"Grokking SD Interview"},dsa:{patternId:"trees",topic:"Trees — the recursive pattern"}},{num:12,phase:"MLOps Bridge",title:"Cloud-Native ML",blockA:{task:"Run one managed training job on SageMaker or Azure ML",brief:{insight:"Don't try to learn both clouds. Pick one. Run one training job. Deploy one endpoint. curl it. Done.",why:"Managed ML services are increasingly the default for production ML. Knowing one cloud's flow makes you fluent in the concepts.",terms:["Training job","Model artifact","Endpoint","Inference container","Instance type","Spot training"],resource:'AWS SageMaker workshops (sagemaker-workshop.com). Azure ML "MLOps with GitHub" tutorial.',test:["How does SageMaker know which Python script to run?","Why use a separate inference container vs training one?","When would Spot instances backfire?"],doneWhen:"curl https://your-endpoint with JSON payload returns a prediction."}},blockB:{task:"Cost vs control: managed ML vs self-hosted K8s",brief:{insight:'Managed ML services are "K8s for ML, abstracted." Speed-to-prototype but lose control. For experiments: managed wins. For high-volume serving with custom logic: self-hosted often wins.',why:"The cost/control tradeoff is the same as any cloud-vs-self-hosted decision. Knowing when each makes sense is platform engineering work.",terms:["Managed training","Managed endpoint","Instance type / family","Autoscaling endpoints","Batch vs real-time inference","Multi-model endpoints","A/B traffic split"],resource:"AWS Well-Architected ML Lens. Azure ML pricing calculator.",test:["When does SageMaker get expensive?","Batch vs real-time cost-wise?","When would you NOT use a managed service?"]}},project:"Deployed model endpoint with curl-able predictions",sd:{topicId:"youtube",topic:"Design YouTube — video storage, encoding, CDN",source:"Grokking SD Interview"},dsa:{patternId:"trees",topic:"Trees — more practice (BST, traversal)"}},{num:13,phase:"MLOps Bridge",title:"Buffer & Polish",blockA:{task:"Catch up on skipped work. Polish your mlops-lab README",brief:{insight:"A polished portfolio piece beats five unpolished ones. Spend this week making your mlops-lab repo something a stranger could clone and understand.",why:`This is the difference between "I learned MLOps" (forgettable) and "I shipped an MLOps system, here's the repo" (memorable).`,terms:["README structure","Architecture diagram (mermaid, excalidraw)","Quickstart section","Dependency pinning",".gitignore hygiene","License"],resource:"Browse top-starred MLOps repos on GitHub for README patterns. Made-With-ML's README is a good template.",test:["Does your README explain WHY, not just WHAT?","Can you reproduce your project from a fresh clone?","Is there a diagram?"],doneWhen:"A stranger could clone your repo and reproduce your work from the README alone."}},blockB:{task:"Write a 1-page summary of what you built",brief:{insight:`Writing about what you built is when you discover what you didn't understand. The "I'll explain it later" parts you skipped become visible the moment you try to put them in writing.`,why:"The skill of writing about your own work clearly separates engineers from senior engineers in interviews.",terms:["Technical writing","Narrative arc (problem → approach → result)","Audience awareness","Show don't tell"],resource:"Stripe engineering blog. Netflix tech blog. These are the gold standard.",test:["Could a non-technical recruiter understand the impact?","Could a senior engineer evaluate your skill from this?","Have you removed every adjective that doesn't earn its place?"]}},project:"Public mlops-lab repo with clean README — portfolio piece",sd:{topicId:"uber",topic:"Design Uber — geo-indexing, real-time matching",source:"Grokking SD Interview"},dsa:{patternId:"trees",topic:"Trees — Trie + Heap intro"}},{num:14,phase:"UPenn Semester",title:"UPenn Starts",blockA:{task:"[Reduced] UPenn coursework is primary. 30 min/day max on MLOps",brief:{insight:"Your job this week is to NOT collapse. Set up grad school workflow. Calendar blocks for school, work, MLOps. Pick a note-taking system and commit.",why:"First-week grad students who try to perfectly balance everything burn out by week 6. The ones who underschedule on purpose and add back what fits, thrive.",terms:["Time-blocking","Knowledge management (Obsidian, Notion)","Spaced repetition (Anki)","Strategic reading","Office hours"],resource:`Cal Newport "How to Become a Straight-A Student". Andy Matuschak's notes on spaced repetition.`,test:["Have you blocked time for school, work, AND MLOps?","Do you have at least one classmate you can DM?","Do you know who your TA is?"],doneWhen:"Weekly calendar template that's sustainable. At least one reading and one problem set started without burning out."}},blockB:{task:"Set up grad school workflow — notes, calendar blocks",brief:{insight:"Grad school is not undergrad with harder homework. The pace is faster, the abstraction higher, the support thinner. Adapt fast: skim before reading, identify the 20% that's tested, build a study group week 1.",why:"You're paying a lot for this degree. Treating it strategically isn't cynical, it's respectful of your time and money.",terms:["Skimming-first reading","Strategic reading","Study groups","Office hours","Problem-set-driven learning"],resource:'Cal Newport "Deep Work" + "Straight-A Student". Your UPenn TAs.',test:["Have you identified the 20% of material actually tested?","Joined or started a study group?","Do you have a sustainable weekly rhythm?"]}},project:"Sustainable weekly schedule for school + work + MLOps",sd:{topicId:"whatsapp",topic:"[Reduced] Design WhatsApp — websockets, delivery",source:"Grokking SD Interview"},dsa:{patternId:"graphs",topic:"Graphs intro — BFS/DFS basics"}},{num:15,phase:"UPenn Semester",title:"KubeFlow (Light)",blockA:{task:"One small KubeFlow pipeline — two steps, local cluster",brief:{insight:"KubeFlow takes the patterns you know from K8s and wraps them in ML-specific abstractions. Not magic — K8s with opinions about how ML workloads should look.",why:"Your existing K8s knowledge gives you a head start most ML folks don't have.",terms:["KubeFlow Pipelines (KFP)","Pipeline DSL","Component","Artifact","Tekton/Argo","Katib"],resource:"KubeFlow official tutorials. Arrikto blog for beginner pieces.",test:["What does KFP add over plain K8s Jobs?","Katib vs manual hyperparameter sweeps?","Why is artifact passing between steps important?"],doneWhen:"One pipeline runs end-to-end. You can see the graph in the KFP UI."}},blockB:{task:"How K8s patterns translate to ML pipelines",brief:{insight:'K8s gives you scheduling, isolation, resource limits, observability. KubeFlow says "ML workflows need these too" and adds artifact lineage on top. Same primitives, ML-shaped use case.',why:`If you can explain "KubeFlow is K8s with ML-specific lineage and DSL," you sound senior. If you can't, you sound like you read blog posts.`,terms:["Pipeline as DAG","Component","Artifact lineage","Parameter passing","Conditional execution","Loops in pipelines"],resource:"KubeFlow concepts page. Architecture docs.",test:['Why is "pipeline as code" valuable over YAML?',"How does artifact lineage help debugging?","When would you NOT use KubeFlow?"]}},project:"Working 2-step KubeFlow pipeline in mlops-lab",sd:{topicId:"dropbox",topic:"Design Dropbox — file sync, chunking, delta sync",source:"Grokking SD Interview"},dsa:{patternId:"graphs",topic:"Graphs — more patterns"}},{num:16,phase:"UPenn Semester",title:"Spark Mental Model",blockA:{task:"One 3-hour Spark intro — DataFrames only",brief:{insight:"Read a CSV with PySpark, do 3 transformations (filter, groupBy, agg), write to parquet. That's it. No clusters, no tuning, just the API and the lazy-evaluation mental model.",why:"Spark is overkill for most problems. Knowing when it's overkill (vs pandas) is more valuable than memorizing the API.",terms:["SparkSession","DataFrame","Transformations vs actions","Lazy evaluation",".show()",".explain()","Parquet"],resource:'Spark DataFrame quickstart. Holden Karau "Spark: The Definitive Guide" first chapters.',test:["What triggers actual computation in Spark?","Why does Spark output Parquet by default?","When does PySpark beat pandas?"],doneWhen:"A notebook that processes a real dataset in under 10 lines of Spark code."}},blockB:{task:"When you actually need Spark vs pandas",brief:{insight:"Spark equals lazy distributed pandas. You describe operations on a DataFrame, nothing runs until you trigger an action. The DAG gets optimized as a whole. .explain() shows what Spark plans to do.",why:'The honest answer to "when do you need Spark?" is: rarely if data fits in memory, often if not. The mental model lets you have that conversation.',terms:["SparkSession","DataFrame","RDD","Transformation vs action","Catalyst optimizer","Partition","Shuffle","Broadcast join"],resource:'Spark UI walkthrough on databricks.com. "Spark: Definitive Guide" (free PDF).',test:["When is Spark overkill?","Transformation vs action?","Why is .collect() dangerous on big data?"]}},project:"One Spark notebook processing a real dataset",sd:{topicId:"web-crawler",topic:"Design Web Crawler — distributed, politeness, dedup",source:"Grokking SD Interview"},dsa:{patternId:"dp",topic:"1-D Dynamic Programming — the memoization pattern"}},{num:17,phase:"UPenn Semester",title:"ML Monitoring",blockA:{task:"Add Evidently for data drift",brief:{insight:'Plug Evidently into a model in mlops-lab. Compute drift on synthetic "new" data. Export to JSON, ingest into Grafana.',why:"You know Prometheus and Grafana already. Adding ML-specific metrics to that stack is a way smaller jump than learning a whole new tool.",terms:["Data drift","Concept drift","PSI (Population Stability Index)","KS statistic","Grafana dashboards from JSON","Alerting rules"],resource:"Evidently AI's docs and blog. They literally wrote the book.",test:["Why JSON intermediate instead of pushing metrics directly?","What threshold for PSI alert?","When does drift detection give false positives?"],doneWhen:"Grafana shows a drift score over time that changes when you inject distribution-shifted data."}},blockB:{task:"Why model drift differs from infra monitoring",brief:{insight:"Infra monitoring catches things that are broken. ML monitoring catches things that are wrong. A model can have 100% uptime, perfect latency, and silently make worse predictions because the world changed. That's drift.",why:`This is the unique value of MLOps over DevOps. If you can explain WHY model monitoring is different, you've earned your "MLOps engineer" title.`,terms:["Data drift","Concept drift","Label drift","Prediction drift","PSI","KS statistic","Ground truth lag","Shadow deployment"],resource:'Evidently blog. "Reliable Machine Learning" book by Cathy Chen et al.',test:["Why is ground truth always delayed?","Difference between data drift and concept drift?","When would you NOT need drift monitoring?"]}},project:"Grafana dashboard with a drift metric over time",sd:{topicId:"news-feed",topic:"Design Facebook News Feed — ranking, push vs pull",source:"Grokking SD Interview"},dsa:{patternId:"dp",topic:"1-D DP — more practice"}},{num:18,phase:"UPenn Semester",title:"CML in CI/CD",blockA:{task:"GitHub Actions workflow that trains + posts metrics to PR",brief:{insight:'CML (Continuous Machine Learning) by Iterative posts model metrics as PR comments with plots. Suddenly every PR answers "did this make the model better?"',why:"This is the demo that wins interviews. Recruiters can SEE your work — they open a PR, see auto-generated metrics, instantly understand you do real MLOps.",terms:["CML GitHub Action","GITHUB_TOKEN","cml comment create","Vega plots","Self-hosted runners (GPU)"],resource:"iterative.ai's CML docs and example repos.",test:["Why use GITHUB_TOKEN vs a PAT?","How handle non-deterministic training in CI?","Cost model of training on every PR?"],doneWhen:"A PR you opened has an auto-generated comment with model metrics and a plot."}},blockB:{task:"Why ML deserves first-class CI/CD treatment",brief:{insight:`Treating models like code means every PR can answer "did this make the model better?" That's a deployment gate. It's what separates "we have a model in prod" from "we have a continuously-improving model in prod."`,why:"The promise of MLOps is fast, safe iteration. CML is one concrete way to deliver that. Also a visible portfolio piece.",terms:["Continuous training","Continuous evaluation","Model gating","Golden dataset","Shadow evaluation","Regression tests for ML"],resource:"Made-With-ML CI/CD chapter. iterative.ai blog on MLOps maturity.",test:["What metric would you regression-test on every PR?","How handle non-deterministic training in CI?","When does CML get expensive?"]}},project:"PR with auto-generated model performance comment",sd:{topicId:"recommendation",topic:"ML SD — Recommendation System",source:"Grokking ML SD Interview"},dsa:{patternId:"dp",topic:"2-D Dynamic Programming intro"}},{num:19,phase:"UPenn Semester",title:"Explainable AI",blockA:{task:"Add SHAP to your model, generate summary plots",brief:{insight:"SHAP tells you which features drove each prediction. Summary plot = global view. Force plot = local view (why this specific prediction).",why:"When your model is wrong, SHAP often tells you which feature betrayed you. Debugging superpower more than regulatory checkbox.",terms:["SHAP values","Summary plot","Force plot","LIME (alternative)","Feature importance vs attribution","TreeExplainer"],resource:'SHAP official docs (slundberg/shap). Christoph Molnar "Interpretable ML" book (free online).',test:['Why are SHAP values "fair" mathematically?',"When does global feature importance mislead you?","How embed a SHAP plot in a PR comment?"],doneWhen:"PR comment shows model performance AND a SHAP plot explaining feature drivers."}},blockB:{task:"When explainability is required vs nice-to-have",brief:{insight:"Explainability isn't optional in regulated domains (finance, healthcare, hiring, defense). Even where optional, it's a debugging superpower. SHAP, LIME, integrated gradients are the three big techniques.",why:'"Explainable AI" is a buzzword. Knowing the actual techniques is the substance. Especially relevant for defense — DoD increasingly requires it.',terms:["SHAP","LIME","Integrated gradients","Feature importance (global) vs attribution (local)","Counterfactual explanations","Model cards"],resource:`Christoph Molnar "Interpretable Machine Learning". Google's Model Cards paper.`,test:["When is global feature importance misleading?",'Why are SHAP values mathematically "fair"?',"What's a model card?"]}},project:"PR comment with SHAP plot via CML",sd:{topicId:"search-ranking",topic:"ML SD — Search Ranking, embeddings",source:"Grokking ML SD Interview"},dsa:{patternId:"dp",topic:"2-D DP — more practice"}},{num:20,phase:"UPenn Semester",title:"Capstone Polish",blockA:{task:"Tie mlops-lab into one story: data → model → serve → monitor → explain",brief:{insight:"Your mlops-lab should tell ONE story: dataset → versioning → training → registry → serving → monitoring → explainability. README walks a stranger through it.",why:`Time to compound. This week is the difference between "I studied MLOps" (forgettable) and "I shipped an MLOps system, here's the proof" (memorable).`,terms:["Narrative architecture","End-to-end demo","Video walkthrough (Loom)","Deployable demo","GitHub Pages for project sites"],resource:"How Stripe, Airbnb, Netflix engineering blogs structure project writeups.",test:["Can you demo the full pipeline in 5 minutes?","Does a 2-min video walkthrough exist?","Is the LinkedIn post drafted?"],doneWhen:"You can demo the full pipeline in 5 minutes. LinkedIn post published with link."}},blockB:{task:"Write portfolio narrative + LinkedIn post",brief:{insight:`The portfolio piece you ship in week 20 IS your value proposition to platform engineering hiring managers. It says: "I understand DevOps, MLOps, and how they connect." That's a rare profile.`,why:"Three-year career capital compounds from here. Portfolio + UPenn + clearance + DevSecOps + MLOps is rare enough to command $250K+ offers in 2027-2028.",terms:["Hiring signal","Recruiter-friendly summary","Public demo","Storytelling for engineers","LinkedIn as portfolio"],resource:"Stripe engineering blog. Airbnb tech blog. Read 5 posts, notice the structure, copy it.",test:["Can a non-technical recruiter understand what you built?","Can a senior engineer evaluate your skill?","Have you posted it?"]}},project:"Portfolio-ready mlops-lab + LinkedIn writeup published",sd:{topicId:"mock-week",topic:"Mock interview week — 3 problems under 45-min timer",source:"Self-directed · RESHADED framework"},dsa:{patternId:"review",topic:"Review weak patterns + mock LeetCode session"}}],ee="runway:v2:progress",te="runway:v2:sync",se="runway:v2:ai",s={progress:{},activeTab:"today",selectedWeek:1,selectedLesson:null,expandedBriefs:new Set,showSettings:!1,showAI:!1,aiContext:null,syncConfig:{url:"",email:"",password:"",enabled:!1},syncStatus:"offline",aiConfig:{apiKey:"",enabled:!1}};let N=[];function he(e){return N.push(e),()=>{N=N.filter(t=>t!==e)}}function y(){N.forEach(e=>e())}function me(){try{const e=localStorage.getItem(ee);e&&(s.progress=JSON.parse(e).progress||{})}catch(e){console.error("load progress",e)}try{const e=localStorage.getItem(te);e&&Object.assign(s.syncConfig,JSON.parse(e))}catch(e){console.error("load sync",e)}try{const e=localStorage.getItem(se);e&&Object.assign(s.aiConfig,JSON.parse(e))}catch(e){console.error("load ai",e)}s.selectedWeek=j()}function V(){try{localStorage.setItem(ee,JSON.stringify({version:2,progress:s.progress,savedAt:new Date().toISOString()}))}catch(e){console.error("save progress",e)}}function oe(){try{localStorage.setItem(te,JSON.stringify(s.syncConfig))}catch(e){console.error("save sync",e)}}function ie(){try{localStorage.setItem(se,JSON.stringify(s.aiConfig))}catch(e){console.error("save ai",e)}}function ge(e,t){s.progress[e]=t,V(),fe(),y()}function f(e){return!!s.progress[e]}function R(e){ge(e,!s.progress[e])}function J(e,t){const a=new Date(e.getFullYear(),e.getMonth(),e.getDate()),i=new Date(t.getFullYear(),t.getMonth(),t.getDate());return Math.floor((i-a)/864e5)}function j(){const e=J(U,new Date);return Math.max(1,Math.min(20,Math.floor(e/7)+1))}function ae(){return(J(U,new Date)%7+7)%7}function be(e){const t=new Date(U);return t.setDate(t.getDate()+(e-1)*7),t}function re(){let e=0,t=0,a=0,i=0,o=0;for(let r=1;r<=20;r++){for(let d=0;d<7;d++)e+=2,s.progress[`w${r}_d${d}_a`]&&t++,s.progress[`w${r}_d${d}_b`]&&t++;s.progress[`w${r}_project`]&&a++,s.progress[`w${r}_sd`]&&i++,s.progress[`w${r}_dsa`]&&o++}const n=new Date;let c=0;for(let r=0;r<140;r++){const d=new Date(n);d.setDate(n.getDate()-r);const m=J(U,d);if(m<0)break;const g=Math.floor(m/7)+1,w=m%7;if(!(g<1||g>20))if(s.progress[`w${g}_d${w}_a`]||s.progress[`w${g}_d${w}_b`])c++;else break}let l=0;return Object.keys(s.progress).forEach(r=>{r.startsWith("dsa_")&&s.progress[r]&&l++}),{totalBlocks:e,doneBlocks:t,projects:a,sds:i,dsas:o,dsaProbs:l,streak:c,pct:e?Math.round(t/e*100):0}}const x={token:null,userId:null,recordId:null};let q=null;async function ne(){const e=await fetch(`${s.syncConfig.url}/api/collections/users/auth-with-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({identity:s.syncConfig.email,password:s.syncConfig.password})});if(!e.ok)throw new Error("Auth failed: "+e.status);const t=await e.json();x.token=t.token,x.userId=t.record.id}async function le(){const e=`${s.syncConfig.url}/api/collections/state/records?filter=(user='${x.userId}')&perPage=1`,t=await fetch(e,{headers:{Authorization:x.token}});if(!t.ok)throw new Error("Fetch failed: "+t.status);return(await t.json()).items[0]||null}async function ye(){const e=JSON.stringify({user:x.userId,data:s.progress}),t={"Content-Type":"application/json",Authorization:x.token};let a;if(x.recordId?a=await fetch(`${s.syncConfig.url}/api/collections/state/records/${x.recordId}`,{method:"PATCH",headers:t,body:e}):a=await fetch(`${s.syncConfig.url}/api/collections/state/records`,{method:"POST",headers:t,body:e}),!a.ok)throw new Error("Save failed: "+a.status);const i=await a.json();x.recordId=i.id}async function F(){if(!(!s.syncConfig.enabled||!s.syncConfig.url))try{s.syncStatus="syncing",y(),x.token||await ne();const e=await le();e&&(x.recordId=e.id,s.progress=e.data||{},V()),s.syncStatus="synced",y()}catch(e){console.error("pull",e),s.syncStatus="error",y()}}async function ce(){if(!(!s.syncConfig.enabled||!s.syncConfig.url))try{if(s.syncStatus="syncing",y(),x.token||await ne(),!x.recordId){const e=await le();e&&(x.recordId=e.id)}await ye(),s.syncStatus="synced",y()}catch(e){console.error("push",e),s.syncStatus="error",y()}}function fe(){s.syncConfig.enabled&&(q&&clearTimeout(q),q=setTimeout(ce,800))}setInterval(()=>{s.syncConfig.enabled&&s.syncStatus!=="syncing"&&F()},45e3);window.addEventListener("focus",()=>{s.syncConfig.enabled&&s.syncStatus!=="syncing"&&F()});const we="claude-sonnet-4-5-20250929";async function de(e,t=null){if(!s.aiConfig.apiKey)throw new Error("No API key configured. Open settings.");const a={model:we,max_tokens:1024,messages:[{role:"user",content:e}]};t&&(a.system=t);const i=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":s.aiConfig.apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true","Content-Type":"application/json"},body:JSON.stringify(a)});if(!i.ok){const n=await i.text();throw new Error(`AI error ${i.status}: ${n.substring(0,200)}`)}return(await i.json()).content.filter(n=>n.type==="text").map(n=>n.text).join(`
`)}function ve(){const e=new Blob([JSON.stringify({progress:s.progress,exportedAt:new Date().toISOString()},null,2)],{type:"application/json"}),t=URL.createObjectURL(e),a=document.createElement("a");a.href=t,a.download=`runway-backup-${new Date().toISOString().split("T")[0]}.json`,a.click(),URL.revokeObjectURL(t)}function ke(){confirm("Reset ALL progress? This cannot be undone.")&&(s.progress={},V(),y())}const $=e=>String(e||"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Se=e=>["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][e];function Q(){const e=j(),t=ae(),a=Y[e-1];if(!a)return'<div class="view"><div class="empty">Plan starts May 21, 2026.</div></div>';const i=_[a.phase],o=f(`w${e}_d${t}_a`),n=f(`w${e}_d${t}_b`),c=f(`w${e}_project`),l=f(`w${e}_sd`),r=f(`w${e}_dsa`);return`
    <div class="view stagger">
      <div class="today-hero">
        <div class="today-date">${new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}).toUpperCase()}</div>
        <h1 class="today-day">${Se(t)}<span class="dot">.</span></h1>
        <div class="today-week-meta">
          <span class="chip chip-track-${i.code}">${a.phase}</span>
          <span class="chip">Week ${e} of 20</span>
          <span class="chip">${$(a.title)}</span>
        </div>
      </div>

      <section class="feed-section">
        <div class="kicker" style="margin-bottom: 12px;">Today's Focus · 2 blocks</div>
        ${X("a",e,t,a.blockA,o)}
        ${X("b",e,t,a.blockB,n)}
      </section>

      <section class="feed-section">
        <div class="kicker" style="margin-bottom: 12px;">This Week's Tracks</div>

        <div class="track-card sd ${l?"done":""}" data-action="open-sd" data-id="${a.sd.topicId}" style="cursor: pointer;">
          <div class="row between gap-3" style="margin-bottom: 8px;">
            <span class="chip chip-track-sd">◇ System Design</span>
            <button class="check-circle ${l?"done":""}" data-action="toggle-sd" data-week="${e}" onclick="event.stopPropagation();">${l?"✓":""}</button>
          </div>
          <div class="h4" style="margin-bottom: 4px;">${$(a.sd.topic)}</div>
          <div class="caption">${$(a.sd.source)} · 2–3 sessions of ~30 min · Tap to open lesson →</div>
        </div>

        <div class="track-card dsa ${r?"done":""}" data-action="open-dsa" data-id="${a.dsa.patternId}" style="cursor: pointer;">
          <div class="row between gap-3" style="margin-bottom: 8px;">
            <span class="chip chip-track-dsa">⌘ DSA Pattern</span>
            <button class="check-circle ${r?"done":""}" data-action="toggle-dsa" data-week="${e}" onclick="event.stopPropagation();">${r?"✓":""}</button>
          </div>
          <div class="h4" style="margin-bottom: 4px;">${$(a.dsa.topic)}</div>
          <div class="caption">NeetCode 150 pattern · 3–5 problems this week · Tap to open lesson →</div>
        </div>
      </section>

      <section class="feed-section">
        <div class="kicker" style="margin-bottom: 12px;">Week ${e} Mini-Project</div>
        <div class="card tappable ${c?"done":""}" data-action="toggle-project" data-week="${e}">
          <div class="row gap-3">
            <span class="check-circle ${c?"done":""}">${c?"✓":""}</span>
            <span class="body">${$(a.project)}</span>
          </div>
        </div>
      </section>

      <div class="caption" style="text-align: center; font-style: italic; margin-top: 24px;">
        Either daily block counts toward your streak. The goal is momentum.
      </div>
    </div>
  `}function X(e,t,a,i,o){const n=e==="a",c=`today-${e}-${t}`,l=s.expandedBriefs.has(c);return`
    <div class="block-card ${e}-block ${o?"done":""}">
      <div class="block-card-header" data-action="toggle-block" data-week="${t}" data-day="${a}" data-kind="${e}" style="cursor:pointer;">
        <span class="block-card-tag">Block ${e.toUpperCase()} · ${n?"Build":"Understand"}</span>
        <span class="check-circle ${o?"done":""}">${o?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>':""}</span>
      </div>
      <div class="block-card-task" data-action="toggle-block" data-week="${t}" data-day="${a}" data-kind="${e}" style="cursor:pointer;">${$(i.task)}</div>
      <div class="block-card-time">${n?"45 min · hands-on":"30 min · conceptual"}</div>

      <button class="learn-toggle ${l?"open":""}" data-action="toggle-brief" data-brief="${c}">
        <span class="arrow">›</span>
        <span>${l?"Hide":"Learn"} the concept</span>
      </button>
      <div class="brief ${n?"":"b"} ${l?"open":""}">
        ${xe(i.brief)}
      </div>
    </div>
  `}function xe(e,t){const a=(e.terms||[]).map(n=>`<span class="chip">${$(n)}</span>`).join(""),i=(e.test||[]).map(n=>`<li>${$(n)}</li>`).join(""),o=e.doneWhen?`
    <div class="brief-section">
      <div class="brief-label">Done When</div>
      <div class="brief-done">${$(e.doneWhen)}</div>
    </div>`:"";return`
    <div class="brief-section">
      <div class="brief-label">Core Insight</div>
      <div class="brief-text">${$(e.insight)}</div>
    </div>
    <div class="brief-section">
      <div class="brief-label">Why This Matters</div>
      <div class="brief-why">${$(e.why)}</div>
    </div>
    <div class="brief-section">
      <div class="brief-label">Key Terms</div>
      <div class="brief-terms">${a}</div>
    </div>
    <div class="brief-section">
      <div class="brief-label">Best Resource</div>
      <div class="brief-resource">${$(e.resource)}</div>
    </div>
    <div class="brief-section">
      <div class="brief-label">Self-Test</div>
      <ul class="brief-tests">${i}</ul>
    </div>
    ${o}
    ${s.aiConfig.enabled?`
      <button class="btn" style="margin-top: 12px;" data-action="ask-ai" data-context="${$(e.insight.substring(0,200))}">
        Ask Claude about this →
      </button>
    `:""}
  `}const K=[{id:"arrays-hashing",title:"Arrays & Hashing",blurb:"The foundation. Hash maps for O(1) lookups, arrays for ordered data. If you can't solve these fast, nothing else compiles.",color:"#F5B842",lessonId:"arrays-hashing",problems:[{id:"contains-duplicate",title:"Contains Duplicate",difficulty:"Easy",url:"https://leetcode.com/problems/contains-duplicate/"},{id:"valid-anagram",title:"Valid Anagram",difficulty:"Easy",url:"https://leetcode.com/problems/valid-anagram/"},{id:"two-sum",title:"Two Sum",difficulty:"Easy",url:"https://leetcode.com/problems/two-sum/"},{id:"group-anagrams",title:"Group Anagrams",difficulty:"Medium",url:"https://leetcode.com/problems/group-anagrams/"},{id:"top-k-frequent",title:"Top K Frequent Elements",difficulty:"Medium",url:"https://leetcode.com/problems/top-k-frequent-elements/"},{id:"product-except-self",title:"Product of Array Except Self",difficulty:"Medium",url:"https://leetcode.com/problems/product-of-array-except-self/"},{id:"valid-sudoku",title:"Valid Sudoku",difficulty:"Medium",url:"https://leetcode.com/problems/valid-sudoku/"},{id:"encode-decode-strings",title:"Encode and Decode Strings",difficulty:"Medium",url:"https://leetcode.com/problems/encode-and-decode-strings/"},{id:"longest-consecutive",title:"Longest Consecutive Sequence",difficulty:"Medium",url:"https://leetcode.com/problems/longest-consecutive-sequence/"}]},{id:"two-pointers",title:"Two Pointers",blurb:"Two indices walking through an array, often from opposite ends. Trades brute-force O(n²) for elegant O(n).",color:"#E07856",lessonId:"two-pointers",problems:[{id:"valid-palindrome",title:"Valid Palindrome",difficulty:"Easy",url:"https://leetcode.com/problems/valid-palindrome/"},{id:"two-sum-ii",title:"Two Sum II - Sorted Input",difficulty:"Medium",url:"https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/"},{id:"3sum",title:"3Sum",difficulty:"Medium",url:"https://leetcode.com/problems/3sum/"},{id:"container-most-water",title:"Container With Most Water",difficulty:"Medium",url:"https://leetcode.com/problems/container-with-most-water/"},{id:"trapping-rain-water",title:"Trapping Rain Water",difficulty:"Hard",url:"https://leetcode.com/problems/trapping-rain-water/"}]},{id:"sliding-window",title:"Sliding Window",blurb:'A window of indices that grows and shrinks as you traverse. Optimization for "find the best subarray/substring" problems.',color:"#8FA876",lessonId:"sliding-window",problems:[{id:"best-time-buy-sell",title:"Best Time to Buy and Sell Stock",difficulty:"Easy",url:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"},{id:"longest-substring-no-repeat",title:"Longest Substring Without Repeating",difficulty:"Medium",url:"https://leetcode.com/problems/longest-substring-without-repeating-characters/"},{id:"longest-repeat-replacement",title:"Longest Repeating Character Replacement",difficulty:"Medium",url:"https://leetcode.com/problems/longest-repeating-character-replacement/"},{id:"permutation-in-string",title:"Permutation in String",difficulty:"Medium",url:"https://leetcode.com/problems/permutation-in-string/"},{id:"min-window-substring",title:"Minimum Window Substring",difficulty:"Hard",url:"https://leetcode.com/problems/minimum-window-substring/"},{id:"sliding-window-max",title:"Sliding Window Maximum",difficulty:"Hard",url:"https://leetcode.com/problems/sliding-window-maximum/"}]},{id:"stack",title:"Stack",blurb:'LIFO data structure. The "I need to remember things in reverse order" pattern. Parentheses, expressions, monotonic stacks.',color:"#7B9FB5",lessonId:"stack",problems:[{id:"valid-parentheses",title:"Valid Parentheses",difficulty:"Easy",url:"https://leetcode.com/problems/valid-parentheses/"},{id:"min-stack",title:"Min Stack",difficulty:"Medium",url:"https://leetcode.com/problems/min-stack/"},{id:"eval-reverse-polish",title:"Evaluate Reverse Polish Notation",difficulty:"Medium",url:"https://leetcode.com/problems/evaluate-reverse-polish-notation/"},{id:"generate-parentheses",title:"Generate Parentheses",difficulty:"Medium",url:"https://leetcode.com/problems/generate-parentheses/"},{id:"daily-temperatures",title:"Daily Temperatures",difficulty:"Medium",url:"https://leetcode.com/problems/daily-temperatures/"},{id:"car-fleet",title:"Car Fleet",difficulty:"Medium",url:"https://leetcode.com/problems/car-fleet/"},{id:"largest-rectangle-histo",title:"Largest Rectangle in Histogram",difficulty:"Hard",url:"https://leetcode.com/problems/largest-rectangle-in-histogram/"}]},{id:"binary-search",title:"Binary Search",blurb:"Divide the search space in half each step. O(log n). Works on sorted data — and on monotonic answer spaces.",color:"#B888C0",lessonId:"binary-search",problems:[{id:"binary-search",title:"Binary Search",difficulty:"Easy",url:"https://leetcode.com/problems/binary-search/"},{id:"search-2d-matrix",title:"Search a 2D Matrix",difficulty:"Medium",url:"https://leetcode.com/problems/search-a-2d-matrix/"},{id:"koko-eating-bananas",title:"Koko Eating Bananas",difficulty:"Medium",url:"https://leetcode.com/problems/koko-eating-bananas/"},{id:"find-min-rotated",title:"Find Min in Rotated Sorted Array",difficulty:"Medium",url:"https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"},{id:"search-rotated-array",title:"Search in Rotated Sorted Array",difficulty:"Medium",url:"https://leetcode.com/problems/search-in-rotated-sorted-array/"},{id:"time-based-kv-store",title:"Time Based Key-Value Store",difficulty:"Medium",url:"https://leetcode.com/problems/time-based-key-value-store/"},{id:"median-two-sorted",title:"Median of Two Sorted Arrays",difficulty:"Hard",url:"https://leetcode.com/problems/median-of-two-sorted-arrays/"}]},{id:"linked-list",title:"Linked List",blurb:"Nodes connected by pointers. The data structure that teaches you to think in references. Fast/slow pointers, reversal, cycle detection.",color:"#F5B842",lessonId:"linked-list",problems:[{id:"reverse-linked-list",title:"Reverse Linked List",difficulty:"Easy",url:"https://leetcode.com/problems/reverse-linked-list/"},{id:"merge-two-sorted-lists",title:"Merge Two Sorted Lists",difficulty:"Easy",url:"https://leetcode.com/problems/merge-two-sorted-lists/"},{id:"reorder-list",title:"Reorder List",difficulty:"Medium",url:"https://leetcode.com/problems/reorder-list/"},{id:"remove-nth-from-end",title:"Remove Nth Node From End",difficulty:"Medium",url:"https://leetcode.com/problems/remove-nth-node-from-end-of-list/"},{id:"copy-list-random-pointer",title:"Copy List with Random Pointer",difficulty:"Medium",url:"https://leetcode.com/problems/copy-list-with-random-pointer/"},{id:"add-two-numbers",title:"Add Two Numbers",difficulty:"Medium",url:"https://leetcode.com/problems/add-two-numbers/"},{id:"linked-list-cycle",title:"Linked List Cycle",difficulty:"Easy",url:"https://leetcode.com/problems/linked-list-cycle/"},{id:"find-duplicate-number",title:"Find the Duplicate Number",difficulty:"Medium",url:"https://leetcode.com/problems/find-the-duplicate-number/"},{id:"lru-cache",title:"LRU Cache",difficulty:"Medium",url:"https://leetcode.com/problems/lru-cache/"},{id:"merge-k-sorted-lists",title:"Merge K Sorted Lists",difficulty:"Hard",url:"https://leetcode.com/problems/merge-k-sorted-lists/"},{id:"reverse-nodes-k-group",title:"Reverse Nodes in K-Group",difficulty:"Hard",url:"https://leetcode.com/problems/reverse-nodes-in-k-group/"}]},{id:"trees",title:"Trees",blurb:'Recursive structures. Most tree problems are "do thing for root, recurse on children, combine." BFS for level-order, DFS for path-based.',color:"#8FA876",lessonId:"trees",problems:[{id:"invert-tree",title:"Invert Binary Tree",difficulty:"Easy",url:"https://leetcode.com/problems/invert-binary-tree/"},{id:"max-depth-binary-tree",title:"Maximum Depth of Binary Tree",difficulty:"Easy",url:"https://leetcode.com/problems/maximum-depth-of-binary-tree/"},{id:"diameter-binary-tree",title:"Diameter of Binary Tree",difficulty:"Easy",url:"https://leetcode.com/problems/diameter-of-binary-tree/"},{id:"balanced-binary-tree",title:"Balanced Binary Tree",difficulty:"Easy",url:"https://leetcode.com/problems/balanced-binary-tree/"},{id:"same-tree",title:"Same Tree",difficulty:"Easy",url:"https://leetcode.com/problems/same-tree/"},{id:"subtree-of-another-tree",title:"Subtree of Another Tree",difficulty:"Easy",url:"https://leetcode.com/problems/subtree-of-another-tree/"},{id:"lca-bst",title:"Lowest Common Ancestor of BST",difficulty:"Medium",url:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"},{id:"level-order-traversal",title:"Binary Tree Level Order Traversal",difficulty:"Medium",url:"https://leetcode.com/problems/binary-tree-level-order-traversal/"},{id:"right-side-view",title:"Binary Tree Right Side View",difficulty:"Medium",url:"https://leetcode.com/problems/binary-tree-right-side-view/"},{id:"good-nodes",title:"Count Good Nodes in Binary Tree",difficulty:"Medium",url:"https://leetcode.com/problems/count-good-nodes-in-binary-tree/"},{id:"validate-bst",title:"Validate Binary Search Tree",difficulty:"Medium",url:"https://leetcode.com/problems/validate-binary-search-tree/"},{id:"kth-smallest-bst",title:"Kth Smallest Element in BST",difficulty:"Medium",url:"https://leetcode.com/problems/kth-smallest-element-in-a-bst/"},{id:"build-tree-from-preorder",title:"Construct Tree from Preorder/Inorder",difficulty:"Medium",url:"https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/"},{id:"binary-tree-max-path-sum",title:"Binary Tree Max Path Sum",difficulty:"Hard",url:"https://leetcode.com/problems/binary-tree-maximum-path-sum/"},{id:"serialize-deserialize-tree",title:"Serialize/Deserialize Binary Tree",difficulty:"Hard",url:"https://leetcode.com/problems/serialize-and-deserialize-binary-tree/"}]},{id:"tries",title:"Tries",blurb:`Prefix trees. The data structure that makes "search by prefix" O(L) where L is prefix length. Autocomplete's secret.`,color:"#7B9FB5",lessonId:"tries",problems:[{id:"implement-trie",title:"Implement Trie (Prefix Tree)",difficulty:"Medium",url:"https://leetcode.com/problems/implement-trie-prefix-tree/"},{id:"design-add-search-words",title:"Design Add and Search Words",difficulty:"Medium",url:"https://leetcode.com/problems/design-add-and-search-words-data-structure/"},{id:"word-search-ii",title:"Word Search II",difficulty:"Hard",url:"https://leetcode.com/problems/word-search-ii/"}]},{id:"heap",title:"Heap / Priority Queue",blurb:`A tree-based structure where the root is always the min (or max). O(log n) insert and extract. Use it whenever "what's the top/bottom K" comes up.`,color:"#B888C0",lessonId:"heap",problems:[{id:"kth-largest-stream",title:"Kth Largest Element in Stream",difficulty:"Easy",url:"https://leetcode.com/problems/kth-largest-element-in-a-stream/"},{id:"last-stone-weight",title:"Last Stone Weight",difficulty:"Easy",url:"https://leetcode.com/problems/last-stone-weight/"},{id:"k-closest-points-origin",title:"K Closest Points to Origin",difficulty:"Medium",url:"https://leetcode.com/problems/k-closest-points-to-origin/"},{id:"kth-largest-array",title:"Kth Largest Element in Array",difficulty:"Medium",url:"https://leetcode.com/problems/kth-largest-element-in-an-array/"},{id:"task-scheduler",title:"Task Scheduler",difficulty:"Medium",url:"https://leetcode.com/problems/task-scheduler/"},{id:"design-twitter",title:"Design Twitter",difficulty:"Medium",url:"https://leetcode.com/problems/design-twitter/"},{id:"find-median-stream",title:"Find Median from Data Stream",difficulty:"Hard",url:"https://leetcode.com/problems/find-median-from-data-stream/"}]},{id:"backtracking",title:"Backtracking",blurb:"Try a choice, recurse, undo the choice. The brute-force-with-pruning pattern. Permutations, combinations, subsets.",color:"#E07856",lessonId:"backtracking",problems:[{id:"subsets",title:"Subsets",difficulty:"Medium",url:"https://leetcode.com/problems/subsets/"},{id:"combination-sum",title:"Combination Sum",difficulty:"Medium",url:"https://leetcode.com/problems/combination-sum/"},{id:"permutations",title:"Permutations",difficulty:"Medium",url:"https://leetcode.com/problems/permutations/"},{id:"subsets-ii",title:"Subsets II",difficulty:"Medium",url:"https://leetcode.com/problems/subsets-ii/"},{id:"combination-sum-ii",title:"Combination Sum II",difficulty:"Medium",url:"https://leetcode.com/problems/combination-sum-ii/"},{id:"word-search",title:"Word Search",difficulty:"Medium",url:"https://leetcode.com/problems/word-search/"},{id:"palindrome-partitioning",title:"Palindrome Partitioning",difficulty:"Medium",url:"https://leetcode.com/problems/palindrome-partitioning/"},{id:"letter-combos-phone",title:"Letter Combinations of Phone Number",difficulty:"Medium",url:"https://leetcode.com/problems/letter-combinations-of-a-phone-number/"},{id:"n-queens",title:"N-Queens",difficulty:"Hard",url:"https://leetcode.com/problems/n-queens/"}]},{id:"graphs",title:"Graphs",blurb:"Nodes connected by edges. The most flexible data structure. BFS for shortest paths, DFS for connectivity, Union-Find for groups.",color:"#8FA876",lessonId:"graphs",problems:[{id:"number-of-islands",title:"Number of Islands",difficulty:"Medium",url:"https://leetcode.com/problems/number-of-islands/"},{id:"clone-graph",title:"Clone Graph",difficulty:"Medium",url:"https://leetcode.com/problems/clone-graph/"},{id:"max-area-of-island",title:"Max Area of Island",difficulty:"Medium",url:"https://leetcode.com/problems/max-area-of-island/"},{id:"pacific-atlantic-flow",title:"Pacific Atlantic Water Flow",difficulty:"Medium",url:"https://leetcode.com/problems/pacific-atlantic-water-flow/"},{id:"surrounded-regions",title:"Surrounded Regions",difficulty:"Medium",url:"https://leetcode.com/problems/surrounded-regions/"},{id:"rotting-oranges",title:"Rotting Oranges",difficulty:"Medium",url:"https://leetcode.com/problems/rotting-oranges/"},{id:"walls-and-gates",title:"Walls and Gates",difficulty:"Medium",url:"https://leetcode.com/problems/walls-and-gates/"},{id:"course-schedule",title:"Course Schedule",difficulty:"Medium",url:"https://leetcode.com/problems/course-schedule/"},{id:"course-schedule-ii",title:"Course Schedule II",difficulty:"Medium",url:"https://leetcode.com/problems/course-schedule-ii/"},{id:"redundant-connection",title:"Redundant Connection",difficulty:"Medium",url:"https://leetcode.com/problems/redundant-connection/"},{id:"word-ladder",title:"Word Ladder",difficulty:"Hard",url:"https://leetcode.com/problems/word-ladder/"},{id:"count-components",title:"Number of Connected Components",difficulty:"Medium",url:"https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/"},{id:"graph-valid-tree",title:"Graph Valid Tree",difficulty:"Medium",url:"https://leetcode.com/problems/graph-valid-tree/"}]},{id:"advanced-graphs",title:"Advanced Graphs",blurb:"Weighted graphs, shortest paths, MSTs. Dijkstra, Bellman-Ford, Prim, Kruskal. Less common in interviews but appears at FAANG.",color:"#B888C0",lessonId:"advanced-graphs",problems:[{id:"reconstruct-itinerary",title:"Reconstruct Itinerary",difficulty:"Hard",url:"https://leetcode.com/problems/reconstruct-itinerary/"},{id:"min-cost-connect-points",title:"Min Cost to Connect All Points",difficulty:"Medium",url:"https://leetcode.com/problems/min-cost-to-connect-all-points/"},{id:"network-delay-time",title:"Network Delay Time",difficulty:"Medium",url:"https://leetcode.com/problems/network-delay-time/"},{id:"swim-in-rising-water",title:"Swim in Rising Water",difficulty:"Hard",url:"https://leetcode.com/problems/swim-in-rising-water/"},{id:"alien-dictionary",title:"Alien Dictionary",difficulty:"Hard",url:"https://leetcode.com/problems/alien-dictionary/"},{id:"cheapest-flights-k-stops",title:"Cheapest Flights Within K Stops",difficulty:"Medium",url:"https://leetcode.com/problems/cheapest-flights-within-k-stops/"}]},{id:"1d-dp",title:"1-D Dynamic Programming",blurb:'Break a problem into overlapping subproblems and memoize. "If I knew the answer for n-1, could I get the answer for n?" Climbing stairs, coin change, LIS.',color:"#F5B842",lessonId:"1d-dp",problems:[{id:"climbing-stairs",title:"Climbing Stairs",difficulty:"Easy",url:"https://leetcode.com/problems/climbing-stairs/"},{id:"min-cost-climbing-stairs",title:"Min Cost Climbing Stairs",difficulty:"Easy",url:"https://leetcode.com/problems/min-cost-climbing-stairs/"},{id:"house-robber",title:"House Robber",difficulty:"Medium",url:"https://leetcode.com/problems/house-robber/"},{id:"house-robber-ii",title:"House Robber II",difficulty:"Medium",url:"https://leetcode.com/problems/house-robber-ii/"},{id:"longest-palindromic-substr",title:"Longest Palindromic Substring",difficulty:"Medium",url:"https://leetcode.com/problems/longest-palindromic-substring/"},{id:"palindromic-substrings",title:"Palindromic Substrings",difficulty:"Medium",url:"https://leetcode.com/problems/palindromic-substrings/"},{id:"decode-ways",title:"Decode Ways",difficulty:"Medium",url:"https://leetcode.com/problems/decode-ways/"},{id:"coin-change",title:"Coin Change",difficulty:"Medium",url:"https://leetcode.com/problems/coin-change/"},{id:"max-product-subarray",title:"Maximum Product Subarray",difficulty:"Medium",url:"https://leetcode.com/problems/maximum-product-subarray/"},{id:"word-break",title:"Word Break",difficulty:"Medium",url:"https://leetcode.com/problems/word-break/"},{id:"longest-increasing-subseq",title:"Longest Increasing Subsequence",difficulty:"Medium",url:"https://leetcode.com/problems/longest-increasing-subsequence/"},{id:"partition-equal-subset-sum",title:"Partition Equal Subset Sum",difficulty:"Medium",url:"https://leetcode.com/problems/partition-equal-subset-sum/"}]},{id:"2d-dp",title:"2-D Dynamic Programming",blurb:'DP where state has two dimensions. Grid problems, two-string problems (LCS, edit distance). The "two pointers but DP" pattern.',color:"#E07856",lessonId:"2d-dp",problems:[{id:"unique-paths",title:"Unique Paths",difficulty:"Medium",url:"https://leetcode.com/problems/unique-paths/"},{id:"longest-common-subseq",title:"Longest Common Subsequence",difficulty:"Medium",url:"https://leetcode.com/problems/longest-common-subsequence/"},{id:"best-time-buy-sell-cooldown",title:"Best Time Buy Sell with Cooldown",difficulty:"Medium",url:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/"},{id:"coin-change-ii",title:"Coin Change II",difficulty:"Medium",url:"https://leetcode.com/problems/coin-change-ii/"},{id:"target-sum",title:"Target Sum",difficulty:"Medium",url:"https://leetcode.com/problems/target-sum/"},{id:"interleaving-string",title:"Interleaving String",difficulty:"Medium",url:"https://leetcode.com/problems/interleaving-string/"},{id:"longest-increasing-path",title:"Longest Increasing Path in Matrix",difficulty:"Hard",url:"https://leetcode.com/problems/longest-increasing-path-in-a-matrix/"},{id:"distinct-subsequences",title:"Distinct Subsequences",difficulty:"Hard",url:"https://leetcode.com/problems/distinct-subsequences/"},{id:"edit-distance",title:"Edit Distance",difficulty:"Hard",url:"https://leetcode.com/problems/edit-distance/"},{id:"burst-balloons",title:"Burst Balloons",difficulty:"Hard",url:"https://leetcode.com/problems/burst-balloons/"},{id:"regex-matching",title:"Regular Expression Matching",difficulty:"Hard",url:"https://leetcode.com/problems/regular-expression-matching/"}]},{id:"greedy",title:"Greedy",blurb:"Make the locally optimal choice at each step. Sometimes that gets you the global optimum. Proving WHY it does is the hard part.",color:"#8FA876",lessonId:"greedy",problems:[{id:"max-subarray",title:"Maximum Subarray (Kadane)",difficulty:"Medium",url:"https://leetcode.com/problems/maximum-subarray/"},{id:"jump-game",title:"Jump Game",difficulty:"Medium",url:"https://leetcode.com/problems/jump-game/"},{id:"jump-game-ii",title:"Jump Game II",difficulty:"Medium",url:"https://leetcode.com/problems/jump-game-ii/"},{id:"gas-station",title:"Gas Station",difficulty:"Medium",url:"https://leetcode.com/problems/gas-station/"},{id:"hand-of-straights",title:"Hand of Straights",difficulty:"Medium",url:"https://leetcode.com/problems/hand-of-straights/"},{id:"merge-triplets",title:"Merge Triplets to Form Target",difficulty:"Medium",url:"https://leetcode.com/problems/merge-triplets-to-form-target-triplet/"},{id:"partition-labels",title:"Partition Labels",difficulty:"Medium",url:"https://leetcode.com/problems/partition-labels/"},{id:"valid-parenthesis-string",title:"Valid Parenthesis String",difficulty:"Medium",url:"https://leetcode.com/problems/valid-parenthesis-string/"}]},{id:"intervals",title:"Intervals",blurb:"Problems on ranges with start/end. Almost always sort first, then sweep. Meeting rooms, overlap detection, scheduling.",color:"#7B9FB5",lessonId:"intervals",problems:[{id:"insert-interval",title:"Insert Interval",difficulty:"Medium",url:"https://leetcode.com/problems/insert-interval/"},{id:"merge-intervals",title:"Merge Intervals",difficulty:"Medium",url:"https://leetcode.com/problems/merge-intervals/"},{id:"non-overlapping-intervals",title:"Non-overlapping Intervals",difficulty:"Medium",url:"https://leetcode.com/problems/non-overlapping-intervals/"},{id:"meeting-rooms",title:"Meeting Rooms",difficulty:"Easy",url:"https://leetcode.com/problems/meeting-rooms/"},{id:"meeting-rooms-ii",title:"Meeting Rooms II",difficulty:"Medium",url:"https://leetcode.com/problems/meeting-rooms-ii/"},{id:"min-interval-include-query",title:"Minimum Interval to Include Query",difficulty:"Hard",url:"https://leetcode.com/problems/minimum-interval-to-include-each-query/"}]},{id:"math-geometry",title:"Math & Geometry",blurb:`The "you either see the trick or you don't" category. Matrix manipulation, modular arithmetic, geometric reasoning.`,color:"#B888C0",lessonId:"math-geometry",problems:[{id:"rotate-image",title:"Rotate Image",difficulty:"Medium",url:"https://leetcode.com/problems/rotate-image/"},{id:"spiral-matrix",title:"Spiral Matrix",difficulty:"Medium",url:"https://leetcode.com/problems/spiral-matrix/"},{id:"set-matrix-zeroes",title:"Set Matrix Zeroes",difficulty:"Medium",url:"https://leetcode.com/problems/set-matrix-zeroes/"},{id:"happy-number",title:"Happy Number",difficulty:"Easy",url:"https://leetcode.com/problems/happy-number/"},{id:"plus-one",title:"Plus One",difficulty:"Easy",url:"https://leetcode.com/problems/plus-one/"},{id:"pow-x-n",title:"Pow(x, n)",difficulty:"Medium",url:"https://leetcode.com/problems/powx-n/"},{id:"multiply-strings",title:"Multiply Strings",difficulty:"Medium",url:"https://leetcode.com/problems/multiply-strings/"},{id:"detect-squares",title:"Detect Squares",difficulty:"Medium",url:"https://leetcode.com/problems/detect-squares/"}]},{id:"bit-manipulation",title:"Bit Manipulation",blurb:"XOR tricks, bit shifting, counting set bits. Niche but unmistakable when you need it. Often the difference between O(n) and O(1).",color:"#F5B842",lessonId:"bit-manipulation",problems:[{id:"single-number",title:"Single Number",difficulty:"Easy",url:"https://leetcode.com/problems/single-number/"},{id:"number-of-1-bits",title:"Number of 1 Bits",difficulty:"Easy",url:"https://leetcode.com/problems/number-of-1-bits/"},{id:"counting-bits",title:"Counting Bits",difficulty:"Easy",url:"https://leetcode.com/problems/counting-bits/"},{id:"reverse-bits",title:"Reverse Bits",difficulty:"Easy",url:"https://leetcode.com/problems/reverse-bits/"},{id:"missing-number",title:"Missing Number",difficulty:"Easy",url:"https://leetcode.com/problems/missing-number/"},{id:"sum-two-integers",title:"Sum of Two Integers",difficulty:"Medium",url:"https://leetcode.com/problems/sum-of-two-integers/"},{id:"reverse-integer",title:"Reverse Integer",difficulty:"Medium",url:"https://leetcode.com/problems/reverse-integer/"}]}],T=e=>String(e||"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Z=e=>e.toLocaleDateString("en-US",{month:"short",day:"numeric"}),$e=["M","T","W","T","F","S","S"];function Te(){const e=s.selectedWeek,t=Y[e-1],a=be(e),i=e===j(),o=ae(),n=_[t.phase],c=Array.from({length:7},(m,g)=>{const w=new Date(a);w.setDate(a.getDate()+g);const b=i&&g===o,u=f(`w${e}_d${g}_a`),h=f(`w${e}_d${g}_b`);return`
      <div class="day-col ${b?"today":""}">
        <div class="day-label">${$e[g]}</div>
        <div class="day-date">${w.getDate()}</div>
        <button class="day-check ${u?"done-a":""}" data-action="toggle-block" data-week="${e}" data-day="${g}" data-kind="a">${u?"●":"A"}</button>
        <button class="day-check ${h?"done-b":""}" data-action="toggle-block" data-week="${e}" data-day="${g}" data-kind="b">${h?"●":"B"}</button>
      </div>
    `}).join(""),l=f(`w${e}_project`),r=f(`w${e}_sd`),d=f(`w${e}_dsa`);return`
    <div class="view stagger">
      <div class="week-nav">
        ${e>1?`<button class="btn btn-ghost" data-action="select-week" data-week="${e-1}">← W${e-1}</button>`:"<span></span>"}
        ${e<20?`<button class="btn btn-ghost" data-action="select-week" data-week="${e+1}">W${e+1} →</button>`:"<span></span>"}
      </div>

      <div class="week-header">
        <span class="chip chip-track-${n.code}" style="margin-bottom: 12px;">${t.phase}</span>
        <div class="week-meta">
          WEEK ${String(e).padStart(2,"0")} · ${Z(a)} – ${Z(new Date(a.getTime()+6*864e5))}
          ${i?'<span class="chip chip-solid">NOW</span>':""}
        </div>
        <h1 class="week-title">${T(t.title)}</h1>
      </div>

      <div class="card" style="margin-bottom: 12px;">
        <div class="kicker" style="color: var(--accent-amber); margin-bottom: 8px;">Block A · Build · 45 min</div>
        <div class="body" style="color: var(--text-primary);">${T(t.blockA.task)}</div>
      </div>

      <div class="card" style="margin-bottom: 12px;">
        <div class="kicker" style="color: var(--track-upenn); margin-bottom: 8px;">Block B · Understand · 30 min</div>
        <div class="body" style="color: var(--text-primary);">${T(t.blockB.task)}</div>
      </div>

      <div class="day-grid">${c}</div>

      <div class="card tappable ${l?"done":""}" data-action="toggle-project" data-week="${e}" style="margin-bottom: 12px;">
        <div class="kicker" style="margin-bottom: 8px;">Week Project</div>
        <div class="row gap-3">
          <span class="check-circle ${l?"done":""}">${l?"✓":""}</span>
          <span class="body">${T(t.project)}</span>
        </div>
      </div>

      <div class="track-card sd ${r?"done":""} tappable" data-action="open-sd" data-id="${t.sd.topicId}" style="margin-bottom: 12px;">
        <div class="row between" style="margin-bottom: 8px;">
          <span class="chip chip-track-sd">◇ System Design</span>
          <button class="check-circle ${r?"done":""}" data-action="toggle-sd" data-week="${e}" onclick="event.stopPropagation();">${r?"✓":""}</button>
        </div>
        <div class="h4">${T(t.sd.topic)}</div>
        <div class="caption" style="margin-top: 4px;">${T(t.sd.source)} · Tap to open lesson →</div>
      </div>

      <div class="track-card dsa ${d?"done":""} tappable" data-action="open-dsa" data-id="${t.dsa.patternId}">
        <div class="row between" style="margin-bottom: 8px;">
          <span class="chip chip-track-dsa">⌘ DSA Pattern</span>
          <button class="check-circle ${d?"done":""}" data-action="toggle-dsa" data-week="${e}" onclick="event.stopPropagation();">${d?"✓":""}</button>
        </div>
        <div class="h4">${T(t.dsa.topic)}</div>
        <div class="caption" style="margin-top: 4px;">NeetCode 150 · Tap to open pattern →</div>
      </div>
    </div>
  `}function De(){const e=re(),t=j(),a=Y.map(i=>{const o=ue[i.num],n=Array.from({length:7}).reduce((w,b,u)=>w+(f(`w${i.num}_d${u}_a`)?1:0)+(f(`w${i.num}_d${u}_b`)?1:0),0),c=Math.round(n/14*100),l=i.num===t?"current":i.num<t?"past":"",r=f(`w${i.num}_project`),d=f(`w${i.num}_sd`),m=f(`w${i.num}_dsa`),g=`
      <span class="timeline-badge" style="background:${r?"#8FA876":"var(--border-subtle)"}"></span>
      <span class="timeline-badge" style="background:${d?"#7B9FB5":"var(--border-subtle)"}"></span>
      <span class="timeline-badge" style="background:${m?"#B888C0":"var(--border-subtle)"}"></span>
    `;return`
      ${o?`<div class="milestone"><span class="milestone-label">◆ ${o.label}</span><span class="milestone-desc">${o.desc}</span></div>`:""}
      <button class="timeline-row ${l}" data-action="select-week" data-week="${i.num}">
        <span class="timeline-dot" style="background: ${_[i.phase].color}"></span>
        <span class="timeline-num">W${String(i.num).padStart(2,"0")}</span>
        <span class="timeline-title">${T(i.title)}</span>
        <span class="timeline-meta">${g} ${c>0?c+"%":"·"}</span>
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
      ${a}

      <div class="row between" style="margin-top: 32px;">
        <button class="btn" data-action="export">export backup</button>
        <button class="btn" data-action="reset">reset all</button>
      </div>
    </div>
  `}function Ie(){const e=K.reduce((o,n)=>o+n.problems.length,0);let t=0;K.forEach(o=>o.problems.forEach(n=>{f(`dsa_${n.id}`)&&t++}));const a=Math.round(t/e*100),i=K.map(o=>{const n=o.problems.filter(l=>f(`dsa_${l.id}`)).length,c=o.problems.map(l=>{const r=f(`dsa_${l.id}`),d=`chip-diff-${l.difficulty.toLowerCase()}`;return`
        <div class="problem-row ${r?"done":""}">
          <button class="problem-check ${r?"done":""}" data-action="toggle-problem" data-id="${l.id}">
            ${r?'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>':""}
          </button>
          <span class="problem-title">${T(l.title)}</span>
          <span class="chip ${d}">${l.difficulty}</span>
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
            ${T(o.title)} →
          </button>
          <span class="pattern-count">${n}/${o.problems.length}</span>
        </div>
        <div class="body-sm" style="margin-bottom: 12px;">${T(o.blurb)}</div>
        ${c}
      </div>
    `}).join("");return`
    <div class="view stagger">
      <h1 class="h1" style="margin-bottom: 4px;">NeetCode 150<span style="color: var(--accent-amber);">.</span></h1>
      <div class="caption" style="margin-bottom: 16px;">Pattern-organized roadmap · ${t} of ${e} done · ${a}%</div>
      <div class="progress-track" style="margin-bottom: 32px;"><div class="progress-fill" style="width:${a}%"></div></div>
      ${i}
    </div>
  `}function Ce(){const e=[{id:"networking-fundamentals",title:"Networking Fundamentals",section:"Fundamentals",wn:1},{id:"dns-cdn",title:"DNS & CDNs",section:"Fundamentals",wn:2},{id:"load-balancers",title:"Load Balancers",section:"Fundamentals",wn:3},{id:"databases-i",title:"Databases I — SQL vs NoSQL",section:"Fundamentals",wn:4},{id:"caching",title:"Caching",section:"Fundamentals",wn:5},{id:"message-queues",title:"Message Queues",section:"Fundamentals",wn:6},{id:"databases-ii",title:"Databases II — Sharding",section:"Fundamentals",wn:7},{id:"cap-theorem",title:"CAP Theorem",section:"Fundamentals",wn:8},{id:"url-shortener",title:"Design URL Shortener",section:"Classic Problems",wn:9},{id:"pastebin",title:"Design Pastebin",section:"Classic Problems",wn:10},{id:"twitter",title:"Design Twitter",section:"Classic Problems",wn:11},{id:"youtube",title:"Design YouTube",section:"Classic Problems",wn:12},{id:"uber",title:"Design Uber",section:"Classic Problems",wn:13},{id:"whatsapp",title:"Design WhatsApp",section:"Advanced",wn:14},{id:"dropbox",title:"Design Dropbox",section:"Advanced",wn:15},{id:"web-crawler",title:"Design Web Crawler",section:"Advanced",wn:16},{id:"news-feed",title:"Design News Feed",section:"Advanced",wn:17},{id:"recommendation",title:"ML SD — Recommendation",section:"ML Systems",wn:18},{id:"search-ranking",title:"ML SD — Search Ranking",section:"ML Systems",wn:19},{id:"mock-week",title:"Mock Interview Week",section:"Practice",wn:20}],t={};e.forEach(o=>{t[o.section]||(t[o.section]=[]),t[o.section].push(o)});const a=Object.entries(t).map(([o,n])=>`
    <div class="pattern-section">
      <div class="pattern-header">
        <div class="pattern-title">${T(o)}</div>
        <span class="pattern-count">${n.length}</span>
      </div>
      ${n.map(c=>{const l=f(`w${c.wn}_sd`);return`
          <button class="problem-row" data-action="open-sd-lesson" data-id="${c.id}" style="border: none; background: none; width: 100%; text-align: left; cursor: pointer;">
            <span class="problem-check ${l?"done":""}">
              ${l?'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>':""}
            </span>
            <span class="problem-title">${T(c.title)}</span>
            <span class="chip">W${c.wn}</span>
            <span class="problem-link">→</span>
          </button>
        `}).join("")}
    </div>
  `).join("");return`
    <div class="view stagger">
      <h1 class="h1" style="margin-bottom: 4px;">System Design<span style="color: var(--accent-amber);">.</span></h1>
      <div class="caption" style="margin-bottom: 32px;">Grokking-style deep lessons · ${e.filter(o=>f(`w${o.wn}_sd`)).length} of ${e.length} done</div>
      ${a}
    </div>
  `}const p={bg:"#13110E",card:"#17140F",border:"#3A352D",text:"#F4EFE3",textDim:"#8E8773",amber:"#F5B842",sage:"#8FA876",blue:"#7B9FB5"};let Le=0;const O=()=>`viz${++Le}`;function H({nodes:e,edges:t,caption:a,height:i=240}){const o=O(),n={};e.forEach(r=>{n[r.id]=r});const c=e.map(r=>{const d=r.color||p.amber;return`
      <g transform="translate(${r.x},${r.y})" class="arch-node">
        <rect x="-${r.w/2}" y="-${r.h/2}" width="${r.w}" height="${r.h}" rx="6"
              fill="${p.card}" stroke="${d}" stroke-width="1.5"/>
        <text x="0" y="-2" text-anchor="middle" fill="${p.text}"
              font-family="Inter Tight, sans-serif" font-size="12" font-weight="600">${r.label}</text>
        ${r.sub?`<text x="0" y="14" text-anchor="middle" fill="${p.textDim}"
              font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="0.05em">${r.sub}</text>`:""}
      </g>
    `}).join(""),l=t.map((r,d)=>{const m=n[r.from],g=n[r.to];if(!m||!g)return"";const w=m.x+(r.fromOffset?.x||0),b=m.y+(r.fromOffset?.y||0),u=g.x+(r.toOffset?.x||0),h=g.y+(r.toOffset?.y||0),D=r.color||p.amber;return`
      <g class="arch-edge" style="--delay: ${d*.3}s">
        <line x1="${w}" y1="${b}" x2="${u}" y2="${h}"
              stroke="${D}" stroke-width="1.2" stroke-opacity="0.4"/>
        <line x1="${w}" y1="${b}" x2="${u}" y2="${h}"
              stroke="${D}" stroke-width="2" stroke-dasharray="6 6"
              class="arch-edge-flow"/>
        ${r.label?`<text x="${(w+u)/2}" y="${(b+h)/2-6}" text-anchor="middle"
              fill="${p.textDim}" font-family="JetBrains Mono, monospace" font-size="9">${r.label}</text>`:""}
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
        ${c}
      </svg>
      ${a?`<div class="lesson-viz-caption">${a}</div>`:""}
      <style>
        #${o} .arch-node { animation: fade-up 0.5s var(--ease-out) backwards; }
        #${o} .arch-node:nth-child(${e.length+1}) { animation-delay: 0.1s; }
        #${o} .arch-edge { animation: fade-in 0.6s var(--ease-out) backwards; animation-delay: var(--delay, 0s); }
        #${o} .arch-edge-flow { animation: flow-dash 1.2s linear infinite; }
      </style>
    </div>
  `}function Me({actors:e,messages:t,caption:a,height:i=280}){const o=O(),c=460/e.length,l=30,r=30,d=70,m=36,g=e.map((b,u)=>{const h=l+u*c+c/2;return`
      <g class="seq-actor">
        <rect x="${h-50}" y="${r-14}" width="100" height="28" rx="4"
              fill="${p.card}" stroke="${p.amber}" stroke-width="1.2"/>
        <text x="${h}" y="${r+4}" text-anchor="middle" fill="${p.text}"
              font-family="Inter Tight, sans-serif" font-size="12" font-weight="600">${b}</text>
        <line x1="${h}" y1="${r+16}" x2="${h}" y2="${i-10}"
              stroke="${p.border}" stroke-width="1" stroke-dasharray="2 4"/>
      </g>
    `}).join(""),w=t.map((b,u)=>{const h=d+u*m,D=l+b.from*c+c/2,A=l+b.to*c+c/2,B=b.color||p.amber,W=b.return;return`
      <g class="seq-msg" style="--delay: ${u*.4}s">
        <line x1="${D}" y1="${h}" x2="${A}" y2="${h}"
              stroke="${B}" stroke-width="1.5" marker-end="url(#${o}-arrow)"
              ${W?'stroke-dasharray="4 4"':""}/>
        <text x="${(D+A)/2}" y="${h-6}" text-anchor="middle"
              fill="${p.text}" font-family="JetBrains Mono, monospace" font-size="10"
              font-weight="500">${b.label}</text>
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
        ${w}
      </svg>
      ${`<div class="lesson-viz-caption">${a}</div>`}
      <style>
        #${o} .seq-actor { animation: fade-down 0.4s var(--ease-out) backwards; }
        #${o} .seq-msg { animation: fade-in 0.5s var(--ease-out) backwards; animation-delay: var(--delay); }
        #${o} .seq-msg line { stroke-dasharray: 0; animation: seq-draw 0.6s var(--ease-out) backwards; animation-delay: var(--delay); }
        @keyframes seq-draw { from { stroke-dashoffset: 100; stroke-dasharray: 100; } to { stroke-dashoffset: 0; } }
      </style>
    </div>
  `}function I({values:e,pointers:t=[],window:a,highlight:i=[],caption:o,label:n}){const c=O(),l=44,r=44,d=(480-e.length*l)/2,m=60,g=e.map((b,u)=>{const h=d+u*l,D=a&&u>=a[0]&&u<=a[1],A=i.includes(u);let B=p.card,W=p.border;return A?(B=p.amber,W=p.amber):D&&(B="rgba(245, 184, 66, 0.15)",W=p.amber),`
      <g class="arr-cell" style="--i: ${u}">
        <rect x="${h}" y="${m}" width="${l-2}" height="${r}" rx="4"
              fill="${B}" stroke="${W}" stroke-width="1.5"/>
        <text x="${h+l/2-1}" y="${m+r/2+5}" text-anchor="middle"
              fill="${A?p.bg:p.text}" font-family="JetBrains Mono, monospace"
              font-size="14" font-weight="600">${b}</text>
        <text x="${h+l/2-1}" y="${m+r+16}" text-anchor="middle"
              fill="${p.textDim}" font-family="JetBrains Mono, monospace" font-size="9">${u}</text>
      </g>
    `}).join(""),w=t.map((b,u)=>{const h=d+b.at*l+l/2-1,D=b.color||(u===0?p.amber:p.blue);return`
      <g class="arr-pointer" style="--delay: ${u*.2}s">
        <path d="M ${h-6} ${m-10} L ${h+6} ${m-10} L ${h} ${m-2} z"
              fill="${D}"/>
        <text x="${h}" y="${m-16}" text-anchor="middle" fill="${D}"
              font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">${b.label}</text>
      </g>
    `}).join("");return`
    <div class="lesson-viz">
      <svg viewBox="0 0 480 ${m+r+40}" width="100%" id="${c}">
        ${n?`<text x="240" y="20" text-anchor="middle" fill="${p.textDim}"
              font-family="JetBrains Mono, monospace" font-size="11"
              letter-spacing="0.1em" text-transform="uppercase">${n}</text>`:""}
        ${g}
        ${w}
      </svg>
      ${o?`<div class="lesson-viz-caption">${o}</div>`:""}
      <style>
        #${c} .arr-cell { animation: fade-up 0.4s var(--ease-out) backwards;
                          animation-delay: calc(var(--i) * 0.04s); }
        #${c} .arr-pointer { animation: fade-down 0.5s var(--ease-out) backwards;
                              animation-delay: calc(0.5s + var(--delay)); }
      </style>
    </div>
  `}function z({nodes:e,highlight:t=[],visited:a=[],caption:i}){const o=O(),n={};e.forEach(d=>{n[d.id]=d});const c=e.filter(d=>d.parent!=null).map(d=>{const m=n[d.parent];return`<line x1="${m.x}" y1="${m.y}" x2="${d.x}" y2="${d.y}"
                  stroke="${p.border}" stroke-width="1.5"/>`}).join(""),l=e.map((d,m)=>{const g=t.includes(d.id),w=a.includes(d.id);let b=p.card,u=p.border,h=p.text;return g?(b=p.amber,u=p.amber,h=p.bg):w&&(b="rgba(143, 168, 118, 0.2)",u=p.sage,h=p.sage),`
      <g class="tree-node" style="--i: ${m}">
        <circle cx="${d.x}" cy="${d.y}" r="18" fill="${b}" stroke="${u}" stroke-width="1.5"/>
        <text x="${d.x}" y="${d.y+5}" text-anchor="middle" fill="${h}"
              font-family="JetBrains Mono, monospace" font-size="13" font-weight="600">${d.value}</text>
      </g>
    `}).join("");return`
    <div class="lesson-viz">
      <svg viewBox="0 0 480 ${Math.max(...e.map(d=>d.y))+40}" width="100%" id="${o}">
        ${c}
        ${l}
      </svg>
      ${i?`<div class="lesson-viz-caption">${i}</div>`:""}
      <style>
        #${o} line { animation: fade-in 0.4s var(--ease-out) backwards; animation-delay: 0.1s; }
        #${o} .tree-node { animation: scale-in 0.4s var(--ease-out) backwards;
                            animation-delay: calc(var(--i) * 0.06s); transform-origin: center; transform-box: fill-box; }
      </style>
    </div>
  `}function C({headers:e,rows:t,caption:a}){const i=e.map((n,c)=>{const l=c===0?"":`chip chip-track-${["devops","sd","mlops","dsa"][c-1]||"devops"}`;return`<th>${c===0?n:`<span class="${l}">${n}</span>`}</th>`}).join(""),o=t.map(n=>`
    <tr>${n.map((c,l)=>`<td>${c}</td>`).join("")}</tr>
  `).join("");return`
    <table class="lesson-table">
      <thead><tr>${i}</tr></thead>
      <tbody>${o}</tbody>
    </table>
    ${a?`<div class="lesson-viz-caption" style="margin-top:8px;">${a}</div>`:""}
  `}function k(e,t="info"){return`<div class="callout callout-${t}">${e}</div>`}function P(e,t){const a=O();return`
    <div class="lesson-quiz">
      <div class="lesson-quiz-label">◇ Self-check</div>
      <div class="lesson-quiz-q">${e}</div>
      <button class="lesson-quiz-reveal" onclick="document.getElementById('${a}').classList.toggle('open'); this.style.display='none';">
        Reveal answer →
      </button>
      <div class="lesson-quiz-a" id="${a}">${t}</div>
    </div>
  `}const Pe={"networking-fundamentals":{title:"Networking Fundamentals",subtitle:"How bytes actually get from your laptop to a server in Virginia",duration:"25 min read",difficulty:"Foundational",sections:[{title:"The Layered Model",body:()=>`
          <p>Every system you build sends bytes over a network, and most system design questions touch the OSI model whether they explicitly mention it or not. The mental model that matters:</p>
          <p><strong>Data gets wrapped in layers on send. Each layer adds a header. Each layer unwraps on receive.</strong></p>
          <p>You don't need to memorize all 7 OSI layers. You need to know the four that show up in real systems: <code>HTTP</code> (application), <code>TLS</code> (encryption), <code>TCP</code> (transport), <code>IP</code> (network).</p>
          ${H({height:220,nodes:[{id:"app",x:70,y:100,w:100,h:40,label:"HTTP",sub:"application"},{id:"tls",x:200,y:100,w:100,h:40,label:"TLS",sub:"encryption"},{id:"tcp",x:330,y:100,w:100,h:40,label:"TCP",sub:"transport",color:"#7B9FB5"},{id:"ip",x:70,y:180,w:100,h:40,label:"IP",sub:"network",color:"#8FA876"},{id:"eth",x:200,y:180,w:100,h:40,label:"Ethernet",sub:"link",color:"#B888C0"}],edges:[{from:"app",to:"tls",label:"wraps"},{from:"tls",to:"tcp",label:"wraps"},{from:"tcp",to:"ip",label:"wraps"},{from:"ip",to:"eth",label:"wraps"}],caption:"Send path: each layer wraps the payload in its own header"})}
          ${k('When debugging, ask: "which layer is broken?" L7 (HTTP) issues look very different from L4 (TCP) issues. Your nginx is L7. Your firewall rules are L3/L4.',"insight")}
        `},{title:"TCP vs UDP",body:()=>`
          <p>Two protocols at the transport layer. Pick one based on what failure mode you can tolerate.</p>
          ${C({headers:["Trait","TCP","UDP"],rows:[["Connection","Yes — 3-way handshake first","No — just send"],["Ordered delivery","Guaranteed","No guarantee"],["Retransmission","Automatic on loss","Your problem"],["Overhead per packet","~40 bytes header + state","~8 bytes header"],["Use cases","HTTP, SSH, email, anything you need correct","Video calls, DNS, game state, streaming"]]})}
          <p>The mental model: <strong>TCP is certified mail. UDP is a postcard.</strong> TCP is slow because it guarantees delivery. UDP is fast because it doesn't care if your packet got dropped.</p>
        `},{title:"The 3-Way Handshake",body:()=>`
          <p>Before TCP can send data, both sides must agree they're talking to each other. This takes three messages.</p>
          ${Me({actors:["Client","Server"],messages:[{from:0,to:1,label:"SYN (seq=x)"},{from:1,to:0,label:"SYN-ACK (seq=y, ack=x+1)"},{from:0,to:1,label:"ACK (ack=y+1)"},{from:0,to:1,label:"── data flows ──"}],caption:"TCP 3-way handshake — one round-trip before any data moves"})}
          <p>Why three messages, not two? Because each side needs to confirm the other side can both <strong>send</strong> and <strong>receive</strong>. The first SYN proves the client can send. The SYN-ACK proves the server can receive AND send. The final ACK proves the client can receive. Now both sides trust the connection.</p>
          ${k("This is why opening a TCP connection has latency cost. HTTP/2 multiplexes many requests over one TCP connection precisely to avoid this handshake repeatedly. HTTP/3 (over QUIC/UDP) avoids it entirely.","info")}
          ${P("If your service has 1,000 RPS and you make a new TCP connection per request to a database 50ms away, what's your wasted latency budget per second?","50ms × 1,000 = 50 seconds of latency. That's why connection pooling matters: reuse the handshake.")}
        `},{title:"HTTP Versions",body:()=>`
          <p>HTTP has evolved to fight the latency problem.</p>
          ${C({headers:["Version","Transport","Big improvement"],rows:[["HTTP/1.1","TCP","Keep-alive — reuse one connection for multiple requests"],["HTTP/2","TCP + binary","Multiplexing — many requests in flight on one connection"],["HTTP/3","QUIC over UDP","No 3-way handshake on reconnect; head-of-line blocking gone"]]})}
          ${k(`Interview tip: "HTTP/3 uses UDP" sounds wrong but is correct. QUIC implements TCP-like reliability on top of UDP because TCP's in-kernel implementation is slow to evolve.`,"info")}
        `}],keyTerms:["OSI layers","TCP vs UDP","3-way handshake","HTTP/1.1 vs /2 vs /3","keep-alive","multiplexing","connection pooling"],sources:["NeetCode SD Course — Networking Essentials","Grokking SD Fundamentals — Network Protocols",'Ilya Grigorik, "High Performance Browser Networking" (free online)']},"load-balancers":{title:"Load Balancers",subtitle:"The traffic cop between users and your servers",duration:"20 min read",difficulty:"Foundational",sections:[{title:"What Problem They Solve",body:()=>`
          <p>One server can handle ~10,000 concurrent connections before it crawls. Your app has 1,000,000 users. The math says you need many servers. Now the question becomes: <strong>which server handles this user's request?</strong></p>
          <p>That's the load balancer's job. It sits between the public internet and your fleet of backend servers, and it routes each incoming request to one of them.</p>
          ${H({height:220,nodes:[{id:"u1",x:50,y:60,w:70,h:30,label:"User",sub:"A"},{id:"u2",x:50,y:110,w:70,h:30,label:"User",sub:"B"},{id:"u3",x:50,y:160,w:70,h:30,label:"User",sub:"C"},{id:"lb",x:230,y:110,w:100,h:50,label:"Load Balancer",sub:"nginx / HAProxy"},{id:"b1",x:410,y:60,w:60,h:30,label:"app-1"},{id:"b2",x:410,y:110,w:60,h:30,label:"app-2"},{id:"b3",x:410,y:160,w:60,h:30,label:"app-3"}],edges:[{from:"u1",to:"lb",color:"#F5B842"},{from:"u2",to:"lb",color:"#F5B842"},{from:"u3",to:"lb",color:"#F5B842"},{from:"lb",to:"b1",color:"#7B9FB5"},{from:"lb",to:"b2",color:"#7B9FB5"},{from:"lb",to:"b3",color:"#7B9FB5"}],caption:"Users hit one address; the LB distributes work to many backends"})}
          <p>This buys you two things: <strong>horizontal scale</strong> (add backends to handle more load) and <strong>failure tolerance</strong> (one backend dies, LB routes around it).</p>
        `},{title:"L4 vs L7",body:()=>`
          <p>Load balancers operate at one of two OSI layers, and the choice matters.</p>
          ${C({headers:["Trait","L4 (Transport)","L7 (Application)"],rows:[["Sees","TCP/UDP connections, IPs, ports","HTTP request — URL, headers, cookies, body"],["Routing decisions","Based on connection only","Can route by path (/api → A, /static → B)"],["Speed","Very fast, low CPU","Slower — must parse HTTP"],["SSL termination","Pass-through (or none)","Common termination point"],["Examples","AWS NLB, HAProxy in TCP mode","nginx, AWS ALB, Cloudflare"]]})}
          ${k("Modern systems use both: L4 in front for raw throughput, L7 behind for app-aware routing. Your nginx reverse proxy is an L7 LB.","insight")}
        `},{title:"Routing Algorithms",body:()=>`
          <p>The LB has multiple servers to choose from. Which one gets the request? Four common strategies:</p>
          <p><strong>Round Robin.</strong> Cycle through servers in order. Simple, predictable. Bad when requests have variable cost (one heavy request can pile up).</p>
          <p><strong>Least Connections.</strong> Pick whichever server has the fewest active connections right now. Self-balancing for variable request sizes. Slightly more state to track.</p>
          <p><strong>IP Hash.</strong> Hash the client's IP and route to one specific server. Same user always lands on the same server — useful for session affinity (sticky sessions).</p>
          <p><strong>Weighted variants.</strong> All of the above, but you can give one server a higher weight (e.g., your new beefier box gets 3x traffic).</p>
          ${P("You're running a video chat service. Each connection is a long-lived WebSocket. Which algorithm makes sense — round robin, least connections, or IP hash?","Least connections. Round robin would dump all new users onto the same server while existing ones still hold connections. IP hash forces session affinity which you don't need here.")}
        `},{title:"Health Checks",body:()=>`
          <p>An LB is only as good as its knowledge of which backends are alive. Two kinds of health checks:</p>
          <p><strong>Active health checks.</strong> The LB sends a probe request (e.g., GET /healthz) on a schedule. If it fails N times in a row, the backend is marked unhealthy and pulled from rotation.</p>
          <p><strong>Passive health checks.</strong> The LB watches real production traffic. If too many requests to backend X are timing out or returning 5xx, X gets pulled.</p>
          ${k("In production you want both. Active catches problems before users see them; passive catches problems your healthz endpoint missed.","info")}
          ${k(`"Connection draining" is what happens during a deploy: the LB stops sending new requests to a backend but lets existing requests finish before it's killed. Without this, deploys cause 500s.`,"info")}
        `},{title:"Global Load Balancing",body:()=>`
          <p>At very large scale you also need a <strong>GSLB</strong> (Global Server Load Balancer) — a layer above your regional LBs that picks which datacenter the user hits, usually based on geography and latency. DNS-based GSLB returns different IPs based on the user's location. Anycast-based GSLB advertises the same IP from multiple datacenters and routes via BGP.</p>
          <p>This is what Cloudflare, AWS Route 53, and similar do.</p>
        `}],keyTerms:["L4 vs L7","Round robin","Least connections","IP hash","Sticky sessions","Health checks","GSLB","Connection draining"],sources:["NeetCode SD Course — Load Balancing","Grokking SD Fundamentals — Load Balancer","HAProxy and nginx documentation"]},"url-shortener":{title:"Design URL Shortener",subtitle:"The gateway interview problem",duration:"30 min read",difficulty:"Intermediate",sections:[{title:"Requirements",body:()=>`
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
        `},{title:"Capacity Estimation",body:()=>`
          <p>Back-of-envelope math sets the design constraints. Interviewer expects you to do this aloud.</p>
          <p><strong>Writes:</strong> 100M new URLs per month = ~40/sec. Tiny.</p>
          <p><strong>Reads:</strong> 100:1 ratio = ~4,000/sec average. Spikes to 10,000+. Substantial.</p>
          <p><strong>Storage:</strong> 100M × 12 months × 5 years = 6 billion URLs. Each entry ~500 bytes (short, long, metadata) = ~3 TB. Manageable.</p>
          <p><strong>Bandwidth:</strong> Redirect responses are tiny (HTTP 302 with Location header), ~500 bytes. 4,000 RPS × 500 bytes = 2 MB/s. Trivial.</p>
          ${k("The dominant constraint is read latency and availability, not storage or compute. This means you'll cache aggressively.","insight")}
        `},{title:"System APIs",body:()=>`
          <p>Two endpoints, RESTful.</p>
          <pre style="background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px; font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); line-height: 1.6; overflow-x: auto;">POST /api/v1/urls
  body: { long_url, custom_slug?, expiry_days? }
  returns: { short_url, short_code, expires_at }

GET /:short_code
  returns: HTTP 302 with Location: long_url</pre>
          <p>The redirect endpoint is <strong>not</strong> versioned because users paste raw short URLs. The API endpoint is versioned because clients call it programmatically and you may want to evolve it.</p>
        `},{title:"Key Generation Strategy",body:()=>`
          <p>The interesting design question: <strong>how do you generate a unique short code?</strong> Two approaches:</p>
          <p><strong>Approach 1 — Hash the long URL.</strong> Take MD5(long_url), take first 7 chars. Pros: deterministic, no coordination. Cons: collisions (need to retry with offset), same URL maps to same code (bad if you want analytics per-creator).</p>
          <p><strong>Approach 2 — Counter + base62 encode.</strong> Maintain a global counter. Each new URL gets the next ID. Encode the ID in base62 (a-z, A-Z, 0-9) to make it short. Pros: no collisions, deterministic length, sortable. Cons: the counter needs coordination across servers.</p>
          ${k("Counter approach wins in practice. The coordination is solved with a Twitter Snowflake-style ID generator or by pre-allocating ranges to each server (each app server gets a block of 10,000 IDs and uses them).","insight")}
          <p><strong>How short is "short"?</strong> Base62 with 7 characters gives 62⁷ = 3.5 trillion combinations. That's enough for the heat death of the URL universe.</p>
        `},{title:"Data Model",body:()=>`
          <p>One table, designed for read-by-short-code.</p>
          ${C({headers:["Column","Type","Notes"],rows:[["short_code","VARCHAR(10) PK","Indexed (it IS the PK)"],["long_url","TEXT","~500 bytes typical, 2KB max"],["created_at","TIMESTAMP",""],["expires_at","TIMESTAMP NULL","NULL = never expires"],["user_id","UUID NULL","For analytics and custom slugs"],["click_count","BIGINT","Approximate — periodic batch update"]]})}
          <p>SQL or NoSQL? Either works. <strong>Postgres</strong> if you also want a users table with proper relations. <strong>DynamoDB / Cassandra</strong> if you want simpler horizontal scaling and don't care about joins.</p>
        `},{title:"High-Level Architecture",body:()=>`
          ${H({height:280,nodes:[{id:"usr",x:50,y:60,w:70,h:30,label:"User"},{id:"cdn",x:170,y:60,w:80,h:30,label:"CDN",sub:"Cloudflare"},{id:"lb",x:300,y:60,w:80,h:30,label:"LB",color:"#7B9FB5"},{id:"app",x:430,y:60,w:80,h:30,label:"App servers",color:"#7B9FB5"},{id:"cache",x:250,y:160,w:100,h:40,label:"Redis",sub:"hot URLs"},{id:"db",x:400,y:160,w:100,h:40,label:"Postgres",sub:"primary",color:"#8FA876"},{id:"replicas",x:400,y:230,w:100,h:30,label:"read replicas",color:"#8FA876"}],edges:[{from:"usr",to:"cdn"},{from:"cdn",to:"lb"},{from:"lb",to:"app"},{from:"app",to:"cache"},{from:"cache",to:"db"},{from:"db",to:"replicas"}],caption:"Request flow: CDN → LB → App → Cache → DB. The cache is where most lookups stop."})}
          <p><strong>The read path.</strong> 99% of requests are redirects. They flow CDN → LB → App → Redis cache. Cache hit returns long_url instantly. Cache miss falls through to Postgres read replica, then populates cache for next time.</p>
          <p><strong>The write path.</strong> POST /api/v1/urls hits App → Postgres primary → invalidate any related cache → return short URL.</p>
          ${k("Redirect responses can be cached at the CDN edge (cache-control header). Most redirects then never touch your servers. Massive cost savings.","insight")}
        `},{title:"Bottlenecks & Trade-offs",body:()=>`
          <p>Where this design breaks under load and what you do about it:</p>
          <p><strong>Hot URL problem.</strong> A celebrity tweets a short URL → millions of requests in seconds → cache and DB both melt. Mitigation: CDN-level caching with high TTL, multi-tier cache (browser → CDN → Redis → DB), rate limiting.</p>
          <p><strong>Counter coordination.</strong> Single global counter is a bottleneck. Mitigation: Snowflake ID, or assign each app server a range of IDs to give out.</p>
          <p><strong>Read replica lag.</strong> Newly created short URL might not be on a read replica yet, so the first redirect 404s. Mitigation: write-through cache (cache the new URL immediately on create), or read from primary for the first N seconds after creation.</p>
          <p><strong>Spam URLs.</strong> Attackers create millions of links to malware. Mitigation: per-IP rate limiting, captcha for unauthenticated creation, async URL safety scanning (Google Safe Browsing API).</p>
          ${P("Why use HTTP 302 redirect, not 301?",'301 is "permanently moved" — browsers cache it. If you cache the redirect, you can never count the click again, and you can never change where the short URL points. 302 is "temporary," so the browser asks again next time.')}
        `}],keyTerms:["Base62 encoding","Counter vs hash key generation","301 vs 302 redirect","Read-heavy systems","Multi-tier caching","Snowflake IDs"],sources:["Grokking SD Interview — Designing a URL Shortener","NeetCode TinyURL walkthrough","High Scalability blog on bit.ly architecture"]},caching:{title:"Caching",subtitle:"Trading memory for latency, the most powerful lever in systems",duration:"22 min read",difficulty:"Foundational",sections:[{title:"The Core Idea",body:()=>`
          <p>Cache = a fast copy of slow data, kept close to where it's used.</p>
          <p>The slowest things in computing are <strong>disk reads</strong> (10ms), <strong>cross-region network</strong> (100ms+), and <strong>database queries that hit disk</strong> (also 10-100ms). The fastest is <strong>memory</strong> (<1µs). Caching means putting frequently-accessed slow data into memory.</p>
          ${H({height:180,nodes:[{id:"app",x:70,y:90,w:80,h:40,label:"App",sub:"1ms"},{id:"cache",x:240,y:90,w:90,h:40,label:"Redis",sub:"~1ms"},{id:"db",x:410,y:90,w:80,h:40,label:"DB",sub:"~20ms",color:"#8FA876"}],edges:[{from:"app",to:"cache",label:"try cache first"},{from:"cache",to:"db",label:"miss → fetch"}],caption:"90% of reads stop at the cache. 10% fall through to the DB."})}
        `},{title:"Write Strategies",body:()=>`
          <p>What happens when data <strong>changes</strong>? You have three choices.</p>
          ${C({headers:["Strategy","How it works","Trade-off"],rows:[["Cache-aside","App writes to DB. Cache is updated lazily on next read.","Simple. Stale reads possible right after a write."],["Write-through","App writes to cache AND DB synchronously.","No stale reads. Slower writes."],["Write-behind","App writes to cache. Cache writes to DB async.","Very fast writes. Risk of data loss if cache dies."]]})}
          ${k("Default is cache-aside. Reach for write-through when correctness matters more than write speed. Reach for write-behind in extreme write-heavy scenarios (analytics, metrics).","insight")}
        `},{title:"Eviction Policies",body:()=>`
          <p>Memory is finite. When the cache fills up, you must drop something. The policy decides what.</p>
          <p><strong>LRU (Least Recently Used).</strong> Drop the entry that hasn't been accessed in the longest time. The default for most caches because it matches typical access patterns (recently used = likely to be used again).</p>
          <p><strong>LFU (Least Frequently Used).</strong> Drop the entry with the fewest hits over time. Good when you have stable popular items.</p>
          <p><strong>TTL (Time To Live).</strong> Every entry has an expiration. Entries die when their TTL passes regardless of access. Good for data that has a natural freshness window.</p>
          ${k('In Redis, the default eviction policy is "noeviction" — it just refuses new writes when full. Switch to allkeys-lru for most use cases.',"warning")}
        `},{title:"The Hard Problems",body:()=>`
          <p>"Cache invalidation is one of the two hard things in computer science." Why?</p>
          <p><strong>Cache stampede.</strong> A popular cache key expires. Now 10,000 simultaneous requests all miss the cache and hit the DB at once. The DB falls over. Solutions: probabilistic early refresh (a small % of requests refresh before TTL), or single-flight locks (only one request fetches; others wait).</p>
          <p><strong>Cache penetration.</strong> Attackers request keys that don't exist (and never will). Each request falls through to DB. Solution: cache the "not found" result with a short TTL.</p>
          <p><strong>Hot key.</strong> One key gets 90% of traffic (e.g., the homepage). The single Redis node holding it becomes the bottleneck. Solution: replicate hot keys across nodes, or use a local in-process cache for hot keys (multi-tier).</p>
          ${P(`You add a cache in front of your DB. Latency drops 10x. A week later, users start reporting "my profile change isn't showing up." What's likely the cause and the fix?`,"You're using cache-aside. When the user updates their profile, you wrote to DB but didn't invalidate or update the cache. The fix is to also invalidate (delete) the relevant cache key on every write.")}
        `}],keyTerms:["Cache-aside","Write-through","Write-behind","LRU / LFU / TTL","Cache stampede","Cache penetration","Hot key"],sources:["NeetCode SD Course — Caching","Grokking SD Fundamentals — Caching","Redis docs — patterns guide"]},"dns-cdn":v("DNS & CDNs","How DNS resolves and how CDNs reduce latency via edge caching"),"databases-i":v("Databases I — SQL vs NoSQL","When ACID matters, when BASE wins"),"databases-ii":v("Databases II — Sharding & Replication","Horizontal vs vertical scaling, master-replica vs multi-master"),"message-queues":v("Message Queues","Kafka, RabbitMQ, pub/sub vs point-to-point, delivery guarantees"),"cap-theorem":v("CAP Theorem","Choosing CP vs AP under network partitions"),pastebin:v("Design Pastebin","Object storage for content, metadata in DB"),twitter:v("Design Twitter","Fanout-on-write vs fanout-on-read, the celebrity problem"),youtube:v("Design YouTube","Video encoding, adaptive bitrate streaming, CDN tiering"),uber:v("Design Uber","Geo-indexing with quadtrees, real-time matching, websockets"),whatsapp:v("Design WhatsApp","Websockets, message delivery guarantees, E2EE"),dropbox:v("Design Dropbox","File chunking, delta sync, conflict resolution"),"web-crawler":v("Design Web Crawler","Distributed BFS, politeness, URL dedup, freshness"),"news-feed":v("Design News Feed","Ranking, push vs pull, ML feed scoring"),recommendation:v("ML SD — Recommendation","Two-stage architecture, candidate generation + ranking"),"search-ranking":v("ML SD — Search Ranking","Sparse + dense retrieval, learning to rank"),"mock-week":v("Mock interview week","RESHADED framework, timed practice, self-assessment")};function v(e,t){return{title:e,subtitle:t,duration:"Coming soon",difficulty:"TBD",isStub:!0,sections:[{title:"Lesson in progress",body:()=>`
          <p>This lesson follows the same Grokking-style structure as the flagship lessons (Networking Fundamentals, Load Balancers, URL Shortener, Caching). Sections include Requirements, Capacity Estimation, System APIs, Data Model, High-Level Architecture, and Bottlenecks &amp; Trade-offs.</p>
          <p>For now, use the recommended external resources:</p>
          <ul>
            <li>Grokking the System Design Interview (designgurus.io) — the canonical writeup</li>
            <li>NeetCode SD Course — video walkthroughs</li>
            <li>Alex Xu, "System Design Interview" Vol 1 &amp; 2 — best book on the topic</li>
          </ul>
        `}],keyTerms:[],sources:[]}}const Ae={"arrays-hashing":{title:"Arrays & Hashing",subtitle:"The foundation pattern. Master this before everything else.",duration:"15 min read",difficulty:"Foundational",sections:[{title:"The Core Insight",body:()=>`
          <p>Almost every algorithm interview starts with one of two structures: an <strong>array</strong> (ordered, O(1) random access) or a <strong>hash map</strong> (unordered, O(1) lookup by key).</p>
          <p>If you remember one thing: <strong>"can I make this faster by trading space for time?" almost always means "use a hash map."</strong></p>
          ${k("The classic Two Sum problem: brute force is O(n²) by checking every pair. With a hash map, it's O(n) — one pass, store seen numbers, check if complement exists. Same problem, vastly different solution, just by adding a hash map.","insight")}
        `},{title:"The Two Sum Pattern",body:()=>`
          <p>Given <code>nums = [2, 7, 11, 15]</code> and <code>target = 9</code>, find indices of two numbers that add to target.</p>
          ${I({values:[2,7,11,15],pointers:[{at:0,label:"i"}],label:"Step 1: i=0, num=2, need 7 in map?",caption:"For each num, check if (target - num) is in the hash map. If yes, done. If no, add this num."})}
          ${I({values:[2,7,11,15],pointers:[{at:1,label:"i",color:"#8FA876"}],highlight:[0,1],label:"Step 2: i=1, num=7, need 2 in map? YES!",caption:"Found: indices [0, 1]. Total time: O(n) instead of O(n²)."})}
          <pre style="background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px; font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); line-height: 1.6; overflow-x: auto;">function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i &lt; nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
}</pre>
        `},{title:"When To Reach For Hashing",body:()=>`
          <p>Signs that a hash map will collapse a problem from O(n²) to O(n):</p>
          <ul>
            <li>Need to find pairs that satisfy some property → <strong>store complements</strong></li>
            <li>Need to detect duplicates → <strong>set of seen values</strong></li>
            <li>Need to group by some key (anagrams, etc.) → <strong>map of key → list</strong></li>
            <li>Need to count occurrences → <strong>map of value → count</strong></li>
            <li>Need O(1) lookup by some derived key → <strong>precompute and store</strong></li>
          </ul>
          ${k('A common interview "tell" is when the brute force is obvious and O(n²). The interviewer wants you to optimize. The optimization is almost always a hash map.',"info")}
        `},{title:"Common Variations",body:()=>`
          ${C({headers:["Problem","Trick"],rows:[["Contains Duplicate","Set of seen values"],["Valid Anagram","Count chars in both strings, compare"],["Group Anagrams","Key by sorted string OR char counts"],["Top K Frequent","Map for counts, then heap or bucket sort"],["Longest Consecutive Sequence","Set membership for O(1) lookups; only start counting from sequence starts"]]})}
          ${P("You have an array of integers and need to check if any value appears more than once. What's the fastest solution and what is its time/space complexity?","Use a Set: iterate the array, if the value is already in the set return true, else add it. Time: O(n). Space: O(n). The space cost is the price you pay for the speedup.")}
        `}],pattern:"arrays-hashing",template:`for each item:
  if condition with hash map:
    return answer
  add item to hash map`},"two-pointers":{title:"Two Pointers",subtitle:"Two indices walking the array, eliminating O(n²) work",duration:"12 min read",difficulty:"Foundational",sections:[{title:"The Core Insight",body:()=>`
          <p>When a problem involves a sorted array and asks for pairs or subarrays with a property, two pointers usually beats brute force.</p>
          <p>The key insight: <strong>if you know which direction to move based on the current state, you can avoid backtracking.</strong></p>
          ${I({values:[-2,1,2,4,5,7],pointers:[{at:0,label:"L"},{at:5,label:"R",color:"#8FA876"}],caption:"Two pointers from opposite ends — converge based on comparison"})}
          <p>Example: <strong>Two Sum II</strong> on a sorted array. Sum the two pointed values. If too small, move left right (bigger value). If too big, move right left (smaller value). O(n) instead of O(n²).</p>
        `},{title:"The Two-Sum-Sorted Walk",body:()=>`
          <p>Target = 6. Array = [-2, 1, 2, 4, 5, 7].</p>
          ${I({values:[-2,1,2,4,5,7],pointers:[{at:0,label:"L"},{at:5,label:"R",color:"#8FA876"}],label:"L + R = -2 + 7 = 5. Too small → L++"})}
          ${I({values:[-2,1,2,4,5,7],pointers:[{at:1,label:"L"},{at:5,label:"R",color:"#8FA876"}],label:"L + R = 1 + 7 = 8. Too big → R--"})}
          ${I({values:[-2,1,2,4,5,7],pointers:[{at:1,label:"L"},{at:4,label:"R",color:"#8FA876"}],highlight:[1,4],label:"L + R = 1 + 5 = 6. Match!",caption:"Each pointer moved at most n times → O(n) total."})}
          <pre style="background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px; font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); line-height: 1.6; overflow-x: auto;">function twoSumSorted(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l &lt; r) {
    const sum = nums[l] + nums[r];
    if (sum === target) return [l, r];
    if (sum &lt; target) l++;
    else r--;
  }
}</pre>
        `},{title:"Pattern Variations",body:()=>`
          ${C({headers:["Variation","Pointers move how"],rows:[["Opposite ends","Start at 0 and n-1, converge"],["Same direction (fast/slow)","Both start at 0, slow advances by 1, fast by 2"],["Sliding window (special case)","Both move right, never go back"]]})}
          ${k("Reverse linked list, detect cycle (Floyd's), find middle of list — all use the fast/slow pointer variant. Same family.","info")}
          ${P("You have a sorted array and want to remove duplicates in-place, returning the new length. How do you use two pointers?","Slow pointer tracks the position to write to. Fast pointer scans. When fast finds a value different from slow, increment slow and copy fast's value there. O(n) time, O(1) space.")}
        `}],pattern:"two-pointers",template:`l = 0, r = n - 1
while l < r:
  if condition: return result
  if too_small: l++
  else: r--`},"sliding-window":{title:"Sliding Window",subtitle:"A window that grows and shrinks as you traverse",duration:"15 min read",difficulty:"Foundational",sections:[{title:"The Core Insight",body:()=>`
          <p>When a problem asks for "the best <strong>subarray</strong> or <strong>substring</strong> satisfying some property," sliding window often wins.</p>
          <p>The trick: <strong>maintain a window of valid indices [L, R]. Expand R when possible. Shrink L when the window violates the constraint.</strong> Each element is visited at most twice (once by R, once by L) → O(n).</p>
          ${I({values:[3,1,4,1,5,9,2,6],window:[1,4],pointers:[{at:1,label:"L"},{at:4,label:"R",color:"#8FA876"}],caption:"Window [L, R] expands and contracts to maintain a property"})}
        `},{title:'Walking Through "Longest Substring No Repeat"',body:()=>`
          <p>Find the longest substring without repeating characters. Input: <code>"abcabcbb"</code>.</p>
          ${I({values:["a","b","c","a","b","c","b","b"],window:[0,2],pointers:[{at:0,label:"L"},{at:2,label:"R",color:"#8FA876"}],label:'Window "abc" — all unique. Length 3.'})}
          ${I({values:["a","b","c","a","b","c","b","b"],window:[0,3],pointers:[{at:0,label:"L"},{at:3,label:"R",color:"#8FA876"}],highlight:[0,3],label:'R advances to "a". Now duplicate! Shrink L.'})}
          ${I({values:["a","b","c","a","b","c","b","b"],window:[1,3],pointers:[{at:1,label:"L"},{at:3,label:"R",color:"#8FA876"}],label:'L = 1. Window "bca" — unique again.',caption:"Each character visited at most twice. O(n) total."})}
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
        `},{title:"Fixed vs Variable Windows",body:()=>`
          <p>Two flavors:</p>
          <p><strong>Fixed-size window.</strong> Maintain a window of exactly K elements. Slide one element at a time, adding the new one and removing the old. Use for "max sum of K consecutive elements" type problems.</p>
          <p><strong>Variable-size window.</strong> Grow R until a constraint is violated, shrink L until it's restored. Use for "longest/shortest substring with property X" problems.</p>
          ${k('If the problem says "exactly K" → fixed window. If it says "at most K" or "longest/shortest with property" → variable window.',"insight")}
          ${P("You need to find the smallest substring that contains all characters of a target string. Fixed or variable window?","Variable. Expand R until the window has all required chars, then shrink L as much as possible while still valid, then expand R again. Track the smallest valid window seen.")}
        `}],pattern:"sliding-window",template:`l = 0
for r in range(n):
  expand window with arr[r]
  while window violates constraint:
    shrink window from l
    l++
  update best answer`},trees:{title:"Trees",subtitle:"Recursive structures, recursive solutions",duration:"18 min read",difficulty:"Intermediate",sections:[{title:"The Core Insight",body:()=>`
          <p>A tree is a node plus a list of subtrees. That recursive definition <strong>is</strong> the solution template for most tree problems.</p>
          <p>The mental model: <strong>"do something for this node, recurse on each child, combine."</strong></p>
          ${z({nodes:[{id:1,value:1,x:240,y:40},{id:2,value:2,x:140,y:100,parent:1},{id:3,value:3,x:340,y:100,parent:1},{id:4,value:4,x:80,y:160,parent:2},{id:5,value:5,x:200,y:160,parent:2},{id:6,value:6,x:400,y:160,parent:3}],caption:"A binary tree. Each node has up to 2 children. Depth = 3."})}
        `},{title:"DFS vs BFS",body:()=>`
          <p>Two ways to traverse. Pick based on what you need.</p>
          ${C({headers:["Traversal","Order","Use when"],rows:[["DFS (recursion)","Go deep before wide","Path-based questions (max depth, sum of paths)"],["BFS (queue)","Level by level","Shortest path, level-order output"]]})}
          ${z({nodes:[{id:1,value:1,x:240,y:40},{id:2,value:2,x:140,y:100,parent:1},{id:3,value:3,x:340,y:100,parent:1},{id:4,value:4,x:80,y:160,parent:2},{id:5,value:5,x:200,y:160,parent:2},{id:6,value:6,x:400,y:160,parent:3}],visited:[1,2,4,5,3,6],caption:"DFS preorder visits: 1 → 2 → 4 → 5 → 3 → 6"})}
          <pre style="background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px; font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); line-height: 1.6; overflow-x: auto;">// The template for DFS solutions
function dfs(node) {
  if (!node) return baseCase;
  const left = dfs(node.left);
  const right = dfs(node.right);
  return combine(node, left, right);
}</pre>
        `},{title:"BST — Binary Search Tree",body:()=>`
          <p>A binary tree with an extra rule: <strong>for any node, all values in the left subtree are smaller, all values in the right subtree are larger.</strong></p>
          ${z({nodes:[{id:1,value:5,x:240,y:40},{id:2,value:3,x:140,y:100,parent:1},{id:3,value:8,x:340,y:100,parent:1},{id:4,value:1,x:80,y:160,parent:2},{id:5,value:4,x:200,y:160,parent:2},{id:6,value:7,x:290,y:160,parent:3},{id:7,value:9,x:390,y:160,parent:3}],caption:"BST: left subtree < node < right subtree. Search is O(log n) when balanced."})}
          <p>Searching: at each node, go left if target is smaller, right if bigger. O(log n) in a balanced BST. O(n) in a pathological one (a linked list in disguise).</p>
          ${P("Given a BST and a target value, how do you find the smallest value strictly greater than target?",'Modified search: if current node value > target, candidate = current, go left. If current ≤ target, go right. Return final candidate. This is "successor" in BST terms.')}
        `},{title:"Common Tree Problems",body:()=>`
          ${C({headers:["Problem","Pattern"],rows:[["Max depth","Recursive: 1 + max(left depth, right depth)"],["Same tree","Recursive: both null OR both same value AND both subtrees same"],["Invert tree","Recursive: swap left/right children, recurse"],["Validate BST","Recursive with min/max bounds passed down"],["Level order","BFS with queue, track level boundaries"],["LCA (Lowest Common Ancestor)","Recursive: if both p and q found in different subtrees, current node is LCA"],["Serialize/Deserialize","Pre-order DFS with explicit null markers"]]})}
        `}],pattern:"trees",template:`function solve(node):
  if not node: return baseCase
  left = solve(node.left)
  right = solve(node.right)
  return combine(node.val, left, right)`},stack:S("Stack","LIFO and monotonic stacks"),"binary-search":S("Binary Search","Divide and conquer on sorted data and monotonic answer spaces"),"linked-list":S("Linked List","Pointer manipulation, cycle detection, reversal"),tries:S("Tries","Prefix tree for autocomplete and word search"),heap:S("Heap","Priority queue for top-K and median tracking"),backtracking:S("Backtracking","Try-recurse-undo for permutations, subsets, search"),graphs:S("Graphs","BFS, DFS, Union-Find, topological sort"),"advanced-graphs":S("Advanced Graphs","Dijkstra, Bellman-Ford, MST"),"1d-dp":S("1-D Dynamic Programming","Memoize subproblems on a single dimension"),"2d-dp":S("2-D Dynamic Programming","Grid problems and two-string problems"),greedy:S("Greedy","Locally optimal choices that produce a globally optimal answer"),intervals:S("Intervals","Sort + sweep for overlap detection"),"math-geometry":S("Math & Geometry","Modular arithmetic, matrix manipulation, geometric reasoning"),"bit-manipulation":S("Bit Manipulation","XOR tricks, bit shifting, set bit counting")};function S(e,t){return{title:e,subtitle:t,duration:"Coming soon",difficulty:"TBD",isStub:!0,sections:[{title:"Pattern lesson in progress",body:()=>`
          <p>This pattern lesson follows the same structure as the flagship DSA lessons: core insight, animated walk-through, common variations, and template code.</p>
          <p>For now, use the recommended external resources:</p>
          <ul>
            <li><strong>NeetCode.io</strong> — video solutions for every problem in this pattern</li>
            <li><strong>LeetCode</strong> — try the problems listed under this pattern</li>
            <li><strong>"Cracking the Coding Interview"</strong> — chapters by topic</li>
          </ul>
        `}],pattern:"",template:""}}const M=e=>String(e||"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Be(){if(!s.selectedLesson)return'<div class="view"><div class="empty">No lesson selected</div></div>';const{kind:e,id:t}=s.selectedLesson,i=(e==="sd"?Pe:Ae)[t];if(!i)return`<div class="view"><div class="empty">Lesson "${t}" not found.</div></div>`;const o=i.sections.map((r,d)=>`
    <section class="lesson-section">
      <div class="lesson-section-header">
        <span class="lesson-section-num">${String(d+1).padStart(2,"0")}</span>
        <h2 class="lesson-section-title">${M(r.title)}</h2>
      </div>
      <div class="lesson-body">${r.body()}</div>
    </section>
  `).join(""),n=(i.keyTerms||[]).length?`
    <div class="lesson-section">
      <div class="kicker" style="margin-bottom: 12px;">Key Terms to Know</div>
      <div class="brief-terms">${i.keyTerms.map(r=>`<span class="chip">${M(r)}</span>`).join("")}</div>
    </div>
  `:"",c=(i.sources||[]).length?`
    <div class="lesson-section">
      <div class="kicker" style="margin-bottom: 12px;">Sources & Further Reading</div>
      <ul style="list-style: none; padding: 0; color: var(--text-secondary); font-size: 14px; line-height: 1.7;">
        ${i.sources.map(r=>`<li style="padding: 4px 0;">• ${M(r)}</li>`).join("")}
      </ul>
    </div>
  `:"",l=s.aiConfig.enabled?`
    <button class="btn btn-primary" style="margin-top: 24px;" data-action="ask-ai" data-context="${M(i.title+" — "+(i.subtitle||""))}">
      Ask Claude about this lesson →
    </button>
  `:"";return`
    <div class="view animate-fade-up">
      <div class="lesson-header">
        <button class="lesson-back" data-action="back-from-lesson">← Back</button>
        <h1 class="lesson-title">${M(i.title)}</h1>
        ${i.subtitle?`<div class="body" style="margin-bottom: 12px;">${M(i.subtitle)}</div>`:""}
        <div class="lesson-meta">
          <span class="chip">${M(i.duration||"")}</span>
          ${i.difficulty?`<span class="chip">${M(i.difficulty)}</span>`:""}
          <span class="chip chip-track-${e}">${e==="sd"?"◇ System Design":"⌘ DSA Pattern"}</span>
        </div>
      </div>

      ${o}
      ${n}
      ${c}
      ${l}
    </div>
  `}const L=e=>String(e||"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function We(){return s.showSettings?`
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
          <input class="field-input" id="syncUrl" type="text" placeholder="http://100.x.x.x:8090" value="${L(s.syncConfig.url)}" />
          <div class="field-hint">Your PocketBase server. Use your Tailscale IP for remote access.</div>
        </div>
        <div class="field">
          <label class="field-label">Email</label>
          <input class="field-input" id="syncEmail" type="email" placeholder="you@example.com" value="${L(s.syncConfig.email)}" />
        </div>
        <div class="field">
          <label class="field-label">Password</label>
          <input class="field-input" id="syncPassword" type="password" placeholder="••••••••" value="${L(s.syncConfig.password)}" />
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
          <input class="field-input" id="aiKey" type="password" placeholder="sk-ant-..." value="${L(s.aiConfig.apiKey)}" />
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
  `:""}async function Re(){const e=document.getElementById("syncUrl").value.trim().replace(/\/$/,""),t=document.getElementById("syncEmail").value.trim(),a=document.getElementById("syncPassword").value;s.syncConfig={...s.syncConfig,url:e,email:t,password:a},oe();const i=document.getElementById("syncMsg");i.innerHTML='<div class="caption">Testing…</div>';try{await F(),await ce(),i.innerHTML='<div class="callout callout-insight">✓ Connected and synced.</div>'}catch(o){i.innerHTML=`<div class="callout callout-warning">✗ ${L(o.message)}</div>`}}async function Ee(){const e=document.getElementById("aiKey").value.trim();s.aiConfig.apiKey=e,ie();const t=document.getElementById("aiMsg");t.innerHTML='<div class="caption">Testing…</div>';try{const a=await de('Reply with just the word "OK".');t.innerHTML=`<div class="callout callout-insight">✓ Connected. Test response: ${L(a.substring(0,60))}</div>`}catch(a){t.innerHTML=`<div class="callout callout-warning">✗ ${L(a.message.substring(0,200))}</div>`}}let G=[];function Fe(){if(!s.showAI)return"";const e=G.map(t=>`
    <div style="padding: 12px; background: ${t.role==="user"?"var(--bg-elevated)":"var(--accent-amber-bg)"}; border-radius: 8px; margin-bottom: 8px;">
      <div class="kicker" style="margin-bottom: 4px; color: ${t.role==="user"?"var(--text-tertiary)":"var(--accent-amber)"};">${t.role==="user"?"You":"Claude"}</div>
      <div class="body-sm" style="white-space: pre-wrap;">${L(t.content)}</div>
    </div>
  `).join("");return`
    <div class="modal-backdrop" data-action="close-ai">
      <div class="modal" onclick="event.stopPropagation()" style="max-height: 90vh;">
        <div class="modal-header">
          <h2 class="h2">Ask Claude</h2>
          <button class="btn" data-action="close-ai">close</button>
        </div>
        ${s.aiContext?`<div class="caption" style="margin-bottom: 16px; padding: 10px; background: var(--bg-base); border-radius: 6px;">Context: ${L(s.aiContext)}</div>`:""}
        <div id="aiHistory" style="max-height: 50vh; overflow-y: auto; margin-bottom: 16px;">${e}</div>
        <textarea id="aiInput" class="field-input" rows="3" placeholder="Ask anything about this concept..." style="resize: vertical; min-height: 80px;"></textarea>
        <button class="btn btn-primary" style="width: 100%; margin-top: 12px;" data-action="send-ai">Ask Claude →</button>
      </div>
    </div>
  `}async function Oe(){const e=document.getElementById("aiInput"),t=e.value.trim();if(!t)return;const a=`You are a focused study assistant helping a DevSecOps engineer prepare for FAANG-adjacent interviews and a UPenn CS master's program. Be concise, technically precise, and direct. Use examples and analogies when they clarify. Avoid filler. If asked about a system design or DSA topic, structure your answer with clear sections.${s.aiContext?" Current learning context: "+s.aiContext:""}`;G.push({role:"user",content:t}),e.value="",y();const i=document.getElementById("aiHistory");i&&(i.innerHTML+='<div style="padding: 12px;"><div class="spinner"></div></div>',i.scrollTop=i.scrollHeight);try{const o=await de(t,a);G.push({role:"assistant",content:o})}catch(o){G.push({role:"assistant",content:"Error: "+o.message})}y()}function He(e=null){if(!s.aiConfig.enabled||!s.aiConfig.apiKey){alert("AI is not configured. Open Settings to add your Anthropic API key.");return}s.showAI=!0,s.aiContext=e,y()}function Ne(){s.showAI=!1,s.aiContext=null,y()}function pe(){const e=re(),t=document.getElementById("app");t.innerHTML=`
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

    <main id="view-container">${Ge()}</main>

    <nav class="tabbar">
      <div class="tabbar-inner">
        <button class="tab ${s.activeTab==="today"?"active":""}" data-action="set-tab" data-tab="today">
          <span class="tab-icon">${E("today")}</span>
          <span class="tab-label">Today</span>
        </button>
        <button class="tab ${s.activeTab==="week"?"active":""}" data-action="set-tab" data-tab="week">
          <span class="tab-icon">${E("week")}</span>
          <span class="tab-label">Week</span>
        </button>
        <button class="tab ${s.activeTab==="plan"?"active":""}" data-action="set-tab" data-tab="plan">
          <span class="tab-icon">${E("plan")}</span>
          <span class="tab-label">Plan</span>
        </button>
        <button class="tab ${s.activeTab==="sd"?"active":""}" data-action="set-tab" data-tab="sd">
          <span class="tab-icon">${E("sd")}</span>
          <span class="tab-label">SD</span>
        </button>
        <button class="tab ${s.activeTab==="dsa"?"active":""}" data-action="set-tab" data-tab="dsa">
          <span class="tab-icon">${E("dsa")}</span>
          <span class="tab-label">DSA</span>
        </button>
      </div>
    </nav>

    ${We()}
    ${Fe()}
  `,Ue()}function Ge(){if(s.selectedLesson)return Be();switch(s.activeTab){case"today":return Q();case"week":return Te();case"plan":return De();case"sd":return Ce();case"dsa":return Ie();default:return Q()}}function E(e){const a=Object.entries({width:18,height:18,fill:"none",stroke:"currentColor","stroke-width":1.8,"stroke-linecap":"round","stroke-linejoin":"round"}).map(([i,o])=>`${i}="${o}"`).join(" ");switch(e){case"today":return`<svg ${a}><circle cx="9" cy="9" r="6"/><circle cx="9" cy="9" r="2" fill="currentColor"/></svg>`;case"week":return`<svg ${a}><rect x="2" y="3" width="14" height="13" rx="2"/><line x1="2" y1="7" x2="16" y2="7"/><line x1="6" y1="3" x2="6" y2="7"/><line x1="12" y1="3" x2="12" y2="7"/></svg>`;case"plan":return`<svg ${a}><line x1="3" y1="5" x2="15" y2="5"/><line x1="3" y1="9" x2="15" y2="9"/><line x1="3" y1="13" x2="15" y2="13"/></svg>`;case"sd":return`<svg ${a}><rect x="2" y="2" width="6" height="6" rx="1"/><rect x="10" y="2" width="6" height="6" rx="1"/><rect x="2" y="10" width="6" height="6" rx="1"/><rect x="10" y="10" width="6" height="6" rx="1"/><line x1="8" y1="5" x2="10" y2="5"/><line x1="5" y1="8" x2="5" y2="10"/></svg>`;case"dsa":return`<svg ${a}><circle cx="9" cy="3" r="2"/><circle cx="4" cy="13" r="2"/><circle cx="14" cy="13" r="2"/><line x1="9" y1="5" x2="4" y2="11"/><line x1="9" y1="5" x2="14" y2="11"/></svg>`;default:return""}}function Ue(){document.querySelectorAll("[data-action]").forEach(e=>{e.addEventListener("click",async t=>{const a=e.dataset.action;if(a)switch(a){case"set-tab":s.activeTab=e.dataset.tab,s.selectedLesson=null,s.expandedBriefs.clear(),y(),window.scrollTo(0,0);break;case"toggle-block":{const i=+e.dataset.week,o=+e.dataset.day,n=e.dataset.kind;R(`w${i}_d${o}_${n}`);break}case"toggle-project":R(`w${e.dataset.week}_project`);break;case"toggle-sd":t.stopPropagation(),R(`w${e.dataset.week}_sd`);break;case"toggle-dsa":t.stopPropagation(),R(`w${e.dataset.week}_dsa`);break;case"toggle-problem":R(`dsa_${e.dataset.id}`);break;case"toggle-brief":{const i=e.dataset.brief;s.expandedBriefs.has(i)?s.expandedBriefs.delete(i):s.expandedBriefs.add(i),y();break}case"select-week":s.selectedWeek=+e.dataset.week,s.activeTab="week",s.expandedBriefs.clear(),y(),window.scrollTo(0,0);break;case"open-sd":case"open-sd-lesson":s.selectedLesson={kind:"sd",id:e.dataset.id},y(),window.scrollTo(0,0);break;case"open-dsa":case"open-dsa-lesson":s.selectedLesson={kind:"dsa",id:e.dataset.id},y(),window.scrollTo(0,0);break;case"back-from-lesson":s.selectedLesson=null,y();break;case"open-settings":s.showSettings=!0,y();break;case"close-settings":s.showSettings=!1,y();break;case"toggle-sync":s.syncConfig.enabled=!s.syncConfig.enabled,oe(),s.syncConfig.enabled?F():s.syncStatus="offline",y();break;case"save-sync":await Re();break;case"toggle-ai":s.aiConfig.enabled=!s.aiConfig.enabled,ie(),y();break;case"save-ai":await Ee();break;case"ask-ai":He(e.dataset.context);break;case"close-ai":Ne();break;case"send-ai":await Oe();break;case"export":ve();break;case"reset":ke();break}})})}me();he(pe);pe();s.syncConfig.enabled&&F();
