# Assignments — LVM

Close `commands.md`. Recite, then type. Throwaway directory. Do not destroy real data.

Use throwaway disks/partitions only. **`mkfs` destroys existing data on the target.** Never format, pvcreate, or vgcreate on a disk that holds real data. Identify devices with `lsblk` first.

## `pvcreate`

1. [ ] Recite the LVM stack order: physical volume → volume group → logical volume → filesystem.
2. [ ] Goal: label a throwaway disk/partition as an LVM physical volume (the sheet’s first step).
3. [ ] Privilege: predict this needs root. Do not run it without a disposable device.
4. [ ] What if the operand is missing: no device. Predict usage error.
5. [ ] Wrong usage: a path that is not a block device (a throwaway text file). Predict failure.
6. [ ] Recite: this only *labels* the partition as a PV — it is not `mkfs` and not a mount.
7. [ ] Combine: run `lsblk` first and write down the throwaway name so you cannot hit `/` or `sda` by habit.
8. [ ] Predict success message mentions the device path you passed.
9. [ ] Human vs default: you pass the raw device node (`/dev/sdb1` in the sheet), not a mount point.
10. [ ] Wrong usage: initializing a disk that is already mounted with real data. State why that is forbidden; do not do it.
11. [ ] Combine: after a successful lab label, `pvscan` should show the new PV.
12. [ ] Predict: if the device already has a filesystem you care about, this can make that data unusable. Throwaway only.
13. [ ] Recite from memory: “label a disk/partition as an LVM physical volume”.
14. [ ] Privilege: without sudo, predict permission denied on `/dev/sdb1`.
15. [ ] What if the device does not exist on this machine — safe to try; predict “not found” / not a block device.
16. [ ] Combine: one PV can later join a VG alone or with others — this command does not create the VG yet.
17. [ ] Predict: repeating on an already-PV device may warn or refuse; note what a lab box does (still throwaway).
18. [ ] Wrong usage: passing a directory like `/mnt`. Predict it is the wrong kind of operand.
19. [ ] Recite the cheat-sheet device example (`sdb1`) and why you must substitute *your* lab disk.
20. [ ] Prove you did not format: `pvcreate` ≠ `mkfs`. Say which layer each belongs to.

## `pvscan`

1. [ ] List PVs, which VG they are in, and free space.
2. [ ] Recite: this is the quick PV overview, not the long `pvdisplay` dump.
3. [ ] Privilege: predict whether you need root to see PVs (often yes / more complete as root). Note what you get unprivileged.
4. [ ] What if the operand is missing: no args is the sheet form. Predict a PV list, not an error.
5. [ ] Wrong usage: passing a filename in a throwaway dir. Predict it is ignored or errors — not a file cat.
6. [ ] Combine: after `pvcreate` on a lab disk, prove the new PV appears, possibly “in no VG”.
7. [ ] Predict a line that looks like: device, maybe VG name, size, free.
8. [ ] Human vs default: sizes in the scan are already meant to be readable; note the units you see.
9. [ ] Combine: identify which PVs still have free space before you `lvcreate`.
10. [ ] Recite: “list PVs, which VG they are in, free space”.
11. [ ] Predict: a PV in no VG is available to `vgcreate` / extend; one with 0 free cannot give more extents.
12. [ ] Wrong usage: expecting mount points here. Prove this is LVM layer, not `findmnt`.
13. [ ] Privilege: scanning is read-only. It should not relabel disks.
14. [ ] Combine with `lsblk`: same throwaway disk should show as LVM type after you built the stack.
15. [ ] What if no LVM exists on the box: predict empty/minimal output, not a crash.
16. [ ] Recite where this sits in the memory table: PV row, “show / scan” column.
17. [ ] Combine: `pvscan` vs `pvdisplay` — one is the scan/summary, one is detailed. Run the scan first.
18. [ ] Predict “in use” vs “no VG” wording if your lab matches the theory sample.
19. [ ] Wrong usage: using this to *create* a PV. Creation is `pvcreate`. This only lists.
20. [ ] Prove a total line (if present) matches the PVs you counted.

## `pvdisplay`

