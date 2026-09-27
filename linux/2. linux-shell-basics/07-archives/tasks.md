# Tasks — Archives

Close `theory.md`. Work in `/tmp/archives-tasks`. Do the action or write the answer, then check yourself.

## Warm-up (layers)

1. From memory: which tool glues files, which squeezes one stream, which does both in one ZIP? What is `.tar.gz`?
2. Recite the memory hook: `tar` = tape archive; `gzip` = squeeze one stream; `tar.gz` = glue then squeeze; `zip` = …
3. Predict: default `gzip` of `file` — is `file` still there? How do you keep the original (two ways from the notes: `-c` and `-k`)?

## zip / unzip

4. Under `/tmp/archives-tasks`, create a small folder tree with a few files. Pack it recursively with the flag pair from the notes (`zip -rp archive.zip path/`).
5. Unpack into a **new** directory (create dest, `cd` there, `unzip` — or unzip and move). Compare original vs extracted (names and contents).
6. Open `man zip` / `man unzip` briefly: name one extra flag you did not use.

## tar flags (construct until automatic)

7. Create an uncompressed archive (`tar -cvf archive.tar path/`). Recite what **c x t v f** mean and why **f** must sit so the filename can follow.
8. List the archive (`tar -tf archive.tar`). Extract it into a clean subdirectory (`tar -xvf`). Confirm files.
9. Create a gzip-filtered archive (`tar -cvzf archive.tar.gz path/`). Extract it. Confirm the `.tar.gz` / `.tgz` idea.
10. Predict the cluster for “create gzip verbose file” vs “extract verbose file” vs “list file” — write `cvzf` / `xvf` / `tf` from memory, then run each once.
11. Deliberately put `-f` in the wrong place so the filename is not the next argument — predict the failure mode, then fix.

## tar as a pipe (no file on disk)

12. Copy a tree to another directory using stdout/stdin as the archive name (`tar cf - dir1 | (cd dir2 && tar xf -)`). Prove no intermediate `.tar` was left on disk.
13. Write (do not need two hosts) the notes’ pattern for host1 → your machine → host2. Label each stage: pack on host1, your SSH client as pipe, unpack on host2.
14. Optional local stand-in: two directories under `/tmp/archives-tasks` acting as “host1 tree” and “host2 dest” using the same `tar cf -` / `tar xf -` idea without SSH.

## gzip family

15. Compress to stdout into `foo.gz` (`gzip -c file1 > foo.gz`). Confirm `file1` still exists.
16. Append a second member with `>>` (`gzip -c file2 >> foo.gz`). Also make one gzip of two files concatenated (`cat file1 file2 | gzip > foo2.gz`). Which shrinks better according to the notes? Compare sizes if you like.
17. Print decompressed content three ways from the notes / equivalents: `zcat`, `gunzip -c`, and (conceptually) what you would get from `cat file1 file2`.
18. Search inside the gzip without fully unpacking to a folder (`zgrep pattern foo.gz`).
19. Run default `gzip` on a **copy** of a disposable file (not the only copy of something you need). Confirm the original name was replaced with `.gz`. Restore with `gunzip` if you want.

## Mix / predict

20. You receive `backup.tgz`. Which tar flags extract it? Predict, then extract into `/tmp/archives-tasks/restore-tgz/`.
21. You need only to **see** what is inside a `.tar.gz` without extracting — which flag cluster?
22. Pack the same folder once with `zip -rp` and once with `tar -cvzf`. Note one operational difference (tooling / platform / single-stream vs ZIP).

## Scenario

23. Backup a small stand-in for `/etc` (copy a few files such as `hosts`-like content into `/tmp/archives-tasks/fake-etc/`, or use real `/etc` **read-only** as source if your user can read it). Create a compressed tar backup. Restore **only** one file (e.g. `hosts`) into `/tmp/archives-tasks/restore-test/` without writing onto the real `/etc`. Demonstrate listing before extract, then extract the single member.
24. Ticket: “copy this directory tree to another path on the same box without leaving a tarball behind.” Use the pipe form. Show both trees match.
