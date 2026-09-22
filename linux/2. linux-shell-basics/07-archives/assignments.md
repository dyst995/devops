# Assignments — Archives

Close `commands.md`. Recite, then type. Predict the result **before** you run. Use a throwaway directory under `/tmp`. Do **not** `ssh root@` real production hosts — lab VMs or skip the live SSH and still recite the pipeline. Never extract untrusted archives as root.

## `zip`

1. [ ] Recite the flags that pack a **folder** into a ZIP recursively. Create `path/to/` with two files. Pack it. Prove `archive.zip` exists (`ls`).
2. [ ] Recite what `-r` is for (directories). Predict: zip **without** recurse — does the folder’s contents get packed? Prove on a small tree.
3. [ ] Recite `-p` on the cheat sheet (paths / recurse pack as listed). After packing, `unzip -l` or extract in a second dir and prove relative paths survived.
4. [ ] Predict: zip overwrites an existing `archive.zip` or adds — check your zip’s behavior. Recite “do not blindly overwrite a real backup.”
5. [ ] Wrong-usage: `zip archive.zip` with no files. Predict the error / empty archive. Then pass a real path.
6. [ ] Combine: pack `path/to/` → copy the zip to another throwaway dir → you will unzip there later.
7. [ ] Privilege: creating a zip in `/tmp` needs no sudo. Prove as yourself.
8. [ ] Recite: ZIP is glue **and** compress (vs `tar` then `gzip`). Interview one sentence.
9. [ ] Wrong-usage: `zip -rp` with the directory and the zip name swapped. Predict a mess. Recite: zip file first, then the path to pack (confirm with `man zip` if unsure).
10. [ ] Combine: two different folders into **two** zips. Names must differ.
11. [ ] Predict a file that disappears after zip — the original tree should **still** be there (zip does not delete sources). Prove `ls path/to`.
12. [ ] Recite `-r` from memory; pack a nested `empty/` dir too.
13. [ ] Privilege: do not zip `/etc` as root for fun on a shared box. Only your throwaway tree.
14. [ ] Wrong-usage: `zip -r archive /` — **never**. Recite why. Do not run it.
15. [ ] Combine: `zip` then list size of the zip vs the tree (`du` / `ls -lh`). Compression is expected but not the drill’s only proof.
16. [ ] Predict: packing a symlink — does zip store the link or the target? Optional; record what **your** zip does.
17. [ ] Recite the cheat-sheet zip line’s intent: pack folder recursively into `archive.zip`.
18. [ ] Wrong-usage: spaces in the path without quotes. Create `path/to me/`, quote it, pack successfully.
19. [ ] Combine: zip the tree, add a new file to the tree, zip again to a **new** archive name — old zip should lack the new file.
20. [ ] Combined: `-r` recurse; paths kept; originals remain; never zip `/`; throwaway only.

## `unzip`

1. [ ] Recite: extract into the **current** directory. In an empty throwaway dir, extract the zip from the `zip` drills. Prove files appear.
2. [ ] Predict: extracting twice — overwrite prompt or silent overwrite? Prove once. Do not clobber real work.
3. [ ] Recite: you must `cd` to the destination first (cheat sheet: current directory). Extract in dir A vs dir B — files land where you stood.
4. [ ] Wrong-usage: `unzip` with no arguments. Predict. Then pass the zip name.
5. [ ] Combine: `zip` in one dir, copy zip, `cd` elsewhere, `unzip`. Tree recreated relative to **here**.
6. [ ] Privilege: unzip as yourself into `/tmp`. Never `sudo unzip` into `/`.
7. [ ] Predict: `unzip` a missing file. Exact error. Then the real archive.
8. [ ] Recite listing without extract if your unzip supports `-l`. List first, then extract. Compare names.
9. [ ] Wrong-usage: `unzip archive.zip /opt` thinking that is the dest (syntax varies; many unzip use `-d`). Recite “current directory” from the sheet; use `cd` or `-d` only after you check man.
10. [ ] Combine: zip a tree with two files, unzip, `diff -r` original vs extracted (from a sibling copy).
11. [ ] Privilege: a zip bomb / untrusted zip — do not extract as root. Recite that. Use only **your** zip.
12. [ ] Predict: zip contains `../` weird names (you did not create that). Skip; still recite “extract in a throwaway cwd.”
13. [ ] Recite the one-word interview: unzip lands **here**.
14. [ ] Wrong-usage: `unzip -rp` (those flags were for **zip**). Predict unknown option. Unzip simply.
15. [ ] Combine: extract, delete the extracted tree, extract again. Second extract restores.
16. [ ] Predict overwrite of a **changed** file: you edit an extracted file, unzip again. Did your edit survive? Record the prompt.
17. [ ] Recite: ZIP on Windows/Java is why you bother with zip vs tar. One sentence.
18. [ ] Wrong-usage: `unzip *.zip` with two zips and a confused cwd. Unzip **one** named archive per drill.
19. [ ] Combine: `ls` before and after unzip. New files should match the packed path.
20. [ ] Combined: cwd is the dest; list then extract; no sudo; only your archive.

