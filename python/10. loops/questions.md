# Loops — Questions

Cover the Answers section. Answer first, then check.

1. Recite the `while i > 0` countdown (`i = 10`). What prints? When is the test checked?
2. `for i in range(10)` — which numbers? Does it include 10?
3. List comprehension one-liner and the printed list.
4. What does `break` do (course wording)? After `break`, where does control go?
5. `"string"` + `break` on `"i"` — full output including `The end`. Why no `n` / `g`?
6. What does `continue` do (course wording)? Same loop with `continue` — full output. Why `n` and `g`?
7. `while` `else`: when does `else` run? When does it **not** (two statements)? Comment on the notes’ `else` (`i > 0 == False`)?
8. `for i in range(5)` with `else: print("End")` — output? Comment `# end of iteration` means?
9. `for i in range(4)` with `print` then `break` then `else: print("End")` — output? Why no `End`?

---

## Answers

1. `10` down to `1`. At the beginning of each iteration.
2. `0` … `9`. No.
3. `l = [i for i in range(10)]` → `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]`
4. Terminates the loop containing it. The statement immediately after the loop body.
5. `s` `t` `r` then `The end`. Loop stopped at `"i"`.
6. Skip the rest of the body for **this** iteration only; loop continues. `s` `t` `r` `n` `g` then `The end`. `"i"` skipped, loop did not stop.
7. Condition False after a **normal** finish. Not after **`break`** or **`return`**. `else` is the “test is now False” path.
8. `0`–`4` then `End`. Iterator finished.
9. `0` only. `break` is premature; `else` skipped.
