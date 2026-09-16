# Provision a persistent data volume

Extra disk or a loop-backed volume group is fine. Checkpoint first. Do not touch the OS disk.

The app team needs new storage: at least 512 MiB, mounted on `/mnt/data`, usable for ordinary files, still there after reboot.

**Goal:** Meet the spec. Prove with a test file and a remount or reboot.
