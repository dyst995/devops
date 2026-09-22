# Assignments — Monitoring memory

Close `commands.md`. Type and run. Read-only except you already know `swapoff` is dangerous — do not turn swap off here. Trust `free` **available**, not only `free`.

## `free`

### Easy

1. [ ] `free -h`. Write total, used, available RAM, and swap.
2. [ ] Compare to `/proc/swaps` (`cat`) from the swap topic. Same swap total?

### Medium

3. [ ] `free` without `-h` vs `-h`. Then look at **available** vs **free**. Course: trust available.
4. [ ] Someone says “we are out of RAM” because `used` looks high (cache). Read `available` / buff/cache. One sentence.

### Hard

5. [ ] `free -h` + `ps aux` (RSS/MEM%). Name one large process. Do not kill it unless it is yours.
6. [ ] Combine: `free -h`, `df -h` (disk is not RAM), `lsblk`. If swap used is growing, `vmstat` in the next set — here just record swap used.

## `vmstat`

### Easy

1. [ ] `vmstat -a` once. Glance at memory and `si`/`so` (swap in/out).
2. [ ] `vmstat -f` (forks since boot) and `vmstat -s` (summary). Do not memorize every counter.

### Medium

3. [ ] `vmstat -w 1 3` (live, wide). Three lines after the header — is `si`/`so` zero on a quiet VM?
4. [ ] Someone ran `vmstat` with no args and read the first line as “now.” The first stats line is often since boot; use interval/count for live. Run `-w 1 3`.

### Hard

5. [ ] `vmstat -w 1 5` while you start a short `sleep` or `find` in another window. Any jump in `r` (run queue) or CPU columns?
6. [ ] Combine: `free -h` + `vmstat -a` + `lscpu`. If `so` is nonzero, swap is active — `cat /proc/swaps`. Do not `swapoff`.
