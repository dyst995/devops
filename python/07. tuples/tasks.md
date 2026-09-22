# Tasks — Tuples

Close `theory.md`. Recite immutable + parentheses, then write.

1. [ ] **Learn:** ordered, **immutable**, `( )` (list is `[ ]` mutable). Recite `tup0`–`tup3` (commas without parens still a tuple).
2. [ ] **Memorize:** one item needs `(1,)`. `(1)` is int `1`.
3. [ ] **Write:** `t = tuple(i for i in range(16))`. Memorize `t[10:]`, `t[:10]`, `t[:10:2]`, `t[10::-1]`, `t[::-1]`. Slice type = tuple.
4. [ ] **Write:** `tup1[0] = 100` → **TypeError**. `tup3 = tup1 + tup2` — new tuple; originals unchanged.
5. [ ] **Write:** `(1,2)+(3,4)`, `(1,2)*3`, `3 in (1,2,3)`, `len` `max` `min`.
6. [ ] **Memorize:** `count` / `index` (`ValueError` if missing). No `append` / `sort` / `del t[i]`.
7. [ ] **Learn:** tuple as dict key (hashable); list cannot. One sentence.
8. [ ] **Write:** unpack `a, b, c = 1, 2, "john"`.
9. [ ] **Write:** `type((1))` vs `type((1,))`.
10. [ ] **Memorize (cover):** `()` empty; TypeError on item assign; `+` new; `[::-1]` still tuple; trailing comma.
