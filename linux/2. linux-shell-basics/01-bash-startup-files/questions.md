# 01 — Bash Startup Files — Questions

Cover the Answers section. Answer first, then check.

1. What are Bash startup files?
2. What does **interactive** mean? What is the opposite situation in the notes?
3. What does **login shell** mean? Give the usual way you get one.
4. Besides authenticating, how can you force Bash to behave as a login shell?
4b. What is `su` for? What is `bash --login` for? What does the `-` on `su -` change?
5. List the files an **interactive login** shell reads, in order. Include logout.
6. After `/etc/profile`, Bash may read one of three personal files. Name them **in search order**. How many of them actually run?
7. You have both `~/.bash_profile` and `~/.profile`. Which one does a login Bash read? Why?
8. What is `/etc/profile` for, compared with `~/.bash_profile`?
9. When does `~/.bash_logout` run? Does a non-login terminal close run it?
10. What is a **non-login** shell, with the example from the notes?
11. Which startup file does an interactive **non-login** shell read?
12. Does a GUI terminal that is non-login read `/etc/profile`? `~/.bash_profile`?
13. The notes say `~/.bashrc` is usually **referred to** in `~/.bash_profile`. What does that mean, and why do people do it?
13b. `.` vs `source`: which is POSIX / works in `sh`? Which is Bash-only? What is POSIX?
14. You put `alias ll='ls -l'` only in `~/.bashrc`. You SSH into the server (login shell). Will `ll` work? What must be true for it to work?
15. You put `export PATH="$PATH:~/bin"` only in `~/.bash_profile`. You open a terminal from the desktop menu. Will `~/bin` be on `PATH`? Why?
16. Draw or list the decision tree: login interactive vs non-login interactive → files.
17. `~/.bash_login` exists, `~/.bash_profile` does not, `~/.profile` exists. What does a login Bash read after `/etc/profile`?
18. Where should you put aliases and prompt settings? Where should you put environment variables you want at SSH login? How do you keep both worlds in sync?

---

## Answers

1. Scripts that Bash reads and executes when it starts.
2. You can type commands. The opposite: the shell is running because a script was activated (not an interactive session).
3. You got the shell after authenticating to the system, usually with username and password.
4. `bash --login` (or `bash -l`). Still you; reads your profile files. Not a user switch.
4b. `su` = become **root** (or `su user`); root’s password; UID changes. `bash --login` = start a **login shell as you**; no password; not root. `-` on `su -` still becomes root; it only gives root a clean login environment (home + `PATH`). Without `-` you still become root but keep more of your env.
5. `/etc/profile` → first readable of `~/.bash_profile`, `~/.bash_login`, or `~/.profile` → `~/.bash_logout` on logout.
6. `~/.bash_profile`, then `~/.bash_login`, then `~/.profile`. Only the **first existing readable** file is read.
7. `~/.bash_profile`. It is first in the list, so the others are skipped.
8. `/etc/profile` is system-wide (all users’ login shells). `~/.bash_profile` is only your user.
9. When you log out of a **login** shell. Closing a non-login terminal does not use the login-logout path, so `~/.bash_logout` is not part of that story.
10. You did not authenticate again. Example: opening a terminal from an icon or menu item.
11. `~/.bashrc`
12. No and no. Non-login interactive reads `~/.bashrc` only (of the files in these notes).
13. `~/.bash_profile` **sources** `~/.bashrc` (`.` or `source`). Login shells otherwise skip `.bashrc`; this copies interactive settings into login sessions.
13b. `.` is POSIX and works in `sh`. `source` is Bash-specific (not required by POSIX); `/bin/sh` (often dash) may not have it. POSIX = Portable Operating System Interface (IEEE 1003): the shared Unix shell/utilities/API contract. Bash = POSIX plus extras. `/bin/sh` is the POSIX shell, not always Bash.
14. Not unless `~/.bash_profile` (or the personal file that actually ran) sources `~/.bashrc`. Login shells do not read `.bashrc` by themselves.
15. Usually no. That terminal is a non-login interactive shell, so it reads `~/.bashrc`, not `~/.bash_profile`.
16. Interactive + login (or `--login`) → `/etc/profile` + first of the three profiles; logout → `~/.bash_logout`. Interactive + non-login → `~/.bashrc`.
17. `~/.bash_login` (first existing readable after `.bash_profile` is missing).
18. Aliases / prompt → `~/.bashrc`. Login env / `PATH` → `~/.bash_profile` (or `~/.profile`). Source `.bashrc` from `.bash_profile` so SSH login gets the aliases too.
