# Docker image

A Docker image is an **inert, immutable** file — essentially a **snapshot** of a container. You do not “run an image”; you run a **container** created **from** it.

## Creation

Images are generated with **`docker build`**, which runs the script in a **Dockerfile**. **`docker run`** on that image **creates a container**.

## Storing

Images live in a **Docker registry** (e.g. `https://hub.docker.com`).

## Sending

Images can be **large**. They are built from **layers** of other images so a transfer sends only the **layers you do not already have**.

**Memory hook:** image = immutable snapshot. `build` from Dockerfile. Store in a registry. Layers = less over the wire. `run` → container.
