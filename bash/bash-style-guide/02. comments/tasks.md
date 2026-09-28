# Tasks — Comments

Close `theory.md`. Work in `/tmp/comments-tasks` when writing practice scripts.

## Warm-up

1. Name the **four** kinds of comments from the notes. What should someone learn from comments + `--help` without reading the code?
2. Recite the five API fields for function comments, in order.

## File header

3. Write a new script starting with sha-bang on line 1 and a top-level overview block right under it (course style: `# Perform hot backups of Oracle databases.` or your own one-liner). Save as `/tmp/comments-tasks/backup.sh`.
4. Predict: is a second sha-bang allowed under the first? Fix any accidental second `#!`. Confirm copyright/author are **optional**.
5. **Break:** put the overview above the sha-bang or omit the overview entirely. **Fix:** restore `#!` first, then `#` overview.

## Function comments — when and what

6. From memory: when must a function be commented? When must a **library** function be commented regardless of length?
7. Write the course banner for `cleanup` (Description, Globals `BACKUP_DIR` / `ORACLE_SID`, Arguments: None). Stub the body.
8. Write the course banner for `get_dir` including **Outputs:** (writes location to stdout). Stub with `echo "${SOMEDIR}"`.
9. Write the course banner for `del_thing` including **Returns:** (0 if deleted, non-zero on error). Stub with `rm "$1"`.
10. Omit a field that does not apply using `Arguments: None` (or skip Outputs/Returns when unused) on a tiny helper — prove you only omit when it truly does not apply.
11. **Break:** comment a library function with only `# does stuff` and no Globals/Arguments. **Fix:** expand to the full API banner.

## Implementation comments

12. In a throwaway function, add **one** short implementation comment on a non-obvious / tricky line. Leave an obvious assignment uncommented.
13. **Break:** comment every line (`# set i to 0`, `# increment`). **Fix:** delete noise; keep only the interesting comment.

## TODO comments

14. Write `# TODO(yourname): Handle the unlikely edge cases (bug ####)` (use your real handle). Confirm `TODO` is searchable with `grep TODO`.
15. **Break:** write `# todo: fix later` or `# TODO fix` without `(identifier)`. **Fix:** restore `# TODO(name):` form.

## Cover-and-recall

16. Write one complete mini-script that has: file header, one full function banner, one implementation comment, and one TODO — nothing else required.

## Scenario

17. Ticket: “this library function has no docs; juniors keep misusing stdout vs return.” Add a proper API banner (Globals / Arguments / Outputs / Returns as needed) and a TODO for a missing edge case. Someone should understand the API without reading the body.
