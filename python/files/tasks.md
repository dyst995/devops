# Tasks — Files

Tick each item when done. Predict before you run. Python has no labs — this file is the practice.

Close `theory.md`. Work in a throwaway folder.

## Warm-up

1. [ ] Recite `open(...)`. Default mode? Why `with`?
2. [ ] `"w"` vs `"a"`. `read(n)` vs `read()` vs `for line` vs `readlines()`.
3. [ ] `os.rename` `remove` `getcwd` `chdir` `mkdir` `rmdir`.

## Attributes / write

4. [ ] Recreate the `with open("foo.txt", "w")` attribute prints. Match `name` / `closed` / `mode`. After the `with`, print `fo.closed`.
5. [ ] `"w"` then `"a"` the two Python-is-great lines. What’s in the file after each?

## Read

6. [ ] Put the four zen lines in `foo.txt`. `read(10)` — exact output `Explicit i`.
7. [ ] `read()` whole file — match the notes.
8. [ ] `for line in fo` — why the extra blank lines?
9. [ ] `readlines()` — exact list (including `\n`).

## os files / dirs

10. [ ] Create `test1.txt`, `os.rename` to `test2.txt`, `os.remove` the name that actually exists (watch `test2` vs `text2` on the slide).
11. [ ] `os.getcwd()`, `chdir` to a dir you may use (not necessarily `/tmp` if you are not on Unix), `mkdir("app_dir")`, `rmdir("app_dir")`. Prove `rmdir` needs empty.

## Complete

12. [ ] One script: write zen with `"w"`, append one line with `"a"`, read 10 chars, then `readlines()`, print `getcwd`.
