# Loops — Questions

Cover the Answers section. Answer first, then check.

1. What is a loop (course sentence)? Three kinds?
2. `for`: what does `arg` become each pass? Recite `for` / `in` / `do` / `done`.
3. What does the `find . -type l` example print, and what does `| sort` do to the loop?
4. `while`: where is the test? Loops while the condition is what (status)? When do you use `while` instead of `for`?
5. Recite the `LIMIT=10` `while` body (`echo -n`, `let`). What must be true of `"$a"` before the loop?
6. `until`: test where? Loops while the condition is what? Relationship to `while`?
7. Recite `until [ condition-is-true ]; do …; done`.
8. `break` vs `continue` (exact jobs)?
9. `{1..5}` with `[[ $i -eq 3 ]] && break` — what prints and why not 4 and 5? Why is 3 printed?

---

## Answers

1. A block that iterates a list of commands as long as the loop control condition is true. For, while, until.
2. The next value from the list. `for arg in [list]; do` commands `done`.
3. Each symlink path under `.` (one `echo` per pass). Sorts that output.
4. At the top. True (exit 0). When the number of repetitions is not known beforehand.
5. Print `"$a "` with no newline; `a+=1`. `a` must already be a number (the notes use `"$a"` in `-le`).
6. At the top. False. Opposite of `while`.
7. As in the notes; body until the condition is true.
8. `break` terminates the loop. `continue` jumps to the next iteration, skipping the rest of this cycle.
9. `1` `2` `3`. `break` leaves before 4 and 5. `echo` runs before `break`.
