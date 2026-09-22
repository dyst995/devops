# add(a=1, 2) ran

`add(a, b)` must reject `add(a=1, 2)` with **SyntaxError: positional argument follows keyword argument**, and `add(2, a=1)` with **TypeError: add() got multiple values for argument 'a'**.

Defaults: `add(a, b=2)` allows `add(1)`. `def add(a=1, b)` is **SyntaxError: non-default argument follows default argument**.

`echo(a, b, c=3, *args, **kwargs)` must match all five course prints (`() {}`, `(4, 5)`, `{'d': 6}`, and `{'d': 6, 'e': 7}`).

**Goal:** Exact errors from the notes. All five `echo` lines. Positional left-to-right; keywords `name=value`; `*args` tuple; `**kwargs` dict.
