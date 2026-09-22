# Assignments — Basic shell commands

Close `commands.md`. Recite, then type. Predict the result **before** you run. Work in a throwaway directory under `/tmp`. **Never** `rm -rf /`. **Never** `shred` a real disk, SSD, or anything you care about — only a throwaway file you created.

## `man`

1. [ ] Recite: `man` is the full manual. Open the page for `cat`. Quit with `q`.
2. [ ] Recite: `man` can document itself. Open `man`’s own page. Find how sections work. Quit.
3. [ ] Recite keyword search in descriptions (`-k`, same idea as `apropos`). Search the keyword `list`. Predict you get many one-line hits, not one full page.
4. [ ] Recite `-f` (whatis): one-line description. Get the one-liner for `ls`. Predict it is short.
5. [ ] Recite section **5** = file format. Open section 5 for `passwd` (the file format, not the command). Predict you see field descriptions for `/etc/passwd`.
6. [ ] Recite section **1** = user command. Open section 1 for `ls`. Contrast with section 5 of `passwd`.
7. [ ] Predict: `man passwd` without a section — command or file format? Record which page you got. Then force section 5.
8. [ ] Wrong-usage: `man -k` with no keyword. Predict the error. Then pass `list`.
9. [ ] Combine: `-k list` then pick one name from the hits and open its full page.
10. [ ] Privilege: `man` needs no sudo. Prove it.
11. [ ] Recite: `/pattern` search inside a man page (pager). In `man cat`, search for `stdin` or `-n`. `n` for next if the pager allows.
12. [ ] Predict: `man 1 ls` vs `man ls` — same page on a typical box? Prove.
13. [ ] Wrong-usage: `man 5 ls` — likely no page. Prove the failure, then section 1.
14. [ ] Combine: `man -f ls` then `man ls`. One line vs the full guide.
15. [ ] Recite `man -k` vs `man -f` in one interview sentence (search descriptions vs one-line whatis).
16. [ ] Wrong-usage: `man ls -la` as if man took flags of ls. Predict. `man` the command name only.
17. [ ] Combine: `man 5 passwd` then `head /etc/passwd` (later topic) — map one field from the man page to a real line.
18. [ ] Privilege: you cannot `man` a command that is not installed. `man nosuchcmd` — record the message.
19. [ ] Recite how to quit (`q`). Open and quit three pages (`cat`, `man`, `ls`).
20. [ ] Combined: full page; `man man`; `-k`; `-f`; section 5 `passwd`; section 1 `ls`. No pasted cheat-sheet lines.

## `info`

1. [ ] Recite: GNU info page. Open `info` for `cat`. Leave with the documented quit (`q`).
2. [ ] Recite: `info` can document itself. Open `info info`. Quit.
3. [ ] Predict: `info cat` vs `man cat` — different browsers/format. Open both (one after the other). Recite one difference you saw.
4. [ ] Wrong-usage: `info -k list` as if it were `man -k`. If it fails or does something else, record it. Then `info cat`.
5. [ ] Combine: `man cat` then `info cat`. Same command, two help systems.
6. [ ] Privilege: `info` needs no sudo. Prove it.
7. [ ] Recite: info is node-based (menus). From `info info`, follow one menu item if present, then quit.
8. [ ] Predict: `info` on a command with no info page. Try `info nosuchcmd` or a tiny alias. Record the message.
9. [ ] Wrong-usage: stay in info and type Vim `:q`. Use info’s `q`.
10. [ ] Combine: `info cat` — find one `cat` flag you already know from `man`. Same flag, different page.
11. [ ] Recite the cheat-sheet pair: `info cat` and `info info`.
12. [ ] Privilege: if `info` is not installed, record that; do not sudo-install unless this is your lab. Recite the two invocations anyway.
13. [ ] Predict: `info ls` exists on GNU systems. Open, quit.
14. [ ] Wrong-usage: `info 5 passwd` (man sections). Info does not use man section numbers the same way. Open `info cat`.
15. [ ] Combine: interview — when would you use `info` vs `man`? One sentence after trying both.
16. [ ] Recite quit, and one movement key if the screen shows a cheatsheet (space / arrows). Use it once.
17. [ ] Wrong-usage: `INFO cat` (case). Predict not found. `info` lowercase.
18. [ ] Combine: `man man` vs `info info` — each system’s self-help.
19. [ ] Predict `info` with no arguments — top menu? Open and quit.
20. [ ] Combined: `info cat`; `info info`; quit with `q`; contrast `man`.

## `ls`

1. [ ] Recite long listing **plus hidden (dot) files**. In a throwaway dir, create `.secret` and `visible`. List so **both** appear. Predict `.` and `..` as well.
2. [ ] Recite long listing **plus human sizes** (K/M/G). Create a file that is not empty. List so the size is human, not raw bytes. Predict the unit.
3. [ ] Recite long listing **plus newest modification first**. Touch two files a few seconds apart. List newest first. Predict the top name.
4. [ ] Recite long listing **plus largest first** plus human sizes. Make one small and one larger file. List largest first. Predict the top name.
5. [ ] Combine: hidden file + human sizes in one listing (you may combine flags yourself). Prove `.secret` shows and sizes are human.
6. [ ] Privilege: `ls /root` as a normal user — predict permission denied. Do not sudo for this drill.
7. [ ] Wrong-usage: `ls -la` on a **file** vs a directory. Recite what you get (the file’s metadata). Prove.
8. [ ] Predict: `ls` without flags hides dot files. Prove `.secret` missing, then the hidden-files form.
9. [ ] Recite: `-l` is the long (permissions, owner, size, date) part shared by the cheat-sheet combos.
10. [ ] Wrong-usage: `ls -l Sh` with a space (two words). Predict `Sh` as a path. Glue the size-sort flags as on the sheet.
11. [ ] Combine: newest-first vs largest-first on the same three files (sizes and mtimes disagree). Two different orders.
12. [ ] Recite `ls -lh` vs default `ls -l` for a multi-megabyte file (create with `head`/`dd` in `/tmp` if needed). Human vs bytes.
13. [ ] Privilege: listing `/` is allowed; listing some system dirs is not. `ls /etc` should work.
14. [ ] Predict: empty directory — `ls -la` still shows `.` and `..`. Prove.
15. [ ] Combine: `pwd` then `ls -la` — full path vs names in that path.
16. [ ] Recite all four cheat-sheet combos from memory: hidden, human, newest, largest+human.
17. [ ] Wrong-usage: `ls --human` if you meant the short human flag. Prefer the cheat-sheet short flags.
18. [ ] Combine: create `dir/` with a nested file; `ls -l dir` vs `ls -l dir/` vs `ls dir` — directory contents vs the dir inode. Predict first.
19. [ ] Predict sort: two files same size, largest-first — which wins? Run it. Recite “size then …” if the man page says.
20. [ ] Combined: `-la` shows dots; `-lh` human; `-lt` newest; `-lSh` largest human; throwaway dir only.

