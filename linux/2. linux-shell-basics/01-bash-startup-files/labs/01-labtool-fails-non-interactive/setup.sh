#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }
id labdev &>/dev/null || useradd -m -s /bin/bash labdev
echo labdev:labdev | chpasswd
mkdir -p /opt/labbin
printf '%s\n' '#!/bin/bash' 'echo labtool-ok' > /opt/labbin/labtool
chmod 755 /opt/labbin/labtool
if ! grep -q labbin /home/labdev/.bashrc 2>/dev/null; then
  echo 'export PATH=/opt/labbin:$PATH' >> /home/labdev/.bashrc
fi
chown labdev:labdev /home/labdev/.bashrc
echo "Ready."
