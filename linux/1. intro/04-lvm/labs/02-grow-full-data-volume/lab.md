# Grow a full data volume

Checkpoint first. Do not touch the OS disk.

**Prepare:** from this folder run `sudo ./setup.sh` — do not read the script.

`/mnt/data` is full (or nearly full). There is unused capacity already attached to the volume group (or an unused disk the VG can absorb). The filesystem is mounted and must keep its data.

**Goal:** Users see more free space on `/mnt/data` without restoring from backup. Prefer growing live if the filesystem allows it.
