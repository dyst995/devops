#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }
if command -v nmcli >/dev/null; then
  CON=$(nmcli -t -f NAME,DEVICE c show --active | head -1 | cut -d: -f1)
  if [[ -n "$CON" ]]; then
    nmcli c modify "$CON" 802-3-ethernet.mac-address '00:00:00:00:00:01' || true
    nmcli c down "$CON" || true
  fi
fi
echo "Ready."
