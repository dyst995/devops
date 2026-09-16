# Backup /etc and restore one file

Root needs a compressed backup of `/etc` that you can restore **one file** from without unpacking the whole tree onto `/etc`.

**Goal:** Restore `hosts` (the file from `/etc`) into `/tmp/restore-test/` and show it. Leave `/etc` untouched.
