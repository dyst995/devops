# End still prints after break

`for i in range(4)` prints `i` then `break`s. `else` should **not** run — notes’ output is only `0`.

A second loop `for i in range(5)` with the same `else: print("End")` **should** print `0`–`4` then `End` (iteration finished).

Right now both print `End`, or neither does.

**Goal:** Match both course outputs. Same rule on a `while`/`else`: `else` runs when the test becomes False; not after `break` or `return`.
