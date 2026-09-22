# Scopes — Questions

Cover the Answers section. Answer first, then check.

1. Global vs local (where defined, where visible)?
2. `total = 0` then local `total = arg1 + arg2` in `sum(10, 20)` — inside print? outside print? Why 0 outside?
3. When is `global` required? When not? What does Python assume if you assign inside a function?
4. `add_money` with `money = money + 1` and `global` commented — what happens? Uncommented?
5. LEGB letters, in lookup order?
6. Lambda: anonymous? how many expressions? Recite `sum = lambda a, b: a + b` calls and results. Need `()` to call?
7. `globals()` vs `locals()`? `lambda: locals()` → `{}`? `def q` with `qwert = 1`?

---

## Answers

1. Global: not inside a function, whole program. Local: inside a function, that function only.
2. `30` · `0`. Local `total` does not change the global.
3. To **assign/change** a global. Not for print/access. Assignment → local unless declared `global`.
4. `UnboundLocalError` (local `money` used before set). Both prints `2001`.
5. Local, Enclosing, Global, Built-in.
6. Yes. One. `30` and `40`. Yes.
7. Dict of global names · dict of local names. No locals in that lambda. `{'qwert': 1}`.
