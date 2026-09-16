# Monitoring CPU

Three tools for **CPU hardware** vs **CPU usage**:

| Command | Job |
| --- | --- |
| **`lscpu`** | **Architecture**: how many CPUs, threads, cores, sockets, NUMA nodes |
| **`mpstat`** | **Per-CPU (core)** utilization statistics |
| **`sar`** | Same idea: per-CPU stats (often from collected history; can also sample live) |

**Memory hook:** `lscpu` = what chips you have. `mpstat` / `sar` = how busy each core is.

## lscpu

Gathers **CPU architecture**: number of CPUs, **threads**, **cores**, **sockets**, **NUMA** nodes, vendor, model.

```text
# lscpu
Architecture:        x86_64
CPU op-mode(s):      32-bit, 64-bit
Byte Order:          Little Endian
CPU(s):              40
On-line CPU(s) list: 0-39
Thread(s) per core:  1
Core(s) per socket:  10
Socket(s):           4
NUMA node(s):        4
Vendor ID:           GenuineIntel
CPU family:          6
Model:               47
Model name:          Intel(R) Xeon(R) CPU E7- 4870  @ 2.40GHz
Stepping:            2
```

| Field | Meaning |
| --- | --- |
| `CPU(s)` | Logical processors the OS sees (here **40**) |
| `Thread(s) per core` | 1 = no extra hyperthread visible; 2 = SMT |
| `Core(s) per socket` | Physical cores on one package (**10**) |
| `Socket(s)` | CPU packages on the board (**4**) |
| `NUMA node(s)` | Memory domains (**4**) — cores closer to some RAM than other |

Check: 4 sockets × 10 cores × 1 thread = **40** logical CPUs. That is the inventory you size VMs and `taskset` against.

**Memory hook:** sockets × cores × threads ≈ `CPU(s)`. NUMA = “RAM is not equally far from every socket.”

## mpstat

Display **CPU statistics of an individual CPU (or core)**.

- If you do not pick another activity type, the default report is **CPU utilization**.
- If you do **not** give an **interval**, stats are **since system startup (boot)** — a long average, not “right now.”

```bash
mpstat -P ALL
```

`-P ALL` = **every** logical CPU plus a summary line **`all`**.

```text
10:28:04 PM  CPU  %usr  %nice  %sys  %iowait  %irq  %soft  %steal  %guest  %idle
10:28:04 PM  all  0.00  0.00   0.00  0.00     0.00  0.00   0.00    0.00    99.99
10:28:04 PM    0  0.01  0.00   0.01  0.01     0.00  0.00   0.00    0.00    99.98
```

| Column | Rough meaning |
| --- | --- |
| `%usr` / `%user` | User-space processes |
| `%nice` | Niced (low-priority) user time |
| `%sys` / `%system` | Kernel |
| `%iowait` | Idle **waiting for disk/network I/O** |
| `%irq` / `%soft` | Hardware / software interrupts |
| `%steal` | Time a hypervisor took from this VM |
| `%guest` | Running a guest (KVM host) |
| `%idle` | Nothing to do |

High **`%iowait`** → storage, not “need more CPU.” High **`%steal`** → noisy neighbor on the hypervisor.

To sample **now**, use an interval: `mpstat -P ALL 1 5` (every 1s, 5 times) — same pattern as `sar` below.

**Memory hook:** no interval = since **boot**. `-P ALL` = all cores. idle high = bored; iowait high = waiting on I/O.

## sar

Also **display CPU statistics of individual CPU (or core)**. Often installed with `sysstat`. Can replay **historical** data (`/var/log/sa/`) or print a live sample.

```bash
sar -P ALL 1 1
```

| Piece | Meaning |
| --- | --- |
| `-P ALL` | All processors + `all` |
| `1` | Interval **1 second** |
| `1` | **Count** — one sample (so: wait 1s, print once) |

```text
01:34:12 PM  CPU   %user  %nice  %system  %iowait  %steal  %idle
01:34:13 PM  all   11.69  0.00   4.71     0.69     0.00    82.90
01:34:13 PM    0   35.00  0.00   6.00     0.00     0.00    59.00
```

Core **0** is busier (35% user) than core **3** (idle 100%). `all` is the average.

**Memory hook:** `sar -P ALL interval count`. Same utilization story as `mpstat`, plus history when `sar` data collection is enabled.