## `pwd`

1. [ ] Recite: print the **full path** of the current directory. Run it. Predict the string **before** you run (your best guess).
2. [ ] Combine: `pwd` then `ls -la`. The listing is that directory’s contents.
3. [ ] Recite: `cd` will change what `pwd` prints. You will prove that in the `cd` section; here record the starting `pwd`.
4. [ ] Wrong-usage: `pwd /tmp` as if it took a path. Predict extra-arg behavior. Then bare `pwd`.
5. [ ] Privilege: `pwd` needs no sudo. Prove it.
6. [ ] Predict: `pwd` vs `echo "$PWD"` — same path? Prove.
7. [ ] Recite: the path is absolute (starts with `/` on Linux). Confirm your output starts with `/`.
8. [ ] Wrong-usage: `PWD` as a command. Predict not found / wrong. The command is `pwd`.
9. [ ] Combine: `cd` to the throwaway dir (create it), `pwd`, confirm the name is in the path.
10. [ ] Predict: `pwd` in `/` is `/`. You will `cd /` next section; here just recite.
11. [ ] Recite the interview: “where am I?”
12. [ ] Combine: `ls -l` a relative name vs `pwd` to build the absolute path in your head. Prove with `ls` on the absolute path.
13. [ ] Privilege: `sudo pwd` is still a directory (root’s cwd for that command). Optional lab: compare `pwd` vs `sudo pwd`.
14. [ ] Wrong-usage: `pwd -L` vs `-P` if you have a symlink cwd — optional. Recite default physical/logical only if you try `man pwd`.
15. [ ] Combine: two terminals — each has its own `pwd`. Recite “cwd is per process.”
16. [ ] Predict `pwd` after a failed `cd` (you will fail on purpose later) — cwd **unchanged**. Remember this.
17. [ ] Recite: full path, no listing of files. `pwd` is not `ls`.
18. [ ] Wrong-usage: `pwd .` or `pwd ..`. Extra operands. Bare command.
19. [ ] Combine: `pwd` > `where.txt` then `cat` that file. The path can be saved.
20. [ ] Combined: absolute path; matches `$PWD`; no sudo; not a file listing.

## `cd`

1. [ ] Recite: change to the filesystem **root**. Do it, `pwd`, prove `/`. Then leave (`cd` back to your throwaway or home).
2. [ ] Recite: parent directory. From a nested throwaway `a/b`, go to the parent. `pwd` should end with `a` (or your parent name).
3. [ ] Recite: your home (`$HOME`). Go there. `pwd` equals `echo "$HOME"`.
4. [ ] Recite: previous directory (and it **prints** it). From home, `cd` to `/tmp`, then previous. Predict the printed path is `/tmp` when you bounce back — work through: A → B → previous should print A? Recite the cheat sheet: previous prints the directory you land on. Prove with two dirs.
5. [ ] Combine: root → parent of root (still `/`) → home → previous. Predict each `pwd`.
6. [ ] Privilege: `cd /root` as a normal user — fail. Do not sudo. Stay in allowed dirs.
7. [ ] Wrong-usage: `cd` to a **file**. Predict “not a directory.” Prove with a throwaway file.
8. [ ] Predict: `cd` to a missing path. Error, `pwd` unchanged (from the `pwd` drill).
9. [ ] Recite `cd` with no arguments (often home). If your shell does that, prove `pwd` is `$HOME`.
10. [ ] Combine: `cd ~` vs `cd "$HOME"` — same place.
11. [ ] Recite `..` vs `.` — parent vs here. `cd .` is a no-op; `pwd` same.
12. [ ] Wrong-usage: `cd -l` mixing `ls` flags. Predict. `cd` takes a path.
13. [ ] Combine: `cd /` then `ls -la` (root’s entries). Then `cd ~`.
14. [ ] Privilege: you can `cd /tmp` without sudo. Prove.
15. [ ] Predict: `cd -` twice returns you to the first of the pair. Prove A→B→prev→prev.
16. [ ] Recite: `~` is home, not a random tilde file. `cd ~` then `pwd`.
17. [ ] Wrong-usage: `cd ~root` if you are not allowed into that home — fail. Recite `~` as **your** home for this sheet.
18. [ ] Combine: `pwd` / `cd ..` / `pwd` / `cd -` / `pwd`. Three predictions first.
19. [ ] Predict `cd //` or `cd /./` — still `/`? Prove.
20. [ ] Combined: `/` ; `..` ; `~` ; `-` prints; failed `cd` keeps cwd; no sudo into `/root`.

## `touch`

