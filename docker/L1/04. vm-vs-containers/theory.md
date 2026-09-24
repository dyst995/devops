# Virtual machines vs containers

A container is a way to **launch an application**. Comparing it to a **VM** is common and **not a good analogy**.

- A VM has virtual **CPU**, a **guest OS**, and a **kernel**.
- A container has only the **binaries and dependencies** for that app.
- **Docker** is what puts the **host kernel** into the container’s view.
- Treat a container as a **standalone process** on the host, not as a small computer.

```text
VM                                      Container
App A    App B    App C                 App A    App B    App C
Bins     Bins     Bins                  Bins     Bins     Bins
Guest OS Guest OS Guest OS              ──────── Docker ────────
──────── Hypervisor ────────            ──────── Host OS ───────
──────── Infrastructure ────            ──────── Infrastructure ─
```

Each VM: its **own** guest OS on a **hypervisor**.  
Each container: its own app + bins/libs; **one** Docker layer; **one** host OS (shared kernel). No per-app guest OS.

**Memory hook:** VM = machine (CPU + guest kernel). Container = process (bins + host kernel via Docker).
