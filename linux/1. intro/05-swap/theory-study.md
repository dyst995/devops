# 05 — Swap and swappiness (study)

**Swap** is disk used as overflow when RAM is full: **inactive pages** are moved to swap. It helps machines with little RAM. It is **not** a replacement for more RAM — disk (even SSD) is slower than memory.

**Btrfs does not support** swap space.

## Forms

From the OS’s point of view, swap can be a dedicated **partition** (recommended), a **file**, or a **combination**.

Red Hat recommends **partitions**. They can sit on a contiguous area of an HDD for better throughput / seek time.

**Files** are more flexible: any size, on any mounted filesystem, added or changed without repartitioning. From kernel 2.6 onward they are *virtually as fast* as partitions **if** allocated **contiguously**. The kernel maps the file’s blocks and accesses the device directly, bypassing cache and filesystem overhead.

```bash
cat /proc/swaps          # active swap devices/files
free -h                  # RAM and swap, human units
```

## Swappiness

Kernel parameter: relative weight of swapping out **cold anonymous pages** vs dropping **page cache**, when an allocation cannot be satisfied from free RAM.

| | |
| --- | --- |
| Range | **0–100** (inclusive) |
| Default | **60** (fine for most workloads) |
| Low (toward 0) | Prefer evicting **page cache**; keep apps in RAM → more consistent low latency (desktops, interactive boxes with plenty of RAM) |
| High (toward 100) | Prefer swapping **cold** app pages → can increase throughput (especially disk I/O) but risk latency spikes when those pages are needed again |

Batch / less interactive systems may want it **higher**; desktops may want it **lower**.

## Recommended size (RHEL 7)

[RHEL 7 Storage Administration Guide](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Storage_Administration_Guide/ch-swapspace.html):

| Amount of RAM | Recommended swap | Swap if you want hibernation |
| --- | --- | --- |
| ≤ 2 GB | 2 × RAM | 3 × RAM |
| > 2 GB – 8 GB | equal to RAM | 2 × RAM |
| > 8 GB – 64 GB | at least 4 GB | 1.5 × RAM |
| > 64 GB | at least 4 GB | hibernation not recommended |

Hibernation writes RAM out to swap, so swap must be at least as large as RAM (the table uses more than 1× as a safety margin).

On modern systems with huge RAM, Red Hat also talks about sizing by **workload**, not blindly matching RAM (for example ~20% of RAM as a later rule of thumb). Know the table for this course; know “workload matters” for interviews.

## Add swap as an LVM LV (2 GB example)

Assume `/dev/VolGroup00/LogVol02`. Never `mkfs.ext4` on a swap LV.

```bash
lvcreate VolGroup00 -n LogVol02 -L 2G
mkswap /dev/VolGroup00/LogVol02
# fstab: /dev/VolGroup00/LogVol02 swap swap defaults 0 0
systemctl daemon-reload
swapon -v /dev/VolGroup00/LogVol02
```

## Swap file (64 MB example)

Blocks = size in MB × 1024 → `64 * 1024 = 65536`. `chmod 0600` — the file may hold RAM secrets, so it must not be world-readable.

```bash
dd if=/dev/zero of=/swapfile bs=1024 count=65536
mkswap /swapfile
chmod 0600 /swapfile
# fstab: /swapfile swap swap defaults 0 0
systemctl daemon-reload
swapon /swapfile
cat /proc/swaps
free -h
```

## Remove a swap file

Never `rm` an **active** swap file.

```bash
swapoff -v /swapfile
# remove the fstab line
systemctl daemon-reload
rm /swapfile
```
