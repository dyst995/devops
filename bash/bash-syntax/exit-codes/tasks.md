# Tasks — Exit codes

Close `theory.md`. After each command, record the status of **that** command before you run another.

## Warm-up

1. What integer range can a status use? What means success?
2. Run `true` and `false` (or `:` and a failing `ls` of a missing path). Report both statuses.
3. Recite 1, 2, 126, 127, 128, 128+n, 130, 255 from memory. Check the table after.

## Produce the numbers (find this)

4. Cause a catchall / illegal operation like the notes’ divide-by-zero `let`. Report the status.
5. Run a name that does not exist (typo). Report the status. Which table row? `$PATH` or typo?
6. Try to execute something that exists but is not an executable (the notes use `/dev/null`). Report the status. How is this different from task 5?
7. In a script, `exit` with a **fraction** like the notes. What status do you get? Why is that invalid?
8. In a script, `exit -1`. What status? Range rule?

## Predict 128+n

9. Signal 9 → status? Signal 2 (Ctrl-C) → status? Write 128+n before you try.
10. Start `sleep 30`, interrupt it with Control-C, report status. Match the table.

## Repeat 126 vs 127

11. `chmod -x` a tiny script you own, run it with `./`. Then restore execute and rename the invocation to a typo. Two statuses; two meanings.

## Scenario

12. A junior says “it failed with 127 so it is not executable.” Correct them using the table. What number would “not executable” be?
13. A pipeline was killed with signal 9. They report status 9. What should `$?` actually show, and why?
