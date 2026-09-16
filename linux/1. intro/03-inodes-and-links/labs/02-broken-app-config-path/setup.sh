#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }
mkdir -p /opt/app
rm -f /opt/app/config
ln -sf /opt/app/does-not-exist.conf /opt/app/config
echo "Ready."
