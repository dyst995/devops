# Docker components: container

A container is **like** a virtual machine in that it holds and **runs** everything a program needs. It is **not** a full VM: it does **not** ship a kernel.

It includes:

- a **filesystem** (typically some Linux flavor)
- **software** installed on that filesystem
- runtime extras: **external volumes**, **exposed ports**, and similar

You run it as a **self-contained** environment. The same analysis runs on a laptop or in the cloud **without** hunting down every dependency. You can keep **several** environments and switch when programs need **incompatible** system requirements.

## Image vs container

A container is usually a **runnable instance of an image**. The image already has the dependencies (example: Tomcat needs Debian, Tomcat, Java, …). Tomcat **inside** the container is the same Tomcat you would install on a VM. The VM still needs Java, libraries, **and a whole OS**. The container needs the same **app** prerequisites, **not** a full guest OS.

**No kernel inside the container.** It uses the **host kernel**. Every container on that host uses that same kernel.

## Isolation and state

A container is **isolated** from other containers and from the host **by default**. You can **control** how isolated it is.

The **image** plus **config** (ports, volumes, …) define the container. Changes in the container **disappear** when you remove it unless you saved them on **persistent storage**.

**Memory hook:** container = running image + config. Host kernel. Isolated by default. Ephemeral unless a volume.
