# job KeyError instead of EPAM

`d.get('job', 'EPAM')` should print `I'm working for EPAM` without raising. `d['job']` is the form that KeyErrors.

`setdefault("node", []).append("item")` should replace the `if "node" not in d` anti-pattern. `fromkeys`, `pop` / `popitem` LIFO `('four', 4)`, and `update` (overwrite key `2`, then add `3`) must match the notes.

**Goal:** `get` default, `setdefault` list, `fromkeys` `None` vs `10`, `pop` with and without default, `update` merge. No KeyError on missing `job` when using `get`.
