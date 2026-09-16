# 05 — Swap and Swappiness — Questions

Cover the Answers section. Answer first, then check.

1. When does Linux use swap, and what gets moved there?
2. Why is swap not a substitute for more RAM?
3. Which file system does **not** support swap space?
4. Name the three ways you can provide swap.
5. Which form does Red Hat recommend, and why (especially on HDDs)?
6. When can a swap file be almost as fast as a swap partition? What does the kernel do to help?
7. Give one reason a swap file can be better operationally than a partition.
8. Two commands to check that swap is active.
9. What is swappiness? What is the valid range and the default?
10. Effect of a **low** swappiness? Of a **high** one?
11. Who might lower swappiness? Who might raise it?
12. Recite the RHEL recommended swap table for 1 GB, 4 GB, 16 GB, and 128 GB RAM (no hibernation).
13. How much swap for 4 GB RAM **with** hibernation? For 16 GB with hibernation? For 128 GB with hibernation?
14. Why does hibernation need more swap than “normal” swap?
15. Ordered steps to add a 2 GB swap **LV** on `VolGroup00` named `LogVol02`. Include commands.
16. Why `mkswap` and not `mkfs.ext4` on that LV?
17. Why `systemctl daemon-reload` after editing `/etc/fstab`?
18. For a 64 MB swap file, what is `count` if `bs=1024`? How did you get that number?
19. Why `chmod 0600 /swapfile`?
20. Ordered steps to **remove** a swap file. What happens if you `rm` it while it is still on?
21. Write the `/etc/fstab` line for `/swapfile` and for `/dev/VolGroup00/LogVol02`.
22. Command to activate a swap device immediately. Command to deactivate it.

---

## Answers

1. When RAM is full and more memory is needed. Inactive pages are moved to disk swap.
2. Swap lives on disk and is much slower than RAM. It is overflow, not equivalent memory.
3. Btrfs.
4. Dedicated swap partition (recommended), swap file, or a mix of both.
5. Swap partition. On rotational HDDs you can place it on a contiguous, fast area of the disk.
6. Kernel 2.6+ if the file is allocated contiguously. The kernel maps the file to device blocks and accesses them directly, skipping cache and FS overhead.
7. Any size, on any mounted FS, add/change without partitioning tools or extra downtime.
8. `cat /proc/swaps` and `free -h`.
9. Kernel weight between swapping app/runtime pages vs dropping page cache. 0–100, default 60.
10. Low: evict page cache first, keep processes in RAM, steadier latency. High: swap cold pages more eagerly, can raise throughput but cause latency spikes.
11. Lower: desktops / interactive systems with plenty of RAM. Higher: batch / less interactive systems.
12. 1 GB → 2 GB (2×). 4 GB → 4 GB (equal). 16 GB → at least 4 GB. 128 GB → at least 4 GB.
13. 4 GB RAM → 8 GB (2×). 16 GB → 24 GB (1.5×). 128 GB → hibernation not recommended.
14. Hibernation writes the contents of RAM to swap, so swap must hold (at least) the RAM image.
15. `lvcreate VolGroup00 -n LogVol02 -L 2G` → `mkswap /dev/VolGroup00/LogVol02` → fstab entry → `systemctl daemon-reload` → `swapon -v /dev/VolGroup00/LogVol02`.
16. Swap is not a POSIX file system. `mkswap` writes a swap signature; `mkfs` would make a normal FS you cannot `swapon`.
17. So systemd regenerates mount/swap units from the new fstab and registers the device.
18. `65536`. 64 MB × 1024 blocks of 1 KB.
19. Swap can contain memory pages (secrets, passwords). It must not be world-readable.
20. `swapoff -v /swapfile` → remove fstab line → `systemctl daemon-reload` → `rm /swapfile`. If you `rm` while active, the file is still held by the kernel until `swapoff`; you can confuse admin state and you must still `swapoff` / clean fstab.
21. `/swapfile swap swap defaults 0 0` and `/dev/VolGroup00/LogVol02 swap swap defaults 0 0`.
22. `swapon /path` (optional `-v`). `swapoff -v /path`.
