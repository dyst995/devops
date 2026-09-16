# Tasks — Monitoring CPU

Close `theory.md`. Install sysstat if the collectors are missing.

## lscpu (inventory)

1. Show architecture. Record CPU(s), threads per core, cores per socket, sockets, NUMA nodes, model name.
2. Check the notes’ multiply: sockets × cores × threads ≈ CPU(s). What is NUMA in one sentence?

## mpstat (boot average vs now — repeat)

3. Per-CPU plus `all`, **no** interval. What time window is that?
4. Same with interval 1, count 5. Contrast with task 3.
5. Read `%usr` `%sys` `%iowait` `%steal` `%idle`. High iowait vs steal — what do you blame?

## sar

6. Per-CPU, interval 1, count 1. Decode `-P ALL` and the two numbers.
7. Compare one busy core vs `all` if you generate a little load.

## Scenario

8. Is the VM saturated **now**, or only in the since-boot average? Use two views. Name the evidence. If `/var/log/sa/` exists, say how history would help “an hour ago.”
