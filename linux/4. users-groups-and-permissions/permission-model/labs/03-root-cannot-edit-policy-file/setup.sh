#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }
echo 'policy=old' > /etc/lab-immutable.conf
chattr +i /etc/lab-immutable.conf
echo "Ready."
