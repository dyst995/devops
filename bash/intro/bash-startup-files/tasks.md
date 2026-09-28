# Tasks — Bash startup files

Close `theory.md`. Work in `/tmp/bash-startup-files-tasks` when creating scratch snippets. Prefer `bash --login` and nested shells over editing your real dotfiles permanently; if you do touch real files, keep changes temporary and easy to undo. Do the action or write the answer, then check yourself.

## Warm-up

1. In one sentence: what are startup files, and what decides **which** ones run?
2. Write the two questions that decide the path: Interactive? Login?
3. Draw (or write as a tree) the notes’ diagram: interactive+login vs interactive+non-login, including logout.

## Interactive? Login?

4. From memory: what does **interactive** mean? What does it **not** mean (script-only run)?
5. From memory: what does **login** mean? Name at least three ways you get a login shell (SSH, console, `su -`, `bash --login`).
6. Course example for **non-login**: you open a terminal from a desktop **icon** / **menu**. Why is that non-login?

## Am I a login shell? (predict, then run)

7. Decide whether **this** shell is a login shell using both methods from the notes: `echo $0` and `shopt login_shell`. Record both.
8. Predict: `bash --login` — will `shopt login_shell` be on or off? Run it, confirm, then `exit`.
9. Predict: nested `bash` **without** `--login` — login or not? Confirm with `echo $0` and `shopt login_shell`, then `exit`.
10. From memory: what does a leading `-` in `$0` often mean (e.g. `-bash`)?

## Login path — files in order

11. List, in **order**, the files an interactive **login** shell reads. Include logout.
12. The personal trio is `~/.bash_profile`, then `~/.bash_login`, then `~/.profile`. Which rule: **first readable wins** or **all three**?
13. If `~/.bash_profile` exists and is readable, what happens to `~/.bash_login` and `~/.profile`?
14. What typically lives in login-profile contents (`PATH`, `umask`, …)? Who inherits those env vars?
15. Safely inspect (read-only): `cat /etc/profile` (or page it). Note one setting you recognize. Then, if they exist, glance at which of `~/.bash_profile` / `~/.bash_login` / `~/.profile` you actually have — do **not** invent permanent edits yet.

## Non-login path

16. Which **one** file does an interactive non-login shell read?
17. Which files does it **not** read (`/etc/profile`, the profile trio)?
18. What kinds of settings typically live in `~/.bashrc` (aliases, functions, `PS1`, …)? Safely `cat ~/.bashrc` if present (or note missing).

## Bridge: source `.bashrc` from `.bash_profile`

19. From memory: does a login shell read `~/.bashrc` by itself? Does a non-login interactive shell read `~/.bash_profile`?
20. Problem: aliases only in `.bashrc` — who misses them? `PATH` only in `.bash_profile` — who misses it?
21. Write from memory the usual `if [ -f ~/.bashrc ]; then … fi` block (use `.`, same as `source`). What does “referred to” mean here — comment mention, or execute in the **current** shell?
22. Under `/tmp/bash-startup-files-tasks`, create a **fake** `dot-bash_profile` and `dot-bashrc` with different `echo` markers (e.g. `LOGIN_MARKER` / `RC_MARKER`). Source the profile file from your current shell with `. /tmp/bash-startup-files-tasks/dot-bash_profile` after putting the bridge block in the fake profile. Predict which markers print, then run.

## Logout

23. When does `~/.bash_logout` run? When does it **not** (non-login nested shell / closing a random GUI terminal)?
24. Safely inspect: `cat ~/.bash_logout` if it exists. Optionally start `bash --login`, then `exit` — if you temporarily add a unique echo to logout for a test, remove it afterward.

## Commands.md drill + quick map

25. Without looking: list every command / snippet from this topic’s `commands.md`. Tick against the file.
26. Fill from memory: SSH / console / `su -` / `bash --login` → which files? Desktop terminal icon → which file? Logout from login shell → which file?

## Scenario

27. Ticket: “My aliases / `PS1` work in the GUI terminal but not over SSH.” Using only this topic: which file is on the non-login path, which files are on the login path, and what is the usual one-block fix in `~/.bash_profile`? Demonstrate the idea with `bash --login` vs nested non-login `bash`, and/or the fake files under `/tmp/bash-startup-files-tasks`. Reverse ticket optional: “`PATH` works over SSH but not in my desktop terminal” — same diagnosis flipped.
