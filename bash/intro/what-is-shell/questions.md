# What is a shell — Questions

Cover the Answers section. Answer first, then check.

1. What does the UNIX shell do with user commands? Where can those commands come from?
2. Besides talking to the kernel, what is the shell’s other main task? How do you configure it?
3. Are shell scripts compiled or interpreted? What does the shell do with each line?
4. What does a compiler produce, and how can that result still show up in a shell script?
5. What is `/etc/shells` for? Name at least four shells from the sample.
6. What is `rbash` vs `dash` vs `bash` vs `sh`?
7. How do you switch shells **in the current terminal**? Does that change `/etc/passwd`?
8. What is `$$`? What does `ps --pid $$` show in the notes when you go bash → sh → dash?
9. How do you leave the inner shell? How do you change the **login** shell for next time?
10. Why might `chsh -s /bin/zsh` fail even if zsh is installed?

---

## Answers

1. It interprets them. Typed by the user, or read from a shell script / shell program.
2. Provide a user environment. Resource/config files (`/etc/profile`, `~/.bashrc`, …).
3. Interpreted. Reads line by line and searches for those commands on the system.
4. A machine-readable executable. The script can run that executable as a command.
5. List of valid login shells. `/bin/sh`, `/bin/bash`, `/bin/rbash`, `/bin/dash` (and `/usr/bin/…` copies).
6. Restricted bash · small Debian `/bin/sh` · GNU Bourne-Again · Bourne/POSIX compatibility.
7. Enter the new shell’s name/path (`/bin/sh`). No — that only nests a process; login shell stays until `chsh`.
8. PID of the current shell. CMD column: `bash`, then `sh`, then `dash` (new PID each time).
9. `exit` or Ctrl-D. `chsh -s /path` with a path listed in `/etc/shells`.
10. `/bin/zsh` is not listed in `/etc/shells` (or zsh is not the path you gave).
