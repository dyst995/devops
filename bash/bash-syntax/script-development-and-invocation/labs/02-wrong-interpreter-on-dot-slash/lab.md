# ./script uses the wrong interpreter

`bash myscript` behaves as you expect. `./myscript` (after it is executable) does not: it is clearly not being run by bash (or not by the bash you meant).

The file is in the current directory. You may create `myscript` yourself to reproduce this.

**Goal:** `./myscript` is interpreted by bash. Prove which program interpreted it in both the broken and fixed cases.
