#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }
LAB=/var/lib/linux-labs
mkdir -p "$LAB" /mnt/scratch
umount /mnt/scratch 2>/dev/null || true
truncate -s 32M "$LAB/scratch.img"
mkfs.ext4 -F -q -N 64 "$LAB/scratch.img"
loop=$(losetup -f --show "$LAB/scratch.img")
mount "$loop" /mnt/scratch
i=0
while touch /mnt/scratch/f$i 2>/dev/null; do i=$((i + 1)); done
echo "Ready."