1. [ ] Recite: create an empty file, or update timestamp if it exists. Create `newfile.txt` in the throwaway dir. Prove with `ls -l` (size 0).
2. [ ] Recite: second `touch` on the same name updates mtime. `ls -l` before and after (sleep 2 if you need a visible time change).
3. [ ] Recite `-d` with a date string. Set the timestamp from a date string like “next Friday.” Prove with `ls -l` that the date is **not** today (unless today is that Friday — pick another weekday string).
4. [ ] Predict: `touch` a file in a missing directory — fail. Then create the dir (`mkdir`) and retry.
5. [ ] Wrong-usage: `touch -d` without a date string. Predict. Then a quoted date string.
6. [ ] Combine: `touch` three names in one command. `ls` all three.
7. [ ] Privilege: `touch /etc/motd` as you — fail. Do not sudo. Only `/tmp`.
8. [ ] Recite: empty file is still a file (`ls -la` shows it). Contrast `mkdir`.
9. [ ] Predict: `touch` on a directory — updates the directory’s timestamp (usually). Prove `ls -ld dir`.
10. [ ] Wrong-usage: `touch -d next Friday file` **unquoted** (two words). Predict `Friday` is a second filename. Quote the date.
11. [ ] Combine: `touch -d` then `ls -lt` — your dated file sorts by that mtime.
12. [ ] Recite the interview: “create empty or bump mtime.”
13. [ ] Privilege: creating in `/tmp` is enough. Prove `ls` the file.
14. [ ] Predict `touch .` — updates cwd timestamp? `ls -ld .` before/after.
15. [ ] Combine: `touch newfile.txt` then `ls -lh` (human size 0).
16. [ ] Wrong-usage: `touch` with no names. Predict. Then pass a name.
17. [ ] Recite `-d` is “set timestamp from a date string,” not “delete.” Do not confuse with `rm`.
18. [ ] Combine: `mkdir empty` then `touch empty/a`. File inside.
19. [ ] Predict: existing non-empty file — `touch` does **not** empty it. Prove size stays.
20. [ ] Combined: create; bump mtime; `-d` quoted date; no sudo on system files.

## `mkdir`

1. [ ] Recite: one directory; **fails if parents are missing**. `mkdir empty` in the throwaway dir. Prove with `ls -ld`.
2. [ ] Predict: `mkdir a/b` without `-p` when `a` does not exist — fail. Prove.
3. [ ] Recite `-p`: parents as needed. Create a nested path. Prove the whole chain exists.
4. [ ] Recite brace expansion `test{1..3}` with `-p`: three sibling dirs each with `empty`. Prove `test1` `test2` `test3`.
5. [ ] Recite `-m MODE`: create with given permissions. Create a dir with mode `700`. Prove with `ls -ld` (owner rwx only).
6. [ ] Wrong-usage: `mkdir` an existing name. Predict. Then `-p` on the same name (success, no error).
7. [ ] Combine: `-p` + braces + a final `empty` as on the sheet. `find` or `ls -R` to prove.
8. [ ] Privilege: `mkdir /etc/foo` as you — fail. Only `/tmp`.
9. [ ] Predict: `mkdir -m 000 locked` — you may be unable to `cd` in. Prove, then `chmod` or `rmdir` as allowed. Do not leave junk.
10. [ ] Wrong-usage: `mkdir -p` with no path. Predict. Then a real path.
11. [ ] Combine: `mkdir empty` then `rmdir empty` (next section). Here only create.
12. [ ] Recite: `-p` does not fail if the dir exists. Run twice on the same nested path.
13. [ ] Privilege: `mkdir` in your throwaway needs no sudo.
14. [ ] Predict braces **without** `-p` if parents missing — fail. With `-p` — succeed.
15. [ ] Combine: `-m 755` vs `-m 700` — two dirs, `ls -ld` both.
16. [ ] Recite `MODE` is an octal like `755`. Recite `man mkdir` if you forget `-m`.
17. [ ] Wrong-usage: `mkdir -m` without a mode. Predict. Then mode + name.
18. [ ] Combine: `mkdir -p dir/test{1..3}/empty` then `touch` a file in `test2/empty`.
19. [ ] Predict: `mkdir empty empty` two args — second fails if the first created `empty`. Two **different** names succeed.
20. [ ] Combined: plain one dir; fail without parents; `-p`; braces 1..3; `-m` permissions.

## `cp`

1. [ ] Recite `-r`: copy a **directory tree**. Copy `dir` into `dir2/` (create both as needed). Prove nested files exist in the destination.
2. [ ] Recite `-rp`: recursive **plus keep mode/owner/timestamps**. Copy a tree you `chmod`’d (e.g. `700`). Prove mode and mtime survived (`ls -l`).
3. [ ] Predict: `cp` a directory **without** `-r` — fail. Prove, then `-r`.
4. [ ] Wrong-usage: `cp -r dir dir` onto itself. Predict error/mess. Copy to a **new** name.
5. [ ] Combine: `touch` files with `-d` dates, `cp -rp`, `ls -l` source vs dest timestamps.
6. [ ] Privilege: `cp /etc/shadow /tmp` as you — fail. Do not sudo. Copy only your files.
7. [ ] Recite: destination `dir2/` with trailing slash means “inside this directory.” Prove the tree lands **inside** `dir2`.
8. [ ] Predict: `cp -r` a file (not a dir) — still works as a copy? Prove with one file.
9. [ ] Wrong-usage: `cp` with one argument. Predict. Need source and dest.
10. [ ] Combine: `-r` vs `-rp` on a `chmod 600` file inside a tree. Without `p`, mode might follow umask. Compare `ls -l`.
11. [ ] Recite `p` = preserve. Interview one sentence.
12. [ ] Privilege: copying into `/usr` as you — fail. Dest in `/tmp`.
13. [ ] Predict: overwrite an existing dest file (file copy). `cp` may clobber. Use throwaway names.
14. [ ] Combine: `mkdir -p src/nested`, `touch src/nested/a`, `cp -r src dest/`.
15. [ ] Recite: `-r` is required for directories; `-p` is extra preservation.
16. [ ] Wrong-usage: `cp -rp` without `-r` (just `-p`) on a directory. Predict fail. Need recursive.
17. [ ] Combine: `ls -lt` on dest after `-rp` — timestamps should match source, not “now,” if preserve worked.
18. [ ] Predict `cp -r dir dir2` when `dir2` exists as a directory vs not. Two cases; throwaway.
19. [ ] Recite the two cheat-sheet forms: tree copy; tree copy preserving metadata.
20. [ ] Combined: `-r` tree; `-rp` mode/time; no self-copy; `/tmp` only.

## `mv`

