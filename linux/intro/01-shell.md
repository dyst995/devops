# 01 — Shell

A **shell** is a program that provides an interface between the user and the OS kernel.

You type commands. The shell interprets them and asks the kernel to do the real work (open files, start processes, talk to hardware). You almost never talk to the kernel directly.

```
User  →  Shell (CLI)  →  Kernel  →  Hardware
              ↑
         scripts / programs
```

The same idea in layers:

- **User** — you, or a script you wrote
- **Shell** — command interpreter (`bash`, `sh`, …)
- **Kernel** — manages CPU, memory, processes, devices, file systems
- **Hardware** — disks, NIC, RAM, …

## Why this matters for DevOps

Every Linux server you SSH into gives you a shell. CI jobs, Docker `ENTRYPOINT`s, Ansible, and cloud-init all run shell. Knowing *which* shell and *how* it talks to the kernel is the base of everything else in this folder.

## Types of shells

| Shell | Short name | Notes |
| --- | --- | --- |
| The Bourne Shell | `sh` | The original Unix shell (1970s). Many scripts still start with `#!/bin/sh`. |
| The C Shell | `csh` | Syntax looks more like the C language. Less common on servers today. |
| The Korn Shell | `ksh` | Bourne-compatible, with extra features. Still seen on some Unix systems. |
| The GNU Bourne-Again Shell | `bash` | Default interactive shell on most Linux distros. Bourne-compatible + history, completion, better scripting. |

**Memory hook:** `sh` is the ancestor. `bash` = **B**ourne-**A**gain **SH**ell — a GNU remake of `sh`.

## Paths and default prompts

The prompt tells you two things at a glance: **which shell** you are in, and **whether you are root**.

| Shell | Path | Default prompt (non-root) | Default prompt (root) |
| --- | --- | --- | --- |
| Bourne Shell (`sh`) | `/bin/sh` and `/sbin/sh` | `$` | `#` |
| C Shell (`csh`) | `/bin/csh` | `%` | `#` |
| Korn Shell (`ksh`) | `/bin/ksh` | `$` | `#` |
| GNU Bash (`bash`) | `/bin/bash` | `bash-x.xx$` | `bash-x.xx#` |

**Memory hook:**

- `$` or `%` → regular user
- `#` → root (superuser). Think “hash = extra power”
- Only `csh` uses `%` for a normal user
- Bash includes its version in the default prompt (`bash-5.2$`)

On most modern Linux systems `/bin/sh` is a symlink to `bash` or `dash`, but it still runs in a more POSIX / Bourne-compatible mode.

## Useful related facts (not in the original table, but you will need them)

- Your login shell is stored in `/etc/passwd` (last field of your user line).
- `echo $SHELL` shows the login shell; `echo $0` shows the shell of the *current* process.
- Root’s `#` prompt is a warning: commands run as root can change the whole system.
