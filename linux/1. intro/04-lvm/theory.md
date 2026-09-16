# 04 — Logical Volume Manager (LVM)

**LVM** sits between physical disks and the file systems you mount. Instead of carving a disk into fixed partitions that are painful to grow, you pool disks and slice out **logical volumes** that you can resize.

```
Physical disks / partitions
        ↓  pvcreate
Physical Volumes (PV)
        ↓  vgcreate
Volume Group (VG)     ← one big pool of space
        ↓  lvcreate
Logical Volumes (LV)
        ↓  mkfs + mount
File systems  (/home, /var, …)
```

**Memory hook:** **P**hysical → **V**olume group → **L**ogical. Initialize, pool, slice.

## Advantages

LVM is more flexible than raw partitions:

- Use any number of disks as **one big disk**.
- Stretch a logical volume **across several disks**.
- Create small LVs and **resize them dynamically** as they fill up.
- Resize LVs **regardless of their order on disk**. Position inside the VG does not matter; you do not need free space sitting next to the LV.
- **Resize / create / delete** logical and physical volumes **online**. The file system on the LV still needs to be resized; some file systems support online resize.
- **Live migration** of an LV that services are using to different disks, without restarting those services.
- **Snapshots** — freeze a copy of the file system for backup with little downtime.

## Disadvantages

- **Almost Linux-only.** No official support on most other OS (FreeBSD, Windows, …).
- Extra setup steps. More complicated than plain partitions.
- If you use **Btrfs**, its **subvolume** feature already gives a flexible layout. Adding LVM on top may be an unnecessary extra abstraction.

## Overview — create an LV in three steps

1. **Initialize** partitions as physical volumes (this labels them) — `pvcreate`
2. **Create a volume group** — `vgcreate`
3. **Create a logical volume** — `lvcreate`

After that: create a file system (`mkfs`) and mount it.

## Physical volumes

Utilities: **`pvcreate`**, **`pvdisplay`**, **`pvscan`** — initialize and display PVs.

```bash
sudo pvcreate /dev/sdb1
# Physical volume "/dev/sdb1" successfully created

sudo pvscan
# PV /dev/sda2 VG centos lvm2 [29.51 GiB / 0 free]
# PV /dev/sdb1        lvm2 [20.00 GiB]
# Total: 2 [49.51 GiB] / in use: 1 [29.51 GiB] / in no VG: 1 [20.00 GiB]

sudo pvdisplay
# --- Physical volume ---
# PV Name /dev/sda2
# VG Name centos
```

`pvscan` is the quick “what PVs exist, which VG are they in, how much is free?” view.

## Volume groups and logical volumes

**`vgcreate`** — create a volume group from one or more PVs.

```bash
sudo vgcreate vg_newlvm /dev/sdb1
# one PV

sudo vgcreate vg_newlvm /dev/sdb1 /dev/sdc1 /dev/sdc2
# pool several PVs into one VG
```

**`lvcreate`** — create a logical volume *inside* a volume group.

```bash
sudo lvcreate --name centos7_newvol -l 100%FREE vg_newlvm
# LV named centos7_newvol that uses all unallocated space in vg_newlvm
```

Useful flags to remember:

- `--name` / `-n` — LV name
- `-L 2G` — size in bytes (G, M, …)
- `-l 100%FREE` — size in logical extents; here “all remaining space”

**`lvdisplay`** — list logical volumes.

```bash
lvdisplay
# LV Path /dev/vg_newlvm/centos7_newvol
# LV Name centos7_newvol
# VG Name vg_newlvm
# LV Status available
# LV Size 20.00 GiB
```

After `lvcreate`, the device path is typically:

`/dev/<vg_name>/<lv_name>`  
also available as `/dev/mapper/<vg_name>-<lv_name>`

## Filesystem creation

**`mkfs`** — create (format) a file system on the LV. Formatting is separate from LVM. LVM only gives you a block device.

```bash
sudo mkfs.ext4  /dev/vg_newlvm/centos7_newvol
sudo mkfs.btrfs /dev/vg_newlvm/centos7_newvol
sudo mkfs.ntfs  /dev/vg_newlvm/centos7_newvol
```

Then mount it (and add `/etc/fstab` if it should survive reboot).

**Memory hook for the command family:**

| Layer | Create | Show / scan |
| --- | --- | --- |
| Physical volume | `pvcreate` | `pvdisplay`, `pvscan` |
| Volume group | `vgcreate` | `vgdisplay`, `vgscan` |
| Logical volume | `lvcreate` | `lvdisplay`, `lvscan` |
| File system | `mkfs.<type>` | `df`, `lsblk`, `findmnt` |
