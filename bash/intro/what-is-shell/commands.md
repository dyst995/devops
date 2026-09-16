# Commands to memorize

```bash
cat /etc/shells              # valid login shells on this system (chsh only accepts these)

ps --pid $$                  # show the current shell process ($$ = this shell’s PID)
/bin/sh                      # start a nested Bourne/POSIX shell in this terminal
/bin/dash                    # start dash (common /bin/sh on Debian)
/bin/bash                    # start bash
exit                         # leave the inner shell; back to the previous one

chsh -s /bin/bash            # set login shell (must be listed in /etc/shells; next login)
```
