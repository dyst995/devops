# Monitoring CPU — Questions

Cover the Answers section. Answer first, then check.

1. `lscpu` vs `mpstat` vs `sar` — one sentence each.
2. From the sample `lscpu`: sockets, cores per socket, threads per core, `CPU(s)`. How do they multiply?
3. What is a NUMA node in one phrase?
4. `mpstat` default report type? What do stats mean if you **omit** an interval?
5. What does `mpstat -P ALL` add compared with one CPU?
6. Recite what `%usr`, `%sys`, `%iowait`, `%steal`, `%idle` mean. High iowait vs high steal — what do you suspect?
7. Decode `sar -P ALL 1 1`.
8. In the `sar` sample, is the load even across cores? How do you see that?
9. You need “how many cores does this VM have?” vs “is core 0 pegged right now?”

---

## Answers

1. Hardware topology · per-CPU utilization (default since boot if no interval) · per-CPU utilization, live or from sysstat history.
2. 4 × 10 × 1 = 40 logical CPUs (`CPU(s): 40`).
3. A memory domain — some RAM is closer to some sockets.
4. CPU utilization. Averages **since boot**, not a short live window.
5. A line per logical CPU plus **`all`**.
6. User · kernel · waiting on I/O · hypervisor took time · idle. Disk/net wait · VM not getting CPU from the host.
7. All CPUs, sample every **1** second, **1** time.
8. No — CPU 0 ~35% user, CPU 3 ~100% idle. Compare per-CPU rows, not only `all`.
9. `lscpu` · `mpstat -P ALL 1 5` or `sar -P ALL 1 5`
