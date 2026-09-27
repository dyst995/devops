# Tasks — Redirection

Close `theory.md`. Work in `/tmp/redir-tasks` when creating files. Predict file contents and what hits the screen **before** you run. Prefer scripts for anything with `exit`. Optional network drills may fail offline — still write the pattern from memory.

## Warm-up

1. Three default files and fds 0 1 2 / `&0` `&1` `&2`. Extra fds? Why copy 0/1/2 onto 3–9?
2. Redirection in one course sentence (capture output / send as input).
3. Recite `<` `>` `>>` `&>` `2>` `|` `<<` `<<<` and preferred combined form.
4. Recite special filenames: `/dev/stdin` `/dev/stdout` `/dev/stderr` `/dev/tcp/host/port` `/dev/udp/host/port` `/dev/fd/<fd>`.

## Input redirection

5. Create a file with a few lines. `grep` a word using input redirection `<` (not a pipe). Then the `cat | grep` form. Same matches?
6. Feed a here-string or file into a command on fd 0 and confirm stdin is not the keyboard for that command.

## Output and append

7. `ls -la` into a new file with `>`. Run it again. Is the file replaced or doubled?
8. Put text in a file, then `: > filename`. Size after? Bare `> filename` in Bash — same truncate?
9. `echo one > file` then `echo two >> file`. Two `cat`s from the notes. Predict before each `cat`.
10. Append three lines with `>>`, then overwrite once with `>`. Final contents?

## stdout vs stderr

11. Recreate the three `java -version`-style redirects (`>` `&>` `2>`). For each: what prints on screen, what is in `version`? (Any command that writes **stderr** is fine if `java` is missing — e.g. `ls` of a missing path, or `bash -c 'echo out; echo err >&2'`.)
12. Preferred combined redirect `&>file` vs `>&file` vs `>file 2>&1` — three equivalent ideas; run one preferred form.
13. `ps aux` (or `ls /`) with all output discarded (`&> /dev/null`). Confirm a quiet terminal.
14. Send only stderr of a failing command to `errs.txt` while leaving a successful `echo` on the screen.

## Pipe / PIPESTATUS / tee

15. Several `.txt` files under `/tmp/redir-tasks` → `cat *.txt | sort | uniq > result-file` as in the notes. Print `${PIPESTATUS[@]}`.
16. Make the **middle** command fail (e.g. replace `sort` with a typo command); print the array again. Which index changed?
17. Same concat, but you must **see** the text **and** append to `result-file` (`tee -a`).
18. Recite: `|` = next command’s stdin; `>` = a file. Pipe chains **processes**.

## Here document / here string

19. Recreate `unit.file` with `cat <<EOF > unit.file` (no trailing blanks on the closer). `cat unit.file` — is `EOF` in the file?
20. Deliberately put spaces after the closing `EOF` on a copy — does the here-doc ever end? Fix it. (Use a script or careful typing; interrupt only if stuck.)
21. `VAR` containing `txt`. `if` with here string `grep -q "txt" <<< "$VAR"`. Then the `echo "$VAR" | grep -q` form. Same true/false?

## Special names / fds / code blocks

22. Duplicate stdin via `/dev/stdin` vs writing to `/dev/stdout`. One small demo each (e.g. `cat >/dev/stdout` or `cat </dev/stdin`).
23. If network allows: `cat </dev/tcp/time.nist.gov/13` (notes). If it fails, still write the `exec 5<>/dev/tcp/host/80` + `>&5` / `<&5` pattern from memory (do not need a live success).
24. `while read name; do echo "$name"; let "count += 1"; done < file` counting lines. Contrast `cat file | while …` — note any variable/scope difference you observe.

## Scenario

25. Build `result-file` under `/tmp/redir-tasks`: wipe it first (`:` truncate), append unique sorted lines from `*.txt`, also show them on screen (`tee -a`), record `PIPESTATUS`, and capture **errors** of a failing command into a separate `errs.txt` with `2>` without wiping `result-file`. Show before/after listings and both files’ contents.
