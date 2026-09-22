# Tasks — Strings

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.


Close `theory.md`. Use `what = 'This parrot is dead'`. Predict **before** you run.

## Warm-up

1. [ ] First index? Last character’s index form? Slice includes the stop?
2. [ ] Recite `what[0]` `[3]` `[-1]` `[0:4]` `[5:11]` `[1:]` `[:3]` `[1:-1:2]` `[:]` `[::-1]`.

## Index / slice

3. [ ] Run every course subscript on `what`. Match the REPL lines.
4. [ ] `what[:100]` — exception or whole rest? `what[100]` as a **single** index?
5. [ ] Copy with `[:]`. Reverse with `[::-1]`.

## Formatting / raw

6. [ ] Recreate all four formatting prints (`f`, two `%`, `.format` position and keyword, Billi/`{0}e`).
7. [ ] `'C:\\nowhere'` vs `r'C:\\nowhere'`. When do you want `r`?

## Methods

8. [ ] `upper` / `lower` / `strip` / `split` / `join` round-trip the sentence.
9. [ ] `replace` parrot → slug; `find` vs `index` on a **missing** substring.
10. [ ] Assign vs not: `s.upper()` then print `s`. Then `s = s.upper()`.

## Scenario

11. [ ] From `what`, take `'parrot'` by slice (not `split`). Format a line with an f-string that includes that slice. Reverse the whole string. `split` into words and `join` with `-`.
