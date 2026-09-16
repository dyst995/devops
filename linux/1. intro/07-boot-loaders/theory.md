# 07 — Boot Loaders

When a computer is **off**, the OS, apps, and data sit in **non-volatile** storage (disk), not in RAM.

When you power on, RAM is empty — there is no OS in memory yet. The CPU runs a small program from **ROM** (firmware: BIOS or UEFI) plus a bit of data. That program’s job is to find a disk and load something bigger into RAM.

That small program is the **bootstrap loader**, **bootstrap**, or **boot loader**. It only loads other data and programs, which then run from RAM.

Often this is **multi-stage** (**chain loading**): a tiny first-stage loader loads a more capable second stage, which loads the kernel, which starts the OS.

```
Power on
  → Firmware in ROM (BIOS/UEFI)
  → Boot loader (LILO / GRUB / …)
  → Kernel in RAM
  → init / systemd
  → user space (your shell, services)
```

**Memory hook:** boot loader = the first “real” program on disk that knows how to find and load the Linux kernel.

## LILO

**LILO** (LInux LOader) shipped as standard on older Linux distributions.

- Older and **less powerful** than GRUB
- Originally **no GUI menu** for choosing an OS / kernel

You will rarely install LILO on a new system. Know it as the historical default.

## GRUB

**GRUB** (GRand Unified Bootloader) is easier to administer and is what you will see on almost every modern Linux server.

Features called out in the notes:

- Command-line interface
- Network boot
- MD5 passwords

Config locations to remember:

- `/boot/grub/grub.conf`
- `/etc/grub.conf`

(On many systems `/etc/grub.conf` is a symlink into `/boot`. GRUB2 often uses `/boot/grub2/grub.cfg` or `/boot/efi/EFI/.../grub.cfg` — if the course asks, answer with the two paths above.)

**Memory hook:** **LILO** = old, simple, weak. **GRUB** = admin-friendly, CLI, netboot, password. Config under `/boot/grub/` and `/etc/grub.conf`.
