# What is a shell

The **UNIX shell** is a program that **interprets user commands**. Those commands are either:

- typed by you in a terminal, or
- **read from a file** called a **shell script** (or shell program)

The shell then asks the **kernel** to do the real work (run programs, open files, talk to devices).

Apart from passing commands to the kernel, the shell’s other main job is to provide a **user environment** — prompt, variables, aliases, umask, and so on. You configure that environment with **shell resource files** (for Bash: `/etc/profile`, `~/.bash_profile`, `~/.bashrc`, …).

**Memory hook:** shell = interpreter + your personal environment. Kernel = the actual OS.

## Interpreted, not compiled

**Shell scripts are interpreted, not compiled.**

| | Shell script | Compiled program |
| --- | --- | --- |
| What happens | The shell reads the file **line by line**, finds each command on the system, and runs it | A **compiler** turns source into **machine-readable** form — an **executable** file |
| When | Every time you run the script | Once at build time; then you just run the binary |
| Result | Still a text file of commands | A binary that a **shell script can call** like any other command |

**Memory hook:** script = recipe the cook (shell) reads as it goes. Compiler = meal already cooked; the shell only serves it.

## Known shells: `/etc/shells`

**`/etc/shells`** lists **valid login shells** on this Linux system. `chsh` (change login shell) will only accept a path that appears here.

```text
$ cat /etc/shells
# /etc/shells: valid login shells
/bin/sh
/bin/bash
/usr/bin/bash
/bin/rbash
/usr/bin/rbash
/bin/dash
/usr/bin/dash
```

| Path | Typical role |
| --- | --- |
| `/bin/sh` | POSIX / Bourne-compatible (often a symlink to bash or dash) |
| `/bin/bash` | GNU Bash — usual interactive shell |
| `/bin/rbash` | **Restricted** bash (limited cd, PATH, …) |
| `/bin/dash` | Debian Almquist shell — small, fast, common as `/bin/sh` on Debian/Ubuntu |

**Memory hook:** if it is not in `/etc/shells`, it is not a legal **login** shell on this box.

## Switching shells in the current terminal

To try another shell, **type its path** (or name if it is on `PATH`) in the **already open** terminal. That starts a **new** shell process **inside** the old one; you are not changing your login shell in `/etc/passwd`.

`$$` is the PID of the **current** shell. `ps --pid $$` shows which program that PID is.

```text
$ ps --pid $$
    PID TTY          TIME CMD
    984 pts/0    00:00:00 bash

$ /bin/sh
$ ps --pid $$
    PID TTY          TIME CMD
   1034 pts/0    00:00:00 sh

$ /bin/dash
$ ps --pid $$
    PID TTY          TIME CMD
   1036 pts/0    00:00:00 dash
```

Each nested shell gets a **new PID**. `exit` (or Ctrl-D) leaves the inner shell and returns to the outer one (bash, in the first line).

To change the **login** shell permanently: `chsh -s /bin/bash` (the target must be in `/etc/shells`).

**Memory hook:** type `/bin/sh` = try it now. `ps --pid $$` = what am I? `chsh` = next login.
