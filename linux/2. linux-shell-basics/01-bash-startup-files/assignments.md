# Assignments — Bash startup files

Close `commands.md`. Recite, then type. Predict the result **before** you run. Prefer a nested shell or a second SSH session so you can exit without losing your original prompt. Do **not** replace a working `~/.bash_profile` or `~/.bashrc` without a backup.

## `bash`

1. [ ] Recite what `bash` with the login flag does to startup files. Start a login Bash from this prompt, then leave it.
2. [ ] Predict: a bare `bash` (no flags) — login or not? Start one, prove it, then exit.
3. [ ] Recite two ways this course checks “am I a login shell?” Use both inside a login Bash.
4. [ ] Predict `$0` after you start a login Bash. Prove it. Why might the name start with a dash?
5. [ ] Wrong-usage: pass a flag that is not the login flag and still expect profile files. What actually runs? Prove with `shopt`.
6. [ ] Combine: from your current shell, start login Bash, confirm login is on, start a nested non-login Bash inside it, confirm login is off, then exit both.
7. [ ] Privilege: does a normal user need `sudo` to start a login Bash? Prove it as yourself.
8. [ ] Predict: `bash --login` from a GUI terminal vs from SSH — is the new process still a login shell? Prove with `shopt`, not with guesswork.
9. [ ] Recite the file order a login shell reads. After `bash --login`, which of those files could have run for **you** (first readable personal file)?
10. [ ] Predict: exiting the login Bash you started — does `~/.bash_logout` run? Prove with a **temporary** unique `echo` you can remove afterward (backup first).
11. [ ] Wrong-usage: type `bash login` as if `login` were a script name. What happens? Fix it from memory.
12. [ ] Combine: start login Bash, print `$0`, print `shopt login_shell`, exit. Recite the three results from memory.
13. [ ] Predict: `bash --login -c 'shopt login_shell'` (one-shot). Does a non-interactive `-c` still count as login? Record the output.
14. [ ] Recite: SSH / `su -` / desktop terminal icon / `bash --login` — which are login? Tick only after you can say it without notes.
15. [ ] Wrong-usage: stay in a login Bash and edit startup files, then expect this **already running** shell to reread them. What do you actually have to do?
16. [ ] Privilege: compare `sudo bash --login` vs your own `bash --login`. Whose home files run? Predict first (do this only on a lab VM).
17. [ ] Combine: prove aliases-in-bashrc vs PATH-in-profile using a login Bash you started yourself (unique throwaway alias/message; revert).
18. [ ] Predict: two login Bashes nested. Is the inner one still login? Prove with `shopt`.
19. [ ] Recite why the cheat sheet uses `bash --login` at all (you are often already in a non-login terminal).
20. [ ] Combined: start login Bash → two login checks → exit → start plain Bash → same two checks → both predictions written first.

## `echo`

1. [ ] Recite which special parameter shows the current shell name. Print it in **this** shell.
2. [ ] Predict the exact printed string for `$0` in your current session. Then print it. Match or explain the miss.
3. [ ] Recite: a leading dash on the shell name often means what? Does **your** `$0` have that dash?
4. [ ] Wrong-usage: print `$0` without expanding it (wrong quoting). What do you see? Fix the quoting from memory.
5. [ ] Combine: print `$0` and, on the next line, whether login is on. Keep both outputs.
6. [ ] Predict `$0` inside a login Bash you start now vs `$0` after you exit. Prove both.
7. [ ] Privilege: as yourself, print `$0`. With `sudo -s` or `sudo bash` on a **lab VM**, print `$0` again. Same string?
8. [ ] Recite why `$0` is a check **and** a trap (scripts also have a `$0`). Print `$0` from a one-line throwaway script vs from the prompt.
9. [ ] Wrong-usage: `echo 0` or `echo 0$` — predict the nonsense, then print the real parameter.
10. [ ] Combine: login Bash, print `$0`, `shopt login_shell`. Non-login nested Bash, same two. Table of four cells from memory.
11. [ ] Predict: `echo "$0"` vs `echo '$0'` — which expands? Prove it.
12. [ ] Recite: interactive login often shows `-bash`. Start `bash --login` and see if you get that or `bash`.
13. [ ] Wrong-usage: treat `$0` as your username. Print `$0` and your username separately. They are not the same job.
14. [ ] Combine: print `$0`, `$HOME`, and `shopt login_shell` in one sitting. Only `$0` is the login-name hint.
15. [ ] Predict: `bash -c 'echo $0'` — what name prints? Run it. Compare to the interactive prompt.
16. [ ] Privilege: you do **not** need root to print `$0`. Prove it as a normal user.
17. [ ] Recite the one-line interview answer: “how do you see the current shell name?”
18. [ ] Wrong-usage: `echo $O` (letter O). Predict empty or wrong; then the correct parameter.
19. [ ] Combine: three contexts — this prompt, `bash --login`, `bash` nested — print `$0` in each. Three predictions first.
20. [ ] Combined: quote `$0`, dash-means-login story, script `$0` vs prompt `$0`. Tick only if you predicted before running.

## `shopt`

