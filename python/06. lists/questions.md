# Lists — Questions

Cover the Answers section. Answer first, then check.

1. What is a list (course wording)? How do you write one?
2. Recite `list1` `list2` `list3`.
3. Ordered? `[1, 2, 3, 4] == [4, 1, 3, 2]`?
4. Arbitrary objects? Index and slice?
5. Nested `x`: `x[1]`, `x[1][0]`, `x[1][1]`, `x[3]`, `print(x[3][0], x[3][1])`? Size limit?
6. Mutable: `list1[2] = 2001` after `1997`? `del list1[2]` result list?
7. `+` `*` `in` vs `append`/`extend` (new list vs in place)?
8. `len` `max` `min` `sum` `sorted` vs `.sort()`?
9. Recite each method in one phrase: `append` `count` `extend` `index` `insert` `pop` `remove` `reverse` `sort`.
10. `append([4, 5])` vs `extend([4, 5])`? `pop()` vs `pop(0)` vs `del` vs `remove('a')`?
11. `index` if missing? `sort(reverse=True)` output from `[1, 2, 3, 4]`? `cmp` in Python 3?
12. Extra reading URL?

---

## Answers

1. Collection of arbitrary objects; more flexible than an array. Comma-separated objects in `[]`.
2. Mixed physics/chemistry/years · `1..5` · `"a".."d"`.
3. Yes. `False`.
4. Yes. Yes; slicing works too.
5. The inner list with `bb`…`ff` · `'bb'` · `['ccc', 'ddd']` · `['hh', 'ii']` · `hh ii`. Zero to memory.
6. Index 2 becomes `2001`. `['physics', 'chemistry', 2000]`.
7. `+` `*` new list. Methods mutate (usually).
8. Builtins; `sorted` copies. `.sort()` in place.
9. End +1 · how many · add all from iterable · position or ValueError · put at index · get-and-remove (default last) · drop by value · reverse in place · sort in place.
10. Nested one item vs four-and-five flattened. Last · first · delete index no return · delete first matching value.
11. `ValueError`. `[4, 3, 2, 1]`. Not used (`key` / `reverse`).
12. https://docs.python.org/3/tutorial/datastructures.html#more-on-lists
