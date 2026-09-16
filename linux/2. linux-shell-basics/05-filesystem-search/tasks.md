# Tasks — Filesystem search

Close `theory.md`. Prefer `/tmp` and `/home`, not `find /` unless a task says so.

## Warm-up (which tool)

1. From memory: live tree vs name database vs lines inside files — which tool for each?
2. Predict: you created a file 10 seconds ago. Which tool might miss it, and what rebuilds its database? Where does that database live?

## find (construct)

3. Starting at `/etc`, find basename exactly `hosts`.
4. Under `/tmp` (create files), find names matching `*.log` — quote so the shell does not expand the glob.
5. Find files **you** own under `/tmp`.
6. Find regular files named `core` under `/tmp` and delete them **per match**. Recreate, then delete by printing paths into a batch argument tool.
7. Open the find manual and identify tests for mtime, size, perm, maxdepth — then use **one** of them on `/tmp`.

## locate

8. Search for `passwd` via the name database. Rebuild the database if you have rights, search again.

## grep (repeat flags)

9. Match a pattern in one file. Ignore case. Show line numbers. Recurse a tree (home or `/etc` for a short string).
10. Recurse home for the word `fun` as in the notes’ example idea.

## Repeat the distinction

11. Same goal — “where is sshd’s config mention of Port” — solve once by walking files, once by searching **contents**. Say which tool you picked for which job.

## Scenario

12. Copy every file **owned by** a lab user into `/root/audit-labfind/` (create the user and some files first). Originals stay. This is find-by-owner, not grep.
