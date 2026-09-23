# Hands-on practice — Loops

Work under `~/bash-hands-on`. Do not touch `/etc`, `/usr`, `/var`, or other homes.

No solutions. Done when the **behavior** matches.

---

## Easy

1. Create files `a.conf`, `b.conf`, `c.conf`. Write `list-conf.sh` that prints each `*.conf` name in this directory, one per line, then those same names **sorted** as a second block (the notes pipe a loop into `sort`).

2. Write `count-up.sh` that prints `0 1 2 3 4 5` on **one** line (spaces, no extra newline in the middle). You do **not** pass the list `0 1 2 3 4 5` as arguments — the script must keep going until a limit you set inside it.

3. Write `wait-until.sh` that creates `flag` only after you press return in another terminal (`touch flag` yourself). The script must keep checking until `flag` exists as a regular file, then print `ready` and exit `0`. If `flag` is already there when you start, it should print `ready` immediately. The point is: **stop when the condition becomes true**, not after a fixed count.

4. Write `upto.sh` that prints `1` through `5`, each on its own line, but **stops after `3`**. `4` and `5` must not appear. Then change only the “stop” action so it **skips** printing `3` but still prints `4` and `5`. Keep both versions (e.g. `upto-stop.sh` and `upto-skip.sh`).

---

## Medium

5. `case-files.sh` — for every regular file in the current directory whose name ends in `.log` or `.txt`:
    - print the name and its character-length (of the **filename**, not the contents)
    - if the name starts with `old`, print `archived` on the same line
    Non-matching names stay silent. Create a mixed set of files so you can see both arms.

6. `limit-walk.sh` — start `n=0`. While `n` is less than or equal to `10`, print `n` and increment. If `n` is `7`, skip the print for that pass only (still increment). The printed sequence must omit `7` and include `10`.

---

## Hard

7. **Inventory.** Given a directory path as `$1` (default: current directory), write `inventory.sh` that writes `inventory.out` with one line per **regular file**: `NAME SIZE_CHARS` where `SIZE_CHARS` is the length of the **filename**. Directories and other types are omitted. If the path is not a directory, exit `1` and write nothing (or remove a leftover `inventory.out`). Exit `0` on success.

8. **Report.** `dir-report.sh` — `$1` is a directory. Produce `report.md` (overwrite) with:
    - a heading that includes the directory path
    - a line `files=N` (regular files only)
    - a line `dirs=N`
    - a section listing regular files that are **not** writable
    If `$1` is missing, treat it as `.`. If it is not a directory, stderr message, exit `1`, do not write `report.md`.

---

## Build from a spec

9. **`check-tree.sh`**

    Deployers will run: `./check-tree.sh /path/to/tree`

    - Exit `2` and print usage including the script name if there is not exactly one argument.
    - Exit `1` if that path is not a directory.
    - Walk **regular files** under that tree (one level is enough if you do not want recursion; if you recurse, stay inside the given path).
    - For each file, append to `check-tree.log`: `ok PATH` or `bad PATH` (bad = not writable).
    - Print `ok=A bad=B` to stdout (`A`/`B` are counts).
    - Exit `0` if `bad` is 0, else `1`.
    - Re-running must **replace** `check-tree.log`, not append forever.

10. **`watch-dir.sh`**

    `./watch-dir.sh DIR MAX`

    - `DIR` must exist as a directory; `MAX` must be a non-empty integer you treat as a limit.
    - Until the number of regular files in `DIR` is **greater than or equal to** `MAX`, print `waiting N` (`N` current count) once per second (or once per `read` if you prefer to press return yourself — say which you chose in a comment).
    - When the count reaches `MAX`, print `threshold` and exit `0`.
    - If `DIR` or `MAX` is invalid at start, stderr, exit `1`, no wait.
    - In another terminal, `touch` files under `DIR` to trip the threshold.

---

## Done when

You can walk a list of files or keep going until a condition changes, and you can leave a loop early or skip one pass without stopping the rest.