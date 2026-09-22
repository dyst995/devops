# Tasks — Scopes

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: predict prints and exceptions **before** you run.

1. [ ] Global vs local (definitions). Recite `total = 0` / `sum` example. Inside print? Outside print? Why not 30 outside?
2. [ ] When do you need `global`? When not (print / read)? Recite the `money` example with the line commented — exact error.
3. [ ] Uncomment `global money` — both prints? Recite: assignment inside → local unless `global`.
4. [ ] Recite **LEGB** in order and one sentence each (Local, Enclosing, Global, Built-in).
5. [ ] Recite `lambda` notation. `sum = lambda a, b: a + b` — call with `()`. Prints for `(10,20)` and `(20,20)`. Builtin `sum` shadowed?
6. [ ] `globals()` vs `locals()` — what dicts? Lambda `q = lambda: locals()` → `{}`. `def` with `qwert=1` → `{'qwert': 1}`.
7. [ ] Interview: `money = money + 1` without `global` — why UnboundLocalError (Python already decided local because of assignment)?
8. [ ] Nested `def`: name in inner not assigned, exists in outer — which LEGB letter hits? Sketch it.
9. [ ] Write from memory: global `total` stays 0; `global money` increments; lambda one expression; `locals()` empty in that lambda.
10. [ ] Combined: two `total` names; `global` only for assign; L→E→G→B; call lambda with `()`; `globals()` is the module dict.
