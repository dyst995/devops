#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }
nohup python3 -c 'x="z"* (50*1024*1024); import time; time.sleep(3600)' >/dev/null 2>&1 &
echo "Ready."