## `tar`

1. [ ] Recite create / verbose / file: pack `path/to/` into a `.tar` (**not** gzip yet). Prove the archive exists. Names: `c` `v` `f`.
2. [ ] Recite extract: unpack into a throwaway dir. Prove the tree. Names: `x` `v` `f`.
3. [ ] Recite list contents without extracting. Names: `t` `v` `f`. Compare the list to the original tree.
4. [ ] Recite create gzip-compressed `.tar.gz` (`z`). Pack the same tree. Prove the file is smaller or at least exists. Names: `c` `v` `z` `f`.
5. [ ] Predict: `f` must be immediately followed by the archive name (traditional tar). Swap order wrongly if you want the error, then the cheat-sheet order.
6. [ ] Recite the **no file on disk** copy: tar to stdout, pipe, `(cd dest && tar extract stdin)`. Copy `dir1` to `dir2` that way. Prove `dir2` has the files. No `.tar` left behind.
7. [ ] Predict: `tar cf - dir1` — `-` means stdout. `tar xf -` — stdin. Recite dash = stream.
8. [ ] Recite the two-host pipeline: pack on host1 → through **your** machine → unpack on host2 (`ssh` … `tar -cf -` piped to `ssh` … `tar -xf -`). Draw the arrows. **Do not** run against production. Lab VMs or recite only.
9. [ ] Privilege: `ssh root@` is root on those hosts. Lab only. Recite the `cd` on each side so you copy the **intended** tree.
10. [ ] Wrong-usage: `tar -xvf` with no archive name. Predict. Then pass `f` a real file.
11. [ ] Combine: create `.tar` → list → extract in a new dir → `diff -r`.
12. [ ] Combine: create `.tar.gz` with `z` → extract (gzip tar). Recite that `z` is compression on the tarball.
13. [ ] Predict: `tar -tf` vs `unzip -l` — same job, different format. List both if you have a zip and a tar.
14. [ ] Wrong-usage: `tar -cvf archive.tar.gz` **without** `z` — you get an uncompressed tar named `.gz`. Prove with `file` if available, then redo with `z`.
15. [ ] Recite `c` vs `x` vs `t` vs `z` vs `v` vs `f` as a table from memory.
16. [ ] Privilege: extracting a tar as root can overwrite system files. Always `cd` to `/tmp/sandbox` first.
17. [ ] Wrong-usage: `tar -cvf / archive.tar` argument order that packs `/`. **Never**. Recite path last as the **member**, not the archive destination `/`.
18. [ ] Combine: stream copy `dir1` → `dir2` without archive; then gzip tar of `dir1` as a **backup file** you could copy.
19. [ ] Predict verbose `-v`: you see member names while packing. Run create with `v` and without `v`. Difference is chatter, not the archive.
20. [ ] Combined: `cvf` / `xvf` / `tf` / `cvzf`; stdout pipe copy; SSH story on a lab; **never** tar `/` into an archive by accident; extract only in throwaway dirs.

## `gzip`

