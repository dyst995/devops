# 07 — Archives: zip, tar, gzip — Questions

Cover the Answers section. Answer first, then check.

1. What does `zip` do? What does `unzip` do?
2. Command to compress a folder into `archive.zip`. Command to extract it in the current directory.
3. What is `tar` for? Does it compress by default?
4. Decode `tar -cvf`, `tar -xvf`, `tar -tf`, `tar -cvzf`.
5. Why should `-f` sit next to the archive name?
6. What does `-` mean as the tar “filename”?
7. Explain `tar cf - dir1 | (cd dir2 && tar xf -)`.
8. Explain the double-`ssh` tar pipe from host1 to host2 through your host.
9. zip vs tar vs gzip — one sentence each.
10. What do `gzip`, `gunzip`, `zcat`, and `zgrep` do?
11. What does `gzip -c file1 > foo.gz` do? Why `-c`?
12. `gzip -c file2 >> foo.gz` vs `cat file1 file2 | gzip > foo.gz` — which compresses better, according to the notes?
13. `zcat foo.gz` is equal to which `gunzip` command? What content do you get after the two-file examples?
14. You need a compressed backup of `/etc` to send to a Linux box. `tar.gz` or `zip` — and write a tar command.
15. You must unpack a `.zip` from a Windows user on a server. Which pair of commands?

---

## Answers

1. Package and compress files into a ZIP. List, test, and extract ZIP contents.
2. `zip -rp archive.zip /path/to/` · `unzip archive.zip`
3. Bundle many files into one archive (tape/disk) and restore them. Compression is optional (e.g. `-z` for gzip).
4. Create verbose file · extract verbose file · list file · create verbose gzip file.
5. `-f` takes the next argument as the archive path (or `-`). Put the name immediately after `-f`.
6. stdin/stdout instead of a file on disk.
7. Pack `dir1` to stdout, then in a subshell `cd dir2` and unpack from stdin — copy the tree into `dir2`.
8. host1: `cd` + `tar -cf - .` over SSH → your machine → host2 SSH: `cd` + `tar -xf -`. Data never needs a temp tar on your disk.
9. zip = archive+compress ZIP format · tar = bundle files · gzip = compress a stream/file.
10. Compress · decompress · write decompressed data to stdout · grep inside gzip data.
11. Compress `file1` to stdout, save as `foo.gz`. `-c` writes to stdout instead of replacing `file1` with `file1.gz`.
12. `cat file1 file2 | gzip > foo.gz` (one gzip of both files).
13. `gunzip -c foo.gz`. Contents of `file1` and `file2`.
14. `tar.gz` is the Linux-native habit. Example: `tar -cvzf etc-backup.tar.gz /etc`
15. `unzip file.zip` (created with `zip`).
