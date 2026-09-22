# tup1[0] = 100 worked

`tup1 = (12, 34.56)`, `tup2 = ('abc', 'xyz')`. Assignment `tup1[0] = 100` was supposed to fail. Combining them should produce a **new** tuple `(12, 34.56, 'abc', 'xyz')` without changing `tup1`.

Right now either a **list** was used, or `+` was skipped and the old tuple was mutated.

**Goal:** Exact `TypeError: 'tuple' object does not support item assignment`. `print(tup3)` matches the notes. Parentheses vs list `[]`.
