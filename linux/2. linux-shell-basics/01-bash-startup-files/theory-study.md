# 01 — Bash startup files (study)

**Startup files** are scripts Bash **executes when it starts**. Which files run depends on **how** the shell was started — not on which machine you are on.

Two questions:

1. **Interactive?** Can you type commands? (not a script driving the shell)
2. **Login?** Did you get this shell by logging in (SSH, console), or start Bash with `--login`?

```
How was Bash started?
        ├─ interactive + login   (SSH / console, or bash --login)
        │     → /etc/profile
        │     → first readable of: ~/.bash_profile  ~/.bash_login  ~/.profile
        │     → on logout: ~/.bash_logout
        └─ interactive + non-login
              → ~/.bashrc
```

| Startup | Interactive? | Login? | Files |
| --- | --- | --- | --- |
| SSH / console login | yes | yes | `/etc/profile` + **first** of `~/.bash_profile`, `~/.bash_login`, `~/.profile` |
| `bash --login` | yes | yes | same files — still **you** |
| Logout from that login shell | — | — | `~/.bash_logout` |
| Terminal icon / menu on a desktop | yes | no | `~/.bashrc` only |

**Login shell** = you authenticated (SSH, TTY) **or** you ran `bash --login`. That is the profile path. **Non-login** = already on the desktop; a new terminal is just another Bash → `~/.bashrc` only.

### `su` vs `bash --login`

Different jobs. Do not treat them as two login-shell commands.

**`su`** = become **root** (or `su user`). Needs **root’s** password. Changes UID. The `-` in `su -` still means become root; it only gives root a clean login environment (home + `PATH`). Without `-` you still become root but keep more of your env.

**`bash --login`** = start a **login shell as you**. No password, no root, no user switch. Reads **your** profile files so you can test the SSH/console path.

The personal trio is tried **in that order**. If `~/.bash_profile` exists and is readable, the other two are **skipped**. Typical login-profile contents: `PATH`, `umask`, environment that children should inherit.

A non-login interactive shell does **not** read `/etc/profile` or the profile trio.

## Why profiles source `~/.bashrc`

A login shell does **not** read `~/.bashrc` by itself. A GUI terminal often does **not** read `~/.bash_profile`.

Aliases only in `~/.bashrc` → SSH login misses them. `PATH` only in `~/.bash_profile` → desktop terminal misses it.

Usual fix: the login file **sources** the rc file (“referred to” = run it **in this shell**, so exports/aliases stick):

```bash
# ~/.bash_profile
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi
```

**`.`** (dot) and **`source`** do the same thing **in Bash**. `.` is **POSIX** and works in `sh`. `source` is **Bash-specific** (not required by POSIX); `/bin/sh` is often **dash** and will say `source: not found`. Prefer `.` in `~/.profile` / `/etc/profile` / portable scripts. Space required: `. ~/.bashrc`.

**POSIX** (IEEE Std 1003, Portable Operating System Interface) is the **common Unix contract**: shell language, utilities, APIs so the same script can run on Linux, macOS, *BSD. Bash = POSIX plus extras. `/bin/sh` = the POSIX shell, not necessarily Bash.

## How to see what you are in

```bash
echo $0                 # leading '-' often means login: -bash
shopt login_shell       # on or off
```
