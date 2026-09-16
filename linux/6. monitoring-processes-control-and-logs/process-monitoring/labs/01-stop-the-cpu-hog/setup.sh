#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }
nohup bash -c 'trap "" TERM; while true; do true; done' >/dev/null 2>&1 &
echo "Ready."
