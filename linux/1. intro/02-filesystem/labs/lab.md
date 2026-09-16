# Labs — File system

**Where:** Rocky VM (WSL is enough for Labs 1–2). Do not `umount` `/` or edit the root line in `/etc/fstab`.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

List `/`, print your working directory, `cd` to `/`, and list `/home` and `/mnt`. Compare that layout with how Windows shows extra disks.

## Lab 2

In `/tmp`, create a file named `notes` (no `.sh`) whose first line is a bash shebang and whose second line prints a short message. Try to run it with `./notes`, then turn on the execute bit and run it again. Delete the file when finished.

## Lab 3

List block devices, disk space, and the mount table. Find which device is mounted on `/`. Find the extra empty disk from [setup](../../../setup.md) if you attached one.

## Lab 4

Read `/etc/fstab` (skip comments and empty lines). Do not change it in this lab.

## Job and cert labs

## Lab 5

On the extra disk (or an LV): create a filesystem, mount it, put a file on it, **unmount**, get the UUID (`blkid`), add an `fstab` line that uses **UUID=** (not `/dev/sdX`), `mount -a`, reboot if you can, and confirm the file is still there. Remove the fstab line when the lab is over.

## Lab 6

Mount that filesystem with `noexec`, copy a script onto it, and try to run the script from that mount. Remount without `noexec` (or unmount) when finished.

## Lab 7

Compare `df -h` with `df -i`. Create many empty files on the lab filesystem until you see inode pressure (or stop if the disk is huge — then just explain how you would hunt “disk full” vs “no space, inodes”).

## Lab 8

Make a **bind mount** of a directory onto another path. List both with `findmnt`. Remove the bind mount. Do not bind-mount over system paths.
