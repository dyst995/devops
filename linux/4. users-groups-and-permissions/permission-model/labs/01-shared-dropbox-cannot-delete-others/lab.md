# Shared dropbox: cannot delete others’ files

Work under `/srv` or `/tmp`. Do not change `/usr/bin`.

`/srv/dropbox` is shared by `drop1` and `drop2` (create them). Both can create files. Neither may delete the other’s files. They may delete their own.

**Goal:** Demonstrate all three behaviors.
