# Docker components and infrastructure

When you ask the **daemon** to start a new service, it accepts the options, then hands work **down** the stack. The daemon is the only **Docker product** in this list; the rest are the plumbing.

```text
you / CLI
    → docker (daemon)          UX, accepts options
        → containerd           low-level manager (UNIX socket, gRPC)
            → containerd-shim  stays after runC exits
                → runC         starts the container, then goes away
```

1. The daemon gives details to **containerd** (cloud-native / CNCF open source; still used as `docker-containerd`).
2. containerd talks to **containerd-shim**.
3. The shim starts **runC**.
4. **runC** starts the container and **exits**.
5. The **shim** stays and watches whether the container is still working — so you do **not** need a long-running process per container besides the shim.

## `docker` (daemon)

Highest-level component. **The** Docker product here. All **UX** features of Docker. Accepts start-service options and talks to containerd.

## `docker-containerd`

A daemon on a **UNIX socket**. Exposes **gRPC** endpoints. Low-level work: container management, **storage**, **image distribution**, **network attachments**, and so on.

## `docker-containerd-shim`

Sits **between** containerd and runC. After runC starts the container and **exits**, the shim remains so there is no extra long-running “parent” besides the shim.

## `docker-runc`

Lightweight binary that **runs** the container. Low-level Linux: **cgroups**, **namespaces**, and similar.

## `docker-proxy`

Proxies **container ports** onto the **host** interface (published ports).

**Memory hook:** daemon (UX) → containerd (gRPC) → shim (stays) → runC (starts, leaves). `docker-proxy` = ports to the host.
