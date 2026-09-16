# Labs — Monitoring memory

**Where:** any Linux. `vmstat` is in `procps-ng` / `sysstat` depending on flags.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

`free -h`. Decide which column you would use to answer “can I start another app?” Check theory after — do not write the answer here.

## Lab 2

`vmstat -a`, `vmstat -f`, `vmstat -w 1 3`, `vmstat -s`.

## Job and cert labs

## Lab 3

Read `MemAvailable` from `/proc/meminfo`. Compare with `free -h`. Ticket: “do we OOM if we start this JVM?”

## Lab 4

Run a memory hog in a limited way (`stress --vm 1 --vm-bytes 256M` if installed). Watch `free`, `vmstat 1`, and `dmesg` for OOM. Stop the hog. Do not freeze the hypervisor host.

## Lab 5

`si`/`so` columns in `vmstat 1` while you force a little swap (small VM + hog). Relate to the swap topic.
