# Tasks — LVM

Close `theory.md`. Extra disk or a throwaway loop device only. Checkpoint first. Do not initialize the OS disk.

## Warm-up (layers)

1. Draw from memory: disks → ? → pool → ? → mkfs → mount. Label the three create actions.
2. On the machine, scan and display existing physical volumes, volume groups, and logical volumes. Identify which belong to the OS already.

## Construct the stack (same concepts, doing)

3. Initialize **only** the extra disk/partition as a physical volume. Display it. Scan again: is it in a group yet?
4. Create a volume group from that PV. Display the group. Repeat with the idea of pooling **several** PVs (second device if you have one, or explain the command shape from the notes).
5. Create a logical volume that uses **all remaining** space in the group. Display path, name, VG, status, size.
6. Create a **fixed-size** LV (example size from the notes: 2G) if you still have room, or write the flag that sets size in bytes vs extents.
7. Name both device paths the notes give for an LV (`/dev/…` and mapper).

## Filesystem is not LVM

8. Format the LV with at least one of the types in the notes (`ext4` / `btrfs` / `ntfs`). Mount it. Prove with space listing, block-device tree, and mount table.
9. Predict: if you skip format, what do you have — a filesystem or only a block device?

## Find / distinguish

10. From memory, fill: create vs show/scan for PV, VG, LV, and filesystem.
11. List five LVM **advantages** from the notes without looking. Then list the **disadvantages** (other OS, complexity, Btrfs overlap).
12. What is a snapshot for, in one sentence from the notes? Live migration of an LV — what happens to running services?

## Scenario

13. App needs a new 2G volume, formatted, mounted on a directory, visible after reboot. Implement from the three LVM steps plus format/mount/persist. Prove with a test file.
