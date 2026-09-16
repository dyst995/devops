# 05 — Swap and Swappiness

**Swap** is disk space used as overflow when RAM is full. If the system needs more memory and RAM is full, **inactive pages** in memory are moved to swap.

Swap helps machines with little RAM. It is **not** a replacement for more RAM. Disk (even SSD) is slower than physical memory.

Btrfs **does not support** swap space.

## Forms of swap

From the OS’s point of view, swap can be:

- a dedicated **swap partition** (recommended)
- a **swap file**
- a **combination** of partitions and files

Red Hat recommends **swap partitions**. They can be placed on a contiguous area of an HDD for better throughput / seek time.

Swap **files** are more flexible: any size, on any mounted file system, added or changed without repartitioning. From Linux kernel 2.6 onward, swap files are *virtually as fast* as partitions **if** they are allocated **contiguously**. The kernel keeps a map of the file’s blocks and accesses the device directly, bypassing cache and file-system overhead.

**Memory hook:** partition = recommended / simpler for the kernel. File = flexible / no downtime for partitioning.

## Checking swap

```bash
cat /proc/swaps
free -h
```

`/proc/swaps` lists active swap devices/files. `free -h` shows RAM and swap usage in human units.

## Swappiness

**Swappiness** is a kernel parameter. It sets the relative weight of:

- swapping out runtime memory (“cold” anonymous pages), versus
- dropping pages from the **page cache**

when a memory allocation cannot be satisfied from free RAM.

- Range: **0–100** inclusive
- **Default: 60**
- **Low** (toward 0) — prefer evicting **page cache**; keep apps in RAM → more consistent low latency (desktops, interactive boxes with plenty of RAM)
- **High** (toward 100) — prefer swapping **cold** app pages → can increase throughput (especially disk I/O) but risk latency spikes when those pages are needed again
- Batch / less interactive systems may want it **higher**; desktops may want it **lower**

The default is fine for most workloads.

**Memory hook:** high swappiness = “happy to swap.” Low = “protect application RAM, throw away file cache first.”

## Recommended swap size (RHEL 7)

Official table ([RHEL 7 Storage Administration Guide](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Storage_Administration_Guide/ch-swapspace.html)):

| Amount of RAM | Recommended swap | Swap if you want hibernation |
| --- | --- | --- |
| ≤ 2 GB | 2 × RAM | 3 × RAM |
| > 2 GB – 8 GB | equal to RAM | 2 × RAM |
| > 8 GB – 64 GB | at least 4 GB | 1.5 × RAM |
| > 64 GB | at least 4 GB | hibernation not recommended |

Hibernation writes RAM out to swap, so swap must be at least as large as RAM (the table uses more than 1× as a safety margin).

On modern systems with huge RAM, Red Hat also talks about sizing swap by **workload**, not by blindly matching RAM (for example ~20% of RAM is a later rule of thumb). Know the table above for this course; know “workload matters” for interviews.

## Adding swap as an LVM logical volume (2 GB example)

Assume the new swap LV will be `/dev/VolGroup00/LogVol02`:

1. Create the LV:
   ```bash
   lvcreate VolGroup00 -n LogVol02 -L 2G
   ```
2. Format it as swap (not `mkfs`):
   ```bash
   mkswap /dev/VolGroup00/LogVol02
   ```
3. Add to `/etc/fstab`:
   ```
   /dev/VolGroup00/LogVol02 swap swap defaults 0 0
   ```
4. Reload systemd mount units:
   ```bash
   systemctl daemon-reload
   ```
5. Activate now:
   ```bash
   swapon -v /dev/VolGroup00/LogVol02
   ```

**Memory hook:** `lvcreate` → `mkswap` → `fstab` → `daemon-reload` → `swapon`. Never `mkfs.ext4` on a swap LV.

## Creating a swap file

Example: 64 MB file. Blocks = size in MB × 1024 → `64 * 1024 = 65536`.

1. Create a contiguous-ish empty file:
   ```bash
   dd if=/dev/zero of=/swapfile bs=1024 count=65536
   ```
2. ```bash
   mkswap /swapfile
   ```
3. Lock down permissions (not world-readable):
   ```bash
   chmod 0600 /swapfile
   ```
4. `/etc/fstab`:
   ```
   /swapfile swap swap defaults 0 0
   ```
5. ```bash
   systemctl daemon-reload
   ```
6. ```bash
   swapon /swapfile
   ```
7. Verify:
   ```bash
   cat /proc/swaps
   free -h
   ```

## Removing a swap file

1. Turn it off first:
   ```bash
   swapoff -v /swapfile
   ```
2. Remove the `/etc/fstab` line.
3. ```bash
   systemctl daemon-reload
   ```
4. ```bash
   rm /swapfile
   ```

**Memory hook:** never `rm` an active swap file. `swapoff` → fstab → reload → `rm`.
