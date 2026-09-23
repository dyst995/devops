# moving on never prints

A script echoes `Check non-existing file`, then tries to `cat` a file that is not there, then would echo `moving on`. When you run it, you see the check line and the `cat` error, but **not** `moving on`.

You did not write `exit` anywhere.

**Goal:** Explain why the script stopped. Change it so `moving on` **does** print after the same missing file, without removing the `cat`. Prove both behaviors (stop vs continue) on copies of the script.
