# Docker architecture overview

Docker is a **client–server** architecture.

- You run commands with the **CLI** (`docker`).
- The client talks to the **daemon** over a **REST API** on a **UNIX socket** or a **network** interface.
- The **daemon** builds, runs, and distributes containers — the client does not do that work itself.
- The daemon gets images from a **registry**.
- Client and daemon can be on the **same** machine, or the client can talk to a **remote** daemon.

```text
Client                         Server                              Registry
┌─────────────┐                ┌─────────────────┐                 ┌────────┐
│ Docker CLI  │  REST / socket │ Docker daemon   │  push / pull    │ images │
└─────────────┘                └────────┬────────┘                 └────────┘
                                        │
                         Dockerfile ──build──► Image ──run──► Container
```

## The Docker client

The **primary** way most people talk to Docker. You type something like `docker run`; the client **sends** that to the daemon; the daemon **carries it out**. One client can talk to **more than one** daemon. Commands use the **Docker API**.

## The Docker daemon

- **Listens** for Docker API requests
- **Manages** objects: images, containers, networks, volumes
- **Talks to other daemons** when you manage Docker **services**

## The Docker registry

A registry **stores images**.

- **Docker Hub** — public; Docker looks here **by default**
- You can use another **private** registry:
  - run your own (image on hub.docker.com)
  - **Docker Trusted Registry (DTR)** if you use Docker Datacenter (DDC)
  - cloud registries: **AWS**, **Azure**, **GCP**
- Registries support **user management** and a **secure** connection

`docker pull` / `docker run` — missing images are **pulled** from the configured registry.  
`docker push` — your image is **pushed** to the configured registry.

**Memory hook:** CLI → API → daemon. Daemon owns objects. Registry holds images (Hub by default). `run`/`pull` down, `push` up.
