# 04 — LVM (study)

**LVM** sits between physical disks and the file systems you mount. Instead of fixed partitions that are painful to grow, you pool disks and slice **logical volumes** you can resize.

```
Physical disks / partitions
        ↓  pvcreate
Physical Volumes (PV)
        ↓  vgcreate
Volume Group (VG)     ← one pool of space
        ↓  lvcreate
Logical Volumes (LV)
        ↓  mkfs + mount
File systems  (/home, /var, …)
```

**P**hysical → **V**olume group → **L**ogical: initialize, pool, slice.

## Why use it (and when not to)

More flexible than raw partitions:

- Any number of disks as **one pool**
- An LV can **span** several disks
- Create small LVs and **resize them dynamically**
- Resize **regardless of order on disk** — you do not need free space sitting next to the LV
- **Resize / create / delete** PVs and LVs **online**. The filesystem on the LV still needs its own resize; some filesystems support that online
- **Live migrate** an LV to different disks without restarting the services using it
- **Snapshots** — freeze a copy for backup with little downtime

Costs:

- **Almost Linux-only** (no official support on most other OS)
- More setup than plain partitions
- **Btrfs subvolumes** already give a flexible layout; LVM on top of Btrfs may be extra abstraction you do not need

## Command family

| Layer | Create | Show / scan |
| --- | --- | --- |
| Physical volume | `pvcreate` | `pvdisplay`, `pvscan` |
| Volume group | `vgcreate` | `vgdisplay`, `vgscan` |
| Logical volume | `lvcreate` | `lvdisplay`, `lvscan` |
| File system | `mkfs.<type>` | `df`, `lsblk`, `findmnt` |

`pvscan` is the quick view: which PVs exist, which VG they are in, how much is free.

```bash
sudo pvcreate /dev/sdb1
sudo pvscan
sudo pvdisplay

sudo vgcreate vg_newlvm /dev/sdb1
sudo vgcreate vg_newlvm /dev/sdb1 /dev/sdc1 /dev/sdc2   # several PVs, one VG

sudo lvcreate --name centos7_newvol -l 100%FREE vg_newlvm
```

`lvcreate` flags:

- `--name` / `-n` — LV name
- `-L 2G` — size in bytes (G, M, …)
- `-l 100%FREE` — size in **logical extents**; here “all remaining VG space”

After `lvcreate`, the device is typically `/dev/<vg_name>/<lv_name>` and also `/dev/mapper/<vg_name>-<lv_name>`. `lvdisplay` shows path, name, VG, status, size.

## Filesystem is separate

LVM only gives you a **block device**. Format it with `mkfs`, then mount (and add `/etc/fstab` if it should survive reboot).

```bash
sudo mkfs.ext4  /dev/vg_newlvm/centos7_newvol
sudo mkfs.btrfs /dev/vg_newlvm/centos7_newvol
sudo mkfs.ntfs  /dev/vg_newlvm/centos7_newvol
```
