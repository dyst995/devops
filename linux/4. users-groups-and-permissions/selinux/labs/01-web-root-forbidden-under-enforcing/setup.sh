#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }
dnf install -y httpd >/dev/null 2>&1 || true
mkdir -p /srv/www/lab
echo 'lab-page' > /srv/www/lab/index.html
chcon -t default_t /srv/www/lab /srv/www/lab/index.html 2>/dev/null || true
if [[ -f /etc/httpd/conf/httpd.conf ]]; then
  sed -i.bak-selinux 's#^DocumentRoot .*#DocumentRoot "/srv/www/lab"#' /etc/httpd/conf/httpd.conf
  if grep -q 'Directory "/var/www/html"' /etc/httpd/conf/httpd.conf; then
    sed -i 's#Directory "/var/www/html"#Directory "/srv/www/lab"#' /etc/httpd/conf/httpd.conf
  fi
fi
systemctl enable --now httpd 2>/dev/null || systemctl start httpd || true
echo "Ready."
