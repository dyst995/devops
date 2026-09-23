# Hands-on practice — Redirection

Work under `~/bash-hands-on`. Do not touch `/etc`, `/usr`, `/var`, or other homes.

No solutions. Done when the **behavior** matches.

---

## Easy

1. Run `ls -la` so the listing is **only** in `listing.txt`, not on the screen. Run it again after adding a file; `listing.txt` must be a **full replace**, not a second copy glued on.

2. Print `one` into `acc.txt`, then print `two` so `acc.txt` contains both lines. A second run of the first print-style command should **not** be how you add `two`.

3. Empty `acc.txt` without deleting the name (file exists, size zero). Confirm with `ls -l`.

4. Write `banner.sh` that prints `ok` on stdout and `problem` on stderr (`echo` to each). Run it so:
    - `out.txt` gets only `ok` and you still see `problem`
    - `err.txt` gets only `problem` and you still see `ok`
    - `both.txt` gets both and the screen is quiet
    - the screen and files stay empty (`/dev/null`)
    Four command lines (or four lines in a helper script). Do not edit `banner.sh` between runs.

5. Create `t1.txt` / `t2.txt` with overlapping words. Produce `result-file` that is the sorted unique lines of all `t*.txt`. After the pipeline, write the **per-stage** statuses on one line to `pipe.codes`. All stages should be `0` on a good run. Then break the first stage (wrong filename) and save `pipe.codes` again — not every number should be `0`.

6. Using a here document, write `unit.file` with at least a `[Unit]` line and a `Description=`. The closing marker must not appear inside the file. `cat unit.file` is the check.

7. Write `has-txt.sh` that exits `0` if the **first argument** (a string, not a file) contains the letters `txt`, else `1`. Feed that string to `grep` **without** `echo … |`. Prove with `./has-txt.sh foobar` and `./has-txt.sh mytxtfile`.

8. Write `read-names.sh` and a file `names.txt` with three names. The script prints `1:name` style lines by reading `names.txt` as the **input of the whole loop** (`done` attached to the file). Do not use `cat names.txt |` for this one.

---

## Medium

9. `merge-logs.sh` — directory `logs/` with at least three `.log` files, some empty, some with duplicate lines. Produce `report.txt`: sorted unique lines of all `logs/*.log`. Also produce `report.screen` by sending the same text to the screen **and** appending to that file. If `logs/` is missing, print a message on stderr and exit `1`.

10. `pipe-fail-note.sh` — run a pipeline where the **middle** command fails (`false` or `ls` of a missing name) and the last command succeeds. Print the per-stage statuses, then print `last=` and the status of the pipeline as Bash reports it afterward. Those numbers must not all be treated as the same. Write a one-line comment in the script (for you) about which number is “the pipeline.”

11. `read-config.sh` — `settings.conf` has lines `key=value` (you write the file). The script reads each line and prints `key -> value` (split on `=`). Skip lines that start with `#`. If `settings.conf` is missing, abort with a required-parameter style error or an explicit `exit 1` after a stderr message.

---

## Hard

12. **Wrapper.** `run-logged.sh` runs **the rest of its arguments** as a command (`./run-logged.sh ls -l box`). stdout goes to `cmd.out`, stderr to `cmd.err`, and a third file `cmd.meta` contains a single line: `status=N` with the command’s exit status. The wrapper’s exit status must be that same `N`. If no command was given, usage on stderr, exit `1`, and do not create the three files.

---

## Build from a spec

13. **`bundle.sh`**

    `./bundle.sh OUT.txt file1 file2 …`

    - Need at least two arguments (`OUT` and one file).
    - For each input file: if it is a readable regular file, append a banner line `=== filename ===` and then the file contents to `OUT.txt`.
    - If an input path is missing or not a regular file, append `=== filename ===` and `MISSING` to `OUT.txt`, and also print that filename on stderr.
    - After all files, print `bundled=K skipped=M` (`K` ok, `M` missing).
    - Exit `0` if `M` is 0, else `1`.
    - `OUT.txt` must be created fresh each run (no leftover banners from last time).
    - Do not read files outside `~/bash-hands-on` (pass only names under it).

---

## Done when

You can overwrite vs append, split stdout from stderr, throw output away, keep a pipeline’s per-stage statuses, and feed a loop from a file without `cat |`.