1. [ ] Recite the `shopt` option that reports login vs not. Run it in **this** shell. Record `on` or `off`.
2. [ ] Predict `on`/`off` for a GUI-style nested `bash`. Start one, run the option, exit.
3. [ ] Predict `on`/`off` for `bash --login`. Start one, run the option, exit.
4. [ ] Recite: the print is `on` or `off`, not yes/no. Prove by running it once and reading the exact line.
5. [ ] Wrong-usage: `shopt login` (truncated name). What does Bash say? Recite the full option name.
6. [ ] Combine: `shopt` for login **and** `$0` in the same shell. Do they agree? If not, write one sentence why you trust `shopt`.
7. [ ] Privilege: as a normal user, `shopt` needs no sudo. Prove it.
8. [ ] Predict: `sudo shopt login_shell` — does sudo even pass that to Bash? Try on a lab VM or predict the “not a bash option for sudo” failure.
9. [ ] Recite: login shell vs interactive shell are different questions. `shopt login_shell` answers **only** which one?
10. [ ] Wrong-usage: `set login_shell` or `echo $login_shell`. Predict failure/empty. Use `shopt`.
11. [ ] Combine: this shell (record on/off) → `bash --login` (expect on) → nested `bash` (expect off). Write the three before you run.
12. [ ] Predict `shopt login_shell` inside `bash --login -c '…'`. Run it. Interactive vs login: still `on`?
13. [ ] Recite how to list **all** `shopt` options and find the login one without the cheat sheet (`man` / `shopt` with no args — pick one).
14. [ ] Wrong-usage: `shopt -s login_shell` in a non-login Bash to “fake” login files. Did profile files run? (They already didn’t.) Say why this is the wrong tool for rereading profiles.
15. [ ] Combine: SSH session if you have one — `shopt login_shell` at the first prompt. Nested `bash` in that SSH. Two predictions.
16. [ ] Privilege: root’s login Bash vs yours — same option name? You only need to know it works per process, not per user.
17. [ ] Recite the interview line: “`shopt login_shell` prints …”
18. [ ] Wrong-usage: treat `off` as “not interactive.” Open a nested interactive `bash` with login `off`. You can still type. Prove it.
19. [ ] Combine: `echo $0` + `shopt login_shell` + exit. Recite both checks from a blank page.
20. [ ] Combined: three shells (current, login, nested), `on`/`off` predicted then proven, option name spelled correctly.

## `source` (`.`)

1. [ ] Recite the four-line “if the rc file exists, source it” block from the cheat sheet. Write it on paper, then compare.
2. [ ] Recite: `.` and `source` are the same job. Prove with `help .` or `help source` (not the cheat sheet).
3. [ ] Predict: a login shell does **not** read `~/.bashrc` unless something sources it. Say that out loud, then point at the `if` block’s job.
4. [ ] Wrong-usage: `bash ~/.bashrc` (new process) vs `. ~/.bashrc` (this process). Prove with a throwaway variable: set it in a tiny file, source it, print it; then run the file as a script and print again from the parent.
5. [ ] Combine: in a throwaway dir, write `rc-practice.sh` that sets `PRACTICE_SOURCED=1`. Source it with `.`. Print the variable.
6. [ ] Recite why the test `-f` is there. Source a **missing** path with `.` — exact error. Then wrap with `if [ -f … ]` so a miss is silent.
7. [ ] Privilege: sourcing `~/.bashrc` is your file; you do not need root. Prove `. ~/.bashrc` as yourself (or skip if the file is huge/noisy — use a throwaway file instead).
8. [ ] Predict: `if [ -f ~/.bashrc ]; then . ~/.bashrc; fi` when the file exists vs when you rename the test to a path that does not. Two outcomes.
9. [ ] Wrong-usage: spaces around `=` in a sourced file, or sourcing with `source~/.bashrc` (no space). Predict the errors.
10. [ ] Combine: backup `~/.bash_profile` if you will edit it. Confirm whether it already sources `~/.bashrc`. Recite the block if it is missing — **do not** paste blindly if your distro already has a different layout.
11. [ ] Recite: login = profile family; interactive non-login = rc. The source block is how login also gets aliases.
12. [ ] Predict: unique `echo` only in `~/.bashrc`. Login Bash **without** sourcing rc — do you see it? Login Bash **with** the `if` block — do you see it? Revert.
13. [ ] Wrong-usage: `source` a directory or a binary. Predict the failure. Use a text file of assignments.
14. [ ] Combine: `. ./a.sh` from a throwaway dir (relative path). Prove the variable appears in **this** shell, not only in a child.
15. [ ] Privilege: do **not** source `/etc/profile` as a “test” on a shared box if you do not know what it does. Recite why `/etc/profile` is system-wide.
16. [ ] Recite `.` vs running `./script.sh`: which can change your current shell’s aliases/variables?
17. [ ] Wrong-usage: `[ -f ~/.bashrc ]` forgotten, always `. ~/.bashrc`. Remove or rename a throwaway target and show the error the `if` would have prevented.
18. [ ] Combine: write the `if [ -f … ]; then . …; fi` block for a file in `/tmp/practice-rc` and prove it sources only when the file exists.
19. [ ] Predict: `source` with no arguments. What does Bash print? Then source a real throwaway file.
20. [ ] Combined: recite the profile-sources-rc block; prove `.` vs new process; prove `-f` guards a missing file; revert any real-dotfile edits.
