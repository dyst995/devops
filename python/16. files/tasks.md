# Tasks — Files

Close `theory.md`. Throwaway folder. Recite signatures, then write.

1. [ ] **Memorize:** `open(file_name [, access_mode][, buffering])`. File object. Default `"r"`. Use **`with`**.
2. [ ] **Write:** `with open("foo.txt","w") as fo:` print `name` `closed` `mode`. Memorize False inside, True after.
3. [ ] **Write:** `"a"` append vs `"w"` rewrite (both create if missing). Two Python-is-great lines.
4. [ ] **Write:** zen four-liner; `read(10)` → **`Explicit i`**. Then `read()` rest.
5. [ ] **Learn:** `for line in fo` extra blanks (`print` + `\n`). `readlines()` list **with** `\n`.
6. [ ] **Write:** `os.rename` test1→test2; `os.remove` the name that **exists** (test2 vs text2).
7. [ ] **Memorize:** `getcwd` `chdir` `mkdir` `rmdir` (empty only).
8. [ ] **Write:** `os.mkdir('example_directory')`. Then `os.makedirs('2018/10/05')` and confirm the tree `2018/10/05`.
9. [ ] **Write:** `os.scandir('.')` — print all names; then files only (`is_file`); then dirs only (`is_dir`). Use `with`.
10. [ ] **Learn:** missing file + `"r"`; `with` closes for you.
11. [ ] **Write:** one script — `"w"` zen, `"a"` a line, `read(10)`, `readlines()`, `getcwd`, `makedirs` a date path, list files in `.`.
12. [ ] **Write:** create a few names; `os.listdir('.')` + `fnmatch.fnmatch(..., 'data_*_backup.txt')` — only those print.
13. [ ] **Write:** a small tree (`folder_1` / `folder_2` + two root `.txt` files). `os.walk('.')` — print `Found directory: {dirpath}` then each file name.
14. [ ] **Write:** `with tempfile.TemporaryDirectory() as tmpdir:` print the path; `os.path.exists` True inside, False after.
15. [ ] **Write:** `isfile` → `os.remove`; else `os.rmdir`. Then `shutil.rmtree` on a small tree; catch `OSError` and print `e.strerror`.
16. [ ] **Write:** `shutil.copy` a file; `copy2` (metadata); `copytree` a folder. Then `move` into an existing dir vs a missing dest. `os.rename` `first.zip` → `first_01.zip`.
17. [ ] **Write:** `ZipFile` `"w"` + `walk` a folder into `file.zip`; `"r"` + `extractall`. Then `make_archive` / `unpack_archive`.
18. [ ] **Memorize (cover):** default `r`; `"w"` vs `"a"`; `read(10)`; attributes; `mkdir` vs `makedirs`; `remove` / `rmdir` / `rmtree`; `copy` / `copy2` / `copytree`; `move` vs `rename`; `scandir` vs `walk`; `fnmatch`; `TemporaryDirectory`; `ZipFile` vs `make_archive`.
