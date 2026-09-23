# 01 — Shell (study)

A **shell** is the program between you and the kernel. You type commands (or a script does). The shell interprets them and asks the kernel to do the real work — open files, start processes, talk to hardware. You almost never talk to the kernel directly.

```
User / scripts  →  Shell (CLI)  →  Kernel  →  Hardware
```

| Layer | Role |
| --- | --- |
| **User** | You, or a script you wrote |
| **Shell** | Command interpreter (`bash`, `sh`, …) |
| **Kernel** | CPU, memory, processes, devices, file systems |
| **Hardware** | Disks, NIC, RAM, … |

Every Linux server you SSH into gives you a shell. CI jobs, Docker `ENTRYPOINT`s, Ansible, and cloud-init all run shell. Knowing *which* shell and how it talks to the kernel is the base of this folder.

## Types of shells

| Shell | Short name | Notes |
| --- | --- | --- |
| Bourne Shell | `sh` | Original Unix shell (1970s). Many scripts still start with `#!/bin/sh`. |
| C Shell | `csh` | Syntax closer to C. Less common on servers today. |
| Korn Shell | `ksh` | Bourne-compatible, extra features. Still seen on some Unix systems. |
| GNU Bourne-Again Shell | `bash` | Default interactive shell on most Linux distros. Bourne-compatible plus history, completion, better scripting. |

`bash` = **B**ourne-**A**gain **SH**ell — a GNU remake of `sh`. On most modern Linux systems `/bin/sh` is a symlink to `bash` or `dash`, but it still runs in a more POSIX / Bourne-compatible mode.

## Paths and prompts

The prompt tells you **which shell** you are in and **whether you are root**.

| Shell | Path | Non-root | Root |
| --- | --- | --- | --- |
| `sh` | `/bin/sh`, `/sbin/sh` | `$` | `#` |
| `csh` | `/bin/csh` | `%` | `#` |
| `ksh` | `/bin/ksh` | `$` | `#` |
| `bash` | `/bin/bash` | `bash-x.xx$` | `bash-x.xx#` |

- `$` or `%` → regular user. Only `csh` uses `%` for a normal user.
- `#` → root. Commands as root can change the whole system.
- Bash includes its version in the default prompt (`bash-5.2$`).

## Which shell is this?

- Login shell is stored in `/etc/passwd` (last field of your user line).
- `echo $SHELL` — login shell from the account.
- `echo $0` — name of the **current** shell process (a leading `-` often means a login shell).
