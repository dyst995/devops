# Commands to memorize

```bash
free -h                      # RAM and swap: total/used/free/cache; trust "available"

vmstat -a                    # snapshot: run/block queues, RAM, swap in/out, I/O, CPU (active/inactive mem)
vmstat -f                    # forks (tasks created) since boot
vmstat -w 1 3                # wide columns; sample every 1 second, 3 times (live)
vmstat -s                    # summary counters (pages, swap, CPU ticks, …)
```
