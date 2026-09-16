#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }
id labfind &>/dev/null || useradd -m labfind
mkdir -p /var/tmp/labfind-data/sub
echo a > /var/tmp/labfind-data/one.txt
echo b > /var/tmp/labfind-data/sub/two.txt
chown -R labfind:labfind /var/tmp/labfind-data
echo "Ready."