1. [ ] Show detailed PV info (name, VG name, size, …).
2. [ ] Recite: detailed PV info — not the short scan.
3. [ ] Privilege: predict root for full detail; note any “filtered” view as a user.
4. [ ] What if the operand is missing: no device lists all PVs. Predict a multi-block report.
5. [ ] Wrong usage: a non-PV throwaway file. Predict it is not a physical volume.
6. [ ] Combine: pick one lab PV and display only that device; prove the header “Physical volume”.
7. [ ] Predict fields: PV Name, VG Name (or none), size.
8. [ ] Human vs default: sizes often in GiB already; you are not adding `-h` on this cheat sheet.
9. [ ] Combine with `pvscan`: same VG name should appear in both views for that PV.
10. [ ] Recite from memory: “detailed PV info”.
11. [ ] Predict: a PV not in a VG still displays, with no VG Name (or similar).
12. [ ] Wrong usage: confusing PV Name (`/dev/sda2`) with LV path (`/dev/vg/...`).
13. [ ] Privilege: display does not allocate space. Safe on production *read*; still do not pass the wrong disk to create commands later.
14. [ ] Combine: after `vgcreate`, re-display and prove VG Name filled in.
15. [ ] What if you pass an LV path by mistake — predict “not a PV”.
16. [ ] Recite the family: `pvcreate` / `pvdisplay` / `pvscan`.
17. [ ] Predict output is several lines per PV, not one tree like `lsblk`.
18. [ ] Combine with `vgdisplay`: VG name in the PV report should match.
19. [ ] Wrong usage: expecting filesystem type (ext4) here — that is after `mkfs`, not PV metadata.
20. [ ] Prove you can name the throwaway PV’s VG from this output alone.

## `vgcreate`

1. [ ] Pool one throwaway PV into a new volume group (sheet: one-disk VG).
2. [ ] Pool several throwaway PVs into one VG (sheet: three devices). Only if you have spare disks; otherwise recite the multi-PV form without running it on real data.
3. [ ] Recite: VG = one pool of space from one or more PVs.
4. [ ] Privilege: predict root is required.
5. [ ] What if the operand is missing: VG name but no PV, or nothing. Predict usage error.
6. [ ] Wrong usage: VG name that already exists. Predict failure; do not collide with the system VG (`centos`, `VolGroup00`, …).
7. [ ] Wrong usage: a PV that is not labeled yet. Predict you needed `pvcreate` first.
8. [ ] Combine: `pvcreate` then this command, then `vgdisplay` to prove the pool exists.
9. [ ] Human vs default: name is yours (`vg_newlvm` in the sheet); devices are positional after the name.
10. [ ] Predict: after a one-PV VG, `pvscan` shows that PV *in* the new VG.
11. [ ] Recite both cheat-sheet shapes: one PV vs several PVs, same command.
12. [ ] Privilege / destructive: creating a VG on the wrong PV can steal a disk from production. Confirm `lsblk` first.
13. [ ] What if a listed PV is missing — predict the create fails; it should not half-build on a name you already used (note what you see on a lab).
14. [ ] Combine: you cannot `lvcreate` before this pool exists. State the order.
15. [ ] Predict success mentions the VG name.
16. [ ] Wrong usage: passing mount points instead of `/dev/...` nodes.
17. [ ] Recite: this does not create an LV and does not format.
18. [ ] Combine with `vgscan`: the new VG should be discoverable.
19. [ ] Predict: space in the VG starts as free until you `lvcreate`.
20. [ ] Human vs default: VG name first, then PV list — swapping them should fail. Predict that.

## `vgdisplay`

1. [ ] Show detailed VG info.
2. [ ] Recite: detailed VG info (size, free, LV count, PV count).
3. [ ] Privilege: predict root for a full report.
4. [ ] What if the operand is missing: lists all VGs. Predict that.
5. [ ] Wrong usage: a VG name that does not exist. Predict an error.
6. [ ] Combine: after `vgcreate vg_newlvm ...`, display that VG and prove the name.
7. [ ] Predict: Free PE / Size shrinks after you carve an LV.
8. [ ] Human vs default: detailed text vs `vgscan`’s shorter discovery view.
9. [ ] Combine with `pvdisplay`: VG Name on the PV should match this VG.
10. [ ] Recite from memory: “detailed VG info”.
11. [ ] Predict VG Size vs Free — for a new VG with no LVs, free ≈ size (minus tiny metadata).
12. [ ] Wrong usage: passing a PV path here. Predict it is the wrong object.
13. [ ] Privilege: read-only. Safe to run; still do not `vgcreate`/`vgremove` on real groups.
14. [ ] Combine: before `lvcreate -l 100%FREE`, check free space here so you know what “all remaining” means.
15. [ ] What if the machine has only the OS VG: predict you still see that one; do not delete it.
16. [ ] Recite the family: `vgcreate` / `vgdisplay` / `vgscan`.
17. [ ] Predict a “VG Name” line you can copy into `lvcreate`.
18. [ ] Combine with `lvdisplay`: LV’s VG Name field matches.
19. [ ] Wrong usage: expecting mount paths. VG is not mounted; LVs are formatted and mounted later.
20. [ ] Prove you can answer “how much free in this pool?” from this output.

