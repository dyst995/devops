# Assignments — process monitoring

Close `commands.md`. Recite, then type. Work on a **lab VM**. Kill **only** processes **you start**. Never `kill -9` `sshd`, your login shell, or PID 1.

## `top`

1. [ ] Open the **live, updating** process list. Recite: this is a **movie**, not a snapshot. Find load averages and memory. Quit with **`q`**.
2. [ ] Predict: CPU% and MEM% columns. Sort by **CPU**, then by **memory** (keys from the notes / `?` help). Prove the first row changes. `q` to quit.
3. [ ] Recite how to quit. Prove you are back at the shell (not stuck). Do not `kill` the terminal.
4. [ ] Privilege: works as your user. PIDs you do not own still **show**; you cannot signal them later without rights.
5. [ ] Wrong usage: `Ctrl-C` vs `q` — both may exit. Recite **`q`** as the intended quit.
6. [ ] Combined: load average vs `lscpu` CPU count (CPU topic). Load 0.2 on 2 CPUs is idle. Recite your load.
7. [ ] Human vs default: delay between updates. Optional: slower delay; then `q`.
8. [ ] Recite from memory: live list, CPU/MEM, `q` to quit.
9. [ ] Combined with `ps`: `top` is live; `ps` is a photo. One sentence after you run both.
10. [ ] Predict: `top` itself appears in the list. Point at it.
11. [ ] What if `top` is busybox? Still quit with `q`. Record missing keys.
12. [ ] Combined: start `sleep 300` in another terminal; find it in `top`; do **not** kill it yet (save for `kill` drills) or kill with default TERM from the other terminal if you already started extras.
13. [ ] Recite: batch/photo is `ps`; live is `top`.
14. [ ] Wrong usage: running `top` in a script without `-b` (not on the sheet). Interactive only here.
15. [ ] Combined with memory topic: MEM totals in the header vs `free -h`. Same GiB ballpark?
16. [ ] Predict zombie (`Z`) vs running (`R`). If none, say none.
17. [ ] Recite load averages: 1, 5, 15 minute. Point at them.
18. [ ] What if SSH is laggy? `top` still updates; `q` still works. Do not `-9` sshd to “fix” lag.
19. [ ] Combined: user column — processes as `root` vs you. `sshd` is not yours to kill.
20. [ ] Cleanup: no `top` left running (`jobs`). Prompt idle.

## `ps`

1. [ ] Take a **snapshot** of **all users**, **user-oriented columns**, **including daemons**. Recite what **`a`**, **`u`**, **`x`** mean.
2. [ ] Predict: this is a **photo** — it will not update. Prove by running twice; PIDs of short processes may differ.
3. [ ] Find a PID **by name** (e.g. `sshd` or your `sleep`). Watch for the `grep` matching **itself**. Recite a safe pattern (or `pgrep` if you already know it — not required).
4. [ ] Privilege: you see other users’ processes in `aux`. Signaling them is a different story (`kill` drills).
5. [ ] Wrong usage: `ps a u x` with spaces vs `aux`. Prove `aux` as on the sheet.
6. [ ] Recite from memory: `a` everyone, `u` user columns, `x` no-tty daemons.
7. [ ] Combined: PID of `sshd` vs `lsof -c sshd`. Do **not** kill it.
8. [ ] Human vs default: USER, PID, %CPU, %MEM, COMMAND. Point at each.
9. [ ] Combined with `top`: same PID for your shell (`echo $$` vs `ps aux`). Prove.
10. [ ] Predict `x`: daemons without a controlling tty. Point at one (`sshd`, `systemd`).
11. [ ] What if you `ps aux | grep ps`? The grep line appears. Recite the gotcha.
12. [ ] Recite: snapshot vs `top` live.
13. [ ] Combined: start `sleep 120`; find its PID in `aux`; keep the PID for `kill`.
14. [ ] Wrong usage: `ps -aux` vs `ps aux` (BSD vs UNIX). Use the **sheet** form `aux`. Note if `-aux` still works.
15. [ ] Privilege: `ps` never needs root to **list** on Linux typically. Prove as a user.
16. [ ] Predict STAT column: `S` sleep, `R` run. Point at `sleep` as `S`.
17. [ ] Combined: `%MEM` vs `free -h` — one process vs system. Do not sum %MEM expecting 100%.
18. [ ] Recite `a` `u` `x` out loud, then run once without looking.
19. [ ] What if the list is long? Pipe to `less` (like `lsof`). Quit.
20. [ ] Cleanup: leftover `sleep` is OK if you will kill it next; otherwise TERM it. No `-9` yet.

## `kill`

