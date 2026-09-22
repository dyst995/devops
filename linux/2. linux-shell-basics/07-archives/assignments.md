# Assignments — Archives

Close `commands.md`. Type and run in a throwaway directory. Do not `tar`/`zip` `/` or `/etc`. Do not extract archives over system paths. `ssh` pipe examples are optional and only if you have two hosts and keys.

## `zip` / `unzip`

### Easy

1. [ ] Make a small folder of files. `zip -rp` it into `archive.zip`.
2. [ ] `cd` to another empty dir (or unzip in a subdir) and `unzip` the archive. `ls` to prove the tree.

### Medium

3. [ ] `unzip` listing: if you only have `unzip` without extra flags from the course, `unzip` into a clean dir and `find`/`ls -R` the result. Compare to the original tree.
4. [ ] Someone ran `zip archive.zip` with no files. Note the result. Zip the folder again with `-r` / `-rp` as taught.

### Hard

5. [ ] Zip a tree, change one source file, zip again. Unzip to a **new** dir. Which version of the file is in the zip? `diff` is not required — `cat` both.
6. [ ] Combine: `find` the zip, `ls -lh` it, `mkdir -p` extract dir, unzip there, `grep` a string in an extracted file.

## `tar` (create, list, extract, gzip)

### Easy

1. [ ] `tar -cvf` a directory into `archive.tar`. Then `tar -tf` to list it.
2. [ ] `tar -xvf` into a clean directory (or after `mkdir`/`cd`). Compare with `ls`.

### Medium

3. [ ] Create `archive.tar.gz` with `-cvzf`. List with `tar -tf` (add `-z` if your tar needs it to list gzip — try, read the error).
4. [ ] Someone used `tar -xvf` on a `.tar.gz` without decompression. If it fails, extract the gzip form correctly (`-z`). Do not `rm -rf` anything except your extract dir.

### Hard

5. [ ] Course pipe: `tar cf - dir1 | (cd dir2 && tar xf -)` to copy a tree **without** leaving a `.tar` on disk. Prove with `ls`/`diff` via `cat` of a known file.
6. [ ] Combine: `tar -cvzf` a project dir, `ls -lh` vs uncompressed `.tar`, `find` + `grep` inside after extract. Optional lab: the two-`ssh` tar pipe only if you already have SSH from later notes — skip if not.

## `gzip` / `zcat` / `zgrep`

### Easy

1. [ ] `gzip -c file1 > foo.gz` (keeps `file1`). `ls` both.
2. [ ] `zcat foo.gz` (or `gunzip -c`). Same text as `file1`?

### Medium

3. [ ] `cat file1 file2 | gzip > foo.gz` (one stream). `zcat` and see both files’ content.
4. [ ] `zgrep` a pattern in `foo.gz`. Then `gunzip -c foo.gz | grep` the same pattern (grep from search topic). Same hits?

### Hard

5. [ ] Course: `gzip -c file2 >> foo.gz` (second member). `zcat` it. Note the course warning about worse ratio — you are just seeing it work.
6. [ ] Combine: `find` `*.gz`, `zgrep` a word, `ls -lh` compressed vs original. Do not `gzip` `/var/log` files on a shared host.
