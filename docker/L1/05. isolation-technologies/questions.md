# Isolation technologies — Questions

Cover the Answers section. Answer first, then check.

1. Two places isolation must exist? What does that do for the host surface?
2. Recite the six namespaces, one job each, and the kernel versions from the notes.
3. Recite the isolation list: namespaces, cgroups, chroot, capabilities, virt eth, port binding, volumes, Docker network — one sentence each.
4. Which three are used most often?
5. What do cgroups let the Engine do? Chroot — what does the process see?
6. Tomcat example: why a **virtual** Ethernet? How does the outside reach the container? Why can two containers expose the same port?

---

## Answers

1. App vs host, and app vs app. Smaller attack surface; host and containers better protected.
2. MNT mounts 2.4.19 · UTS names 2.6.19 · IPC 2.6.19 · PID 2.6.24 · NET 2.6.24 · USER 3.8.
3. Only process · resource limits · slice of FS · kernel permissions · ethernet device · same ports OK · data survives · IP/name to other services.
4. Namespaces, control groups, chroot.
5. Share hardware and set limits (e.g. memory). Only a piece of the filesystem (that piece is under the real root).
6. Isolation from the host NIC. Port binding / forwarding. Binding maps **host** port → **container** port; the host ports differ.
