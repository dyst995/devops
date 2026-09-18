# 3.9 became 4

`int(3.9)` is supposed to be a whole number from a float (working-with-data conversion, toward zero). A second value `1 / 2` must be a **float**. `3+4j` must expose `.real` and `.imag`.

Right now `int(3.9)` is `4` (rounding) or `/` is treated as int division.

**Goal:** `int(3.9)` is `3`. `1 / 2` is `0.5` with `type` `float`. `//` is the integer floor divide. Complex parts are floats `3.0` and `4.0`.
