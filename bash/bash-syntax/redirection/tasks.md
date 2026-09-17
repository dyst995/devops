# Tasks — Redirection

Close `theory.md`. Predict file contents and what hits the screen **before** you run.

## Warm-up

1. Three default files and fds 0 1 2 / `&0` `&1` `&2`. Extra fds? Why copy 0/1/2 onto 3–9?
2. Redirection in one course sentence.
3. Recite `<` `>` `>>` `&>` `2>` `|` `<<` `<<<`.

## Input / output / append

4. `grep` a word from a file using input redirection (not a pipe). Then the `cat | grep` form. Same matches?
5. `ls -la` into a new file with `>`. Run it again. Is the file replaced or doubled?
6. `: > filename` on a file that has text. Size after? Bare `> filename` in Bash?
7. `echo one > file` then `echo two >> file`. Two `cat`s from the notes.

## stdout vs stderr

8. Recreate the three `java -version` redirects (`>` `&>` `2>`). For each: what prints, what is in `version`? (Any command that writes **stderr** is fine if `java` is missing — `ls` of a missing path, etc.)
9. `ps aux` with all output discarded.
10. Preferred combined redirect vs `>&` vs `>file 2>&1`.

## Pipe / PIPESTATUS / tee

11. Several `.txt` files → sort → unique lines → `result-file` as in the notes. `${PIPESTATUS[@]}`.
12. Make the **middle** command fail; print the array again. Which index changed?
13. Same concat, but you must **see** the text **and** append to `result-file`.

## Here document / here string

14. Recreate `unit.file` with `<<EOF` (no trailing blanks on the closer). `cat unit.file` — is `EOF` in the file?
15. `VAR` containing `txt`. `if` with here string `grep -q`. Then the `echo | grep` form. Same true/false?

## Special names / fds / blocks

16. Recite the special-filename table. Duplicate stdin via `/dev/stdin` vs fd `0`.
17. If network allows: `cat` from `/dev/tcp/time.nist.gov/13` (notes). If it fails, still write the `exec 5<>` pattern from memory (do not need a live 80/tcp success).
18. `while read` counting lines with `done < file`. Contrast `cat file | …`.

## Scenario

19. Build `result-file`: wipe it first (`:` truncate), append unique sorted lines from `*.txt`, also show them on screen, record `PIPESTATUS`, and capture **errors** of a failing command into the same file without losing the lines (`>>` vs `2>` vs `&>` — pick what the notes justify).
