# Labs — Monitoring CPU

**Where:** Rocky VM with `sysstat` installed (`dnf install sysstat`).

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

Run `lscpu`. Note sockets, cores, threads, model name.

## Lab 2

`mpstat -P ALL` with no interval. Then `mpstat -P ALL 1 5`.

## Lab 3

`sar -P ALL 1 1`. Optional: generate some CPU load in another terminal (`yes > /dev/null` for a few seconds, then Ctrl-C) and repeat `mpstat` / `sar`.

## Job and cert labs

## Lab 4

Pin a hog to one core if `taskset` exists. `mpstat -P ALL 1 5` and see one CPU at ~100%.

## Lab 5

Leave `sar` collecting (`sysstat` timer enabled). After a few minutes, `ls /var/log/sa/` and `sar -P ALL` without interval (today’s file). This is how you answer “was CPU high last night?”

## Lab 6

On a VM, look at `%steal` in `mpstat` if the column exists. Ticket: “noisy neighbor.”
