# Commands to memorize

```bash
echo $?                      # exit status of the previous command (0–255)

# produce / observe statuses from the notes (do not need to memorize every demo)
let "var1 = 1/0"             # often status 1 (catchall / divide by zero)
Illegal_command              # 127 — command not found ($PATH or typo)
/dev/null                    # 126 — invoked, cannot execute
exit 3.14159                 # 128 — invalid argument to exit
exit -1                      # 255 — status out of range
# Ctrl-C during a script     # 130 = 128 + 2 (SIGINT)
# kill -9 …                  # 137 = 128 + 9 (SIGKILL)
```
