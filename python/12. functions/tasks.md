# Tasks — Functions

Close `theory.md`. Recite the skeleton, then write the course functions.

1. [ ] **Memorize:** `def name(args):` indent; docstring first; skip/`return` → **None**.
2. [ ] **Write:** `printme` + two EPAM strings. Docstring does not print. Implicit None.
3. [ ] **Write:** `changeme` + `append([1,2,3,4])`. Memorize both prints match (same list). Nested list = one item.
4. [ ] **Write:** `add(1,2)` `add(b=2,a=1)` `add(1,b=2)` — all 3. Positional left→right; keywords by name.
5. [ ] **Memorize errors:** `add(a=1, 2)` SyntaxError (positional after keyword); `add(2, a=1)` TypeError (multiple values for `a`).
6. [ ] **Write:** `add(a, b=2)`; `add(1)` → 3. `def add(a=1, b)` SyntaxError. Defaults on the **right**.
7. [ ] **Write:** `echo(a,b,c=3,*args,**kwargs)` — memorize the five course call prints.
8. [ ] **Learn:** rebind `mylist = []` inside does **not** replace caller’s list; `append` does.
9. [ ] **Memorize:** `*args` tuple, `**kwargs` dict.
10. [ ] **Memorize (cover):** None return; same-list append; two errors; default on right; echo table.
