# Files — Questions

Cover the Answers section. Answer first, then check.

1. `open` signature? What does it return? Default mode if omitted?
2. `fo.name` `fo.closed` `fo.mode` inside `with open(..., "w")` — three prints from the notes? Why `closed` is False?
3. `"a"` vs `"w"` for `write`? Both create if missing?
4. `read(10)` on the zen four-liner — output? `read()` whole file?
5. `for line in fo` — why blank lines between? `readlines()` type and whether `\n` is kept?
6. `os.rename` arguments? Slide `remove` name vs comment `test2.txt`?
7. Recite `getcwd` `chdir` `mkdir` `rmdir`. `rmdir` on a non-empty dir?

---

## Answers

1. `open(file_name [, access_mode][, buffering])`. File object. Read (`"r"`).
2. `foo.txt` · `False` · `w`. Still inside `with`, file not closed yet.
3. Append vs overwrite. Yes.
4. `Explicit i` · the four zen lines as one string.
5. `print` adds a newline on top of the line’s `\n`. List of strings with `\n`.
6. `test1.txt` → `test2.txt`. Comment is `test2.txt`; code is `text2.txt` — match the real path.
7. Current path · change to `/tmp` · create `app_dir` · delete it. Fails if not empty.
