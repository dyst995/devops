# Labs — xargs

**Where:** any Linux. Work in `/tmp/xargs-lab`.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

Write `names.txt` with one name per line. Pipe it to `xargs` with no extra flags. Pipe it to `xargs -I {} touch {}` (or `-i`). List the files created.

## Lab 2

Use a custom placeholder (`xargs -I T touch T`) from the same list.

## Lab 3

Create files named `core` under `/tmp/xargs-lab`, including one name with a space. Delete the `core` files with `find -print0 | xargs -0 rm`.

## Lab 4

Write `urls.txt` with a few URLs (or skip if you have no network). Run `xargs -P 4 -I {} curl -O {}` and see that several `curl`s can run at once.

Delete `/tmp/xargs-lab` when finished.

## Job and cert labs

## Lab 5

Make 20 files and `chmod 640` them all with `find … -print0 | xargs -0 chmod`. Confirm with `ls -l`.

## Lab 6

`ps`/`pgrep` a name you started, pipe PIDs to `xargs kill` (only your processes).

## Lab 7

Compress many `.log` files in a lab dir with `xargs gzip` (copies, not `/var/log`).