1. [ ] Recite: compress to **stdout**, keep the original. Compress `file1` into `foo.gz` that way. Prove `file1` still exists and `foo.gz` exists.
2. [ ] Recite: append another gzip **member** with `>>`. Append `file2`’s compressed bytes onto `foo.gz`. Recite “works, worse ratio.”
3. [ ] Recite: `cat file1 file2 | gzip` as **one** gzip of both — better compression. Create `foo2.gz` that way. Keep `foo.gz` for the append experiment.
4. [ ] Predict: `gzip file1` **without** `-c` (if you try this, use a **copy**) may replace `file1` with `file1.gz`. Recite why the cheat sheet uses `-c` and a redirect — to **keep** `file1`. Prefer `-c` for these drills.
5. [ ] Wrong-usage: `gzip -c file1 > file1` (same name). You can truncate the source. Redirect to a **different** `foo.gz`.
6. [ ] Combine: two files concatenated then gzipped vs two members appended. Recite which is one stream.
7. [ ] Privilege: gzip in `/tmp` as yourself. Do not gzip `/var/log/syslog` in place on a shared box.
8. [ ] Recite: gzip squeezes a **single stream**; tar glues files. Together they are `.tar.gz`.
9. [ ] Predict `-c` = stdout. Without redirect, binary garbage hits the terminal. Redirect or pipe.
10. [ ] Wrong-usage: `gzip -c file1 file2 > foo.gz` — check whether gzip concatenates inputs like cat. Compare to `cat file1 file2 | gzip`. Record what **your** gzip does.
11. [ ] Combine: create `foo.gz` from `file1` with `-c`; `ls -lh` original vs gz.
12. [ ] Recite `>>` append of a second member. `zcat` later should still show **both** files’ text if they were text.
13. [ ] Privilege: never `gzip /`. Recite that gzip is not a directory packer (`-r` exists on some gzip; do not recurse the OS).
14. [ ] Wrong-usage: `gzip -cvzf` (those are **tar** flags). gzip’s cheat-sheet flag here is `-c`.
15. [ ] Combine: `cat f1 f2 | gzip > foo.gz` then you will `zcat` / `zgrep` in later sections.
16. [ ] Predict: compressing already-compressed data — size may grow. Optional; recite “worse ratio” from the append note.
17. [ ] Recite the three cheat-sheet gzip patterns: `-c` redirect; `-c` append; `cat | gzip`.
18. [ ] Wrong-usage: spaces around `>` accidentally sending gzip to a file named `=` . Careful typing.
19. [ ] Combine: keep originals; only the `.gz` is new when using `-c`.
20. [ ] Combined: `-c` keeps source; `>` vs `>>`; `cat | gzip` one member; no tar flags; throwaway files only.

## `zcat`

1. [ ] Recite: print **decompressed** content. `zcat` your `foo.gz`. Predict the text of `file1` (and `file2` if you appended or catted).
2. [ ] Predict: `zcat` vs `cat` on a `.gz` — `cat` is binary garbage. Prove both (binary may mess the terminal; `reset` if needed, or `cat` piped to `file`).
3. [ ] Recite: `zcat` is for gzip data. Run it on an uncompressed text file — expect an error. Then on `foo.gz`.
4. [ ] Wrong-usage: `zcat foo.gz > foo.gz` (overwrite). Redirect decompressed output to a **new** text file if you save it.
5. [ ] Combine: `gzip -c` → `zcat` equals original `file1` (`diff`).
6. [ ] Privilege: `zcat` as you on `/tmp`. Do not `zcat` huge logs unpaged — pipe to a pager.
7. [ ] Predict multiple gzip members (`>>` append): `zcat` shows both members’ data in order. Prove if you built that file.
8. [ ] Recite the interview: “how do you read a `.gz` without replacing it with gunzip?”
9. [ ] Wrong-usage: `zcat` a `.tar.gz` — you get a **tar stream**, not a file listing. Recite: use `tar -tzf` for listing. Optional proof: `zcat archive.tar.gz | tar -t`.
10. [ ] Combine: `zcat foo.gz | grep` vs `zgrep` (next). Same hits on a small file.
11. [ ] Predict: missing file. Error, then the real `foo.gz`.
12. [ ] Recite `zcat` ≡ gunzip to stdout (see `gunzip`). You will prove equality next section.
13. [ ] Privilege: paging: `zcat foo.gz | less`. Quit `q`.
14. [ ] Wrong-usage: `zcat -c` extra flags you do not know. Bare `zcat file.gz` as on the sheet.
15. [ ] Combine: two gz files (if you have `foo.gz` and `foo2.gz`) — `zcat` each; compare the cat-then-gzip vs append-member outputs.
16. [ ] Predict exit status 0 on success. `echo $?`.
17. [ ] Recite: originals remain; you only **print**.
18. [ ] Wrong-usage: `zcat` on a zip (PKZIP). Expect failure. ZIP is not gzip.
19. [ ] Combine: create, `zcat`, `diff` against source. Tick only if they match.
20. [ ] Combined: decompressed print; not `cat`; pager for large output; not for zip; `diff` proof.

## `gunzip`

