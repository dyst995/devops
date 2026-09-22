# Tasks — Lists

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.


Close `theory.md`. Predict the list **before** you run.

## Warm-up

1. [ ] Definition + how to write a list. Ordered? Mutable? Nested? Arbitrary objects?
2. [ ] Recite `list1` `list2` `list3`. `[1,2,3,4] == [4,1,3,2]`?

## Index / nest / mutate

3. [ ] `a = ['foo', 'bar', 'baz', 'qux', 'quux', 'corge']` — `[0]`, `[-1]`, a slice of three middle names.
4. [ ] Recreate `x`. Print every course index (`x[1]`, `x[1][0]` … `x[3][1]`).
5. [ ] `list1[2] = 2001` then `print(list1[2])`. Then a **fresh** `list1` and `del list1[2]`. Match the notes.

## Operations / builtins

6. [ ] `+`, `*`, `in`. `len` `max` `min` `sum` `sorted` on a small int list. Is the original still unsorted after `sorted`?

## Methods (notes’ examples)

7. [ ] `append(3)` on `[1, 2]`. `count(3)` on `[1, 2, 3, 3]`.
8. [ ] `extend([4, 5, 6])` vs `append([4, 5, 6])` on copies of `[1, 2, 3]`.
9. [ ] `index(5)` on `[1, 5, 3]`. Then `index` of a missing value.
10. [ ] `insert(1, 2)` on `[1, 3]`.
11. [ ] `pop()` then `pop(0)` on `[1, 2, 3, 4, 5]` — returned values and final list.
12. [ ] `remove('a')` on `[1, 2, 'a', 3, 4]`.
13. [ ] `reverse()` on `[1, 2, 3, 4, 5]`. `sort()` then `sort(reverse=True)` as in the notes.

## Scenario

14. [ ] Nested list like `x`. Update a year in `list1`, delete one index, `extend` more items, `sort(reverse=True)` a numeric copy. Show `append` did not flatten.
