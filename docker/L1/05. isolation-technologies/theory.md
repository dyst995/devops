# Isolation technologies

The point of a container is an **isolated space** for an app. You need isolation **on the same machine**: between the app and the **host**, and **between apps**. That raises default security and **shrinks the host surface**. The host and the containers on it stay better protected.

```text
        ┌──────────┐  ┌──────────┐
        │ app / lib│  │ app / lib│   ← namespaces
        └──────────┘  └──────────┘
        ──────────── OS ────────────
        ──────── x86 hardware ──────
```

Each box is its own namespace on **one** OS / one kernel.

## Why each kind exists

| Technology | What the process in the container should get |
| --- | --- |
| **Namespaces** | Must not see other processes; should feel like the **only** process |
| **Control groups** | Limits/shares of RAM, CPU, … — a good multi-tenant neighbor |
| **Chroot** | Sees **only** the filesystem slice it needs |
| **Process capabilities** | Enough permission to use the kernel — not a full root host |
| **Virtual eth** | An ethernet device (not the host NIC raw) |
| **Port binding** | Several containers can expose the **same** port without clashing |
| **Volumes** | Data **survives** if the service goes down |
| **Docker network** | Talk to other services by **IP / name** |

Most used: **namespaces**, **cgroups**, **chroot**.

## Namespaces

A container is like a process that **must** be isolated. That isolation **is** a namespace. On `docker run`, Docker creates a **set** of namespaces. Each aspect of the container runs in its own namespace and **cannot** see outside it.

Six Linux kernel namespaces used by Docker Engine:

| Namespace | Job | Kernel |
| --- | --- | --- |
| **MNT** | Mount points, filesystems | 2.4.19 |
| **UTS** | Kernel / version identifiers (Unix Timesharing System) | 2.6.19 |
| **IPC** | Inter-process communication resources | 2.6.19 |
| **PID** | Process isolation | 2.6.24 |
| **NET** | Network interfaces | 2.6.24 |
| **USER** | User / UID mapping | 3.8 |

**Memory hook:** MNT UTS IPC PID NET USER. PID = “only process.” NET = interfaces.

## Control groups (cgroups)

Isolation so the app uses **only the resources you allow**. Docker Engine **shares** hardware and can **limit** it (e.g. memory for one container).

```text
CPU              Memory + Network           Storage I/O
cgroup #1        cgroup #4  cgroup #6       cgroup #9
cgroup #2        ── cgroup #5 (shared) ──   cgroup #10
cgroup #3                   cgroup #7
```

Different controllers (CPU, memory, network, disk I/O); a group can sit in more than one.

**Memory hook:** cgroups = shares and **caps** (RAM, CPU, …).

## Chroot

The process sees **only a piece** of the filesystem. That piece lives **somewhere under** the real root.

```text
/ ── home ── user1
 │        └─ user2
 ├─ var
 ├─ usr
 └─ bin
        chroot ── home ── user1
               ├─ var      user2
               ├─ usr      user3
               └─ bin
```

Inside the jail, `/` is that subtree — not the host `/`.

**Memory hook:** chroot = “this directory is `/` for you.”

## Example: Tomcat

Tomcat loads libraries from the **container filesystem**. It expects a **port** and a **network interface**. Docker does **not** give the host Ethernet device directly — it gives a **virtual Ethernet**. To reach the container from outside: **port binding / forwarding** (host port → container port). Same published port on two containers is fine because of that binding.

**Memory hook:** virt eth inside; bind host port → container port.