1. [ ] Recite: move; if the destination exists, you can **backup** the overwritten dest with a suffix. Create `dir/newfile` and a dest file that would be clobbered. Move with backup suffix `.old`. Prove `name.old` exists.
2. [ ] Recite `-b` (backup) and `-S` (suffix string). Recite why `.old` is quoted on the sheet. Run with suffix `.old`.
3. [ ] Recite `-u`: move **only if** source is newer **or** dest is missing. Create dest newer than source — predict **no** replace. Then source newer — predict replace.
4. [ ] Predict: `mv` a file to a directory — lands inside. Prove `ls dir/`.
5. [ ] Wrong-usage: `mv` with one argument. Predict. Need dest.
6. [ ] Combine: `-b -S ".old"` then `ls` the backup and the new file.
7. [ ] Privilege: `mv /etc/passwd /tmp` as you — fail. Do not sudo.
8. [ ] Recite: `mv` is rename when dest is a new name in the same dir. Rename `a` to `b`. Prove `a` gone.
9. [ ] Predict: `-u` when dest **missing** — move proceeds. Prove.
10. [ ] Wrong-usage: `mv -S .old` without `-b` — check whether suffix still applies on your `mv`. Recite the sheet uses **both** `-b` and `-S`.
11. [ ] Combine: two files same name in different dirs; `-u` keeps the newer. Prove with `ls -l` mtimes.
12. [ ] Recite: backup happens when the dest **would be overwritten**. No dest file → no `.old`. Prove.
13. [ ] Privilege: moving within `/tmp` as you is enough.
14. [ ] Predict: `mv -u` source older — dest content unchanged. `cat` dest.
15. [ ] Combine: `touch -d` to control which file is newer, then `-u`.
16. [ ] Wrong-usage: `mv /tmp/a /` as dest (move into root). May fail or need privilege. Use a throwaway dest dir.
17. [ ] Recite `-b -S ".old"` as “keep the previous dest.”
18. [ ] Combine: `mv` a directory (no extra flag needed unlike `cp -r`). Prove the tree moved.
19. [ ] Predict: `mv` across filesystems copies-then-deletes. Optional; recite if `mv` is slow on huge trees. Use tiny files here.
20. [ ] Combined: backup suffix `.old`; `-u` newer-or-missing; throwaway only; never move system files.

## `cat`

1. [ ] Recite: concatenate files into one output. Create `1.txt` and `2.txt` with different lines. Combine into `3.txt`. Prove `3.txt` has **both** in order.
2. [ ] Predict: `>` **overwrites** `3.txt`. Run twice with different sources. Second run wins. Prove.
3. [ ] Recite: `cat` of one file prints it. Print `1.txt`. Predict exact text.
4. [ ] Wrong-usage: `cat` a directory. Predict an error. Then a file.
5. [ ] Combine: `cat 1.txt 2.txt` without redirect — stdout. Then with `> 3.txt`.
6. [ ] Privilege: `cat /etc/shadow` as you — fail. `cat /etc/passwd` often works (public map). Do not sudo-cat secrets.
7. [ ] Predict: `cat > 3.txt` with no input files — reads **stdin**. Type a line, Ctrl-D. Prove `3.txt`.
8. [ ] Recite order: first file’s bytes, then second’s. Swap `1.txt` `2.txt` vs `2.txt` `1.txt` into different outputs. `diff`.
9. [ ] Wrong-usage: `cat 1.txt > 1.txt` (same file). May truncate. Redirect to a **new** name.
10. [ ] Combine: `ls -lh 3.txt` after concat — size roughly sum of parts.
11. [ ] Recite: `cat` is not a pager (`more`/`less` later). For short files only here.
12. [ ] Privilege: writing `3.txt` in `/tmp` needs no sudo.
13. [ ] Predict empty `2.txt` — `3.txt` still has `1.txt` content. Prove.
14. [ ] Combine: `touch 1.txt 2.txt` empty, concat, `3.txt` empty.
15. [ ] Recite `>` vs `>>` (append). Concat twice with `>>` into `3.txt` — duplicated content. Recite `>` from the sheet (overwrite).
16. [ ] Wrong-usage: `cat 1.txt 2.txt > 2.txt`. Truncation risk. Dest must be a **third** file.
17. [ ] Combine: `cat 3.txt` to verify. `head`/`tail` later will use this file.
18. [ ] Predict: three files `cat a b c > d`. Order a then b then c.
19. [ ] Recite the interview: “glue files to stdout or a redirect.”
20. [ ] Combined: two files into a third; order; `>` overwrite; never cat a file onto itself.

## `rmdir`

1. [ ] Recite: remove an **empty** directory only. `mkdir empty` then remove it. Prove it is gone.
2. [ ] Predict: `rmdir` a directory that contains a file — fail. Prove. Then `rm` the file (or `rmdir` after emptying).
3. [ ] Wrong-usage: `rmdir` a **file**. Predict. Use `rm` for files.
4. [ ] Combine: `mkdir -p a/b` then `rmdir a` — fail (not empty). `rmdir a/b` then `rmdir a`.
5. [ ] Privilege: `rmdir /tmp` — do **not**. Only your `empty` dir.
6. [ ] Recite: `rmdir` is the safe opposite of `mkdir` for empty dirs. `rm -r` is the dangerous opposite.
7. [ ] Predict: `rmdir` missing name — error. Then create and remove.
8. [ ] Combine: `mkdir empty` `ls -ld` `rmdir` `ls` gone.
9. [ ] Wrong-usage: `rmdir -rf` (those flags are `rm`). Predict unknown flag. Bare `rmdir`.
10. [ ] Recite: after `mkdir -p dir/test1/empty`, remove from the **leaf** up.
11. [ ] Privilege: cannot `rmdir` a dir you do not own. Predict. Do not sudo.
12. [ ] Predict: `rmdir .` from inside the dir — typically fail. `cd ..` first.
13. [ ] Combine: `touch empty` as a **file** named empty, `rmdir empty` fails. `rm` the file.
14. [ ] Recite the interview: “why rmdir instead of rm -r?” (refuses non-empty).
15. [ ] Wrong-usage: `rmdir *` in a dir with files and dirs — only empty dirs vanish; files remain / errors. Use a sandbox.
16. [ ] Combine: `mkdir empty` twice — second mkdir fails; one `rmdir` succeeds.
17. [ ] Predict hidden files: dir with only `.` and `..` is empty for `rmdir`. Dir with `.secret` is **not** empty. Prove.
18. [ ] Recite: no recurse flag on the cheat sheet — one empty dir.
19. [ ] Combine: create `empty`, `rmdir`, `mkdir` again. Name reusable.
20. [ ] Combined: empty only; non-empty fails; not for files; never `rmdir /`; leaf-first for trees.

