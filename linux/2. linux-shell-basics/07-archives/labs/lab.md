# Labs — Archives

**Where:** any Linux. Work in `/tmp/arch-lab`.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

Create a small directory tree. Pack it with `zip -rp`, unzip into a new folder, and compare.

## Lab 2

Create `archive.tar` with `tar -cvf`, list it with `-t`, extract with `-x`. Create `archive.tar.gz` with `-z`. Extract the gzipped archive.

## Lab 3

Copy a directory tree using `tar` on stdout/stdin (no `.tar` file on disk), as in the notes.

## Lab 4

Compress with `gzip -c`, inspect with `zcat` / `gunzip -c`, search with `zgrep`. Compare appending two gzip members vs piping two files into one `gzip`.

Delete `/tmp/arch-lab` when finished.

## Job and cert labs

## Lab 5

Backup `/etc` to `/root/etc-YYYYMMDD.tar.gz` (root). List contents. Extract **one** file (for example `hosts`) into `/tmp`. This is the “restore one config” ticket.

## Lab 6

Create a tar with `--exclude` (skip a subdirectory). Compare archive size.

## Lab 7

Copy a tree to another machine with the notes’ `tar | ssh | tar` pipeline, or to a second directory on the same box if you have only one VM.

## Lab 8

`gzip -d` / `gunzip` a compressed log copy. `zgrep` a string without decompressing to disk.
