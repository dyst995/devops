# Tasks — Monitoring CPU

Close `theory.md`. Install `sysstat` if the collectors are missing. Do not fork-bomb or unbounded-hog the hypervisor.

## Warm-up

1. Match tool to job from the notes: architecture inventory vs per-CPU utilization vs live/history sample (`lscpu` / `mpstat` / `sar`).
2. Memory hook: `lscpu` = what chips you have. `mpstat` / `sar` = how busy each core is. Say it back.
3. Predict: do you need more CPUs, or is the box waiting on disk? Which columns will decide?

## lscpu (inventory)

4. Show architecture. Record CPU(s), Thread(s) per core, Core(s) per socket, Socket(s), NUMA node(s), Model name.
5. Check the notes’ multiply: sockets × cores × threads ≈ CPU(s). Does your box match?
6. What is NUMA in one sentence (notes: RAM is not equally far from every socket)?
7. Threads per core: 1 vs 2 — what does that imply about hyperthreading / SMT?

## mpstat (boot average vs now)

8. Per-CPU plus `all`, **no** interval (`mpstat -P ALL`). What time window is that?
9. Same with interval 1, count 5 (`mpstat -P ALL 1 5`). Contrast with task 8 — boot average vs live samples.
10. Recite `%usr` `%sys` `%iowait` `%steal` `%idle` in one line each.
11. High `%iowait` vs high `%steal` — what do you blame (storage vs noisy neighbor on the hypervisor)?
12. Quiet VM: expect `%idle` high. Confirm on your box for both boot-average and a live sample.

## sar

13. Per-CPU, interval 1, count 1 (`sar -P ALL 1 1`). Decode `-P ALL` and the two numbers.
14. Compare one busy core vs the `all` line if you generate a little load (a short loop is fine; no fork bomb). Does `all` hide a hot core?
15. If `/var/log/sa/` exists, say how `sar` history would help “what happened an hour ago.” If missing, state that collectors are not running.

## Construct / distinguish

16. Write the three commands from `commands.md` from memory. Run each once.
17. Distinguish: no-interval `mpstat` vs `mpstat … 1 5` vs `sar -P ALL 1 1`. Same story or different windows?
18. Someone read “CPU(s): 4” as four sockets. Correct them using sockets/cores/threads lines.

## Scenario

19. Is the VM saturated **now**, or only in the since-boot average? Use two views. Name the evidence (`%idle` / `%usr` / `%iowait` / `%steal`).
20. Ticket: “CPU is at 100%.” You find high `%iowait`, not `%usr`. What do you investigate next (storage), and what do you **not** buy first (more vCPUs)?
