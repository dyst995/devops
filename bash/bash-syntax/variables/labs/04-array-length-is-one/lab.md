# Array length is 1

`arrayX=(a ab abc)` (or `my_array` with seven slots including `six` at index 6). A line meant to show **how many elements** prints `1`.

The same kind of expansion on a string `abcABC123ABCabc` correctly prints `15`.

**Goal:** Print the string length `15`, the first-element length `1`, and the real element counts from the notes (`7` / `7` for the seven-slot array, or `3` if you only built `arrayX`). Explain why the “length” expansion on an array name is not the element count.
