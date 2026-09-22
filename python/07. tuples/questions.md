# Tuples — Questions

Cover the Answers section. Answer first, then check.

1. What is a tuple (ordered / immutable / sequences)? Two differences from lists?
2. Recite `tup0` `tup1` `tup2` `tup3`. Why is `tup3` a tuple with no `()`?
3. Empty tuple? One-element pitfall `(1)` vs `(1,)`?
4. `t = tuple(i for i in range(16))` — first and last values?
5. Recite `t[10:]` `t[:10]` `t[:10:2]` `t[10::-1]` `t[::-1]`.
6. `tup1[0] = 100` — exception text? How do you “update”? `tup1 + tup2` result?
7. Tuple operations: `+` `*` `in` `len`? `append` / `sort` / `del t[i]`?
8. `count` / `index`?

---

## Answers

1. Ordered immutable collection; sequences like lists. Cannot change; parentheses vs square brackets.
2. `()` · mixed physics/years · `1..5` · `"a".."d"` without parens. Commas make a tuple.
3. `()`. `(1)` is int `1`; `(1,)` is a one-item tuple.
4. `0` and `15`.
5. `(10 … 15)` · `(0 … 9)` · `(0, 2, 4, 6, 8)` · `(10 … 0)` · `(15 … 0)`.
6. `TypeError: 'tuple' object does not support item assignment`. Concatenate a new tuple. `(12, 34.56, 'abc', 'xyz')`.
7. Concat, repeat, membership, length. No — those mutate / need a list.
8. Occurrences · position (`ValueError` if missing).
