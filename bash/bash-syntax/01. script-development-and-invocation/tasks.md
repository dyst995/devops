# Tasks — Script development and invocation

Close `theory.md`. Work in `/tmp/script-invoke-tasks` when creating files. Predict before you run where useful. Prefer `bash scriptname` / `./scriptname` in that directory — do not `exit` your interactive shell.

## Warm-up

1. From memory: simplest case of a script, and what effort it saves.
2. Write the two-character marker that must be at the **head** of the file. What follows it immediately?
3. Recite the six example first lines from the notes (`sh`, `bash`, `perl`, `env python`, `sed -f`, `awk -f`). What kind of program is each (shell / language / utility)?
4. Recite the memory hook: `#!` + **absolute** interpreter (or `env` + name on `PATH`). Optional **arguments** after the path — name two from the notes.
5. From memory: fill the invocation table (three rows) — how you run it, execute bit?, who interprets.

## Sha-bang

6. Create `/tmp/script-invoke-tasks/hello.sh` that prints `hello` with one `echo`. Put `#!/bin/bash` as line 1. Confirm with `head -1`.
7. Change line 1 to `#!/bin/sh`. Run with `./` after `chmod +x`. How do you prove which interpreter is running (e.g. print `$0`, or `ps` / a self-check inside the script)?
8. Write a one-line note: if there is **no** sha-bang, what may Linux fall back to for `./scriptname`? Should you rely on that?
9. Predict: `bash hello.sh` when line 1 says `#!/bin/sh` — who interprets? Why does the notes say the sha-bang is ignored in that case?
10. Predict: `sh hello.sh` when line 1 says `#!/bin/bash` — who interprets?
11. From memory: when does `#!/usr/bin/env python` help vs a fixed `#!/usr/bin/python`?
12. Why do the notes’ sed and awk sha-bangs include `-f`?

## Invoke without execute bit

13. Remove execute permission (`chmod a-x hello.sh`). Run `sh hello.sh` and `bash hello.sh`. Both should work — confirm.
14. Still without execute bit: try `./hello.sh`. What error? Fix with `chmod +x` and run again.
15. From the current directory (not on `PATH`): type only `hello.sh` with no `./`. What happens? Why does the notes require `./`?

## Compare the three ways

16. Same three-line script: invoke three ways from the notes (`sh …`, `bash …`, then `chmod` + `./…`). Which ways needed the execute bit?
17. Make a tiny script that prints `BASH=$BASH` and `0=$0`. Run it with `bash scriptname` and with `./scriptname` (bash sha-bang). Note how `$0` differs.
18. On this machine, confirm the interpreter paths from the notes exist (`ls` or `command -v` for `sh`, `bash`, `perl`, `env`, `sed`, `awk` — skip if a language is not installed).

## Edge drills

19. Create `wrong-shebang.sh` with `#!/bin/this-does-not-exist` and `echo never`. After `chmod +x`, run `./wrong-shebang.sh`. What fails? Then run `bash wrong-shebang.sh` — does the echo run?
20. Create a file with the sha-bang on **line 2** (blank or a comment first). Try `./` after chmod. What goes wrong conceptually?

## Scenario

21. A teammate emails a script with a correct first line but gets `permission denied` when they type `./deploy`. Another teammate’s copy runs with `bash deploy` but `./deploy` uses the wrong shell. Diagnose both using only this topic, then demonstrate the fix for each under `/tmp/script-invoke-tasks`.
