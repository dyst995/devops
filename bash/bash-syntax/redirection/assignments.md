# Assignments — Redirection

Close `theory.md`. Recite fds and arrows, then prove in a throwaway directory.

1. [ ] Three default files: **stdin** keyboard, **stdout** screen, **stderr** errors. Redirect = capture output and **send it** as input elsewhere.
2. [ ] File descriptors: **0** **1** **2** (`&0` `&1` `&2`). Extra **3–9** as temporary duplicates to **restore** later.
3. [ ] Redirecting **input**: file opened for **reading** on fd **n**, or **0** if n omitted. `grep search-word <filename` same idea as `cat file | grep`.
4. [ ] Redirecting **output**: write on fd **n** or **1**. Missing file **created**; existing **truncated to zero**.
5. [ ] Recite `ls -la > list_of_files.txt`. Recite `: > filename` (null command truncates). Bare `> filename` — Bash OK, some shells not.
6. [ ] Appending: `>>` on fd n or 1; create if missing. Recreate `echo one > file` then `echo two >> file` — contents `one` then `two`.
7. [ ] Memory hook: `>` replace, `>>` add to the end.
8. [ ] stdout **and** stderr: two forms `&>filename` and `>&filename`. **First preferred.** Equivalent to `>filename 2>&1`.
9. [ ] Recite `2>` = errors only. `&> /dev/null` = throw everything away.
10. [ ] Pipe: chain **processes**; stdout of one is stdin of the next. More general than `>`. Recite `cat *.txt | sort | uniq > result-file`.
11. [ ] `|` = next command’s stdin. `>` = a **file**.
12. [ ] `$PIPESTATUS` is an **array** of each stage’s exit code. Recite `echo ${PIPESTATUS[@]}` after a three-command pipe.
13. [ ] `tee -a result-file`: **screen and** append to file. Recite.
14. [ ] Here document: read until a line containing **only** the delimiter (**no trailing blanks**); that text is **stdin**. Recite `cat <<EOF > unit.file`.
15. [ ] Here string (notes): a shorter stdin from a string — recite the form if present (`<<<`).
16. [ ] Special filenames / `/dev/null` / `/dev/fd` as in the notes — one sentence each you remember.
17. [ ] Redirecting **code blocks** (notes): `{ …; } > file` or similar — recite the idea.
18. [ ] Interview: `2>&1` order (redirect stdout first, then stderr to the same place). Why `&>` is preferred.
19. [ ] Prove: `ls nosuch 2>err.txt` puts the error in the file, not on the screen. `cat err.txt`.
20. [ ] Combined: 0/1/2; `<` `>` `>>`; `&>` = `>file 2>&1`; pipe vs file; `PIPESTATUS`; `tee -a`; here-doc delimiter alone on a line.
