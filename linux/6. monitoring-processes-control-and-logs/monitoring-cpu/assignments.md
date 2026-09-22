# Assignments — Monitoring CPU

Close `commands.md`. Type and run. These commands are read-only. `mpstat`/`sar` may need the `sysstat` package — install only on a lab.

## CPU shape (`lscpu`)

### Easy

1. [ ] `lscpu`. Write sockets, cores, threads, model name.
2. [ ] From that output: is hyper-threading implied (threads > cores per socket)? One sentence.

### Medium

3. [ ] `lscpu` vs `top` (1 second glance, `q`). Does “CPU%” in `top` match a busy box or an idle one?
4. [ ] Someone read “CPU(s): 4” as four sockets. Use the sockets/cores/threads lines correctly.

### Hard

5. [ ] Combine: `lscpu` + `ps aux` — any process using a lot of CPU? `top` to confirm, `q`.
6. [ ] `lscpu` + `nproc` only if you already know it — otherwise count from `lscpu`. Write how many logical CPUs `mpstat -P ALL` should list.

## Utilization (`mpstat`, `sar`)

### Easy

1. [ ] `mpstat -P ALL` (since boot). Idle % high on a quiet VM?
2. [ ] `mpstat -P ALL 1 5` (live). Watch five samples.

### Medium

3. [ ] `sar -P ALL 1 1`. Compare one sample to `mpstat`. If `sar`/`mpstat` missing, `apt-cache search sysstat` on the lab.
4. [ ] Someone ran `mpstat` without `-P ALL` and saw only an average. Run both and say what `-P ALL` adds.

### Hard

5. [ ] While `mpstat -P ALL 1 5` runs, stress one CPU only if you have a safe `sleep`/loop in another terminal (`ping` is not much CPU). See if one CPU’s idle drops. Do not run a fork bomb.
6. [ ] Combine: `lscpu` logical count vs number of CPU lines in `mpstat -P ALL`. `top` `q`. If `%idle` is tiny on all CPUs, `ps aux` for the hog — do not `kill` it unless it is yours.
