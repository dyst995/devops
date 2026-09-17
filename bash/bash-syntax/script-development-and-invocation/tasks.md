# Tasks — Script development and invocation

Close `theory.md`. Do not open `commands.md` unless you ask for help.

## Warm-up

1. In one sentence: simplest case of a script, and what effort it saves.
2. Write the two-character marker that must be at the **head** of the file. What follows it immediately?
3. Recite the six example first lines from the notes. What kind of program is each (shell / language / utility)?

## Construct

4. Write a file that prints `hello` using a list of system commands. Run it by feeding it to `sh` without making it executable. Run it by feeding it to `bash` the same way.
5. Make that file **directly executable** and run it as a path in the current directory. If it fails, fix the two usual causes from this topic (permission; how you spell the path).
6. Change the first line to bash vs sh. Run with `./…` and prove which interpreter ran (for example print the name of this shell process inside the script).

## Predict

7. `bash scriptname` when line 1 says `#!/bin/sh` — who interprets?
8. `./scriptname` after chmod, line 1 `#!/bin/bash` — who interprets?
9. `./scriptname` with no execute bit — what happens?
10. `scriptname` with no `./` and the directory not on `PATH` — what happens?
11. `#!/usr/bin/env python` vs `#!/usr/bin/python` — when does the notes’ `env` form help?
12. Why do sed and awk sha-bangs include `-f`?

## Find this

13. On this machine, confirm the interpreter paths from the notes exist (`sh`, `bash`, `perl`, `env`, `sed`, `awk` — skip if a language is not installed).

## Repeat

14. Same three-line script: invoke three ways from the notes (two shells by name, then chmod + `./`). Which ways needed the execute bit?

## Scenario

15. A teammate emails a script with a correct first line but `permission denied` when they type `./deploy`. Another teammate’s copy runs with `bash deploy` but `./deploy` uses the wrong shell. Diagnose both using only this topic.
