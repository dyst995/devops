# Tasks — Tuples

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: say the answer out loud first, then prove it.

1. [ ] Tuple vs list (ordered? mutable? brackets?). Recite `tup0` `tup1` `tup2` `tup3` (no parens). Single-element: `(1,)` vs `(1)`?
2. [ ] `t = tuple(i for i in range(16))`. Predict `t[10:]`, `t[:10]`, `t[:10:2]`, `t[10::-1]`, `t[::-1]`. Slice type?
3. [ ] `tup1[0] = 100` — exact exception. `tup3 = tup1 + tup2` — are `tup1`/`tup2` changed?
4. [ ] Recite `(1,2)+(3,4)`, `(1,2)*3`, `3 in (1,2,3)`, `len`, `max`, `min`.
5. [ ] `count` / `index` (`ValueError` if missing). No `append` / `sort` / `del t[i]` — why?
6. [ ] Interview: why use a tuple as a dict key when a list cannot (hash / immutable)? Tie to working-with-data.
7. [ ] Unpack `a, b, c = 1, 2, "john"` — is the right-hand side a tuple?
8. [ ] Write from memory: empty tuple; mixed-type tuple; concatenate two tuples; reverse a range tuple with `[::-1]`.
9. [ ] Predict: `type((1))` vs `type((1,))`.
10. [ ] Combined: TypeError on item assign; `+` new tuple; `in` / `len` / `index`; one-item comma; slice stays tuple.
