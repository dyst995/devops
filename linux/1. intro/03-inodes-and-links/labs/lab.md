# Labs — Inodes and links

**Where:** any Linux. Work under `/tmp/link-lab`.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

Create `/tmp/link-lab`, put text in `original.txt`, and make a hard link named `another-name.txt`. List both with inode numbers. Change one file and read the other.

## Lab 2

Delete `original.txt`. List what is left and read `another-name.txt`.

## Lab 3

Create a symlink to `another-name.txt`. Create another symlink that points at a path that does not exist. List them and try to read both.

## Lab 4

Create a file `real` and a **relative** symlink to it. Move `real` into a subdirectory. Try to read the symlink.

Delete `/tmp/link-lab` when finished.

## Job and cert labs

## Lab 5

Simulate a release layout: directories `app-1.0` and `app-1.1` each with an `index.html`. Point a symlink `app-current` at `1.0`, then switch it to `1.1` without downtime to the path name (replace the symlink). Confirm a `cat app-current/index.html` follows the new target.

## Lab 6

Find files on the lab VM that have more than one hard link (`find -type f -links +1` under `/usr` is enough; do not delete them).

## Lab 7

Break a service-style path: symlink `/tmp/link-lab/config` → a file, delete the file, then diagnose with `ls -l`, `readlink`, and `stat`. Recreate the target.

## Lab 8

Copy a file with `cp` vs `cp -l` vs `ln`. Compare inode numbers. This is how some backup tools save space.
