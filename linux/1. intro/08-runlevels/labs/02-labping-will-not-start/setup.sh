#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }
cat > /etc/systemd/system/labping.service <<'EOF'
[Unit]
Description=lab ping
[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/bin/true
[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl mask labping.service
echo "Ready."
