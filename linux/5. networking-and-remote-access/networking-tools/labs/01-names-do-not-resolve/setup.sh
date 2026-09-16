#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }
cp -a /etc/resolv.conf /etc/resolv.conf.bak-lab 2>/dev/null || true
echo 'nameserver 127.0.0.1' > /etc/resolv.conf
echo "Ready."
