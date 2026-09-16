# Commands to memorize

```bash
pvcreate /dev/sdb1           # label a disk/partition as an LVM physical volume
pvscan                       # list PVs, which VG they are in, free space
pvdisplay                    # detailed PV info

vgcreate vg_newlvm /dev/sdb1                              # pool one PV into a volume group
vgcreate vg_newlvm /dev/sdb1 /dev/sdc1 /dev/sdc2          # pool several PVs into one VG
vgdisplay                    # detailed VG info
vgscan                       # discover volume groups

lvcreate --name centos7_newvol -l 100%FREE vg_newlvm      # LV using all remaining VG space
lvcreate -n LogVol02 -L 2G VolGroup00                     # LV of a fixed size (2G)
lvdisplay                    # list logical volumes (path, size, VG)
lvscan                       # short LV scan

mkfs.ext4  /dev/vg_newlvm/centos7_newvol     # format the LV as ext4 (not part of LVM itself)
mkfs.btrfs /dev/vg_newlvm/centos7_newvol
mkfs.ntfs  /dev/vg_newlvm/centos7_newvol

mount /dev/vg_newlvm/centos7_newvol /mnt     # mount the filesystem so you can use it
df -h                        # space on mounted filesystems
lsblk                        # which LV sits on which disk
findmnt                      # mount table
```
