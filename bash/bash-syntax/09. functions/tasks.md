# Tasks — Functions

Close `theory.md`. Predict output **before** you run.

## Warm-up

1. Course definition (subroutine / black box). When to use a function?
2. Recite the `()` / `{` / `}` form. Call with two arguments. Names inside?
3. Status with `return` vs last command vs `$?`.

## Arguments

4. Recreate `print_args`. Call `print_args /tmp hello`. Both lines.
5. Call it with one argument. What is `$2` / `var2`?
6. Same names as `var1` **without** `local`. Set `var1` outside, call the function, print `var1` after. Then with `local` — does the outside value change?

## return vs exit

7. Recreate `func.sh`. Full output. Which echo is missing and why?
8. After `retfunc` only (comment out `exitfunc`), print `$?`. What number?
9. A function with no `return` whose last command fails. `$?` after the call?
10. `return 0` after a failing command inside the function. `$?` after the call?

## Scenario

11. One function takes a path and a word, prints them as `print_args` does, `return 1` if the path is missing. The script prints a line after the call. A second function must **stop the script** with status 1. Prove “still here” vs never after `exit`.
