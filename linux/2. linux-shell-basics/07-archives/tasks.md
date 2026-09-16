# Tasks — Archives

Close `theory.md`. Work in `/tmp/arch-tasks`.

## Warm-up (layers)

1. From memory: which tool glues files, which squeezes one stream, which does both in one ZIP? What is `.tar.gz`?
2. Predict: default gzip of `file` — is `file` still there? How do you keep the original (two ways from the notes)?

## zip

3. Pack a folder recursively with the flag pair from the notes. Unpack into a new directory. Compare.

## tar flags (construct until automatic)

4. Create an uncompressed archive (create + verbose + file). List it. Extract it. Recite what **c x t v f** mean and why **f** must sit so the filename can follow.
5. Create a gzip-filtered archive (add **z**). Extract it.
6. Predict the cluster for “create gzip verbose file” vs “extract verbose file” vs “list file.”

## tar as a pipe (repeat no file on disk)

7. Copy a tree to another directory using stdout/stdin as the archive name (`-`). Prove no `.tar` was left.
8. Write (do not need two hosts) the notes’ pattern for host1 → your machine → host2.

## gzip family

9. Compress to stdout into `foo.gz`. Append a second member with `>>`. Also make one gzip of two files concatenated. Which shrinks better according to the notes?
10. Print decompressed content three ways from the notes (`zcat` / gunzip to stdout / …). Search inside the gzip without fully unpacking to a folder.

## Scenario

11. Backup `/etc` so you can restore **only** `hosts` into `/tmp/restore-test/` without writing onto `/etc`. Demonstrate.