## `rm`

1. [ ] Recite `-v`: delete a **file**, verbose. Create `~/1.txt` **only if** you understand that is your home — **prefer** `/tmp/sandbox/1.txt` instead of home. Delete verbose. Prove the message and the file is gone.
2. [ ] Recite `-r` recursive, `-f` force (no prompt), `-v` verbose. Delete a throwaway **tree** you created. Prove it is gone. **Warning:** never `rm -rf /` or `rm -rf ~`.
3. [ ] Predict: `rm` a missing file without `-f` — error. With `-f` — silent success. Prove both on a missing **throwaway name**.
4. [ ] Wrong-usage: `rm -rf /`. Recite why this is catastrophic. **Do not run it.** Write the warning in your notes.
5. [ ] Combine: `mkdir -p dir/sub`, `touch dir/sub/a`, `rm -rfv dir/`. Verbose lines, then `ls` gone.
6. [ ] Privilege: `rm /etc/passwd` as you — fail. Do not sudo. **Never** `sudo rm -rf`.
7. [ ] Recite: `rm` a file vs `rmdir` a dir. File with `rm -v`; empty dir with `rmdir`.
8. [ ] Predict: `rm dir/` without `-r` — error (is a directory). Then `-r` on a **sandbox** dir.
9. [ ] Wrong-usage: `rm -rf *` in the wrong cwd. Recite: `pwd` **before** any recursive delete. Always.
10. [ ] Combine: `rm -v` one file; `ls` confirms.
11. [ ] Recite `-f` skips prompts. You may not see “remove?”. That is why it is dangerous.
12. [ ] Privilege: recursive delete of `/tmp/your-unique-dir` as you is enough. Unique name so you do not wipe others’ files.
13. [ ] Predict: `rm -v` prints the filename. Run it. Match the name you chose.
14. [ ] Wrong-usage: `rm -rf .` inside a sandbox — deletes everything **in cwd**. If you try, be **inside** a disposable empty-of-value dir. Prefer `rm -rfv /tmp/your-sandbox-dir` from **outside** it.
15. [ ] Combine: create, `ls -la`, `rm -rfv`, `ls` missing.
16. [ ] Recite the interview: “what do r, f, v mean?” Force + recurse + verbose.
17. [ ] Predict: glob `rm -v *.txt` in a dir with two txt files — both gone. Sandbox only.
18. [ ] Wrong-usage: `rm -rfv /tmp` — **do not**. That is not “your dir.” Only a subdirectory **you** created.
19. [ ] Combine: `pwd` → confirm path contains your unique sandbox string → then recursive delete.
20. [ ] Combined: `-v` file; `-rfv` tree you made; **never** `/` or `$HOME`; `pwd` first. **Warning:** `rm -rf` is irreversible.

## `shred`

1. [ ] Recite: overwrite so recovery is harder. Create a throwaway file with a secret word. Run `shred` on **that file only**. Prove the content is gone or randomized (`cat`).
2. [ ] Predict: `shred` by default may **not** unlink (delete the name). Check whether the name still exists. Recite `man shred` for `-u` if you want unlink — only if you read man; the sheet is bare `shred file`.
3. [ ] **Warning:** never `shred` a block device (`/dev/sda`), never an SSD as a “secure wipe” without knowing firmware, never a file you need. **Only** a file you created in `/tmp`.
4. [ ] Wrong-usage: `shred /`. Recite why that is insane. Do not run it.
5. [ ] Combine: `echo secret > f` → `grep secret f` hits → `shred f` → `grep secret f` misses (or file garbage).
6. [ ] Privilege: `shred /etc/passwd` — do **not**. No sudo shred.
7. [ ] Recite: `rm` unlinks the name; `shred` overwrites **data**. Interview contrast.
8. [ ] Predict: shredding a missing file — error. Then create and shred.
9. [ ] Wrong-usage: `shred dir/` a directory. Predict. Only a regular file.
10. [ ] Combine: `ls -l` size before/after. Size may stay; content changes.
11. [ ] Recite: recovery harder, **not** a legal guarantee. One sentence.
12. [ ] Privilege: as you, you can only shred files you can write. Prove on your file; skip others.
13. [ ] Predict: `cat` after shred looks like binary. Optional `file` command.
14. [ ] Wrong-usage: `shred -rf` mixing `rm` flags blindly. Use `man shred` or the sheet’s bare form.
15. [ ] Combine: `shred` then `rm` the leftover name if shred kept it.
16. [ ] Recite the cheat-sheet one-liner intent: overwrite a **file**.
17. [ ] Predict multiple passes (default). Time a small file — should be quick. Do not shred gigabytes.
18. [ ] Wrong-usage: `shred ~/Documents` or anything real. Refuse. Sandbox file only.
19. [ ] Combine: `rm -v` vs `shred` — two stories (unlink vs overwrite). Tick when you can say both.
20. [ ] Combined: one throwaway file; content destroyed; **never** devices or `/`; not a substitute for `rm -rf`. **Warning:** shred is destructive.

## `printenv`

