#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }
dnf install -y httpd >/dev/null 2>&1 || true
echo 'Listen 80' > /etc/httpd/conf.d/zz-lab-bad.conf
echo 'Listen 80' >> /etc/httpd/conf.d/zz-lab-bad.conf
systemctl restart httpd 2>/dev/null || true
echo "Ready."
