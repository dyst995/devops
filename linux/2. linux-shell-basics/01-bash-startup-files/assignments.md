# Assignments — Bash startup files

Close `commands.md`. Type and run. Prefer a **nested** shell so `exit` does not close your only session. **Backup** `~/.bash_profile` / `~/.bashrc` before you edit them. Revert throwaway lines when done.

## Starting a login shell (`bash --login`)

### Easy

1. [ ] Start a login Bash with the flag from the cheat sheet. Then `exit` back to the original prompt.
2. [ ] Start a nested `bash` **without** that flag, then `exit`.

### Medium

3. [ ] Inside a login Bash, start a nested plain `bash`. You now have two layers. Exit the inner one, then the login one. Which command created which layer?
4. [ ] Someone typed `bash login` (as if `login` were a script). Run it only if you can afford the error, then start a login shell the correct way.

### Hard

5. [ ] From this prompt: login Bash → confirm you are in it (next concept) → nested non-login Bash → exit both. You should end in the original shell.
6. [ ] `bash --login -c` with a one-shot command that prints whether login is on (`shopt`). Does a non-interactive `-c` still count as login? Record the output.

## Checking login vs not (`$0`, `shopt login_shell`)

### Easy

1. [ ] In **this** shell, print `$0` and run `shopt login_shell`. Record both.
2. [ ] Start `bash --login`, run the same two checks, `exit`. What changed?

### Medium

3. [ ] Nested plain `bash`: same two checks. `login_shell` should be off even if you can still type. Prove you are still interactive (type `echo` something).
4. [ ] Someone ran `shopt login` (truncated). What does Bash say? Use the full option name.

### Hard

5. [ ] Three contexts — this prompt, `bash --login`, nested `bash` — print `$0` and `shopt login_shell` in each. Predict `on`/`off` **before** you run.
6. [ ] `$0` and `shopt` disagree or `$0` has no leading dash. Trust `shopt` for login vs not. Write one sentence why `$0` is a hint and a trap (scripts have `$0` too — try `bash -c 'echo $0'`).

## Sourcing rc from profile (`.`, `source`)

### Easy

1. [ ] In a throwaway directory, write a tiny file that sets `PRACTICE_SOURCED=1`. Source it with `.` and `echo` that variable.
2. [ ] Source the same file with `source` instead of `.`. Same result?

### Medium

3. [ ] Run that file as a **new** process (`bash file`) vs `. file`. After each, `echo` the variable in **this** shell. Which one left it set?
4. [ ] Source a path that does **not** exist. Note the error. Then wrap with `if [ -f … ]; then . …; fi` so a missing file is silent.

### Hard

5. [ ] Backup `~/.bash_profile` if you will touch it. Check whether it already sources `~/.bashrc`. If you add the course `if [ -f ~/.bashrc ]` block, use a **unique** `echo` in `~/.bashrc`, start `bash --login`, see the message, then **revert**.
6. [ ] Broken line: `source~/.bashrc` (no space). Run it, then the spaced form. Why does the first fail?