1. [ ] Recite: print **all** environment (exported) variables. Run it (pager if huge). Confirm `PATH` appears.
2. [ ] Recite: print **one** env var. Print `PATH` only. Predict it matches `echo "$PATH"`.
3. [ ] Predict: a shell-only variable (assign, no export) does **not** show. Prove with `ONLYSHELL=1` then `printenv ONLYSHELL` empty vs `echo "$ONLYSHELL"`.
4. [ ] Wrong-usage: `printenv $PATH` (expands to directories as extra args). Predict. Pass the **name** `PATH`.
5. [ ] Combine: `printenv` vs `printenv PATH` — dump vs one.
6. [ ] Privilege: your environment, no sudo. Prove.
7. [ ] Recite: `HOME` via `printenv`. Match `echo "$HOME"`.
8. [ ] Predict: `printenv nosuchvar` — empty, non-zero exit? Prove `echo $?`.
9. [ ] Wrong-usage: `printenv -p` if not a real flag on your printenv. Stick to dump and one name.
10. [ ] Combine: `export EDITOR=vim` then `printenv EDITOR`. Then `unset` (later section).
11. [ ] Recite interview: `printenv` vs `echo "$VAR"` (env vs shell expand).
12. [ ] Privilege: `sudo printenv` is **root’s** env. Optional lab compare. Do not need it.
13. [ ] Predict: `printenv` output is `NAME=value` lines for the dump. One-name form is **value only**. Prove both.
14. [ ] Combine: `printenv PATH` and `env | grep ^PATH=` — same value.
15. [ ] Recite: only **exported** names. Children inherit these.
16. [ ] Wrong-usage: `printenv PATH HOME` — check whether your printenv prints two values. Recite the sheet’s one-var example.
17. [ ] Combine: `printenv` piped to `less` (pager). `q` quit.
18. [ ] Predict `printenv PWD` vs `pwd` — often the same path.
19. [ ] Recite the two cheat-sheet forms from memory.
20. [ ] Combined: full dump; one var `PATH`; unexported absent; name not `$NAME`.

## `env`

1. [ ] Recite: same dump as environment; **or** run a command in a custom env. Run the dump. Compare to `printenv` (same idea).
2. [ ] Recite: `VAR=tmp` prefix — run a script with `VAR` set; **your shell unchanged**. Write `myscript` in `/tmp` that prints `VAR`. Run it via `env`. Then `echo "$VAR"` in the parent — still unset?
3. [ ] Predict: `env VAR=tmp ./myscript` vs `export VAR=tmp` — which pollutes this shell? Prove parent `echo "$VAR"` after the `env` form.
4. [ ] Wrong-usage: `env VAR = tmp` spaces. Predict. No spaces.
5. [ ] Combine: `printenv VAR` after the one-shot — empty. Inside the script — `tmp`.
6. [ ] Privilege: `env` as you. `sudo env` is root. No sudo needed for the drill.
7. [ ] Recite: `chmod +x myscript` or `env VAR=tmp bash myscript` if you skip +x.
8. [ ] Predict: `env` dump includes `PATH`. `grep` it.
9. [ ] Wrong-usage: `env ./myscript VAR=tmp` (assignment after the command). Predict VAR not set for the script. Assignment **before** the command.
10. [ ] Combine: `env` dump vs `printenv` dump — spot-check `HOME`.
11. [ ] Recite: custom env does not persist. Interview one sentence.
12. [ ] Privilege: `./myscript` in `/tmp` needs execute bit or `bash myscript`. No sudo.
13. [ ] Predict: `env -i ./myscript` (clean env) if supported — script may lack `PATH`. Optional; recites “custom env.”
14. [ ] Combine: `export EDITOR=vim` then `env | grep EDITOR`. Dump shows it.
15. [ ] Recite the cheat-sheet two jobs: dump; run with `VAR=tmp`.
16. [ ] Wrong-usage: `env echo "$VAR"` after setting only in `env VAR=tmp env`. Think about which process sees VAR.
17. [ ] Combine: `ONLYSHELL=1` not exported — `env` dump misses it; `set` would not be this command.
18. [ ] Predict `./myscript` without `env VAR=tmp` — empty `VAR`. Then with `env`.
19. [ ] Recite: `env` is a command; `export` is a builtin that changes **this** shell.
20. [ ] Combined: dump; one-shot `VAR=tmp` script; parent unchanged; no spaces around `=`.

## `export`

1. [ ] Recite: make a variable visible to **child** processes. `export EDITOR=vim`. Prove with `printenv EDITOR` and `bash -c 'printenv EDITOR'`.
2. [ ] Predict: `EDITOR=vim` without export — child misses it. Prove, then export.
3. [ ] Wrong-usage: `export EDITOR = vim` spaces. Predict. No spaces.
4. [ ] Combine: `export EDITOR=vim` then `env | grep EDITOR`.
5. [ ] Privilege: export in your shell, no sudo.
6. [ ] Recite: `EDITOR` is the default editor (text-editors topic). Print it after export.
7. [ ] Predict: `export` with no names — some shells dump exported names. Optional. Then export a name.
8. [ ] Wrong-usage: `export $EDITOR=vim` if EDITOR already set. Predict. Export the identifier `EDITOR`.
9. [ ] Combine: child `bash -c 'echo "$EDITOR"'` sees `vim`.
10. [ ] Recite: export turns a shell var into environment. Interview vs `ONLYSHELL` unexported.
11. [ ] Privilege: `sudo` may reset env. Recite; do not need to prove visudo here.
12. [ ] Predict: `export EDITOR=vim` then `export EDITOR=nano` — last wins. Prove `printenv`.
13. [ ] Combine: `touch` not involved; this is env. Then `unset` next section.
14. [ ] Recite cheat-sheet assignment form `EDITOR=vim` with export.
15. [ ] Wrong-usage: `export -p EDITOR` if you do not know `-p`. Prefer the sheet form.
16. [ ] Combine: `printenv EDITOR` vs `echo "$EDITOR"` — both after export.
17. [ ] Predict a new child `bash` interactive — still sees EDITOR if exported in the **parent** and inherited. Nested `bash`, print, `exit`.
18. [ ] Recite: not persistent across new logins unless you put it in a startup file (other topic). This shell only.
19. [ ] Combine: `env EDITOR=nano bash -c 'printenv EDITOR'` vs exported vim in parent — one-shot vs persistent export.
20. [ ] Combined: child sees it; no spaces; `printenv` proof; last assignment wins.

## `unset`