1. [ ] Start a long `sleep` **you own**. Send the **default** signal (**SIGTERM / 15**) to **that PID**. Prove it exited (`ps` no longer shows it, or job reports Terminated).
2. [ ] Recite: default `kill` is polite TERM — the process **can** catch it and clean up. You asked it to exit; you did not force.
3. [ ] Start another disposable `sleep`. Send **SIGKILL (9)**. Prove it died immediately. Recite: it **cannot** ignore 9; **no cleanup**.
4. [ ] **Danger:** `-9` is last resort. Do **not** `-9` `sshd`, PID 1, your SSH session, or random Java on a shared lab. Only PIDs you started.
5. [ ] Predict: polite vs force — does cleanup run? TERM: maybe; KILL: no. One sentence.
6. [ ] Privilege: `kill` another user’s PID as a non-root user. Predict **Operation not permitted**. Prove with a PID from `ps` that is not yours (e.g. `sshd`) — the **failure** is the drill; do not escalate to actually stop it.
7. [ ] Wrong usage: `kill` with no PID. Exact error.
8. [ ] Recite from memory: default TERM by PID; `-9` force by PID.
9. [ ] Combined: find PID with `ps aux`, then TERM. Recite “PID when you mean **one** process”.
10. [ ] Predict: `kill -9` a PID that already exited. Error “No such process”. Prove.
11. [ ] Combined with `top`: identify a hog **you started**; TERM first; `-9` only if it ignores TERM. Confirm CPU drops. Never sshd.
12. [ ] Wrong usage: `kill -9 -1` (all processes you may signal). **Do not run that.** Recite why it is catastrophic on a login session.
13. [ ] Recite signal **number 15** vs **9**. Default is 15 even when you omit the number.
14. [ ] Human vs default: `kill -TERM` vs `kill` vs `kill -9`. For this binary the sheet shows default and `-9`. Prove TERM synonym optional.
15. [ ] What if the process is in `D` state (uninterruptible)? `-9` may not reap it until I/O finishes. Recite; do not force a disk fault to test.
16. [ ] Combined with `killall`: PID is precise; name is broad. Prefer PID for one Java/sleep.
17. [ ] Predict: killing your **current shell** PID. Do not. Recite what would happen (session gone).
18. [ ] Recite: `-9` cannot be caught. That is why it is dangerous and why labs still teach it.
19. [ ] Combined: after `-9`, `ps aux` gone; `dmesg` usually silent (not OOM). Prove the PID is absent.
20. [ ] Cleanup: no leftover `sleep`/`yes`. `jobs` empty. sshd still running (`ps aux | grep sshd` as a check only).

## `killall`

1. [ ] Start a disposable process **named** `top` in another terminal **or** `sleep` **only if no other sleeps exist**. Send **default SIGTERM** by **name**. Prove that **every** process with that name got TERM.
2. [ ] Recite the danger: name-based stop kills **every** match. Prefer PID (`kill`) when you mean **one** Java. Do not `killall java` on a shared lab. Do not `killall sshd`.
3. [ ] Start a throwaway named process you control (e.g. `sleep 300` **only on a VM where you are the only sleeper**, or a copy `cp /bin/sleep /tmp/labsleep` and run `/tmp/labsleep 300`). Force with **`-9`**. Prove it is gone.
4. [ ] Send **`-KILL`** (signal **by name**, same as **9**) to a disposable process you start. Recite: `-KILL` and `-9` are the same signal.
5. [ ] Predict: `-9` vs `-KILL` vs `--signal=KILL` — sheet forms are `-9` and `-KILL`. Prove both once on **separate** disposable processes.
6. [ ] Privilege: `killall top` as a user only TERMs **your** `top`. Root would hit others. Do not sudo killall on a shared host.
7. [ ] Wrong usage: `killall` with no name. Exact error.
8. [ ] Recite from memory: TERM by name; `-9` by name; `-KILL` by name.
9. [ ] Combined: two `sleep` processes; `killall sleep` vs `kill PID` of one. Recite when name is too broad. If other users have `sleep`, **skip** `killall sleep` and use `/tmp/labsleep`.
10. [ ] Predict: `killall -9 sshd` would drop remote access. **Do not run it.** Recite that sentence.
11. [ ] Combined with `ps aux`: grep the name before killall. Count matches. If count > what you started, **abort**.
12. [ ] Wrong usage: partial names matching more than you think. Recite: `killall` typically exact comm name, not a substring (prove with a name that should not match).
13. [ ] Human vs default: default is TERM (15), not KILL. Prove a catchable process (a small script `trap` optional) vs `sleep` which dies on TERM anyway.
14. [ ] Recite: same as `-9`; signal by **name** not number for the `-KILL` form.
15. [ ] What if no process matches? “no process found”. Prove with a bogus name. Harmless.
16. [ ] Combined: `kill` PID when one Java; `killall` when you truly mean every `labsleep`. One sentence.
17. [ ] Danger: `killall -9` plus a short name (`a`, `sh`). Do not. Use a unique lab binary name.
18. [ ] Recite the three sheet forms: name; `-9` name; `-KILL` name.
19. [ ] Combined with `top` `q`: quitting `top` interactively is better than `killall top` if it is your foreground. Prove `q` first.
20. [ ] Cleanup: remove `/tmp/labsleep` if you created it. No leftover sleeps. **sshd alive.** No `kill -9` on anything you did not start.