## `vgscan`

1. [ ] Discover volume groups (scan).
2. [ ] Recite: discover VGs — shorter than `vgdisplay`.
3. [ ] Privilege: predict root may be needed for a complete scan.
4. [ ] What if the operand is missing: no args as in the sheet. Predict a list of VGs found.
5. [ ] Wrong usage: a throwaway filename argument. Predict it does not “scan that file”.
6. [ ] Combine: after `vgcreate`, this scan should mention the new VG.
7. [ ] Human vs default: this is the discovery view; `vgdisplay` is the verbose view.
8. [ ] Predict: “Found volume group …” style lines (wording varies). Note what *your* box prints.
9. [ ] Combine with `pvscan`: every VG named here should own at least one PV (unless a broken lab).
10. [ ] Recite from memory: “discover volume groups”.
11. [ ] Privilege: scan is not create. Running it should not add disks.
12. [ ] Wrong usage: using scan instead of `vgcreate` and expecting a new pool.
13. [ ] What if LVM is unused: predict no user VGs (maybe none at all).
14. [ ] Combine: use this when you are not sure a VG exists before `lvcreate`.
15. [ ] Predict: it will see the OS VG if the system itself is on LVM — do not treat that as `vg_newlvm`.
16. [ ] Recite where it sits: VG row, show/scan column.
17. [ ] Combine: `vgscan` then `vgdisplay` on one name you saw.
18. [ ] Wrong usage: confusing with `lvscan` (volumes inside the pool vs the pool itself).
19. [ ] Human vs default: no extra flags on the sheet — type it bare.
20. [ ] Prove the VG you created (lab) appears here before you carve LVs.

## `lvcreate`

1. [ ] Recite both cheat-sheet forms: long `--name` plus `-l 100%FREE`, and short `-n` plus `-L 2G`.
2. [ ] Goal: carve an LV that uses **all remaining** VG space (`-l 100%FREE`) on a throwaway VG only.
3. [ ] Goal: carve an LV of a **fixed** size (`-L 2G`) on a throwaway VG that actually has ≥2G free.
4. [ ] Recite: `--name` and `-n` are the same idea (LV name).
5. [ ] Recite: `-l` is extents (`100%FREE`); `-L` is a byte size (`2G`).
6. [ ] Privilege: predict root is required.
7. [ ] What if the operand is missing: no VG name. Predict usage error.
8. [ ] Wrong usage: `-L` larger than VG free. Predict failure; do not retry on the OS VG.
9. [ ] Wrong usage: VG name that does not exist. Predict failure.
10. [ ] Combine: `vgdisplay` free space, then `-l 100%FREE`, then `vgdisplay` again — free should collapse.
11. [ ] Predict the device path: `/dev/<vg_name>/<lv_name>` (sheet: `/dev/vg_newlvm/centos7_newvol`).
12. [ ] Also recite the mapper form: `/dev/mapper/<vg_name>-<lv_name>`.
13. [ ] Human vs default: `-L 2G` is human-sized; `-l` without `%FREE` would be a raw extent count — the sheet uses `100%FREE`.
14. [ ] Combine: after create, `lvdisplay` / `lvscan` must show the new LV.
15. [ ] Privilege / destructive: carving from the wrong VG can consume space the OS needs. Never use the production VG for practice.
16. [ ] Predict: this still has **no filesystem** until `mkfs`. You cannot usefully `mount` a raw unformatted LV.
17. [ ] Wrong usage: swapping `-n` value with VG name. Predict the command mis-parses; do not run a guessed line on real disks.
18. [ ] Recite the 2G example names from the sheet (`LogVol02` on `VolGroup00`) — only type them if that throwaway VG exists.
19. [ ] What if name already exists in that VG — predict refusal.
20. [ ] Combine: `pvcreate` → `vgcreate` → this command. Write that order from memory, then execute only on lab disks.

