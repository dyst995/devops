# Files — Questions

Cover the Answers section. Answer first, then check.

1. `open` signature? What does it return? Default mode if omitted?
2. `fo.name` `fo.closed` `fo.mode` inside `with open(..., "w")` — three prints from the notes? Why `closed` is False?
3. `"a"` vs `"w"` for `write`? Both create if missing?
4. `read(10)` on the zen four-liner — output? `read()` whole file?
5. `for line in fo` — why blank lines between? `readlines()` type and whether `\n` is kept?
6. `os.rename` arguments? Slide `remove` name vs comment `test2.txt`?
7. Recite `getcwd` `chdir` `mkdir` `rmdir`. `rmdir` on a non-empty dir?
8. `os.mkdir('example_directory')` vs `os.makedirs('2018/10/05')` — what tree does the second create? When does `mkdir` fail?
9. `os.scandir('.')` — what does each `entry.name` print? How do you print **only files**? **Only directories**? Why `with`?
10. `fnmatch.fnmatch(filename, 'data_*_backup.txt')` — module? What does `*` mean? What does `os.listdir('.')` return? Does `data_backup.txt` match?
11. `os.walk('.')` unpacks three names — what is each? How does it differ from `scandir` / `listdir`? Recite the first `Found directory` line and the two root file names from the notes.
12. `tempfile.TemporaryDirectory()` — module? What is `tmpdir`? `os.path.exists` inside `with` vs after? Who deletes the directory?
13. `os.path.isfile(data_file)` True vs False — which delete call? When does `rmdir` fail? How do you delete a **tree**? Which exception and which attribute do you print?
14. `copy` vs `copy2` vs `copytree` — what does each copy? `shutil.move('dir_1/', 'backup/')` if `backup/` exists vs if it does not? `os.rename('first.zip', …)` new name?
15. `ZipFile` `"w"` vs `"r"`? How do you add a walked file path? How do you extract? Recite `make_archive` three arguments. What is `tarfile` for?

---

## Answers

1. `open(file_name [, access_mode][, buffering])`. File object. Read (`"r"`).
2. `foo.txt` · `False` · `w`. Still inside `with`, file not closed yet.
3. Append vs overwrite. Yes.
4. `Explicit i` · the four zen lines as one string.
5. `print` adds a newline on top of the line’s `\n`. List of strings with `\n`.
6. `test1.txt` → `test2.txt`. Comment is `test2.txt`; code is `text2.txt` — match the real path.
7. Current path · change to `/tmp` · create `app_dir` · delete it. Fails if not empty.
8. One dir vs the whole chain. `2018/` → `10/` → `05/`. `mkdir` fails if the parent is missing or the name already exists.
9. Every basename in `.`. `if entry.is_file()`. `if entry.is_dir()`. Context manager — closes the scan.
10. `fnmatch`. `*` = any string (shell glob, not regex). List of names in `.`. No — nothing between the two underscores.
11. `dirpath` (this folder) · `dirnames` (subdir names) · `files` (file names). `walk` = whole tree; the others = one folder. `Found directory: .` then `test1.txt` `test2.txt`.
12. `tempfile`. The unique path (e.g. `/tmp/tmpoxbkrm6c`). **True** then **False**. The `with` block — you do not `rmdir`.
13. `os.remove` vs `os.rmdir`. When the directory is not empty. `shutil.rmtree`. `OSError` · `e.strerror`.
14. File · file + metadata · directory tree. Into `backup/` · rename `dir_1/` to `backup`. `first_01.zip`.
15. Create vs read. `zf.write(os.path.join(dirpath, filename))`. `extractall(path=…)`. `base_name, format, root_dir`. Tar archives.
