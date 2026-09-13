# 04 — LVM — Questions

Cover the Answers section. Answer first, then check.

1. What problem does LVM solve compared with normal hard-drive partitions?
2. Recite the three-layer stack: PV, VG, LV. What does each layer mean?
3. List at least five LVM advantages from the notes.
4. Can you resize an LV only if free space sits next to it on disk? Explain.
5. Can you create/delete/resize PVs and LVs while the system is running? What still needs a separate resize?
6. What are LVM snapshots for?
7. Name three disadvantages / caveats of LVM.
8. Why might you skip LVM if the disk will be Btrfs?
9. What are the three steps to create an LVM logical volume, before `mkfs`?
10. Which three utilities initialize and display physical volumes?
11. Write the command to turn `/dev/sdb1` into a PV.
12. What does `pvscan` tell you that `pvcreate` does not?
13. Write a `vgcreate` that pools `/dev/sdb1`, `/dev/sdc1`, and `/dev/sdc2` into `vg_newlvm`.
14. Write an `lvcreate` that names the LV `centos7_newvol` and uses **all free space** in `vg_newlvm`.
15. What is the difference between `-L` and `-l` on `lvcreate`?
16. After creating that LV, what path do you pass to `mkfs`?
17. Commands to format that LV as ext4, btrfs, and ntfs.
18. Does `mkfs` create the LV, or only the file system on top of it?
19. `lvdisplay` shows `LV Status available`. What object are you looking at, and which VG does the example in the notes belong to?
20. A service is using an LV and you need to move its data to a new disk without restarting the service. Which LVM capability is that?

---

## Answers

1. Flexibility: pool disks, grow/shrink volumes, move data, snapshot — without being stuck with fixed partition layout.
2. PV = labeled physical disk/partition. VG = pool of one or more PVs. LV = virtual partition carved from the VG, where you put a file system.
3. Many disks as one; LVs across disks; dynamic resize; resize regardless of order on disk; online PV/LV changes; live migration; snapshots for backup with little downtime.
4. No. Resize does not depend on the LV’s position in the VG. You do not need adjacent free space on the physical disk.
5. Yes, online. The **file system** on the LV still must be resized; some FS support online resize.
6. Backup a frozen copy of the file system while keeping service downtime low.
7. Almost Linux-only; more complicated setup; extra abstraction that Btrfs subvolumes may already replace.
8. Btrfs subvolumes already give a flexible layout, so LVM may be unnecessary.
9. Initialize PVs (`pvcreate`) → create VG (`vgcreate`) → create LV (`lvcreate`).
10. `pvcreate`, `pvdisplay`, `pvscan`.
11. `sudo pvcreate /dev/sdb1`
12. It lists existing PVs, their VG (or “in no VG”), sizes, and free space.
13. `sudo vgcreate vg_newlvm /dev/sdb1 /dev/sdc1 /dev/sdc2`
14. `sudo lvcreate --name centos7_newvol -l 100%FREE vg_newlvm`
15. `-L` is a human size (`2G`). `-l` is extents / a percentage (`100%FREE`).
16. `/dev/vg_newlvm/centos7_newvol`
17. `sudo mkfs.ext4 /dev/vg_newlvm/centos7_newvol` · `sudo mkfs.btrfs …` · `sudo mkfs.ntfs …`
18. Only the file system. The LV must already exist.
19. A logical volume. In the notes example, VG name is `vg_newlvm` (and `pvdisplay` also showed a PV in VG `centos`).
20. Online / live migration of an LV to different disks without restarting services.
