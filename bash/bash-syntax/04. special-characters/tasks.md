# Tasks — Special characters

Close `theory.md`. Work in `/tmp/special-chars-tasks` when creating files. Predict before you run where useful. After construct tasks, look at the output and name the special character that caused it.

## Warm-up

1. Definition: when is a character special? Building blocks of a script (three kinds)?
2. Recite every row of the course table from memory (`#` `;` `;;` `.` `./file` `""` `''` `,` `\` backticks `:` `$`). Check.
3. `#` vs `#!` — when is `#` a comment? When is it the sha-bang?
4. One `;` vs two `;;` — jobs in one sentence each.
5. Space after `.` vs `./name` — two meanings of a dot. Explain both.

## Comments and separators

6. Write a line that looks like two commands but the second is only a comment. What runs?
7. Put three `echo`s on **one** line with `;` so all run. Confirm three lines of output. What is the status of the whole line (last command)?
8. Predict: is `;` the same as `&&`? Prove with `false; echo still` vs `false && echo still`.

## Case terminator

9. A tiny `case` on `$1` with two options (`start` / `stop`) and a default `*`. Each option must end with `;;`. Run three ways as a **script** under `/tmp/special-chars-tasks`.

## Dot command vs path

10. A file `lib.sh` that sets `COURSE=bash`. From a shell in `/tmp/special-chars-tasks`, bring that file in **without** starting a subshell (`.` or `source`), then print `COURSE`.
11. Run a **different** file in the current directory by path (`./script.sh`), not by sourcing. Confirm a variable set inside that script does **not** appear in your interactive shell afterward.
12. List `..` and a `.hidden` name you create. Which table row is each (parent / hidden / path component)?

## Quoting and escape

13. `name=devops` then print it once so the value shows, once so `$name` shows as characters. Which quoting is which?
14. Print a dollar sign followed by `HOME` as **letters**, without single quotes. Which character did you need?
15. Same `echo` of `$USER` three ways: partial quotes, full quotes, backslash before `$`. Three outputs; three names from the table.
16. Continue a physical line with `\` at end of line so `echo hello` + `world` becomes one word. Confirm.

## Comma, backticks, null, dollar

17. In `let` / `(( ))`, set `a` to 9 and a second variable to `15 / 3` in **one** arithmetic expression using the comma operator. Show both values after (`a=9`, other=`5`).
18. Capture today’s date **inside** an `echo` using the table’s backtick substitution form. Confirm the date is in the output.
19. Run the null command `:`; report status. Compare to `true`. Start a one-iteration stand-in for `while :` that breaks immediately (script) — confirm `:` is always-true.
20. Print `$HOME` and `$?` after a successful command.

## Scenario

21. A teammate runs `. deploy.sh` and `./deploy.sh` and says they are the same because both start with a dot. Under `/tmp/special-chars-tasks`, demonstrate a difference (environment left behind vs a separate run) and name both table rows. Also show one `;` vs `;;` in a tiny `case` so they stop mixing separators with case terminators.
