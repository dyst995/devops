# Tasks — Process monitoring

Close `theory.md`. Kill only processes you start (`sleep`). Do not hit `sshd`, system daemons, or another user’s jobs.

## Warm-up

1. In one sentence: what is a process, and what is a PID?
2. Predict: is `top` a movie or a photo? Is `ps` a movie or a photo?

## top

3. Open the live list. Where are load averages and memory? Where is the process table?
4. Inside `top`, sort by CPU, then by memory, then quit. Recite the keys (`P`, `M`, `q`) from the notes.
5. From the notes (you will hit them): what does `k` do inside `top`? Do not kill anything you did not start.

## ps

6. Snapshot everyone including daemons, with user-oriented columns (`ps aux`). Recite what `a`, `u`, `x` mean.
7. From the output, name the columns you will read when hunting a hog: `USER`, `PID`, `%CPU`, `%MEM`, `STAT`, `COMMAND`.
8. Find a PID by name with `ps aux | grep …`. Watch for the search matching itself. How do you tell the real process from the `grep` line?

## kill vs killall

9. Start a long `sleep` in the background. Note its PID. Stop it with the default signal (TERM/15). Confirm it exited (`ps` / `jobs`).
10. Start another `sleep`. Force it with `kill -9` (SIGKILL). Confirm it is gone.
11. Start a disposable process with a **unique** name you choose carefully (or another `sleep` if you accept killing every `sleep`). Stop it with `killall` using the signal **name** form (`-KILL` / `-TERM`). Confirm.
12. Predict: polite TERM vs force KILL — does cleanup run on `-9`? Can you signal another user’s process as non-root?
13. Prefer PID when you mean **one** Java (or one `sleep`). Say why name-based stop is dangerous (notes: `killall java` kills every Java).

## Construct / distinguish

14. Write three one-liners from `commands.md`: live list, full snapshot, polite stop by PID. Run each once (stop only a `sleep` you started).
15. Distinguish in one sentence each: `top` vs `ps`; `kill` vs `killall`; TERM vs KILL.

## Scenario

16. A hog ignores polite stop. Start a long `sleep` as your stand-in hog. Identify it by live list or snapshot, try TERM, then force with 9, confirm it is gone and CPU is quiet. Do not hit `sshd`.
17. Ticket: “`killall java` took down three apps.” Explain what went wrong and what you should have used instead (PID from `ps`/`top`).
