# Tasks — Lists

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Interview drill: say the answer out loud first, then prove it.

1. [ ] What is a list (vs array)? Recite `list1` `list2` `list3`. `[ ]` here — notation or literal?
2. [ ] Ordered: `[1, 2, 3, 4] == [4, 1, 3, 2]`? Mixed types OK? Nested OK? Empty list?
3. [ ] `a = ['foo', 'bar', 'baz', 'qux', 'quux', 'corge']` — `a[0]`, `a[-1]`, `a[1:4]`. Same slice rules as strings.
4. [ ] Recite nested `x`. Predict `x[1]`, `x[1][0]`, `x[1][1]`, `x[3]`, `print(x[3][0], x[3][1])`.
5. [ ] Mutable: `list1[2] = 2001`, `del list1[2]`. In-place vs new object (working-with-data).
6. [ ] Recite `+`, `*`, `in`, `len`, `max`, `min`, `sum`, `sorted`. Which return a **new** list?
7. [ ] Recite methods: `append` `count` `extend` `index` (`ValueError`) `insert` `pop` / `pop(0)` `remove` `reverse` `sort` / `sort(reverse=True)`.
8. [ ] Interview trap: `extend([4,5,6])` vs `append([4,5,6])` — length and last element. Prove it.
9. [ ] `index` missing vs `remove` missing — which errors? `pop` default vs `pop(0)`.
10. [ ] Combined: ordered equality; nest `x[1][1][0]`; mutate one index; `extend` not flatten-by-append; `sort` in place vs `sorted` new list.
