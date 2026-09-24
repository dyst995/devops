# Docker image — Questions

Cover the Answers section. Answer first, then check.

1. What is an image in one sentence (inert / immutable / snapshot)?
2. How is an image **created**? What does **run** do with it?
3. Where are images **stored**? Example URL from the notes?
4. Why **layers**? What gets sent over the network?

---

## Answers

1. An inert, immutable file — a snapshot of a container.
2. `docker build` runs the Dockerfile. Creates (and starts) a **container**.
3. A Docker registry. `https://hub.docker.com`.
4. Images are stacked from other images. Only the **minimal** new layers — not the whole file every time.
