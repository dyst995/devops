# NameError after cleanup

`a = 1`, `b = 2`, `c = "Hello"`. After deleting those names (one `del`, then a `del` of two names, as in the notes), a later `print(a)` must fail.

Right now `print(a)` still shows `1`, or you only rebound `a` to something else.

**Goal:** `print(a)` raises `NameError: name is not defined`. `b` and `c` are gone too. Do not type the notation brackets from the `del` syntax line.
