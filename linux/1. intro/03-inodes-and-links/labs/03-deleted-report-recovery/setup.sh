#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }
mkdir -p /opt/app/docs
echo 'QUARTERLY-OK' > /opt/app/docs/report.txt
ln /opt/app/docs/report.txt /opt/app/docs/report-archive.txt
rm /opt/app/docs/report.txt
echo "Ready."
