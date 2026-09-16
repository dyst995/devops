# Bash startup files

**Startup files** are scripts Bash **reads and executes when it starts**. Which files run depends on **how** the shell was started — not on which computer you are on.

Two questions decide the path:

1. **Interactive?** Can you type commands? (the shell is **not** running only because a script was launched)
2. **Login?** Did you **authenticate** (username and password), or start Bash with **`--login`**?

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

**Memory hook:** login = **profile** family. Non-login = **bashrc**. Logout file only on the login path.

## Invoked as an interactive login shell, or with `--login`

**Interactive** means you can **enter commands**. The shell is not running because a **script** has been activated.

A **login shell** means you got the shell **after authenticating** to the system, usually by giving your **user name and password**. SSH, a TTY/console login, `su -`, and **`bash --login`** all count.

### Files read

| Order | File | Who |
| --- | --- | --- |
| 1 | **`/etc/profile`** | System-wide — every user’s login shell |
| 2 | **First existing readable** of **`~/.bash_profile`**, then **`~/.bash_login`**, then **`~/.profile`** | Per-user. **Only one** of these three is read |
| logout | **`~/.bash_logout`** | Per-user, when that **login** shell **exits** |

If `~/.bash_profile` exists and is readable, Bash **does not** read `~/.bash_login` or `~/.profile`.

Typical login-profile contents: `PATH`, `umask`, environment variables that **child processes** should inherit.

**Memory hook:** system profile first, then **one** personal file in that order. `~/.bash_logout` = cleanup on logout (not when you close a random GUI terminal).

## Invoked as an interactive non-login shell

A **non-login** shell means you **did not** authenticate again. Course example: you open a terminal from an **icon** or **menu** on a graphical desktop. You are already logged into the desktop; the new window is just another Bash.

### Files read

| File | Who |
| --- | --- |
| **`~/.bashrc`** | Per-user only (this path). Aliases, functions, prompt (`PS1`), completion, etc. |

`/etc/profile` and the `~/.bash_profile` / `~/.bash_login` / `~/.profile` trio are **not** read.

**Memory hook:** GUI terminal icon = **bashrc**, not profile.

## Why `~/.bashrc` is “usually referred to” in `~/.bash_profile`

A **login** shell does **not** read `~/.bashrc` by itself. A **non-login** interactive shell does **not** read `~/.bash_profile`.

If aliases live only in `.bashrc`, **SSH login** misses them. If `PATH` lives only in `.bash_profile`, a **desktop terminal** misses it.

Usual fix: **source** (refer to) `.bashrc` from `.bash_profile`:

```bash
# ~/.bash_profile
if [ -f ~/.bashrc ]; then
    . ~/.bashrc          # same as: source ~/.bashrc
fi
```

“Referred to” means **executed** with `.` or `source`, not merely mentioned in a comment.

**Memory hook:** `.bash_profile` = door (login). `.bashrc` = furniture. The door should open onto the furnished room.

## Quick map

| How you got the shell | Files |
| --- | --- |
| SSH / console / `su -` / `bash --login` | `/etc/profile` + first of the three personal profiles |
| Logout from that login shell | `~/.bash_logout` |
| Terminal icon / menu | `~/.bashrc` |

Check what you are in:

```bash
echo $0                 # leading '-' often means login: -bash
shopt login_shell       # on or off
```
