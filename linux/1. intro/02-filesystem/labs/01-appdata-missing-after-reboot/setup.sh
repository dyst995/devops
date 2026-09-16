#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }

LAB=/var/lib/linux-labs
mkdir -p "$LAB"
loop_fs() {
  local img=$1 size=$2 mnt=$3 opts=${4:-defaults}
  mkdir -p "$mnt"
  umount "$mnt" 2>/dev/null || true
  truncate -s "$size" "$img"
  mkfs.ext4 -F -q "$img"
  local loop
  loop=$(losetup -f --show "$img")
  mount -o "$opts" "$loop" "$mnt"
}

mkdir -p /mnt/appdata
umount /mnt/appdata 2>/dev/null || true
loop_fs "$LAB/appdata.img" 256M /mnt/appdata defaults
echo payload > /mnt/appdata/keep-me
echo "Ready."
