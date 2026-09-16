#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }
dnf install -y httpd >/dev/null 2>&1 || yum install -y httpd >/dev/null 2>&1 || true
if [[ ! -x /usr/sbin/httpd ]]; then
  echo "install httpd first"
  exit 1
fi
systemctl stop httpd 2>/dev/null || true
sed -i.bak-lab 's/^Listen /#Listen /' /etc/httpd/conf/httpd.conf 2>/dev/null || true
if ! grep -q '^#Listen' /etc/httpd/conf/httpd.conf 2>/dev/null; then
  echo 'IncludeOptional /etc/httpd/conf.d/zz-broken.conf' >> /etc/httpd/conf/httpd.conf
  echo 'Listen 99999' > /etc/httpd/conf.d/zz-broken.conf
fi
systemctl start httpd 2>/dev/null || true
echo "Ready."
