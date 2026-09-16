#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }
LAB=/var/lib/linux-labs
mkdir -p "$LAB"
dd if=/dev/zero of="$LAB/orphan.swap" bs=1M count=32 status=none
chmod 600 "$LAB/orphan.swap"
mkswap "$LAB/orphan.swap" >/dev/null
swapon "$LAB/orphan.swap"
echo "Ready."
