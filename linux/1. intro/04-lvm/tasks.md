# Tasks — Logical Volume Manager (LVM)

Close `theory.md`. Prefer **predict / write the commands you would run** for create/format steps. Run only non-destructive display/list commands (`*display`, `*scan`, `lsblk`, `df`, `findmnt`) on this machine unless you have a throwaway lab disk. Do not initialize the OS disk. Work answers under `/tmp/lvm-tasks` if you keep notes.

## Warm-up — layers

1. Draw from memory: physical disks/partitions → ? → volume group → ? → mkfs + mount. Label the three create actions (`pvcreate`, `vgcreate`, `lvcreate`).
2. On the machine, run the safe scanners/displays: `pvscan`, `pvdisplay`, `vgscan`, `vgdisplay`, `lvscan`, `lvdisplay` (skip or note “not installed” if LVM tools are missing). Identify which PVs/VGs/LVs already belong to the OS — do not touch them.

## Advantages and disadvantages

3. List at least five LVM **advantages** from the notes without looking (pool disks, stretch across disks, resize dynamically, resize regardless of order, online create/resize/delete, live migration, snapshots — pick five+).
4. List the **disadvantages** from the notes (other OS support, complexity, Btrfs subvolumes overlap).
5. In one sentence each: what is a **snapshot** for? What does **live migration** of an LV mean for running services?

## Physical volumes

6. Write the command that labels `/dev/sdb1` as a physical volume. Do **not** run it on a real OS disk.
7. What does `pvscan` answer quickly (PVs, VG membership, free space)? What extra detail does `pvdisplay` give?
8. Predict: after `pvcreate` only, is the new PV in a volume group yet? How would `pvscan` show “in no VG”?

## Volume groups

9. Write the command that pools **one** PV `/dev/sdb1` into a VG named `vg_newlvm`.
10. Write the command that pools **several** PVs (`/dev/sdb1 /dev/sdc1 /dev/sdc2`) into the same VG name.
11. What do `vgdisplay` and `vgscan` each do? When would you use scan vs display?

## Logical volumes

12. Write an `lvcreate` that names the LV `centos7_newvol`, uses **all remaining** space (`-l 100%FREE`), inside `vg_newlvm`.
13. Write an `lvcreate` that creates a **fixed-size** 2G LV named `LogVol02` inside `VolGroup00` (use `-n` / `-L` as in the notes).
14. Distinguish `-L 2G` vs `-l 100%FREE`: size in bytes vs size in logical extents / “all free.”
15. After create, what two device paths do the notes give for an LV (`/dev/<vg>/<lv>` and mapper form)? Write both for `vg_newlvm` / `centos7_newvol`.
16. What fields does `lvdisplay` typically show (path, name, VG, status, size)? What is `lvscan` for?

## Filesystem is not LVM

17. Predict: after `lvcreate` but before `mkfs`, do you have a filesystem or only a block device?
18. Write three format commands from the notes for the same LV path: `mkfs.ext4`, `mkfs.btrfs`, `mkfs.ntfs`.
19. Write the `mount` command that attaches that LV to `/mnt`. Then name the three inspection commands from the notes that prove it: space listing, block-device tree, mount table (`df -h`, `lsblk`, `findmnt`).
20. On this machine, run only the safe trio: `df -h`, `lsblk`, `findmnt`. Identify `/` and any LVM devices if present. Do not remount or format.

## Create vs show/scan table

21. From memory, fill the family table: create vs show/scan for PV, VG, LV, and filesystem (`mkfs` / `df` / `lsblk` / `findmnt`). Check theory after.

## Scenario

22. Ticket: “App needs a new 2G volume, formatted ext4, mounted on `/mnt/appdata`, visible after reboot.” Write the full ordered command list you would run (three LVM steps + `mkfs` + `mount` + the `fstab` idea). Do **not** apply it on the OS disk. Under `/tmp/lvm-tasks`, write the list as a short checklist and mark which steps are unsafe to run without a throwaway disk.
