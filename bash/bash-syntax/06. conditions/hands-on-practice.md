# Hands-on practice — Conditions

Work under `~/bash-hands-on`. Do not touch `/etc`, `/usr`, `/var`, or other homes.

No solutions. Done when the **behavior** matches.

---

## Easy

1. Create a regular file `note.txt` and a directory `box`. Write `kind.sh` that takes one path. It prints `file`, `directory`, or `other`. Test it on `note.txt`, `box`, and a name that does not exist.

2. Write `writable.sh` that exits `0` if the path in `$1` exists and is writable, and exits `1` otherwise. No extra text required. Prove both outcomes with the status in the calling shell.

3. Set `phrase='some spaces here'`. Write `nonempty.sh` that prints `non-empty` if that value has nonzero length. First try the classic `[` form **without** quoting `$phrase` and save the error. Then make a version that succeeds with that same value (the notes show why `[` blows up).

4. Write `iface.sh` that runs a command that may fail (for practice: `ls` on `$1`). If that command’s status is **not** `0`, set `rc=1` and print `rc=$rc`. If it succeeded, print `rc=0`. Do not hide the `ls` error — it should still appear on the terminal.

5. Write `svc.sh` so that:
    - `./svc.sh start` prints `starting`
    - `./svc.sh stop` prints `stopping`
    - `./svc.sh` or `./svc.sh restart` prints a usage line that includes the script’s own name, then exits `1`
    Do not use a chain of `if`/`elif` for the three words if you can match `$1` as a pattern.

6. Write `gate.sh` that:
    - prints `have-file` only if `note.txt` exists as a regular file **and** `ls note.txt` succeeds
    - prints `missing` only if `note.txt` is not a regular file
    Use consecutive-command lists, not `if`. Delete `note.txt` and run again to see the other branch.

---

## Medium

7. `first-writable.sh` — you pass several paths. Print the **first** path that exists and is writable, then stop looking. If none are, print `none` to stderr and exit `1`. Do not print more than one path.

8. `usage-or-run.sh` — if the script is given **no** arguments, print usage that includes `$0` and exit `1`. If given `-h`, print the same usage and exit `0`. If given `-m` followed by a word, print that word **N** times (default N is `5`; `-n` followed by a number changes N). Behavior should match the course `args.sh` demo: `./usage-or-run.sh -m Hi -n 1` prints `Hi` once.

---

## Hard

9. **Safe append.** `append-once.sh` takes a filename and a word. If the file does not exist, create it and write the word. If it exists, append the word only when that word is **not** already a whole line in the file. Exit `0` if the word is now in the file, `1` if you refused to create/write (e.g. path exists but is not a writable regular file). Never touch paths outside `~/bash-hands-on`.

---

## Done when

You can branch on file vs directory vs missing, on success vs failure of the last command, and you know when `[` vs `[[` changes the outcome.