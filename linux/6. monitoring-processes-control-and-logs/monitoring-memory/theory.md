# Monitoring memory

RAM is finite. **Swap** is disk overflow ([swap theory](../../1. intro/05-swap/theory.md)). These tools show **how much is used** and **whether the machine is paging**.

| Command | Job |
| --- | --- |
| **`free`** | Snapshot of **RAM and swap** (total / used / free / cache / available) |
| **`vmstat`** | Instant (or repeating) view of **processes, memory, paging, block I/O, interrupts, CPU** |

**Memory hook:** `free -h` = “how much RAM is left?” `vmstat` = “is it swapping / waiting on I/O right now?”

## free

Show information about **operating memory** (RAM) and swap.

```bash
free -h
```

`-h` = **human-readable** (`M`, `G`).

```text
              total        used        free      shared  buff/cache   available
Mem:           992M         78M        324M        6.8M        590M        746M
Swap:          2.0G         70Mi       1.9G
```

| Column | Meaning |
| --- | --- |
| **total** | Installed RAM / configured swap |
| **used** | In use (not including reclaimable cache, depending on `free` version) |
| **free** | Completely unused |
| **shared** | tmpfs / shared memory (often small) |
| **buff/cache** | Kernel **buffers + page cache** — file data kept in RAM. This is **not wasted**; it can be given to apps when needed |
| **available** | Estimate of RAM still usable for **new** workloads (free + reclaimable cache) — the number to trust |

This box: **992M** RAM, only **78M** “used,” **590M** cache, **746M available**. Swap **2G** with **70M** used — a little paging, not a crisis.

Linux **loves to fill RAM with cache**. Low **`free`** and high **`buff/cache`** is normal. Panic when **`available`** is tiny **and** swap is climbing.

**Memory hook:** read **available**, not only **free**. Cache is a spare tank.

## vmstat

Reports on **processes, memory, paging, block I/O, interrupts, and CPU**. You can set a **sampling interval** and watch activity in **near-real time**.

```bash
vmstat -a
```

`-a` = show **active/inactive** memory instead of the default buffer/cache split.

```text
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
r  b   swpd   free  inact active   si   so    bi    bo   in   cs us sy id wa st
1  0      0 332128  85800 505656    0    0     5    10   13   17  0  0 100  0  0
```

| Group | Columns | Meaning |
| --- | --- | --- |
| **procs** | `r` | Runnable (want CPU). High `r` = CPU queue |
| | `b` | Blocked (usually I/O). High `b` = waiting on disk |
| **memory** | `swpd` | Swap used (KB) |
| | `free` | Idle RAM |
| | `inact` / `active` | Inactive vs active pages (`-a`) |
| **swap** | `si` / `so` | **Swap in** / **swap out** (KB/s). Sustained `so` = RAM pressure |
| **io** | `bi` / `bo` | Block in/out (disk KB/s) |
| **system** | `in` / `cs` | Interrupts / context switches per second |
| **cpu** | `us sy id wa st` | user, system, idle, **iowait**, steal (same story as `mpstat`) |

Sample: `r=1`, `b=0`, `si=so=0`, `id=100` — quiet machine, not swapping.

```bash
vmstat -f
```

```text
        11703 forks
```

**Total number of tasks created since last boot** (fork count).

```bash
vmstat -w 1 3
```

**Wide** columns (`-w`), interval **1** second, **3** samples. First line is often since-boot; later lines are the live interval — same pattern as `vmstat 1 3`.

```bash
vmstat -s
```

**Summary** counters (total memory, pages swapped, forks, CPU ticks, …) — a dump, not a table.

**Memory hook:** `si`/`so` > 0 and climbing = thrashing. `wa` high = I/O. `vmstat 1` = live. `-f` = forks since boot. `-s` = totals. `-a` = active/inactive.
