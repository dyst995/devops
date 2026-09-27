# Tasks — Conditions

Close `theory.md`. Work in `/tmp/conditions-tasks` when creating files and scripts. Predict status or printed text **before** you run. Prefer scripts for anything with `exit`.

## Warm-up

1. List the six condition tools from the notes.
2. `[` vs `test`? 0 vs 1 meaning for `test` / `[`?
3. Recite `-n` `-z` `-d` `-f` `-w` `-a` `-o` `!` `( EXPRESSION )`.
4. `[[` keyword or command? Which four operators error inside `[ ]` but work in `[[ ]]`?
5. `(( ))` / `let`: non-zero **value** → which **status**? Zero value → which status?

## test / `[ ]`

6. Under `/tmp/conditions-tasks`, create a regular file. Run the notes’ `test -f && echo` and `[ -f ] && echo`. Then `[ -f ]` on a **missing** name with `|| echo`.
7. After a **failing** command, set a variable only if `$?` is not 0 (notes’ `ifup` / `[ $? -ne 0 ] && rc=1` pattern — any failing command is fine).
8. `-n` vs `-z` on `hello` and on `""`. Report four statuses or true/false results.
9. `-d` on `.` vs `-f` on `.`. `-w` on a file you can write; then `chmod a-w` that file and retest `-w` (restore after).
10. Inside `[ ]`, combine two file tests with `-a` and with `-o`. Negate a test with `!`.

## `[[ ]]` vs `[ ]`

11. `string_with_spaces='some spaces here'`. `if [[ -n … ]]; then …; fi`. Then the same with `[`. Full outputs (including the error).
12. Inside `[[ ]]`, combine two tests with `||` and with `&&`. Try the same `||` **inside** `[ ]` and record what happens.
13. Inside `[[ ]]`, compare two strings with `<` or pattern `==`. Confirm `[` does not accept that style the same way.

## `(( ))` / `let`

14. `(( 0 && 1 ))` then `$?`. `var=-2 && (( var+=2 ))` then `$?`. Why both 1?
15. `(( 1 + 1 ))` then `$?`. Contrast with task 14.
16. Use `(( COUNT ))` or `let` so count `0` is treated as false and count `3` as true in an `if`.

## if / then

17. Write the course `if` / `elif` / `else` / `fi` skeleton. Run it with condition1 true, then only condition2 true, then neither — three different branches.
18. `if` testing **any** command (not only brackets): e.g. `if grep -q pattern file; then …; else …; fi`.
19. Recreate the idea of the notes’ network-style `if [[ … == nfs* || … ]]` with your own patterns on a variable (pattern match + `||` inside `[[ ]]`).

## case

20. Recreate the init-style `case "$1"` with `start` / `stop` / `*` usage + `exit 1`. Prove three invocations as a script.
21. Recreate `args.sh` from the notes (`set -euo pipefail`, `-m` `-n` `-h`, default `COUNT=5`). Match all three sample runs (no args → help; `-m Hello`; `-m Hi -n 1`).
22. Empty `"$@"` guard: `[[ -z "$@" ]] && help && exit 1` — prove it fires only when there are no arguments.

## Lists

23. Three commands on an AND list: second fails. Which run? Confirm the third does not.
24. Three commands on an OR list: second succeeds. Which run? Confirm the third does not.
25. Replace a small `if` with a list: “if file missing, print `No such file`” using only the notes’ `||` pattern.

## Scenario

26. A helper under `/tmp/conditions-tasks` must: refuse empty args (help + fail); accept `-m` / `-n` like the notes; use `[[ ]]` so a message with spaces is still “non-empty”; use `(( COUNT ))` or `let` so count `0` is treated as false. Demonstrate each branch with sample runs.
