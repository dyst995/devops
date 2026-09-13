# 01 — Shell — Questions

Cover the Answers section. Say the answer out loud or write it down, then check.

1. What is a shell, in one sentence?
2. Draw or list the layers from the user down to hardware. Where does the shell sit?
3. Name the four classic shells from your notes, with their short names.
4. What does “bash” stand for, and why does that name matter?
5. What is the path of each shell: `sh`, `csh`, `ksh`, `bash`?
6. Bourne Shell is available in two paths. What are they?
7. What is the default non-root prompt for `sh`, `csh`, `ksh`, and `bash`?
8. What is the default **root** prompt for all four shells?
9. Which shell is the only one whose normal-user prompt is `%`?
10. You see `bash-5.2#` on the screen. Which shell are you in, and are you root?
11. You see `$`. Can you be sure which shell you are in? Why or why not?
12. Who talks to the kernel for you when you type `ls` — the hardware, the shell, or both?
13. Why do so many scripts still start with `#!/bin/sh` even on a bash system?
14. A CI job fails with “syntax error near unexpected token” in a script that uses `[[ ]]`. What is a likely shell-related cause?

---

## Answers

1. A program that provides an interface between the user and the OS kernel.
2. User → Shell → Kernel → Hardware. The shell sits between the user and the kernel.
3. Bourne Shell (`sh`), C Shell (`csh`), Korn Shell (`ksh`), GNU Bourne-Again Shell (`bash`).
4. Bourne-Again Shell. It is a GNU remake / extension of the original Bourne Shell, so it is Bourne-compatible plus extra features.
5. `sh`: `/bin/sh` (and `/sbin/sh`); `csh`: `/bin/csh`; `ksh`: `/bin/ksh`; `bash`: `/bin/bash`.
6. `/bin/sh` and `/sbin/sh`.
7. `sh`: `$` · `csh`: `%` · `ksh`: `$` · `bash`: `bash-x.xx$`.
8. `#` for all of them. Bash shows `bash-x.xx#`.
9. C Shell (`csh`).
10. Bash, and yes — `#` means root.
11. No. Both `sh` and `ksh` (and many configured bash prompts) use `$` for a normal user. `$` only tells you “not root” (and not csh).
12. The shell interprets `ls` and asks the kernel to start the `ls` process and talk to the file system / hardware.
13. `sh` is the historical, portable Unix shell. A script written for `sh` runs on more systems. On Linux `/bin/sh` is often a symlink, but it still aims at POSIX / Bourne behavior.
14. The script is running under `sh` (or dash), not bash. `[[ ]]` is a bash/ksh feature, not POSIX `sh`.
