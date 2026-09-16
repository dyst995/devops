#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }
id labdev &>/dev/null || useradd -m -s /bin/bash labdev
echo '* * * * * labtool >> /tmp/cron-ok 2>&1' | crontab -u labdev -
mkdir -p /opt/labbin
printf '%s\n' '#!/bin/bash' 'date >> /tmp/cron-ok' > /opt/labbin/labtool
chmod 755 /opt/labbin/labtool
echo "Ready."
