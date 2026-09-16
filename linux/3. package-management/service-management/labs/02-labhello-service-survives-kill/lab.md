# labhello must survive kill and boot

Do not disable sshd if that is your only login.

Ship `labhello.service`: on a timer or continuously, it appends a line to `/var/log/labhello.log` (or `/tmp/labhello.log`). It must start at boot. If someone kills the process, it should come back.

**Goal:** Start now, survive kill, survive reboot if you can reboot.
