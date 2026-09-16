# 05 — Filesystem Search — Questions

Cover the Answers section. Answer first, then check.

1. When do you use `find` vs `locate` vs `grep`?
2. Write the general `find` usage line (path + expression is enough).
3. What does `find / -name hosts` do? What does `-name` match — full path or basename?
4. What does `find /home -user user` do?
5. Why quote `'*.log'` in `find . -name '*.log'`?
6. What do `-type f` and `-type d` mean?
7. The notes give two **equal** commands that delete `core` files under `/tmp`. Write both. What is `{}` and `\;` in `-exec`?
8. Why might someone prefer `xargs` over `-exec … \;`?
9. Where do you look for the rest of `find`’s options?
10. What does `locate passwd` do? Where does it look — the live disk or a database?
11. What is the default `locate` database path?
12. Why can `locate` miss a file you just created? What command fixes that?
13. What does `grep` print?
14. Write the command to recursively search `~` for the word `fun`.
15. Name one extra capability of `grep` the notes call out.
16. You know a config file is named `nginx.conf` but not where. `find`, `locate`, or `grep` first — and why might you run `updatedb`?
17. You need every line in `/var/log` that contains `error`. Which tool?

---

## Answers

1. `find` — files/dirs matching criteria on the live tree. `locate` — names via a database (fast, maybe stale). `grep` — lines inside files matching a pattern.
2. `find [path...] [expression]`
3. Walk from `/` for entries whose **name** is `hosts`. Basename, not the whole path.
4. Under `/home`, entries owned by user `user`.
5. So the shell does not expand `*.log` before `find` sees it.
6. Regular file · directory.
7. `find /tmp -name core -type f -exec rm {} \;` and `find /tmp -name core -type f -print | xargs /bin/rm -`. `{}` is the current path; `\;` ends the `-exec` command.
8. `xargs` batches many paths into fewer `rm` invocations; `-exec … \;` runs `rm` once per file.
9. `man find`
10. Prints paths whose names match `passwd` (example: `/etc/passwd`). Database, not a live crawl.
11. `/var/lib/mlocate/mlocate.db`
12. The database is not updated yet. `updatedb` (then `locate` again).
13. Lines matching a pattern.
14. `grep -r "fun" ~`
15. Regular expressions (and many other options).
16. `locate nginx.conf` for speed, after `updatedb` if the file is new; or `find / -name nginx.conf` for a live search.
17. `grep` (e.g. `grep -r error /var/log`).
