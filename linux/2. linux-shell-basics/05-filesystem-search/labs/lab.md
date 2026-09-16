# Labs — Filesystem search

**Where:** any Linux. Prefer `find` under `/tmp` or `/home` so a search from `/` is not required (it is slow and noisy).

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

Create `/tmp/find-lab` with a few `.log` files, a file owned by you, and a file named `core`. Find files named `hosts` under `/etc`. Find `*.log` under `/tmp/find-lab` (quote the glob). Find files owned by your user under `/tmp/find-lab`.

## Lab 2

Find regular files named `core` under `/tmp/find-lab` and delete them with `-exec rm`. Recreate `core`, then delete with `find … -print | xargs rm`. Recreate `core` with a space in a nearby filename, then delete with `-print0` and `xargs -0`.

## Lab 3

If `locate` exists: search for `passwd`. Run `sudo updatedb` and search again. If `locate` is missing, install `mlocate` or skip.

## Lab 4

`grep` a pattern in one file, then `-i`, then `-n`. Recurse with `grep -r` under `/tmp/find-lab` and under `~` for a short string.

Delete `/tmp/find-lab` when finished.

## Job and cert labs

## Lab 5 — RHCSA-style find

As root, find all files **owned by a lab user** and copy them into `/root/found-lab/` (create the dir). Do the same for files **larger than 50M** under `/usr` or `/var` (copy only names to a list if they are huge). Delete `/root/found-lab` after.

## Lab 6

Find files under `/tmp` with mtime older than 7 days, then newer than 1 day. Find empty files (`-size 0` or `-empty`).

## Lab 7

Find world-writable files under `/tmp` (`-perm -0002`). Do not chmod `/tmp` itself away from sticky+rwx.

## Lab 8

`grep -R` a config string under `/etc` for a service (for example `Listen` or `ServerName`). Ticket: “where is this setting?”
