#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }
LAB=/var/lib/linux-labs
mkdir -p "$LAB" /mnt/data
umount /mnt/data 2>/dev/null || true
vgremove -y vg_scen 2>/dev/null || true
truncate -s 768M "$LAB/lvm.img"
loop=$(losetup -f --show "$LAB/lvm.img")
pvcreate -ff -y "$loop" >/dev/null
vgcreate vg_scen "$loop" >/dev/null
lvcreate -y -L 200M -n data vg_scen >/dev/null
mkfs.ext4 -F -q /dev/vg_scen/data
mount /dev/vg_scen/data /mnt/data
dd if=/dev/zero of=/mnt/data/fill bs=1M count=180 status=none || true
echo "Ready."
