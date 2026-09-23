# Still prints 4 and 5

`for i in {1..5}` should print `1` `2` `3` and **stop** — the notes’ `break` when `i` equals 3.

Right now 4 and 5 still print. A second variant should **skip** the rest of the cycle when `i` is 3 but **still run** 4 and 5 (`continue`), with at least one command after the test so you can see the skip.

**Goal:** First loop output is `1` `2` `3` only. Second loop uses `continue` (not `break`). Explain terminate vs next iteration.