## `lvdisplay`

1. [ ] List logical volumes (path, size, VG).
2. [ ] Recite: detailed LV info — path, name, VG, status, size.
3. [ ] Privilege: predict root for full list.
4. [ ] What if the operand is missing: all LVs. Predict multiple “Logical volume” blocks if any exist.
5. [ ] Wrong usage: an LV name that does not exist. Predict error.
6. [ ] Combine: after `lvcreate`, prove **LV Path** is `/dev/vg_.../...`.
7. [ ] Predict **LV Status** is available when the LV is usable.
8. [ ] Human vs default: size in GiB in the report; you are not adding `df -h` here.
9. [ ] Combine with `lsblk`: the LV should show as a descendant of the disk(s) in the VG.
10. [ ] Recite from memory: “list logical volumes (path, size, VG)”.
11. [ ] Predict: **VG Name** matches the pool you passed to `lvcreate`.
12. [ ] Wrong usage: passing a PV path. Predict not an LV.
13. [ ] Combine: copy LV Path into the `mkfs` step (still throwaway; mkfs is destructive).
14. [ ] What if no LVs: predict empty-ish output, not a kernel panic.
15. [ ] Privilege: read-only. Do not `lvremove` the OS volumes if you see them.
16. [ ] Recite the family: `lvcreate` / `lvdisplay` / `lvscan`.
17. [ ] Combine with `df`: before mount/format, this LV will **not** appear as a filesystem row in `df`.
18. [ ] Predict **LV Size** equals `-L 2G` (approx) or “all leftover” for `100%FREE`.
19. [ ] Wrong usage: expecting this to mount the volume.
20. [ ] Prove you can write the LV Path from this output without guessing.

## `lvscan`

1. [ ] Run the short LV scan.
2. [ ] Recite: short LV scan vs `lvdisplay`’s long report.
3. [ ] Privilege: predict root may show more.
4. [ ] What if the operand is missing: bare scan as in the sheet. Predict ACTIVE lines (wording varies).
5. [ ] Wrong usage: a throwaway text file as an argument. Predict it is not an LV.
6. [ ] Combine: after `lvcreate`, the new LV must appear here.
7. [ ] Human vs default: one-line-per-LV style vs multi-line `lvdisplay`.
8. [ ] Predict: status ACTIVE and a `/dev/vg/lv` path if your lab LV is available.
9. [ ] Combine with `lvdisplay`: same path, two formats.
10. [ ] Recite from memory: “short LV scan”.
11. [ ] Privilege: scan does not resize or format.
12. [ ] Wrong usage: using scan to *create* (`lvcreate` is create).
13. [ ] What if the VG is missing: predict no LVs from that VG.
14. [ ] Combine: `lvscan` then pick a path for `mkfs` on throwaway only.
15. [ ] Predict: OS LVs (root, swap) may show — never format those.
16. [ ] Recite: LV row in the memory table, show/scan column.
17. [ ] Combine with `vgscan`: VG exists, then LVs inside it exist.
18. [ ] Wrong usage: confusing `lvscan` with `pvscan` (wrong layer).
19. [ ] Human vs default: no extra flags on the sheet — type it bare.
20. [ ] Prove the throwaway LV is listed **before** you format it.

## `mkfs`

**Destructive.** Formatting erases the filesystem on that LV. Throwaway LV only. Never format the disk or LV that holds the running OS.

