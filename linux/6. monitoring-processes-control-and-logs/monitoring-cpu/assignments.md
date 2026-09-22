# Assignments — monitoring CPU

Close `commands.md`. Recite, then type. Work on a **lab VM**. These tools observe; they do not need `kill -9`.

## `lscpu`

1. [ ] Show CPU **architecture** inventory. Recite sockets, cores, threads, NUMA nodes, and **model name** from the output.
2. [ ] Predict: “CPU(s)” vs “Core(s) per socket” vs “Thread(s) per core” — compute expected logical CPUs. Prove the product matches `CPU(s)` (or explain HT/offline).
3. [ ] Point at **NUMA** node count. Predict 1 on a small VM. Prove.
4. [ ] Recite **Architecture** (`x86_64` / `aarch64`). Match `uname -m` (optional).
5. [ ] Privilege: works as a normal user? Prove.
6. [ ] Wrong usage: extra operands. Harmless or error? Record.
7. [ ] Combined: model name vs `/proc/cpuinfo` `model name` (first CPU). Same string?
8. [ ] Human vs default: this command is already human-readable. No `-h` on the cheat sheet. Recite that.
9. [ ] Predict: a 2-vCPU VM reports 2 CPU(s) even if the hypervisor host has more. Prove you are looking at the **guest**.
10. [ ] Recite from memory: sockets, cores, threads, NUMA, model name.
11. [ ] Combined with `mpstat`: number of CPUs in `lscpu` vs CPU list in `mpstat -P ALL`. Same count?
12. [ ] Find **Hypervisor vendor** / virtualization if present. Recite guest vs bare metal.
13. [ ] What if `lscpu` is missing (`util-linux`)? Record.
14. [ ] Predict offline CPUs (`On-line CPU(s) list`). All online on a typical lab? Prove.
15. [ ] Combined: load average in `top` vs how many logical CPUs you just counted. When is load “high”?
16. [ ] Wrong usage: assuming “CPU MHz” is constant on a VM. Note min/max if printed.
17. [ ] Recite: this is **inventory**, not live utilization (that is `mpstat`/`sar`).
18. [ ] Combined with `nproc` if present: same number as CPU(s)?
19. [ ] What if NUMA is `0` or hidden on a tiny VM? Still record sockets/cores/threads.
20. [ ] Cleanup: none.

## `mpstat`

1. [ ] Show **per-CPU** utilization since **boot** (no interval). Recite: no interval = since boot, not “right now”.
2. [ ] Predict: `%idle` high on a quiet lab. Prove. Name `%usr` `%sys` `%iowait` `%idle`.
3. [ ] Run a **live** sample: every **1 second**, **5** samples, still **all** CPUs. Prove you got 5 reports (plus averages if printed).
4. [ ] Predict: live 1s/5 vs since-boot — the live `%idle` can differ. Prove both in one sitting.
5. [ ] Recite `-P ALL`: every CPU, not just a global average. Point at CPU `0` and CPU `1` (or `all`).
6. [ ] Privilege: normal user. Prove.
7. [ ] Wrong usage: interval without count — it runs forever. Interrupt after two lines. Do not leave it running.
8. [ ] Combined: start a short CPU hog **you own** (`yes >/dev/null` or a lab `stress` if present) in another terminal; live `mpstat` should show `%usr` jump; **stop the hog** (`kill` default TERM, not `-9` unless it ignores TERM). Do not kill `sshd`.
9. [ ] Human vs default: columns are percents. Recite `%iowait` ≠ idle (CPU waiting on disk).
10. [ ] Recite from memory: all CPUs since boot vs all CPUs interval 1 count 5.
11. [ ] Combined with `lscpu`: one row per logical CPU. Count rows vs CPU(s).
12. [ ] Predict `ALL` vs one CPU id `-P 0`: narrower. Optional one run on CPU 0; cheat sheet requires ALL.
13. [ ] What if `sysstat` is not installed? Command missing. Record; do not confuse with `sar`.
14. [ ] Combined with `sar -P ALL`: similar per-CPU idea. Note which one you used for “since boot” vs “1 1”.
15. [ ] Wrong usage: `mpstat -P ALL 1 5 9` extra args. Error or ignored?
16. [ ] Predict: first live sample sometimes looks like since-boot. Recite that gotcha if you see it; trust later samples.
17. [ ] Recite: `1 5` means interval then count, not “5 CPUs”.
18. [ ] Combined: quiet vs hog — screenshot in your head of `%idle` drop. Hog process must be gone after.
19. [ ] What if the VM has 1 CPU? `ALL` still works. Prove one CPU line plus `all`.
20. [ ] Cleanup: no `yes`/`stress` left. No infinite mpstat. `jobs` empty.

## `sar`

1. [ ] Show **per-CPU** stats with interval **1 second** and count **1** sample, **all** CPUs. Recite interval then count.
2. [ ] Predict: `1 1` is a single snapshot, not a boot average like `mpstat` with no interval. Prove by comparing both.
3. [ ] Point at `%user` `%system` `%iowait` `%idle` (names may match mpstat closely). Recite one difference in column spelling if any.
4. [ ] Privilege: normal user. Prove. (Reading historical `/var/log/sa/` may differ; this drill is live `1 1`.)
5. [ ] Wrong usage: `sar -P ALL` with **no** interval — may dump today’s file or error. Record; then use `1 1` as in the sheet.
6. [ ] Combined: `sar -P ALL 1 1` vs `mpstat -P ALL 1 5` — same `-P ALL` idea. Recite both from memory.
7. [ ] Human vs default: header includes hostname and date. Prove.
8. [ ] Recite from memory: `-P ALL`, interval 1, count 1.
9. [ ] Combined with `/var/log/sa/` (logs topic): `sar` can read daily sa files. List `sa/` if present; do not require a historical report for this sheet.
10. [ ] Predict: count `1` vs `5` — how many samples. Optional `1 5` once; cheat sheet is `1 1`.
11. [ ] What if `sysstat` is installed but `sar` data collection is off? Live `1 1` still works. Prove.
12. [ ] Combined with `lscpu`: CPU rows vs logical CPU count.
13. [ ] Wrong usage: `-P ALL 1` forever. Interrupt. Always pass count for practice.
14. [ ] Recite: this is CPU (processor) stats, not memory `free`.
15. [ ] Combined: quiet lab `%idle` high on both `sar` and `mpstat`. Agree?
16. [ ] Predict `ALL` includes an `all` average line. Point at it.
17. [ ] Privilege vs `sudo sar`: needed only if files in `sa/` are root-only. Live sample should work without.
18. [ ] What if the binary is missing? Same package as `mpstat`. Record.
19. [ ] Recite interval vs count order: time between samples, then how many.
20. [ ] Cleanup: no leftover `sar` with missing count. No CPU hogs.
