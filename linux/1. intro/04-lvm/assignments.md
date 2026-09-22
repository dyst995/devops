# Assignments — LVM

Close `commands.md`. Type and run. **Lab VM only** for any create/format/mount. Never `pvcreate`, `vgcreate`, `lvcreate`, or `mkfs` on a disk that already holds data you care about. Inspect first with `lsblk`.

## Physical volumes (`pvcreate`, `pvscan`, `pvdisplay`)

### Easy

1. [ ] On the lab VM, run `pvscan`. Read which disks are already PVs (if any) and how much free space they show.
2. [ ] Run `pvdisplay`. Pick one PV (or note that there are none) and write down the VG name and size fields you see.

### Medium

3. [ ] Use `lsblk` first. Identify a **spare** partition that is not `/` and not already a PV. Only if the lab says it is unused: run `pvcreate` on **that** device only.
4. [ ] Someone is about to run `pvcreate /dev/sda` on a machine where `lsblk` shows `/` on `sda`. Do **not** run it. What would go wrong? How do `pvscan` and `lsblk` together keep you from picking the wrong disk?

### Hard

5. [ ] After a PV exists, prove it three ways: `pvscan`, `pvdisplay`, and `lsblk`. The same device must appear in all three stories.
6. [ ] `pvcreate` failed or you have no spare disk. Use `lsblk` + `pvscan` to write one sentence: “I cannot create a PV because …” (disk in use, no extra partition, already a PV, etc.).

## Volume groups (`vgcreate`, `vgscan`, `vgdisplay`)

### Easy

1. [ ] Run `vgscan`. List any volume groups the machine already has.
2. [ ] Run `vgdisplay`. Note VG size and free space.

### Medium

3. [ ] Lab only, unused PV from the previous set: create a VG with a **practice name** (not the name of the live root VG). Use one PV first.
4. [ ] Someone ran `vgcreate vg_newlvm` with **no** PV argument. Predict the failure. Add the PV argument and create it only on the lab spare.

### Hard

5. [ ] If the lab has more than one unused PV, create a VG from **several** PVs (course: one `vgcreate` with multiple devices). Prove with `vgdisplay` and `pvscan` which PVs are in that VG.
6. [ ] Compare `vgdisplay` free space to `pvdisplay` free space. If you later create an LV that uses `100%FREE`, how much space would that consume right now?

## Logical volumes (`lvcreate`, `lvscan`, `lvdisplay`)

### Easy

1. [ ] Run `lvscan` and `lvdisplay`. Write the LV path (the `/dev/VG/LV` name) and size of one existing LV — do **not** create yet if you only wanted to look.
2. [ ] On a practice VG with free space: create a small LV with a **fixed size** (course `-L` form). Use a throwaway LV name.

### Medium

3. [ ] Create a second practice LV that uses **all remaining** VG space (course `-l 100%FREE` form). Confirm with `lvdisplay`.
4. [ ] Someone swapped flags: `-L 100%FREE` or `-l 2G`. Run only the **correct** form for a 2G LV. What is `-L` vs `-l` for?

### Hard

5. [ ] After creating an LV, show it in `lvdisplay`, `lsblk`, and `vgdisplay` (free space should have dropped).
6. [ ] You need a 2G LV named like the course swap example (`-n` and `-L`) on a **practice** VG. Create it only if free space allows; otherwise stop and say why from `vgdisplay`.

## Format and mount an LV (`mkfs`, `mount`, `df`, `lsblk`, `findmnt`)

### Easy

1. [ ] Lab practice LV **with no filesystem you care about**: format it as **ext4** (`mkfs.ext4`). Not `mkfs` on `/` or the root LV.
2. [ ] Mount that LV on an empty directory (`/mnt` or a dir you created). Confirm with `df -h`.

### Medium

3. [ ] Prove the mount with `lsblk` and `findmnt` as well as `df -h`. Same LV path in all three.
4. [ ] Someone ran `mkfs.ext4` on the **VG** path instead of the **LV** path. Do **not** try it. How do you tell LV path from PV/VG using `lvdisplay` / `lsblk`?

### Hard

5. [ ] Full practice chain on the lab spare only: PV → VG → LV → `mkfs.ext4` → `mount` → `df -h`. Tick only if you inspected with `lsblk` before every destructive step.
6. [ ] The mount succeeded but `df -h` does not show the space you expected. Use `lvdisplay` and `findmnt` to check you formatted **and** mounted the LV you think you did (wrong LV vs wrong mount point).
