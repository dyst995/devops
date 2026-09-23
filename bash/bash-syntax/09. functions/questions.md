# Functions — Questions

Cover the Answers section. Answer first, then check.

1. What is a function (subroutine / black box)? When should you consider one?
2. Recite the `function_name () { … }` form. How do you call it with two args?
3. How does the function see those args? Same idea as what (scripts)?
4. `print_args /tmp hello` — `$1` `$2`? Why `local`? Full two echo lines.
5. What do functions return? If there is no `return`? How does the script read it?
6. What does `return` do? Optional argument? Where does that integer go?
7. `retfunc` vs `exitfunc` in `func.sh` — what prints? Why is “We are still here” shown and “We will never see this” not?

---

## Answers

1. A code block / black box for a specified task. Repetitive code, same task with slight variations.
2. As in the notes. `function_name $arg1 $arg2`
3. By position: `$1`, `$2`, … Positional parameters.
4. `/tmp` · `hello`. Visible only in the function. `first function argument is: /tmp` then `second function argument is: hello`
5. Exit status. Last command’s status (0 ok, nonzero error). `$?`
6. Terminates the function. Integer = function’s exit status, assigned to `$?`.
7. `this is retfunc()` · `We are still here` · `this is exitfunc()`. `return` stays in the script; `exit 1` aborts before the last echo.
