# Tasks — Monitoring memory

Close `theory.md`. Do not unbounded-hog the hypervisor or force thrashing on a shared lab.

## Warm-up

1. Match tool to job: snapshot of RAM/swap vs near-real-time paging / queues (`free` / `vmstat`).
2. Predict: low **free** but high cache — crisis or normal? Which column answers “can I start another app?”

## free

3. Human-readable RAM and swap (`free -h`). Recite total, used, free, shared, buff/cache, available.
4. On this box: record available vs swap used. Tiny available **and** climbing swap — panic or not?
5. Why does Linux love to fill RAM with cache? Is buff/cache “wasted”?
6. Trust **available**, not only **free**. Say why in one sentence (free + reclaimable cache).

## vmstat — columns and views

7. Active/inactive memory view (`vmstat -a`). Read `r` `b` `si` `so` `wa`. Quiet machine: what should `si`/`so` be?
8. Forks since boot (`vmstat -f`). What does that number mean?
9. Wide columns, interval 1, 3 samples (`vmstat -w 1 3`). Which line is since-boot vs live?
10. Summary counters dump (`vmstat -s`). Name two counters you recognize (pages, swap, forks, CPU ticks).
11. CPU block in `vmstat`: `us sy id wa st` — same story as `mpstat`. Point to `wa` and relate to iowait.

## Construct / distinguish

12. Write the five commands from `commands.md` from memory. Run each once.
13. Distinguish: `free -h` (capacity left) vs `vmstat` (paging / queues / live I/O wait). When would you open each first?
14. Predict: `si`/`so` > 0 and climbing — thrashing or healthy cache use?

## Scenario

15. Can we add ~500 MiB RSS without dying? Yes/no with **available** (and swap). Name the figure you trusted.
16. Sustained `so` on a live `vmstat 1` sample — what is happening (notes: RAM pressure / thrashing)? What do you check next (`free -h` available, top memory hogs you own)?
17. Ticket: “free is almost zero, the box must be OOM.” You see hundreds of MiB in buff/cache and large **available**. Reply using only this topic’s columns.
18. Ticket: swap used is climbing and `so` stays non-zero. Panic or not? What evidence would make you panic?
