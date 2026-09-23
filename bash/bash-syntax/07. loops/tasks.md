# Tasks — Loops

Close `theory.md`. Predict output **before** you run.

## Warm-up

1. Course definition of a loop. Three kinds. Two control commands.
2. Recite `for` / `while` / `until` skeletons (`do` / `done`).
3. `for` vs `while`: known list vs unknown count.
4. `while` vs `until`: true vs false at the top.

## For

5. `for arg in one two three` — print `arg` each pass. How many passes?
6. Recreate the notes’ `find . -type l` loop piped to `sort`. (Make a couple of symlinks if the tree has none.) What is `file` each time?
7. `{1..5}` print each `i`. No `break`.

## While / until

8. `LIMIT=10`, start `a` at a number so `-le` is legal. Recreate the notes’ `while` (`echo -n`, `let "a+=1"`). Full line of output.
9. Same bound as an `until` (opposite condition). Same printed numbers? When does each stop?
10. A `while` whose condition is already false — how many times does the body run? Same for `until` whose condition is already true.

## break / continue

11. Notes’ `{1..5}` + `break` at 3. Output. Why 3 is there and 4 is not.
12. Same loop, `continue` when `i` is 3, and an `echo done $i` **after** that test. Which `done` lines print?
13. `break` vs `continue` in one sentence each, from memory.

## Scenario

14. Print every symlink under `.` sorted (`for`). Count up to a `LIMIT` you did not hard-code as a list (`while`). Stop early at a given value (`break`). Skip one value but keep going (`continue`).