1. [ ] Recite: `gunzip -c` is the **same as `zcat`**. Run `gunzip -c foo.gz` and compare to `zcat foo.gz` (`diff` of the two outputs).
2. [ ] Predict: `gunzip foo.gz` **without** `-c` (use a **copy** of the gz) removes/replaces with a plaintext file. Recite why `-c` is the safe “print” form. Prefer copies in `/tmp`.
3. [ ] Recite `-c` = write uncompressed to stdout; original `.gz` kept. Prove `foo.gz` still exists after `-c`.
4. [ ] Wrong-usage: `gunzip -c foo.gz > foo.gz`. Truncation risk. Redirect to `foo.txt`.
5. [ ] Combine: `gzip -c file1 > foo.gz` → `gunzip -c` → `diff` `file1`.
6. [ ] Privilege: do not `gunzip` system `.gz` docs in `/usr/share` in place. Only `/tmp` copies.
7. [ ] Predict: `gunzip -c` vs `zcat` — identical bytes. Prove with `cmp` or `diff`.
8. [ ] Recite the cheat-sheet comment “same as zcat.”
9. [ ] Wrong-usage: `gunzip -cvzf` tar flags. This tool is gzip. `-c` only for this sheet.
10. [ ] Combine: `gunzip -c foo.gz | head` (first lines) vs whole `zcat`.
11. [ ] Privilege: no sudo to decompress your file.
12. [ ] Predict a corrupt `.gz` (truncate a **copy**). `gunzip -c` should error. Do not need to keep the corrupt file.
13. [ ] Recite: gunzip’s job is expand; gzip’s job is squeeze; `tar z` wraps both.
14. [ ] Wrong-usage: `gunzip` a `.tar` that is not gzipped. Error. Then `tar -xf`.
15. [ ] Combine: `zcat`, `gunzip -c`, and `gzip -dc` if you have it — all stdout decompress. Sheet requires the first two.
16. [ ] Predict: after in-place `gunzip` on a copy, the `.gz` name is gone and plaintext appears. Recite; optional prove on a copy.
17. [ ] Recite `-c` from a blank page and run it.
18. [ ] Wrong-usage: `un gzip` two words. The command is `gunzip`.
19. [ ] Combine: append-member `foo.gz` → `gunzip -c` shows both texts.
20. [ ] Combined: `-c` equals `zcat`; keeps `.gz`; never in-place on system files; `diff` to original.

## `zgrep`

1. [ ] Recite: grep **inside gzip data**. Put a unique word in `file1`, gzip to `foo.gz` (`-c`). Search that word with `zgrep`. Predict the matching line.
2. [ ] Predict: `grep` on `foo.gz` without decompressing — miss or “binary.” Then `zgrep` hits. Prove both.
3. [ ] Recite `zgrep pattern file.gz`. Use your throwaway pattern and `foo.gz`.
4. [ ] Wrong-usage: `zgrep -r` on a gzip as if it were `grep -r` on a tree — optional; this sheet is one gzip file. Stay with one `foo.gz`.
5. [ ] Combine: `zcat foo.gz | grep pattern` vs `zgrep pattern foo.gz`. Same line?
6. [ ] Privilege: `zgrep` your file in `/tmp`. Do not `zgrep` other users’ mail.
7. [ ] Predict: no match → non-zero exit. Prove `echo $?`.
8. [ ] Recite: `zgrep` is the compressed cousin of `grep` (contents, not filenames — that was `find`/`locate`).
9. [ ] Wrong-usage: `zgrep pattern foo.tar` uncompressed tar. Use `zgrep` on **gzip**. For `.tar.gz` you may `zgrep` if it is gzip-wrapped **text**; a tar of binaries is the wrong demo. Use a gzip of text.
10. [ ] Combine: two words in the uncompressed text, `zgrep` one of them, miss the other.
11. [ ] Predict case: `zgrep` without `-i` vs `Fun`. Optional `-i` if your zgrep supports it (grep-like). Sheet only requires the basic pattern search.
12. [ ] Recite the interview: “logs are rotated to `.gz` — how do you search them?”
13. [ ] Privilege: `zcat huge.gz | grep` can be heavy. For the drill, tiny files.
14. [ ] Wrong-usage: `zgrep` a `.zip`. Recite ZIP ≠ gzip. Use `unzip -l` / unzip then grep.
15. [ ] Combine: `gzip -c`, `zcat`, `gunzip -c`, `zgrep` on the same `foo.gz`. Four proofs.
16. [ ] Predict: pattern with spaces — quote it. Prove.
17. [ ] Recite: decompress is implicit; you do not create a temp file yourself.
18. [ ] Wrong-usage: `gzgrep` vs `zgrep` — if both exist they may be the same. Use the cheat-sheet name `zgrep`.
19. [ ] Combine: append two members → `zgrep` a word that exists only in `file2`. Hit?
20. [ ] Combined: search gzip without manual unzip; `grep` on raw gz fails; quote patterns; throwaway text only.
