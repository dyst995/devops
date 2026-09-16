# Commands to memorize

```bash
top                          # live, updating process list (CPU/MEM); q to quit

ps aux                       # snapshot: all users (a), user columns (u), including daemons (x)

kill 156                     # SIGTERM (15) — ask PID 156 to exit cleanly
kill -9 156                  # SIGKILL — force; process cannot ignore it

killall top                  # SIGTERM every process named top
killall -9 top               # SIGKILL by name
killall -KILL top            # same as -9; signal by name not number
```
