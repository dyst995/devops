# Labs — Swap

**Where:** Rocky VM. Checkpoint first. Do not `swapoff` the only system swap if the VM is already tight on RAM.

Read [theory](../theory.md), then do these. Use [commands.md](../commands.md) only if you are stuck.

## Lab 1

Show active swap and RAM/swap usage (`/proc/swaps`, `free`, `swapon`).

## Lab 2

Create a 64 MB swap file at `/swapfile-lab` using the course `dd` size, format it as swap, set mode `0600`, and turn it on. Confirm it is active.

If you want it at boot, add the matching `fstab` line and reload systemd. You will remove it in Lab 4.

## Lab 3

If you still have free space in an LVM VG on the extra disk: create a 512M LV, format it as swap (not a filesystem), and turn it on. Confirm it is active.

## Lab 4

Turn off `/swapfile-lab` first, remove any fstab line for it, reload systemd, then delete the file. Confirm swap list.

If you created a swap LV: turn it off, then remove the LV.

## Job and cert labs

## Lab 5

Ticket: “add 1G of swap that survives reboot.” Do it as a file **or** an LV, `fstab` + `daemon-reload` + `swapon --show` after a reboot (or `swapoff`/`swapon -a`). Remove when done.

## Lab 6

Read `vm.swappiness` (`sysctl`). Do not change it permanently unless you know you will revert. Watch `free -h` while you run a memory hog in another terminal (`stress` if installed, or a small Python/C loop) and see whether swap used moves.

## Lab 7

`swapoff -a` then `swapon -a` on a quiet VM (console ready). Confirm `/proc/swaps` matches fstab.