1. [ ] Recite: delete shell **and** environment variable. After `export EDITOR=vim`, unset `EDITOR`. Prove `printenv EDITOR` empty and `echo "$EDITOR"` empty.
2. [ ] Predict: `unset` a name that was never set — usually silent. Prove.
3. [ ] Wrong-usage: `unset $EDITOR` (expands to `unset vim`). Set EDITOR first, then that wrong form — predict unsetting the wrong thing. `unset EDITOR` (the name).
4. [ ] Combine: export → child sees it → unset → new child misses it.
5. [ ] Privilege: unset your vars, no sudo. Do **not** try to unset system-wide.
6. [ ] Recite: after unset, `env` dump should not list `EDITOR` (unless sudo/login re-set it). Prove in **this** shell.
7. [ ] Predict: `unset PATH` is dangerous (commands vanish). **Do not.** Recite why. Unset `EDITOR` only.
8. [ ] Wrong-usage: `unset -EDITOR`. Predict. Bare name.
9. [ ] Combine: `export EDITOR=vim` `printenv EDITOR` `unset EDITOR` `printenv EDITOR`.
10. [ ] Recite interview: unset removes from shell and environment.
11. [ ] Privilege: you cannot unset another process’s variables. Only this shell.
12. [ ] Predict: `readonly` var (if you `readonly FOO=1`) — unset fails. Optional. Skip if you do not want a stuck var; use a name you will not readonly.
13. [ ] Combine: `set | grep EDITOR` after unset — gone (or only a function — should be gone).
14. [ ] Recite cheat-sheet target: `EDITOR`.
15. [ ] Wrong-usage: `unset EDITOR=vim`. Predict. The command takes names, not assignments.
16. [ ] Combine: `env EDITOR=tmp bash -c 'unset EDITOR; printenv EDITOR'` — child unsets **its** copy; parent unchanged if parent still has it.
17. [ ] Predict `echo $?` after successful unset.
18. [ ] Recite: next login may set EDITOR again from profile. This drill is the current shell.
19. [ ] Combine: export, prove child, unset, prove child empty.
20. [ ] Combined: removes env+shell name; don’t unset `PATH`; name not `$NAME`; prove with `printenv`.

## `set`

1. [ ] Recite: dump **everything** — env + shell vars + functions. Pipe to `less`. Do **not** run `set` unpaged. `q` to quit.
2. [ ] Predict: unexported `KEY=1` appears in `set` but not `printenv`. Prove (grep in `less` or `set | grep`).
3. [ ] Wrong-usage: `set` with no pager — floods the terminal. Always `| less` as on the sheet.
4. [ ] Combine: `export EDITOR=vim` then find `EDITOR` in the `set | less` dump.
5. [ ] Privilege: `set` is a builtin; no sudo. Your functions appear.
6. [ ] Recite: `less` is the pager (later section). Here it is how you **survive** the dump.
7. [ ] Predict: `set | less` vs `printenv | less` — `set` is larger. Recite why (functions, shell vars).
8. [ ] Wrong-usage: `set KEY` to print one var in Bash — may turn on options. Use `echo "$KEY"` or grep the dump.
9. [ ] Combine: `unset EDITOR` then `set | grep EDITOR` — should miss the var.
10. [ ] Recite interview: `set` vs `env` vs `printenv`.
11. [ ] Privilege: piping to `less` needs no sudo.
12. [ ] Predict a function in the dump (`name ()`). Find one or note none.
13. [ ] Combine: `set | less` search `/PATH` inside less, then `q`.
14. [ ] Recite cheat-sheet: `set | less`.
15. [ ] Wrong-usage: `SET | less` uppercase. Predict not found.
16. [ ] Combine: `KEY=hello` `set | grep KEY` `env | grep KEY` — only `set` hits.
17. [ ] Predict: `set -x` is tracing, not this dump. If you enable it, `set +x` to stop. Keep this drill on the dump.
18. [ ] Recite: huge output is expected. That is why the sheet pipes.
19. [ ] Combine: `printenv PATH` vs find `PATH=` in `set`.
20. [ ] Combined: dump is huge; pipe to `less`; unexported names live here; do not confuse with `set -x`.

## `more`

1. [ ] Recite: page **forward only**. Create a file longer than the screen (`seq 1 200 > file`). Page it with `more`.
2. [ ] Predict: space / Enter advances. Reach the end. Note you **cannot** go back (or only poorly vs `less`). Recite “forward only.”
3. [ ] Wrong-usage: `more` a missing file. Predict. Then the real file.
4. [ ] Combine: `cat file | more` vs `more file`. Both page. Recite one difference if you see it.
5. [ ] Privilege: `more /etc/passwd` as you is usually fine. `more /etc/shadow` is not. Use `/tmp/file`.
6. [ ] Recite: quit key is often `q`. Quit mid-file. Prove you are back at the prompt.
7. [ ] Predict: short file — `more` just prints and exits. Prove with a 2-line file.
8. [ ] Wrong-usage: expect `/pattern` search like `less`. Try it; record if `more` searches or not on your OS. Recite `less` as the search pager.
9. [ ] Combine: `set | more` as an alternate pager to `less`. Forward-only dump. `q`.
10. [ ] Recite interview: `more` vs `less` (forward vs both ways).
11. [ ] Privilege: no sudo for `/tmp/file`.
12. [ ] Predict: `more` directory — error. Then a file.
13. [ ] Combine: `head` first 10 of the long file, then `more` the whole file. Different jobs.
14. [ ] Recite cheat-sheet: `more file`.
15. [ ] Wrong-usage: `more -n 5` if you meant `head`. `more` is a pager, not head.
16. [ ] Combine: `ls -la /etc | more` — page a long listing.
17. [ ] Predict binary file — garbage. Use a text file.
18. [ ] Recite: end of file message / `(END)` variant. Reach the end of `seq` file.
19. [ ] Combine: `more` then `less` on the same file. Go backward only in `less`.
20. [ ] Combined: long file; forward only; `q` quit; `/tmp` text; contrast `less`.

## `less`

