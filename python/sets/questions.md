# Sets — Questions

Cover the Answers section. Answer first, then check.

1. What is a set (course sentence)? Two basic uses? Four math operations?
2. `x = {1, 2, 3, 1, 2}` — what remains? Why? Ordered?
3. Recite `&` `|` `-` `^` and the method names. Results for the notes’ `x` and `y`?
4. Empty set vs `{}`? `list(x)`?
5. `add(4)` then `add(6)` on `{1,2,3,4,5}`? `pop()` return in the notes? After `discard(4)`? After `clear()`?
6. `discard(5)` vs `remove(5)` on `{2,3,4}`?
7. Extra URL?

---

## Answers

1. Unordered collection, no duplicates. Membership testing; eliminating duplicates. Union, intersection, difference, symmetric difference.
2. `{1, 2, 3}`. Duplicates dropped. No (print order can vary).
3. intersection · union · difference · symmetric_difference(`y`). `{2}` · `{1,2,3,4,5}` · `{1,3}` · `{1,3,4,5}`.
4. `set()` not `{}` (`{}` is dict). Convert to list.
5. `4` already in (still one 4); then `6` added. `1` (arbitrary). `{2,3,5,6}`. `set()`.
6. No error. `KeyError: 5`.
7. https://docs.python.org/3/tutorial/datastructures.html#sets
