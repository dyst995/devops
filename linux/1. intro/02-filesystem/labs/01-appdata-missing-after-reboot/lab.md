# App data missing after reboot

Checkpoint the VM if you will reboot.

**Prepare:** from this folder run `sudo ./setup.sh` — do not read the script.

Application data lives at `/mnt/appdata`. After a reboot (or an unmount + remount-all), the directory is empty / the volume is missing. The business cannot lose that data across reboot.

**Goal:** A file you create at `/mnt/appdata/keep-me` is still there after reboot, or after unmounting everything and applying the system’s mount configuration again.
