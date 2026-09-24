# Docker architecture — Questions

Cover the Answers section. Answer first, then check.

1. What kind of architecture is Docker? What do you type, and who does the work?
2. How does the client reach the daemon? Can they live on different machines? Can one client talk to several daemons?
3. Recite the three daemon jobs.
4. Recite the chain: Dockerfile → ? → ? and the two registry arrows.
5. What does a registry store? Default public registry? Three other registry options from the notes?
6. `docker pull` / `docker run` vs `docker push` — which way does the image move?

---

## Answers

1. Client–server. CLI (`docker …`). The **daemon**.
2. REST API over a UNIX socket or a network interface. Yes (remote daemon). Yes.
3. Listen for API requests · manage images/containers/networks/volumes · talk to other daemons for services.
4. Image → Container. `push` image to registry; `pull` image from registry.
5. Images. Docker Hub. Your own private registry · DTR (with DDC) · AWS / Azure / GCP.
6. Registry → local (pull; `run` pulls if needed). Local → registry.
