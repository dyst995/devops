# Commands to memorize

```bash
lscpu                         # CPU architecture: sockets, cores, threads, NUMA, model name

mpstat -P ALL                 # per-CPU utilization; no interval = since boot
mpstat -P ALL 1 5             # live: every 1s, 5 samples (not only boot average)

sar -P ALL 1 1                # per-CPU stats; interval 1 second, count 1 sample
```
