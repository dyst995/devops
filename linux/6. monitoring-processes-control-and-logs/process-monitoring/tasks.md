# Tasks — Process monitoring

Close `theory.md`. Kill only processes you start (`sleep`). Do not hit `sshd`, system daemons, or another user’s jobs.

## Warm-up

1. In one sentence: what is a process, and what is a PID?
2. Memory hook from the notes: `top` = ? · `ps` = ? · `kill` = ? · `killall` = ?
3. Predict: is `top` a movie or a photo? Is `ps` a movie or a photo?

## top

4. Open the live list. Where are load averages and memory? Where is the process table?
5. Inside `top`, sort by CPU, then by memory, then quit. Recite the keys (`P`, `M`, `q`) from the notes.
6. From the notes (you will hit them): what does `k` do inside `top`? Do not kill anything you did not start.
7. Memory hook: `top` = dashboard. How do you leave?

## ps

8. Snapshot everyone including daemons, with user-oriented columns (`ps aux`). Recite what `a`, `u`, `x` mean.
9. From the output, name the columns you will read when hunting a hog: `USER`, `PID`, `%CPU`, `%MEM`, `STAT`, `COMMAND`.
10. Find a PID by name with `ps aux | grep …`. Watch for the search matching itself. How do you tell the real process from the `grep` line?
11. Memory hook: `ps aux` = everyone, including daemons. Frozen photo, not a movie — say that back in your own words.

## kill vs killall

12. Start a long `sleep` in the background. Note its PID. Stop it with the default signal (TERM/15). Confirm it exited (`ps` / `jobs`).
13. Start another `sleep`. Force it with `kill -9` (SIGKILL). Confirm it is gone.
14. Start a disposable process with a **unique** name you choose carefully (or another `sleep` if you accept killing every `sleep`). Stop it with `killall` using the signal **name** form (`-KILL` / `-TERM`). Confirm.
15. Predict: polite TERM vs force KILL — does cleanup run on `-9`? Can you signal another user’s process as non-root?
16. Prefer PID when you mean **one** Java (or one `sleep`). Say why name-based stop is dangerous (notes: `killall java` kills every Java).

## Construct / distinguish

17. Write three one-liners from `commands.md`: live list, full snapshot, polite stop by PID. Run each once (stop only a `sleep` you started).
18. Distinguish in one sentence each: `top` vs `ps`; `kill` vs `killall`; TERM vs KILL.

## Scenario

19. A hog ignores polite stop. Start a long `sleep` as your stand-in hog. Identify it by live list or snapshot, try TERM, then force with 9, confirm it is gone and CPU is quiet. Do not hit `sshd`.
20. Ticket: “`killall java` took down three apps.” Explain what went wrong and what you should have used instead (PID from `ps`/`top`).
