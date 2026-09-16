# Labs — Disk quotas

**Where:** Rocky VM. Use a **non-root** filesystem (the LVM lab mount on Disk 2). Checkpoint first. Install the `quota` package if the commands are missing.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

Backup `/etc/fstab`. Add `usrquota` and `grpquota` to the **options** of the lab filesystem only. Remount that filesystem and check its mount options.

## Lab 2

Run `quotacheck` on that mount, list the quota files it created, and turn quotas on.

## Lab 3

Create a test user (or reuse one). Set user quota limits with `setquota` (soft and hard for blocks **and** inodes). Show `repquota` and `quota` for that user.

As that user, try to write more data under the lab mount than the hard block limit allows. Try creating more files than the hard inode limit. Use `edquota` once so you have used the interactive editor too.

## Lab 4

Turn quotas off. Delete the test user. Restore `fstab` from your backup if you do not want quotas to stay. Remount.

## Job and cert labs

## Lab 5

Set a **group** quota on `labgroup1` (create the group and a member). Have two members write files owned by that group on the lab FS. Show `repquota -g`.

## Lab 6

Set a soft block limit you can hit, keep writing, and watch grace (`edquota` / `repquota`). This is the “warn then enforce” ticket on shared `/home`.

## Lab 7

Report: produce a `repquota` dump you could paste into a ticket. Name the user over quota and whether they hit blocks, inodes, or both.
