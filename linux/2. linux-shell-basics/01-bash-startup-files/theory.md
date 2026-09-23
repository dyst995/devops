# 01 — Bash Startup Files

**Startup files** are scripts Bash reads and **executes when it starts**. Which files run depends on **how** the shell was started — not on which machine you are on.

Two questions decide the path:

1. **Interactive?** Can you type commands? (not a script driving the shell)
2. **Login?** Did you get this shell by logging in (SSH, console), or did you start Bash with `--login`?

```
How was Bash started?
        │
        ├─ interactive + login   (SSH / console, or bash --login)
        │     → /etc/profile
        │     → first readable of: ~/.bash_profile  ~/.bash_login  ~/.profile
        │     → on logout: ~/.bash_logout
        │
        └─ interactive + non-login
              → ~/.bashrc
```

## Interactive login shell

**Interactive** means you can enter commands. The shell is not running only because a script launched it.

**Login shell** means you got the shell **after authenticating** — usually username and password (SSH, a TTY/console login). To make **this** Bash follow that same startup-file path **without** logging in again, start it with `bash --login` (or `bash -l`).

### `su` is not a login-shell command

`su` (**s**ubstitute **u**ser) **switches you to another account**. With no name, that account is **root**. You type **root’s** password (or the named user’s). You become that UID. That is the whole job.

`bash --login` does **not** switch user and does **not** become root. It starts a **new Bash as you** and tells it to read **login** startup files. Use it to test `/etc/profile` and `~/.bash_profile` without a new SSH.

| | `su` | `bash --login` |
| --- | --- | --- |
| Job | Become **root** (or `su user`) | Start a **login shell** as **you** |
| Password | Root’s (or that user’s) | None |
| UID | Changes | Stays yours |
| Startup files | Whatever shell **root** (or that user) runs | **Your** profile files |

`su -` (same as `su -l`) is still **switch to root**. The `-` only gives root a **clean login environment** (their home, their `PATH`). It is not “the other way to start a login shell.” `su` without `-` still becomes root, but keeps more of **your** environment and current directory.

### Files read

| Order | File | Scope |
| --- | --- | --- |
| 1 | `/etc/profile` | System-wide. Runs for **every** login shell on the box. |
| 2 | **First existing readable** of: `~/.bash_profile`, then `~/.bash_login`, then `~/.profile` | Per-user. **Only one** of these three is read. |
| logout | `~/.bash_logout` | Per-user. Runs when that login shell **exits**. |

**Memory hook:** login = **profile** family. System first (`/etc/profile`), then **one** personal file. Logout is its own file.

The personal trio is tried **in that order**. If `~/.bash_profile` exists and is readable, `~/.bash_login` and `~/.profile` are **skipped**.

Typical contents of a login profile: `PATH`, `umask`, environment variables that child processes should inherit.

## Interactive non-login shell

**Non-login** means you did **not** authenticate again. Classic example from the notes: you open a terminal from an **icon** or **menu** on a graphical desktop. You are already logged into the desktop; the new terminal is just another Bash.

### Files read

| File | Scope |
| --- | --- |
| `~/.bashrc` | Per-user. This is the file for aliases, functions, prompt (`PS1`), `umask` for that window, completion, etc. |

`/etc/profile` is **not** read. The `~/.bash_profile` / `~/.profile` trio is **not** read.

**Memory hook:** non-login = **rc** only. “rc” = run commands for this interactive session.

## Why `~/.bashrc` is “usually referred to” in `~/.bash_profile`

A login shell does **not** read `~/.bashrc` by itself. A GUI terminal often does **not** read `~/.bash_profile`.

If you put aliases only in `~/.bashrc`, an SSH login would miss them. If you put `PATH` only in `~/.bash_profile`, a desktop terminal would miss it.

The usual fix: **one file sources the other**. `~/.bash_profile` (login) pulls in `~/.bashrc` (interactive setup):

```bash
# ~/.bash_profile
# login-only env first, then:
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi
```

“Referred to” here means **sourced**, not merely mentioned. Sourcing runs the file **in the current shell** (not a subshell), so `export`, aliases, and functions stay.

### `.` vs `source`

| | `.` (dot) | `source` |
| --- | --- | --- |
| Meaning in Bash | Same: read and run this file here | Same |
| Standard | **POSIX** — required in `sh` | **Bash-specific** (also zsh/ksh). **Not** required by POSIX |
| `/bin/sh` (often dash on Debian/Ubuntu) | Works | Often **missing** — `source: not found` |

Need a space: `. ~/.bashrc` or `source ~/.bashrc`. `.~/.bashrc` is not the command.

Use **`.`** in files that `/bin/sh` might run (`~/.profile`, `/etc/profile`, portable scripts). `source` is fine in Bash-only files (`~/.bashrc`, `~/.bash_profile`) but it is extra, not POSIX.

**POSIX** (Portable Operating System Interface, IEEE Std 1003) is the **shared contract** for Unix-like systems: a common shell language, utilities (`ls`, `grep`, …), and C APIs. A script that stays inside POSIX should behave the same on Linux, macOS, and *BSD. Bash implements POSIX **plus** extras (`source`, arrays, `[[ ]]`, …). `/bin/sh` is the POSIX shell on the box — on many Linux systems that is **dash**, not Bash, so Bash extras are not there.

**Memory hook:** `.bash_profile` = door (login). `.bashrc` = furniture (how the room feels). The door should open onto the furnished room. Dot (`.`) is the portable key; `source` is a Bash spare.

## Quick map

| Startup | Interactive? | Login? | Files |
| --- | --- | --- | --- |
| SSH / console login | yes | yes | `/etc/profile` + first of `~/.bash_profile`, `~/.bash_login`, `~/.profile` |
| `bash --login` | yes | yes | same files — still **you**, not root |
| `su` / `su -` | — | — | **not** a startup-file switch. Becomes **root** (or `su user`). `-` = root’s env |
| Logout from that login shell | — | — | `~/.bash_logout` |
| Terminal icon / menu on a desktop | yes | no | `~/.bashrc` |

## How to see what you are in (useful while studying)

```bash
echo $0          # leading '-' often means login: -bash
shopt login_shell
```

`shopt login_shell` prints `on` or `off`.
