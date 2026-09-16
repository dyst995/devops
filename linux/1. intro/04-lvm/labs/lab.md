# Labs — LVM

**Where:** Rocky VM. Use only the extra empty disk from [setup](../../../setup.md). Checkpoint first. Confirm with `lsblk` that you are not touching the OS disk.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck. Replace `/dev/sdb` with your extra disk (`/dev/vdb` is common too).

## Lab 1

Run the PV / VG / LV scan and display commands. Note which objects belong to the **system** already and which disk is still unused.

## Lab 2

On the extra disk only: create a PV, a VG named `vg_lab`, a 2G LV named `data`, format it ext4, mount it on `/mnt/lvm-lab`, and write a test file there. Use `df`, `lsblk`, and `findmnt` on that mount.

## Lab 3

Create a second LV named `extra` that uses all remaining free space in `vg_lab`. Display LVs.

## Lab 4

If you will use this VG for swap or quota labs, unmount `/mnt/lvm-lab` only if you need to and leave the VG. If you want a clean disk: unmount, remove both LVs, remove the VG, remove the PV, then `lsblk` again.

## Job and cert labs

## Lab 5 — grow a volume (RHCSA-style)

With `data` mounted: extend the LV by 512M (or `+100%FREE` if you still have VG space). Grow the **filesystem** to match (`resize2fs` for ext4, `xfs_growfs` for XFS). Confirm with `df` and `lvdisplay`. If the VG is full, add the rest of Disk 2 as a second PV (`pvcreate` + `vgextend`) first — that is the “disk is full, we added a disk” ticket.

## Lab 6

Add a persistent `fstab` line for the LV using `/dev/mapper/...` or UUID. `mount -a`. Reboot if you can. Remove the line at the end of the day if this is a throwaway mount.

## Lab 7

Create an LVM **snapshot** of `data` (needs free VG extents). Change a file on `data`, mount the snapshot read-only elsewhere, compare. Remove the snapshot.

## Lab 8

Do **not** shrink a filesystem unless you have a checkpoint and a guide open. If you try `lvreduce`, snapshot first and only on the lab LV.
