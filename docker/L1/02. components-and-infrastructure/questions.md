# Docker components — Questions

Cover the Answers section. Answer first, then check.

1. Recite the start-service chain (five steps). Which process **exits** after the container starts? Which one **stays** and watches?
2. Which of these is the only **Docker product** / UX layer?
3. How does containerd listen? What protocol? Name four jobs from the notes.
4. What is runC? Which Linux features does it talk to?
5. What does `docker-proxy` do?

---

## Answers

1. Daemon → containerd → shim → runC starts the container → runC goes away; shim watches. **runC** exits. **containerd-shim** stays.
2. `docker` (the daemon).
3. UNIX socket. gRPC. Container management, storage, image distribution, network attachments.
4. Lightweight binary that runs the container. **cgroups** and **namespaces**.
5. Proxy container ports to the host interface.