1. [ ] Recite: page **both ways**. Open a long file (`seq` or `/var/log/syslog` if readable). Move down, then **up**. Quit `q`.
2. [ ] Recite `/pattern` search. Search a word you know is in the file. `n` for next if available.
3. [ ] Recite `q` quit. Open and quit without changing the file (`less` is read-only viewing).
4. [ ] Predict: `less` on `/var/log/syslog` — permission denied if you cannot read it. Use `/tmp` long file then. Do not sudo-less logs unless lab.
5. [ ] Wrong-usage: `less` a missing file. Predict. Then a real path.
6. [ ] Combine: `set | less` from the `set` drill. `/EDITOR` search inside less if you exported it.
7. [ ] Privilege: reading syslog may need extra groups. If denied, tick by reciting “page logs” and use `/tmp`.
8. [ ] Recite: `G` end / `g` start if this is `less` (common). Jump to end, then start, on the `seq` file.
9. [ ] Predict: unlike `more`, you can go backward from the end. Prove.
10. [ ] Wrong-usage: `:wq` as if Vim. `q` only. Recite less is not an editor.
11. [ ] Combine: `/pattern` for a number like `150` in the `seq` file. Land on that line.
12. [ ] Recite cheat-sheet: syslog example, `/pattern`, `q`.
13. [ ] Privilege: `less /etc/shadow` as you — fail. Good.
14. [ ] Predict: `less -N` line numbers if supported. Optional. Sheet does not require it.
15. [ ] Combine: `man cat` uses a pager (often `less`). `q` from man is the same muscle.
16. [ ] Recite interview: search with `/`, quit with `q`, both directions.
17. [ ] Wrong-usage: `less file1 file2` — may open two files. Recite `:n` if you wander; or open one file.
18. [ ] Combine: `ls -lSh /tmp | less` — page a listing.
19. [ ] Predict `less` binary — “may be a binary file” prompt. `q`. Use text.
20. [ ] Combined: both ways; `/` search; `q`; syslog if allowed else `/tmp`; not an editor.

## `head`

1. [ ] Recite: first **10** lines by default. Use `/etc/passwd` or a `seq 1 20` file. Predict exactly 10 lines. Count them.
2. [ ] Recite `-n 5`: first **5** lines. Prove a 5-line print.
3. [ ] Recite `-n -2`: **all but the last 2** lines. On a 10-line file, predict 8 lines. Prove.
4. [ ] Predict: file shorter than 10 lines — `head` prints all. Prove with a 3-line file.
5. [ ] Wrong-usage: `head -5` vs `-n 5` — GNU often accepts both. Recite the sheet’s `-n` form.
6. [ ] Combine: `head /etc/passwd` then `head -n 5 /etc/passwd`. Second is a prefix of the first.
7. [ ] Privilege: `head /etc/passwd` is the usual public file. Not `shadow`.
8. [ ] Recite: negative `-n` means “except the tail.” Interview that sentence.
9. [ ] Wrong-usage: `head -n -2` on a 1-line file — empty or the line? Predict, prove.
10. [ ] Combine: `seq 1 10 > file.txt` then all three forms: default 10 (all), `-n 5`, `-n -2`.
11. [ ] Predict: `head` a missing file — error.
12. [ ] Recite cheat-sheet three forms from memory.
13. [ ] Privilege: no sudo for `/etc/passwd` head.
14. [ ] Combine: `head -n 5` vs `tail -n 5` on the same file — first vs last.
15. [ ] Wrong-usage: `head -n 5 -n -2` together — last flag may win. Use **one** form per run.
16. [ ] Predict: multiple files `head a b` — headers with filenames. Prove with two throwaway files.
17. [ ] Recite: `head` is not a pager; it exits after printing.
18. [ ] Combine: `cat 1.txt 2.txt > 3.txt` then `head -n 5 3.txt`.
19. [ ] Predict `head -n 0` — empty output? Prove.
20. [ ] Combined: default 10; `-n 5`; `-n -2` drop last two; count lines to prove.

## `tail`

1. [ ] Recite: last **10** lines by default. On `/var/log/syslog` if readable, or `seq 1 30 > /tmp/t`. Predict last 10. Prove.
2. [ ] Recite `-n 50`: last **50** lines. On a 30-line file, predict all 30. On a 100-line `seq`, prove 50.
3. [ ] Recite `-n +20`: **from line 20 to end**. On a 30-line file, predict 11 lines (20..30). Prove.
4. [ ] Recite `-f`: **follow** as the file grows (logs). `tail -f` a throwaway file in one terminal; append a line from another (`echo >>`). See the line appear. **Ctrl-C** to stop.
5. [ ] Predict: `tail -f` does not exit until interrupt. Prove Ctrl-C returns the prompt.
6. [ ] Wrong-usage: `tail -f /` a directory. Predict. Follow a **file**.
7. [ ] Combine: `head -n -2` vs `tail -n 2` — together they split the file. Prove on `file.txt`.
8. [ ] Privilege: `tail -f /var/log/syslog` may be denied. Use `/tmp` follow drill. Do not `sudo tail -f` on production logs as a toy.
9. [ ] Recite: `+20` is “start at line 20,” not “20 lines.” Contrast `-n 20` (last 20). Both on a 30-line file. Two different outputs.
10. [ ] Wrong-usage: `tail -n +20` vs `tail -n 20` mixed up. Write both predictions first, then run.
11. [ ] Combine: default 10 last lines of `seq 1 20` — should be 11..20.
12. [ ] Recite cheat-sheet four forms: default, `-n 50`, `-n +20`, `-f`.
13. [ ] Privilege: no sudo for `/tmp` files.
14. [ ] Predict: `tail -f` on a file you then `rm` — behavior varies. Skip if messy; do not rm syslog.
15. [ ] Combine: `tail -n 50 /var/log/syslog` if allowed; else 50-line `seq`.
16. [ ] Recite interview: follow logs with `-f`, stop with Ctrl-C.
17. [ ] Wrong-usage: `tail -n -5` (negative) — GNU tail may mean something else. Recite the sheet uses positive `50` and `+20`. Prefer those.
18. [ ] Combine: `head -n 5` and `tail -n +6` reconstruct a file? For 20 lines, `head -n 5` then `tail -n +6` covers all. `cat` both outputs.
19. [ ] Predict empty file — `tail` prints nothing. Prove.
20. [ ] Combined: last 10; last 50; from line 20; `-f` + Ctrl-C; **never** follow/delete system files you do not own.
