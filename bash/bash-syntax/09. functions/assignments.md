# Assignments — Functions

Close `theory.md`. Recite the **black box**, then write `func.sh`.

1. [ ] A function is a **subroutine** / **black box**. When to use one (repetitive code, slight variations)?
2. [ ] Recite the form: `function_name () { command... }`
3. [ ] Functions may take **arguments** and **return an exit status** for the script.
4. [ ] Call: `function_name $arg1 $arg2`. Inside, arguments are **positional** — `$1` `$2` like a script.
5. [ ] Recreate `print_args`: `local var1=$1` `local var2=$2`, two echoes. Call `print_args /tmp hello`. Exact two lines of output.
6. [ ] What does **`local`** do (variables stay **inside** the function)?
7. [ ] Memory hook: `name () { … }`; call `name arg1 arg2`; inside `$1` `$2`.
8. [ ] Exit status of a function: **explicit `return`**, else status of the **last command** (0 success, non-zero error). Read with **`$?`**.
9. [ ] **`return`** terminates the **function**. Optional **integer** becomes the function’s exit status in `$?`.
10. [ ] Recreate `retfunc` / `exitfunc` from the notes. Predict **full** output of `./func.sh`.
11. [ ] Why **We are still here** prints after `return 1`, but **We will never see this** does not print after `exit 1`?
12. [ ] Memory hook: `return` = leave the **function**; `exit` = leave the **script**. After `return 1`, `$?` is 1 and the **next line still runs**.
13. [ ] After `retfunc`, `echo $?` — expect **1**. Prove.
14. [ ] Interview: teammate’s function used `exit 1` on bad input and the whole deploy script died. What should they have used?
15. [ ] Write a function with no `return`: last command `true` vs `false` — `$?` after the call.
16. [ ] Recite: `$1` inside the function is the function’s first arg, **not** the script’s `$1`, while the function runs.
17. [ ] Call with one arg: `$2` is empty. Predict the second echo line.
18. [ ] Nested call: function A calls B. `return` from B returns to A, not to the script. Prove with two echoes.
19. [ ] Recite the three `./func.sh` output lines from the notes (retfunc, still here, exitfunc).
20. [ ] Combined: definition; `name () {}`; `$1` `$2`; `local`; status = `return` or last command; `return` vs `exit`; `func.sh` output.
