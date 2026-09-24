# VM vs containers — Questions

Cover the Answers section. Answer first, then check.

1. Why is “container ≈ VM” the wrong analogy? What should you equal a container to?
2. What does a VM have that a container does not? What does a container have?
3. Who provides the kernel inside a container?
4. Recite both stacks from the diagram (bottom to top).

---

## Answers

1. A VM is a machine (CPU, OS, kernel). A container is a **standalone process**.
2. Virtual CPU, guest OS, kernel. Binaries and dependencies for one app.
3. **Docker** — the **host** kernel.
4. VM: infrastructure → hypervisor → guest OS (per app) → bins → app. Container: infrastructure → host OS → Docker → bins (per app) → app.