1. [ ] Recite: format is **not** LVM. LVM gave you a block device; this creates a filesystem on it.
2. [ ] Goal: format a throwaway LV as **ext4**.
3. [ ] Recite the other two cheat-sheet types: **btrfs** and **ntfs** on the same kind of LV path.
4. [ ] Privilege: predict root is required.
5. [ ] What if the operand is missing: no device. Predict usage error. Do not let a tool pick a default disk.
6. [ ] Wrong usage: the OS root LV or `/dev/sda`. State you refuse; do not type it.
7. [ ] Wrong usage: `mkfs` on an LV you intend for **swap** (swap topic uses `mkswap`, not this). Recite that distinction.
8. [ ] Combine: `lvdisplay` path → format ext4 → `mount` on a throwaway directory.
9. [ ] Human vs default: `mkfs.ext4` vs `mkfs.btrfs` vs `mkfs.ntfs` are different filesystem types, same “make fs” idea.
10. [ ] Predict: success prints filesystem-creation noise; the LV Path is unchanged.
11. [ ] Recite the three cheat-sheet binaries by suffix: ext4, btrfs, ntfs.
12. [ ] Privilege / destructive: repeating format on a mounted LV should fail or be catastrophic — never experiment on real mounts.
13. [ ] What if the path is not a block device — predict error. Safe with a throwaway filename.
14. [ ] Combine: after ext4, `lsblk` / `findmnt` still need **mount** before the tree shows files.
15. [ ] Predict: you cannot have ext4 and btrfs on the same LV at once; a second `mkfs` wipes the first. Throwaway only if you demonstrate.
16. [ ] Wrong usage: formatting `/mnt` (a directory) instead of `/dev/vg_newlvm/centos7_newvol`.
17. [ ] Recite: typical path `/dev/<vg>/<lv>`.
18. [ ] Combine with `df`: **before** mount, `df -h` will not show the new fs; after mount, it will.
19. [ ] Predict: ntfs on Linux may need extra tools (`mkfs.ntfs` missing). If the binary is absent, record that — do not format something else “as a substitute”.
20. [ ] Write one sentence: `pvcreate` labels LVM; this command writes a filesystem. Then stop — do not run it on a disk with real data.

## `mount`

1. [ ] Attach the formatted throwaway LV onto a directory so you can use it (sheet: `/mnt`).
2. [ ] Recite: device is the LV path, then the directory in the single tree.
3. [ ] Privilege: predict root is required.
4. [ ] What if the operand is missing: no LV or no directory. Predict error. Do not guess a production mount.
5. [ ] Wrong usage: mount before `mkfs`. Predict failure (no valid filesystem).
6. [ ] Wrong usage: mount point does not exist. Predict you must `mkdir` first (throwaway `/mnt` lab dir).
7. [ ] Combine: format ext4, create mount dir, attach, then `ls` a test file you wrote there.
8. [ ] Human vs default: same attach idea as a raw partition; the device string is `/dev/vg/...` instead of `/dev/sdb1`.
9. [ ] Predict success is often silent.
10. [ ] Combine with `df -h`: a new row for `/mnt` (or your dir) after attach.
11. [ ] Combine with `lsblk`: the LV line’s mount point fills in.
12. [ ] Combine with `findmnt`: TARGET is your directory, SOURCE is the LV.
13. [ ] Recite: this does not survive reboot unless you also add fstab (know that; do not edit fstab on a real server as practice unless it is a lab VM).
14. [ ] Privilege / destructive: attaching over a directory with files hides them. Use an empty throwaway mount point.
15. [ ] What if the LV is already mounted — predict error or bind-like behavior; do not stack on `/`.
16. [ ] Wrong usage: swapping LV path and directory.
17. [ ] Predict: you use files under `/mnt`, not a new drive letter.
18. [ ] Recite the sheet example: LV `centos7_newvol` on `/mnt`.
19. [ ] Combine: prove a file written on `/mnt` uses space on the LV (`df`), not on `/` (unless they are the same — they must not be in this lab).
20. [ ] Unmount is not on the sheet — do not invent a destructive cleanup on the wrong mount. If you unmount, only your throwaway mount point.

## `df`

1. [ ] Show space on **mounted** filesystems, human-readable (sheet flag).
2. [ ] Recite: after LVM mount, this is how you see the LV’s capacity as a filesystem.
3. [ ] Human vs default: with `-h` vs bare — prove units change (`G` vs 1K-blocks).
4. [ ] Privilege: normal user can usually read this.
5. [ ] What if the operand is missing: all mounts. Predict `/mnt` appears only if you mounted the LV.
6. [ ] Wrong usage: expecting an unformatted, unmounted LV to show. Predict it will not.
7. [ ] Combine: mount the throwaway LV, then prove a row for that mount point.
8. [ ] Combine with `lvdisplay`: filesystem size should be in the same ballpark as LV Size.
9. [ ] Predict: `Use%` on a fresh fs is small (reserved blocks exist on ext4).
10. [ ] Recite from memory: “space on mounted filesystems”.
11. [ ] Privilege: filling the LV in `/mnt` is OK only if that mount is throwaway. Never fill `/`.
12. [ ] Wrong usage: this is not `lvdisplay` — it will not list VGs.
13. [ ] Combine with `lsblk`: mount point strings should match.
14. [ ] What if you pass `/mnt` as an operand — predict it reports that filesystem only.
15. [ ] Human vs default: pick the human Size for the LV mount and write it down.
16. [ ] Predict tmpfs rows are not your new LV.
17. [ ] Combine: write a large throwaway file on the LV mount and prove `Used` increased (do not fill the disk).
18. [ ] Recite the flag from the sheet (human-readable).
19. [ ] Wrong usage: using `df` to format or grow LVM. It only reports.
20. [ ] Prove `/` and the LV mount are different rows after a correct lab mount.

