# Assignments — File system

Close `commands.md`. Recite, then type. Throwaway directory. Do not destroy real data.

## `chmod`

1. [ ] In a throwaway directory, create a script-like file and turn on its execute bit.
2. [ ] Recite: Linux does not care about `.sh` — prove a file with no extension can still be made executable.
3. [ ] Recite: Linux does not care about `.sh` — prove a `.sh` name without the execute bit is not enough.
4. [ ] Predict: after turning execute on, `ls` long listing shows an `x` in the mode for that file.
5. [ ] Prove you can run the throwaway script by path once the bit is on (script should only `echo` a word).
6. [ ] Wrong usage: turn execute on a path that does not exist. Predict the error.
7. [ ] What if the operand is missing: invoke the mode change with no file. Predict usage error vs hang.
8. [ ] Privilege: as the owner of the throwaway file, prove you do not need root to set execute.
9. [ ] Privilege: predict whether you can set execute on someone else’s file you do not own (do not attack system files).
10. [ ] Combine: create `notes` (no suffix) and `run.sh`; enable execute on both; prove both can run if they have a shebang or you pass them to a shell.
11. [ ] Human vs default: `+x` means “add execute”; predict it does not strip read/write you already had.
12. [ ] Predict: execute bit on a directory means something else (search/enter). Do not use this as your “run a program” proof — use a file.
13. [ ] Wrong usage: put `+x` after the filename. Predict whether the shell still accepts it.
14. [ ] Prove the kernel still does not decide type from the name: executable `notes` vs non-executable `malware.exe` in a throwaway dir.
15. [ ] Combine: show mode before and after with a long listing so the new `x` is visible.
16. [ ] Recite from memory the exact goal: “turn on execute bit”, not “rename to .sh”.
17. [ ] What if the file has no shebang and you execute it directly — predict “cannot execute binary” vs the shell still runs it (depends). Note what you see.
18. [ ] Predict output of a successful mode change (usually silent).
19. [ ] Wrong usage: `+x` on `/` or another real system path — do not do it. State why a throwaway file is required.
20. [ ] Combine with `ls`: after `+x`, the listing’s owner-execute column is `x` not `-`.

## `mount`

1. [ ] Recite the goal: attach a disk/partition onto a directory in the single Linux tree (not a new drive letter).
2. [ ] Predict: the mount point must already exist as a directory. Prove by naming the directory you would use (`/mnt/data` in the cheat sheet).
3. [ ] Privilege: predict whether a normal user can attach `/dev/sdb1` on `/mnt/data` (almost always needs root).
4. [ ] What if the operand is missing: no device, or no directory. Predict usage / “can’t find” errors. Do not run against real disks.
5. [ ] Wrong usage: mount point is a file, not a directory. Predict the failure. Use a throwaway file if you experiment on a loop device you created — never a production disk.
6. [ ] Combine: after a successful attach, prove the tree shows the extra disk under that directory (list the mount point).
7. [ ] Recite: extra disks live under `/`, e.g. `/mnt/data`, not `D:`.
8. [ ] Predict: if `/mnt/data` already had files, they are hidden until unmount — say that in one sentence (do not hide real data; use empty throwaway mount points only).
9. [ ] Human vs default: you typically pass device then directory. Predict what happens if you swap the two operands.
10. [ ] Privilege: do not attach or reformat a disk that holds real data. State how you would identify a throwaway disk first (`lsblk`).
11. [ ] Combine with `findmnt` or `lsblk`: after mount, the mount point column should show `/mnt/data`.
12. [ ] Wrong usage: device does not exist (`/dev/sdb1` on a machine with no `sdb`). Predict the error. Safe to try if that device is truly absent.
13. [ ] Recite the cheat-sheet example in your head (device `sdb1`, directory `/mnt/data`) then type it only on a lab disk.
14. [ ] Predict: this does not format the disk; it only attaches an existing filesystem.
15. [ ] What if the filesystem type is wrong for that partition — predict a failure to mount, not silent data loss (still never use a disk with real data).
16. [ ] Combine: create the mount-point directory first, then attach. Order matters — prove it.
17. [ ] Wrong usage: mounting the same device a second time on a different directory — predict whether the kernel allows it (note what you see; do not fight production mounts).
18. [ ] Predict output of success (often silent) vs failure (message on stderr).
19. [ ] Recite: Linux = one tree. Mount = hang this disk onto a directory.
20. [ ] Destructive warning: never `mkfs` as a substitute for this command. Mount ≠ format.

## `lsblk`

