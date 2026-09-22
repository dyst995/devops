# remove(5) was silent

`{2, 3, 4}`: `discard(5)` must **not** raise. `remove(5)` must be **`KeyError: 5`**.

`add(4)` on `{1,2,3,4,5}` must not grow a second `4`; `add(6)` must add `6`. After `clear()`, the value prints as **`set()`**.

**Goal:** Notes’ `add` / `pop` / `discard` / `clear` sequence, plus `remove` vs `discard` on a missing `5`. `pop()` returns some member (the slide showed `1`; yours may differ).
