# Tasks — Conditions

Close `theory.md`. Predict status or printed text **before** you run.

## Warm-up

1. List the six condition tools.
2. `[` vs `test`? 0 vs 1 meaning for `test`?
3. Recite `-n` `-z` `-d` `-f` `-w` `-a` `-o` `!` `( EXPRESSION )`.
4. `[[` keyword or command? Which four operators error inside `[ ]` but work in `[[ ]]`?
5. `(( ))` / `let`: non-zero **value** → which **status**?

## test / `[ ]`

6. Create a regular file. Run the notes’ `test -f && echo` and `[ -f ] && echo`. Then `[ -f ]` on a **missing** name with `|| echo`.
7. After a **failing** command, set a variable only if `$?` is not 0 (notes’ `ifup` pattern — any failing command is fine).
8. `-n` vs `-z` on `hello` and on `""`. `-d` on `.` vs `-f` on `.`. `-w` on a file you can write.

## `[[ ]]` vs `[ ]`

9. `string_with_spaces='some spaces here'`. `if [[ -n … ]]`. Then the same with `[`. Full outputs.
10. Inside `[[ ]]`, combine two tests with `||`. Try the same `||` **inside** `[ ]` and record what happens.

## `(( ))`

11. `(( 0 && 1 ))` then `$?`. `var=-2 && (( var+=2 ))` then `$?`. Why both 1?
12. `(( 1 + 1 ))` then `$?`. Contrast with task 11.

## if / case

13. Write the course `if` / `elif` / `else` / `fi` skeleton. Run it with condition1 true, then only condition2 true, then neither.
14. Recreate the init-style `case "$1"` with `start` / `stop` / `*` usage + `exit 1`. Prove three invocations.
15. Recreate `args.sh` from the notes (`set -euo pipefail`, `-m` `-n` `-h`, default 5). Match all three sample runs.

## Lists

16. Three commands on an AND list: second fails. Which run?
17. Three commands on an OR list: second succeeds. Which run?
18. Replace a small `if` with a list: “if file missing, print `No such file`” using only the notes’ `||` pattern.

## Scenario

19. A helper must: refuse empty args (help + fail); accept `-m` / `-n` like the notes; use `[[ ]]` so a message with spaces is still “non-empty”; use `(( COUNT ))` or `let` so count `0` is treated as false. Demonstrate each branch.