1. [ ] List block devices and their mount points.
2. [ ] Recite: this is how you see which disk/partition sits where before you mount.
3. [ ] Predict: output is a tree (disk → partitions), not a file listing of `/`.
4. [ ] Privilege: predict whether a normal user can run this (usually yes, read-only view).
5. [ ] What if the operand is missing: no arguments is the cheat-sheet form. Predict it still prints all block devices.
6. [ ] Wrong usage: pass a regular file in a throwaway directory. Predict error or empty vs treating it as a block device.
7. [ ] Combine: find whether `/dev/sdb1` exists before you even think about mount.
8. [ ] Combine: after a lab mount, prove the MOUNTPOINT column shows `/mnt/data` (or your throwaway mount).
9. [ ] Human vs default: default sizes are often human-ish already; note the SIZE column units you actually see.
10. [ ] Predict: LVM logical volumes, if any, appear under their parent disk — describe one line of what you see (or “none on this box”).
11. [ ] Recite: use this to avoid mounting or formatting the wrong disk.
12. [ ] Prove a disk with no mount point shows a blank MOUNTPOINT (if you have one).
13. [ ] Wrong usage: confuse this with `ls` of `/dev`. Run both in your head: one is a block-device tree, one is names in a directory.
14. [ ] Combine with `df`: only mounted filesystems show space in `df`; this command still shows unmounted disks.
15. [ ] Predict: loop devices and ROMs may appear — do not treat them as `/dev/sdb1`.
16. [ ] What if you add a USB in a lab: predict a new disk letter appears after re-running (do not yank production storage).
17. [ ] Privilege: viewing is safe; acting on a device name you copied wrong is not. Copy the NAME column carefully.
18. [ ] Recite from memory: “block devices and their mount points”.
19. [ ] Combine: identify the device that backs `/` (root) so you never format it.
20. [ ] Predict output columns you should see (NAME, and a mount-point column among them).

## `df`

1. [ ] Show disk space used and free in human-readable units.
2. [ ] Recite: the cheat-sheet flag is the human-readable one — do not invent a different flag.
3. [ ] Human vs default: run once with the human flag and once with no flag. Prove default is 1K-blocks (or similar), human uses `G`/`M`.
4. [ ] Predict: only *mounted* filesystems appear, not every disk `lsblk` knows.
5. [ ] Privilege: predict a normal user can read this (yes).
6. [ ] What if the operand is missing: no path means “all mounted filesystems”. Predict a table, not an error.
7. [ ] Wrong usage: pass a path that does not exist. Predict the error.
8. [ ] Combine: pass a throwaway directory and predict it reports the filesystem that directory lives on, not “directory size”.
9. [ ] Combine with `mount`: after attaching a lab disk on `/mnt/data`, prove a new row appears for that mount.
10. [ ] Recite: used/free space — this is not inode listings and not a block-device tree.
11. [ ] Predict which row is `/` and estimate whether “Avail” looks plausible before you trust a resize.
12. [ ] Wrong usage: expect unmounted `/dev/sdb1` to show here. Predict it will not, until mounted.
13. [ ] Privilege: filling a filesystem is destructive in effect. Use throwaway dirs; do not fill `/`.
14. [ ] Combine with `lsblk`: same mount point should appear in both views after a lab mount.
15. [ ] Human vs default: pick one number from the default output and match it (approximately) to the human line.
16. [ ] Predict: tmpfs and special mounts may appear — they are not your HDD.
17. [ ] What if the filesystem is 100% full — predict `Use%` and how that would break creating files (do not fill a real disk to prove this).
18. [ ] Recite from memory: “disk space used/free, human-readable”.
19. [ ] Combine: `df` on `/mnt/data` vs `/` — prove they can be different devices.
20. [ ] Wrong usage: this does not format or mount; predict that running it changes nothing on disk.

## `findmnt`

1. [ ] Show what is mounted where (the mount table).
2. [ ] Recite from memory: this answers “what is mounted where”, not “how much space”.
3. [ ] Predict: output is a tree of mount points starting at `/`.
4. [ ] Privilege: predict a normal user can read the mount table.
5. [ ] What if the operand is missing: no arguments lists the full table. Predict that, not a usage error.
6. [ ] Wrong usage: pass a path that is not a mount point. Predict no match / error vs listing children (note what you see).
7. [ ] Combine: after a lab mount on `/mnt/data`, prove that directory appears as a mount target.
8. [ ] Combine with `lsblk`: same device, same mount point, two views.
9. [ ] Combine with `df`: space vs mount table — both should mention `/mnt/data` only if it is mounted.
10. [ ] Human vs default: default is already meant for humans (tree). Predict it is not a hex dump.
11. [ ] Recite: Linux single tree — this command is how you inspect that tree of attachments.
12. [ ] Predict: `/` is mounted from some block device or mapper path; write the SOURCE you see.
13. [ ] Privilege: viewing is safe; unmounting the wrong target is not. This command only shows.
14. [ ] Wrong usage: confuse with `find` (search files). Predict this will not search filenames under `/home`.
15. [ ] What if nothing extra is mounted: predict you still see `/` and usual virtual filesystems.
16. [ ] Combine: identify SOURCE for your lab mount (`/dev/sdb1` or similar) without guessing from memory.
17. [ ] Recite the cheat-sheet one-liner purpose, then type the command with no flags (as in the sheet).
18. [ ] Predict: bind mounts and special fs types may show — do not treat them as extra physical disks.
19. [ ] Wrong usage: expecting free-space columns like `df`. Prove this table is about *where*, not *how full*.
20. [ ] Combine with `mount` (the attach command): findmnt is the proof; mount is the action. State which you run first on a lab disk.
