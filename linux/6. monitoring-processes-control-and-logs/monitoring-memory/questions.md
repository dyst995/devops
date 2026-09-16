# Monitoring memory — Questions

Cover the Answers section. Answer first, then check.

1. What does `free` show? Why `free -h`?
2. In `free -h`, what are **buff/cache** and **available**? Which number answers “can I start another app?”
3. Is almost-empty **free** and large **buff/cache** a problem by itself?
4. What does `vmstat` report? Why set an interval?
5. What does `vmstat -a` change in the memory columns?
6. Decode `r`, `b`, `swpd`, `si`, `so`, `bi`/`bo`, `wa`.
7. Sample line: `si`/`so` = 0, `id` = 100. Healthy or thrashing?
8. What does `vmstat -f` print?
9. Decode `vmstat -w 1 3` and `vmstat -s`.
10. `free -h` vs `vmstat 1 5` — when do you use each?

---

## Answers

1. RAM and swap totals/used/free (and cache/available). Human units (M/G).
2. File cache + buffers (reclaimable). Estimate of RAM still usable for new work. **available**.
3. No — Linux caches files on purpose. Worry if **available** is low **and** swap is growing.
4. Processes, memory, paging, block I/O, interrupts, CPU. Near-real-time samples instead of one snapshot.
5. Shows **inact/active** instead of the default buff/cache split.
6. Runnable queue · blocked on I/O · swap used · swap in/out per sec · disk in/out · CPU iowait.
7. Healthy — idle, not paging.
8. Total **forks** (tasks created) since boot.
9. Wide output, every 1s, 3 times · memory/CPU/swap **summary** counters.
10. Quick “how much RAM/swap.” Live paging/CPU/I/O while you watch.
