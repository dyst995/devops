# generic.data when no filename

A processing block should operate on `generic.data` unless the user passes a filename as the first argument.

Right now, with no arguments, `filename` is empty and the block looks for a file named nothing. Passing `report.csv` should still use `report.csv`.

**Goal:** Omit `$1` → work on `generic.data`. Pass a name → use that name. Empty `$1` should behave like “missing,” as in the notes’ `:-` form.