## `lsblk`

1. [ ] Show which LV sits on which disk (sheet purpose in the LVM chapter).
2. [ ] Recite: block devices **and** how LVs nest under PVs.
3. [ ] Privilege: usually OK as a normal user.
4. [ ] What if the operand is missing: full tree. Predict disks, partitions, and `lvm` type children if LVM exists.
5. [ ] Wrong usage: a regular file. Predict not a block device.
6. [ ] Combine: after `lvcreate`+`mkfs`+`mount`, prove the LV line has a MOUNTPOINT.
7. [ ] Predict: TYPE may show `lvm` for the logical volume.
8. [ ] Human vs default: SIZE column — note units.
9. [ ] Combine with `pvscan`: the parent disk of the LV should be a PV in that VG.
10. [ ] Recite from memory: “which LV sits on which disk”.
11. [ ] Privilege: viewing is safe; copying the wrong NAME into `mkfs` is not.
12. [ ] Wrong usage: treating the parent `sdb` as the thing to mount after you created an LV on `sdb1` — you mount the **LV**, not necessarily the raw disk.
13. [ ] What if LVM is unused: predict a flat disk/partition tree, no `lvm` children.
14. [ ] Combine with `findmnt`: same mount point string.
15. [ ] Predict: multiple PVs in one VG may still show the LV under one topology view — describe what *your* tree shows.
16. [ ] Recite: identify throwaway vs OS disk **before** any create/format.
17. [ ] Combine: NAME of the LV vs `lvdisplay` LV Path (names should correspond).
18. [ ] Wrong usage: expecting `df`-style Use%. This is devices, not capacity percent.
19. [ ] Human vs default: tree layout is the default point of this command on the sheet (no extra flags).
20. [ ] Prove you can point to “this disk backs this LV” in one sentence from the output.

## `findmnt`

1. [ ] Show the mount table (what is mounted where), including your LV if attached.
2. [ ] Recite: mount table — not LVM metadata (`lvdisplay` is LVM; this is the VFS mounts).
3. [ ] Privilege: usually OK as a user.
4. [ ] What if the operand is missing: full tree from `/`. Predict that.
5. [ ] Wrong usage: expecting VG names. Predict you see SOURCE like `/dev/mapper/...` or `/dev/vg/lv`.
6. [ ] Combine: after mounting the throwaway LV on `/mnt`, prove TARGET `/mnt`.
7. [ ] Combine with `df -h`: both mention `/mnt` only when mounted.
8. [ ] Combine with `lsblk`: same mount point on the LV line.
9. [ ] Human vs default: tree is the default view on the sheet (no extra flags).
10. [ ] Recite from memory: “mount table”.
11. [ ] Predict SOURCE for the lab LV (mapper or `/dev/vg_newlvm/...`).
12. [ ] Privilege: read-only. Unmounting the wrong TARGET is the dangerous cousin — you are only listing.
13. [ ] Wrong usage: confusing with `find` (filename search).
14. [ ] What if you never mounted the LV: predict `/mnt` is absent as a mount TARGET (directory may still exist empty).
15. [ ] Combine: FSTYPE should match what you formatted (ext4 / btrfs / ntfs).
16. [ ] Recite the LVM finish line: `mkfs` → `mount` → prove with this, `df`, `lsblk`.
17. [ ] Predict `/` SOURCE is the OS LV or partition — never format that SOURCE.
18. [ ] Wrong usage: this does not `pvcreate` or grow the VG.
19. [ ] Human vs default: compare to raw `/proc/mounts` in your head — this is the readable table.
20. [ ] Prove you can answer “where is the new LV attached?” from this output alone.
