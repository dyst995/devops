#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }
dnf install -y httpd >/dev/null 2>&1 || true
systemctl start httpd 2>/dev/null || true
if command -v firewall-cmd >/dev/null; then
  firewall-cmd --permanent --remove-service=http 2>/dev/null || true
  firewall-cmd --remove-service=http 2>/dev/null || true
  firewall-cmd --reload 2>/dev/null || true
fi
echo "Ready."
