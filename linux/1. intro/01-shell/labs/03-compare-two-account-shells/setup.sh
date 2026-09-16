#!/bin/bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo "run as root"; exit 1; }
id shelllab_a &>/dev/null || useradd -m -s /bin/bash shelllab_a
id shelllab_b &>/dev/null || useradd -m -s /bin/sh shelllab_b
echo "Ready."
