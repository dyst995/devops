# Monitoring memory (study)

RAM is finite. **Swap** is disk overflow ([swap](../../1. intro/05-swap/theory.md)). These tools show **how much is used** and **whether the machine is paging**.

| Command | Job |
| --- | --- |
| **`free`** | Snapshot of **RAM and swap** |
| **`vmstat`** | Processes, memory, paging, block I/O, interrupts, CPU — instant or repeating |

## free

```bash
free -h
```

`-h` = human-readable (`M`, `G`).

| Column | Meaning |
| --- | --- |
| **total** | Installed RAM / configured swap |
| **used** | In use (not including reclaimable cache, depending on `free` version) |
| **free** | Completely unused |
| **shared** | tmpfs / shared memory (often small) |
| **buff/cache** | Kernel **buffers + page cache**. **Not wasted** — can be given to apps when needed |
| **available** | Estimate still usable for **new** workloads (free + reclaimable cache) — **the number to trust** |

Linux **loves to fill RAM with cache**. Low **`free`** and high **`buff/cache`** is normal. Panic when **`available`** is tiny **and** swap is climbing.

## vmstat

You can set a **sampling interval** and watch near-real time. `-a` = **active/inactive** memory instead of the default buffer/cache split. First line of a repeating sample is often **since boot**; later lines are the live interval.

```bash
vmstat -a
vmstat -f                 # forks (tasks created) since boot
vmstat -w 1 3             # wide columns; every 1s, 3 samples
vmstat -s                 # summary counters (dump, not a table)
```

| Group | Columns | Meaning |
| --- | --- | --- |
| **procs** | `r` | Runnable (want CPU). High = CPU queue |
| | `b` | Blocked (usually I/O) |
| **memory** | `swpd` / `free` | Swap used / idle RAM (KB) |
| | `inact` / `active` | Inactive vs active pages (`-a`) |
| **swap** | `si` / `so` | Swap in / out (KB/s). Sustained `so` = RAM pressure |
| **io** | `bi` / `bo` | Block in/out (disk KB/s) |
| **system** | `in` / `cs` | Interrupts / context switches per second |
| **cpu** | `us sy id wa st` | user, system, idle, **iowait**, steal (same story as `mpstat`) |

`si`/`so` > 0 and climbing ≈ thrashing. `wa` high ≈ I/O wait.
