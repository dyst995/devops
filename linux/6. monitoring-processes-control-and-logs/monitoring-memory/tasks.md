# Tasks — Monitoring memory

Close `theory.md`. Do not unbounded-hog the hypervisor.

## free

1. Human-readable RAM and swap. Recite total, used, free, shared, buff/cache, available.
2. Predict: low **free** but high cache — crisis or normal? Which column answers “can I start another app?”
3. This box: read available vs swap used. Tiny available **and** climbing swap — panic or not?

## vmstat (repeat columns)

4. Active/inactive memory view. Read `r` `b` `si` `so` `wa`. Quiet machine: what should `si`/`so` be?
5. Forks since boot.
6. Wide columns, interval 1, 3 samples. Which line is since-boot vs live?
7. Summary counters dump.

## Scenario

8. Can we add ~500 MiB RSS without dying? Yes/no with **available** (and swap). Name the figure you trusted.
9. Sustained `so` — what is happening (notes: RAM pressure / thrashing)?
