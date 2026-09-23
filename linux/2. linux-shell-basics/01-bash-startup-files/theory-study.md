# 01 — Bash startup files (study)

**Startup files** are scripts Bash **executes when it starts**. Which files run depends on **how** the shell was started — not on which machine you are on.

Two questions:

1. **Interactive?** Can you type commands? (not a script driving the shell)
2. **Login?** Did you authenticate to get this shell, or start Bash with `--login`?

```
How was Bash started?
        ├─ interactive + login   (or bash --login)
        │     → /etc/profile
        │     → first readable of: ~/.bash_profile  ~/.bash_login  ~/.profile
        │     → on logout: ~/.bash_logout
        └─ interactive + non-login
              → ~/.bashrc
```

| Startup | Interactive? | Login? | Files |
| --- | --- | --- | --- |
| SSH / console / `su -` / `bash --login` | yes | yes | `/etc/profile` + **first** of `~/.bash_profile`, `~/.bash_login`, `~/.profile` |
| Logout from that login shell | — | — | `~/.bash_logout` |
| Terminal icon / menu on a desktop | yes | no | `~/.bashrc` only |

**Login** = you got the shell after authenticating (username/password), or you used `--login`. **Non-login** = you did not authenticate again (already logged into the desktop; a new terminal is just another Bash).

The personal trio is tried **in that order**. If `~/.bash_profile` exists and is readable, the other two are **skipped**. Typical login-profile contents: `PATH`, `umask`, environment that children should inherit.

A non-login interactive shell does **not** read `/etc/profile` or the profile trio.

## Why profiles source `~/.bashrc`

A login shell does **not** read `~/.bashrc` by itself. A GUI terminal often does **not** read `~/.bash_profile`.

Aliases only in `~/.bashrc` → SSH login misses them. `PATH` only in `~/.bash_profile` → desktop terminal misses it.

Usual fix: the login file **sources** the rc file (`.` or `source` — “referred to” means sourced, not merely mentioned):

```bash
# ~/.bash_profile
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi
```

## How to see what you are in

```bash
echo $0                 # leading '-' often means login: -bash
shopt login_shell       # on or off
```
