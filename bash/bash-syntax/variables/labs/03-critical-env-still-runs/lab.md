# Critical env missing — script still runs

A bootstrap script prints machine name, user, and mail inbox from `HOSTNAME`, `USER`, and `MAIL`. It is supposed to **refuse to continue** if any of those are unset (error message, exit status **1**).

As written, the echos still run and print blanks.

**Goal:** If those variables are set, you see the “critical environmental variables have been set” message. If one is unset, the script aborts with status 1 and never claims they were set. Match the notes’ null-command check.
