# Tasks — Loops

Close `theory.md`. Work in `/tmp/loops-tasks` when creating files and symlinks. Predict output **before** you run. Prefer scripts for long/infinite loops so you never trap your interactive shell.

## Warm-up

1. Course definition of a loop. Three kinds. Two control commands.
2. Recite `for` / `while` / `until` skeletons (`do` / `done`).
3. `for` vs `while`: known list vs unknown count beforehand.
4. `while` vs `until`: true vs false at the top. Same `do` / `done`?

## For loop

5. `for arg in one two three` — print `arg` each pass. How many passes?
6. Under `/tmp/loops-tasks`, create a couple of symlinks if needed. Recreate the notes’ `for file in "$( find . -type l )"; do echo "$file"; done | sort`. What is `file` each time? Why pipe to `sort`?
7. `{1..5}` print each `i`. No `break`. Predict `1` through `5`.
8. `for` over filenames in the workdir (`for f in *.txt`) — create three `.txt` files first. How many passes if a glob matches nothing in your shell settings? (Note what you observe.)

## While loop

9. `LIMIT=10`, start `a` at a number so `-le` is legal (e.g. `a=0` or `a=1`). Recreate the notes’ `while` (`echo -n`, `let "a+=1"`). Full line of output.
10. A `while` whose condition is already false — how many times does the body run? Prove with a script.
11. `while` reading lines from a file (you may use `read` in the body) until you decide to stop — emphasize “count not known beforehand.”

## Until loop

12. Same bound as task 9 as an `until` (opposite condition). Same printed numbers? When does each stop?
13. An `until` whose condition is already true — how many times does the body run? Contrast with task 10.
14. Rewrite a tiny countdown with `until` (“until `a` equals `LIMIT`”) and confirm it stops when the condition becomes true (status 0).

## break / continue

15. Notes’ `{1..5}` + `break` at 3. Output. Why 3 is there and 4 is not.
16. Same loop, `continue` when `i` is 3, and an `echo done $i` **after** that test. Which `done` lines print? Which are skipped?
17. `break` vs `continue` in one sentence each, from memory.
18. Nested feel without real nesting: loop `{1..5}`, `continue` on even numbers (print only odds), then a second loop that `break`s at first even. Two different outputs.

## Mix the three kinds

19. Print a fixed list with `for`. Count up to a `LIMIT` you did not hard-code as a list (`while`). Wait until a flag file appears (`until [ -f flag ]` — create the flag in another step or after a short setup). One workdir, three loop kinds.

## Scenario

20. Under `/tmp/loops-tasks`: print every symlink under `.` sorted (`for`); count up to a `LIMIT` you did not hard-code as a list (`while`); stop early at a given value (`break`); skip one value but keep going (`continue`). Show all four behaviors with clear output labels.
