# Assignments — monitoring memory

Close `commands.md`. Recite, then type. Work on a **lab VM**. Observation only; do not `sysctl vm.panic_on_oom` or force OOM.

## `free`

1. [ ] Show RAM and swap in **human** units. Recite columns: total, used, free, cache/buff, and **available**. Trust **available** for “can I start another process?”
2. [ ] Predict: `free` (bytes) vs `-h` (MiB/GiB). Prove both; say why `-h` is the cheat-sheet form.
3. [ ] Point at **swap** total/used. Predict 0 used on a quiet lab (or not). Prove.
4. [ ] Recite: used + free is **not** the whole story because cache is reclaimable. Available ≈ what you should quote in an interview.
5. [ ] Privilege: normal user. Prove.
6. [ ] Wrong usage: `free -h -h` or unknown flag. Error?
7. [ ] Combined: available vs `lscpu` has nothing to do with RAM size. RAM is this command. Point at total.
8. [ ] Human vs default: `-h` powers of 1024 (or 1000 on some versions). Note the unit suffix.
9. [ ] Predict: after dropping caches (do **not** drop_caches on production; skip unless lab console). Without that, just note cache column > 0 is normal.
10. [ ] Recite from memory: human RAM+swap; trust available.
11. [ ] Combined with `vmstat`: free/cache vs `free`’s free/buff/cache. Same order of magnitude?
12. [ ] What if there is **no swap**? Swap line zeros. Recite: no swap ≠ no RAM.
13. [ ] Combined: “used” high but “available” high — still OK. Say that out loud using **your** numbers.
14. [ ] Wrong usage: parsing only the `free` column for capacity planning. Why the sheet says trust available.
15. [ ] Predict: starting a large `dd` to `/dev/zero` in memory (do **not** eat all RAM). Skip hog if it would OOM the lab. Optional small allocation.
16. [ ] Recite total vs used vs available in one sentence for this VM.
17. [ ] Combined with `top` memory header (process topic): similar totals? Glance if you already know `top`.
18. [ ] What if `free` is busybox? Still `-h` or not? Record.
19. [ ] Privilege: no sudo needed. Prove.
20. [ ] Cleanup: no memory hogs. `free -h` still looks healthy.

## `vmstat`

1. [ ] Take a **snapshot** with **active/inactive** memory columns. Recite: run/block queues, RAM, swap in/out, I/O, CPU. Point at `r`, `b`, `si`, `so`, `us`, `id`.
2. [ ] Predict: `r` runnable vs `b` blocked. Quiet lab: both near 0. Prove.
3. [ ] Show **forks** (tasks created) **since boot**. Recite `-f` is a counter, not a live graph. Note the number.
4. [ ] Predict: fork count only goes up. Run `-f` twice; second ≥ first.
5. [ ] Run **wide** columns, sample every **1** second, **3** times (live). Recite: first line is often since-boot; later lines are the interval. Prove you got 3 live-ish rows.
6. [ ] Predict `-w`: wide so columns do not smash. Compare one narrow snapshot vs wide if you can.
7. [ ] Dump **summary counters** (pages, swap, CPU ticks, …). Recite `-s` is a list of totals, not the table view.
8. [ ] Privilege: normal user. Prove all four forms.
9. [ ] Wrong usage: `vmstat 1` with no count — runs forever. Interrupt after two lines. Do not leave it.
10. [ ] Combined: `si`/`so` swap in/out vs `free -h` swap used. If `si`/`so` are 0 and swap used is 0, consistent.
11. [ ] Recite from memory: `-a` snapshot, `-f` forks, `-w 1 3` live wide, `-s` summary.
12. [ ] Combined with CPU topic: `us`/`sy`/`id` vs `mpstat` percents. Same story on a quiet VM?
13. [ ] Predict `-a`: active vs inactive memory. Point at those columns (or say your vmstat version labeled them).
14. [ ] What if `1 3` vs `1 3` with `-w`: interval then count. Recite order.
15. [ ] Combined: fork bomb is **out of scope**. Do not. `-f` is read-only.
16. [ ] Human vs default: table is not `-h` bytes; numbers are pages/kB depending on version. Recite units from the header/man line you see.
17. [ ] Wrong usage: `-f 1 3` mixing forks with interval. Error or ignore? Then run the sheet forms separately.
18. [ ] Recite: `-w 1 3` is live sampling; `-a` and `-s` and `-f` are snapshots/counters.
19. [ ] Combined with storage topic: this file’s `vmstat` is memory/CPU/forks; disk `-d`/`-p` is the other assignments file. Do not require those flags here.
20. [ ] Cleanup: no infinite `vmstat 1`. No experiments that consume all RAM.
