# Tasks — Filesystem search

Close `theory.md`. Work under `/tmp/filesystem-search-tasks` when creating files. Prefer `/tmp` and `/home` — not `find /` unless a task says so. Never `find / | xargs rm`. Do the action or write the answer, then check yourself.

## Warm-up (which tool)

1. From memory: live tree vs name database vs lines inside files — which tool for each (`find` / `locate` / `grep`)?
2. Recite the memory hook: `find` = walk the tree; `locate` = phone book; `grep` = search **inside** files.
3. Predict: you created a file 10 seconds ago. Which tool might miss it, and what rebuilds its database? Where does that database live (`/var/lib/mlocate/mlocate.db`)?

## find — construct

4. Set up a scratch tree under `/tmp/filesystem-search-tasks` with a few files (including one named `hosts` somewhere nested). Starting at that tree (or `/etc` if you prefer a real system file), find basename exactly `hosts` (`find … -name hosts`).
5. Under your scratch tree, create `a.log`, `b.log`, and a file that is **not** a log. Find names matching `*.log` — quote so the shell does not expand the glob (`find . -name '*.log'`).
6. Deliberately run `find . -name *.log` **without** quotes in a directory where `*.log` already matches — predict what the shell does wrong, then fix with quotes.
7. Find files **you** own under `/tmp` (`find /tmp -user "$USER"` or your username). Limit scope if the output is huge.
8. Create regular files named `core` (and optionally a directory named `core`). Find regular files named `core` under your scratch tree (`-type f`) and delete them **per match** with `-exec rm {} \;`. Recreate them.
9. Delete the same `core` files by printing paths into `xargs` (`-print | xargs /bin/rm -` or similar). Confirm they are gone.
10. Recreate `core` files again, including one whose **path contains a space**. Delete with the null-safe pair: `find … -print0 | xargs -0 rm`. Confirm the spaced name was not split wrongly.
11. Open `man find` and identify tests for `-mtime`, `-size`, `-perm`, `-maxdepth` — then use **each** of them at least once on your scratch tree (create files with different sizes/ages as needed).
12. Find only directories (`-type d`) under your scratch tree. Find only regular files (`-type f`).
13. Recite the synopsis idea: `find PATH TESTS ACTIONS`. Why start narrow (`/home`, `/var/log`) instead of `find /`?

## locate

14. Search for `passwd` via the name database (`locate passwd`).
15. Create a brand-new uniquely named file under `/tmp/filesystem-search-tasks`. Run `locate` for that exact name — predict miss. If you have rights, rebuild with `updatedb` (usually as root) and search again. If you cannot run `updatedb`, write what you would expect after rebuild.
16. From memory: why is `locate` fast? What is the tradeoff?

## grep

17. Match a pattern in one file you create (`grep pattern file.txt`).
18. Ignore case (`grep -i`). Show line numbers (`grep -n`).
19. Recurse a tree for a short string (`grep -r pattern …`) — use your scratch tree or a small area under `/etc`.
20. Recurse home (or a copy of a few dotfiles under `/tmp`) for the word `fun` as in the notes’ example idea (`grep -r "fun" ~` or the safer copy).
21. Predict: does `grep` find files by name, or lines by content? Prove with a file whose **name** matches a pattern but whose **content** does not (and the reverse).

## Repeat the distinction

22. Same goal — “where is sshd’s config mention of Port” (or any short string in a config you may read) — solve once by walking files / names, once by searching **contents**. Say which tool you picked for which job.
23. Ticket drill (diagnosis only): “I `locate`d my new deploy script and got nothing.” Two possible causes; two fixes.

## Scenario

24. Create a practice owner situation under `/tmp/filesystem-search-tasks` (files owned by you are enough if you cannot create another user). Copy every file **owned by** that owner matching a criterion into `/tmp/filesystem-search-tasks/audit-labfind/` (create the dest dir). Originals stay. This is find-by-owner, not grep. Show a listing of the audit dir.
25. Stretch: find all `*.log` under the scratch tree older than one day (or newer than 0 days if you just created them — adjust so the test is meaningful) and list them without deleting anything important.
