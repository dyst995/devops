# Tasks — Exit codes

Close `theory.md`. Work in `/tmp/exit-codes-tasks` when creating scripts. After each command, record the status of **that** command before you run another. Put `exit` only **inside scripts** — never type bare `exit` in your interactive shell to “try” a status.

## Warm-up

1. What integer range can a status use? What means success?
2. Run `true` and `false` (or `:` and a failing `ls` of a missing path). Report both statuses.
3. Recite 1, 2, 126, 127, 128, 128+n, 130, 255 from memory. Check the table after.

## Produce the table numbers

4. Cause a catchall / illegal operation like the notes’ divide-by-zero `let "var1 = 1/0"`. Report the status. Which table row?
5. Run a name that does not exist (typo like `Illegal_command`). Report the status. `$PATH` or typo?
6. Try to execute something that exists but is not an executable (the notes use `/dev/null`). Report the status. How is this different from the previous missing-command case?
7. In a **script** under `/tmp/exit-codes-tasks`, call `exit 3.14159`. What status does the script leave? Why is that invalid? (Run the script; do not `exit` the interactive shell.)
8. In a script, `exit -1`. What status? Range rule?
9. In a script, `exit 0` then prove a later line never runs. In another script, omit `exit` and end with a failing command — what is the script’s status?

## 126 vs 127 drills

10. `chmod -x` a tiny script you own under `/tmp/exit-codes-tasks`, run it with `./`. Report status. Which table row?
11. Restore execute and rename the invocation to a typo path. Two statuses from 11–12; two meanings in one sentence each.
12. Create an empty file `not-a-binary`, leave it non-executable, try `./not-a-binary`. Status? Same family as `/dev/null`?

## 128+n / signals

13. Signal 9 → status? Signal 2 (Ctrl-C) → status? Write **128+n** before you try.
14. Start `sleep 30`, interrupt it with Control-C, report status. Which table row?
15. Write a script that `sleep 60`s. In another terminal (or background + `kill`), send `kill -9` to that script’s PID. What status should the parent see? Confirm with `wait` / foreground run as the notes allow.

## `$?` timing

16. Run a failing command, then **immediately** `echo $?`. Then run `echo $?` again without another failure — what happened to the second `$?`?
17. Pipeline or compound: run `false; echo $?` vs `false && echo $?`. Explain which status you see and why order matters.

## Scenario

18. A junior says “it failed with 127 so it is not executable.” Correct them using the table. What number would “not executable” be? Demonstrate both mistakes under `/tmp/exit-codes-tasks`.
19. A pipeline was killed with signal 9. They report status 9. What should `$?` actually show, and why? Write 128+n for signals 2, 9, and 15 from memory.
