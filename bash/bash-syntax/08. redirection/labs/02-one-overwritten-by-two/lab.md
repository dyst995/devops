# one was overwritten by two

`file` should end with both `one` and `two` after the notes’ two `echo`s. Right now the second write replaced the first.

A listing file from `ls -la` must be **created** if missing and **truncated** if it already exists. A third file must be emptied without deleting it (`:` null command, or bare `>`).

**Goal:** Append vs overwrite vs truncate-to-zero. `cat` after each step matches the notes (`one`, then `one` / `two`).
