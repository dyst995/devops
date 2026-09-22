# Tasks — Tuples

Close `theory.md`. Predict type, value, or exception **before** you run.

## Warm-up

1. Tuple vs list (change? brackets?). Ordered? Sequence?
2. Recite `tup0`–`tup3`. `tup3` without parentheses — `type`?
3. `type((1))` vs `type((1,))`.

## Slices

4. Build `t` with `tuple(i for i in range(16))`. Recreate every course slice (`[10:]` `[:10]` `[:10:2]` `[10::-1]` `[::-1]`). Match the tuples in the notes.

## Update / operations

5. `tup1 = (12, 34.56)` then `tup1[0] = 100`. Exact exception.
6. `tup3 = tup1 + tup2` with `('abc', 'xyz')`. Print. Are `tup1` / `tup2` unchanged?
7. `*` `in` `len` `count` `index`. Try `append` or `sort` — what happens?

## Scenario

8. Pack four letters as `tup3` (no parens). Concatenate onto `(12, 34.56)`. Slice the result with a step. Prove you cannot assign to an index; you can only build a new tuple.
