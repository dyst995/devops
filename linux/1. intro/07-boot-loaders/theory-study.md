# 07 — Boot loaders (study)

When the computer is **off**, the OS and data sit on **non-volatile** disk, not in RAM. At power-on RAM is empty. The CPU runs a small program from **ROM** (firmware: BIOS or UEFI). That program finds a disk and loads something bigger into RAM.

That program is the **bootstrap loader**, **bootstrap**, or **boot loader**. It only loads other programs, which then run from RAM.

Often this is **multi-stage** (**chain loading**): a tiny first stage loads a more capable second stage, which loads the kernel, which starts the OS.

```
Power on → Firmware (BIOS/UEFI) → Boot loader (LILO / GRUB / …)
         → Kernel in RAM → init / systemd → user space (shell, services)
```

The boot loader is the first “real” program on disk that knows how to find and load the Linux kernel.

## LILO vs GRUB

**LILO** (LInux LOader) was standard on older distributions: older, **less powerful** than GRUB, originally **no GUI menu** for choosing an OS/kernel. You will rarely install it on a new system. Know it as the historical default.

**GRUB** (GRand Unified Bootloader) is what you will see on almost every modern Linux server. Easier to administer. Features called out in the notes: command-line interface, network boot, MD5 passwords.

Course config paths (answer these if the course asks):

- `/boot/grub/grub.conf`
- `/etc/grub.conf`

On many systems `/etc/grub.conf` is a **symlink** into `/boot`. GRUB2 often uses `/boot/grub2/grub.cfg` or `/boot/efi/EFI/.../grub.cfg` — the machine may differ; the course still wants the two paths above.
