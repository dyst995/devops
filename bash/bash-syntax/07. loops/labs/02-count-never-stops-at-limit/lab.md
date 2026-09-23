# Count never stops at LIMIT

`LIMIT=10`. A loop should print `a` on one line with spaces (`echo -n`) and increment with `let` until `a` is no longer `≤ LIMIT`, like the notes’ `while`.

Right now it either uses a `for` list of fixed numbers, or it never increments, or it uses `until` with the **same** condition as `while` (so it does the opposite of what you wanted).

**Goal:** Recreate the `while` behavior. Then write an `until` that is the **opposite** test (notes: opposite of `while`). Both stop using a test **at the top**. Number of repetitions was not known as a `[list]` in advance.
