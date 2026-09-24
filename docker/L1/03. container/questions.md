# Container — Questions

Cover the Answers section. Answer first, then check.

1. What three things does a container include? Why is it easier to reproduce work on a laptop vs the cloud?
2. Container vs image — which is the running instance? Tomcat example: same app as a VM? What do you **not** need inside the container?
3. Whose kernel do containers use? One kernel per container?
4. Isolated from what, by default? Can you change that?
5. What defines a container? What happens to writes if you do not use persistent storage and then remove the container?

---

## Answers

1. Filesystem · software on it · runtime extras (volumes, ports). Same image, same deps — no reinstall on each machine.
2. Container is the instance of an image. Yes (same Tomcat). A full guest OS / kernel.
3. The **host** kernel. No — all containers on the host share it.
4. Other containers and the host. Yes — you control the isolation level.
5. Image + configuration. Those changes are **gone**.
