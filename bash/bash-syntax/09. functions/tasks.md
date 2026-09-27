# Tasks — Functions

Close `theory.md`. Work in `/tmp/functions-tasks` when creating scripts. Predict output **before** you run. Put `exit` only **inside scripts** — `return` ends a function; bare `exit` in your interactive shell ends the session.

## Warm-up

1. Course definition (subroutine / black box). When to use a function (repetitive code / slight variations)?
2. Recite the `function_name () { … }` form. Call with two arguments. Names inside (`$1` `$2`)?
3. Status with explicit `return` vs last command vs reading `$?` in the script.
4. Recite the memory hook: `return` = leave the **function**. `exit` = leave the **script**.

## Define and call

5. Under `/tmp/functions-tasks`, recreate `print_args` from the notes (`local var1=$1`, `local var2=$2`, two echoes). Call `print_args /tmp hello`. Both lines.
6. Call it with one argument. What is `$2` / `var2`?
7. Call it with three arguments. Do `$1`/`$2` still work? Where did the third go unless you read `$3`?
8. Two functions that differ only slightly (e.g. greeter with a default word). Show why a function beats copy-paste.

## `local` vs leak

9. Same names as `var1` **without** `local`. Set `var1` outside, call the function, print `var1` after. Then with `local` — does the outside value change?
10. Function sets a name without `local`; prove it is visible after the call. Fix with `local` and re-prove.

## Exit status and `return`

11. Function with no `return` whose last command succeeds. `$?` after the call?
12. Function with no `return` whose last command fails (`false` or missing `ls`). `$?` after the call?
13. `return 0` after a failing command inside the function. `$?` after the call? Predict before run.
14. `return 1` after a successful `echo` inside the function. `$?` after the call?
15. After `retfunc` only (notes), print `$?`. What number?

## `return` vs `exit`

16. Recreate `func.sh` from the notes (`retfunc` with `return 1`, `exitfunc` with `exit 1`). Full output. Which echo is missing and why?
17. Run a variant that only calls `retfunc` (comment out / omit `exitfunc`). Confirm “We are still here” and `$?` is 1.
18. Call `exitfunc` from a script and prove a following echo never runs. Confirm the **script’s** status is 1 (`bash script; echo $?` — do not rely on interactive `exit`).

## Scenario

19. One function takes a path and a word, prints them as `print_args` does, `return 1` if the path is missing (`[ ! -e … ]`). The script prints a line after the call (“still here”) and prints `$?`. A second function must **stop the script** with status 1 (`exit`). Prove “still here” vs never-after-`exit` under `/tmp/functions-tasks` with two separate runs.
