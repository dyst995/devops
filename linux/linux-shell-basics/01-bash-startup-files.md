# 01 — Bash Startup Files

**Startup files** are scripts Bash reads and **executes when it starts**. Which files run depends on **how** the shell was started — not on which machine you are on.

Two questions decide the path:

1. **Interactive?** Can you type commands? (not a script driving the shell)
2. **Login?** Did you authenticate to get this shell (username/password), or did you start Bash with `--login`?

```
How was Bash started?
        │
        ├─ interactive + login   (or bash --login)
        │     → /etc/profile
        │     → first readable of: ~/.bash_profile  ~/.bash_login  ~/.profile
        │     → on logout: ~/.bash_logout
        │
        └─ interactive + non-login
              → ~/.bashrc
```

## Interactive login shell (or `bash --login`)

**Interactive** means you can enter commands. The shell is not running only because a script launched it.

**Login shell** means you got the shell **after authenticating** — usually username and password. SSH, a TTY login, `su -`, and `bash --login` all count as login (or login-like).

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

“Referred to” here means **sourced** (`.` or `source`), not merely mentioned.

**Memory hook:** `.bash_profile` = door (login). `.bashrc` = furniture (how the room feels). The door should open onto the furnished room.

## Quick map

| Startup | Interactive? | Login? | Files |
| --- | --- | --- | --- |
| SSH / console login / `su -` / `bash --login` | yes | yes | `/etc/profile` + first of `~/.bash_profile`, `~/.bash_login`, `~/.profile` |
| Logout from that login shell | — | — | `~/.bash_logout` |
| Terminal icon / menu on a desktop | yes | no | `~/.bashrc` |

## How to see what you are in (useful while studying)

```bash
echo $0          # leading '-' often means login: -bash
shopt login_shell
```

`shopt login_shell` prints `on` or `off`.
