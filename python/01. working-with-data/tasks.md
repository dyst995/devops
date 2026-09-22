# Tasks — Working with data

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: say the answer out loud first, then prove it in the REPL. Use https://pythontutor.com/ on alias examples.

1. [ ] Interview: what do `[ ]` mean in a **syntax description** vs in real Python code? Why are some pieces optional?
2. [ ] Recite and run both multiple-assignment lines. After `a = b = c = 1`, are they the **same object** (`is` / `id`)? After `a, b, c = 1, 2, "john"`, print all three.
3. [ ] Recite `del` syntax (notation vs what you type). `del a` then `del b, c` then `print(a)` — exact exception.
4. [ ] Recite `int(x [,base])`, `float(x)`, `str(x)`. Convert a whole number, a float (`int(3.9)`), a numeric string, and `int("10", 2)`. Is the result a **new** object?
5. [ ] Every object has three things — name them. Recite `id()`, `is`, `type()`. Can identity or type of **that** object change?
6. [ ] What makes a value mutable vs immutable? Recite the immutable list and the mutable list from the notes.
7. [ ] Recreate `x = 'foo'`; `y = x`; `y += 'bar'`. Predict `x`, `y`, and whether `id` of `y` changed. Explain to an interviewer why `x` is still `'foo'`.
8. [ ] Recreate `x = [1, 2, 3]`; `y = x`; `y += [3, 2, 1]`. Predict `x`. `x is y`? Same `id`?
9. [ ] Put both snippets in Python Tutor. One sentence: two names, one object vs rebound name.
10. [ ] Combined: two names on one list (mutate through the second, see it on the first); two names on one string (`+=` must **not** change the first); `int("10", 2)` and `float("1.5")`; `del` a name → `NameError`.
