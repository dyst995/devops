#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }
LAB=/var/lib/linux-labs
mkdir -p "$LAB" /mnt/fullish
umount /mnt/fullish 2>/dev/null || true
truncate -s 64M "$LAB/fullish.img"
mkfs.ext4 -F -q "$LAB/fullish.img"
loop=$(losetup -f --show "$LAB/fullish.img")
mount "$loop" /mnt/fullish
python3 - <<'PY' &
import os, time
p = "/mnt/fullish/held"
open(p, "wb").write(b"x" * (40 * 1024 * 1024))
f = open(p, "rb")
os.unlink(p)
time.sleep(3600)
PY
sleep 1
echo "Ready."
