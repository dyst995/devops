# Dated /etc/hosts backup

Operations needs a backup of `/etc/hosts` under `/root/backups/`, named with a date so it does not overwrite yesterday.

**Goal:** A script runnable by root: non-zero exit if not root; safe to run twice in one day without destroying the first copy (or you document that the second run replaces — pick one and prove it); produces a file you can restore from.
