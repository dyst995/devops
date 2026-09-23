# Tasks — Special characters

Close `theory.md`. After construct tasks, look at the output and name the special character that caused it.

## Warm-up

1. Definition: when is a character special? Building blocks of a script (three)?
2. Recite every row of the table from memory. Check.
3. `#` vs `#!` — when is it a comment?
4. One `;` vs two `;;` — jobs.
5. Space after `.` vs `./name` — two meanings of a dot.

## Predict, then run

6. Put two `echo`s on **one** line so both run. Confirm both lines of output.
7. `name=devops` then print it once so the value shows, once so `$name` shows as characters. Which quoting is which?
8. Print a dollar sign followed by `HOME` as **letters**, without single quotes. Which character did you need?
9. Capture today’s date **inside** an `echo` using the table’s substitution form. Confirm the date is in the output.
10. Run the null command; report status. Compare to a real `true` if you want.

## Construct

11. A tiny `case` on `$1` with two options and a default. Each option must end the way the table requires.
12. A file `lib.sh` that sets `COURSE=bash`. From an interactive shell, bring that file in **without** starting a subshell, then print `COURSE`. Then run a **different** file in the current directory by path (not by sourcing).
13. In `let` / `(( ))`, set `a` to 9 and a second variable to `15 / 3` in **one** arithmetic expression using the table’s operator. Show both values after.

## Repeat

14. Same `echo` of `$USER` three ways: partial quotes, full quotes, backslash before `$`. Three outputs; three names from the table.
15. Write a line that looks like two commands but the second is only a comment. What runs?

## Scenario

16. A teammate runs `. deploy.sh` and `./deploy.sh` and says they are the same because both start with a dot. Demonstrate a difference (environment left behind vs a separate run) and name both table rows.
