#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }
id stucklogin &>/dev/null || useradd -m -s /sbin/nologin stucklogin
echo 'stucklogin:LabPass1' | chpasswd
passwd -l stucklogin >/dev/null
echo "Ready."
