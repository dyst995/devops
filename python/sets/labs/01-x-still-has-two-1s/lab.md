# x still has two 1s

`x = {1, 2, 3, 1, 2}` and `y = {2, 4, 5}`. Printing `x` still shows duplicates, or `&` `|` `-` `^` are mixed up.

**Goal:** `x` has each number once. The four prints match intersection / union / difference / symmetric difference (`{2}`, `{1,2,3,4,5}`, `{1,3}`, `{1,3,4,5}`). Convert with `list(x)`. Empty set is `set()`, not `{}`.
