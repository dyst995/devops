# Tasks — Scopes

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.


Close `theory.md`. Predict prints or exceptions **before** you run.

## Warm-up

1. [ ] Global vs local in one sentence each.
2. [ ] `global` needed to **read** or to **assign**? LEGB order?
3. [ ] Lambda: args vs expressions. Call with `()`?

## Local vs global

4. [ ] Recreate `total` / `sum(10, 20)`. Inside and outside prints.
5. [ ] Recreate `add_money` **without** `global`. Exception name. Then with `global money`. Both `print(money)` values.

## LEGB / lambda / namespaces

6. [ ] Nested `def` (outer `x = 1`, inner `print(x)`): which LEGB letter is `x`?
7. [ ] Recreate `sum = lambda a, b: a + b`. Both course prints.
8. [ ] `q = lambda: locals()` then `q()`. Then `def q` with `qwert = 1` and `print(locals())`.
9. [ ] At module level, is `locals()` the same idea as `globals()`? Check keys for `total` / `money` after you define them.

## Scenario

10. [ ] A counter at module level. One function only **prints** it (no `global`). One function **increments** it (`global`). One `lambda` adds two numbers. Show `locals()` inside the increment function includes the counter only after `global` / assignment as the notes imply.
